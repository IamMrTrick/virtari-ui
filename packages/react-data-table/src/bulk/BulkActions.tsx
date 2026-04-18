import { forwardRef } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import type { Row } from "@tanstack/react-table";
import { cn } from "@virtari/utils";

import { useDataTableContext } from "../DataTableContext";

/* ────────────────────────────────────────────────────────────
 * BulkActions — sticky bar shown while rows are selected.
 * ──────────────────────────────────────────────────────────── */

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
  sticky?: boolean;
}

export const DataTableBulkActions = forwardRef<
  HTMLDivElement,
  DataTableBulkActionsProps
>(function DataTableBulkActions(
  {
    children,
    showWhenAllAcrossPagesSelected = true,
    isAllAcrossPagesSelected = false,
    sticky = true,
    className,
    ...props
  },
  ref,
) {
  const { table } = useDataTableContext();
  const selectedRows = table.getSelectedRowModel().rows as Row<unknown>[];
  const selectedCount = selectedRows.length;

  const shouldShow =
    selectedCount > 0 ||
    (showWhenAllAcrossPagesSelected && isAllAcrossPagesSelected);

  if (!shouldShow) return null;

  const clearSelection = () => table.resetRowSelection();

  return (
    <div
      ref={ref}
      role="region"
      aria-label={`Bulk actions, ${selectedCount} selected`}
      data-sticky={sticky ? "" : undefined}
      className={cn("vds-data-table-bulk-actions", className)}
      {...props}
    >
      {typeof children === "function"
        ? children({ selectedRows, selectedCount, clearSelection })
        : (children ?? (
            <DataTableBulkActionsDefault
              selectedRows={selectedRows}
              selectedCount={selectedCount}
              clearSelection={clearSelection}
            />
          ))}
    </div>
  );
});

/* ────────────────────────────────────────────────────────────
 * BulkActions subcomponents — compose your own bar.
 * ──────────────────────────────────────────────────────────── */

export interface DataTableBulkCountProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Override — by default reads from context. */
  count?: number;
  label?: (count: number) => ReactNode;
}

export const DataTableBulkCount = forwardRef<
  HTMLSpanElement,
  DataTableBulkCountProps
>(function DataTableBulkCount({ count, label, className, ...props }, ref) {
  const { table } = useDataTableContext();
  const n = count ?? table.getSelectedRowModel().rows.length;
  return (
    <span
      ref={ref}
      className={cn("vds-data-table-bulk-count", className)}
      {...props}
    >
      {label
        ? label(n)
        : `${n} selected`}
    </span>
  );
});

export interface DataTableBulkClearProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const DataTableBulkClear = forwardRef<
  HTMLButtonElement,
  DataTableBulkClearProps
>(function DataTableBulkClear(
  { children = "Clear", onClick, className, ...props },
  ref,
) {
  const { table } = useDataTableContext();
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) table.resetRowSelection();
      }}
      className={cn("vds-data-table-bulk-clear", className)}
      {...props}
    >
      {children}
    </button>
  );
});

/** Default bar layout — count + clear. Consumers supply their own actions. */
function DataTableBulkActionsDefault({
  selectedCount,
  clearSelection,
}: {
  selectedRows: Row<unknown>[];
  selectedCount: number;
  clearSelection: () => void;
}) {
  return (
    <>
      <DataTableBulkCount count={selectedCount} />
      <button
        type="button"
        onClick={clearSelection}
        className="vds-data-table-bulk-clear"
      >
        Clear
      </button>
    </>
  );
}

/* ────────────────────────────────────────────────────────────
 * SelectAllAcrossPages — banner offering to select all rows
 * across all pages (not just the current page).
 * ──────────────────────────────────────────────────────────── */

export interface DataTableSelectAllAcrossPagesProps {
  /** Total row count across all pages (typically `rowCount` from server). */
  totalCount: number;
  /** External flag — whether cross-page selection is active. */
  isAllAcrossPagesSelected: boolean;
  onSelectAll: () => void;
  onClear: () => void;
  className?: string;
}

export function DataTableSelectAllAcrossPages({
  totalCount,
  isAllAcrossPagesSelected,
  onSelectAll,
  onClear,
  className,
}: DataTableSelectAllAcrossPagesProps) {
  const { table } = useDataTableContext();
  const pageRowCount = table.getRowModel().rows.length;
  const allOnPageSelected =
    pageRowCount > 0 &&
    table.getSelectedRowModel().rows.length === pageRowCount;
  const visible =
    (allOnPageSelected && !isAllAcrossPagesSelected && totalCount > pageRowCount) ||
    isAllAcrossPagesSelected;
  if (!visible) return null;
  return (
    <div
      role="status"
      data-active={isAllAcrossPagesSelected ? "" : undefined}
      className={cn("vds-data-table-select-all-banner", className)}
    >
      {isAllAcrossPagesSelected ? (
        <>
          <span>All {totalCount.toLocaleString()} entries are selected.</span>
          <button
            type="button"
            onClick={onClear}
            className="vds-data-table-select-all-link"
          >
            Clear selection
          </button>
        </>
      ) : (
        <>
          <span>
            All {pageRowCount} items on this page are selected.
          </span>
          <button
            type="button"
            onClick={onSelectAll}
            className="vds-data-table-select-all-link"
          >
            Select all {totalCount.toLocaleString()} entries
          </button>
        </>
      )}
    </div>
  );
}
