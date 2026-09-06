# @virtari-packages/react-language-picker API snapshot

Version: 0.6.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./styles": "./dist/LanguagePicker.css",
  "./tokens": "./dist/LanguagePicker.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `LanguagePicker` (export) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `LanguagePickerOption` (export) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `localeToFlag` (export) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `LanguagePickerProps` (type) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `LanguagePickerOptionProps` (type) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `LocaleTag` (type) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `LanguageLabel` (export) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `LanguageLabelProps` (type) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `languages` (export) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `languagesByLocale` (export) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `LanguageEntry` (type) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.
- `LOCALE_TO_FLAG` (export) from `@virtari-packages/react-language-picker`; source: `packages/react-language-picker/src/index.ts`.

## Source type declarations

Source: `packages/react-language-picker/src/data/localeToFlag.ts`

```tsx
export type SupportedLocale = keyof typeof LOCALE_TO_FLAG;
```

Source: `packages/react-language-picker/src/generated/languages.ts`

```tsx
export interface LanguageEntry {
  locale: string;
  native: string;
  english: string;
  flag: CountryCode | null;
  names: { en: string; fa: string; ar: string };
}
```

Source: `packages/react-language-picker/src/internals.ts`

```tsx
export function resolveLanguageEntry(locale?: string | null): LanguageEntry | null;
```

Source: `packages/react-language-picker/src/internals.ts`

```tsx
export function languagePickerVars(size: ComboboxSize): LanguagePickerVars;
```

Source: `packages/react-language-picker/src/internals.ts`

```tsx
export function languageLabelVars(withSubtitle: boolean): LanguagePickerVars;
```

Source: `packages/react-language-picker/src/LanguageLabel.tsx`

```tsx
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
```

Source: `packages/react-language-picker/src/LanguageLabel.tsx`

```tsx
export function LanguageLabel({
  locale,
  showNative = false,
  hideFlag = false,
  className,
  ref,
  style,
  ...rest
}: LanguageLabelProps);
```

Source: `packages/react-language-picker/src/LanguageMark.tsx`

```tsx
export interface LanguageMarkProps extends HTMLAttributes<HTMLSpanElement> {
  flag: CountryCode | null;
  style?: CSSProperties;
}
```

Source: `packages/react-language-picker/src/LanguageMark.tsx`

```tsx
export function LanguageMark({
  flag,
  className,
  style,
  ...rest
}: LanguageMarkProps);
```

Source: `packages/react-language-picker/src/LanguagePicker.tsx`

```tsx
export type LocaleTag = string;
```

Source: `packages/react-language-picker/src/LanguagePicker.tsx`

```tsx
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
```

Source: `packages/react-language-picker/src/LanguagePicker.tsx`

```tsx
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
}: LanguagePickerProps);
```

Source: `packages/react-language-picker/src/LanguagePicker.tsx`

```tsx
export interface LanguagePickerOptionProps {
  entry: LanguageEntry;
  /** Show the native-script name as a muted subtitle below the English primary. Default `true`. */
  showNative?: boolean;
}
```

Source: `packages/react-language-picker/src/LanguagePicker.tsx`

```tsx
export function LanguagePickerOption({ entry, showNative = true }: LanguagePickerOptionProps);
```

Source: `packages/react-language-picker/src/LanguagePicker.tsx`

```tsx
export function localeToFlag(locale: string): CountryCode | null;
```

## Source files

- `packages/react-language-picker/src/data/localeToFlag.ts`
- `packages/react-language-picker/src/generated/languages.ts`
- `packages/react-language-picker/src/index.ts`
- `packages/react-language-picker/src/internals.ts`
- `packages/react-language-picker/src/LanguageLabel.tsx`
- `packages/react-language-picker/src/LanguageMark.tsx`
- `packages/react-language-picker/src/LanguagePicker.css`
- `packages/react-language-picker/src/LanguagePicker.tokens.css`
- `packages/react-language-picker/src/LanguagePicker.tsx`
- `packages/react-language-picker/package.json`
