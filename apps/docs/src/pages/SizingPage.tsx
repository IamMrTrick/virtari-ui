import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { Button } from "@virtari-packages/react-button";
import { Input } from "@virtari-packages/react-input";
import { Toggle } from "@virtari-packages/react-toggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Checkbox } from "@virtari-packages/react-checkbox";
import { Switch } from "@virtari-packages/react-switch";
import { Avatar } from "@virtari-packages/react-avatar";
import { Section, Row } from "../components";

const HEIGHT_RAMP = [
  { size: "2xs" as const, px: "24px", wcag: "Dense", note: "Dense UI only" },
  { size: "xs" as const, px: "28px", wcag: "Compact", note: "Tables, toolbars" },
  { size: "sm" as const, px: "32px", wcag: "Compact", note: "Secondary actions" },
  { size: "md" as const, px: "40px", wcag: "Default", note: "Default" },
  { size: "lg" as const, px: "44px", wcag: "Touch", note: "Primary CTA" },
  { size: "xl" as const, px: "52px", wcag: "Touch", note: "Hero sections" },
  { size: "2xl" as const, px: "64px", wcag: "Touch", note: "Landing pages" },
];

export function SizingPage() {
  return (
    <>
      <Section
        title="Size System"
        description="One token controls height across all interactive components. Change --vds-size-md in sizing.css and Button, Input, Select, Toggle all update."
      >
        <VirtariCodeBlock renderer="static" language="tsx" code={`/* packages/tokens/src/sizing.css */
--vds-size-2xs: 1.5rem;   /* 24px */
--vds-size-xs:  1.75rem;  /* 28px */
--vds-size-sm:  2rem;     /* 32px */
--vds-size-md:  2.5rem;   /* 40px */  ← default
--vds-size-lg:  2.75rem;  /* 44px */
--vds-size-xl:  3.25rem;  /* 52px */
--vds-size-2xl: 4rem;     /* 64px */`} />
      </Section>

      <Section
        title="Height-Ramp Components"
        description="These share a minimum height at the same size. Larger text can expand the line box; verify mixed controls with your product’s fonts."
      >
        <div className="docs-sizing-table">
          {HEIGHT_RAMP.map((row) => (
            <div key={row.size} className="docs-sizing-row">
              <div className="docs-sizing-meta">
                <VirtariInlineCode className="docs-size-label">{row.size}</VirtariInlineCode>
                <span className="docs-sizing-px">{row.px}</span>
                <span className="docs-sizing-wcag">{row.wcag}</span>
              </div>
              <div className="docs-sizing-demo">
                <Button size={row.size}>Button</Button>
                <Input inputSize={row.size} placeholder="Input" style={{ maxInlineSize: "10rem" }} />
                <Select>
                  <SelectTrigger size={row.size}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option</SelectItem>
                  </SelectContent>
                </Select>
                <Toggle size={row.size} aria-label="Toggle">Aa</Toggle>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Proportional Components"
        description="These have their own scale proportional to their context, not the height ramp."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-6)" }}>
          <div>
            <h3 style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)", marginBlockEnd: "var(--vds-space-2)" }}>
              Checkbox — sm / md / lg
            </h3>
            <Row>
              <Checkbox size="sm" aria-label="Small checkbox" /> <Checkbox aria-label="Medium checkbox" /> <Checkbox size="lg" aria-label="Large checkbox" />
            </Row>
          </div>
          <div>
            <h3 style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)", marginBlockEnd: "var(--vds-space-2)" }}>
              Switch — sm / md / lg
            </h3>
            <Row>
              <Switch size="sm" aria-label="Small switch" /> <Switch aria-label="Medium switch" /> <Switch size="lg" aria-label="Large switch" />
            </Row>
          </div>
          <div>
            <h3 style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)", marginBlockEnd: "var(--vds-space-2)" }}>
              Avatar — xs / sm / md / lg / xl
            </h3>
            <Row>
              <Avatar fallback="XS" size="xs" />
              <Avatar fallback="SM" size="sm" />
              <Avatar fallback="MD" />
              <Avatar fallback="LG" size="lg" />
              <Avatar fallback="XL" size="xl" />
            </Row>
          </div>
        </div>
      </Section>

      <Section title="Target size guidance" description="A height token alone does not establish accessibility compliance. Evaluate the complete clickable area, both dimensions, nearby targets and the final interaction.">
        <p className="docs-prose">WCAG 2.2 target size (minimum) uses 24 × 24 CSS pixels, with exceptions such as sufficient spacing. The enhanced criterion uses 44 × 44 CSS pixels. Small visible controls can have a larger clickable label; do not equate a 14px checkbox mark with the entire target.</p>
        <p className="docs-prose">For touch-focused interfaces, start with lg or larger, then check the final target size, spacing, text enlargement and keyboard behavior. CSS pixels, Apple points and Android density-independent pixels are different platform units.</p>
        <p className="docs-prose"><a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">W3C: target size minimum</a>{" · "}<a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html">W3C: target size enhanced</a></p>
      </Section>
    </>
  );
}
