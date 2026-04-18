import { useEffect, useMemo, useRef, useState } from "react";
import type { Table } from "@tanstack/react-table";

/**
 * Visually-hidden `aria-live="polite"` region that announces sort,
 * filter, and selection state changes to screen readers.
 *
 * Must be rendered as a child of the root to share the same focus region.
 */
export function useSrAnnouncements<TData>(table: Table<TData>): string {
  const [message, setMessage] = useState<string>("");
  const lastSorted = useRef<string>("");
  const lastFilterCount = useRef<number>(0);
  const lastSelectedCount = useRef<number>(0);

  const sorting = table.getState().sorting;
  const columnFilters = table.getState().columnFilters;
  const globalFilter = (table.getState().globalFilter as string) ?? "";
  const selectedCount = table.getSelectedRowModel().rows.length;

  /* Memo the active filter description string. */
  const filterCount = useMemo(
    () =>
      columnFilters.filter((f) => f.value !== undefined && f.value !== "").length +
      (globalFilter ? 1 : 0),
    [columnFilters, globalFilter],
  );

  useEffect(() => {
    const key = sorting
      .map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`)
      .join(",");
    if (key === lastSorted.current) return;
    lastSorted.current = key;
    if (!key) setMessage("Sorting cleared.");
    else {
      const first = sorting[0]!;
      const rest = sorting.length > 1 ? `, plus ${sorting.length - 1} more` : "";
      setMessage(
        `Sorted by ${first.id}, ${first.desc ? "descending" : "ascending"}${rest}.`,
      );
    }
  }, [sorting]);

  useEffect(() => {
    if (filterCount === lastFilterCount.current) return;
    lastFilterCount.current = filterCount;
    const rows = table.getFilteredRowModel().rows.length;
    if (filterCount === 0) setMessage("Filters cleared.");
    else setMessage(`${filterCount} filter${filterCount === 1 ? "" : "s"} active. ${rows} result${rows === 1 ? "" : "s"}.`);
  }, [filterCount, table]);

  useEffect(() => {
    if (selectedCount === lastSelectedCount.current) return;
    lastSelectedCount.current = selectedCount;
    if (selectedCount === 0) setMessage("Selection cleared.");
    else
      setMessage(
        `${selectedCount} row${selectedCount === 1 ? "" : "s"} selected.`,
      );
  }, [selectedCount]);

  return message;
}
