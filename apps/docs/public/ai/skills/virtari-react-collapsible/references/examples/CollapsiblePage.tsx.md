# Original documentation page

Source ID: `apps/docs/src/pages/CollapsiblePage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@virtari-packages/react-collapsible";
import { Button } from "@virtari-packages/react-button";
import { Section, Row } from "../components";

export function CollapsiblePage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Section title="Basic" description="A collapsible section toggled by a button.">
        <div style={{ maxInlineSize: "24rem" }}>
          <Collapsible open={open} onOpenChange={setOpen}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600 }}>3 starred repositories</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {open ? "Hide" : "Show"}
                </Button>
              </CollapsibleTrigger>
            </div>
            <div style={{ marginTop: "var(--vds-space-2)", padding: "var(--vds-space-2)", borderRadius: "var(--vds-radius-card)", border: "1px solid var(--vds-color-border)" }}>
              @virtari-packages/react-button
            </div>
            <CollapsibleContent>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)", marginTop: "var(--vds-space-2)" }}>
                <div style={{ padding: "var(--vds-space-2)", borderRadius: "var(--vds-radius-card)", border: "1px solid var(--vds-color-border)" }}>
                  @virtari-packages/react-select
                </div>
                <div style={{ padding: "var(--vds-space-2)", borderRadius: "var(--vds-radius-card)", border: "1px solid var(--vds-color-border)" }}>
                  @virtari-packages/react-accordion
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Section>

      <Section title="Default Open" description="A collapsible that starts open.">
        <div style={{ maxInlineSize: "24rem" }}>
          <Collapsible defaultOpen>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">Toggle Details</Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p style={{ marginTop: "var(--vds-space-2)" }}>
                These details are visible by default and can be collapsed.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@virtari-packages/react-collapsible";

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    Hidden content here.
  </CollapsibleContent>
</Collapsible>`}</pre>
      </Section>
    </>
  );
}

```
