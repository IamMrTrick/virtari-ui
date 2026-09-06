---
name: virtari-react-button
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-button. Intent/appearance-separated action button with shared size roles, aligned slots, loading state and polymorphic composition."
---

# @virtari-packages/react-button

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-button`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Import Button from @virtari-packages/react-button and its /styles once. color chooses intent (primary/success/warning/danger/info/accent/contrast); variant chooses solid/outline/ghost/soft/link. Default is primary solid md.
- Use leftSection and rightSection for supporting icons or elements and children for the label. The component creates aligned content, label and section wrappers; avoid consumer vertical offsets that fight the shared geometry.
- Use iconOnly plus aria-label for opaque custom icon components when auto-detection is insufficient. An icon-only shape is not an accessible name; name every icon action.
- Set type='button' for non-submit actions inside forms and type='submit' for the actual submit action. Button forwards native attributes and does not supply a default type.
- loading disables interaction, adds a spinner, sets busy state and emits a polite loading status. Supply loadingText in the application language. Preserve the visible label to retain stable button geometry.
- Use asChild with one element such as an anchor for navigation while retaining button appearance. Disabled/loading slotted children get aria-disabled, blocked click capture, and are removed from tab order; a slotted native button also receives disabled.
- Size is 2xs/xs/sm/md/lg/xl/2xl/3xl. Choose touch-appropriate control sizes deliberately; do not infer all platform target-size compliance solely from a token name. effect and animation require additional /styles/effects and /styles/animations imports.

## Known limits and mistakes to avoid

- variant='destructive' is a deprecated compatibility alias for solid plus danger; use color='danger' and an explicit variant in new code.
- Do not put a button inside a Button or use asChild with multiple siblings; use a single semantic root.
- A loading Button renders a sibling screen-reader status node. Account for that when using a parent layout that assumes every direct child is a visual control.

Related package IDs: `react-button-group`, `react-icons`, `react-form`, `react-tooltip`. Discover their focused skills from the catalog; do not load all packages at once.
