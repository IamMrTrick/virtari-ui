# Original documentation page

Source ID: `apps/docs/src/pages/EmptyStatePage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { useState } from "react";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "@virtari-packages/react-empty-state";
import "@virtari-packages/react-empty-state/styles";
import "@virtari-packages/react-empty-state/tokens";
import { Button } from "@virtari-packages/react-button";
import { Section, Row } from "../components";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

export function EmptyStatePage() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  return (
    <>
      <Section title="Default" description="Icon, title, description, and action slots.">
        <Row style={{ justifyContent: "center" }}>
          <EmptyState>
            <EmptyStateIcon><SearchIcon /></EmptyStateIcon>
            <EmptyStateTitle>No results found</EmptyStateTitle>
            <EmptyStateDescription>
              Try adjusting your search or filter to find what you're looking for.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button variant="outline" size="sm">Clear filters</Button>
              <Button size="sm">New item</Button>
            </EmptyStateActions>
          </EmptyState>
        </Row>
      </Section>

      <Section title="Sizes" description="sm, md (default), lg.">
        <Row style={{ justifyContent: "center", gap: "var(--vds-space-8)" }}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <EmptyState key={s} size={s}>
              <EmptyStateIcon><SearchIcon /></EmptyStateIcon>
              <EmptyStateTitle>Size {s}</EmptyStateTitle>
              <EmptyStateDescription>Empty state at {s} size.</EmptyStateDescription>
            </EmptyState>
          ))}
        </Row>
      </Section>

      <Section title="Horizontal" description="Side-by-side layout for inline use.">
        <EmptyState orientation="horizontal" style={{ maxWidth: "32rem" }}>
          <EmptyStateIcon><InboxIcon /></EmptyStateIcon>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
            <EmptyStateTitle>Your inbox is empty</EmptyStateTitle>
            <EmptyStateDescription>Messages will appear here when someone contacts you.</EmptyStateDescription>
          </div>
        </EmptyState>
      </Section>

      <Section title="Without icon" description="Title and description only.">
        <Row style={{ justifyContent: "center" }}>
          <EmptyState>
            <EmptyStateTitle>No data available</EmptyStateTitle>
            <EmptyStateDescription>Add your first record to get started.</EmptyStateDescription>
            <EmptyStateActions>
              <Button size="sm">Add record</Button>
            </EmptyStateActions>
          </EmptyState>
        </Row>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "@virtari-packages/react-empty-state";
import "@virtari-packages/react-empty-state/styles";

<EmptyState size="md" orientation="vertical">
  <EmptyStateIcon><SearchIcon /></EmptyStateIcon>
  <EmptyStateTitle>No results found</EmptyStateTitle>
  <EmptyStateDescription>
    Try adjusting your search or filter.
  </EmptyStateDescription>
  <EmptyStateActions>
    <Button variant="outline">Clear filters</Button>
    <Button>New item</Button>
  </EmptyStateActions>
</EmptyState>`}</pre>
      </Section>

      <Section title="Props">
        <table style={{ width: "100%", fontSize: "var(--vds-text-sm)", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--vds-color-border)" }}>
              <th style={{ textAlign: "start", padding: "var(--vds-space-2) var(--vds-space-3)" }}>Prop</th>
              <th style={{ textAlign: "start", padding: "var(--vds-space-2) var(--vds-space-3)" }}>Type</th>
              <th style={{ textAlign: "start", padding: "var(--vds-space-2) var(--vds-space-3)" }}>Default</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["size", '"sm" | "md" | "lg"', '"md"'],
              ["orientation", '"vertical" | "horizontal"', '"vertical"'],
            ].map(([prop, type, def]) => (
              <tr key={prop} style={{ borderBottom: "1px solid var(--vds-color-border-muted)" }}>
                <td style={{ padding: "var(--vds-space-2) var(--vds-space-3)", fontFamily: "monospace" }}>{prop}</td>
                <td style={{ padding: "var(--vds-space-2) var(--vds-space-3)", color: "var(--vds-color-text-muted)", fontFamily: "monospace" }}>{type}</td>
                <td style={{ padding: "var(--vds-space-2) var(--vds-space-3)", color: "var(--vds-color-text-subtle)" }}>{def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
}

```
