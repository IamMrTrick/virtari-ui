---
"@virtari-packages/react-button": patch
"@virtari-packages/react-date-picker": patch
"@virtari-packages/react-drawer": minor
"@virtari-packages/react-input": minor
"@virtari-packages/react-toast": patch
---

Ship the latest component updates across input, drawer, date picker, button, and toast.

- Add PasswordInput, PasswordInputField, PasswordStrengthMeter, configurable password metrics, standard strength presets, and password strength analysis utilities.
- Add the Drawer `stretch` prop so consumers can disable overdrag stretching while keeping the existing default behavior.
- Improve DatePicker and DateRangePicker mobile layouts, including single-month mobile range calendars, full-width mobile surfaces, and inline/popover usage docs.
- Preserve direct slot children for Button `asChild` rendering.
- Prevent bottom toast close animation from overriding swipe-exit animation state.
