---
"@virtari-packages/tokens": patch
---

Fix `[data-brand]` primitive overrides being ignored on the root element.

- Move the base primitive scales (neutral, intents, alphas) from the bare `@layer tokens` (an implicit sub-layer that CSS orders *after* every named sub-layer) into a named `@layer tokens.base`, and declare `@layer tokens.base, tokens.brand;` up-front so base is ordered before brand.
- This makes `[data-brand="…"]` overrides win over the base scales on the *same* element regardless of specificity, so `<html data-brand="x">` now retints in light and dark — previously only wrapper elements picked up the brand.
- Also fixes same-element mode combos like `<section data-brand="x" data-theme="dark">`, where the base `[data-theme="dark"]` block used to beat the brand's dark arm.
- Add a build-free browser cascade test at `packages/tokens/test/brand-scope.html`.
