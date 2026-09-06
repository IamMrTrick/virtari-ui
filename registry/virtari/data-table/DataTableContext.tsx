import { createContext, useContext, useId, useMemo, useRef } from "react";
import type { MutableRefObject, ReactNode } from "react";
import type { Row, Table } from "@tanstack/react-table";

import type {
  DataTableBorderMode,
  DataTableInteractionMode,
  DataTableMode,
  DataTableServerRequestState,
  DataTableSize,
  DataTableViewMode,
  DataTableVirtualizationOptions,
} from "./types";

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

const DataTableCtx = createContext<DataTableContextValue<unknown> | null>(null);

export interface DataTableProviderProps<TData>
  extends Omit<DataTableContextValue<TData>, "tableId" | "scrollRef"> {
  id?: string;
  children: ReactNode;
}

export function DataTableProvider<TData>({
  id,
  children,
  ...rest
}: DataTableProviderProps<TData>) {
  const autoId = useId();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const tableState = rest.table.getState();
  const value = useMemo<DataTableContextValue<TData>>(
    () => ({
      ...rest,
      tableId: id ?? `vds-data-table-${autoId}`,
      scrollRef,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      rest.table,
      rest.size,
      rest.interactionMode,
      rest.bordered,
      rest.striped,
      rest.stickyHeader,
      rest.mode,
      rest.virtualization,
      rest.columnResizeMode,
      rest.rowCount,
      rest.viewMode,
      rest.setViewMode,
      rest.onCellEdit,
      rest.onDataRequest,
      tableState.sorting,
      tableState.columnFilters,
      tableState.globalFilter,
      tableState.rowSelection,
      tableState.columnSizing,
      tableState.columnSizingInfo,
      tableState.columnOrder,
      tableState.columnPinning,
      tableState.columnVisibility,
      tableState.pagination,
      tableState.grouping,
      tableState.expanded,
      tableState.rowPinning,
      id,
      autoId,
    ],
  );

  return (
    <DataTableCtx.Provider value={value as DataTableContextValue<unknown>}>
      {children}
    </DataTableCtx.Provider>
  );
}

export function useDataTableContext<TData = unknown>(): DataTableContextValue<
  TData
> {
  const ctx = useContext(DataTableCtx);
  if (!ctx) {
    throw new Error(
      "useDataTableContext must be used inside <DataTable.Root>.",
    );
  }
  return ctx as DataTableContextValue<TData>;
}
