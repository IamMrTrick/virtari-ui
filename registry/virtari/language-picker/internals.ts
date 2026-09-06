import type { CSSProperties } from "react";
import type { ComboboxSize } from "../select";
import { languagesByLocale, type LanguageEntry } from "./generated/languages";

type LanguagePickerVars = CSSProperties & Record<string, string>;

const PICKER_SIZE_VARS: Record<ComboboxSize, LanguagePickerVars> = {
  "2xs": {
    "--language-picker-trigger-flag-size": "1.125rem",
    "--language-picker-trigger-primary-font-size": "0.75rem",
    "--language-picker-trigger-subtitle-font-size": "0.625rem",
    "--language-picker-option-flag-size": "1.1875rem",
    "--language-picker-option-primary-font-size": "0.75rem",
    "--language-picker-option-subtitle-font-size": "0.625rem",
  },
  xs: {
    "--language-picker-trigger-flag-size": "1.1875rem",
    "--language-picker-trigger-primary-font-size": "0.75rem",
    "--language-picker-trigger-subtitle-font-size": "0.625rem",
    "--language-picker-option-flag-size": "1.25rem",
    "--language-picker-option-primary-font-size": "0.75rem",
    "--language-picker-option-subtitle-font-size": "0.625rem",
  },
  sm: {
    "--language-picker-trigger-flag-size": "1.25rem",
    "--language-picker-trigger-primary-font-size": "0.75rem",
    "--language-picker-trigger-subtitle-font-size": "0.625rem",
    "--language-picker-option-flag-size": "1.3125rem",
    "--language-picker-option-primary-font-size": "0.75rem",
    "--language-picker-option-subtitle-font-size": "0.625rem",
  },
  md: {
    "--language-picker-trigger-flag-size": "1.375rem",
    "--language-picker-trigger-primary-font-size": "0.8125rem",
    "--language-picker-trigger-subtitle-font-size": "0.6875rem",
    "--language-picker-option-flag-size": "1.4375rem",
    "--language-picker-option-primary-font-size": "0.8125rem",
    "--language-picker-option-subtitle-font-size": "0.6875rem",
  },
  lg: {
    "--language-picker-trigger-flag-size": "1.5rem",
    "--language-picker-trigger-primary-font-size": "0.875rem",
    "--language-picker-trigger-subtitle-font-size": "0.75rem",
    "--language-picker-option-flag-size": "1.625rem",
    "--language-picker-option-primary-font-size": "0.875rem",
    "--language-picker-option-subtitle-font-size": "0.75rem",
  },
  xl: {
    "--language-picker-trigger-flag-size": "1.625rem",
    "--language-picker-trigger-primary-font-size": "0.9375rem",
    "--language-picker-trigger-subtitle-font-size": "0.75rem",
    "--language-picker-option-flag-size": "1.75rem",
    "--language-picker-option-primary-font-size": "0.9375rem",
    "--language-picker-option-subtitle-font-size": "0.75rem",
  },
  "2xl": {
    "--language-picker-trigger-flag-size": "1.75rem",
    "--language-picker-trigger-primary-font-size": "1rem",
    "--language-picker-trigger-subtitle-font-size": "0.8125rem",
    "--language-picker-option-flag-size": "1.875rem",
    "--language-picker-option-primary-font-size": "1rem",
    "--language-picker-option-subtitle-font-size": "0.8125rem",
  },
};

const LABEL_BASE_VARS: LanguagePickerVars = {
  "--language-label-gap": "0.625rem",
  "--language-label-stack-gap": "0.0625rem",
  "--language-label-primary-font-size": "0.8125rem",
  "--language-label-subtitle-font-size": "0.6875rem",
};

const LABEL_SINGLE_LINE_VARS: LanguagePickerVars = {
  "--language-label-flag-size": "1.25rem",
};

const LABEL_TWO_LINE_VARS: LanguagePickerVars = {
  "--language-label-flag-size": "1.5rem",
};

export const triggerFlagStyle: CSSProperties = {
  inlineSize: "var(--language-picker-trigger-flag-size)",
};

export const optionFlagStyle: CSSProperties = {
  inlineSize: "var(--language-picker-option-flag-size)",
};

export const labelFlagStyle: CSSProperties = {
  inlineSize: "var(--language-label-flag-size)",
};

export function resolveLanguageEntry(locale?: string | null): LanguageEntry | null {
  if (!locale) return null;
  return (
    languagesByLocale[locale] ??
    languagesByLocale[locale.split("-")[0] ?? ""] ??
    null
  );
}

export function languagePickerVars(size: ComboboxSize): LanguagePickerVars {
  return PICKER_SIZE_VARS[size];
}

export function languageLabelVars(withSubtitle: boolean): LanguagePickerVars {
  return {
    ...LABEL_BASE_VARS,
    ...(withSubtitle ? LABEL_TWO_LINE_VARS : LABEL_SINGLE_LINE_VARS),
  };
}
