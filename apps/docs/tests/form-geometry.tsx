import React, { useEffect, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { Input, InputIcon, InputWrapper, PasswordInput, type InputSize } from '@virtari-packages/react-input';
import { PhoneInput } from '@virtari-packages/react-phone-input';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
import '@virtari-packages/react-input/styles';
import '@virtari-packages/react-phone-input/styles';

const sizes: InputSize[] = ['2xs','xs','sm','md','lg','xl','2xl'];
const fonts = ['Arial, sans-serif', 'Georgia, serif', 'Tahoma, sans-serif'];
const Icon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg>;
function Audit() {
  const [result, setResult] = useState('Waiting for fonts');
  useEffect(() => { let alive=true;
    document.fonts.ready.then(() => requestAnimationFrame(() => {
      let checks=0; const failures:string[]=[];
      const check=(ok:boolean,label:string)=>{ checks++; if(!ok)failures.push(label); };
      document.querySelectorAll<HTMLElement>('[data-case]').forEach(row=>{
        const label=row.dataset.case!;
        const wrapper=row.querySelector<HTMLElement>('.audit-icons')!;
        const input=wrapper.querySelector<HTMLInputElement>('input')!;
        const style=getComputedStyle(input), box=input.getBoundingClientRect();
        check(style.paddingBlockStart===style.paddingBlockEnd,`${label}: balanced native padding`);
        check(style.boxSizing==='border-box',`${label}: border-box sizing`);
        check(parseFloat(style.lineHeight)<=box.height,`${label}: line box fits field`);
        wrapper.querySelectorAll<HTMLElement>('.vds-input-icon').forEach(icon=>{
          const graphic=icon.querySelector('svg')!.getBoundingClientRect();
          check(Math.abs(graphic.top+graphic.height/2-box.top-box.height/2)<1,`${label}: icon vertical center`);
          const physicalStart=(icon.dataset.side==='start')===(style.direction==='ltr');
          const textEdge=physicalStart?box.left+parseFloat(style.paddingLeft)+parseFloat(style.borderLeftWidth):box.right-parseFloat(style.paddingRight)-parseFloat(style.borderRightWidth);
          check(physicalStart?textEdge-graphic.right>=3:graphic.left-textEdge>=3,`${label}: icon/text gap`);
        });
        const password=row.querySelector<HTMLElement>('.vds-input-field-control')!;
        const action=password.querySelector<HTMLElement>('.vds-input-field-action')!;
        const pw=password.querySelector('input')!;
        const ar=action.getBoundingClientRect(), pr=pw.getBoundingClientRect(), ps=getComputedStyle(pw);
        check(ar.top>=pr.top && ar.bottom<=pr.bottom,`${label}: password action stays inside`);
        check(ps.direction==='ltr'?pr.right-parseFloat(ps.paddingRight)<=ar.left-3:pr.left+parseFloat(ps.paddingLeft)>=ar.right+3,`${label}: password text/action gap`);
        const phone=row.querySelector<HTMLInputElement>('.vds-phone-input > input[type="tel"]')!;
        const country=row.querySelector<HTMLElement>('.vds-phone-input-country')!;
        const phoneStyle=getComputedStyle(phone), ph=phone.getBoundingClientRect(), cr=country.getBoundingClientRect();
        check(phoneStyle.direction==='ltr',`${label}: phone stays LTR`);
        check(row.dir==='rtl'?ph.right-parseFloat(phoneStyle.paddingRight)<=cr.left:ph.left+parseFloat(phoneStyle.paddingLeft)>=cr.right,`${label}: phone/country separation`);
      });
      if(alive)setResult(`${checks-failures.length}/${checks} passed\n${failures.join('\n')}`);
    })); return()=>{alive=false};
  }, []);
  return <main style={{padding:24}}><h1>Form geometry audit</h1><pre id="geometry-results">{result}</pre>{fonts.flatMap(font=>(['ltr','rtl'] as const).flatMap(dir=>sizes.map(size=><section key={`${font}-${dir}-${size}`} data-case={`${font}/${dir}/${size}`} dir={dir} style={{'--vds-font-sans':font,display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:24,marginBlock:24} as CSSProperties}><InputWrapper className="audit-icons"><InputIcon side="start"><Icon/></InputIcon><Input size={size} defaultValue={dir==='rtl'?'متن فارسی':'Sample text'} aria-label={`${size} input`}/><InputIcon side="end"><Icon/></InputIcon></InputWrapper><PasswordInput size={size} defaultValue="example123" aria-label={`${size} password`}/><PhoneInput size={size} defaultCountry="us" aria-label={`${size} phone`}/></section>)))}</main>;
}
createRoot(document.getElementById('root')!).render(<Audit/>);

