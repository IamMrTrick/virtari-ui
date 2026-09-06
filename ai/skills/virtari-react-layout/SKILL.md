---
name: virtari-react-layout
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-layout. Semantic page regions and composable Stack, Cluster, Grid, split Sidebar and Center arrangements."
---

# @virtari-packages/react-layout

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.1); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-layout`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Import components from '@virtari-packages/react-layout' and CSS from '@virtari-packages/react-layout/styles'.
- Choose Main/Section/Container for page structure and Stack/Cluster/Grid or Row/Col for internal arrangements.
- Use the actual responsive span and semantic gap props; scope layout token overrides for deliberate page requirements.

## Known limits and mistakes to avoid

- The layout Sidebar is a two-child split, not react-sidebar app navigation.
- Avoid duplicate visible Main landmarks.
- Recursive Stack margins and visual ordering can conflict with child component geometry or reading order.

Related package IDs: `tokens`, `utilities`, `utils`, `react-sidebar`, `react-header`. Discover their focused skills from the catalog; do not load all packages at once.
