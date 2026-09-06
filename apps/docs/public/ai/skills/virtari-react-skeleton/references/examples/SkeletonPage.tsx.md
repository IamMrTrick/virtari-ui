# Original documentation page

Source ID: `apps/docs/src/pages/SkeletonPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { Skeleton } from "@virtari-packages/react-skeleton";
import { Section, Row } from "../components";

export function SkeletonPage() {
  return (
    <>
      <Section title="Shapes" description="Rectangle, circle, and text-line skeletons.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)", maxInlineSize: "24rem" }}>
          <Skeleton style={{ height: "1rem", width: "100%" }} />
          <Skeleton style={{ height: "1rem", width: "75%" }} />
          <Skeleton style={{ height: "1rem", width: "50%" }} />
          <Skeleton style={{ height: "3rem", width: "3rem", borderRadius: "50%" }} />
        </div>
      </Section>

      <Section title="Card Layout" description="A skeleton placeholder mimicking a card with avatar and text.">
        <div style={{ display: "flex", gap: "var(--vds-space-3)", maxInlineSize: "24rem", padding: "var(--vds-space-4)", borderRadius: "var(--vds-radius-card)", border: "1px solid var(--vds-color-border)" }}>
          <Skeleton style={{ height: "2.5rem", width: "2.5rem", borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
            <Skeleton style={{ height: "1rem", width: "60%" }} />
            <Skeleton style={{ height: "0.75rem", width: "100%" }} />
            <Skeleton style={{ height: "0.75rem", width: "80%" }} />
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Skeleton } from "@virtari-packages/react-skeleton";

// Text line
<Skeleton style={{ height: "1rem", width: "75%" }} />

// Circle (avatar)
<Skeleton style={{ height: 40, width: 40, borderRadius: "50%" }} />

// Rectangle (image placeholder)
<Skeleton style={{ height: 200, width: "100%" }} />`}</pre>
      </Section>
    </>
  );
}

```
