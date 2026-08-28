/**
 * Mirror every emitted `.d.ts` to a matching `.d.cts`.
 *
 * A dual ESM/CJS package points its `require` condition at `*.d.cts`. `tsc`
 * emits only `.d.ts`, so without this step every `require()` consumer falls
 * back to `any`. The declaration bodies are identical for both module systems
 * — only the file extension TypeScript looks for differs — so a copy is
 * sufficient, and relative imports inside them resolve because every directory
 * ends up holding both variants.
 *
 * Usage: node scripts/emit-dual-dts.mjs <dist-dir>
 */
import { readdirSync, copyFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const target = resolve(process.argv[2] ?? "dist");

let copied = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path);
    } else if (entry.name.endsWith(".d.ts")) {
      copyFileSync(path, path.replace(/\.d\.ts$/, ".d.cts"));
      copied++;
    }
  }
}

try {
  statSync(target);
} catch {
  console.error(`emit-dual-dts: no such directory: ${target}`);
  process.exit(1);
}

walk(target);
console.log(`emit-dual-dts: wrote ${copied} .d.cts file${copied === 1 ? "" : "s"}`);
