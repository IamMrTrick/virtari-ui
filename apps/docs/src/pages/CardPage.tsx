import type { CSSProperties } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@virtari-packages/react-card";
import { Button } from "@virtari-packages/react-button";
import { Section } from "../components";

const gridStyle: CSSProperties = {
  display: "grid",
  gap: "var(--vds-space-4)",
  gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
};

const fieldStyle: CSSProperties = {
  display: "grid",
  gap: "var(--vds-space-2)",
  fontSize: "var(--vds-text-sm)",
};

const labelStyle: CSSProperties = {
  fontWeight: 600,
  color: "var(--vds-color-text)",
};

const inputStyle: CSSProperties = {
  inlineSize: "100%",
  minBlockSize: "2.75rem",
  paddingInline: "var(--vds-space-3)",
  paddingBlock: "var(--vds-space-2-5)",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-element)",
  background: "var(--vds-color-surface)",
  color: "var(--vds-color-text)",
};

const badgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  inlineSize: "fit-content",
  minBlockSize: "1.5rem",
  paddingInline: "var(--vds-space-2)",
  borderRadius: "999px",
  background: "var(--vds-color-primary-bg)",
  color: "var(--vds-color-primary-text)",
  fontSize: "var(--vds-text-xs)",
  fontWeight: 600,
};

const metricStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
  fontWeight: 700,
  lineHeight: 1,
};

const mutedTextStyle: CSSProperties = {
  margin: 0,
  fontSize: "var(--vds-text-sm)",
  color: "var(--vds-color-text-muted)",
};

const pricingListStyle: CSSProperties = {
  margin: 0,
  paddingInlineStart: "1.1rem",
  display: "grid",
  gap: "var(--vds-space-2)",
  color: "var(--vds-color-text-muted)",
  fontSize: "var(--vds-text-sm)",
};

export function CardPage() {
  return (
    <>
      <Section
        title="Structured Form"
        description="A production-style card with clear hierarchy, adaptive spacing, and a footer action row."
      >
        <div style={{ maxInlineSize: "30rem" }}>
          <Card>
            <CardHeader>
              <span style={badgeStyle}>Workspace</span>
              <CardTitle>Create deployment target</CardTitle>
              <CardDescription>
                Configure a reusable environment for preview, staging, or
                production releases.
              </CardDescription>
            </CardHeader>
            <CardContent style={{ display: "grid", gap: "var(--vds-space-3)" }}>
              <label style={fieldStyle}>
                <span style={labelStyle}>Project name</span>
                <input type="text" placeholder="Virtari Console" style={inputStyle} />
              </label>
              <label style={fieldStyle}>
                <span style={labelStyle}>Region</span>
                <input type="text" placeholder="Frankfurt (eu-central-1)" style={inputStyle} />
              </label>
              <label style={fieldStyle}>
                <span style={labelStyle}>Domain</span>
                <input type="text" placeholder="app.virtari.io" style={inputStyle} />
              </label>
            </CardContent>
            <CardFooter style={{ justifyContent: "flex-end" }}>
              <Button variant="ghost">Cancel</Button>
              <Button>Save target</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section
        title="Variants"
        description="Surface, outline, soft, and ghost variants cover the common card treatments without ad-hoc CSS."
      >
        <div
          style={{
            ...gridStyle,
            padding: "var(--vds-space-4)",
            borderRadius: "var(--vds-radius-lg)",
            background: "var(--vds-color-bg-subtle)",
          }}
        >
          <Card interactive style={{ minInlineSize: 0 }}>
            <CardHeader>
              <CardTitle>Surface</CardTitle>
              <CardDescription>
                Default elevated card for forms, dashboards, and settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={metricStyle}>98.4%</p>
              <p style={mutedTextStyle}>Pipeline success rate in the last 7 days.</p>
            </CardContent>
          </Card>

          <Card variant="outline" interactive style={{ minInlineSize: 0 }}>
            <CardHeader>
              <CardTitle>Outline</CardTitle>
              <CardDescription>
                Cleaner framed treatment when you want less visual weight.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={metricStyle}>14</p>
              <p style={mutedTextStyle}>Open review threads waiting on design approval.</p>
            </CardContent>
          </Card>

          <Card variant="soft" interactive style={{ minInlineSize: 0 }}>
            <CardHeader>
              <CardTitle>Soft</CardTitle>
              <CardDescription>
                Tinted surface for highlights, promos, or secondary panels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={metricStyle}>3.2x</p>
              <p style={mutedTextStyle}>Faster handoff after consolidating primitives.</p>
            </CardContent>
          </Card>

          <Card variant="ghost" interactive style={{ minInlineSize: 0 }}>
            <CardHeader>
              <CardTitle>Ghost</CardTitle>
              <CardDescription>
                Minimal shell for list rows, overlays, and embedded summaries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={metricStyle}>24</p>
              <p style={mutedTextStyle}>Reusable blocks already aligned to the new API.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="Adaptive Sizes"
        description="Standalone content cards now keep top padding correctly, and the padding scale shrinks on mobile instead of feeling oversized."
      >
        <div style={gridStyle}>
          <Card size="sm">
            <CardContent>
              <span style={badgeStyle}>SM</span>
              <p style={{ ...metricStyle, marginBlockStart: "var(--vds-space-3)" }}>
                Ready
              </p>
              <p style={mutedTextStyle}>
                Tight card for dense dashboards or compact mobile stacks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <span style={badgeStyle}>MD</span>
              <p style={{ ...metricStyle, marginBlockStart: "var(--vds-space-3)" }}>
                Synced
              </p>
              <p style={mutedTextStyle}>
                Default spacing for general product UI and content blocks.
              </p>
            </CardContent>
          </Card>

          <Card size="lg">
            <CardContent>
              <span style={badgeStyle}>LG</span>
              <p style={{ ...metricStyle, marginBlockStart: "var(--vds-space-3)" }}>
                Featured
              </p>
              <p style={mutedTextStyle}>
                Roomier layout for hero cards, onboarding, or pricing callouts.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="Pricing Layout"
        description="The same API now supports richer card compositions without custom structural hacks."
      >
        <div style={gridStyle}>
          <Card variant="outline">
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>For solo builders and internal tools.</CardDescription>
            </CardHeader>
            <CardContent style={{ display: "grid", gap: "var(--vds-space-4)" }}>
              <div>
                <p style={metricStyle}>$0</p>
                <p style={mutedTextStyle}>Unlimited prototypes, community support.</p>
              </div>
              <ul style={pricingListStyle}>
                <li>1 workspace</li>
                <li>Basic analytics</li>
                <li>Email notifications</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" fullWidth>
                Start free
              </Button>
            </CardFooter>
          </Card>

          <Card variant="surface" interactive>
            <CardHeader>
              <span style={badgeStyle}>Most used</span>
              <CardTitle>Team</CardTitle>
              <CardDescription>
                Best fit for product squads shipping every week.
              </CardDescription>
            </CardHeader>
            <CardContent style={{ display: "grid", gap: "var(--vds-space-4)" }}>
              <div>
                <p style={metricStyle}>$29</p>
                <p style={mutedTextStyle}>Per editor / month, billed monthly.</p>
              </div>
              <ul style={pricingListStyle}>
                <li>Unlimited workspaces</li>
                <li>Shared component governance</li>
                <li>Release approvals and audit trail</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button fullWidth>Upgrade to Team</Button>
            </CardFooter>
          </Card>

          <Card variant="soft">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>
                Custom rollout controls, SSO, and dedicated platform support.
              </CardDescription>
            </CardHeader>
            <CardContent style={{ display: "grid", gap: "var(--vds-space-4)" }}>
              <div>
                <p style={metricStyle}>Custom</p>
                <p style={mutedTextStyle}>
                  Tailored contract for scale, security, and procurement.
                </p>
              </div>
              <ul style={pricingListStyle}>
                <li>Advanced access controls</li>
                <li>Design system health reporting</li>
                <li>Private onboarding and migration support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" fullWidth>
                Talk to sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@virtari-packages/react-card";

<Card variant="outline" size="sm" interactive>
  <CardHeader>
    <CardTitle>Repository health</CardTitle>
    <CardDescription>Weekly design system report.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>All packages are synced.</p>
  </CardContent>
  <CardFooter>
    <Button>Open report</Button>
  </CardFooter>
</Card>

<Card size="lg">
  <CardContent>Standalone content keeps top and bottom padding.</CardContent>
</Card>`}</pre>
      </Section>
    </>
  );
}
