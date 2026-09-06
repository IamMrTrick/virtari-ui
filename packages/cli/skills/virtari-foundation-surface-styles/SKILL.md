---
name: virtari-foundation-surface-styles
description: "Use when implementing or reviewing Virtari Surface styles and field tones. One scoped appearance contract for quiet borders, tonal fills, shadows and stronger tinted fields."
---

# Surface styles and field tones

One scoped appearance contract for quiet borders, tonal fills, shadows and stronger tinted fields.

- Use data-surface-style='tonal', 'bordered' or 'elevated'. The default token intent is tonal. Components consume --vds-surface-*, --vds-overlay-*, --vds-navigation-bg and --vds-field-* roles.
- Bordered uses neutral-a4 decorative surface boundaries, neutral-a6 field boundaries and neutral-a8 field hover boundaries. Elevated uses shadow-sm surfaces, shadow-lg overlays and shadow-xs fields.
- Use data-field-tone='strong' on a field or group to select neutral-a4 alpha fill; use data-field-tone='default' to reset within that group. Strong deepens light surfaces and lifts dark surfaces while retaining host tint.
- Colors rebind at theme, style and tone boundaries. The internal numeric intent flags retain the chosen mode through nested theme scopes; use the public attributes rather than writing those flags.
- Stronger contrast and forced colors preferences replace quiet boundary roles without removing semantic errors, selection or focus indicators.

## Required usage

Use only names present in the source reference or MCP inventory. Do not invent CSS variables, utility classes, token values, arbitrary values, or Tailwind syntax. If the existing inventory cannot express a reusable design need, treat it as an upstream Virtari design-system change and update the authoritative token or utility source before application code consumes it.

## Pitfalls

- Bordered does not mean heavy borders. Quiet decorative borders are not a guaranteed 3:1 control boundary on every host.
- Style and tone are independent of radius mode. Do not encode a radius personality into a surface appearance name.
- Do not overwrite a component's validation or explicit outline behavior merely to force the global tonal mode.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `surface-styles`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
