/**
 * Sync LICENSE and README.md across every publishable package.
 *
 * - LICENSE: always overwritten from the root LICENSE so all packages ship the
 *   same proprietary notice.
 * - README.md: regenerated from the starter template below. Any existing
 *   hand-written README listed in KEEP_README is preserved verbatim.
 *
 * Run: `node scripts/sync-package-docs.mjs`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PACKAGES_DIR = path.join(ROOT, "packages");
const ROOT_LICENSE = path.join(ROOT, "LICENSE");

const REPO_URL = "https://github.com/IamMrTrick/virtari-design-system";
const REGISTRY = "https://npm.pkg.github.com";

/** Directory names under packages/ whose READMEs you do not want auto-regenerated. */
const KEEP_README = new Set(["react-date-picker"]);

function readPkg(dir) {
  const p = path.join(dir, "package.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function hasCssExport(pkg) {
  const exp = pkg.exports;
  if (!exp) return false;
  if (typeof exp === "string") return exp.endsWith(".css");
  return Object.values(exp).some((v) => {
    if (typeof v === "string") return v.endsWith(".css");
    if (v && typeof v === "object") return JSON.stringify(v).includes('.css"');
    return false;
  });
}

function readmeFor(pkg) {
  const name = pkg.name;
  const desc = pkg.description ?? "";
  const cssNote = hasCssExport(pkg)
    ? `\n### Import styles\n\n\`\`\`ts\nimport "${name}/styles";\n\`\`\`\n\nStyles sit in the \`design-system.components\` cascade layer so your app can override them without \`!important\`.\n`
    : "";

  return `# ${name}

${desc}

> **Private package.** Published to GitHub Packages and consumable only with a GitHub Personal Access Token that has \`read:packages\` scope. See [Install from GitHub Packages](#install-from-github-packages) below.

---

## Install from GitHub Packages

Create or edit \`.npmrc\` at the root of the consuming project:

\`\`\`ini
@virtari-packages:registry=${REGISTRY}
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
\`\`\`

Export a token with \`read:packages\` permission (locally or in CI):

\`\`\`bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
\`\`\`

Then install as you would any scoped package:

\`\`\`bash
npm install ${name}
# or
pnpm add ${name}
# or
yarn add ${name}
\`\`\`

## Peer dependencies

\`react\` \`^18\` or \`^19\`, alongside \`react-dom\`.

## Usage

\`\`\`tsx
import { /* … */ } from "${name}";
\`\`\`
${cssNote}
## Design tokens

This package reads \`@virtari-packages/tokens\` CSS variables. Import the token layer once at the root of your app:

\`\`\`ts
import "@virtari-packages/tokens";
\`\`\`

Override any \`--vds-*\` custom property at \`:root\` (or a subtree) to retheme.

## Accessibility & RTL

All components use logical CSS properties (\`margin-inline\`, \`padding-block\`, …) and \`:dir(rtl)\` overrides where logical props cannot express the rule. Layouts flip automatically when the host document sets \`dir="rtl"\`.

## Links

- [Repository](${REPO_URL})
- [Issues](${REPO_URL}/issues)
- [Changelog](./CHANGELOG.md)

## License

Proprietary. See [LICENSE](./LICENSE).
`;
}

function main() {
  if (!fs.existsSync(ROOT_LICENSE)) {
    console.error("Root LICENSE missing. Create it first.");
    process.exit(1);
  }
  const licenseContents = fs.readFileSync(ROOT_LICENSE, "utf8");

  const entries = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory());

  let licenseCount = 0;
  let readmeCount = 0;

  for (const entry of entries) {
    const dir = path.join(PACKAGES_DIR, entry.name);
    const pkg = readPkg(dir);
    if (!pkg || !pkg.name) continue;

    fs.writeFileSync(path.join(dir, "LICENSE"), licenseContents);
    licenseCount++;

    if (!KEEP_README.has(entry.name)) {
      fs.writeFileSync(path.join(dir, "README.md"), readmeFor(pkg));
      readmeCount++;
    }
  }

  console.log(`[docs] synced ${licenseCount} LICENSE files, ${readmeCount} READMEs.`);
}

main();
