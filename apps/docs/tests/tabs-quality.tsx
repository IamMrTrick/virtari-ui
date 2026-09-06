import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsPanels } from '@virtari-packages/react-tabs';
import { SegmentedControl, SegmentedControlItem } from '@virtari-packages/react-segmented-control';
import '@virtari-packages/react-segmented-control/styles';

const pause = () => new Promise(resolve => setTimeout(resolve, 180));
const Icon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14" fill="none" stroke="currentColor" strokeWidth="2"/></svg>;
function Pair() {
  return <><Tabs defaultValue="a"><TabsList variant="segmented" fullWidth aria-label="Wrapped tabs"><TabsTrigger value="a"><Icon/>Account preferences</TabsTrigger><TabsTrigger value="b">گزارش‌های سالانه</TabsTrigger></TabsList></Tabs><SegmentedControl defaultValue="a" fullWidth aria-label="Wrapped preference"><SegmentedControlItem value="a" icon={<Icon/>}>Account preferences</SegmentedControlItem><SegmentedControlItem value="b">گزارش‌های سالانه</SegmentedControlItem></SegmentedControl></>;
}
function App() {
  const [report, setReport] = useState('Checking package…');
  const [panel, setPanel] = useState('b');
  useEffect(() => { void (async () => {
    await document.fonts.ready; await pause();
    const lines: string[] = [];
    const check = (label: string, ok: boolean) => lines.push(`${ok ? 'PASS' : 'FAIL'} ${label}`);
    const close = (a: number, b: number) => Math.abs(a - b) <= 1;
    document.querySelectorAll<HTMLElement>('[data-sample]').forEach(host => {
      const label = host.dataset.sample;
      host.querySelectorAll<HTMLElement>('.vds-tabs-list').forEach(list => {
        const item = list.querySelector<HTMLElement>('.vds-tabs-trigger')!;
        const content = item.querySelector<HTMLElement>('.vds-tabs-trigger-content')!;
        const box = list.getBoundingClientRect(), itemBox = item.getBoundingClientRect(), contentBox = content.getBoundingClientRect();
        const styles = getComputedStyle(list), tile = getComputedStyle(item), indicator = getComputedStyle(list, '::after');
        const outerRadius = Math.min(parseFloat(styles.borderTopLeftRadius), box.height / 2, box.width / 2);
        const expected = Math.max(0, Math.min(outerRadius - parseFloat(styles.paddingTop), itemBox.height / 2, itemBox.width / 2));
        const innerRadius = Math.min(parseFloat(tile.borderTopLeftRadius), itemBox.height / 2, itemBox.width / 2);
        const indicatorRadius = Math.min(parseFloat(indicator.borderTopLeftRadius), itemBox.height / 2, itemBox.width / 2);
        check(`${label}: contained full width`, list.scrollWidth <= list.clientWidth + 1 && box.width <= host.clientWidth + 1);
        check(`${label}: multiline content fits`, item.scrollWidth <= item.clientWidth + 1 && itemBox.height >= contentBox.height);
        check(`${label}: label vertically centered`, close(contentBox.top + contentBox.height / 2, itemBox.top + itemBox.height / 2));
        check(`${label}: inset trigger and indicator radii`, close(innerRadius, expected) && close(indicatorRadius, expected));
        check(`${label}: indicator fills active item`, close(parseFloat(indicator.width), itemBox.width) && close(parseFloat(indicator.height), itemBox.height));
        const tx = styles.direction === 'rtl' ? item.offsetLeft + item.offsetWidth - list.clientWidth : item.offsetLeft;
        check(`${label}: indicator follows active position`, close(parseFloat(styles.getPropertyValue('--tabs-indicator-tx')), tx) && close(parseFloat(styles.getPropertyValue('--tabs-indicator-ty')), item.offsetTop));
        check(`${label}: intrinsic SVG has a reserved icon size`, close(content.querySelector('svg')!.getBoundingClientRect().width, 18));
        check(`${label}: inset keyboard focus`, parseFloat(tile.outlineOffset) <= -2 || parseFloat(tile.getPropertyValue('--tabs-trigger-focus-ring-offset')) <= -2);
      });
    });
    for (const id of ['rtl-scroll', 'ltr-scroll', 'boxed-scroll']) {
      const host = document.getElementById(id)!;
      const list = host.querySelector<HTMLElement>('.vds-tabs-list')!;
      const active = list.querySelector<HTMLElement>('[data-state="active"]')!;
      const a = active.getBoundingClientRect(), b = list.getBoundingClientRect();
      check(`${id}: active item scrolled into view`, a.left >= b.left - 1 && a.right <= b.right + 1);
      check(`${id}: list owns overflow`, host.scrollWidth <= host.clientWidth + 1 && list.scrollWidth > list.clientWidth);
    }
    const standalone = document.querySelector<HTMLElement>('#standalone .vds-segmented-control')!;
    check('inline radio wrapper stays inside narrow parent', standalone.offsetWidth <= 260);
    const vertical = document.querySelector<HTMLElement>('#vertical .vds-tabs-list')!;
    check('vertical long text wraps within parent', vertical.scrollWidth <= 220 && vertical.getBoundingClientRect().width <= 220);
    const inactive = document.querySelector<HTMLElement>('#carousel .vds-tabs-panels-slide:not([data-active="true"])')!;
    const hiddenInput = inactive.querySelector<HTMLInputElement>('input')!;
    hiddenInput.focus();
    check('inactive carousel panel blocks focus and accessibility', inactive.inert && inactive.getAttribute('aria-hidden') === 'true' && document.activeElement !== hiddenInput);
    const track = document.querySelector<HTMLElement>('#carousel .vds-tabs-panels-track')!;
    check('nested explicit LTR carousel overrides RTL ancestor', getComputedStyle(track).getPropertyValue('--tabs-panels-tx-sign').trim() === '1');
    const form = document.getElementById('preference-form') as HTMLFormElement;
    check('radio preference serializes', new FormData(form).get('period') === 'day');
    document.getElementById('week')!.click(); await pause();
    check('radio preference selection serializes', new FormData(form).get('period') === 'week');
    form.reset(); await pause();
    check('form reset restores radio preference', new FormData(form).get('period') === 'day' && document.getElementById('day')!.getAttribute('aria-checked') === 'true');
    document.getElementById('canceled')!.click(); await pause();
    check('consumer cancellation preserves selection', document.getElementById('canceled')!.getAttribute('aria-checked') === 'false');
    setReport(`${lines.filter(line => line.startsWith('PASS')).length}/${lines.length} passed\n${lines.join('\n')}`);
  })(); }, []);
  return <main style={{padding:24, color:'var(--vds-color-text)', background:'var(--vds-color-bg)'}}>
    <h1>Tabs and segmented quality</h1><pre id="results" style={{maxHeight:170,overflow:'auto',whiteSpace:'pre-wrap'}}>{report}</pre>
    <h2>Keyboard, scrolling and carousel</h2><div style={{display:'flex',flexWrap:'wrap',gap:24}}>
      {(['rtl-scroll','ltr-scroll','boxed-scroll'] as const).map(id => <div id={id} key={id} style={{width:260}}><Tabs dir={id==='rtl-scroll'?'rtl':'ltr'} defaultValue="4"><TabsList variant={id==='boxed-scroll'?'boxed':'segmented'} aria-label={id}>{Array.from({length:5},(_,n)=><TabsTrigger key={n} value={String(n)}>Section {n+1}</TabsTrigger>)}</TabsList></Tabs></div>)}
      <div id="standalone" style={{width:260}}><SegmentedControl defaultValue="a" aria-label="Inline scrolling radios"><SegmentedControlItem value="a">A long first preference</SegmentedControlItem><SegmentedControlItem value="b">Another long preference</SegmentedControlItem></SegmentedControl></div>
      <div id="vertical" style={{width:220}}><SegmentedControl defaultValue="a" orientation="vertical" aria-label="Vertical preference"><SegmentedControlItem value="a">AnExtremelyLongUnbrokenPreferenceLabel</SegmentedControlItem><SegmentedControlItem value="b">Other preference</SegmentedControlItem></SegmentedControl></div>
      <div id="keyboard" style={{width:260}}><Tabs defaultValue="a" dir="rtl"><TabsList variant="segmented" aria-label="RTL keyboard"><TabsTrigger value="a">First</TabsTrigger><TabsTrigger value="b" disabled>Disabled</TabsTrigger><TabsTrigger value="c">Third</TabsTrigger></TabsList><TabsContent value="a">First panel</TabsContent><TabsContent value="c">Third panel</TabsContent></Tabs></div>
      <div id="carousel" dir="rtl" style={{width:260}}><Tabs dir="ltr" value={panel} onValueChange={setPanel}><TabsList variant="segmented" aria-label="Carousel"><TabsTrigger value="a">First slide</TabsTrigger><TabsTrigger value="b">Second slide</TabsTrigger></TabsList><TabsPanels>{['a','b'].map(value=><TabsContent key={value} value={value}><label>{value} input<input aria-label={`${value} input`}/></label></TabsContent>)}</TabsPanels></Tabs></div>
      <form id="preference-form"><SegmentedControl name="period" defaultValue="day" aria-label="Form preference"><SegmentedControlItem id="day" value="day">Day</SegmentedControlItem><SegmentedControlItem id="week" value="week">Week</SegmentedControlItem><SegmentedControlItem id="canceled" value="cancel" onClick={event=>event.preventDefault()}>Canceled</SegmentedControlItem></SegmentedControl></form>
    </div><h2>250px tracks: themes, surfaces, shapes and scripts</h2><div style={{display:'flex',flexWrap:'wrap',gap:20}}>
      {(['light','dark','dark-oled'] as const).flatMap(theme=>(['bordered','tonal','elevated'] as const).flatMap(surface=>(['sharp','soft','round','pill'] as const).map(radius=><section key={`${theme}-${surface}-${radius}`} data-theme={theme} data-surface-style={surface} data-radius={radius} data-sample={`${theme} ${surface} ${radius}`} dir={radius==='round'?'rtl':'ltr'} style={{width:250,padding:12,boxSizing:'content-box',color:'var(--vds-color-text)',background:'var(--vds-color-surface)',display:'grid',gap:12}}><strong>{theme} / {surface} / {radius}</strong><Pair/></section>)))}
    </div>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
