# Card page audit

Reviewed `apps/docs/src/pages/CardPage.tsx`, the `@virtari-packages/react-card` export map, Card slots, tokens, and `useNestedCardRadius.ts` against the focused Card skill and component-quality contract.

## Findings and corrections

- **Package defect:** long unbroken text directly in CardContent was clipped by the root's containment in 256px LTR and RTL cards. Added inherited `overflow-wrap: anywhere` to Card. The focused fixture reproduced both failures before the change and passes afterward. Title/description wrapping, footer wrap, and slot padding already worked.
- **Motion:** interactive hover translation now resolves to zero and transitions are disabled under reduced motion. Shared motion tokens already reduce normal transition duration; the package now also removes the positional change. This media-query change received source review only, not browser preference emulation.
- **Docs composition:** replaced handcrafted input and badge CSS with InputField and Badge. The form now has named controls, a required project name, native reset, and local submit feedback. It explicitly describes its local-only behavior.
- Removed misleading interactive styling from passive samples, explained that `interactive` adds presentation without semantics, corrected the claim that the default is always elevated, added nested Card composition, and made demo grid minima fit containers below 16rem. Usage includes real exported style imports and Button import; the package static CodeBlock remains in use.

## Checks and evidence

- `pnpm --filter @virtari-packages/react-card typecheck` — passed.
- `git diff --check -- apps/docs/src/pages/CardPage.tsx packages/react-card/src/Card.css apps/docs/tests/card-quality.html apps/docs/tests/card-quality.tsx` — passed (before this report was added).
- Chromium in-app browser, `/tests/card-radius.html`: all **36 existing checks passed**. Covered sharp/soft/round/pill root and nested radii, recursion, actual slot/wrapper insets, generous padding floors, explicit radius overrides, live mode/padding changes, transform stability, root override absence, and nested surface differences. Geometry was preserved without changing the hook.
- Chromium, `/tests/card-quality.html`: **24 checks passed**. Covered LTR/RTL 256px long tokens and Persian content, root/slot inset ownership, section gaps, content-only insets, wrapping footer actions and native button semantics, plus nested surface distinction in light/dark/dark-oled × bordered/tonal/elevated. Before/after screenshots were visually inspected; body clipping disappeared and surrounding spacing stayed intact. Native buttons are deliberately raw to isolate Card behavior.
- Chromium, `/#/card`: rendered the updated page in the existing dark appearance; visually inspected the form/variant area. Submitted a project name and observed local status feedback; activated Reset with Space and verified the field became empty and status cleared.

## Limits

The radius hook still tracks nearest Card ancestors rather than arbitrary rounded containers; `interactive` still supplies no role, tab stop or keyboard activation. CardTitle remains h3. Native controls inside Card retain their own focus/disabled responsibilities. Unequal insets produce a uniform corner budget rather than four exact concentric arcs. The fixture compares distinct backgrounds, not a numerical contrast certification; no text color roles changed. Full docs mobile/zoom and reduced-motion preference emulation were not performed in this worker pass. Final repository/AI generation checks belong to the integration owner.

Changed files: `packages/react-card/src/Card.css`, `apps/docs/src/pages/CardPage.tsx`, `apps/docs/tests/card-quality.html`, `apps/docs/tests/card-quality.tsx`, and this report.
