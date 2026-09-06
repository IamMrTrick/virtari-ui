import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import { Button } from "@virtari-packages/react-button";
import { OtpInput } from "@virtari-packages/react-otp-input";
import { Section, Row, Stack } from "../components";

const SIZES = ["sm", "md", "lg"] as const;

function BestPracticeDemo() {
  const [code, setCode] = useState("");
  const [completedCode, setCompletedCode] = useState("");

  const complete = code.length === 6;

  return (
    <form
      style={{ display: "grid", gap: "var(--vds-space-4)", maxInlineSize: "30rem" }}
      onSubmit={(event) => {
        event.preventDefault();
        if (complete) setCompletedCode(code);
      }}
    >
      <OtpInput
        length={6}
        value={code}
        onChange={setCode}
        onComplete={setCompletedCode}
        name="otp"
        label="Verification code"
        aria-describedby="otp-best-practice-help"
        required
      />
      <p id="otp-best-practice-help" className="docs-demo-hint">
        Accepts SMS autofill, full-code paste, numeric mobile keyboards, and Persian or Arabic
        digits normalized to ASCII.
      </p>
      <Row>
        <Button type="submit" disabled={!complete}>
          Verify
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setCode("");
            setCompletedCode("");
          }}
        >
          Reset
        </Button>
      </Row>
      <VirtariCodeBlock renderer="static" language="json" code={JSON.stringify({ code, completedCode }, null, 2)} />
    </form>
  );
}

export function OtpInputPage() {
  const [maskedCode, setMaskedCode] = useState("246810");
  const [alphaCode, setAlphaCode] = useState("A7K9");
  const [invalidCode, setInvalidCode] = useState("128");

  return (
    <>
      <Section
        title="Best-practice OTP"
        description="Uses text inputs with inputmode, one-time-code autofill, controlled value handling, paste distribution, and form submission support."
      >
        <BestPracticeDemo />
      </Section>

      <Section title="Sizes" description="Three compact sizes tuned for auth forms and dense dialogs.">
        <Stack>
          {SIZES.map((size) => (
            <Row key={size}>
              <span className="docs-size-label">{size}</span>
              <OtpInput size={size} value="123456" readOnly label={`${size} verification code`} />
            </Row>
          ))}
        </Stack>
      </Section>

      <Section
        title="Variants"
        description="Numeric is the default; alphanumeric and masked modes keep the same keyboard and paste behavior. Masking is visual and depends on browser text-security support."
      >
        <Stack>
          <OtpInput
            length={4}
            type="alphanumeric"
            value={alphaCode}
            onChange={setAlphaCode}
            label="Alphanumeric verification code"
          />
          <OtpInput
            length={6}
            value={maskedCode}
            onChange={setMaskedCode}
            mask
            label="Masked verification code"
          />
          <OtpInput
            length={6}
            value={invalidCode}
            onChange={setInvalidCode}
            invalid
            label="Invalid verification code"
            aria-describedby="otp-invalid-help"
          />
          <p id="otp-invalid-help" className="docs-demo-hint">Enter all six characters before verifying the code.</p>
          <OtpInput length={6} value="123456" disabled label="Disabled verification code" />
        </Stack>
      </Section>

      <Section title="Right-to-left context" description="Codes retain left-to-right character order inside a right-to-left form. Paste Persian or Arabic digits to normalize them to ASCII.">
        <div dir="rtl">
          <OtpInput label="کد تأیید" aria-describedby="otp-rtl-help" />
          <p id="otp-rtl-help" className="docs-demo-hint">کد شش رقمی را وارد کنید.</p>
        </div>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { OtpInput } from "@virtari-packages/react-otp-input";

<OtpInput
  length={6}
  value={code}
  onChange={setCode}
  onComplete={(next) => verify(next)}
  name="otp"
  label="Verification code"
  required
/>

// Markup follows current browser guidance:
// type="text"
// inputMode="numeric"
// autoComplete="one-time-code"`} />
      </Section>
    </>
  );
}
