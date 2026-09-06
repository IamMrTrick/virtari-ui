---
name: virtari-foundation-stacking-focus-scroll
description: "Use when implementing or reviewing Virtari Stacking, focus and native scrolling. Shared interaction infrastructure beyond component-specific visuals."
---

# Stacking, focus and native scrolling

Shared interaction infrastructure beyond component-specific visuals.

- Use semantic --vds-z-* roles. Overlay=1300 and modal=1400 sit below dropdown=1500 and popover=1600; toast=1700 and tooltip=1800 remain above these roles.
- Global focus-visible uses the shared ring color and 2px width/offset roles. A component may draw an equivalent shadow or inset indicator where its geometry requires it.
- Core styles native scrollbars and reveals desktop fine-pointer thumbs on hover/focus-within; the ScrollArea component owns its separate activity-driven smart hiding.
- Use the accessible hiding helpers for supplementary screen-reader content and keep keyboard-focusable content reachable.

## Required usage

Use only names present in the source reference or MCP inventory. Do not invent CSS variables, utility classes, token values, arbitrary values, or Tailwind syntax. If the existing inventory cannot express a reusable design need, treat it as an upstream Virtari design-system change and update the authoritative token or utility source before application code consumes it.

## Pitfalls

- A high z-index cannot escape its stacking context. Test overlays opened from inside modals, and use the component's portal contract.
- Never remove a focus outline without preserving a visible, unclipped replacement.
- Native scroll styling alone does not create an independently constrained scroll viewport or implement ScrollArea's activity state.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `stacking-focus-scroll`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
