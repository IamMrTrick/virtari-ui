# @virtari-packages/tokens

## 0.4.2

### Patch Changes

- f2e0170: Define the missing `--vds-color-chart-{1..8}` primitives so data-viz tokens resolve to real colors.
  - The `-muted` / `-strong` chart variants in `colors/semantic/data-viz.css` referenced base `chart-{1..8}` primitives that were never declared anywhere, leaving every chart token invalid at computed-value time (guaranteed-invalid substitution).
  - Add the canonical primitive block: `chart-1/2/3/5/6` alias onto intent step-9 solids (so brand re-tinting propagates automatically), and `chart-4/7/8` carry literal OKLCH hues (violet / teal / yellow) with per-theme tuning.
  - Declared at `:where(:root, [data-theme], [data-brand])` plus a dark override so both the intent aliases and the literals re-resolve at nested theme/brand scopes.

- a2903fb: Fix `[data-brand]` primitive overrides being ignored on the root element.
  - Move the base primitive scales (neutral, intents, alphas) from the bare `@layer tokens` (an implicit sub-layer that CSS orders _after_ every named sub-layer) into a named `@layer tokens.base`, and declare `@layer tokens.base, tokens.brand;` up-front so base is ordered before brand.
  - This makes `[data-brand="…"]` overrides win over the base scales on the _same_ element regardless of specificity, so `<html data-brand="x">` now retints in light and dark — previously only wrapper elements picked up the brand.
  - Also fixes same-element mode combos like `<section data-brand="x" data-theme="dark">`, where the base `[data-theme="dark"]` block used to beat the brand's dark arm.
  - Add a build-free browser cascade test at `packages/tokens/test/brand-scope.html`.

## 0.4.1

### Patch Changes

- 4bfc69a: Fix radius token behavior in pill mode across the design system.
  - Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
  - Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
  - Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
  - Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.

## 0.4.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

## 0.3.0

### Minor Changes

- 9727c41: Second rolling update.
  - **react-data-table:** sticky utilities, toolbar and filter-drawer polish, DnD refinements.
  - **react-drawer / react-popover / react-dropdown-menu:** overlay behavior fixes.
  - **react-nav:** submenu + sticky interop.
  - **tokens / utils / react-avatar / react-slider / react-tabs / react-tooltip:** token + behavior polish.

- 39d97e8: Rolling update across the design system.
  - **tokens / utils:** primitive and helper refinements.
  - **react-data-table:** toolbar, filter drawer, DnD, and namespace refactor.
  - **react-drawer:** drag hook + Drawer.tsx updates.
  - **react-nav:** submenu context + hook refinements.
  - **react-avatar / react-checkbox / react-radio-group / react-select / react-slider / react-tabs / react-tooltip / react-popover / react-dropdown-menu:** behavior and style polish.
  - **react-date-picker / react-bottom-nav:** follow-up fixes for the latest token cleanup.

## 0.2.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.
