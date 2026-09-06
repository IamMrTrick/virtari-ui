import React from 'react';
import {createRoot} from 'react-dom/client';
import {SegmentedControl,SegmentedControlItem} from '@virtari-packages/react-segmented-control';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
import '@virtari-packages/react-segmented-control/styles';
const wait=()=>new Promise(resolve=>setTimeout(resolve,60));
let consumerCalls=0;
async function run(){
 consumerCalls=0;
 const lines:string[]=[];
 const check=(ok:boolean,label:string)=>lines.push(`${ok?'PASS':'FAIL'} ${label}`);
 for(const dir of ['ltr','rtl']){
  const group=document.querySelector(`[data-test="${dir}"]`)!;
  const items=[...group.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
  items[0].click();items[0].focus();await wait();
  const key=dir==='ltr'?'ArrowRight':'ArrowLeft';
  items[0].dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));await wait();
  document.dispatchEvent(new KeyboardEvent('keyup',{key,bubbles:true}));
  check(document.activeElement===items[2],`${dir}: arrow skips disabled item`);
  check(items[2].getAttribute('aria-checked')==='true',`${dir}: arrow selects focused item`);
  items[2].dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));await wait();
  document.dispatchEvent(new KeyboardEvent('keyup',{key,bubbles:true}));
  check(items[0].getAttribute('aria-checked')==='true',`${dir}: selection loops`);
 }
 check(consumerCalls===4,`Consumer key handlers are preserved (${consumerCalls}/4)`);
 document.querySelector('#report')!.textContent=lines.join('\n');
}
createRoot(document.getElementById('root')!).render(<main><h1>Segmented keyboard regression</h1><button onClick={run}>Run keyboard checks</button>{(['ltr','rtl'] as const).map(dir=><SegmentedControl key={dir} dir={dir} data-test={dir} defaultValue="a" aria-label={dir}><SegmentedControlItem value="a" onKeyDown={()=>consumerCalls++}>Alpha</SegmentedControlItem><SegmentedControlItem value="b" disabled>Disabled</SegmentedControlItem><SegmentedControlItem value="c" onKeyDown={()=>consumerCalls++}>Gamma</SegmentedControlItem></SegmentedControl>)}<pre id="report">Ready</pre></main>);
