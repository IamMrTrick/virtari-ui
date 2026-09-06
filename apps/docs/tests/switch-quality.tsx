import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import { Switch } from '@virtari-packages/react-switch';
import '@virtari-packages/react-switch/styles';
import { Label } from '@virtari-packages/react-label';
import '@virtari-packages/react-label/styles';

const pause = () => new Promise(resolve => setTimeout(resolve, 80));
const button = (id: string) => document.getElementById(id) as HTMLButtonElement;
const checked = (id: string) => button(id).getAttribute('aria-checked') === 'true';
let pointerCalls = 0;
const pointer = (id: string, type: string, x: number) => button(id).dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse', button: 0, clientX: x }));
async function drag(id: string, from: number, to: number, end = 'pointerup') {
  pointer(id, 'pointerdown', from); pointer(id, 'pointermove', to); pointer(id, end, to); await pause();
}
function App() {
  const [report, setReport] = useState('Checking package…');
  const [controlled, setControlled] = useState(true);
  useEffect(() => { void (async () => {
    await document.fonts.ready; await pause();
    const lines: string[] = [];
    const check = (label: string, ok: boolean) => lines.push(`${ok ? 'PASS' : 'FAIL'} ${label}`);
    const form = document.getElementById('native') as HTMLFormElement;
    check('named checked switch serializes its value', new FormData(form).get('setting') === 'enabled');
    document.querySelector<HTMLLabelElement>('label[for="native-switch"]')!.click(); await pause();
    check('label activation toggles state and serialization', !checked('native-switch') && !new FormData(form).has('setting'));
    form.reset(); await pause();
    check('native reset restores default checked state and serialization', checked('native-switch') && new FormData(form).get('setting') === 'enabled');
    const external = document.getElementById('external') as HTMLFormElement;
    button('external-switch').click(); await pause(); external.reset(); await pause();
    check('external form reset restores state and serialization', button('external-switch').form === external && checked('external-switch') && new FormData(external).has('external-setting'));
    const canceled = document.getElementById('canceled-form') as HTMLFormElement;
    button('canceled-reset').click(); await pause(); canceled.reset(); await pause();
    check('canceled reset preserves changed state and serialization', !checked('canceled-reset') && !new FormData(canceled).has('canceled-setting'));
    const controlledForm = document.getElementById('controlled-form') as HTMLFormElement;
    button('controlled').click(); await pause(); controlledForm.reset(); await pause();
    check('controlled consumer can decline reset without submitted state diverging', !checked('controlled') && !new FormData(controlledForm).has('controlled-setting'));
    pointer('canceled-click', 'pointerdown', 0); pointer('canceled-click', 'pointerup', 0); button('canceled-click').click(); await pause();
    check('pointer tap honors consumer click cancellation', !checked('canceled-click'));
    pointer('tap', 'pointerdown', 0); pointer('tap', 'pointerup', 0);
    check('tap waits for the native click', !checked('tap'));
    button('tap').click(); await pause(); check('native click toggles the tap once', checked('tap'));
    await drag('drag', 0, 40);
    check('consumer pointer handler composes with drag', checked('drag') && pointerCalls === 1);
    button('drag').click(); await pause();
    check('keyboard-style click is not swallowed after drag', !checked('drag'));
    await drag('rtl-drag', 40, 0);
    check('RTL drag toward inline end turns on', checked('rtl-drag'));
    await drag('canceled-drag', 0, 40);
    check('consumer canceled pointerup prevents drag commit and cleans visuals', !checked('canceled-drag') && !button('canceled-drag').hasAttribute('data-dragging'));
    await drag('cancel-event', 0, 40, 'pointercancel');
    check('pointercancel restores resting visuals without commit', !checked('cancel-event') && !(button('cancel-event').firstElementChild as HTMLElement).style.translate);
    await drag('no-drag', 0, 40);
    check('dragEnabled false does not drag', !checked('no-drag'));
    button('disabled').click(); await pause(); check('disabled switch stays unchanged', !checked('disabled'));
    const required = document.getElementById('required-form') as HTMLFormElement;
    check('required switch participates in validation', !required.checkValidity());
    button('required').click(); await pause(); check('checked required switch is valid', required.checkValidity());
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    const pixel = (colors: string[]) => { ctx.clearRect(0, 0, 1, 1); colors.forEach(color => { ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1); }); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const lum = (rgb: number[]) => rgb.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    document.querySelectorAll<HTMLElement>('[data-sample]').forEach(host => {
      const name = host.dataset.sample;
      const row = host.querySelector<HTMLElement>('[data-row]')!;
      check(`${name} long label fits narrow row`, row.scrollWidth <= row.clientWidth + 1);
      host.querySelectorAll<HTMLElement>('.vds-switch').forEach(control => {
        const thumb = control.firstElementChild!;
        const a = control.getBoundingClientRect(), b = thumb.getBoundingClientRect();
        check(`${name} ${control.dataset.size} thumb centered in track`, Math.abs(a.top + a.height / 2 - b.top - b.height / 2) < 1 && b.left >= a.left && b.right <= a.right);
        const bg = lum(pixel([getComputedStyle(host).backgroundColor]));
        const fg = lum(pixel([getComputedStyle(host).backgroundColor, getComputedStyle(control).backgroundColor]));
        const ratio = (Math.max(bg, fg) + .05) / (Math.min(bg, fg) + .05);
        check(`${name} track contrast ${ratio.toFixed(2)}:1`, ratio >= 3);
      });
    });
    const refHost = document.createElement('div'); document.body.append(refHost);
    const refRoot = createRoot(refHost); let attached = 0, cleaned = 0;
    flushSync(() => refRoot.render(<Switch aria-label="Ref cleanup" ref={node => {
      if (node instanceof HTMLButtonElement) attached++;
      return () => { cleaned++; };
    }} />));
    check(`consumer callback ref receives native button (${attached} attachments)`, attached >= 1);
    flushSync(() => refRoot.unmount());
    check(`React 19 callback ref cleanup is preserved (${cleaned}/${attached})`, cleaned === attached);
    refHost.remove();
    setReport(lines.join('\n'));
  })(); }, []);
  return <main style={{ padding: 24 }}>
    <h1>Switch package quality</h1>
    <details><summary>{report.startsWith('Checking') ? report : `${report.split('\n').filter(x => x.startsWith('PASS')).length} passed; ${report.split('\n').filter(x => x.startsWith('FAIL')).length} failed`}</summary><pre id="results" style={{ whiteSpace: 'pre-wrap' }}>{report}</pre></details>
    <form id="native"><Switch id="native-switch" name="setting" value="enabled" defaultChecked /><Label htmlFor="native-switch">Email updates</Label><button type="reset">Reset setting</button></form>
    <form id="external" /><Switch id="external-switch" form="external" name="external-setting" defaultChecked aria-label="External form switch" />
    <form id="canceled-form" onReset={e => e.preventDefault()}><Switch id="canceled-reset" name="canceled-setting" defaultChecked aria-label="Canceled reset switch" /></form>
    <form id="required-form"><Switch id="required" name="required-setting" required aria-label="Required switch" /></form>
    <form id="controlled-form"><Switch id="controlled" name="controlled-setting" checked={controlled} onCheckedChange={next => { if (!next) setControlled(next); }} aria-label="Controlled switch" /></form>
    <div style={{ display: 'flex', gap: 12, paddingBlock: 16, flexWrap: 'wrap' }}>
      <Switch id="canceled-click" aria-label="Canceled click" onClick={e => e.preventDefault()} />
      <Switch id="tap" aria-label="Native tap" />
      <Switch id="drag" aria-label="Drag with consumer handler" onPointerDown={() => { pointerCalls++; }} />
      <Switch id="rtl-drag" aria-label="RTL drag" dir="rtl" />
      <Switch id="canceled-drag" aria-label="Canceled drag" onPointerUp={e => e.preventDefault()} />
      <Switch id="cancel-event" aria-label="Pointer cancel" />
      <Switch id="no-drag" aria-label="No drag" dragEnabled={false} />
      <Switch id="disabled" aria-label="Disabled switch" disabled />
      <Switch id="keyboard" aria-label="Keyboard switch" />
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {['light', 'dark', 'dark-oled'].map((theme, index) => <section key={theme} data-theme={theme} data-surface-style={['bordered', 'tonal', 'elevated'][index]} data-radius={['sharp', 'soft', 'pill'][index]} data-sample={theme} dir={index === 1 ? 'rtl' : 'ltr'} style={{ width: 230, padding: 16, boxSizing: 'border-box', background: 'var(--vds-color-surface)', color: 'var(--vds-color-text)' }}>
        <h2>{theme}</h2>
        <div data-row style={{ display: 'flex', alignItems: 'center', gap: 'var(--vds-gap-icon)' }}><Switch id={`long-${theme}`} /><Label htmlFor={`long-${theme}`}>Long setting label with فارسی and room for wrapping</Label></div>
        <div style={{ display: 'flex', gap: 12, paddingBlockStart: 16 }}><Switch size="sm" aria-label={`${theme} small`} /><Switch defaultChecked aria-label={`${theme} checked`} /><Switch size="lg" aria-label={`${theme} large`} /></div>
      </section>)}
    </div>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
