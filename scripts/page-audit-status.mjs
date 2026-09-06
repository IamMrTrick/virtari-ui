import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('docs/page-audit/manifest.json','utf8'));
const completed=manifest.filter(item=>fs.existsSync(item.report));
const pending=manifest.filter(item=>!fs.existsSync(item.report));
if(process.argv.includes('--write')) fs.writeFileSync('docs/page-audit/README.md',`# Page quality review progress\n\n${completed.length} of ${manifest.length} registered pages have individual review records. A record states its own checks and limitations; it is not a universal accessibility certification. Shared mechanical changes do not count as individual review completion.\n\nRead [the quality contract](../component-quality.md) and [shared corrections](shared.md). Root runs final integration builds and regenerates AI knowledge after package edits settle.\n\n| Page | Individual review |\n| --- | --- |\n${manifest.map(item=>`| ${item.id} | ${fs.existsSync(item.report)?`[Reviewed](${item.id}.md)`:'Pending'} |`).join('\n')}\n`);
console.log(JSON.stringify({reviewed:completed.length,total:manifest.length,pending:pending.map(x=>x.id)},null,2));
