import { useCallback, useMemo } from "react";
import type { Column } from "@tanstack/react-table";

import { useDataTableContext } from "./DataTableContext";

export interface UseColumnFilterResult<T> {
  value: T | undefined;
  setValue: (next: T | undefined) => void;
  clear: () => void;
  isActive: boolean;
}

/**
 * Thin wrapper over `column.getFilterValue()` / `setFilterValue()` that
 * provides a typed interface, a clear helper, and an `isActive` flag.
 */
export function useColumnFilter<T, TData = unknown, TValue = unknown>(
  column: Column<TData, TValue>,
): UseColumnFilterResult<T> {
  /* Side-effect: ensure the column has a filterFn when used via this hook.
   * TanStack will no-op if column.columnDef.filterFn is not set; consumers
   * should declare it on their columnDef. We can't mutate options here. */
  useDataTableContext();

  const value = column.getFilterValue() as T | undefined;

  const setValue = useCallback(
    (next: T | undefined) => {
      column.setFilterValue(next);
    },
    [column],
  );

  const clear = useCallback(() => {
    column.setFilterValue(undefined);
  }, [column]);

  const isActive =
    value !== undefined &&
    value !== "" &&
    !(Array.isArray(value) && value.length === 0);

  return useMemo(
    () => ({ value, setValue, clear, isActive }),
    [value, setValue, clear, isActive],
  );
}
