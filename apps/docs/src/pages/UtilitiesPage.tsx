import { useState } from "react";
import { Button } from "@virtari-packages/react-button";
import { Card } from "@virtari-packages/react-card";
import { Section } from "../components";

const GROUPS: {
  name: string;
  classes: { cls: string; desc: string }[];
}[] = [
  {
    name: "Display",
    classes: [
      { cls: "vds-u-block", desc: "display: block" },
      { cls: "vds-u-inline", desc: "display: inline" },
      { cls: "vds-u-inline-block", desc: "display: inline-block" },
      { cls: "vds-u-flex", desc: "display: flex" },
      { cls: "vds-u-inline-flex", desc: "display: inline-flex" },
      { cls: "vds-u-grid", desc: "display: grid" },
      { cls: "vds-u-inline-grid", desc: "display: inline-grid" },
      { cls: "vds-u-hidden", desc: "display: none" },
      { cls: "vds-u-contents", desc: "display: contents" },
      { cls: "vds-u-flow-root", desc: "display: flow-root" },
    ],
  },
  {
    name: "Spacing (margin — logical)",
    classes: [
      { cls: "vds-u-m-{n}", desc: "margin (shorthand)" },
      { cls: "vds-u-mi-{n}", desc: "margin-inline (LTR: left+right)" },
      { cls: "vds-u-mb-{n}", desc: "margin-block (top+bottom)" },
      { cls: "vds-u-mis-{n}", desc: "margin-inline-start (LTR: left)" },
      { cls: "vds-u-mie-{n}", desc: "margin-inline-end (LTR: right)" },
      { cls: "vds-u-mbs-{n}", desc: "margin-block-start (top)" },
      { cls: "vds-u-mbe-{n}", desc: "margin-block-end (bottom)" },
      { cls: "vds-u-{m,mi,...}-auto", desc: "auto (for centering)" },
    ],
  },
  {
    name: "Spacing (padding — logical)",
    classes: [
      { cls: "vds-u-p-{n}", desc: "padding (shorthand)" },
      { cls: "vds-u-pi-{n}", desc: "padding-inline" },
      { cls: "vds-u-pb-{n}", desc: "padding-block" },
      { cls: "vds-u-pis-{n}", desc: "padding-inline-start" },
      { cls: "vds-u-pie-{n}", desc: "padding-inline-end" },
      { cls: "vds-u-pbs-{n}", desc: "padding-block-start" },
      { cls: "vds-u-pbe-{n}", desc: "padding-block-end" },
    ],
  },
  {
    name: "Flexbox",
    classes: [
      { cls: "vds-u-flex-{row,col,row-reverse,col-reverse}", desc: "flex-direction" },
      { cls: "vds-u-flex-{wrap,nowrap,wrap-reverse}", desc: "flex-wrap" },
      { cls: "vds-u-items-{start,center,end,stretch,baseline}", desc: "align-items" },
      {
        cls: "vds-u-justify-{start,center,end,between,around,evenly}",
        desc: "justify-content",
      },
      {
        cls: "vds-u-self-{start,center,end,stretch,auto,baseline}",
        desc: "align-self",
      },
      { cls: "vds-u-flex-{1,auto,initial,none}", desc: "flex shorthand" },
      { cls: "vds-u-{grow,grow-0,shrink,shrink-0}", desc: "flex-grow / flex-shrink" },
    ],
  },
  {
    name: "Grid",
    classes: [
      { cls: "vds-u-grid-cols-{1..12}", desc: "grid-template-columns: repeat(n, 1fr)" },
      { cls: "vds-u-grid-rows-{1..6}", desc: "grid-template-rows" },
      { cls: "vds-u-col-span-{1..12,full}", desc: "grid-column: span n" },
      { cls: "vds-u-row-span-{1..6,full}", desc: "grid-row: span n" },
      { cls: "vds-u-grid-auto-{fit,fill}", desc: "responsive auto grid (minmax 16rem)" },
    ],
  },
  {
    name: "Gap",
    classes: [
      { cls: "vds-u-gap-{n}", desc: "gap (0 to 16)" },
      { cls: "vds-u-gap-x-{n}", desc: "column-gap" },
      { cls: "vds-u-gap-y-{n}", desc: "row-gap" },
    ],
  },
  {
    name: "Sizing",
    classes: [
      { cls: "vds-u-w-{n}", desc: "inline-size (from space scale)" },
      { cls: "vds-u-h-{n}", desc: "block-size" },
      {
        cls: "vds-u-{w,h}-{1/2,1/3,2/3,1/4,3/4}",
        desc: "fractional sizing (escape as 1\\/2)",
      },
      {
        cls: "vds-u-{w,h}-{auto,full,screen,min,max,fit}",
        desc: "keyword sizing (screen = 100dvi/dvb)",
      },
      {
        cls: "vds-u-{min,max}-{w,h}-{n}",
        desc: "min/max inline-size / block-size",
      },
    ],
  },
  {
    name: "Position & Inset",
    classes: [
      {
        cls: "vds-u-{static,relative,absolute,fixed,sticky}",
        desc: "position",
      },
      { cls: "vds-u-inset-{0,auto}", desc: "inset-block + inset-inline" },
      {
        cls: "vds-u-inset-{bs,be,is,ie}-{0,auto}",
        desc: "per-side logical inset",
      },
    ],
  },
  {
    name: "Overflow",
    classes: [
      {
        cls: "vds-u-overflow-{visible,hidden,auto,scroll,clip}",
        desc: "overflow",
      },
      { cls: "vds-u-overflow-x-{…}", desc: "overflow-x" },
      { cls: "vds-u-overflow-y-{…}", desc: "overflow-y" },
    ],
  },
  {
    name: "Z-index (semantic)",
    classes: [
      {
        cls: "vds-u-z-{hide,base,docked,dropdown,sticky,banner,overlay,modal,popover,toast,tooltip}",
        desc: "semantic stacking tokens from --vds-z-*",
      },
    ],
  },
];

const BREAKPOINTS = [
  { prefix: "sm", px: "640px" },
  { prefix: "md", px: "768px" },
  { prefix: "lg", px: "1024px" },
  { prefix: "xl", px: "1280px" },
  { prefix: "2xl", px: "1536px" },
];

export function UtilitiesPage() {
  const [rtl, setRtl] = useState(false);

  return (
    <>
      <Section
        title="What are utilities?"
        description="Drop-in CSS classes for one-off layout. Use these for quick positioning, spacing, and flex/grid — but reach for Stack/Cluster/Grid layout components when a pattern repeats."
      >
        <pre className="docs-code">{`// apps/docs/src/styles/global.css
@import "@virtari-packages/core";
@import "@virtari-packages/tokens";
@import "@virtari-packages/utilities";   // ← opt-in
@import "@virtari-packages/react-button/styles";
// ...`}</pre>
        <p style={{ color: "var(--vds-color-text-muted)", fontSize: "var(--vds-text-sm)", marginBlockStart: "var(--vds-space-3)" }}>
          Class prefix: <code>vds-u-</code>. Responsive prefixes:{" "}
          {BREAKPOINTS.map((bp) => (
            <code key={bp.prefix} style={{ marginInlineEnd: "var(--vds-space-1)" }}>
              {bp.prefix}:
            </code>
          ))}
          applied as min-width breakpoints ({BREAKPOINTS.map((bp) => `${bp.prefix}=${bp.px}`).join(", ")}).
        </p>
      </Section>

      <Section
        title="Live: flex + gap + padding"
        description="Resize the window — gap increases at md (768px). Uses vds-u-flex, vds-u-gap-2, md:vds-u-gap-6, vds-u-p-4."
      >
        <div className="vds-u-flex vds-u-gap-2 md:vds-u-gap-6 vds-u-p-4" style={{ background: "var(--vds-color-bg-subtle)", borderRadius: "var(--vds-radius-card)" }}>
          <Button>One</Button>
          <Button variant="outline">Two</Button>
          <Button variant="ghost">Three</Button>
        </div>
      </Section>

      <Section
        title="Live: grid-cols with responsive col-span"
        description="1 column on mobile → 2 on sm → 3 on md. Classes: vds-u-grid vds-u-grid-cols-1 sm:vds-u-grid-cols-2 md:vds-u-grid-cols-3 vds-u-gap-4."
      >
        <div className="vds-u-grid vds-u-grid-cols-1 sm:vds-u-grid-cols-2 md:vds-u-grid-cols-3 vds-u-gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="vds-u-p-4">
              <strong>Item {i}</strong>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Logical properties & RTL"
        description="All spacing uses logical properties (margin-inline, padding-block-start, etc.) so brands with RTL locales get correct behavior automatically. Toggle dir to see."
      >
        <div style={{ display: "flex", gap: "var(--vds-space-3)", marginBlockEnd: "var(--vds-space-4)" }}>
          <Button variant={rtl ? "outline" : "solid"} onClick={() => setRtl(false)}>
            LTR
          </Button>
          <Button variant={rtl ? "solid" : "outline"} onClick={() => setRtl(true)}>
            RTL
          </Button>
        </div>
        <div
          dir={rtl ? "rtl" : "ltr"}
          className="vds-u-flex vds-u-items-center vds-u-gap-3 vds-u-p-4"
          style={{ background: "var(--vds-color-bg-subtle)", borderRadius: "var(--vds-radius-card)" }}
        >
          <div className="vds-u-mis-auto vds-u-pis-4" style={{ background: "var(--vds-color-primary-500)", color: "white", padding: "var(--vds-space-2) var(--vds-space-3)", borderRadius: "var(--vds-radius-card)" }}>
            <code style={{ fontSize: "var(--vds-text-xs)" }}>vds-u-mis-auto</code>
          </div>
          <div style={{ background: "var(--vds-color-bg-muted)", padding: "var(--vds-space-2) var(--vds-space-3)", borderRadius: "var(--vds-radius-card)" }}>
            Follows
          </div>
        </div>
        <p style={{ color: "var(--vds-color-text-muted)", fontSize: "var(--vds-text-sm)", marginBlockStart: "var(--vds-space-3)" }}>
          <code>mis</code> = margin-inline-start. In LTR it pushes from the left; in RTL it pushes from the right. No physical <code>ml</code>/<code>mr</code> aliases — brands have to think in inline/block from day one.
        </p>
      </Section>

      <Section
        title="Layer override test"
        description="vds-u-p-0 on a Card should override the Card's intrinsic padding without !important, because @layer utilities is the last layer in cascade order."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
          <div>
            <p style={{ color: "var(--vds-color-text-muted)", fontSize: "var(--vds-text-sm)", marginBlockEnd: "var(--vds-space-2)" }}>Default Card padding:</p>
            <Card>
              <code style={{ fontSize: "var(--vds-text-xs)" }}>&lt;Card&gt;default&lt;/Card&gt;</code>
            </Card>
          </div>
          <div>
            <p style={{ color: "var(--vds-color-text-muted)", fontSize: "var(--vds-text-sm)", marginBlockEnd: "var(--vds-space-2)" }}>Overridden with <code>vds-u-p-0</code>:</p>
            <Card className="vds-u-p-0">
              <code style={{ fontSize: "var(--vds-text-xs)" }}>&lt;Card className="vds-u-p-0"&gt;overridden&lt;/Card&gt;</code>
            </Card>
          </div>
        </div>
      </Section>

      <Section
        title="Reference"
        description="All groups. Responsive variants (sm:, md:, lg:, xl:, 2xl:) apply to every class below."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-6)" }}>
          {GROUPS.map((group) => (
            <div key={group.name}>
              <h3 style={{ fontSize: "var(--vds-text-base)", fontWeight: "var(--vds-font-weight-semibold)", marginBlockEnd: "var(--vds-space-3)" }}>
                {group.name}
              </h3>
              <pre className="docs-code">
                {group.classes.map((c) => `${c.cls.padEnd(52)} ${c.desc}`).join("\n")}
              </pre>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
