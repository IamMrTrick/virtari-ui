import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, type ButtonColor, type ButtonVariant, type ButtonSize } from '@virtari-packages/react-button';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-button/styles';

const colors: ButtonColor[] = ['primary','success','warning','danger','info','accent','contrast'];
const variants: ButtonVariant[] = ['solid','outline','ghost','soft','link'];
const sizes: ButtonSize[] = ['2xs','xs','sm','md','lg','xl','2xl','3xl'];
const Icon = () => <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2"/></svg>;
function App() {
  const [report, setReport] = useState('Measuring package styles…');
  useEffect(() => { document.fonts.ready.then(() => requestAnimationFrame(() => {
    const lines: string[] = [];
    const check = (name: string, pass: boolean) => lines.push(`${pass ? 'PASS' : 'FAIL'} ${name}`);
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d', {willReadFrequently:true})!;
    const pixel = (layers: string[]) => {
      context.clearRect(0,0,1,1);
      for (const color of layers) { context.fillStyle = color; context.fillRect(0,0,1,1); }
      return [...context.getImageData(0,0,1,1).data].slice(0,3);
    };
    const luminance = (rgb: number[]) => rgb.map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum,value,index) => sum + value * [.2126,.7152,.0722][index],0);
    document.querySelectorAll<HTMLElement>('[data-palette]').forEach(button => {
      const style = getComputedStyle(button), host = getComputedStyle(button.closest('[data-theme]')!);
      for (const state of ['', '-hover', '-active']) {
        const bg = style.getPropertyValue(`--button-bg${state}`).trim();
        const overlay = state ? style.getPropertyValue(`--button-overlay${state}`).trim() : 'transparent';
        const foreground = style.getPropertyValue(`--button-text${state}`).trim();
        const layers = [host.backgroundColor,bg,overlay || 'transparent'];
        const a=luminance(pixel(layers)), b=luminance(pixel([...layers,foreground]));
        const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
        check(`${button.dataset.palette} ${state || 'rest'} contrast ${ratio.toFixed(2)}:1`, ratio >= 4.5);
      }
    });
    document.querySelectorAll<HTMLElement>('[data-long]').forEach(button => {
      const b=button.getBoundingClientRect(), c=button.querySelector('.vds-button-content')!.getBoundingClientRect();
      check(`${button.dataset.long} long label stays inside`,button.scrollWidth <= button.clientWidth + 1 && c.width <= button.clientWidth + 1 && b.width <= 240);
      check(`${button.dataset.long} icon remains centered`,[...button.querySelectorAll('svg')].every(icon=>{const i=icon.getBoundingClientRect();return Math.abs(i.top+i.height/2-b.top-b.height/2)<.6;}));
    });
    const link = document.getElementById('inline-link')!;
    check('link keeps inline geometry despite default md size',link.getBoundingClientRect().height < 30 && parseFloat(getComputedStyle(link).paddingInlineStart) === 0);
    document.querySelectorAll<HTMLElement>('[data-link-size]').forEach(button => {
      const style=getComputedStyle(button);
      check(`inline link ${button.dataset.linkSize} changes type without padding`,parseFloat(style.paddingInlineStart)===0 && parseFloat(style.paddingBlockStart)===0 && button.getBoundingClientRect().height<=parseFloat(style.lineHeight)+2.1);
    });
    document.querySelectorAll<HTMLElement>('[data-radius-case]').forEach(button => {
      const style=getComputedStyle(button);
      const probe=document.createElement('span'); probe.style.borderRadius=style.getPropertyValue('--vds-radius-button'); button.append(probe);
      check(`${button.dataset.radiusCase} uses its local action shape`,style.borderTopLeftRadius === getComputedStyle(probe).borderTopLeftRadius);
      probe.remove();
    });
    const stable = document.getElementById('loading-stable')!;
    check('loading preserves action name',stable.getAttribute('aria-label') === 'Save profile');
    setReport(lines.join('\n'));
  })); }, []);
  return <main style={{padding:24}}><h1>Button package quality</h1><details><summary>{report.startsWith('Measuring') ? report : `${report.split('\n').filter(line=>line.startsWith('PASS')).length} passed; ${report.split('\n').filter(line=>line.startsWith('FAIL')).length} failed`}</summary><pre id="results" style={{whiteSpace:'pre-wrap'}}>{report}</pre></details>
    <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>{['ltr','rtl'].map(dir=><section key={dir} dir={dir} style={{width:220}}><Button fullWidth data-long={dir} leftSection={<Icon/>} rightSection={<Icon/>}>Save all changes and continue to the next step تغییرات را ذخیره کن</Button></section>)}</div>
    <Button variant="link" id="inline-link">Inline link</Button>
    {sizes.map(size=><Button key={size} variant="link" size={size} data-link-size={size}>Inline {size}</Button>)}
    <div data-radius="pill">{['sharp','soft','round','pill'].map(radius=><div data-radius={radius} key={radius}><Button data-radius-case={radius}>Scoped {radius}</Button></div>)}</div>
    <Button loading id="loading-stable" aria-label="Save profile" loadingText="Saving profile">Save profile</Button>
    {['light','dark','dark-oled'].map(theme=> <div data-theme={theme} key={theme}>{['bordered','tonal','elevated'].map(surface=><section key={surface} data-theme={theme} data-surface-style={surface} style={{background:'var(--vds-surface-bg)',color:'var(--vds-color-text)',padding:24,marginBlock:16}}><h2>{theme} / {surface}</h2><div style={{display:'flex',flexWrap:'wrap',gap:16}}>{colors.flatMap(color=>variants.map(variant=><Button key={color+variant} color={color} variant={variant} data-palette={`${theme}/${surface}/${color}/${variant}`} leftSection={<Icon/>}>{color} {variant}</Button>))}</div></section>)}</div>)}
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
