import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Tabs, TabsList, TabsTrigger, type TabsSize, type TabsVariant } from '@virtari-packages/react-tabs';
import { SegmentedControl, SegmentedControlItem, type SegmentedControlSize } from '@virtari-packages/react-segmented-control';
import { DirectionProvider } from '@virtari-packages/primitives/direction';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
// Exercise the published standalone stylesheet: it must include the shared
// track and token rules without a separate Tabs style import.
import '../../../packages/react-segmented-control/dist/SegmentedControl.css';

const modes = ['sharp', 'soft', 'round', 'pill'] as const;
const sizes: TabsSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const variants: TabsVariant[] = ['underline', 'line', 'pills', 'segmented', 'boxed', 'bordered', 'solid', 'soft', 'ghost'];
const Icon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14" fill="none" stroke="currentColor" strokeWidth="2"/></svg>;
function TestTabs({size='md', variant='segmented', dir='ltr', orientation='horizontal'}: {size?:TabsSize; variant?:TabsVariant; dir?:'ltr'|'rtl'; orientation?:'horizontal'|'vertical'}) {
  return <Tabs defaultValue="one" dir={dir} orientation={orientation}><TabsList aria-label={`${variant} ${size}`} variant={variant} size={size} autoScroll={false}>
    <TabsTrigger value="one"><Icon/>First اول</TabsTrigger><TabsTrigger value="two">Second دوم</TabsTrigger>
  </TabsList></Tabs>;
}
function DirectionGroup({kind,dir}:{kind:'tabs'|'radio';dir?:'ltr'|'rtl'}) {
  return kind==='tabs'
    ? <Tabs defaultValue="one" dir={dir}><TabsList variant="segmented" autoScroll={false} aria-label="Direction tabs"><TabsTrigger value="one">First</TabsTrigger><TabsTrigger value="two">Second longer</TabsTrigger></TabsList></Tabs>
    : <SegmentedControl defaultValue="one" dir={dir} aria-label="Direction radios"><SegmentedControlItem value="one">First</SegmentedControlItem><SegmentedControlItem value="two">Second longer</SegmentedControlItem></SegmentedControl>;
}
function DirectionChecks() {
  const [dir,setDir]=useState<'ltr'|'rtl'>('rtl');
  const [report,setReport]=useState('Waiting for direction');
  useEffect(()=>{let active=true; requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const lines:string[]=[];
    document.querySelectorAll<HTMLElement>('[data-direction-case]').forEach(sample=>{
      const list=sample.querySelector<HTMLElement>('.vds-tabs-list')!;
      const item=list.querySelector<HTMLElement>('.vds-tabs-trigger')!;
      const style=getComputedStyle(list), expected=sample.dataset.expected;
      lines.push(`${style.direction===expected?'PASS':'FAIL'} ${sample.dataset.directionCase}: ${dir} ancestor / ${expected} effective`);
      const tx=expected==='rtl'?item.offsetLeft+item.offsetWidth-list.clientWidth:item.offsetLeft;
      lines.push(`${Math.abs(parseFloat(style.getPropertyValue('--tabs-indicator-tx'))-tx)<0.6?'PASS':'FAIL'} ${sample.dataset.directionCase}: live indicator position`);
    });
    document.querySelectorAll<HTMLElement>('[data-boxed-direction]').forEach(sample=>{
      const list=sample.querySelector('.vds-tabs-list')!;
      const trigger=list.querySelector('.vds-tabs-trigger')!;
      const origin=getComputedStyle(trigger,'::before').getPropertyValue('--tabs-boxed-curve-origin-x').trim();
      lines.push(`${origin===(sample.dataset.boxedDirection==='rtl'?'100%':'0%')?'PASS':'FAIL'} boxed ${sample.dataset.boxedDirection}: curve obeys own direction`);
    });
    document.querySelectorAll<HTMLElement>('[data-static-edge]').forEach(sample=>{
      const trigger=sample.querySelector('.vds-tabs-trigger')!;
      const x=parseFloat(getComputedStyle(trigger).boxShadow.match(/-?[\d.]+px/)?.[0]??'NaN');
      const expected=(sample.dataset.staticEdge==='underline'?-2:2)*(sample.dataset.edgeDir==='rtl'?-1:1);
      lines.push(`${x===expected?'PASS':'FAIL'} static ${sample.dataset.staticEdge} ${sample.dataset.edgeDir}: indicator follows logical edge`);
    });
    if(active)setReport(`${lines.filter(x=>x.startsWith('PASS')).length}/${lines.length} passed (${dir} ancestor)\n${lines.join('\n')}`);
  }));return()=>{active=false};},[dir]);
  return <section><h2>Inherited direction and provider precedence</h2><button type="button" onClick={()=>setDir(dir==='rtl'?'ltr':'rtl')}>Switch ancestor direction</button><pre id="direction-results">{report}</pre><div dir={dir} style={{display:'flex',flexWrap:'wrap',gap:16}}>
    {(['tabs','radio'] as const).flatMap(kind=>[
      <div key={kind+'inherit'} data-direction-case={kind+' inherited'} data-expected={dir}><DirectionGroup kind={kind}/></div>,
      <div key={kind+'explicit'} data-direction-case={kind+' explicit LTR'} data-expected="ltr"><DirectionGroup kind={kind} dir="ltr"/></div>,
      <div key={kind+'providerRtl'} data-direction-case={kind+' provider RTL'} data-expected="rtl"><DirectionProvider dir="rtl"><DirectionGroup kind={kind}/></DirectionProvider></div>,
      <div key={kind+'providerLtr'} data-direction-case={kind+' provider LTR'} data-expected="ltr"><DirectionProvider dir="ltr"><DirectionGroup kind={kind}/></DirectionProvider></div>,
      <div key={kind+'overrideRtl'} data-direction-case={kind+' explicit RTL overrides provider'} data-expected="rtl"><DirectionProvider dir="ltr"><DirectionGroup kind={kind} dir="rtl"/></DirectionProvider></div>,
      <div key={kind+'overrideLtr'} data-direction-case={kind+' explicit LTR overrides provider'} data-expected="ltr"><DirectionProvider dir="rtl"><DirectionGroup kind={kind} dir="ltr"/></DirectionProvider></div>,
    ])}
    {(['ltr','rtl'] as const).map(ownDir=><div key={'boxed'+ownDir} data-boxed-direction={ownDir}><TestTabs variant="boxed" dir={ownDir}/></div>)}
    {(['ltr','rtl'] as const).flatMap(ownDir=>(['underline','line'] as const).map(variant=><div key={ownDir+variant} data-static-edge={variant} data-edge-dir={ownDir}><Tabs defaultValue="one" dir={ownDir} orientation="vertical"><TabsList variant={variant} animatedIndicator={false} aria-label="Static edge"><TabsTrigger value="one">First</TabsTrigger><TabsTrigger value="two">Second</TabsTrigger></TabsList></Tabs></div>))}
  </div></section>;
}
function App() {
  const [report,setReport] = useState('Waiting for layout');
  useEffect(() => { let active=true; document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => {
    const lines:string[]=[];
    const assert=(ok:boolean, text:string) => lines.push(`${ok?'PASS':'FAIL'} ${text}`);
    const close=(a:number,b:number) => Math.abs(a-b)<0.6;
    document.querySelectorAll<HTMLElement>('[data-case]').forEach(sample => {
      const list=sample.querySelector<HTMLElement>('.vds-tabs-list')!;
      const trigger=list.querySelector<HTMLElement>('.vds-tabs-trigger')!;
      const style=getComputedStyle(list), tile=getComputedStyle(trigger), indicator=getComputedStyle(list,'::after');
      const box=list.getBoundingClientRect(), tileBox=trigger.getBoundingClientRect();
      const mode=sample.closest<HTMLElement>('[data-radius]')!.dataset.radius!;
      const label=sample.dataset.case+' '+mode;
      const radius=parseFloat(style.borderTopLeftRadius);
      if(list.dataset.variant==='segmented') {
        const renderedOuter=Math.min(radius,box.width/2,box.height/2);
        const inset=parseFloat(style.paddingTop)+parseFloat(style.borderTopWidth);
        const expected=Math.max(0,Math.min(renderedOuter-inset,tileBox.width/2,tileBox.height/2));
        const renderedInner=Math.min(parseFloat(tile.borderTopLeftRadius),tileBox.width/2,tileBox.height/2);
        const renderedIndicator=Math.min(parseFloat(indicator.borderTopLeftRadius),parseFloat(indicator.width)/2,parseFloat(indicator.height)/2);
        assert(close(renderedInner,expected),`${label}: nested trigger follows rendered track (${renderedInner}/${expected})`);
        assert(close(renderedIndicator,expected),`${label}: animated indicator follows trigger (${renderedIndicator}/${expected})`);
        assert(close(parseFloat(indicator.width),tileBox.width)&&close(parseFloat(indicator.height),tileBox.height),`${label}: indicator fills selected tile`);
        assert(getComputedStyle(list).direction===sample.dataset.dir,`${label}: explicit direction preserved`);
        if(list.dataset.orientation==='vertical') assert(radius<100,`${label}: vertical track remains finite`);
        const content=trigger.querySelector<HTMLElement>('.vds-tabs-trigger-content');
        assert(!!content&&getComputedStyle(content).display==='flex',`${label}: shared icon/text layout`);
      } else if(list.dataset.variant==='boxed') {
        assert(close(parseFloat(tile.borderTopLeftRadius),mode==='sharp'?2:8),`${label}: boxed curve follows compact mode role`);
        assert(close(parseFloat(tile.borderBottomLeftRadius),0),`${label}: boxed attachment stays square`);
      } else if(['underline','line'].includes(list.dataset.variant!)) {
        assert(parseFloat(tile.borderTopLeftRadius)===0,`${label}: line tabs keep a square edge`);
      } else if(list.dataset.variant==='pills') {
        assert(parseFloat(tile.borderTopLeftRadius)>=tileBox.height/2,`${label}: explicit pills preserve capsule shape`);
      } else {
        assert(parseFloat(tile.borderTopLeftRadius)>=(mode==='sharp'?0:8),`${label}: action tabs use mode-aware corners`);
      }
    });
    if(active)setReport(`${lines.filter(x=>x.startsWith('PASS')).length}/${lines.length} passed\n${lines.join('\n')}`);
  }))); return()=>{active=false}; },[]);
  return <main style={{padding:24}}><h1>Tabs and segmented radius regression</h1><p>Rendered corner geometry across modes, sizes, directions and orientations.</p><pre id="results" style={{maxHeight:220,overflow:'auto'}}>{report}</pre><DirectionChecks/>
    {modes.map(mode=><section key={mode} data-radius={mode}><h2>{mode}</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(360px,1fr))',gap:20}}>
      {(['ltr','rtl'] as const).flatMap(dir=>(['horizontal','vertical'] as const).flatMap(orientation=>[
        ...sizes.map(size=><div key={`tabs${dir}${orientation}${size}`} data-dir={dir} data-case={`tabs ${size} ${dir} ${orientation}`}><TestTabs size={size} dir={dir} orientation={orientation}/></div>),
        ...(['sm','md','lg'] as SegmentedControlSize[]).map(size=><div key={`radio${dir}${orientation}${size}`} data-dir={dir} data-case={`segmented ${size} ${dir} ${orientation}`}><SegmentedControl defaultValue="one" size={size} dir={dir} orientation={orientation} aria-label="View"><SegmentedControlItem value="one" icon={<Icon/>}>First اول</SegmentedControlItem><SegmentedControlItem value="two">Second دوم</SegmentedControlItem></SegmentedControl></div>)
      ]))}
      {variants.filter(x=>x!=='segmented').map(variant=><div key={variant} data-case={`variant ${variant}`}><TestTabs variant={variant}/></div>)}
    </div></section>)}
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
