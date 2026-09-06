import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

const entry = fileURLToPath(new URL('../dist/server.mjs', import.meta.url));
const snapshot = JSON.parse(fs.readFileSync(new URL('../dist/data/catalog.json', import.meta.url), 'utf8'));
const sourceSnapshot = JSON.parse(fs.readFileSync(new URL('../dist/data/sources.json', import.meta.url), 'utf8'));
const payload = result => {
  assert.ok(!result.isError, JSON.stringify(result));
  assert.deepEqual(JSON.parse(result.content[0].text), result.structuredContent);
  return result.structuredContent;
};

for (const era of ['legacy', 'modern']) test(`Official client STDIO: ${era}, outside repository cwd`, { timeout: 30000 }, async t => {
  const client = new Client({ name: 'virtari-transport-test', version: '1.0.0' }, { versionNegotiation: { mode: era === 'modern' ? { pin: '2026-07-28' } : 'legacy' } });
  const transport = new StdioClientTransport({ command: process.execPath, args: [entry], cwd: os.tmpdir(), stderr: 'pipe' });
  const diagnostics = [];
  transport.stderr?.on('data', data => diagnostics.push(data.toString()));
  t.after(async () => { await client.close(); assert.equal(diagnostics.join(''), '', 'No startup errors on stderr'); });
  await client.connect(transport);
  assert.equal(client.getProtocolEra(), era);
  assert.equal(client.getServerVersion().name, 'virtari-design-system');
  assert.equal(Boolean(client.getDiscoverResult()), era === 'modern');
  const tools = await client.listTools();
  assert.deepEqual(tools.tools.map(tool => tool.name).sort(), ['get_record', 'list_records', 'read_source']);
  for (const tool of tools.tools) {
    assert.equal(tool.annotations.readOnlyHint, true);
    assert.equal(tool.annotations.openWorldHint, false);
    assert.equal(tool.inputSchema.type, 'object');
    assert.ok(tool.outputSchema);
  }

  await t.test('all collections enumerate without duplicates or lost final page', async () => {
    for (const collection of ['packages', 'sections', 'tokens', 'utilities', 'examples', 'sources']) {
      const first = payload(await client.callTool({ name: 'list_records', arguments: { collection, limit: 7 } }));
      assert.equal(first.total, snapshot[collection].length);
      assert.equal(first.items.length, Math.min(7, first.total));
      assert.equal(first.nextOffset, first.total > 7 ? 7 : null);
      const last = payload(await client.callTool({ name: 'list_records', arguments: { collection, offset: Math.max(0, first.total - 3), limit: 7 } }));
      assert.equal(last.nextOffset, null);
      assert.deepEqual(last.items.map(item => item.id), snapshot[collection].slice(-3).map(item => item.id));
    }
    const ids = [];
    let offset = 0;
    do {
      const page = payload(await client.callTool({ name: 'list_records', arguments: { collection: 'packages', offset, limit: 13 } }));
      ids.push(...page.items.map(item => item.id));
      offset = page.nextOffset;
    } while (offset !== null);
    assert.deepEqual(ids, snapshot.packages.map(pkg => pkg.id));
  });

  await t.test('search, category, package membership and exact record contract', async () => {
    const search = payload(await client.callTool({ name: 'list_records', arguments: { collection: 'packages', query: 'react-input' } }));
    assert.ok(search.items.some(item => item.id === 'react-input'));
    const fields = payload(await client.callTool({ name: 'list_records', arguments: { collection: 'packages', category: 'forms' } }));
    assert.ok(fields.items.every(item => item.category === 'forms'));
    const record = payload(await client.callTool({ name: 'get_record', arguments: { collection: 'packages', id: 'react-input' } }));
    assert.deepEqual(record.record, snapshot.packages.find(pkg => pkg.id === 'react-input'));
    const examples = payload(await client.callTool({ name: 'list_records', arguments: { collection: 'examples', packageId: 'react-input' } }));
    assert.ok(examples.total > 0);
    assert.ok(examples.items.every(item => item.packageIds.includes('react-input')));
    const empty = payload(await client.callTool({ name: 'list_records', arguments: { collection: 'packages', query: 'no-such-virtari-component-9876' } }));
    assert.equal(empty.total, 0);
    assert.equal(empty.nextOffset, null);
  });

  await t.test('chunks reconstruct exact Unicode source with explicit end metadata', async () => {
    const id = 'packages/react-input/src/index.ts';
    let text = '', offset = 0;
    do {
      const part = payload(await client.callTool({ name: 'read_source', arguments: { id, offset, length: 17 } }));
      assert.equal(part.offset, offset);
      assert.equal(part.length, part.text.length);
      text += part.text;
      offset = part.nextOffset;
    } while (offset !== null);
    assert.equal(text, sourceSnapshot[id]);
    const end = payload(await client.callTool({ name: 'read_source', arguments: { id, offset: text.length + 10 } }));
    assert.equal(end.text, '');
    assert.equal(end.nextOffset, null);
  });

  await t.test('reject malformed requests and arbitrary paths without crashing', async () => {
    for (const [name, args] of [
      ['list_records', { collection: 'packages', limit: 51 }],
      ['list_records', { collection: 'packages', offset: -1 }],
      ['list_records', { collection: 'packages', packageId: '../../private' }],
      ['list_records', { collection: '__proto__' }],
      ['list_records', { collection: 'packages', extra: true }],
      ['get_record', { collection: 'packages', id: 'constructor' }],
      ['get_record', { collection: 'sources', id: '../package.json' }],
      ['read_source', { id: 'C:/Windows/win.ini' }],
      ['read_source', { id: '__proto__' }],
      ['read_source', { id: 'https://example.com/private' }],
      ['read_source', { id: 'packages/react-input/src/index.ts', length: 32001 }],
      ['read_source', { id: 'packages/react-input/src/index.ts', offset: 0.5 }],
    ]) {
      const result = await client.callTool({ name, arguments: args });
      assert.equal(result.isError, true, JSON.stringify({ name, args, result }));
    }
    const ok = payload(await client.callTool({ name: 'get_record', arguments: { collection: 'packages', id: 'react-button' } }));
    assert.equal(ok.record.id, 'react-button');
  });

  await t.test('resource discovery, encoded IDs, source chunks and prompt validation', async () => {
    const resources = await client.listResources();
    assert.ok(resources.resources.some(resource => resource.uri === 'virtari://catalog'));
    const summary = JSON.parse((await client.readResource({ uri: 'virtari://catalog' })).contents[0].text);
    assert.equal(summary.collections.packages, snapshot.packages.length);
    const templates = await client.listResourceTemplates();
    assert.equal(templates.resourceTemplates.length, 2);
    const id = 'packages/react-input/src/index.ts';
    const resource = await client.readResource({ uri: `virtari://record/sources/${encodeURIComponent(id)}` });
    assert.equal(JSON.parse(resource.contents[0].text).record.id, id);
    const chunk = await client.readResource({ uri: `virtari://source/${encodeURIComponent(id)}/0/20` });
    assert.equal(JSON.parse(chunk.contents[0].text).text, sourceSnapshot[id].slice(0, 20));
    await assert.rejects(client.readResource({ uri: 'virtari://source/..%2Fprivate/0/20' }));
    await assert.rejects(client.readResource({ uri: `virtari://source/${encodeURIComponent(id)}/0/32001` }));
    const prompts = await client.listPrompts();
    assert.deepEqual(prompts.prompts.map(prompt => prompt.name).sort(), ['virtari_build', 'virtari_review']);
    const prompt = await client.getPrompt({ name: 'virtari_build', arguments: { task: 'Build a login form', packageId: 'react-input' } });
    assert.equal(prompt.messages[0].role, 'user');
    assert.match(prompt.messages[0].content.text, /react-input/);
    await assert.rejects(client.getPrompt({ name: 'virtari_review', arguments: {} }));
    await assert.rejects(client.getPrompt({ name: 'virtari_review', arguments: { task: 'Review', packageId: '../private' } }));
  });
});
