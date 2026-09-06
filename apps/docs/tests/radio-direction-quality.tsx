import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { createRef } from 'react';
import { RadioGroup, RadioGroupItem, PillRadio, PillRadioItem, SegmentedRadio, SegmentedRadioItem } from '@virtari-packages/react-radio-group';
import { DirectionProvider } from '@virtari-packages/primitives/direction';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-radio-group/styles';
const root=createRoot(document.getElementById('root')!);
const results:string[]=[];
const check=(ok:boolean,name:string)=>results.push(`${ok?'PASS':'FAIL'} ${name}`);
const settle=()=>new Promise(resolve=>setTimeout(resolve,80));
async function run() {
  for(const [name,Group,Item] of [['RadioGroup',RadioGroup,RadioGroupItem],['PillRadio',PillRadio,PillRadioItem],['SegmentedRadio',SegmentedRadio,SegmentedRadioItem]] as const) {
    const ref=createRef<HTMLDivElement>();
    const options=<><Item value="a">First</Item><Item value="b">Second</Item></>;
    const render=(parent:'ltr'|'rtl',explicit?:'ltr'|'rtl',provider?:'ltr'|'rtl')=>flushSync(()=>root.render(<div id="host" dir={parent}>{provider?<DirectionProvider dir={provider}><Group ref={ref} aria-label={name} dir={explicit} orientation="horizontal" defaultValue="a">{options}</Group></DirectionProvider>:<Group ref={ref} aria-label={name} dir={explicit} orientation="horizontal" defaultValue="a">{options}</Group>}</div>));
    render('rtl');await settle();
    check(ref.current?.dir==='rtl',`${name} inherits native RTL`);
    check(ref.current?.getAttribute('role')==='radiogroup',`${name} composed ref preserves native root`);
    document.getElementById('host')!.dir='ltr';await settle();
    check(ref.current?.dir==='ltr',`${name} follows live ancestor direction`);
    render('rtl','ltr');await settle();check(ref.current?.dir==='ltr',`${name} explicit direction wins`);
    render('ltr',undefined,'rtl');await settle();check(ref.current?.dir==='rtl',`${name} DirectionProvider wins fallback`);
    render('rtl','ltr','rtl');await settle();check(ref.current?.dir==='ltr',`${name} explicit direction wins provider`);
  }
  document.getElementById('results')!.textContent=results.join('\n');
}
run().catch(error=>{document.getElementById('results')!.textContent=String(error);});
