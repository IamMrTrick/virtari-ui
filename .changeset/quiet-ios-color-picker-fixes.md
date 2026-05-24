---
"@virtari-packages/core": patch
"@virtari-packages/react-color-picker": patch
"@virtari-packages/react-editor": patch
"@virtari-packages/react-input": patch
"@virtari-packages/react-number-input": patch
"@virtari-packages/react-otp-input": patch
"@virtari-packages/react-phone-input": patch
"@virtari-packages/react-textarea": patch
"@virtari-packages/utilities": patch
---

Fix editable color and input interactions.

- Restore native iOS text selection/callout behavior for editable controls and replace transform-based typing motion with a non-geometric pulse.
- Render gradient stop color popovers as floating solid ColorPicker surfaces so stop editing uses the same single-color picker UI.
- Make the utilities build cleanup cross-platform so `pnpm run build` works on Windows.
