## packages/tokens/src/motion.css

```css
@layer tokens {
  :root {
    /* ─── Durations ─── */
    --vds-duration-fastest: 50ms;
    --vds-duration-fast: 100ms;
    --vds-duration-normal: 200ms;
    --vds-duration-slow: 300ms;
    --vds-duration-slower: 400ms;
    --vds-duration-slowest: 500ms;

    /* ─── Easing ─── */
    --vds-ease-in: cubic-bezier(0.4, 0, 1, 1);
    --vds-ease-out: cubic-bezier(0, 0, 0.2, 1);
    --vds-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --vds-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
    --vds-ease-spring: cubic-bezier(0.22, 1.2, 0.36, 1);
    --vds-ease-ios: cubic-bezier(0.32, 0.72, 0, 1);
  }

  /* ─── Keyframes ─── */
  @keyframes vds-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes vds-fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes vds-scale-in {
    from {
      opacity: 0;
      scale: 0.95;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes vds-scale-out {
    from {
      opacity: 1;
      scale: 1;
    }
    to {
      opacity: 0;
      scale: 0.95;
    }
  }

  @keyframes vds-slide-in-from-top {
    from { translate: 0 -0.5rem; opacity: 0; }
    to { translate: 0 0; opacity: 1; }
  }

  @keyframes vds-slide-in-from-bottom {
    from { translate: 0 0.5rem; opacity: 0; }
    to { translate: 0 0; opacity: 1; }
  }

  @keyframes vds-slide-in-from-left {
    from { translate: -0.5rem 0; opacity: 0; }
    to { translate: 0 0; opacity: 1; }
  }

  @keyframes vds-slide-in-from-right {
    from { translate: 0.5rem 0; opacity: 0; }
    to { translate: 0 0; opacity: 1; }
  }

  /* Logical (direction-aware) slide keyframes. The start offset flips via
     --vds-slide-x-inline when the nearest ancestor resolves to RTL, so the
     same animation name produces a mirrored motion in Persian/Arabic. */
  :root { --vds-slide-x-inline: -0.5rem; }
  :where([dir="rtl"]) { --vds-slide-x-inline: 0.5rem; }

  @keyframes vds-slide-in-from-inline-start {
    from { translate: var(--vds-slide-x-inline) 0; opacity: 0; }
    to { translate: 0 0; opacity: 1; }
  }

  @keyframes vds-slide-in-from-inline-end {
    from { translate: calc(-1 * var(--vds-slide-x-inline)) 0; opacity: 0; }
    to { translate: 0 0; opacity: 1; }
  }

  @keyframes vds-slide-out-to-inline-start {
    from { translate: 0 0; opacity: 1; }
    to { translate: var(--vds-slide-x-inline) 0; opacity: 0; }
  }

  @keyframes vds-slide-out-to-inline-end {
    from { translate: 0 0; opacity: 1; }
    to { translate: calc(-1 * var(--vds-slide-x-inline)) 0; opacity: 0; }
  }

  /* ─── Respect reduced motion ─── */
  @media (prefers-reduced-motion: reduce) {
    :root {
      --vds-duration-fastest: 0ms;
      --vds-duration-fast: 0ms;
      --vds-duration-normal: 0ms;
      --vds-duration-slow: 0ms;
      --vds-duration-slower: 0ms;
      --vds-duration-slowest: 0ms;
    }
  }
}

```

## packages/tokens/src/transition.css

```css
@layer tokens {
  :root {
    /* ─── Transition presets ───
     *
     * Ready-to-use duration + easing pairs.
     * Usage: transition: color var(--vds-transition-base), background-color var(--vds-transition-base);
     *
     * These read from --vds-duration-* so prefers-reduced-motion collapses
     * them to 0ms automatically (defined in motion.css).
     */
    --vds-transition-fastest: var(--vds-duration-fastest) var(--vds-ease-out);
    --vds-transition-fast:    var(--vds-duration-fast)    var(--vds-ease-out);
    --vds-transition-base:    var(--vds-duration-normal)  var(--vds-ease-out);
    --vds-transition-slow:    var(--vds-duration-slow)    var(--vds-ease-out);
    --vds-transition-spring:  var(--vds-duration-slow)    var(--vds-ease-spring);
    --vds-transition-bounce:  var(--vds-duration-slow)    var(--vds-ease-bounce);
    --vds-transition-ios:     var(--vds-duration-slow)    var(--vds-ease-ios);
  }
}

```

## packages/tokens/src/shadows.css

```css
@layer tokens {
  :root {
    --vds-shadow-xs: 0 1px 2px 0 oklch(0 0 0 / 0.05);
    --vds-shadow-sm: 0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1);
    --vds-shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1);
    --vds-shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1);
    --vds-shadow-xl: 0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px oklch(0 0 0 / 0.1);
    --vds-shadow-2xl: 0 25px 50px -12px oklch(0 0 0 / 0.25);
    --vds-shadow-inner: inset 0 2px 4px 0 oklch(0 0 0 / 0.05);
    --vds-shadow-none: 0 0 0 0 transparent;
  }
}

```

## packages/tokens/src/opacity.css

```css
@layer tokens {
  :root {
    --vds-opacity-0:   0;
    --vds-opacity-5:   0.05;
    --vds-opacity-10:  0.1;
    --vds-opacity-20:  0.2;
    --vds-opacity-25:  0.25;
    --vds-opacity-30:  0.3;
    --vds-opacity-40:  0.4;
    --vds-opacity-50:  0.5;
    --vds-opacity-60:  0.6;
    --vds-opacity-70:  0.7;
    --vds-opacity-75:  0.75;
    --vds-opacity-80:  0.8;
    --vds-opacity-90:  0.9;
    --vds-opacity-95:  0.95;
    --vds-opacity-100: 1;

    /*
     * ── Semantic ──
     * The numeric scale above says how transparent; this says why.
     *
     * There is exactly ONE disabled opacity. Components had drifted to
     * seven different literals — 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.7 —
     * across ~50 declarations, so a disabled button and the disabled
     * input beside it faded by visibly different amounts. Reach for this
     * instead of a literal.
     *
     * Opacity is the last resort for a disabled state — it dims the
     * border and the focus ring along with the label. Prefer
     * --vds-color-text-disabled / -bg-disabled / -border-disabled where
     * the design allows, and use this for the parts (icons, nested
     * controls, custom art) those don't reach.
     */
    --vds-opacity-disabled: var(--vds-opacity-50);
  }
}

```

## packages/tokens/src/filter.css

```css
@layer tokens {
  :root {
    /* ─── Blur scale ───
     * Use as: filter: var(--vds-blur-md);
     */
    --vds-blur-none: blur(0px);
    --vds-blur-xs:   blur(2px);
    --vds-blur-sm:   blur(4px);
    --vds-blur-md:   blur(8px);
    --vds-blur-lg:   blur(12px);
    --vds-blur-xl:   blur(16px);
    --vds-blur-2xl:  blur(24px);
    --vds-blur-3xl:  blur(40px);

    /* ─── Backdrop-filter scale ───
     * Use as: backdrop-filter: var(--vds-backdrop-md);
     * Frosted-glass effect — pair with a semi-transparent background.
     */
    --vds-backdrop-none: blur(0px);
    --vds-backdrop-xs:   blur(2px);
    --vds-backdrop-sm:   blur(4px);
    --vds-backdrop-md:   blur(8px);
    --vds-backdrop-lg:   blur(12px);
    --vds-backdrop-xl:   blur(20px);
    --vds-backdrop-2xl:  blur(32px);
  }
}

```

## packages/tokens/src/gradient.css

```css
@layer tokens {
  :root {
    /* ─── Surface gradients ───
     * Subtle background gradients for elevated surfaces.
     */
    --vds-gradient-surface:        linear-gradient(180deg, var(--vds-color-neutral-1), var(--vds-color-neutral-2));
    --vds-gradient-surface-raised: linear-gradient(180deg, var(--vds-color-neutral-2), var(--vds-color-neutral-3));

    /* ─── Intent gradients ───
     * Use for hero sections, banners, or primary CTAs.
     */
    --vds-gradient-primary: linear-gradient(135deg, var(--vds-color-primary-9),  var(--vds-color-primary-11));
    --vds-gradient-success: linear-gradient(135deg, var(--vds-color-success-9),  var(--vds-color-success-11));
    --vds-gradient-warning: linear-gradient(135deg, var(--vds-color-warning-9),  var(--vds-color-warning-11));
    --vds-gradient-danger:  linear-gradient(135deg, var(--vds-color-danger-9),   var(--vds-color-danger-11));
    --vds-gradient-info:    linear-gradient(135deg, var(--vds-color-info-9),     var(--vds-color-info-11));
    --vds-gradient-accent:  linear-gradient(135deg, var(--vds-color-accent-9),   var(--vds-color-accent-11));

    /* ─── Mask / fade-out overlays ───
     * Use these to fade content into the background at scroll edges.
     * Logical variants flip automatically in RTL.
     */
    --vds-gradient-fade-start:  linear-gradient(to right, var(--vds-color-bg), transparent);
    --vds-gradient-fade-end:    linear-gradient(to left,  var(--vds-color-bg), transparent);
    --vds-gradient-fade-top:    linear-gradient(to bottom, var(--vds-color-bg), transparent);
    --vds-gradient-fade-bottom: linear-gradient(to top,   var(--vds-color-bg), transparent);
  }

  /* Logical (direction-aware) fade gradients — flip in RTL automatically */
  :root { --vds-gradient-fade-inline-start: linear-gradient(to right, var(--vds-color-bg), transparent); }
  :where([dir="rtl"]) { --vds-gradient-fade-inline-start: linear-gradient(to left, var(--vds-color-bg), transparent); }

  :root { --vds-gradient-fade-inline-end: linear-gradient(to left, var(--vds-color-bg), transparent); }
  :where([dir="rtl"]) { --vds-gradient-fade-inline-end: linear-gradient(to right, var(--vds-color-bg), transparent); }
}

```

## packages/tokens/src/design-language.css

```css
@layer tokens {
  :root {
    /* Relationship spacing, distinct from component dimensions. Keep labels,
       icons, groups, and sections on the same hierarchy across surfaces. */
    --vds-gap-icon-compact: var(--vds-space-1);
    --vds-gap-icon: var(--vds-space-2);
    --vds-gap-related: var(--vds-space-3);
    --vds-gap-group: var(--vds-space-4);
    --vds-gap-section: var(--vds-space-6);
    --vds-inset-control: var(--vds-space-3);
    --vds-inset-surface: var(--vds-space-6);
    --vds-state-hover-opacity: 0.08;
    --vds-state-pressed-opacity: 0.12;
    --vds-state-focus-opacity: 0.12;
    --vds-elevation-flat: var(--vds-shadow-none);
    --vds-elevation-resting: var(--vds-shadow-xs);
    --vds-elevation-raised: var(--vds-shadow-sm);
    --vds-elevation-floating: var(--vds-shadow-lg);
    --vds-elevation-modal: var(--vds-shadow-xl);
  }
}

```