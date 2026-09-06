# OTP input page audit

Reviewed `apps/docs/src/pages/OtpInputPage.tsx` and the actual exports/source of `packages/react-otp-input` on 2026-09-06. Followed the Virtari design-system and focused OTP skill, component quality, surface and nested-shape contracts.

## Findings and fixes

- Root consumer `onKeyDown` and `onPaste` previously ran after the slot had already edited the code or moved focus. The package now composes these handlers at the group before internal handling, preserves the root `currentTarget`, and honors cancellation (including capture cancellation).
- Native slots now receive `aria-invalid` and `aria-errormessage`, with explicit `invalid` taking precedence over `aria-invalid`. A custom `aria-label` also supplies the slot label prefix. Existing described-by association is preserved.
- Read-only pointer suppression prevented clicking/selecting the code. It has been removed while native `readOnly` and edit guards remain. Automatic focus now respects `selectOnFocus={false}`.
- Fixed-height slots could clip enlarged text. Slots retain their token width and minimum control height but can grow for the line box. They cannot flex-shrink unevenly. The border is now the shared 1px field width.
- Browser inspection found max-content width could expand an implicit grid track beyond a narrow RTL panel. Fit-content width and a zero minimum inline size allow wrapping within the panel while preserving LTR code order.
- The page uses canonical `size`, associates readable error guidance, adds a Persian RTL example explaining code order, explains visual mask support, and avoids moving focus on documentation page entry. Root owns the shared CodeBlock migration.

## Files and checks

- Package changes: `packages/react-otp-input/src/OtpInput.tsx`, `OtpInput.css`, `OtpInput.tokens.css`.
- Page: `apps/docs/src/pages/OtpInputPage.tsx`.
- Package-only fixture: `apps/docs/tests/otp-input-quality.html` and `otp-input-quality.tsx`.
- `pnpm --filter @virtari-packages/react-otp-input typecheck` passed.
- Chromium fixture at `/tests/otp-input-quality.html`: **98/98 checks passed**. Covers full-code paste into a later slot, mixed Persian/Arabic digit normalization, completion deduplication, keyboard focus/deletion, serialized form values, simulated full-code autofill input, native metadata, cancelled/native resets, disabled serialization, consumer cancellation, read-only selection, ARIA error precedence/association, selection preference, and enlarged text geometry.
- Geometry checks cover sm/md/lg across light/dark/dark-oled and bordered/tonal/elevated, scoped within RTL grid panels. Parent content-box checks catch the observed overflow; border checks tolerate physical-pixel rounding (this browser computes 1 CSS px as 0.8px).
- Visually inspected package states including focus/error/disabled/enlarged text and all theme/surface rows before and after the containment fix. Opened the real documentation route and inspected the size section in its dark scoped theme; the RTL and error examples were present in the rendered accessibility tree.
- Existing semantic text/surface/focus roles and reduced-motion/forced-colors rules were retained. No color-role change or new contrast conformance claim. Shared AI generation and repository-wide checks are deferred to root per worker ownership.

## Remaining limits

- Real SMS retrieval/autofill, mobile keyboards, Safari/Firefox behavior, screen-reader speech, forced colors, and OS reduced-motion modes were not exercised. Autofill evidence is a native input event plus inspected metadata, not a real SMS.
- Numeric/alphanumeric code layout intentionally remains LTR even inside RTL forms. Slot label prefixes are customizable, but the appended English “character N of length” phrase has no localization prop.
- Masking uses `-webkit-text-security` on text inputs and is visual/browser-dependent; it is not password-field semantics.
- Slots wrap in narrow containers rather than scaling below token sizes. Extremely narrow containers smaller than one slot and arbitrary invalid `length` values are not covered.
- Verification, expiry and retries remain application responsibilities. Completion indicates a filled code only.
