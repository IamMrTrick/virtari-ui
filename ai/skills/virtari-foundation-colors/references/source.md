## packages/tokens/src/colors.css

```css
/*
 * Colors — four-tier architecture.
 *
 *   primitives.css   Raw scales (12-step neutral + intents, three alpha
 *                    families, legacy 50-950). Mode-aware where it makes
 *                    sense (12-step), mode-independent where it doesn't
 *                    (legacy & always-black/always-white alpha).
 *
 *   brands/          Brand override layer. Each [data-brand="..."] file
 *                    overrides ONLY primitive hues. Defaults to virtari.
 *
 *   semantic/        Purpose-based aliases (bg, surface, text, icon,
 *                    border, interactive states, status intents,
 *                    data-viz). Components consume these.
 *
 *   aliases.css      Compatibility names that point at the semantic layer
 *                    (`--vds-color-primary` → `--vds-color-primary-solid`,
 *                    the `*-emphasis` / `*-muted` families, the `overlay*`
 *                    spelling of `scrim*`), plus the three extra
 *                    syntax-highlight hues. Loads last so it can only ever
 *                    forward to a name the semantic layer already defines.
 *
 * Component CSS files define their own --{name}-* tokens scoped to
 * .vds-{name}, referencing semantic tokens with fallbacks.
 *
 * Order matters: primitives must load before brands (so brands can
 * override them) before semantic (so semantic resolves the final values).
 */

/*
 * Sub-layer order within `tokens` (the top-level order lives in
 * packages/core/src/layers.css). Declared up-front — a `@layer` statement is
 * allowed before `@import` — so the order holds regardless of import order:
 *
 *   tokens.base    raw primitive scales (neutral, intents, alphas)
 *   tokens.brand   [data-brand="…"] primitive overrides
 *   tokens         (implicit sub-layer, ordered LAST) semantic aliases
 *
 * Why this matters: rules placed directly in a parent layer form an implicit
 * sub-layer that CSS orders AFTER every named sub-layer. When the base scales
 * lived in bare `@layer tokens`, that implicit sub-layer outranked
 * `tokens.brand`, so on a single element that is both `:root` and
 * `[data-brand]` (i.e. `<html data-brand="x">`) the base declaration always
 * won and brand overrides silently did nothing — layer order beats
 * specificity. Naming the base sub-layer and ordering it before `tokens.brand`
 * makes `[data-brand]` overrides win on the same element, in light and dark.
 */
@layer tokens.base, tokens.brand;

@import "./colors/primitives.css";
@import "./brands/index.css";
@import "./colors/semantic.css";
@import "./colors/aliases.css";

```

## packages/tokens/src/colors/primitives/neutral.css

```css
@layer tokens.base {
  /*
   * ── Neutral 12-step scale ──
   *
   * Hand-tuned OKLCH scale for neutral surfaces, borders and text.
   * Each step has a specific semantic role (industry-standard 12-step):
   *
   *   1   App canvas
   *   2   Subtle bg (cards on app)
   *   3   UI element rest
   *   4   UI element hover
   *   5   UI element active / pressed
   *   6   Subtle border
   *   7   UI border / focus border
   *   8   Hovered border / strong divider
   *   9   Solid neutral bg
   *   10  Solid neutral hover
   *   11  Low-contrast text
   *   12  High-contrast text
   *
   * Curve is non-linear (perceptually tuned). Steps 1-4 are tight
   * for surface elevation; 8→9 is the big jump from borders to solids;
   * 11→12 widens for max text contrast.
   *
   * hue 270 = slight cool tint (avoids yellow cast on warm displays)
   * Dark mode uses higher L for elevation (raised = lighter — modern).
   */

  :root,
  [data-theme="light"] {
    /* ── Absolute anchors ──
     * Used by alpha primitives, shadows, scrims, and any component
     * that truly wants pure black or white regardless of theme. */
    --vds-color-white: oklch(1 0 0);
    --vds-color-black: oklch(0 0 0);

    /* ── Neutral solids (light, default) ── */
    --vds-color-neutral-1:  oklch(0.985 0.002 270);
    --vds-color-neutral-2:  oklch(0.975 0.003 270);
    --vds-color-neutral-3:  oklch(0.945 0.004 270);
    --vds-color-neutral-4:  oklch(0.920 0.005 270);
    --vds-color-neutral-5:  oklch(0.890 0.006 270);
    --vds-color-neutral-6:  oklch(0.855 0.007 270);
    --vds-color-neutral-7:  oklch(0.810 0.008 270);
    --vds-color-neutral-8:  oklch(0.745 0.010 270);
    --vds-color-neutral-9:  oklch(0.580 0.014 270);
    --vds-color-neutral-10: oklch(0.530 0.014 270);
    --vds-color-neutral-11: oklch(0.430 0.013 270);
    --vds-color-neutral-12: oklch(0.180 0.012 270);
  }

  /* ── Neutral solids (dark) ── */
  [data-theme="dark"] {
    --vds-color-neutral-1:  oklch(0.178 0.005 270);
    --vds-color-neutral-2:  oklch(0.210 0.005 270);
    --vds-color-neutral-3:  oklch(0.245 0.006 270);
    --vds-color-neutral-4:  oklch(0.275 0.007 270);
    --vds-color-neutral-5:  oklch(0.305 0.008 270);
    --vds-color-neutral-6:  oklch(0.345 0.009 270);
    --vds-color-neutral-7:  oklch(0.395 0.010 270);
    --vds-color-neutral-8:  oklch(0.460 0.011 270);
    --vds-color-neutral-9:  oklch(0.530 0.013 270);
    --vds-color-neutral-10: oklch(0.580 0.013 270);
    --vds-color-neutral-11: oklch(0.720 0.011 270);
    --vds-color-neutral-12: oklch(0.930 0.008 270);
  }

  /*
   * Optional OLED variant — overrides ONLY canvas to pure black.
   * Keeps elevation ladder so hierarchy doesn't collapse.
   * Activate with [data-theme="dark-oled"] on <html>.
   */
  [data-theme="dark-oled"] {
    --vds-color-neutral-1:  oklch(0 0 0);
    --vds-color-neutral-2:  oklch(0.150 0.005 270);
    --vds-color-neutral-3:  oklch(0.200 0.006 270);
    --vds-color-neutral-4:  oklch(0.245 0.007 270);
    --vds-color-neutral-5:  oklch(0.285 0.008 270);
    --vds-color-neutral-6:  oklch(0.330 0.009 270);
    --vds-color-neutral-7:  oklch(0.385 0.010 270);
    --vds-color-neutral-8:  oklch(0.455 0.011 270);
    --vds-color-neutral-9:  oklch(0.525 0.013 270);
    --vds-color-neutral-10: oklch(0.580 0.013 270);
    --vds-color-neutral-11: oklch(0.720 0.011 270);
    --vds-color-neutral-12: oklch(0.945 0.008 270);
  }
}

```

## packages/tokens/src/colors/primitives/intents.css

```css
@layer tokens.base {
  /*
   * ── Intent 12-step solid scales ──
   *
   * Same step semantics as neutral.css. Each intent has a dedicated hue
   * tuned for its role (primary CTAs, status indicators, accents).
   *
   *   primary  indigo  h=265  brand action
   *   success  green   h=155  positive feedback
   *   warning  amber   h=85   caution (intentionally bright)
   *   danger   red     h=25   destructive / error
   *   info     cyan    h=210  informational
   *   accent   orange  h=45   secondary CTA / highlight
   *
   * Brand themes override these in packages/tokens/src/brands/*.css.
   */

  :root,
  [data-theme="light"] {
    /* ── Primary (indigo) — light ──
     * Steps 9-11 follow the same monotonic-chroma rule as every other
     * intent: chroma peaks at step 9 (base solid) and decreases toward
     * step 12. Previously step 10 bumped chroma (0.200 → 0.205), which
     * at hue 265° read as a perceptual hue shift to purple during hover
     * since indigo-violet sits right on that hue boundary at high chroma.
     */
    --vds-color-primary-1:  oklch(0.985 0.005 265);
    --vds-color-primary-2:  oklch(0.970 0.010 265);
    --vds-color-primary-3:  oklch(0.940 0.020 265);
    --vds-color-primary-4:  oklch(0.905 0.040 265);
    --vds-color-primary-5:  oklch(0.870 0.070 265);
    --vds-color-primary-6:  oklch(0.825 0.110 265);
    --vds-color-primary-7:  oklch(0.770 0.150 265);
    --vds-color-primary-8:  oklch(0.700 0.190 265);
    --vds-color-primary-9:  oklch(0.550 0.200 265);
    --vds-color-primary-10: oklch(0.500 0.195 265);
    --vds-color-primary-11: oklch(0.450 0.175 265);
    --vds-color-primary-12: oklch(0.260 0.140 265);

    /* ── Success (green) — light ── */
    --vds-color-success-1:  oklch(0.985 0.005 155);
    --vds-color-success-2:  oklch(0.970 0.012 155);
    --vds-color-success-3:  oklch(0.945 0.022 155);
    --vds-color-success-4:  oklch(0.910 0.040 155);
    --vds-color-success-5:  oklch(0.875 0.065 155);
    --vds-color-success-6:  oklch(0.825 0.095 155);
    --vds-color-success-7:  oklch(0.770 0.125 155);
    --vds-color-success-8:  oklch(0.700 0.155 155);
    --vds-color-success-9:  oklch(0.535 0.170 155);
    --vds-color-success-10: oklch(0.500 0.165 155);
    --vds-color-success-11: oklch(0.430 0.140 155);
    --vds-color-success-12: oklch(0.235 0.090 155);

    /* ── Warning (amber) — light ── */
    --vds-color-warning-1:  oklch(0.985 0.005 85);
    --vds-color-warning-2:  oklch(0.975 0.012 85);
    --vds-color-warning-3:  oklch(0.950 0.025 85);
    --vds-color-warning-4:  oklch(0.920 0.045 85);
    --vds-color-warning-5:  oklch(0.885 0.075 85);
    --vds-color-warning-6:  oklch(0.835 0.110 85);
    --vds-color-warning-7:  oklch(0.785 0.140 85);
    --vds-color-warning-8:  oklch(0.725 0.160 85);
    --vds-color-warning-9:  oklch(0.700 0.165 85);
    --vds-color-warning-10: oklch(0.650 0.155 85);
    --vds-color-warning-11: oklch(0.500 0.130 85);
    --vds-color-warning-12: oklch(0.300 0.080 85);

    /* ── Danger (red) — light ── */
    --vds-color-danger-1:  oklch(0.985 0.005 25);
    --vds-color-danger-2:  oklch(0.970 0.012 25);
    --vds-color-danger-3:  oklch(0.945 0.025 25);
    --vds-color-danger-4:  oklch(0.910 0.045 25);
    --vds-color-danger-5:  oklch(0.870 0.075 25);
    --vds-color-danger-6:  oklch(0.820 0.110 25);
    --vds-color-danger-7:  oklch(0.760 0.150 25);
    --vds-color-danger-8:  oklch(0.690 0.180 25);
    --vds-color-danger-9:  oklch(0.555 0.200 25);
    --vds-color-danger-10: oklch(0.500 0.195 25);
    --vds-color-danger-11: oklch(0.450 0.170 25);
    --vds-color-danger-12: oklch(0.260 0.110 25);

    /* ── Info (cyan) — light ── */
    --vds-color-info-1:  oklch(0.985 0.005 210);
    --vds-color-info-2:  oklch(0.970 0.012 210);
    --vds-color-info-3:  oklch(0.945 0.025 210);
    --vds-color-info-4:  oklch(0.910 0.040 210);
    --vds-color-info-5:  oklch(0.870 0.060 210);
    --vds-color-info-6:  oklch(0.820 0.085 210);
    --vds-color-info-7:  oklch(0.755 0.105 210);
    --vds-color-info-8:  oklch(0.685 0.125 210);
    --vds-color-info-9:  oklch(0.535 0.140 210);
    --vds-color-info-10: oklch(0.500 0.135 210);
    --vds-color-info-11: oklch(0.430 0.115 210);
    --vds-color-info-12: oklch(0.250 0.075 210);

    /* ── Accent (orange) — light ── */
    --vds-color-accent-1:  oklch(0.985 0.005 45);
    --vds-color-accent-2:  oklch(0.970 0.015 45);
    --vds-color-accent-3:  oklch(0.945 0.030 45);
    --vds-color-accent-4:  oklch(0.915 0.055 45);
    --vds-color-accent-5:  oklch(0.880 0.085 45);
    --vds-color-accent-6:  oklch(0.830 0.115 45);
    --vds-color-accent-7:  oklch(0.775 0.140 45);
    --vds-color-accent-8:  oklch(0.720 0.160 45);
    --vds-color-accent-9:  oklch(0.580 0.180 45);
    --vds-color-accent-10: oklch(0.530 0.178 45);
    --vds-color-accent-11: oklch(0.475 0.140 45);
    --vds-color-accent-12: oklch(0.275 0.090 45);
  }

  /* ── Intent solids — dark mode ──
   *
   * Step 9 carries `on-{intent}` — white on every intent but warning — so
   * its lightness is not a free parameter: it is capped by the 4.5:1 that
   * white needs against it. The dark ladder used to sit above that cap
   * (3.30–4.01:1 across primary/success/info/danger/accent), because it
   * was derived by lightening the light ladder for elevation without
   * re-checking the ink that sits on top.
   *
   * Each step 9 below is the *highest* L on the scale's 0.005 grid that
   * still clears 4.5:1 with chroma and hue held exactly, so the brand
   * character is unchanged and the 8 → 9 → 10 ladder stays monotonic.
   * Before → after, with white contrast, sRGB gamut-mapped:
   *
   *   primary  0.610 → 0.575   3.94 → 4.56
   *   success  0.610 → 0.545   3.54 → 4.65
   *   danger   0.620 → 0.585   4.01 → 4.64
   *   info     0.620 → 0.555   3.49 → 4.57
   *   accent   0.665 → 0.580   3.27 → 4.59
   *
   * warning is untouched: it carries black ink (7.78:1), not white.
   *
   * The selector also covers dark-oled. It always should have: the OLED
   * block below deliberately overrides step 1 *only*, which is only
   * coherent if steps 2–12 already come from this ladder. While this read
   * `[data-theme="dark"]` alone, an OLED page got the light-mode intent
   * ramp on a pure-black canvas.
   */
  [data-theme="dark"],
  [data-theme="dark-oled"] {
    /* Primary */
    --vds-color-primary-1:  oklch(0.190 0.020 265);
    --vds-color-primary-2:  oklch(0.215 0.035 265);
    --vds-color-primary-3:  oklch(0.245 0.060 265);
    --vds-color-primary-4:  oklch(0.275 0.085 265);
    --vds-color-primary-5:  oklch(0.310 0.110 265);
    --vds-color-primary-6:  oklch(0.355 0.135 265);
    --vds-color-primary-7:  oklch(0.420 0.160 265);
    --vds-color-primary-8:  oklch(0.500 0.180 265);
    --vds-color-primary-9:  oklch(0.575 0.200 265);
    --vds-color-primary-10: oklch(0.665 0.195 265);
    --vds-color-primary-11: oklch(0.760 0.180 265);
    --vds-color-primary-12: oklch(0.910 0.080 265);

    /* Success */
    --vds-color-success-1:  oklch(0.180 0.018 155);
    --vds-color-success-2:  oklch(0.205 0.030 155);
    --vds-color-success-3:  oklch(0.235 0.050 155);
    --vds-color-success-4:  oklch(0.265 0.070 155);
    --vds-color-success-5:  oklch(0.300 0.090 155);
    --vds-color-success-6:  oklch(0.345 0.110 155);
    --vds-color-success-7:  oklch(0.405 0.130 155);
    --vds-color-success-8:  oklch(0.485 0.155 155);
    --vds-color-success-9:  oklch(0.535 0.170 155);
    --vds-color-success-10: oklch(0.660 0.165 155);
    --vds-color-success-11: oklch(0.755 0.150 155);
    --vds-color-success-12: oklch(0.905 0.080 155);

    /* Warning */
    --vds-color-warning-1:  oklch(0.180 0.020 85);
    --vds-color-warning-2:  oklch(0.205 0.035 85);
    --vds-color-warning-3:  oklch(0.240 0.055 85);
    --vds-color-warning-4:  oklch(0.275 0.075 85);
    --vds-color-warning-5:  oklch(0.315 0.095 85);
    --vds-color-warning-6:  oklch(0.360 0.115 85);
    --vds-color-warning-7:  oklch(0.420 0.135 85);
    --vds-color-warning-8:  oklch(0.495 0.150 85);
    --vds-color-warning-9:  oklch(0.700 0.155 85);
    --vds-color-warning-10: oklch(0.745 0.150 85);
    --vds-color-warning-11: oklch(0.815 0.140 85);
    --vds-color-warning-12: oklch(0.925 0.085 85);

    /* Danger */
    --vds-color-danger-1:  oklch(0.190 0.020 25);
    --vds-color-danger-2:  oklch(0.215 0.035 25);
    --vds-color-danger-3:  oklch(0.245 0.055 25);
    --vds-color-danger-4:  oklch(0.275 0.080 25);
    --vds-color-danger-5:  oklch(0.310 0.105 25);
    --vds-color-danger-6:  oklch(0.355 0.130 25);
    --vds-color-danger-7:  oklch(0.420 0.155 25);
    --vds-color-danger-8:  oklch(0.500 0.180 25);
    --vds-color-danger-9:  oklch(0.585 0.200 25);
    --vds-color-danger-10: oklch(0.670 0.195 25);
    --vds-color-danger-11: oklch(0.770 0.175 25);
    --vds-color-danger-12: oklch(0.910 0.085 25);

    /* Info */
    --vds-color-info-1:  oklch(0.185 0.015 210);
    --vds-color-info-2:  oklch(0.210 0.025 210);
    --vds-color-info-3:  oklch(0.240 0.045 210);
    --vds-color-info-4:  oklch(0.270 0.060 210);
    --vds-color-info-5:  oklch(0.305 0.080 210);
    --vds-color-info-6:  oklch(0.350 0.095 210);
    --vds-color-info-7:  oklch(0.410 0.115 210);
    --vds-color-info-8:  oklch(0.490 0.135 210);
    --vds-color-info-9:  oklch(0.535 0.140 210);
    --vds-color-info-10: oklch(0.670 0.135 210);
    --vds-color-info-11: oklch(0.760 0.120 210);
    --vds-color-info-12: oklch(0.905 0.075 210);

    /* Accent */
    --vds-color-accent-1:  oklch(0.185 0.020 45);
    --vds-color-accent-2:  oklch(0.215 0.035 45);
    --vds-color-accent-3:  oklch(0.245 0.060 45);
    --vds-color-accent-4:  oklch(0.275 0.085 45);
    --vds-color-accent-5:  oklch(0.315 0.110 45);
    --vds-color-accent-6:  oklch(0.360 0.130 45);
    --vds-color-accent-7:  oklch(0.420 0.150 45);
    --vds-color-accent-8:  oklch(0.500 0.165 45);
    --vds-color-accent-9:  oklch(0.580 0.180 45);
    --vds-color-accent-10: oklch(0.715 0.175 45);
    --vds-color-accent-11: oklch(0.795 0.155 45);
    --vds-color-accent-12: oklch(0.920 0.080 45);
  }

  /*
   * OLED variant — drop step 1 of every intent to match pure-black canvas.
   * Without this, intent step-1 (L≈0.19) on OLED neutral-1 (L=0) produces
   * visible banding. Step 2+ keep the regular dark ladder.
   */
  [data-theme="dark-oled"] {
    --vds-color-primary-1: oklch(0.080 0.015 265);
    --vds-color-success-1: oklch(0.075 0.012 155);
    --vds-color-warning-1: oklch(0.080 0.015 85);
    --vds-color-danger-1:  oklch(0.080 0.015 25);
    --vds-color-info-1:    oklch(0.075 0.012 210);
    --vds-color-accent-1:  oklch(0.080 0.015 45);
  }
}

```

## packages/tokens/src/colors/primitives/alphas.css

```css
@layer tokens.base {
  /*
   * ── Three alpha families ──
   *
   * 1. black-a*   ALWAYS black, regardless of theme.
   *               Use for: shadows, modal scrims, dialog overlays.
   *
   * 2. white-a*   ALWAYS white, regardless of theme.
   *               Use for: glass/frost overlays on media, highlights on
   *               dark hero sections, ripples on dark buttons.
   *
   * 3. neutral-a* ADAPTIVE — black tint in light, white tint in dark.
   *               Use for: ghost button hover, dividers on colored panels,
   *               interactive overlays where the parent bg is unknown.
   *
   * Plus per-intent alpha (primary-a1..12, …) derived from the intent's
   * own solid-9 step via color-mix. Because the derivation goes through
   * the runtime primitive, brand themes that override --vds-color-{intent}-9
   * automatically flow through every alpha step — no per-brand alpha
   * overrides required.
   */

  :root,
  [data-theme] {
    /* ─── Black alpha (always black) ─── */
    --vds-color-black-a1:  oklch(0 0 0 / 0.05);
    --vds-color-black-a2:  oklch(0 0 0 / 0.10);
    --vds-color-black-a3:  oklch(0 0 0 / 0.15);
    --vds-color-black-a4:  oklch(0 0 0 / 0.20);
    --vds-color-black-a5:  oklch(0 0 0 / 0.30);
    --vds-color-black-a6:  oklch(0 0 0 / 0.40);
    --vds-color-black-a7:  oklch(0 0 0 / 0.50);
    --vds-color-black-a8:  oklch(0 0 0 / 0.60);
    --vds-color-black-a9:  oklch(0 0 0 / 0.70);
    --vds-color-black-a10: oklch(0 0 0 / 0.80);
    --vds-color-black-a11: oklch(0 0 0 / 0.90);
    --vds-color-black-a12: oklch(0 0 0 / 0.95);

    /* ─── White alpha (always white) ─── */
    --vds-color-white-a1:  oklch(1 0 0 / 0.05);
    --vds-color-white-a2:  oklch(1 0 0 / 0.10);
    --vds-color-white-a3:  oklch(1 0 0 / 0.15);
    --vds-color-white-a4:  oklch(1 0 0 / 0.20);
    --vds-color-white-a5:  oklch(1 0 0 / 0.30);
    --vds-color-white-a6:  oklch(1 0 0 / 0.40);
    --vds-color-white-a7:  oklch(1 0 0 / 0.50);
    --vds-color-white-a8:  oklch(1 0 0 / 0.60);
    --vds-color-white-a9:  oklch(1 0 0 / 0.70);
    --vds-color-white-a10: oklch(1 0 0 / 0.80);
    --vds-color-white-a11: oklch(1 0 0 / 0.90);
    --vds-color-white-a12: oklch(1 0 0 / 0.95);

    /* ─── Neutral alpha — light (black tint, industry-tuned) ─── */
    --vds-color-neutral-a1:  oklch(0 0 0 / 0.012);
    --vds-color-neutral-a2:  oklch(0 0 0 / 0.024);
    --vds-color-neutral-a3:  oklch(0 0 0 / 0.059);
    --vds-color-neutral-a4:  oklch(0 0 0 / 0.090);
    --vds-color-neutral-a5:  oklch(0 0 0 / 0.122);
    --vds-color-neutral-a6:  oklch(0 0 0 / 0.149);
    --vds-color-neutral-a7:  oklch(0 0 0 / 0.192);
    --vds-color-neutral-a8:  oklch(0 0 0 / 0.267);
    --vds-color-neutral-a9:  oklch(0 0 0 / 0.447);
    --vds-color-neutral-a10: oklch(0 0 0 / 0.486);
    --vds-color-neutral-a11: oklch(0 0 0 / 0.608);
    --vds-color-neutral-a12: oklch(0 0 0 / 0.875);

    /* ─── Per-intent alpha — derived via color-mix from intent-9.
         Brand-safe: re-theming --vds-color-{intent}-9 propagates. ─── */
    --vds-color-primary-a1:  color-mix(in oklch, var(--vds-color-primary-9)  2%, transparent);
    --vds-color-primary-a2:  color-mix(in oklch, var(--vds-color-primary-9)  4%, transparent);
    --vds-color-primary-a3:  color-mix(in oklch, var(--vds-color-primary-9)  8%, transparent);
    --vds-color-primary-a4:  color-mix(in oklch, var(--vds-color-primary-9) 12%, transparent);
    --vds-color-primary-a5:  color-mix(in oklch, var(--vds-color-primary-9) 16%, transparent);
    --vds-color-primary-a6:  color-mix(in oklch, var(--vds-color-primary-9) 20%, transparent);
    --vds-color-primary-a7:  color-mix(in oklch, var(--vds-color-primary-9) 26%, transparent);
    --vds-color-primary-a8:  color-mix(in oklch, var(--vds-color-primary-9) 35%, transparent);
    --vds-color-primary-a9:  color-mix(in oklch, var(--vds-color-primary-9) 55%, transparent);
    --vds-color-primary-a10: color-mix(in oklch, var(--vds-color-primary-9) 62%, transparent);
    --vds-color-primary-a11: color-mix(in oklch, var(--vds-color-primary-9) 73%, transparent);
    --vds-color-primary-a12: color-mix(in oklch, var(--vds-color-primary-9) 91%, transparent);

    --vds-color-success-a1:  color-mix(in oklch, var(--vds-color-success-9)  2%, transparent);
    --vds-color-success-a2:  color-mix(in oklch, var(--vds-color-success-9)  4%, transparent);
    --vds-color-success-a3:  color-mix(in oklch, var(--vds-color-success-9)  8%, transparent);
    --vds-color-success-a4:  color-mix(in oklch, var(--vds-color-success-9) 12%, transparent);
    --vds-color-success-a5:  color-mix(in oklch, var(--vds-color-success-9) 16%, transparent);
    --vds-color-success-a6:  color-mix(in oklch, var(--vds-color-success-9) 20%, transparent);
    --vds-color-success-a7:  color-mix(in oklch, var(--vds-color-success-9) 26%, transparent);
    --vds-color-success-a8:  color-mix(in oklch, var(--vds-color-success-9) 35%, transparent);
    --vds-color-success-a9:  color-mix(in oklch, var(--vds-color-success-9) 55%, transparent);
    --vds-color-success-a10: color-mix(in oklch, var(--vds-color-success-9) 62%, transparent);
    --vds-color-success-a11: color-mix(in oklch, var(--vds-color-success-9) 73%, transparent);
    --vds-color-success-a12: color-mix(in oklch, var(--vds-color-success-9) 91%, transparent);

    --vds-color-warning-a1:  color-mix(in oklch, var(--vds-color-warning-9)  3%, transparent);
    --vds-color-warning-a2:  color-mix(in oklch, var(--vds-color-warning-9)  6%, transparent);
    --vds-color-warning-a3:  color-mix(in oklch, var(--vds-color-warning-9) 11%, transparent);
    --vds-color-warning-a4:  color-mix(in oklch, var(--vds-color-warning-9) 16%, transparent);
    --vds-color-warning-a5:  color-mix(in oklch, var(--vds-color-warning-9) 22%, transparent);
    --vds-color-warning-a6:  color-mix(in oklch, var(--vds-color-warning-9) 28%, transparent);
    --vds-color-warning-a7:  color-mix(in oklch, var(--vds-color-warning-9) 36%, transparent);
    --vds-color-warning-a8:  color-mix(in oklch, var(--vds-color-warning-9) 47%, transparent);
    --vds-color-warning-a9:  color-mix(in oklch, var(--vds-color-warning-9) 70%, transparent);
    --vds-color-warning-a10: color-mix(in oklch, var(--vds-color-warning-9) 77%, transparent);
    --vds-color-warning-a11: color-mix(in oklch, var(--vds-color-warning-9) 86%, transparent);
    --vds-color-warning-a12: color-mix(in oklch, var(--vds-color-warning-9) 95%, transparent);

    --vds-color-danger-a1:  color-mix(in oklch, var(--vds-color-danger-9)  2%, transparent);
    --vds-color-danger-a2:  color-mix(in oklch, var(--vds-color-danger-9)  4%, transparent);
    --vds-color-danger-a3:  color-mix(in oklch, var(--vds-color-danger-9)  8%, transparent);
    --vds-color-danger-a4:  color-mix(in oklch, var(--vds-color-danger-9) 12%, transparent);
    --vds-color-danger-a5:  color-mix(in oklch, var(--vds-color-danger-9) 16%, transparent);
    --vds-color-danger-a6:  color-mix(in oklch, var(--vds-color-danger-9) 20%, transparent);
    --vds-color-danger-a7:  color-mix(in oklch, var(--vds-color-danger-9) 26%, transparent);
    --vds-color-danger-a8:  color-mix(in oklch, var(--vds-color-danger-9) 35%, transparent);
    --vds-color-danger-a9:  color-mix(in oklch, var(--vds-color-danger-9) 55%, transparent);
    --vds-color-danger-a10: color-mix(in oklch, var(--vds-color-danger-9) 62%, transparent);
    --vds-color-danger-a11: color-mix(in oklch, var(--vds-color-danger-9) 73%, transparent);
    --vds-color-danger-a12: color-mix(in oklch, var(--vds-color-danger-9) 91%, transparent);

    --vds-color-info-a1:  color-mix(in oklch, var(--vds-color-info-9)  2%, transparent);
    --vds-color-info-a2:  color-mix(in oklch, var(--vds-color-info-9)  4%, transparent);
    --vds-color-info-a3:  color-mix(in oklch, var(--vds-color-info-9)  8%, transparent);
    --vds-color-info-a4:  color-mix(in oklch, var(--vds-color-info-9) 12%, transparent);
    --vds-color-info-a5:  color-mix(in oklch, var(--vds-color-info-9) 16%, transparent);
    --vds-color-info-a6:  color-mix(in oklch, var(--vds-color-info-9) 20%, transparent);
    --vds-color-info-a7:  color-mix(in oklch, var(--vds-color-info-9) 26%, transparent);
    --vds-color-info-a8:  color-mix(in oklch, var(--vds-color-info-9) 35%, transparent);
    --vds-color-info-a9:  color-mix(in oklch, var(--vds-color-info-9) 55%, transparent);
    --vds-color-info-a10: color-mix(in oklch, var(--vds-color-info-9) 62%, transparent);
    --vds-color-info-a11: color-mix(in oklch, var(--vds-color-info-9) 73%, transparent);
    --vds-color-info-a12: color-mix(in oklch, var(--vds-color-info-9) 91%, transparent);

    --vds-color-accent-a1:  color-mix(in oklch, var(--vds-color-accent-9)  3%, transparent);
    --vds-color-accent-a2:  color-mix(in oklch, var(--vds-color-accent-9)  6%, transparent);
    --vds-color-accent-a3:  color-mix(in oklch, var(--vds-color-accent-9) 11%, transparent);
    --vds-color-accent-a4:  color-mix(in oklch, var(--vds-color-accent-9) 16%, transparent);
    --vds-color-accent-a5:  color-mix(in oklch, var(--vds-color-accent-9) 22%, transparent);
    --vds-color-accent-a6:  color-mix(in oklch, var(--vds-color-accent-9) 28%, transparent);
    --vds-color-accent-a7:  color-mix(in oklch, var(--vds-color-accent-9) 36%, transparent);
    --vds-color-accent-a8:  color-mix(in oklch, var(--vds-color-accent-9) 47%, transparent);
    --vds-color-accent-a9:  color-mix(in oklch, var(--vds-color-accent-9) 70%, transparent);
    --vds-color-accent-a10: color-mix(in oklch, var(--vds-color-accent-9) 77%, transparent);
    --vds-color-accent-a11: color-mix(in oklch, var(--vds-color-accent-9) 86%, transparent);
    --vds-color-accent-a12: color-mix(in oklch, var(--vds-color-accent-9) 95%, transparent);
  }

  [data-theme="dark"],
  [data-theme="dark-oled"] {
    /* Neutral alpha — dark (white tint, industry-tuned) */
    --vds-color-neutral-a1:  oklch(1 0 0 / 0.000);
    --vds-color-neutral-a2:  oklch(1 0 0 / 0.035);
    --vds-color-neutral-a3:  oklch(1 0 0 / 0.070);
    --vds-color-neutral-a4:  oklch(1 0 0 / 0.110);
    --vds-color-neutral-a5:  oklch(1 0 0 / 0.130);
    --vds-color-neutral-a6:  oklch(1 0 0 / 0.170);
    --vds-color-neutral-a7:  oklch(1 0 0 / 0.230);
    --vds-color-neutral-a8:  oklch(1 0 0 / 0.330);
    --vds-color-neutral-a9:  oklch(1 0 0 / 0.390);
    --vds-color-neutral-a10: oklch(1 0 0 / 0.450);
    --vds-color-neutral-a11: oklch(1 0 0 / 0.690);
    --vds-color-neutral-a12: oklch(1 0 0 / 0.930);

    /* Per-intent alpha — dark: slightly higher opacity steps for vividness.
       Still color-mix-derived, still brand-safe. */
    --vds-color-primary-a1:  color-mix(in oklch, var(--vds-color-primary-9)  3%, transparent);
    --vds-color-primary-a2:  color-mix(in oklch, var(--vds-color-primary-9)  6%, transparent);
    --vds-color-primary-a3:  color-mix(in oklch, var(--vds-color-primary-9) 11%, transparent);
    --vds-color-primary-a4:  color-mix(in oklch, var(--vds-color-primary-9) 16%, transparent);
    --vds-color-primary-a5:  color-mix(in oklch, var(--vds-color-primary-9) 22%, transparent);
    --vds-color-primary-a6:  color-mix(in oklch, var(--vds-color-primary-9) 28%, transparent);
    --vds-color-primary-a7:  color-mix(in oklch, var(--vds-color-primary-9) 36%, transparent);
    --vds-color-primary-a8:  color-mix(in oklch, var(--vds-color-primary-9) 47%, transparent);
    --vds-color-primary-a9:  color-mix(in oklch, var(--vds-color-primary-9) 70%, transparent);
    --vds-color-primary-a10: color-mix(in oklch, var(--vds-color-primary-9) 77%, transparent);
    --vds-color-primary-a11: color-mix(in oklch, var(--vds-color-primary-9) 86%, transparent);
    --vds-color-primary-a12: color-mix(in oklch, var(--vds-color-primary-9) 95%, transparent);

    --vds-color-success-a1:  color-mix(in oklch, var(--vds-color-success-9)  3%, transparent);
    --vds-color-success-a2:  color-mix(in oklch, var(--vds-color-success-9)  6%, transparent);
    --vds-color-success-a3:  color-mix(in oklch, var(--vds-color-success-9) 11%, transparent);
    --vds-color-success-a4:  color-mix(in oklch, var(--vds-color-success-9) 16%, transparent);
    --vds-color-success-a5:  color-mix(in oklch, var(--vds-color-success-9) 22%, transparent);
    --vds-color-success-a6:  color-mix(in oklch, var(--vds-color-success-9) 28%, transparent);
    --vds-color-success-a7:  color-mix(in oklch, var(--vds-color-success-9) 36%, transparent);
    --vds-color-success-a8:  color-mix(in oklch, var(--vds-color-success-9) 47%, transparent);
    --vds-color-success-a9:  color-mix(in oklch, var(--vds-color-success-9) 70%, transparent);
    --vds-color-success-a10: color-mix(in oklch, var(--vds-color-success-9) 77%, transparent);
    --vds-color-success-a11: color-mix(in oklch, var(--vds-color-success-9) 86%, transparent);
    --vds-color-success-a12: color-mix(in oklch, var(--vds-color-success-9) 95%, transparent);

    --vds-color-warning-a1:  color-mix(in oklch, var(--vds-color-warning-9)  4%, transparent);
    --vds-color-warning-a2:  color-mix(in oklch, var(--vds-color-warning-9)  8%, transparent);
    --vds-color-warning-a3:  color-mix(in oklch, var(--vds-color-warning-9) 14%, transparent);
    --vds-color-warning-a4:  color-mix(in oklch, var(--vds-color-warning-9) 20%, transparent);
    --vds-color-warning-a5:  color-mix(in oklch, var(--vds-color-warning-9) 28%, transparent);
    --vds-color-warning-a6:  color-mix(in oklch, var(--vds-color-warning-9) 36%, transparent);
    --vds-color-warning-a7:  color-mix(in oklch, var(--vds-color-warning-9) 45%, transparent);
    --vds-color-warning-a8:  color-mix(in oklch, var(--vds-color-warning-9) 56%, transparent);
    --vds-color-warning-a9:  color-mix(in oklch, var(--vds-color-warning-9) 80%, transparent);
    --vds-color-warning-a10: color-mix(in oklch, var(--vds-color-warning-9) 86%, transparent);
    --vds-color-warning-a11: color-mix(in oklch, var(--vds-color-warning-9) 92%, transparent);
    --vds-color-warning-a12: color-mix(in oklch, var(--vds-color-warning-9) 97%, transparent);

    --vds-color-danger-a1:  color-mix(in oklch, var(--vds-color-danger-9)  3%, transparent);
    --vds-color-danger-a2:  color-mix(in oklch, var(--vds-color-danger-9)  6%, transparent);
    --vds-color-danger-a3:  color-mix(in oklch, var(--vds-color-danger-9) 11%, transparent);
    --vds-color-danger-a4:  color-mix(in oklch, var(--vds-color-danger-9) 16%, transparent);
    --vds-color-danger-a5:  color-mix(in oklch, var(--vds-color-danger-9) 22%, transparent);
    --vds-color-danger-a6:  color-mix(in oklch, var(--vds-color-danger-9) 28%, transparent);
    --vds-color-danger-a7:  color-mix(in oklch, var(--vds-color-danger-9) 36%, transparent);
    --vds-color-danger-a8:  color-mix(in oklch, var(--vds-color-danger-9) 47%, transparent);
    --vds-color-danger-a9:  color-mix(in oklch, var(--vds-color-danger-9) 70%, transparent);
    --vds-color-danger-a10: color-mix(in oklch, var(--vds-color-danger-9) 77%, transparent);
    --vds-color-danger-a11: color-mix(in oklch, var(--vds-color-danger-9) 86%, transparent);
    --vds-color-danger-a12: color-mix(in oklch, var(--vds-color-danger-9) 95%, transparent);

    --vds-color-info-a1:  color-mix(in oklch, var(--vds-color-info-9)  3%, transparent);
    --vds-color-info-a2:  color-mix(in oklch, var(--vds-color-info-9)  6%, transparent);
    --vds-color-info-a3:  color-mix(in oklch, var(--vds-color-info-9) 11%, transparent);
    --vds-color-info-a4:  color-mix(in oklch, var(--vds-color-info-9) 16%, transparent);
    --vds-color-info-a5:  color-mix(in oklch, var(--vds-color-info-9) 22%, transparent);
    --vds-color-info-a6:  color-mix(in oklch, var(--vds-color-info-9) 28%, transparent);
    --vds-color-info-a7:  color-mix(in oklch, var(--vds-color-info-9) 36%, transparent);
    --vds-color-info-a8:  color-mix(in oklch, var(--vds-color-info-9) 47%, transparent);
    --vds-color-info-a9:  color-mix(in oklch, var(--vds-color-info-9) 70%, transparent);
    --vds-color-info-a10: color-mix(in oklch, var(--vds-color-info-9) 77%, transparent);
    --vds-color-info-a11: color-mix(in oklch, var(--vds-color-info-9) 86%, transparent);
    --vds-color-info-a12: color-mix(in oklch, var(--vds-color-info-9) 95%, transparent);

    --vds-color-accent-a1:  color-mix(in oklch, var(--vds-color-accent-9)  4%, transparent);
    --vds-color-accent-a2:  color-mix(in oklch, var(--vds-color-accent-9)  8%, transparent);
    --vds-color-accent-a3:  color-mix(in oklch, var(--vds-color-accent-9) 14%, transparent);
    --vds-color-accent-a4:  color-mix(in oklch, var(--vds-color-accent-9) 20%, transparent);
    --vds-color-accent-a5:  color-mix(in oklch, var(--vds-color-accent-9) 28%, transparent);
    --vds-color-accent-a6:  color-mix(in oklch, var(--vds-color-accent-9) 36%, transparent);
    --vds-color-accent-a7:  color-mix(in oklch, var(--vds-color-accent-9) 45%, transparent);
    --vds-color-accent-a8:  color-mix(in oklch, var(--vds-color-accent-9) 56%, transparent);
    --vds-color-accent-a9:  color-mix(in oklch, var(--vds-color-accent-9) 80%, transparent);
    --vds-color-accent-a10: color-mix(in oklch, var(--vds-color-accent-9) 86%, transparent);
    --vds-color-accent-a11: color-mix(in oklch, var(--vds-color-accent-9) 92%, transparent);
    --vds-color-accent-a12: color-mix(in oklch, var(--vds-color-accent-9) 95%, transparent);
  }
}

```

## packages/tokens/src/colors/semantic/index.css

```css
/*
 * Semantic color barrel.
 *
 *   1. background.css   bg, surface, scrim, shadow-tint, highlight-tint, color-scheme
 *   2. text.css         text, muted/subtle/disabled, link, placeholder, inverse, selection, on-solid
 *   3. icon.css         icon-*
 *   4. border.css       border, muted/strong/subtle/input, focus, divider, per-intent
 *   5. interactive.css  ring, skeleton, hover, active, pressed, selection-bg
 *   6. status.css       on-{intent}, {intent}-solid/bg/text + hover/active variants
 *   7. data-viz.css     chart-*-muted, chart-*-strong (brand-safe via color-mix)
 */
@import "./background.css";
@import "./text.css";
@import "./icon.css";
@import "./border.css";
@import "./interactive.css";
@import "./status.css";
@import "./data-viz.css";

```

## packages/tokens/src/colors/aliases.css

```css
/*
 * ── Compatibility alias layer ──
 *
 * Every family in this file exists because something in this repository
 * types those names. Before this file existed those `var()` lookups
 * resolved to nothing, so components silently fell through to their
 * hardcoded hex fallbacks — unbrandable, un-themeable, and invisible in
 * review.
 *
 * Two comments (colors/semantic/background.css, colors/semantic/status.css)
 * used to promise a `_legacy.css`. That file was never written; this is it,
 * under a more honest name — most of these are not legacy at all, they are
 * simply the names components actually type.
 *
 * Rules for this file:
 *   • Aliases only. Every value is a `var()` at the canonical semantic name.
 *     If you need a new *role*, add it to the semantic file that owns the
 *     domain (border.css, text.css, …), not here.
 *   • Don't invent a new *shape*. A shape earns its place only once real
 *     code asks for it. But once it is here it is completed across all six
 *     intents, because a compat layer where `--vds-color-primary-muted`
 *     resolves and `--vds-color-danger-muted` doesn't is worse than no
 *     compat layer at all.
 *   • The syntax-highlight ramps at the bottom are the one exception —
 *     they are real primitives, not aliases, so they live in `tokens.base`.
 *
 * Prefer the canonical names in new code. These stay for compatibility.
 */

@layer tokens {
  :root,
  [data-theme] {
    /* ─── Bare intent names ───
     * `var(--vds-color-primary)` is what anyone writes on first guess, so
     * it should resolve rather than fall through to a hex fallback. Each
     * points at the intent's solid (emphasis) step, which is what a bare
     * intent name means everywhere else in this system. */
    --vds-color-primary:   var(--vds-color-primary-solid);
    --vds-color-secondary: var(--vds-color-neutral-solid);
    --vds-color-success:   var(--vds-color-success-solid);
    --vds-color-warning:   var(--vds-color-warning-solid);
    --vds-color-danger:    var(--vds-color-danger-solid);
    --vds-color-info:      var(--vds-color-info-solid);
    --vds-color-accent:    var(--vds-color-accent-solid);

    /* ─── Neutral as an intent ───
     * The neutral scale has no `*-solid` / `*-bg` semantic pair the way the
     * six intents do, because "neutral" is spelled `surface` / `border` /
     * `text` everywhere else. Spinner and friends still want the intent
     * shape, so provide it. Steps match the intent contract: 9 = solid,
     * 3 = muted component background. */
    --vds-color-neutral-solid:       var(--vds-color-neutral-9);
    --vds-color-neutral-solid-hover: var(--vds-color-neutral-10);
    --vds-color-neutral-bg:          var(--vds-color-neutral-3);
    --vds-color-neutral-text:        var(--vds-color-neutral-11);

    /* ─── `*-emphasis` family (GitHub Primer naming) ───
     * emphasis == solid. Kept because docs pages and several component
     * token files reach for it. */
    --vds-color-primary-emphasis: var(--vds-color-primary-solid);
    --vds-color-success-emphasis: var(--vds-color-success-solid);
    --vds-color-warning-emphasis: var(--vds-color-warning-solid);
    --vds-color-danger-emphasis:  var(--vds-color-danger-solid);
    --vds-color-info-emphasis:    var(--vds-color-info-solid);
    --vds-color-accent-emphasis:  var(--vds-color-accent-solid);

    /* Text/icon drawn ON an `*-emphasis` fill. */
    --vds-color-primary-on-emphasis: var(--vds-color-on-primary);
    --vds-color-success-on-emphasis: var(--vds-color-on-success);
    --vds-color-warning-on-emphasis: var(--vds-color-on-warning);
    --vds-color-danger-on-emphasis:  var(--vds-color-on-danger);
    --vds-color-info-on-emphasis:    var(--vds-color-on-info);
    --vds-color-accent-on-emphasis:  var(--vds-color-on-accent);

    /* Neutral emphasis pair — the inverse bar/section treatment used by
     * Header and Section (`data-variant="emphasis"`). */
    --vds-color-bg-emphasis: var(--vds-color-bg-inverse);
    --vds-color-on-emphasis: var(--vds-color-text-inverse);

    /* ─── `*-muted` / `*-subtle` family ───
     * muted == the component-level tinted background (step 3), NOT the
     * app-level tint (step 2, which is `*-bg-subtle`). `*-subtle` is the
     * same surface under the name Nav and friends use for an active item. */
    --vds-color-primary-muted: var(--vds-color-primary-bg);
    --vds-color-success-muted: var(--vds-color-success-bg);
    --vds-color-warning-muted: var(--vds-color-warning-bg);
    --vds-color-danger-muted:  var(--vds-color-danger-bg);
    --vds-color-info-muted:    var(--vds-color-info-bg);
    --vds-color-accent-muted:  var(--vds-color-accent-bg);

    --vds-color-primary-subtle: var(--vds-color-primary-bg);
    --vds-color-success-subtle: var(--vds-color-success-bg);
    --vds-color-warning-subtle: var(--vds-color-warning-bg);
    --vds-color-danger-subtle:  var(--vds-color-danger-bg);
    --vds-color-info-subtle:    var(--vds-color-info-bg);
    --vds-color-accent-subtle:  var(--vds-color-accent-bg);

    /* Readable text sitting on a `*-muted` fill. */
    --vds-color-primary-muted-text: var(--vds-color-primary-text-muted);
    --vds-color-success-muted-text: var(--vds-color-success-text-muted);
    --vds-color-warning-muted-text: var(--vds-color-warning-text-muted);
    --vds-color-danger-muted-text:  var(--vds-color-danger-text-muted);
    --vds-color-info-muted-text:    var(--vds-color-info-text-muted);
    --vds-color-accent-muted-text:  var(--vds-color-accent-text-muted);

    /* ─── Reordered names ───
     * Same token, adjective-first instead of domain-first. */
    --vds-color-primary-border:   var(--vds-color-border-primary);
    --vds-color-primary-contrast: var(--vds-color-on-primary);
    --vds-color-border-default:   var(--vds-color-border);

    /* ─── Scrim/overlay aliases ───
     * `overlay*` predates the `scrim*` rename. Always black alpha — a
     * white-tinted scrim reads as a highlight, not a dim. */
    --vds-color-overlay:        var(--vds-color-scrim);
    --vds-color-overlay-light:  var(--vds-color-scrim-light);
    --vds-color-overlay-strong: var(--vds-color-scrim-strong);

    /* ─── Numeric ramp bridge ───
     * Tailwind-style 50–950 names mapped onto the 12-step scale. Only the
     * primary ramp is bridged, and only at the stops something references
     * — a full invented ramp would collide (Tailwind has more dark stops
     * than a 12-step scale does) and invite more of these. Use the 1–12
     * primitives, or better a semantic token, in new code. */
    --vds-color-primary-50:  var(--vds-color-primary-1);
    --vds-color-primary-100: var(--vds-color-primary-2);
    --vds-color-primary-200: var(--vds-color-primary-3);
    --vds-color-primary-500: var(--vds-color-primary-9);
    --vds-color-primary-700: var(--vds-color-primary-11);
  }
}

@layer tokens.base {
  /*
   * ── Syntax-highlight hues (sky / emerald / violet) ──
   *
   * Not aliases — three extra hues the six-intent palette doesn't carry,
   * needed so `react-editor` can colour property / selector / variable
   * tokens distinctly from keyword (primary), string (success) and
   * number (danger).
   *
   * Only step 11 exists. Step 11 is the "low-contrast text" step: it is
   * the one step in the ladder tuned to be *readable body-sized text on
   * the canvas in both modes*, which is exactly and only what syntax
   * highlighting needs. Adding the other eleven steps would be inventing
   * surface/border roles nothing consumes.
   *
   * Derived on the same curve as the intent step-11s (light L≈0.44–0.46,
   * dark L≈0.77) so they sit at the same optical weight next to
   * primary-11 / success-11 / danger-11 in the same code block.
   *
   *   sky      h=240  (bluer than info's 210, cooler than primary's 265)
   *   emerald  h=165  (greener than success's 155)
   *   violet   h=295  (past primary's indigo, before magenta)
   *
   * Contrast on the editor canvas (neutral-1): light ≥7.0:1, dark ≥8.9:1.
   */

  :root,
  [data-theme] {
    --vds-color-sky-11:     oklch(0.450 0.130 240);
    --vds-color-emerald-11: oklch(0.440 0.130 165);
    --vds-color-violet-11:  oklch(0.455 0.175 295);
  }

  [data-theme="dark"],
  [data-theme="dark-oled"] {
    --vds-color-sky-11:     oklch(0.770 0.125 240);
    --vds-color-emerald-11: oklch(0.765 0.140 165);
    --vds-color-violet-11:  oklch(0.775 0.150 295);
  }
}

```

## packages/tokens/src/brands/virtari.css

```css
@layer tokens.brand {
  /*
   * ── Virtari (default brand) ──
   *
   * Default brand identity. The scales here EXACTLY match the primitives
   * defaults — this file exists so adding new brands is symmetric, and
   * so the default can be re-asserted when nesting brand scopes.
   *
   * Activated by: <html data-brand="virtari">  (or no data-brand attr)
   *
   * To create a new brand, copy _template.css and override the hue/chroma
   * for primary, accent, and optionally any intent scale. The semantic
   * layer maps automatically — no component changes required.
   */

  :root,
  [data-brand="virtari"] {
    /* No overrides — defaults from primitives/intents.css apply.
       Brand authors: list your overrides below following the
       _template.css example. */
  }
}

```

## packages/tokens/src/brands/_template.css

```css
@layer tokens.brand {
  /*
   * ── Brand template ──
   *
   * Copy this file to brands/{your-brand}.css, replace "BRAND_ID" with
   * your brand id, and uncomment + tune the OKLCH values.
   *
   * Keep every rule inside `@layer tokens.brand`. That sub-layer is ordered
   * AFTER `tokens.base` (see colors.css), so these overrides win over the
   * base primitive scales on the SAME element — including <html data-brand>
   * and same-element combos like <section data-brand data-theme="dark"> —
   * regardless of specificity.
   *
   * Override ONLY primitive hues. The semantic layer (bg, surface, text,
   * border, ring, etc.) and per-component tokens reference these
   * primitives, so the entire system retints automatically.
   *
   * What to override:
   *   • primary-1..12 (light)  — the brand action color
   *   • primary-1..12 (dark)   — the brand action color in dark mode
   *   • accent-1..12 (optional) — secondary brand color
   *   • Any intent (success/warning/danger/info) IF the brand wants a
   *     custom semantic palette (rarely needed — defaults are tuned).
   *
   * Activated by: <html data-brand="BRAND_ID">
   */

  [data-brand="BRAND_ID"] {
    /* ── Primary (light) — replace 195 with your primary hue ── */
    /*
    --vds-color-primary-1:  oklch(0.985 0.005 195);
    --vds-color-primary-2:  oklch(0.970 0.010 195);
    --vds-color-primary-3:  oklch(0.940 0.020 195);
    --vds-color-primary-4:  oklch(0.905 0.040 195);
    --vds-color-primary-5:  oklch(0.870 0.070 195);
    --vds-color-primary-6:  oklch(0.825 0.110 195);
    --vds-color-primary-7:  oklch(0.770 0.150 195);
    --vds-color-primary-8:  oklch(0.700 0.190 195);
    --vds-color-primary-9:  oklch(0.550 0.200 195);
    --vds-color-primary-10: oklch(0.500 0.205 195);
    --vds-color-primary-11: oklch(0.450 0.190 195);
    --vds-color-primary-12: oklch(0.260 0.140 195);
    */
  }

  [data-brand="BRAND_ID"][data-theme="dark"],
  [data-theme="dark"] [data-brand="BRAND_ID"] {
    /* ── Primary (dark) ── */
    /*
    --vds-color-primary-1:  oklch(0.190 0.020 195);
    --vds-color-primary-2:  oklch(0.215 0.035 195);
    --vds-color-primary-3:  oklch(0.245 0.060 195);
    --vds-color-primary-4:  oklch(0.275 0.085 195);
    --vds-color-primary-5:  oklch(0.310 0.110 195);
    --vds-color-primary-6:  oklch(0.355 0.135 195);
    --vds-color-primary-7:  oklch(0.420 0.160 195);
    --vds-color-primary-8:  oklch(0.500 0.180 195);
    --vds-color-primary-9:  oklch(0.610 0.200 195);
    --vds-color-primary-10: oklch(0.665 0.195 195);
    --vds-color-primary-11: oklch(0.760 0.180 195);
    --vds-color-primary-12: oklch(0.910 0.080 195);
    */
  }
}

```