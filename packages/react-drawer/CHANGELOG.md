# @virtari-packages/react-drawer

## 1.0.0

### Major Changes

- 08252d7: Own the primitive layer: every component now builds on `@virtari-packages/primitives` instead of `@radix-ui/*`.

  The behaviour layer — focus management, keyboard navigation, portalling, dismissable layers, floating positioning — has been forked into a new in-tree package we maintain ourselves. Component behaviour and accessibility are unchanged; what changes is who owns the code and what it writes into the DOM.

  **Breaking — anything that targeted the old names must be updated:**
  - Generated element ids are now prefixed `vds-` instead of `radix-` (e.g. `aria-controls="vds-_r_4o_"`). Affects DOM snapshots and tests that assert on ids.
  - Emitted attributes are now `data-vds-*` instead of `data-radix-*` — `data-vds-popper-content-wrapper`, `data-vds-focus-guard`, `data-vds-collection-item`, `data-vds-select-viewport`, `data-vds-scroll-area-viewport`, `data-vds-menu-content`.
  - Emitted CSS custom properties are now `--vds-*` instead of `--radix-*` — `--vds-popper-available-width`, `--vds-select-trigger-width`, `--vds-accordion-content-height`, `--vds-collapsible-content-height`, and the rest of the popper/toast/slider/scroll-area set.
  - Every `@radix-ui/*` dependency is gone. Apps that render Radix components _inside_ ours via `asChild` were relying on a shared Radix context; that context is no longer shared.

  **Also fixed:** `ScrollArea`'s corner never received its background colour — the stylesheet targeted `[data-radix-scroll-area-corner]`, an attribute the primitive never emitted. The corner now carries `.vds-scroll-area-corner` and the rule matches.

## 0.6.0

### Minor Changes

- b893c0a: Ship the latest component updates across input, drawer, date picker, button, and toast.
  - Add PasswordInput, PasswordInputField, PasswordStrengthMeter, configurable password metrics, standard strength presets, and password strength analysis utilities.
  - Add the Drawer `stretch` prop so consumers can disable overdrag stretching while keeping the existing default behavior.
  - Improve DatePicker and DateRangePicker mobile layouts, including single-month mobile range calendars, full-width mobile surfaces, and inline/popover usage docs.
  - Preserve direct slot children for Button `asChild` rendering.
  - Prevent bottom toast close animation from overriding swipe-exit animation state.

## 0.5.0

### Minor Changes

- 1b6a60e: Rolling update 3 — full design-system pass.
  - **21 new packages graduated to first-class:** react-accordion, react-alert, react-alert-dialog, react-breadcrumb, react-carousel, react-chip, react-code, react-collapsible, react-color-picker, react-command, react-copy-button, react-dialog, react-editor, react-file-upload, react-flag, react-form, react-header, react-icons, react-input, react-kbd, react-label, react-language-picker, react-layout, react-number-input, react-pagination, react-phone-input, react-scroll-area, react-select, react-sidebar, react-switch, react-table, react-tag-input, react-text, react-textarea, react-toast, react-toggle, react-tree-view, react-visually-hidden, react-yoopta-editor.
  - **tokens / utils / utilities:** primitive, helper, and class-generator refinements.
  - **All existing components:** behavior + token polish, RTL fixes, dist-pipeline alignment.
  - **Build pipeline:** missing tsconfig.json added to 5 new packages, pnpm-lock synced with new deps.

### Patch Changes

- Updated dependencies [1b6a60e]
  - @virtari-packages/utils@0.4.0

## 0.4.0

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

## 0.3.0

### Minor Changes

- 1132161: - **react-drawer:** updates to core behavior, utility helpers, and styles.
  - **react-nav:** updates to submenu context and the `useSubmenu` hook.

## 0.2.0

### Minor Changes

- 8dd36ce: Initial release of the Virtari design system under the `@virtari-packages` scope on GitHub Packages.
  - Foundations: `tokens` (CSS variables), `core` (reset + layers), `utilities` (utility classes), `utils` (internal helpers).
  - 44 React component packages (button, input, select, dialog, data-table, date-picker, …).
  - Token-driven, RTL-safe (logical properties + `:dir(rtl)`), private to the `Virtari-Packages` GitHub org.

### Patch Changes

- Updated dependencies [8dd36ce]
  - @virtari-packages/utils@0.2.0
