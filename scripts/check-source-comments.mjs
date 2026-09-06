import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scanRoots = [path.join(root, "packages"), path.join(root, "scripts")];
const extensions = new Set([".css", ".js", ".mjs", ".ts", ".tsx"]);
const ignoredDirectories = new Set(["dist", "node_modules"]);
const writeMode = process.argv.includes("--write");
const failures = [];

function collect(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) collect(filePath, files);
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(filePath);
    }
  }
  return files;
}

function lineAt(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

for (const filePath of scanRoots.flatMap((directory) => collect(directory))) {
  let source = fs.readFileSync(filePath, "utf8");
  const relativePath = path.relative(root, filePath).replaceAll("\\", "/");

  if (writeMode) {
    source = source.replace(/\/\*(?!\*)[\s\S]*?\*\//g, (comment) => {
      if (comment.split(/\r?\n/).length <= 20) return comment;
      const heading = comment
        .split(/\r?\n/)
        .map((line) => line.replace(/^\s*\/\*+|\*\/\s*$|^\s*\*\s?/g, "").replace(/[─━═]+/g, "").trim())
        .find(Boolean);
      return heading ? `/* ${heading} */` : "";
    });
    fs.writeFileSync(filePath, source);
  }

  const comments = [...source.matchAll(/\/\*[\s\S]*?\*\//g)].map((match) => ({
    body: match[0],
    index: match.index,
    jsdoc: match[0].startsWith("/**"),
  }));

  for (const match of source.matchAll(/^\s*\/\/.*$/gm)) {
    comments.push({ body: match[0], index: match.index, jsdoc: false });
  }

  for (const comment of comments) {
    const line = lineAt(source, comment.index);
    if (/\b(?:TODO|FIXME|HACK|XXX)\b/.test(comment.body)) {
      failures.push(`${relativePath}:${line} contains a temporary work marker.`);
    }
    if (/\b(?:as requested|user asked|you asked|I added|we added|current task|quick fix)\b/i.test(comment.body)) {
      failures.push(`${relativePath}:${line} contains conversational implementation history.`);
    }
    if (!comment.jsdoc && comment.body.split(/\r?\n/).length > 20) {
      failures.push(`${relativePath}:${line} has a non-API comment longer than 20 lines.`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(writeMode ? "[comments] normalized long implementation comments." : "[comments] source comments are concise and production-focused.");
