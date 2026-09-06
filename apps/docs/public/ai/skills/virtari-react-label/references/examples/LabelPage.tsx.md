# Original documentation page

Source ID: `apps/docs/src/pages/LabelPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { Label } from "@virtari-packages/react-label";
import { Input } from "@virtari-packages/react-input";
import { Checkbox } from "@virtari-packages/react-checkbox";
import { Section, Row } from "../components";

export function LabelPage() {
  return (
    <>
      <Section title="With Input" description="Label paired with a text input.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)", maxInlineSize: "20rem" }}>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </Section>

      <Section title="With Checkbox" description="Label paired with a checkbox.">
        <Row>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </Row>
      </Section>

      <Section title="Disabled" description="Label visually reflects disabled state.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)", maxInlineSize: "20rem" }}>
          <Label htmlFor="disabled-input" data-disabled>Username (disabled)</Label>
          <Input id="disabled-input" type="text" disabled placeholder="Not editable" />
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Label } from "@virtari-packages/react-label";
import { Input } from "@virtari-packages/react-input";

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />`}</pre>
      </Section>
    </>
  );
}

```
