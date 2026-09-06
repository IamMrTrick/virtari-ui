import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Button} from '@virtari-packages/react-button';
import {Input} from '@virtari-packages/react-input';
import {Textarea} from '@virtari-packages/react-textarea';
import {Select, SelectTrigger, SelectValue} from '@virtari-packages/react-select';
import {Toggle} from '@virtari-packages/react-toggle';
import {Checkbox} from '@virtari-packages/react-checkbox';
import {Kbd} from '@virtari-packages/react-kbd';
import {Card, CardContent} from '@virtari-packages/react-card';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
import '@virtari-packages/react-button/styles';
import '@virtari-packages/react-input/styles';
import '@virtari-packages/react-textarea/styles';
import '@virtari-packages/react-select/styles';
import '@virtari-packages/react-toggle/styles';
import '@virtari-packages/react-checkbox/styles';
import '@virtari-packages/react-kbd/styles';
import '@virtari-packages/react-card/styles';
const modes=['sharp','soft','round','pill'] as const;
const roles={sharp:{field:2,action:4,key:0,card:4},soft:{field:12,action:20,key:4,card:20},round:{field:16,action:24,key:6,card:24},pill:{field:16,action:9999,key:6,card:24}};
const frame=()=>new Promise(requestAnimationFrame);
function Specimen({mode,size,dir}:{mode:typeof modes[number];size:'sm'|'md'|'lg';dir:'ltr'|'rtl'}) {return <section data-sample data-radius={mode} data-size={size} dir={dir} style={{padding:16,border:'1px solid var(--vds-color-border-muted)',borderRadius:12}}>
<h2>{mode} / {size} / {dir}</h2><div style={{display:'flex',flexWrap:'wrap',gap:12,alignItems:'center'}}>
<Button size={size}>Save ذخیره</Button><Toggle size={size}>Pin</Toggle><Kbd>Ctrl K</Kbd><Checkbox size={size} aria-label="Check" />
<Input size={size} aria-label="Name" placeholder="Name"/><Textarea size={size} aria-label="Notes" rows={2}/>
<Select><SelectTrigger size={size} aria-label="Plan"><SelectValue placeholder="Plan" /></SelectTrigger></Select>
</div><Card data-test-card style={{marginTop:12}}><CardContent>Surface</CardContent></Card></section>}
function App(){const[report,setReport]=useState('Waiting');useEffect(()=>{let alive=true;(async()=>{await document.fonts.ready;await frame();await frame();const out:string[]=[];const check=(name:string,pass:boolean,detail='')=>out.push(`${pass?'PASS':'FAIL'} ${name} ${detail}`);const radius=(el:Element)=>parseFloat(getComputedStyle(el).borderTopLeftRadius);
const all=Array.from(document.querySelectorAll<HTMLElement>('[data-sample]'));
for(const sample of all){const mode=sample.dataset.radius as keyof typeof roles;const role=roles[mode];const id=mode+' '+sample.dataset.size+' '+sample.dir;
for(const selector of ['.vds-input','.vds-textarea','.vds-select-trigger']){const el=sample.querySelector(selector)!;check(id+' '+selector+' field role',radius(el)===role.field,String(radius(el)));}
for(const selector of ['.vds-button','.vds-toggle'])check(id+' '+selector+' action role',radius(sample.querySelector(selector)!)===role.action);
check(id+' compact keycap',radius(sample.querySelector('.vds-kbd')!)===role.key);
check(id+' surface hierarchy',radius(sample.querySelector('[data-test-card]')!)===role.card);
const checkbox=sample.querySelector('.vds-checkbox')!;check(id+' checkbox cannot become a radio',radius(checkbox)<=checkbox.getBoundingClientRect().height/4+.1);
const snapshot=Array.from(sample.querySelectorAll('.vds-input,.vds-textarea,.vds-select-trigger,.vds-button,.vds-toggle,.vds-kbd,.vds-checkbox,[data-test-card]')).map(radius);
for(const theme of ['light','dark','dark-oled'])for(const style of ['bordered','tonal','elevated']){sample.dataset.theme=theme;sample.dataset.surfaceStyle=style;const next=Array.from(sample.querySelectorAll('.vds-input,.vds-textarea,.vds-select-trigger,.vds-button,.vds-toggle,.vds-kbd,.vds-checkbox,[data-test-card]')).map(radius);check(id+' stable across '+theme+'/'+style,JSON.stringify(snapshot)===JSON.stringify(next));}
}
const nested=document.querySelector<HTMLElement>('[data-nested]')!;for(const outer of modes){nested.dataset.radius=outer;for(const inner of modes){const child=nested.querySelector<HTMLElement>('[data-inner]')!;child.dataset.radius=inner;check('nested '+outer+' / '+inner+' independently resolves field',radius(child.querySelector('input')!)===roles[inner].field);check('nested '+outer+' / '+inner+' independently resolves keycap',radius(child.querySelector('kbd')!)===roles[inner].key);}}
const live=all[0];for(const mode of ['pill','sharp','round','soft','sharp'] as const){live.dataset.radius=mode;await frame();check('live mode '+mode+' settles immediately',radius(live.querySelector('input')!)===roles[mode].field);}
if(alive)setReport(out.join('\n')+'\n'+out.filter(x=>x.startsWith('PASS')).length+'/'+out.length+' passed');})().catch(error=>{if(alive)setReport(String(error));});return()=>{alive=false}},[]);
return <main style={{padding:24}}><h1>Radius roles and stability</h1><pre id="results">{report}</pre><div style={{display:'grid',gap:16}}>{modes.flatMap(mode=>(['sm','md','lg'] as const).flatMap(size=>(['ltr','rtl'] as const).map(dir=><Specimen key={mode+size+dir} mode={mode} size={size} dir={dir}/>)))}</div><div data-nested data-radius="pill"><div data-inner data-radius="soft"><Input aria-label="Nested"/><Kbd>K</Kbd></div></div></main>}
createRoot(document.getElementById('root')!).render(<App/>);
