---
"@virtari-packages/react-input": patch
"@virtari-packages/react-textarea": patch
"@virtari-packages/react-number-input": patch
"@virtari-packages/react-otp-input": patch
"@virtari-packages/react-tag-input": patch
"@virtari-packages/react-select": patch
"@virtari-packages/react-phone-input": patch
"@virtari-packages/react-date-picker": patch
"@virtari-packages/react-checkbox": patch
"@virtari-packages/react-radio-group": patch
"@virtari-packages/react-switch": patch
"@virtari-packages/react-slider": patch
"@virtari-packages/react-toggle": patch
"@virtari-packages/react-file-upload": patch
"@virtari-packages/react-color-picker": patch
"@virtari-packages/react-language-picker": patch
"@virtari-packages/react-editor": patch
"@virtari-packages/react-code": patch
"@virtari-packages/react-data-table": patch
"@virtari-packages/react-yoopta-editor": patch
"@virtari-packages/react-command": patch
---

Replace form-control focus outlines with a 4px spread halo using existing primary alpha colors and a soft 180ms shadow transition. Apply the same treatment to selection, date/time, search, file, rich-text and code controls; retain danger alpha for invalid fields. Preserve forced-colors focus indicators and honor reduced-motion preferences without changing token definitions.
