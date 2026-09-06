---
name: virtari-react-empty-state
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-empty-state. Compose empty or no-results views with a decorative illustration, clear title, description and recovery actions."
---

# @virtari-packages/react-empty-state

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-empty-state`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose EmptyStateIcon, EmptyStateTitle, EmptyStateDescription and EmptyStateActions. Use real Button components for the actions and keep the explanation specific to the current state.
- Choose size sm/md/lg and orientation vertical/horizontal. Defaults are md and vertical.
- EmptyStateTitle renders h3, the description renders p, and the icon slot is aria-hidden. Put essential information in text and verify the surrounding heading hierarchy.
- The root is a plain div. If results change dynamically and need announcement, explicitly choose an appropriate status region in the consuming screen.

## Known limits and mistakes to avoid

- EmptyState does not fetch data, detect emptiness, expose a built-in status role or wire recovery actions.
- Avoid placing essential labels or interactive controls inside the aria-hidden icon slot.

Related package IDs: `react-button`, `react-icons`, `react-text`. Discover their focused skills from the catalog; do not load all packages at once.
