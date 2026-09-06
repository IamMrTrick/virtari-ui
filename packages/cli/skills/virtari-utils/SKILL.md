---
name: virtari-utils
description: "Use when building, reviewing, or troubleshooting @virtari-packages/utils. JavaScript and React helpers for class joining, refs, native reset, direction and platform-aware shortcuts."
---

# @virtari-packages/utils

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `utils`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Import named helpers from '@virtari-packages/utils'; it has no stylesheet.
- Use the same mod-based shortcut string for binding, visual keys and spoken/ARIA labels.
- Keep native form cancellation and React ref cleanup contracts intact when composing controls.

## Known limits and mistakes to avoid

- cn accepts truthy strings, not object syntax or conflict-merging semantics.
- Direction updates are driven by dir attribute observation.
- Shortcut presentation does not itself register a key handler.

Related package IDs: `react-kbd`, `react-command`, `react-form`, `react-layout`, `utilities`. Discover their focused skills from the catalog; do not load all packages at once.
