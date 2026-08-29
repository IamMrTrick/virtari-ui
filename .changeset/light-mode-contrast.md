---
"@virtari-packages/tokens": minor
---

Every solid intent state now clears WCAG AA, in both themes.

All 36 pairings — 6 intents × solid/hover/active × light/dark — were measured from actual browser rendering, not computed. That distinction mattered: an offline CSS Color 4 gamut mapping reported `success` and `info` as passing at 4.55–4.57:1, while the browser rendered them at 4.22–4.41:1. Those chromas sit outside sRGB and browsers clip differently than the spec's mapping, so the numbers were corrected against what actually paints.

**Solid (step 9)**

| | before | after |
| --- | --- | --- |
| light `accent` | 3.27:1 | 4.62:1 |
| light `success` | 4.35:1 | 4.58:1 |
| light `info` | 4.22:1 | 4.56:1 |
| dark `success` | 4.41:1 | 4.58:1 |
| dark `info` | 4.22:1 | 4.56:1 |

Hue and chroma are held; only lightness moves, by the minimum that clears the bar. `accent` and `info` now resolve to one value across both modes.

**Hover and active are decoupled from steps 10 and 11.**

Those steps serve two roles: `{intent}-solid-hover`/`-active` are *backgrounds* under `on-{intent}` ink, while `{intent}-text-muted`/`-text` are *foregrounds* on the page canvas. Whenever the ladder runs toward the ink, the roles agree; whenever it runs away, they conflict.

- **Dark, white ink.** Steps 10 and 11 must be light to work as text on a dark canvas — which is exactly what made them fail as solids: hover measured 2.69–3.33:1, active 1.98–2.23:1. Lightening cannot fix it, because step 9 already sits at the lightest value clearing 4.5:1. So dark solids now darken on hover, matching what light mode already did — one behaviour in both themes. Derived from step 9 with `color-mix`, so a brand that retunes its solid gets correct interaction states for free.
- **Light, black ink (`warning`).** The mirror image. Light `warning-11` is 3.47:1 under black as a solid, while lightening it pushes warning *text* toward the canvas. The luminance window satisfying both roles is 0.005 wide — real, but it would not survive a brand retune. Warning's pressed state gets its own tone at 5.28:1, still darker than hover so a press reads as a press.

Dark `warning` needed no exception: there the ladder lightens toward step 11, both roles agree, and it already measured 11.77:1.
