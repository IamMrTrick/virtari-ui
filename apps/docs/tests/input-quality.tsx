import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Input, InputField, PasswordInputField, InputWrapper, InputIcon, InputGroup, InputAddon, PasswordStrengthMeter, analyzePasswordStrength, type InputSize } from '@virtari-packages/react-input';
import { IconSearch, IconMail } from '@virtari-packages/react-icons';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-input/styles';
const sizes: InputSize[] = ['2xs','xs','sm','md','lg','xl','2xl'];
const frames = async()=> { for(let i=0;i<3;i++) await new Promise(requestAnimationFrame); };
function App(){
 const [report,setReport]=useState('Running'); const nativeRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{let alive=true;(async()=>{
 await document.fonts.ready; await frames(); const checks:string[]=[];
 const check=(name:string,pass:boolean)=>checks.push(`${pass?'PASS':'FAIL'} ${name}`);
 const style=(e:Element)=>getComputedStyle(e); const rect=(e:Element)=>e.getBoundingClientRect();
 for(const group of document.querySelectorAll<HTMLElement>('[data-case]')) {
   const id=group.dataset.case!; const input=group.querySelector<HTMLInputElement>('.vds-input-wrapper input')!;
   const icon=group.querySelector<HTMLElement>('.vds-input-icon')!; const dir=style(group).direction;
   const pad=parseFloat(dir==='rtl'?style(input).paddingRight:style(input).paddingLeft);
   check(id+' icon has reserved space',pad>=parseFloat(style(icon).width)+parseFloat(style(icon).getPropertyValue('--input-icon-gap')));
   check(id+' icon centered',Math.abs((rect(icon).top+rect(icon).bottom-rect(input).top-rect(input).bottom)/2)<1);
   const addon=group.querySelector('.vds-input-addon')!;const affixInput=group.querySelector('.vds-input-group input')!;
   check(id+' addon type size',style(addon).fontSize===style(affixInput).fontSize);
   check(id+' input contained',rect(input).width<=rect(group).width);
   const meter=group.querySelector('.vds-password-strength')!;
   const label=meter.querySelector('.vds-password-strength-value')!;
   const rgb=(s:string)=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d')!;ctx.fillStyle=s;ctx.fillRect(0,0,1,1);return Array.from(ctx.getImageData(0,0,1,1).data);};
   const luminance=(c:number[])=>c.slice(0,3).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
   for(const color of ['danger','warning','primary','success']) {
     meter.setAttribute('data-color',color);
     const fg=rgb(style(label).color);const bg=rgb(style(meter).backgroundColor);
     const l1=luminance(fg),l2=luminance(bg); const contrast=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);
     check(id+' '+color+' text contrast '+contrast.toFixed(2),contrast>=4.5);
   }
   meter.setAttribute('data-color','warning');
 }
 for(const input of document.querySelectorAll<HTMLInputElement>('[data-size-ramp] input')) {
   const addon=input.previousElementSibling!;
   check(input.dataset.size+' affix font size',style(input).fontSize===style(addon).fontSize);
   check(input.dataset.size+' affix height',Math.abs(rect(input).height-rect(addon).height)<1);
 }
 const field=document.querySelector<HTMLInputElement>('#error-input')!; const password=nativeRef.current!;
 check('error is native invalid',field.getAttribute('aria-invalid')==='true' && password.getAttribute('aria-invalid')==='true');
 check('error association',field.getAttribute('aria-describedby')!.split(' ').every(id=>!!document.getElementById(id)));
 check('forwarded ref and autocomplete',password.tagName==='INPUT'&&password.autocomplete==='new-password');
 const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value')!.set!;
 setter.call(password,'temporary-long-password');password.dispatchEvent(new Event('input',{bubbles:true}));await frames();
 check('counter tracks native edit',document.querySelector('#password-counter')!.textContent==='23/64');
 const form=document.querySelector<HTMLFormElement>('#reset-form')!; const cancel=(event:Event)=>event.preventDefault();form.addEventListener('reset',cancel);form.reset();await frames();
 check('cancelled reset preserved',password.value==='temporary-long-password'&&document.querySelector('#password-counter')!.textContent==='23/64');
 form.removeEventListener('reset',cancel);form.reset();await frames();
 check('reset restores native value and counter',password.value==='initial'&&document.querySelector('#password-counter')!.textContent==='7/64');
 const action=form.querySelector<HTMLButtonElement>('button[type="button"]')!;action.focus();action.click();await frames();
 check('reveal preserves keyboard button focus',document.activeElement===action);
 check('reveal keeps native input identity',nativeRef.current===password && password.type==='text');
 if(alive)setReport(checks.join('\n'));
 })();return()=>{alive=false};},[]);
 return <main style={{padding:24,display:'grid',gap:24}}><h1>Input package-only quality checks</h1><pre id="results" style={{whiteSpace:'pre-wrap'}}>{report}</pre>
 <form id="reset-form" style={{maxWidth:320}}><InputField id="error-input" label="Invalid email" type="email" error="Use a valid address" /><PasswordInputField id="password" ref={nativeRef} label="Password" defaultValue="initial" name="password" autoComplete="new-password" error="Example error" showCounter maxLength={64} /><button type="reset">Reset</button></form>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:24}}>
 {['light','dark','dark-oled'].flatMap(theme=>['bordered','tonal','elevated'].flatMap(surface=>['sharp','soft','round','pill'].flatMap(radius=>['ltr','rtl'].map(dir=>{
 const id=[theme,surface,radius,dir].join('/');return <section key={id} data-case={id} data-theme={theme} data-surface-style={surface} data-radius={radius} dir={dir} style={{padding:16,background:'var(--vds-color-surface)',color:'var(--vds-color-text)',display:'grid',gap:12,minWidth:0}}><h2 style={{fontSize:14}}>{id}</h2>
 <InputWrapper><InputIcon side="start"><IconSearch /></InputIcon><Input aria-label="Search" defaultValue="متن آزمایشی / Example" /><InputIcon side="end"><IconMail /></InputIcon></InputWrapper>
 <InputGroup><InputAddon>https://</InputAddon><Input aria-label="Domain" size="xl" placeholder="example" /><InputAddon side="end">.com</InputAddon></InputGroup>
 <PasswordStrengthMeter showRequirements analysis={analyzePasswordStrength('abcdefghijk!')} />
 </section>}))))}</div>
 <section data-size-ramp style={{maxWidth:320,display:'grid',gap:12}}>{sizes.map(size=><InputGroup key={size}><InputAddon>{size}</InputAddon><Input size={size} aria-label={`Size ${size}`} placeholder="Sizing" /></InputGroup>)}</section>
 </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);

