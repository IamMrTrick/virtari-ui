# @virtari-packages/react-otp-input

## 0.3.2

### Patch Changes

- 4bfc69a: Fix radius token behavior in pill mode across the design system.
  - Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
  - Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
  - Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
  - Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.

## 0.3.1

### Patch Changes

- e3f38c5: Fix editable color and input interactions.
  - Restore native iOS text selection/callout behavior for editable controls and replace transform-based typing motion with a non-geometric pulse.
  - Render gradient stop color popovers as floating solid ColorPicker surfaces so stop editing uses the same single-color picker UI.
  - Make the utilities build cleanup cross-platform so `pnpm run build` works on Windows.

## 0.3.0

### Minor Changes

- bdd9b44: Migrate redundant `data-*` state attributes to their semantic ARIA equivalents across the design system. Where a component already exposes `aria-busy`, `aria-selected`, `aria-expanded`, `aria-disabled`, or `aria-invalid` on the same element, the duplicate `data-loading` / `data-selected` / `data-expanded` / `data-disabled` / `data-invalid` is removed and the corresponding CSS selectors switch to the ARIA form (`[aria-X="true"]`, plus `:disabled` where applicable for native form controls).

  **Note for consumers:** if you wrote CSS overrides targeting the removed `data-*` attributes (e.g. `.vds-button[data-loading]`, `.vds-table__tr[data-selected="true"]`, `.vds-chip[data-disabled="true"]`), update them to the ARIA selector. Visual behavior, specificity, and component APIs are unchanged — only the styling hook moves.

  Variant attributes (`data-variant`, `data-size`, `data-color`, `data-state`, `data-active`, `data-readonly`, `data-placeholder`, etc.) are intentionally kept where no ARIA equivalent exists.

## 0.2.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/utils@0.4.0
