import {
  Section as VSection,
  Row,
  Col,
  Container,
} from "@virtari/react-layout";
import { Section } from "../components";

const demoBoxStyle: React.CSSProperties = {
  padding: "var(--vds-space-3) var(--vds-space-4)",
  background: "var(--vds-color-surface-raised, var(--vds-color-surface))",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-element)",
  color: "var(--vds-color-text)",
  fontSize: "var(--vds-text-sm)",
  textAlign: "center",
  minBlockSize: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Box = ({ children }: { children: React.ReactNode }) => (
  <div style={demoBoxStyle}>{children}</div>
);

const sectionOutlineStyle: React.CSSProperties = {
  outline: "1px dashed var(--vds-color-border-muted)",
  outlineOffset: "-4px",
  borderRadius: "var(--vds-radius-surface)",
};

export function LayoutPage() {
  return (
    <>
      <Section
        title="Why these primitives?"
        description="Main → Section → Row → Col is the semantic hierarchy for a production page. Main is the page's single landmark. Section owns vertical rhythm and content width. Row owns the horizontal slot. Col owns the cell. Together they replace ad-hoc div + inline flex/grid markup."
      >
        <pre className="docs-code">{`import { Main, Section, Row, Col, Container } from "@virtari/react-layout";

<Main>
  <Section padding="lg" width="xl" gap="lg">
    <h2>Dashboard</h2>

    <Row cols={12} gap="md">
      <Col span={12} spanMd={8}><MainContent /></Col>
      <Col span={12} spanMd={4}><Sidebar /></Col>
    </Row>

    <Row autoFit minColWidth="16rem" gap="md">
      {cards.map(c => <Col key={c.id}><Card {...c} /></Col>)}
    </Row>
  </Section>
</Main>`}</pre>
      </Section>

      <Section
        title="Main — the page's single landmark"
        description="The <main> element is the dominant content of the page — HTML spec says exactly one non-hidden <main> per document. Our <Main> renders it with the right defaults: id='main' so a skip-link can target it, tabIndex=-1 so JS can focus it, and padding/gutter set to 'none' because <Main> is typically a landmark wrapping self-padded <Section>s."
      >
        <pre className="docs-code">{`{/* Shell: header + sidebar + main */}
<body>
  <a href="#main" className="skip-link">Skip to main content</a>
  <Header>…</Header>
  <div style={{ display: "flex" }}>
    <Sidebar>…</Sidebar>
    <Main>
      <Section padding="lg">Hero</Section>
      <Section padding="md">Features</Section>
    </Main>
  </div>
</body>

{/* …or use Main as a self-padded single-Section */}
<Main padding="lg" gutter="md" width="xl" gap="lg">
  <h1>Dashboard</h1>
  <Card>…</Card>
</Main>`}</pre>

        {/*
         * This docs page itself renders inside the app shell's <main>, so we
         * can't render a real <Main> here without creating a nested landmark.
         * The preview uses <section> with the same visual props to mirror
         * what <Main> would look like.
         */}
        <VSection
          padding="md"
          gutter="md"
          width="lg"
          background="subtle"
          gap="sm"
          style={sectionOutlineStyle}
        >
          <Box>&lt;Main&gt; renders &lt;main id=&quot;main&quot; tabIndex=&quot;-1&quot;&gt;</Box>
          <Box>All Section props (padding, gutter, width, background, gap…) work identically</Box>
        </VSection>

        <ul className="docs-prose" style={{ paddingInlineStart: "1.25em", marginBlockStart: "var(--vds-space-3)" }}>
          <li>
            Render <strong>exactly one</strong> <code>&lt;Main&gt;</code> per
            page (browsers and screen readers treat additional ones as an error).
          </li>
          <li>
            The default <code>id=&quot;main&quot;</code> pairs with a skip-link:{" "}
            <code>&lt;a href=&quot;#main&quot;&gt;Skip to content&lt;/a&gt;</code>.
          </li>
          <li>
            <code>tabIndex=&quot;-1&quot;</code> lets JS focus the region
            without adding it to the tab order — needed for single-page-app
            route transitions that re-focus the main content.
          </li>
          <li>
            Default padding / gutter are <code>&quot;none&quot;</code> because{" "}
            <code>&lt;Main&gt;</code> is usually a thin landmark wrapping
            self-padded <code>&lt;Section&gt;</code>s. Override when you want
            Main to own the padding directly.
          </li>
        </ul>
      </Section>

      <Section
        title="Section — vertical rhythm band"
        description="Outer full-bleed band for block padding + optional background, wrapping an inner container that constrains content width. Set contained={false} for edge-to-edge children."
      >
        <VSection
          padding="lg"
          gutter="md"
          width="lg"
          background="subtle"
          gap="md"
          style={sectionOutlineStyle}
        >
          <Box>Inside Section — background fills the band while content stays within `width="lg"`</Box>
          <Box>Direct children flow vertically with `gap="md"`</Box>
        </VSection>

        <pre className="docs-code">{`<Section
  padding="lg"          // xs | sm | md | lg | xl | 2xl | 3xl
  gutter="md"           // xs | sm | md | lg | xl
  width="lg"            // xs | sm | md | lg | xl | 2xl | prose | full
  background="subtle"   // none | subtle | muted | emphasis
  gap="md"              // space between direct children (Rows)
  contained={true}      // wrap children in the max-width container
  fullHeight={false}    // min-block-size: 100svh
  align="center"        // horizontal alignment of the inner container
>
  <h2>…</h2>
  <Row>…</Row>
</Section>`}</pre>
      </Section>

      <Section
        title="Row — grid by default"
        description="The row is a 12-column CSS Grid out of the box. Columns lay out via <Col span={n}> with the same mental model as Bootstrap / Tailwind, but you can re-target to 4/6/8 columns or switch to flex mode."
      >
        <Row cols={12} gap="md">
          <Col span={8}><Box>span 8</Box></Col>
          <Col span={4}><Box>span 4</Box></Col>
          <Col span={4}><Box>4</Box></Col>
          <Col span={4}><Box>4</Box></Col>
          <Col span={4}><Box>4</Box></Col>
          <Col span={6}><Box>6</Box></Col>
          <Col span={6}><Box>6</Box></Col>
        </Row>

        <pre className="docs-code">{`<Row cols={12} gap="md">
  <Col span={8}><Main /></Col>
  <Col span={4}><Aside /></Col>
</Row>`}</pre>
      </Section>

      <Section
        title="Row — responsive spans"
        description="Col accepts spanSm / spanMd / spanLg / spanXl. Mobile-first: unspecified breakpoints inherit from the nearest smaller one. Resize the viewport."
      >
        <Row cols={12} gap="md">
          <Col span={12} spanMd={6} spanLg={4}><Box>12 → md:6 → lg:4</Box></Col>
          <Col span={12} spanMd={6} spanLg={4}><Box>12 → md:6 → lg:4</Box></Col>
          <Col span={12} spanMd={12} spanLg={4}><Box>12 → md:12 → lg:4</Box></Col>
        </Row>

        <pre className="docs-code">{`<Col span={12} spanMd={6} spanLg={4}>
  <Card />
</Col>`}</pre>
      </Section>

      <Section
        title="Row — autoFit for card galleries"
        description="Set autoFit and a minColWidth to switch the row to `repeat(auto-fit, minmax(minColWidth, 1fr))`. Column count reflows without media queries — ideal for product / card grids."
      >
        <Row autoFit minColWidth="14rem" gap="md">
          <Col><Box>Card 1</Box></Col>
          <Col><Box>Card 2</Box></Col>
          <Col><Box>Card 3</Box></Col>
          <Col><Box>Card 4</Box></Col>
          <Col><Box>Card 5</Box></Col>
          <Col><Box>Card 6</Box></Col>
        </Row>

        <pre className="docs-code">{`<Row autoFit minColWidth="14rem" gap="md">
  {products.map(p => <Col key={p.id}><ProductCard {...p} /></Col>)}
</Row>`}</pre>
      </Section>

      <Section
        title="Row — flex mode"
        description="For simple horizontal groups where columns size to their content, switch to mode='flex'. All the gap / align / justify props still apply. Use wrap for responsive reflow."
      >
        <Row mode="flex" gap="sm" wrap>
          <Box>Tag A</Box>
          <Box>Tag B</Box>
          <Box>Longer tag C</Box>
          <Box>D</Box>
          <Box>Tag E</Box>
        </Row>

        <pre className="docs-code">{`<Row mode="flex" gap="sm" wrap>
  {tags.map(t => <Tag key={t} />)}
</Row>`}</pre>
      </Section>

      <Section
        title="Container — standalone max-width"
        description="When you need a max-width wrapper without the block padding of a Section — inside a sidebar, modal, or nested layout."
      >
        <Container width="md" gutter="md" style={sectionOutlineStyle}>
          <Box>Centered, max-inline-size: var(--vds-container-width-md)</Box>
        </Container>

        <pre className="docs-code">{`<Container width="md" gutter="md">
  <Article />
</Container>`}</pre>
      </Section>

      <Section
        title="Token architecture"
        description="All defaults flow from @virtari/tokens/layout — a three-tier system mirroring the radii & color tiers."
      >
        <pre className="docs-code">{`/* packages/tokens/src/layout/primitives.css */
--vds-container-width-xs ... -2xl, -prose, -full
--vds-section-padding-xs ... -3xl
--vds-section-gutter-xs ... -xl
--vds-row-gap-xs ... -2xl
--vds-row-cols-1/2/3/4/6/8/12

/* packages/tokens/src/layout/semantic.css */
--vds-container-width       → primitive
--vds-section-padding-block → primitive
--vds-section-gap           → space token
--vds-row-gap               → primitive
--vds-row-cols              → 12

/* packages/tokens/src/layout/components.css */
--vds-container-width-default       → semantic
--vds-section-padding-block-default → semantic
--vds-row-gap-default               → semantic
...`}</pre>
      </Section>

      <Section
        title="API"
        description="Every prop is typed. Components forward ref and extra HTML props."
      >
        <pre className="docs-code">{`interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;              // default "section"
  padding?: "none"|"xs"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl";
  gutter?: "none"|"xs"|"sm"|"md"|"lg"|"xl";
  width?: "xs"|"sm"|"md"|"lg"|"xl"|"2xl"|"prose"|"full";
  maxInlineSize?: string;        // arbitrary size override
  contained?: boolean;           // default true
  background?: "none"|"subtle"|"muted"|"emphasis";
  align?: "start"|"center"|"end";
  gap?: "none"|"xs"|"sm"|"md"|"lg"|"xl"|"2xl";
  fullHeight?: boolean;          // min-block-size: 100svh
}

interface RowProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;              // default "div"
  mode?: "grid"|"flex";          // default "grid"
  cols?: 1|2|3|4|6|8|12;         // default 12
  gap?: RowGap;                  // both axes
  colGap?: RowGap;               // override col axis
  rowGap?: RowGap;               // override row axis
  align?: "start"|"center"|"end"|"stretch"|"baseline";
  justify?: "start"|"center"|"end"|"between"|"around"|"evenly";
  wrap?: boolean;                // flex mode only
  reverse?: boolean;             // flex mode only
  autoFit?: boolean;             // switches grid to auto-fit
  minColWidth?: string;          // autoFit minimum column size
}

interface ColProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;              // default "div"
  span?: number | "full" | "auto";  // default "auto" (one grid track)
  spanSm?: ColSpan;              // ≥640px
  spanMd?: ColSpan;              // ≥768px
  spanLg?: ColSpan;              // ≥1024px
  spanXl?: ColSpan;              // ≥1280px
  start?: number;                // grid-column-start
  order?: number;
  align?: "start"|"center"|"end"|"stretch";
  justify?: "start"|"center"|"end"|"stretch";
  grow?: number;                 // flex mode
  shrink?: number;               // flex mode
  basis?: string;                // flex mode
}

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;              // default "div"
  width?: ContainerWidth;
  maxInlineSize?: string;
  gutter?: ContainerGutter;
  center?: boolean;              // default true
}`}</pre>
      </Section>
    </>
  );
}
