## packages/tokens/src/typography.css

```css
@layer tokens {
  :root {
    /* ─── Font weights ─── */
    --vds-font-weight-normal: 400;
    --vds-font-weight-medium: 500;
    --vds-font-weight-semibold: 600;
    --vds-font-weight-bold: 700;

    /* ─── Font families ─── */
    --vds-font-sans: "Vazirmatn", "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
    --vds-font-latin: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
    --vds-font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", monospace;

    /* ─── Font sizes ─── */
    --vds-text-xs: 0.75rem;
    --vds-text-sm: 0.875rem;
    --vds-text-base: 1rem;
    --vds-text-lg: 1.125rem;
    --vds-text-xl: 1.25rem;
    --vds-text-2xl: 1.5rem;
    --vds-text-3xl: 1.875rem;
    --vds-text-4xl: 2.25rem;
    --vds-text-5xl: 3rem;
    --vds-text-6xl: 3.75rem;

    /* ─── Line heights ─── */
    --vds-leading-none: 1;
    --vds-leading-tight: 1.25;
    --vds-leading-snug: 1.375;
    --vds-leading-normal: 1.5;
    --vds-leading-relaxed: 1.625;
    --vds-leading-loose: 2;
    /* Center complete line boxes; opt-in offsets must be font-specific. */
    --vds-control-line-height: 1.5;
    --vds-control-line-height-rtl: 1.5;
    --vds-control-optical-offset: 0px;
    --vds-control-indicator-offset: 0px;

    /* ─── Letter spacing ─── */
    --vds-tracking-tighter: -0.05em;
    --vds-tracking-tight: -0.025em;
    --vds-tracking-normal: 0em;
    --vds-tracking-wide: 0.025em;
    --vds-tracking-wider: 0.05em;
    --vds-tracking-widest: 0.1em;
  }

  :where([dir="rtl"]) {
    --vds-control-line-height: var(--vds-control-line-height-rtl, 1.5);
  }
}

```

## packages/tokens/src/fonts.css

```css
/* Primary sans font: Vazirmatn (Persian/Arabic + Latin) with Inter fallback for Latin polish. */
@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");

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