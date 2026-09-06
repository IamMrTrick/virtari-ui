import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Card } from '@virtari-packages/react-card';
import { Button } from '@virtari-packages/react-button';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-card/styles';
import '@virtari-packages/react-button/styles';
import '@virtari-packages/utilities';

function App() {
  const [report, setReport] = useState('Measuring…');
  useEffect(() => {
    const measure = () => {
      const lines: string[] = [];
      const check = (name: string, pass: boolean) => lines.push(`${pass ? 'PASS' : 'FAIL'} ${name}`);
      document.querySelectorAll<HTMLElement>('[data-case]').forEach(host => {
        const label = host.dataset.case!;
        const flex = host.querySelector<HTMLElement>('[data-flex]')!;
        const style = getComputedStyle(flex);
        check(`${label}: explicit row overrides Card column`, style.flexDirection === 'row');
        check(`${label}: responsive gap`, parseFloat(style.gap) === (innerWidth >= 768 ? 24 : 8));
        check(`${label}: utility padding overrides Card padding`, parseFloat(style.paddingInlineStart) === 16);
        check(`${label}: narrow buttons wrap inside Card`, flex.scrollWidth <= flex.clientWidth + 1 && style.flexWrap === 'wrap');
        const logical = host.querySelector<HTMLElement>('[data-logical]')!;
        const first = logical.children[0].getBoundingClientRect(), last = logical.children[1].getBoundingClientRect();
        check(`${label}: logical auto margin stays on inline row`, Math.abs(first.top - last.top) < 1 && (host.dir === 'rtl' ? first.left > last.left : first.left < last.left));
        const empty = host.querySelector<HTMLElement>('[data-zero]')!;
        check(`${label}: zero padding overrides component`, getComputedStyle(empty).padding === '0px');
      });
      const grid = document.getElementById('responsive-grid')!;
      check('responsive grid column count', getComputedStyle(grid).gridTemplateColumns.split(' ').length === (innerWidth >= 768 ? 3 : innerWidth >= 640 ? 2 : 1));
      check('no page horizontal overflow', document.documentElement.scrollWidth <= innerWidth);
      setReport(lines.join('\n'));
    };
    document.fonts.ready.then(() => requestAnimationFrame(measure));
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  return <main style={{ padding: 16 }}><h1>Utilities package quality</h1><details open><summary>{report.startsWith('Measuring') ? report : `${report.split('\n').filter(x => x.startsWith('PASS')).length} passed; ${report.split('\n').filter(x => x.startsWith('FAIL')).length} failed`}</summary><pre style={{ whiteSpace: 'pre-wrap' }}>{report}</pre></details>
    <div id="responsive-grid" className="vds-u-grid vds-u-grid-cols-1 sm:vds-u-grid-cols-2 md:vds-u-grid-cols-3 vds-u-gap-4">{[1,2,3].map(n => <Card key={n}>Item {n}</Card>)}</div>
    <div data-theme="dark">{['light','dark','dark-oled'].flatMap(theme => ['bordered','tonal','elevated'].flatMap(surface => ['ltr','rtl'].map(dir => <section key={`${theme}/${surface}/${dir}`} data-case={`${theme}/${surface}/${dir}`} data-theme={theme} data-surface-style={surface} dir={dir} style={{maxWidth: 260, paddingBlock: 16, color:'var(--vds-color-text)', background:'var(--vds-color-background)'}}>
      <h2>{theme} / {surface} / {dir}</h2>
      <Card data-flex className="vds-u-flex vds-u-flex-row vds-u-flex-wrap vds-u-gap-2 md:vds-u-gap-6 vds-u-p-4"><Button>One</Button><Button variant="outline">Two</Button><Button variant="ghost">Three</Button></Card>
      <Card data-logical className="vds-u-flex vds-u-flex-row vds-u-items-center vds-u-gap-3 vds-u-p-4"><span className="vds-u-mis-auto">Start</span><span>Follows</span></Card>
      <Card data-zero className="vds-u-p-0">No padding</Card>
    </section>)))}</div>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
