/**
 * Normalize metadata across every publishable package.
 *
 * Writes sensible defaults for `description`, `license`, `author`,
 * `repository`, `homepage`, `bugs`, `keywords`, `publishConfig`, and
 * `sideEffects`. Existing values are preserved — this only fills gaps.
 *
 * `publishConfig` is wired to GitHub Packages (private, per-account/org).
 *
 * Run: `node scripts/add-package-metadata.mjs`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PACKAGES_DIR = path.join(ROOT, "packages");

const REPO_URL = "https://github.com/IamMrTrick/virtari-design-system";
const AUTHOR = "Virtari";
const LICENSE = "UNLICENSED";
const GH_REGISTRY = "https://npm.pkg.github.com";

/** Per-package short descriptions. Any package not listed falls back to auto. */
const DESCRIPTIONS = {
  core: "Base reset, layers, and global primitives for the Virtari design system.",
  tokens: "Design tokens (colors, spacing, typography, radii, shadows, motion) as CSS variables.",
  utils: "Small internal helpers shared across Virtari React packages.",
  utilities: "Utility CSS classes (spacing, sizing, layout, z-index) driven by Virtari tokens.",
};

const KEYWORDS_BASE = ["virtari", "design-system", "react", "ui", "components"];

function baseName(name) {
  return name.replace(/^@[^/]+\//, "").replace(/^react-/, "");
}

function describe(pkgName) {
  const short = baseName(pkgName);
  if (DESCRIPTIONS[short]) return DESCRIPTIONS[short];
  const pretty = short.replace(/-/g, " ");
  return `Virtari ${pretty} — accessible React component built on CSS variables and logical properties.`;
}

function keywordsFor(pkgName) {
  const short = baseName(pkgName);
  const extra = short.split("-").filter((w) => w && !KEYWORDS_BASE.includes(w));
  return [...new Set([...KEYWORDS_BASE, ...extra])];
}

function relDir(dir) {
  return path.relative(ROOT, dir).split(path.sep).join("/");
}

function sortKeys(obj, order) {
  const ordered = {};
  for (const key of order) {
    if (key in obj) ordered[key] = obj[key];
  }
  for (const key of Object.keys(obj)) {
    if (!(key in ordered)) ordered[key] = obj[key];
  }
  return ordered;
}

const KEY_ORDER = [
  "name",
  "version",
  "description",
  "license",
  "author",
  "homepage",
  "repository",
  "bugs",
  "keywords",
  "type",
  "sideEffects",
  "exports",
  "files",
  "publishConfig",
  "scripts",
  "dependencies",
  "peerDependencies",
  "peerDependenciesMeta",
  "devDependencies",
];

function updatePackage(pkgDir) {
  const pkgJsonPath = path.join(pkgDir, "package.json");
  if (!fs.existsSync(pkgJsonPath)) return null;
  const raw = fs.readFileSync(pkgJsonPath, "utf8");
  const pkg = JSON.parse(raw);
  const dirName = path.basename(pkgDir);

  if (!pkg.name) return null;

  pkg.description ??= describe(pkg.name);
  pkg.license = LICENSE;
  pkg.author ??= AUTHOR;
  pkg.homepage ??= `${REPO_URL}/tree/main/packages/${dirName}#readme`;
  pkg.repository = {
    type: "git",
    url: `git+${REPO_URL}.git`,
    directory: `packages/${dirName}`,
  };
  pkg.bugs ??= { url: `${REPO_URL}/issues` };
  pkg.keywords = [...new Set([...(pkg.keywords ?? []), ...keywordsFor(pkg.name)])];

  pkg.publishConfig = {
    access: "restricted",
    registry: GH_REGISTRY,
  };

  if (pkg.files && Array.isArray(pkg.files)) {
    const files = new Set(pkg.files);
    files.add("README.md");
    files.add("LICENSE");
    pkg.files = [...files];
  }

  const sorted = sortKeys(pkg, KEY_ORDER);
  fs.writeFileSync(pkgJsonPath, JSON.stringify(sorted, null, 2) + "\n");
  return pkg.name;
}

function main() {
  const entries = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(PACKAGES_DIR, e.name));

  let count = 0;
  for (const dir of entries) {
    const name = updatePackage(dir);
    if (name) {
      count++;
      console.log(`  ✓ ${name}  (${relDir(dir)})`);
    }
  }
  console.log(`\n[metadata] normalized ${count} package manifests.`);
}

main();
