---
name: virtari-utilities
description: "Use when building, reviewing, or troubleshooting @virtari-packages/utilities. Finite generated vds-u-* CSS classes for layout, spacing, sizing, positioning, overflow and z-index."
---

# @virtari-packages/utilities

Use the existing package and its composition API. Verify the installed version against this snapshot (5.0.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `utilities`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Import '@virtari-packages/utilities' with token CSS; there is no separate /styles entry.
- Use exact catalog entries and breakpoint prefixes, such as vds-u-pi-4 and md:vds-u-grid-cols-3.
- The generator at packages/utilities/scripts/generate.mjs is the authoritative class source; rebuild rather than editing dist.

## Known limits and mistakes to avoid

- Do not invent Tailwind syntax, color utilities, arbitrary values or state variants.
- Logical mb/pb means both block edges, not physical bottom.
- Only the documented scale subsets are generated for gap and sizing.

Related package IDs: `tokens`, `core`, `react-layout`, `utils`. Discover their focused skills from the catalog; do not load all packages at once.
