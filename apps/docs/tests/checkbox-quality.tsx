import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import { Checkbox, CheckboxField, CheckboxGroup, CheckboxCard, PillCheckbox, PillCheckboxItem } from '@virtari-packages/react-checkbox';
import '@virtari-packages/react-checkbox/styles';

const pause = () => new Promise(resolve => setTimeout(resolve, 80));
function App() {
  const [report, setReport] = useState('Checking package…');
  useEffect(() => { void (async () => {
    await document.fonts.ready; await pause();
    const lines: string[] = [];
    const check = (label: string, ok: boolean) => lines.push(`${ok ? 'PASS' : 'FAIL'} ${label}`);
    const form = document.getElementById('native') as HTMLFormElement;
    const field = document.getElementById('field') as HTMLButtonElement;
    const canceled = document.getElementById('canceled') as HTMLButtonElement;
    check('group name reaches native serialization', new FormData(form).getAll('features').join() === 'email');
    check('pill group name reaches native serialization', new FormData(form).getAll('topics').join() === 'design');
    check('explicit item name overrides group name', new FormData(form).get('custom-choice') === 'on');
    field.closest('label')!.click(); await pause();
    check('field label toggles and serializes once', !new FormData(form).has('features'));
    form.reset(); await pause();
    check('reset restores uncontrolled selection', field.getAttribute('aria-checked') === 'true' && new FormData(form).get('features') === 'email');
    canceled.click(); await pause();
    check('consumer preventDefault cancels toggle', canceled.getAttribute('aria-checked') === 'false');
    check('group disabled is inherited', (document.getElementById('disabled') as HTMLButtonElement).disabled);
    check('nested pill group preserves disabled and error', (document.getElementById('nested-pill') as HTMLButtonElement).disabled && document.getElementById('nested-pill')!.getAttribute('aria-invalid') === 'true');
    check('pill invalid reaches focusable item', document.getElementById('invalid-pill')!.getAttribute('aria-invalid') === 'true');
    const refs = field.getAttribute('aria-describedby')!.split(' ').map(id => document.getElementById(id)?.textContent);
    check('field helper and group description remain associated', refs.includes('Field description') && refs.includes('Group description'));
    check('label excludes description', document.getElementById(field.getAttribute('aria-labelledby')!)?.textContent === 'Email updates');
    check('custom accessible name survives', document.getElementById('custom')!.getAttribute('aria-label') === 'Custom name' && !document.getElementById('custom')!.hasAttribute('aria-labelledby'));
    const required = document.getElementById('required-form') as HTMLFormElement;
    check('item required preserves native validation', !required.checkValidity());
    (document.getElementById('required-control') as HTMLButtonElement).click(); await pause();
    check('checking required item satisfies native validation', required.checkValidity());
    const canceledResetForm = document.getElementById('canceled-reset-form') as HTMLFormElement;
    const canceledResetControl = document.getElementById('canceled-reset') as HTMLButtonElement;
    canceledResetControl.click(); await pause(); canceledResetForm.reset(); await pause();
    check('canceled native reset preserves visual and submitted state', canceledResetControl.getAttribute('aria-checked') === 'false' && !new FormData(canceledResetForm).has('cancel-choice'));
    const externalForm = document.getElementById('external-form') as HTMLFormElement;
    const external = document.getElementById('external-control') as HTMLButtonElement;
    external.click(); await pause(); externalForm.reset(); await pause();
    check('external form reset restores visual and submitted state', external.form === externalForm && external.getAttribute('aria-checked') === 'true' && new FormData(externalForm).get('external-choice') === 'on');
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    const pixel = (colors: string[]) => { ctx.clearRect(0, 0, 1, 1); colors.forEach(color => { ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1); }); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const lum = (rgb: number[]) => rgb.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    document.querySelectorAll<HTMLElement>('[data-sample]').forEach(host => {
      const name = host.dataset.sample;
      host.querySelectorAll<HTMLElement>('.vds-checkbox-field,.vds-checkbox-card,.vds-pill-checkbox-item').forEach(control => {
        check(`${name} ${control.className} wraps`, control.scrollWidth <= control.clientWidth + 1 && control.getBoundingClientRect().width <= host.clientWidth);
      });
      host.querySelectorAll<HTMLElement>('.vds-checkbox-field-description,.vds-checkbox-card-description,.vds-checkbox-card-badge,.vds-pill-checkbox-item').forEach(text => {
        const layers = [getComputedStyle(host).backgroundColor];
        const card = text.closest('.vds-checkbox-card'); if (card) layers.push(getComputedStyle(card).backgroundColor);
        layers.push(getComputedStyle(text).backgroundColor);
        const a = lum(pixel(layers)), b = lum(pixel([...layers, getComputedStyle(text).color]));
        const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
        check(`${name} ${text.className} contrast ${ratio.toFixed(2)}:1`, ratio >= 4.5);
      });
      const row = host.querySelector('.vds-checkbox-field')!;
      const control = row.querySelector('.vds-checkbox')!.getBoundingClientRect();
      const text = row.querySelector('.vds-checkbox-field-label')!.getBoundingClientRect();
      check(`${name} first label line centered`, Math.abs(control.top + control.height / 2 - text.top - parseFloat(getComputedStyle(row.querySelector('.vds-checkbox-field-label')!).lineHeight) / 2) < 1);
    });
    setReport(lines.join('\n'));
  })(); }, []);
  return <main style={{ padding: 24 }}>
    <h1>Checkbox package quality</h1>
    <details><summary>{report.startsWith('Checking') ? report : `${report.split('\n').filter(x => x.startsWith('PASS')).length} passed; ${report.split('\n').filter(x => x.startsWith('FAIL')).length} failed`}</summary><pre id="results" style={{ whiteSpace: 'pre-wrap' }}>{report}</pre></details>
    <form id="native">
      <CheckboxGroup name="features" label="Form checks" description="Group description">
        <CheckboxField id="field" value="email" label="Email updates" description="Field description" defaultChecked />
        <CheckboxField id="canceled" label="Canceled click" onClick={e => e.preventDefault()} />
        <CheckboxField id="custom" name="custom-choice" label="Visible label" aria-label="Custom name" defaultChecked />
      </CheckboxGroup>
      <PillCheckbox name="topics" aria-label="Topics"><PillCheckboxItem value="design" defaultChecked>Design</PillCheckboxItem><PillCheckboxItem value="development">Development</PillCheckboxItem></PillCheckbox>
      <button type="reset">Reset form</button>
    </form>
    <form id="required-form"><CheckboxField id="required-control" name="consent" required label="Required choice" /></form>
    <form id="canceled-reset-form" onReset={event => event.preventDefault()}><CheckboxField id="canceled-reset" name="cancel-choice" label="Canceled reset" defaultChecked /></form>
    <form id="external-form" />
    <CheckboxField id="external-control" form="external-form" name="external-choice" label="External form choice" defaultChecked />
    <CheckboxGroup disabled error="Unavailable selection" aria-label="Disabled group"><CheckboxField id="disabled" label="Unavailable" defaultChecked /><PillCheckbox aria-label="Nested choices"><PillCheckboxItem id="nested-pill">Nested unavailable</PillCheckboxItem></PillCheckbox></CheckboxGroup>
    <PillCheckbox error aria-label="Invalid topics"><PillCheckboxItem id="invalid-pill">Invalid item</PillCheckboxItem></PillCheckbox>
    <Checkbox aria-label="Mixed selection" defaultChecked="indeterminate" />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {['light', 'dark', 'dark-oled'].flatMap(theme => ['bordered', 'tonal', 'elevated'].map((surface, i) =>
        <section key={`${theme}-${surface}`} data-theme={theme} data-surface-style={surface} data-sample={`${theme}/${surface}`} dir={i === 1 ? 'rtl' : 'ltr'} style={{ width: 230, padding: 16, boxSizing: 'border-box', background: 'var(--vds-color-surface)', color: 'var(--vds-color-text)' }}>
          <h2>{theme} {surface}</h2>
          <CheckboxField label="Long label with فارسی and wrapping" description="Description stays readable and associated" />
          <CheckboxCard label="An extended add-on name" description="Detailed supporting description" badge="Recommended" trailing="12345/month" defaultChecked />
          <PillCheckbox aria-label={`${theme} long choices`}><PillCheckboxItem defaultChecked>A long topic with فارسی and unbrokenverylongcontent</PillCheckboxItem></PillCheckbox>
        </section>))}
    </div>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
