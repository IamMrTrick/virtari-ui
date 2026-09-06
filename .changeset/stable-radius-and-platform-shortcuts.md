---
"@virtari-packages/tokens": patch
"@virtari-packages/primitives": minor
"@virtari-packages/react-tabs": patch
"@virtari-packages/react-segmented-control": patch
"@virtari-packages/react-checkbox": patch
"@virtari-packages/react-editor": patch
"@virtari-packages/react-flow": patch
"@virtari-packages/react-date-picker": patch
"@virtari-packages/react-nav": patch
"@virtari-packages/react-kbd": minor
"@virtari-packages/react-command": patch
"@virtari-packages/utils": minor
---

Align segmented tracks with field radius roles, distinguish Round from Soft controls, and keep keycaps and small checkboxes appropriately bounded. Resolve nested Flow modes, clamp Editor radius subtraction and use a semantic TimeWheel role.

Keep tab and segment indicators concentric with their tracks, bound vertical pill tracks, adapt boxed corners to radius modes, and honor explicit/provider/ancestor direction. Publish the styles required by standalone SegmentedControl consumers.

Add shared platform-aware shortcut formatting and KbdShortcut. Match Windows/Linux Control and Apple Command labels with actual key bindings and ARIA metadata. Ignore handled, composing and repeated hotkey events by default; repeated activation can be opted into.

Restore the actual opener's focus when a controlled CommandDialog closes, including an input that opened it with a shortcut. Preserve consumer autofocus callbacks and overrides.
