# Original documentation page

Source ID: `apps/docs/src/pages/BadgePage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock, InlineCode as VirtariInlineCode } from "@virtari-packages/react-code";
import { useState } from "react";
import {
  Badge,
  type BadgeColor,
  type BadgeVariant,
  type BadgeSize,
  type BadgeShape,
} from "@virtari-packages/react-badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@virtari-packages/react-select";
import { Switch } from "@virtari-packages/react-switch";
import { Input } from "@virtari-packages/react-input";
import { Button } from "@virtari-packages/react-button";
import {
  Row as LayoutRow,
  Stack as LayoutStack,
} from "@virtari-packages/react-layout";
import { Section, Row } from "../components";
import {
  IconCheck,
  IconSparkles,
  IconStar,
  IconAlertTriangle,
  IconGitBranch,
  IconBolt,
} from "@virtari-packages/react-icons";
import { toast } from "@virtari-packages/react-toast";

/* ─────────────────────────────── Icons ─────────────────────────────── */

const DEMO_ICON = { size: 12, stroke: 2, "aria-hidden": true as const, focusable: false as const };

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
        <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
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
          <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
            {hint}
          </span>
        )}
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}

function Grid({
  minCol = "10rem",
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
    <th scope="col" style={{ padding: "var(--vds-space-2) var(--vds-space-3)", fontWeight: "var(--vds-font-weight-medium)" }}>
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

const COLORS: BadgeColor[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "accent",
  "neutral",
];
const VARIANTS: Exclude<BadgeVariant, "default" | "secondary" | "destructive">[] = [
  "soft",
  "solid",
  "outline",
  "subtle",
  "soft-outline",
];
const SIZES: BadgeSize[] = ["xs", "sm", "md", "lg"];
const SHAPES: BadgeShape[] = ["pill", "square"];

const SIZE_SPEC: Record<BadgeSize, { height: string; font: string; hint: string }> = {
  xs: { height: "20px", font: "10px",   hint: "Table cells, dense metadata, inline markers." },
  sm: { height: "20px", font: "12px",   hint: "Nav counters, form hints." },
  md: { height: "24px", font: "12px",   hint: "Default — body-level status chips." },
  lg: { height: "28px", font: "14px",   hint: "Prominent labels, hero metadata." },
};

function colorHint(c: BadgeColor): string {
  switch (c) {
    case "primary": return "Brand / featured";
    case "success": return "Active, approved, done";
    case "warning": return "Pending review";
    case "danger":  return "Error, blocked, rejected";
    case "info":    return "Informational";
    case "accent":  return "Highlight / promo";
    case "neutral": return "Inactive, metadata";
  }
}

function variantHint(v: (typeof VARIANTS)[number]): string {
  switch (v) {
    case "soft":         return "Muted bg + color text (default)";
    case "solid":        return "Filled hue, high emphasis";
    case "outline":      return "Border only, transparent bg";
    case "subtle":       return "Color text only, no bg or border";
    case "soft-outline": return "Soft bg + tinted translucent border";
  }
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export function BadgePage() {
  return (
    <>
      <PlaygroundSection />
      <VariantsSection />
      <ColorsSection />
      <ColorMatrixSection />
      <SizesSection />
      <ShapesSection />
      <DotSection />
      <IconsSection />
      <RemovableSection />
      <InteractiveSection />
      <AsChildSection />
      <LongLabelSection />
      <CompositionSection />
      <ApiSection />
      <AccessibilitySection />
    </>
  );
}

/* ─────────────────────────── Sections ─────────────────────────── */

function PlaygroundSection() {
  const [color, setColor] = useState<BadgeColor>("primary");
  const [variant, setVariant] = useState<Exclude<BadgeVariant, "default" | "secondary" | "destructive">>("soft");
  const [size, setSize] = useState<BadgeSize>("md");
  const [shape, setShape] = useState<BadgeShape>("pill");
  const [dot, setDot] = useState(false);
  const [leftIcon, setLeftIcon] = useState(false);
  const [removable, setRemovable] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [label, setLabel] = useState("Badge");

  return (
    <Section
      title="Live playground"
      description="Tweak every prop and watch the badge respond. Color is orthogonal to variant — every color supports every variant."
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
          <Select value={color} onValueChange={(v) => setColor(v as BadgeColor)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {COLORS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Variant">
          <Select value={variant} onValueChange={(v) => setVariant(v as typeof variant)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {VARIANTS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Size">
          <Select value={size} onValueChange={(v) => setSize(v as BadgeSize)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Shape">
          <Select value={shape} onValueChange={(v) => setShape(v as BadgeShape)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {SHAPES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Label">
          <Input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </Field>

        <LayoutStack gap="sm">
          <SwitchRow title="Dot" checked={dot} onCheckedChange={setDot} />
          <SwitchRow title="Left icon" hint="Ignored when dot is on" checked={leftIcon} onCheckedChange={setLeftIcon} />
          <SwitchRow title="Removable" checked={removable} onCheckedChange={(value) => { setRemovable(value); if (value) setInteractive(false); }} />
          <SwitchRow title="Interactive" hint="Native button; separate from removal" checked={interactive} onCheckedChange={(value) => { setInteractive(value); if (value) setRemovable(false); }} />
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
          background: "var(--vds-color-bg)",
        }}
      >
        <Badge
          color={color}
          variant={variant}
          size={size}
          shape={shape}
          dot={dot}
          leftSection={!dot && leftIcon ? <IconStar {...DEMO_ICON} /> : undefined}
          onRemove={removable ? () => toast.info("Removed") : undefined}
          removeLabel={`Remove ${label || "badge"}`}
          asChild={interactive}
        >
          {interactive ? <button type="button" onClick={() => toast.info(`Clicked ${label}`)}>{label || "Badge"}</button> : label || "\u00A0"}
        </Badge>
      </div>
    </Section>
  );
}

function VariantsSection() {
  return (
    <Section
      title="Variants"
      description="Five appearance layers — how the color is rendered. Soft is the default tinted look. Solid for emphasis, outline for borders only, subtle for minimum weight, soft-outline for a structured chip."
    >
      <Grid minCol="12rem">
        {VARIANTS.map((v) => (
          <LayoutStack key={v} gap="xs">
            <div>
              <Badge variant={v}>{v}</Badge>
            </div>
            <Caption>{variantHint(v)}</Caption>
          </LayoutStack>
        ))}
      </Grid>

      <VirtariCodeBlock renderer="static" language="tsx" code={`<Badge variant="soft">Default</Badge>
<Badge variant="solid">Emphasis</Badge>
<Badge variant="outline">Bordered</Badge>
<Badge variant="subtle">Quiet</Badge>
<Badge variant="soft-outline">Chip</Badge>`} />
    </Section>
  );
}

function ColorsSection() {
  return (
    <Section
      title="Colors"
      description="Seven intent palettes — orthogonal to variant. Pick color for meaning, variant for weight."
    >
      <Grid minCol="9rem">
        {COLORS.map((c) => (
          <LayoutStack key={c} gap="xs">
            <div>
              <Badge color={c}>{c}</Badge>
            </div>
            <Caption>{colorHint(c)}</Caption>
          </LayoutStack>
        ))}
      </Grid>

      <VirtariCodeBlock renderer="static" language="tsx" code={`<Badge color="primary">Featured</Badge>
<Badge color="success">Active</Badge>
<Badge color="warning">Review</Badge>
<Badge color="danger">Blocked</Badge>
<Badge color="info">Beta</Badge>
<Badge color="accent">New</Badge>
<Badge color="neutral">Draft</Badge>`} />
    </Section>
  );
}

function ColorMatrixSection() {
  return (
    <Section
      title="Color × Variant matrix"
      description="Every color supports every variant. Compare light, dark and OLED themes on your chosen surface."
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
            <tr style={{ background: "var(--vds-color-bg-subtle)", textAlign: "start" }}>
              <Th>Color</Th>
              {VARIANTS.map((v) => <Th key={v}>{v}</Th>)}
            </tr>
          </thead>
          <tbody>
            {COLORS.map((c) => (
              <tr key={c} style={{ borderTop: "1px solid var(--vds-color-border-muted)" }}>
                <Td><VirtariInlineCode>{c}</VirtariInlineCode></Td>
                {VARIANTS.map((v) => (
                  <Td key={v}>
                    <Badge color={c} variant={v}>Label</Badge>
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
      description="Four size presets with minimum heights from 20px (xs) to 28px (lg). md defaults to 24px. Long labels grow vertically; compact sizes are intended for metadata, so choose comfortable targets for actions."
    >
      <Row>
        {SIZES.map((s) => (
          <Badge key={s} size={s}>
            {s}
          </Badge>
        ))}
      </Row>

      <Row>
        {SIZES.map((s) => (
          <Badge key={s} size={s} color="success" variant="solid" leftSection={<IconCheck {...DEMO_ICON} />}>
            Active
          </Badge>
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
            <tr style={{ background: "var(--vds-color-bg-subtle)", textAlign: "start" }}>
              <Th>Size</Th>
              <Th>Minimum height</Th>
              <Th>Font size</Th>
              <Th>When to use</Th>
            </tr>
          </thead>
          <tbody>
            {SIZES.map((s) => {
              const spec = SIZE_SPEC[s];
              return (
                <tr key={s} style={{ borderTop: "1px solid var(--vds-color-border-muted)" }}>
                  <Td><VirtariInlineCode>{s}</VirtariInlineCode></Td>
                  <Td>{spec.height}</Td>
                  <Td>{spec.font}</Td>
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

function ShapesSection() {
  return (
    <Section
      title="Shape"
      description="Pill uses the fully rounded badge radius. Square uses the scoped navigation-item radius for compact tag-like labels."
    >
      <Row>
        <Badge>pill (default)</Badge>
        <Badge shape="square">square</Badge>
        <Badge color="accent" shape="square">v2.4.0</Badge>
        <Badge color="neutral" shape="square" leftSection={<IconGitBranch {...DEMO_ICON} />}>main</Badge>
      </Row>

      <Caption>
        Pill intentionally stays fully rounded across global <VirtariInlineCode>data-radius</VirtariInlineCode> modes; square follows the finite control radius scale.
      </Caption>
    </Section>
  );
}

function DotSection() {
  return (
    <Section
      title="Status dot"
      description="Pass dot to prepend a colored indicator. Use dotOnly for a bare presence marker with no label — tracks the current color."
    >
      <Row>
        <Badge dot color="success">Online</Badge>
        <Badge dot color="warning">Away</Badge>
        <Badge dot color="danger">Offline</Badge>
        <Badge dot color="info" variant="outline">Syncing</Badge>
        <Badge dot color="neutral" variant="subtle">Idle</Badge>
      </Row>

      <Row>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
          <Badge dotOnly color="success" aria-label="Active" /> active
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
          <Badge dotOnly color="warning" aria-label="Pending" /> pending
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
          <Badge dotOnly color="danger" aria-label="Error" /> error
        </span>
      </Row>

      <VirtariCodeBlock renderer="static" language="tsx" code={`<Badge dot color="success">Online</Badge>
<Badge dotOnly color="danger" aria-label="Offline" />`} />
    </Section>
  );
}

function IconsSection() {
  return (
    <Section
      title="Icons — leading and trailing"
      description="Slot icons via leftSection and rightSection. They auto-size with the badge size. Keep them small — badges are inline artifacts, not buttons."
    >
      <Row>
        <Badge color="success" leftSection={<IconCheck {...DEMO_ICON} />}>Verified</Badge>
        <Badge color="accent" variant="solid" leftSection={<IconSparkles {...DEMO_ICON} />}>Pro</Badge>
        <Badge color="warning" leftSection={<IconAlertTriangle {...DEMO_ICON} />}>Review</Badge>
        <Badge color="info" variant="outline" leftSection={<IconBolt {...DEMO_ICON} />}>Beta</Badge>
        <Badge color="neutral" leftSection={<IconGitBranch {...DEMO_ICON} />}>feature/auth</Badge>
      </Row>

      <VirtariCodeBlock renderer="static" language="tsx" code={`<Badge leftSection={<CheckIcon />}>Verified</Badge>
<Badge
  color="accent"
  variant="solid"
  leftSection={<SparkleIcon />}
>
  Pro
</Badge>`} />
    </Section>
  );
}

function RemovableSection() {
  const [tags, setTags] = useState<string[]>(["design", "typescript", "css", "a11y", "rtl"]);

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

  return (
    <Section
      title="Removable chips"
      description="Pass onRemove to render a dedicated close button inside the badge. The button stops propagation so the badge's onClick still works for the rest of the chip."
    >
      <Row>
        {tags.map((tag) => (
          <Badge key={tag} color="neutral" variant="soft-outline" onRemove={() => removeTag(tag)} removeLabel={`Remove ${tag}`}>
            {tag}
          </Badge>
        ))}
        {tags.length === 0 && (
          <Button
            type="button"
            variant="outline"
            color="contrast"
            onClick={() => setTags(["design", "typescript", "css", "a11y", "rtl"])}
          >
            Reset tags
          </Button>
        )}
      </Row>

      <VirtariCodeBlock renderer="static" language="tsx" code={`<Badge
  onRemove={() => removeTag(tag)}
  removeLabel={\`Remove \${tag}\`}
>
  {tag}
</Badge>`} />
    </Section>
  );
}

function InteractiveSection() {
  return (
    <Section
      title="Interactive"
      description="Use asChild with a native button for actions: Enter, Space, focus and disabled behavior remain native. Use an anchor for navigation. A bare span with onClick only receives pointer styling."
    >
      <Row>
        <Badge color="primary" variant="soft-outline" asChild>
          <button type="button" onClick={() => toast.info("Filtered: Design")}>Design</button>
        </Badge>
        <Badge color="success" variant="soft-outline" asChild>
          <button type="button" onClick={() => toast.info("Filtered: Engineering")}>Engineering</button>
        </Badge>
        <Badge color="warning" variant="soft-outline" asChild>
          <button type="button" disabled>Ops unavailable</button>
        </Badge>
      </Row>
    </Section>
  );
}

function AsChildSection() {
  return (
    <Section
      title="Polymorphic via asChild"
      description="Pass asChild to forward all Badge styling to the first child. Handy for turning a badge into a real link (anchors, Next.js / Remix / React Router)."
    >
      <Row>
        <Badge asChild>
          <a href="#/badge">Anchor badge</a>
        </Badge>
        <Badge variant="outline" asChild>
          <a href="#/badge">Outline link</a>
        </Badge>
        <Badge color="accent" variant="solid" asChild leftSection={<IconSparkles {...DEMO_ICON} />}>
          <a href="#/badge">Pro</a>
        </Badge>
      </Row>

      <VirtariCodeBlock renderer="static" language="tsx" code={`<Badge asChild>
  <a href="/changelog">Latest release</a>
</Badge>

// React Router
<Badge asChild variant="outline">
  <RouterLink to="/settings">Beta settings</RouterLink>
</Badge>`} />
    </Section>
  );
}

function LongLabelSection() {
  return <Section title="Long labels and RTL" description="Labels wrap inside their available width. Leading and trailing slots stay centered and retain their size in either direction.">
    <LayoutRow mode="flex" wrap gap="md">
      <div style={{ width: "14rem", maxWidth: "100%" }}><Badge leftSection={<IconGitBranch {...DEMO_ICON} />}>feature/a-long-branch-name-with-unbroken-metadata</Badge></div>
      <div dir="rtl" lang="fa" style={{ width: "14rem", maxWidth: "100%" }}><Badge color="success" leftSection={<IconCheck {...DEMO_ICON} />}>تغییرات پروژه برای بررسی و تأیید آماده است</Badge></div>
    </LayoutRow>
  </Section>;
}

function CompositionSection() {
  return (
    <Section
      title="Composition patterns"
      description="Where badges usually land — next to headings, inside buttons, inline with body copy, or as list-item metadata."
    >
      <LayoutStack gap="md">
        <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
          <h3 style={{ margin: 0, font: "inherit", fontSize: "var(--vds-text-lg)", fontWeight: "var(--vds-font-weight-semibold)" }}>
            Notifications
          </h3>
          <Badge color="primary" size="sm">12</Badge>
        </div>

        <p style={{ margin: 0, fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text)" }}>
          Introducing realtime sync{" "}
          <Badge color="accent" size="xs" variant="solid">New</Badge>
          {" "}— changes propagate across tabs in under 50ms.
        </p>

        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
          <li style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)", fontSize: "var(--vds-text-sm)" }}>
            <Badge dot color="success" size="sm">Production</Badge>
            <span style={{ color: "var(--vds-color-text-muted)" }}>deployed 12m ago</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)", fontSize: "var(--vds-text-sm)" }}>
            <Badge dot color="warning" size="sm">Staging</Badge>
            <span style={{ color: "var(--vds-color-text-muted)" }}>awaiting approval</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)", fontSize: "var(--vds-text-sm)" }}>
            <Badge dot color="danger" size="sm">Preview</Badge>
            <span style={{ color: "var(--vds-color-text-muted)" }}>build failed</span>
          </li>
        </ul>
      </LayoutStack>
    </Section>
  );
}

function ApiSection() {
  return (
    <Section
      title="API reference"
      description="Color and variant are orthogonal. All props extend native span attributes."
    >
      <VirtariCodeBlock renderer="static" language="tsx" code={`import { Badge } from "@virtari-packages/react-badge";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?:   "primary" | "success" | "warning" | "danger"
          | "info" | "accent" | "neutral";
  variant?: "soft" | "solid" | "outline" | "subtle" | "soft-outline";
  size?:    "xs" | "sm" | "md" | "lg";
  shape?:   "pill" | "square";
  dot?:     boolean;                // leading status dot
  dotOnly?: boolean;                // bare presence marker
  leftSection?:  ReactNode;
  rightSection?: ReactNode;
  onRemove?:     (e: MouseEvent<HTMLButtonElement>) => void;
  removeLabel?:  string;            // aria-label for close (default "Remove")
  asChild?:      boolean;           // polymorphic via Slot
}`} />
    </Section>
  );
}

function AccessibilitySection() {
  return (
    <Section
      title="Accessibility"
      description="Badges are inline decorations by default — they only become interactive when you opt in."
    >
      <ul className="docs-prose" style={{ paddingInlineStart: "1.25em" }}>
        <li>
          <strong>dotOnly</strong> must receive an <VirtariInlineCode>aria-label</VirtariInlineCode>. A bare dot has no text
          content — screen readers otherwise have nothing to announce.
        </li>
        <li>
          <strong>onRemove</strong> renders a real <VirtariInlineCode>{`<button>`}</VirtariInlineCode> with <VirtariInlineCode>aria-label</VirtariInlineCode>{" "}
          (default "Remove", overridable via <VirtariInlineCode>removeLabel</VirtariInlineCode>). Click events stop
          propagating so the parent badge's <VirtariInlineCode>onClick</VirtariInlineCode> still fires on the rest of the chip.
        </li>
        <li>
          <strong>Actions</strong> use <VirtariInlineCode>asChild</VirtariInlineCode> with a native button for keyboard behavior. Do not nest a removal button inside a button or link. For routing, use <VirtariInlineCode>asChild</VirtariInlineCode> with an{" "}
          <VirtariInlineCode>{`<a>`}</VirtariInlineCode> so assistive tech announces it as a link.
        </li>
        <li>
          <strong>Color-only meaning</strong> — never rely on hue alone to convey status. Pair
          color with either a <VirtariInlineCode>dot</VirtariInlineCode> + label or a leading icon so color-blind users have
          a second channel.
        </li>
        <li>
          <strong>Contrast</strong> — every variant × color pair is token-driven. Soft uses{" "}
          <VirtariInlineCode>*-bg</VirtariInlineCode> + <VirtariInlineCode>*-text</VirtariInlineCode> pairs from the color system; solid uses{" "}
          <VirtariInlineCode>on-*</VirtariInlineCode> text. Recheck contrast when overriding the theme or placing transparent variants on custom backgrounds.
        </li>
      </ul>
    </Section>
  );
}

```
