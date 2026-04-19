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
  { size: "2xs" as const, px: "24px", wcag: "AA min", note: "Dense UI only" },
  { size: "xs" as const, px: "28px", wcag: "AA", note: "Tables, toolbars" },
  { size: "sm" as const, px: "32px", wcag: "AA", note: "Secondary actions" },
  { size: "md" as const, px: "40px", wcag: "AA", note: "Default" },
  { size: "lg" as const, px: "44px", wcag: "AAA + Apple", note: "Primary CTA" },
  { size: "xl" as const, px: "52px", wcag: "AAA + All", note: "Hero sections" },
  { size: "2xl" as const, px: "64px", wcag: "AAA + All", note: "Landing pages" },
];

export function SizingPage() {
  return (
    <>
      <Section
        title="Size System"
        description="One token controls height across all interactive components. Change --vds-size-md in sizing.css and Button, Input, Select, Toggle all update."
      >
        <pre className="docs-code">{`/* packages/tokens/src/sizing.css */
--vds-size-2xs: 1.5rem;   /* 24px */
--vds-size-xs:  1.75rem;  /* 28px */
--vds-size-sm:  2rem;     /* 32px */
--vds-size-md:  2.5rem;   /* 40px */  ← default
--vds-size-lg:  2.75rem;  /* 44px */
--vds-size-xl:  3.25rem;  /* 52px */
--vds-size-2xl: 4rem;     /* 64px */`}</pre>
      </Section>

      <Section
        title="Height-Ramp Components"
        description="These share the same height at the same size. Button + Input + Select side by side = pixel-perfect alignment."
      >
        <div className="docs-sizing-table">
          {HEIGHT_RAMP.map((row) => (
            <div key={row.size} className="docs-sizing-row">
              <div className="docs-sizing-meta">
                <code className="docs-size-label">{row.size}</code>
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
              <Checkbox size="sm" /> <Checkbox /> <Checkbox size="lg" />
            </Row>
          </div>
          <div>
            <h3 style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)", marginBlockEnd: "var(--vds-space-2)" }}>
              Switch — sm / md / lg
            </h3>
            <Row>
              <Switch size="sm" /> <Switch /> <Switch size="lg" />
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

      <Section title="WCAG Compliance">
        <pre className="docs-code">{`Size  Height  WCAG 2.5.8 (AA 24px)  WCAG 2.5.5 (AAA 44px)  Apple HIG  Google MD
───── ─────── ───────────────────── ────────────────────── ────────── ─────────
2xs   24px    ⚠ Bare minimum         ✗                      ✗          ✗
xs    28px    ✓                       ✗                      ✗          ✗
sm    32px    ✓                       ✗                      ✗          ✗
md    40px    ✓                       ✗                      ✗          ✗
lg    44px    ✓                       ✓                      ✓ (44pt)   ✗
xl    52px    ✓                       ✓                      ✓          ✓ (48dp)
2xl   64px    ✓                       ✓                      ✓          ✓

⚠ For touch-primary interfaces, use lg+ to meet AAA and platform guidelines.`}</pre>
      </Section>
    </>
  );
}
