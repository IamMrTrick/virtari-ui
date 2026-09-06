# Original documentation page

Source ID: `apps/docs/src/pages/SwitchPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { Switch } from "@virtari-packages/react-switch";
import { Section, Row } from "../components";

export function SwitchPage() {
  return (
    <>
      <Section title="Sizes">
        <Row>
          <Switch size="sm" />
          <Switch />
          <Switch size="lg" />
        </Row>
      </Section>

      <Section title="States">
        <Row>
          <Switch />
          <Switch defaultChecked />
          <Switch disabled />
          <Switch disabled defaultChecked />
        </Row>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Switch } from "@virtari-packages/react-switch";

<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
  size="lg"
/>`}</pre>
      </Section>
    </>
  );
}

```
