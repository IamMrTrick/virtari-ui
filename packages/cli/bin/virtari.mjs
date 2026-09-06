#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const CLI_MANIFEST = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const DEFAULT_REGISTRY = `https://raw.githubusercontent.com/Virtari-Packages/virtari-design-system/cli-v${CLI_MANIFEST.version}/registry.json`;
const CONFIG_NAME = "virtari.json";
const TRACKING_PATH = ".virtari/installed.json";
const SOURCE_PREFIX = "src/virtari";

function fail(message) {
  const error = new Error(message);
  error.isUserError = true;
  throw error;
}

function parseArguments(argv) {
  const positional = [];
  const options = {
    cwd: process.cwd(),
    registry: undefined,
    target: undefined,
    overwrite: false,
    dryRun: false,
    install: true,
    json: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--cwd" || argument === "--registry" || argument === "--target") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) fail(`${argument} requires a value.`);
      options[argument.slice(2)] = value;
      index += 1;
    } else if (argument === "--overwrite") options.overwrite = true;
    else if (argument === "--dry-run") options.dryRun = true;
    else if (argument === "--no-install") options.install = false;
    else if (argument === "--json") options.json = true;
    else if (argument === "--help" || argument === "-h") options.help = true;
    else if (argument === "--version" || argument === "-v") options.version = true;
    else if (argument.startsWith("--")) fail(`Unknown option: ${argument}`);
    else positional.push(argument);
  }
  options.cwd = path.resolve(options.cwd);
  return { positional, options };
}

function printHelp() {
  console.log(`Virtari source CLI

Usage:
  virtari init [--target src/virtari] [--registry <url-or-path>] [--no-install]
  virtari add <item...> [--overwrite] [--dry-run] [--no-install]
  virtari list [--json]
  virtari diff <item...> [--json]
  virtari doctor [--json]

Every installed component is ordinary source code in your project. Use --dry-run
to preview changes and diff before updating edited components.`);
}

function isUrl(value) {
  return /^https?:\/\//i.test(value);
}

function requestHeaders() {
  const token = process.env.VIRTARI_REGISTRY_TOKEN ?? process.env.GITHUB_TOKEN;
  return {
    "user-agent": `virtari-cli/${CLI_MANIFEST.version}`,
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
}

async function request(url) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(url, { headers: requestHeaders(), signal: AbortSignal.timeout(20_000) });
      if (response.ok || response.status < 500) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  fail(`Could not load ${url}: ${lastError?.message ?? "network error"}`);
}

async function readJson(source, cwd) {
  if (isUrl(source)) {
    const response = await request(source);
    if (!response.ok) fail(`Could not load registry (${response.status}) from ${source}`);
    return { value: await response.json(), source, base: new URL(".", source).href };
  }
  const absolute = path.resolve(cwd, source);
  if (!existsSync(absolute)) fail(`Registry not found: ${absolute}`);
  return { value: JSON.parse(await readFile(absolute, "utf8")), source: absolute, base: path.dirname(absolute) };
}

async function readRegistryFile(base, filePath) {
  if (isUrl(base)) {
    const url = new URL(filePath, base).href;
    const response = await request(url);
    if (!response.ok) fail(`Could not load registry file (${response.status}) from ${url}`);
    return response.text();
  }
  return readFile(path.join(base, filePath), "utf8");
}

async function mapLimit(values, limit, mapper) {
  const result = new Array(values.length);
  let next = 0;
  async function worker() {
    while (next < values.length) {
      const index = next;
      next += 1;
      result[index] = await mapper(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, worker));
  return result;
}

function validateRegistry(registry) {
  if (!registry || !Array.isArray(registry.items)) fail("Registry must contain an items array.");
  const names = new Set();
  for (const item of registry.items) {
    if (!item?.name || typeof item.name !== "string") fail("Every registry item needs a name.");
    if (names.has(item.name)) fail(`Duplicate registry item: ${item.name}`);
    names.add(item.name);
    if (item.files && !Array.isArray(item.files)) fail(`Invalid files for ${item.name}.`);
    for (const file of item.files ?? []) {
      if (!file.path || path.posix.isAbsolute(file.path) || file.path.split("/").includes("..") || file.path.includes("://")) fail(`Unsafe registry source path in ${item.name}: ${file.path}`);
    }
  }
}

async function readConfig(cwd, required = true) {
  const configPath = path.join(cwd, CONFIG_NAME);
  if (!existsSync(configPath)) {
    if (required) fail(`No ${CONFIG_NAME} found. Run \"virtari init\" first.`);
    return null;
  }
  const config = JSON.parse(await readFile(configPath, "utf8"));
  if (!config.target || path.isAbsolute(config.target)) fail(`${CONFIG_NAME} target must be a project-relative path.`);
  const target = path.resolve(cwd, config.target);
  if (target !== cwd && !target.startsWith(`${cwd}${path.sep}`)) fail(`${CONFIG_NAME} target must stay inside the project.`);
  return config;
}

function registryDependencyName(address) {
  const clean = address.split("#")[0].replace(/\/$/, "");
  return clean.slice(clean.lastIndexOf("/") + 1).replace(/\.json$/, "");
}

function resolveItems(registry, requested) {
  const byName = new Map(registry.items.map((item) => [item.name, item]));
  const resolved = [];
  const visited = new Set();
  const visiting = new Set();
  function visit(name) {
    if (visited.has(name)) return;
    if (visiting.has(name)) fail(`Registry dependency cycle at ${name}.`);
    const item = byName.get(name);
    if (!item) fail(`Unknown Virtari item: ${name}`);
    visiting.add(name);
    for (const dependency of item.registryDependencies ?? []) visit(registryDependencyName(dependency));
    visiting.delete(name);
    visited.add(name);
    resolved.push(item);
  }
  requested.forEach(visit);
  return resolved;
}

function safeDestination(cwd, targetRoot, declaredTarget) {
  if (!declaredTarget?.startsWith("~/")) fail(`Registry file target must start with ~/: ${declaredTarget}`);
  const projectPath = declaredTarget.slice(2).replace(/^src\/virtari(?=\/|$)/, targetRoot.replace(/\\/g, "/"));
  const destination = path.resolve(cwd, projectPath);
  const prefix = `${path.resolve(cwd)}${path.sep}`;
  if (destination !== path.resolve(cwd) && !destination.startsWith(prefix)) fail(`Registry target escapes the project: ${declaredTarget}`);
  return destination;
}

function hash(content) {
  return createHash("sha256").update(content).digest("hex");
}

async function atomicWrite(destination, content) {
  await mkdir(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.virtari-${process.pid}.tmp`;
  await writeFile(temporary, content, "utf8");
  await rename(temporary, destination);
}

function parseDependency(specifier) {
  const splitAt = specifier.startsWith("@") ? specifier.indexOf("@", 1) : specifier.lastIndexOf("@");
  if (splitAt <= 0) return [specifier, "latest"];
  return [specifier.slice(0, splitAt), specifier.slice(splitAt + 1) || "latest"];
}

function detectPackageManager(cwd) {
  if (existsSync(path.join(cwd, "pnpm-lock.yaml"))) return { command: "pnpm", args: ["install"] };
  if (existsSync(path.join(cwd, "yarn.lock"))) return { command: "yarn", args: ["install"] };
  if (existsSync(path.join(cwd, "bun.lock")) || existsSync(path.join(cwd, "bun.lockb"))) return { command: "bun", args: ["install"] };
  return { command: "npm", args: ["install"] };
}

async function mergeDependencies(cwd, dependencies, dryRun) {
  const packagePath = path.join(cwd, "package.json");
  if (!existsSync(packagePath)) fail(`No package.json found in ${cwd}.`);
  const source = await readFile(packagePath, "utf8");
  const manifest = JSON.parse(source);
  manifest.dependencies ??= {};
  const added = [];
  for (const specifier of dependencies) {
    const [name, range] = parseDependency(specifier);
    if (manifest.dependencies[name] || manifest.devDependencies?.[name] || manifest.peerDependencies?.[name]) continue;
    manifest.dependencies[name] = range;
    added.push(name);
  }
  if (added.length && !dryRun) {
    manifest.dependencies = Object.fromEntries(Object.entries(manifest.dependencies).sort(([a], [b]) => a.localeCompare(b)));
    await atomicWrite(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  return added;
}

async function createPlan({ cwd, registryData, config, itemNames }) {
  const items = resolveItems(registryData.value, itemNames);
  const files = new Map();
  const dependencies = new Set();
  const requests = [];
  for (const item of items) {
    for (const dependency of item.dependencies ?? []) dependencies.add(dependency);
    for (const file of item.files ?? []) {
      const destination = safeDestination(cwd, config.target, file.target);
      requests.push({ destination, file, item });
    }
  }
  const contents = await mapLimit(requests, 12, ({ file }) => readRegistryFile(registryData.base, file.path));
  for (let index = 0; index < requests.length; index += 1) {
      const { destination, file, item } = requests[index];
      const content = contents[index];
      const previous = files.get(destination);
      if (previous && previous.content !== content) fail(`Two registry files target ${path.relative(cwd, destination)}.`);
      files.set(destination, { content, item: item.name, source: file.path });
  }
  return { items, files, dependencies: [...dependencies].sort() };
}

async function readTracking(cwd) {
  const tracking = path.join(cwd, TRACKING_PATH);
  if (!existsSync(tracking)) return { version: 1, items: {} };
  return JSON.parse(await readFile(tracking, "utf8"));
}

async function installPlan({ cwd, registryData, config, plan, overwrite, dryRun, install }) {
  const conflicts = [];
  const changed = [];
  const unchanged = [];
  for (const [destination, file] of plan.files) {
    if (!existsSync(destination)) {
      changed.push([destination, file]);
      continue;
    }
    const current = await readFile(destination, "utf8");
    if (current === file.content) unchanged.push(destination);
    else if (overwrite) changed.push([destination, file]);
    else conflicts.push(path.relative(cwd, destination));
  }
  if (conflicts.length) fail(`Edited files would be overwritten:\n${conflicts.map((file) => `  ${file}`).join("\n")}\nRun \"virtari diff\" first, then pass --overwrite only if intended.`);

  if (!dryRun) {
    for (const [destination, file] of changed) await atomicWrite(destination, file.content);
  }
  const addedDependencies = await mergeDependencies(cwd, plan.dependencies, dryRun);
  if (!dryRun) {
    const tracking = await readTracking(cwd);
    tracking.registry = registryData.source;
    tracking.updatedAt = new Date().toISOString();
    for (const item of plan.items) {
      tracking.items[item.name] = {
        files: (item.files ?? []).map((file) => {
          const destination = safeDestination(cwd, config.target, file.target);
          const planned = plan.files.get(destination);
          return { path: path.relative(cwd, destination).replace(/\\/g, "/"), hash: hash(planned.content) };
        }),
      };
    }
    await atomicWrite(path.join(cwd, TRACKING_PATH), `${JSON.stringify(tracking, null, 2)}\n`);
  }
  if (install && addedDependencies.length && !dryRun) {
    const packageManager = detectPackageManager(cwd);
    const result = spawnSync(packageManager.command, packageManager.args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
    if (result.status !== 0) fail(`${packageManager.command} install failed. Source files remain installed; run the package manager manually.`);
  }
  return { items: plan.items.map((item) => item.name), written: changed.length, unchanged: unchanged.length, dependencies: addedDependencies };
}

async function commandInit(options) {
  if (!existsSync(path.join(options.cwd, "package.json"))) fail(`No package.json found in ${options.cwd}.`);
  const configPath = path.join(options.cwd, CONFIG_NAME);
  let config = await readConfig(options.cwd, false);
  if (!config) {
    config = {
      $schema: `https://raw.githubusercontent.com/Virtari-Packages/virtari-design-system/cli-v${CLI_MANIFEST.version}/virtari.schema.json`,
      target: options.target ?? SOURCE_PREFIX,
      registry: options.registry ?? DEFAULT_REGISTRY,
      install: true,
    };
    if (!options.dryRun) await atomicWrite(configPath, `${JSON.stringify(config, null, 2)}\n`);
  }
  const registryData = await readJson(options.registry ?? config.registry ?? DEFAULT_REGISTRY, options.cwd);
  validateRegistry(registryData.value);
  const plan = await createPlan({ cwd: options.cwd, registryData, config, itemNames: ["virtari-base"] });
  const result = await installPlan({ cwd: options.cwd, registryData, config, plan, overwrite: options.overwrite, dryRun: options.dryRun, install: options.install && config.install !== false });
  console.log(`Initialized Virtari in ${path.relative(process.cwd(), options.cwd) || "."} (${result.written} files).`);
}

async function loadContext(options) {
  const config = await readConfig(options.cwd);
  const registryData = await readJson(options.registry ?? config.registry ?? DEFAULT_REGISTRY, options.cwd);
  validateRegistry(registryData.value);
  return { config, registryData };
}

async function commandAdd(names, options) {
  if (!names.length) fail("Add requires at least one item name.");
  const { config, registryData } = await loadContext(options);
  const plan = await createPlan({ cwd: options.cwd, registryData, config, itemNames: names });
  const result = await installPlan({ cwd: options.cwd, registryData, config, plan, overwrite: options.overwrite, dryRun: options.dryRun, install: options.install && config.install !== false });
  const verb = options.dryRun ? "Would install" : "Installed";
  console.log(`${verb} ${result.items.join(", ")} (${result.written} files, ${result.unchanged} unchanged).`);
  if (result.dependencies.length) console.log(`${options.dryRun ? "Would add" : "Added"} dependencies: ${result.dependencies.join(", ")}`);
}

async function commandList(options) {
  const config = await readConfig(options.cwd, false);
  const registryData = await readJson(options.registry ?? config?.registry ?? DEFAULT_REGISTRY, options.cwd);
  validateRegistry(registryData.value);
  const rows = registryData.value.items.map((item) => ({ name: item.name, type: item.type, description: item.description ?? "" }));
  if (options.json) console.log(JSON.stringify(rows, null, 2));
  else for (const row of rows) console.log(`${row.name.padEnd(24)} ${row.description}`);
}

async function commandDiff(names, options) {
  if (!names.length) fail("Diff requires at least one item name.");
  const { config, registryData } = await loadContext(options);
  const plan = await createPlan({ cwd: options.cwd, registryData, config, itemNames: names });
  const result = [];
  for (const [destination, file] of plan.files) {
    const relative = path.relative(options.cwd, destination).replace(/\\/g, "/");
    if (!existsSync(destination)) result.push({ path: relative, status: "missing", item: file.item });
    else if (await readFile(destination, "utf8") !== file.content) result.push({ path: relative, status: "modified", item: file.item });
  }
  if (options.json) console.log(JSON.stringify(result, null, 2));
  else if (!result.length) console.log("Installed source matches the registry.");
  else for (const entry of result) console.log(`${entry.status.padEnd(9)} ${entry.path}`);
}

async function scanForInternalImports(directory) {
  if (!existsSync(directory)) return [];
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await scanForInternalImports(absolute));
    else if (entry.isFile() && /\.(?:tsx?|jsx?|css)$/.test(entry.name)) {
      const content = await readFile(absolute, "utf8");
      if (/(?:from\s*|import\s*|require\(\s*)["']@virtari-packages\/|@import\s+["']@virtari-packages\//.test(content)) found.push(absolute);
    }
  }
  return found;
}

async function commandDoctor(options) {
  const config = await readConfig(options.cwd);
  const target = path.resolve(options.cwd, config.target);
  const issues = [];
  if (!existsSync(target)) issues.push(`Missing source directory: ${config.target}`);
  const leakedImports = await scanForInternalImports(target);
  for (const file of leakedImports) issues.push(`Package import remains: ${path.relative(options.cwd, file)}`);
  if (!existsSync(path.join(options.cwd, TRACKING_PATH))) issues.push(`Missing ${TRACKING_PATH}; run virtari add again to restore update metadata.`);
  const result = { ok: issues.length === 0, target: config.target, issues };
  if (options.json) console.log(JSON.stringify(result, null, 2));
  else if (result.ok) console.log(`Virtari source is healthy at ${config.target}.`);
  else for (const issue of issues) console.log(`issue  ${issue}`);
  if (!result.ok) process.exitCode = 1;
}

async function main() {
  const { positional, options } = parseArguments(process.argv.slice(2));
  if (options.version) {
    console.log(CLI_MANIFEST.version);
    return;
  }
  const [command, ...names] = positional;
  if (options.help || !command) return printHelp();
  if (command === "init") return commandInit(options);
  if (command === "add") return commandAdd(names, options);
  if (command === "list") return commandList(options);
  if (command === "diff") return commandDiff(names, options);
  if (command === "doctor") return commandDoctor(options);
  fail(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error.isUserError ? error.message : error.stack ?? error.message);
  process.exitCode = 1;
});
