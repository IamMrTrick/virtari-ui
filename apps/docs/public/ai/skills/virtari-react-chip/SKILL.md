---
name: virtari-react-chip
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-chip. Compose compact labels, identity chips and removable selections using explicit icon, label and remove slots."
---

# @virtari-packages/react-chip

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-chip`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose ChipIcon, ChipLabel and optional ChipRemove within Chip. Use the slots to preserve tokenized spacing, centered alignment and circular icon/remove geometry.
- Chip variant is intent (default, primary, success, warning, danger, info); appearance is soft/solid/outline. Sizes are sm/md/lg; defaults are default, soft and md.
- Implement removal state in ChipRemove onClick and localize its aria-label, whose default is Remove. Chip does not manage selection or dismissal state.
- Use asChild with one suitable semantic child for whole-chip interactions. Keep removal and whole-chip actions as valid separate interactive controls.

## Known limits and mistakes to avoid

- interactive only sets a data attribute. disabled sets aria-disabled but does not suppress handlers or automatically disable ChipRemove; implement the actual behavior for your semantic control.
- Chip and Badge use different prop vocabulary: Chip variant is intent, while Badge color is intent. Do not copy Badge variant names into Chip.

Related package IDs: `react-badge`, `react-avatar`, `react-toggle`, `react-tag-input`. Discover their focused skills from the catalog; do not load all packages at once.
