import fs from 'node:fs';
import { loadKnowledge } from '../src/knowledge.mjs';

const root = new URL('../../../', import.meta.url);
const data = new URL('ai/', root);
loadKnowledge(data);
const output = new URL('../dist/', import.meta.url);
fs.mkdirSync(new URL('data/', output), { recursive: true });
for (const file of ['server.mjs', 'knowledge.mjs']) fs.copyFileSync(new URL(`../src/${file}`, import.meta.url), new URL(file, output));
for (const file of ['catalog.json', 'sources.json']) fs.copyFileSync(new URL(file, data), new URL(`data/${file}`, output));
fs.chmodSync(new URL('server.mjs', output), 0o755);
console.log('Built portable Virtari MCP entry and verified catalog/source snapshot.');
