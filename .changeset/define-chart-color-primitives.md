---
"@virtari-packages/tokens": patch
---

Define the missing `--vds-color-chart-{1..8}` primitives so data-viz tokens resolve to real colors.

- The `-muted` / `-strong` chart variants in `colors/semantic/data-viz.css` referenced base `chart-{1..8}` primitives that were never declared anywhere, leaving every chart token invalid at computed-value time (guaranteed-invalid substitution).
- Add the canonical primitive block: `chart-1/2/3/5/6` alias onto intent step-9 solids (so brand re-tinting propagates automatically), and `chart-4/7/8` carry literal OKLCH hues (violet / teal / yellow) with per-theme tuning.
- Declared at `:where(:root, [data-theme], [data-brand])` plus a dark override so both the intent aliases and the literals re-resolve at nested theme/brand scopes.
