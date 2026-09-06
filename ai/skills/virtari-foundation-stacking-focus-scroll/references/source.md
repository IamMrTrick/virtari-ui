## packages/tokens/src/z-index.css

```css
@layer tokens {
  :root {
    /* Layering scale.
     *
     * Rule: transient floating popups (dropdown, select, combobox, menu,
     * popover, date-picker) must render ABOVE modal/drawer overlays, because
     * they are opened from within those layers and must remain visible and
     * clickable. Toasts and tooltips stay on top of everything.
     *
     * Do not reorder casually — z-index inversions here silently break every
     * Select/Combobox/Popover used inside a Drawer or Dialog.
     */
    --vds-z-hide: -1;
    --vds-z-base: 0;
    --vds-z-docked: 10;
    --vds-z-sticky: 1100;
    --vds-z-banner: 1200;
    --vds-z-overlay: 1300;
    --vds-z-modal: 1400;
    --vds-z-dropdown: 1500;
    --vds-z-popover: 1600;
    --vds-z-toast: 1700;
    --vds-z-tooltip: 1800;
  }
}

```

## packages/tokens/src/sizing.css

```css
@layer tokens {
  :root {
    /*
     * ── Component Size Scale ──
     * Shared height ramp for interactive components (buttons, inputs, selects, etc.)
     * Change these to resize all components globally.
     *
     * Size  Height  Pixels  WCAG AA (24px)  WCAG AAA (44px)  Apple HIG  Google MD
     * ───── ─────── ─────── ─────────────── ──────────────── ────────── ─────────
     * 2xs   1.5rem  24px    ⚠ minimum        ✗                ✗          ✗
     * xs    1.75rem 28px    ✓                ✗                ✗          ✗
     * sm    2rem    32px    ✓                ✗                ✗          ✗
     * md    2.25rem 36px    ✓                ✗                ✗          ✗
     * lg    2.5rem  40px    ✓                ✗                ✗          ✗
     * xl    2.75rem 44px    ✓                ✓                ✓ (44pt)   ✗
     * 2xl   3.25rem 52px    ✓                ✓                ✓          ✓ (48dp)
     * 3xl   4rem    64px    ✓                ✓                ✓          ✓
     */
    --vds-size-2xs: 1.5rem;
    --vds-size-xs: 1.75rem;
    --vds-size-sm: 2rem;
    --vds-size-md: 2.25rem;
    --vds-size-lg: 2.5rem;
    --vds-size-xl: 2.75rem;
    --vds-size-2xl: 3.25rem;
    --vds-size-3xl: 4rem;

    /* Surface Width Ramp */
    --vds-surface-width-xs:  20rem;
    --vds-surface-width-sm:  24rem;
    --vds-surface-width-md:  32rem;
    --vds-surface-width-lg:  48rem;
    --vds-surface-width-xl:  64rem;
    --vds-surface-width-2xl: 80rem;

    /* Focus Ring Geometry */
    --vds-focus-ring-width:  2px;
    --vds-focus-ring-offset: 2px;
  }
}

```

## packages/core/src/base.css

```css
@layer base {
  /* Center font cap/baseline metrics, not the font's asymmetric leading.
     Browsers without text-box support retain their normal line boxes. */
  .vds-control-text {
    display: block;
    min-inline-size: 0;
    text-box: trim-both cap alphabetic;
  }
  html {
    font-family: var(--vds-font-sans);
  }

  body {
    font-family: var(--vds-font-sans);
    font-size: var(--vds-text-base);
    line-height: var(--vds-leading-normal);
    color: var(--vds-color-text);
    background-color: var(--vds-color-bg);
  }

  /* The system-wide focus indicator. Geometry from the shared tokens
     (tokens/src/sizing.css) rather than literals, so a component that
     needs to redraw its own ring — clipped by an overflow parent, drawn
     as a box-shadow, offset inward — lands on the same 2px/2px as this
     one instead of re-deciding it locally. */
  :focus-visible {
    outline: var(--vds-focus-ring-width) solid var(--vds-color-ring);
    outline-offset: var(--vds-focus-ring-offset);
  }

  ::selection {
    background-color: var(--vds-color-selection-bg);
    color: var(--vds-color-selection-text);
  }

  /* Scrollbar — themed, cross-browser
     Standard CSS (Firefox, Chrome 121+, Safari 18.2+, Edge) */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--vds-color-border) transparent;
  }

  /* WebKit/Blink fallback (older Chrome, Safari <18.2, iOS) */
  *::-webkit-scrollbar {
    inline-size: 8px;
    block-size: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  /* --vds-radius-scrollbar-thumb exists specifically to stop this from
     being a capsule: the thumb is 8px thick, so any radius at or above
     4px rounds it into a pill/circle that reads as a rendering glitch
     rather than a scrollbar. The token caps at 6px and still lets sharp
     mode tighten it. The 999px literal here was bypassing all of that. */
  *::-webkit-scrollbar-thumb {
    background-color: var(--vds-color-border);
    border-radius: var(--vds-radius-scrollbar-thumb);
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: var(--vds-color-border-strong, var(--vds-color-text-subtle));
  }

  *::-webkit-scrollbar-corner {
    background: transparent;
  }

  /* Native overflow (textareas, editors, code and menu lists) follows the
     same quiet idle treatment. Touch keeps the platform's scroll affordance;
     ScrollArea owns activity-driven fading for composed scrolling surfaces. */
  @media (hover: hover) and (pointer: fine) {
    * {
      scrollbar-color: transparent transparent;
    }
    *:is(:hover, :focus-within) {
      scrollbar-color: var(--vds-color-border-strong, var(--vds-color-text-subtle)) transparent;
    }
    *::-webkit-scrollbar-thumb { background-color: transparent; }
    *:is(:hover, :focus-within)::-webkit-scrollbar-thumb {
      background-color: var(--vds-color-border-strong, var(--vds-color-text-subtle));
    }
  }
  @media (forced-colors: active) {
    * { scrollbar-color: auto; }
    *::-webkit-scrollbar-thumb { background-color: CanvasText; }
  }
}

/* Prevent iOS Safari auto-zoom on focus (triggers when font-size < 16px).
   Unlayered so it beats @layer components specificity. */
@supports (-webkit-touch-callout: none) {
  .vds-input,
  .vds-textarea,
  .vds-select-trigger {
    font-size: max(1rem, var(--_input-font-size, var(--_textarea-font-size, var(--_select-font-size, 1rem))));
  }
}

```

## packages/core/src/reset.css

```css
@layer reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    tab-size: 4;
    -webkit-tap-highlight-color: transparent;
  }

  a,
  button,
  [role="button"],
  label,
  select {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }

  input,
  textarea {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: default;
    -webkit-user-select: text;
    user-select: text;
  }

  body {
    min-block-size: 100dvh;
    line-height: inherit;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-inline-size: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Remove default search input appearance */
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }
}

```