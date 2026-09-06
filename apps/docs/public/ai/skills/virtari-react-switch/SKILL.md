---
name: virtari-react-switch
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-switch. Binary switch with primitive form semantics and optional drag interaction."
---

# @virtari-packages/react-switch

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-switch`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use checked/onCheckedChange or defaultChecked for boolean state. Name the switch with Label/htmlFor or aria-label and keep its label stable while state changes.
- Use size sm/md/lg. dragEnabled defaults to true; set it false when only standard click/keyboard toggling is desired. Primitive name/value/required/disabled props remain available.
- Use Switch for a binary setting whose effect is clear; communicate pending/save/error state in the surrounding UI when a server mutation is required.

## Known limits and mistakes to avoid

- The callback receives a boolean, not a native input event. Do not apply Toggle's pressed/onPressedChange API.
- Avoid overriding drag pointer handlers without deliberate composition. Do not assume a visual switch label is rendered by this component.

Related package IDs: `react-label`, `react-form`, `react-checkbox`, `react-toggle`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
