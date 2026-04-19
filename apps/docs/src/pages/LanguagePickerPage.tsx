import { useState } from "react";
import {
  LanguagePicker,
  LanguageLabel,
  localeToFlag,
  type LocaleTag,
} from "@virtari/react-language-picker";
import { Section, Row, Stack } from "../components";

const CURATED: LocaleTag[] = [
  "en",
  "fa",
  "ar",
  "de",
  "fr",
  "es",
  "zh-Hant",
  "zh-Hans",
  "ja",
  "ko",
  "ru",
  "tr",
  "hi",
];

export function LanguagePickerPage() {
  const [full, setFull] = useState<LocaleTag>("fa");
  const [curated, setCurated] = useState<LocaleTag>("en-US");
  const [compact, setCompact] = useState<LocaleTag>("fa");

  return (
    <>
      <Section
        title="Overview"
        description="Locale selector built on <Combobox>. Trigger shows flag + English name in one line; each option stacks English (primary) with the native script below as a muted subtitle. Collapses to one line when the two names match (e.g. English / English)."
      >
        <div style={{ maxInlineSize: "22rem" }}>
          <LanguagePicker
            value={full}
            onChange={setFull}
            preferredLocales={["en", "fa", "ar", "en-US", "en-GB"]}
          />
        </div>
      </Section>

      <Section
        title="Curated subset"
        description="Pass a locales=[…] prop to constrain the list — ship only what your product supports."
      >
        <Stack>
          <div style={{ maxInlineSize: "22rem" }}>
            <LanguagePicker
              value={curated}
              onChange={setCurated}
              locales={CURATED}
            />
          </div>
          <p className="docs-hint">
            Resolved flag for {curated}: {String(localeToFlag(curated))}
          </p>
        </Stack>
      </Section>

      <Section
        title="Single-line (native subtitle hidden)"
        description="Hide the native line entirely with showNativeName={false}. Good for dense header switchers where vertical space is tight."
      >
        <div style={{ maxInlineSize: "18rem" }}>
          <LanguagePicker
            value={compact}
            onChange={setCompact}
            locales={CURATED}
            showNativeName={false}
          />
        </div>
      </Section>

      <Section
        title="Standalone LanguageLabel"
        description="The same layout without a picker. Default is single line (flag + English); pass showNative to add the native subtitle."
      >
        <Stack>
          {["en-US", "en-GB", "fa", "ar-EG", "zh-Hant", "zh-Hans", "de", "cy"].map((l) => (
            <Row key={l}>
              <span className="docs-size-label" style={{ minInlineSize: "5rem" }}>
                {l}
              </span>
              <LanguageLabel locale={l} />
              <span style={{ opacity: 0.4, margin: "0 0.5rem" }}>·</span>
              <LanguageLabel locale={l} showNative />
            </Row>
          ))}
        </Stack>
      </Section>

      <Section title="Sizes">
        <Stack>
          {(["sm", "md", "lg"] as const).map((s) => (
            <Row key={s}>
              <span className="docs-size-label">{s}</span>
              <div style={{ maxInlineSize: "18rem", inlineSize: "100%" }}>
                <LanguagePicker defaultValue="fa" locales={CURATED} size={s} />
              </div>
            </Row>
          ))}
        </Stack>
      </Section>

      <Section title="Usage">
        <pre className="docs-code">{`import { LanguagePicker, LanguageLabel } from "@virtari/react-language-picker";

<LanguagePicker
  value={locale}
  onChange={setLocale}
  locales={["en", "fa", "ar", "de"]}
  preferredLocales={["en", "fa"]}
  showNativeName      // default — muted subtitle in the native script
/>

// Compact variant without the native line
<LanguagePicker value={locale} showNativeName={false} />

// Standalone label — single line by default, showNative = two-line
<LanguageLabel locale="fa" showNative />`}</pre>
      </Section>
    </>
  );
}
