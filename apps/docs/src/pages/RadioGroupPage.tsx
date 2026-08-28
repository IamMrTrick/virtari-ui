import {
  RadioGroup,
  RadioGroupItem,
  RadioField,
  RadioCard,
  SegmentedRadio,
  SegmentedRadioItem,
  PillRadio,
  PillRadioItem,
} from "@virtari-packages/react-radio-group";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@virtari-packages/react-segmented-control";
import { Label } from "@virtari-packages/react-label";
import {
  IconUser,
  IconUsers,
  IconBuilding,
  IconList,
  IconLayoutGrid,
  IconTable,
} from "@virtari-packages/react-icons";
import { Section, Row } from "../components";

/* -------------------------------------------------------------
 * Inline force classes to statically render hover / focus states
 * in the matrix (same technique as CheckboxPage).
 * ------------------------------------------------------------- */
const StatesMatrixStyles = () => (
  <style>{`
    .rb-force-hover.vds-radio-item:not([data-state="checked"]) {
      border-color: var(--radio-border-color-hover) !important;
      background-color: var(--radio-bg-hover) !important;
    }
    .rb-force-hover.vds-radio-item[data-state="checked"] {
      background-color: var(--radio-bg-checked-hover) !important;
      border-color: var(--radio-border-color-checked-hover) !important;
    }
    .rb-force-focus.vds-radio-item {
      outline: var(--radio-focus-ring-width) solid var(--radio-focus-ring-color) !important;
      outline-offset: var(--radio-focus-ring-offset) !important;
    }
    .rb-card-force-hover.vds-radio-card:not([data-disabled]) {
      background-color: var(--radio-card-bg-hover) !important;
      border-color: var(--radio-card-border-color-hover) !important;
    }
    .rb-card-force-focus.vds-radio-card {
      outline: var(--radio-card-focus-ring-width) solid var(--radio-card-focus-ring-color) !important;
      outline-offset: var(--radio-card-focus-ring-offset) !important;
      border-color: var(--radio-card-border-color-hover) !important;
    }
  `}</style>
);

const cellStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--vds-space-2)",
  fontSize: "var(--vds-text-sm)",
  lineHeight: 1,
};

const cellLabelStyle: React.CSSProperties = {
  display: "inline-block",
  lineHeight: 1,
  transform: "translateY(calc(var(--vds-control-optical-offset, 0.09375rem) + 0.03125rem))",
};

const columnStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--vds-space-2)",
  alignItems: "flex-start",
  minWidth: "6rem",
};

const columnHeaderStyle: React.CSSProperties = {
  fontSize: "var(--vds-text-2xs, 0.6875rem)",
  fontWeight: "var(--vds-font-weight-semibold)",
  color: "var(--vds-color-text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const rowLabelStyle: React.CSSProperties = {
  fontSize: "var(--vds-text-2xs, 0.6875rem)",
  fontWeight: "var(--vds-font-weight-semibold)",
  color: "var(--vds-color-text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBlockEnd: "var(--vds-space-3)",
  display: "block",
};

const groupRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "var(--vds-space-8)",
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const cardFrame: React.CSSProperties = {
  padding: "var(--vds-space-4)",
  border: "1px solid var(--vds-color-border)",
  borderRadius: "var(--vds-radius-card)",
  background: "var(--vds-color-surface)",
  flex: 1,
  minWidth: "18rem",
};

/* -------------------------------------------------------------
 * States matrix — unchecked/checked × default/hover/focus/disabled/error/error+focus
 * Each cell wraps a tiny standalone RadioGroup so keyboard
 * semantics stay valid even for single-item demos.
 * ------------------------------------------------------------- */
type StateRowProps = {
  heading: string;
  checked?: boolean;
};

function SingleRadio({
  checked = false,
  className,
  disabled,
  error,
  id,
}: {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  id: string;
}) {
  return (
    <RadioGroup
      defaultValue={checked ? "on" : undefined}
      aria-label="demo"
      disabled={disabled}
    >
      <RadioGroupItem
        value="on"
        id={id}
        className={className}
        error={error}
      />
    </RadioGroup>
  );
}

function StateRow({ heading, checked = false }: StateRowProps) {
  const suffix = checked ? "c" : "u";
  return (
    <div>
      <span style={rowLabelStyle}>{heading}</span>
      <div style={groupRowStyle}>
        <div style={columnStyle}>
          <span style={columnHeaderStyle}>Default</span>
          <div style={cellStyle}>
            <SingleRadio checked={checked} id={`r-${suffix}-d`} />
            <label htmlFor={`r-${suffix}-d`} style={cellLabelStyle}>
              Label
            </label>
          </div>
        </div>
        <div style={columnStyle}>
          <span style={columnHeaderStyle}>Hover</span>
          <div style={cellStyle}>
            <SingleRadio
              checked={checked}
              className="rb-force-hover"
              id={`r-${suffix}-h`}
            />
            <label htmlFor={`r-${suffix}-h`} style={cellLabelStyle}>
              Label
            </label>
          </div>
        </div>
        <div style={columnStyle}>
          <span style={columnHeaderStyle}>Focus</span>
          <div style={cellStyle}>
            <SingleRadio
              checked={checked}
              className="rb-force-focus"
              id={`r-${suffix}-f`}
            />
            <label htmlFor={`r-${suffix}-f`} style={cellLabelStyle}>
              Label
            </label>
          </div>
        </div>
        <div style={columnStyle}>
          <span style={columnHeaderStyle}>Disabled</span>
          <div style={cellStyle}>
            <SingleRadio checked={checked} disabled id={`r-${suffix}-dis`} />
            <label
              htmlFor={`r-${suffix}-dis`}
              style={{
                ...cellLabelStyle,
                color: "var(--vds-color-text-muted)",
              }}
            >
              Label
            </label>
          </div>
        </div>
        <div style={columnStyle}>
          <span style={columnHeaderStyle}>Error</span>
          <div style={cellStyle}>
            <SingleRadio checked={checked} error id={`r-${suffix}-e`} />
            <label htmlFor={`r-${suffix}-e`} style={cellLabelStyle}>
              Label
            </label>
          </div>
        </div>
        <div style={columnStyle}>
          <span style={columnHeaderStyle}>Error + Focus</span>
          <div style={cellStyle}>
            <SingleRadio
              checked={checked}
              error
              className="rb-force-focus"
              id={`r-${suffix}-ef`}
            />
            <label htmlFor={`r-${suffix}-ef`} style={cellLabelStyle}>
              Label
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Card state matrix (row layout)
 * ------------------------------------------------------------- */
function CardStatesDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-3)",
        minWidth: "20rem",
        flex: 1,
      }}
    >
      <RadioGroup defaultValue="selected" aria-label="Card states">
        <RadioCard
          value="default"
          label="Default"
          description="Resting state"
        />
        <RadioCard
          value="hover"
          label="Hover"
          description="Mouse over state"
          labelProps={{ className: "rb-card-force-hover" }}
        />
        <RadioCard
          value="selected"
          label="Selected"
          description="Active selection"
        />
        <RadioCard
          value="focus"
          label="Focus"
          description="Keyboard focus state"
          labelProps={{ className: "rb-card-force-focus" }}
        />
        <RadioCard
          value="disabled"
          label="Disabled"
          description="Not interactive"
          disabled
        />
      </RadioGroup>

      <RadioGroup
        defaultValue="error"
        aria-label="Card error"
        error=" "
      >
        <RadioCard
          value="error"
          label="Error"
          description="Validation error state"
        />
      </RadioGroup>
    </div>
  );
}

/* -------------------------------------------------------------
 * Page
 * ------------------------------------------------------------- */
export function RadioGroupPage() {
  return (
    <>
      <StatesMatrixStyles />

      <Section
        title="States"
        description="All interactive states of the radio button component across unchecked and checked variants."
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--vds-space-6)",
          }}
        >
          <StateRow heading="Unchecked" />
          <StateRow heading="Checked" checked />
        </div>
      </Section>

      <Section
        title="Radio Group — Vertical"
        description="Vertical layout is the default and recommended for more than 3 options."
      >
        <div style={groupRowStyle}>
          <div style={cardFrame}>
            <span style={rowLabelStyle}>Default group</span>
            <RadioGroup
              defaultValue="email"
              label="Notification preference"
              description="Choose how you'd like to receive notifications"
            >
              <RadioField
                value="email"
                label="Email notifications"
                description="Get notified via email"
              />
              <RadioField
                value="sms"
                label="SMS notifications"
                description="Get notified via text message"
              />
              <RadioField
                value="push"
                label="Push notifications"
                description="Get notified via mobile push"
              />
              <RadioField
                value="slack"
                label="Slack notifications"
                description="Coming soon"
                disabled
              />
            </RadioGroup>
          </div>

          <div style={cardFrame}>
            <span style={rowLabelStyle}>Error state group</span>
            <RadioGroup
              label="Payment method"
              description="Select your preferred payment method"
              required
              error="Please select a payment method"
            >
              <RadioField value="credit" label="Credit card" />
              <RadioField value="debit" label="Debit card" />
              <RadioField value="bank" label="Bank transfer" />
            </RadioGroup>
          </div>
        </div>
      </Section>

      <Section
        title="Radio Group — Horizontal"
        description="Horizontal layout for compact option sets with short labels (2–4 options recommended)."
      >
        <div style={groupRowStyle}>
          <div style={cardFrame}>
            <span style={rowLabelStyle}>Horizontal layout</span>
            <RadioGroup
              defaultValue="personal"
              orientation="horizontal"
              label="Account type"
            >
              <RadioField value="personal" label="Personal" />
              <RadioField value="business" label="Business" />
              <RadioField value="enterprise" label="Enterprise" />
            </RadioGroup>
          </div>

          <div style={{ ...cardFrame, display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
            <span style={rowLabelStyle}>Horizontal — all sizes</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)" }}>
              <div>
                <span style={columnHeaderStyle}>Small</span>
                <RadioGroup
                  defaultValue="a"
                  orientation="horizontal"
                  size="sm"
                  aria-label="Small size group"
                >
                  <RadioField value="a" label="Option A" />
                  <RadioField value="b" label="Option B" />
                  <RadioField value="c" label="Option C" />
                </RadioGroup>
              </div>
              <div>
                <span style={columnHeaderStyle}>Medium</span>
                <RadioGroup
                  defaultValue="a"
                  orientation="horizontal"
                  size="md"
                  aria-label="Medium size group"
                >
                  <RadioField value="a" label="Option A" />
                  <RadioField value="b" label="Option B" />
                  <RadioField value="c" label="Option C" />
                </RadioGroup>
              </div>
              <div>
                <span style={columnHeaderStyle}>Large</span>
                <RadioGroup
                  defaultValue="a"
                  orientation="horizontal"
                  size="lg"
                  aria-label="Large size group"
                >
                  <RadioField value="a" label="Option A" />
                  <RadioField value="b" label="Option B" />
                  <RadioField value="c" label="Option C" />
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Radio Cards"
        description="Card-style radio buttons for richer selections such as plans, configurations, and feature choices."
      >
        <div style={groupRowStyle}>
          <div style={{ ...cardFrame, maxWidth: "32rem" }}>
            <span style={rowLabelStyle}>Basic card</span>
            <span
              style={{
                display: "block",
                fontSize: "var(--vds-text-sm)",
                fontWeight: "var(--vds-font-weight-semibold)",
                marginBlockEnd: "var(--vds-space-3)",
              }}
            >
              Select a plan
            </span>
            <RadioGroup defaultValue="starter" aria-label="Plan">
              <RadioCard
                value="starter"
                label="Starter Plan"
                description="Perfect for individuals getting started"
                trailing="$9/mo"
              />
              <RadioCard
                value="pro"
                label="Pro Plan"
                description="Best for growing teams and businesses"
                trailing="$29/mo"
                badge="Most popular"
              />
              <RadioCard
                value="enterprise"
                label="Enterprise"
                description="Custom solutions for large organizations"
                trailing="Custom"
              />
            </RadioGroup>
          </div>

          <div style={{ ...cardFrame, maxWidth: "32rem" }}>
            <span style={rowLabelStyle}>Card states</span>
            <CardStatesDemo />
          </div>
        </div>
      </Section>

      <Section
        title="Radio Cards — Icon Grid"
        description="Horizontal card layout with icons for visual category selection."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
          <span
            style={{
              fontSize: "var(--vds-text-sm)",
              fontWeight: "var(--vds-font-weight-semibold)",
            }}
          >
            Choose your workspace
          </span>
          <span
            style={{
              fontSize: "var(--vds-text-xs)",
              color: "var(--vds-color-text-muted)",
              marginBlockEnd: "var(--vds-space-2)",
            }}
          >
            Select the type of workspace that best fits your needs
          </span>
          <RadioGroup
            defaultValue="personal"
            orientation="horizontal"
            aria-label="Workspace type"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--vds-space-3)",
                inlineSize: "100%",
              }}
            >
              <RadioCard
                value="personal"
                layout="icon-grid"
                icon={<IconUser />}
                label="Personal"
                description="For individual use"
              />
              <RadioCard
                value="team"
                layout="icon-grid"
                icon={<IconUsers />}
                label="Team"
                description="For small teams"
              />
              <RadioCard
                value="org"
                layout="icon-grid"
                icon={<IconBuilding />}
                label="Organization"
                description="For enterprises"
              />
            </div>
          </RadioGroup>
        </div>
      </Section>

      <Section
        title="Segmented Radio (Button Group)"
        description="Compact toggle-style radio buttons for mutually exclusive options within toolbars and compact UIs."
      >
        <div style={groupRowStyle}>
          <div style={cardFrame}>
            <span style={rowLabelStyle}>Small</span>
            <SegmentedRadio
              size="sm"
              defaultValue="daily"
              aria-label="Range — small"
            >
              <SegmentedRadioItem value="daily">Daily</SegmentedRadioItem>
              <SegmentedRadioItem value="weekly">Weekly</SegmentedRadioItem>
              <SegmentedRadioItem value="monthly">Monthly</SegmentedRadioItem>
              <SegmentedRadioItem value="yearly">Yearly</SegmentedRadioItem>
            </SegmentedRadio>
          </div>

          <div style={cardFrame}>
            <span style={rowLabelStyle}>Medium (default)</span>
            <SegmentedRadio
              size="md"
              defaultValue="daily"
              aria-label="Range — medium"
            >
              <SegmentedRadioItem value="daily">Daily</SegmentedRadioItem>
              <SegmentedRadioItem value="weekly">Weekly</SegmentedRadioItem>
              <SegmentedRadioItem value="monthly">Monthly</SegmentedRadioItem>
              <SegmentedRadioItem value="yearly">Yearly</SegmentedRadioItem>
            </SegmentedRadio>
          </div>

          <div style={cardFrame}>
            <span style={rowLabelStyle}>Large</span>
            <SegmentedRadio
              size="lg"
              defaultValue="daily"
              aria-label="Range — large"
            >
              <SegmentedRadioItem value="daily">Daily</SegmentedRadioItem>
              <SegmentedRadioItem value="weekly">Weekly</SegmentedRadioItem>
              <SegmentedRadioItem value="monthly">Monthly</SegmentedRadioItem>
              <SegmentedRadioItem value="yearly">Yearly</SegmentedRadioItem>
            </SegmentedRadio>
          </div>
        </div>
      </Section>

      <Section
        title="Pill Radio"
        description="Rounded pill-shaped selectors for tags, filters, and categorical selection."
      >
        <div style={groupRowStyle}>
          <div style={cardFrame}>
            <span style={rowLabelStyle}>Category filter</span>
            <Label style={{ display: "block", marginBlockEnd: "var(--vds-space-2)" }}>
              Category
            </Label>
            <PillRadio defaultValue="all" aria-label="Category">
              <PillRadioItem value="all">All</PillRadioItem>
              <PillRadioItem value="design">Design</PillRadioItem>
              <PillRadioItem value="development">Development</PillRadioItem>
              <PillRadioItem value="marketing">Marketing</PillRadioItem>
              <PillRadioItem value="sales">Sales</PillRadioItem>
            </PillRadio>
          </div>

          <div style={cardFrame}>
            <span style={rowLabelStyle}>Size selection</span>
            <Label style={{ display: "block", marginBlockEnd: "var(--vds-space-2)" }}>
              Size
            </Label>
            <PillRadio defaultValue="m" aria-label="Size">
              <PillRadioItem value="xs">XS</PillRadioItem>
              <PillRadioItem value="s">S</PillRadioItem>
              <PillRadioItem value="m">M</PillRadioItem>
              <PillRadioItem value="l">L</PillRadioItem>
              <PillRadioItem value="xl">XL</PillRadioItem>
              <PillRadioItem value="2xl">2XL</PillRadioItem>
            </PillRadio>
          </div>
        </div>
      </Section>

      <Section
        title="Rich Content Cards"
        description="Cards combining radio selection with rich detail areas for complex configuration scenarios."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)" }}>
          <span
            style={{
              fontSize: "var(--vds-text-sm)",
              fontWeight: "var(--vds-font-weight-semibold)",
            }}
          >
            Deployment region
          </span>
          <span
            style={{
              fontSize: "var(--vds-text-xs)",
              color: "var(--vds-color-text-muted)",
              marginBlockEnd: "var(--vds-space-2)",
            }}
          >
            Select the region closest to your primary user base for optimal performance
          </span>
          <RadioGroup defaultValue="us-east" aria-label="Deployment region">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
                gap: "var(--vds-space-3)",
              }}
            >
              <RadioCard value="us-east">
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)", minInlineSize: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
                    <span style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)" }}>
                      US East (Virginia)
                    </span>
                    <span
                      style={{
                        fontSize: "var(--vds-text-2xs, 0.6875rem)",
                        fontWeight: "var(--vds-font-weight-semibold)",
                        color: "var(--vds-color-success-text, oklch(0.4 0.12 155))",
                        textTransform: "uppercase",
                      }}
                    >
                      Recommended
                    </span>
                  </div>
                  <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                    Lowest latency for North American users. 99.99% uptime SLA.
                  </span>
                  <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                    Latency: <strong style={{ color: "var(--vds-color-success-text, oklch(0.4 0.12 155))" }}>12ms</strong>
                    &nbsp;·&nbsp;Status: <strong style={{ color: "var(--vds-color-success-text, oklch(0.4 0.12 155))" }}>Healthy</strong>
                  </span>
                </div>
              </RadioCard>

              <RadioCard value="eu-west">
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)", minInlineSize: 0 }}>
                  <span style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)" }}>
                    EU West (Ireland)
                  </span>
                  <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                    GDPR-compliant region for European users. 99.95% uptime SLA.
                  </span>
                  <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                    Latency: <strong style={{ color: "var(--vds-color-warning-text, oklch(0.5 0.12 85))" }}>45ms</strong>
                    &nbsp;·&nbsp;Status: <strong style={{ color: "var(--vds-color-success-text, oklch(0.4 0.12 155))" }}>Healthy</strong>
                  </span>
                </div>
              </RadioCard>

              <RadioCard value="ap-southeast">
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)", minInlineSize: 0 }}>
                  <span style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)" }}>
                    AP Southeast (Singapore)
                  </span>
                  <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                    Best performance for Asia-Pacific region users.
                  </span>
                  <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                    Latency: <strong style={{ color: "var(--vds-color-warning-text, oklch(0.5 0.12 85))" }}>78ms</strong>
                    &nbsp;·&nbsp;Status: <strong style={{ color: "var(--vds-color-success-text, oklch(0.4 0.12 155))" }}>Healthy</strong>
                  </span>
                </div>
              </RadioCard>

              <RadioCard value="sa-east" disabled>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)", minInlineSize: 0 }}>
                  <span style={{ fontSize: "var(--vds-text-sm)", fontWeight: "var(--vds-font-weight-semibold)" }}>
                    SA East (São Paulo)
                  </span>
                  <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                    Currently under maintenance. Available soon.
                  </span>
                  <span style={{ fontSize: "var(--vds-text-xs)", color: "var(--vds-color-text-muted)" }}>
                    Latency: —&nbsp;·&nbsp;Status:&nbsp;
                    <strong style={{ color: "var(--vds-color-danger-text, oklch(0.45 0.17 25))" }}>
                      Maintenance
                    </strong>
                  </span>
                </div>
              </RadioCard>
            </div>
          </RadioGroup>
        </div>
      </Section>

      <Section
        title="Segmented Control"
        description="Standalone segmented control built on the Virtari RadioGroup primitive — three sizes, full-width, vertical orientation, icon support, and keyboard navigation."
      >
        <div style={groupRowStyle}>
          <div style={cardFrame}>
            <span style={rowLabelStyle}>Sizes</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
              {(["sm", "md", "lg"] as const).map((size) => (
                <div key={size} style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-1)" }}>
                  <span style={columnHeaderStyle}>{size}</span>
                  <SegmentedControl size={size} defaultValue="list" aria-label={`View — ${size}`}>
                    <SegmentedControlItem value="list" icon={<IconList />}>List</SegmentedControlItem>
                    <SegmentedControlItem value="grid" icon={<IconLayoutGrid />}>Grid</SegmentedControlItem>
                    <SegmentedControlItem value="table" icon={<IconTable />}>Table</SegmentedControlItem>
                  </SegmentedControl>
                </div>
              ))}
            </div>
          </div>

          <div style={cardFrame}>
            <span style={rowLabelStyle}>Full width + Disabled</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-4)" }}>
              <SegmentedControl defaultValue="weekly" aria-label="Range — full width" fullWidth>
                <SegmentedControlItem value="daily">Daily</SegmentedControlItem>
                <SegmentedControlItem value="weekly">Weekly</SegmentedControlItem>
                <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
                <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
              </SegmentedControl>
              <SegmentedControl defaultValue="weekly" aria-label="Range — disabled" fullWidth disabled>
                <SegmentedControlItem value="daily">Daily</SegmentedControlItem>
                <SegmentedControlItem value="weekly">Weekly</SegmentedControlItem>
                <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
                <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
              </SegmentedControl>
            </div>
          </div>

          <div style={cardFrame}>
            <span style={rowLabelStyle}>Vertical</span>
            <SegmentedControl defaultValue="personal" orientation="vertical" aria-label="Account type">
              <SegmentedControlItem value="personal" icon={<IconUser />}>Personal</SegmentedControlItem>
              <SegmentedControlItem value="team" icon={<IconUsers />}>Team</SegmentedControlItem>
              <SegmentedControlItem value="org" icon={<IconBuilding />}>Organization</SegmentedControlItem>
            </SegmentedControl>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  RadioGroup,
  RadioField,
  RadioCard,
  SegmentedRadio,
  SegmentedRadioItem,
  PillRadio,
  PillRadioItem,
} from "@virtari-packages/react-radio-group";

// Basic group with label + error
<RadioGroup
  label="Payment method"
  description="Select your preferred payment method"
  required
  error="Please select a payment method"
  defaultValue="credit"
>
  <RadioField value="credit" label="Credit card" />
  <RadioField value="debit" label="Debit card" />
  <RadioField value="bank" label="Bank transfer" />
</RadioGroup>

// Cards (auto icon-grid when icon is provided)
<RadioGroup defaultValue="personal">
  <RadioCard value="personal" icon={<IconUser />} label="Personal" description="For individual use" />
  <RadioCard value="team" icon={<IconUsers />} label="Team" description="For small teams" />
</RadioGroup>

// Segmented toolbar
<SegmentedRadio size="md" defaultValue="weekly">
  <SegmentedRadioItem value="daily">Daily</SegmentedRadioItem>
  <SegmentedRadioItem value="weekly">Weekly</SegmentedRadioItem>
  <SegmentedRadioItem value="monthly">Monthly</SegmentedRadioItem>
</SegmentedRadio>

// Pill filter
<PillRadio defaultValue="all">
  <PillRadioItem value="all">All</PillRadioItem>
  <PillRadioItem value="design">Design</PillRadioItem>
  <PillRadioItem value="dev">Development</PillRadioItem>
</PillRadio>`}</pre>
      </Section>
    </>
  );
}
