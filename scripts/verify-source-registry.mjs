import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(await readFile(path.join(root, "registry.json"), "utf8"));
const repository = "IamMrTrick/virtari-ui";
const failures = [];
const names = new Set();
const targets = new Map();

function packageName(specifier) {
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

function dependencyName(specifier) {
  if (specifier.startsWith("@")) {
    const at = specifier.indexOf("@", 1);
    return at < 0 ? specifier : specifier.slice(0, at);
  }
  const at = specifier.lastIndexOf("@");
  return at < 1 ? specifier : specifier.slice(0, at);
}

for (const item of registry.items ?? []) {
  if (!item.name || names.has(item.name)) failures.push(`Duplicate or missing item name: ${item.name ?? "<missing>"}`);
  names.add(item.name);
  for (const dependency of item.registryDependencies ?? []) {
    if (!dependency.startsWith(`${repository}/`)) failures.push(`${item.name}: dependency is not a same-repository GitHub address: ${dependency}`);
  }
  for (const file of item.files ?? []) {
    if (file.type !== "registry:file" || !file.target?.startsWith("~/src/virtari/")) failures.push(`${item.name}: unsafe or non-portable target ${file.target}`);
    const target = file.target?.slice(2);
    if (targets.has(target)) failures.push(`${item.name}: duplicate target ${target}`);
    if (!existsSync(path.join(root, file.path))) failures.push(`${item.name}: missing source ${file.path}`);
    targets.set(target, { item, file });
  }
}

for (const item of registry.items ?? []) {
  for (const dependency of item.registryDependencies ?? []) {
    const name = dependency.split("#")[0].split("/").at(-1);
    if (!names.has(name)) failures.push(`${item.name}: missing registry dependency ${name}`);
  }
}

const modulePattern = /(?:\bfrom\s+|\bimport\s*\(|\bimport\s+|\brequire\s*\(|@import\s+)(["'])([^"']+)\1/g;
const allowedPeers = new Set(["react", "react-dom"]);
const extensionCandidates = ["", ".ts", ".tsx", ".js", ".jsx", ".css", ".json", "/index.ts", "/index.tsx", "/index.js", "/index.jsx", "/index.css"];

for (const [target, entry] of targets) {
  if (!/\.(?:tsx?|jsx?|css)$/.test(target)) continue;
  const content = await readFile(path.join(root, entry.file.path), "utf8");
  const declared = new Set((entry.item.dependencies ?? []).map(dependencyName));
  for (const match of content.matchAll(modulePattern)) {
    const specifier = match[2];
    if (specifier.startsWith("@virtari-packages/")) failures.push(`${entry.item.name}: internal package import remains in ${target}: ${specifier}`);
    if (specifier.startsWith(".")) {
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(target), specifier));
      if (!extensionCandidates.some((extension) => targets.has(`${resolved}${extension}`))) failures.push(`${entry.item.name}: unresolved relative import ${specifier} in ${target}`);
      continue;
    }
    if (!specifier.startsWith("node:") && !allowedPeers.has(packageName(specifier)) && !declared.has(packageName(specifier))) {
      failures.push(`${entry.item.name}: undeclared dependency ${packageName(specifier)} in ${target}`);
    }
  }
}

if (failures.length) {
  console.error(failures.slice(0, 40).join("\n"));
  if (failures.length > 40) console.error(`...and ${failures.length - 40} more`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${registry.items.length} registry items and ${targets.size} source targets.`);
}
