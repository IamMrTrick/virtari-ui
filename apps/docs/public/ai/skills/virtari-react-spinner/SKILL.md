---
name: virtari-react-spinner
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-spinner. Display accessible indeterminate activity with six visual variants, token sizes and localized status text."
---

# @virtari-packages/react-spinner

Use the existing package and its composition API. Verify the installed version against this snapshot (0.3.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-spinner`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Use variant ring/segments/dots/bars/ripple/orbit and size xs/sm/md/lg/xl. Defaults are ring, md and primary.
- Use color primary/success/warning/danger/info/accent/neutral/current. current inherits surrounding color, useful inside a correctly labeled button.
- The wrapper is a span with role=status and aria-label from label, defaulting to Loading. Localize label and avoid multiple competing live status regions for one operation.
- Use speed slow/normal/fast when a specific rhythm is needed. The component includes a prefers-reduced-motion rule; retain it when customizing animation.

## Known limits and mistakes to avoid

- Spinner communicates indeterminate activity, not a percentage. Use Progress for measurable completion.
- Rendering Spinner does not disable its surrounding button or set aria-busy on a form; the consuming control owns those states.

Related package IDs: `react-button`, `react-progress`, `react-visually-hidden`. Discover their focused skills from the catalog; do not load all packages at once.
