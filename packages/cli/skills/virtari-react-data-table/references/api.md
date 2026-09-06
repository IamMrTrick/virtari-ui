# @virtari-packages/react-data-table API snapshot

Version: 0.6.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./dnd": {
    "import": {
      "types": "./dist/index.dnd.d.ts",
      "default": "./dist/index.dnd.js"
    },
    "require": {
      "types": "./dist/index.dnd.d.cts",
      "default": "./dist/index.dnd.cjs"
    }
  },
  "./styles": {
    "style": "./dist/DataTable.css",
    "default": "./dist/DataTable.css"
  },
  "./tokens": {
    "style": "./dist/DataTable.tokens.css",
    "default": "./dist/DataTable.tokens.css"
  }
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `DataTable` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBody` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableColumnGuide` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableColumnVisibility` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableEmpty` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFooter` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFooterCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFooterRow` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableGlobalFilter` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableGroupHeaderRow` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableHeader` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableHeaderCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableHeaderGroup` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableLoadingOverlay` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTablePinColumnTrigger` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableResizeHandle` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRoot` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRow` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRowExpandTrigger` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRowPinTrigger` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRowSelectCheckbox` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableScrollArea` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSelectAllCheckbox` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSortTrigger` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableTable` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableToolbar` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBodyProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableColumnVisibilityProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableEmptyProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFooterCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFooterProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFooterRowProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableGlobalFilterProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableGroupHeaderRowProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableHeaderCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableHeaderGroupProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableHeaderProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableLoadingOverlayProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTablePinColumnTriggerProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableResizeHandleProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRootProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRowExpandTriggerProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRowPinTriggerProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRowProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRowSelectCheckboxProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableScrollAreaProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSelectAllCheckboxProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSortTriggerProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableTableProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableToolbarProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBoard` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableListView` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableViewModeToggle` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableViews` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBoardProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableListProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableViewModeToggleProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableViewsProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `BulkActions` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBulkActions` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBulkClear` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBulkCount` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSelectAllAcrossPages` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBulkActionsProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBulkClearProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBulkCountProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSelectAllAcrossPagesProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableAddButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableCloseButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableCustomizeButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableDeleteButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableExportButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFilterButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableHideColumnsButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableMoreButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRefreshButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableResetLayoutButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableRowAction` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSearchButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSearchField` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSearchIcon` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ToolbarActionButton` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSearchFieldProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ToolbarActionButtonProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFilterBar` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFilterChipItem` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFilterBarProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFilterChip` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFilterChipItemProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ActionsCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `AvatarCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `BadgeCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `Cells` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `CopyableCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DateCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `LinkCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `NumberCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `StatusBadgeCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `TextCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ActionItem` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ActionsCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `AvatarCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `BadgeCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `CopyableCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DateCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DateFormat` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `LinkCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `NumberCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `NumberFormat` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `StatusBadgeCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `StatusTone` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `TextCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `countConditions` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFilterDrawer` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `FilterConfigPanel` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ComparisonOperator` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableFilterDrawerProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `FilterCondition` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `FilterConfigPanelProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `FilterFieldDefinition` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `FilterFieldType` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `FilterGroup` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `FilterLogicOperator` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTablePagination` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTablePaginationProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DateFilter` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `FilterPopover` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `Filters` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `NumberFilter` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `SelectFilter` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `TextFilter` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DateFilterProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DateRange` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `FilterPopoverProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `NumberFilterProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `NumberRange` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `SelectFilterOption` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `SelectFilterProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `TextFilterProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `CellEditor` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `EditableCell` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `useCellEdit` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `CellEditorMode` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `CellEditorProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `EditableCellProps` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `UseCellEditOptions` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `UseCellEditResult` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `useDataTable` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `useDataTableContext` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableContextValue` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `useControllableState` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `resolveUpdater` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `useDataTablePreferences` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTablePreferencesAdapter` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTablePreferencesOptions` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTablePreferenceState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTablePreferenceStatePairs` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `UseDataTablePreferencesResult` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `useColumnResize` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `UseColumnResizeResult` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `useAutoFitColumn` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `UseAutoFitColumnResult` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `useColumnFilter` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `UseColumnFilterResult` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `useDataTableVirtualizer` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `UseDataTableVirtualizerOptions` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ControlledPair` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBaseOptions` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableBorderMode` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableInteractionMode` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableMode` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableOptions` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableInstance` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableServerRequestState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableSize` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableStatePairs` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableViewMode` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableVirtualizationOptions` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `createColumnHelper` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `flexRender` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `buildColumnSizeVars` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `columnVar` (export) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableStickyMode` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `Cell` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ColumnDef` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ColumnFiltersState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ColumnOrderState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ColumnPinningState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ColumnSizingState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `ExpandedState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `GroupingState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `Header` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `HeaderGroup` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `PaginationState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `Row` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `RowPinningState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `RowSelectionState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `SortingState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `Table` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `VisibilityState` (type) from `@virtari-packages/react-data-table`; source: `packages/react-data-table/src/index.ts`.
- `DataTableDndProvider` (export) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.
- `DataTableDndProviderProps` (type) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.
- `DataTableDraggableHeaderCell` (export) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.
- `DataTableDraggableHeaderCellProps` (type) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.
- `useColumnDnd` (export) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.
- `UseColumnDndOptions` (type) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.
- `UseColumnDndResult` (type) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.
- `DataTableCustomizeDrawer` (export) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.
- `ColumnConfig` (type) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.
- `DataTableCustomizeDrawerProps` (type) from `@virtari-packages/react-data-table/dnd`; source: `packages/react-data-table/src/index.dnd.ts`.

## Source type declarations

Source: `packages/react-data-table/src/bulk/BulkActions.tsx`

```tsx
export interface DataTableBulkActionsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Render bar content. Receives selected rows + clear helper. */
  children?:
    | ReactNode
    | ((ctx: {
        selectedRows: Row<unknown>[];
        selectedCount: number;
        clearSelection: () => void;
      }) => ReactNode);
  /** Also show when the cross-page select flag is active. */
  showWhenAllAcrossPagesSelected?: boolean;
  /** External flag — controls visibility when all-across-pages is selected. */
  isAllAcrossPagesSelected?: boolean;
  /** Stick to bottom of the table instead of inline. */
  sticky?: DataTableStickyMode;
  stickyOffset?: CSSProperties["bottom"];
}
```

Source: `packages/react-data-table/src/bulk/BulkActions.tsx`

```tsx
export interface DataTableBulkCountProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Override — by default reads from context. */
  count?: number;
  label?: (count: number) => ReactNode;
}
```

Source: `packages/react-data-table/src/bulk/BulkActions.tsx`

```tsx
export interface DataTableBulkClearProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
```

Source: `packages/react-data-table/src/bulk/BulkActions.tsx`

```tsx
export interface DataTableSelectAllAcrossPagesProps {
  /** Total row count across all pages (typically `rowCount` from server). */
  totalCount: number;
  /** External flag — whether cross-page selection is active. */
  isAllAcrossPagesSelected: boolean;
  onSelectAll: () => void;
  onClear: () => void;
  className?: string;
}
```

Source: `packages/react-data-table/src/bulk/BulkActions.tsx`

```tsx
export function DataTableSelectAllAcrossPages({
  totalCount,
  isAllAcrossPagesSelected,
  onSelectAll,
  onClear,
  className,
}: DataTableSelectAllAcrossPagesProps);
```

Source: `packages/react-data-table/src/cells/ActionsCell.tsx`

```tsx
export interface ActionItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
  /** Insert a separator BEFORE this item. */
  separatorBefore?: boolean;
}
```

Source: `packages/react-data-table/src/cells/ActionsCell.tsx`

```tsx
export interface ActionsCellProps {
  items: ActionItem[];
  /** Override the trigger glyph/button content. */
  trigger?: ReactNode;
  className?: string;
}
```

Source: `packages/react-data-table/src/cells/ActionsCell.tsx`

```tsx
export function ActionsCell({ items, trigger, className }: ActionsCellProps);
```

Source: `packages/react-data-table/src/cells/AvatarCell.tsx`

```tsx
export interface AvatarCellProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: AvatarSize;
  color?: AvatarColor;
  colorKey?: string;
  primary?: ReactNode;
  secondary?: ReactNode;
  className?: string;
}
```

Source: `packages/react-data-table/src/cells/AvatarCell.tsx`

```tsx
export function AvatarCell({
  src,
  alt,
  fallback,
  size = "sm",
  color = "auto",
  colorKey,
  primary,
  secondary,
  className,
}: AvatarCellProps);
```

Source: `packages/react-data-table/src/cells/BadgeCell.tsx`

```tsx
export interface BadgeCellProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}
```

Source: `packages/react-data-table/src/cells/BadgeCell.tsx`

```tsx
export function BadgeCell({ variant, children, className }: BadgeCellProps);
```

Source: `packages/react-data-table/src/cells/BadgeCell.tsx`

```tsx
export type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";
```

Source: `packages/react-data-table/src/cells/BadgeCell.tsx`

```tsx
export interface StatusBadgeCellProps {
  tone: StatusTone;
  label: ReactNode;
  withDot?: boolean;
  /** "pill" = tinted background + dot (default), "text" = colored text only. */
  variant?: "pill" | "text";
  className?: string;
}
```

Source: `packages/react-data-table/src/cells/BadgeCell.tsx`

```tsx
export function StatusBadgeCell({
  tone,
  label,
  withDot = true,
  variant = "pill",
  className,
}: StatusBadgeCellProps);
```

Source: `packages/react-data-table/src/cells/CopyableCell.tsx`

```tsx
export interface CopyableCellProps {
  children: ReactNode;
  /** Override the text copied to clipboard; defaults to stringifying children. */
  copyText?: string;
  /** Duration of the "Copied" feedback in ms. */
  feedbackMs?: number;
  className?: string;
}
```

Source: `packages/react-data-table/src/cells/CopyableCell.tsx`

```tsx
export function CopyableCell({
  children,
  copyText,
  feedbackMs = 1200,
  className,
}: CopyableCellProps);
```

Source: `packages/react-data-table/src/cells/DateCell.tsx`

```tsx
export type DateFormat =
  | "short"
  | "medium"
  | "long"
  | "relative"
  | ((d: Date) => string);
```

Source: `packages/react-data-table/src/cells/DateCell.tsx`

```tsx
export interface DateCellProps {
  value: Date | string | number | null | undefined;
  format?: DateFormat;
  locale?: string;
  className?: string;
}
```

Source: `packages/react-data-table/src/cells/DateCell.tsx`

```tsx
export function DateCell({
  value,
  format = "medium",
  locale,
  className,
}: DateCellProps);
```

Source: `packages/react-data-table/src/cells/LinkCell.tsx`

```tsx
export interface LinkCellProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  external?: boolean;
}
```

Source: `packages/react-data-table/src/cells/LinkCell.tsx`

```tsx
export function LinkCell({
  children,
  external,
  className,
  target,
  rel,
  ...props
}: LinkCellProps);
```

Source: `packages/react-data-table/src/cells/NumberCell.tsx`

```tsx
export type NumberFormat =
  | "integer"
  | "decimal"
  | "currency"
  | "percent"
  | "compact"
  | ((n: number) => string);
```

Source: `packages/react-data-table/src/cells/NumberCell.tsx`

```tsx
export interface NumberCellProps {
  value: number | string | null | undefined;
  format?: NumberFormat;
  currency?: string;
  locale?: string;
  fractionDigits?: number;
  align?: "start" | "center" | "end";
  className?: string;
}
```

Source: `packages/react-data-table/src/cells/NumberCell.tsx`

```tsx
export function NumberCell({
  value,
  format = "decimal",
  currency = "USD",
  locale,
  fractionDigits,
  align = "end",
  className,
}: NumberCellProps);
```

Source: `packages/react-data-table/src/cells/TextCell.tsx`

```tsx
export interface TextCellProps {
  value?: ReactNode;
  /** Visual weight — default "regular". */
  weight?: "regular" | "medium" | "semibold";
  /** Force ellipsis truncation with `title` fallback. */
  truncate?: boolean;
  /** Muted color tone. */
  muted?: boolean;
  className?: string;
}
```

Source: `packages/react-data-table/src/cells/TextCell.tsx`

```tsx
export function TextCell({
  value,
  weight = "regular",
  truncate = true,
  muted = false,
  className,
}: TextCellProps);
```

Source: `packages/react-data-table/src/customize/CustomizeDrawer.tsx`

```tsx
export interface ColumnConfig {
  id: string;
  label: string;
  icon?: React.ReactNode;
  visible: boolean;
}
```

Source: `packages/react-data-table/src/customize/CustomizeDrawer.tsx`

```tsx
export interface DataTableCustomizeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
  defaultColumns?: ColumnConfig[];
  title?: string;
  side?: "left" | "right" | "top" | "bottom";
}
```

Source: `packages/react-data-table/src/customize/CustomizeDrawer.tsx`

```tsx
export function DataTableCustomizeDrawer({
  open,
  onOpenChange,
  columns: external,
  onColumnsChange,
  defaultColumns,
  title = "Customize view",
  side = "right",
}: DataTableCustomizeDrawerProps);
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export type DataTableRootProps<TData, TValue = unknown> =
  DataTableRootOwnProps & (AdvancedProps<TData> | SimpleProps<TData, TValue>);
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableToolbarProps
  extends HTMLAttributes<HTMLDivElement> {
  sticky?: DataTableStickyMode;
  stickyOffset?: CSSProperties["top"];
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableScrollAreaProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Enable click-and-drag panning of the scroll area (like Google Sheets /
   * Figma canvas). Buttons/links/inputs/resize-handles remain clickable.
   * Default: `true`.
   */
  scrollDrag?: boolean;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableTableProps
  extends TableHTMLAttributes<HTMLTableElement> {
  /** Internal render split used by ScrollArea when the header is detached. */
  __vdsRenderMode?: DataTableTableRenderMode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableHeaderProps
  extends Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> {
  stickyOffset?: CSSProperties["top"];
  /** Internal flag used when ScrollArea renders the header in a detached rail. */
  __vdsDetachedHeader?: boolean;
  children?:
    | ReactNode
    | ((headerGroups: HeaderGroup<unknown>[]) => ReactNode);
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableHeaderGroupProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
  headerGroup: HeaderGroup<TData>;
  children?:
    | ReactNode
    | ((headers: Header<TData, unknown>[]) => ReactNode);
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableHeaderCellProps<TData = unknown, TValue = unknown>
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "children"> {
  header: Header<TData, TValue>;
  children?: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableBodyProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> {
  children?: ReactNode | ((rows: Row<TData>[]) => ReactNode);
  emptyMessage?: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableRowProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
  row: Row<TData>;
  children?: ReactNode | ((cells: Cell<TData, unknown>[]) => ReactNode);
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableCellProps<TData = unknown, TValue = unknown>
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "children"> {
  cell: Cell<TData, TValue>;
  children?: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableFooterProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  sticky?: DataTableStickyMode;
  stickyOffset?: CSSProperties["bottom"];
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableFooterRowProps<TData = unknown>
  extends HTMLAttributes<HTMLTableRowElement> {
  footerGroup: HeaderGroup<TData>;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableFooterCellProps<TData = unknown, TValue = unknown>
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "children"> {
  header: Header<TData, TValue>;
  children?: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableEmptyProps
  extends HTMLAttributes<HTMLDivElement> {}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableLoadingOverlayProps
  extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  label?: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableSortTriggerProps<TData = unknown, TValue = unknown>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  header: Header<TData, TValue>;
  children?: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableGlobalFilterProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
  > {
  /** Debounce in ms before committing to table state. Default 150. */
  debounceMs?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableSelectAllCheckboxProps {
  className?: string;
  /** Scope: all rows vs current page. Default "page". */
  scope?: "page" | "all";
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export function DataTableSelectAllCheckbox({
  className,
  scope = "page",
}: DataTableSelectAllCheckboxProps);
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableRowSelectCheckboxProps<TData = unknown> {
  row: Row<TData>;
  className?: string;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export function DataTableRowSelectCheckbox<TData>({
  row,
  className,
}: DataTableRowSelectCheckboxProps<TData>);
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableResizeHandleProps<TData = unknown, TValue = unknown>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onKeyDown"> {
  header: Header<TData, TValue>;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export function DataTableColumnGuide();
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTablePinColumnTriggerProps<TData = unknown, TValue = unknown>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  column: Column<TData, TValue>;
  side: "left" | "right";
  children?: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableRowExpandTriggerProps<TData = unknown>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  row: Row<TData>;
  children?: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableRowPinTriggerProps<TData = unknown>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  row: Row<TData>;
  side: "top" | "bottom";
  children?: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableColumnVisibilityProps {
  className?: string;
  /** Include only columns matching this predicate; default: all that support hiding. */
  filter?: (column: Column<unknown, unknown>) => boolean;
}
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export function DataTableColumnVisibility({
  className,
  filter,
}: DataTableColumnVisibilityProps);
```

Source: `packages/react-data-table/src/DataTable.tsx`

```tsx
export interface DataTableGroupHeaderRowProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
  row: Row<TData>;
}
```

Source: `packages/react-data-table/src/DataTableContext.tsx`

```tsx
export interface DataTableContextValue<TData = unknown> {
  table: Table<TData>;
  size: DataTableSize;
  interactionMode: DataTableInteractionMode;
  bordered: DataTableBorderMode;
  striped: boolean;
  stickyHeader: boolean;
  mode: DataTableMode;
  virtualization: false | DataTableVirtualizationOptions;
  columnResizeMode: "onChange" | "onEnd";
  tableId: string;
  scrollRef: MutableRefObject<HTMLDivElement | null>;
  rowCount: number | undefined;
  viewMode: DataTableViewMode;
  setViewMode: (mode: DataTableViewMode) => void;
  onCellEdit?: (
    row: Row<TData>,
    columnId: string,
    nextValue: unknown,
  ) => void | Promise<void>;
  onDataRequest?: (state: DataTableServerRequestState) => void;
}
```

Source: `packages/react-data-table/src/DataTableContext.tsx`

```tsx
export interface DataTableProviderProps<TData>
  extends Omit<DataTableContextValue<TData>, "tableId" | "scrollRef"> {
  id?: string;
  children: ReactNode;
}
```

Source: `packages/react-data-table/src/DataTableContext.tsx`

```tsx
export function DataTableProvider<TData>({
  id,
  children,
  ...rest
}: DataTableProviderProps<TData>);
```

Source: `packages/react-data-table/src/DataTableContext.tsx`

```tsx
export function useDataTableContext<TData = unknown>(): DataTableContextValue<
  TData
>;
```

Source: `packages/react-data-table/src/dnd/DndProvider.tsx`

```tsx
export interface DataTableDndProviderProps {
  children: ReactNode;
  onColumnOrderChange?: (order: ColumnOrderState) => void;
  /** Override dnd-kit sensors if needed. */
  sensors?: DndContextProps["sensors"];
  /** Called on drag start / move — pass through to DndContext if needed. */
  dndContextProps?: Omit<DndContextProps, "sensors" | "onDragEnd" | "children">;
}
```

Source: `packages/react-data-table/src/dnd/DndProvider.tsx`

```tsx
export function DataTableDndProvider({
  children,
  onColumnOrderChange,
  sensors: overrideSensors,
  dndContextProps,
}: DataTableDndProviderProps);
```

Source: `packages/react-data-table/src/dnd/DraggableHeaderCell.tsx`

```tsx
export interface DataTableDraggableHeaderCellProps<
  TData = unknown,
  TValue = unknown,
> extends DataTableHeaderCellProps<TData, TValue> {
  /** Optional visual drag handle; if omitted the entire cell is draggable. */
  dragHandle?: ReactNode;
}
```

Source: `packages/react-data-table/src/dnd/use-column-dnd.ts`

```tsx
export interface UseColumnDndOptions {
  onColumnOrderChange?: (order: ColumnOrderState) => void;
}
```

Source: `packages/react-data-table/src/dnd/use-column-dnd.ts`

```tsx
export interface UseColumnDndResult {
  sensors: SensorDescriptor<SensorOptions>[];
  handleDragEnd: (event: DragEndEvent) => void;
  strategy: SortingStrategy;
  items: string[];
}
```

Source: `packages/react-data-table/src/dnd/use-column-dnd.ts`

```tsx
export function useColumnDnd(
  options: UseColumnDndOptions = {},
): UseColumnDndResult;
```

Source: `packages/react-data-table/src/editing/CellEditor.tsx`

```tsx
export type CellEditorMode = "text" | "number" | "date";
```

Source: `packages/react-data-table/src/editing/CellEditor.tsx`

```tsx
export interface CellEditorProps {
  mode?: CellEditorMode;
  value: string | number;
  onValueChange: (v: string | number) => void;
  onCommit: () => void;
  onCancel: () => void;
  autoFocus?: boolean;
  className?: string;
}
```

Source: `packages/react-data-table/src/editing/EditableCell.tsx`

```tsx
export interface EditableCellProps<TData = unknown, TValue = unknown>
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "children"> {
  cell: Cell<TData, TValue>;
  mode?: CellEditorMode;
  /** Read the current value for editing. Default: `cell.getValue()`. */
  getValue?: () => string | number;
}
```

Source: `packages/react-data-table/src/editing/use-cell-edit.ts`

```tsx
export interface UseCellEditOptions<TValue> {
  initialValue: TValue;
}
```

Source: `packages/react-data-table/src/editing/use-cell-edit.ts`

```tsx
export interface UseCellEditResult<TValue> {
  editing: boolean;
  value: TValue;
  setValue: (v: TValue) => void;
  start: () => void;
  commit: () => Promise<void>;
  cancel: () => void;
  isPending: boolean;
}
```

Source: `packages/react-data-table/src/editing/use-cell-edit.ts`

```tsx
export function useCellEdit<TData, TValue>(
  cell: Cell<TData, TValue>,
  options: UseCellEditOptions<TValue>,
): UseCellEditResult<TValue>;
```

Source: `packages/react-data-table/src/filter-bar/FilterBar.tsx`

```tsx
export interface DataTableFilterChip {
  id: string;
  label: ReactNode;
  value?: ReactNode;
  icon?: ReactNode;
  variant?: ChipVariant;
  disabled?: boolean;
  removeLabel?: string;
}
```

Source: `packages/react-data-table/src/filter-bar/FilterBar.tsx`

```tsx
export interface DataTableFilterBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  filters?: DataTableFilterChip[];
  onFilterClick?: (filter: DataTableFilterChip) => void;
  onRemoveFilter?: (filterId: string) => void;
  onAddFilter?: () => void;
  addLabel?: ReactNode;
  sticky?: DataTableStickyMode;
  stickyOffset?: CSSProperties["top"];
  children?: ReactNode;
}
```

Source: `packages/react-data-table/src/filter-bar/FilterBar.tsx`

```tsx
export interface DataTableFilterChipItemProps {
  filter: DataTableFilterChip;
  onClick?: (filter: DataTableFilterChip) => void;
  onRemove?: (filterId: string) => void;
}
```

Source: `packages/react-data-table/src/filter-bar/FilterBar.tsx`

```tsx
export function DataTableFilterChipItem({
  filter,
  onClick,
  onRemove,
}: DataTableFilterChipItemProps);
```

Source: `packages/react-data-table/src/filter-drawer/FilterConfigPanel.tsx`

```tsx
export interface FilterConfigPanelProps {
  field: FilterFieldDefinition;
  onAdd: (cond: FilterCondition) => void;
  onCancel: () => void;
}
```

Source: `packages/react-data-table/src/filter-drawer/FilterConfigPanel.tsx`

```tsx
export function FilterConfigPanel({
  field,
  onAdd,
  onCancel,
}: FilterConfigPanelProps);
```

Source: `packages/react-data-table/src/filter-drawer/FilterDrawer.tsx`

```tsx
export interface DataTableFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fields the user can add conditions against. */
  availableFilters: FilterFieldDefinition[];
  /** Currently-active filter groups (controlled). */
  filterGroups?: FilterGroup[];
  /** Fired on Apply. */
  onApplyFilters: (groups: FilterGroup[]) => void;
  title?: string;
  /** Drawer side. Default "right". */
  side?: "left" | "right" | "top" | "bottom";
}
```

Source: `packages/react-data-table/src/filter-drawer/FilterDrawer.tsx`

```tsx
export function DataTableFilterDrawer({
  open,
  onOpenChange,
  availableFilters,
  filterGroups: externalGroups = [],
  onApplyFilters,
  title = "Filters",
  side = "right",
}: DataTableFilterDrawerProps);
```

Source: `packages/react-data-table/src/filter-drawer/types.ts`

```tsx
export type FilterFieldType =
  | "select"
  | "text"
  | "date"
  | "date-range"
  | "number"
  | "boolean";
```

Source: `packages/react-data-table/src/filter-drawer/types.ts`

```tsx
export interface FilterFieldDefinition {
  id: string;
  label: string;
  icon?: ReactNode;
  type: FilterFieldType;
  options?: { label: string; value: unknown }[];
  placeholder?: string;
  /** Group under "Shown" (default) or "Popular". */
  category?: "shown" | "popular";
}
```

Source: `packages/react-data-table/src/filter-drawer/types.ts`

```tsx
export type ComparisonOperator =
  | "equals"
  | "notEquals"
  | "contains"
  | "notContains"
  | "greaterThan"
  | "lessThan"
  | "between";
```

Source: `packages/react-data-table/src/filter-drawer/types.ts`

```tsx
export interface FilterCondition {
  id: string;
  fieldId: string;
  fieldLabel: string;
  comparison: ComparisonOperator;
  value: unknown;
  /** Second value, used only for `between`. */
  value2?: unknown;
}
```

Source: `packages/react-data-table/src/filter-drawer/types.ts`

```tsx
export type FilterLogicOperator = "AND" | "OR";
```

Source: `packages/react-data-table/src/filter-drawer/types.ts`

```tsx
export interface FilterGroup {
  id: string;
  operator: FilterLogicOperator;
  conditions: FilterCondition[];
}
```

Source: `packages/react-data-table/src/filter-drawer/types.ts`

```tsx
export function countConditions(groups: FilterGroup[]): number;
```

Source: `packages/react-data-table/src/filters/DateFilter.tsx`

```tsx
export type DateRange = [string | undefined, string | undefined];
```

Source: `packages/react-data-table/src/filters/DateFilter.tsx`

```tsx
export interface DateFilterProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  /** Whether to render as a range (two inputs) or single date. Default "range". */
  mode?: "single" | "range";
  className?: string;
}
```

Source: `packages/react-data-table/src/filters/FilterPopover.tsx`

```tsx
export interface FilterPopoverProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  /** Body of the popover — a filter control (e.g., `<TextFilter column={col} />`). */
  children: ReactNode;
  /** Trigger content — defaults to a funnel glyph. */
  trigger?: ReactNode;
  className?: string;
  /** Side the popover opens to. */
  side?: "top" | "right" | "bottom" | "left";
}
```

Source: `packages/react-data-table/src/filters/FilterPopover.tsx`

```tsx
export function FilterPopover<TData, TValue>({
  column,
  children,
  trigger,
  className,
  side = "bottom",
}: FilterPopoverProps<TData, TValue>);
```

Source: `packages/react-data-table/src/filters/NumberFilter.tsx`

```tsx
export type NumberRange = [number | undefined, number | undefined];
```

Source: `packages/react-data-table/src/filters/NumberFilter.tsx`

```tsx
export interface NumberFilterProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  placeholder?: [string, string];
  className?: string;
}
```

Source: `packages/react-data-table/src/filters/SelectFilter.tsx`

```tsx
export interface SelectFilterOption {
  value: string;
  label?: string;
}
```

Source: `packages/react-data-table/src/filters/SelectFilter.tsx`

```tsx
export interface SelectFilterProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  options?: (string | SelectFilterOption)[];
  /** Allow multi-select. Default false. */
  multiple?: boolean;
  placeholder?: string;
  className?: string;
}
```

Source: `packages/react-data-table/src/filters/TextFilter.tsx`

```tsx
export interface TextFilterProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  placeholder?: string;
  className?: string;
}
```

Source: `packages/react-data-table/src/pagination/adapter.tsx`

```tsx
export interface DataTablePaginationProps {
  className?: string;
  sticky?: DataTableStickyMode;
  stickyOffset?: CSSProperties["bottom"];
  pageSizeOptions?: number[];
  siblingCount?: number;
  size?: PaginationSize;
  hidePageSize?: boolean;
  hidePageNumbers?: boolean;
  hideInfo?: boolean;
  children?: ReactNode;
}
```

Source: `packages/react-data-table/src/pagination/adapter.tsx`

```tsx
export function DataTablePagination({
  className,
  sticky = false,
  stickyOffset,
  pageSizeOptions,
  siblingCount,
  size,
  hidePageSize,
  hidePageNumbers,
  hideInfo,
  children,
}: DataTablePaginationProps);
```

Source: `packages/react-data-table/src/preferences.ts`

```tsx
export interface DataTablePreferenceState {
  viewMode?: DataTableViewMode;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  globalFilter?: string;
  rowSelection?: RowSelectionState;
  columnSizing?: ColumnSizingState;
  columnOrder?: ColumnOrderState;
  columnPinning?: ColumnPinningState;
  columnVisibility?: VisibilityState;
  pagination?: PaginationState;
  grouping?: GroupingState;
  expanded?: ExpandedState;
  rowPinning?: RowPinningState;
}
```

Source: `packages/react-data-table/src/preferences.ts`

```tsx
export interface DataTablePreferencesAdapter {
  load?: () => DataTablePreferenceState | null | Promise<DataTablePreferenceState | null>;
  save?: (state: DataTablePreferenceState) => void | Promise<void>;
  clear?: () => void | Promise<void>;
}
```

Source: `packages/react-data-table/src/preferences.ts`

```tsx
export interface DataTablePreferencesOptions {
  value?: DataTablePreferenceState;
  defaultValue?: DataTablePreferenceState;
  onValueChange?: (state: DataTablePreferenceState) => void;
  adapter?: DataTablePreferencesAdapter;
  /**
   * Convenience localStorage key. For Zustand, server actions, or a database,
   * prefer `value`/`onValueChange` or `adapter`.
   */
  storageKey?: string;
  autoSave?: boolean;
  debounceMs?: number;
}
```

Source: `packages/react-data-table/src/preferences.ts`

```tsx
export interface DataTablePreferenceStatePairs {
  viewMode?: DataTableViewMode;
  onViewModeChange: (viewMode: DataTableViewMode) => void;
  sorting?: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange: (filters: ColumnFiltersState) => void;
  globalFilter?: string;
  onGlobalFilterChange: (value: string) => void;
  rowSelection?: RowSelectionState;
  onRowSelectionChange: (selection: RowSelectionState) => void;
  columnSizing?: ColumnSizingState;
  onColumnSizingChange: (sizing: ColumnSizingState) => void;
  columnOrder?: ColumnOrderState;
  onColumnOrderChange: (order: ColumnOrderState) => void;
  columnPinning?: ColumnPinningState;
  onColumnPinningChange: (pinning: ColumnPinningState) => void;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange: (visibility: VisibilityState) => void;
  pagination?: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  grouping?: GroupingState;
  onGroupingChange: (grouping: GroupingState) => void;
  expanded?: ExpandedState;
  onExpandedChange: (expanded: ExpandedState) => void;
  rowPinning?: RowPinningState;
  onRowPinningChange: (pinning: RowPinningState) => void;
}
```

Source: `packages/react-data-table/src/preferences.ts`

```tsx
export interface UseDataTablePreferencesResult {
  preferences: DataTablePreferenceState;
  setPreferences: (next: DataTablePreferenceState) => void;
  updatePreferences: (patch: DataTablePreferenceState) => void;
  resetPreferences: () => void;
  statePairs: DataTablePreferenceStatePairs;
}
```

Source: `packages/react-data-table/src/preferences.ts`

```tsx
export function useDataTablePreferences({
  value,
  defaultValue = {},
  onValueChange,
  adapter,
  storageKey,
  autoSave = true,
  debounceMs = 200,
}: DataTablePreferencesOptions = {}): UseDataTablePreferencesResult;
```

Source: `packages/react-data-table/src/toolbar/ActionButtons.tsx`

```tsx
export type ToolbarActionButtonVariant = Extract<
  ButtonVariant,
  "ghost" | "outline" | "solid" | "soft"
>;
```

Source: `packages/react-data-table/src/toolbar/ActionButtons.tsx`

```tsx
export type ToolbarActionButtonSize = Extract<
  ButtonSize,
  "2xs" | "xs" | "sm" | "md" | "lg"
>;
```

Source: `packages/react-data-table/src/toolbar/ActionButtons.tsx`

```tsx
export interface ToolbarActionButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  icon?: ReactNode;
  /** Trailing glyph (e.g. chevron-down for split-style buttons). */
  trailingIcon?: ReactNode;
  label?: ReactNode;
  count?: number | string;
  /** Color intent. "primary" is the accent hue. "danger" is destructive. */
  intent?: "neutral" | "primary" | "danger";
  /** Visual variant. Default "ghost". */
  variant?: ToolbarActionButtonVariant;
  /** Size preset. Default "md". */
  size?: ToolbarActionButtonSize;
  /** Icon-only (skip the label slot even if provided). */
  iconOnly?: boolean;
}
```

Source: `packages/react-data-table/src/toolbar/SearchField.tsx`

```tsx
export interface DataTableSearchFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "defaultValue" | "onChange" | "size" | "value"
  > {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  debounceMs?: number;
  clearable?: boolean;
  icon?: ReactNode;
  inputSize?: InputSize;
  wrapperClassName?: string;
}
```

Source: `packages/react-data-table/src/toolbar/SearchField.tsx`

```tsx
export function DataTableSearchField({
  value,
  defaultValue,
  onValueChange,
  debounceMs = 150,
  clearable = true,
  icon,
  inputSize = "md",
  className,
  wrapperClassName,
  placeholder = "Search",
  "aria-label": ariaLabel = "Search table",
  ...props
}: DataTableSearchFieldProps);
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export type DataTableSize = "sm" | "md" | "lg";
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export type DataTableInteractionMode = "table" | "grid";
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export type DataTableBorderMode = "none" | "rows" | "grid";
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export type DataTableMode = "client" | "server";
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export type DataTableViewMode = "table" | "board" | "list";
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export interface DataTableVirtualizationOptions {
  estimateRowSize?: number;
  overscan?: number;
}
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export interface ControlledPair<T> {
  value?: T;
  defaultValue?: T;
  onValueChange?: (next: T) => void;
}
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export interface DataTableStatePairs {
  sorting?: SortingState;
  defaultSorting?: SortingState;
  onSortingChange?: (state: SortingState) => void;

  columnFilters?: ColumnFiltersState;
  defaultColumnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: (state: ColumnFiltersState) => void;

  globalFilter?: string;
  defaultGlobalFilter?: string;
  onGlobalFilterChange?: (state: string) => void;

  rowSelection?: RowSelectionState;
  defaultRowSelection?: RowSelectionState;
  onRowSelectionChange?: (state: RowSelectionState) => void;

  columnSizing?: ColumnSizingState;
  defaultColumnSizing?: ColumnSizingState;
  onColumnSizingChange?: (state: ColumnSizingState) => void;

  columnOrder?: ColumnOrderState;
  defaultColumnOrder?: ColumnOrderState;
  onColumnOrderChange?: (state: ColumnOrderState) => void;

  columnPinning?: ColumnPinningState;
  defaultColumnPinning?: ColumnPinningState;
  onColumnPinningChange?: (state: ColumnPinningState) => void;

  columnVisibility?: VisibilityState;
  defaultColumnVisibility?: VisibilityState;
  onColumnVisibilityChange?: (state: VisibilityState) => void;

  pagination?: PaginationState;
  defaultPagination?: PaginationState;
  onPaginationChange?: (state: PaginationState) => void;

  grouping?: GroupingState;
  defaultGrouping?: GroupingState;
  onGroupingChange?: (state: GroupingState) => void;

  expanded?: ExpandedState;
  defaultExpanded?: ExpandedState;
  onExpandedChange?: (state: ExpandedState) => void;

  rowPinning?: RowPinningState;
  defaultRowPinning?: RowPinningState;
  onRowPinningChange?: (state: RowPinningState) => void;
}
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export interface DataTableServerRequestState {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  pagination: PaginationState;
  grouping: GroupingState;
}
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export interface DataTableBaseOptions {
  size?: DataTableSize;
  interactionMode?: DataTableInteractionMode;
  bordered?: DataTableBorderMode;
  striped?: boolean;
  stickyHeader?: boolean;
  mode?: DataTableMode;
  virtualization?: false | DataTableVirtualizationOptions;
  columnResizeMode?: "onChange" | "onEnd";
  rowCount?: number;
  onDataRequest?: (state: DataTableServerRequestState) => void;
  onCellEdit?: (
    row: Row<unknown>,
    columnId: string,
    nextValue: unknown,
  ) => void | Promise<void>;
}
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export interface DataTableOptions<TData, TValue = unknown>
  extends DataTableBaseOptions,
    DataTableStatePairs {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export type DataTableInstance<TData> = Table<TData>;
```

Source: `packages/react-data-table/src/types.ts`

```tsx
export type TableUpdater<T> = Updater<T>;
```

Source: `packages/react-data-table/src/use-auto-fit-column.ts`

```tsx
export interface UseAutoFitColumnResult {
  /** Measure visible rendered cells for this column; apply as new size. */
  fit(): void;
  /** Measure only, without applying. */
  measure(): number;
  minSize: number;
  maxSize: number;
}
```

Source: `packages/react-data-table/src/use-auto-fit-column.ts`

```tsx
export function useAutoFitColumn(columnId: string): UseAutoFitColumnResult;
```

Source: `packages/react-data-table/src/use-column-filter.ts`

```tsx
export interface UseColumnFilterResult<T> {
  value: T | undefined;
  setValue: (next: T | undefined) => void;
  clear: () => void;
  isActive: boolean;
}
```

Source: `packages/react-data-table/src/use-column-filter.ts`

```tsx
export function useColumnFilter<T, TData = unknown, TValue = unknown>(
  column: Column<TData, TValue>,
): UseColumnFilterResult<T>;
```

Source: `packages/react-data-table/src/use-column-resize.ts`

```tsx
export interface UseColumnResizeResult {
  isResizing: boolean;
  currentSize: number;
  minSize: number;
  maxSize: number;
  /** Keyboard adjust: Arrow ±8 px, Shift+Arrow ±32 px, Home/End to min/max. */
  onKeyDownAdjust(event: KeyboardEvent<HTMLElement>): void;
  /** Style for the .vds-data-table-resize-guideline overlay. */
  getGuidelineStyle(): CSSProperties;
}
```

Source: `packages/react-data-table/src/use-column-resize.ts`

```tsx
export function useColumnResize<TData, TValue>(
  header: Header<TData, TValue>,
): UseColumnResizeResult;
```

Source: `packages/react-data-table/src/use-controllable-state.ts`

```tsx
export interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (next: T) => void;
}
```

Source: `packages/react-data-table/src/use-controllable-state.ts`

```tsx
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, Dispatch<SetStateAction<T>>];
```

Source: `packages/react-data-table/src/use-controllable-state.ts`

```tsx
export function resolveUpdater<T>(updater: Updater<T>, prev: T): T;
```

Source: `packages/react-data-table/src/use-data-table.ts`

```tsx
export function useDataTable<TData, TValue = unknown>(
  options: DataTableOptions<TData, TValue>,
): Table<TData>;
```

Source: `packages/react-data-table/src/use-keyboard-grid-nav.ts`

```tsx
export function useKeyboardGridNav(
  enabled: boolean,
  scrollRef: MutableRefObject<HTMLElement | null>,
): void;
```

Source: `packages/react-data-table/src/utils/announce.tsx`

```tsx
export function useSrAnnouncements<TData>(table: Table<TData>): string;
```

Source: `packages/react-data-table/src/utils/compose-refs.ts`

```tsx
export function setRef<T>(ref: AnyRef<T>, value: T | null): void;
```

Source: `packages/react-data-table/src/utils/compose-refs.ts`

```tsx
export function composeRefs<T>(...refs: AnyRef<T>[]): RefCallback<T>;
```

Source: `packages/react-data-table/src/utils/css-vars.ts`

```tsx
export function buildColumnSizeVars<TData>(
  table: Table<TData>,
): CSSProperties;
```

Source: `packages/react-data-table/src/utils/css-vars.ts`

```tsx
export function columnVar(columnId: string): string;
```

Source: `packages/react-data-table/src/utils/data-attrs.ts`

```tsx
export function sortedAttr(
  header: Header<unknown, unknown>,
): "asc" | "desc" | undefined;
```

Source: `packages/react-data-table/src/utils/data-attrs.ts`

```tsx
export function pinnedAttr(
  column: Column<unknown, unknown>,
): "left" | "right" | undefined;
```

Source: `packages/react-data-table/src/utils/data-attrs.ts`

```tsx
export function rowPinnedAttr(row: Row<unknown>): "top" | "bottom" | undefined;
```

Source: `packages/react-data-table/src/utils/data-attrs.ts`

```tsx
export function boolAttr(value: boolean): "" | undefined;
```

Source: `packages/react-data-table/src/utils/measure-cell.ts`

```tsx
export interface MeasureOptions {
  /** Reference element whose font stack/padding we inherit. */
  reference: HTMLElement;
  /** Extra px to add for comfort (default: 1). */
  fudge?: number;
}
```

Source: `packages/react-data-table/src/utils/measure-cell.ts`

```tsx
export function createMeasureSpan({ reference }: MeasureOptions): {
  span: HTMLSpanElement;
  dispose(): void;
};
```

Source: `packages/react-data-table/src/utils/measure-cell.ts`

```tsx
export function measureCellWidth(
  cell: HTMLElement,
  span: HTMLSpanElement,
  fudge = 1,
): number;
```

Source: `packages/react-data-table/src/utils/scroll-sync.ts`

```tsx
export type HorizontalScrollState = "start" | "middle" | "end" | "none";
```

Source: `packages/react-data-table/src/utils/scroll-sync.ts`

```tsx
export function useHorizontalScrollShadow(
  ref: MutableRefObject<HTMLElement | null>,
): HorizontalScrollState;
```

Source: `packages/react-data-table/src/utils/sticky.ts`

```tsx
export type DataTableStickyMode = boolean | "always" | "smart";
```

Source: `packages/react-data-table/src/utils/sticky.ts`

```tsx
export type DataTableStickyAxis = "top" | "bottom";
```

Source: `packages/react-data-table/src/utils/sticky.ts`

```tsx
export function stickyAttr(sticky: DataTableStickyMode | undefined);
```

Source: `packages/react-data-table/src/utils/sticky.ts`

```tsx
export function stickyAxisAttr(
  axis: DataTableStickyAxis,
): DataTableStickyAxis;
```

Source: `packages/react-data-table/src/utils/use-scroll-drag.ts`

```tsx
export function useScrollDrag(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
);
```

Source: `packages/react-data-table/src/utils/use-sticky-stack.ts`

```tsx
export function useDataTableStickyStack(
  rootRef: MutableRefObject<HTMLElement | null>,
): void;
```

Source: `packages/react-data-table/src/views/Board.tsx`

```tsx
export interface DataTableBoardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Override card rendering per row. */
  renderCard?: (row: Row<unknown>, index: number) => ReactNode;
  emptyMessage?: ReactNode;
  /** Hide columns in this list when rendering cards (e.g. `["__select","actions"]`). */
  skipColumns?: string[];
}
```

Source: `packages/react-data-table/src/views/List.tsx`

```tsx
export interface DataTableListProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  renderItem?: (row: Row<unknown>, index: number) => ReactNode;
  emptyMessage?: ReactNode;
  skipColumns?: string[];
}
```

Source: `packages/react-data-table/src/views/ViewModeToggle.tsx`

```tsx
export interface DataTableViewModeToggleProps
  extends Omit<
    TabsProps,
    "children" | "defaultValue" | "onValueChange" | "value"
  > {
  /** Which modes to show — defaults to all three. */
  modes?: DataTableViewMode[];
  /** Custom labels per mode. */
  labels?: Partial<Record<DataTableViewMode, ReactNode>>;
  /** Custom icons per mode. */
  icons?: Partial<Record<DataTableViewMode, ReactNode>>;
  /** Tabs visual style. Defaults to the design-system segmented control. */
  variant?: TabsVariant;
  /** Size preset shared with Button/Input/Select. */
  size?: TabsSize;
}
```

Source: `packages/react-data-table/src/views/Views.tsx`

```tsx
export interface DataTableViewsProps {
  /** Render-prop override. If omitted, auto-dispatches to default Table/Board/List. */
  children?: (viewMode: DataTableViewMode) => ReactNode;
  /** Default children for each mode when not using render-prop. */
  table?: ReactNode;
  board?: ReactNode;
  list?: ReactNode;
  /** Hide these columns in board/list auto-renders. */
  skipColumns?: string[];
  emptyMessage?: ReactNode;
}
```

Source: `packages/react-data-table/src/views/Views.tsx`

```tsx
export function DataTableViews({
  children,
  table,
  board,
  list,
  skipColumns,
  emptyMessage,
}: DataTableViewsProps);
```

Source: `packages/react-data-table/src/virtualizer.ts`

```tsx
export interface UseDataTableVirtualizerOptions {
  count: number;
  scrollRef: MutableRefObject<HTMLElement | null>;
  estimateSize?: number;
  overscan?: number;
}
```

Source: `packages/react-data-table/src/virtualizer.ts`

```tsx
export function useDataTableVirtualizer({
  count,
  scrollRef,
  estimateSize = 40,
  overscan = 8,
}: UseDataTableVirtualizerOptions): Virtualizer<HTMLElement, Element>;
```

## Source files

- `packages/react-data-table/src/bulk/BulkActions.tsx`
- `packages/react-data-table/src/bulk/index.ts`
- `packages/react-data-table/src/cells/ActionsCell.tsx`
- `packages/react-data-table/src/cells/AvatarCell.tsx`
- `packages/react-data-table/src/cells/BadgeCell.tsx`
- `packages/react-data-table/src/cells/CopyableCell.tsx`
- `packages/react-data-table/src/cells/DateCell.tsx`
- `packages/react-data-table/src/cells/index.ts`
- `packages/react-data-table/src/cells/LinkCell.tsx`
- `packages/react-data-table/src/cells/NumberCell.tsx`
- `packages/react-data-table/src/cells/TextCell.tsx`
- `packages/react-data-table/src/customize/CustomizeDrawer.tsx`
- `packages/react-data-table/src/customize/index.ts`
- `packages/react-data-table/src/DataTable.css`
- `packages/react-data-table/src/DataTable.tokens.css`
- `packages/react-data-table/src/DataTable.tsx`
- `packages/react-data-table/src/DataTableContext.tsx`
- `packages/react-data-table/src/DataTableNamespace.ts`
- `packages/react-data-table/src/dnd/DndProvider.tsx`
- `packages/react-data-table/src/dnd/DraggableHeaderCell.tsx`
- `packages/react-data-table/src/dnd/use-column-dnd.ts`
- `packages/react-data-table/src/editing/CellEditor.tsx`
- `packages/react-data-table/src/editing/EditableCell.tsx`
- `packages/react-data-table/src/editing/index.ts`
- `packages/react-data-table/src/editing/use-cell-edit.ts`
- `packages/react-data-table/src/filter-bar/FilterBar.tsx`
- `packages/react-data-table/src/filter-bar/index.ts`
- `packages/react-data-table/src/filter-drawer/FilterConfigPanel.tsx`
- `packages/react-data-table/src/filter-drawer/FilterDrawer.tsx`
- `packages/react-data-table/src/filter-drawer/index.ts`
- `packages/react-data-table/src/filter-drawer/types.ts`
- `packages/react-data-table/src/filters/DateFilter.tsx`
- `packages/react-data-table/src/filters/FilterPopover.tsx`
- `packages/react-data-table/src/filters/index.ts`
- `packages/react-data-table/src/filters/NumberFilter.tsx`
- `packages/react-data-table/src/filters/SelectFilter.tsx`
- `packages/react-data-table/src/filters/TextFilter.tsx`
- `packages/react-data-table/src/index.dnd.ts`
- `packages/react-data-table/src/index.ts`
- `packages/react-data-table/src/pagination/adapter.tsx`
- `packages/react-data-table/src/pagination/index.ts`
- `packages/react-data-table/src/preferences.ts`
- `packages/react-data-table/src/toolbar/ActionButtons.tsx`
- `packages/react-data-table/src/toolbar/index.ts`
- `packages/react-data-table/src/toolbar/SearchField.tsx`
- `packages/react-data-table/src/types.ts`
- `packages/react-data-table/src/use-auto-fit-column.ts`
- `packages/react-data-table/src/use-column-filter.ts`
- `packages/react-data-table/src/use-column-resize.ts`
- `packages/react-data-table/src/use-controllable-state.ts`
- `packages/react-data-table/src/use-data-table.ts`
- `packages/react-data-table/src/use-keyboard-grid-nav.ts`
- `packages/react-data-table/src/utils/announce.tsx`
- `packages/react-data-table/src/utils/columns.ts`
- `packages/react-data-table/src/utils/compose-refs.ts`
- `packages/react-data-table/src/utils/css-vars.ts`
- `packages/react-data-table/src/utils/data-attrs.ts`
- `packages/react-data-table/src/utils/measure-cell.ts`
- `packages/react-data-table/src/utils/scroll-sync.ts`
- `packages/react-data-table/src/utils/sticky.ts`
- `packages/react-data-table/src/utils/use-scroll-drag.ts`
- `packages/react-data-table/src/utils/use-sticky-stack.ts`
- `packages/react-data-table/src/views/Board.tsx`
- `packages/react-data-table/src/views/index.ts`
- `packages/react-data-table/src/views/List.tsx`
- `packages/react-data-table/src/views/ViewModeToggle.tsx`
- `packages/react-data-table/src/views/Views.tsx`
- `packages/react-data-table/src/virtualizer.ts`
- `packages/react-data-table/package.json`
