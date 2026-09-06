---
name: virtari-react-progress
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-progress. Show determinate or indeterminate progress with tokenized tracks, optional percentages and restrained animation."
---

# @virtari-packages/react-progress

Use the existing package and its composition API. Verify the installed version against this snapshot (1.0.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-progress`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- For determinate progress pass a finite percentage value in 0–100 with the default maximum and a meaningful aria-label or aria-labelledby. Omit value or pass null for the primitive indeterminate state.
- Use color primary/success/warning/danger/info/accent/contrast or a CSS color string. Unlike Icon, custom color strings are applied as --progress-fill-color.
- Choose solid/striped/gradient appearance and xs/sm/md/lg/xl thickness. animated=true selects pulse; explicit pulse or glow select the animation. The striped variant animates independently of the animated prop.
- showLabel displays a rounded percentage only when a value exists, and CSS hides that label at xs/sm/md sizes. Use external text when the value must remain visible at compact sizes.

## Known limits and mistakes to avoid

- The inherited primitive max prop currently does not normalize the visual width or label: the wrapper writes value directly as a percentage. Normalize external ranges to 0–100 before passing value and leave max at its default.
- animated=false is not a global motion-off switch: striped and indeterminate styles still animate. The package CSS has no local reduced-motion override; do not claim it independently enforces reduced-motion preferences.

Related package IDs: `react-spinner`, `react-text`, `tokens`. Discover their focused skills from the catalog; do not load all packages at once.
