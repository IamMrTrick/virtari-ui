import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-code/styles';
import { CodeBlock, CodeEditor, InlineCode } from '@virtari-packages/react-code';

const source = 'import { Button } from "@virtari-packages/react-button";\n// A readable comment: توضیح فارسی\nconst count = 123;\n+ const saved = true;\n- const removed = false;\n';
const frames = async () => { for (let i = 0; i < 5; i++) await new Promise(requestAnimationFrame); };
const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
const context = canvas.getContext('2d', { willReadFrequently: true })!;
function rgb(color: string) { context.clearRect(0,0,1,1); context.fillStyle=color; context.fillRect(0,0,1,1); return [...context.getImageData(0,0,1,1).data]; }
function luminance(color: number[]) { return color.slice(0,3).map(x=>{x/=255; return x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4;}).reduce((sum,x,i)=>sum+x*[0.2126,0.7152,0.0722][i],0); }
function background(element: Element): number[] { const layers: number[][]=[]; let current:Element|null=element; while(current){ layers.unshift(rgb(getComputedStyle(current).backgroundColor)); current=current.parentElement;} return layers.reduce((base,layer)=>layer.slice(0,3).map((v,i)=>v*layer[3]/255+base[i]*(1-layer[3]/255)),[255,255,255]); }
function App() {
 const [report,setReport]=useState('Running'); const [value,setValue]=useState(source); const [highlight,setHighlight]=useState([2]);
 useEffect(()=>{ (async()=>{
   await document.fonts.ready; await frames(); const results:string[]=[];
   const check=(name:string,ok:boolean)=>results.push(`${ok?'PASS':'FAIL'} ${name}`);
   let minimum=100;
   for(const panel of document.querySelectorAll<HTMLElement>('[data-case]')) {
     const block=panel.querySelector<HTMLElement>('.vds-code')!; const pre=block.querySelector<HTMLElement>('pre')!;
     check(panel.id+' static without editor',!block.querySelector('.cm-editor') && !!pre && pre.tabIndex===0);
     check(panel.id+' original text preserved', [...block.querySelectorAll('.vds-code-static-text')].map(el=>el.textContent).join('')===source);
     check(panel.id+' source direction',getComputedStyle(pre).direction==='ltr');
     check(panel.id+' contains narrow layout',block.getBoundingClientRect().width<=panel.getBoundingClientRect().width+1);
     check(panel.id+' line states',block.querySelectorAll('[data-highlighted]').length===1 && block.querySelectorAll('[data-diff]').length===2);
     for(const text of block.querySelectorAll<HTMLElement>('.vds-code-static-text span,.vds-code-static-number,.vds-code-header-filename')) {
       const a=luminance(rgb(getComputedStyle(text).color)),b=luminance(background(text)); const ratio=(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05); minimum=Math.min(minimum,ratio);
       check(panel.id+' readable '+text.textContent?.slice(0,12)+' '+ratio.toFixed(2),ratio>=4.5);
     }
   }
   const tall=document.querySelector<HTMLElement>('#height pre')!;
   check('maxHeight scrolls inside code',tall.clientHeight<=100 && tall.scrollHeight>tall.clientHeight);
   const wrapped=document.querySelector<HTMLElement>('#wrapped pre')!;
   check('wrap prevents horizontal overflow',wrapped.scrollWidth<=wrapped.clientWidth+1);
   check('editor has accessible source label',!!document.querySelector('.cm-content[aria-label="Editable source"]'));
   check('unknown grammar preserves plain text',document.querySelector('#unknown code')?.textContent==='plain <unsafe> & text');
   setHighlight([]); await frames();
   check('editor highlight clears',!document.querySelector('#editor-view .cm-line-highlighted'));
   check('page does not overflow horizontally',document.documentElement.scrollWidth<=window.innerWidth+1);
   setReport(`Minimum contrast ${minimum.toFixed(2)}:1\n`+results.join('\n'));
 })(); },[]);
 return <main style={{padding:16,maxWidth:1100,margin:'auto'}}><h1>Code package quality</h1><details><summary>Regression report</summary><pre id="results">{report}</pre></details>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(280px,100%),1fr))',gap:16}}>
 {['light','dark','dark-oled'].flatMap(theme=>['tonal','bordered','elevated'].flatMap(surface=>['sharp','soft','round','pill'].map(radius=><section key={theme+surface+radius} id={theme+surface+radius} data-case data-theme={theme} data-surface-style={surface} data-radius={radius} dir="rtl" style={{background:'var(--vds-color-bg)',padding:12,minWidth:0}}>
 <CodeBlock renderer="static" language="tsx" filename="Example.tsx" code={source} showLineNumbers highlightLines={[2]} diff="unified" />
 </section>)))}</div>
 <div id="height"><CodeBlock renderer="static" code={source.repeat(10)} maxHeight={100}/></div>
 <div id="wrapped" style={{width:180}}><CodeBlock renderer="static" wrap code={'x'.repeat(300)}/><InlineCode>{'identifier'.repeat(20)}</InlineCode></div>
 <div id="unknown"><CodeBlock renderer="static" language="unknown" code="plain <unsafe> & text"/></div>
 <div id="editor-view"><CodeBlock code={source} language="tsx" highlightLines={highlight}/></div>
 <CodeEditor value={value} onValueChange={setValue} editorLabel="Editable source" language="tsx"/>
 </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
