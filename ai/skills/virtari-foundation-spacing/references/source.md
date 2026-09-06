## packages/tokens/src/spacing.css

```css
/*
 * Spacing — two tiers.
 *
 *   this file          Raw scale (--vds-space-*). Change to reshape the
 *                      whole system's rhythm at once.
 *   spacing/semantic   Purpose-named interior spacing (surface padding,
 *                      slot/stack/cluster/label gaps, control padding).
 *                      Components consume these.
 *
 * Component CSS should reach for the semantic tier. Drop to a raw
 * --vds-space-* only for a one-off the semantic tier has no name for —
 * and never for an inline-size (see --vds-surface-width-* in sizing.css).
 */
@import "./spacing/semantic.css";

@layer tokens {
  :root {
    --vds-space-0: 0;
    --vds-space-px: 1px;
    --vds-space-0-5: 0.125rem;
    --vds-space-1: 0.25rem;
    --vds-space-1-5: 0.375rem;
    --vds-space-2: 0.5rem;
    --vds-space-2-5: 0.625rem;
    --vds-space-3: 0.75rem;
    --vds-space-3-5: 0.875rem;
    --vds-space-4: 1rem;
    --vds-space-5: 1.25rem;
    --vds-space-6: 1.5rem;
    --vds-space-7: 1.75rem;
    --vds-space-8: 2rem;
    --vds-space-9: 2.25rem;
    --vds-space-10: 2.5rem;
    --vds-space-11: 2.75rem;
    --vds-space-12: 3rem;
    --vds-space-14: 3.5rem;
    --vds-space-16: 4rem;
    --vds-space-20: 5rem;
    --vds-space-24: 6rem;
    --vds-space-28: 7rem;
    --vds-space-32: 8rem;
    --vds-space-36: 9rem;
    --vds-space-40: 10rem;
    --vds-space-44: 11rem;
    --vds-space-48: 12rem;
    --vds-space-52: 13rem;
    --vds-space-56: 14rem;
    --vds-space-60: 15rem;
    --vds-space-64: 16rem;
    --vds-space-72: 18rem;
    --vds-space-80: 20rem;
    --vds-space-96: 24rem;
  }
}

```

## packages/tokens/src/spacing/semantic.css

```css
@layer tokens {
  :root {
    /*
     * ── Semantic Interior Spacing ──
     *
     * The raw scale in ../spacing.css answers "how big". These answer
     * "how far apart, and why" — for the space *inside* a component.
     * (The space *between* page regions is layout/semantic.css:
     * --vds-section-gap, --vds-row-gap, --vds-container-gutter.)
     *
     * Interior spacing is a hierarchy, not a set of independent numbers.
     * Reading a card, an eye has to resolve four nested groupings, and it
     * does that by gap size alone. So the gaps must be strictly ordered:
     *
     *   surface-padding  1.5rem   the edge of the thing
     *     slot-gap       1rem       header ↔ body ↔ footer
     *       stack-gap    0.75rem      siblings within one slot
     *         cluster-gap  0.5rem       chips/icons/actions on one line
     *           label-gap  0.375rem       title ↔ its own description
     *
     * Each level is smaller than the one containing it, and by enough to
     * be seen as smaller. Break that ordering — a 1rem gap between
     * siblings inside a slot whose slots are 1rem apart — and the
     * grouping collapses: the reader can no longer tell which heading
     * owns which paragraph. This is the single most common way a
     * component "looks off" without anyone being able to say why.
     *
     * Components should consume these rather than reaching for
     * --vds-space-* directly, so a surface can be retuned as a whole
     * (Card, Dialog and Popover all breathing the same way) by
     * overriding one token on a scoped wrapper.
     *
     * Override on a wrapper, not at :root, when a density mode is wanted:
     *
     *   .compact { --vds-surface-padding-inline: var(--vds-space-4);
     *              --vds-surface-padding-block:  var(--vds-space-4);
     *              --vds-slot-gap:               var(--vds-space-3); }
     */

    /* ─── The edge ───
     * Padding between a surface's border and its content. Inline and
     * block are separate tokens: they start equal, but block padding is
     * what you cut first on a phone, and dialogs/drawers routinely want
     * asymmetric breathing. */
    --vds-surface-padding-inline: var(--vds-space-6); /* 24px */
    --vds-surface-padding-block:  var(--vds-space-6); /* 24px */

    /* ─── Between slots ───
     * Header ↔ body ↔ footer. The widest interior gap, because these are
     * the seams a reader uses to find their way around the surface. */
    --vds-slot-gap: var(--vds-space-4); /* 16px */

    /* ─── Within a slot ───
     * Stacked siblings — form fields, list rows, paragraphs. */
    --vds-stack-gap: var(--vds-space-3); /* 12px */

    /* ─── Within a line ───
     * Things sitting side by side and read as one unit: an icon and its
     * label, a row of chips, a button pair in a footer. Small on purpose
     * — a cluster has to read as one object, not as several. */
    --vds-cluster-gap: var(--vds-space-2); /* 8px */

    /* ─── Within a label ───
     * Title ↔ description, field label ↔ helper/error text. The tightest
     * gap in the system: these two lines are one thought, and anything
     * larger makes the helper text look like it belongs to the next
     * field down. */
    --vds-label-gap: var(--vds-space-1-5); /* 6px */

    /* ─── Control interiors ───
     * The horizontal breathing room inside an interactive control. Split
     * in two because they are genuinely different jobs:
     *
     *   control            input, select, textarea, combobox — a text
     *                      box wants its value to start near the edge,
     *                      so the caret lines up with the label above it
     *   control-emphasis   button, and anything else whose whole box is
     *                      the target — one step wider, so the label sits
     *                      inside a visible cushion rather than filling
     *                      the fill
     *
     * Keep them one step apart. A button padded like an input reads as
     * cramped next to it; two steps apart and they stop looking like
     * members of the same family.
     *
     * Vertical size is NOT set here — control height comes from the
     * --vds-size-* ramp in ../sizing.css so every control on a row lines
     * up regardless of its font size. */
    --vds-control-padding-inline:          var(--vds-space-3); /* 12px */
    --vds-control-padding-inline-emphasis: var(--vds-space-4); /* 16px */
  }
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

## packages/tokens/src/layout/semantic.css

```css
@layer tokens {
  :root {
    /*
     * ── Semantic Layout Tokens ──
     * Purpose-named aliases that map onto primitives.
     * Components consume these (or the per-component tokens
     * in components.css). Override at :root or a scoped
     * wrapper to reshape a whole surface at once.
     */

    /* Container */
    --vds-container-width:  var(--vds-container-width-xl);
    --vds-container-gutter: var(--vds-section-gutter-md);

    /* Section vertical + horizontal rhythm */
    --vds-section-padding-block:  var(--vds-section-padding-lg);
    --vds-section-padding-inline: var(--vds-section-gutter-md);
    --vds-section-gap:            var(--vds-space-8);

    /* Row */
    --vds-row-gap:      var(--vds-row-gap-md);
    --vds-row-col-gap:  var(--vds-row-gap-md);
    --vds-row-row-gap:  var(--vds-row-gap-md);
    --vds-row-cols:     var(--vds-row-cols-12);
    --vds-row-min-col:  16rem;

    /* Sidebar */
    --vds-sidebar-width: var(--vds-sidebar-width-md);
    --vds-sidebar-rail:  var(--vds-sidebar-rail-width);
    --vds-sidebar-gap:   var(--vds-space-1);

    /*
     * App chrome row — shared height between a page's Header row and the
     * Sidebar's header / footer. When both consume this token they stay
     * visually aligned (sidebar brand sits level with the header bar).
     * Override on a chrome-scoped wrapper (e.g. `.docs-app`) to coordinate.
     */
    --vds-app-chrome-row: var(--vds-size-lg);
  }
}

```