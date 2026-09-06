import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { Progress } from "@virtari-packages/react-progress";
import { Section } from "../components";

const COLORS = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "accent",
  "contrast",
] as const;

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export function ProgressPage() {
  return (
    <>
      {/* ── Colors ── */}
      <Section title="Colors" description="Semantic color palette — maps to your brand tokens automatically.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)", maxInlineSize: "28rem" }}>
          {COLORS.map((color) => (
            <div key={color} style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "4.5rem" }}>{color}</span>
              <Progress value={65} color={color} style={{ flex: 1 }} />
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "4.5rem" }}>custom</span>
            <Progress value={65} color="#f472b6" style={{ flex: 1 }} />
          </div>
        </div>
      </Section>

      {/* ── Sizes ── */}
      <Section title="Sizes" description="Five sizes from xs to xl.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)", maxInlineSize: "28rem" }}>
          {SIZES.map((size) => (
            <div key={size} style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "2rem" }}>{size}</span>
              <Progress value={60} size={size} style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Variants ── */}
      <Section title="Variants" description="Solid, striped, and gradient fill styles.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)", maxInlineSize: "28rem" }}>
          {(["solid", "striped", "gradient"] as const).map((variant) => (
            <div key={variant} style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "4.5rem" }}>{variant}</span>
              <Progress value={70} variant={variant} style={{ flex: 1 }} />
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "4.5rem" }}>gradient</span>
            <Progress value={70} variant="gradient" color="success" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "4.5rem" }}>striped</span>
            <Progress value={70} variant="striped" color="accent" style={{ flex: 1 }} />
          </div>
        </div>
      </Section>

      {/* ── Animations ── */}
      <Section title="Animations" description="Pulse and glow effects — useful for active uploads or live progress.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)", maxInlineSize: "28rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "4.5rem" }}>pulse</span>
            <Progress value={55} animated="pulse" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "4.5rem" }}>glow</span>
            <Progress value={55} animated="glow" size="lg" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "4.5rem" }}>striped+pulse</span>
            <Progress value={55} variant="striped" animated="pulse" color="info" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-3)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--vds-color-text-muted)", minInlineSize: "4.5rem" }}>striped+glow</span>
            <Progress value={55} variant="striped" animated="glow" color="danger" size="lg" style={{ flex: 1 }} />
          </div>
        </div>
      </Section>

      {/* ── Indeterminate ── */}
      <Section title="Indeterminate" description="No value — unknown duration loading state.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)", maxInlineSize: "28rem" }}>
          <Progress />
          <Progress color="success" />
          <Progress variant="striped" color="info" />
          <Progress variant="gradient" color="accent" size="lg" />
        </div>
      </Section>

      {/* ── With Label ── */}
      <Section title="With Label" description="Shows percentage inside the track — visible on lg and xl sizes.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)", maxInlineSize: "28rem" }}>
          <Progress value={42} size="lg" showLabel />
          <Progress value={78} size="xl" showLabel color="success" />
          <Progress value={91} size="xl" showLabel variant="gradient" color="danger" />
          <Progress value={33} size="xl" showLabel animated="glow" color="accent" />
        </div>
      </Section>

      {/* ── Multi-color showcase ── */}
      <Section title="Showcase" description="All colors at different fill levels.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)", maxInlineSize: "28rem" }}>
          {COLORS.map((color, i) => (
            <Progress key={color} value={20 + i * 12} color={color} variant="gradient" size="lg" />
          ))}
        </div>
      </Section>

      {/* ── Usage ── */}
      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Progress } from "@virtari-packages/react-progress";

// Basic
<Progress value={60} />

// Color variants
<Progress value={80} color="success" />
<Progress value={40} color="danger" />

// Styles
<Progress value={70} variant="striped" />
<Progress value={70} variant="gradient" color="info" />

// Sizes
<Progress value={50} size="xs" />
<Progress value={50} size="xl" showLabel />

// Animated
<Progress value={55} animated="pulse" />
<Progress value={55} animated="glow" size="lg" />
<Progress value={55} variant="striped" animated="pulse" color="accent" />

// Indeterminate (no value)
<Progress />

// Custom color
<Progress value={60} color="#f472b6" />`} />
      </Section>
    </>
  );
}
