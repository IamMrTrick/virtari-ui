import { Badge } from "@virtari/react-badge";
import { Section, Row } from "../components";

export function BadgePage() {
  return (
    <>
      <Section title="Variants">
        <Row>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </Row>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Badge } from "@virtari/react-badge";

<Badge variant="destructive">Error</Badge>`}</pre>
      </Section>
    </>
  );
}
