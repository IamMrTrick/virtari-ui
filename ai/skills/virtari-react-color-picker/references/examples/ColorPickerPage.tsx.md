# Original documentation page

Source ID: `apps/docs/src/pages/ColorPickerPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import { ColorPicker } from "@virtari-packages/react-color-picker";
import "@virtari-packages/react-color-picker/styles";
import { Section } from "../components";

const LINEAR_DEFAULT = "linear-gradient(90deg, #D9D9D9 0%, #737373 100%)";
const RADIAL_DEFAULT = "radial-gradient(circle at 24% 22%, #FFD166 0%, #EF476F 42%, #1B1035 100%)";
const CONIC_DEFAULT = "conic-gradient(from 35deg at 50% 50%, #00C2FF 0%, #7C3AED 34%, #FF2D55 68%, #00C2FF 100%)";

function PreviewCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: "var(--vds-space-3)",
        minInlineSize: 0,
        inlineSize: "min(22rem, 100%)",
      }}
    >
      <div
        style={{
          position: "relative",
          minBlockSize: "10rem",
          padding: "var(--vds-space-4)",
          borderRadius: "var(--vds-radius-card, 1rem)",
          border: "1px solid color-mix(in oklch, var(--vds-color-border) 58%, transparent)",
          background: value,
          overflow: "hidden",
          boxShadow: "0 20px 40px -26px color-mix(in oklch, black 34%, transparent)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, color-mix(in oklch, black 6%, transparent), color-mix(in oklch, black 34%, transparent))",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "grid",
            gap: "var(--vds-space-2)",
            alignContent: "end",
            minBlockSize: "100%",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              inlineSize: "fit-content",
              padding: "0.35rem 0.7rem",
              borderRadius: "999px",
              background: "color-mix(in oklch, white 18%, transparent)",
              color: "white",
              fontSize: "var(--vds-text-xs)",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              backdropFilter: "blur(10px)",
            }}
          >
            {title}
          </span>
          <div style={{ color: "white" }}>
            <div style={{ fontSize: "1.15rem", fontWeight: 700 }}>Live preview</div>
            <div style={{ opacity: 0.82, fontSize: "var(--vds-text-sm)" }}>{note}</div>
          </div>
        </div>
      </div>
      <VirtariCodeBlock renderer="static" language="tsx" code={value} wrap />
    </div>
  );
}

export function ColorPickerPage() {
  const [solidCss, setSolidCss] = useState("#FF2D55");
  const [linearCss, setLinearCss] = useState(LINEAR_DEFAULT);
  const [radialCss, setRadialCss] = useState(RADIAL_DEFAULT);
  const [conicCss, setConicCss] = useState(CONIC_DEFAULT);
  const [codeModeCss, setCodeModeCss] = useState(
    "linear-gradient(135deg, #111827 0%, #1D4ED8 38%, #7C3AED 68%, #F97316 100%)",
  );
  const [swatchCss, setSwatchCss] = useState("#3B82F6");

  return (
    <>
      <Section
        title="Controlled solid color"
        description="Drive the picker with a CSS string and pipe the same value into a live surface, badges, cards, or theme previews."
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: "var(--vds-space-5)",
          }}
        >
          <ColorPicker
            value={solidCss}
            onValueChange={setSolidCss}
            defaultFormat="hex"
            mode="solid"
          />
          <PreviewCard
            title="Solid"
            value={solidCss}
            note="Best for token authoring, status colors, and controlled brand accents."
          />
        </div>
      </Section>

      <Section
        title="Gradient authoring"
        description="Separate demos for linear, radial, and conic gradients. Each one keeps its own mode so you can test stop editing, alpha, angle, and center controls."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
            gap: "var(--vds-space-6)",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
            <ColorPicker
              value={linearCss}
              onValueChange={setLinearCss}
              mode="gradient"
              allowedTypes={["linear"]}
              defaultFormat="hsl"
            />
            <PreviewCard
              title="Linear"
              value={linearCss}
              note="Hero backgrounds, buttons, and directional light/shadow ramps."
            />
          </div>

          <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
            <ColorPicker
              value={radialCss}
              onValueChange={setRadialCss}
              mode="gradient"
              allowedTypes={["radial"]}
              defaultFormat="hsb"
            />
            <PreviewCard
              title="Radial"
              value={radialCss}
              note="Spotlights, glows, and soft atmospheric surfaces."
            />
          </div>

          <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
            <ColorPicker
              value={conicCss}
              onValueChange={setConicCss}
              mode="gradient"
              allowedTypes={["conic"]}
              defaultFormat="rgb"
            />
            <PreviewCard
              title="Conic"
              value={conicCss}
              note="Data viz accents, chart fills, and bold decorative rings."
            />
          </div>
        </div>
      </Section>

      <Section
        title="Code mode and constrained palettes"
        description="Paste any CSS color or gradient string, then switch formats to inspect the same color in HEX, RGB, HSL, or HSB. You can also lock the component to a narrower authoring flow."
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: "var(--vds-space-5)",
          }}
        >
          <ColorPicker
            value={codeModeCss}
            onValueChange={setCodeModeCss}
            defaultView="code"
            defaultFormat="hsl"
          />
          <PreviewCard
            title="Code mode"
            value={codeModeCss}
            note="Ideal when designers or engineers already have CSS and want a visual editor on top."
          />
          <div style={{ display: "grid", gap: "var(--vds-space-3)" }}>
            <ColorPicker
              value={swatchCss}
              onValueChange={setSwatchCss}
              mode="solid"
              allowAlpha={false}
              defaultFormat="hex"
              showCodeView={false}
              swatches={["#0F172A", "#1D4ED8", "#3B82F6", "#10B981", "#F97316", "#FFFFFF"]}
            />
            <PreviewCard
              title="Locked flow"
              value={swatchCss}
              note="Solid-only configuration for token maintenance, semantic colors, and fast approval workflows."
            />
          </div>
        </div>
      </Section>

      <Section
        title="Surface appearance"
        description="Three surface treatments. `card` (default) draws a bordered surface. `floating` adds a soft elevation for popovers and floating placements. `flat` strips the chrome so the picker drops cleanly into a parent that already provides its own surface."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
            gap: "var(--vds-space-6)",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: "var(--vds-space-2)" }}>
            <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
              card (default)
            </span>
            <ColorPicker
              value={solidCss}
              onValueChange={setSolidCss}
              mode="solid"
              defaultFormat="hex"
              appearance="card"
            />
          </div>
          <div style={{ display: "grid", gap: "var(--vds-space-2)" }}>
            <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
              floating
            </span>
            <ColorPicker
              value={solidCss}
              onValueChange={setSolidCss}
              mode="solid"
              defaultFormat="hex"
              appearance="floating"
            />
          </div>
          <div
            style={{
              display: "grid",
              gap: "var(--vds-space-2)",
              padding: "var(--vds-space-4)",
              borderRadius: "var(--vds-radius-card)",
              background: "var(--vds-color-bg-subtle)",
            }}
          >
            <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
              flat (inside an existing surface)
            </span>
            <ColorPicker
              value={solidCss}
              onValueChange={setSolidCss}
              mode="solid"
              defaultFormat="hex"
              appearance="flat"
            />
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { ColorPicker } from "@virtari-packages/react-color-picker";
import "@virtari-packages/react-color-picker/styles";

const [value, setValue] = useState(
  "linear-gradient(90deg, #D9D9D9 0%, #737373 100%)"
);

<ColorPicker
  value={value}
  onValueChange={setValue}
  defaultFormat="hsl"
  defaultView="visual"
  allowedTypes={["solid", "linear", "radial", "conic"]}
  allowAlpha
  allowEyedropper
/>;

// Solid-only token workflow
<ColorPicker
  value="#3B82F6"
  onValueChange={setValue}
  allowedTypes={["solid"]}
  allowAlpha={false}
/>;`} />
      </Section>
    </>
  );
}

```
