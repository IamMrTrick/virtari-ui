import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@virtari-packages/react-button';
import { Badge } from '@virtari-packages/react-badge';
import { Chip, ChipLabel, ChipIcon } from '@virtari-packages/react-chip';
import { Toggle } from '@virtari-packages/react-toggle';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
import '@virtari-packages/react-button/styles';
import '@virtari-packages/react-badge/styles';
import '@virtari-packages/react-chip/styles';
import '@virtari-packages/react-toggle/styles';
const Icon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2"/></svg>;
function App() {
  const [report,setReport] = useState('Waiting for fonts');
  useEffect(() => { document.fonts.ready.then(() => requestAnimationFrame(() => {
    const results: string[] = [];
    document.querySelectorAll<HTMLElement>('[data-sample]').forEach(sample => {
      sample.querySelectorAll<HTMLElement>('.vds-button,.vds-chip,.vds-badge,.vds-toggle').forEach(control => {
        const box=control.getBoundingClientRect(), css=getComputedStyle(control);
        const label=control.querySelector<HTMLElement>('.vds-button-label,.vds-chip-label');
        const labelBox=label?.getBoundingClientRect();
        const centered=!labelBox || Math.abs((labelBox.top+labelBox.bottom-box.top-box.bottom)/2)<0.6;
        const fits=box.height >= parseFloat(css.lineHeight)+parseFloat(css.borderTopWidth)+parseFloat(css.borderBottomWidth)-0.5;
        const symmetric=css.paddingTop===css.paddingBottom;
        results.push((centered&&fits&&symmetric?'PASS':'FAIL')+' '+sample.dataset.sample+' '+control.className);
      });
    });
    setReport(results.join('\n'));
  })); },[]);
  return <main style={{padding:24}}><h1>Control geometry regression</h1><p>Line-box alignment, symmetric padding and no clipping with mixed scripts, font changes and large text. Visual glyph balance remains font-dependent.</p>
    {['Arial','Georgia','monospace'].flatMap(font => ['ltr','rtl'].flatMap(dir => [14,24].map(size => <section key={font+dir+size} dir={dir} data-sample={font+' '+dir+' '+size} style={{'--vds-font-sans':font,marginBlock:24} as React.CSSProperties}>
      <h2>{font} · {dir} · {size}px</h2><div style={{display:'flex',flexWrap:'wrap',gap:16,alignItems:'center'}}>
        <Button size="sm" style={{fontSize:size}} leftSection={<Icon/>}>Agj É ثبت تغییرات</Button>
        <Chip size="sm" style={{fontSize:size}}><ChipIcon><Icon/></ChipIcon><ChipLabel>Agj É ثبت تغییرات</ChipLabel></Chip>
        <Badge style={{fontSize:size}}>Agj É ثبت تغییرات</Badge>
        <Toggle style={{fontSize:size}}><Icon/>Agj É ثبت تغییرات</Toggle>
      </div></section>)))}<pre id="results">{report}</pre></main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
