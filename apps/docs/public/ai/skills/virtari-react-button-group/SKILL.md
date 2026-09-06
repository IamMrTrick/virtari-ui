---
name: virtari-react-button-group
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-button-group. Shared-context row or column of buttons with optional attached corners and equal-width layout."
---

# @virtari-packages/react-button-group

Use the existing package and its composition API. Verify the installed version against this snapshot (4.0.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-button-group`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose ButtonGroup with Button children and import both react-button/styles and react-button-group/styles. The group is layout-only; buttons retain their own visual tokens and interaction semantics.
- Group color, variant, size and disabled values provide defaults to descendant Buttons. A child's explicit prop wins, including disabled={false}; group disabled is inheritance rather than a non-overridable fieldset lock.
- orientation is horizontal by default or vertical. attached removes the gap, collapses inner corner radii and joins borders; fullWidth stretches children to equal flex shares.
- The wrapper renders role='group'. Supply aria-label or aria-labelledby when users need a group name, and use ordinary Button labels for each action.
- Use SegmentedControl or Tabs for a single selected value/panel relationship. ButtonGroup has no selected value, roving focus or tab semantics.

## Known limits and mistakes to avoid

- Do not model attached actions as tabs just because their corners visually join.
- Do not assume disabled on the group creates native disabled containment; individual child overrides remain possible.
- Avoid manual corner values on inner buttons; attached geometry relies on the shared group and button radius roles.

Related package IDs: `react-button`, `react-segmented-control`, `react-tabs`. Discover their focused skills from the catalog; do not load all packages at once.
