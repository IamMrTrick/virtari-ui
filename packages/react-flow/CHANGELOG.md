# @virtari-packages/react-flow

## 0.2.1

### Patch Changes

- 4bfc69a: Fix radius token behavior in pill mode across the design system.
  - Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
  - Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
  - Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
  - Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.

## 0.2.0

### Minor Changes

- Rolling update 4 — react-flow debut + editor power-up + form-input polish.
  - **react-flow:** new package — flow canvas, badge edges, persistence hook, layout helper, tokens.
  - **react-editor:** EditorTableHoverActions + EditorToolbar overhaul, context/utils/types expansion, theme additions.
  - **react-input / react-number-input / react-textarea:** input CSS refinements.
  - **react-language-picker:** popover/menu CSS additions.
  - **react-select:** Combobox + Select CSS + token tweaks.
  - **react-switch:** Switch CSS + drag hook tuning.

## 0.1.0

- Initial release.
