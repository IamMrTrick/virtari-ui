# Original documentation page

Source ID: `apps/docs/src/pages/StepperPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState, type ComponentType, type CSSProperties } from "react";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconCreditCard,
  IconFileCheck,
  IconId,
  IconPackage,
  IconReceipt,
  IconRocket,
  IconShieldCheck,
  IconTruckDelivery,
  IconUserCheck,
} from "@tabler/icons-react";
import {
  Stepper,
  StepperStep,
  type StepperAnimation,
  type StepperLine,
  type StepperTone,
  type StepperVariant,
} from "@virtari-packages/react-stepper";
import "@virtari-packages/react-stepper/styles";
import "@virtari-packages/react-stepper/tokens";
import { Button } from "@virtari-packages/react-button";
import { Section } from "../components";

type IconComponent = ComponentType<{
  size?: number;
  stroke?: number;
  "aria-hidden"?: boolean;
}>;

function StepIcon({ icon: Icon }: { icon: IconComponent }) {
  return <Icon size={16} stroke={2.2} aria-hidden />;
}

const onboardingSteps = [
  [IconId, "Account", "Verify identity"],
  [IconUserCheck, "Profile", "Complete details"],
  [IconCreditCard, "Billing", "Add payment"],
  [IconRocket, "Launch", "Start workspace"],
] as const;

const shippingSteps = [
  [IconReceipt, "Order", "Payment captured"],
  [IconPackage, "Packing", "Ready for carrier"],
  [IconTruckDelivery, "Shipping", "In transit"],
  [IconCircleCheck, "Delivered", "Completed"],
] as const;

export function StepperPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <Section
        title="Interactive Card Stepper"
        description="A polished default for product setup flows, with gradient progress and a soft active pulse."
      >
        <div style={showcaseFrameStyle}>
          <Stepper
            activeStep={activeStep}
            variant="cards"
            tone="primary"
            line="gradient"
            animation="pulse"
            aria-label="Workspace setup"
          >
            {onboardingSteps.map(([icon, label, description]) => (
              <StepperStep
                key={label}
                label={label}
                description={description}
                indicator={<StepIcon icon={icon} />}
              />
            ))}
          </Stepper>
        </div>

        <div style={actionsStyle}>
          <Button
            variant="outline"
            size="sm"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
          >
            Back
          </Button>
          <Button
            size="sm"
            disabled={activeStep === onboardingSteps.length - 1}
            onClick={() => setActiveStep((step) => Math.min(onboardingSteps.length - 1, step + 1))}
          >
            Next
          </Button>
        </div>
      </Section>

      <Section
        title="Soft Fulfillment"
        description="Softer surfaces and semantic tones keep operational progress calm without losing state clarity."
      >
        <div style={showcaseFrameStyle}>
          <Stepper activeStep={2} variant="soft" tone="success" animation="scale" aria-label="Order fulfillment">
            {shippingSteps.map(([icon, label, description]) => (
              <StepperStep
                key={label}
                label={label}
                description={description}
                indicator={<StepIcon icon={icon} />}
              />
            ))}
          </Stepper>
        </div>
      </Section>

      <Section
        title="Variants"
        description="Choose a visual weight per context: default, soft, outlined, minimal, or cards."
      >
        <div style={variantGridStyle}>
          {variantExamples.map((example) => (
            <div key={example.variant} style={panelStyle}>
              <div style={panelHeaderStyle}>
                <span style={panelTitleStyle}>{example.variant}</span>
                <span style={panelMetaStyle}>{example.tone}</span>
              </div>
              <Stepper
                activeStep={1}
                size="sm"
                variant={example.variant}
                tone={example.tone}
                line={example.line}
                animation={example.animation}
                aria-label={`${example.variant} stepper`}
              >
                <StepperStep label="Draft" />
                <StepperStep label="Review" />
                <StepperStep label="Ship" />
              </Stepper>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Animation Presets"
        description="Animations are opt-in per Stepper and still respect prefers-reduced-motion."
      >
        <div style={animationGridStyle}>
          {animationExamples.map((animation) => (
            <div key={animation} style={compactPanelStyle}>
              <span style={panelTitleStyle}>{animation}</span>
              <Stepper
                activeStep={1}
                size="sm"
                variant="outlined"
                tone="info"
                animation={animation}
                aria-label={`${animation} animation`}
              >
                <StepperStep label="Plan" />
                <StepperStep label="Build" />
                <StepperStep label="Review" />
              </Stepper>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Vertical"
        description="Vertical steppers support richer copy, dashed lines, cards, and custom indicators."
      >
        <div style={verticalFrameStyle}>
          <Stepper
            activeStep={1}
            orientation="vertical"
            variant="cards"
            tone="accent"
            line="dashed"
            animation="fade"
            aria-label="Security review"
          >
            <StepperStep label="Submitted" description="Request received" indicator={<StepIcon icon={IconFileCheck} />} />
            <StepperStep label="Security review" description="Policy checks are running" indicator={<StepIcon icon={IconShieldCheck} />} />
            <StepperStep label="Needs update" description="Missing compliance attachment" status="error" indicator={<StepIcon icon={IconAlertTriangle} />} />
            <StepperStep label="Approved" description="Ready to publish" indicator={<StepIcon icon={IconCircleCheck} />} />
          </Stepper>
        </div>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Stepper, StepperStep } from "@virtari-packages/react-stepper";
import "@virtari-packages/react-stepper/styles";

<Stepper
  activeStep={activeStep}
  orientation="horizontal"      // horizontal | vertical
  size="md"                     // sm | md | lg
  variant="cards"               // default | soft | outlined | minimal | cards
  tone="primary"                // neutral | primary | success | warning | danger | info | accent
  line="gradient"               // solid | dashed | gradient
  animation="pulse"             // none | fade | slide | scale | pulse
>
  <StepperStep label="Account" description="Verify identity" />
  <StepperStep label="Profile" description="Complete details" />
  <StepperStep label="Launch" />
</Stepper>`} />
      </Section>

      <Section title="Props">
        <VirtariCodeBlock renderer="static" language="tsx" code={`interface StepperProps {
  activeStep: number;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "soft" | "outlined" | "minimal" | "cards";
  tone?: "neutral" | "primary" | "success" | "warning" | "danger" | "info" | "accent";
  line?: "solid" | "dashed" | "gradient";
  animation?: "none" | "fade" | "slide" | "scale" | "pulse";
}

interface StepperStepProps {
  label: string;
  description?: string;
  indicator?: React.ReactNode;
  status?: "complete" | "active" | "pending" | "error";
}`} />
      </Section>
    </>
  );
}

const variantExamples: Array<{
  variant: StepperVariant;
  tone: StepperTone;
  line: StepperLine;
  animation: StepperAnimation;
}> = [
  { variant: "default", tone: "primary", line: "solid", animation: "slide" },
  { variant: "soft", tone: "success", line: "solid", animation: "scale" },
  { variant: "outlined", tone: "info", line: "dashed", animation: "fade" },
  { variant: "minimal", tone: "neutral", line: "solid", animation: "none" },
  { variant: "cards", tone: "accent", line: "gradient", animation: "pulse" },
];

const animationExamples: StepperAnimation[] = ["none", "fade", "slide", "scale", "pulse"];

const showcaseFrameStyle: CSSProperties = {
  boxSizing: "border-box",
  inlineSize: "100%",
  minInlineSize: 0,
  padding: "var(--vds-space-5)",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-card)",
  background:
    "linear-gradient(180deg, var(--vds-color-surface), var(--vds-color-bg-subtle))",
  boxShadow: "var(--vds-shadow-sm)",
  overflow: "hidden",
};

const actionsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "var(--vds-space-3)",
};

const variantGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
  gap: "var(--vds-space-4)",
  alignItems: "stretch",
};

const animationGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
  gap: "var(--vds-space-4)",
};

const panelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--vds-space-4)",
  minInlineSize: 0,
  padding: "var(--vds-space-4)",
  border: "1px solid var(--vds-color-border-muted)",
  borderRadius: "var(--vds-radius-card)",
  background: "var(--vds-color-surface)",
  boxShadow: "var(--vds-shadow-xs)",
  overflow: "hidden",
};

const compactPanelStyle: CSSProperties = {
  ...panelStyle,
  gap: "var(--vds-space-3)",
};

const panelHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--vds-space-3)",
};

const panelTitleStyle: CSSProperties = {
  color: "var(--vds-color-text)",
  fontSize: "var(--vds-text-sm)",
  fontWeight: "var(--vds-font-weight-semibold)",
  textTransform: "capitalize",
};

const panelMetaStyle: CSSProperties = {
  color: "var(--vds-color-text-muted)",
  fontSize: "var(--vds-text-xs)",
};

const verticalFrameStyle: CSSProperties = {
  ...showcaseFrameStyle,
  maxInlineSize: "32rem",
};

```
