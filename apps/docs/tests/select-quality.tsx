import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-select/styles';
import '@virtari-packages/react-select/combobox/styles';
import '@virtari-packages/react-chip/styles';
import { Select, SelectField, SelectTrigger, SelectValue, SelectContent, SelectItem, Combobox, ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxList, ComboboxOptions, ComboboxItem } from '@virtari-packages/react-select';

const items = [{value:'prop-disabled',label:'Unavailable via item prop'},{value:'disabled', label:'Unavailable', disabled:true}, {value:'a',label:'Alpha'}, {value:'b',label:'Beta — a very long label فارسی با توضیح کامل that wraps in narrow menus'}];
const longItems=Array.from({length:50},(_,i)=>({value:String(i),label:'Option '+i+' — a long line فارسی that needs several lines in this popup'}));
const wait = () => new Promise(resolve => setTimeout(resolve,250));
async function run() {
 const checks:string[]=[];
 const check=(ok:boolean,label:string)=>checks.push(`${ok?'PASS':'FAIL'} ${label}`);
 const form=document.querySelector<HTMLFormElement>('#audit-form')!;
 const trigger=document.querySelector<HTMLElement>('#searchable')!;
 trigger.click(); await wait();
 const disabled=[...document.querySelectorAll<HTMLElement>('[role="option"][aria-disabled="true"]')];
 check(disabled.length===2,'Data and item disabled expose disabled semantics');
 for(const item of disabled) {item.click(); await wait();}
 check(new FormData(form).get('searchable')==='a','Mouse cannot select disabled data or item');
 const input=document.querySelector<HTMLInputElement>('.vds-combobox-input')!;
 check(!!input.getAttribute('aria-label'),'Search input has an accessible name');
 input.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true})); await wait();
 input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true})); await wait();
 check(new FormData(form).get('searchable')==='b','Keyboard selection serializes value');
 check(document.activeElement===trigger,'Selection returns focus');
 form.reset(); await wait();
 check(new FormData(form).get('searchable')==='a','Native reset restores default');
 trigger.querySelector<HTMLButtonElement>('.vds-combobox-clear')!.click(); await wait();
 check(document.activeElement===trigger && new FormData(form).get('searchable')==='','Clear returns focus and empties serialized selection');
 form.reset(); await wait();
 const noSearch=document.querySelector<HTMLElement>('#no-search')!;
 noSearch.focus(); await wait();
 noSearch.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true})); await wait();
 check(!!noSearch.getAttribute('aria-activedescendant'),'Non-searchable active descendant');
 noSearch.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true})); await wait();
 check(new FormData(form).get('plain')==='a','Non-searchable keyboard skips first disabled item');
 check(!new FormData(form).has('disabled'),'Disabled Combobox excluded from form');
 const labelled=document.querySelector('#labelled')!;
 check(labelled.getAttribute('aria-invalid')==='true' && !!document.getElementById(labelled.getAttribute('aria-describedby')!.split(' ')[0]),'SelectField error association');
 const clear=document.querySelector<HTMLButtonElement>('#select-slot .vds-select-clear')!;
 const value=document.querySelector<HTMLElement>('#select-slot .vds-select-trigger-value')!;
 const cr=clear.getBoundingClientRect(),vr=value.getBoundingClientRect();
 check(cr.left>=vr.right || cr.right<=vr.left,'Clear action reserves its full width');
 for (const id of ['scroll','virtual']) {
  const control=document.getElementById(id)!; control.focus(); control.click(); await wait();
  const search=document.querySelector<HTMLInputElement>('.vds-combobox-input')!;
  for(let i=0;i<20;i++) {search.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true})); await wait();}
  const active=document.getElementById(search.getAttribute('aria-activedescendant')!)!;
  const viewport=active.closest('.vds-combobox-options')!.getBoundingClientRect();
  const row=active.getBoundingClientRect();
  check(row.bottom<=viewport.bottom+1&&row.top>=viewport.top-1,`${id}: keyboard keeps active option visible`);
  if(id==='virtual') {
   const rows=[...document.querySelectorAll<HTMLElement>('[data-virtual-row]')];
   check(rows.every((row,index)=>index===0||row.getBoundingClientRect().top>=rows[index-1].getBoundingClientRect().bottom-1),'Virtual rows measure wrapped content without overlap');
  }
  search.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})); await wait();
 }
 document.querySelector('#report')!.textContent=checks.join('\n');
}
function Combo({id,searchable=true,disabled=false,virtualized=false,data=items}:{id:string;searchable?:boolean;disabled?:boolean;virtualized?:boolean;data?:typeof items}) {
 return <Combobox items={data} virtualized={virtualized} name={id==='no-search'?'plain':id} defaultValue={searchable?'a':''} searchable={searchable} disabled={disabled}><ComboboxTrigger id={id} aria-label={id} clearable/><ComboboxContent><ComboboxInput/><ComboboxList><ComboboxOptions>{item=><ComboboxItem key={item.value} value={item.value} disabled={item.value==='prop-disabled'}>{item.label}</ComboboxItem>}</ComboboxOptions></ComboboxList></ComboboxContent></Combobox>;
}
function App(){
 const [theme,setTheme]=useState('light');
 const [appearance,setAppearance]=useState('tonal');
 const [dir,setDir]=useState<'ltr'|'rtl'>('ltr');
 const [selected,setSelected]=useState('b');
 return <main style={{padding:24,maxInlineSize:700}}><h1>Select package quality</h1><button onClick={run}>Run checks</button><button onClick={()=>{const next=theme==='light'?'dark':theme==='dark'?'dark-oled':'light';setTheme(next);document.documentElement.dataset.theme=next;}}>Theme: {theme}</button><button onClick={()=>{const next=appearance==='tonal'?'bordered':appearance==='bordered'?'elevated':'tonal';setAppearance(next);document.documentElement.dataset.surfaceStyle=next;}}>Surface: {appearance}</button><button onClick={()=>{const next=dir==='ltr'?'rtl':'ltr';setDir(next);document.documentElement.dir=next;}}>Direction: {dir}</button><form id="audit-form" style={{display:'grid',gridTemplateColumns:'minmax(0,1fr)',gap:16,maxInlineSize:280,marginBlock:24}}><div id="select-slot"><Select value={selected} onValueChange={setSelected} dir={dir}><SelectTrigger clearable onClear={()=>setSelected('')} aria-label="Long select"><SelectValue placeholder="Choose"/></SelectTrigger><SelectContent>{items.map(item=><SelectItem key={item.value} value={item.value} disabled={item.disabled}>{item.label}</SelectItem>)}</SelectContent></Select></div><SelectField controlId="labelled" label="Billing plan" invalid error="Choose a plan">{({controlId,describedBy,invalid})=><Select><SelectTrigger id={controlId} aria-describedby={describedBy} invalid={invalid}><SelectValue placeholder="Choose a plan"/></SelectTrigger><SelectContent><SelectItem value="a">Alpha</SelectItem></SelectContent></Select>}</SelectField><Combo id="searchable"/><Combo id="no-search" searchable={false}/><Combo id="disabled" disabled/><Combo id="scroll" data={longItems}/><Combo id="virtual" data={longItems} virtualized/>{(['soft','outline','ghost','filled'] as const).map(appearance=><Select key={appearance}><SelectTrigger appearance={appearance} aria-label={appearance}><SelectValue placeholder={appearance}/></SelectTrigger><SelectContent><SelectItem value="a">Alpha</SelectItem></SelectContent></Select>)}</form><pre id="report" style={{whiteSpace:'pre-wrap'}}>Ready</pre></main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
