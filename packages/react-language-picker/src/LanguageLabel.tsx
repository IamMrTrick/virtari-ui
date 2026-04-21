import { cn } from "@virtari-packages/utils";
import type { CountryCode } from "@virtari-packages/react-flag";
import type { HTMLAttributes, Ref } from "react";
import {
  labelFlagStyle,
  languageLabelVars,
  resolveLanguageEntry,
} from "./internals";
import { LanguageMark } from "./LanguageMark";

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
  className,
  ref,
  style,
  ...rest
}: LanguageLabelProps) {
  const entry = resolveLanguageEntry(locale);
  const english = entry?.english || entry?.native || locale;
  const native = entry?.native || locale;
  const hasDistinctNative = Boolean(showNative && entry && native.trim() !== english.trim());
  const mergedStyle = {
    ...languageLabelVars(hasDistinctNative),
    ...style,
  };

  if (!entry) {
    return (
      <span
        ref={ref}
        className={cn("vds-language-label", className)}
        style={mergedStyle}
        {...rest}
      >
        <bdi lang={locale}>{locale}</bdi>
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={cn("vds-language-label", className)}
      data-has-subtitle={hasDistinctNative ? "true" : undefined}
      style={mergedStyle}
      {...rest}
    >
      {!hideFlag ? (
        <LanguageMark
          flag={(entry.flag ?? null) as CountryCode | null}
          className="vds-language-label-flag"
          style={labelFlagStyle}
        />
      ) : null}
      <span className="vds-language-label-stack">
        <bdi className="vds-language-label-primary" lang="en">
          {english}
        </bdi>
        {hasDistinctNative ? (
          <bdi className="vds-language-label-subtitle" lang={entry.locale}>
            {native}
          </bdi>
        ) : null}
      </span>
    </span>
  );
}
