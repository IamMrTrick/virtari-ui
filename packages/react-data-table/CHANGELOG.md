# @virtari-packages/react-data-table

## 0.5.4

### Patch Changes

- 4bfc69a: Fix radius token behavior in pill mode across the design system.
  - Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
  - Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
  - Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
  - Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.

- Updated dependencies [4bfc69a]
  - @virtari-packages/react-button@0.4.2
  - @virtari-packages/react-input@0.4.2
  - @virtari-packages/react-pagination@0.2.3
  - @virtari-packages/react-select@0.5.1
  - @virtari-packages/react-tabs@0.4.1

## 0.5.3

### Patch Changes

- Updated dependencies [e3f38c5]
  - @virtari-packages/react-input@0.4.1

## 0.5.2

### Patch Changes

- Updated dependencies [b893c0a]
  - @virtari-packages/react-button@0.4.1
  - @virtari-packages/react-drawer@0.6.0
  - @virtari-packages/react-input@0.4.0

## 0.5.1

### Patch Changes

- bcc94b9: Widen the optional `@dnd-kit/sortable` peer range to support v10 consumers without install warnings.
- Updated dependencies [9d56d6d]
  - @virtari-packages/react-popover@0.4.1

## 0.5.0

### Minor Changes

- bdd9b44: Migrate redundant `data-*` state attributes to their semantic ARIA equivalents across the design system. Where a component already exposes `aria-busy`, `aria-selected`, `aria-expanded`, `aria-disabled`, or `aria-invalid` on the same element, the duplicate `data-loading` / `data-selected` / `data-expanded` / `data-disabled` / `data-invalid` is removed and the corresponding CSS selectors switch to the ARIA form (`[aria-X="true"]`, plus `:disabled` where applicable for native form controls).

  **Note for consumers:** if you wrote CSS overrides targeting the removed `data-*` attributes (e.g. `.vds-button[data-loading]`, `.vds-table__tr[data-selected="true"]`, `.vds-chip[data-disabled="true"]`), update them to the ARIA selector. Visual behavior, specificity, and component APIs are unchanged — only the styling hook moves.

  Variant attributes (`data-variant`, `data-size`, `data-color`, `data-state`, `data-active`, `data-readonly`, `data-placeholder`, etc.) are intentionally kept where no ARIA equivalent exists.

### Patch Changes

- Updated dependencies [bdd9b44]
  - @virtari-packages/react-button@0.4.0
  - @virtari-packages/react-select@0.5.0
  - @virtari-packages/react-chip@0.4.0
  - @virtari-packages/react-pagination@0.2.2

## 0.4.1

### Patch Changes

- Updated dependencies [b9889b9]
- Updated dependencies
  - @virtari-packages/react-button@0.3.1
  - @virtari-packages/react-input@0.3.1
  - @virtari-packages/react-select@0.4.1
  - @virtari-packages/react-switch@0.3.1
  - @virtari-packages/react-pagination@0.2.1

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
  - @virtari-packages/react-avatar@0.4.0
  - @virtari-packages/react-badge@0.3.0
  - @virtari-packages/react-button@0.3.0
  - @virtari-packages/react-checkbox@0.5.0
  - @virtari-packages/react-chip@0.3.0
  - @virtari-packages/react-drawer@0.5.0
  - @virtari-packages/react-dropdown-menu@0.4.0
  - @virtari-packages/react-icons@0.3.0
  - @virtari-packages/react-input@0.3.0
  - @virtari-packages/react-pagination@0.2.0
  - @virtari-packages/react-popover@0.4.0
  - @virtari-packages/react-select@0.4.0
  - @virtari-packages/react-switch@0.3.0
  - @virtari-packages/react-tabs@0.4.0

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

### Patch Changes

- Updated dependencies [9727c41]
- Updated dependencies [39d97e8]
  - @virtari-packages/utils@0.3.0
  - @virtari-packages/react-avatar@0.3.0
  - @virtari-packages/react-drawer@0.4.0
  - @virtari-packages/react-dropdown-menu@0.3.0
  - @virtari-packages/react-popover@0.3.0
  - @virtari-packages/react-tabs@0.3.0
  - @virtari-packages/react-checkbox@0.4.0
  - @virtari-packages/react-select@0.3.0
  - @virtari-packages/react-badge@0.2.1
  - @virtari-packages/react-button@0.2.1
  - @virtari-packages/react-chip@0.2.1
  - @virtari-packages/react-icons@0.2.1
  - @virtari-packages/react-input@0.2.1
  - @virtari-packages/react-switch@0.2.1

## 0.2.2

### Patch Changes

- Updated dependencies [1132161]
  - @virtari-packages/react-drawer@0.3.0

## 0.2.1

### Patch Changes

- Updated dependencies [906caf1]
  - @virtari-packages/react-checkbox@0.3.0

## 0.2.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.

### Patch Changes

- Updated dependencies [8dd36ce]
  - @virtari-packages/utils@0.2.0
  - @virtari-packages/react-avatar@0.2.0
  - @virtari-packages/react-badge@0.2.0
  - @virtari-packages/react-checkbox@0.2.0
  - @virtari-packages/react-drawer@0.2.0
  - @virtari-packages/react-dropdown-menu@0.2.0
  - @virtari-packages/react-icons@0.2.0
  - @virtari-packages/react-input@0.2.0
  - @virtari-packages/react-popover@0.2.0
  - @virtari-packages/react-switch@0.2.0
