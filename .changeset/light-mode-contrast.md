---
"@virtari-packages/tokens": minor
---

Clear WCAG AA in light mode, and decouple warning's pressed state from its text step.

The dark-mode pass corrected `intent-9` but left light mode alone, on the grounds that these are brand colours in the default mode. Measured with CSS Color 4 gamut mapping, three light-mode pairings were below 4.5:1:

- `accent-solid` carried white at **3.27:1** — the worst pairing in the system. Lightness 0.665 → 0.580, now 4.59:1. It also matches what dark mode already resolves to, so accent is one value across both modes.
- `accent-solid-hover` was **3.99:1**. Lightness 0.615 → 0.530, now 5.63:1, and the ladder stays monotonic (0.580 → 0.530 → 0.475).
- `success-solid` was **4.45:1**, just under. Lightness 0.555 → 0.550, now 4.55:1.

Hue and chroma are held in every case; only lightness moves, and only by the minimum that clears the bar on the scale's own 0.005 grid.

**`warning-solid-active` no longer rides step 11.**

Step 11 serves two roles: `{intent}-solid-active`, a *background* under `on-{intent}` ink, and `{intent}-text`, a *foreground* on the page canvas. For the five white-ink intents that is harmless — in light mode the ladder darkens toward step 11, which improves white contrast and page-text contrast together.

Warning carries black ink, so the two roles pull in opposite directions. Light `warning-11` (L 0.500) is only **3.47:1** under black as a solid, while lightening it to fix that pushes warning *text* toward the canvas. The luminance window satisfying both is 0.005 wide — real, but it would not survive a brand retune.

So warning's pressed state gets its own mode-aware tone: L 0.600 in light, which is darker than `solid-hover` (0.650) so a press still reads as a press, and **5.27:1** under black ink. Dark mode is unaffected — there the ladder lightens toward step 11, both roles agree, and `warning-11` is already 11.73:1 under black.

Known remaining gap: in **dark** mode `solid-hover` and `solid-active` still carry white at 1.98–3.28:1. That is the same two-role conflict, mirrored — dark step 11 must be light to serve as text on a dark canvas, which is exactly what makes it fail under white ink as a solid. Fixing it needs the same decoupling applied to the five white-ink intents.
