# Original documentation page

Source ID: `apps/docs/src/pages/TogglePage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { Toggle } from "@virtari-packages/react-toggle";
import { Section, Row } from "../components";

export function TogglePage() {
  return (
    <>
      <Section title="Variants">
        <Row>
          <Toggle aria-label="Bold">B</Toggle>
          <Toggle variant="outline" aria-label="Italic">I</Toggle>
        </Row>
      </Section>

      <Section title="All Sizes" description="7 sizes sharing the same height ramp as Button, Input, Select.">
        <Row>
          <Toggle size="2xs" aria-label="2xs">2xs</Toggle>
          <Toggle size="xs" aria-label="xs">xs</Toggle>
          <Toggle size="sm" aria-label="sm">sm</Toggle>
          <Toggle aria-label="md">md</Toggle>
          <Toggle size="lg" aria-label="lg">lg</Toggle>
          <Toggle size="xl" aria-label="xl">xl</Toggle>
          <Toggle size="2xl" aria-label="2xl">2xl</Toggle>
        </Row>
      </Section>

      <Section title="States">
        <Row>
          <Toggle aria-label="Default">Default</Toggle>
          <Toggle defaultPressed aria-label="Pressed">Pressed</Toggle>
          <Toggle disabled aria-label="Disabled">Disabled</Toggle>
        </Row>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Toggle } from "@virtari-packages/react-toggle";

<Toggle
  pressed={bold}
  onPressedChange={setBold}
  variant="outline"
  size="lg"
>
  B
</Toggle>`} />
      </Section>
    </>
  );
}

```
