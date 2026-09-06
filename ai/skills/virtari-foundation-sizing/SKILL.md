---
name: virtari-foundation-sizing
description: "Use when implementing or reviewing Virtari Control and floating-surface sizing. Separate control height, overlay width and spacing scales."
---

# Control and floating-surface sizing

Separate control height, overlay width and spacing scales.

- The shared control-height scale --vds-size-{2xs,xs,sm,md,lg,xl,2xl,3xl} is 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3.25 and 4rem. At a 16px root these are 24, 28, 32, 36, 40, 44, 52 and 64px.
- Use --vds-surface-width-{xs,sm,md,lg,xl,2xl} for floating panels: 20, 24, 32, 48, 64 and 80rem. Bound the panel to the available viewport.
- Content containers have their own --vds-container-width-* scale, including prose=65ch. A matching t-shirt name does not imply the same value as a floating surface.
- Use shared size roles to align a row of controls; verify multiline content and text enlargement rather than hiding overflow to enforce a height.

## Pitfalls

- Do not use --vds-space-96 as a dialog-width role merely because it currently equals 24rem. Spacing and dimension intent must remain independent.
- Not every component implements every global size. Verify the individual prop union before using 2xs or 3xl.
- A CSS height alone does not establish touch-target compliance; the target's width, actual hit area, spacing, zoom and surrounding targets also matter.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `sizing`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
