import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Card, CardContent } from '@virtari-packages/react-card';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
import '@virtari-packages/react-card/styles';
const padding = {'--card-padding-inline':'4px','--card-padding-block':'4px'} as React.CSSProperties;
const frames = async () => { for(let i=0;i<5;i++) await new Promise(requestAnimationFrame); };
function App() {
 const [report,setReport]=useState('Waiting for layout');
 useEffect(()=>{let alive=true; (async()=>{
   await document.fonts.ready; await frames();
   const results:string[]=[];
   const radius=(el:Element)=>parseFloat(getComputedStyle(el).borderTopLeftRadius);
   const expectedNested=(parent:Element,child:Element)=> {
     const outer=parent.getBoundingClientRect(), inner=child.getBoundingClientRect();
     const mode=child.closest('[data-radius]')?.getAttribute('data-radius');
     const floor=mode==='sharp'?0:mode==='round'?6:mode==='pill'?8:4;
     return Math.max(Math.min(radius(parent),floor),radius(parent)-Math.min(inner.left-outer.left,inner.top-outer.top,outer.right-inner.right,outer.bottom-inner.bottom));
   };
   const check=(name:string,actual:number,expected:number)=>results.push((Math.abs(actual-expected)<0.6?'PASS':'FAIL')+' '+name+' ('+actual+' / '+expected+')');
   for(const mode of ['sharp','soft','round','pill']) {
     const section=document.getElementById(mode)!;
     const outer=section.querySelector('[data-outer]')!;
     const inner=section.querySelector('[data-inner]')!;
     const deep=section.querySelector('[data-deep]')!;
     const expected=mode==='sharp'?4:mode==='soft'?20:24;
     check(mode+' outer role',radius(outer),expected);
     check(mode+' inner actual inset',radius(inner),expectedNested(outer,inner));
     check(mode+' recursive actual inset',radius(deep),expectedNested(inner,deep));
     const slot=section.querySelector('[data-slot-inner]')!;
     check(mode+' slot inset',radius(slot),expectedNested(slot.parentElement!.closest('.vds-card')!,slot));
     const wrapped=section.querySelector('[data-wrapper-inner]')!;
     check(mode+' wrapper inset',radius(wrapped),expectedNested(wrapped.parentElement!.closest('.vds-card')!,wrapped));
     check(mode+' explicit override',radius(section.querySelector('[data-explicit]')!),7);
     const generous=section.querySelector('[data-generous]')!;
     check(mode+' generous padding preserves shape',radius(generous),expectedNested(generous.parentElement!.closest('.vds-card')!,generous));
     check(mode+' nested surface separation',Number(getComputedStyle(inner).backgroundColor!==getComputedStyle(outer).backgroundColor),1);
   }
   const dynamic=document.getElementById('dynamic')!;
   const dynamicOuter=dynamic.querySelector<HTMLElement>('[data-outer]')!;
   const dynamicInner=dynamic.querySelector('[data-inner]')!;
   dynamic.setAttribute('data-radius','round'); await frames();
   check('live mode change',radius(dynamicInner),expectedNested(dynamicOuter,dynamicInner));
   dynamicOuter.style.setProperty('--card-padding-inline','8px');
   dynamicOuter.style.setProperty('--card-padding-block','8px'); await frames();
   const resizedExpected=expectedNested(dynamicOuter,dynamicInner);
   check('live padding change',radius(dynamicInner),resizedExpected);
   dynamicOuter.style.transform='scale(0.8) translateY(12px)'; await frames();
   check('transforms do not change nesting',radius(dynamicInner),resizedExpected);
   const standalone=document.getElementById('standalone')!;
   check('root card has no nested override',Number(standalone.style.getPropertyValue('--card-nested-radius')!==''),0);
   if(alive)setReport(results.join('\n'));
 })();return()=>{alive=false;};},[]);
 return <main style={{padding:24}}><h1>Nested card radius</h1><p>Actual inset, recursive cards, slots, wrappers, explicit overrides and live theme changes.</p>
 {['sharp','soft','round','pill'].map(mode=><section id={mode} key={mode} data-radius={mode} style={{marginBlock:24}}><h2>{mode}</h2>
 <Card data-outer style={padding}><Card data-inner style={padding}><Card data-deep style={padding}>Recursive cards</Card></Card></Card>
 <Card style={{...padding,marginTop:12}}><CardContent><Card data-slot-inner>Slotted card</Card></CardContent></Card>
 <Card style={{...padding,marginTop:12}}><div style={{padding:3}}><Card data-wrapper-inner>Layout wrapper</Card></div></Card>
 <Card style={{marginTop:12}}><Card data-generous>Generous padding</Card></Card>
 <Card style={{...padding,marginTop:12}}><Card data-explicit style={{borderRadius:7}}>Explicit 7px</Card></Card>
 </section>)}
 <section id="dynamic" data-radius="soft"><Card data-outer style={padding}><Card data-inner>Live update</Card></Card></section>
 <Card id="standalone">Root card</Card><pre id="results">{report}</pre></main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
