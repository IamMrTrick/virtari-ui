import {
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
import { BulkActions } from "./bulk";
import { Cells } from "./cells";
import { EditableCell } from "./editing";
import { DataTableFilterDrawer } from "./filter-drawer";
import { Filters } from "./filters";
import { DataTablePagination } from "./pagination";
import {
  DataTableAddButton,
  DataTableCloseButton,
  DataTableCustomizeButton,
  DataTableDeleteButton,
  DataTableExportButton,
  DataTableFilterButton,
  DataTableHideColumnsButton,
  DataTableMoreButton,
  DataTableRefreshButton,
  DataTableResetLayoutButton,
  DataTableRowAction,
  DataTableSearchButton,
  DataTableSearchField,
  ToolbarActionButton,
} from "./toolbar";
import { DataTableFilterBar, DataTableFilterChipItem } from "./filter-bar";
import {
  DataTableBoard,
  DataTableListView,
  DataTableViewModeToggle,
  DataTableViews,
} from "./views";

export const DataTable = {
  Root: DataTableRoot,

  /* Layout */
  Toolbar: DataTableToolbar,
  ScrollArea: DataTableScrollArea,

  /* Table view */
  Table: DataTableTable,
  Header: DataTableHeader,
  HeaderGroup: DataTableHeaderGroup,
  HeaderCell: DataTableHeaderCell,
  SortTrigger: DataTableSortTrigger,
  ResizeHandle: DataTableResizeHandle,
  ColumnGuide: DataTableColumnGuide,
  PinColumnTrigger: DataTablePinColumnTrigger,
  Body: DataTableBody,
  Row: DataTableRow,
  Cell: DataTableCell,
  EditableCell,
  GroupHeaderRow: DataTableGroupHeaderRow,
  RowExpandTrigger: DataTableRowExpandTrigger,
  RowPinTrigger: DataTableRowPinTrigger,
  Footer: DataTableFooter,
  FooterRow: DataTableFooterRow,
  FooterCell: DataTableFooterCell,

  /* Selection */
  SelectAllCheckbox: DataTableSelectAllCheckbox,
  RowSelectCheckbox: DataTableRowSelectCheckbox,

  /* Empty / loading */
  Empty: DataTableEmpty,
  LoadingOverlay: DataTableLoadingOverlay,

  /* Views */
  Views: DataTableViews,
  Board: DataTableBoard,
  List: DataTableListView,
  ViewModeToggle: DataTableViewModeToggle,

  /* Toolbar action buttons */
  ActionButton: ToolbarActionButton,
  FilterButton: DataTableFilterButton,
  RefreshButton: DataTableRefreshButton,
  ExportButton: DataTableExportButton,
  AddButton: DataTableAddButton,
  CustomizeButton: DataTableCustomizeButton,
  ResetLayoutButton: DataTableResetLayoutButton,
  HideColumnsButton: DataTableHideColumnsButton,
  DeleteButton: DataTableDeleteButton,
  CloseButton: DataTableCloseButton,
  SearchButton: DataTableSearchButton,
  MoreButton: DataTableMoreButton,
  RowAction: DataTableRowAction,
  SearchField: DataTableSearchField,

  /* Global filter input (simple) */
  GlobalFilter: DataTableGlobalFilter,
  FilterBar: DataTableFilterBar,
  FilterChip: DataTableFilterChipItem,
  /* Column visibility list (simple) */
  ColumnVisibility: DataTableColumnVisibility,

  /* Compounds */
  Pagination: DataTablePagination,
  Filters,
  FilterDrawer: DataTableFilterDrawer,
  BulkActions,
  Cells,
} as const;
