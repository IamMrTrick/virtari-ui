---
"@virtari-packages/react-accordion": major
"@virtari-packages/react-alert": major
"@virtari-packages/react-alert-dialog": major
"@virtari-packages/react-avatar": major
"@virtari-packages/react-badge": major
"@virtari-packages/react-bottom-nav": major
"@virtari-packages/react-breadcrumb": major
"@virtari-packages/react-button": major
"@virtari-packages/react-checkbox": major
"@virtari-packages/react-chip": major
"@virtari-packages/react-collapsible": major
"@virtari-packages/react-date-picker": major
"@virtari-packages/react-dialog": major
"@virtari-packages/react-drawer": major
"@virtari-packages/react-dropdown-menu": major
"@virtari-packages/react-file-upload": major
"@virtari-packages/react-form": major
"@virtari-packages/react-label": major
"@virtari-packages/react-nav": major
"@virtari-packages/react-phone-input": major
"@virtari-packages/react-popover": major
"@virtari-packages/react-progress": major
"@virtari-packages/react-radio-group": major
"@virtari-packages/react-scroll-area": major
"@virtari-packages/react-segmented-control": major
"@virtari-packages/react-select": major
"@virtari-packages/react-separator": major
"@virtari-packages/react-slider": major
"@virtari-packages/react-switch": major
"@virtari-packages/react-table": major
"@virtari-packages/react-tabs": major
"@virtari-packages/react-text": major
"@virtari-packages/react-toast": major
"@virtari-packages/react-toggle": major
"@virtari-packages/react-tooltip": major
"@virtari-packages/react-visually-hidden": major
"@virtari-packages/react-command": patch
"@virtari-packages/react-language-picker": patch
"@virtari-packages/react-yoopta-editor": patch
---

Own the primitive layer: every component now builds on `@virtari-packages/primitives` instead of `@radix-ui/*`.

The behaviour layer — focus management, keyboard navigation, portalling, dismissable layers, floating positioning — has been forked into a new in-tree package we maintain ourselves. Component behaviour and accessibility are unchanged; what changes is who owns the code and what it writes into the DOM.

**Breaking — anything that targeted the old names must be updated:**

- Generated element ids are now prefixed `vds-` instead of `radix-` (e.g. `aria-controls="vds-_r_4o_"`). Affects DOM snapshots and tests that assert on ids.
- Emitted attributes are now `data-vds-*` instead of `data-radix-*` — `data-vds-popper-content-wrapper`, `data-vds-focus-guard`, `data-vds-collection-item`, `data-vds-select-viewport`, `data-vds-scroll-area-viewport`, `data-vds-menu-content`.
- Emitted CSS custom properties are now `--vds-*` instead of `--radix-*` — `--vds-popper-available-width`, `--vds-select-trigger-width`, `--vds-accordion-content-height`, `--vds-collapsible-content-height`, and the rest of the popper/toast/slider/scroll-area set.
- Every `@radix-ui/*` dependency is gone. Apps that render Radix components *inside* ours via `asChild` were relying on a shared Radix context; that context is no longer shared.

**Also fixed:** `ScrollArea`'s corner never received its background colour — the stylesheet targeted `[data-radix-scroll-area-corner]`, an attribute the primitive never emitted. The corner now carries `.vds-scroll-area-corner` and the rule matches.
