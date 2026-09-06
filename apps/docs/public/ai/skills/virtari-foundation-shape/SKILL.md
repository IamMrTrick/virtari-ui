---
name: virtari-foundation-shape
description: "Use when implementing or reviewing Virtari Radius roles and concentric nesting. Stable component families with deliberate differences and bounded nested geometry."
---

# Radius roles and concentric nesting

Stable component families with deliberate differences and bounded nested geometry.

- Use data-radius='sharp', 'soft', 'round' or 'pill'; soft is the default. Component-specific --vds-radius-* roles are the integration contract, not arbitrary border-radius literals.
- Soft semantic xs/sm/md/lg/xl/2xl resolves to 4/8/12/20/28/32px at a 16px root. Inputs and segmented tracks use control geometry; cards and modal sheets use different surface roles.
- Pill deliberately rounds action-like roles and segmented tracks fully while keeping text fields and many compact controls finite. Badge/chip and pill selections stay capsule-shaped across modes.
- A radius host declares data-radius-host and all three --vds-radius-host-r, -b and -p inputs. Direct children can consume --vds-radius-flush=max(0, radius-border) or --vds-radius-inset=max(0, radius-border-padding).
- The generic inset/flush outputs are registered non-inheriting leaf geometry; a nested host must use an independent radius input. Card-to-Card nesting uses its own measured channel.

## Required usage

Use only names present in the source reference or MCP inventory. Do not invent CSS variables, utility classes, token values, arbitrary values, or Tailwind syntax. If the existing inventory cannot express a reusable design need, treat it as an upstream Virtari design-system change and update the authoritative token or utility source before application code consumes it.

## Pitfalls

- Consistency means shared rules, not an identical radius for a keycap, checkbox, card and modal.
- Do not derive a host's own host-r from that same element's inherited inset output: this can form a custom-property cycle.
- Reset all host inputs, including zero values, when creating nested hosts; otherwise outer border or padding values can leak into the subtraction.
- Explicit component variants can intentionally override a default radius. Inspect the variant before treating every differing computed radius as a bug.

Read [source reference](references/source.md) for exact definitions. Query MCP `list_records` in `tokens` or `utilities` for filtered, paginated inventory; use `get_record` for this section ID `shape`. Values are source expressions: theme, inherited scope and CSS cascade determine the final computed value.
