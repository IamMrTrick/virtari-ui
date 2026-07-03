# @virtari-packages/react-button

## 0.4.2

### Patch Changes

- 4bfc69a: Fix radius token behavior in pill mode across the design system.
  - Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
  - Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
  - Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
  - Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.

## 0.4.1

### Patch Changes

- b893c0a: Ship the latest component updates across input, drawer, date picker, button, and toast.
  - Add PasswordInput, PasswordInputField, PasswordStrengthMeter, configurable password metrics, standard strength presets, and password strength analysis utilities.
  - Add the Drawer `stretch` prop so consumers can disable overdrag stretching while keeping the existing default behavior.
  - Improve DatePicker and DateRangePicker mobile layouts, including single-month mobile range calendars, full-width mobile surfaces, and inline/popover usage docs.
  - Preserve direct slot children for Button `asChild` rendering.
  - Prevent bottom toast close animation from overriding swipe-exit animation state.

## 0.4.0

### Minor Changes

- bdd9b44: Migrate redundant `data-*` state attributes to their semantic ARIA equivalents across the design system. Where a component already exposes `aria-busy`, `aria-selected`, `aria-expanded`, `aria-disabled`, or `aria-invalid` on the same element, the duplicate `data-loading` / `data-selected` / `data-expanded` / `data-disabled` / `data-invalid` is removed and the corresponding CSS selectors switch to the ARIA form (`[aria-X="true"]`, plus `:disabled` where applicable for native form controls).

  **Note for consumers:** if you wrote CSS overrides targeting the removed `data-*` attributes (e.g. `.vds-button[data-loading]`, `.vds-table__tr[data-selected="true"]`, `.vds-chip[data-disabled="true"]`), update them to the ARIA selector. Visual behavior, specificity, and component APIs are unchanged — only the styling hook moves.

  Variant attributes (`data-variant`, `data-size`, `data-color`, `data-state`, `data-active`, `data-readonly`, `data-placeholder`, etc.) are intentionally kept where no ARIA equivalent exists.

## 0.3.1

### Patch Changes

- b9889b9: Align the Button DOM contract across `asChild` and regular rendering, and replace inferred icon-only styling with an explicit internal state hook.

## 0.3.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/utils@0.4.0

## 0.2.1

### Patch Changes

- Updated dependencies [9727c41]
- Updated dependencies [39d97e8]
  - @virtari-packages/utils@0.3.0

## 0.2.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.

### Patch Changes

- Updated dependencies [8dd36ce]
  - @virtari-packages/utils@0.2.0
