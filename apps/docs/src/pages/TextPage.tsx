import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { Text, type TextSize } from "@virtari-packages/react-text";
import { Section, Stack } from "../components";

const SIZES: TextSize[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const TONES = ["default", "muted", "subtle", "primary", "success", "warning", "danger", "info"] as const;
const WEIGHTS = ["normal", "medium", "semibold", "bold"] as const;
const ALIGNS = ["start", "center", "end", "justify"] as const;

const PARAGRAPH =
  "The Virtari design system pairs a small, opinionated token set with composable React primitives. " +
  "Components consume tokens via CSS variables so themes, RTL, and density modes change centrally.";

export function TextPage() {
  return (
    <>
      <Section title="Size scale" description="Nine paragraph-friendly steps. Defaults to 3 (base).">
        <Stack>
          {SIZES.map((size) => (
            <Text key={size} size={size}>
              Size {size} — The quick brown fox jumps over the lazy dog
            </Text>
          ))}
        </Stack>
      </Section>

      <Section title="Weights">
        <Stack>
          {WEIGHTS.map((weight) => (
            <Text key={weight} size="4" weight={weight}>
              {weight.charAt(0).toUpperCase() + weight.slice(1)} — pack my box with five dozen liquor jugs
            </Text>
          ))}
        </Stack>
      </Section>

      <Section title="Tone">
        <Stack>
          {TONES.map((tone) => (
            <Text key={tone} tone={tone}>
              {tone.charAt(0).toUpperCase() + tone.slice(1)} tone — used for state and hierarchy.
            </Text>
          ))}
        </Stack>
      </Section>

      <Section title="Alignment">
        <Stack>
          {ALIGNS.map((align) => (
            <div key={align} style={{ maxInlineSize: "32rem", borderInlineStart: "2px solid var(--vds-color-border)", paddingInlineStart: "var(--vds-space-3)" }}>
              <Text size="2" tone="muted" weight="medium">{align}</Text>
              <Text align={align}>{PARAGRAPH}</Text>
            </div>
          ))}
        </Stack>
      </Section>

      <Section title="Truncate & wrap" description="Useful inside list rows, table cells, and chips.">
        <Stack>
          <div style={{ maxInlineSize: "18rem", border: "1px dashed var(--vds-color-border)", padding: "var(--vds-space-3)" }}>
            <Text truncate>This line is too long to fit so it gets ellipsised at the inline end</Text>
          </div>
          <div style={{ maxInlineSize: "32rem" }}>
            <Text wrap="pretty">
              Pretty wrap avoids orphans and ragged edges in flowing copy — useful for marketing paragraphs
              where typography matters.
            </Text>
          </div>
        </Stack>
      </Section>

      <Section title="As another element" description="Switch the rendered tag without losing token-driven styles.">
        <Stack>
          <Text as="span" size="2" tone="muted">Inline span — for metadata next to a title.</Text>
          <Text as="label" size="2" weight="medium">Label element — pairs with form controls.</Text>
          <Text as="div" size="3">Div element — when the surrounding context already provides paragraph semantics.</Text>
        </Stack>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Text } from "@virtari-packages/react-text";

<Text>Default paragraph</Text>
<Text size="2" tone="muted">Caption / helper</Text>
<Text as="label" weight="medium">Form label</Text>
<Text truncate>Single-line cell content…</Text>
<Text wrap="pretty">Marketing paragraph with nicer line breaks.</Text>`} />
      </Section>
    </>
  );
}
