import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsVariant,
  type TabsSize,
} from "@virtari/react-tabs";
import { Section } from "../components";

const VARIANTS: TabsVariant[] = [
  "underline",
  "line",
  "pills",
  "segmented",
  "boxed",
  "bordered",
  "solid",
  "soft",
  "ghost",
];

const SIZES: TabsSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];

function DemoTabs({
  variant,
  size,
  fullWidth,
  animatedIndicator,
  defaultValue = "overview",
  disabledItem,
  orientation,
}: {
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  animatedIndicator?: boolean;
  defaultValue?: string;
  disabledItem?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <Tabs defaultValue={defaultValue} orientation={orientation}>
      <TabsList
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        animatedIndicator={animatedIndicator}
      >
        <TabsTrigger value="overview" disabled={disabledItem === "overview"}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" disabled={disabledItem === "analytics"}>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports" disabled={disabledItem === "reports"}>
          Reports
        </TabsTrigger>
        <TabsTrigger value="settings" disabled={disabledItem === "settings"}>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p>Overview panel — high-level metrics and recent activity.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p>Analytics panel — charts, funnels, retention cohorts.</p>
      </TabsContent>
      <TabsContent value="reports">
        <p>Reports panel — exports, scheduled deliveries.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>Settings panel — preferences and integrations.</p>
      </TabsContent>
    </Tabs>
  );
}

export function TabsPage() {
  const [animated, setAnimated] = useState(true);

  return (
    <>
      <Section
        title="Variants"
        description="Nine appearance styles covering the industry standards."
      >
        <div className="docs-tabs-stack">
          {VARIANTS.map((v) => (
            <div key={v} className="docs-stack-item">
              <h3 className="docs-subtitle">{v}</h3>
              <DemoTabs variant={v} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Seven-tier ramp shared with Button / Select / Input."
      >
        <div className="docs-tabs-stack">
          {SIZES.map((s) => (
            <div key={s} className="docs-stack-item">
              <h3 className="docs-subtitle">{s}</h3>
              <DemoTabs variant="pills" size={s} />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Vertical orientation"
        description="Works across every variant. List border and indicator flip to the inline axis."
      >
        <div className="docs-tabs-stack">
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">underline · vertical</h3>
            <DemoTabs variant="underline" orientation="vertical" />
          </div>
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">pills · vertical</h3>
            <DemoTabs variant="pills" orientation="vertical" />
          </div>
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">segmented · vertical</h3>
            <DemoTabs variant="segmented" orientation="vertical" />
          </div>
        </div>
      </Section>

      <Section
        title="Full-width"
        description="Triggers distribute equally across the list's inline size."
      >
        <div className="docs-tabs-stack">
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">segmented · fullWidth</h3>
            <DemoTabs variant="segmented" fullWidth />
          </div>
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">underline · fullWidth</h3>
            <DemoTabs variant="underline" fullWidth />
          </div>
        </div>
      </Section>

      <Section
        title="Disabled"
        description="Individual triggers can be disabled; Radix skips them in keyboard navigation."
      >
        <div className="docs-tabs-stack">
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">underline · disabled item</h3>
            <DemoTabs variant="underline" disabledItem="reports" />
          </div>
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">solid · disabled item</h3>
            <DemoTabs variant="solid" disabledItem="analytics" />
          </div>
        </div>
      </Section>

      <Section
        title="Animated indicator"
        description="A sliding indicator follows the active trigger on underline / line / pills / segmented. Toggle to compare."
      >
        <div className="docs-tabs-stack">
          <label className="docs-inline-field">
            <input
              type="checkbox"
              checked={animated}
              onChange={(e) => setAnimated(e.target.checked)}
            />
            <span>animatedIndicator = {String(animated)}</span>
          </label>
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">underline</h3>
            <DemoTabs variant="underline" animatedIndicator={animated} />
          </div>
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">pills</h3>
            <DemoTabs variant="pills" animatedIndicator={animated} />
          </div>
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">segmented</h3>
            <DemoTabs variant="segmented" animatedIndicator={animated} />
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@virtari/react-tabs";

<Tabs defaultValue="overview">
  <TabsList variant="pills" size="md">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="analytics">...</TabsContent>
  <TabsContent value="settings">...</TabsContent>
</Tabs>`}</pre>
      </Section>
    </>
  );
}
