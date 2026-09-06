---
name: virtari-react-card
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-card. Compose themed surfaces with separate header, content and footer spacing and geometry-aware nested card radii."
---

# @virtari-packages/react-card

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-card`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose CardHeader, CardTitle, CardDescription, CardContent and CardFooter. The root is the surface shell; use section slots for padding rather than adding duplicate root padding.
- Choose surface/outline/soft/ghost variants and sm/md/lg sizes. Defaults are surface and md. Surface styling and geometry follow shared tokens and the active surface/radius theme.
- Use Card for nested cards. It measures the nearest ancestor .vds-card and the actual inset, observes relevant geometry/theme changes, and computes a child radius capped by its parent with a small-radius floor.
- CardTitle is h3. Keep semantic heading order correct in the surrounding page. Use links or buttons within the card for actions.

## Known limits and mistakes to avoid

- interactive changes presentation only; Card remains a div without automatic keyboard activation, navigation, role or tab stop.
- Do not manually set --card-parent-radius or --card-nested-radius; these are maintained by the nested-card hook. The hook tracks Card ancestors, not every arbitrary rounded container.

Related package IDs: `react-layout`, `react-text`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
