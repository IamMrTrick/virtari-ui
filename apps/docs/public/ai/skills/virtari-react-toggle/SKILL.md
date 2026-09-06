---
name: virtari-react-toggle
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-toggle. A persistent pressed-state action button."
---

# @virtari-packages/react-toggle

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-toggle`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use pressed/defaultPressed/onPressedChange for state and supply a stable visible or accessible name. This is a pressed button, not a checkbox input.
- Use variant=default or outline and the shared size ramp 2xs through 2xl (md default). Preserve the shared spacing/radius classes instead of adding per-instance geometry.
- Use Toggle for a formatting or mode action such as bold. Use RadioGroup for exclusive form values and Switch for binary settings; a group of independent Toggle controls requires explicit group labeling and application-owned state.

## Known limits and mistakes to avoid

- Do not expect checked/onCheckedChange or automatic native form serialization of pressed state. Add explicit state serialization if the product requires it.
- Do not use appearance=soft or button variants on Toggle; its exported variant union is only default/outline.

Related package IDs: `react-button`, `react-radio-group`, `react-switch`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
