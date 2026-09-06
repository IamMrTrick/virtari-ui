import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import { Textarea, TextareaField } from "@virtari-packages/react-textarea";
import { Switch } from "@virtari-packages/react-switch";
import { Section } from "../components";

function TextareaTypingPulseDemo() {
  const [pulse, setPulse] = useState(false);
  return (
    <div style={{ display: "grid", gap: "var(--vds-space-4)", maxInlineSize: "36rem" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
        <Switch checked={pulse} onCheckedChange={setPulse} aria-label="Enable typing pulse" />
        <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
          Typing pulse {pulse ? "on" : "off"}
        </span>
      </label>
      <Textarea
        aria-label="Typing pulse example"
        typingPulse={pulse}
        rows={4}
        placeholder="Type here to try the optional focus-ring pulse…"
      />
    </div>
  );
}

export function TextareaPage() {
  const [bio, setBio] = useState("");
  const [notes, setNotes] = useState("This release needs final QA review.");

  return (
    <>
      <Section title="Basic" description="A standard textarea.">
        <div style={{ maxInlineSize: "24rem" }}>
          <TextareaField label="Message" placeholder="Type your message here..." />
        </div>
      </Section>

      <Section
        title="Field API"
        description="Textarea gets the same field metadata controls as Input: stacked or inline messages, start/end placement, and live counters."
      >
        <div style={{ display: "grid", gap: "var(--vds-space-4)", maxInlineSize: "36rem" }}>
          <TextareaField
            label="Project summary"
            placeholder="Describe the goal of this workstream..."
            rows={4}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            description="Give reviewers enough context before they open the full brief."
            error={bio.length > 0 && bio.length < 20 ? "Write at least 20 characters" : undefined}
            invalid={bio.length > 0 && bio.length < 20}
            showCounter
            maxLength={180}
          />

          <TextareaField
            label="Internal notes"
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            description="Only visible to operators."
            counter="Private draft"
            metaLayout="inline"
            descriptionAlign="end"
            counterAlign="start"
          />
        </div>
      </Section>

      <Section title="Sizes" description="Size changes padding, text and minimum height. Rows sets the initial multiline capacity above that minimum; the control can be resized vertically.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)", maxInlineSize: "24rem" }}>
          {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
            <TextareaField key={size} label={`Size ${size}`} size={size} rows={3} placeholder="Three rows of text" />
          ))}
        </div>
      </Section>

      <Section
        title="Typing Pulse"
        description="Printable keys briefly pulse the focus ring. This is off by default and respects reduced motion. Toggle the switch below to try it."
      >
        <TextareaTypingPulseDemo />
      </Section>

      <Section title="Disabled" description="A disabled textarea.">
        <div style={{ maxInlineSize: "24rem" }}>
          <TextareaField label="Archived message" defaultValue="This conversation is archived." disabled />
        </div>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { Textarea, TextareaField } from "@virtari-packages/react-textarea";

<Textarea aria-label="Message" placeholder="Enter text..." rows={6} />

<TextareaField
  label="Summary"
  description="Shown under the control by default."
  error="Too short"
  invalid
  showCounter
  maxLength={180}
  metaLayout="inline"
  descriptionAlign="end"
  errorAlign="start"
/>`} />
      </Section>
    </>
  );
}
