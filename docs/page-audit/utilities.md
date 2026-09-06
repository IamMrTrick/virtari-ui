# Utilities page audit

Reviewed `apps/docs/src/pages/UtilitiesPage.tsx` and `packages/utilities/scripts/generate.mjs`, the package export map and focused utilities guidance.

## Findings and changes

- The flex/gap and logical margin demonstrations placed `vds-u-flex` on Card, whose own default remains `flex-direction: column`. The browser showed the logical-margin label above its sibling rather than beside it. The utility correctly changes only `display`; this was a composition defect, not a reason to make the package reset flex direction implicitly.
- Both examples now select the existing `vds-u-flex-row`. The button example also uses `vds-u-flex-wrap` to retain usable buttons in narrow space. Copyable snippets match the actual class lists, including a new outer-container snippet for the direction example.
- Existing package CodeBlock static rendering and InlineCode are retained. Catalog search, pagination, metadata and copy controls remain shared components; no local visual override hides package behavior.
- Source review confirmed logical spacing/sizing declarations, minimum-zero grid tracks, responsive prefix escaping (including `2xl` and fractional classes), token-backed z-index and package-root CSS export. No owning utility source/API change was necessary.

## Changed files

- `apps/docs/src/pages/UtilitiesPage.tsx`
- `apps/docs/tests/utilities-quality.html`
- `apps/docs/tests/utilities-quality.tsx`
- This report.

## Validation

- Browser-inspected the original route in dark mode and confirmed the incorrect vertical logical-spacing demonstration.
- `/tests/utilities-quality.html` imports only core, tokens, utilities and the Card/Button package styles. It reports **110 passed, 0 failed** at the default desktop viewport, 375px and 700px widths.
- Checks cover row direction over Card defaults; gap 8px below md / 24px at md; 16px and zero padding overrides; wrapping in a 260px composition; LTR/RTL inline order; one/two/three responsive grid columns; and no document horizontal overflow. The geometry matrix includes light/dark/dark-oled, bordered/tonal/elevated and nested theme scopes.
- Screenshots inspected the standalone desktop and 375px compositions, including LTR/RTL layout and the one/three-column grid. The whole theme matrix was measured by the fixture, not individually screenshot-reviewed.
- Direct generator inventory check: all token references in 810 emitted rules resolve to defined token names; five responsive breakpoint prefixes are exported.

## Limits and integration

- Reloading the full documentation app after standalone validation remained at “Loading Virtari documentation”; the isolated browser reported no error/warning logs. Full-page post-change search, pagination, direction-control interaction and narrow catalog inspection remain for integration verification. The changed composition itself passed the standalone browser checks.
- No color roles changed, and no new contrast claim is made. Utilities have no native control behavior or motion to change; control focus, disabled behavior and code contrast remain owned by their packages.
- Suggested curated guidance clarification for root: `vds-u-flex` sets display only; specify `vds-u-flex-row` when converting a component with an existing column direction into a row. No authoring JSON or generated knowledge was edited by this worker.
- Root performs `pnpm ai:build`, `pnpm ai:check`, `pnpm ai:test` and shared integration checks after merging page work. No whole-repository builds, AI generation, installs or commits were run here.

## Integration follow-up

The coordinator loaded the updated full Utilities page after refreshing the development server. Dark code surfaces were visually inspected and use package CodeBlock/InlineCode. Searching `vds-u-flex-row` returned the exact row/reverse classes and declarations; reset restored the complete inventory; Next reached page 2 of 203 with `vds-u-m-9` first. The 77-route integration sweep also covered this page at 1100px/390px without document overflow. This resolves the earlier full-page loading limitation; the standalone fixture remains the detailed responsive/RTL composition evidence.
