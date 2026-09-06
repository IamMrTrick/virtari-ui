---
name: virtari-react-bottom-nav
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-bottom-nav. Mobile navigation landmark with route-aware items, notification badges, optional FAB and safe-area positioning."
---

# @virtari-packages/react-bottom-nav

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-bottom-nav`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose BottomNav with BottomNavItem and optionally BottomNavFab; items require an icon and should have a visible label or an explicit accessible name.
- Use currentPath and matchStrategy on BottomNav for route matching, or active on an individual item. href renders an anchor; otherwise the item renders a type=button control and needs an action handler.
- The defaults are variant=material, size=md, position=fixed and safeArea=true. Reserve content space for the fixed bar; safe-area padding inside the bar does not reserve space in the page layout.
- Use notch with an actual central BottomNavFab. The moving shared indicator only applies to material and underline variants; floating always receives elevation.
- autoHide observes window scrolling. A controlled hidden value overrides autoHide; use that contract when the application's scrolling owner is an inner viewport.

## Known limits and mistakes to avoid

- The current BottomNavItem asChild implementation slots its own internal span, not a consumer router-link element. Use the supported href/button branches until router-child composition is implemented and verified.
- An active button has data-active but receives no automatic aria-current; choose navigation links for destinations and provide the appropriate state semantics for actual actions.
- Do not add role=tablist merely because the component is visually called bottom tabs: it renders navigation destinations, not associated tabpanels.
- autoHide is window-specific and checks reduced-motion at effect setup; do not claim inner ScrollArea scrolling or live preference changes are observed.

Related package IDs: `react-nav`, `react-header`, `react-icons`, `react-badge`. Discover their focused skills from the catalog; do not load all packages at once.
