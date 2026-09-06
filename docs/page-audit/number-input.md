# Number Input page audit

Reviewed `apps/docs/src/pages/NumberInputPage.tsx` and the exported source/styles of `packages/react-number-input` against the component quality contract.

## Corrections

- Inline step buttons inherited `flex: 1`, allowing their target widths to expand with the field instead of retaining the size token. They now use fixed flex sizing, leaving the remaining width for the numeric value.
- The shell now uses a minimum height and stretches its internal controls, allowing the line box to determine a larger height instead of clipping it against a fixed shell. Input padding remains symmetric and icons cannot shrink or intercept pointer events.
- Native `aria-invalid` values now activate the owning shell's error appearance; `aria-invalid="false"` stays valid.
- Reduced-motion styling now disables both stepper press animations and typing pulses, including the active-selector specificity needed for the override.
- Page demos now name all bare controls, use the canonical `size` prop, explicitly set invalid state alongside error messages, show empty/disabled/invalid/read-only states, and describe the ring pulse and numeric-validation limits accurately.

## Evidence

- `pnpm --filter @virtari-packages/react-number-input typecheck` passed.
- `git diff --check` on the owned source/page/fixture passed (line-ending notices only).
- Added package-only `/tests/number-input-quality.html` and `.tsx`; loaded the fixture in the in-app Chromium browser. All 77 checks passed: 18 theme/surface/direction combinations × containment, fixed inline targets, logical ordering and symmetric padding, plus native invalid/valid, disabled, read-only, and canceled-key-handler checks.
- Browser interaction verified ArrowUp changes 3 → 4 → 5, the increase button disables at max 5, and keyboard activation of the native reset button restores 3 and enables increase again. The focus ring and the OLED elevated LTR/RTL inline and stacked controls were visually inspected in a screenshot.
- Reviewed existing draft preservation, controlled detection, refs, keyboard composition cancellation, name/form forwarding, wheel focus guard and reset hookup in source. Package styles use semantic surface/text roles and logical borders; this change introduces no new color roles.

## Remaining limits

Compact stacked targets remain small; the page recommends inline targets and documents ArrowUp/ArrowDown. ASCII parsing and application-owned numeric submission validation remain intentional limitations. This bounded pass does not claim full browser coverage of every size, custom font, 200% zoom, forced colors, reduced-motion emulation or pointer-wheel event cancellation; reduced-motion changes were checked in source. Full repository and AI checks are delegated to the integrating root worker.

## Guidance for integration

No curated guidance rewrite is required. Existing parser/validation limitations remain true. Regenerate AI knowledge from the changed page and package source with the shared integration checks.
