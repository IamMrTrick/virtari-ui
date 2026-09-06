---
name: virtari-tokens
description: "Use when building, reviewing, or troubleshooting @virtari-packages/tokens. CSS design tokens with theme, surface, radius, spacing, layout, typography and motion roles."
---

# @virtari-packages/tokens

Use the existing package and its composition API. Verify the installed version against this snapshot (0.6.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `tokens`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Load '@virtari-packages/tokens' once, or use only package.json-listed granular exports with their dependencies.
- Retrieve exact token names, values and scopes from source-derived inventories; use semantic/component roles for application intent.
- Validate theme/style/tone/radius combinations on the actual composed host.

## Known limits and mistakes to avoid

- CSS package: no React named exports and no /styles entry.
- Root import loads external Google Fonts CSS.
- Some alias families resolve only at their declaration scope; do not assume every low-level descendant override propagates transitively.

Related package IDs: `core`, `utilities`, `react-layout`, `react-text`. Discover their focused skills from the catalog; do not load all packages at once.
