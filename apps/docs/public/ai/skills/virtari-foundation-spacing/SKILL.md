---
name: virtari-foundation-spacing
description: "Use when implementing or reviewing Virtari Spacing and grouping hierarchy. Primitive distances plus semantic interior and page-layout relationships."
---

# Spacing and grouping hierarchy

Primitive distances plus semantic interior and page-layout relationships.

- Use the 35-key --vds-space-* primitive scale for supported one-off geometry. Keys 0-5, 1-5, 2-5 and 3-5 denote half steps, not negative values.
- Prefer semantic interior roles: surface padding=space-6, slot gap=space-4, stack gap=space-3, cluster gap=space-2 and label gap=space-1-5. At a 16px root the default hierarchy is 24 > 16 > 12 > 8 > 6px.
- Control inline padding and control-emphasis padding have different roles: 12px and 16px defaults. Height comes from sizing, not these padding roles.
- Page-region rhythm belongs to --vds-section-*, --vds-row-* and --vds-container-* roles. Interior grouping is not a substitute for page layout.
- Use logical padding/margin/gaps so a layout survives RTL. Scope compact spacing overrides to a deliberate density context and preserve grouping distinctions.

## Required usage

Use only names present in the source reference or MCP inventory. Do not invent CSS variables, utility classes, token values, arbitrary values, or Tailwind syntax. If the existing inventory cannot express a reusable design need, treat it as an upstream Virtari design-system change and update the authoritative token or utility source before application code consumes it.

## Pitfalls

- Giving every relationship the same gap obscures which heading, hint or action belongs to which group.
- A CSS alias resolves where it is declared. Do not assume changing only a low-level primitive on an arbitrary descendant recomputes all inherited aliases; override the intended semantic/component role and inspect the computed result.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `spacing`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
