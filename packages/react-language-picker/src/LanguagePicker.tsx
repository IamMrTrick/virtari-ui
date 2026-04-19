import { cn } from "@virtari-packages/utils";
import { Flag, type CountryCode } from "@virtari-packages/react-flag";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxOptions,
  ComboboxTrigger,
  type ComboboxAppearance,
  type ComboboxItemData,
  type ComboboxSize,
} from "@virtari-packages/react-select";
import { useCallback, useMemo, type Ref } from "react";
import { languages as allLanguages, languagesByLocale, type LanguageEntry } from "./generated/languages";

export type LocaleTag = string;

export interface LanguagePickerProps {
  /** Controlled locale value. */
  value?: LocaleTag;
  /** Uncontrolled initial locale. */
  defaultValue?: LocaleTag;
  onChange?: (locale: LocaleTag) => void;
  /** Curated subset — renders only these locales in the list. Defaults to the full catalog. */
  locales?: LocaleTag[];
  /** Pinned to the top of the list. */
  preferredLocales?: LocaleTag[];
  /** Size preset — shares ramp with Combobox. Default `"md"`. */
  size?: ComboboxSize;
  appearance?: ComboboxAppearance;
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: string;
  /**
   * Render the native-script name as a muted subtitle under each option.
   * Default `true`. Set `false` for a single-line trigger-style display
   * (useful for compact headers or when the consumer only localizes in English).
   */
  showNativeName?: boolean;
  /** Language for the picker's *meta* copy (search placeholder, empty state). */
  uiLocale?: "en" | "fa" | "ar";
  /** Popover alignment. Passed to ComboboxContent. */
  align?: "start" | "center" | "end";
  className?: string;
  id?: string;
  ref?: Ref<HTMLDivElement>;
}

function resolveUiLocale(preferred?: "en" | "fa" | "ar"): "en" | "fa" | "ar" {
  if (preferred) return preferred;
  if (typeof document !== "undefined") {
    const lang = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
    if (lang.startsWith("fa")) return "fa";
    if (lang.startsWith("ar")) return "ar";
  }
  return "en";
}

function ordered(
  all: readonly LanguageEntry[],
  subset?: LocaleTag[],
  preferred?: LocaleTag[],
): LanguageEntry[] {
  const source =
    subset && subset.length > 0
      ? (subset.map((loc) => languagesByLocale[loc]).filter(Boolean) as LanguageEntry[])
      : all.slice();
  if (!preferred || preferred.length === 0) return source;
  const pref: LanguageEntry[] = [];
  const rest: LanguageEntry[] = [];
  const prefSet = new Set(preferred);
  for (const loc of preferred) {
    const e = source.find((l) => l.locale === loc);
    if (e) pref.push(e);
  }
  for (const e of source) if (!prefSet.has(e.locale)) rest.push(e);
  return [...pref, ...rest];
}

/**
 * Locale selector.
 * Trigger: `[flag] English` — single-line, ellipsises cleanly at any width.
 * Options: `[flag] English` on top (primary) with `native` below (muted xs).
 * The native line is suppressed when it equals the English name.
 */
export function LanguagePicker({
  value,
  defaultValue,
  onChange,
  locales,
  preferredLocales,
  size = "md",
  appearance = "soft",
  invalid,
  disabled,
  placeholder,
  showNativeName = true,
  uiLocale,
  align = "start",
  className,
  id,
  ref,
}: LanguagePickerProps) {
  const ui = resolveUiLocale(uiLocale);

  const source = useMemo(
    () => ordered(allLanguages, locales, preferredLocales),
    [locales, preferredLocales],
  );

  // `label` is what Combobox shows by default + filters against — English name.
  // Everything else goes into `keywords` so the user can search by native script,
  // locale tag (e.g. "fa-IR"), or translated name.
  const items = useMemo(
    () =>
      source.map((entry) => ({
        value: entry.locale,
        label: entry.english || entry.native,
        keywords: [entry.native, entry.names.en, entry.names.fa, entry.names.ar, entry.locale],
      })),
    [source],
  );

  const handleChange = useCallback(
    (next: string | string[]) => {
      const v = Array.isArray(next) ? next[0] : next;
      if (v) onChange?.(v);
    },
    [onChange],
  );

  const filter = useCallback(
    (item: ComboboxItemData, query: string) => {
      if (!query) return true;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      if (item.label.toLowerCase().includes(q)) return true;
      if (item.value.toLowerCase().includes(q)) return true;
      const kws = (item as ComboboxItemData & { keywords?: string[] }).keywords ?? [];
      return kws.some((kw) => String(kw).toLowerCase().includes(q));
    },
    [],
  );

  const renderTriggerValue = useCallback(
    (item: ComboboxItemData) => {
      const entry = languagesByLocale[item.value];
      if (!entry) return item.label;
      return (
        <span className="vds-language-picker-trigger">
          {entry.flag ? (
            <Flag
              code={entry.flag as CountryCode}
              size="sm"
              className="vds-language-picker-trigger-flag"
            />
          ) : null}
          <span className="vds-language-picker-trigger-name">
            {entry.english || entry.native}
          </span>
        </span>
      );
    },
    [],
  );

  return (
    <div ref={ref} id={id} className={cn("vds-language-picker", className)}>
      <Combobox
        items={items}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleChange}
        size={size}
        appearance={appearance}
        invalid={invalid}
        disabled={disabled}
        searchable
        filter={filter}
      >
        <ComboboxTrigger
          placeholder={placeholder ?? placeholderFor(ui)}
          renderValue={renderTriggerValue}
        />
        <ComboboxContent align={align} sideOffset={4}>
          <ComboboxInput placeholder={searchPlaceholderFor(ui)} />
          <ComboboxList>
            <ComboboxOptions estimateSize={showNativeName ? 48 : 36}>
              {(item) => {
                const entry = languagesByLocale[item.value];
                if (!entry) return null;
                return (
                  <ComboboxItem key={item.value} value={item.value}>
                    <LanguagePickerOption entry={entry} showNative={showNativeName} />
                  </ComboboxItem>
                );
              }}
            </ComboboxOptions>
            <ComboboxEmpty>{emptyMessageFor(ui)}</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export interface LanguagePickerOptionProps {
  entry: LanguageEntry;
  /** Show the native-script name as a muted subtitle below the English primary. Default `true`. */
  showNative?: boolean;
}

/**
 * One option row. Primary line is the English name; native (in its own script)
 * sits below in muted, smaller type. Collapses to a single line when the two
 * names are identical (e.g. "English" / "English").
 */
export function LanguagePickerOption({ entry, showNative = true }: LanguagePickerOptionProps) {
  const english = entry.english || entry.native;
  const native = entry.native;
  const hasDistinctNative = showNative && native && native.trim() !== english.trim();

  return (
    <span className="vds-language-picker-option">
      {entry.flag ? (
        <Flag
          code={entry.flag as CountryCode}
          size="md"
          className="vds-language-picker-option-flag"
        />
      ) : null}
      <span className="vds-language-picker-option-names">
        <span className="vds-language-picker-option-primary" lang="en">
          {english}
        </span>
        {hasDistinctNative ? (
          <bdi
            className="vds-language-picker-option-subtitle"
            lang={entry.locale}
          >
            {native}
          </bdi>
        ) : null}
      </span>
    </span>
  );
}

function placeholderFor(ui: "en" | "fa" | "ar"): string {
  if (ui === "fa") return "انتخاب زبان…";
  if (ui === "ar") return "اختر اللغة…";
  return "Select language…";
}
function searchPlaceholderFor(ui: "en" | "fa" | "ar"): string {
  if (ui === "fa") return "جست‌وجوی زبان…";
  if (ui === "ar") return "ابحث عن لغة…";
  return "Search language…";
}
function emptyMessageFor(ui: "en" | "fa" | "ar"): string {
  if (ui === "fa") return "زبانی یافت نشد";
  if (ui === "ar") return "لم يتم العثور على لغة";
  return "No matching language";
}

/** Helper: resolve flag code for a locale without mounting the picker. */
export function localeToFlag(locale: string): CountryCode | null {
  const entry = languagesByLocale[locale] ?? languagesByLocale[locale.split("-")[0] ?? ""];
  return (entry?.flag ?? null) as CountryCode | null;
}
