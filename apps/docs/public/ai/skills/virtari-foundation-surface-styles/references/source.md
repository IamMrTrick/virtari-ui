## packages/tokens/src/surface-styles.css

```css
@layer tokens {
  /* Inherit appearance intent as numbers, not resolved colors. Rebinding colors
     at a nested theme boundary must retain the ancestor's style and field tone. */
  :root {
    --_vds-surface-bordered: 0;
    --_vds-field-strong: 0;
    --vds-surface-shadow: 0 0 0 0 transparent;
    --vds-overlay-shadow: 0 0 0 0 transparent;
    --vds-field-shadow: 0 0 0 0 transparent;
  }
  [data-surface-style="tonal"] {
    --_vds-surface-bordered: 0;
    --vds-surface-shadow: 0 0 0 0 transparent;
    --vds-overlay-shadow: 0 0 0 0 transparent;
    --vds-field-shadow: 0 0 0 0 transparent;
  }
  [data-surface-style="bordered"] {
    --_vds-surface-bordered: 1;
    --vds-surface-shadow: 0 0 0 0 transparent;
    --vds-overlay-shadow: 0 0 0 0 transparent;
    --vds-field-shadow: 0 0 0 0 transparent;
  }
  [data-surface-style="elevated"] {
    --_vds-surface-bordered: 0;
    --vds-surface-shadow: var(--vds-shadow-sm);
    --vds-overlay-shadow: var(--vds-shadow-lg);
    --vds-field-shadow: var(--vds-shadow-xs);
  }
  [data-field-tone="strong"] { --_vds-field-strong: 1; }
  [data-field-tone="default"] { --_vds-field-strong: 0; }

  /* At the 0/100 endpoints color-mix selects an existing palette color exactly.
     Strong alpha preserves tinted parents: deeper in light and lifted in dark. */
  :root, [data-theme], [data-surface-style], [data-field-tone] {
    --vds-surface-bg: color-mix(in oklch, var(--vds-color-bg) calc(var(--_vds-surface-bordered) * 100%), var(--vds-color-surface-container-low));
    --vds-navigation-bg: color-mix(in oklch, var(--vds-color-surface-container-low) calc(var(--_vds-surface-bordered) * 100%), var(--vds-color-surface-container));
    --vds-surface-border: color-mix(in oklch, var(--vds-color-neutral-a4) calc(var(--_vds-surface-bordered) * 100%), transparent);
    --vds-overlay-bg: color-mix(in oklch, var(--vds-color-surface-container-low) calc(var(--_vds-surface-bordered) * 100%), var(--vds-color-surface-container-high));
    --vds-field-rest-bg: color-mix(in oklch, var(--vds-color-bg) calc(var(--_vds-surface-bordered) * 100%), var(--vds-color-surface-field));
    --vds-field-bg: color-mix(in oklch, var(--vds-color-neutral-a4) calc(var(--_vds-field-strong) * 100%), var(--vds-field-rest-bg));
    --vds-field-border: color-mix(in oklch, var(--vds-color-neutral-a6) calc(var(--_vds-surface-bordered) * 100%), transparent);
    --vds-field-border-hover: color-mix(in oklch, var(--vds-color-neutral-a8) calc(var(--_vds-surface-bordered) * 100%), transparent);
  }
  /* Quiet decorative boundaries are not a 3:1 guarantee. Honor stronger contrast
     preferences without changing semantic error/selection/focus indicators. */
  @media (prefers-contrast: more) {
    :root, [data-theme], [data-surface-style], [data-field-tone] {
      --vds-surface-border: var(--vds-color-text-muted);
      --vds-field-border: var(--vds-color-text-muted);
      --vds-field-border-hover: var(--vds-color-text);
      --vds-outline-field-border: var(--vds-color-text-muted);
      --vds-outline-field-border-hover: var(--vds-color-text);
    }
  }
  @media (forced-colors: active) {
    :root, [data-theme], [data-surface-style], [data-field-tone] {
      --vds-outline-field-border: ButtonText;
      --vds-outline-field-border-hover: Highlight;
      --vds-surface-border: CanvasText;
      --vds-field-border: ButtonText;
      --vds-field-border-hover: Highlight;
    }
  }
}

```

## packages/tokens/src/colors/semantic/background.css

```css
@layer tokens {
  /*
   * ── Background / surface / scrim semantic layer ──
   *
   * Canonical home for every neutral-family and overlay-family token.
   * Values consume the mode-aware 12-step primitives directly, so there
   * are no `light-dark()` wrappers — primitives already mode-switch.
   *
   * Elevation model (applies in both light & dark modes thanks to the
   * inverted luminance ladder in dark — higher step = lighter in dark,
   * darker in light):
   *
   *   bg               = canvas          (neutral-1)
   *   bg-subtle        = muted canvas    (neutral-2)
   *   bg-muted         = container       (neutral-3)
   *   surface          = flat surface    (neutral-1)
   *   surface-sunken   = inset           (neutral-2)
   *   surface-raised   = elevated        (neutral-2)
   *   surface-overlay  = popover/menu    (neutral-2)
   *   surface-hover    = hover state     (neutral-3)
   *   surface-active   = active state    (neutral-4)
   *   surface-selected = primary-tinted  (primary-3)
   *
   * Overlay/scrim always uses black-alpha regardless of theme —
   * a white-tinted scrim reads as a highlight, not a dim.
   */

  :root,
  [data-theme] {
    /* ─── Color-scheme signaling ───
     * Must state exactly one scheme here, and it must be the scheme the
     * tokens are actually in.
     *
     * This used to say `light dark`, which invites the browser to honor
     * prefers-color-scheme. Nothing in this repo does: there is not one
     * `@media (prefers-color-scheme: …)` rule anywhere, and every dark
     * value is keyed off `[data-theme="dark"]`. So on a machine set to
     * dark, the browser darkened everything it owns — scrollbars, form
     * controls, the canvas behind the page, autofill, spellcheck
     * underlines, `<select>` popups — while every token stayed light.
     * Dark chrome, light UI, on a theme nobody selected.
     *
     * `light` is the honest default because :root's token values are the
     * light ones. `[data-theme]` below re-states it whenever the app
     * actually switches. Add `light dark` back only together with real
     * prefers-color-scheme support — that is a product decision, not a
     * token one. */
    color-scheme: light;
  }
  [data-theme="light"] {
    color-scheme: light;
  }
  [data-theme="dark"],
  [data-theme="dark-oled"] {
    color-scheme: dark;
  }

  :root,
  [data-theme] {
    /* ─── Backgrounds ─── */
    --vds-color-bg:          color-mix(in oklch, var(--vds-color-neutral-1) 96%, var(--vds-color-primary-3));
    --vds-color-bg-subtle:   var(--vds-color-neutral-2);
    --vds-color-bg-muted:    var(--vds-color-neutral-3);
    --vds-color-bg-disabled: var(--vds-color-neutral-3);
    --vds-color-bg-inverse:  var(--vds-color-neutral-12);

    /* ─── Surfaces / elevation ─── */
    /* Tonal containment separates permanent navigation, content, fields and
       transient surfaces without making every boundary a heavy border. */
    --vds-color-surface-container-low: color-mix(in oklch, var(--vds-color-neutral-2) 82%, var(--vds-color-primary-3));
    --vds-color-surface-container: color-mix(in oklch, var(--vds-color-neutral-3) 84%, var(--vds-color-primary-3));
    --vds-color-surface-container-high: color-mix(in oklch, var(--vds-color-neutral-4) 88%, var(--vds-color-primary-4));
    --vds-color-surface-field: color-mix(in oklch, var(--vds-color-neutral-3) 90%, var(--vds-color-primary-3));
    --vds-color-primary-container: var(--vds-color-primary-4);
    --vds-color-on-primary-container: var(--vds-color-primary-12);
    --vds-color-on-surface-variant: var(--vds-color-neutral-11);
    --vds-color-surface:          var(--vds-color-bg);
    --vds-color-surface-sunken:   var(--vds-color-surface-container);
    --vds-color-surface-raised:   var(--vds-color-surface-container-low);
    --vds-color-surface-overlay:  var(--vds-color-surface-container-low);
    --vds-color-surface-hover:    var(--vds-color-neutral-3);
    --vds-color-surface-active:   var(--vds-color-neutral-4);
    --vds-color-surface-selected: var(--vds-color-primary-3);
    --vds-color-surface-inverse:  var(--vds-color-neutral-12);

    /* ─── Scrim (canonical) ───
       Always black alpha — shadows/scrims must not invert in dark.
       The older `overlay*` spelling lives in ../aliases.css. */
    --vds-color-scrim:        var(--vds-color-black-a7);
    --vds-color-scrim-light:  var(--vds-color-black-a4);
    --vds-color-scrim-strong: var(--vds-color-black-a9);

    /* ─── Shadow tint tokens ───
       Drop-in for `box-shadow: 0 1px 3px var(--shadow-tint)` so
       components don't hardcode `black`. */
    --vds-color-shadow-tint-low:    var(--vds-color-black-a3);
    --vds-color-shadow-tint:        var(--vds-color-black-a5);
    --vds-color-shadow-tint-strong: var(--vds-color-black-a7);

    /* ─── Highlight tints (glass/frost overlays on media) ─── */
    --vds-color-highlight-tint:        var(--vds-color-white-a3);
    --vds-color-highlight-tint-strong: var(--vds-color-white-a7);
  }
}

```

## packages/tokens/src/colors/semantic/border.css

```css
@layer tokens {
  /*
   * ── Border semantic layer ──
   *
   * Canonical home for every border token.
   *
   *   border             = default UI border      (neutral-7)
   *   border-interactive = boundary of a control  (neutral-9)
   *   border-muted       = subtle border          (neutral-6)
   *   border-subtle      = alias of border-muted  (neutral-6)
   *   border-strong      = strong divider         (neutral-8)
   *   border-disabled    = disabled element       (neutral-5)
   *   border-input       = form input border      (neutral-7)
   *   border-input-hover = form input on hover    (neutral-8)
   *   border-input-focus = form input on focus    (primary-9)
   *   border-focus       = generic focus border   (primary-9)
   *   divider            = horiz/vert separator   (neutral-a6)
   *   border-{intent}         = per-intent border (intent-7)
   *   border-{intent}-strong  = per-intent strong (intent-9)
   */

  :root,
  [data-theme] {
    /* ─── Neutral borders ─── */
    --vds-color-border:          var(--vds-color-neutral-7);
    --vds-color-border-muted:    var(--vds-color-neutral-6);
    --vds-color-border-subtle:   var(--vds-color-neutral-6);
    --vds-color-border-strong:   var(--vds-color-neutral-8);
    --vds-color-border-disabled: var(--vds-color-neutral-5);

    /* ─── Interactive boundary ───
     * WCAG 1.4.11 wants the boundary of a control (the thing that tells
     * you an input IS an input) to clear 3:1 against its surroundings.
     * `--vds-color-border` is neutral-7 — 1.73:1 light, 2.01:1 dark. It
     * is a *divider* weight, correct for separating content, wrong for
     * outlining a control. neutral-9 is the first step that clears the
     * bar: 4.11:1 light, 3.57:1 dark, 3.89:1 oled.
     *
     * Use this on anything a user can operate — input, select, textarea,
     * checkbox, radio, switch track, slider rail, outlined button. Keep
     * `--vds-color-border` for cards, dividers and other decoration. */
    --vds-color-border-interactive: var(--vds-color-neutral-9);

    /* ─── Form input borders ─── */
    --vds-color-border-input:       var(--vds-color-neutral-7);
    --vds-color-border-input-hover: var(--vds-color-neutral-8);
    --vds-color-border-input-focus: var(--vds-color-primary-9);

    /* ─── Focus border ─── */
    --vds-color-border-focus: var(--vds-color-primary-9);

    /* ─── Divider ─── */
    --vds-color-divider: var(--vds-color-neutral-a6);

    /* ─── Per-intent borders ─── */
    --vds-color-border-primary:        var(--vds-color-primary-7);
    --vds-color-border-primary-strong: var(--vds-color-primary-9);
    --vds-color-border-success:        var(--vds-color-success-7);
    --vds-color-border-success-strong: var(--vds-color-success-9);
    --vds-color-border-warning:        var(--vds-color-warning-7);
    --vds-color-border-warning-strong: var(--vds-color-warning-9);
    --vds-color-border-danger:         var(--vds-color-danger-7);
    --vds-color-border-danger-strong:  var(--vds-color-danger-9);
    --vds-color-border-info:           var(--vds-color-info-7);
    --vds-color-border-info-strong:    var(--vds-color-info-9);
    --vds-color-border-accent:         var(--vds-color-accent-7);
    --vds-color-border-accent-strong:  var(--vds-color-accent-9);
  }
}

```

## docs/surface-styles.md

```md
# Surface styles

Set `data-surface-style="bordered"`, `"tonal"` or `"elevated"` on the document root. The docs Settings panel persists this choice independently from color theme, direction and radius. Tonal is the default.

All default editable shells use the same field background, border color, hover border and resting shadow roles. Border width remains 1px in every style, including transparent borders, to avoid changes in height or text placement. Semantic focus, invalid and selection cues remain visible. Explicit component variants such as outline and ghost are deliberate overrides.

Bordered mode uses quiet neutral alpha boundaries (a4 on surfaces, a6 on fields and a8 on hover). An explicit field outline retains its border in every mode, using the same alpha scale. Increased contrast preferences restore stronger boundaries; forced colors uses system colors. A subtle decorative border is not a claim of WCAG boundary contrast.

Use `data-field-tone="strong"` on a field or group for a transparent fill that retains its surrounding color. It deepens a light container and lifts a dark one. Nested `data-field-tone="default"` restores the current appearance's resting field fill. The attribute works across Input, NumberInput, PhoneInput, Select, Combobox, DateField, Textarea, TagInput and OTP. Theme, appearance and tone boundaries can nest in either order; light, dark and OLED colors resolve locally. Custom host colors still need their own contrast assessment.

Cards and persistent panels use `--vds-surface-bg`, `--vds-surface-border` and `--vds-surface-shadow`. Menus and temporary panels use `--vds-overlay-bg` and `--vds-overlay-shadow`; navigation uses `--vds-navigation-bg`. A tonal layer must remain distinguishable from the layer behind it. Content separators and semantic indicators are not decorative container borders and retain their colors.

Scoped styles also work on a container. Portalled content is outside that container's CSS inheritance, so apply the same attribute to the portalled content, or put the mode on the document root. The comparison example in Introduction demonstrates this.

Nested default Cards use progressively distinct surface tones. Their corner budget follows the actual parent radius and inset, with a mode-specific minimum and explicit overrides respected; see [nested surfaces](./nested-surfaces.md).

ScrollArea defaults to `type="smart"`. Only overflowing axes have a track; scroll activity, pointer hover or keyboard focus reveals it. After 900ms idle outside hover/focus it fades away. Tracks overlay the viewport, avoiding layout shifts. Use `viewportRef` for scroll restoration and `viewportProps` for native viewport attributes/events. Existing auto/always/scroll/hover modes remain available. High contrast mode keeps tracks visible.

Native overflow areas (textareas, code, editors and menu lists) also hide their themed thumb while idle on desktop and reveal it on hover or keyboard focus. Touch retains the platform scrollbar behavior. High contrast mode preserves visibility. Use ScrollArea when scroll-activity timing and an inset overlay track are needed.

Stack uses native flex gap so component margin resets and hidden form controls cannot erase the spacing between fields.

Validation: field surface comparison, nested-card geometry and smart-scroll browser fixtures are under `apps/docs/tests`; they complement the native form compatibility audit. Appearance is validated in Chromium; native Safari password-manager behavior still requires the consuming application and a real saved credential.

```