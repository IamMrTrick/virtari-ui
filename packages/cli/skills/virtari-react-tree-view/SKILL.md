---
name: virtari-react-tree-view
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-tree-view. Hierarchical item display with controlled expansion and optional single/multiple selection; current keyboard behavior is limited."
---

# @virtari-packages/react-tree-view

Use the existing package and its composition API. Verify the installed version against this snapshot (0.4.0); do not invent exports, class names, CSS variables, or Tailwind utilities. In a source-owned application with `virtari.json`, import from its configured local target; package-name import guidance below applies only to package-consumer mode.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types. Before recreating this behavior, inspect `virtari.json` and the configured local target. If `virtari list` shows a matching registry item but it is absent locally, install that exact item with `virtari add <item>` and import the installed source.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction. Consume existing `--vds-*` semantic variables and exact `vds-u-*` utilities.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-tree-view`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- Compose TreeView with TreeViewItem id and label; nest child TreeViewItem elements directly inside a parent item. The item creates its own group wrapper when expanded.
- Use expandedIds/onExpandedChange and selectedIds/onSelectionChange for controlled arrays, or defaultExpandedIds/defaultSelectedIds for initial internal state.
- selectionMode defaults none. single toggles the selected item off when selected again; multiple toggles each item independently, without range selection.
- Give the root tree an accessible label, use stable unique item IDs, and keep decorative graphics in the icon slot. Use disabled to suppress row interaction.
- The current handlers support Enter/Space and physical ArrowRight/ArrowLeft for expansion. Clicking a parent can both select and expand; keyboard Enter/Space selects instead of expanding when a selection mode is enabled.

## Known limits and mistakes to avoid

- This implementation does not provide full tree keyboard navigation: no roving focus, Up/Down, Home/End, typeahead, parent/child focus traversal or RTL arrow inversion. Do not claim complete tree-pattern conformance or use it unreviewed for keyboard-critical file navigation.
- Each enabled inner row has tabIndex=0 while treeitem semantics are on its containing li. Focus and accessibility behavior need a dedicated upgrade before parity with a fully accessible desktop-style tree.
- Do not add TreeViewGroup inside a parent TreeViewItem expecting it to be the only group wrapper; the item already generates one and increments depth.
- Collapsed descendants unmount. Store durable child state outside the collapsed subtree when it must survive reopening.

Related package IDs: `react-nav`, `react-collapsible`, `react-scroll-area`, `react-checkbox`. Discover their focused skills from the catalog; do not load all packages at once.
