import { Label } from "@virtari/react-label";
import { Section, Row } from "../components";

export function LabelPage() {
  return (
    <>
      <Section title="With Input" description="Label paired with a text input.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)", maxInlineSize: "20rem" }}>
          <Label htmlFor="email">Email address</Label>
          <input id="email" type="email" placeholder="you@example.com" />
        </div>
      </Section>

      <Section title="With Checkbox" description="Label paired with a checkbox.">
        <Row>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <input type="checkbox" id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </Row>
      </Section>

      <Section title="Disabled" description="Label visually reflects disabled state.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)", maxInlineSize: "20rem" }}>
          <Label htmlFor="disabled-input" data-disabled>Username (disabled)</Label>
          <input id="disabled-input" type="text" disabled placeholder="Not editable" />
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Label } from "@virtari/react-label";

<Label htmlFor="email">Email</Label>
<input id="email" type="email" />`}</pre>
      </Section>
    </>
  );
}
