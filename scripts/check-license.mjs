import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packagesDir = path.join(root, "packages");
const writeMode = process.argv.includes("--write");
const canonicalRepository = "git+https://github.com/itstheilya/virtari-ui.git";
const staleRepository = /IamMrTrick\/virtari-design-system/g;
const rootLicense = fs.readFileSync(path.join(root, "LICENSE"), "utf8");
const brandLicensePath = path.join(root, "BRAND_ASSETS_LICENSE.md");
const failures = [];
const normalizeEol = (value) => value.replace(/\r\n/g, "\n");

if (!/^MIT License\r?\n/.test(rootLicense) || !rootLicense.includes("Permission is hereby granted")) {
  failures.push("The root LICENSE is not the canonical MIT license.");
}
if (!fs.existsSync(brandLicensePath)) {
  failures.push("BRAND_ASSETS_LICENSE.md must define the proprietary Virtari artwork boundary.");
} else {
  const brandLicense = fs.readFileSync(brandLicensePath, "utf8");
  if (!brandLicense.includes("excluded from the repository's MIT License") || !brandLicense.includes("All rights reserved")) {
    failures.push("BRAND_ASSETS_LICENSE.md must preserve the proprietary brand-asset exception.");
  }
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
    manifest.repository = manifest.repository.replace(staleRepository, "itstheilya/virtari-ui");
  } else if (manifest.repository?.url) {
    manifest.repository.url = manifest.repository.url.replace(staleRepository, "itstheilya/virtari-ui");
  }
  if (typeof manifest.homepage === "string") {
    manifest.homepage = manifest.homepage.replace(staleRepository, "itstheilya/virtari-ui");
  }
  if (typeof manifest.bugs === "string") {
    manifest.bugs = manifest.bugs.replace(staleRepository, "itstheilya/virtari-ui");
  } else if (manifest.bugs?.url) {
    manifest.bugs.url = manifest.bugs.url.replace(staleRepository, "itstheilya/virtari-ui");
  }

  const expected = `${JSON.stringify(manifest, null, 2)}\n`;
  const matches = normalizeEol(original) === expected;
  if (writeMode && !matches) fs.writeFileSync(manifestPath, expected);
  if (!writeMode && !matches) failures.push(`${path.relative(root, manifestPath)} has stale license or repository metadata.`);
}

for (const dir of packageDirs) {
  const licensePath = path.join(dir, "LICENSE");
  const current = fs.existsSync(licensePath) ? fs.readFileSync(licensePath, "utf8") : "";
  const matches = normalizeEol(current) === normalizeEol(rootLicense);
  if (writeMode && !matches) fs.writeFileSync(licensePath, rootLicense);
  if (!writeMode && !matches) failures.push(`${path.relative(root, licensePath)} must match the root MIT license.`);
}

const maintainedTextFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "AGENT_GUIDE.md",
  "BRAND_ASSETS_LICENSE.md",
  "docs/source-registry.md",
  "scripts/add-package-metadata.mjs",
  "scripts/sync-package-docs.mjs",
  ...packageDirs.map((dir) => path.relative(root, path.join(dir, "README.md"))).filter((file) => fs.existsSync(path.join(root, file))),
];
const replacements = [
  [/IamMrTrick\/virtari-design-system/g, "itstheilya/virtari-ui"],
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
  if (!writeMode && /UNLICENSED|SEE LICENSE IN LICENSE|IamMrTrick\/virtari-design-system/i.test(content)) {
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
