import React from 'react';
import { createRoot } from 'react-dom/client';
import { RadioGroup, RadioField, RadioCard, SegmentedRadio, SegmentedRadioItem, PillRadio, PillRadioItem } from '@virtari-packages/react-radio-group';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-radio-group/styles';

const wait = () => new Promise(resolve => setTimeout(resolve, 80));
const query = <T extends Element = HTMLElement,>(selector: string) => document.querySelector<T>(selector)!;
let keyCalls = 0;
const longLabel = 'A long international workspace choice with enough content to wrap safely';
async function run() {
  const lines: string[] = [];
  const check = (ok: boolean, label: string) => lines.push(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  const checked = (id: string) => query(`#${id}`).getAttribute('aria-checked') === 'true';
  for (const id of ['native', 'empty', 'controlled', 'external']) {
    query<HTMLButtonElement>(`#${id}-b`).click(); await wait();
    const form = query<HTMLFormElement>(`#${id}-form`);
    check(new FormData(form).get(id) === 'b', `${id}: selection serializes`);
    const prevent = (event: Event) => event.preventDefault();
    form.addEventListener('reset', prevent); form.reset(); await wait();
    check(checked(`${id}-b`), `${id}: canceled reset preserves selection`);
    form.removeEventListener('reset', prevent); form.reset(); await wait();
    const expected = id === 'controlled' ? 'b' : id === 'empty' ? null : 'a';
    check(new FormData(form).get(id) === expected, `${id}: reset serialization`);
    check(expected ? checked(`${id}-${expected}`) : !checked(`${id}-a`) && !checked(`${id}-b`), `${id}: reset visible selection`);
  }
  keyCalls = 0;
  for (const dir of ['ltr', 'rtl']) {
    const group = query(`#keys-${dir}`);
    const items = Array.from(group.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
    items[0].click(); items[0].focus(); await wait();
    const key = dir === 'ltr' ? 'ArrowRight' : 'ArrowLeft';
    items[0].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    await wait(); document.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }));
    check(document.activeElement === items[2] && items[2].getAttribute('aria-checked') === 'true', `${dir}: arrow selects and skips disabled`);
    check(getComputedStyle(group).gridAutoFlow === 'column', `${dir}: horizontal track`);
  }
  check(keyCalls === 2, 'Consumer key handlers compose');
  const merged = query('#named').getAttribute('aria-describedby')?.split(' ') ?? [];
  check(['external-help', 'named-description', 'named-error'].every(id => merged.includes(id)), 'Group merges consumer help, description and error');
  check(!query('#named').hasAttribute('aria-labelledby'), 'Explicit group aria-label has precedence');
  check(query('#field').getAttribute('aria-labelledby') === 'field-label', 'Field name uses title alone');
  check(query('#field').getAttribute('aria-describedby') === 'external-help field-description', 'Field merges helper description');
  check(query('#card').getAttribute('aria-labelledby') === 'card-label', 'Card title excludes price and helper from name');
  const error = query('#named-error').getBoundingClientRect();
  const items = query('#named > .vds-radio-group-items').getBoundingClientRect();
  check(error.top - items.bottom >= 11, 'Error has related-content spacing');
  for (const el of document.querySelectorAll<HTMLElement>('[data-fit]')) {
    check(el.scrollWidth <= el.clientWidth + 1, `${el.dataset.fit}: long content fits`);
  }
  check(getComputedStyle(query('#vertical')).gridAutoFlow === 'row', 'Vertical segmented orientation styles apply');
  check(getComputedStyle(query('#horizontal > .vds-radio-group-items')).flexDirection === 'row', 'Horizontal fields orientation styles apply');
  check(query('#disabled').matches(':disabled'), 'Disabled item stays unavailable');
  query('#report').textContent = `${lines.filter(line => line.startsWith('PASS')).length}/${lines.length} passed\n${lines.join('\n')}`;
}
function FormChoices({ id, empty = false, controlled = false, external = false }: { id: string; empty?: boolean; controlled?: boolean; external?: boolean }) {
  const [value, setValue] = React.useState('a');
  const choices = <RadioGroup name={id} label={`${id} reset`} defaultValue={empty ? undefined : 'a'} value={controlled ? value : undefined} onValueChange={controlled ? setValue : undefined}>
    <RadioField id={`${id}-a`} form={external ? `${id}-form` : undefined} value="a" label="Alpha" />
    <RadioField id={`${id}-b`} form={external ? `${id}-form` : undefined} value="b" label="Beta" />
    {id === 'native' && <RadioField id="disabled" value="disabled" disabled label="Unavailable" />}
  </RadioGroup>;
  return external ? <><form id={`${id}-form`} />{choices}</> : <form id={`${id}-form`}>{choices}</form>;
}
createRoot(query('#root')).render(<main style={{ padding: 24, maxWidth: 1100, margin: 'auto' }}>
  <h1>Radio group package quality</h1><button onClick={run}>Run checks</button><pre id="report" style={{ whiteSpace: 'pre-wrap' }}>Ready</pre>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>{['native', 'empty', 'controlled', 'external'].map(id => <FormChoices key={id} id={id} empty={id === 'empty'} controlled={id === 'controlled'} external={id === 'external'} />)}</div>
  <p id="external-help">Additional help</p>
  <RadioGroup id="named" label="Visible title" aria-label="Explicit group name" description="Group helper" error="Choose a workspace" aria-describedby="external-help">
    <RadioField id="field" value="field" label="Field title" description="Field helper" aria-describedby="external-help" />
    <RadioCard id="card" value="card" label="Card title" description="Card helper" trailing="$99" />
  </RadioGroup>
  <RadioGroup id="horizontal" orientation="horizontal" aria-label="Horizontal fields"><RadioField value="a" label="Alpha" /><RadioField value="b" label="Beta" /></RadioGroup>
  {(['ltr', 'rtl'] as const).map(dir => <SegmentedRadio id={`keys-${dir}`} key={dir} dir={dir} defaultValue="a" aria-label={`${dir} keyboard`}><SegmentedRadioItem value="a" onKeyDown={() => keyCalls++}>Alpha</SegmentedRadioItem><SegmentedRadioItem value="b" disabled>Disabled</SegmentedRadioItem><SegmentedRadioItem value="c">Gamma</SegmentedRadioItem></SegmentedRadio>)}
  <SegmentedRadio id="vertical" orientation="vertical" aria-label="Vertical"><SegmentedRadioItem value="a">Alpha</SegmentedRadioItem><SegmentedRadioItem value="b">Beta</SegmentedRadioItem></SegmentedRadio>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 24 }}>
    {(['light', 'dark', 'dark-oled'] as const).map((theme, index) => <section key={theme} data-theme={theme} data-surface-style={['bordered', 'tonal', 'elevated'][index]} data-radius={index ? 'round' : 'sharp'} dir={index === 1 ? 'rtl' : 'ltr'} style={{ width: 260, padding: 16, background: 'var(--vds-color-bg)', color: 'var(--vds-color-text)' }}>
      <h2>{theme}</h2><div data-fit={`${theme} narrow specimens`}>
        <RadioGroup label={longLabel} description={longLabel} defaultValue="a" dir={index === 1 ? 'rtl' : 'ltr'}>
          <RadioField value="a" label={longLabel} description="A helper that wraps naturally beneath the name." />
          <RadioCard value="b" label={longLabel} description={longLabel} trailing="A long custom pricing arrangement" />
          <RadioCard value="c" label="Workspace" layout="icon-grid" icon={<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor" /></svg>} description={longLabel} />
        </RadioGroup>
        <PillRadio aria-label="Long pill" defaultValue="a" dir={index === 1 ? 'rtl' : 'ltr'}><PillRadioItem value="a">{longLabel}</PillRadioItem></PillRadio>
        <SegmentedRadio aria-label="Long segments" defaultValue="a" dir={index === 1 ? 'rtl' : 'ltr'}><SegmentedRadioItem value="a">{longLabel}</SegmentedRadioItem><SegmentedRadioItem value="b">Second choice</SegmentedRadioItem></SegmentedRadio>
      </div>
    </section>)}
  </div>
</main>);
