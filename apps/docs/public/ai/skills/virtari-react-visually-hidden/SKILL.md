---
name: virtari-react-visually-hidden
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-visually-hidden. Keep short accessible text in the accessibility tree while visually hiding it with the shared core utility."
---

# @virtari-packages/react-visually-hidden

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-visually-hidden`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use VisuallyHidden around supplementary labels for icon controls or equivalent text for a visual indicator. It renders a span with class vds-visually-hidden.
- Load the shared core stylesheet: the hiding rule lives in packages/core/src/utilities.css. This React package has no standalone styles export.
- Use asChild with a single compatible child when a different semantic element is needed, and ensure the content remains appropriate for screen-reader reading order.

## Known limits and mistakes to avoid

- Do not add aria-hidden or display:none to text that is intended to provide the accessible name; those remove it from assistive technology.
- This is not a focus-revealing skip-link primitive. Do not hide ordinary keyboard-focusable controls with it without implementing an appropriate visible focus treatment.

Related package IDs: `core`, `react-icons`, `react-button`, `react-kbd`. Discover their focused skills from the catalog; do not load all packages at once.
