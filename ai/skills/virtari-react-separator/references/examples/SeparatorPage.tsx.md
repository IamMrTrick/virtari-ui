# Original documentation page

Source ID: `apps/docs/src/pages/SeparatorPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { Separator } from "@virtari-packages/react-separator";
import { Section, Row } from "../components";

export function SeparatorPage() {
  return (
    <>
      <Section title="Horizontal" description="A horizontal separator between content blocks.">
        <div style={{ maxInlineSize: "24rem" }}>
          <p style={{ margin: 0 }}>Content above</p>
          <Separator style={{ margin: "var(--vds-space-3) 0" }} />
          <p style={{ margin: 0 }}>Content below</p>
        </div>
      </Section>

      <Section title="Vertical" description="A vertical separator between inline elements.">
        <Row>
          <span>Home</span>
          <Separator orientation="vertical" style={{ height: "1.5rem" }} />
          <span>Settings</span>
          <Separator orientation="vertical" style={{ height: "1.5rem" }} />
          <span>Profile</span>
        </Row>
      </Section>

      <Section title="Decorative" description="Separators can be decorative (aria-hidden) or semantic.">
        <div style={{ maxInlineSize: "24rem" }}>
          <h4 style={{ margin: "0 0 var(--vds-space-2)" }}>Section Title</h4>
          <Separator decorative />
          <p style={{ marginTop: "var(--vds-space-2)" }}>
            This separator is purely decorative and hidden from screen readers.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Separator } from "@virtari-packages/react-separator";

// Horizontal (default)
<Separator />

// Vertical
<Separator orientation="vertical" />

// Decorative (aria-hidden)
<Separator decorative />`} />
      </Section>
    </>
  );
}

```
