# Original documentation page

Source ID: `apps/docs/src/pages/SegmentedControlPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import { SegmentedControl, SegmentedControlItem } from "@virtari-packages/react-segmented-control";
import "@virtari-packages/react-segmented-control/styles";
import "@virtari-packages/react-segmented-control/tokens";
import { Section, Row } from "../components";

export function SegmentedControlPage() {
  const [view, setView] = useState("list");
  const [period, setPeriod] = useState("week");


  return (
    <>
      <Section title="Default" description="Pick one option from a grouped set.">
        <Row>
          <SegmentedControl aria-label="View preference" value={view} onValueChange={setView}>
            <SegmentedControlItem value="list">List</SegmentedControlItem>
            <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
            <SegmentedControlItem value="board">Board</SegmentedControlItem>
          </SegmentedControl>
        </Row>
        <p style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
          Selected: <strong>{view}</strong>
        </p>
      </Section>

      <Section title="Sizes" description="sm, md (default), lg.">
        {(["sm", "md", "lg"] as const).map((s) => (
          <Row key={s} style={{ alignItems: "center" }}>
            <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)", minWidth: "2rem" }}>{s}</span>
            <SegmentedControl aria-label="Reporting period" value={period} onValueChange={setPeriod} size={s}>
              <SegmentedControlItem value="day">Day</SegmentedControlItem>
              <SegmentedControlItem value="week">Week</SegmentedControlItem>
              <SegmentedControlItem value="month">Month</SegmentedControlItem>
              <SegmentedControlItem value="year">Year</SegmentedControlItem>
            </SegmentedControl>
          </Row>
        ))}
      </Section>

      <Section title="Full width" description="Items share the available width. Long labels wrap and the track grows to fit.">
        <SegmentedControl aria-label="View preference" value={view} onValueChange={setView} fullWidth>
          <SegmentedControlItem value="list">List</SegmentedControlItem>
          <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
          <SegmentedControlItem value="board">Board</SegmentedControlItem>
        </SegmentedControl>
      </Section>

      <Section title="With icons" description="Leading icon before label text.">
        <Row>
          <SegmentedControl aria-label="View preference" value={view} onValueChange={setView}>
            <SegmentedControlItem value="list" icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            }>List</SegmentedControlItem>
            <SegmentedControlItem value="grid" icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            }>Grid</SegmentedControlItem>
            <SegmentedControlItem value="board" icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="18"/><rect x="10.5" y="3" width="5" height="18"/><rect x="18" y="3" width="3" height="18"/></svg>
            }>Board</SegmentedControlItem>
          </SegmentedControl>
        </Row>
      </Section>

      <Section title="Long labels" description="Full-width labels wrap inside a narrow container. Direction follows the surrounding language.">
        <div style={{ maxInlineSize: "24rem" }} dir="rtl">
          <SegmentedControl aria-label="بازه گزارش" defaultValue="recent" fullWidth>
            <SegmentedControlItem value="recent">گزارش‌های اخیر</SegmentedControlItem>
            <SegmentedControlItem value="all">همه گزارش‌های سالانه</SegmentedControlItem>
          </SegmentedControl>
        </div>
      </Section>

      <Section title="Disabled" description="Entire control or individual items.">
        <Row>
          <SegmentedControl aria-label="Reporting period" defaultValue="week" disabled>
            <SegmentedControlItem value="day">Day</SegmentedControlItem>
            <SegmentedControlItem value="week">Week</SegmentedControlItem>
            <SegmentedControlItem value="month">Month</SegmentedControlItem>
          </SegmentedControl>
          <SegmentedControl aria-label="Reporting period" defaultValue="week">
            <SegmentedControlItem value="day" disabled>Day</SegmentedControlItem>
            <SegmentedControlItem value="week">Week</SegmentedControlItem>
            <SegmentedControlItem value="month">Month</SegmentedControlItem>
          </SegmentedControl>
        </Row>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { SegmentedControl, SegmentedControlItem } from "@virtari-packages/react-segmented-control";
import "@virtari-packages/react-segmented-control/styles";

const [view, setView] = useState("list");

<SegmentedControl aria-label="View preference" value={view} onValueChange={setView} size="md">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
  <SegmentedControlItem value="board">Board</SegmentedControlItem>
</SegmentedControl>`} />
      </Section>
    </>
  );
}

```
