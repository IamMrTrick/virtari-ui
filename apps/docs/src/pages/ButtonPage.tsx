import { useState } from "react";
import {
  Button,
  type ButtonColor,
  type ButtonVariant,
  type ButtonSize,
  type ButtonEffect,
  type ButtonAnimation,
} from "@virtari-packages/react-button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Switch } from "@virtari-packages/react-switch";
import {
  Row as LayoutRow,
  Col,
  Stack as LayoutStack,
} from "@virtari-packages/react-layout";
import { Section, Row } from "../components";
import {
  IconArrowRight,
  IconDownload as TablerIconDownload,
  IconPlus as TablerIconPlus,
  IconSearch as TablerIconSearch,
  IconSparkles,
  IconTrash as TablerIconTrash,
} from "@virtari-packages/react-icons";

/* ─────────────────────────────── Icons ─────────────────────────────── */

const DEMO_ICON = { size: 16, stroke: 1.75, "aria-hidden": true as const, focusable: false as const };

function IconPlus() {
  return <TablerIconPlus {...DEMO_ICON} />;
}

function IconArrow() {
  return <IconArrowRight {...DEMO_ICON} />;
}

function IconTrash() {
  return <TablerIconTrash {...DEMO_ICON} />;
}

function IconDownload() {
  return <TablerIconDownload {...DEMO_ICON} />;
}

function IconSearch() {
  return <TablerIconSearch {...DEMO_ICON} />;
}

function IconSparkle() {
  return <IconSparkles {...DEMO_ICON} />;
}

/* ─────────────────────────────── Helpers ─────────────────────────────── */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-1-5)",
        fontSize: "var(--vds-text-sm)",
        color: "var(--vds-color-text)",
      }}
    >
      <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{label}</span>
      {children}
      {hint && (
        <span
          style={{
            fontSize: "var(--vds-text-xs)",
            color: "var(--vds-color-text-muted)",
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

function SwitchRow({
  title,
  hint,
  checked,
  onCheckedChange,
}: {
  title: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--vds-space-4)",
        fontSize: "var(--vds-text-sm)",
        cursor: "pointer",
      }}
    >
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: "var(--vds-font-weight-medium)" }}>{title}</span>
        {hint && (
          <span
            style={{
              fontSize: "var(--vds-text-xs)",
              color: "var(--vds-color-text-muted)",
            }}
          >
            {hint}
          </span>
        )}
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}

function Grid({
  minCol = "12rem",
  children,
}: {
  minCol?: string;
  children: React.ReactNode;
}) {
  return (
    <LayoutRow autoFit minColWidth={minCol} gap="sm">
      {children}
    </LayoutRow>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
      {children}
    </span>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: "var(--vds-space-2) var(--vds-space-3)", fontWeight: "var(--vds-font-weight-medium)" }}>
      {children}
    </th>
  );
}

function Td({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{ padding: "var(--vds-space-2) var(--vds-space-3)", ...style }}>
      {children}
    </td>
  );
}

/* ─────────────────────────────── Constants ─────────────────────────────── */

const COLORS: ButtonColor[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "accent",
  "contrast",
];
const VARIANTS: ButtonVariant[] = ["solid", "outline", "ghost", "soft", "link"];
const SIZES: ButtonSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
const EFFECTS: (ButtonEffect | "none")[] = ["none", "shine", "raised", "glow", "glass", "outline-glow", "candy"];
const ANIMATIONS: (ButtonAnimation | "none")[] = ["none", "pulse", "bounce", "shake", "jiggle"];

const SIZE_SPEC: Record<ButtonSize, { height: string; wcagAA: boolean; wcagAAA: boolean; apple: boolean; material: boolean; hint: string }> = {
  "2xs": { height: "24px", wcagAA: true, wcagAAA: false, apple: false, material: false, hint: "Dense UI only — tables, toolbars." },
  xs:    { height: "28px", wcagAA: true, wcagAAA: false, apple: false, material: false, hint: "Inline actions, compact toolbars." },
  sm:    { height: "32px", wcagAA: true, wcagAAA: false, apple: false, material: false, hint: "Secondary actions, form adjuncts." },
  md:    { height: "36px", wcagAA: true, wcagAAA: false, apple: false, material: false, hint: "Default — comfortable desktop UI." },
  lg:    { height: "40px", wcagAA: true, wcagAAA: false, apple: false, material: false, hint: "Primary actions in forms." },
  xl:    { height: "44px", wcagAA: true, wcagAAA: true, apple: true, material: false, hint: "Touch-friendly primary CTAs." },
  "2xl": { height: "52px", wcagAA: true, wcagAAA: true, apple: true, material: true, hint: "Hero sections, signup forms." },
  "3xl": { height: "64px", wcagAA: true, wcagAAA: true, apple: true, material: true, hint: "Landing pages, mobile full-width." },
};

/* ─────────────────────────────── Page ─────────────────────────────── */

export function ButtonPage() {
  return (
    <>
      <PlaygroundSection />
      <VariantsSection />
      <ColorsSection />
      <ColorMatrixSection />
      <SizesSection />
      <IconsSection />
      <IconOnlySection />
      <LoadingSection />
      <DisabledSection />
      <FullWidthSection />
      <EffectsSection />
      <AnimationsSection />
      <AsChildSection />
      <ApiSection />
      <AccessibilitySection />
    </>
  );
}

/* ─────────────────────────── Sections ─────────────────────────── */

function PlaygroundSection() {
  const [color, setColor] = useState<ButtonColor>("primary");
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [size, setSize] = useState<ButtonSize>("md");
  const [effect, setEffect] = useState<ButtonEffect | "none">("none");
  const [animation, setAnimation] = useState<ButtonAnimation | "none">("none");
  const [leftIcon, setLeftIcon] = useState(false);
  const [rightIcon, setRightIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [label, setLabel] = useState("Click me");

  const onDark = effect === "glass";

  return (
    <Section
      title="Live playground"
      description="Tweak every prop and watch the button respond. Color is orthogonal to variant — every color supports every variant. Glass effect previews on a dark gradient."
    >
      <LayoutRow
        autoFit
        minColWidth="14rem"
        gap="md"
        style={{
          padding: "var(--vds-space-4)",
          background: "var(--vds-color-bg-subtle)",
          borderRadius: "var(--vds-radius-surface)",
          border: "1px solid var(--vds-color-border-muted)",
        }}
      >
        <Field label="Color">
          <Select value={color} onValueChange={(v) => setColor(v as ButtonColor)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {COLORS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Variant">
          <Select value={variant} onValueChange={(v) => setVariant(v as ButtonVariant)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {VARIANTS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Size">
          <Select value={size} onValueChange={(v) => setSize(v as ButtonSize)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Effect" hint="Requires @virtari-packages/react-button/styles/effects.">
          <Select value={effect} onValueChange={(v) => setEffect(v as ButtonEffect | "none")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {EFFECTS.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Animation" hint="Requires @virtari-packages/react-button/styles/animations.">
          <Select value={animation} onValueChange={(v) => setAnimation(v as ButtonAnimation | "none")}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ANIMATIONS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Label">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            style={{
              font: "inherit",
              height: "var(--vds-size-md)",
              padding: "0 var(--vds-space-3)",
              borderRadius: "var(--vds-radius-element)",
              border: "1px solid var(--vds-color-border)",
              background: "var(--vds-color-bg)",
              color: "var(--vds-color-text)",
            }}
          />
        </Field>

        <LayoutStack gap="sm">
          <SwitchRow title="Left icon" checked={leftIcon} onCheckedChange={setLeftIcon} />
          <SwitchRow title="Right icon" checked={rightIcon} onCheckedChange={setRightIcon} />
          <SwitchRow title="Loading" checked={loading} onCheckedChange={setLoading} />
          <SwitchRow title="Disabled" checked={disabled} onCheckedChange={setDisabled} />
          <SwitchRow title="Full width" checked={fullWidth} onCheckedChange={setFullWidth} />
        </LayoutStack>
      </LayoutRow>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--vds-space-8) var(--vds-space-4)",
          borderRadius: "var(--vds-radius-surface)",
          border: "1px dashed var(--vds-color-border-muted)",
          background: onDark
            ? "linear-gradient(135deg, oklch(0.25 0.15 265), oklch(0.15 0.10 300))"
            : "var(--vds-color-bg)",
          transition: "background 200ms ease",
        }}
      >
        <Button
          color={color}
          variant={variant}
          size={size}
          effect={effect === "none" ? undefined : effect}
          animation={animation === "none" ? undefined : animation}
          loading={loading}
          disabled={disabled}
          fullWidth={fullWidth}
          leftSection={leftIcon ? <IconPlus /> : undefined}
          rightSection={rightIcon ? <IconArrow /> : undefined}
        >
          {label || "\u00A0"}
        </Button>
      </div>
    </Section>
  );
}

function VariantsSection() {
  return (
    <Section
      title="Variants"
      description="Five appearance layers — how the color is rendered. Solid for primary actions, outline for emphasis without weight, ghost for tertiary, soft for tinted fills, link for inline text."
    >
      <Grid>
        <LayoutStack gap="xs">
          <Button>Solid</Button>
          <Caption>Filled — primary action</Caption>
        </LayoutStack>
        <LayoutStack gap="xs">
          <Button variant="outline">Outline</Button>
          <Caption>Bordered, transparent bg</Caption>
        </LayoutStack>
        <LayoutStack gap="xs">
          <Button variant="ghost">Ghost</Button>
          <Caption>Low-emphasis, tertiary</Caption>
        </LayoutStack>
        <LayoutStack gap="xs">
          <Button variant="soft">Soft</Button>
          <Caption>Tinted muted background</Caption>
        </LayoutStack>
        <LayoutStack gap="xs">
          <Button variant="link">Link</Button>
          <Caption>Inline underlined text</Caption>
        </LayoutStack>
      </Grid>

      <pre className="docs-code">{`<Button variant="solid">Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Dismiss</Button>
<Button variant="soft">Draft</Button>
<Button variant="link">Learn more</Button>`}</pre>
    </Section>
  );
}

function ColorsSection() {
  return (
    <Section
      title="Colors"
      description="Eight intent palettes — orthogonal to variant. Pick color for meaning, variant for weight. contrast renders black on light mode and white on dark mode for maximum pop."
    >
      <Grid minCol="10rem">
        {COLORS.map((c) => (
          <LayoutStack key={c} gap="xs">
            <Button color={c}>{c}</Button>
            <Caption>{colorHint(c)}</Caption>
          </LayoutStack>
        ))}
      </Grid>

      <pre className="docs-code">{`<Button color="primary">Save</Button>        // default brand action
<Button color="success">Publish</Button>
<Button color="warning">Override</Button>
<Button color="danger">Delete</Button>        // destructive
<Button color="info">Preview</Button>
<Button color="accent">Upgrade</Button>       // highlight / secondary CTA
<Button color="contrast">Contact sales</Button> // black↔white per theme`}</pre>
    </Section>
  );
}

function colorHint(c: ButtonColor): string {
  switch (c) {
    case "primary":  return "Brand / default CTA";
    case "success":  return "Confirm, publish, save";
    case "warning":  return "Review / override";
    case "danger":   return "Destructive / irreversible";
    case "info":     return "Informational / preview";
    case "accent":   return "Highlight / secondary CTA";
    case "contrast": return "Black ↔ white per theme";
    default: return "";
  }
}

function ColorMatrixSection() {
  return (
    <Section
      title="Color × Variant matrix"
      description="Every color supports every variant. This grid is the source of truth — eyeball it in both themes to spot inconsistencies."
    >
      <div
        style={{
          overflowX: "auto",
          border: "1px solid var(--vds-color-border-muted)",
          borderRadius: "var(--vds-radius-surface)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "var(--vds-text-sm)",
          }}
        >
          <thead>
            <tr style={{ background: "var(--vds-color-bg-subtle)", textAlign: "left" }}>
              <Th>Color</Th>
              {VARIANTS.map((v) => <Th key={v}>{v}</Th>)}
            </tr>
          </thead>
          <tbody>
            {COLORS.map((c) => (
              <tr key={c} style={{ borderTop: "1px solid var(--vds-color-border-muted)" }}>
                <Td><code>{c}</code></Td>
                {VARIANTS.map((v) => (
                  <Td key={v}>
                    <Button color={c} variant={v} size="sm">
                      {v === "link" ? c : "Action"}
                    </Button>
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function SizesSection() {
  return (
    <Section
      title="Sizes"
      description="Eight size presets from 24px (2xs) to 64px (3xl). md is the default (36px) — aligns with industry standards. Pick larger for touch or hero placement."
    >
      <Row>
        {SIZES.map((s) => (
          <Button key={s} size={s}>
            {s}
          </Button>
        ))}
      </Row>

      <div
        style={{
          overflowX: "auto",
          border: "1px solid var(--vds-color-border-muted)",
          borderRadius: "var(--vds-radius-surface)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "var(--vds-text-sm)",
          }}
        >
          <thead>
            <tr style={{ background: "var(--vds-color-bg-subtle)", textAlign: "left" }}>
              <Th>Size</Th>
              <Th>Height</Th>
              <Th>WCAG AA (24)</Th>
              <Th>WCAG AAA (44)</Th>
              <Th>Apple HIG</Th>
              <Th>Material</Th>
              <Th>When to use</Th>
            </tr>
          </thead>
          <tbody>
            {SIZES.map((s) => {
              const spec = SIZE_SPEC[s];
              return (
                <tr key={s} style={{ borderTop: "1px solid var(--vds-color-border-muted)" }}>
                  <Td><code>{s}</code></Td>
                  <Td>{spec.height}</Td>
                  <Td>{spec.wcagAA ? "✓" : "—"}</Td>
                  <Td>{spec.wcagAAA ? "✓" : "—"}</Td>
                  <Td>{spec.apple ? "✓" : "—"}</Td>
                  <Td>{spec.material ? "✓" : "—"}</Td>
                  <Td style={{ color: "var(--vds-color-text-muted)" }}>{spec.hint}</Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function IconsSection() {
  return (
    <Section
      title="Icons — left and right sections"
      description="Use leftSection and rightSection for decorative icons. They auto-size with the button size and stay aligned via flex gap."
    >
      <Row>
        <Button leftSection={<IconPlus />}>Create</Button>
        <Button rightSection={<IconArrow />}>Continue</Button>
        <Button leftSection={<IconDownload />} rightSection={<IconArrow />}>Export report</Button>
        <Button variant="outline" leftSection={<IconPlus />}>Add item</Button>
        <Button color="accent" variant="soft" leftSection={<IconSparkle />}>Upgrade</Button>
        <Button color="danger" leftSection={<IconTrash />}>Delete</Button>
      </Row>

      <pre className="docs-code">{`<Button leftSection={<PlusIcon />}>Create</Button>
<Button rightSection={<ArrowIcon />}>Continue</Button>
<Button
  leftSection={<DownloadIcon />}
  rightSection={<ArrowIcon />}
>
  Export report
</Button>`}</pre>
    </Section>
  );
}

function IconOnlySection() {
  return (
    <Section
      title="Icon-only buttons"
      description="Use iconOnly for explicit square geometry, especially with custom icon components. Native SVGs and accessible-named single icons are also inferred. Always provide an accessible name."
    >
      <Row>
        {SIZES.map((s) => (
          <Button iconOnly key={s} size={s} aria-label="Add"><IconPlus /></Button>
        ))}
      </Row>

      <Row>
        <Button iconOnly variant="outline" aria-label="Search"><IconSearch /></Button>
        <Button iconOnly variant="ghost" aria-label="Search"><IconSearch /></Button>
        <Button iconOnly variant="soft" aria-label="Search"><IconSearch /></Button>
        <Button iconOnly color="danger" aria-label="Delete"><IconTrash /></Button>
        <Button iconOnly color="contrast" aria-label="Add"><IconPlus /></Button>
      </Row>

      <pre className="docs-code">{`// Square, padding collapses automatically
<Button iconOnly aria-label="Search"><SearchIcon /></Button>
<Button iconOnly size="lg" variant="outline" aria-label="Add"><PlusIcon /></Button>`}</pre>
    </Section>
  );
}

function LoadingSection() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  const handleDeploy = () => {
    setProgress(true);
    setTimeout(() => setProgress(false), 2500);
  };

  return (
    <Section
      title="Loading state"
      description="Setting loading hides the label, shows a centered spinner, disables interaction, and announces a polite status to screen readers. Label is preserved so layout doesn't shift."
    >
      <Row>
        <Button loading>Saving…</Button>
        <Button loading variant="outline">Processing…</Button>
        <Button loading variant="soft">Uploading…</Button>
        <Button loading color="danger">Deleting…</Button>
        <Button loading leftSection={<IconDownload />}>With icon</Button>
      </Row>

      <Row>
        <Button onClick={handleSave} loading={loading}>
          {loading ? "Saving…" : "Click to save"}
        </Button>
        <Button
          variant="outline"
          onClick={handleDeploy}
          loading={progress}
          loadingText="Deploying to production"
        >
          {progress ? "Deploying…" : "Deploy"}
        </Button>
      </Row>

      <pre className="docs-code">{`const [loading, setLoading] = useState(false);

<Button
  onClick={async () => {
    setLoading(true);
    await save();
    setLoading(false);
  }}
  loading={loading}
  loadingText="Saving your profile"
>
  {loading ? "Saving…" : "Save"}
</Button>`}</pre>
    </Section>
  );
}

function DisabledSection() {
  return (
    <Section
      title="Disabled"
      description="Opacity drops, cursor switches to not-allowed, pointer events are suppressed. aria-disabled is set automatically when disabled or loading is true."
    >
      <Row>
        {VARIANTS.map((v) => (
          <Button key={v} variant={v} disabled>{v}</Button>
        ))}
      </Row>
      <Row>
        <Button disabled color="danger">Danger disabled</Button>
        <Button disabled color="contrast">Contrast disabled</Button>
        <Button disabled leftSection={<IconPlus />}>With icon</Button>
        <Button iconOnly disabled aria-label="Add"><IconPlus /></Button>
      </Row>
    </Section>
  );
}

function FullWidthSection() {
  return (
    <Section
      title="Full width"
      description="Set fullWidth to stretch to the container. Pairs well with stacked mobile CTAs and form submission rows."
    >
      <LayoutStack gap="sm" style={{ maxInlineSize: "24rem" }}>
        <Button fullWidth size="xl">Sign in</Button>
        <Button fullWidth size="xl" variant="outline">Continue with Google</Button>
        <Button fullWidth size="xl" variant="ghost">Use SSO</Button>
      </LayoutStack>

      <LayoutRow cols={2} gap="sm" style={{ maxInlineSize: "24rem" }}>
        <Col><Button fullWidth variant="outline">Cancel</Button></Col>
        <Col><Button fullWidth>Save changes</Button></Col>
      </LayoutRow>

      <pre className="docs-code">{`<div className="form-actions">
  <Button fullWidth variant="outline">Cancel</Button>
  <Button fullWidth>Save changes</Button>
</div>`}</pre>
    </Section>
  );
}

function EffectsSection() {
  return (
    <Section
      title="Visual effects"
      description="Decorative layers for hero moments. Opt-in per build — import @virtari-packages/react-button/styles/effects to unlock. The raised 3D shadow is now hue-neutral (no color bleed in dark mode)."
    >
      <Row>
        <Button effect="shine">Shine</Button>
        <Button effect="shine" color="danger">Shine danger</Button>
        <Button effect="shine" size="lg" variant="soft">Shine soft</Button>
      </Row>
      <Caption>
        <strong>shine</strong> — a white highlight sweeps across on hover. Hue-agnostic; works on any color.
      </Caption>

      <Row>
        <Button effect="raised">Raised</Button>
        <Button effect="raised" color="danger">Raised danger</Button>
        <Button effect="raised" color="success">Raised success</Button>
        <Button effect="raised" color="contrast">Raised contrast</Button>
        <Button effect="raised" size="lg">Raised large</Button>
      </Row>
      <Caption>
        <strong>raised</strong> — elevated with a shadow in the <strong>same hue</strong> as the button, just darker. Hue is preserved via OKLCH relative color syntax. Presses down on click.
      </Caption>

      <Row>
        <Button effect="candy">Candy</Button>
        <Button effect="candy" color="danger">Candy danger</Button>
        <Button effect="candy" color="success">Candy success</Button>
        <Button effect="candy" color="warning">Candy warning</Button>
        <Button effect="candy" color="info">Candy info</Button>
        <Button effect="candy" size="lg">Candy large</Button>
      </Row>
      <Caption>
        <strong>candy</strong> — glossy jelly surface: top specular highlight, sunk bottom edge, color-bleed shadow. Best on saturated colors. Press flattens the gloss.
      </Caption>

      <Row>
        <Button effect="glow">Glow</Button>
        <Button effect="glow" color="success">Glow success</Button>
        <Button effect="outline-glow" variant="outline">Outline glow</Button>
        <Button effect="outline-glow" variant="outline" color="danger">Danger outline</Button>
      </Row>
      <Caption>
        <strong>glow</strong> — soft colored aura on hover; tracks the current color. <strong>outline-glow</strong> lights the border — pair with variant="outline".
      </Caption>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "var(--vds-space-3)",
          padding: "var(--vds-space-6)",
          borderRadius: "var(--vds-radius-card)",
          background: "linear-gradient(135deg, oklch(0.25 0.15 265), oklch(0.15 0.10 300))",
        }}
      >
        <Button effect="glass">Glass</Button>
        <Button effect="glass" color="danger">Glass danger</Button>
        <Button effect="glass" color="success">Glass success</Button>
        <Button effect="glass" color="warning">Glass warning</Button>
        <Button effect="glass" leftSection={<IconSparkle />}>Glass icon</Button>
      </div>
      <Caption>
        <strong>glass</strong> — frosted translucent surface with backdrop blur. Requires a dark or textured background to read.
      </Caption>

      <pre className="docs-code">{`// vite.config.ts / layout.tsx
import "@virtari-packages/react-button/styles/effects";

<Button effect="shine">Shine</Button>
<Button effect="raised" size="lg">Raised</Button>
<Button effect="candy" color="danger">Candy</Button>
<Button effect="glow" color="danger">Glow</Button>
<Button effect="glass">Glass</Button>             // use on dark bg
<Button effect="outline-glow" variant="outline">Outline</Button>`}</pre>
    </Section>
  );
}

function AnimationsSection() {
  const [shakeKey, setShakeKey] = useState(0);
  const [jiggleKey, setJiggleKey] = useState(0);

  return (
    <Section
      title="Attention animations"
      description="Motion cues for emphasis or validation. Opt-in by importing @virtari-packages/react-button/styles/animations. All animations respect prefers-reduced-motion."
    >
      <Row>
        <Button animation="pulse">Pulse</Button>
        <Button animation="bounce">Bounce</Button>
        <Button key={`shake-${shakeKey}`} animation="shake" onClick={() => setShakeKey((k) => k + 1)}>
          Shake (click)
        </Button>
        <Button key={`jiggle-${jiggleKey}`} animation="jiggle" onClick={() => setJiggleKey((k) => k + 1)}>
          Jiggle (click)
        </Button>
      </Row>

      <ul className="docs-prose" style={{ paddingInlineStart: "1.25em", marginBlockStart: 0 }}>
        <li><strong>pulse</strong> — breathing glow, infinite. Use sparingly on a single primary CTA.</li>
        <li><strong>bounce</strong> — vertical bob, infinite. Playful — good for onboarding tooltips.</li>
        <li><strong>shake</strong> — one-shot horizontal shake. Pair with invalid-form feedback.</li>
        <li><strong>jiggle</strong> — one-shot playful wiggle. Affirm a delete / confirm interaction.</li>
      </ul>

      <pre className="docs-code">{`import "@virtari-packages/react-button/styles/animations";

<Button animation="pulse">Try me</Button>
<Button animation="bounce">Tour</Button>

// One-shot: re-key to replay
<Button key={invalidCount} animation="shake">
  Submit
</Button>`}</pre>
    </Section>
  );
}

function AsChildSection() {
  return (
    <Section
      title="Polymorphic via asChild"
      description="Pass asChild to forward all Button styling to the first child — ideal for anchors, Next.js Link, Remix Link, or React Router. Powered by Slot; leftSection / rightSection still render."
    >
      <Row>
        <Button asChild>
          <a href="#/button">Anchor button</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#/button">Outline link</a>
        </Button>
        <Button asChild leftSection={<IconArrow />}>
          <a href="#/button">With icon</a>
        </Button>
      </Row>

      <pre className="docs-code">{`<Button asChild>
  <a href="/pricing">See pricing</a>
</Button>

// Next.js App Router
import Link from "next/link";
<Button asChild variant="outline">
  <Link href="/docs">Read the docs</Link>
</Button>

// React Router
<Button asChild>
  <RouterLink to="/settings">Settings</RouterLink>
</Button>`}</pre>
    </Section>
  );
}

function ApiSection() {
  return (
    <Section
      title="API reference"
      description="Color and variant are orthogonal. All props extend native button attributes."
    >
      <pre className="docs-code">{`import { Button } from "@virtari-packages/react-button";
// opt-in layers:
import "@virtari-packages/react-button/styles/effects";
import "@virtari-packages/react-button/styles/animations";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?:       "primary" | "success" | "warning" | "danger"
              | "info" | "accent" | "contrast";
  variant?:     "solid" | "outline" | "ghost" | "soft" | "link";
  size?:        "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  asChild?:     boolean;                    // render as child (Slot)
  loading?:     boolean;                    // spinner + disables interaction
  loadingText?: string;                     // sr-only status (default "Loading")
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  iconOnly?:   boolean;
  fullWidth?:   boolean;
  effect?:      "shine" | "raised" | "glow" | "glass" | "outline-glow";
  animation?:   "pulse" | "bounce" | "shake" | "jiggle";
}`}</pre>
    </Section>
  );
}

function AccessibilitySection() {
  return (
    <Section
      title="Accessibility"
      description="Semantics and focus behavior are handled automatically — supply a meaningful label."
    >
      <ul className="docs-prose" style={{ paddingInlineStart: "1.25em" }}>
        <li>
          <strong>Icon-only buttons</strong> must receive an <code>aria-label</code>. The auto
          square styling does not provide an accessible name.
        </li>
        <li>
          <strong>Loading</strong> sets <code>aria-disabled</code> and renders a polite{" "}
          <code>role="status"</code> region announcing <code>loadingText</code>.
        </li>
        <li>
          <strong>Disabled</strong> also sets <code>aria-disabled</code>. Prefer disabling with
          intent — a disabled primary button with no explanation is a dead end for keyboard users.
        </li>
        <li>
          <strong>Focus</strong> — a 2px ring appears on <code>:focus-visible</code> only.
        </li>
        <li>
          <strong>Contrast</strong> color — ensures ≥ 7:1 AAA contrast against either theme's canvas
          by using near-pure black / near-pure white.
        </li>
        <li>
          <strong>Reduced motion</strong> — all <code>animation</code> values are disabled under{" "}
          <code>prefers-reduced-motion: reduce</code>.
        </li>
      </ul>
    </Section>
  );
}
