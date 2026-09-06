import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packagesDir = path.join(root, "packages");
const writeMode = process.argv.includes("--write");
const canonicalRepository = "git+https://github.com/Virtari-Packages/virtari-design-system.git";
const staleRepository = /IamMrTrick\/virtari-design-system/g;
const rootLicense = fs.readFileSync(path.join(root, "LICENSE"), "utf8");
const failures = [];

if (!/^MIT License\r?\n/.test(rootLicense) || !rootLicense.includes("Permission is hereby granted")) {
  failures.push("The root LICENSE is not the canonical MIT license.");
}

const packageDirs = fs
  .readdirSync(packagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(packagesDir, entry.name, "package.json")))
  .map((entry) => path.join(packagesDir, entry.name));

const manifestPaths = [path.join(root, "package.json"), ...packageDirs.map((dir) => path.join(dir, "package.json"))];

for (const manifestPath of manifestPaths) {
  const original = fs.readFileSync(manifestPath, "utf8");
  const manifest = JSON.parse(original);
  manifest.license = "MIT";

  if (typeof manifest.repository === "string") {
    manifest.repository = manifest.repository.replace(staleRepository, "Virtari-Packages/virtari-design-system");
  } else if (manifest.repository?.url) {
    manifest.repository.url = manifest.repository.url.replace(staleRepository, "Virtari-Packages/virtari-design-system");
  }
  if (typeof manifest.homepage === "string") {
    manifest.homepage = manifest.homepage.replace(staleRepository, "Virtari-Packages/virtari-design-system");
  }
  if (typeof manifest.bugs === "string") {
    manifest.bugs = manifest.bugs.replace(staleRepository, "Virtari-Packages/virtari-design-system");
  } else if (manifest.bugs?.url) {
    manifest.bugs.url = manifest.bugs.url.replace(staleRepository, "Virtari-Packages/virtari-design-system");
  }

  const expected = `${JSON.stringify(manifest, null, 2)}\n`;
  if (writeMode && original !== expected) fs.writeFileSync(manifestPath, expected);
  if (!writeMode && original !== expected) failures.push(`${path.relative(root, manifestPath)} has stale license or repository metadata.`);
}

for (const dir of packageDirs) {
  const licensePath = path.join(dir, "LICENSE");
  const current = fs.existsSync(licensePath) ? fs.readFileSync(licensePath, "utf8") : "";
  if (writeMode && current !== rootLicense) fs.writeFileSync(licensePath, rootLicense);
  if (!writeMode && current !== rootLicense) failures.push(`${path.relative(root, licensePath)} must match the root MIT license.`);
}

const maintainedTextFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "AGENT_GUIDE.md",
  "docs/source-registry.md",
  "scripts/add-package-metadata.mjs",
  "scripts/sync-package-docs.mjs",
  ...packageDirs.map((dir) => path.relative(root, path.join(dir, "README.md"))).filter((file) => fs.existsSync(path.join(root, file))),
];
const replacements = [
  [/IamMrTrick\/virtari-design-system/g, "Virtari-Packages/virtari-design-system"],
  [/Proprietary\. See \[LICENSE\]\(\.\/LICENSE\)\./g, "[MIT](./LICENSE) © 2026 Virtari."],
  [/License: Proprietary \(UNLICENSED on npm\)\. Internal use only\./g, "License: MIT."],
  [/This is proprietary software\. By contributing you assign copyright of your contributions to the project owner, under the terms of the repository's \[LICENSE\]\(\.\/LICENSE\)\./g, "Contributions are accepted under the repository's [MIT License](./LICENSE)."],
];

for (const relativePath of maintainedTextFiles) {
  const filePath = path.join(root, relativePath);
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;
  for (const [pattern, replacement] of replacements) content = content.replace(pattern, replacement);
  if (writeMode && content !== original) fs.writeFileSync(filePath, content);
  if (!writeMode && /proprietary|UNLICENSED|SEE LICENSE IN LICENSE|IamMrTrick\/virtari-design-system/i.test(content)) {
    failures.push(`${relativePath} contains stale license or repository language.`);
  }
}

if (writeMode) {
  console.log(`[license] synchronized ${manifestPaths.length} manifests and ${packageDirs.length} package licenses.`);
} else if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
} else {
  console.log(`[license] verified MIT metadata for ${manifestPaths.length} manifests and ${packageDirs.length} packages.`);
}
