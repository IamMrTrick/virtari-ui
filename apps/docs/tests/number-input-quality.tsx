import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-number-input/styles';
import { NumberInput, NumberInputField } from '@virtari-packages/react-number-input';

function App() {
  const [report, setReport] = useState('Waiting for layout');
  useEffect(() => { document.fonts.ready.then(() => requestAnimationFrame(() => {
    const results: string[] = [];
    const check = (name: string, pass: boolean) => results.push(`${pass ? 'PASS' : 'FAIL'} ${name}`);
    document.querySelectorAll<HTMLElement>('[data-sample]').forEach(sample => {
      const shell = sample.querySelector<HTMLElement>('.vds-number-input')!;
      const input = shell.querySelector<HTMLInputElement>('input')!;
      const css = getComputedStyle(shell), box = shell.getBoundingClientRect();
      const buttons = [...shell.querySelectorAll<HTMLButtonElement>('button')];
      check(`${sample.dataset.sample} contained`, box.width <= sample.clientWidth + 1 && input.clientHeight >= parseFloat(getComputedStyle(input).lineHeight));
      if (shell.dataset.stepper === 'inline') {
        check(`${sample.dataset.sample} fixed step targets`, buttons.every(button => Math.abs(button.getBoundingClientRect().width - parseFloat(css.minBlockSize)) < 1));
        check(`${sample.dataset.sample} logical order`, (buttons[0].getBoundingClientRect().left < input.getBoundingClientRect().left) === (sample.dir !== 'rtl'));
      }
      check(`${sample.dataset.sample} symmetric text padding`, getComputedStyle(input).paddingTop === getComputedStyle(input).paddingBottom);
    });
    check('aria-invalid styles shell', document.querySelector('#aria-invalid')!.closest('.vds-number-input')!.hasAttribute('data-invalid'));
    check('aria-invalid false leaves shell valid', !document.querySelector('#aria-valid')!.closest('.vds-number-input')!.hasAttribute('data-invalid'));
    check('readonly step controls hidden', [...document.querySelectorAll<HTMLElement>('#readonly button')].every(button => getComputedStyle(button).display === 'none'));
    check('disabled native control', document.querySelector<HTMLInputElement>('#disabled')!.disabled);
    const keyboard = document.querySelector<HTMLInputElement>('#keyboard')!;
    keyboard.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowUp',bubbles:true,cancelable:true}));
    requestAnimationFrame(() => {
      check('consumer cancels stepping', keyboard.value === '4');
      setReport(results.join('\n'));
    });
  })); }, []);
  return <main style={{padding:24,maxWidth:800}}><h1>Number input package quality</h1>
    <pre id="results">{report}</pre>
    {(['light','dark','dark-oled'] as const).flatMap(theme => (['bordered','tonal','elevated'] as const).map(surface =>
      <section key={theme+surface} data-theme={theme} data-surface-style={surface} style={{padding:16,marginBlock:16,background:'var(--vds-color-surface)',color:'var(--vds-color-text)'}}>
        <h2>{theme} / {surface}</h2>
        {(['ltr','rtl'] as const).map(dir => <div key={dir} dir={dir} data-sample={`${theme} ${surface} ${dir}`} style={{maxWidth:360,marginBlock:12}}>
          <NumberInputField label={`Quantity ${dir} تعداد`} stepper="inline" defaultValue={4} min={0} max={10}/>
        </div>)}
        <NumberInputField label="Stacked quantity" defaultValue={4} min={0} max={10}/>
      </section>
    ))}
    <NumberInput id="aria-invalid" aria-label="Native invalid" aria-invalid="true" defaultValue={-1}/>
    <NumberInput id="aria-valid" aria-label="Native valid" aria-invalid="false" defaultValue={2}/>
    <div id="readonly"><NumberInput aria-label="Read only" defaultValue={3} stepper="inline" readOnly/></div>
    <NumberInput id="disabled" aria-label="Disabled" defaultValue={3} disabled/>
    <NumberInput id="keyboard" aria-label="Canceled arrow keys" defaultValue={4} onKeyDown={event => event.preventDefault()}/>
    <form><NumberInputField label="Resettable quantity" name="quantity" defaultValue={3} min={0} max={5}/><button type="reset">Reset quantity</button></form>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
