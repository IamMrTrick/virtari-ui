import { cn } from "@virtari-packages/utils";
import { Flag, type CountryCode } from "@virtari-packages/react-flag";
import type { HTMLAttributes, Ref } from "react";
import { languagesByLocale } from "./generated/languages";

export interface LanguageLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** BCP-47 locale tag — e.g. `"en"`, `"fa-IR"`, `"zh-Hant"`. */
  locale: string;
  /**
   * Show the native-script name as a muted subtitle under the English primary.
   * Default `false` (single line). Set `true` for header switchers that want the
   * same two-line layout as the picker's popover options.
   */
  showNative?: boolean;
  /** Hide the flag entirely. Default `false`. */
  hideFlag?: boolean;
  /** Flag-size token (see `@virtari-packages/react-flag`). Default `"sm"`. */
  flagSize?: "2xs" | "xs" | "sm" | "md" | "lg";
  ref?: Ref<HTMLSpanElement>;
}

/**
 * Flag · primary English · optional native subtitle. Handy for headers,
 * settings rows, or anywhere you want to surface the current UI language
 * without wiring the full picker.
 */
export function LanguageLabel({
  locale,
  showNative = false,
  hideFlag = false,
  flagSize = "sm",
  className,
  ref,
  ...rest
}: LanguageLabelProps) {
  const entry = languagesByLocale[locale] ?? languagesByLocale[locale.split("-")[0] ?? ""];
  if (!entry) {
    return (
      <span ref={ref} className={cn("vds-language-label", className)} {...rest}>
        <bdi lang={locale}>{locale}</bdi>
      </span>
    );
  }

  const english = entry.english || entry.native;
  const native = entry.native;
  const hasDistinctNative = showNative && native && native.trim() !== english.trim();

  return (
    <span ref={ref} className={cn("vds-language-label", className)} {...rest}>
      {!hideFlag && entry.flag ? (
        <Flag
          code={entry.flag as CountryCode}
          size={flagSize}
          className="vds-language-label-flag"
        />
      ) : null}
      <span className="vds-language-label-stack">
        <span className="vds-language-label-primary" lang="en">
          {english}
        </span>
        {hasDistinctNative ? (
          <bdi className="vds-language-label-subtitle" lang={entry.locale}>
            {native}
          </bdi>
        ) : null}
      </span>
    </span>
  );
}
