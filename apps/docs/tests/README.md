# Input compatibility regression checks

## Drawer release regression

Open `/tests/drawer-release.html` and choose **Run regression checks**. These checks simulate a lost mouseup, unpressed hover after recovery, a child swallowing mouseup, secondary-button release, and starting a fresh drag. Also verify manually by dragging outside the browser, releasing, and returning: hovering must not move the drawer.

Run the docs development server, then open `/tests/input-compatibility.html` and choose **Run audit**. The suite uses synthetic data only and displays each assertion and failure. It is a development page, not included in the production docs entry point.

The 82 checks cover native input attributes, React Hook Form fill/rerender stability, callback-ref cleanup, password reveal, numeric editing, paste/IME/read-only tags, select markup and native selection, combobox text editing, OTP, phone country inference, form serialization/reset/disabled association, and external editor updates.

After the automated run, use the **Manual focus check**:

1. Open Choice, then click Outside combobox. The outside input must retain focus after the popup closes.
2. Open Choice, then press Tab from Find choice. Focus must advance to Outside combobox. Shift+Tab should move before Choice.
3. Open Choice, select a result or press Escape. Focus should return to Choice.

The input/change simulations do not invoke a real saved-password manager. Test password-manager autofill separately in the consuming application's sign-in form, with username and current-password fields in the same form, across the browsers/extensions the application supports.

## Form contracts

- Input, password controls and Textarea pass standard input attributes/events through to their native element. Forwarded refs point to that element.
- NumberInput keeps incomplete numeric text while editing. Its onChange reports a finite number or undefined; normalization/clamping occurs on blur. An explicitly supplied value prop selects controlled mode, including value={undefined}.
- TagInput remains controlled. name submits one hidden input per committed tag, not the unfinished draft. Native reset requests the initial tag array through onChange.
- Combobox name/form submit the selection; multiple selections use repeated entries. Native reset restores defaultValue or requests it through onValueChange for controlled usage.
- OTP supports value/defaultValue and form. Disabled values are excluded from submission.
- PhoneInput submits canonical valid E.164, or an empty value when incomplete. Read-only locks both text and country selection.
- DateField, DatePicker, DateRangePicker and TimeField use React Aria's native inputProps. Dates/times serialize as ISO strings; range names are startName/endName. Set validationBehavior="native" for browser submission validation.
- Rich editors expose document values through their APIs; they are not native password fields. Consumers serialize their document state explicitly. Yoopta value updates replace external documents; normal echoed edits retain the mounted editor view.

Type-check the test page with `pnpm --filter @virtari-packages/docs exec tsc --noEmit --project tsconfig.tests.json`.

## Form geometry

Open `/tests/form-geometry.html`. The fixture automatically checks seven sizes, LTR/RTL, and three font stacks for balanced padding, fitting line boxes, icon centering/gaps, password action placement, and country/phone separation. It also serves as a visual specimen. Geometry assertions check boxes and spacing, not subjective optical glyph alignment.

## Design language regressions

- `/tests/control-geometry.html`: 48 line-box, padding and enlarged-text checks across action controls.
- `/tests/surface-contrast.html`: 39 text/surface pairs in light, dark and OLED, with a 4.5:1 minimum. This checks the default palette, not arbitrary consumer overrides.
- `/tests/segmented-keyboard.html`: run the keyboard checks for LTR/RTL selection, disabled-item skipping, looping and consumer event forwarding.
- `/tests/drawer-release.html`: run the release checks for lost mouseup recovery and drag cleanup.
- `/tests/scroll-smart.html`: run the smart scroll checks with the pointer left on the Run button. Checks idle/activity visibility, native scrolling, viewport refs/events, fitting content, rounded track containment, width stability and keyboard entry/exit. Follow with real Tab and Page Down to verify native keyboard scrolling.
- `/tests/field-surfaces.html`: 360 assertions for shared field geometry and appearance across three surface styles in light and dark themes.
- `/tests/card-radius.html`: 36 checks for nested surface tones and radii, scoped radius modes, live padding changes and transformed ancestors.
- `/tests/stack-spacing.html`: 64 checks for mixed fields, hidden native form controls, recursive layouts and independently spaced nested Stacks in LTR/RTL.
