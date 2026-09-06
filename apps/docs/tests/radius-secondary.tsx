import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@virtari-packages/tokens';
import '@virtari-packages/core';
import '../../../packages/react-flow/src/ReactFlow.tokens.css';
import '../../../packages/react-editor/src/Editor.css';
import '../../../packages/react-date-picker/src/DateField.css';

const modes = ['sharp', 'soft', 'round', 'pill'] as const;
const frames = async () => { for (let i = 0; i < 3; i++) await new Promise(requestAnimationFrame); };

function App() {
  const [report, setReport] = useState('Waiting for layout');
  useEffect(() => {
    let alive = true;
    (async () => {
      await frames();
      const results: string[] = [];
      const check = (name: string, actual: number, expected: number) => results.push(`${Math.abs(actual - expected) < 0.1 ? 'PASS' : 'FAIL'} ${name}: ${actual} / ${expected}`);
      const radius = (el: Element) => parseFloat(getComputedStyle(el).borderTopLeftRadius);
      for (const section of document.querySelectorAll<HTMLElement>('[data-case]')) {
        const label = section.dataset.case!;
        const probe = (name: string) => section.querySelector(`[data-probe="${name}"]`)!;
        check(`${label} flow card`, radius(probe('flow')), radius(probe('card-role')));
        check(`${label} flow controls`, radius(probe('panel')), radius(probe('control-role')));
        check(`${label} time wheel`, radius(probe('wheel')), radius(probe('segment-role')));
        const editor = probe('editor');
        const expected = Math.max(0, Math.min(radius(probe('editor-role')) - 8, radius(probe('block-role'))));
        check(`${label} editor toolbar`, radius(probe('toolbar')), expected);
        check(`${label} editor link field`, radius(probe('link')), Math.max(0, expected - 1));
        check(`${label} editor mode trigger`, radius(probe('trigger')), Math.max(0, expected - 4));
        check(`${label} editor mode indicator`, radius(probe('indicator')), Math.max(0, expected - 4));
        // The token itself must be nonnegative, rather than relying on the
        // browser dropping an invalid negative border-radius declaration.
        const lengthProbe = document.createElement('i');
        lengthProbe.style.width = 'var(--vds-editor-toolbar-radius)';
        lengthProbe.style.display = 'block';
        editor.append(lengthProbe);
        check(`${label} valid toolbar length`, parseFloat(getComputedStyle(lengthProbe).width), expected);
        lengthProbe.remove();
      }
      if (alive) setReport(results.join('\n'));
    })();
    return () => { alive = false; };
  }, []);
  return <main style={{padding: 24}}><h1>Secondary radius contracts</h1><p>Four modes, nested mode boundaries, and finite editor geometry.</p><pre id="results">{report}</pre>
    {modes.flatMap(parent => modes.map(mode => <div data-radius={parent} key={`${parent}-${mode}`}>
      <section data-radius={mode} data-case={`${parent} → ${mode}`} style={{display:'flex',gap:8}}>
        <i data-probe="flow" style={{borderRadius:'var(--flow-radius)'}}/>
        <i data-probe="panel" style={{borderRadius:'var(--flow-panel-radius)'}}/>
        <i data-probe="card-role" style={{borderRadius:'var(--vds-radius-card)'}}/>
        <i data-probe="control-role" style={{borderRadius:'var(--vds-radius-control)'}}/>
        <i data-probe="segment-role" style={{borderRadius:'var(--vds-radius-date-segment)'}}/>
        <i data-probe="editor-role" style={{borderRadius:'var(--vds-radius-editor-surface)'}}/>
        <i data-probe="block-role" style={{borderRadius:'var(--vds-radius-editor-block)'}}/>
        <div data-probe="wheel" className="vds-time-wheel-track"/>
        <div data-probe="editor" className="vds-editor" style={{width:100}}>
          <div data-probe="toolbar" style={{borderRadius:'var(--vds-editor-toolbar-radius)'}}/>
          <div data-probe="link" className="vds-editor-toolbar-link-input" style={{borderRadius:'var(--input-radius)'}}/>
          <div className="vds-editor-mode-list">
            <div data-probe="trigger" style={{borderRadius:'var(--tabs-trigger-radius)'}}/>
            <div data-probe="indicator" style={{borderRadius:'var(--tabs-indicator-radius)'}}/>
          </div>
        </div>
      </section>
    </div>))}
  </main>;
}

createRoot(document.getElementById('root')!).render(<App/>);
