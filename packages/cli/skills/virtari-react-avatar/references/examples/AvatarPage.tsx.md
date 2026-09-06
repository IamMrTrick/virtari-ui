# Original documentation page

Source ID: `apps/docs/src/pages/AvatarPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { Avatar } from "@virtari-packages/react-avatar";
import { Section, Row } from "../components";

const AUTO_NAMES = [
  { fallback: "AG", key: "ada.lovelace@example.com" },
  { fallback: "BT", key: "bram.turing@example.com" },
  { fallback: "CS", key: "claude.shannon@example.com" },
  { fallback: "DK", key: "donald.knuth@example.com" },
  { fallback: "EH", key: "edsger.hoare@example.com" },
  { fallback: "FB", key: "frances.allen@example.com" },
  { fallback: "GL", key: "grace.hopper@example.com" },
  { fallback: "HB", key: "hedy.lamarr@example.com" },
  { fallback: "IJ", key: "ivan.sutherland@example.com" },
  { fallback: "JW", key: "john.backus@example.com" },
];

export function AvatarPage() {
  return (
    <>
      <Section title="Sizes">
        <Row>
          <Avatar fallback="XS" size="xs" />
          <Avatar fallback="SM" size="sm" />
          <Avatar fallback="MD" />
          <Avatar fallback="LG" size="lg" />
          <Avatar fallback="XL" size="xl" />
        </Row>
      </Section>

      <Section
        title="With Image"
        description="Falls back to initials when image fails to load."
      >
        <Row>
          <Avatar
            src="https://i.pravatar.cc/150?u=virtari1"
            alt="User avatar"
            fallback="VD"
            size="lg"
          />
          <Avatar
            src="https://i.pravatar.cc/150?u=virtari2"
            alt="User avatar"
            fallback="AB"
            size="lg"
          />
          <Avatar
            src="https://broken-url.example"
            alt="Broken image"
            fallback="FB"
            size="lg"
          />
        </Row>
      </Section>

      <Section
        title="Color palette"
        description="Eight chart-palette slots derived from the design-system tokens. Each is brand-aware (flips per [data-brand]) and mode-aware (shifts in dark mode)."
      >
        <Row>
          <Avatar fallback="01" color="1" size="lg" />
          <Avatar fallback="02" color="2" size="lg" />
          <Avatar fallback="03" color="3" size="lg" />
          <Avatar fallback="04" color="4" size="lg" />
          <Avatar fallback="05" color="5" size="lg" />
          <Avatar fallback="06" color="6" size="lg" />
          <Avatar fallback="07" color="7" size="lg" />
          <Avatar fallback="08" color="8" size="lg" />
        </Row>
      </Section>

      <Section
        title="Auto colour (rainbow mode)"
        description="color=&ldquo;auto&rdquo; hashes `colorKey` (or `fallback` if no key) to one of the 8 slots. Same input always maps to the same colour, so Ada Lovelace stays red every render."
      >
        <Row>
          {AUTO_NAMES.map((p) => (
            <Avatar
              key={p.key}
              fallback={p.fallback}
              color="auto"
              colorKey={p.key}
              size="lg"
            />
          ))}
        </Row>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Avatar } from "@virtari-packages/react-avatar";

// Default \u2014 neutral surface background
<Avatar fallback="JD" />

// Explicit chart slot (1\u20138)
<Avatar fallback="JD" color="3" />

// Auto: hash a stable key (id / email / full name) to a colour.
// Same key \u2192 same colour, every render.
<Avatar
  fallback="JD"
  color="auto"
  colorKey="john.doe@example.com"
/>`} />
      </Section>
    </>
  );
}

```
