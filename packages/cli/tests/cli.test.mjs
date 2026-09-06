import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(packageRoot, "../..");
const cli = path.join(packageRoot, "bin", "virtari.mjs");
const registry = path.join(repositoryRoot, "registry.json");

async function fixture(t) {
  const cwd = await mkdtemp(path.join(repositoryRoot, ".tmp-virtari-cli-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  await writeFile(path.join(cwd, "package.json"), '{"name":"fixture","private":true}\n');
  return cwd;
}

function run(cwd, args, expectedStatus = 0) {
  const result = spawnSync(process.execPath, [cli, ...args, "--cwd", cwd], { encoding: "utf8" });
  assert.equal(result.status, expectedStatus, result.stderr || result.stdout);
  return result;
}

test("init and add install type-safe editable source without internal package imports", async (t) => {
  const cwd = await fixture(t);
  run(cwd, ["init", "--registry", registry, "--no-install"]);
  run(cwd, ["add", "button", "--no-install"]);

  const button = await readFile(path.join(cwd, "src/virtari/components/button/Button.tsx"), "utf8");
  const buttonIndex = await readFile(path.join(cwd, "src/virtari/components/button/index.ts"), "utf8");
  const installedLicense = await readFile(path.join(cwd, "src/virtari/LICENSE"), "utf8");
  const config = JSON.parse(await readFile(path.join(cwd, "virtari.json"), "utf8"));
  const manifest = JSON.parse(await readFile(path.join(cwd, "package.json"), "utf8"));
  assert.equal(config.target, "src/virtari");
  assert.match(installedLicense, /^MIT License/);
  assert.match(button, /\.\.\/\.\.\/lib\/utils/);
  assert.doesNotMatch(button, /(?:from\s*|import\s*)["']@virtari-packages\//);
  assert.match(buttonIndex, /import "\.\/Button\.css"/);
  assert.equal(manifest.dependencies?.["@floating-ui/react-dom"], undefined);
  assert.equal(await readFile(path.join(cwd, "src/virtari/lib/primitives/slot/slot.tsx"), "utf8").then(() => true), true);

  await writeFile(path.join(cwd, "src/app.tsx"), 'import { Button } from "./virtari/components/button";\nexport const App = () => <Button>Continue</Button>;\n');
  await writeFile(path.join(cwd, "src/styles.d.ts"), 'declare module "*.css";\n');
  const reactTypes = path.join(repositoryRoot, "apps/docs/node_modules/@types/react").replace(/\\/g, "/");
  await writeFile(path.join(cwd, "tsconfig.json"), JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      jsx: "react-jsx",
      strict: true,
      skipLibCheck: true,
      noEmit: true,
      baseUrl: ".",
      paths: {
        react: [`${reactTypes}/index.d.ts`],
        "react/jsx-runtime": [`${reactTypes}/jsx-runtime.d.ts`]
      }
    },
    include: ["src"]
  }, null, 2));
  const typecheck = spawnSync(process.execPath, [path.join(repositoryRoot, "node_modules/typescript/bin/tsc"), "-p", path.join(cwd, "tsconfig.json")], { cwd: repositoryRoot, encoding: "utf8" });
  assert.equal(typecheck.status, 0, typecheck.stdout || typecheck.stderr);

  run(cwd, ["doctor"]);
});

test("diff detects consumer edits and add refuses to overwrite them", async (t) => {
  const cwd = await fixture(t);
  run(cwd, ["init", "--registry", registry, "--no-install"]);
  run(cwd, ["add", "button", "--no-install"]);
  const buttonPath = path.join(cwd, "src/virtari/components/button/Button.tsx");
  await writeFile(buttonPath, `${await readFile(buttonPath, "utf8")}\n// consumer edit\n`);

  const diff = run(cwd, ["diff", "button", "--json"]);
  assert.match(diff.stdout, /"status": "modified"/);
  const add = run(cwd, ["add", "button", "--no-install"], 1);
  assert.match(add.stderr, /Edited files would be overwritten/);
});

test("registry targets cannot escape the consumer project", async (t) => {
  const cwd = await fixture(t);
  const registryPath = path.join(cwd, "unsafe-registry.json");
  await writeFile(path.join(cwd, "payload.txt"), "payload");
  await writeFile(registryPath, JSON.stringify({ items: [{ name: "unsafe", type: "registry:item", files: [{ path: "payload.txt", type: "registry:file", target: "~/../outside.txt" }] }] }));
  await writeFile(path.join(cwd, "virtari.json"), JSON.stringify({ $schema: "local", target: "src/virtari", registry: registryPath }));
  const result = run(cwd, ["add", "unsafe", "--no-install"], 1);
  assert.match(result.stderr, /escapes the project/);

  await writeFile(registryPath, JSON.stringify({ items: [{ name: "unsafe", type: "registry:item", files: [{ path: "../payload.txt", type: "registry:file", target: "~/src/virtari/payload.txt" }] }] }));
  const sourceResult = run(cwd, ["add", "unsafe", "--no-install"], 1);
  assert.match(sourceResult.stderr, /Unsafe registry source path/);
});
