---
name: virtari-core
description: "Use when building, reviewing, or troubleshooting @virtari-packages/core. Global CSS reset, cascade ordering, base typography, focus, native scrolling and visually hidden helpers."
---

# @virtari-packages/core

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.5); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `core`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Import '@virtari-packages/core' before token CSS to establish layer order first; the only public export is the root stylesheet.
- Core declares reset, tokens, base, components, design-system and utilities layer order.
- Preserve focus visibility, forced-colors support and native input semantics when adding application overrides.

## Known limits and mistakes to avoid

- Generic README examples for named JS imports and /styles do not match current package exports.
- The tokens dependency does not automatically load token CSS.
- Core does not include the full generated vds-u-* utility catalog.

Related package IDs: `tokens`, `utilities`, `react-scroll-area`, `react-visually-hidden`. Discover their focused skills from the catalog; do not load all packages at once.
