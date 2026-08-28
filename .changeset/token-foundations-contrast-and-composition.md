---
"@virtari-packages/tokens": minor
"@virtari-packages/core": patch
---

Fix the token foundations: undefined names, dark-mode contrast, and the missing interior-spacing and radius-composition tiers.

**Contrast (behavioural — colours change)**

- `--vds-color-on-warning` was `neutral-12`, which is dark ink in light mode and near-white in dark. Every warning solid rendered white-on-amber at 2.19:1 as soon as the theme flipped. It now points at `--vds-color-black`, which is mode-independent like amber itself: 7.78:1 in both modes.
- Dark-mode `{primary,success,info,danger,accent}-9` carried white text at 3.27–4.01:1. Lightness lowered to the highest value on the scale's grid that still clears 4.5:1, with hue and chroma held exactly: primary `0.610→0.575`, success `0.610→0.545`, danger `0.620→0.585`, info `0.620→0.555`, accent `0.665→0.580`. `warning-9` is unchanged — it carries black ink.
- `--vds-color-text-placeholder` moves from `neutral-9` (4.11:1 light / 3.57:1 dark) to `neutral-11` (7.77:1 / 7.60:1).
- The dark intent ramp now also applies under `[data-theme="dark-oled"]`. It always should have: the OLED block overrides step 1 only, which is only coherent if steps 2–12 come from the dark ladder. Previously an OLED page got the light-mode intent ramp on a pure-black canvas.
- `color-scheme` on bare `:root` narrows from `light dark` to `light`. Nothing in the system implements `prefers-color-scheme`, so the wider value made the browser darken the surfaces it owns — scrollbars, form controls, autofill, `<select>` popups — while every token stayed light. `[data-theme="dark"]` still declares `dark`.

**New tokens**

- `colors/aliases.css` defines the ~40 names components were already typing but that resolved to nothing, so those `var()` lookups stopped falling through to hardcoded hex: bare intent names (`--vds-color-primary`), the `*-emphasis` / `*-on-emphasis` / `*-muted` / `*-muted-text` / `*-subtle` families, `--vds-color-neutral-solid` / `-bg`, the `overlay*` spelling of `scrim*`, and the `sky-11` / `emerald-11` / `violet-11` syntax-highlight hues used by `react-editor`.
- `--vds-color-border-interactive` (`neutral-9`) — the first neutral step that clears WCAG 1.4.11's 3:1 for the boundary of an operable control. `--vds-color-border` is a divider weight (1.73:1) and was being used for both.
- `--vds-opacity-disabled` — one disabled opacity, replacing eight ad-hoc values.
- `--vds-focus-ring-width` / `--vds-focus-ring-offset` — replacing ~20 per-component duplicates.
- `spacing/semantic.css` — the interior-spacing tier: `--vds-surface-padding-inline/-block`, `--vds-slot-gap`, `--vds-stack-gap`, `--vds-cluster-gap`, `--vds-label-gap`, `--vds-control-padding-inline` and `-emphasis`. Strictly ordered, so nested groupings stay legible.
- `--vds-surface-width-{xs,sm,md,lg,xl,2xl}` in `sizing.css` — overlay widths. Dialogs had been sized with `--vds-space-*`, which couples every overlay's width to the spacing ramp.

**Radius**

- `--vds-radius-0` was unitless `0`, which is a `<number>`, not a `<length>` — so any `calc()` subtracting a length from it was invalid and dropped the whole declaration. Now `0px`.
- New `radii/nesting.css` adds the concentricity channel: a container opts in with `data-radius-host` and publishes `--vds-radius-host-r/-b/-p`; its direct children read `--vds-radius-inset` or `--vds-radius-flush`. Registered with `inherits: false` so it reaches exactly one level. Infrastructure — no component is migrated onto it yet.

**core**

- `*::-webkit-scrollbar-thumb` hardcoded `border-radius: 999px`, bypassing `--vds-radius-scrollbar-thumb`, which exists specifically to stop an 8px-thick thumb from rendering as a capsule. It now uses the token.
- The `:focus-visible` ring reads `--vds-focus-ring-width` / `-offset` instead of `2px` literals.
