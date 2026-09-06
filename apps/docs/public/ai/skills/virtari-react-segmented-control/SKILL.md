---
name: virtari-react-segmented-control
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-segmented-control. Single-value segmented radio control sharing the Tabs segmented track and nested-radius styling."
---

# @virtari-packages/react-segmented-control

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-segmented-control`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use SegmentedControl with SegmentedControlItem value children for a single mutually exclusive setting or filter. It is a radiogroup, not a tablist, and does not manage tabpanels.
- Use value/onValueChange or defaultValue, and the inherited radio-group name, required and disabled props where form semantics are needed. Supply aria-label or aria-labelledby for the group.
- Set size=sm/md/lg, orientation=horizontal/vertical and fullWidth on the root. Use the item's icon prop for the dedicated decorative icon slot and an accessible text label.
- Direction resolves explicit dir, primitive DirectionProvider, then inherited DOM direction. Keep behavioral direction and surrounding layout direction aligned.
- Import this package's styles entry; it includes the shared Tabs styling. Preserve the generated track's data-radius-host and let the shared track/item radius roles derive nested corners.
- Full-width labels wrap within equal columns and controls grow from minimum heights. Non-full-width horizontal tracks can scroll within their parent; long labels do not require per-label positioning overrides.

## Known limits and mistakes to avoid

- The selected state is data-state=checked because items are radios, unlike Tabs' active state. Do not target only the Tabs active selector when customizing a shared appearance.
- Do not create a separate capsule radius for each item or assign the same outer radius everywhere; the track and inset item/indicator use coordinated geometry.
- This is single selection; use another control for independent multiple toggles. Use Tabs when the selection exposes an associated content panel.
- Size vocabulary is smaller than TabsList: 2xs, xs, xl, 2xl and 3xl are not SegmentedControl sizes.

Related package IDs: `react-tabs`, `react-radio-group`, `react-toggle`, `primitives`, `utils`. Discover their focused skills from the catalog; do not load all packages at once.
