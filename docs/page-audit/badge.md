# Badge page audit

Reviewed `apps/docs/src/pages/BadgePage.tsx` and the actual `react-badge` source/export map against the component quality contract. Package fixes require only core, tokens and the exported Badge stylesheet; there are no documentation-only Badge overrides.

## Findings and corrections

- Forced `white-space: nowrap` allowed long labels to overflow narrow consumers. Added a shrinkable label wrapper, maximum inline width and word wrapping. Leading/trailing icons and removal controls retain their width. Label and icon line boxes remain centered without transforms; inline padding remains symmetric.
- `asChild` with `dotOnly` discarded its Slottable child, rendering no semantic element. It now preserves the native child and its attributes/ref while suppressing visible children.
- Native slotted anchors/buttons had focus styles but lacked the interactive hover treatment. Added native-root hover/cursor styles, disabled native-button treatment, reduced-motion transitions and forced-colors indicator support.
- A slotted child's canceled click still invoked the Badge click handler through Slot. Badge now observes `defaultPrevented` after the child handler, retaining composed refs and native behavior.
- The size table and source comments claimed 18/20/22/26px while the actual minimums are 20/20/24/28px. Corrected the documentation; no size scale was changed. Square uses the scoped navigation-item role, not the field radius.
- Replaced the playground's custom input and reset button with Input and Button. Interactive examples now use `asChild` native buttons, including disabled. The playground keeps native action and removal demonstrations separate to avoid nested interactive elements. Added Latin/Persian long-label examples, logical table alignment and contextual removal labels. Removed an unconditional contrast guarantee for custom themes.

## Evidence

- `pnpm --filter @virtari-packages/react-badge typecheck` passed after the final component edit.
- Chrome opened `http://localhost:5173/tests/badge-quality.html`: **650 passed, 0 failed**. The fixture imports only core, tokens and Badge styles.
- 630 computed, canvas-composited contrast checks cover seven colors × five variants × three themes × three surfaces × rest/hover. Every tested text pair reached 4.5:1. The light theme is nested under a dark host, so resetting a scoped theme is included. Badge already mapped to semantic text roles; no shared tokens were edited.
- Remaining fixture measurements cover 200px Latin/Persian containers, line wrapping, icon widths and vertical centers, logical leading placement, symmetric padding, four size minimums, four scoped square radii, dot-only geometry/anchor naming and composed refs.
- Browser keyboard/pointer checks: clicking Activate, Enter and Space produced child=3/parent=3. Cancel parent action then removal left parent=3 and incremented removals=1. Native disabled button was exposed as disabled and keyboard navigation reached the named dot anchor. Screenshot inspection confirmed wrapped labels, slot geometry, local shapes and the light variant matrix.
- The updated `#/badge` route loaded successfully, including the native action/disabled examples and long-label section. Package fixture measurements cover all themes; the visual screenshot review is not a claim of exhaustive viewport/OS coverage.

## Files and integration

Changed `packages/react-badge/src/Badge.tsx`, `Badge.css`, `Badge.tokens.css`, package `README.md`, `apps/docs/src/pages/BadgePage.tsx`; added `apps/docs/tests/badge-quality.html` and `.tsx` plus this report. Root owns the shared CodeBlock migration and final AI generation/checks. No curated JSON or generated knowledge was directly edited.

Guidance changed: README and page now describe wrapping, actual minimum sizes, native `asChild` actions, child click cancellation, dot-only composition and interaction limits. Curated guidance should retain the existing warning that default-span onClick lacks keyboard semantics, and expand the no-nested-removal warning to anchors as well as buttons.

## Remaining limits

The default span with onClick remains a pointer-only affordance; native `asChild` controls are required for actions/navigation. `onRemove` must not be composed inside a native button/link. Compact badge and close-button targets are not general touch controls. Meaningful dot-only status needs naming or adjacent text. Forced-colors and reduced-motion rules were source reviewed, not tested under OS emulation. Custom fonts, arbitrary backgrounds and actual narrow viewport/zoom combinations still need consumer testing.
