# Docs translation guide

## What\u2019s already wired

- **i18n runtime**: `i18next` + `react-i18next`, initialised in [`src/i18n/index.ts`](src/i18n/index.ts) and imported once from [`src/main.tsx`](src/main.tsx).
- **Supported locales**: `en` (default) and `fa`.
- **Route format**: `#/[locale]/[page]`. The `en` prefix is optional (`#/button` \u2261 `#/en/button`); `fa` is always prefixed (`#/fa/button`). Locale parsing lives in `parseHash` / `writeHash` in [`src/App.tsx`](src/App.tsx).
- **Language switcher**: in the Settings drawer. Flipping to `fa` also sets `direction=rtl` automatically; users can still override direction independently.
- **Already translated end-to-end**: app shell (Layout, Header, SettingsDrawer), Sidebar + MobileSidebar (groups + item labels + aria), `PAGE_META` (titles + descriptions for all 52 pages), and **IntroductionPage** as a reference implementation.
- **CSS/tech-identifier policy**: API names, CSS at-rules, token names, file paths stay in English in every locale. Only user-facing prose translates.

## File layout

```
src/i18n/
  index.ts                  \u2190 init + resources map + Locale type
  locales/
    en/
      common.json           \u2190 shell: brand, sidebar, settings, groups
      nav.json              \u2190 sidebar item labels keyed by page path
      pageMeta.json         \u2190 title + description for every page
      introduction.json     \u2190 reference page\u2019s content
      \u2026 one file per page when you translate it
    fa/
      \u2026 mirror of en/
```

## Pattern for translating a new page (three-step recipe)

Take `ButtonPage.tsx` as the next example. Repeat for every remaining page.

### 1. Add a namespace file per locale

Create `src/i18n/locales/en/button.json` and `src/i18n/locales/fa/button.json`. Use nested sections that mirror the page\u2019s `<Section>` structure:

```json
// en/button.json
{
  "variants": {
    "title": "Variants",
    "description": "Solid, outline, ghost, link, subtle, danger."
  },
  "sizes": {
    "title": "Sizes",
    "description": "Seven sizes matching Input and Select."
  }
}
```

```json
// fa/button.json
{
  "variants": {
    "title": "\u0648\u0627\u0631\u06cc\u0627\u0646\u062a\u200c\u0647\u0627",
    "description": "\u062a\u0648\u067e\u0631\u060c \u0622\u0648\u062a\u0644\u0627\u06cc\u0646\u060c \u0634\u0641\u0627\u0641\u060c \u0644\u06cc\u0646\u06a9\u060c \u0645\u0644\u0627\u06cc\u0645\u060c \u062e\u0637\u0631."
  }
}
```

### 2. Register the namespace in `src/i18n/index.ts`

```ts
import enButton from "./locales/en/button.json";
import faButton from "./locales/fa/button.json";
// \u2026
export const resources = {
  en: { /* existing */, button: enButton },
  fa: { /* existing */, button: faButton },
};
// and in i18n.init:
ns: [\"common\", \"nav\", \"pageMeta\", \"introduction\", \"button\"],
```

### 3. Use `useTranslation(\"button\")` in the page

```tsx
import { useTranslation } from \"react-i18next\";
import { Section } from \"../components\";

export function ButtonPage() {
  const { t } = useTranslation(\"button\");
  return (
    <>
      <Section title={t(\"variants.title\")} description={t(\"variants.description\")}>
        {/* demo */}
      </Section>
      <Section title={t(\"sizes.title\")} description={t(\"sizes.description\")}>
        {/* demo */}
      </Section>
    </>
  );
}
```

## Handling interpolation and HTML-rich strings

Use `<Trans>` with numbered `components` when you need inline tags (links, `<strong>`, `<code>`):

```tsx
<Trans
  ns=\"introduction\"
  i18nKey=\"whatIs.body\"
  components={[<strong key=\"0\" />, <strong key=\"1\" />, <code key=\"2\" />]}
/>
```

Markers `<1>...</1>`, `<2>...</2>` in the JSON correspond to the array indices. See `introduction.json` and `IntroductionPage.tsx` for the live example.

For variable injection use `{{varName}}`:

```json
{ \"sidebar.noMatches\": \"No matches for \u201c{{query}}\u201d.\" }
```

```tsx
t(\"sidebar.noMatches\", { query })
```

## What NOT to translate

- CSS at-rules: `@layer`, `@import`, `@property`, `@custom-media`, `@keyframes`.
- CSS functions/features: `color-mix()`, `:has()`, `OKLCH`, `Container Queries`, `Logical Properties` (keep English \u2014 canonical).
- Package names: `@virtari-packages/core`, `@virtari-packages/primitives/*`.
- Component / prop names: `<Button variant=\"outline\">`, `aria-label`, `data-state`.
- File paths and CLI commands.
- Token names like `--vds-color-text`.
- Design-system identifiers that appear as code in the UI (they live in `<code>`, `<pre>`, or `<Badge>` bodies).

When in doubt: if it would appear verbatim inside a React code example, leave it untouched.

## Persian conventions used

- Digits inside prose: Persian numerals (\u06f0\u2013\u06f9). Digits inside code blocks or package names: ASCII 0\u20139.
- Arrows: keep ASCII `->` or Unicode `\u2192` (Persian shouldn\u2019t flip these; they\u2019re bidi-isolated in code blocks anyway).
- Persian quotation marks: \u00ab \u00bb (not \u201c \u201d).
- RTL punctuation: Persian comma `\u060c` instead of `,` in prose; Persian question mark `\u061f` instead of `?` (end of sentence only).
- Em dash `\u2014` stays the same.

## Verifying a translation

1. Start dev: `pnpm --filter @virtari-packages/docs dev`.
2. Open the page in `en` \u2192 visual sanity check.
3. Switch locale in Settings \u2192 the URL gains `/fa/`, direction flips to RTL, every translated string swaps.
4. Re-check: the Sidebar, page title + description in the header, and every `<Section title>` now render in Persian.
5. Missing keys fall back to the English value (thanks to `fallbackLng`), so untranslated chunks are visible but not broken.

## Remaining work checklist

Pages not yet extracted to locale files (each needs its own `button.json` / `dialog.json` / \u2026 pair):

```
ButtonPage      InputPage        TextareaPage     SelectPage
CheckboxPage    RadioGroupPage   SwitchPage       TogglePage
SliderPage      DatePickerPage   PhoneInputPage   LanguagePickerPage
LabelPage       AvatarPage       BadgePage        ChipPage
FlagPage        CardPage         HeadingPage      TextPage
SeparatorPage   KbdPage          ProgressPage     SkeletonPage
SpinnerPage     DialogPage       DrawerPage       AlertDialogPage
DropdownMenuPage PopoverPage     TooltipPage      ToastPage
HeaderPage      NavPage          BottomNavPage    SidebarPage
BreadcrumbPage  TabsPage         AccordionPage    CollapsiblePage
ScrollAreaPage  TablePage        DataTablePage    DataTableUsersPage
SizingPage      ColorsPage       TypographyPage   IconsPage
CompositionPage LayoutPage       UtilitiesPage    RTLPage
```

Apply the three-step recipe to each. The titles + descriptions already exist in `pageMeta.json`, so you can reuse those keys when a `<Section>` title duplicates the page-header title.
