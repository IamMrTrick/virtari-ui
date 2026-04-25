import { Spinner } from "@virtari-packages/react-spinner";
import type { SpinnerVariant, SpinnerColor, SpinnerSize } from "@virtari-packages/react-spinner";
import { Section, Row, Stack } from "../components";

const VARIANTS: { value: SpinnerVariant; label: string; desc: string }[] = [
  { value: "ring",     label: "Ring",     desc: "Single rotating arc" },
  { value: "segments", label: "Segments", desc: "Conic-gradient tail (iOS‑style)" },
  { value: "dots",     label: "Dots",     desc: "Three staggered bouncing dots" },
  { value: "bars",     label: "Bars",     desc: "Audio-style height bars" },
  { value: "ripple",   label: "Ripple",   desc: "Two expanding concentric rings" },
  { value: "orbit",    label: "Orbit",    desc: "Dot orbiting on a ring" },
];

const COLORS: SpinnerColor[] = [
  "primary", "success", "warning", "danger", "info", "accent", "neutral",
];

const SIZES: { value: SpinnerSize; label: string; px: string }[] = [
  { value: "xs", label: "xs", px: "12px" },
  { value: "sm", label: "sm", px: "16px" },
  { value: "md", label: "md", px: "20px" },
  { value: "lg", label: "lg", px: "32px" },
  { value: "xl", label: "xl", px: "48px" },
];

export function SpinnerPage() {
  return (
    <>
      {/* ── Variants ── */}
      <Section
        title="Variants"
        description="Six animation styles — pick the one that fits the context."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "var(--vds-space-4)",
          }}
        >
          {VARIANTS.map(({ value, label, desc }) => (
            <div
              key={value}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--vds-space-3)",
                padding: "var(--vds-space-5)",
                border: "1px solid var(--vds-color-border)",
                borderRadius: "var(--vds-radius-lg)",
                background: "var(--vds-color-surface-raised)",
              }}
            >
              <Spinner variant={value} size="lg" />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: "var(--vds-font-weight-medium)", fontSize: "var(--vds-text-sm)" }}>
                  {label}
                </div>
                <div style={{ color: "var(--vds-color-text-subtle)", fontSize: "var(--vds-text-xs)", marginTop: "2px" }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Sizes ── */}
      <Section title="Sizes" description="Five steps from xs (12 px) to xl (48 px).">
        <Row>
          {SIZES.map(({ value, label, px }) => (
            <div
              key={value}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--vds-space-2)",
              }}
            >
              <Spinner size={value} />
              <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-subtle)" }}>
                {label} · {px}
              </span>
            </div>
          ))}
        </Row>
      </Section>

      {/* ── Colors ── */}
      <Section title="Colors" description="Maps to the design system's semantic intent palette.">
        <Stack>
          {(["ring", "segments", "dots", "bars"] as SpinnerVariant[]).map((variant) => (
            <div
              key={variant}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--vds-space-5)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  width: "5rem",
                  fontSize: "var(--vds-text-xs)",
                  color: "var(--vds-color-text-subtle)",
                  fontFamily: "var(--vds-font-mono)",
                }}
              >
                {variant}
              </span>
              {COLORS.map((color) => (
                <Spinner key={color} variant={variant} color={color} />
              ))}
            </div>
          ))}

          {/* current — needs colored bg to demonstrate */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--vds-space-4)",
              padding: "var(--vds-space-3) var(--vds-space-4)",
              borderRadius: "var(--vds-radius-md)",
              background: "var(--vds-color-primary-solid)",
              color: "#fff",
              width: "fit-content",
            }}
          >
            <Spinner color="current" variant="ring" />
            <Spinner color="current" variant="segments" />
            <Spinner color="current" variant="dots" />
            <Spinner color="current" variant="bars" />
            <span style={{ fontSize: "var(--vds-text-xs)", opacity: 0.85 }}>
              color="current" — inherits from parent
            </span>
          </div>
        </Stack>
      </Section>

      {/* ── Speed ── */}
      <Section title="Speed" description="Three speeds to match UI feedback timing.">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--vds-space-4)",
            maxWidth: "28rem",
          }}
        >
          {(["slow", "normal", "fast"] as const).map((speed) => (
            <div
              key={speed}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--vds-space-2)",
              }}
            >
              <Spinner variant="segments" size="lg" speed={speed === "normal" ? undefined : speed} />
              <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-subtle)" }}>
                {speed}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Inline usage ── */}
      <Section title="Inline" description="Use size=sm and color=current inside text or buttons.">
        <Stack>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Spinner size="sm" />
            <span>Loading results…</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Spinner size="sm" variant="dots" />
            <span>Saving changes…</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
            <Spinner size="sm" variant="bars" color="success" />
            <span>Processing…</span>
          </div>
        </Stack>
      </Section>

      {/* ── All variants × all sizes matrix ── */}
      <Section title="Variant × Size matrix" description="All combinations at a glance.">
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", fontSize: "var(--vds-text-xs)" }}>
            <thead>
              <tr>
                <th style={{ padding: "var(--vds-space-2) var(--vds-space-4)", textAlign: "start", color: "var(--vds-color-text-subtle)", fontWeight: "var(--vds-font-weight-medium)" }}>
                  variant ↓ / size →
                </th>
                {SIZES.map(({ value, px }) => (
                  <th
                    key={value}
                    style={{
                      padding: "var(--vds-space-2) var(--vds-space-4)",
                      color: "var(--vds-color-text-subtle)",
                      fontWeight: "var(--vds-font-weight-medium)",
                      textAlign: "center",
                    }}
                  >
                    {value}<br />
                    <span style={{ opacity: 0.6 }}>{px}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VARIANTS.map(({ value: variant, label }) => (
                <tr key={variant} style={{ borderBlockStart: "1px solid var(--vds-color-border)" }}>
                  <td style={{ padding: "var(--vds-space-3) var(--vds-space-4)", fontFamily: "var(--vds-font-mono)", color: "var(--vds-color-text-subtle)" }}>
                    {label}
                  </td>
                  {SIZES.map(({ value: size }) => (
                    <td
                      key={size}
                      style={{
                        padding: "var(--vds-space-3) var(--vds-space-4)",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "3rem" }}>
                        <Spinner variant={variant} size={size} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Usage ── */}
      <Section title="Usage">
        <pre className="docs-code">{`import { Spinner } from "@virtari-packages/react-spinner";

// Default (ring, md, primary)
<Spinner />

// Variants
<Spinner variant="ring" />
<Spinner variant="segments" />
<Spinner variant="dots" />
<Spinner variant="bars" />
<Spinner variant="ripple" />
<Spinner variant="orbit" />

// Sizes: xs | sm | md | lg | xl
<Spinner size="sm" />
<Spinner size="xl" />

// Colors: primary | success | warning | danger | info | accent | neutral | current
<Spinner color="success" />
<Spinner color="current" />  {/* inherits from parent */}

// Speed: slow | normal (default) | fast
<Spinner speed="slow" />
<Spinner speed="fast" />

// Custom label for screen readers
<Spinner label="Uploading file…" />`}</pre>
      </Section>

      {/* ── Token overrides ── */}
      <Section title="Token overrides" description="Customise via CSS custom properties on any ancestor.">
        <pre className="docs-code">{`/* Override spinner tokens for a specific context */
.my-dark-card .vds-spinner {
  --spinner-color:       #ffffff;
  --spinner-track-color: rgba(255, 255, 255, 0.2);
}

/* Import standalone tokens for brand overrides */
@import "@virtari-packages/react-spinner/tokens";`}</pre>
      </Section>
    </>
  );
}
