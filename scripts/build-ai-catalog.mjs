import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import postcss from 'postcss';
import { rules, BREAKPOINTS } from '../packages/utilities/scripts/generate.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const outputs = new Map();
const read = p => fs.readFileSync(path.join(root, p), 'utf8').replace(/\r\n/g, '\n');
const exists = p => fs.existsSync(path.join(root, p));
const json = x => JSON.stringify(x, null, 2) + '\n';
const hash = x => crypto.createHash('sha256').update(x).digest('hex');
function files(dir) {
  if (!exists(dir)) return [];
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).sort((a,b) => a.name.localeCompare(b.name, 'en')).flatMap(e => e.isDirectory() ? files(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
}
const sources = {};
const source = id => { if (!(id in sources)) sources[id] = read(id); return id; };
const emit = (p, content) => outputs.set(p, typeof content === 'string' ? content : json(content));
const parse = id => ts.createSourceFile(id, sources[source(id)], ts.ScriptTarget.Latest, true, id.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
const authored = files('ai/authoring').filter(p => p.endsWith('.json')).map(p => JSON.parse(read(p)));
const guidance = authored.flatMap(x => x.packages ?? []);
const sections = authored.flatMap(x => x.sections ?? []);
function unique(records, label) {
  const seen = new Set();
  for (const x of records) { if (seen.has(x.id)) throw new Error(`Duplicate ${label}: ${x.id}`); seen.add(x.id); }
}
unique(guidance, 'authored package'); unique(sections, 'section');
const packages = [];
const types = new Map();
const dependencyIndexes=new Map();
function externalIndex(module,from) {
  if(dependencyIndexes.has(module)) return dependencyIndexes.get(module);
  const resolved=ts.resolveModuleName(module,path.join(root,from),{moduleResolution:ts.ModuleResolutionKind.Bundler},ts.sys).resolvedModule;
  if(!resolved) throw new Error(`Install dependencies before indexing re-exported module ${module}`);
  const ast=ts.createSourceFile(resolved.resolvedFileName,fs.readFileSync(resolved.resolvedFileName,'utf8'),ts.ScriptTarget.Latest,true);
  const symbols=[];
  for(const node of ast.statements) {
    if(ts.isExportDeclaration(node)&&node.exportClause&&ts.isNamedExports(node.exportClause)) for(const e of node.exportClause.elements) symbols.push({name:e.name.text,kind:node.isTypeOnly||e.isTypeOnly?'type':'export'});
    else if(node.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword)&&node.name?.text) symbols.push({name:node.name.text,kind:ts.isTypeAliasDeclaration(node)||ts.isInterfaceDeclaration(node)?'type':'export'});
  }
  const sourceId=`ai/dependencies/${module.replace(/^@/,'').replaceAll('/','-')}-exports.json`;
  const data={module,version:resolved.packageId?.version ?? null,symbols};
  sources[sourceId]=json(data); emit(sourceId,data);
  const result={module,version:data.version,symbolCount:symbols.length,symbolsSourceId:sourceId};
  dependencyIndexes.set(module,result);return result;
}
for (const id of fs.readdirSync(path.join(root, 'packages')).sort()) {
  if (!exists(`packages/${id}/package.json`)) continue;
  const pkg = JSON.parse(read(`packages/${id}/package.json`));
  const authoredPackage = guidance.find(x => x.id === id);
  if (!authoredPackage) throw new Error(`Missing authored guidance: ${id}`);
  const sourceIds = files(`packages/${id}/src`).filter(p => /\.(tsx?|css)$/.test(p));
  sourceIds.push(`packages/${id}/package.json`);
  if (exists(`packages/${id}/scripts/generate.mjs`)) sourceIds.push(`packages/${id}/scripts/generate.mjs`);
  sourceIds.forEach(source);
  const publicSymbols = [], externalReexports = [], declarations = [];
  const visitBarrel = (p, entrypoint, seen = new Set()) => {
    if (seen.has(p) || !exists(p)) return;
    seen.add(p);
    const ast = parse(p);
    for (const node of ast.statements) {
      if (ts.isExportDeclaration(node)) {
        if (node.exportClause && ts.isNamedExports(node.exportClause)) for (const e of node.exportClause.elements) publicSymbols.push({ name:e.name.text, kind:node.isTypeOnly || e.isTypeOnly ? 'type' : 'export', entrypoint, sourceId:p });
        else if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith('.')) {
          const stem = path.posix.normalize(path.posix.join(path.posix.dirname(p), node.moduleSpecifier.text));
          const target = [stem+'.ts',stem+'.tsx',stem+'/index.ts',stem+'/index.tsx'].find(exists);
          if (target) visitBarrel(target, entrypoint, seen);
        } else if (!node.exportClause && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
          externalReexports.push({...externalIndex(node.moduleSpecifier.text,p),entrypoint,sourceId:p});
        }
      } else if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
        if (node.name?.text) publicSymbols.push({ name:node.name.text, kind:ts.isTypeAliasDeclaration(node)||ts.isInterfaceDeclaration(node)?'type':'export',entrypoint,sourceId:p });
        if (ts.isVariableStatement(node)) for (const d of node.declarationList.declarations) if (ts.isIdentifier(d.name)) publicSymbols.push({name:d.name.text,kind:'export',entrypoint,sourceId:p});
      }
    }
  };
  const exportLeaves = value => typeof value==='string'?[value]:Object.values(value??{}).flatMap(exportLeaves);
  for (const [sub, target] of Object.entries(pkg.exports ?? {})) {
    const js=exportLeaves(target).find(p=>/\.(m?js)$/.test(p));
    if(!js) continue;
    const stem=`packages/${id}/`+js.replace(/^\.\/dist\//,'src/').replace(/\.(m?js)$/,'');
    const p=[stem+'.ts',stem+'.tsx'].find(exists);
    if(p) visitBarrel(p,sub==='.'?pkg.name:pkg.name+sub.slice(1));
  }
  for (const p of sourceIds.filter(p => /\.tsx?$/.test(p))) {
    for (const node of parse(p).statements) {
      if(!node.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword)) continue;
      if(ts.isInterfaceDeclaration(node)||ts.isTypeAliasDeclaration(node)) declarations.push({sourceId:p,code:node.getText()});
      if(ts.isFunctionDeclaration(node)) declarations.push({sourceId:p,code:node.body?node.getText().slice(0,node.body.getStart()-node.getStart()).trimEnd()+';':node.getText()});
    }
  }
  types.set(id,declarations);
  const symbolKeys = new Set();
  packages.push({id,name:pkg.name,version:pkg.version,category:authoredPackage?.category ?? 'pending',description:authoredPackage?.description ?? pkg.description ?? id,exports:pkg.exports,publicSymbols:publicSymbols.filter(s => {const k=s.entrypoint+':'+s.name;if(symbolKeys.has(k)) return false;symbolKeys.add(k);return true;}),externalReexports,sourceIds,exampleIds:[],guidance:authoredPackage?.guidance ?? [],pitfalls:authoredPackage?.pitfalls ?? [],related:authoredPackage?.related ?? [],skill:`ai/skills/virtari-${id}/SKILL.md`});
}
for (const p of guidance) if (!packages.some(x => x.id === p.id)) throw new Error(`Unknown authored package ${p.id}`);
for (const p of packages) for (const r of p.related) if (!packages.some(x => x.id === r)) throw new Error(`Unknown related package ${p.id} -> ${r}`);
for (const s of sections) {
  s.skill = `ai/skills/virtari-foundation-${s.id}/SKILL.md`;
  for (const p of s.sourcePaths) {if (!exists(p)) throw new Error(`Missing section source ${p}`); if (fs.statSync(path.join(root,p)).isFile()) source(p);}
}

const tokens = [];
for (const p of Object.keys(sources).filter(p => p.endsWith('.css'))) {
  const ast = postcss.parse(sources[p], { from:p });
  ast.walkDecls(/^--/, decl => {
    const ancestors = []; let parent = decl.parent;
    while (parent && parent.type !== 'root') {ancestors.unshift(parent); parent = parent.parent;}
    const selector = ancestors.filter(x => x.type === 'rule').map(x => x.selector).join(' ');
    const conditions = ancestors.filter(x => x.type === 'atrule').map(x => `@${x.name} ${x.params}`.trim());
    const category = p.startsWith('packages/tokens/') ? p.slice('packages/tokens/src/'.length).split('/')[0].replace('.css','') : 'component';
    tokens.push({id:`${p}:${decl.source.start.line}:${decl.source.start.column}`,name:decl.prop,value:decl.value,selector,conditions,category,sourceId:p,line:decl.source.start.line});
  });
}
const utilitySource = source('packages/utilities/scripts/generate.mjs');
const breakpointSource = read('packages/tokens/src/breakpoints.css');
const utilityCategory = declarations => {
  const p = declarations.map(x => x.property).join(' ');
  if (/margin|padding|gap/.test(p)) return 'spacing';
  if (/width|height|inline-size|block-size|aspect-ratio/.test(p)) return 'sizing';
  if (/font|text|line-height|letter-spacing|white-space|word|overflow-wrap/.test(p)) return 'typography';
  if (/background|color|opacity|border|shadow/.test(p)) return 'appearance';
  if (/overflow|scroll/.test(p)) return 'scroll';
  if (/position|inset|top|bottom|left|right|z-index/.test(p)) return 'position';
  if (/cursor|pointer|user-select|touch/.test(p)) return 'interaction';
  return 'layout';
};
const utilities = [];
for (const breakpoint of ['',...BREAKPOINTS]) for (const [name,css] of rules) {
  const declarations = [];
  postcss.parse(`x{${css}}`).walkDecls(d => declarations.push({property:d.prop,value:d.value}));
  const className = breakpoint ? `${breakpoint}:${name}` : name;
  const duplicate = utilities.find(u => u.id === className);
  if (duplicate) {
    // Preserve declaration order when the generator repeats a selector: later
    // declarations win in CSS (e.g. min-w-0 emits a literal zero after its token).
    duplicate.declarations.push(...declarations);
    continue;
  }
  const condition = breakpoint ? breakpointSource.match(new RegExp(`@custom-media\\s+--vds-${breakpoint}\\s+([^;]+)`))?.[1] ?? `(--vds-${breakpoint})` : null;
  utilities.push({id:className,className,category:utilityCategory(declarations),declarations,breakpoint:breakpoint||null,condition,sourceId:utilitySource});
}
const examples = [];
// Core ships three separate accessibility helpers; they are not responsive utilities.
postcss.parse(read('packages/core/src/utilities.css')).walkRules(rule => {
  for (const selector of rule.selectors) {
    const className=selector.trim().slice(1);
    if(!/^vds-[a-z-]+$/.test(className)) throw new Error(`Review complex core utility selector: ${selector}`);
    const declarations=[]; rule.walkDecls(d=>declarations.push({property:d.prop,value:d.value}));
    utilities.push({id:className,className,category:'accessibility',declarations,breakpoint:null,condition:null,sourceId:source('packages/core/src/utilities.css')});
  }
});
for (const p of files('apps/docs/src/pages').filter(p => /\.tsx$/.test(p))) {
  const ast = parse(p);
  const imports = ast.statements.filter(ts.isImportDeclaration).map(n => n.getText());
  const packageIds = packages.filter(pkg => ast.statements.some(n => ts.isImportDeclaration(n)&&ts.isStringLiteral(n.moduleSpecifier)&&(n.moduleSpecifier.text===pkg.name||n.moduleSpecifier.text.startsWith(pkg.name+'/')))).map(pkg=>pkg.id);
  const page = path.posix.basename(p,'.tsx').replace(/Page$/,'').replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase();
  let number = 0;
  function walk(node) {
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText() === 'Section') {
      number++;
      const attr = node.openingElement.attributes.properties.find(a => ts.isJsxAttribute(a)&&a.name.text==='title');
      const title = attr?.initializer ? (ts.isStringLiteral(attr.initializer) ? attr.initializer.text : attr.initializer.getText()) : `Example ${number}`;
      const line = ast.getLineAndCharacterOfPosition(node.getStart()).line+1;
      examples.push({id:`${page}/${number}`,title,page,packageIds,sourceId:p,startLine:line,endLine:ast.getLineAndCharacterOfPosition(node.end).line+1,code:node.getText(),imports});
    }
    ts.forEachChild(node,walk);
  }
  walk(ast);
  // Pages with custom/factory demos remain readable even without Section wrappers.
  if (!number) examples.push({id:`${page}/page`,title:`${page} page`,page,packageIds,sourceId:p,startLine:1,endLine:sources[p].split('\n').length,code:null,imports});
}
for (const p of files('apps/docs/src').filter(p => /\.(tsx?|css|json)$/.test(p)&&!p.includes('/data/generated'))) source(p);
for (const p of files('docs').filter(p => p.endsWith('.md'))) source(p);
for (const p of packages) p.exampleIds = examples.filter(x => x.packageIds.includes(p.id)).map(x=>x.id);
const bullet = items => items.map(x => `- ${x}`).join('\n');
const fence = (text,lang='') => `${'`'.repeat(Math.max(3,...Array.from(text.matchAll(/`+/g),m=>m[0].length+1)))}${lang}\n${text}\n${'`'.repeat(Math.max(3,...Array.from(text.matchAll(/`+/g),m=>m[0].length+1)))}`;
for (const p of packages) {
  const dir = path.posix.dirname(p.skill), name = path.posix.basename(dir);
  const entrypoints = Object.keys(p.exports ?? {}).map(k => k==='.' ? p.name : p.name+k.slice(1));
  const primaryPages = [...new Set(examples.filter(e => e.page === p.id.replace(/^react-/, '') || (p.id==='react-text' && e.page==='heading')).map(e=>e.sourceId))];
  emit(p.skill,`---\nname: ${name}\ndescription: ${JSON.stringify(`Use when building, reviewing, or troubleshooting ${p.name}. ${p.description}`.slice(0,1024))}\n---\n\n# ${p.name}\n\nUse the existing package and its composition API. Verify the installed version against this snapshot (${p.version}); do not invent exports or Tailwind classes.\n\n## Workflow\n\n1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.\n2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.\n3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.\n4. For complete repository context, use MCP \`get_record\` with collection \`packages\`, id \`${p.id}\`, then \`read_source\` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.\n5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.\n\n## Integration rules\n\n${bullet(p.guidance)}\n\n## Known limits and mistakes to avoid\n\n${bullet(p.pitfalls.length?p.pitfalls:['Check the source contracts before adding unsupported behavior.'])}\n\nRelated package IDs: ${p.related.map(r=>'`'+r+'`').join(', ') || 'none'}. Discover their focused skills from the catalog; do not load all packages at once.\n`);
  emit(`${dir}/references/api.md`,`# ${p.name} API snapshot\n\nVersion: ${p.version}. Export entry points (exact package.json map):\n\n${fence(JSON.stringify(p.exports ?? {},null,2),'json')}\n\nUse CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.\n\n## Public symbols\n\n${p.publicSymbols.length? p.publicSymbols.map(s=>`- \`${s.name}\` (${s.kind}) from \`${s.entrypoint}\`; source: \`${s.sourceId}\`.`).join('\n'):'This package has no inventoried JavaScript barrel exports; use its package export map.'}\n\n## Source type declarations\n\n${types.get(p.id).map(d=>`Source: \`${d.sourceId}\`\n\n${fence(d.code,'tsx')}`).join('\n\n')}\n\n## Source files\n\n${bullet(p.sourceIds.map(s=>'`'+s+'`'))}\n`);
  if(p.externalReexports.length) {
    outputs.set(`${dir}/references/api.md`,outputs.get(`${dir}/references/api.md`)+`\n## Dependency re-exports\n\nThis package also forwards dependency exports. Explicit local exports take precedence over export-star names. Read [dependency names](external-exports.md) only when selecting a forwarded symbol.\n`);
    emit(`${dir}/references/external-exports.md`,p.externalReexports.map(e=>`## ${e.module} ${e.version}\n\nForwarded by \`${e.entrypoint}\`; ${e.symbolCount} dependency names. MCP source ID: \`${e.symbolsSourceId}\`.\n\n${fence(sources[e.symbolsSourceId],'json')}`).join('\n\n'));
  }
  const exampleLinks = primaryPages.map(s => {const dest=`examples/${path.posix.basename(s)}.md`; emit(`${dir}/references/${dest}`,`# Original documentation page\n\nSource ID: \`${s}\`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.\n\n${fence(sources[s],'tsx')}\n`); return `- [${path.posix.basename(s)}](${dest})`;});
  emit(`${dir}/references/examples.md`,`# Existing examples\n\n${exampleLinks.join('\n') || 'No dedicated page matches this package. Use the catalog-linked examples below and retrieve their full source via MCP or the repository.'}\n\nAll documentation sections importing this package (some demonstrate another package):\n\n${bullet(examples.filter(e=>e.packageIds.includes(p.id)).map(e=>`\`${e.id}\` — ${e.title}; source \`${e.sourceId}\` lines ${e.startLine}–${e.endLine}.`))}\n\nMCP: \`get_record({collection:"examples",id:"<example ID>"})\`; then \`read_source\` for full page context. A section fragment may reference imports, state, helper components, assets, docs CSS or shared page scaffolding.\n`);
  const designDocs=['docs/design-language.md','docs/surface-styles.md','docs/nested-surfaces.md','docs/radius-audit.md','docs/component-quality.md','docs/source-registry.md'].filter(exists);
  emit(`${dir}/references/design.md`,`# Shared design contracts\n\nRead only the contract relevant to your change:\n\n${designDocs.map(s=>`- [${path.posix.basename(s)}](${path.posix.basename(s)})`).join('\n')}\n`);
  for(const s of designDocs) emit(`${dir}/references/${path.posix.basename(s)}`,read(s));
}
for (const s of sections) {
  const dir=path.posix.dirname(s.skill), name=path.posix.basename(dir);
  emit(s.skill,`---\nname: ${name}\ndescription: ${JSON.stringify(`Use when implementing or reviewing Virtari ${s.name}. ${s.description}`.slice(0,1024))}\n---\n\n# ${s.name}\n\n${s.description}\n\n${bullet(s.guidance)}\n\n## Pitfalls\n\n${bullet(s.pitfalls)}\n\nRead [source reference](references/source.md) for exact definitions. Query MCP \`list_records\` in \`tokens\` or \`utilities\` for filtered, paginated inventory; use \`get_record\` for this section ID \`${s.id}\`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.\n`);
  const paths=s.sourcePaths.flatMap(p=>fs.statSync(path.join(root,p)).isDirectory()?files(p):[p]).filter(p=>/\.(css|md|mjs|tsx?|json)$/.test(p));
  paths.forEach(source);
  emit(`${dir}/references/source.md`,paths.map(p=>`## ${p}\n\n${fence(sources[p],p.endsWith('.css')?'css':p.endsWith('.md')?'md':'tsx')}`).join('\n\n'));
  if(s.id==='css-utilities') {
    outputs.set(s.skill,outputs.get(s.skill)+`\nRead [exact base classes](references/classes.md) for the finite utility inventory and owning stylesheets.\n`);
    emit(`${dir}/references/classes.md`,`# Exact base classes\n\nImport the owning stylesheet: accessibility helpers use core; vds-u-* classes use utilities. Responsive versions apply only to vds-u-* classes.\n\n| Class | Category | Declarations |\n| --- | --- | --- |\n${utilities.filter(u=>!u.breakpoint).map(u=>`| \`${u.className}\` | ${u.category} | ${u.declarations.map(d=>'`'+d.property+': '+d.value+'`').join('; ')} |`).join('\n')}\n`);
  }
}
const routerDir='ai/skills/virtari-design-system';
emit(`${routerDir}/SKILL.md`,`---\nname: virtari-design-system\ndescription: Use when starting a UI with Virtari Design System, choosing its packages, or locating its design tokens, utilities, examples and package skills.\n---\n\n# Work with Virtari\n\n1. Identify the task: composition, component behavior, tokens, utilities or an existing UI review. Read [package and section index](references/index.md), then load only the relevant skill.\n2. With MCP, call \`list_records\` to search packages or sections. Call \`get_record\` for selected IDs, then \`read_source\` when types, behavior or full example context are needed. Follow pagination until the needed information is found.\n3. Without MCP, open the referenced skills in this bundle or read \`ai/catalog.json\` and the corresponding source files in the repository. Install/copy focused skills with their references directory, not SKILL.md alone.\n4. If the application has \`virtari.json\`, treat its local target as authoritative source: import components from that tree and import its \`styles/index.css\` once. Do not add \`@virtari-packages/*\` runtime imports to a source-owned app. Otherwise, load \`@virtari-packages/core\` before tokens and package styles, following exact export maps.\n5. Compose existing components with public props. Use semantic token roles and exact generated vds-u-* classes. The utilities package has no arbitrary-value or Tailwind parser.\n6. Adapt real examples with their state, helper components and imports. A documentation Section is a wrapper, not a standalone application. Check accessibility, form serialization, focus, keyboard, RTL, surfaces and nested shape for the actual composition.\n\nThe snapshot documents existing limitations in each package's pitfalls. Do not claim a limitation is fixed merely because its usage is documented. Match the installed package or local registry revision; regenerate knowledge and the source registry after authoritative source changes.\n`);
emit(`${routerDir}/references/index.md`,`# Discovery index\n\nThese paths are relative to the skill bundle root (ai/skills in a repository checkout). Select matching skills in your host; this index does not require every skill to be loaded or installed.\n\n## Packages\n\n${packages.map(p=>`- \`virtari-${p.id}/SKILL.md\` — ${p.description}`).join('\n')}\n\n## Foundations\n\n${sections.map(s=>`- \`${path.posix.relative('ai/skills',s.skill)}\` — ${s.description}`).join('\n')}\n`);
const sourceRecords = Object.keys(sources).sort().map(id=>({id,sha256:hash(sources[id]),bytes:Buffer.byteLength(sources[id]),kind:id.split('.').pop()}));
const catalog = {schemaVersion:1,packages,sections,tokens,utilities,examples,sources:sourceRecords};
for (const [key, records] of Object.entries(catalog)) if(Array.isArray(records)) unique(records,key);
emit('ai/catalog.json',catalog);
emit('ai/sources.json',Object.fromEntries(Object.entries(sources).sort(([a],[b])=>a.localeCompare(b,'en'))));
emit('apps/docs/src/data/generatedUtilities.json',{schemaVersion:1,breakpoints:BREAKPOINTS,utilities});
emit('apps/docs/src/data/generatedTokens.json',{schemaVersion:1,tokens});
emit('apps/docs/public/llms.txt',`# Virtari Design System\n\nRepository-generated reference for the current Virtari packages. Read individual skills and sources instead of loading the entire catalog.\n\n- [AI setup and index](/ai/index.md)\n- [Catalog](/ai/catalog.json)\n- [Source text by catalog ID](/ai/sources.json)\n- [Standards and compatibility](/ai/standards.md)\n\n## Packages\n\n${packages.map(p=>`- [${p.name}](/${p.skill}): ${p.description}`).join('\n')}\n`);
emit('apps/docs/public/ai/catalog.json',catalog);
emit('apps/docs/public/ai/sources.json',Object.fromEntries(Object.entries(sources).sort(([a],[b])=>a.localeCompare(b,'en'))));
emit('apps/docs/public/ai/standards.md',read('docs/ai-standards.md'));
if(exists('ai/README.md')) emit('apps/docs/public/ai/index.md',read('ai/README.md'));
for (const [p,content] of [...outputs]) if (p.startsWith('ai/skills/')) emit(`apps/docs/public/${p}`,content);
const stale = [];
for (const [p,content] of outputs) {
  if (check) {if(!exists(p)||read(p)!==content) stale.push(p);}
  else {fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),content);}
}
// Manifest also detects orphaned generated skills after packages or sections are removed.
const manifestPath='ai/generated-files.json';
const previous=exists(manifestPath)?JSON.parse(read(manifestPath)):[];
for(const p of previous) if(!outputs.has(p)&&exists(p)) {
  if(check) stale.push(p);
  else if(p.startsWith('ai/skills/')||p.startsWith('apps/docs/public/ai/skills/')) fs.unlinkSync(path.join(root,p));
  else throw new Error(`Review obsolete generated file: ${p}`);
}
if(check) {if(!exists(manifestPath)||read(manifestPath)!==json([...outputs.keys()].sort())) stale.push(manifestPath);}
else fs.writeFileSync(path.join(root,manifestPath),json([...outputs.keys()].sort()));
if(stale.length) throw new Error(`Generated AI files are stale. Run pnpm ai:build.\n${stale.slice(0,20).join('\n')}`);
console.log(`AI catalog ${check?'verified':'generated'}: ${packages.length} packages, ${sections.length} sections, ${tokens.length} declarations, ${utilities.length} classes, ${examples.length} examples, ${sourceRecords.length} sources.`);
