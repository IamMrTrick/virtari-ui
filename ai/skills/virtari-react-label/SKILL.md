---
name: virtari-react-label
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-label. Styled label primitive for direct control association."
---

# @virtari-packages/react-label

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-label`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use Label with htmlFor matching the actual control id, or use the labeled Field/Form adapters for complete metadata wiring.
- Label forwards primitive label props and ref. It supplies the shared label class, not its own sizing, error-message or required-state API.

## Known limits and mistakes to avoid

- Do not invent size, variant or required props to request field features. Use Field or FormLabel in their intended composition.
- A label around a layout group is not a substitute for a fieldset legend or individual labels.

Related package IDs: `react-fieldset`, `react-form`, `react-input`, `react-checkbox`. Discover their focused skills from the catalog; do not load all packages at once.
