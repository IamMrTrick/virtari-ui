import { cn } from "@virtari-packages/utils";
import type { CountryCode } from "@virtari-packages/react-flag";
import { Button } from "@virtari-packages/react-button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  type Direction as DrawerDirection,
} from "@virtari-packages/react-drawer";
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
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type Ref,
} from "react";
import { languages as allLanguages, type LanguageEntry } from "./generated/languages";
import {
  languagePickerVars,
  optionFlagStyle,
  resolveLanguageEntry,
  triggerFlagStyle,
} from "./internals";
import { LanguageMark } from "./LanguageMark";

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
  /** Presentation mode for the option list. */
  overlay?: "popover" | "drawer";
  /** Popover alignment. Passed to ComboboxContent. */
  align?: "start" | "center" | "end";
  /** Drawer edge when `overlay="drawer"`. Default `"bottom"`. */
  drawerDirection?: DrawerDirection;
  drawerTitle?: string;
  drawerDescription?: string;
  cancelLabel?: string;
  applyLabel?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
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
      ? (subset.map((loc) => resolveLanguageEntry(loc)).filter(Boolean) as LanguageEntry[])
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

function toItemData(entry: LanguageEntry): ComboboxItemData & { keywords: string[] } {
  return {
    value: entry.locale,
    label: entry.english || entry.native,
    keywords: [entry.native, entry.names.en, entry.names.fa, entry.names.ar, entry.locale],
  };
}

function extractLocale(next: string | string[]): LocaleTag {
  return Array.isArray(next) ? (next[0] ?? "") : next;
}

function chevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function checkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LanguagePickerTriggerValue({
  entry,
  showNative = true,
}: {
  entry: LanguageEntry;
  showNative?: boolean;
}) {
  const english = entry.english || entry.native;
  const native = entry.native;
  const hasDistinctNative = showNative && native && native.trim() !== english.trim();

  return (
    <span
      className="vds-language-picker-trigger"
      data-has-subtitle={hasDistinctNative ? "true" : undefined}
    >
      <LanguageMark
        flag={(entry.flag ?? null) as CountryCode | null}
        className="vds-language-picker-trigger-flag"
        style={triggerFlagStyle}
      />
      <span className="vds-language-picker-trigger-stack">
        <bdi className="vds-language-picker-trigger-primary" lang="en">
          {english}
        </bdi>
        {hasDistinctNative ? (
          <bdi
            className="vds-language-picker-trigger-subtitle"
            lang={entry.locale}
          >
            {native}
          </bdi>
        ) : null}
      </span>
    </span>
  );
}

/**
 * Locale selector.
 * Trigger: `[flag] English` on top with the native name below by default.
 * Set `showNativeName={false}` for a compact single-line trigger.
 * Options follow the same English-first stack and suppress the native line
 * when it equals the English name.
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
  overlay = "popover",
  align = "start",
  drawerDirection = "bottom",
  drawerTitle,
  drawerDescription,
  cancelLabel,
  applyLabel,
  className,
  id,
  style,
  ref,
}: LanguagePickerProps) {
  const ui = resolveUiLocale(uiLocale);
  const [uncontrolledValue, setUncontrolledValue] = useState<LocaleTag>(() => defaultValue ?? "");
  const selectedValue = value !== undefined ? value : uncontrolledValue;
  const selectedEntry = useMemo(() => resolveLanguageEntry(selectedValue), [selectedValue]);
  const pickerCssVars = useMemo(() => languagePickerVars(size), [size]);
  const rootStyle = useMemo(
    () => ({
      ...pickerCssVars,
      ...style,
    }),
    [pickerCssVars, style],
  );
  const drawerListId = useId();
  const drawerSearchId = useId();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerDraftValue, setDrawerDraftValue] = useState<LocaleTag>(selectedValue);
  const [drawerQuery, setDrawerQuery] = useState("");

  const source = useMemo(
    () => ordered(allLanguages, locales, preferredLocales),
    [locales, preferredLocales],
  );

  // `label` is what Combobox shows by default + filters against — English name.
  // Everything else goes into `keywords` so the user can search by native script,
  // locale tag (e.g. "fa-IR"), or translated name.
  const items = useMemo(
    () => source.map(toItemData),
    [source],
  );

  const commitValue = useCallback(
    (next: LocaleTag) => {
      if (!next) return;
      if (value === undefined) setUncontrolledValue(next);
      onChange?.(next);
    },
    [onChange, value],
  );

  const handlePopoverChange = useCallback(
    (next: string | string[]) => {
      commitValue(extractLocale(next));
    },
    [commitValue],
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

  const filteredDrawerItems = useMemo(
    () => items.filter((item) => filter(item, drawerQuery)),
    [drawerQuery, filter, items],
  );

  useEffect(() => {
    if (!drawerOpen) return;
    setDrawerDraftValue(selectedValue);
    setDrawerQuery("");
  }, [drawerOpen, selectedValue]);

  const handleDrawerOpenChange = useCallback(
    (next: boolean) => {
      setDrawerOpen(next);
      if (!next) {
        setDrawerDraftValue(selectedValue);
        setDrawerQuery("");
      }
    },
    [selectedValue],
  );

  const handleDrawerCancel = useCallback(() => {
    setDrawerDraftValue(selectedValue);
    setDrawerQuery("");
    setDrawerOpen(false);
  }, [selectedValue]);

  const handleDrawerApply = useCallback(() => {
    if (!drawerDraftValue) return;
    commitValue(drawerDraftValue);
    setDrawerOpen(false);
  }, [commitValue, drawerDraftValue]);

  const drawerDirectionIsVertical =
    drawerDirection === "bottom" || drawerDirection === "top";

  const renderTriggerValue = useCallback(
    (item: ComboboxItemData) => {
      const entry = resolveLanguageEntry(item.value);
      if (!entry) return item.label;
      return <LanguagePickerTriggerValue entry={entry} showNative={showNativeName} />;
    },
    [showNativeName],
  );

  if (overlay === "drawer") {
    return (
      <div
        ref={ref}
        id={id}
        className={cn("vds-language-picker", className)}
        data-overlay="drawer"
        style={rootStyle}
      >
        <button
          type="button"
          className="vds-combobox-trigger vds-language-picker-drawer-trigger"
          data-size={size}
          data-appearance={appearance}
          data-state={drawerOpen ? "open" : "closed"}
          data-disabled={disabled ? "true" : undefined}
          data-invalid={invalid ? "true" : undefined}
          data-placeholder={!selectedEntry ? "" : undefined}
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
          aria-controls={drawerOpen ? drawerListId : undefined}
          disabled={disabled}
          onClick={() => handleDrawerOpenChange(true)}
        >
          <span className="vds-combobox-trigger-value">
            {selectedEntry ? (
              <LanguagePickerTriggerValue entry={selectedEntry} showNative={showNativeName} />
            ) : (
              <span className="vds-combobox-trigger-placeholder">
                {placeholder ?? placeholderFor(ui)}
              </span>
            )}
          </span>
          <span className="vds-combobox-trigger-actions">
            <span className="vds-combobox-icon" aria-hidden="true">
              {chevronIcon()}
            </span>
          </span>
        </button>

        <Drawer
          direction={drawerDirection}
          open={drawerOpen}
          onOpenChange={handleDrawerOpenChange}
          sizeMode="fixed"
          size={
            drawerDirectionIsVertical
              ? "min(80vh, 32rem)"
              : "min(22rem, 90vw)"
          }
          indicator={drawerDirectionIsVertical ? "inside" : "hidden"}
        >
          <DrawerContent
            className="vds-language-picker-drawer-content"
            style={pickerCssVars}
          >
            <DrawerHeader variant="bordered" className="vds-language-picker-drawer-header">
              <DrawerTitle>{drawerTitle ?? "Select language"}</DrawerTitle>
              {drawerDescription ? (
                <DrawerDescription>{drawerDescription}</DrawerDescription>
              ) : null}
              <div className="vds-language-picker-drawer-search vds-combobox-input-wrap">
                <span className="vds-combobox-input-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M14 14L11 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  id={drawerSearchId}
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  className="vds-combobox-input"
                  placeholder={searchPlaceholderFor(ui)}
                  value={drawerQuery}
                  onChange={(event) => setDrawerQuery(event.target.value)}
                />
              </div>
            </DrawerHeader>
            <DrawerBody className="vds-language-picker-drawer-body">
              <div
                id={drawerListId}
                role="listbox"
                aria-labelledby={drawerSearchId}
                className="vds-language-picker-drawer-options"
              >
                {filteredDrawerItems.length > 0 ? (
                  filteredDrawerItems.map((item) => {
                    const entry = resolveLanguageEntry(item.value);
                    if (!entry) return null;
                    const selected = drawerDraftValue === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        className="vds-language-picker-drawer-option"
                        data-selected={selected ? "true" : undefined}
                        onClick={() => setDrawerDraftValue(item.value)}
                      >
                        <LanguagePickerOption entry={entry} showNative={showNativeName} />
                        {selected ? (
                          <span className="vds-language-picker-drawer-option-indicator" aria-hidden="true">
                            {checkIcon()}
                          </span>
                        ) : null}
                      </button>
                    );
                  })
                ) : (
                  <div className="vds-language-picker-drawer-empty">{emptyMessageFor(ui)}</div>
                )}
              </div>
            </DrawerBody>
            <DrawerFooter className="vds-language-picker-drawer-footer">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                color="contrast"
                onClick={handleDrawerCancel}
              >
                {cancelLabel ?? "Cancel"}
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleDrawerApply}
                disabled={!drawerDraftValue}
              >
                {applyLabel ?? "Apply"}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      id={id}
      className={cn("vds-language-picker", className)}
      data-overlay="popover"
      style={rootStyle}
    >
      <Combobox
        items={items}
        value={selectedValue}
        onValueChange={handlePopoverChange}
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
        <ComboboxContent align={align} sideOffset={4} style={pickerCssVars}>
          <ComboboxInput placeholder={searchPlaceholderFor(ui)} />
          <ComboboxList>
            <ComboboxOptions estimateSize={showNativeName ? 44 : 34}>
              {(item) => {
                const entry = resolveLanguageEntry(item.value);
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
      <LanguageMark
        flag={(entry.flag ?? null) as CountryCode | null}
        className="vds-language-picker-option-flag"
        style={optionFlagStyle}
      />
      <span className="vds-language-picker-option-names">
        <bdi className="vds-language-picker-option-primary" lang="en">
          {english}
        </bdi>
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
  const entry = resolveLanguageEntry(locale);
  return (entry?.flag ?? null) as CountryCode | null;
}
