import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Input} from '@virtari-packages/react-input';
import {Textarea} from '@virtari-packages/react-textarea';
import {NumberInput} from '@virtari-packages/react-number-input';
import {PhoneInput} from '@virtari-packages/react-phone-input';
import {OtpInput} from '@virtari-packages/react-otp-input';
import {TagInput} from '@virtari-packages/react-tag-input';
import {DateField} from '@virtari-packages/react-date-picker';
import {Select, SelectTrigger, SelectValue, Combobox, ComboboxTrigger} from '@virtari-packages/react-select';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
import '@virtari-packages/react-input/styles';
import '@virtari-packages/react-textarea/styles';
import '@virtari-packages/react-number-input/styles';
import '@virtari-packages/react-phone-input/styles';
import '@virtari-packages/react-otp-input/styles';
import '@virtari-packages/react-tag-input/styles';
import '@virtari-packages/react-date-picker/styles';
import '@virtari-packages/react-select/styles';
import '@virtari-packages/react-select/combobox/styles';
const shell='.vds-input,.vds-textarea,.vds-number-input,.vds-select-trigger,.vds-combobox-trigger,.vds-otp-input__slot,.vds-tag-input,.vds-date-field-group';
const themes=['light','dark','dark-oled'] as const;
const modes=['bordered','tonal','elevated'] as const;
const tones=['default','strong'] as const;
// Let the browser convert the token's color space before computing composited contrast.
function rgba(color:string):number[]{
  const canvas=document.createElement('canvas');canvas.width=canvas.height=1;
  const context=canvas.getContext('2d')!;context.fillStyle=color;context.fillRect(0,0,1,1);
  return [...context.getImageData(0,0,1,1).data].map((value,index)=>index===3?value/255:value);
}
function over(front:number[],back:number[]):number[]{return front.slice(0,3).map((value,index)=>value*front[3]+back[index]*(1-front[3])).concat(1)}
function luminance(color:number[]):number{return color.slice(0,3).map(value=>{const c=value/255;return c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4}).reduce((sum,c,index)=>sum+c*[0.2126,0.7152,0.0722][index],0)}
function contrast(a:number[],b:number[]):number{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)}
function Fields(){return <>
  <Input placeholder="Input" aria-label="Input"/>
  <NumberInput placeholder="Number" aria-label="Number"/>
  <PhoneInput defaultCountry="us" aria-label="Phone"/>
  <Select><SelectTrigger aria-label="Select"><SelectValue placeholder="Select"/></SelectTrigger></Select>
  <Combobox items={[]}><ComboboxTrigger placeholder="Combobox" aria-label="Combobox"/></Combobox>
  <DateField aria-label="Date"/>
  <Textarea placeholder="Textarea" aria-label="Textarea"/>
  <TagInput value={[]} onChange={()=>{}} placeholder="Tags" aria-label="Tags"/>
  <OtpInput length={4} label="Code"/>
</>}
function Audit(){
  const[result,setResult]=useState('Waiting for fonts');
  useEffect(()=>{document.fonts.ready.then(()=>requestAnimationFrame(()=>{
    let total=0;const fails:string[]=[];const measurements:string[]=[];
    const check=(ok:boolean,name:string)=>{total++;if(!ok)fails.push(name)};
    document.querySelectorAll<HTMLElement>('[data-surface-case]').forEach(section=>{
      const fieldGroup=section.querySelector<HTMLElement>('[data-field-group]')!;
      const controls=[...fieldGroup.querySelectorAll<HTMLElement>(shell)];
      const reference=getComputedStyle(controls[0]);
      const container=rgba(getComputedStyle(section).backgroundColor);
      controls.forEach(control=>{
        const style=getComputedStyle(control),name=section.dataset.surfaceCase+'/'+control.className;
        for(const key of ['backgroundColor','borderTopColor','borderTopWidth','boxShadow'] as const)check(style[key]===reference[key],name+': '+key);
        check(style.boxSizing==='border-box',name+': border-box');
        const fill=over(rgba(style.backgroundColor),container);
        const foreground=over(rgba(style.color),fill);
        const ratio=contrast(foreground,fill);
        check(ratio>=4.5,name+': text contrast '+ratio.toFixed(2)+' <4.5; text='+style.color+'; fill='+style.backgroundColor+'; container='+getComputedStyle(section).backgroundColor+'; composite='+JSON.stringify(fill));
      });
      if(section.dataset.fieldTone==='strong'){
        const difference=contrast(over(rgba(reference.backgroundColor),container),container);
        check(difference>=1.1,section.dataset.surfaceCase+': strong fill differs from tinted container');
        measurements.push(section.dataset.surfaceCase+': fill separation '+difference.toFixed(2));
        const reset=section.querySelector<HTMLElement>('[data-reset-probe]')!;
        const resetStyle=getComputedStyle(reset);
        const expected=rgba(resetStyle.getPropertyValue('--vds-field-rest-bg'));
        check(JSON.stringify(rgba(resetStyle.backgroundColor))===JSON.stringify(expected),section.dataset.surfaceCase+': nested default restores surface default');
      }
    });
    document.querySelectorAll<HTMLElement>('[data-theme-probe]').forEach(probe=>{
      const style=getComputedStyle(probe),text=rgba(style.color),background=rgba(style.backgroundColor);
      const name=probe.dataset.themeProbe!;
      check(JSON.stringify(text)===JSON.stringify(rgba(style.getPropertyValue('--vds-color-neutral-12'))),name+': semantic text rebinds to local primitive');
      check(contrast(text,background)>=4.5,name+': nested theme text contrast');
      check(probe.dataset.theme==='light'?luminance(text)<luminance(background):luminance(text)>luminance(background),name+': expected text polarity');
    });
    document.querySelectorAll<HTMLElement>('[data-inherit-probe]').forEach(probe=>{
      const expected=document.querySelector<HTMLElement>('[data-surface-case="'+probe.dataset.expect+'"] [data-field-group] .vds-input')!;
      const actualStyle=getComputedStyle(probe),expectedStyle=getComputedStyle(expected);
      for(const key of ['backgroundColor','borderTopColor','boxShadow','color'] as const)check(actualStyle[key]===expectedStyle[key],probe.dataset.inheritProbe+'/'+probe.dataset.expect+': inherited '+key+' matches local declaration');
    });
    setResult((total-fails.length)+'/'+total+' passed\n'+fails.join('\n')+'\n'+measurements.join('\n'));
  }))},[]);
  return <main style={{padding:24}}><h1>Field surface and tone audit</h1><pre id="surface-results">{result}</pre>
    <div data-theme="dark" data-theme-probe="nested dark" style={{color:'var(--vds-color-text)',background:'var(--vds-color-bg)'}}>
      Dark theme
      <div data-theme="light" data-theme-probe="nested light in dark" style={{color:'var(--vds-color-text)',background:'var(--vds-color-bg)'}}>
        Light theme reset
        <div data-theme="dark" data-theme-probe="nested dark in light" style={{color:'var(--vds-color-text)',background:'var(--vds-color-bg)'}}>Dark theme reset</div>
      </div>
    </div>
    <div aria-label="Theme and appearance nesting regression" style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:12}}>
      {themes.flatMap(theme=>modes.flatMap(mode=>tones.flatMap(tone=>[
        <div key={'mode-first'+theme+mode+tone} data-surface-style={mode} data-field-tone={tone}><div data-theme={theme}><Input data-inherit-probe="mode-tone then theme" data-expect={theme+'/'+mode+'/'+tone} aria-label="Inherited mode and tone"/></div></div>,
        <div key={'theme-first'+theme+mode+tone} data-theme={theme}><div data-surface-style={mode} data-field-tone={tone}><Input data-inherit-probe="theme then mode-tone" data-expect={theme+'/'+mode+'/'+tone} aria-label="Inherited theme"/></div></div>
      ])))}
      <div data-surface-style="bordered"><div data-surface-style="tonal" data-field-tone="strong"><div data-theme="dark-oled"><Input data-inherit-probe="nested mode override before OLED" data-expect="dark-oled/tonal/strong" aria-label="Nested mode override"/></div></div></div>
    </div>
    {themes.flatMap(theme=>modes.flatMap(mode=>tones.map(tone=><section key={theme+mode+tone} data-theme={theme} data-surface-style={mode} data-field-tone={tone} data-surface-case={theme+'/'+mode+'/'+tone} style={{padding:24,marginBlock:24,background:tone==='strong'?'var(--vds-color-primary-3)':'var(--vds-color-bg)',color:'var(--vds-color-text)'}}>
      <h2>{theme} / {mode} / {tone}</h2>
      <div data-field-group style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:24}}><Fields/></div>
      {tone==='strong'&&<div data-field-tone="default" style={{marginBlockStart:24}}><Input data-reset-probe aria-label="Default tone reset" placeholder="Nested default tone"/></div>}
    </section>)))}
  </main>
}
createRoot(document.getElementById('root')!).render(<Audit/>);
