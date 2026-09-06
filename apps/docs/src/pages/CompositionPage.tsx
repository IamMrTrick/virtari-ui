import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import {
  Stack,
  Cluster,
  Grid,
  Sidebar as LayoutSidebar,
  Center,
} from "@virtari-packages/react-layout";
import { Section } from "../components";

const demoBoxStyle: React.CSSProperties = {
  padding: "var(--vds-space-3) var(--vds-space-4)",
  background: "var(--vds-color-surface-raised, var(--vds-color-surface))",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-surface)",
  color: "var(--vds-color-text)",
  fontSize: "var(--vds-text-sm)",
  textAlign: "center",
};

const Box = ({ children }: { children: React.ReactNode }) => (
  <div style={demoBoxStyle}>{children}</div>
);

export function CompositionPage() {
  return (
    <>
      <Section
        title="Stack"
        description="Vertical rhythm between children. Gap controlled via design tokens."
      >
        <Stack gap="md" style={{ maxInlineSize: "28rem" }}>
          <Box>First</Box>
          <Box>Second</Box>
          <Box>Third</Box>
        </Stack>
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Stack } from "@virtari-packages/react-layout";

<Stack gap="md">
  <Card />
  <Card />
  <Card />
</Stack>`} />
      </Section>

      <Section
        title="Cluster"
        description="Horizontal group with wrap. Use for toolbars, tag lists, button groups."
      >
        <Cluster gap="sm">
          <Box>Tag A</Box>
          <Box>Tag B</Box>
          <Box>Longer tag C</Box>
          <Box>D</Box>
          <Box>Tag E</Box>
          <Box>Tag F</Box>
          <Box>Tag G</Box>
          <Box>Tag H</Box>
        </Cluster>
        <VirtariCodeBlock renderer="static" language="tsx" code={`<Cluster gap="sm" align="center">
  <Tag>One</Tag>
  <Tag>Two</Tag>
  <Tag>Three</Tag>
</Cluster>`} />
      </Section>

      <Section
        title="Grid"
        description="Intrinsic responsive grid. Columns reflow based on minItemWidth — no media queries needed."
      >
        <Grid minItemWidth="12rem" gap="md">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
          <Box>Item 4</Box>
          <Box>Item 5</Box>
          <Box>Item 6</Box>
        </Grid>
        <VirtariCodeBlock renderer="static" language="tsx" code={`<Grid minItemWidth="16rem" gap="md">
  {items.map((i) => <Card key={i.id} {...i} />)}
</Grid>`} />
      </Section>

      <Section
        title="Sidebar"
        description="Sidebar + main content. Collapses to stacked rows when content can't meet its minimum width."
      >
        <LayoutSidebar sideWidth="10rem" contentMin="65%" gap="md">
          <Box>Sidebar</Box>
          <Box>Main content — resize the window and watch the layout switch to stacked when the main area can't keep 65% of the row.</Box>
        </LayoutSidebar>
        <VirtariCodeBlock renderer="static" language="tsx" code={`<Sidebar sideWidth="16rem" contentMin="60%" gap="md">
  <Nav />
  <Main />
</Sidebar>`} />
      </Section>

      <Section
        title="Center"
        description="Horizontally center content with a max width. Ideal for prose or centered page sections."
      >
        <Center maxWidth="md" gutter="md">
          <Box>
            This content is centered and limited to a comfortable reading width.
            Change the <VirtariInlineCode>maxWidth</VirtariInlineCode> prop to "sm" / "lg" / "xl" to
            resize.
          </Box>
        </Center>
        <VirtariCodeBlock renderer="static" language="tsx" code={`<Center maxWidth="md" gutter="md">
  <article>...</article>
</Center>`} />
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="css" code={`import {
  Stack,
  Cluster,
  Grid,
  Sidebar,
  Center,
} from "@virtari-packages/react-layout";

// Add styles once at app root:
// @import "@virtari-packages/react-layout/styles";`} />
      </Section>
    </>
  );
}
