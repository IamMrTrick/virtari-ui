# @virtari-packages/tokens

## 0.5.0

### Minor Changes

- 374334c: Fix the token foundations: undefined names, dark-mode contrast, and the missing interior-spacing and radius-composition tiers.

  **Contrast (behavioural — colours change)**
  - `--vds-color-on-warning` was `neutral-12`, which is dark ink in light mode and near-white in dark. Every warning solid rendered white-on-amber at 2.19:1 as soon as the theme flipped. It now points at `--vds-color-black`, which is mode-independent like amber itself: 7.78:1 in both modes.
  - Dark-mode `{primary,success,info,danger,accent}-9` carried white text at 3.27–4.01:1. Lightness lowered to the highest value on the scale's grid that still clears 4.5:1, with hue and chroma held exactly: primary `0.610→0.575`, success `0.610→0.545`, danger `0.620→0.585`, info `0.620→0.555`, accent `0.665→0.580`. `warning-9` is unchanged — it carries black ink.
  - `--vds-color-text-placeholder` moves from `neutral-9` (4.11:1 light / 3.57:1 dark) to `neutral-11` (7.77:1 / 7.60:1).
  - The dark intent ramp now also applies under `[data-theme="dark-oled"]`. It always should have: the OLED block overrides step 1 only, which is only coherent if steps 2–12 come from the dark ladder. Previously an OLED page got the light-mode intent ramp on a pure-black canvas.
  - `color-scheme` on bare `:root` narrows from `light dark` to `light`. Nothing in the system implements `prefers-color-scheme`, so the wider value made the browser darken the surfaces it owns — scrollbars, form controls, autofill, `<select>` popups — while every token stayed light. `[data-theme="dark"]` still declares `dark`.

  **New tokens**
  - `colors/aliases.css` defines the ~40 names components were already typing but that resolved to nothing, so those `var()` lookups stopped falling through to hardcoded hex: bare intent names (`--vds-color-primary`), the `*-emphasis` / `*-on-emphasis` / `*-muted` / `*-muted-text` / `*-subtle` families, `--vds-color-neutral-solid` / `-bg`, the `overlay*` spelling of `scrim*`, and the `sky-11` / `emerald-11` / `violet-11` syntax-highlight hues used by `react-editor`.
  - `--vds-color-border-interactive` (`neutral-9`) — the first neutral step that clears WCAG 1.4.11's 3:1 for the boundary of an operable control. `--vds-color-border` is a divider weight (1.73:1) and was being used for both.
  - `--vds-opacity-disabled` — one disabled opacity, replacing eight ad-hoc values.
  - `--vds-focus-ring-width` / `--vds-focus-ring-offset` — replacing ~20 per-component duplicates.
  - `spacing/semantic.css` — the interior-spacing tier: `--vds-surface-padding-inline/-block`, `--vds-slot-gap`, `--vds-stack-gap`, `--vds-cluster-gap`, `--vds-label-gap`, `--vds-control-padding-inline` and `-emphasis`. Strictly ordered, so nested groupings stay legible.
  - `--vds-surface-width-{xs,sm,md,lg,xl,2xl}` in `sizing.css` — overlay widths. Dialogs had been sized with `--vds-space-*`, which couples every overlay's width to the spacing ramp.

  **Radius**
  - `--vds-radius-0` was unitless `0`, which is a `<number>`, not a `<length>` — so any `calc()` subtracting a length from it was invalid and dropped the whole declaration. Now `0px`.
  - New `radii/nesting.css` adds the concentricity channel: a container opts in with `data-radius-host` and publishes `--vds-radius-host-r/-b/-p`; its direct children read `--vds-radius-inset` or `--vds-radius-flush`. Registered with `inherits: false` so it reaches exactly one level. Infrastructure — no component is migrated onto it yet.

  **core**
  - `*::-webkit-scrollbar-thumb` hardcoded `border-radius: 999px`, bypassing `--vds-radius-scrollbar-thumb`, which exists specifically to stop an 8px-thick thumb from rendering as a capsule. It now uses the token.
  - The `:focus-visible` ring reads `--vds-focus-ring-width` / `-offset` instead of `2px` literals.

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
