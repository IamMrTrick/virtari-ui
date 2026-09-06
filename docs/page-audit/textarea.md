# Textarea page audit

Reviewed `#/textarea`, `apps/docs/src/pages/TextareaPage.tsx`, the `@virtari-packages/react-textarea` exports and owning source against the component quality contract. Used the focused Virtari textarea skill and shared design/surface/shape guidance.

## Findings and corrections

- `TextareaField` previously created metadata IDs with truthiness, leaving numeric zero descriptions/errors unassociated. Null/false/custom-empty counters could leave dangling `aria-describedby` IDs. It now shares Field's exported `hasFieldContent` predicate and derives counter association from the rendered counter.
- `maxLength={0}` now displays `0/0`; explicit `aria-invalid="grammar"`/`"spelling"` remains intact. Invalid precedence matches Input: explicit `invalid`, then explicit native `aria-invalid`, then rendered error content. Wrapper styling and native accessibility state agree.
- Typing pulse previously shared a global keyframe name with other packages, used a primary ring even for invalid controls, and could trigger on read-only controls. It now has a textarea-specific animation, consumes the appropriate danger ring for invalid states, honors read-only and cancellation, clears its class when disabled, and disables animation in reduced motion/forced colors. Removed unused intensity bookkeeping and the unsupported promise that animation scales with typing speed.
- Existing seven-step size geometry, logical symmetric padding, finite field radius, native vertical resizing, ref, label focus, editing, form serialization and cancellable reset remain intact. No documentation geometry override was needed.
- The page now demonstrates all seven actual `size` values at equal rows, distinguishes size from native row capacity, gives every control an accessible name, displays the summary's invalid state, and removes an autosave claim from an example that does not save.

## Files and checks

- Package: `packages/react-textarea/src/Textarea.tsx`, `TextareaField.tsx`, `Textarea.css`.
- Page: `apps/docs/src/pages/TextareaPage.tsx` (shared static CodeBlock migration retained).
- Fixture: `apps/docs/tests/textarea-quality.html` and `textarea-quality.tsx`.
- `pnpm --filter @virtari-packages/react-textarea typecheck`: passed.
- `pnpm --filter @virtari-packages/react-textarea build`: passed.
- Chromium fixture: **87/87 passed**, covering metadata/invalid precedence, zero limit, native ref and label focus, controlled/uncontrolled counts, consumer events, serialization, native and cancelled reset, pulse activation/cancellation/read-only/cleanup, invalid ring role, symmetric padding and width containment.
- Visually inspected all seven sizes with real three-line values and the light/dark/OLED × bordered/tonal/elevated RTL grid, including long metadata, disabled controls and locally light fields. Inspected the documentation route and entered a short summary: native value, 5/180 counter and linked error updated.

## Guidance handoff and limits

Root should regenerate AI knowledge and incorporate the invalid precedence/rendered-content rules in curated textarea guidance. Shared page metadata still claimed auto-resize when inspected; root was notified to correct that shared description. There is no autosize API: `rows` controls initial capacity subject to the size's minimum height, and native vertical resizing remains available. Reduced-motion and forced-colors animation suppression were source-reviewed; actual OS-mode and cross-browser/assistive-technology testing were not performed. Shared foreground roles were inspected but not changed in this package; color-role contrast verification belongs to the coordinated colors audit. No global AI generation, install, commit or shared CSS edit was performed by this worker.
