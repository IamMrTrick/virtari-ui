import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@virtari-packages/react-card';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-card/styles';

function App() {
  const [report, setReport] = useState('Waiting for layout');
  useEffect(() => { let alive = true; (async () => {
    await document.fonts.ready;
    for (let i = 0; i < 5; i++) await new Promise(requestAnimationFrame);
    const results: string[] = [];
    const check = (name: string, pass: boolean) => results.push(`${pass ? 'PASS' : 'FAIL'} ${name}`);
    for (const dir of ['ltr', 'rtl']) {
      const card = document.getElementById(dir)!;
      const slots = Array.from(card.children) as HTMLElement[];
      check(`${dir} root leaves padding to slots`, getComputedStyle(card).paddingTop === '0px');
      check(`${dir} outer slot padding`, parseFloat(getComputedStyle(slots[0]).paddingTop) > 0 && parseFloat(getComputedStyle(slots[2]).paddingBottom) > 0);
      check(`${dir} single inter-section gap`, getComputedStyle(slots[0]).paddingBottom === '0px' && parseFloat(getComputedStyle(slots[1]).paddingTop) > 0);
      check(`${dir} long title and description stay within slots`, slots[0].scrollWidth <= slots[0].clientWidth + 1);
      check(`${dir} long body stays within slot`, slots[1].scrollWidth <= slots[1].clientWidth + 1);
      check(`${dir} footer actions wrap`, slots[2].children[1].getBoundingClientRect().top > slots[2].children[0].getBoundingClientRect().top);
      check(`${dir} native controls retain semantics`, slots[2].querySelectorAll('button').length === 2 && slots[2].querySelector('button')!.tabIndex === 0);
    }
    const content = document.querySelector('#standalone > div')!;
    check('content-only slot owns both outer insets', parseFloat(getComputedStyle(content).paddingTop) > 0 && parseFloat(getComputedStyle(content).paddingBottom) > 0);
    for (const theme of ['light', 'dark', 'dark-oled']) for (const surface of ['tonal', 'bordered', 'elevated']) {
      const outer = document.getElementById(`${theme}-${surface}`)!;
      const inner = outer.querySelector('.vds-card')!;
      check(`${theme} ${surface} nested surface differs`, getComputedStyle(outer).backgroundColor !== getComputedStyle(inner).backgroundColor);
    }
    if (alive) setReport(results.join('\n'));
  })(); return () => { alive = false; }; }, []);
  return <main style={{ padding: 16 }}>
    <h1>Card quality regression</h1>
    <p>256px containers, long tokens, Persian text, slot padding, footer wrap and scoped surfaces. Raw native buttons isolate the Card footer's layout and semantics.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {(['ltr', 'rtl'] as const).map(dir => <Card id={dir} dir={dir} key={dir} style={{ width: 256 }}>
        <CardHeader><CardTitle>DeploymentEnvironmentWithAnUnusuallyLongUnbrokenName</CardTitle><CardDescription>توضیحات محیط آزمایشی برای بررسی فاصله‌ها و خوانایی deployment-preview-with-a-long-unbroken-domain.example.test</CardDescription></CardHeader>
        <CardContent>environment_identifier_without_any_breaking_spaces_0123456789</CardContent>
        <CardFooter><button type="button">Save deployment target</button><button type="button" disabled>Disabled action</button></CardFooter>
      </Card>)}
      <Card id="standalone" style={{ width: 256 }}><CardContent>Content-only card</CardContent></Card>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBlock: 16 }}>
      {['light', 'dark', 'dark-oled'].map(theme => ['tonal', 'bordered', 'elevated'].map(surface => <div key={`${theme}-${surface}`} data-theme={theme} data-surface-style={surface}>
        <Card id={`${theme}-${surface}`} style={{ width: 256 }}><CardHeader><CardTitle>{theme} / {surface}</CardTitle></CardHeader><CardContent><Card><CardContent>Nested surface</CardContent></Card></CardContent></Card>
      </div>))}
    </div>
    <pre id="results" style={{ whiteSpace: 'pre-wrap' }}>{report}</pre>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
