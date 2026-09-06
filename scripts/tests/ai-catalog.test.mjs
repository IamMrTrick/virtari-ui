import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import postcss from 'postcss';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/\r\n/g,'\n');
const catalog=JSON.parse(read('ai/catalog.json'));
const sources=JSON.parse(read('ai/sources.json'));
function files(dir) {return fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(`${dir}/${e.name}`):[`${dir}/${e.name}`]);}

test('every workspace design-system package has reviewed guidance and valid relations',()=>{
  const packageIds=fs.readdirSync(path.join(root,'packages')).filter(p=>fs.existsSync(path.join(root,'packages',p,'package.json'))).sort();
  assert.deepEqual(catalog.packages.map(p=>p.id).sort(),packageIds);
  for(const p of catalog.packages) {
    assert.notEqual(p.category,'pending',p.id);
    assert.ok(p.guidance.length>=2,`${p.id}: missing real guidance`);
    assert.ok(p.pitfalls.length,`${p.id}: missing limitations`);
    assert.deepEqual(p.exports,JSON.parse(read(`packages/${p.id}/package.json`)).exports);
    for(const id of p.related) assert.ok(packageIds.includes(id),`${p.id} -> ${id}`);
    for(const id of p.sourceIds) assert.ok(Object.hasOwn(sources,id),id);
    for(const id of p.exampleIds) assert.ok(catalog.examples.some(e=>e.id===id&&e.packageIds.includes(p.id)),id);
  }
});

test('every snapshot source matches its source and digest, with portable IDs',()=>{
  assert.equal(catalog.sources.length,Object.keys(sources).length);
  for(const s of catalog.sources) {
    assert.ok(!s.id.includes('\\')&&!path.posix.isAbsolute(s.id)&&!s.id.split('/').includes('..'),s.id);
    assert.equal(sources[s.id],read(s.id),s.id);
    assert.equal(s.sha256,crypto.createHash('sha256').update(sources[s.id]).digest('hex'),s.id);
    assert.equal(s.bytes,Buffer.byteLength(sources[s.id]),s.id);
  }
});

test('all authored CSS custom property declarations are inventoried with scope and provenance',()=>{
  const expected=[];
  for(const s of catalog.sources.filter(s=>s.id.endsWith('.css')&&s.id.startsWith('packages/'))) {
    postcss.parse(sources[s.id]).walkDecls(/^--/,d=>expected.push(`${s.id}:${d.source.start.line}:${d.source.start.column}`));
  }
  assert.deepEqual(catalog.tokens.map(t=>t.id).sort(),expected.sort());
  assert.ok(catalog.tokens.some(t=>t.name==='--vds-space-4'));
  assert.ok(catalog.tokens.some(t=>t.name.startsWith('--vds-radius-')));
  assert.ok(catalog.tokens.some(t=>t.conditions.length));
});

test('all docs pages and every Section example remain available with complete page context',()=>{
  for(const p of files('apps/docs/src/pages').filter(p=>p.endsWith('.tsx'))) {
    const content=read(p),ast=ts.createSourceFile(p,content,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    const snippets=[];
    const walk=node=>{if(ts.isJsxElement(node)&&node.openingElement.tagName.getText()==='Section')snippets.push(node.getText());ts.forEachChild(node,walk);};
    walk(ast);
    const actual=catalog.examples.filter(e=>e.sourceId===p);
    assert.equal(actual.length,Math.max(1,snippets.length),p);
    assert.ok(Object.hasOwn(sources,p),p);
    if(snippets.length) assert.deepEqual(actual.map(e=>e.code),snippets,p);
    for(const e of actual) assert.ok(e.startLine>=1&&e.endLine>=e.startLine,p);
  }
});

test('skill metadata is discoverable, compact and all local Markdown links resolve',()=>{
  const skillFiles=files('ai/skills').filter(p=>p.endsWith('/SKILL.md'));
  assert.equal(skillFiles.length,catalog.packages.length+catalog.sections.length+1);
  for(const p of skillFiles) {
    const content=read(p),match=content.match(/^---\nname: ([^\n]+)\ndescription: (.+)\n---\n/);
    assert.ok(match,`${p}: invalid metadata`);
    const [,name,description]=match;
    assert.match(name,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(name.length<=64);
    assert.equal(name,path.posix.basename(path.posix.dirname(p)));
    const desc=JSON.parse(description.startsWith('"')?description:JSON.stringify(description));
    assert.ok(desc.length>20&&desc.length<=1024,p);
    assert.ok(content.split('\n').length<500,p);
    assert.ok(!content.includes('TODO'),p);
  }
  for(const p of files('ai/skills').filter(p=>p.endsWith('.md'))) {
    // Ignore source code examples: their links are data, not skill navigation.
    const plain=read(p).replace(/^(`{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm,'');
    for(const m of plain.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target=m[1]; if(/^(https?:|mailto:|#)/.test(target)) continue;
      const resolved=path.resolve(root,path.posix.dirname(p),target.split('#')[0]);
      assert.ok(resolved.startsWith(path.join(root,'ai','skills')+path.sep),`${p}: outside skill bundle ${target}`);
      assert.ok(fs.existsSync(resolved),`${p}: broken link ${target}`);
    }
  }
});

test('utility records are unique literal classes and cover responsive variants plus core helpers',()=>{
  const ids=catalog.utilities.map(u=>u.id);
  assert.equal(new Set(ids).size,ids.length);
  const base=catalog.utilities.filter(u=>!u.breakpoint&&u.className.startsWith('vds-u-'));
  for(const u of base) for(const bp of ['sm','md','lg','xl','2xl']) assert.ok(ids.includes(`${bp}:${u.id}`));
  for(const id of ['vds-sr-only','vds-visually-hidden','vds-not-sr-only']) assert.ok(ids.includes(id));
  assert.ok(!ids.includes('p-4'));
  const minWidth=catalog.utilities.find(u=>u.id==='vds-u-min-w-0');
  assert.equal(minWidth.declarations.at(-1).value,'0');
});

test('subpath APIs, dependency re-exports and callable utility signatures are discoverable',()=>{
  const editor=catalog.packages.find(p=>p.id==='react-editor');
  assert.ok(editor.publicSymbols.some(s=>s.entrypoint==='@virtari-packages/react-editor/core'));
  const icons=catalog.packages.find(p=>p.id==='react-icons');
  const dependency=icons.externalReexports.find(e=>e.module==='@tabler/icons-react');
  assert.ok(dependency.version);
  assert.ok(JSON.parse(sources[dependency.symbolsSourceId]).symbols.some(s=>s.name==='IconSearch'));
  assert.match(read('ai/skills/virtari-utils/references/api.md'),/function useHotkey\(/);
  assert.match(read('ai/skills/virtari-utils/references/api.md'),/function ariaKeyShortcuts\(/);
});

test('static documentation and UI use the same catalog snapshot',()=>{
  assert.deepEqual(JSON.parse(read('apps/docs/public/ai/catalog.json')),catalog);
  assert.deepEqual(JSON.parse(read('apps/docs/public/ai/sources.json')),sources);
  assert.deepEqual(JSON.parse(read('apps/docs/src/data/generatedUtilities.json')).utilities,catalog.utilities);
  assert.deepEqual(JSON.parse(read('apps/docs/src/data/generatedTokens.json')).tokens,catalog.tokens);
});
