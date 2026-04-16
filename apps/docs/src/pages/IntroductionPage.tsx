import { Badge } from "@virtari/react-badge";
import { Section } from "../components";

export function IntroductionPage() {
  return (
    <>
      <Section title="What is Virtari DS?">
        <p className="docs-prose">
          Virtari Design System is a package-based component library built on{" "}
          <strong>React</strong>, <strong>Radix UI</strong>, and{" "}
          <strong>pure vanilla CSS</strong> using 2026 standards. Every
          component is its own publishable npm package under the{" "}
          <code>@virtari</code> scope.
        </p>
      </Section>

      <Section title="CSS Features">
        <div className="docs-row" style={{ flexWrap: "wrap" }}>
          <Badge>CSS Nesting</Badge>
          <Badge>@layer</Badge>
          <Badge>color-mix()</Badge>
          <Badge>:has()</Badge>
          <Badge>@property</Badge>
          <Badge>Container Queries</Badge>
          <Badge>OKLCH Colors</Badge>
          <Badge>Logical Properties</Badge>
          <Badge>@custom-media</Badge>
        </div>
      </Section>

      <Section title="Quick Start">
        <pre className="docs-code">{`# Install foundation + a component
pnpm add @virtari/core @virtari/tokens @virtari/react-button

# Import CSS once in your app root
@import "@virtari/core";
@import "@virtari/tokens";
@import "@virtari/react-button/styles";

# Use it
import { Button } from "@virtari/react-button";
<Button variant="outline">Click me</Button>`}</pre>
      </Section>

      <Section title="Architecture">
        <pre className="docs-code">{`@virtari/tokens       → Design tokens (CSS custom properties)
@virtari/core         → @layer order, reset, base styles
@virtari/react-*      → One package per component`}</pre>
      </Section>
    </>
  );
}
