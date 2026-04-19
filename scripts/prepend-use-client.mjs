import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

export default async function prependUseClient(dir = "dist") {
  const target = resolve(dir);
  if (!existsSync(target)) return;
  const entries = await readdir(target);
  for (const name of entries) {
    if (!/\.(js|cjs|mjs)$/.test(name)) continue;
    const path = join(target, name);
    const content = await readFile(path, "utf8");
    if (content.startsWith('"use client"') || content.startsWith("'use client'")) continue;
    await writeFile(path, `"use client";\n${content}`);
  }
}
