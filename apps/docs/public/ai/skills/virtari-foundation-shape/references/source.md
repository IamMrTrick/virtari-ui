## packages/tokens/src/radii/primitives.css

```css
@layer tokens {
  :root {
    /*
     * ── Primitive Radius Scale ──
     * Raw values. Components should not consume these directly —
     * use the t-shirt scale in modes.css or a component token
     * from components.css instead.
     */
    /* `0px`, not `0`. A unitless zero is a <number>, and <number> is not
     * a <length> — so `calc(var(--vds-radius-0) - 1px)` is invalid at
     * computed-value time and the whole declaration is dropped. That
     * matters because radius arithmetic is exactly what nesting.css does
     * to keep concentric corners aligned, and sharp mode maps
     * --vds-radius-xs onto this token. Keep the unit. */
    --vds-radius-0: 0px;
    --vds-radius-1: 0.125rem;  /* 2px */
    --vds-radius-2: 0.25rem;   /* 4px */
    --vds-radius-3: 0.375rem;  /* 6px */
    --vds-radius-4: 0.5rem;    /* 8px */
    --vds-radius-5: 0.75rem;   /* 12px */
    --vds-radius-6: 1rem;      /* 16px */
    --vds-radius-7: 1.5rem;    /* 24px */
    --vds-radius-full: 9999px;
  }
}

```

## packages/tokens/src/radii/modes.css

```css
@layer tokens {
  /*
   * ── T-shirt semantic scale ──
   * Purpose-based, mode-reactive tokens. Prefer these in component CSS.
   *
   *   xs   tightest interactive (tiny chips, compact controls)
   *   sm   compact interactive  (small controls, item details)
   *   md   field shell          (input, select, textarea)
   *   lg   small surface        (card, dropdown-menu, popover)
   *   xl   large surface        (dialog, drawer, toast)
   *   2xl  extra-large surface
   *   full fully rounded (pill/circle)
   *
   * ── Modes ──
   * Set `data-radius` on <html> or any container to switch the personality.
   *   sharp  — minimal rounding → enterprise, technical, dense
   *   soft   — branded rounding → default (= :root)
   *   round  — noticeable rounding → friendly, modern, consumer
   *   pill   — roundest personality → button/pill affordances go fully rounded
   *
   * ── Back-compat aliases ──
   * --vds-radius-element / --vds-radius-surface / --vds-radius-badge remain
   * thin aliases. Component tokens decide what becomes truly full in pill.
   */
  :root,
  [data-radius="soft"] {
    --vds-radius-xs:   var(--vds-radius-2);  /* 4px  */
    --vds-radius-sm:   var(--vds-radius-4);  /* 8px: compact actions */
    --vds-radius-md:   var(--vds-radius-5);  /* 12px: fields */
    --vds-radius-lg:   1.25rem;             /* 20px: contained groups */
    --vds-radius-xl:   1.75rem;             /* 28px: dialogs and sheets */
    --vds-radius-2xl:  2rem;                /* 32px: large surfaces */


  }

  /* Resolve aliases at every mode boundary, including nested themes. */
  :root,
  [data-radius] {
    --vds-radius-element: var(--vds-radius-sm);
    --vds-radius-surface: var(--vds-radius-lg);
    --vds-radius-badge: var(--vds-radius-full);
  }

  /* ── Mode: Sharp ── */
  [data-radius="sharp"] {
    --vds-radius-xs:  var(--vds-radius-0);
    --vds-radius-sm:  var(--vds-radius-1);
    --vds-radius-md:  var(--vds-radius-1);
    --vds-radius-lg:  var(--vds-radius-2);
    --vds-radius-xl:  var(--vds-radius-2);
    --vds-radius-2xl: var(--vds-radius-3);
  }

  /* ── Mode: Soft (default — same as :root) ── */

  /* ── Mode: Round ── */
  [data-radius="round"] {
    --vds-radius-xs:  var(--vds-radius-3);
    --vds-radius-sm:  var(--vds-radius-4);
    --vds-radius-md:  var(--vds-radius-6);
    --vds-radius-lg:  var(--vds-radius-7);
    --vds-radius-xl:  2rem;
    --vds-radius-2xl: 2.5rem;
  }

  /* ── Mode: Pill ── */
  [data-radius="pill"] {
    --vds-radius-xs:  var(--vds-radius-4);
    --vds-radius-sm:  var(--vds-radius-5);
    --vds-radius-md:  var(--vds-radius-6);
    --vds-radius-lg:  var(--vds-radius-7);
    --vds-radius-xl:  2rem;
    --vds-radius-2xl: 2.5rem;
  }
}

```

## packages/tokens/src/radii/components.css

```css
@layer tokens {
  :root,
  [data-radius] {
    /*
     * ── Per-component radius tokens (caps) ──
     * Only components that break under certain modes get a dedicated token.
     * Pattern: min(<what the mode wants>, <this component's breaking point>).
     * min() lets global modes shrink the value (sharp) but never exceed the cap,
     * so pill mode can't turn a checkbox into a radio or bloat a dialog.
     *
     * Components NOT listed here keep using the generic t-shirt scale
     * or the element/surface/badge aliases — intentional.
     */

    /* Checkbox — finite mode role, with a further size-relative cap in the
     * component so even its smallest size remains distinct from a radio. */
    --vds-radius-checkbox: min(var(--vds-radius-element), var(--vds-radius-4));

    /* Checkbox card — follow card radius family (xl cap) so card-style
     * selections match sibling surfaces like Card / Alert / Toast. */
    --vds-radius-checkbox-card: var(--vds-radius-card);

    /* Multiline fields share the finite radius of other input shells. */
    --vds-radius-textarea: var(--vds-radius-control);

    /* Keycaps remain compact rectangles, distinct from action capsules. */
    --vds-radius-kbd: min(var(--vds-radius-xs), var(--vds-radius-3));

    /* Default control shell/action aliases. Inputs and fields stay on the
     * finite control radius; button-like affordances switch to full in pill
     * mode below. */
    --vds-radius-control: var(--vds-radius-md);
    --vds-radius-input: var(--vds-radius-control);
    --vds-radius-control-action: min(var(--vds-radius-control), var(--vds-radius-4));
    --vds-radius-button: var(--vds-radius-lg);
    --vds-radius-button-group: var(--vds-radius-button);
    --vds-radius-action: var(--vds-radius-control-action);
    --vds-radius-copy-button: var(--vds-radius-action);
    --vds-radius-toggle: var(--vds-radius-button);
    --vds-radius-pagination-button: var(--vds-radius-button);
    --vds-radius-tabs-trigger: var(--vds-radius-button);
    --vds-radius-tabs-boxed: min(var(--vds-radius-control), var(--vds-radius-4));
    --vds-radius-toast-action: var(--vds-radius-button);

    /* Chip — follow Badge: pill in every mode.
     * Kept as a separate alias so future themes can diverge chip from badge. */
    --vds-radius-chip: var(--vds-radius-badge);

    /* List panels share the surface family; tooltips stay compact. */
    --vds-radius-select-content: var(--vds-radius-surface);
    --vds-radius-tooltip:        min(var(--vds-radius-element), var(--vds-radius-4));

    /* Command/list panels and code surfaces. */
    --vds-radius-command: min(var(--vds-radius-surface), var(--vds-radius-xl));
    --vds-radius-code: min(var(--vds-radius-md), var(--vds-radius-lg));
    --vds-radius-code-inline: min(var(--vds-radius-control), var(--vds-radius-4));

    /* Color picker. The shell behaves like a small surface, nested panels like
     * code blocks, and compact fields like controls. */
    --vds-radius-color-picker: var(--vds-radius-card);
    --vds-radius-color-picker-panel: var(--vds-radius-code);
    --vds-radius-color-picker-field: var(--vds-radius-control);

    /* Date/time picker. Calendar cells and segment focus rectangles must not
     * become pills; content surfaces follow popover/card shaping. */
    --vds-radius-date-field: var(--vds-radius-input);
    --vds-radius-date-segment: var(--vds-radius-control-action);
    --vds-radius-date-trigger: var(--vds-radius-control-action);
    --vds-radius-date-cell: min(var(--vds-radius-control), var(--vds-radius-4));
    --vds-radius-date-content: min(var(--vds-radius-surface), var(--vds-radius-xl));
    --vds-radius-time-picker-surface: var(--vds-radius-date-content);
    --vds-radius-time-picker-inner: var(--vds-radius-input);

    /* Bottom navigation surface. */
    --vds-radius-bottom-nav: var(--vds-radius-card);

    /* Alert banners use the compact field family. */
    --vds-radius-alert: min(var(--vds-radius-md), var(--vds-radius-xl));

    /* Cards/toasts follow surfaces; modal panels use the larger sheet role. */
    --vds-radius-card:         min(var(--vds-radius-surface), var(--vds-radius-xl));
    --vds-radius-dialog:       var(--vds-radius-xl);
    --vds-radius-alert-dialog: var(--vds-radius-xl);
    --vds-radius-drawer:       var(--vds-radius-xl);
    --vds-radius-toast:        min(var(--vds-radius-surface), var(--vds-radius-xl));

    /* Data table — cap at primitive-4 (8px). The inner <table> cells can't round,
     * so the outer container radius is purely decorative. Anything above 8px
     * creates visible wedges where the sticky-header divider and scrollbar
     * meet the rounded corners. Must use a primitive cap. */
    --vds-radius-data-table: min(var(--vds-radius-surface), var(--vds-radius-4));

    /* Radio card — follow card radius family (xl cap) so card-style
     * selections match sibling surfaces and the checkbox card. */
    --vds-radius-radio-card: var(--vds-radius-card);
    --vds-radius-radio-card-icon: var(--vds-radius-control-action);

    /* Segmented tracks belong to the field family. Their inset indicators
     * subtract the track border and padding; they do not repeat this radius. */
    --vds-radius-segmented: var(--vds-radius-control);

    /* Nav item — cap at primitive-5 (12px) so pill radius mode rounds items
     * noticeably but never turns them into full capsules in the sidebar.
     * data-variant="pill" on <Nav> still overrides to --vds-radius-full explicitly. */
    --vds-radius-nav-item: min(var(--vds-radius-element), var(--vds-radius-5));
    --vds-radius-breadcrumb-item: var(--vds-radius-nav-item);
    --vds-radius-tree-item: var(--vds-radius-nav-item);

    /* Editor families. Rich text surfaces need their own caps because they
     * contain many nested controls that would otherwise inherit the raw scale. */
    --vds-radius-editor-block: var(--vds-radius-code);
    --vds-radius-editor-surface: var(--vds-radius-card);
    --vds-radius-editor-popover: var(--vds-radius-card);
    --vds-radius-editor-control: var(--vds-radius-button);
    --vds-radius-editor-control-sm: var(--vds-radius-action);
    --vds-radius-yoopta-block: var(--vds-radius-editor-block);
    --vds-radius-yoopta-surface: var(--vds-radius-editor-surface);
    --vds-radius-yoopta-popover: var(--vds-radius-editor-popover);
    --vds-radius-yoopta-inline: var(--vds-radius-code-inline);
    --vds-radius-yoopta-control: var(--vds-radius-editor-control-sm);

    /* File upload. */
    --vds-radius-file-upload-dropzone: var(--vds-radius-card);
    --vds-radius-file-upload-preview: var(--vds-radius-control-action);
    --vds-radius-file-upload-remove: var(--vds-radius-action);

    /* Pill radio — always pill-shaped, mirroring badge/chip. */
    --vds-radius-pill-radio: var(--vds-radius-badge);

    /* Pill checkbox — mirrors pill-radio. */
    --vds-radius-pill-checkbox: var(--vds-radius-badge);

    /* Scrollbar thumb — cap via primitive so pill mode can't bloat the
     * thumb into a full circle. Thumbs are 8–10px thick; 9999px radius
     * makes them capsules/circles which reads as a UI glitch. The
     * primitive --vds-radius-3 (6px) is mode-invariant, while
     * --vds-radius-sm still lets sharp mode tighten to 2px. */
    --vds-radius-scrollbar-thumb: min(var(--vds-radius-sm), var(--vds-radius-3));
  }

  [data-radius="pill"] {
    --vds-radius-input: var(--vds-radius-md);
    --vds-radius-button: var(--vds-radius-full);
    --vds-radius-button-group: var(--vds-radius-full);
    --vds-radius-action: var(--vds-radius-full);
    --vds-radius-copy-button: var(--vds-radius-full);
    --vds-radius-toggle: var(--vds-radius-full);
    --vds-radius-pagination-button: var(--vds-radius-full);
    --vds-radius-segmented: var(--vds-radius-full);
    --vds-radius-tabs-trigger: var(--vds-radius-full);
    --vds-radius-toast-action: var(--vds-radius-full);
  }
}

```

## packages/tokens/src/radii/nesting.css

```css
/*
 * ── Radius nesting (the concentricity channel) ──
 *
 * Rounded corners nest badly. Put a 12px-radius panel inside a
 * 12px-radius card with 16px of padding and the inner corner does not
 * follow the outer one — it bulges, because two concentric arcs are only
 * parallel when their radii differ by exactly the distance between them.
 * The eye reads the mismatch instantly even when it can't name it. Every
 * design system that draws a card with something rounded inside it hits
 * this, and most solve it by hand-tuning a literal per component, which
 * then silently rots the moment `data-radius` changes the mode.
 *
 * The rule is one subtraction:
 *
 *   inner radius = outer radius − distance from the outer edge
 *
 * There are two distances worth naming:
 *
 *   flush   the child touches the host's inner edge — a media strip
 *           across the top of a card, a sticky header inside a dialog,
 *           a table filling a panel. Distance = the host's border.
 *
 *   inset   the child sits inside the host's padding — a code block in
 *           a card, a nested field in a picker, a highlighted row in a
 *           menu. Distance = the host's border + its padding.
 *
 * ── Using it ──
 *
 * The host carries `data-radius-host` in its markup, and declares what it
 * is on the element that draws the corner:
 *
 *   .vds-card {
 *     border-radius: var(--vds-radius-card);
 *     border: 1px solid var(--vds-color-border);
 *     padding: var(--vds-surface-padding-block) var(--vds-surface-padding-inline);
 *
 *     --vds-radius-host-r: var(--vds-radius-card);
 *     --vds-radius-host-b: 1px;
 *     --vds-radius-host-p: var(--vds-surface-padding-inline);
 *   }
 *
 * A direct child then reads the answer:
 *
 *   .vds-card__media  { border-radius: var(--vds-radius-flush); }
 *   .vds-card__code   { border-radius: var(--vds-radius-inset); }
 *
 * The host's own radius still comes from the component token, so radius
 * modes (`data-radius="sharp|soft|round|pill"`) keep working — the
 * children just follow whatever the host landed on.
 *
 * ── Why exactly one level ──
 *
 * `--vds-radius-inset` and `--vds-radius-flush` are registered with
 * `inherits: false`. Only the host's *direct children* are given a
 * value; anything deeper computes the initial `0px` — a square corner —
 * rather than inheriting a number that would be wrong for it. A
 * grandchild is not concentric with the host (there is another border
 * and another padding in between), so failing flat is the correct
 * failure. If a grandchild needs concentric corners, its own parent
 * becomes a host.
 *
 * Registering `--vds-radius-host-r/-b/-p` as `<length>` matters too: it
 * keeps the subtraction valid. Unregistered, a host that set the radius
 * but not the padding would produce an invalid `calc()` and CSS would
 * drop the child's whole `border-radius` declaration; registered, the
 * missing input is `0px` and the corner is merely un-inset.
 *
 * Those three DO inherit — the direct-child rule has to be able to read
 * them. Which means: always set all three on a host, even the zeroes. A
 * host nested inside another host that declares only `-r` will inherit
 * the outer host's `-b` and `-p` and subtract the wrong distance. The
 * `0px` initial only protects a host with no host above it.
 *
 * ── Nested hosts ──
 *
 * These outputs are for leaf geometry. A child that publishes its own
 * host-r must not derive that same host-r from --vds-radius-inset: that
 * would create a custom-property cycle on the child. Card-to-Card nesting
 * uses a pooled layout observer and a separate --card-nested-radius input
 * instead. It measures intervening slots/wrappers and never changes these
 * generic channels.
 */

@property --vds-radius-host-r {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
}

@property --vds-radius-host-b {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
}

@property --vds-radius-host-p {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
}

/* The two public outputs. `inherits: false` is what confines them to one
 * level — see "Why exactly one level" above. */
@property --vds-radius-inset {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}

@property --vds-radius-flush {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}

@layer tokens {
  /*
   * `max(0px, …)` clamps the subtraction. A host rounder than it is deep
   * (a pill-mode control, or any surface whose padding exceeds its
   * radius) would otherwise hand its children a negative length, which is
   * invalid for border-radius. Square is the right floor: once the outer
   * arc has been fully consumed there is nothing left for the inner one
   * to follow.
   */
  [data-radius-host] > * {
    --vds-radius-flush: max(
      0px,
      var(--vds-radius-host-r) - var(--vds-radius-host-b)
    );
    --vds-radius-inset: max(
      0px,
      var(--vds-radius-host-r) - var(--vds-radius-host-b) -
        var(--vds-radius-host-p)
    );
  }
}

```

## docs/radius-audit.md

```md
# Radius and shortcut audit — 2026-09-06

The previous implementation was not fully consistent. This audit inspected radius references across 753 package CSS/TS/TSX files, then exercised the affected geometry in the browser. Every referenced `--vds-radius-*` name has a definition. Defined tokens alone do not prove that a component uses the correct role, so the fixes below address actual rendered behavior.

## Virtari shape contract

These values are Virtari brand decisions, not universal accessibility requirements. Values below assume a 16px root font; finite rem-based roles follow root font sizing.

| Role | Sharp | Soft | Round | Pill |
| --- | ---: | ---: | ---: | ---: |
| Input, Select, Textarea | 2px | 12px | 16px | 16px |
| Horizontal segmented track | 2px | 12px | 16px | Capsule |
| Vertical segmented track | 2px | 12px | 16px | 16px |
| Button / Toggle | 4px | 20px | 24px | Capsule |
| Kbd keycap | 0px | 4px | 6px | 6px |
| Card / small surface | 4px | 20px | 24px | 24px |
| Dialog / Drawer | 4px | 28px | 32px | 32px |

CSS normalizes oversized corner radii against the element's actual dimensions; a short button can therefore look like a capsule even when its specified radius is finite. A checkbox is further capped at one quarter of its own size so a small checkbox cannot turn into a circle. Explicit pill variants, avatars, radios and slider handles intentionally retain capsule/circular geometry.

A shared language does not mean identical radii everywhere. Controls, actions, compact keycaps and surfaces have separate roles. Closely inset segments subtract track padding and border from their parent's corner. Nested Cards account for actual parent radius, intervening inset and an explicit minimum shape; independently spaced controls retain their own role. Underline tabs remain flat, boxed tabs have attached corners, and pill tabs are explicitly capsules.

## Concrete corrections

- Segmented tracks previously used an 8px cap unrelated to the 12px field role. They now share the control role; indicators and triggers agree on the inner corner. Vertical pill tracks remain finite to avoid tall capsules around short options.
- Boxed tabs had a fixed 0.5rem corner, bypassing Sharp mode. They now use a mode-aware capped role.
- Round fields were identical to Soft fields. Round now uses the next finite control step, 16px.
- Keycaps used the larger compact-action role. They now keep a smaller 4px Soft / 6px Round cap.
- Small checkboxes could become visually circular. Their radius now accounts for actual checkbox size.
- ReactFlow root-only aliases failed to follow a nested radius mode. Aliases now resolve at each mode boundary.
- Editor radius subtraction could become negative in Sharp mode. Each subtraction clamps at zero.
- TimeWheel used a fixed primitive radius. It now follows the date-control role.
- SegmentedControl now includes the Tabs styles it uses when imported independently.
- Tabs and SegmentedControl preserve explicit direction and DirectionProvider precedence while inheriting a live DOM ancestor direction when neither is supplied.
- Search used a hardcoded Mac glyph on Windows. Shortcut rendering and matching now use shared platform logic. `mod+k` is Control+K on Windows/Linux and Command+K on Apple platforms. The command demo has its own shortcut so it cannot compete with global search.
- Controlled CommandDialog had no primitive trigger to restore focus to. It now captures the actual opener and restores focus and caret after closing, while honoring consumer autofocus overrides.
- Sizing documentation no longer labels a component WCAG-compliant solely from its height.

## Verification

Browser fixtures are in `apps/docs/tests`:

- `radius-system.html`: rendered role values, checkbox shape, light/dark/OLED and bordered/tonal/elevated stability, nested mode resets, live mode switching, three sizes and LTR/RTL.
- `tabs-radius.html`: tab variants, segmented controls, indicator/trigger geometry, horizontal/vertical layouts, size ramps, nested and explicit direction behavior.
- `radius-secondary.html`: 128 assertions for Flow, TimeWheel and valid nonnegative Editor geometry across all 16 nested mode combinations.
- `platform-shortcuts.html`: platform formatting, shortcut metadata and matching, handler guards and keycap composition.
- `command-focus.html`: controlled command dialog focus and caret restoration and consumer autofocus overrides.
- Existing `card-radius.html`: actual nested inset, wrappers, explicit overrides, resize and transform stability.

These are source and Chromium checks, not a certification of every possible consumer composition, browser, screen reader or font. Native Safari and real macOS keyboard behavior remain separate device checks; Apple modifier selection is exercised through simulated platform inputs. Custom per-component radius overrides intentionally supersede the defaults.

## Reference principles

- [Material shape roles](https://github.com/material-components/material-components-android/blob/master/docs/theming/Shape.md): ordered shape roles allow customization while maintaining relative hierarchy.
- [W3C tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): tabs represent panels and carry keyboard/focus conventions; radio choices use their own semantics even when their appearance is shared.
- [MDN aria-keyshortcuts](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-keyshortcuts): shortcut metadata uses Control/Meta names and does not implement the shortcut by itself.
- [W3C target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): evaluate the complete target geometry and applicable exceptions, not a height token alone.

```