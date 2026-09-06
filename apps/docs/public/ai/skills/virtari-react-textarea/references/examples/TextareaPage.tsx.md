# Original documentation page

Source ID: `apps/docs/src/pages/TextareaPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
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
        typingPulse={pulse}
        rows={4}
        placeholder="Type here — tap fast to see a strong pulse, slow for a gentle one…"
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
          <Textarea placeholder="Type your message here..." />
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
            showCounter
            maxLength={180}
          />

          <TextareaField
            label="Internal notes"
            rows={4}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            description="Only visible to operators."
            counter="Autosaves every 30 seconds"
            metaLayout="inline"
            descriptionAlign="end"
            counterAlign="start"
          />
        </div>
      </Section>

      <Section title="Sizes" description="Different textarea sizes.">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--vds-space-3)", maxInlineSize: "24rem" }}>
          <Textarea placeholder="Small textarea" rows={2} />
          <Textarea placeholder="Medium textarea (default)" rows={4} />
          <Textarea placeholder="Large textarea" rows={8} />
        </div>
      </Section>

      <Section
        title="Typing Pulse"
        description="Each keystroke fires a ring burst proportional to typing speed. Toggle the switch below to try it."
      >
        <TextareaTypingPulseDemo />
      </Section>

      <Section title="Disabled" description="A disabled textarea.">
        <div style={{ maxInlineSize: "24rem" }}>
          <Textarea placeholder="This textarea is disabled" disabled />
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { Textarea, TextareaField } from "@virtari-packages/react-textarea";

<Textarea placeholder="Enter text..." rows={6} />

<TextareaField
  label="Summary"
  description="Shown under the control by default."
  error="Too short"
  showCounter
  maxLength={180}
  metaLayout="inline"
  descriptionAlign="end"
  errorAlign="start"
/>`}</pre>
      </Section>
    </>
  );
}

```
