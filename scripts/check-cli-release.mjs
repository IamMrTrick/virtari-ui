import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rootLicense = await readFile(path.join(root, "LICENSE"), "utf8");
const cliLicense = await readFile(path.join(root, "packages/cli/LICENSE"), "utf8");
const manifest = JSON.parse(await readFile(path.join(root, "packages/cli/package.json"), "utf8"));
const failures = [];

if (rootLicense !== cliLicense) failures.push("packages/cli/LICENSE must match the repository LICENSE.");
if (/proprietary|unauthorized copying|all rights reserved/i.test(rootLicense)) failures.push("The current license does not grant the copy and modification rights promised by source-owned distribution.");
if (manifest.name !== "virtari") failures.push("The public CLI package name must remain virtari.");
if (manifest.repository?.url !== "git+https://github.com/Virtari-Packages/virtari-design-system.git") failures.push("The npm repository URL must exactly identify the publishing GitHub repository.");
const tag = process.env.GITHUB_REF_NAME;
if (tag?.startsWith("cli-v") && tag !== `cli-v${manifest.version}`) failures.push(`Tag ${tag} does not match CLI version ${manifest.version}.`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Virtari CLI ${manifest.version} is eligible for public publication.`);
}
