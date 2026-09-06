import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  FAQAccordion,
  type AccordionVariant,
  type AccordionSize,
  type AccordionColor,
  type AccordionIconType,
  type AccordionIconPosition,
  type FAQItem,
} from "@virtari-packages/react-accordion";
import { Section, Row } from "../components";

/* ─────────────────────────── Demo content ─────────────────────────── */

const ITEMS = [
  {
    id: "install",
    q: "How do I install Virtari?",
    a: "Install individual packages via npm, e.g. `npm install @virtari-packages/react-accordion`. Each component ships with its own stylesheet so you only pull what you use.",
  },
  {
    id: "a11y",
    q: "Is it accessible?",
    a: "Yes. All components follow WAI-ARIA patterns, are keyboard navigable, respect `prefers-reduced-motion`, and ship with logical-property CSS so they work in both LTR and RTL layouts.",
  },
  {
    id: "theming",
    q: "Can I theme it?",
    a: "Every component exposes CSS variables on a `.vds-*` root. Override them in your own stylesheet, or wrap your app in a `[data-theme]` block and Virtari's tokens do the rest.",
  },
];

const FAQ_ITEMS: FAQItem[] = ITEMS.map((it) => ({
  id: it.id,
  question: it.q,
  answer: it.a,
  answerText: it.a,
}));

/* ─────────────────────────── Reusable demo ─────────────────────────── */

function DemoAccordion(props: {
  variant?: AccordionVariant;
  size?: AccordionSize;
  color?: AccordionColor;
  iconType?: AccordionIconType;
  iconPosition?: AccordionIconPosition;
  defaultValue?: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={props.defaultValue ?? "install"}
      variant={props.variant}
      size={props.size}
      color={props.color}
      iconType={props.iconType}
      iconPosition={props.iconPosition}
    >
      {ITEMS.map((it) => (
        <AccordionItem key={it.id} value={it.id}>
          <AccordionTrigger>{it.q}</AccordionTrigger>
          <AccordionContent>{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export function AccordionPage() {
  return (
    <>
      {/* ─── Variants ─── */}
      <Section
        title="Variants"
        description="Six shape variants. Orthogonal to size, color, and icon — mix freely."
      >
        <Row>
          <Column label="plain (default)">
            <DemoAccordion variant="plain" />
          </Column>
          <Column label="bordered">
            <DemoAccordion variant="bordered" />
          </Column>
        </Row>
        <Row>
          <Column label="separated">
            <DemoAccordion variant="separated" />
          </Column>
          <Column label="filled">
            <DemoAccordion variant="filled" />
          </Column>
        </Row>
        <Row>
          <Column label="ghost">
            <DemoAccordion variant="ghost" />
          </Column>
          <Column label="contained">
            <DemoAccordion variant="contained" />
          </Column>
        </Row>
      </Section>

      {/* ─── Sizes ─── */}
      <Section title="Sizes" description="sm / md / lg — affects padding, font size, and icon.">
        <Row>
          <Column label="sm">
            <DemoAccordion variant="bordered" size="sm" />
          </Column>
          <Column label="md">
            <DemoAccordion variant="bordered" size="md" />
          </Column>
          <Column label="lg">
            <DemoAccordion variant="bordered" size="lg" />
          </Column>
        </Row>
      </Section>

      {/* ─── Icon types ─── */}
      <Section
        title="Icon types"
        description="Five indicator styles. Change per-root or per-trigger."
      >
        <Row>
          <Column label="chevron (default)">
            <DemoAccordion variant="contained" iconType="chevron" />
          </Column>
          <Column label="plus-minus">
            <DemoAccordion variant="contained" iconType="plus-minus" />
          </Column>
        </Row>
        <Row>
          <Column label="arrow">
            <DemoAccordion variant="contained" iconType="arrow" />
          </Column>
          <Column label="caret">
            <DemoAccordion variant="contained" iconType="caret" />
          </Column>
        </Row>
        <Row>
          <Column label="none (custom)">
            <DemoAccordion variant="contained" iconType="none" />
          </Column>
          <Column label="icon at start">
            <DemoAccordion
              variant="contained"
              iconType="plus-minus"
              iconPosition="start"
            />
          </Column>
        </Row>
      </Section>

      {/* ─── Colors ─── */}
      <Section
        title="Colors"
        description="Intent palettes for hover tint and open-state accent."
      >
        <Row>
          <Column label="neutral">
            <DemoAccordion variant="separated" color="neutral" />
          </Column>
          <Column label="primary">
            <DemoAccordion variant="separated" color="primary" />
          </Column>
        </Row>
        <Row>
          <Column label="accent">
            <DemoAccordion variant="separated" color="accent" />
          </Column>
          <Column label="success">
            <DemoAccordion variant="separated" color="success" />
          </Column>
        </Row>
        <Row>
          <Column label="danger">
            <DemoAccordion variant="separated" color="danger" />
          </Column>
          <Column label="warning">
            <DemoAccordion variant="separated" color="warning" />
          </Column>
        </Row>
      </Section>

      {/* ─── Multiple ─── */}
      <Section
        title="Multiple open"
        description="Use `type='multiple'` to allow more than one open row."
      >
        <div style={{ maxInlineSize: "32rem" }}>
          <Accordion
            type="multiple"
            defaultValue={["install", "a11y"]}
            variant="bordered"
          >
            {ITEMS.map((it) => (
              <AccordionItem key={it.id} value={it.id}>
                <AccordionTrigger>{it.q}</AccordionTrigger>
                <AccordionContent>{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ─── SEO-friendly FAQ ─── */}
      <Section
        title="FAQ (SEO-friendly)"
        description="`<FAQAccordion>` renders questions as real headings and emits FAQPage JSON-LD so Google surfaces rich results."
      >
        <div style={{ maxInlineSize: "40rem" }}>
          <FAQAccordion
            items={FAQ_ITEMS}
            variant="contained"
            iconType="plus-minus"
            headingLevel="h3"
            defaultOpen={["install"]}
          />
        </div>
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { FAQAccordion, type FAQItem } from "@virtari-packages/react-accordion";

const items: FAQItem[] = [
  {
    id: "install",
    question: "How do I install?",
    answer: <p>Install via npm…</p>,   // rich node for the UI
    answerText: "Install via npm.",    // plain text for JSON-LD
  },
];

<FAQAccordion
  items={items}
  variant="contained"
  iconType="plus-minus"
  headingLevel="h3"
/>`} />
      </Section>

      {/* ─── Usage ─── */}
      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@virtari-packages/react-accordion";

<Accordion
  type="single"
  collapsible
  variant="bordered"      // plain | bordered | separated | filled | ghost | contained
  size="md"               // sm | md | lg
  color="neutral"         // neutral | primary | accent | success | danger | warning
  iconType="chevron"      // chevron | plus-minus | arrow | caret | none
  iconPosition="end"      // end | start
  headingLevel="h3"       // h2 | h3 | h4 | h5 | h6
>
  <AccordionItem value="item-1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>Content here.</AccordionContent>
  </AccordionItem>
</Accordion>`} />
      </Section>
    </>
  );
}

/* ─────────────────────────── Small layout helper ─────────────────────────── */

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-2)",
        minInlineSize: "20rem",
        flex: "1 1 20rem",
      }}
    >
      <span
        style={{
          fontSize: "var(--vds-text-xs)",
          color: "var(--vds-color-text-muted)",
          fontWeight: "var(--vds-font-weight-medium)",
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}
