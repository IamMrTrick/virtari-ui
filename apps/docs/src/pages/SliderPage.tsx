import { Slider } from "@virtari-packages/react-slider";
import { Section, Row } from "../components";

export function SliderPage() {
  return (
    <>
      <Section title="Basic" description="A slider with a default value.">
        <div style={{ maxInlineSize: "20rem" }}>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </Section>

      <Section title="Range" description="A range slider with two thumbs.">
        <div style={{ maxInlineSize: "20rem" }}>
          <Slider defaultValue={[25, 75]} max={100} step={1} />
        </div>
      </Section>

      <Section title="Disabled" description="A disabled slider.">
        <div style={{ maxInlineSize: "20rem" }}>
          <Slider defaultValue={[40]} max={100} step={1} disabled />
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Slider } from "@virtari-packages/react-slider";

// Basic
<Slider defaultValue={[50]} max={100} step={1} />

// Range
<Slider defaultValue={[25, 75]} max={100} step={1} />

// Controlled
<Slider value={value} onValueChange={setValue} />`}</pre>
      </Section>
    </>
  );
}
