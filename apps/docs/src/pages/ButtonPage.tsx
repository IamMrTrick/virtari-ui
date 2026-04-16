import { useState } from "react";
import { Button } from "@virtari/react-button";
import { Section, Row } from "../components";

function IconPlus() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5M4 4l1 9a1 1 0 001 1h4a1 1 0 001-1l1-9" />
    </svg>
  );
}

export function ButtonPage() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <Section title="Variants" description="Six visual variants for different intent levels.">
        <Row>
          <Button>Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </Row>
      </Section>

      <Section title="Sizes" description="Seven sizes from 2xs (24px) to 2xl (64px).">
        <Row>
          <Button size="2xs">2XS</Button>
          <Button size="xs">XS</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">XL</Button>
          <Button size="2xl">2XL</Button>
        </Row>
      </Section>

      <Section title="With Icons" description="Use leftSection and rightSection for icons.">
        <Row>
          <Button leftSection={<IconPlus />}>Create</Button>
          <Button rightSection={<IconArrow />}>Continue</Button>
          <Button leftSection={<IconPlus />} rightSection={<IconArrow />}>Full</Button>
          <Button variant="outline" leftSection={<IconPlus />}>Add Item</Button>
          <Button variant="destructive" leftSection={<IconTrash />}>Delete</Button>
        </Row>
      </Section>

      <Section title="Icon Only" description="Auto-detected via :has(svg:only-child) — no prop needed.">
        <Row>
          <Button size="xs"><IconPlus /></Button>
          <Button size="sm"><IconPlus /></Button>
          <Button><IconPlus /></Button>
          <Button size="lg"><IconPlus /></Button>
          <Button variant="outline"><IconPlus /></Button>
          <Button variant="ghost"><IconPlus /></Button>
          <Button variant="soft"><IconPlus /></Button>
        </Row>
      </Section>

      <Section title="Loading" description="Shows spinner, hides content, disables interaction.">
        <Row>
          <Button loading>Saving...</Button>
          <Button loading variant="outline">Processing...</Button>
          <Button loading variant="soft">Uploading...</Button>
          <Button onClick={handleLoadingClick} loading={loading}>
            {loading ? "Saving..." : "Click to Save"}
          </Button>
        </Row>
      </Section>

      <Section title="Full Width">
        <div style={{ maxInlineSize: "24rem", display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
          <Button fullWidth>Full Width Solid</Button>
          <Button fullWidth variant="outline">Full Width Outline</Button>
        </div>
      </Section>

      <Section title="States">
        <Row>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
          <Button variant="ghost" disabled>Disabled Ghost</Button>
        </Row>
      </Section>

      <Section title="Effects" description="Opt-in via @import '@virtari/react-button/styles/effects'.">
        <Row>
          <Button effect="shine">Shine</Button>
          <Button effect="shine" variant="destructive">Shine Danger</Button>
          <Button effect="raised">Raised 3D</Button>
          <Button effect="raised" size="lg">Raised Large</Button>
          <Button effect="glow">Glow</Button>
          <Button effect="glow" variant="destructive">Glow Danger</Button>
          <Button effect="outline-glow" variant="outline">Outline Glow</Button>
        </Row>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--vds-space-3)",
            padding: "var(--vds-space-6)",
            borderRadius: "var(--vds-radius-xl)",
            background: "linear-gradient(135deg, oklch(0.25 0.15 265), oklch(0.15 0.10 300))",
          }}
        >
          <Button effect="glass">Glass</Button>
          <Button effect="glass" size="lg">Glass Large</Button>
          <Button effect="glass" size="sm">Glass Small</Button>
        </div>
      </Section>

      <Section title="Animations" description="Opt-in via @import '@virtari/react-button/styles/animations'.">
        <Row>
          <Button animation="pulse">Pulse</Button>
          <Button animation="bounce">Bounce</Button>
        </Row>
      </Section>

      <Section title="As Link" description="Use asChild to render as anchor, Next.js Link, etc.">
        <Row>
          <Button asChild>
            <a href="#button">Anchor Button</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#button">Outline Link</a>
          </Button>
        </Row>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Button } from "@virtari/react-button";

// Basic
<Button variant="outline" size="lg">Click me</Button>

// With icons
<Button leftSection={<PlusIcon />}>Create</Button>
<Button rightSection={<ArrowIcon />}>Continue</Button>

// Icon only (auto-detected)
<Button><SearchIcon /></Button>

// Loading
<Button loading={isLoading}>Save</Button>

// As link
<Button asChild>
  <a href="/page">Go to page</a>
</Button>

// Full width
<Button fullWidth>Submit</Button>`}</pre>
      </Section>
    </>
  );
}
