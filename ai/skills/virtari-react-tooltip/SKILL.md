---
name: virtari-react-tooltip
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-tooltip. Provider-scoped supplemental labels with portaled placement, color variants and an optional arrow."
---

# @virtari-packages/react-tooltip

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-tooltip`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Wrap the relevant subtree in TooltipProvider, then compose Tooltip > TooltipTrigger asChild + TooltipContent. The provider defaults delayDuration to 300 and skipDelayDuration to 200 milliseconds.
- TooltipContent already portals, defaults sideOffset to 6 and collisionPadding to 8, and accepts size sm/md/lg plus variant default/inverted/info/success/warning/danger.
- Set arrow={true} for the built-in arrow; TooltipArrow is also exported for deliberate manual composition. Do not render both arrow mechanisms simultaneously.
- Pass provider dir when an explicit direction is needed; otherwise document direction is forwarded through DirectionProvider. Keep trigger accessible naming independent of whether the tooltip is currently visible.

## Known limits and mistakes to avoid

- Do not put essential instructions, actions or form fields only in a tooltip. It is supplemental content and has no interactive dialog structure.
- TooltipTrigger asChild needs one focusable trigger. A natively disabled button cannot receive keyboard focus; retain a separately accessible explanation when disabled-state information is needed.
- No TooltipPortal wrapper is exported; TooltipContent owns that concern.

Related package IDs: `react-popover`, `react-button`, `react-kbd`. Discover their focused skills from the catalog; do not load all packages at once.
