import { forwardRef } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@virtari-packages/utils";

import { useDataTableContext } from "../DataTableContext";

/* ────────────────────────────────────────────────────────────
 * Pagination.Root — <nav> wrapper
 * ──────────────────────────────────────────────────────────── */

export interface PaginationRootProps extends HTMLAttributes<HTMLElement> {}

export const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>(
  function PaginationRoot({ className, children, ...props }, ref) {
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn("vds-data-table-pagination", className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * Pagination.Info — "{start}–{end} of {total}"
 * Uses rowCount (server mode) or table.getFilteredRowModel().rows.length.
 * ──────────────────────────────────────────────────────────── */

export interface PaginationInfoProps extends HTMLAttributes<HTMLDivElement> {
  renderLabel?: (range: {
    start: number;
    end: number;
    total: number;
  }) => ReactNode;
}

export const PaginationInfo = forwardRef<HTMLDivElement, PaginationInfoProps>(
  function PaginationInfo({ className, renderLabel, ...props }, ref) {
    const { table, rowCount, mode } = useDataTableContext();
    const pagination = table.getState().pagination;
    const total =
      mode === "server"
        ? (rowCount ?? 0)
        : table.getFilteredRowModel().rows.length;
    const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
    const end = Math.min(
      total,
      (pagination.pageIndex + 1) * pagination.pageSize,
    );
    return (
      <div
        ref={ref}
        className={cn("vds-data-table-pagination-info", className)}
        {...props}
      >
        {renderLabel
          ? renderLabel({ start, end, total })
          : `${start}–${end} of ${total}`}
      </div>
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * Pagination.Prev / Pagination.Next
 * ──────────────────────────────────────────────────────────── */

export interface PaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PaginationPrev = forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(function PaginationPrev(
  { className, children = "Previous", onClick, ...props },
  ref,
) {
  const { table } = useDataTableContext();
  const canPrev = table.getCanPreviousPage();
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Previous page"
      disabled={!canPrev}
      className={cn("vds-data-table-pagination-button", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) table.previousPage();
      }}
      {...props}
    >
      {children}
    </button>
  );
});

export const PaginationNext = forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(function PaginationNext(
  { className, children = "Next", onClick, ...props },
  ref,
) {
  const { table } = useDataTableContext();
  const canNext = table.getCanNextPage();
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Next page"
      disabled={!canNext}
      className={cn("vds-data-table-pagination-button", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) table.nextPage();
      }}
      {...props}
    >
      {children}
    </button>
  );
});

/* ────────────────────────────────────────────────────────────
 * Pagination.PageSize — native <select>
 * ──────────────────────────────────────────────────────────── */

export interface PaginationPageSizeProps {
  options?: number[];
  className?: string;
  label?: ReactNode;
}

export function PaginationPageSize({
  options = [10, 25, 50, 100],
  className,
  label = "Rows per page",
}: PaginationPageSizeProps) {
  const { table } = useDataTableContext();
  const pageSize = table.getState().pagination.pageSize;
  return (
    <label className={cn("vds-data-table-pagination-page-size", className)}>
      <span className="vds-data-table-pagination-page-size-label">{label}</span>
      <select
        className="vds-data-table-pagination-page-size-select"
        value={pageSize}
        onChange={(e) => table.setPageSize(Number(e.target.value))}
      >
        {options.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ────────────────────────────────────────────────────────────
 * Pagination.Pages — numbered page buttons with ellipsis
 * ──────────────────────────────────────────────────────────── */

export interface PaginationPagesProps {
  className?: string;
  /** Max buttons to show; the middle window (default 5). */
  siblingCount?: number;
}

function pageRange(
  current: number,
  total: number,
  siblingCount: number,
): (number | "ellipsis-l" | "ellipsis-r")[] {
  const pages: (number | "ellipsis-l" | "ellipsis-r")[] = [];
  if (total <= siblingCount + 4) {
    for (let i = 0; i < total; i++) pages.push(i);
    return pages;
  }
  const left = Math.max(current - Math.floor(siblingCount / 2), 1);
  const right = Math.min(left + siblingCount - 1, total - 2);
  pages.push(0);
  if (left > 1) pages.push("ellipsis-l");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 2) pages.push("ellipsis-r");
  pages.push(total - 1);
  return pages;
}

export function PaginationPages({
  className,
  siblingCount = 5,
}: PaginationPagesProps) {
  const { table } = useDataTableContext();
  const current = table.getState().pagination.pageIndex;
  const total = table.getPageCount();
  const items = pageRange(current, total, siblingCount);
  return (
    <ul className={cn("vds-data-table-pagination-pages", className)}>
      {items.map((it, i) =>
        typeof it === "number" ? (
          <li key={`p-${it}`}>
            <button
              type="button"
              aria-label={`Page ${it + 1}`}
              aria-current={it === current ? "page" : undefined}
              data-active={it === current ? "" : undefined}
              className="vds-data-table-pagination-page-button"
              onClick={() => table.setPageIndex(it)}
            >
              {it + 1}
            </button>
          </li>
        ) : (
          <li key={`e-${i}`} aria-hidden="true">
            <span className="vds-data-table-pagination-ellipsis">…</span>
          </li>
        ),
      )}
    </ul>
  );
}

/* ────────────────────────────────────────────────────────────
 * Pagination.Default — opinionated convenience:
 *   [Info] ················ [PageSize] [Prev] [Pages] [Next]
 * ──────────────────────────────────────────────────────────── */

export interface PaginationDefaultProps {
  className?: string;
  pageSizeOptions?: number[];
  hidePageSize?: boolean;
  hidePageNumbers?: boolean;
}

export function PaginationDefault({
  className,
  pageSizeOptions,
  hidePageSize = false,
  hidePageNumbers = false,
}: PaginationDefaultProps) {
  return (
    <PaginationRoot className={className}>
      <PaginationInfo />
      <div className="vds-data-table-pagination-controls">
        {!hidePageSize && <PaginationPageSize options={pageSizeOptions} />}
        <PaginationPrev />
        {!hidePageNumbers && <PaginationPages />}
        <PaginationNext />
      </div>
    </PaginationRoot>
  );
}
