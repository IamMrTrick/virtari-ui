import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packagesRoot = path.join(root, "packages");
const generatedRoot = path.join(root, "registry", "virtari");
const registryPath = path.join(root, "registry.json");
const checkOnly = process.argv.includes("--check");
const githubRegistry = "Virtari-Packages/virtari-design-system";
const cliManifest = JSON.parse(await readFile(path.join(root, "packages", "cli", "package.json"), "utf8"));
const registryRef = `cli-v${cliManifest.version}`;
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".json", ".svg"]);

function registryAddress(item) {
  return `${githubRegistry}/${item}#${registryRef}`;
}

function posix(value) {
  return value.split(path.sep).join("/");
}

function normalizeSource(content) {
  return content.replace(/\r\n/g, "\n").replace(/\n*$/, "\n");
}

function itemName(directory) {
  return directory.startsWith("react-") ? directory.slice(6) : `virtari-${directory}`;
}

function targetDirectory(directory) {
  if (directory.startsWith("react-")) return `src/virtari/components/${directory.slice(6)}`;
  if (["core", "tokens", "utilities"].includes(directory)) return `src/virtari/styles/${directory}`;
  return `src/virtari/lib/${directory}`;
}

function registryType(directory) {
  if (directory.startsWith("react-")) return "registry:ui";
  if (["core", "tokens", "utilities"].includes(directory)) return "registry:style";
  return "registry:lib";
}

function titleFrom(directory) {
  const name = directory.startsWith("react-") ? directory.slice(6) : directory;
  return name.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

async function walk(directory, base = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (["__tests__", "fixtures"].includes(entry.name)) continue;
      files.push(...await walk(absolute, base));
      continue;
    }
    if (!entry.isFile()) continue;
    if (!sourceExtensions.has(path.extname(entry.name))) continue;
    if (/\.(?:test|spec)\.[^.]+$/.test(entry.name)) continue;
    files.push(posix(path.relative(base, absolute)));
  }
  return files;
}

function firstExportPath(value) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return undefined;
  for (const key of ["import", "default", "require", "types"]) {
    const found = firstExportPath(value[key]);
    if (found) return found;
  }
  for (const nested of Object.values(value)) {
    const found = firstExportPath(nested);
    if (found) return found;
  }
}

function sourceCandidate(info, subpath) {
  const key = subpath ? `./${subpath}` : ".";
  const exported = firstExportPath(info.manifest.exports?.[key]);
  const candidates = [];
  if (exported) {
    const relative = exported.replace(/^\.\//, "").replace(/^dist\//, "src/");
    candidates.push(relative);
    if (/\.(?:m?js|cjs|d\.ts|d\.cts)$/.test(relative)) {
      const stem = relative.replace(/\.(?:m?js|cjs|d\.ts|d\.cts)$/, "");
      candidates.push(`${stem}.ts`, `${stem}.tsx`, `${stem}/index.ts`, `${stem}/index.tsx`);
    }
  }
  if (subpath) {
    candidates.push(`src/${subpath}`, `src/${subpath}.ts`, `src/${subpath}.tsx`, `src/${subpath}.css`, `src/${subpath}/index.ts`, `src/${subpath}/index.tsx`, `src/${subpath}/index.css`);
  } else {
    candidates.push("src/index.ts", "src/index.tsx", "src/index.css");
  }
  if (!subpath && ["core", "tokens", "utilities"].includes(info.directory)) {
    candidates.unshift("src/index.css");
  }
  for (const candidate of candidates) {
    if (existsSync(path.join(info.absolute, candidate))) return candidate.slice(4);
  }
  throw new Error(`Cannot resolve source export ${info.manifest.name}${subpath ? `/${subpath}` : ""}`);
}

function stripModuleExtension(relativePath) {
  if (relativePath.endsWith(".css") || relativePath.endsWith(".json") || relativePath.endsWith(".svg")) return relativePath;
  return relativePath.replace(/\.(?:tsx?|jsx?)$/, "").replace(/\/index$/, "");
}

function externalDependency(name, range) {
  if (["react", "react-dom"].includes(name)) return null;
  return `${name}@${range}`;
}

async function discoverPackages() {
  const directories = (await readdir(packagesRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()
      && existsSync(path.join(packagesRoot, entry.name, "package.json"))
      && existsSync(path.join(packagesRoot, entry.name, "src")))
    .map((entry) => entry.name)
    .sort();
  const infos = [];
  for (const directory of directories) {
    const absolute = path.join(packagesRoot, directory);
    const manifest = JSON.parse(await readFile(path.join(absolute, "package.json"), "utf8"));
    infos.push({
      absolute,
      directory,
      item: itemName(directory),
      manifest,
      targetDirectory: targetDirectory(directory),
      files: await walk(path.join(absolute, "src")),
    });
  }
  return infos;
}

function rewriteImports(content, importer, packageByName) {
  const packageImports = content.replace(/(["'])(@virtari-packages\/([a-z0-9-]+)(?:\/([^"']+))?)\1/g, (match, quote, specifier, packageDirectory, subpath = "") => {
    const dependency = packageByName.get(`@virtari-packages/${packageDirectory}`);
    if (!dependency) throw new Error(`Unknown internal import ${specifier} in ${importer.directory}/${importer.relative}`);
    const entry = sourceCandidate(dependency, subpath);
    const destination = posix(path.join(dependency.targetDirectory, entry));
    let relative = posix(path.relative(path.posix.dirname(importer.target), destination));
    if (!relative.startsWith(".")) relative = `./${relative}`;
    return `${quote}${stripModuleExtension(relative)}${quote}`;
  });
  return packageImports.replace(/(["'])(\.\.\/[^"']+)\1/g, (match, quote, specifier) => {
    const absolute = path.resolve(path.dirname(importer.sourceAbsolute), specifier);
    const relativeToPackages = path.relative(packagesRoot, absolute);
    if (relativeToPackages.startsWith("..") || path.isAbsolute(relativeToPackages) || !existsSync(absolute)) return match;
    const [packageDirectory, sourceDirectory, ...sourceParts] = relativeToPackages.split(path.sep);
    if (sourceDirectory !== "src") return match;
    const dependency = [...packageByName.values()].find((candidate) => candidate.directory === packageDirectory);
    if (!dependency) return match;
    const destination = posix(path.join(dependency.targetDirectory, ...sourceParts));
    let relative = posix(path.relative(path.posix.dirname(importer.target), destination));
    if (!relative.startsWith(".")) relative = `./${relative}`;
    return `${quote}${stripModuleExtension(relative)}${quote}`;
  });
}

async function dependencyData(info, packageByName) {
  const registryDependencies = new Set();
  const dependencies = new Set();
  const allRuntime = { ...info.manifest.dependencies, ...info.manifest.optionalDependencies };
  const peers = info.manifest.peerDependencies ?? {};
  const source = (await Promise.all(info.files
    .filter((file) => /\.(?:tsx?|jsx?|css)$/.test(file))
    .map((file) => readFile(path.join(info.absolute, "src", file), "utf8")))).join("\n");
  for (const [name, range] of Object.entries({ ...allRuntime, ...peers })) {
    if (name.startsWith("@virtari-packages/")) {
      const dependency = packageByName.get(name);
      if (!dependency) throw new Error(`Unknown workspace dependency ${name} in ${info.directory}`);
      if (dependency.directory === "primitives") {
        const primitiveNames = [...source.matchAll(/["']@virtari-packages\/primitives\/([^"']+)["']/g)]
          .map((match) => match[1].split("/")[0]);
        if (primitiveNames.length) {
          for (const primitiveName of primitiveNames) registryDependencies.add(registryAddress(`primitive-${primitiveName}`));
        } else if (source.includes('"@virtari-packages/primitives"') || source.includes("'@virtari-packages/primitives'")) {
          registryDependencies.add(registryAddress("virtari-primitives"));
        }
      } else {
        registryDependencies.add(registryAddress(dependency.item));
      }
      continue;
    }
    const dependency = externalDependency(name, range);
    if (dependency) dependencies.add(dependency);
  }
  if (info.directory.startsWith("react-")) registryDependencies.add(registryAddress("virtari-base"));
  return {
    registryDependencies: [...registryDependencies].sort(),
    dependencies: [...dependencies].sort(),
  };
}

function importedSpecifiers(content) {
  return [...content.matchAll(/(?:\bfrom\s+|\bimport\s*\(|\bimport\s+|\brequire\s*\(|@import\s+)(["'])([^"']+)\1/g)].map((match) => match[2]);
}

async function createPrimitiveItems(info, packageByName, output) {
  const groups = new Map();
  for (const file of info.files) {
    const [group] = file.split("/");
    if (!group) continue;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(file);
  }
  const items = [];
  const runtime = { ...info.manifest.dependencies, ...info.manifest.optionalDependencies, ...info.manifest.peerDependencies };
  for (const [group, sourceFiles] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
    const files = [];
    const registryDependencies = new Set();
    const dependencies = new Set();
    for (const relative of sourceFiles) {
      const sourcePath = path.join(info.absolute, "src", relative);
      const registryRelative = posix(path.join("registry", "virtari", `primitive-${group}`, relative));
      const target = posix(path.join(info.targetDirectory, relative));
      const original = await readFile(sourcePath, "utf8");
      const content = normalizeSource(rewriteImports(original, { ...info, relative, target, sourceAbsolute: sourcePath }, packageByName));
      output.set(registryRelative, content);
      files.push({ path: registryRelative, type: "registry:file", target: `~/${target}` });
      for (const specifier of importedSpecifiers(original)) {
        if (specifier.startsWith(".")) {
          const absolute = path.resolve(path.dirname(sourcePath), specifier);
          const relativeToSource = path.relative(path.join(info.absolute, "src"), absolute);
          if (!relativeToSource.startsWith("..") && !path.isAbsolute(relativeToSource)) {
            const dependencyGroup = relativeToSource.split(path.sep)[0];
            if (dependencyGroup && dependencyGroup !== group) registryDependencies.add(registryAddress(`primitive-${dependencyGroup}`));
          }
          continue;
        }
        const name = specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
        const range = runtime[name];
        const dependency = range ? externalDependency(name, range) : null;
        if (dependency) dependencies.add(dependency);
      }
    }
    items.push({
      name: `primitive-${group}`,
      type: "registry:lib",
      title: `${titleFrom(group)} Primitive`,
      description: `Headless ${titleFrom(group)} behavior used by Virtari components.`,
      author: "Virtari",
      ...(registryDependencies.size ? { registryDependencies: [...registryDependencies].sort() } : {}),
      ...(dependencies.size ? { dependencies: [...dependencies].sort() } : {}),
      files,
    });
  }
  items.push({
    name: "virtari-primitives",
    type: "registry:lib",
    title: "Virtari Primitives",
    description: "Complete headless primitive collection. Component installs use smaller primitive items automatically.",
    author: "Virtari",
    registryDependencies: [...groups.keys()].sort().map((group) => registryAddress(`primitive-${group}`)),
  });
  return items;
}

function itemDescription(info) {
  if (info.directory.startsWith("react-")) return `${titleFrom(info.directory)} source component with Virtari tokens, behavior, and editable styles.`;
  return info.manifest.description ?? `${titleFrom(info.directory)} source files for Virtari.`;
}

async function createOutput() {
  const infos = await discoverPackages();
  const packageByName = new Map(infos.map((info) => [info.manifest.name, info]));
  const output = new Map();
  const items = [];

  const baseCss = '@import "./core/index.css";\n@import "./tokens/index.css";\n';
  output.set("registry/virtari/virtari-base/index.css", baseCss);
  items.push({
    name: "virtari-base",
    type: "registry:base",
    title: "Virtari Base",
    description: "Virtari cascade layers, design tokens, global reset, primitives, and shared React utilities.",
    author: "Virtari",
    registryDependencies: [
      registryAddress("virtari-core"),
    ],
    files: [{
      path: "registry/virtari/virtari-base/index.css",
      type: "registry:file",
      target: "~/src/virtari/styles/index.css",
    }],
    docs: 'Import "./src/virtari/styles/index.css" once from the application entry point.',
  });

  for (const info of infos) {
    if (info.directory === "primitives") {
      items.push(...await createPrimitiveItems(info, packageByName, output));
      continue;
    }
    const files = [];
    const styleEntry = info.directory.startsWith("react-") && info.manifest.exports?.["./styles"]
      ? sourceCandidate(info, "styles")
      : null;
    for (const relative of info.files) {
      const sourcePath = path.join(info.absolute, "src", relative);
      const registryRelative = posix(path.join("registry", "virtari", info.item, relative));
      const target = posix(path.join(info.targetDirectory, relative));
      let content = await readFile(sourcePath, "utf8");
      content = rewriteImports(content, { ...info, relative, target, sourceAbsolute: sourcePath }, packageByName);
      if (relative === "index.ts" && styleEntry && !content.includes(`./${styleEntry}`)) {
        content = `import "./${styleEntry}";\n${content}`;
      }
      content = normalizeSource(content);
      output.set(registryRelative, content);
      files.push({ path: registryRelative, type: "registry:file", target: `~/${target}` });
    }
    const dependency = await dependencyData(info, packageByName);
    items.push({
      name: info.item,
      type: registryType(info.directory),
      title: titleFrom(info.directory),
      description: itemDescription(info),
      author: "Virtari",
      ...(dependency.registryDependencies.length ? { registryDependencies: dependency.registryDependencies } : {}),
      ...(dependency.dependencies.length ? { dependencies: dependency.dependencies } : {}),
      files,
      docs: info.directory.startsWith("react-")
        ? `Import from "./src/virtari/components/${info.item}". Source and styles are installed into your project and can be edited.`
        : undefined,
    });
  }

  const allComponents = infos.filter((info) => info.directory.startsWith("react-")).map((info) => registryAddress(info.item));
  items.push({
    name: "virtari-all",
    type: "registry:block",
    title: "Virtari Complete",
    description: "The complete Virtari source component collection. Prefer individual items for smaller applications.",
    author: "Virtari",
    registryDependencies: [registryAddress("virtari-base"), ...allComponents],
  });

  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "virtari",
    homepage: "https://github.com/Virtari-Packages/virtari-design-system",
    items,
  };
  output.set("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
  return output;
}

async function checkOutput(output) {
  const failures = [];
  for (const [relative, expected] of output) {
    const absolute = path.join(root, relative);
    if (!existsSync(absolute)) {
      failures.push(`missing ${relative}`);
      continue;
    }
    const actual = await readFile(absolute, "utf8");
    if (actual !== expected) failures.push(`stale ${relative}`);
  }
  if (existsSync(generatedRoot)) {
    for (const relative of await walk(generatedRoot, root)) {
      const key = posix(relative);
      if (!output.has(key)) failures.push(`extra ${key}`);
    }
  }
  if (failures.length) throw new Error(`Source registry is not current:\n${failures.slice(0, 20).join("\n")}`);
}

async function writeOutput(output) {
  const resolvedGenerated = path.resolve(generatedRoot);
  if (!resolvedGenerated.startsWith(`${path.resolve(root)}${path.sep}`)) throw new Error("Refusing to replace registry outside repository");
  await rm(resolvedGenerated, { recursive: true, force: true });
  for (const [relative, content] of output) {
    const absolute = path.join(root, relative);
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, content, "utf8");
  }
}

const output = await createOutput();
if (checkOnly) {
  await checkOutput(output);
  console.log(`Virtari registry is current (${output.size - 1} source files).`);
} else {
  await writeOutput(output);
  console.log(`Built ${registryPath} with ${output.size - 1} source files.`);
}
