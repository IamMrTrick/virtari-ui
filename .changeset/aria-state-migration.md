---
"@virtari-packages/react-button": minor
"@virtari-packages/react-select": minor
"@virtari-packages/react-chip": minor
"@virtari-packages/react-table": minor
"@virtari-packages/react-data-table": minor
"@virtari-packages/react-tree-view": minor
"@virtari-packages/react-bottom-nav": minor
"@virtari-packages/react-otp-input": minor
"@virtari-packages/react-language-picker": minor
"@virtari-packages/react-date-picker": minor
---

Migrate redundant `data-*` state attributes to their semantic ARIA equivalents across the design system. Where a component already exposes `aria-busy`, `aria-selected`, `aria-expanded`, `aria-disabled`, or `aria-invalid` on the same element, the duplicate `data-loading` / `data-selected` / `data-expanded` / `data-disabled` / `data-invalid` is removed and the corresponding CSS selectors switch to the ARIA form (`[aria-X="true"]`, plus `:disabled` where applicable for native form controls).

**Note for consumers:** if you wrote CSS overrides targeting the removed `data-*` attributes (e.g. `.vds-button[data-loading]`, `.vds-table__tr[data-selected="true"]`, `.vds-chip[data-disabled="true"]`), update them to the ARIA selector. Visual behavior, specificity, and component APIs are unchanged — only the styling hook moves.

Variant attributes (`data-variant`, `data-size`, `data-color`, `data-state`, `data-active`, `data-readonly`, `data-placeholder`, etc.) are intentionally kept where no ARIA equivalent exists.
