import { Section, Row, Stack } from "../components";
import { Button } from "@virtari-packages/react-button";
import { Input } from "@virtari-packages/react-input";
import { Badge } from "@virtari-packages/react-badge";
import { Spinner } from "@virtari-packages/react-spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@virtari-packages/react-tabs";

const WEIGHTS = [
  { value: 400, label: "Normal 400" },
  { value: 500, label: "Medium 500" },
  { value: 600, label: "Semibold 600" },
  { value: 700, label: "Bold 700" },
];

const SAMPLE_FA = "طراحی سیستم برای کاربران فارسی‌زبان با فونت وزیرمتن";
const SAMPLE_AR = "نظام تصميم متعدد اللغات يدعم النص من اليمين إلى اليسار";
const SAMPLE_EN = "Multi-directional design system with first-class RTL support";

function DirectionFrame({
  dir,
  children,
}: {
  dir: "ltr" | "rtl";
  children: React.ReactNode;
}) {
  return (
    <div
      dir={dir}
      style={{
        flex: 1,
        minInlineSize: 0,
        padding: "var(--vds-space-4)",
        border: "1px solid var(--vds-color-border-muted)",
        borderRadius: "var(--vds-radius-card)",
        background: "var(--vds-color-surface)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-3)",
      }}
    >
      <span
        style={{
          fontSize: "var(--vds-text-xs)",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--vds-color-text-subtle)",
        }}
      >
        {dir.toUpperCase()}
      </span>
      {children}
    </div>
  );
}

function SideBySide({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--vds-space-4)",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}

export function RTLPage() {
  return (
    <>
      <Section
        title="Overview"
        description="Virtari ships with full RTL support. Toggle the Dir switch in the header to flip the whole docs app, or inspect individual components side-by-side below."
      >
        <p className="docs-prose">
          The default font stack is <code>Vazirmatn</code> (Google Fonts) with{" "}
          <code>Inter</code> as Latin fallback and system sans as last resort. All components use
          logical CSS properties (<code>padding-inline</code>, <code>inset-inline-start</code>,{" "}
          <code>border-start-start-radius</code>, etc.) so margins, padding, and anchors
          automatically swap sides when <code>dir="rtl"</code> is applied.
        </p>
      </Section>

      <Section
        title="Font — Vazirmatn weights"
        description="All four shipped weights rendered in Persian, Arabic, and English."
      >
        <Stack>
          {WEIGHTS.map((w) => (
            <div
              key={w.value}
              style={{
                display: "grid",
                gridTemplateColumns: "8rem 1fr",
                gap: "var(--vds-space-3)",
                alignItems: "baseline",
                paddingBlock: "var(--vds-space-2)",
                borderBlockEnd: "1px solid var(--vds-color-border-muted)",
              }}
            >
              <code
                style={{
                  fontFamily: "var(--vds-font-mono)",
                  fontSize: "var(--vds-text-xs)",
                  color: "var(--vds-color-text-subtle)",
                }}
              >
                {w.label}
              </code>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontWeight: w.value, fontSize: "var(--vds-text-lg)" }} dir="rtl">
                  {SAMPLE_FA}
                </span>
                <span style={{ fontWeight: w.value, fontSize: "var(--vds-text-lg)" }} dir="rtl">
                  {SAMPLE_AR}
                </span>
                <span style={{ fontWeight: w.value, fontSize: "var(--vds-text-lg)" }}>
                  {SAMPLE_EN}
                </span>
              </div>
            </div>
          ))}
        </Stack>
      </Section>

      <Section
        title="Button + Input — side by side"
        description="Form controls in LTR vs RTL. Padding, icons, and labels flip automatically."
      >
        <SideBySide>
          <DirectionFrame dir="ltr">
            <Row>
              <Button>Save</Button>
              <Button variant="outline">Cancel</Button>
              <Badge>New</Badge>
            </Row>
            <Input placeholder="Type here…" />
          </DirectionFrame>
          <DirectionFrame dir="rtl">
            <Row>
              <Button>ذخیره</Button>
              <Button variant="outline">انصراف</Button>
              <Badge>جدید</Badge>
            </Row>
            <Input placeholder="چیزی بنویسید…" />
          </DirectionFrame>
        </SideBySide>
      </Section>

      <Section
        title="Spinner"
        description="The transparent arc of the spinner is defined on the logical inline-end edge, so it flips naturally."
      >
        <SideBySide>
          <DirectionFrame dir="ltr">
            <Row>
              <Spinner size="sm" />
              <Spinner />
              <Spinner size="lg" />
            </Row>
          </DirectionFrame>
          <DirectionFrame dir="rtl">
            <Row>
              <Spinner size="sm" />
              <Spinner />
              <Spinner size="lg" />
            </Row>
          </DirectionFrame>
        </SideBySide>
      </Section>

      <Section
        title="Tabs"
        description="Animated indicator tracks the active tab in either direction."
      >
        <SideBySide>
          <DirectionFrame dir="ltr">
            <Tabs defaultValue="one">
              <TabsList>
                <TabsTrigger value="one">Overview</TabsTrigger>
                <TabsTrigger value="two">Details</TabsTrigger>
                <TabsTrigger value="three">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="one">Overview panel</TabsContent>
              <TabsContent value="two">Details panel</TabsContent>
              <TabsContent value="three">Settings panel</TabsContent>
            </Tabs>
          </DirectionFrame>
          <DirectionFrame dir="rtl">
            <Tabs defaultValue="one">
              <TabsList>
                <TabsTrigger value="one">کلیات</TabsTrigger>
                <TabsTrigger value="two">جزئیات</TabsTrigger>
                <TabsTrigger value="three">تنظیمات</TabsTrigger>
              </TabsList>
              <TabsContent value="one">پنل کلیات</TabsContent>
              <TabsContent value="two">پنل جزئیات</TabsContent>
              <TabsContent value="three">پنل تنظیمات</TabsContent>
            </Tabs>
          </DirectionFrame>
        </SideBySide>
      </Section>

      <Section
        title="Audited components"
        description="All components were swept for physical directional properties. Icon rotations (accordion, select, dropdown) are semantic (open/closed state) and remain correct in both directions."
      >
        <ul className="docs-prose">
          <li>
            <strong>Spinner</strong> — <code>border-right-color</code> →{" "}
            <code>border-inline-end-color</code>.
          </li>
          <li>
            <strong>Drawer</strong> — <code>:dir(rtl)</code> overrides swap{" "}
            <code>transform-origin</code> and slide-transform sign for{" "}
            <code>data-direction="left|right"</code>.
          </li>
          <li>
            <strong>Toast</strong> — <code>[dir="rtl"]</code> selectors normalized to{" "}
            <code>:dir(rtl)</code>. Slide-in keyframe already had an RTL variant.
          </li>
          <li>
            <strong>Tabs</strong> — horizontal indicator uses physical <code>left</code> anchor
            paired with physical <code>translateX</code> (offsetLeft-based). Vertical uses logical
            axis and is direction-agnostic.
          </li>
          <li>
            <strong>Data Table</strong> — resize guideline uses physical <code>left</code> anchor
            paired with physical <code>translateX</code>. Keyboard arrow adjust already reads
            computed direction.
          </li>
        </ul>
      </Section>
    </>
  );
}
