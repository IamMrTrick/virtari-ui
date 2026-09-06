import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { Switch } from "@virtari-packages/react-switch";
import { Label } from "@virtari-packages/react-label";
import { Button } from "@virtari-packages/react-button";
import { Section, Row } from "../components";

export function SwitchPage() {
  return (
    <>
      <Section title="Sizes">
        <Row>
          <Switch size="sm" aria-label="Small switch" />
          <Switch aria-label="Medium switch" />
          <Switch size="lg" aria-label="Large switch" />
        </Row>
        <p>The small switch is intended for compact layouts. Pair switches with a visible label and choose larger controls for touch interfaces.</p>
      </Section>

      <Section title="States">
        <Row>
          <Switch aria-label="Off setting" />
          <Switch aria-label="On setting" defaultChecked />
          <Switch aria-label="Unavailable off setting" disabled />
          <Switch aria-label="Unavailable on setting" disabled defaultChecked />
        </Row>
      </Section>

      <Section title="Labels and form reset">
        <form style={{ display: "grid", gap: "var(--vds-gap-group)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-gap-icon)", maxInlineSize: "24rem" }}>
            <Switch id="switch-updates" name="updates" defaultChecked aria-describedby="switch-updates-help" />
            <Label htmlFor="switch-updates">Email updates about new features and changes to your workspace</Label>
          </div>
          <p id="switch-updates-help">Space or Enter toggles the focused switch. Drag the thumb to change the setting, or set dragEnabled to false for click and keyboard only.</p>
          <div><Button type="reset" variant="outline">Reset setting</Button></div>
        </form>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Switch } from "@virtari-packages/react-switch";
import { Label } from "@virtari-packages/react-label";

<Label htmlFor="notifications">Notifications</Label>
<Switch
  id="notifications"
  checked={enabled}
  onCheckedChange={setEnabled}
  size="lg"
/>`} />
      </Section>
    </>
  );
}
