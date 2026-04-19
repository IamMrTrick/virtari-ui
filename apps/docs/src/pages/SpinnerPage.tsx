import { Spinner } from "@virtari-packages/react-spinner";
import { Section, Row } from "../components";

export function SpinnerPage() {
  return (
    <>
      <Section title="Sizes" description="Spinners in small, medium, and large sizes.">
        <Row>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Spinner size="sm" />
            <span>Small</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Spinner size="md" />
            <span>Medium</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Spinner size="lg" />
            <span>Large</span>
          </div>
        </Row>
      </Section>

      <Section title="Inline" description="Spinner used inline with text.">
        <Row>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Spinner size="sm" />
            <span>Loading results...</span>
          </div>
        </Row>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Spinner } from "@virtari-packages/react-spinner";

// Sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}</pre>
      </Section>
    </>
  );
}
