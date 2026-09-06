# Original documentation page

Source ID: `apps/docs/src/pages/InputPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { useState } from "react";
import {
  Input,
  InputField,
  PasswordInputField,
} from "@virtari-packages/react-input";
import { Switch } from "@virtari-packages/react-switch";
import { Section, Row, Stack } from "../components";

function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

function TypingPulseDemo() {
  const [pulse, setPulse] = useState(false);
  return (
    <div style={{ display: "grid", gap: "var(--vds-space-4)", maxInlineSize: "28rem" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "var(--vds-space-2)" }}>
        <Switch checked={pulse} onCheckedChange={setPulse} aria-label="Enable typing pulse" />
        <span style={{ fontSize: "var(--vds-text-sm)", color: "var(--vds-color-text-muted)" }}>
          Typing pulse {pulse ? "on" : "off"}
        </span>
      </label>
      <Input typingPulse={pulse} placeholder="Type here — fast for stronger pulse…" />
      <Input typingPulse={pulse} inputSize="lg" placeholder="Large — type fast vs slow" />
      <Input typingPulse={pulse} type="password" placeholder="Password field" />
    </div>
  );
}

export function InputPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("virtari");
  const [password, setPassword] = useState("");

  return (
    <>
      <Section title="All Sizes" description="7 sizes sharing the same height ramp as Button, Select, and Toggle.">
        <Stack>
          <Row>
            <span className="docs-size-label">2xs</span>
            <Input inputSize="2xs" placeholder="24px - WCAG AA minimum" />
          </Row>
          <Row>
            <span className="docs-size-label">xs</span>
            <Input inputSize="xs" placeholder="28px - Tables, toolbars" />
          </Row>
          <Row>
            <span className="docs-size-label">sm</span>
            <Input inputSize="sm" placeholder="32px - Secondary forms" />
          </Row>
          <Row>
            <span className="docs-size-label">md</span>
            <Input placeholder="40px - Default" />
          </Row>
          <Row>
            <span className="docs-size-label">lg</span>
            <Input inputSize="lg" placeholder="44px - WCAG AAA + Apple HIG" />
          </Row>
          <Row>
            <span className="docs-size-label">xl</span>
            <Input inputSize="xl" placeholder="52px - Hero sections" />
          </Row>
          <Row>
            <span className="docs-size-label">2xl</span>
            <Input inputSize="2xl" placeholder="64px - Landing pages" />
          </Row>
        </Stack>
      </Section>

      <Section
        title="Field API"
        description="Label, description, error, and counter now live on a shared Field primitive. Keep them stacked or split them between start and end."
      >
        <div style={{ display: "grid", gap: "var(--vds-space-4)", maxInlineSize: "34rem" }}>
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            description="We'll send a confirmation link."
            error={email && !isValidEmail(email) ? "Enter a valid email address" : undefined}
            metaLayout="stacked"
          />

          <InputField
            label="Public handle"
            placeholder="virtari"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            description="Visible on your profile card."
            error={username.length < 4 ? "Minimum 4 characters" : undefined}
            showCounter
            maxLength={24}
            metaLayout="inline"
            descriptionAlign="end"
            errorAlign="start"
            counterAlign="end"
          />
        </div>
      </Section>

      <Section
        title="Password"
        description="PasswordInputField ships with reveal, progress, compact checks, and configurable metrics."
      >
        <div style={{ display: "grid", gap: "var(--vds-space-6)", maxInlineSize: "34rem" }}>
          <PasswordInputField
            label="Professional password"
            placeholder="Create a strong password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            showCounter
            maxLength={64}
            showRequirements
            requirementsLabel="Your password must include"
            strengthLabel="Password Strength"
            strengthStandard="standard"
            strengthOptions={{ userInputs: [username, email] }}
          />

          <InputField
            label="Compatible InputField path"
            type="password"
            placeholder="Create a strong password"
            revealable
            showStrengthMeter
          />

          <PasswordInputField
            label="Metric disabled"
            placeholder="No strength UI"
            showStrengthMeter={false}
          />

          <PasswordInputField
            label="Disabled"
            placeholder="Disabled state"
            disabled
          />
        </div>
      </Section>

      <Section
        title="Typing Pulse"
        description="When enabled, each printable keystroke fires a brief ring burst. Pulse intensity scales with typing speed — rapid typing produces a stronger glow."
      >
        <TypingPulseDemo />
      </Section>

      <Section title="States">
        <Stack>
          <Input placeholder="Normal" />
          <Input placeholder="Invalid" aria-invalid="true" />
          <Input placeholder="Disabled" disabled />
        </Stack>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import {
  Input,
  InputField,
  PasswordInputField,
  analyzePasswordStrength,
} from "@virtari-packages/react-input";

<Input inputSize="lg" placeholder="Enter email..." />

<InputField
  label="Email"
  description="We'll send a confirmation link."
  error="Enter a valid email address"
  metaLayout="inline"         // "stacked" | "inline"
  descriptionAlign="end"      // "start" | "end"
  errorAlign="start"
  showCounter
  maxLength={64}
/>

<InputField
  type="password"
  revealable
  showStrengthMeter
/>

const analysis = analyzePasswordStrength(password, {
  standard: "standard",
  userInputs: [email, username],
});

<PasswordInputField
  label="Password"
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  showCounter
  maxLength={64}
  showRequirements
  requirementsLabel="Your password must include"
  strengthLabel="Password Strength"
  strengthStandard="standard"
  strengthOptions={{ userInputs: [email, username] }}
/>

<PasswordInputField strengthStandard="basic" minLength={8} />
<PasswordInputField strengthStandard="strict" strongLength={20} />

<PasswordInputField
  label="No metric"
  showStrengthMeter={false}
/>`}</pre>
      </Section>
    </>
  );
}

```
