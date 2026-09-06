import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  GroupingState,
  PaginationState,
  RowPinningState,
  RowSelectionState,
  SortingState,
  Table,
  Updater,
  VisibilityState,
} from "@tanstack/react-table";

import { resolveUpdater, useControllableState } from "./use-controllable-state";
import type { DataTableOptions } from "./types";

export function useDataTable<TData, TValue = unknown>(
  options: DataTableOptions<TData, TValue>,
): Table<TData> {
  const {
    columns,
    data,
    mode = "client",
    columnResizeMode = "onChange",
    rowCount,
    sorting,
    defaultSorting,
    onSortingChange,
    columnFilters,
    defaultColumnFilters,
    onColumnFiltersChange,
    globalFilter,
    defaultGlobalFilter,
    onGlobalFilterChange,
    rowSelection,
    defaultRowSelection,
    onRowSelectionChange,
    columnSizing,
    defaultColumnSizing,
    onColumnSizingChange,
    columnOrder,
    defaultColumnOrder,
    onColumnOrderChange,
    columnPinning,
    defaultColumnPinning,
    onColumnPinningChange,
    columnVisibility,
    defaultColumnVisibility,
    onColumnVisibilityChange,
    pagination,
    defaultPagination,
    onPaginationChange,
    grouping,
    defaultGrouping,
    onGroupingChange,
    expanded,
    defaultExpanded,
    onExpandedChange,
    rowPinning,
    defaultRowPinning,
    onRowPinningChange,
  } = options;

  const [sortingState, setSorting] = useControllableState<SortingState>({
    value: sorting,
    defaultValue: defaultSorting ?? [],
    onChange: onSortingChange,
  });
  const [columnFiltersState, setColumnFilters] =
    useControllableState<ColumnFiltersState>({
      value: columnFilters,
      defaultValue: defaultColumnFilters ?? [],
      onChange: onColumnFiltersChange,
    });
  const [globalFilterState, setGlobalFilter] = useControllableState<string>({
    value: globalFilter,
    defaultValue: defaultGlobalFilter ?? "",
    onChange: onGlobalFilterChange,
  });
  const [rowSelectionState, setRowSelection] =
    useControllableState<RowSelectionState>({
      value: rowSelection,
      defaultValue: defaultRowSelection ?? {},
      onChange: onRowSelectionChange,
    });
  const [columnSizingState, setColumnSizing] =
    useControllableState<ColumnSizingState>({
      value: columnSizing,
      defaultValue: defaultColumnSizing ?? {},
      onChange: onColumnSizingChange,
    });
  const [columnOrderState, setColumnOrder] =
    useControllableState<ColumnOrderState>({
      value: columnOrder,
      defaultValue: defaultColumnOrder ?? [],
      onChange: onColumnOrderChange,
    });
  const [columnPinningState, setColumnPinning] =
    useControllableState<ColumnPinningState>({
      value: columnPinning,
      defaultValue: defaultColumnPinning ?? { left: [], right: [] },
      onChange: onColumnPinningChange,
    });
  const [columnVisibilityState, setColumnVisibility] =
    useControllableState<VisibilityState>({
      value: columnVisibility,
      defaultValue: defaultColumnVisibility ?? {},
      onChange: onColumnVisibilityChange,
    });
  const [paginationState, setPagination] = useControllableState<PaginationState>({
    value: pagination,
    defaultValue: defaultPagination ?? { pageIndex: 0, pageSize: 10 },
    onChange: onPaginationChange,
  });
  const [groupingState, setGrouping] = useControllableState<GroupingState>({
    value: grouping,
    defaultValue: defaultGrouping ?? [],
    onChange: onGroupingChange,
  });
  const [expandedState, setExpanded] = useControllableState<ExpandedState>({
    value: expanded,
    defaultValue: defaultExpanded ?? {},
    onChange: onExpandedChange,
  });
  const [rowPinningState, setRowPinning] =
    useControllableState<RowPinningState>({
      value: rowPinning,
      defaultValue: defaultRowPinning ?? { top: [], bottom: [] },
      onChange: onRowPinningChange,
    });

  const bridgeWithPrev = <T,>(
    setter: (next: T) => void,
    current: T,
  ) => (updater: Updater<T>) => setter(resolveUpdater(updater, current));

  const isServer = mode === "server";

  return useReactTable<TData>({
    data,
    columns,
    state: {
      sorting: sortingState,
      columnFilters: columnFiltersState,
      globalFilter: globalFilterState,
      rowSelection: rowSelectionState,
      columnSizing: columnSizingState,
      columnOrder: columnOrderState,
      columnPinning: columnPinningState,
      columnVisibility: columnVisibilityState,
      pagination: paginationState,
      grouping: groupingState,
      expanded: expandedState,
      rowPinning: rowPinningState,
    },
    columnResizeMode,
    enableColumnResizing: true,
    enableRowSelection: true,
    enableSorting: true,
    enableMultiSort: true,
    enableGrouping: true,
    enableExpanding: true,
    enableRowPinning: true,
    enableColumnPinning: true,
    rowCount,
    manualSorting: isServer,
    manualFiltering: isServer,
    manualPagination: isServer,
    manualGrouping: isServer,

    onSortingChange: bridgeWithPrev(setSorting, sortingState),
    onColumnFiltersChange: bridgeWithPrev(setColumnFilters, columnFiltersState),
    onGlobalFilterChange: bridgeWithPrev(setGlobalFilter, globalFilterState),
    onRowSelectionChange: bridgeWithPrev(setRowSelection, rowSelectionState),
    onColumnSizingChange: bridgeWithPrev(setColumnSizing, columnSizingState),
    onColumnOrderChange: bridgeWithPrev(setColumnOrder, columnOrderState),
    onColumnPinningChange: bridgeWithPrev(setColumnPinning, columnPinningState),
    onColumnVisibilityChange: bridgeWithPrev(
      setColumnVisibility,
      columnVisibilityState,
    ),
    onPaginationChange: bridgeWithPrev(setPagination, paginationState),
    onGroupingChange: bridgeWithPrev(setGrouping, groupingState),
    onExpandedChange: bridgeWithPrev(setExpanded, expandedState),
    onRowPinningChange: bridgeWithPrev(setRowPinning, rowPinningState),

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: isServer ? undefined : getSortedRowModel(),
    getFilteredRowModel: isServer ? undefined : getFilteredRowModel(),
    getPaginationRowModel: isServer ? undefined : getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: isServer ? undefined : getGroupedRowModel(),
    getFacetedRowModel: isServer ? undefined : getFacetedRowModel(),
    getFacetedUniqueValues: isServer ? undefined : getFacetedUniqueValues(),
  });
}
