---
name: virtari-react-separator
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-separator. Separate adjacent regions with decorative or semantic horizontal and vertical rules and optional horizontal labels."
---

# @virtari-packages/react-separator

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-separator`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Separator defaults to horizontal and decorative=true. Set decorative=false when a structural separator should be exposed to assistive technology.
- Use orientation=vertical in a container with an established height. label is rendered only for horizontal separators.
- A labeled horizontal separator renders a wrapper div with two decorative line spans and the label between them; keep the label short and meaningful.

## Known limits and mistakes to avoid

- The labeled horizontal branch currently does not spread remaining HTML props onto its wrapper, so id, style, event handlers and extra ARIA attributes passed there are not forwarded. Use an outer wrapper if those attributes are required.
- A label does not turn the separator into a button, heading or navigation control.

Related package IDs: `react-layout`, `react-text`. Discover their focused skills from the catalog; do not load all packages at once.
