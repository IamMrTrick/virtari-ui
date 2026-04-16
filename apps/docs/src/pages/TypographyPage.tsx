import { Section } from "../components";

const SIZES = [
  { token: "--vds-text-xs", label: "xs", rem: "0.75rem" },
  { token: "--vds-text-sm", label: "sm", rem: "0.875rem" },
  { token: "--vds-text-base", label: "base", rem: "1rem" },
  { token: "--vds-text-lg", label: "lg", rem: "1.125rem" },
  { token: "--vds-text-xl", label: "xl", rem: "1.25rem" },
  { token: "--vds-text-2xl", label: "2xl", rem: "1.5rem" },
  { token: "--vds-text-3xl", label: "3xl", rem: "1.875rem" },
  { token: "--vds-text-4xl", label: "4xl", rem: "2.25rem" },
  { token: "--vds-text-5xl", label: "5xl", rem: "3rem" },
  { token: "--vds-text-6xl", label: "6xl", rem: "3.75rem" },
];

const WEIGHTS = [
  { token: "--vds-font-weight-normal", label: "Normal", value: 400 },
  { token: "--vds-font-weight-medium", label: "Medium", value: 500 },
  { token: "--vds-font-weight-semibold", label: "Semibold", value: 600 },
  { token: "--vds-font-weight-bold", label: "Bold", value: 700 },
];

export function TypographyPage() {
  return (
    <>
      <Section title="Font Scale" description="Type sizes based on a modular scale.">
        <div className="docs-type-scale">
          {SIZES.map((size) => (
            <div key={size.label} className="docs-type-row">
              <code className="docs-type-token">{size.label}</code>
              <span
                className="docs-type-sample"
                style={{ fontSize: `var(${size.token})` }}
              >
                The quick brown fox
              </span>
              <span className="docs-type-meta">{size.rem}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Font Weights">
        <div className="docs-type-scale">
          {WEIGHTS.map((w) => (
            <div key={w.label} className="docs-type-row">
              <code className="docs-type-token">{w.label}</code>
              <span
                className="docs-type-sample"
                style={{
                  fontWeight: `var(${w.token})`,
                  fontSize: "var(--vds-text-xl)",
                }}
              >
                The quick brown fox
              </span>
              <span className="docs-type-meta">{w.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Font Families">
        <div className="docs-type-scale">
          <div className="docs-type-row">
            <code className="docs-type-token">sans</code>
            <span
              className="docs-type-sample"
              style={{ fontFamily: "var(--vds-font-sans)", fontSize: "var(--vds-text-lg)" }}
            >
              Inter — The quick brown fox jumps over the lazy dog
            </span>
          </div>
          <div className="docs-type-row">
            <code className="docs-type-token">mono</code>
            <span
              className="docs-type-sample"
              style={{ fontFamily: "var(--vds-font-mono)", fontSize: "var(--vds-text-lg)" }}
            >
              JetBrains Mono — const x = 42;
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}
