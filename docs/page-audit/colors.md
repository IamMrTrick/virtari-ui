# Colors page audit

Reviewed `apps/docs/src/pages/ColorsPage.tsx` and the semantic text/status source in `@virtari-packages/tokens` on 2026-09-06. Read the Colors and Tokens skills, package exports, design language, surface styles, nested surfaces and component quality contract. This is a bounded text contrast review, not a palette redesign.

## Findings and corrections

- `text-subtle` used neutral-9, which failed ordinary text contrast on every measured default canvas/tonal surface: 4.08:1 on the light canvas, 3.57:1 dark, 3.88:1 OLED, and as low as 2.81:1 on a dark active surface. It now uses neutral-11, as `text-muted` and placeholders already do. `icon-subtle` inherits this stronger value through its existing alias.
- All six `*-text-muted` roles used solid step 10. Each intent had failing pairs on its active tint; light warning fell to 2.30:1, while dark primary was 4.16:1. These supporting text roles now alias the intent's readable `*-text` role. Existing compatibility `*-muted-text` aliases follow automatically.
- Light `warning-text` itself failed on `warning-bg-active` at 4.25:1. It now uses warning-12 in light; dark and OLED retain warning-11.
- Added English/Persian migration and pairing guidance on the page. Removed stale semantic source comments claiming automatic contrast-color fallback and outdated step relationships.
- Kept palette swatches as native package Buttons with token-specific accessible names, package InlineCode labels, a labeled native search field, a package radio-group theme selector, and textual copy feedback. Paint is decorative; labels do not use the represented paint as their text background.

## Migration

No public variable names, primitive hues, brand colors, solid fills or export paths changed. Supporting copy becomes stronger. `text-subtle` and `text-muted` now share a default color; each intent's muted and primary text role also share a default color. Consumers needing additional hierarchy should use spacing and type weight rather than restoring low contrast with opacity. Existing explicit text-color overrides remain application decisions and need reassessment. Custom brand palettes, translucent hosts and unrelated foreground/background combinations still require their own contrast check.

## Files and checks

- `packages/tokens/src/colors/semantic/text.css`
- `packages/tokens/src/colors/semantic/status.css`
- `apps/docs/src/pages/ColorsPage.tsx`
- `apps/docs/tests/colors-contrast.html`
- This audit record.

`pnpm --filter @virtari-packages/tokens build` passed. The docs imports the built token stylesheet, so the package build was necessary to validate the edited source. `git diff --check` passed for the changed source/page/fixture files. Root performs final AI generation and repository checks.

Chromium fixture `/tests/colors-contrast.html`: **2601 passed, 0 failed**, up from 2382 passed and 219 failed. It measures 289 ordinary-text pairs at 4.5:1 across all nine nested parent/child combinations of light, dark and dark-oled. Coverage includes neutral text, muted, subtle, placeholders and links across 11 canvas/surface roles; six intent text and muted roles on those surfaces and their own subtle/rest/hover/active tints; all six solid on-colors through rest/hover/active; primary-container and inverse pairs. Pixel conversion uses the browser's sRGB canvas, so OKLCH colors and mixes are resolved by the browser. Screenshot inspection confirmed the rendered light/dark/OLED intent samples.

Chromium Colors page: verified initial inventory, search filtering (`warning-text` yields three canonical/compatibility results), nested light preview inside the dark docs shell, and swatch copy feedback showing the actual light warning-12 value `oklch(0.3 0.08 85)`. Inspected the rendered page and control accessible names. The source preserves RTL through package controls, logical shared layout and LTR code labels.

## Limits and guidance follow-up

The contrast fixture covers the actual color surface roles used by the three appearance styles; it does not mount every component or measure every border, ring, chart, icon, disabled, alpha, syntax or neutral-solid compatibility pairing. Custom brand reset behavior is unchanged. This page was not separately exercised at mobile widths, zoom, forced colors or in Persian/RTL, and no broader browser certification is claimed.

Root should add the migration rule to curated Colors/Tokens guidance: supporting semantic text is ordinary readable content; muted/subtle names do not mean permission to fall below 4.5:1. Keep the existing arbitrary-background and custom-brand limitations. No authored JSON or generated knowledge was edited by this worker.
