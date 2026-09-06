import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Badge, type BadgeColor, type BadgeVariant, type BadgeSize } from '@virtari-packages/react-badge';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-badge/styles';

const colors: BadgeColor[] = ['primary','success','warning','danger','info','accent','neutral'];
const variants: BadgeVariant[] = ['soft','solid','outline','subtle','soft-outline'];
const Icon = () => <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" stroke="currentColor" fill="none" strokeWidth="2"/></svg>;
function App() {
  const [report,setReport] = useState('Measuring…');
  const [childClicks,setChildClicks] = useState(0), [parentClicks,setParentClicks] = useState(0), [removals,setRemovals] = useState(0);
  const childRef=useRef<HTMLButtonElement>(null), badgeRef=useRef<HTMLSpanElement>(null);
  useEffect(()=>{ document.fonts.ready.then(()=>requestAnimationFrame(()=>{
    const lines:string[]=[];
    const check=(name:string,pass:boolean)=>lines.push(`${pass?'PASS':'FAIL'} ${name}`);
    const canvas=document.createElement('canvas'); canvas.width=canvas.height=1;
    const ctx=canvas.getContext('2d',{willReadFrequently:true})!;
    const pixel=(layers:string[])=>{ctx.clearRect(0,0,1,1);for(const color of layers){ctx.fillStyle=color;ctx.fillRect(0,0,1,1);}return [...ctx.getImageData(0,0,1,1).data].slice(0,3);};
    const luminance=(rgb:number[])=>rgb.map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
    document.querySelectorAll<HTMLElement>('[data-palette]').forEach(badge=>{
      const s=getComputedStyle(badge),host=getComputedStyle(badge.closest('[data-surface-style]')!);
      for(const state of ['','-hover']){
        const bg=s.getPropertyValue(`--badge-bg${state}`).trim();
        const layers=[host.backgroundColor,bg],a=luminance(pixel(layers)),b=luminance(pixel([...layers,s.color]));
        const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
        check(`${badge.dataset.palette}${state||'/rest'} contrast ${ratio.toFixed(2)}:1`,ratio>=4.5);
      }
    });
    document.querySelectorAll<HTMLElement>('[data-long]').forEach(badge=>{
      const b=badge.getBoundingClientRect(),label=badge.querySelector('.vds-badge-label')!.getBoundingClientRect();
      check(`${badge.dataset.long} wraps inside narrow host`,badge.scrollWidth<=badge.clientWidth+1&&b.width<=200&&label.height>20);
      check(`${badge.dataset.long} icons preserve width and center`,[...badge.querySelectorAll('svg')].every(icon=>{const r=icon.getBoundingClientRect();return r.width===12&&Math.abs(r.top+r.height/2-b.top-b.height/2)<.6;}));
      const start=badge.querySelector('[data-position="start"]')!.getBoundingClientRect();
      check(`${badge.dataset.long} logical leading slot`,badge.dataset.long==='rtl'?start.left>label.right:start.right<label.left);
      check(`${badge.dataset.long} symmetric inline padding`,getComputedStyle(badge).paddingInlineStart===getComputedStyle(badge).paddingInlineEnd);
    });
    document.querySelectorAll<HTMLElement>('[data-size-case]').forEach(badge=>check(`${badge.dataset.sizeCase} minimum height`,badge.getBoundingClientRect().height===({xs:20,sm:20,md:24,lg:28}[badge.dataset.sizeCase as BadgeSize])));
    document.querySelectorAll<HTMLElement>('[data-shape-case]').forEach(badge=>{
      const probe=document.createElement('span');probe.style.borderRadius=getComputedStyle(badge).getPropertyValue('--vds-radius-nav-item');badge.append(probe);
      check(`${badge.dataset.shapeCase} scoped square radius`,getComputedStyle(probe).borderTopLeftRadius===getComputedStyle(badge).borderTopLeftRadius);probe.remove();
    });
    const dot=document.getElementById('dot-link');
    check('dotOnly asChild retains named anchor',dot?.tagName==='A'&&dot.getAttribute('aria-label')==='Presence details'&&dot.children.length===0);
    check('dotOnly has circular geometry',!!dot&&dot.getBoundingClientRect().width===dot.getBoundingClientRect().height);
    check('asChild composes both refs',childRef.current===badgeRef.current&&childRef.current?.tagName==='BUTTON');
    check('disabled child remains native',document.getElementById('disabled')?.hasAttribute('disabled')===true);
    setReport(lines.join('\n'));
  }));},[]);
  const failures=report.split('\n').filter(line=>line.startsWith('FAIL'));
  return <main style={{padding:24}}><h1>Badge package quality</h1><p>{report==='Measuring…'?report:`${report.split('\n').filter(line=>line.startsWith('PASS')).length} passed; ${failures.length} failed`}</p><pre style={{whiteSpace:'pre-wrap'}}>{failures.join('\n')}</pre><details><summary>All measurements</summary><pre id="results" style={{whiteSpace:'pre-wrap'}}>{report}</pre></details>
    <div style={{display:'flex',flexWrap:'wrap',gap:20,marginBlock:20}}>{(['ltr','rtl'] as const).map(dir=><div key={dir} dir={dir} style={{width:200}}><Badge data-long={dir} leftSection={<Icon/>} rightSection={<Icon/>}>{dir==='rtl'?'تغییرات پروژه برای بررسی و تأیید نهایی آماده است':'feature/a-long-unbroken-branch-name-to-check-wrapping'}</Badge></div>)}</div>
    <div style={{display:'flex',gap:12,marginBlock:16,alignItems:'center'}}>{(['xs','sm','md','lg'] as BadgeSize[]).map(size=><Badge key={size} size={size} data-size-case={size} leftSection={<Icon/>}>{size}</Badge>)}</div>
    <div data-radius="pill" style={{display:'flex',gap:12,marginBlock:16,alignItems:'center'}}>{['sharp','soft','round','pill'].map(radius=><div key={radius} data-radius={radius}><Badge shape="square" data-shape-case={radius}>{radius}</Badge></div>)}</div>
    <div style={{display:'flex',gap:20,marginBlock:20,alignItems:'center'}}>
      <Badge asChild ref={badgeRef} onClick={()=>setParentClicks(n=>n+1)}><button ref={childRef} type="button" onClick={()=>setChildClicks(n=>n+1)}>Activate badge</button></Badge>
      <Badge asChild onClick={()=>setParentClicks(n=>n+1)}><button type="button" onClick={event=>event.preventDefault()}>Cancel parent action</button></Badge>
      <Badge asChild><button id="disabled" type="button" disabled onClick={()=>setChildClicks(n=>n+1)}>Disabled badge</button></Badge>
      <Badge onClick={()=>setParentClicks(n=>n+1)} onRemove={()=>setRemovals(n=>n+1)} removeLabel="Remove audit tag">Audit tag</Badge>
      <Badge asChild dotOnly><a id="dot-link" href="#presence" aria-label="Presence details">Hidden dot label</a></Badge>
    </div>
    <p role="status">Child clicks: {childClicks}; parent clicks: {parentClicks}; removals: {removals}</p>
    <div data-theme="dark">{['light','dark','dark-oled'].map(theme=><div key={theme} data-theme={theme}>{['bordered','tonal','elevated'].map(surface=><section key={surface} data-surface-style={surface} style={{background:'var(--vds-surface-bg)',color:'var(--vds-color-text)',padding:20,marginBlock:16}}><h2>{theme} / {surface}</h2><div style={{display:'flex',flexWrap:'wrap',gap:12}}>{colors.flatMap(color=>variants.map(variant=><Badge key={color+variant} color={color} variant={variant} data-palette={`${theme}/${surface}/${color}/${variant}`} leftSection={<Icon/>}>{color} {variant}</Badge>))}</div></section>)}</div>)}</div>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);

