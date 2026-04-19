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
