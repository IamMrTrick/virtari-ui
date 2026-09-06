# Original documentation page

Source ID: `apps/docs/src/pages/NumberInputPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import {
  NumberInput,
  NumberInputField,
} from "@virtari-packages/react-number-input";
import { Switch } from "@virtari-packages/react-switch";
import { Section, Row } from "../components";

function TypingPulseDemo() {
  const [pulse, setPulse] = useState(false);
  const [val, setVal] = useState<number | undefined>(0);
  return (
    <div style={{ display: "grid", gap: "var(--vds-space-4)", maxInlineSize: "28rem" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
        <Switch checked={pulse} onCheckedChange={setPulse} aria-label="Enable typing pulse" />
        <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
          Typing pulse {pulse ? "on" : "off"}
        </span>
      </label>
      <NumberInputField
        label="Stacked stepper"
        value={val}
        onChange={setVal}
        min={-999}
        max={999}
        typingPulse={pulse}
        description="Type a number — fast for a stronger ring pulse, slow for a subtle one."
      />
      <NumberInputField
        label="Inline stepper"
        stepper="inline"
        value={val}
        onChange={setVal}
        min={-999}
        max={999}
        typingPulse={pulse}
      />
    </div>
  );
}

function WheelDemo() {
  const [basic, setBasic]     = useState<number | undefined>(0);
  const [snapped, setSnapped] = useState<number | undefined>(0);
  const [locked, setLocked]   = useState<number | undefined>(50);
  const [wheelOn, setWheelOn] = useState(true);

  return (
    <div style={{ display: "grid", gap: "var(--vds-space-5)", maxInlineSize: "34rem" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
        <Switch
          checked={wheelOn}
          onCheckedChange={setWheelOn}
          aria-label="Wheel enabled"
        />
        <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
          Wheel enabled
        </span>
      </div>

      <NumberInputField
        label="Basic wheel (step = 1)"
        description="Focus the input, then scroll."
        value={basic}
        onChange={setBasic}
        min={-100}
        max={100}
        step={1}
        wheelEnabled={wheelOn}
        counter="-100 – 100"
      />

      <NumberInputField
        label="Wheel + snap (step = 5)"
        description="Value snaps to the nearest multiple of 5."
        value={snapped}
        onChange={setSnapped}
        min={0}
        max={100}
        step={5}
        wheelEnabled={wheelOn}
        wheelSnap
        counter="0 – 100"
      />

      <NumberInputField
        label="Wheel + readOnly"
        description="wheelEnabled is set but readOnly blocks changes."
        value={locked}
        onChange={setLocked}
        step={10}
        wheelEnabled={wheelOn}
        readOnly
      />

    </div>
  );
}

export function NumberInputPage() {
  const [quantity, setQuantity] = useState<number | undefined>(3);
  const [price, setPrice]       = useState<number | undefined>(1250);
  const [discount, setDiscount] = useState<number | undefined>(10);

  return (
    <>
      <Section title="Sizes" description="Uses the same size ramp as Input, Select, and Button.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-2)", maxInlineSize: "22rem" }}>
          {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
            <Row key={size}>
              <span className="docs-size-label">{size}</span>
              <NumberInput
                size={size}
                aria-label={`${size} stacked quantity`}
                value={quantity}
                onChange={setQuantity}
                min={0}
                max={99}
              />
            </Row>
          ))}
        </div>
      </Section>

      <Section
        title="Stepper variants"
        description={`"stacked" places chevrons on the trailing edge (default). "inline" places minus/plus on each side with a centered value.`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)", maxInlineSize: "22rem" }}>
          {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
            <Row key={size}>
              <span className="docs-size-label">{size}</span>
              <NumberInput
                size={size}
                aria-label={`${size} inline quantity`}
                stepper="inline"
                value={quantity}
                onChange={setQuantity}
                min={0}
                max={99}
              />
            </Row>
          ))}
        </div>
      </Section>

      <Section
        title="Field API"
        description="Number Input uses the same wrapper-level label, description, error, and counter model as other text-like controls."
      >
        <div style={{ display: "grid", gap: "var(--vds-space-4)", maxInlineSize: "32rem" }}>
          <NumberInputField
            label="Seat count"
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={50}
            counter="1-50 seats"
            description="Used to price the workspace subscription."
            error={quantity !== undefined && quantity < 1 ? "At least one seat is required" : undefined}
            invalid={quantity !== undefined && quantity < 1}
          />

          <NumberInputField
            label="Discount"
            value={discount}
            onChange={setDiscount}
            min={0}
            max={100}
            step={5}
            counter="0-100%"
            description="Approvals above 50% are reviewed manually."
            error={discount !== undefined && discount > 50 ? "Manager approval required above 50%" : undefined}
            invalid={discount !== undefined && discount > 50}
            metaLayout="inline"
            descriptionAlign="end"
            errorAlign="start"
            counterAlign="end"
          />
        </div>
      </Section>

      <Section title="Precision and clamping" description="Arrow keys, steppers, and blur clamping are built in.">
        <div style={{ display: "grid", gap: "var(--vds-space-4)", maxInlineSize: "32rem" }}>
          <NumberInputField
            label="Monthly budget"
            value={price}
            onChange={setPrice}
            min={0}
            max={5000}
            step={25}
            precision={2}
            description="Rounds to 2 decimals on blur and clamps to the allowed range."
            counter="$0 - $5,000"
          />

          <div style={{ maxInlineSize: "16rem" }}>
            <NumberInput
              aria-label="Monthly budget without field wrapper"
              value={price}
              onChange={setPrice}
              min={0}
              max={5000}
              step={25}
              precision={2}
            />
          </div>
        </div>
      </Section>

      <Section
        title="Typing Pulse"
        description="Each keystroke fires a brief ring pulse proportional to typing speed. Reduced motion disables the animation."
      >
        <TypingPulseDemo />
      </Section>

      <Section
        title="Mouse Wheel"
        description="wheelEnabled lets the user scroll to change the value — only fires while the input is focused. wheelSnap rounds to the nearest step multiple."
      >
        <WheelDemo />
      </Section>

      <Section title="States" description="Use inline controls for larger step targets. Compact stacked steppers also support ArrowUp and ArrowDown on the input.">
        <div style={{ display: "grid", gap: "var(--vds-gap-group)", maxInlineSize: "32rem" }}>
          <NumberInputField label="Optional quantity" placeholder="Enter a quantity" min={0} />
          <NumberInputField label="Unavailable quantity" defaultValue={12} disabled />
          <NumberInputField label="Invalid quantity" defaultValue={-1} min={0} invalid error="Enter zero or a positive quantity." />
          <NumberInputField label="Fixed quantity" defaultValue={12} readOnly stepper="inline" />
        </div>
      </Section>

      <Section title="Usage" description="The text input accepts ASCII numeric drafts. Validate numeric constraints on submission; min/max and blur clamping do not provide native number-input constraint validation.">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { NumberInput, NumberInputField } from "@virtari-packages/react-number-input";

// stacked (default)
<NumberInput value={qty} onChange={setQty} min={0} max={99} step={1} />

// inline ± buttons
<NumberInput stepper="inline" value={qty} onChange={setQty} min={0} max={99} />

// mouse wheel (focus required)
<NumberInput wheelEnabled value={qty} onChange={setQty} step={5} />

// wheel + snap to step
<NumberInput wheelEnabled wheelSnap value={qty} onChange={setQty} step={10} />

// typing pulse
<NumberInput typingPulse value={qty} onChange={setQty} />

<NumberInputField
  label="Seats"
  description="Used for billing."
  error="At least one seat is required"
  invalid
  counter="1-50 seats"
  metaLayout="inline"
  descriptionAlign="end"
/>`} />
      </Section>
    </>
  );
}

```
