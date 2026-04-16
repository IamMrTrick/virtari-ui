import { Textarea } from "@virtari/react-textarea";
import { Section, Row } from "../components";

export function TextareaPage() {
  return (
    <>
      <Section title="Basic" description="A standard textarea.">
        <div style={{ maxInlineSize: "24rem" }}>
          <Textarea placeholder="Type your message here..." />
        </div>
      </Section>

      <Section title="Sizes" description="Different textarea sizes.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)", maxInlineSize: "24rem" }}>
          <Textarea placeholder="Small textarea" rows={2} />
          <Textarea placeholder="Medium textarea (default)" rows={4} />
          <Textarea placeholder="Large textarea" rows={8} />
        </div>
      </Section>

      <Section title="Disabled" description="A disabled textarea.">
        <div style={{ maxInlineSize: "24rem" }}>
          <Textarea placeholder="This textarea is disabled" disabled />
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Textarea } from "@virtari/react-textarea";

// Basic
<Textarea placeholder="Enter text..." />

// With rows
<Textarea rows={6} placeholder="Longer text..." />

// Controlled
<Textarea value={text} onChange={(e) => setText(e.target.value)} />`}</pre>
      </Section>
    </>
  );
}
