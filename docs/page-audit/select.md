# Select page and package audit

Reviewed `apps/docs/src/pages/SelectPage.tsx` and `packages/react-select` against the component-quality contract. This includes browser verification, not just source inspection.

## Corrections

- Select's popup width rule targeted a `data-position` attribute that the wrapper never rendered. The wrapper now sets it; the popup matches its trigger, respects available viewport dimensions, and wraps long option text. Trigger value truncation is applied to the actual value child.
- Select's 24px clear action reserved only 16px, overlapping the value area. The reserved slot now matches the button and the chevron has a stable width. Trigger height is a minimum and vertical padding is symmetric.
- Combobox data-disabled options were keyboard-disabled but still mouse-selectable. Both data and mounted item-prop disability now feed selection and highlight behavior. Mouse handlers honor cancellation, and item pointer handlers are composed.
- Non-searchable Combobox had no keyboard commit path. Its trigger now retains focus, exposes the active option and handles navigation/selection while open. Search fields have a default accessible name; consumers can override it. Multi-select lists expose `aria-multiselectable`, groups link their heading, and clear/chip actions are keyboard reachable. Nested action keys do not open the trigger.
- Ordinary Combobox navigation now scrolls the active option into view. Virtual rows measure their actual wrapped content instead of assuming the estimate is the true height. Option labels can wrap, popup height/width are bounded, and directly composed lists can scroll.
- Both popup/spinner families suppress nonessential animations under reduced motion. Combobox clear actions have a 24px target.
- SelectField uses shared `hasFieldContent` for helper/error/counter IDs and infers invalid from an error unless explicitly overridden. SelectTrigger preserves native `aria-invalid` values when `invalid` is absent and gives an explicit `invalid` priority.
- Page examples have accessible trigger names, corrected mojibake in the Field example and no unused grouped-data memo. The package CodeBlock migration from root is retained. The clear-action usage comment no longer promises that the action only appears for nonempty values.
- Corrected the virtualizer source comment: the dependency is statically imported; the rendering option is not a lazy-loading boundary.

## Files and checks

Changed: `Select.tsx`, `Select.css`, `SelectField.tsx`, `Combobox.tsx`, `Combobox.css`, `use-combobox.ts`, `virtualizer.ts` under the owning package; the assigned page; and the package-only fixture `apps/docs/tests/select-quality.{html,tsx}`.

- `pnpm --filter @virtari-packages/react-select typecheck`: passed.
- `pnpm --filter @virtari-packages/react-select build`: passed (ESM, CJS, declarations and exported CSS).
- `git diff --check` for package/page/fixture: passed.
- Chromium fixture: **15/15 passed**, covering disabled data/item selection, accessible input name, keyboard serialization, focus return (including clear), native reset, non-searchable navigation/commit, disabled form exclusion, field error association, clear/value separation, normal and virtual scrolling, and nonoverlapping variable-height virtual rows.
- Rendered a 280px package-only Select with long Latin/Persian content in light tonal and dark bordered RTL; rendered Combobox in OLED elevated RTL. Verified wrapping, indicator/clear alignment and popup containment visually. Existing active text uses unchanged semantic roles; no new text color mapping was introduced.
- Loaded the real `#/select` page and inspected its complete accessible structure: Field label/error, sizes/appearances, disabled/loading examples, Combobox examples and static code blocks render.

## Remaining limits / guidance for root

- Async fetching, cancellation and required Combobox validation remain application-owned. Selected display metadata still depends on the supplied `items`; retain selected items when replacing async results if their labels must remain visible.
- Put disabled state in `ComboboxItemData` for virtualized options: an unmounted row cannot register an item-only disabled prop.
- Scoped appearance/theme must also be applied to portalled content, as documented by the shared surface contract. This audit did not verify every nested theme combination, real assistive technology, mobile touch, or Safari native form behavior.
- Root owns the final AI build/check/test and any curated guidance changes. Suggested guidance: document non-searchable keyboard support, measured virtual rows, data-disabled state for virtualization, accessible trigger labels and SelectField error inference. No generated knowledge or curated authoring files were edited here.
