import { createRoot } from 'react-dom/client';
import { Button } from '@virtari-packages/react-button';
import { Chip, ChipIcon, ChipLabel } from '@virtari-packages/react-chip';
import { Badge } from '@virtari-packages/react-badge';
import { IconPlus } from '@virtari-packages/react-icons';
import '@virtari-packages/core';
import '@virtari-packages/tokens';
import '@virtari-packages/react-button/styles';
import '@virtari-packages/react-chip/styles';
import '@virtari-packages/react-badge/styles';
createRoot(document.getElementById('root')!).render(<main style={{padding:24,maxWidth:1000,margin:'auto'}}>
  <style>{`.before .vds-control-text {text-box:none} .samples{display:flex;align-items:center;gap:16px;padding:16px;border:1px solid var(--vds-color-border);margin-block:8px}`}</style>
  <h1>Font-aware control alignment</h1>
  {['Vazirmatn','Inter','Arial'].map(font=><section key={font} style={{fontFamily:font,'--vds-font-sans':font} as React.CSSProperties}>
    <h2>{font}</h2>
    {['before','after'].map(state=><div key={state} className={`samples ${state}`}>
      <span style={{width:45}}>{state}</span>
      <Button leftSection={<IconPlus/>}>Continue</Button>
      <Button variant="soft"><IconPlus/>Save changes</Button>
      <Chip><ChipIcon><IconPlus/></ChipIcon><ChipLabel>Workspace</ChipLabel></Chip>
      <Badge leftSection={<IconPlus/>}>Active</Badge>
      <Button dir="rtl" leftSection={<IconPlus/>}>افزودن</Button>
    </div>)}
  </section>)}
</main>);
