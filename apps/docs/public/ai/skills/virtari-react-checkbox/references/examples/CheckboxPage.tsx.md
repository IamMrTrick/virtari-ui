# Original documentation page

Source ID: `apps/docs/src/pages/CheckboxPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useMemo, useState } from "react";
import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
  CheckboxCard,
  PillCheckbox,
  PillCheckboxItem,
} from "@virtari-packages/react-checkbox";
import {
  IconBrandSlack,
  IconMail,
  IconCalendar,
} from "@virtari-packages/react-icons";
import { Card } from "@virtari-packages/react-card";
import { Section, Row } from "../components";

/* -------------------------------------------------------------
 * Inline style helpers to simulate :hover / :focus-visible in the
 * "States" matrix so users see every combination as a static cell.
 * These classes re-apply the exact same tokens as the real state rules.
 * ------------------------------------------------------------- */
const StatesMatrixStyles = () => (
  <style>{`
    .cb-force-hover.vds-checkbox:not([data-state="checked"]):not([data-state="indeterminate"]) {
      border-color: var(--checkbox-border-color-hover) !important;
      background-color: var(--checkbox-bg-hover) !important;
    }
    .cb-force-hover.vds-checkbox[data-state="checked"],
    .cb-force-hover.vds-checkbox[data-state="indeterminate"] {
      background-color: var(--checkbox-bg-checked-hover) !important;
      border-color: var(--checkbox-border-color-checked-hover) !important;
    }
    .cb-force-focus.vds-checkbox {
      outline: var(--checkbox-focus-ring-width) solid var(--checkbox-focus-ring-color) !important;
      outline-offset: var(--checkbox-focus-ring-offset) !important;
    }
  `}</style>
);

const cellStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--vds-space-2)",
  fontSize: "var(--vds-text-sm)",
  lineHeight: 1.5,
};

const cellLabelStyle: React.CSSProperties = {
  display: "inline-block",
  lineHeight: 1.5,
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



  flex: 1,
  minWidth: "min(100%, 18rem)",
};

type CheckboxStateRowProps = {
  heading: string;
  checked?: boolean | "indeterminate";
};

function StateRow({ heading, checked }: CheckboxStateRowProps) {
  return (
    <div>
      <span style={rowLabelStyle}>{heading}</span>
      <div style={groupRowStyle}>
        {[
          { title: "Default" },
          { title: "Hover preview", className: "cb-force-hover" },
          { title: "Focus preview", className: "cb-force-focus" },
          { title: "Disabled", disabled: true },
          { title: "Error", error: true },
          { title: "Error + focus preview", error: true, className: "cb-force-focus" },
        ].map(({ title, ...props }) => (
          <div key={title} style={columnStyle}>
            <span style={columnHeaderStyle}>{title}</span>
            <CheckboxField label="Label" aria-label={`${heading}: ${title}`} defaultChecked={checked} {...props} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * Nested parent-child demo (auto-indeterminate parent)
 * ------------------------------------------------------------- */
const PERMISSIONS = [
  { id: "read", label: "Read access", description: "View files and folders" },
  { id: "write", label: "Write access", description: "Create and edit files" },
  { id: "delete", label: "Delete access", description: "Remove files and folders" },
  { id: "admin", label: "Admin access", description: "Manage users and settings" },
] as const;

type PermissionId = (typeof PERMISSIONS)[number]["id"];

function NestedPermissionsDemo() {
  const [selected, setSelected] = useState<Record<PermissionId, boolean>>({
    read: true,
    write: true,
    delete: false,
    admin: false,
  });

  const { allChecked, someChecked } = useMemo(() => {
    const values = Object.values(selected);
    return {
      allChecked: values.every(Boolean),
      someChecked: values.some(Boolean),
    };
  }, [selected]);

  const parentState: boolean | "indeterminate" = allChecked
    ? true
    : someChecked
      ? "indeterminate"
      : false;

  const toggleParent = () => {
    const next = !allChecked;
    setSelected({
      read: next,
      write: next,
      delete: next,
      admin: next,
    });
  };

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-3)",
        padding: "var(--vds-space-4)",



        flex: 1,
        minWidth: "min(100%, 18rem)",
        maxWidth: "28rem",
      }}
    >
      <span style={rowLabelStyle}>Partial selection (indeterminate parent)</span>
      <CheckboxField
        label="Select all permissions"
        checked={parentState}
        onCheckedChange={toggleParent}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--vds-space-2-5)",
          paddingInlineStart: "var(--vds-space-6)",
        }}
      >
        {PERMISSIONS.map((p) => (
          <CheckboxField
            key={p.id}
            label={p.label}
            description={p.description}
            checked={selected[p.id]}
            onCheckedChange={(checked) =>
              setSelected((prev) => ({ ...prev, [p.id]: checked === true }))
            }
          />
        ))}
      </div>
    </Card>
  );
}

const NOTIFICATIONS = [
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS" },
  { id: "push", label: "Push" },
] as const;

type NotificationId = (typeof NOTIFICATIONS)[number]["id"];

function NestedNotificationsDemo() {
  const [selected, setSelected] = useState<Record<NotificationId, boolean>>({
    email: true,
    sms: true,
    push: true,
  });

  const { allChecked, someChecked } = useMemo(() => {
    const values = Object.values(selected);
    return {
      allChecked: values.every(Boolean),
      someChecked: values.some(Boolean),
    };
  }, [selected]);

  const parentState: boolean | "indeterminate" = allChecked
    ? true
    : someChecked
      ? "indeterminate"
      : false;

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--vds-space-3)",
        padding: "var(--vds-space-4)",



        flex: 1,
        minWidth: "min(100%, 16rem)",
        maxWidth: "22rem",
      }}
    >
      <span style={rowLabelStyle}>All selected (checked parent)</span>
      <CheckboxField
        label="Select all notifications"
        checked={parentState}
        onCheckedChange={(checked) => {
          const next = checked === true;
          setSelected({ email: next, sms: next, push: next });
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--vds-space-2-5)",
          paddingInlineStart: "var(--vds-space-6)",
        }}
      >
        {NOTIFICATIONS.map((n) => (
          <CheckboxField
            key={n.id}
            label={n.label}
            checked={selected[n.id]}
            onCheckedChange={(checked) =>
              setSelected((prev) => ({ ...prev, [n.id]: checked === true }))
            }
          />
        ))}
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------
 * Page
 * ------------------------------------------------------------- */
export function CheckboxPage() {
  return (
    <>
      <StatesMatrixStyles />

      <Section
        title="States"
        description="Starting states across unchecked, checked, and indeterminate controls. Hover and focus previews are simulated; use Tab and Space to try actual keyboard interaction."
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--vds-space-6)",
          }}
        >
          <StateRow heading="Unchecked" />
          <StateRow heading="Checked" checked={true} />
          <StateRow heading="Indeterminate" checked="indeterminate" />
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Proportional scale: sm (14px), md (18px), lg (22px)."
      >
        <Row>
          <div style={cellStyle}>
            <Checkbox size="sm" id="cb-sm" />
            <label
              htmlFor="cb-sm"
              style={{ ...cellLabelStyle, fontSize: "var(--vds-text-xs)" }}
            >
              Small
            </label>
          </div>
          <div style={cellStyle}>
            <Checkbox id="cb-md" />
            <label
              htmlFor="cb-md"
              style={{ ...cellLabelStyle, fontSize: "var(--vds-text-sm)" }}
            >
              Medium (default)
            </label>
          </div>
          <div style={cellStyle}>
            <Checkbox size="lg" id="cb-lg" />
            <label
              htmlFor="cb-lg"
              style={{ ...cellLabelStyle, fontSize: "var(--vds-text-base)" }}
            >
              Large
            </label>
          </div>
        </Row>
      </Section>

      <Section
        title="Nested Checkbox (Parent-Child)"
        description="Indeterminate state for parent checkboxes when only some children are selected."
      >
        <div style={groupRowStyle}>
          <NestedPermissionsDemo />
          <NestedNotificationsDemo />
        </div>
      </Section>

      <Section
        title="Checkbox Group — Vertical"
        description="Vertical layout is the default for multi-select groups with label and helper text."
      >
        <div style={groupRowStyle}>
          <Card
            style={{
              padding: "var(--vds-space-4)",



              flex: 1,
              minWidth: "min(100%, 18rem)",
              maxWidth: "28rem",
            }}
          >
            <span style={rowLabelStyle}>Default group</span>
            <CheckboxGroup
              label="Features to enable"
              description="Select all features you want to activate"
            >
              <CheckboxField
                label="Two-factor authentication"
                description="Require a second step to sign in"
                defaultChecked
              />
              <CheckboxField
                label="Email notifications"
                description="Receive updates via email"
                defaultChecked
              />
              <CheckboxField
                label="Activity log"
                description="Track all account activity"
              />
              <CheckboxField
                label="SSO integration"
                description="Enterprise plan only"
                disabled
              />
            </CheckboxGroup>
          </Card>

          <Card
            style={{
              padding: "var(--vds-space-4)",



              flex: 1,
              minWidth: "min(100%, 18rem)",
              maxWidth: "28rem",
            }}
          >
            <span style={rowLabelStyle}>Error state group</span>
            <CheckboxGroup
              label="Terms and conditions"
              description="You must accept all required terms"
              required
              error="Please accept all required terms to continue"
            >
              <CheckboxField name="terms" value="accepted" required label="I agree to the Terms of Service" />
              <CheckboxField name="privacy" value="accepted" required label="I agree to the Privacy Policy" />
              <CheckboxField name="processing" value="accepted" required label="I accept the Data Processing Agreement" />
            </CheckboxGroup>
          </Card>
        </div>
      </Section>

      <Section
        title="Checkbox Cards"
        description="Card-style checkboxes for rich multi-select scenarios like feature selection and plan add-ons."
      >
        <div style={groupRowStyle}>
          <Card
            style={{
              padding: "var(--vds-space-4)",



              flex: 1,
              minWidth: "min(100%, 20rem)",
              maxWidth: "28rem",
            }}
          >
            <span style={rowLabelStyle}>Multi-select features</span>
            <CheckboxGroup label="Add-on features">
              <CheckboxCard
                label="Custom domain"
                description="Use your own domain name"
                trailing={
                  <>
                    +$5
                    <small style={{ color: "var(--vds-color-text-muted)" }}>
                      /mo
                    </small>
                  </>
                }
                defaultChecked
              />
              <CheckboxCard
                label="SSL certificate"
                description="Secure your site with HTTPS"
                trailing={
                  <>
                    +$3
                    <small style={{ color: "var(--vds-color-text-muted)" }}>
                      /mo
                    </small>
                  </>
                }
                badge="Recommended"
                defaultChecked
              />
              <CheckboxCard
                label="Priority support"
                description="24/7 dedicated support team"
                trailing={
                  <>
                    +$12
                    <small style={{ color: "var(--vds-color-text-muted)" }}>
                      /mo
                    </small>
                  </>
                }
              />
              <CheckboxCard
                label="Advanced analytics"
                description="Not available on your current plan"
                trailing="TBD"
                disabled
              />
            </CheckboxGroup>
          </Card>

          <Card
            style={{
              padding: "var(--vds-space-4)",



              flex: 1,
              minWidth: "min(100%, 20rem)",
              maxWidth: "28rem",
            }}
          >
            <span style={rowLabelStyle}>Card states</span>
            <CheckboxGroup aria-label="Card states">
              <CheckboxCard label="Default" description="Resting state" />
              <CheckboxCard
                label="Hover"
                description="Move the pointer over this card to preview"
              />
              <CheckboxCard
                label="Selected"
                description="Active selection"
                defaultChecked
              />
              <CheckboxCard
                label="Keyboard focus"
                description="Press Tab to focus, then Space to toggle"
              />
              <CheckboxCard
                label="Disabled"
                description="Not interactive"
                disabled
              />
              <CheckboxCard label="Error" description="Validation error state" error />
            </CheckboxGroup>
          </Card>
        </div>

      </Section>

      <Section
        title="Checkbox Cards — Icon Grid"
        description="Multi-select icon cards for visual feature or integration selection."
      >
        <div>
          <span
            style={{
              fontSize: "var(--vds-text-sm)",
              fontWeight: "var(--vds-font-weight-semibold)",
              color: "var(--vds-color-text)",
              display: "block",
              marginBlockEnd: "var(--vds-space-1)",
            }}
          >
            Integrations
          </span>
          <span
            style={{
              fontSize: "var(--vds-text-xs)",
              color: "var(--vds-color-text-muted)",
              display: "block",
              marginBlockEnd: "var(--vds-space-3)",
            }}
          >
            Select the integrations you want to connect
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 14rem), 1fr))",
              gap: "var(--vds-space-3)",
            }}
          >
            <CheckboxCard
              layout="icon-grid"
              icon={<IconBrandSlack size={20} stroke={1.75} aria-hidden />}
              label="Slack"
              description="Team messaging"
              defaultChecked
            />
            <CheckboxCard
              layout="icon-grid"
              icon={<IconMail size={20} stroke={1.75} aria-hidden />}
              label="Gmail"
              description="Email integration"
              defaultChecked
            />
            <CheckboxCard
              layout="icon-grid"
              icon={<IconCalendar size={20} stroke={1.75} aria-hidden />}
              label="Calendar"
              description="Schedule sync"
            />
          </div>
        </div>
      </Section>

      <Section
        title="Pill Checkbox"
        description="Rounded pill-shaped toggles for tags, filters, and multi-select categorical choices."
      >
        <div style={groupRowStyle}>
          <Card style={cardFrame}>
            <span style={rowLabelStyle}>Topic filters</span>
            <PillCheckbox name="topics" aria-label="Topics">
              <PillCheckboxItem value="design" defaultChecked>
                Design
              </PillCheckboxItem>
              <PillCheckboxItem value="development">Development</PillCheckboxItem>
              <PillCheckboxItem value="marketing">Marketing</PillCheckboxItem>
              <PillCheckboxItem value="sales" defaultChecked>
                Sales
              </PillCheckboxItem>
              <PillCheckboxItem value="support">Support</PillCheckboxItem>
            </PillCheckbox>
          </Card>

          <Card style={cardFrame}>
            <span style={rowLabelStyle}>Sizes</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--vds-space-4)",
              }}
            >
              <PillCheckbox size="sm" aria-label="Small">
                <PillCheckboxItem value="a" defaultChecked>
                  Small
                </PillCheckboxItem>
                <PillCheckboxItem value="b">Pill</PillCheckboxItem>
                <PillCheckboxItem value="c">Checkbox</PillCheckboxItem>
              </PillCheckbox>
              <PillCheckbox size="md" aria-label="Medium">
                <PillCheckboxItem value="a" defaultChecked>
                  Medium
                </PillCheckboxItem>
                <PillCheckboxItem value="b">Pill</PillCheckboxItem>
                <PillCheckboxItem value="c">Checkbox</PillCheckboxItem>
              </PillCheckbox>
              <PillCheckbox size="lg" aria-label="Large">
                <PillCheckboxItem value="a" defaultChecked>
                  Large
                </PillCheckboxItem>
                <PillCheckboxItem value="b">Pill</PillCheckboxItem>
                <PillCheckboxItem value="c">Checkbox</PillCheckboxItem>
              </PillCheckbox>
            </div>
          </Card>
        </div>

        <Row>
          <Card style={{ ...cardFrame, flex: "1 1 100%" }}>
            <span style={rowLabelStyle}>States</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--vds-space-3)",
              }}
            >
              <PillCheckbox aria-label="Disabled">
                <PillCheckboxItem value="a" disabled defaultChecked>
                  Disabled checked
                </PillCheckboxItem>
                <PillCheckboxItem value="b" disabled>
                  Disabled
                </PillCheckboxItem>
                <PillCheckboxItem value="c">Enabled</PillCheckboxItem>
              </PillCheckbox>

              <PillCheckbox error aria-label="Error">
                <PillCheckboxItem value="a" defaultChecked>
                  Error selected
                </PillCheckboxItem>
                <PillCheckboxItem value="b">Error unselected</PillCheckboxItem>
              </PillCheckbox>
            </div>
          </Card>
        </Row>
      </Section>

      <Section title="Usage" description="Group name is inherited by items unless overridden. Group required is an indication, not an at-least-one validator; implement that rule in your form, or mark each mandatory item required.">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
  CheckboxCard,
  PillCheckbox,
  PillCheckboxItem,
} from "@virtari-packages/react-checkbox";
import { IconBrandSlack } from "@virtari-packages/react-icons";
import "@virtari-packages/core";
import "@virtari-packages/tokens";
import "@virtari-packages/react-checkbox/styles";

// Primitive with an accessible name.
<Checkbox aria-label="Select row" defaultChecked />

// Labelled row (click anywhere on the row to toggle).
<CheckboxField label="Two-factor authentication" description="Require a second step" />

// Group — auto-propagates disabled / error to children, renders label + helper + error.
<CheckboxGroup
  label="Terms and conditions"
  description="You must accept all required terms"
  error="Please accept all required terms to continue"
  required
>
  <CheckboxField name="terms" value="accepted" required label="I agree to the Terms of Service" />
  <CheckboxField name="privacy" value="accepted" required label="I agree to the Privacy Policy" />
</CheckboxGroup>

// Card — row layout with trailing price + badge.
<CheckboxCard
  label="SSL certificate"
  description="Secure your site with HTTPS"
  trailing={<>+$3<small>/mo</small></>}
  badge="Recommended"
/>

// Card — icon-grid layout for visual pickers.
<CheckboxCard layout="icon-grid" icon={<IconBrandSlack aria-hidden />} label="Slack" description="Team messaging" />

// Pill — chip-shaped multi-select toggles for tag/filter lists.
<PillCheckbox name="topics" aria-label="Topics">
  <PillCheckboxItem value="design">Design</PillCheckboxItem>
  <PillCheckboxItem value="development">Development</PillCheckboxItem>
  <PillCheckboxItem value="marketing">Marketing</PillCheckboxItem>
</PillCheckbox>`} />
      </Section>
    </>
  );
}

```
