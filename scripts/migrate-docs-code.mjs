// One-time source-preserving migration. Review remaining pre elements manually.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const skip=new Set(['CodePage.tsx','ButtonPage.tsx','InputPage.tsx','KnowledgeReference.tsx']);
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
let blocks=0,inlines=0;
for(const file of files('apps/docs/src').filter(p=>p.endsWith('.tsx')&&!skip.has(path.basename(p)))) {
  let content=fs.readFileSync(file,'utf8');
  const ast=ts.createSourceFile(file,content,99,true,ts.ScriptKind.TSX),edits=[];let block=false,inline=false;
  function walk(node) {
    if(ts.isJsxElement(node)&&node.openingElement.tagName.getText()==='pre') {
      let children=node.children.filter(n=>!ts.isJsxText(n)||n.text.trim());
      if(children.length===1&&ts.isJsxElement(children[0])&&children[0].openingElement.tagName.getText()==='code') children=children[0].children.filter(n=>!ts.isJsxText(n)||n.text.trim());
      if(children.length===1&&ts.isJsxExpression(children[0])&&children[0].expression) {
        const expr=children[0].expression.getText();
        const attrs=node.openingElement.attributes.properties.filter(p=>!ts.isJsxAttribute(p)||!['className','style','dir'].includes(p.name.text)).map(p=>p.getText()).join(' ');
        const style=node.openingElement.attributes.properties.find(p=>ts.isJsxAttribute(p)&&p.name.text==='style')?.getText()??'';
        const max=style.match(/max(?:BlockSize|Height):\s*("[^"]+"|'[^']+')/);
        const language=expr.includes('JSON.stringify')?'json':expr.includes('@import')||expr.startsWith('`--vds-')||path.basename(file)==='UtilitiesPage.tsx'||path.basename(file)==='TokensReferencePage.tsx'?'css':expr.startsWith('`pnpm')?'shell':'tsx';
        edits.push({start:node.getStart(),end:node.end,text:`<VirtariCodeBlock renderer="static" language="${language}" code={${expr}} ${/pre-wrap|break-word/.test(style)?'wrap ':''}${max?`maxHeight={${max[1]}} `:''}${attrs}/>`}); block=true;blocks++;return;
      }
      console.log('Manual code review:',file,ast.getLineAndCharacterOfPosition(node.getStart()).line+1);
      return;
    }
    if(ts.isJsxElement(node)&&node.openingElement.tagName.getText()==='code') {
      edits.push({start:node.openingElement.tagName.getStart(),end:node.openingElement.tagName.end,text:'VirtariInlineCode'},{start:node.closingElement.tagName.getStart(),end:node.closingElement.tagName.end,text:'VirtariInlineCode'});inline=true;inlines++;
    }
    ts.forEachChild(node,walk);
  }
  walk(ast);
  if(!edits.length)continue;
  for(const e of edits.sort((a,b)=>b.start-a.start)) content=content.slice(0,e.start)+e.text+content.slice(e.end);
  const names=[block?'CodeBlock as VirtariCodeBlock':null,inline?'InlineCode as VirtariInlineCode':null].filter(Boolean);
  fs.writeFileSync(file,`import { ${names.join(', ')} } from "@virtari-packages/react-code";\n`+content);
}
console.log({blocks,inlines});
