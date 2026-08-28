# @virtari-packages/react-language-picker

## 0.5.3

### Patch Changes

- 08252d7: Own the primitive layer: every component now builds on `@virtari-packages/primitives` instead of `@radix-ui/*`.

  The behaviour layer — focus management, keyboard navigation, portalling, dismissable layers, floating positioning — has been forked into a new in-tree package we maintain ourselves. Component behaviour and accessibility are unchanged; what changes is who owns the code and what it writes into the DOM.

  **Breaking — anything that targeted the old names must be updated:**
  - Generated element ids are now prefixed `vds-` instead of `radix-` (e.g. `aria-controls="vds-_r_4o_"`). Affects DOM snapshots and tests that assert on ids.
  - Emitted attributes are now `data-vds-*` instead of `data-radix-*` — `data-vds-popper-content-wrapper`, `data-vds-focus-guard`, `data-vds-collection-item`, `data-vds-select-viewport`, `data-vds-scroll-area-viewport`, `data-vds-menu-content`.
  - Emitted CSS custom properties are now `--vds-*` instead of `--radix-*` — `--vds-popper-available-width`, `--vds-select-trigger-width`, `--vds-accordion-content-height`, `--vds-collapsible-content-height`, and the rest of the popper/toast/slider/scroll-area set.
  - Every `@radix-ui/*` dependency is gone. Apps that render Radix components _inside_ ours via `asChild` were relying on a shared Radix context; that context is no longer shared.

  **Also fixed:** `ScrollArea`'s corner never received its background colour — the stylesheet targeted `[data-radix-scroll-area-corner]`, an attribute the primitive never emitted. The corner now carries `.vds-scroll-area-corner` and the rule matches.

- Updated dependencies [08252d7]
  - @virtari-packages/react-button@1.0.0
  - @virtari-packages/react-drawer@1.0.0
  - @virtari-packages/react-select@1.0.0

## 0.5.2

### Patch Changes

- 4bfc69a: Fix radius token behavior in pill mode across the design system.
  - Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
  - Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
  - Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
  - Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.

- Updated dependencies [4bfc69a]
  - @virtari-packages/react-button@0.4.2
  - @virtari-packages/react-select@0.5.1

## 0.5.1

### Patch Changes

- Updated dependencies [b893c0a]
  - @virtari-packages/react-button@0.4.1
  - @virtari-packages/react-drawer@0.6.0

## 0.5.0

### Minor Changes

- bdd9b44: Migrate redundant `data-*` state attributes to their semantic ARIA equivalents across the design system. Where a component already exposes `aria-busy`, `aria-selected`, `aria-expanded`, `aria-disabled`, or `aria-invalid` on the same element, the duplicate `data-loading` / `data-selected` / `data-expanded` / `data-disabled` / `data-invalid` is removed and the corresponding CSS selectors switch to the ARIA form (`[aria-X="true"]`, plus `:disabled` where applicable for native form controls).

  **Note for consumers:** if you wrote CSS overrides targeting the removed `data-*` attributes (e.g. `.vds-button[data-loading]`, `.vds-table__tr[data-selected="true"]`, `.vds-chip[data-disabled="true"]`), update them to the ARIA selector. Visual behavior, specificity, and component APIs are unchanged — only the styling hook moves.

  Variant attributes (`data-variant`, `data-size`, `data-color`, `data-state`, `data-active`, `data-readonly`, `data-placeholder`, etc.) are intentionally kept where no ARIA equivalent exists.

### Patch Changes

- Updated dependencies [bdd9b44]
  - @virtari-packages/react-button@0.4.0
  - @virtari-packages/react-select@0.5.0

## 0.4.1

### Patch Changes

- Rolling update 4 — react-flow debut + editor power-up + form-input polish.
  - **react-flow:** new package — flow canvas, badge edges, persistence hook, layout helper, tokens.
  - **react-editor:** EditorTableHoverActions + EditorToolbar overhaul, context/utils/types expansion, theme additions.
  - **react-input / react-number-input / react-textarea:** input CSS refinements.
  - **react-language-picker:** popover/menu CSS additions.
  - **react-select:** Combobox + Select CSS + token tweaks.
  - **react-switch:** Switch CSS + drag hook tuning.

- Updated dependencies [b9889b9]
- Updated dependencies
  - @virtari-packages/react-button@0.3.1
  - @virtari-packages/react-select@0.4.1

## 0.4.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/utils@0.4.0
  - @virtari-packages/react-button@0.3.0
  - @virtari-packages/react-drawer@0.5.0
  - @virtari-packages/react-flag@0.3.0
  - @virtari-packages/react-select@0.4.0

## 0.3.2

### Patch Changes

- Updated dependencies [9727c41]
- Updated dependencies [39d97e8]
  - @virtari-packages/utils@0.3.0
  - @virtari-packages/react-drawer@0.4.0
  - @virtari-packages/react-select@0.3.0
  - @virtari-packages/react-button@0.2.1
  - @virtari-packages/react-flag@0.2.1

## 0.3.1

### Patch Changes

- Updated dependencies [1132161]
  - @virtari-packages/react-drawer@0.3.0

## 0.3.0

### Minor Changes

- 906caf1: - **NEW:** `@virtari-packages/react-bottom-nav` — mobile-first bottom navigation with Material 3 / iOS / Floating / Underline variants, FAB, badges, safe-area insets, auto-hide, and animated indicator.
  - **react-checkbox:** added `PillCheckbox` variant.
  - **react-language-picker:** added `LanguageMark` component and split internals.
  - **react-date-picker:** minor fixes from the latest token cleanup.

## 0.2.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.

### Patch Changes

- Updated dependencies [8dd36ce]
  - @virtari-packages/utils@0.2.0
  - @virtari-packages/react-flag@0.2.0
  - @virtari-packages/react-select@0.2.0
