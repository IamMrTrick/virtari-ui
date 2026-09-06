import { CodeBlock as VirtariCodeBlock } from "@virtari-packages/react-code";
import { useState } from "react";
import {
  LanguageLabel,
  LanguagePicker,
  localeToFlag,
  type LocaleTag,
} from "@virtari-packages/react-language-picker";
import { Row, Section, Stack } from "../components";

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
  const [drawerLocale, setDrawerLocale] = useState<LocaleTag>("ar");

  return (
    <>
      <Section
        title="Overview"
        description="Locale selector built on <Combobox>. Trigger and options both stack English (primary) with the native script below as a muted subtitle. Collapses to one line when the two names match (e.g. English / English)."
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
        title="Curated Subset"
        description="Pass a locales=[...] prop to constrain the list and ship only the languages your product supports."
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
        title="Single-Line"
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
        title="Drawer Mode"
        description="Set overlay='drawer' to turn the list into an apply/cancel flow. Useful on mobile or when language changes should be reviewed before committing."
      >
        <div style={{ maxInlineSize: "22rem" }}>
          <LanguagePicker
            value={drawerLocale}
            onChange={setDrawerLocale}
            locales={CURATED}
            overlay="drawer"
            drawerTitle="Choose language"
            drawerDescription="Pick one language, then confirm it from the footer."
          />
        </div>
      </Section>

      <Section
        title="Standalone LanguageLabel"
        description="The same layout without a picker. Default is single line (flag + English); pass showNative to add the native subtitle."
      >
        <Stack>
          {["en-US", "en-GB", "fa", "ar-EG", "zh-Hant", "zh-Hans", "de", "cy"].map((locale) => (
            <Row key={locale}>
              <span className="docs-size-label" style={{ minInlineSize: "5rem" }}>
                {locale}
              </span>
              <LanguageLabel locale={locale} />
              <span style={{ opacity: 0.4, margin: "0 0.5rem" }}>·</span>
              <LanguageLabel locale={locale} showNative />
            </Row>
          ))}
        </Stack>
      </Section>

      <Section title="Sizes">
        <Stack>
          {(["sm", "md", "lg"] as const).map((pickerSize) => (
            <Row key={pickerSize}>
              <span className="docs-size-label">{pickerSize}</span>
              <div style={{ maxInlineSize: "18rem", inlineSize: "100%" }}>
                <LanguagePicker
                  defaultValue="fa"
                  locales={CURATED}
                  size={pickerSize}
                />
              </div>
            </Row>
          ))}
        </Stack>
      </Section>

      <Section title="Usage">
        <VirtariCodeBlock renderer="static" language="tsx" code={`import { LanguagePicker, LanguageLabel } from "@virtari-packages/react-language-picker";

<LanguagePicker
  value={locale}
  onChange={setLocale}
  locales={["en", "fa", "ar", "de"]}
  preferredLocales={["en", "fa"]}
  showNativeName
/>

// Compact variant without the native line
<LanguagePicker value={locale} showNativeName={false} />

// Drawer variant with staged selection + footer actions
<LanguagePicker
  value={locale}
  onChange={setLocale}
  overlay="drawer"
  drawerTitle="Choose language"
/>

// Standalone label; single line by default, two lines with showNative
<LanguageLabel locale="fa" showNative />`} />
      </Section>
    </>
  );
}
