# Input page audit

Reviewed 2026-09-06 using [the shared quality contract](../component-quality.md), the input skill and authoritative package exports.

## Fixed in the owning package

- `PasswordInputField.tsx`: an uncontrolled counter now follows an uncancelled native form reset, using the same composed-ref/reset utility as InputField and PasswordInput. Consumer refs still target the existing native input.
- `InputField.tsx` and `PasswordInputField.tsx`: providing error content now infers native `aria-invalid`, unless the consumer explicitly sets `invalid`. Descriptions, errors and counters remain associated by IDs.
- `PasswordInput.tsx`: revealing a password no longer schedules forced input focus. A keyboard user keeps focus on the reveal button; changing type preserves native node identity.
- `Input.css`: affix font size and horizontal spacing now follow the input size ramp. InputGroup has a zero minimum inline size and its direct input inherits the group's radius contract. Password strength text uses status text roles separately from meter fill colors. Long strength labels wrap, and feedback uses the shared readable text/line-height scale.

## Documentation changes

`apps/docs/src/pages/InputPage.tsx` uses the package CodeBlock with static rendering and actual exported Input/Field/Wrapper/Icon/Group/Addon components. Every control has a persistent label. Layout uses package Stack/Cluster, with examples for seven sizes, start/end icons, RTL, text affixes, three surface styles, stronger field tone, invalid/read-only/disabled states and sign-in versus new-password autocomplete. Removed deprecated inputSize examples and unsupported blanket WCAG/Apple claims about control heights. The usage example includes real stylesheet imports and package spacing.

## Checks and evidence

- Input package TypeScript and distribution build pass.
- `apps/docs/tests/input-quality.html` imports core, tokens and Input package styles only, with no docs CSS. Chromium reports **598 passing checks, zero failures**: 72 combinations of light/dark/OLED, bordered/tonal/elevated, sharp/soft/round/pill and LTR/RTL; icon reservation/centering, containment, addon sizing, four status-text contrast roles, all seven addon heights/font sizes, error associations, forwarded refs/autocomplete, native editing, cancelled reset, successful reset and keyboard reveal focus/node identity.
- Measured light status text contrast on the requirements surface: danger 7.46:1, warning 5.51:1, primary 7.09:1, success 6.74:1. All four statuses pass 4.5:1 in every matrix theme. Colors are converted through the browser canvas into sRGB before measurement, rather than treating OKLCH components as RGB.
- Inspected the rendered Input page in dark mode: field/label/helper/counter hierarchy and all size examples. Package geometry and contrast checks do not depend on the documentation shell.
- Full docs typecheck was attempted while other agents were changing CodeBlock; it reported stale CodeBlock declaration types and unrelated ButtonPage changes. Root owns the final combined docs build/typecheck and AI generation.

## Remaining limits

Native saved-credential autofill on Safari/third-party password managers still requires the consuming application and real saved credentials; these checks establish stable attributes, native identity and reset behavior, not that external validation. The compatibility InputField reveal control still has English-only labels; PasswordInput/PasswordInputField support translated reveal labels. Long text affixes are intentionally non-wrapping and consumers should keep them short. Arbitrary custom host colors and fonts require their own contrast and script checks. No shared Fieldset/tokens/core overrides were introduced to conceal package defects.
