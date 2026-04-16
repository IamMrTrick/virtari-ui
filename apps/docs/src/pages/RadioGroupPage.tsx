import { RadioGroup, RadioGroupItem } from "@virtari/react-radio-group";
import { Label } from "@virtari/react-label";
import { Section, Row } from "../components";

export function RadioGroupPage() {
  return (
    <>
      <Section title="Basic" description="A group of radio options with labels.">
        <RadioGroup defaultValue="comfortable">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </div>
        </RadioGroup>
      </Section>

      <Section title="Horizontal" description="Radio group arranged in a row.">
        <RadioGroup defaultValue="light" orientation="horizontal">
          <Row>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
              <RadioGroupItem value="light" id="t1" />
              <Label htmlFor="t1">Light</Label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
              <RadioGroupItem value="dark" id="t2" />
              <Label htmlFor="t2">Dark</Label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
              <RadioGroupItem value="system" id="t3" />
              <Label htmlFor="t3">System</Label>
            </div>
          </Row>
        </RadioGroup>
      </Section>

      <Section title="Disabled" description="A disabled radio group.">
        <RadioGroup defaultValue="option1" disabled>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
              <RadioGroupItem value="option1" id="d1" />
              <Label htmlFor="d1">Option 1</Label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
              <RadioGroupItem value="option2" id="d2" />
              <Label htmlFor="d2">Option 2</Label>
            </div>
          </div>
        </RadioGroup>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { RadioGroup, RadioGroupItem } from "@virtari/react-radio-group";
import { Label } from "@virtari/react-label";

<RadioGroup defaultValue="option1" onValueChange={setValue}>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>`}</pre>
      </Section>
    </>
  );
}
