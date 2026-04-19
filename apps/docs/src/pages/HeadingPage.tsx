import { Heading, type HeadingLevel, type HeadingSize } from "@virtari-packages/react-text";
import { Section, Stack } from "../components";

const LEVELS: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
const SIZES: HeadingSize[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const TONES = ["default", "muted", "subtle", "primary", "success", "warning", "danger", "info"] as const;
const WEIGHTS = ["normal", "medium", "semibold", "bold"] as const;

export function HeadingPage() {
  return (
    <>
      <Section
        title="Levels"
        description="`level` controls the rendered tag (h1–h6) and picks a sensible default size. Decoupled from visual size."
      >
        <Stack>
          {LEVELS.map((level) => (
            <Heading key={level} level={level}>
              Heading level {level} — semantic h{level}
            </Heading>
          ))}
        </Stack>
      </Section>

      <Section title="Size scale" description="Nine display-leaning steps. Override the default size for any level.">
        <Stack>
          {SIZES.map((size) => (
            <Heading key={size} level={2} size={size}>
              Size {size} — The quick brown fox
            </Heading>
          ))}
        </Stack>
      </Section>

      <Section title="Weights">
        <Stack>
          {WEIGHTS.map((weight) => (
            <Heading key={weight} level={3} weight={weight}>
              {weight.charAt(0).toUpperCase() + weight.slice(1)} — almost before we knew it
            </Heading>
          ))}
        </Stack>
      </Section>

      <Section title="Tone" description="Semantic colors map to the same intent palette as Button, Badge, Chip.">
        <Stack>
          {TONES.map((tone) => (
            <Heading key={tone} level={3} tone={tone}>
              {tone.charAt(0).toUpperCase() + tone.slice(1)} tone
            </Heading>
          ))}
        </Stack>
      </Section>

      <Section title="Truncate & wrap" description="Single-line ellipsis or balanced wrap for hero copy.">
        <Stack>
          <div style={{ maxInlineSize: "20rem", border: "1px dashed var(--vds-color-border)", padding: "var(--vds-space-3)" }}>
            <Heading level={3} size="5" truncate>
              A very long heading that overflows the container will be truncated with an ellipsis
            </Heading>
          </div>
          <div style={{ maxInlineSize: "28rem" }}>
            <Heading level={2} size="7" wrap="balance">
              A balanced headline reads better when lines are roughly the same length
            </Heading>
          </div>
        </Stack>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Heading } from "@virtari-packages/react-text";

// Level controls semantics; size controls visuals.
<Heading level={1} size="9">Hero</Heading>
<Heading level={2}>Section title</Heading>
<Heading level={3} tone="muted" weight="medium">Subhead</Heading>

// Truncate + balance wrap
<Heading level={2} truncate>Long title…</Heading>
<Heading level={1} size="8" wrap="balance">Hero with balanced lines</Heading>`}</pre>
      </Section>
    </>
  );
}
