/**
 * Copy the root LICENSE into every publishable package, and drop a starter
 * README.md where one doesn't exist yet. Existing READMEs are left alone so
 * hand-written docs survive.
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
  const short = name.replace(/^@virtari\//, "");
  const desc = pkg.description ?? "";
  const cssNote = hasCssExport(pkg)
    ? `\n### Import styles\n\n\`\`\`ts\nimport "${name}/styles";\n\`\`\`\n\nStyles are written in the \`design-system.components\` CSS layer so they compose with your app's cascade.\n`
    : "";

  return `# ${name}

${desc}

---

## Install

\`\`\`bash
npm install ${name}
# or
pnpm add ${name}
# or
yarn add ${name}
\`\`\`

## Peer dependencies

Requires \`react\` \`^18\` or \`^19\` alongside \`react-dom\`.

## Usage

\`\`\`tsx
import { /* ... */ } from "${name}";
\`\`\`
${cssNote}
## Design tokens

This package reads from \`@virtari/tokens\` CSS variables. Import the token layer once at the root of your app:

\`\`\`ts
import "@virtari/tokens";
\`\`\`

Every visual primitive can be themed by overriding \`--vds-*\` custom properties.

## Accessibility & RTL

All components use logical CSS properties (\`margin-inline\`, \`padding-block\`, …) and \`:dir(rtl)\` overrides, so layouts flip automatically when the host document sets \`dir="rtl"\`.

## License

[MIT](./LICENSE) © Virtari

## Links

- [Repository](${REPO_URL})
- [Issues](${REPO_URL}/issues)
- [Changelog](./CHANGELOG.md)
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

  let license = 0;
  let readme = 0;

  for (const entry of entries) {
    const dir = path.join(PACKAGES_DIR, entry.name);
    const pkg = readPkg(dir);
    if (!pkg || !pkg.name) continue;

    const licensePath = path.join(dir, "LICENSE");
    if (!fs.existsSync(licensePath)) {
      fs.writeFileSync(licensePath, licenseContents);
      license++;
    }

    const readmePath = path.join(dir, "README.md");
    if (!fs.existsSync(readmePath)) {
      fs.writeFileSync(readmePath, readmeFor(pkg));
      readme++;
    }
  }

  console.log(`[docs] wrote ${license} LICENSE files, ${readme} starter READMEs.`);
}

main();
