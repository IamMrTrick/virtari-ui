import { Checkbox } from "@virtari/react-checkbox";
import { Section, Row } from "../components";

export function CheckboxPage() {
  return (
    <>
      <Section title="States">
        <Row>
          <Checkbox />
          <Checkbox defaultChecked />
          <Checkbox checked="indeterminate" />
          <Checkbox disabled />
          <Checkbox disabled defaultChecked />
        </Row>
      </Section>

      <Section title="Sizes" description="Proportional scale: sm (14px), md (18px), lg (22px).">
        <Row>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Checkbox size="sm" id="cb-sm" />
            <label htmlFor="cb-sm" style={{ fontSize: "var(--vds-text-xs)" }}>Small</label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Checkbox id="cb-md" />
            <label htmlFor="cb-md" style={{ fontSize: "var(--vds-text-sm)" }}>Medium (default)</label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Checkbox size="lg" id="cb-lg" />
            <label htmlFor="cb-lg" style={{ fontSize: "var(--vds-text-base)" }}>Large</label>
          </div>
        </Row>
      </Section>

      <Section title="With Label">
        <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
          <Checkbox id="terms" />
          <label htmlFor="terms" style={{ fontSize: "var(--vds-text-sm)" }}>
            Accept terms and conditions
          </label>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Checkbox } from "@virtari/react-checkbox";

<Checkbox
  checked={accepted}
  onCheckedChange={setAccepted}
  size="lg"
/>

// Sizes: "sm" | "md" | "lg" (proportional to text, not height-ramp)`}</pre>
      </Section>
    </>
  );
}
