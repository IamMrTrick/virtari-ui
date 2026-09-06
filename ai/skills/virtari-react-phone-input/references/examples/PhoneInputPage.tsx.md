# Original documentation page

Source ID: `apps/docs/src/pages/PhoneInputPage.tsx`. This is source context, not a standalone app. Preserve required state/helpers; replace documentation wrappers with application layout.

```tsx
import { useState } from "react";
import { PhoneInput, type PhoneInputValue } from "@virtari-packages/react-phone-input";
import { Section, Row, Stack } from "../components";

const SIZES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

export function PhoneInputPage() {
  const [ctrl, setCtrl] = useState<PhoneInputValue | null>(null);

  return (
    <>
      <Section
        title="Overview"
        description="A complete tel input: country picker, dial-code prefix, format-as-you-type, Persian/Arabic digit normalization, full ARIA and autofill hints. Composed on top of <Input> + <Combobox>."
      >
        <div style={{ maxInlineSize: "24rem" }}>
          <PhoneInput defaultCountry="ir" placeholder="Phone number" />
        </div>
      </Section>

      <Section
        title="Uncontrolled"
        description="Just drop it in. Try typing with Persian digits: ۰۹۱۲۳۴۵۶۷۸۹ — they'll auto-convert to ASCII and format as 0912 345 6789."
      >
        <div style={{ maxInlineSize: "24rem" }}>
          <PhoneInput defaultCountry="ir" placeholder="مثلاً ۰۹۱۲۳۴۵۶۷۸۹" />
        </div>
      </Section>

      <Section
        title="Controlled"
        description="Listen to onChange to get parsed { country, national, e164, isValid } on every keystroke. E.164 stays null until the number is complete and valid."
      >
        <Stack>
          <div style={{ maxInlineSize: "24rem" }}>
            <PhoneInput
              defaultCountry="us"
              onChange={setCtrl}
              preferredCountries={["us", "gb", "ir", "de", "fr"]}
            />
          </div>
          <pre className="docs-code">{JSON.stringify(ctrl, null, 2)}</pre>
        </Stack>
      </Section>

      <Section
        title="Size ramp"
        description="Shares the same height ramp as Input and Button. Country chip widens on larger sizes so the flag + dial code stay readable."
      >
        <Stack>
          {SIZES.map((s) => (
            <Row key={s}>
              <span className="docs-size-label">{s}</span>
              <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
                <PhoneInput size={s} defaultCountry="ir" />
              </div>
            </Row>
          ))}
        </Stack>
      </Section>

      <Section title="States">
        <Stack>
          <div style={{ maxInlineSize: "22rem" }}>
            <PhoneInput defaultCountry="ir" placeholder="Normal" />
          </div>
          <div style={{ maxInlineSize: "22rem" }}>
            <PhoneInput defaultCountry="ir" invalid placeholder="Invalid" />
          </div>
          <div style={{ maxInlineSize: "22rem" }}>
            <PhoneInput defaultCountry="ir" disabled placeholder="Disabled" />
          </div>
        </Stack>
      </Section>

      <Section
        title="Preferred countries"
        description="Pin a short-list to the top of the popover. Everything else stays below, alphabetical."
      >
        <div style={{ maxInlineSize: "24rem" }}>
          <PhoneInput
            defaultCountry="ir"
            preferredCountries={["ir", "us", "gb", "de", "fr", "ae", "sa"]}
          />
        </div>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { PhoneInput } from "@virtari-packages/react-phone-input";

<PhoneInput
  defaultCountry="ir"
  preferredCountries={["ir", "us", "gb"]}
  onChange={({ country, national, e164, isValid }) => { … }}
  onValidityChange={(ok) => setValid(ok)}
  name="phone"               // emits a hidden <input autoComplete="tel" value={e164}>
  size="md"                  // 2xs | xs | sm | md | lg | xl | 2xl
  invalid={hasError}
  locale="fa"                // country-name language in the popover
/>`}</pre>
      </Section>
    </>
  );
}

```
