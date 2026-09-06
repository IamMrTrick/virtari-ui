---
name: virtari-react-slider
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-slider. Primitive-backed numeric slider with automatic thumb rendering and direction support."
---

# @virtari-packages/react-slider

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-slider`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Pass explicit value/defaultValue number arrays: one element for a single thumb, two for a range. Use onValueChange for continuous updates and the primitive onValueCommit for work that should wait until interaction completes.
- Configure min/max/step/minStepsBetweenThumbs; defaults are min=0, max=100 and minStepsBetweenThumbs=1. The wrapper renders thumbs from the supplied array.
- Direction is inherited through useDirection and DirectionProvider, with explicit dir winning. Retain the primitive keyboard behavior and provide visible labels, current values and meaningful accessible naming.
- Use the primitive name for form participation. There is no package size prop or public custom-thumb composition in this wrapper; read the primitive contract before requiring per-thumb customization.

## Known limits and mistakes to avoid

- Do not pass a scalar numeric value. Omitting both value and defaultValue makes the wrapper render two thumbs, so always initialize the intended thumb count.
- A root label may be insufficient for distinguishable range endpoints. Verify accessible names for each thumb in the product before claiming complete range accessibility.

Related package IDs: `react-number-input`, `react-fieldset`, `react-form`, `utils`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
