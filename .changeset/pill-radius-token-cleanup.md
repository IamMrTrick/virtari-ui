---
"@virtari-packages/react-accordion": patch
"@virtari-packages/react-alert": patch
"@virtari-packages/react-bottom-nav": patch
"@virtari-packages/react-breadcrumb": patch
"@virtari-packages/react-button": patch
"@virtari-packages/react-button-group": patch
"@virtari-packages/react-carousel": patch
"@virtari-packages/react-code": patch
"@virtari-packages/react-color-picker": patch
"@virtari-packages/react-command": patch
"@virtari-packages/react-copy-button": patch
"@virtari-packages/react-data-table": patch
"@virtari-packages/react-date-picker": patch
"@virtari-packages/react-dialog": patch
"@virtari-packages/react-editor": patch
"@virtari-packages/react-file-upload": patch
"@virtari-packages/react-flow": patch
"@virtari-packages/react-input": patch
"@virtari-packages/react-language-picker": patch
"@virtari-packages/react-nav": patch
"@virtari-packages/react-number-input": patch
"@virtari-packages/react-otp-input": patch
"@virtari-packages/react-pagination": patch
"@virtari-packages/react-radio-group": patch
"@virtari-packages/react-scroll-area": patch
"@virtari-packages/react-select": patch
"@virtari-packages/react-sidebar": patch
"@virtari-packages/react-tabs": patch
"@virtari-packages/react-tag-input": patch
"@virtari-packages/react-toast": patch
"@virtari-packages/react-toggle": patch
"@virtari-packages/react-tree-view": patch
"@virtari-packages/react-yoopta-editor": patch
"@virtari-packages/tokens": patch
---

Fix radius token behavior in pill mode across the design system.

- Keep the generic t-shirt radius scale finite in `data-radius="pill"` so raw `sm` and `md` no longer make cards, inputs, code blocks, editor blocks, or date cells fully rounded.
- Add semantic radius aliases for button, action, input, segmented, code, color picker, editor, date picker, file upload, table, and navigation surfaces.
- Make true action affordances fully rounded in pill mode, including buttons, toggles, pagination buttons, close buttons, input actions, tabs, and segmented controls.
- Keep input-like fields rounded but finite in pill mode, with a stronger 16px radius instead of a full capsule.
