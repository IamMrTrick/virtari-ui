# Original documentation page

Source ID: `apps/docs/src/pages/BreadcrumbPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useMemo, useState, type CSSProperties } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage as BreadcrumbCurrent,
  BreadcrumbSeparator,
  BreadcrumbHome,
  type BreadcrumbVariant,
  type BreadcrumbSize,
  type BreadcrumbSeparatorPreset,
  type BreadcrumbItemData,
} from "@virtari-packages/react-breadcrumb";
import { Section } from "../components";

const VARIANTS: BreadcrumbVariant[] = [
  "default",
  "underline",
  "ghost",
  "soft",
  "solid",
];
const SIZES: BreadcrumbSize[] = ["2xs", "xs", "sm", "md", "lg", "xl"];
const SEPARATORS: BreadcrumbSeparatorPreset[] = [
  "chevron",
  "slash",
  "dot",
  "arrow",
];

const SHORT_ITEMS: BreadcrumbItemData[] = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumb" },
];

const DEEP_ITEMS: BreadcrumbItemData[] = [
  { label: "Home", href: "/" },
  { label: "Workspace", href: "/workspace" },
  { label: "Projects", href: "/workspace/projects" },
  { label: "Virtari", href: "/workspace/projects/virtari" },
  { label: "Design System", href: "/workspace/projects/virtari/design-system" },
  {
    label: "Components",
    href: "/workspace/projects/virtari/design-system/components",
  },
  { label: "Breadcrumb" },
];

const stackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
};

const rowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "1rem",
};

const labelStyle: CSSProperties = {
  fontSize: "0.75rem",
  color: "var(--vds-color-text-muted)",
  fontFamily: "var(--vds-font-mono)",
};

export function BreadcrumbPage() {
  const [seoPayload, setSeoPayload] = useState<string>("");
  const seoItems = useMemo(() => SHORT_ITEMS, []);

  return (
    <>
      <Section
        title="Default"
        description="Compound API with semantic <nav> + <ol> markup, aria-current on the active page, and chevron separators by default."
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbHome />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbCurrent>Breadcrumb</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>

      <Section
        title="Variants"
        description="Five visual treatments for items and links."
      >
        <div style={stackStyle}>
          {VARIANTS.map((variant) => (
            <div key={variant} style={rowStyle}>
              <span style={labelStyle}>{variant}</span>
              <Breadcrumb variant={variant} items={SHORT_ITEMS} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Sizes"
        description="2xs through xl — typography and padding scale together while logical properties keep RTL-safe."
      >
        <div style={stackStyle}>
          {SIZES.map((size) => (
            <div key={size} style={rowStyle}>
              <span style={labelStyle}>{size}</span>
              <Breadcrumb size={size} items={SHORT_ITEMS} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Separator presets"
        description="chevron / slash / dot / arrow — selectable on the Root and overridable per-separator. Chevron and arrow flip automatically in RTL."
      >
        <div style={stackStyle}>
          {SEPARATORS.map((sep) => (
            <div key={sep} style={rowStyle}>
              <span style={labelStyle}>{sep}</span>
              <Breadcrumb separator={sep} items={SHORT_ITEMS} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Custom separator"
        description="Override the preset for a single separator using children — e.g. a localised glyph or any node."
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>›</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>›</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbCurrent>Custom</BreadcrumbCurrent>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>

      <Section
        title="Overflow collapse"
        description="When items > maxItems, the middle collapses into an Ellipsis dropdown menu. Use Enter or Arrow Down to open it, arrow keys to navigate, and Escape to return to the trigger. The final current-page item always stays visible."
      >
        <div style={stackStyle}>
          <div style={rowStyle}>
            <span style={labelStyle}>no collapse</span>
            <Breadcrumb items={DEEP_ITEMS} />
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>maxItems=4</span>
            <Breadcrumb items={DEEP_ITEMS} maxItems={4} />
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>max=3, before=1, after=1</span>
            <Breadcrumb
              items={DEEP_ITEMS}
              maxItems={3}
              itemsBeforeCollapse={1}
              itemsAfterCollapse={1}
            />
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>max=5, before=2, after=2</span>
            <Breadcrumb
              items={DEEP_ITEMS}
              maxItems={5}
              itemsBeforeCollapse={2}
              itemsAfterCollapse={2}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Truncation"
        description="Each item is capped at --breadcrumb-item-max-inline-size (default 16ch) and truncates with an ellipsis. Long Persian/Arabic text behaves identically thanks to logical properties."
      >
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label:
                "An exceptionally long breadcrumb label that should truncate gracefully",
              href: "/long",
            },
            { label: "Current page with a long title that also truncates" },
          ]}
        />
      </Section>

      <Section
        title="SEO — JSON-LD structured data"
        description={`Pass \`seo\` and \`seoBaseUrl\` to inject <script type="application/ld+json"> with schema.org BreadcrumbList. Below is a live read-out of the script payload mounted in the DOM.`}
      >
        <div style={stackStyle}>
          <Breadcrumb
            items={seoItems}
            seo
            seoBaseUrl="https://virtari.dev"
            ref={(node) => {
              if (!node) {
                setSeoPayload("");
                return;
              }
              const script = node.querySelector(
                'script[type="application/ld+json"]',
              );
              setSeoPayload(script?.textContent ?? "");
            }}
          />
          {seoPayload ? (
            <VirtariCodeBlock renderer="static" language="json" code={JSON.stringify(JSON.parse(seoPayload), null, 2)} />
          ) : null}
        </div>
      </Section>

      <Section
        title="Compound usage"
        description="Full markup control. Use this when you need to wire each item to a custom routing component (e.g. <NextLink>) via asChild."
      >
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbHome,
} from "@virtari-packages/react-breadcrumb";

<Breadcrumb separator="slash" size="sm">
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbHome /></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <NextLink href="/docs">Docs</NextLink>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`} />
      </Section>

      <Section
        title="Array helper"
        description="One-liner API. Internally renders the same primitives — JSON-LD, collapse, and separators all work identically."
      >
        <VirtariCodeBlock renderer="static" language="tsx" code={`<Breadcrumb
  items={[
    { label: "Home", href: "/", icon: IconHome },
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Breadcrumb" }, // no href → renders as the current page
  ]}
  separator="chevron"
  maxItems={4}
  seo
  seoBaseUrl="https://virtari.dev"
/>`} />
      </Section>
    </>
  );
}

```
