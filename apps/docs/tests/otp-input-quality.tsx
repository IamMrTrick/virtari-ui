import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { OtpInput } from '@virtari-packages/react-otp-input';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-otp-input/styles';

const frames = async () => { for (let i = 0; i < 3; i++) await new Promise(requestAnimationFrame); };
let completed = 0, keyCalls = 0, pasteCalls = 0;
function App() {
  const [report, setReport] = useState('Running');
  useEffect(() => { let alive = true; (async () => {
    await document.fonts.ready; await frames();
    const checks: string[] = [];
    const check = (label: string, pass: boolean) => checks.push(`${pass ? 'PASS' : 'FAIL'} ${label}`);
    const inputs = (id: string) => [...document.querySelectorAll<HTMLInputElement>(`#${id} .vds-otp-input__slot`)];
    const value = (id: string) => inputs(id).map(input => input.value).join('');
    const paste = (input: HTMLInputElement, text: string) => {
      const data = new DataTransfer(); data.setData('text', text);
      input.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: data }));
    };
    const key = (input: HTMLInputElement, name: string) => input.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }));
    paste(inputs('editable')[3], '۱۲٣۴۵٦'); await frames();
    check('full-code paste replaces from start and normalizes mixed digits', value('editable') === '123456');
    check('completion once and final-slot focus', completed === 1 && document.activeElement === inputs('editable')[5]);
    paste(inputs('editable')[0], '123456'); await frames();
    check('repeated completed value is deduplicated', completed === 1);
    key(inputs('editable')[5], 'ArrowLeft'); await frames();
    check('left arrow follows visual LTR order in RTL context', document.activeElement === inputs('editable')[4]);
    key(inputs('editable')[4], 'Home'); await frames();
    check('Home focuses first slot', document.activeElement === inputs('editable')[0]);
    key(inputs('editable')[0], 'Delete'); await frames();
    check('Delete updates native serialized code', value('editable') === '23456' && new FormData(document.querySelector<HTMLFormElement>('#otp-form')!).get('code') === '23456');
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
    setter.call(inputs('editable')[0], '987654'); inputs('editable')[0].dispatchEvent(new Event('input', { bubbles: true })); await frames();
    check('full-code input event distributes autofill value', value('editable') === '987654' && completed === 2);
    check('native autofill metadata', inputs('editable')[0].autocomplete === 'one-time-code' && inputs('editable')[0].inputMode === 'numeric' && inputs('editable')[0].type === 'text');
    const form = document.querySelector<HTMLFormElement>('#otp-form')!;
    const cancel = (event: Event) => event.preventDefault(); form.addEventListener('reset', cancel); form.reset(); await frames();
    check('cancelled form reset preserves code', value('editable') === '987654');
    form.removeEventListener('reset', cancel); form.reset(); await frames();
    check('native form reset restores default and required validity', value('editable') === '12' && !form.checkValidity());
    const cancelled = inputs('cancelled')[0]; cancelled.focus();
    key(cancelled, 'Delete'); paste(cancelled, '999999'); await frames();
    check('consumer keyboard and paste cancellation precede edits', value('cancelled') === '123456' && keyCalls === 1 && pasteCalls === 1);
    paste(inputs('readonly')[0], '654321'); await frames();
    check('read-only is selectable and unchanged by paste', value('readonly') === '123456' && getComputedStyle(inputs('readonly')[0]).pointerEvents !== 'none');
    check('disabled slots remain native disabled and absent from form data', inputs('disabled').every(input => input.disabled) && !new FormData(form).has('disabled-code'));
    check('ARIA error metadata reaches every slot', inputs('error').every(input => input.getAttribute('aria-invalid') === 'true' && input.getAttribute('aria-errormessage') === 'error-text' && input.getAttribute('aria-describedby') === 'error-text'));
    check('explicit invalid false overrides aria-invalid', inputs('valid').every(input => input.getAttribute('aria-invalid') === 'false'));
    paste(inputs('no-select')[0], '9'); await frames();
    check('automatic focus respects selectOnFocus false', document.activeElement === inputs('no-select')[1] && inputs('no-select')[1].selectionStart === inputs('no-select')[1].selectionEnd);
    for (const group of document.querySelectorAll<HTMLElement>('[data-case] .vds-otp-input')) {
      const slots = [...group.querySelectorAll<HTMLInputElement>('.vds-otp-input__slot')];
      const style = getComputedStyle(slots[0]); const rect = slots[0].getBoundingClientRect();
      const label = `${group.closest<HTMLElement>('[data-case]')!.dataset.case}/${group.dataset.size}`;
      check(label + ' square size and symmetric spacing', Math.abs(rect.height - rect.width) < 1 && parseFloat(style.borderWidth) > 0 && parseFloat(style.borderWidth) <= 1 && slots.every(slot => Math.abs(slot.getBoundingClientRect().width - rect.width) < 1));
      check(label + ' contained and logical order', slots.every(slot => slot.getBoundingClientRect().right <= group.getBoundingClientRect().right + 1) && getComputedStyle(group).direction === 'ltr');
      const parent = group.parentElement!; const parentStyle = getComputedStyle(parent); const parentRect = parent.getBoundingClientRect();
      check(label + ' fits RTL grid content box', group.getBoundingClientRect().left >= parentRect.left + parseFloat(parentStyle.paddingLeft) - 1 && group.getBoundingClientRect().right <= parentRect.right - parseFloat(parentStyle.paddingRight) + 1);
    }
    const zoomed = inputs('zoomed')[0];
    check('large text grows slot height without clipping line box', zoomed.getBoundingClientRect().height + 0.1 >= parseFloat(getComputedStyle(zoomed).lineHeight) + 2 * parseFloat(getComputedStyle(zoomed).borderWidth));
    inputs('editable')[0].focus();
    if (alive) setReport(`${checks.filter(check => check.startsWith('PASS')).length}/${checks.length} checks passed\n${checks.join('\n')}`);
  })(); return () => { alive = false; }; }, []);
  return <main style={{ padding: 24, display: 'grid', gap: 24, color: 'var(--vds-color-text)', background: 'var(--vds-color-surface)' }}>
    <h1>OTP input package-only checks</h1>
    <details><summary>Regression results</summary><pre id="results" style={{ whiteSpace: 'pre-wrap' }}>{report}</pre></details>
    <form id="otp-form" dir="rtl" style={{ display: 'grid', gap: 16, maxWidth: 320 }}>
      <OtpInput id="editable" defaultValue="12" name="code" label="کد تأیید" required onComplete={() => completed++} />
      <OtpInput id="disabled" defaultValue="123456" name="disabled-code" disabled label="Disabled code" />
    </form>
    <OtpInput id="cancelled" defaultValue="123456" label="Cancelled handlers" onKeyDown={event => { keyCalls++; event.preventDefault(); }} onPaste={event => { pasteCalls++; event.preventDefault(); }} />
    <OtpInput id="readonly" defaultValue="123456" readOnly label="Read-only code" />
    <OtpInput id="error" defaultValue="12" aria-invalid="true" aria-describedby="error-text" aria-errormessage="error-text" label="Invalid code" />
    <p id="error-text">Enter all six characters.</p>
    <OtpInput id="valid" defaultValue="123456" invalid={false} aria-invalid="true" label="Explicit valid" />
    <OtpInput id="no-select" defaultValue="123456" selectOnFocus={false} label="No auto-selection" />
    <OtpInput id="zoomed" defaultValue="123456" label="Large text" style={{ '--_otp-font-size': '48px' } as React.CSSProperties} />
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
      {['light', 'dark', 'dark-oled'].flatMap(theme => ['bordered', 'tonal', 'elevated'].map(surface =>
        <section key={`${theme}/${surface}`} data-case={`${theme}/${surface}`} data-theme={theme} data-surface-style={surface} dir="rtl" style={{ minWidth: 0, padding: 16, background: 'var(--vds-color-surface)', color: 'var(--vds-color-text)', display: 'grid', gap: 12 }}>
          <h2 style={{ fontSize: 16 }}>{theme}/{surface}</h2>
          {(['sm', 'md', 'lg'] as const).map(size => <OtpInput key={size} size={size} defaultValue="123456" label={`${theme} ${surface} ${size}`} />)}
        </section>))}
    </div>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
