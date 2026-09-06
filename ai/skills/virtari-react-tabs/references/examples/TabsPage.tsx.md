# Original documentation page

Source ID: `apps/docs/src/pages/TabsPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsPanels,
  type TabsVariant,
  type TabsSize,
} from "@virtari-packages/react-tabs";
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
  collapseAt,
  swipeable,
}: {
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  animatedIndicator?: boolean;
  defaultValue?: string;
  disabledItem?: string;
  orientation?: "horizontal" | "vertical";
  collapseAt?: number;
  swipeable?: boolean;
}) {
  return (
    <Tabs
      defaultValue={defaultValue}
      orientation={orientation}
      collapseAt={collapseAt}
      swipeable={swipeable}
    >
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
        description="List sits on the start side; content fills the rest. Pass collapseAt to fold back to horizontal when the container is narrow."
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
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">
              boxed · vertical (collapseAt=520)
            </h3>
            <DemoTabs
              variant="boxed"
              orientation="vertical"
              collapseAt={520}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Carousel (mobile swipe/drag)"
        description="Wrap content in TabsPanels to enable a carousel-style sliding track. On touch devices, users can drag left/right to navigate — with rubber-banding at the edges. Desktop pointers fall back to clicking tabs."
      >
        <div className="docs-tabs-stack">
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">segmented · carousel</h3>
            <Tabs defaultValue="overview">
              <TabsList variant="segmented" fullWidth>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsPanels>
                <TabsContent value="overview">
                  <p>
                    Overview panel — high-level metrics. Swipe left on touch
                    to see Analytics.
                  </p>
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
              </TabsPanels>
            </Tabs>
          </div>

          <div className="docs-stack-item">
            <h3 className="docs-subtitle">pills · carousel</h3>
            <Tabs defaultValue="a">
              <TabsList variant="pills">
                <TabsTrigger value="a">Photos</TabsTrigger>
                <TabsTrigger value="b">Albums</TabsTrigger>
                <TabsTrigger value="c">Shared</TabsTrigger>
              </TabsList>
              <TabsPanels>
                <TabsContent value="a">
                  <p>
                    Photos — all recent captures. Try swiping to Albums on a
                    touch device.
                  </p>
                </TabsContent>
                <TabsContent value="b">
                  <p>Albums — grouped collections.</p>
                </TabsContent>
                <TabsContent value="c">
                  <p>Shared — albums shared with you.</p>
                </TabsContent>
              </TabsPanels>
            </Tabs>
          </div>
        </div>
      </Section>

      <Section
        title="Panel mounting"
        description="TabsPanels defaults to mounting every panel for seamless carousel transitions. For heavy tab content, set mountStrategy to adjacent so only the active panel and its previous/next neighbors stay mounted."
      >
        <div className="docs-tabs-stack">
          <div className="docs-stack-item">
            <h3 className="docs-subtitle">adjacent mounting</h3>
            <Tabs defaultValue="summary">
              <TabsList variant="segmented" fullWidth>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="traffic">Traffic</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="exports">Exports</TabsTrigger>
              </TabsList>
              <TabsPanels mountStrategy="adjacent">
                <TabsContent value="summary">
                  <p>Summary panel - mounted with its immediate neighbors.</p>
                </TabsContent>
                <TabsContent value="traffic">
                  <p>Traffic panel - charts or tables can initialize lazily.</p>
                </TabsContent>
                <TabsContent value="revenue">
                  <p>Revenue panel - distant panels remain unmounted.</p>
                </TabsContent>
                <TabsContent value="exports">
                  <p>Exports panel - mounted when selected or adjacent.</p>
                </TabsContent>
              </TabsPanels>
            </Tabs>
          </div>

          <pre className="docs-code">{`<TabsPanels mountStrategy="adjacent">
  <TabsContent value="summary">...</TabsContent>
  <TabsContent value="traffic">...</TabsContent>
  <TabsContent value="revenue">...</TabsContent>
  <TabsContent value="exports">...</TabsContent>
</TabsPanels>`}</pre>
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
        description="Individual triggers can be disabled; they are skipped in keyboard navigation."
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
} from "@virtari-packages/react-tabs";

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
        <pre className="docs-code">{`// Carousel panels with lazy-adjacent mounting for heavy content
<Tabs defaultValue="overview">
  <TabsList variant="segmented" fullWidth>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsPanels mountStrategy="adjacent">
    <TabsContent value="overview">...</TabsContent>
    <TabsContent value="analytics">...</TabsContent>
    <TabsContent value="reports">...</TabsContent>
  </TabsPanels>
</Tabs>`}</pre>
      </Section>
    </>
  );
}

```
