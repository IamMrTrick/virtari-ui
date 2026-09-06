---
name: virtari-react-data-table
description: "Use when building, reviewing, or troubleshooting @virtari-packages/react-data-table. Composable TanStack table with controlled state, server requests, virtualization, editing, filters, alternate views and optional drag-and-drop."
---

# @virtari-packages/react-data-table

Use the existing package and its composition API. Verify the installed version against this snapshot (0.6.0); do not invent exports or Tailwind classes.

## Workflow

1. Read [API and entry points](references/api.md) for exact public names, CSS imports and source types.
2. Apply the package guidance below; use [examples](references/examples.md) for existing compositions. Examples may require their page helpers and docs scaffolding.
3. Read [design rules](references/design.md) before changing shape, spacing, surfaces, or interaction.
4. For complete repository context, use MCP `get_record` with collection `packages`, id `react-data-table`, then `read_source` for the returned source IDs. Without MCP, use the source paths in the checked-out repository.
5. Check keyboard, focus, accessible naming, disabled/error states, RTL and theme behavior applicable to the change. Preserve native form behavior and consumer event handlers.

## Integration rules

- DataTable is a namespace, not a renderable root component: use DataTable.Root, ScrollArea, Table, Header and Body, or their individually exported equivalents. Root accepts either columns plus data, or an external TanStack table instance; these branches are mutually exclusive.
- Keep columns and data references stable when they have not changed. Import ColumnDef, createColumnHelper and flexRender from the package. Customize the actual column definitions and cell renderers instead of rebuilding table infrastructure around untyped rows.
- Each managed state has controlled, default and onChange forms, including sorting, filters, selection, sizing, visibility, pagination and grouping. In the external-table branch configure those states on the external table; root state props do not rebuild that table.
- For mode='server', supply the current page data and total rowCount and handle onDataRequest. Root emits request state after a 150 ms debounce; fetching, stale-response cancellation and errors remain application responsibilities. The simple hook turns off client sorting, filtering, pagination and grouping in this mode; an external table must be configured accordingly.
- Use DataTable.ScrollArea for its shared scroll ref, sticky bands and virtualizer. virtualization={{estimateRowSize, overscan}} uses the current row model, so it does not automatically disable client pagination. Give the scroll area a bounded viewport.
- onCellEdit receives a TanStack Row, column ID and next value, and may return a promise. Update the application's data or backend explicitly; use row.original to access the domain record. The editing helper tracks pending state but does not mutate source data.
- Import /styles for styles and embedded tokens. Import drag-and-drop helpers and DataTableCustomizeDrawer from /dnd and install its optional @dnd-kit peers only when needed. DataTablePagination is an adapter to react-pagination; use the standalone pagination package for granular controls.
- useDataTablePreferences exposes statePairs for composition with Root, with controlled value/onValueChange, an adapter or a localStorage storageKey. Use a key scoped to the actual user and table; this is UI preference storage, not data persistence.

## Known limits and mistakes to avoid

- The simple useDataTable options do not expose getRowId or getSubRows. For stable identity across server pages, reordering, or hierarchical data, build an external TanStack table with those options and pass table to Root. Default index IDs are not persistent domain IDs.
- When virtualization is enabled, DataTable.Body ignores its render-prop children and renders the internal virtual body. Grid keyboard navigation only sees mounted rows, so virtualized navigation needs explicit verification.
- The current grid navigation listener does not skip interactive descendants, check defaultPrevented or mirror horizontal arrows for RTL. Embedded input editing and RTL grid mode are known limitations; use ordinary table interaction unless these behaviors are addressed and tested.
- Column pinning follows physical left/right TanStack offsets. Do not assume these offsets behave like the logical start/end API of react-table.
- DataTableRoot's accepted props are explicitly enumerated rather than generic div attributes. Put table labels and table ARIA attributes on DataTable.Table, and toolbar labels on Toolbar; do not assume arbitrary Root attributes are forwarded.
- A rejected asynchronous cell edit exits through the rejection before closing the editor. Provide error handling and user feedback in the application's mutation flow; no built-in error message is promised.

Related package IDs: `react-table`, `react-pagination`, `react-checkbox`, `react-input`, `react-drawer`, `react-tabs`. Discover their focused skills from the catalog; do not load all packages at once.
