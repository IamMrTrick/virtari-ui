import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { InputField, PasswordInputField } from '@virtari-packages/react-input';
import { TextareaField } from '@virtari-packages/react-textarea';
import { NumberInputField } from '@virtari-packages/react-number-input';
import { hasFieldContent } from '@virtari-packages/react-fieldset';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-input/styles';
import '@virtari-packages/react-textarea/styles';
import '@virtari-packages/react-number-input/styles';
const root=createRoot(document.getElementById('root')!),results:string[]=[];
const check=(ok:boolean,name:string)=>results.push(`${ok?'PASS':'FAIL'} ${name}`);
const components=[InputField,PasswordInputField,TextareaField,NumberInputField];
for(const [index,Component] of components.entries()) {
  const name=['InputField','PasswordInputField','TextareaField','NumberInputField'][index];
  const render=(props:Record<string,unknown>)=>flushSync(()=>root.render(<Component label={name} {...props}/>));
  const control=()=>document.querySelector<HTMLInputElement|HTMLTextAreaElement>('input,textarea')!;
  // Password strength is a valid additional description; isolate Field metadata.
  const associated=()=>control().getAttribute('aria-describedby')?.split(' ').filter(id=>!id.endsWith('-strength')).map(id=>document.getElementById(id))??[];
  render({description:0,error:0,counter:0});
  check(associated().length===3&&associated().every(e=>e?.textContent==='0'),`${name} zero metadata is rendered and associated`);
  check(control().getAttribute('aria-invalid')==='true',`${name} rendered error infers invalid`);
  render({description:'',error:false,counter:null});
  check(associated().length===0,`${name} empty/false/null metadata creates no dangling IDs`);
  if(index<3) {
    render({showCounter:true,counterFormatter:()=>null});check(associated().length===0,`${name} empty formatter has no counter ID`);
    render({showCounter:true,maxLength:0});check(associated().some(e=>e?.textContent==='0/0'),`${name} zero maxLength is displayed`);
  }
  render({'aria-invalid':'grammar'});check(control().getAttribute('aria-invalid')==='grammar',`${name} grammar value is preserved`);
  render({'aria-invalid':'spelling',invalid:false,error:'Message'});check(control().getAttribute('aria-invalid')==='false',`${name} explicit invalid=false wins`);
  render({'aria-invalid':false,error:'Message'});check(control().getAttribute('aria-invalid')==='false',`${name} explicit native invalid=false wins inference`);
}
check(hasFieldContent(0)&&!hasFieldContent([null,false,''])&&hasFieldContent([null,0]),'shared content predicate matches metadata rendering');
document.getElementById('results')!.textContent=results.join('\n');
