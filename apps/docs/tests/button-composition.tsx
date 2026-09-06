import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, type ButtonSize } from '@virtari-packages/react-button';
import { Badge } from '@virtari-packages/react-badge';
import { Chip } from '@virtari-packages/react-chip';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
import '@virtari-packages/react-button/styles';
import '@virtari-packages/react-badge/styles';
import '@virtari-packages/react-chip/styles';
const Icon=()=> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2"/></svg>;
const CustomLabel=()=> <span>Custom readable label</span>;
const sizes:ButtonSize[]=['2xs','xs','sm','md','lg','xl','2xl','3xl'];
let childClicks=0, parentClicks=0, disabledClicks=0;
let childNode:HTMLElement|null=null, parentNode:HTMLElement|null=null;
function App(){const[report,setReport]=useState('Waiting for layout');
 useEffect(()=>{document.fonts.ready.then(()=>requestAnimationFrame(()=>{
 const results:string[]=[];
 const check=(name:string,pass:boolean)=>results.push((pass?'PASS':'FAIL')+' '+name);
 document.querySelectorAll<HTMLElement>('[data-case]').forEach(el=>{
   const box=el.getBoundingClientRect(), content=el.querySelector<HTMLElement>('.vds-button-content'), css=getComputedStyle(el);
   const icons=[...el.querySelectorAll<SVGElement>('svg')];
   const centered=icons.every(icon=>{const r=icon.getBoundingClientRect();return Math.abs(r.y+r.height/2-box.y-box.height/2)<0.6;});
   const iconSize=parseFloat(css.getPropertyValue('--button-icon-size'))*(css.getPropertyValue('--button-icon-size').includes('rem')?parseFloat(getComputedStyle(document.documentElement).fontSize):1);
   const sized=icons.every(icon=>Math.abs(icon.getBoundingClientRect().width-iconSize)<0.6);
   const group=content?.getBoundingClientRect();
   check(el.dataset.case+' centered bounded content',!!group&&Math.abs(group.x+group.width/2-box.x-box.width/2)<0.6&&centered&&sized);
   const text=el.querySelector<HTMLElement>('[data-text]'), icon=icons[0];
   if(text&&icon){const t=text.getBoundingClientRect(),i=icon.getBoundingClientRect();const gap=getComputedStyle(el.querySelector('.vds-button-label')!).columnGap;const actual=getComputedStyle(el).direction==='rtl'?i.left-t.right:t.left-i.right;check(el.dataset.case+' icon text gap',Math.abs(actual-parseFloat(gap))<0.6);}
   if(el.dataset.case?.includes('icon-only'))check(el.dataset.case+' square',Math.abs(box.width-box.height)<0.6);
   if(el.dataset.case?.includes('loading'))check(el.dataset.case+' spinner',!!el.querySelector('.vds-button-spinner')&&getComputedStyle(content!).visibility==='hidden');
 });
 const active=document.getElementById('active-link')!;active.click();
 check('asChild preserves both event handlers',childClicks===1&&parentClicks===1);
 check('asChild composes both refs',childNode===active&&parentNode===active);
 const disabled=document.getElementById('disabled-link')!;const event=new MouseEvent('click',{bubbles:true,cancelable:true});disabled.dispatchEvent(event);
 check('disabled asChild blocks activation',event.defaultPrevented&&disabledClicks===0);
 check('opaque text component is not icon-only',!document.getElementById('custom-label')!.hasAttribute('data-icon-only'));
 check('accessible named opaque icon remains square',document.getElementById('named-icon')!.hasAttribute('data-icon-only'));
 check('explicit false overrides named icon inference',!document.getElementById('named-custom-label')!.hasAttribute('data-icon-only'));
 check('child accessible name supports asChild icon',document.getElementById('named-child-icon')!.hasAttribute('data-icon-only'));
 for(const selector of ['.vds-badge','.vds-chip']){const el=document.querySelector(selector)!;const icon=el.querySelector('svg')!.getBoundingClientRect();const box=el.getBoundingClientRect();check(selector+' bare SVG stays bounded and centered',icon.width<=20&&Math.abs(icon.y+icon.height/2-box.y-box.height/2)<0.6);}
 setReport(results.join('\n'));
 }));},[]);
 return <main style={{padding:24}}><h1>Action composition</h1>{['ltr','rtl'].map(dir=><section dir={dir} key={dir}>{sizes.map(size=><div key={size} style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:16,marginBlock:16}}>
 <Button size={size} data-case={dir+size+' mixed'}><Icon/><span data-text>Save تغییرات</span></Button>
 <Button size={size} data-case={dir+size+' sections'} leftSection={<Icon/>} rightSection={<Icon/>}>Save</Button>
 <Button size={size} asChild data-case={dir+size+' link'} leftSection={<Icon/>} rightSection={<Icon/>}><a href="#preview">Save</a></Button>
 <Button size={size} asChild loading data-case={dir+size+' loading'} leftSection={<Icon/>}><a href="#preview">Save</a></Button>
 <Button size={size} iconOnly aria-label="Add" data-case={dir+size+' icon-only'}><Icon/></Button>
 <Button size={size} aria-label="Add SVG" data-case={dir+size+' native icon-only'}><svg viewBox="0 0 24 24"><title>Add</title><path d="M4 12h16" stroke="currentColor"/></svg></Button>
 </div>)}</section>)}
 <Button asChild onClick={()=>parentClicks++} ref={el=>{parentNode=el;}}><a id="active-link" href="#checked" ref={el=>{childNode=el;}} onClick={e=>{e.preventDefault();childClicks++;}}>Working link</a></Button>
 <Button asChild disabled><a id="disabled-link" href="#blocked" onClick={()=>disabledClicks++}>Disabled</a></Button>
 <Button id="custom-label"><CustomLabel/></Button>
 <Button id="named-icon" aria-label="Add"><Icon/></Button>
 <Button id="named-custom-label" iconOnly={false} aria-label="Custom label"><CustomLabel/></Button>
 <Button asChild><a id="named-child-icon" href="#named" aria-label="Add"><Icon/></a></Button>
 <Badge><Icon/>Badge</Badge><Chip><Icon/>Chip</Chip><pre id="results">{report}</pre></main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
