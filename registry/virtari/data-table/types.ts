import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  GroupingState,
  PaginationState,
  Row,
  RowPinningState,
  RowSelectionState,
  SortingState,
  Table,
  Updater,
  VisibilityState,
} from "@tanstack/react-table";
import type { CSSProperties, ReactNode } from "react";

export type DataTableSize = "sm" | "md" | "lg";
export type DataTableInteractionMode = "table" | "grid";
export type DataTableBorderMode = "none" | "rows" | "grid";
export type DataTableMode = "client" | "server";
export type DataTableViewMode = "table" | "board" | "list";

export interface DataTableVirtualizationOptions {
  estimateRowSize?: number;
  overscan?: number;
}

export interface ControlledPair<T> {
  value?: T;
  defaultValue?: T;
  onValueChange?: (next: T) => void;
}

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

export interface DataTableServerRequestState {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  pagination: PaginationState;
  grouping: GroupingState;
}

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

export interface DataTableOptions<TData, TValue = unknown>
  extends DataTableBaseOptions,
    DataTableStatePairs {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type DataTableInstance<TData> = Table<TData>;

export type TableUpdater<T> = Updater<T>;
