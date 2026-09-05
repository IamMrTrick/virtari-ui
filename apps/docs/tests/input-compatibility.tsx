import React, { useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Input, InputField, PasswordInput, PasswordInputField } from '@virtari-packages/react-input';
import { Textarea, TextareaField } from '@virtari-packages/react-textarea';
import { NumberInput } from '@virtari-packages/react-number-input';
import { TagInput } from '../../../packages/react-tag-input/src/TagInput';
import { OtpInput } from '@virtari-packages/react-otp-input';
import { PhoneInput } from '@virtari-packages/react-phone-input';
import { loadLibPhone } from '../../../packages/react-phone-input/src/lazy-libphonenumber';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Combobox, ComboboxTrigger, ComboboxContent, ComboboxInput, ComboboxList, ComboboxItem } from '@virtari-packages/react-select';
import { DateField, TimeField, DatePicker, DateRangePicker } from '@virtari-packages/react-date-picker';
import { YooptaEditor } from '@virtari-packages/react-yoopta-editor';
import { CellEditor } from '../../../packages/react-data-table/src/editing/CellEditor';
import { CalendarDate, Time } from '@internationalized/date';
import { Checkbox } from '@virtari-packages/react-checkbox';
import { Switch } from '@virtari-packages/react-switch';
import { RadioGroup, RadioGroupItem } from '@virtari-packages/react-radio-group';
import { Slider } from '@virtari-packages/react-slider';
import { FileUploadInput } from '@virtari-packages/react-file-upload';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
import '@virtari-packages/react-input/styles';
import '@virtari-packages/react-textarea/styles';
import '@virtari-packages/react-select/styles';
import '@virtari-packages/react-select/combobox/styles';

const tick = () => new Promise<void>(resolve => setTimeout(resolve, 30));
let testRoot: Root | undefined;
let host: HTMLDivElement;
const results: {name:string; pass:boolean; detail?:string}[] = [];
const assert = (condition: unknown, message: string) => { if (!condition) throw Error(message); };
async function mount(node: React.ReactNode) {
  if(testRoot) { flushSync(()=>testRoot!.unmount()); await tick(); }
  host.replaceChildren(); testRoot = createRoot(host);
  flushSync(()=>testRoot!.render(node)); await tick();
}
const input = () => host.querySelector('input:not([type=hidden]),textarea') as HTMLInputElement;
async function fill(el: HTMLInputElement | HTMLTextAreaElement, value:string) {
  el.focus();
  Object.getOwnPropertyDescriptor(el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype, 'value')!.set!.call(el,value);
  el.dispatchEvent(new Event('input',{bubbles:true}));
  el.dispatchEvent(new Event('change',{bubbles:true})); await tick();
}
async function key(el:HTMLElement,key:string, composing=false) {
  const e=new KeyboardEvent('keydown',{key,bubbles:true,cancelable:true,isComposing:composing});
  el.dispatchEvent(e); await tick(); return e;
}
async function test(name:string,run:()=>Promise<void>) {
  try { await run(); results.push({name,pass:true}); }
  catch(error) { results.push({name,pass:false,detail:String(error)}); }
  document.getElementById('results')!.textContent=JSON.stringify(results,null,2);
}
function Registered({Control, props={}}:{Control:any;props?:any}) {
  const f=useForm({defaultValues:{audit:'',other:''}});
  const [,update]=useState(0);
  return <form><Control {...props} {...f.register('audit')} aria-label="Audit control" autoComplete="current-password" /><Input {...f.register('other')} /><button type="button" onClick={()=>update(n=>n+1)}>Rerender</button><button type="button" onClick={()=>document.getElementById('observed')!.textContent=JSON.stringify({length:f.getValues('audit').length,domLength:(document.querySelector('[name=audit]') as HTMLInputElement).value.length})}>Inspect form</button></form>;
}
const choices=[{value:'a',label:'Alpha'},{value:'b',label:'Beta'}];
function Combo({name}:{name?:string}) { return <Combobox items={choices} defaultValue="a" {...({name} as any)}><ComboboxTrigger aria-label="Choice"/><ComboboxContent><ComboboxInput aria-label="Find choice"/><ComboboxList>{choices.map(c=><ComboboxItem key={c.value} value={c.value}>{c.label}</ComboboxItem>)}</ComboboxList></ComboboxContent></Combobox> }

async function run() {
 results.length=0; document.getElementById('status')!.textContent='Running';
 const types=['text','email','password','search','tel','url','number','date','datetime-local','month','week','time','color','range','hidden','checkbox','radio','file','button','submit','reset','image'];
 for(const type of types) await test(`Input/${type}: native attributes reach input`,async()=>{
   await mount(<Input type={type} name="native" id="native" autoComplete="on" form="owner" disabled required />);
   const e=host.querySelector('input')!;
   assert(e.type===type && e.name==='native' && e.id==='native' && e.getAttribute('autocomplete')==='on' && e.disabled && e.required && e.getAttribute('form')==='owner','Native attribute lost');
 });
 for(const [name,Control,props] of [['Input',Input,{}],['InputField',InputField,{}],['Password/InputField',InputField,{type:'password',revealable:true}],['PasswordInput',PasswordInput,{}],['PasswordInputField',PasswordInputField,{}],['Textarea',Textarea,{}],['TextareaField',TextareaField,{}]] as const) {
  await test(`${name}: input/change fill survives React Hook Form rerender with same node and focus`,async()=>{
    await mount(<Registered Control={Control} props={props}/>); const e=input(); await fill(e,'Audit-only-123!');
    host.querySelectorAll('button')[host.querySelectorAll('button').length-2].click(); await tick();
    assert(input()===e && e.isConnected && document.activeElement===e,'Node replaced or focus lost');
    assert(e.value==='Audit-only-123!','Autofill-style value lost');
    host.querySelectorAll('button')[host.querySelectorAll('button').length-1].click(); await tick();
    const observed=JSON.parse(document.getElementById('observed')!.textContent!);
    assert(observed.length==='Audit-only-123!'.length && observed.domLength===observed.length,`DOM and registered value differ: ${JSON.stringify(observed)}`);
  });
  await test(`${name}: React 19 callback-ref cleanup is honored`,async()=>{
    let cleaned=false; await mount(<Control {...props} ref={(node:any)=>node ? ()=>{cleaned=true;} : undefined}/>);
    await mount(null); assert(cleaned,'Cleanup returned by consumer ref was discarded');
  });
 }
 await test('InputField/password: reveal action obeys disabled',async()=>{
   await mount(<InputField type="password" disabled revealable defaultValue="Audit"/>);
   assert(host.querySelector('button')!.disabled,'Reveal button remains enabled');
 });
 for(const [name,Control] of [['InputField',InputField],['PasswordInput',PasswordInput]] as const) await test(`${name}: password reveal keeps value and node`,async()=>{
   await mount(<Control type="password" revealable defaultValue="Audit-only-123!"/> as any);const e=input();host.querySelector('button')!.click();await tick();
   assert(input()===e && e.value==='Audit-only-123!' && e.type==='text','Reveal replaces node or changes value');
 });
 await test('NumberInput: uncontrolled defaultValue',async()=>{
   await mount(<NumberInput defaultValue={5}/>);assert(input().value==='5',`Expected 5, got ${JSON.stringify(input().value)}`);
 });
 await test('NumberInput: uncontrolled fill and stepper',async()=>{
   await mount(<NumberInput/>);await fill(input(),'12');assert(input().value==='12','Uncontrolled input is forced empty');
   host.querySelector('button')!.click();await tick();assert(input().value==='13','Stepper does not update uncontrolled value');
 });
 function Numeric(){const[v,set]=useState<number|undefined>(1);return <NumberInput value={v} onChange={set}/>}
 await test('NumberInput: preserve intermediate decimal while editing',async()=>{
   await mount(<Numeric/>);await fill(input(),'1.');assert(input().value==='1.','Decimal separator discarded');
 });
 await test('NumberInput: callback ref supports wheel',async()=>{
   function Wheel(){const[v,set]=useState<number|undefined>(5);return <NumberInput value={v} onChange={set} wheelEnabled ref={()=>{}}/>}
   await mount(<Wheel/>);input().focus();input().dispatchEvent(new WheelEvent('wheel',{deltaY:-100,bubbles:true,cancelable:true}));await tick();assert(input().value==='6','Wheel behavior fails with callback ref');
 });
 await test('NumberInput: consumer key handler composes with stepping',async()=>{
   function Num(){const[v,set]=useState<number|undefined>(5);return <NumberInput value={v} onChange={set} onKeyDown={()=>{}}/>}
   await mount(<Num/>);await key(input(),'ArrowUp');assert(input().value==='6','Consumer onKeyDown replaced internal stepping');
 });
 await test('TagInput: paste commits all tags once',async()=>{
   let tags:string[]=[];let calls=0;function Tags(){const[v,set]=useState<string[]>([]);return <TagInput value={v} onChange={n=>{tags=n;calls++;set(n)}}/>}
   await mount(<Tags/>);const data=new DataTransfer();data.setData('text/plain','alpha,beta,gamma');input().dispatchEvent(new ClipboardEvent('paste',{bubbles:true,cancelable:true,clipboardData:data}));await tick();
   assert(tags.join(',')==='alpha,beta,gamma' && calls===1,`Got ${tags.join(',')} in ${calls} callbacks`);
 });
 await test('TagInput: readonly forbids deletion',async()=>{
   let changed=false;await mount(<TagInput value={['alpha']} readOnly onChange={()=>{changed=true;}}/>);await key(input(),'Backspace');assert(!changed,'Backspace modifies readonly tags');
 });
 await test('TagInput: reaching maxTags keeps focused input mounted',async()=>{
   function Tags(){const[v,set]=useState<string[]>([]);return <TagInput maxTags={1} value={v} onChange={set}/>}
   await mount(<Tags/>);const e=input();await fill(e,'alpha');await key(e,'Enter');assert(e.isConnected && document.activeElement===e,'Focused input is removed on reaching maxTags');
 });
 await test('TagInput: consumer key handler does not replace internal handler',async()=>{
   let result:string[]=[];await mount(<TagInput value={[]} onChange={v=>result=v} onKeyDown={()=>{}}/>);await fill(input(),'alpha');await key(input(),'Enter');assert(result[0]==='alpha','Consumer onKeyDown disables tag entry');
 });
 await test('TagInput: IME confirmation must not create a tag',async()=>{
   let result:string[]=[];await mount(<TagInput value={[]} onChange={v=>result=v}/>);await fill(input(),'alpha');await key(input(),'Enter',true);assert(result.length===0,'IME Enter creates a tag');
 });
 await test('Select: no nested interactive buttons when clearable',async()=>{
   await mount(<Select defaultValue="a"><SelectTrigger clearable><SelectValue/></SelectTrigger><SelectContent><SelectItem value="a">Alpha</SelectItem></SelectContent></Select>);
   assert(!host.querySelector('button button'),'Clear button nested inside trigger button');
 });
 await test('Select: native autofill updates visible selection and FormData',async()=>{
   await mount(<form><Select name="country" autoComplete="country" defaultValue="a"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="a">Alpha</SelectItem><SelectItem value="b">Beta</SelectItem></SelectContent></Select></form>);
   const e=host.querySelector('select')!;e.value='b';e.dispatchEvent(new Event('change',{bubbles:true}));await tick();
   assert(new FormData(host.querySelector('form')!).get('country')==='b' && host.querySelector('button')!.textContent?.includes('Beta'),'Native select and visible value differ');
 });
 await test('Combobox: search Home key preserves native caret editing',async()=>{
   await mount(<Combo/>);host.querySelector('[role=combobox]')!.dispatchEvent(new MouseEvent('click',{bubbles:true}));await tick();
   const e=document.querySelector('.vds-combobox-input') as HTMLInputElement;await fill(e,'a');const event=await key(e,'Home');assert(!event.defaultPrevented,'Home intercepted for list navigation');
 });
 await test('Combobox: IME Enter does not select a result',async()=>{
   await mount(<Combo/>);host.querySelector('[role=combobox]')!.dispatchEvent(new MouseEvent('click',{bubbles:true}));await tick();
   const e=document.querySelector('.vds-combobox-input') as HTMLInputElement;const event=await key(e,'Enter',true);assert(!event.defaultPrevented && e.isConnected,'IME Enter commits a result and closes search');
 });
 await test('OTP: complete code fill, normalization and FormData',async()=>{
   let completed='';function OTP(){const[v,set]=useState('');return <form><OtpInput name="otp" value={v} onChange={set} onComplete={v=>completed=v}/></form>}
   await mount(<OTP/>);await fill(input(),'۱۲۳۴۵۶');assert(completed==='123456' && new FormData(host.querySelector('form')!).get('otp')==='123456','OTP fill failed');
 });
 await test('OTP: disabled code excluded from native form',async()=>{
   await mount(<form><OtpInput name="otp" value="123456" disabled/></form>);assert(!new FormData(host.querySelector('form')!).has('otp'),'Disabled OTP still submitted');
 });
 for(const [name,Control,value] of [['DateField',DateField,new CalendarDate(2026,9,5)],['DatePicker',DatePicker,new CalendarDate(2026,9,5)],['TimeField',TimeField,new Time(12,30)]] as const) await test(`${name}: declared name appears in native FormData`,async()=>{
   await mount(<form><Control name="when" defaultValue={value as any} label="When"/></form>);assert(new FormData(host.querySelector('form')!).has('when'),'name prop produces no native form value');
 });
 await loadLibPhone();
 await test('PhoneInput: disabled number excluded from native form',async()=>{
   await mount(<form><PhoneInput name="phone" defaultCountry="us" defaultValue="4155552671" disabled/></form>);
   assert(!new FormData(host.querySelector('form')!).has('phone'),'Disabled phone still submitted');
 });
 await test('PhoneInput: readonly country selector cannot be changed',async()=>{
   await mount(<PhoneInput defaultCountry="us" defaultValue="4155552671" readOnly/>);const e=host.querySelector('[role=combobox]')!;
   assert(e.getAttribute('aria-disabled')==='true' || (e as HTMLButtonElement).disabled,'Country selector still interactive while number is readonly');
 });
 for(const[name,node]of [
   ['Checkbox',<Checkbox name="choice" defaultChecked/>],['Switch',<Switch name="choice" defaultChecked/>],
   ['RadioGroup',<RadioGroup name="choice" defaultValue="a"><RadioGroupItem value="a" aria-label="Alpha"/></RadioGroup>],
   ['Slider',<Slider name="choice" defaultValue={[50]}/>],
 ] as const) await test(`${name}: native form value`,async()=>{await mount(<form>{node}</form>);assert(new FormData(host.querySelector('form')!).has('choice'),'Missing native form value');});
 await test('FileUploadInput: native file name, multiple, disabled, accept',async()=>{
   await mount(<FileUploadInput name="upload" multiple disabled accept="image/*"/>);const e=input();assert(e.type==='file' && e.name==='upload' && e.multiple && e.disabled && e.accept==='image/*','Native file props lost');
 });

 for (const [name,Control,value] of [['DateField',DateField,new CalendarDate(2026,9,5)],['DatePicker',DatePicker,new CalendarDate(2026,9,5)],['TimeField',TimeField,new Time(12,30)]] as const) {
  await test(name+': disabled and external form association',async()=>{
   await mount(<><form id="external"/><Control name="when" form="external" defaultValue={value as any} label="When"/></>);
   assert(new FormData(host.querySelector('form')!).get('when')===value.toString(),'External form association or serialization failed');
   await mount(<form><Control name="when" defaultValue={value as any} isDisabled label="When"/></form>);
   assert(!new FormData(host.querySelector('form')!).has('when'),'Disabled date/time submitted');
  });
  await test(name+': form reset restores default',async()=>{
   await mount(<form><Control name="when" defaultValue={value as any} label="When"/></form>);
   const segment=host.querySelector('[role=spinbutton]') as HTMLElement;segment.focus();await key(segment,'ArrowUp');
   host.querySelector('form')!.reset();await tick();
   assert(new FormData(host.querySelector('form')!).get('when')===value.toString(),'Reset did not restore default');
  });
 }
 await test('DateRangePicker: both names serialize',async()=>{
  await mount(<form><DateRangePicker startName="start" endName="end" defaultValue={{start:new CalendarDate(2026,9,5),end:new CalendarDate(2026,9,8)}} label="Range"/></form>);
  const data=new FormData(host.querySelector('form')!);assert(data.get('start')==='2026-09-05'&&data.get('end')==='2026-09-08','Range fields missing');
 });
 await test('NumberInput: reset restores default and native form',async()=>{
  await mount(<form><NumberInput name="n" defaultValue={5}/></form>);await fill(input(),'12.5');host.querySelector('form')!.reset();await tick();
  assert(input().value==='5'&&new FormData(host.querySelector('form')!).get('n')==='5','Number reset failed');
 });
 await test('NumberInput: cancelled key and IME keep value',async()=>{
  await mount(<NumberInput defaultValue={5} onKeyDown={e=>e.preventDefault()}/>);await key(input(),'ArrowUp');assert(input().value==='5','Cancelled arrow stepped');
  await mount(<NumberInput defaultValue={5}/>);await key(input(),'ArrowUp',true);assert(input().value==='5','IME stepped');
 });
 await test('TagInput: repeated form values and reset',async()=>{
  function Tags(){const[v,set]=useState(['a']);return <form><TagInput name="tag" value={v} onChange={set}/></form>}
  await mount(<Tags/>);await fill(input(),'b');await key(input(),'Enter');assert(new FormData(host.querySelector('form')!).getAll('tag').join(',')==='a,b','Draft submitted instead of tags');
  host.querySelector('form')!.reset();await tick();assert(new FormData(host.querySelector('form')!).getAll('tag').join(',')==='a','Tags reset failed');
 });
 await test('OTP: uncontrolled fill and reset',async()=>{
  await mount(<form><OtpInput name="otp" defaultValue="12"/></form>);await fill(input(),'123456');assert(new FormData(host.querySelector('form')!).get('otp')==='123456','Uncontrolled OTP did not fill');
  host.querySelector('form')!.reset();await tick();assert(new FormData(host.querySelector('form')!).get('otp')==='12','OTP reset failed');
 });
 await test('Select: root disabled also disables clear',async()=>{
  let cleared=false;await mount(<Select disabled defaultValue="a"><SelectTrigger clearable onClear={()=>cleared=true}><SelectValue/></SelectTrigger><SelectContent><SelectItem value="a">Alpha</SelectItem></SelectContent></Select>);
  const clear=host.querySelector('.vds-select-clear') as HTMLButtonElement;clear.click();assert(clear.disabled&&!cleared,'Disabled selection cleared');
 });
 await test('Combobox: native value and reset',async()=>{
  await mount(<form><Combobox name="choice" defaultValue="a" items={[{value:'a',label:'Alpha'},{value:'b',label:'Beta'}]}><ComboboxTrigger clearable/><ComboboxContent><ComboboxInput/><ComboboxList><ComboboxItem value="a">Alpha</ComboboxItem><ComboboxItem value="b">Beta</ComboboxItem></ComboboxList></ComboboxContent></Combobox></form>);
  assert(new FormData(host.querySelector('form')!).get('choice')==='a','Combobox name not submitted');
  (host.querySelector('.vds-combobox-clear') as HTMLButtonElement).click();await tick();host.querySelector('form')!.reset();await tick();assert(new FormData(host.querySelector('form')!).get('choice')==='a','Combobox reset failed');
 });
 await test('PhoneInput: international paste infers country',async()=>{
  let country='';await mount(<PhoneInput defaultCountry="us" onChange={v=>country=v.country}/>);await fill(input(),'+447911123456');
  assert(country!=='us'&&host.querySelector('[role=combobox]')?.textContent?.includes('+44'),'International paste retained wrong country');
 });
 await test('CellEditor: IME Enter does not commit',async()=>{
  let commits=0;await mount(<CellEditor value="test" onValueChange={()=>{}} onCancel={()=>{}} onCommit={()=>commits++}/>);await key(input(),'Enter',true);assert(commits===0,'IME committed cell');
 });
 await test('PhoneInput: reset restores number and callback country',async()=>{
  let country='';await mount(<form><PhoneInput name="phone" defaultCountry="us" defaultValue="4155552671" onChange={v=>country=v.country}/></form>);
  await fill(input(),'+447911123456');host.querySelector('form')!.reset();await tick();
  assert(country==='us'&&new FormData(host.querySelector('form')!).get('phone')==='+14155552671','Reset number or reported country differs from default');
 });
 await test('YooptaEditor: external value and readonly preserve latest document',async()=>{
  const doc=(text:string)=>({one:{id:'one',type:'Paragraph',meta:{order:0,depth:0},value:[{id:'p',type:'paragraph',children:[{text}]}]}});
  function EditorTest(){const[v,set]=useState<any>(doc('Initial document'));const[locked,lock]=useState(false);return <><button data-load onClick={()=>set(doc('Replacement document'))}>Load document</button><button data-lock onClick={()=>lock(!locked)}>Toggle readonly</button><YooptaEditor value={v} onChange={set} readOnly={locked}/></>}
  await mount(<EditorTest/>);await tick();(host.querySelector('[data-load]') as HTMLButtonElement).click();await tick();
  assert(host.querySelector('.vds-yoopta-editor')?.textContent?.includes('Replacement document'),'External document ignored: '+host.querySelector('.vds-yoopta-editor')?.textContent);
  (host.querySelector('[data-lock]') as HTMLButtonElement).click();await tick();assert(host.querySelector('.vds-yoopta-editor')?.textContent?.includes('Replacement document'),'Readonly restored initial content');
  assert(!host.querySelector('.vds-yoopta-editor [contenteditable=true]'),'Readonly still editable');
 });
 await mount(<div><h2>Manual focus check</h2><Combo/><Input aria-label="Outside combobox"/></div>);
 document.getElementById('status')!.textContent=`Complete: ${results.filter(r=>r.pass).length} passed, ${results.filter(r=>!r.pass).length} failed, ${results.length} total`;
 document.getElementById('results')!.textContent=JSON.stringify(results,null,2);
}
createRoot(document.getElementById('root')!).render(<main style={{fontFamily:'system-ui',padding:24}}><h1>Input compatibility audit</h1><p>Synthetic test data only. Input/change simulation is not a real browser password-manager test.</p><button onClick={()=>run()}>Run audit</button><p id="status">Ready</p><output id="observed"/><pre id="results"/><div ref={node=>{if(node)host=node;}}/></main>);
