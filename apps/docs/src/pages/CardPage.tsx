import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState, type CSSProperties } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@virtari-packages/react-card";
import { Button } from "@virtari-packages/react-button";
import { InputField } from "@virtari-packages/react-input";
import { Badge } from "@virtari-packages/react-badge";
import { Section } from "../components";

const gridStyle: CSSProperties = {
  display: "grid",
  gap: "var(--vds-space-4)",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
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
  const [saved, setSaved] = useState(false);
  return (
    <>
      <Section
        title="Structured Form"
        description="A labeled form with slot-owned spacing and native submit/reset behavior. Saving updates this local preview only."
      >
        <form style={{ maxInlineSize: "30rem" }} onSubmit={(event) => { event.preventDefault(); setSaved(true); }} onReset={() => setSaved(false)} onChange={() => setSaved(false)}>
          <Card>
            <CardHeader>
              <Badge style={{ alignSelf: "flex-start" }}>Workspace</Badge>
              <CardTitle>Create deployment target</CardTitle>
              <CardDescription>
                Configure a reusable environment for preview, staging, or
                production releases.
              </CardDescription>
            </CardHeader>
            <CardContent style={{ display: "grid", gap: "var(--vds-space-3)" }}>
              <InputField label="Project name" name="project" placeholder="Virtari Console" required />
              <InputField label="Region" name="region" placeholder="Frankfurt (eu-central-1)" />
              <InputField label="Domain" name="domain" placeholder="app.virtari.io" autoCapitalize="none" spellCheck={false} />
            </CardContent>
            <CardFooter style={{ justifyContent: "flex-end" }}>
              <Button type="reset" variant="ghost">Reset</Button>
              <Button type="submit">Save target</Button>
            </CardFooter>
          </Card>
          <p role="status" style={{ ...mutedTextStyle, minBlockSize: "1.5em", marginBlockStart: "var(--vds-space-2)" }}>{saved ? "Deployment target saved in this preview." : ""}</p>
        </form>
      </Section>

      <Section
        title="Variants"
        description="Surface, outline, soft, and ghost variants cover the common card treatments without ad-hoc CSS."
      >
        <div
          style={{
            ...gridStyle,
            padding: "var(--vds-space-4)",
            borderRadius: "var(--vds-radius-card)",
            background: "var(--vds-color-bg-subtle)",
          }}
        >
          <Card style={{ minInlineSize: 0 }}>
            <CardHeader>
              <CardTitle>Surface</CardTitle>
              <CardDescription>
                Default surface follows the current bordered, tonal, or elevated style.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p style={metricStyle}>98.4%</p>
              <p style={mutedTextStyle}>Pipeline success rate in the last 7 days.</p>
            </CardContent>
          </Card>

          <Card variant="outline" style={{ minInlineSize: 0 }}>
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

          <Card variant="soft" style={{ minInlineSize: 0 }}>
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

          <Card variant="ghost" style={{ minInlineSize: 0 }}>
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
        description="Header, content, and footer slots own their padding. Content-only cards keep both outer insets, and sizes adapt to the viewport."
      >
        <div style={gridStyle}>
          <Card size="sm">
            <CardContent>
              <Badge style={{ alignSelf: "flex-start" }}>SM</Badge>
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
              <Badge style={{ alignSelf: "flex-start" }}>MD</Badge>
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
              <Badge style={{ alignSelf: "flex-start" }}>LG</Badge>
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
        description="Header, content, and footer compose plan summaries. These sample actions do not start a purchase."
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

          <Card variant="surface">
            <CardHeader>
              <Badge style={{ alignSelf: "flex-start" }}>Most used</Badge>
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

      <Section
        title="Nested surfaces"
        description="A nested Card follows the actual parent corner and inset, including through a content slot. Change the page's radius and surface settings to compare the shared modes."
      >
        <Card style={{ maxInlineSize: "30rem" }}>
          <CardHeader>
            <CardTitle>Workspace overview</CardTitle>
            <CardDescription>Each slot owns its padding; the root contains the surface.</CardDescription>
          </CardHeader>
          <CardContent>
            <Card size="sm">
              <CardHeader><CardTitle>Preview environment</CardTitle></CardHeader>
              <CardContent>deployment_preview_environment_with_a_long_identifier_0123456789</CardContent>
            </Card>
          </CardContent>
        </Card>
      </Section>

      <Section title="Usage" description="Card remains a div. The interactive prop adds hover and focus styling only; use a native link or button for an action, and keep the surrounding heading order appropriate for CardTitle's h3.">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@virtari-packages/react-card";
import { Button } from "@virtari-packages/react-button";
import "@virtari-packages/core";
import "@virtari-packages/tokens";
import "@virtari-packages/react-card/styles";
import "@virtari-packages/react-button/styles";

<Card variant="outline" size="sm">
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
</Card>`} />
      </Section>
    </>
  );
}
