---
name: virtari-react-sidebar
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-sidebar. Application sidebar shell with independent header/body/footer regions, logical placement and controlled or internal collapse state."
---

# @virtari-packages/react-sidebar

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-sidebar`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose SidebarHeader, SidebarBody and SidebarFooter inside Sidebar; place the actual Nav component in the body. Use useSidebar inside the provider to pass its collapsed state to Nav.
- side=start/end is logical and follows RTL. full-height uses the viewport height; below-header should receive stickyOffset matching the external header. Use blockSize for embedded panels.
- Use size or inlineSize for expanded width, railSize for collapsed width, background=none/surface/subtle/muted and bordered for the component's surface controls.
- Use collapsed/onCollapsedChange together for controlled state, or defaultCollapsed for initial internal state. collapsible=false disables the trigger and makes state-setting helpers inert.
- SidebarTrigger reads its owning Sidebar context and is disabled outside it. Use a separate controlled button for external toggles. useSidebar throws outside context; useSidebarOptional returns null. Wire an explicit sidebar id and aria-controls when the trigger should identify its controlled region.
- The default shortcut is Ctrl/Cmd+B using the physical KeyB code and is suppressed for text-editable targets. Turn shortcut off or assign distinct shortcutKey values when multiple sidebars are mounted.

## Known limits and mistakes to avoid

- Collapsing Sidebar changes the shell; it does not automatically synchronize a nested Nav's collapsed prop.
- SidebarBody already has overflow-y:auto. When composing a custom ScrollArea, deliberately assign one scrolling owner and constrain its available height to avoid nested scrollbars.
- The shell is an aside by default. If changed to nav, provide a landmark label and avoid redundant nested unlabeled navigation landmarks.
- The global shortcut accepts Ctrl or Meta rather than consulting the shared platform detector; do not describe this as per-platform exclusive key matching.

Related package IDs: `react-nav`, `react-header`, `react-scroll-area`, `react-layout`, `react-kbd`. Discover their focused skills from the catalog; do not load all packages at once.
