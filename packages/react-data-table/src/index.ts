/* Namespace export — `<DataTable.Root>`, `<DataTable.Header>`, … */
export { DataTable } from "./DataTableNamespace";

/* Individual component exports (tree-shake friendly) */
export {
  DataTableBody,
  DataTableCell,
  DataTableColumnGuide,
  DataTableColumnVisibility,
  DataTableEmpty,
  DataTableFooter,
  DataTableFooterCell,
  DataTableFooterRow,
  DataTableGlobalFilter,
  DataTableGroupHeaderRow,
  DataTableHeader,
  DataTableHeaderCell,
  DataTableHeaderGroup,
  DataTableLoadingOverlay,
  DataTablePinColumnTrigger,
  DataTableResizeHandle,
  DataTableRoot,
  DataTableRow,
  DataTableRowExpandTrigger,
  DataTableRowPinTrigger,
  DataTableRowSelectCheckbox,
  DataTableScrollArea,
  DataTableSelectAllCheckbox,
  DataTableSortTrigger,
  DataTableTable,
  DataTableToolbar,
} from "./DataTable";

export type {
  DataTableBodyProps,
  DataTableCellProps,
  DataTableColumnVisibilityProps,
  DataTableEmptyProps,
  DataTableFooterCellProps,
  DataTableFooterProps,
  DataTableFooterRowProps,
  DataTableGlobalFilterProps,
  DataTableGroupHeaderRowProps,
  DataTableHeaderCellProps,
  DataTableHeaderGroupProps,
  DataTableHeaderProps,
  DataTableLoadingOverlayProps,
  DataTablePinColumnTriggerProps,
  DataTableResizeHandleProps,
  DataTableRootProps,
  DataTableRowExpandTriggerProps,
  DataTableRowPinTriggerProps,
  DataTableRowProps,
  DataTableRowSelectCheckboxProps,
  DataTableScrollAreaProps,
  DataTableSelectAllCheckboxProps,
  DataTableSortTriggerProps,
  DataTableTableProps,
  DataTableToolbarProps,
} from "./DataTable";

/* Views (table / board / list) */
export {
  DataTableBoard,
  DataTableListView,
  DataTableViewModeToggle,
  DataTableViews,
} from "./views";
export type {
  DataTableBoardProps,
  DataTableListProps,
  DataTableViewModeToggleProps,
  DataTableViewsProps,
} from "./views";

/* Bulk actions */
export {
  BulkActions,
  DataTableBulkActions,
  DataTableBulkClear,
  DataTableBulkCount,
  DataTableSelectAllAcrossPages,
} from "./bulk";
export type {
  DataTableBulkActionsProps,
  DataTableBulkClearProps,
  DataTableBulkCountProps,
  DataTableSelectAllAcrossPagesProps,
} from "./bulk";

/* Toolbar action buttons */
export {
  DataTableAddButton,
  DataTableCloseButton,
  DataTableCustomizeButton,
  DataTableDeleteButton,
  DataTableExportButton,
  DataTableFilterButton,
  DataTableHideColumnsButton,
  DataTableRefreshButton,
  DataTableResetLayoutButton,
  DataTableSearchIcon,
  ToolbarActionButton,
} from "./toolbar";
export type { ToolbarActionButtonProps } from "./toolbar";

/* Cell primitives */
export {
  ActionsCell,
  AvatarCell,
  BadgeCell,
  Cells,
  CopyableCell,
  DateCell,
  LinkCell,
  NumberCell,
  StatusBadgeCell,
  TextCell,
} from "./cells";
export type {
  ActionItem,
  ActionsCellProps,
  AvatarCellProps,
  BadgeCellProps,
  CopyableCellProps,
  DateCellProps,
  DateFormat,
  LinkCellProps,
  NumberCellProps,
  NumberFormat,
  StatusBadgeCellProps,
  StatusTone,
  TextCellProps,
} from "./cells";

/* Filter drawer (advanced multi-condition) */
export {
  countConditions,
  DataTableFilterDrawer,
  FilterConfigPanel,
} from "./filter-drawer";
export type {
  ComparisonOperator,
  DataTableFilterDrawerProps,
  FilterCondition,
  FilterConfigPanelProps,
  FilterFieldDefinition,
  FilterFieldType,
  FilterGroup,
  FilterLogicOperator,
} from "./filter-drawer";

/* Pagination compound */
export {
  Pagination,
  PaginationDefault,
  PaginationInfo,
  PaginationNext,
  PaginationPageSize,
  PaginationPages,
  PaginationPrev,
  PaginationRoot,
} from "./pagination";
export type {
  PaginationButtonProps,
  PaginationDefaultProps,
  PaginationInfoProps,
  PaginationPageSizeProps,
  PaginationPagesProps,
  PaginationRootProps,
} from "./pagination";

/* Filters compound (per-column, in header) */
export {
  DateFilter,
  FilterPopover,
  Filters,
  NumberFilter,
  SelectFilter,
  TextFilter,
} from "./filters";
export type {
  DateFilterProps,
  DateRange,
  FilterPopoverProps,
  NumberFilterProps,
  NumberRange,
  SelectFilterOption,
  SelectFilterProps,
  TextFilterProps,
} from "./filters";

/* Editing */
export { CellEditor, EditableCell, useCellEdit } from "./editing";
export type {
  CellEditorMode,
  CellEditorProps,
  EditableCellProps,
  UseCellEditOptions,
  UseCellEditResult,
} from "./editing";

/* Hooks */
export { useDataTable } from "./use-data-table";
export {
  useDataTableContext,
  type DataTableContextValue,
} from "./DataTableContext";
export {
  useControllableState,
  resolveUpdater,
} from "./use-controllable-state";
export { useColumnResize } from "./use-column-resize";
export type { UseColumnResizeResult } from "./use-column-resize";
export { useAutoFitColumn } from "./use-auto-fit-column";
export type { UseAutoFitColumnResult } from "./use-auto-fit-column";
export { useColumnFilter } from "./use-column-filter";
export type { UseColumnFilterResult } from "./use-column-filter";
export { useDataTableVirtualizer } from "./virtualizer";
export type { UseDataTableVirtualizerOptions } from "./virtualizer";

/* Package-owned types */
export type {
  ControlledPair,
  DataTableBaseOptions,
  DataTableBorderMode,
  DataTableInteractionMode,
  DataTableMode,
  DataTableOptions,
  DataTableInstance,
  DataTableServerRequestState,
  DataTableSize,
  DataTableStatePairs,
  DataTableViewMode,
  DataTableVirtualizationOptions,
} from "./types";

/* Utility re-exports */
export { createColumnHelper, flexRender } from "./utils/columns";
export { buildColumnSizeVars, columnVar } from "./utils/css-vars";

/* TanStack re-exports (so consumers don't need a second import) */
export type {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  GroupingState,
  Header,
  HeaderGroup,
  PaginationState,
  Row,
  RowPinningState,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
} from "@tanstack/react-table";
