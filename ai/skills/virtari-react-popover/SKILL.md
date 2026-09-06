---
name: virtari-react-popover
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-popover. Anchored interactive surface with primitive focus/dismissal behavior and bounded content width."
---

# @virtari-packages/react-popover

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-popover`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Popover > PopoverTrigger asChild + PopoverContent; PopoverClose and PopoverAnchor are also exported. Content already supplies the portal.
- Content size sets a maximum width, not a fixed width: sm 16rem, md 20rem, lg 24rem, xl 32rem. Defaults are size md, sideOffset 4 and align center.
- Root accepts primitive controlled or uncontrolled open state and modal behavior; dir explicitly overrides the document direction passed into the primitive DirectionProvider.
- Use primitive content positioning and interaction callbacks for placement/focus control. Name the trigger and ensure interactive content has a clear dismissal path.

## Known limits and mistakes to avoid

- Popover has no exported PopoverPortal or PopoverArrow wrapper. Do not generate unavailable imports by analogy with another library.
- Do not use Tooltip for content containing actions or form fields; Popover is the interactive surface available here.
- Portal content can leave a locally themed DOM ancestor; verify its theme in the actual portal location instead of assuming all local CSS variables travel with React context.

Related package IDs: `react-tooltip`, `react-dialog`, `react-button`, `react-form`. Discover their focused skills from the catalog; do not load all packages at once.
