# Button page audit

Reviewed `apps/docs/src/pages/ButtonPage.tsx` and the exported `@virtari-packages/react-button` source/styles against `docs/component-quality.md`.

## Repaired package defects

- Dark solid buttons applied the canvas's white hover/pressed overlay under white ink. Measured primary pressed contrast was 3.67:1. Solid states now consume the existing paired solid-hover/solid-active roles, without the unrelated canvas overlay.
- Link labels used solid-fill palette steps. Warning links on the light tonal surface measured 2.46:1; several other intents also failed. Links now use the intent's text role in all interaction states.
- Warning step-11 ink on the pressed step-5 tint measured 4.25:1. Outline, ghost and soft warning buttons use step-12 ink specifically while pressed. The change is scoped to the package; global palette values are unchanged.
- `white-space: nowrap` allowed long full-width labels to escape their surface. The package now constrains its available width, wraps long content, retains fixed icon slots and supplies symmetric block padding derived from the minimum height and line box.
- Non-default link sizes overrode inline-link padding/height through the size rules. Links now retain inline geometry across all eight sizes while their typography and icon size still vary.

## Documentation ownership

The playground uses Input, Field, Label, Select and Switch packages with explicitly associated labels. Both comparison tables use the Table package. Snippets use CodeBlock's static renderer and inline code uses InlineCode. Repeated table styling and the hand-styled native input were removed. Long English/Persian full-width examples demonstrate wrapping; loading examples preserve visible-label geometry. The page now records seven intent palettes, all effects including candy, effect/variant restrictions and the base stylesheet import. Blanket AAA/platform claims were replaced with contextual target-size and contrast guidance. Shared page title metadata is owned by the root review.

## Evidence

- `pnpm --filter @virtari-packages/react-button typecheck`: passed.
- `pnpm --filter @virtari-packages/react-button build`: passed.
- Chromium `/tests/button-quality.html`: **963 passed, 0 failed**. Includes 945 measured color combinations (7 intents × 5 variants × 3 theme scopes × 3 surface styles × rest/hover/pressed roles), LTR/RTL long-label containment and icon centering, all eight inline-link sizes, four nested radius modes, and loading-name preservation. Color checks composite actual resolved roles with a canvas in sRGB; interaction-state roles are measured directly, not a screenshot approximation or a claim of pointer-event coverage.
- Existing `/tests/button-composition.html`: **169 passed, 0 failed** after the geometry changes, covering all sizes, icon slots, mixed Persian/English labels, icon-only geometry, loading content, slotted refs/handlers and disabled activation.
- Actual `/#/button` inspected in Chromium at 1280px: package input/select IDs and static code nodes present, no legacy `pre.docs-code`, no document horizontal overflow. Package-only appearance also visually inspected without documentation CSS.
- Full docs TypeScript verification was attempted while CodeBlock's new renderer declaration was still being built; it reported stale shared declarations. Root owns the final shared build and AI generation/check/tests.

## Limits

Custom brand fonts have different optical metrics; this change centers line boxes and icons without per-label translations. Decorative glass/shine/candy effects and arbitrary consumer colors/backgrounds are not covered by the plain-variant contrast matrix and require their own placement-specific contrast checks. Real Safari, forced-colors and touch-device behavior were not newly browser-tested in this page audit. Existing native attributes, focus selectors, handlers and disabled/loading semantics were preserved.
