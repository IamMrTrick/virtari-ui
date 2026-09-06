# Switch page audit

Reviewed 2026-09-06. Owns `apps/docs/src/pages/SwitchPage.tsx`, `packages/react-switch/**`, and `packages/primitives/src/switch/**`.

## Findings and corrections

- The primitive had no form-reset subscription and omitted `form` on its button. Native and external form resets could leave visual state and submitted state inconsistent. It now observes the associated form, restores its initial state after uncanceled reset dispatch, and preserves the bubble input's original default. Controlled consumers receive a reset request; if declined, the hidden input is resynchronized without inventing a change event.
- Drag-enabled taps previously committed on pointerup and swallowed the native click, bypassing consumer `onClick` cancellation and the primitive's form event path. Taps now use the primitive click path. Actual drags still commit once through `onCheckedChange` and suppress the following pointer click; keyboard-style clicks are never swallowed.
- Consumer pointer props replaced the drag handlers. They now compose in consumer-first order, honoring cancellation while cleaning up drag state and pointer capture. Disabling dragging also clears an in-progress drag. The root ref no longer churns merely because the drag binding object changes on render.
- The thumb animated despite reduced-motion preference. The thumb now disables its transition in reduced motion. Forced-colors styling uses system track, thumb, selected, and disabled colors rather than relying on background preservation.
- Every original demonstration was unnamed. Size/state controls now have accessible names; the page adds a visible long-label example, associated helper text, real reset button, and a labeled usage snippet. Package README now documents actual exports, state, drag events, reset behavior, and compact target limitations.

## Evidence

- `pnpm --filter @virtari-packages/react-switch typecheck` passed after package edits.
- `apps/docs/tests/switch-quality.html` / `switch-quality.tsx` ran in Chromium through the docs server with source primitive aliases: **45 passed, 0 failed**. Checks cover label activation, value serialization, normal/external/canceled reset, controlled reset refusal, pointer tap cancellation, composed drag handlers, RTL drag, canceled drag, pointercancel cleanup, disabled/no-drag behavior, required validation, narrow multilingual wrapping, thumb containment/centering, and track contrast.
- Real browser Space and Enter each toggled the keyboard switch; a real canceled pointer click stayed off; a real drag with a consumer handler turned on once.
- Visually inspected the package-only fixture in light/bordered/sharp, dark/tonal/soft RTL, and OLED/elevated/pill scopes, plus the final dark documentation page. Long Persian/Latin labels wrap beside nonshrinking tracks. All three sizes keep centered thumbs and balanced 2px insets. Switch track/thumb intentionally remain fully round in all radius personalities; README makes this geometry explicit.
- Sampled track contrast against scoped surface backgrounds: unchecked light 4.08:1, dark 3.57:1, OLED 3.88:1; checked light 4.83:1, dark 4.12:1, OLED 4.61:1.
- Root corrected Vite's primitive aliases/optimization so edits are tested from source. Root owns final package builds and AI generation/check/test.

## Remaining limits

- Reduced-motion and forced-colors rules were source-reviewed; browser preference emulation was not performed. This is not a screen-reader, Safari, touch-device, or exhaustive theme/radius matrix certification.
- The 18px small track remains a compact affordance. Consumers should provide a larger labeled target for touch. Switch does not render a label/error layout; use a stable label and associated description/error text, with `aria-invalid` as appropriate.
- Actual drag completion uses `onCheckedChange`, not `onClick`. Consumers cancel a drag through pointer handlers; click cancellation applies to taps and keyboard activation. Native browser click thresholds determine tap activation.
