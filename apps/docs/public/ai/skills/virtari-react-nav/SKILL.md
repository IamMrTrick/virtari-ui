---
name: virtari-react-nav
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-nav. Site-navigation disclosure system with semantic links, inline submenus, floating submenus and collapsed rail presentation."
---

# @virtari-packages/react-nav

Use the existing package and its composition API. Verify the installed version against this snapshot (1.1.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-nav`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose Nav > NavList > NavItem. Use declarative label/icon/href/submenu props for simple entries or compound NavLink/NavTrigger with NavIcon, NavLabel, NavBadge and NavChevron for custom content.
- NavItem's submenu content must use NavSubmenu and nested list/item composition. Its open/onOpenChange pair controls disclosure state; there is no defaultOpen prop on NavItem.
- The default orientation is vertical, with inline submenus. Horizontal orientation defaults to popover; collapsed forces popover for every submenu regardless of per-item submenuMode.
- Pass currentPath and exact or startsWith matching, or active explicitly. NavLink sets aria-current=page when active; it renders a real anchor and supports one router-link child through asChild.
- Keep the disclosure navigation semantics: nav, ul, links and aria-expanded buttons. Use application DropdownMenu for command menus rather than assigning menubar/menuitem roles to this site navigation.
- A successful NavLink click closes ancestor floating submenus unless the consumer prevents default. Inline submenus remain open. String labels automatically supply collapsed-mode accessible labels and native titles.

## Known limits and mistakes to avoid

- Any declarative NavItem content prop switches it out of compound mode; do not mix an intended custom children tree with label/icon/submenu props and expect both to render.
- NavTrigger rendered outside NavItem is only a styled button, with no disclosure state or aria-controls wiring.
- The floating vertical submenu default is physically right-start. For an RTL rail choose an appropriate placement explicitly instead of assuming that physical side mirrors automatically.
- NavKbd is a plain kbd slot and does not interpret mod+k. Supply a platform-aware shortcut label from utils or use KbdShortcut where suitable.
- In custom collapsed composition, preserve a readable accessible name yourself; the convenience naming only derives from string declarative labels.

Related package IDs: `react-sidebar`, `react-header`, `react-collapsible`, `react-dropdown-menu`, `react-kbd`, `utils`. Discover their focused skills from the catalog; do not load all packages at once.
