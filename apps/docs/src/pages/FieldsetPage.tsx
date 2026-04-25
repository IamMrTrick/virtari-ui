import { Fieldset, FieldsetLegend, FieldsetDescription } from "@virtari-packages/react-fieldset";
import "@virtari-packages/react-fieldset/styles";
import "@virtari-packages/react-fieldset/tokens";
import { Input } from "@virtari-packages/react-input";
import { Label } from "@virtari-packages/react-label";
import { Section, Row } from "../components";

export function FieldsetPage() {
  return (
    <>
      <Section title="Default" description="A bordered form section with legend and description.">
        <Fieldset style={{ maxWidth: "28rem" }}>
          <FieldsetLegend>Shipping address</FieldsetLegend>
          <FieldsetDescription>Where should we deliver your order?</FieldsetDescription>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
            <div>
              <Label htmlFor="addr-street">Street</Label>
              <Input id="addr-street" placeholder="123 Main St" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--vds-space-3)" }}>
              <div>
                <Label htmlFor="addr-city">City</Label>
                <Input id="addr-city" placeholder="Tehran" />
              </div>
              <div>
                <Label htmlFor="addr-zip">ZIP</Label>
                <Input id="addr-zip" placeholder="12345" />
              </div>
            </div>
          </div>
        </Fieldset>
      </Section>

      <Section title="Required legend" description="Asterisk is shown when required is true.">
        <Fieldset style={{ maxWidth: "28rem" }}>
          <FieldsetLegend required>Contact information</FieldsetLegend>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
            <div>
              <Label htmlFor="contact-name">Full name</Label>
              <Input id="contact-name" placeholder="Jane Doe" />
            </div>
          </div>
        </Fieldset>
      </Section>

      <Section title="Invalid state" description="Border and legend color shift to danger.">
        <Fieldset invalid style={{ maxWidth: "28rem" }}>
          <FieldsetLegend>Payment details</FieldsetLegend>
          <FieldsetDescription>Please review the highlighted fields.</FieldsetDescription>
          <div>
            <Label htmlFor="card-num">Card number</Label>
            <Input id="card-num" placeholder="0000 0000 0000 0000" invalid />
          </div>
        </Fieldset>
      </Section>

      <Section title="Disabled state" description="All child fields are disabled via cascade.">
        <Fieldset disabled style={{ maxWidth: "28rem" }}>
          <FieldsetLegend>Locked section</FieldsetLegend>
          <FieldsetDescription>This section is read-only.</FieldsetDescription>
          <div>
            <Label htmlFor="locked-input">Username</Label>
            <Input id="locked-input" defaultValue="admin" />
          </div>
        </Fieldset>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Fieldset, FieldsetLegend, FieldsetDescription } from "@virtari-packages/react-fieldset";
import "@virtari-packages/react-fieldset/styles";

<Fieldset>
  <FieldsetLegend required>Shipping address</FieldsetLegend>
  <FieldsetDescription>Where should we deliver?</FieldsetDescription>
  {/* form fields */}
</Fieldset>

// Invalid state
<Fieldset invalid>...</Fieldset>

// Disabled — cascades to all children
<Fieldset disabled>...</Fieldset>`}</pre>
      </Section>
    </>
  );
}
