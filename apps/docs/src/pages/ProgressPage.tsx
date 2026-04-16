import { Progress } from "@virtari/react-progress";
import { Section, Row } from "../components";

export function ProgressPage() {
  return (
    <>
      <Section title="Values" description="Progress bars at different completion levels.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)", maxInlineSize: "24rem" }}>
          <div>
            <span style={{ fontSize: "0.875rem" }}>25%</span>
            <Progress value={25} />
          </div>
          <div>
            <span style={{ fontSize: "0.875rem" }}>50%</span>
            <Progress value={50} />
          </div>
          <div>
            <span style={{ fontSize: "0.875rem" }}>75%</span>
            <Progress value={75} />
          </div>
          <div>
            <span style={{ fontSize: "0.875rem" }}>100%</span>
            <Progress value={100} />
          </div>
        </div>
      </Section>

      <Section title="Indeterminate" description="No value set shows an indeterminate state.">
        <div style={{ maxInlineSize: "24rem" }}>
          <Progress />
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Progress } from "@virtari/react-progress";

// Determinate
<Progress value={60} />

// Indeterminate
<Progress />`}</pre>
      </Section>
    </>
  );
}
