import { Input } from "@virtari/react-input";
import { Section, Row, Stack } from "../components";

export function InputPage() {
  return (
    <>
      <Section title="All Sizes" description="7 sizes sharing the same height ramp as Button, Select, and Toggle.">
        <Stack>
          <Row>
            <span className="docs-size-label">2xs</span>
            <Input inputSize="2xs" placeholder="24px — WCAG AA minimum" />
          </Row>
          <Row>
            <span className="docs-size-label">xs</span>
            <Input inputSize="xs" placeholder="28px — Tables, toolbars" />
          </Row>
          <Row>
            <span className="docs-size-label">sm</span>
            <Input inputSize="sm" placeholder="32px — Secondary forms" />
          </Row>
          <Row>
            <span className="docs-size-label">md</span>
            <Input placeholder="40px — Default" />
          </Row>
          <Row>
            <span className="docs-size-label">lg</span>
            <Input inputSize="lg" placeholder="44px — WCAG AAA + Apple HIG" />
          </Row>
          <Row>
            <span className="docs-size-label">xl</span>
            <Input inputSize="xl" placeholder="52px — Hero sections" />
          </Row>
          <Row>
            <span className="docs-size-label">2xl</span>
            <Input inputSize="2xl" placeholder="64px — Landing pages" />
          </Row>
        </Stack>
      </Section>

      <Section title="States">
        <Stack>
          <Input placeholder="Normal" />
          <Input placeholder="Invalid" aria-invalid="true" />
          <Input placeholder="Disabled" disabled />
        </Stack>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Input } from "@virtari/react-input";

<Input inputSize="lg" placeholder="Enter email..." />

// Sizes: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
// Same height as <Button size="lg"> and <SelectTrigger size="lg">`}</pre>
      </Section>
    </>
  );
}
