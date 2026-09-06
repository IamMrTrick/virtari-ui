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

## packages/tokens/src/layout/primitives.css

```css
@layer tokens {
  :root {
    /*
     * ── Primitive Layout Scales ──
     * Raw values. Components should not consume these directly —
     * use the semantic tokens in semantic.css or a component token
     * from components.css instead.
     */

    /* Container (content max-width) ramp */
    --vds-container-width-xs:    20rem;   /* 320px  — tight form */
    --vds-container-width-sm:    40rem;   /* 640px  — short reading */
    --vds-container-width-md:    48rem;   /* 768px  — narrow article */
    --vds-container-width-lg:    64rem;   /* 1024px — default content */
    --vds-container-width-xl:    80rem;   /* 1280px — wide content */
    --vds-container-width-2xl:   96rem;   /* 1536px — max app canvas */
    --vds-container-width-prose: 65ch;    /* Optimal reading measure */
    --vds-container-width-full:  100%;

    /* Section block-padding ramp (vertical rhythm) */
    --vds-section-padding-none: 0;
    --vds-section-padding-xs:   var(--vds-space-4);   /* 1rem   */
    --vds-section-padding-sm:   var(--vds-space-8);   /* 2rem   */
    --vds-section-padding-md:   var(--vds-space-12);  /* 3rem   */
    --vds-section-padding-lg:   var(--vds-space-16);  /* 4rem   */
    --vds-section-padding-xl:   var(--vds-space-24);  /* 6rem   */
    --vds-section-padding-2xl:  var(--vds-space-32);  /* 8rem   */
    --vds-section-padding-3xl:  var(--vds-space-40);  /* 10rem  */

    /* Section inline-gutter ramp (horizontal breathing room inside container) */
    --vds-section-gutter-none: 0;
    --vds-section-gutter-xs:   var(--vds-space-3);    /* 0.75rem */
    --vds-section-gutter-sm:   var(--vds-space-4);    /* 1rem    */
    --vds-section-gutter-md:   var(--vds-space-6);    /* 1.5rem  */
    --vds-section-gutter-lg:   var(--vds-space-8);    /* 2rem    */
    --vds-section-gutter-xl:   var(--vds-space-12);   /* 3rem    */

    /* Row gap ramp (gap between columns) */
    --vds-row-gap-none: 0;
    --vds-row-gap-xs:   var(--vds-space-2);   /* 0.5rem  */
    --vds-row-gap-sm:   var(--vds-space-3);   /* 0.75rem */
    --vds-row-gap-md:   var(--vds-space-4);   /* 1rem    */
    --vds-row-gap-lg:   var(--vds-space-6);   /* 1.5rem  */
    --vds-row-gap-xl:   var(--vds-space-8);   /* 2rem    */
    --vds-row-gap-2xl:  var(--vds-space-12);  /* 3rem    */

    /* Column-count constants — divisors that factor into 12 for clean spans */
    --vds-row-cols-1:  1;
    --vds-row-cols-2:  2;
    --vds-row-cols-3:  3;
    --vds-row-cols-4:  4;
    --vds-row-cols-6:  6;
    --vds-row-cols-8:  8;
    --vds-row-cols-12: 12;

    /* Sidebar width ramp — expanded state. Aligned with common app chrome widths. */
    --vds-sidebar-width-sm:   12rem;   /* 192px — compact, icon+short-label */
    --vds-sidebar-width-md:   16rem;   /* 256px — default app chrome       */
    --vds-sidebar-width-lg:   20rem;   /* 320px — comfortable, nested nav  */
    --vds-sidebar-width-xl:   24rem;   /* 384px — wide, file-tree style    */

    /* Sidebar rail (collapsed icon-only) — sized to fit a 1.75rem icon + comfortable hit target */
    --vds-sidebar-rail-width: 3.5rem;  /* 56px */
  }
}

```