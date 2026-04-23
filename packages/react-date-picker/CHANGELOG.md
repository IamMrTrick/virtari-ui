# @virtari-packages/react-date-picker

## 0.3.0

### Minor Changes

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
  - @virtari-packages/react-drawer@0.4.0
  - @virtari-packages/react-radio-group@0.4.0
  - @virtari-packages/react-button@0.2.1
  - @virtari-packages/react-dialog@0.2.1
  - @virtari-packages/react-icons@0.2.1

## 0.2.2

### Patch Changes

- Updated dependencies [1132161]
  - @virtari-packages/react-drawer@0.3.0

## 0.2.1

### Patch Changes

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
  - @virtari-packages/react-button@0.2.0
  - @virtari-packages/react-dialog@0.2.0
  - @virtari-packages/react-drawer@0.2.0
  - @virtari-packages/react-icons@0.2.0
  - @virtari-packages/react-radio-group@0.3.0
