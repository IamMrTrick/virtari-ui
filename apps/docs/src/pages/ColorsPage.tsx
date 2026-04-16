import { Section } from "../components";

const SCALES = [
  { name: "Gray", prefix: "--vds-color-gray" },
  { name: "Primary", prefix: "--vds-color-primary" },
  { name: "Success", prefix: "--vds-color-success" },
  { name: "Warning", prefix: "--vds-color-warning" },
  { name: "Danger", prefix: "--vds-color-danger" },
  { name: "Info", prefix: "--vds-color-info" },
];

const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

const SEMANTIC = [
  { name: "Background", token: "--vds-color-bg" },
  { name: "Background Subtle", token: "--vds-color-bg-subtle" },
  { name: "Background Muted", token: "--vds-color-bg-muted" },
  { name: "Surface", token: "--vds-color-surface" },
  { name: "Text", token: "--vds-color-text" },
  { name: "Text Muted", token: "--vds-color-text-muted" },
  { name: "Text Subtle", token: "--vds-color-text-subtle" },
  { name: "Border", token: "--vds-color-border" },
  { name: "Border Muted", token: "--vds-color-border-muted" },
  { name: "Ring", token: "--vds-color-ring" },
];

export function ColorsPage() {
  return (
    <>
      {SCALES.map((scale) => (
        <Section key={scale.name} title={scale.name}>
          <div className="docs-color-grid">
            {STEPS.map((step) => {
              const token = `${scale.prefix}-${step}`;
              return (
                <div key={step} className="docs-color-swatch">
                  <div
                    className="docs-color-swatch-block"
                    style={{ backgroundColor: `var(${token})` }}
                  />
                  <span className="docs-color-swatch-label">{step}</span>
                </div>
              );
            })}
          </div>
        </Section>
      ))}

      <Section title="Semantic Tokens" description="Mapped to primitives, swap automatically in dark mode.">
        <div className="docs-color-semantic-grid">
          {SEMANTIC.map((item) => (
            <div key={item.token} className="docs-color-semantic-row">
              <div
                className="docs-color-swatch-block docs-color-swatch-block--sm"
                style={{ backgroundColor: `var(${item.token})` }}
              />
              <div>
                <span className="docs-color-swatch-label">{item.name}</span>
                <code className="docs-color-token">{item.token}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
