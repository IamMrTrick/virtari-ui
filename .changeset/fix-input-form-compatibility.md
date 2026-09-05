---
"@virtari-packages/utils": patch
"@virtari-packages/react-input": patch
"@virtari-packages/react-textarea": patch
"@virtari-packages/react-number-input": patch
"@virtari-packages/react-tag-input": patch
"@virtari-packages/react-otp-input": patch
"@virtari-packages/react-select": patch
"@virtari-packages/react-phone-input": patch
"@virtari-packages/react-date-picker": patch
"@virtari-packages/react-data-table": patch
"@virtari-packages/react-yoopta-editor": patch
---

Fix form-control compatibility: preserve refs and React 19 ref cleanups, honor disabled/read-only controls, retain numeric drafts and tag input focus, batch pasted tags, compose keyboard handlers, and preserve native text editing during IME composition. Stop combobox close from stealing outside focus and move the select clear button outside its trigger button.

Connect date/time controls to React Aria's native form inputs. Add form association/reset support to composite controls. TagInput submits repeated name/value entries for committed tags; Combobox submits its selected values. OTP supports defaultValue and uncontrolled editing. Phone parsing refreshes when the parser loads and recognizes pasted international numbers.

Keep Yoopta editor data when readOnly changes and apply external document replacements while retaining the mounted view for ordinary edit echoes. Avoid committing table cells on composition confirmation or browser-window blur.
