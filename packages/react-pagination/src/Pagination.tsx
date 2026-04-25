import { forwardRef, useCallback, useId, useMemo } from "react";
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@virtari-packages/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@virtari-packages/react-select";
import type { SelectSize } from "@virtari-packages/react-select";
import { IconChevronLeft, IconChevronRight } from "@virtari-packages/react-icons";

import {
  PaginationContext,
  usePaginationContext,
  type PaginationSize,
} from "./context";
import { computePageRange } from "./use-pagination";

/* ────────────────────────────────────────────────────────────
 * Root
 * ──────────────────────────────────────────────────────────── */

export interface PaginationRootProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  siblingCount?: number;
  size?: PaginationSize;
}

export const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>(
  function PaginationRoot(
    {
      page,
      pageSize,
      total,
      onPageChange,
      onPageSizeChange,
      pageSizeOptions = [10, 25, 50, 100],
      siblingCount = 5,
      size = "sm",
      className,
      children,
      ...props
    },
    ref,
  ) {
    const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
    const clampedPage = Math.max(0, Math.min(page, pageCount - 1));
    const canPrev = clampedPage > 0;
    const canNext = clampedPage < pageCount - 1;

    const setPage = useCallback(
      (next: number) => {
        const clamped = Math.max(0, Math.min(next, pageCount - 1));
        if (clamped !== clampedPage) onPageChange(clamped);
      },
      [clampedPage, pageCount, onPageChange],
    );

    const setPageSize = useCallback(
      (next: number) => {
        if (!Number.isFinite(next) || next <= 0) return;
        onPageSizeChange?.(next);
      },
      [onPageSizeChange],
    );

    const value = useMemo(
      () => ({
        page: clampedPage,
        pageSize,
        total,
        pageCount,
        pageSizeOptions,
        siblingCount,
        size,
        canPrev,
        canNext,
        setPage,
        setPageSize,
      }),
      [
        clampedPage,
        pageSize,
        total,
        pageCount,
        pageSizeOptions,
        siblingCount,
        size,
        canPrev,
        canNext,
        setPage,
        setPageSize,
      ],
    );

    return (
      <PaginationContext.Provider value={value}>
        <nav
          ref={ref}
          role="navigation"
          aria-label="Pagination"
          data-size={size}
          className={cn("vds-pagination", className)}
          {...props}
        >
          {children}
        </nav>
      </PaginationContext.Provider>
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * Info — "{start}–{end} of {total}"
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
    const { page, pageSize, total } = usePaginationContext();
    const start = total === 0 ? 0 : page * pageSize + 1;
    const end = Math.min(total, (page + 1) * pageSize);
    return (
      <div
        ref={ref}
        className={cn("vds-pagination-info", className)}
        {...props}
      >
        {renderLabel ? (
          renderLabel({ start, end, total })
        ) : (
          <>
            <span dir="ltr">
              {start}–{end}
            </span>{" "}
            of <span dir="ltr">{total}</span>
          </>
        )}
      </div>
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * Prev / Next
 * ──────────────────────────────────────────────────────────── */

export interface PaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PaginationPrev = forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(function PaginationPrev({ className, children, onClick, ...props }, ref) {
  const { page, canPrev, setPage } = usePaginationContext();
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Previous page"
      disabled={!canPrev}
      className={cn("vds-pagination-button", "vds-pagination-prev", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setPage(page - 1);
      }}
      {...props}
    >
      {children ?? (
        <>
          <IconChevronLeft
            size={16}
            className="vds-pagination-chevron"
            aria-hidden="true"
          />
          <span className="vds-pagination-button-label">Previous</span>
        </>
      )}
    </button>
  );
});

export const PaginationNext = forwardRef<
  HTMLButtonElement,
  PaginationButtonProps
>(function PaginationNext({ className, children, onClick, ...props }, ref) {
  const { page, canNext, setPage } = usePaginationContext();
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Next page"
      disabled={!canNext}
      className={cn("vds-pagination-button", "vds-pagination-next", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setPage(page + 1);
      }}
      {...props}
    >
      {children ?? (
        <>
          <span className="vds-pagination-button-label">Next</span>
          <IconChevronRight
            size={16}
            className="vds-pagination-chevron"
            aria-hidden="true"
          />
        </>
      )}
    </button>
  );
});

/* ────────────────────────────────────────────────────────────
 * PageSize — <Select> wrapper
 * ──────────────────────────────────────────────────────────── */

export interface PaginationPageSizeProps {
  options?: number[];
  className?: string;
  label?: ReactNode;
  size?: SelectSize;
}

export function PaginationPageSize({
  options,
  className,
  label = "Rows per page",
  size,
}: PaginationPageSizeProps) {
  const {
    pageSize,
    pageSizeOptions,
    setPageSize,
    size: rootSize,
  } = usePaginationContext();
  const labelId = useId();
  const effectiveOptions = options ?? pageSizeOptions;
  const effectiveSize = (size ?? rootSize) as SelectSize;
  return (
    <div className={cn("vds-pagination-page-size", className)}>
      <span id={labelId} className="vds-pagination-page-size-label">
        {label}
      </span>
      <Select
        value={String(pageSize)}
        onValueChange={(v) => {
          const n = Number(v);
          if (Number.isFinite(n)) setPageSize(n);
        }}
      >
        <SelectTrigger
          size={effectiveSize}
          aria-labelledby={labelId}
          className="vds-pagination-page-size-trigger"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {effectiveOptions.map((n) => (
            <SelectItem key={n} value={String(n)}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Pages — numbered buttons with ellipsis
 * ──────────────────────────────────────────────────────────── */

export interface PaginationPagesProps {
  className?: string;
  siblingCount?: number;
}

export function PaginationPages({
  className,
  siblingCount,
}: PaginationPagesProps) {
  const {
    page,
    pageCount,
    siblingCount: rootSibling,
    setPage,
  } = usePaginationContext();
  const items = computePageRange(page, pageCount, siblingCount ?? rootSibling);
  return (
    <ul
      dir="ltr"
      className={cn("vds-pagination-pages", className)}
    >
      {items.map((it, i) =>
        typeof it === "number" ? (
          <li key={`p-${it}`}>
            <button
              type="button"
              aria-label={`Page ${it + 1}`}
              aria-current={it === page ? "page" : undefined}
              data-active={it === page ? "" : undefined}
              className="vds-pagination-page-button"
              onClick={() => setPage(it)}
            >
              {it + 1}
            </button>
          </li>
        ) : (
          <li key={`e-${i}`} aria-hidden="true">
            <span className="vds-pagination-ellipsis">…</span>
          </li>
        ),
      )}
    </ul>
  );
}

/* ────────────────────────────────────────────────────────────
 * Default — opinionated convenience layout
 * ──────────────────────────────────────────────────────────── */

export interface PaginationDefaultProps extends PaginationRootProps {
  hidePageSize?: boolean;
  hidePageNumbers?: boolean;
  hideInfo?: boolean;
}

export function PaginationDefault({
  hidePageSize = false,
  hidePageNumbers = false,
  hideInfo = false,
  children,
  ...rootProps
}: PaginationDefaultProps) {
  return (
    <PaginationRoot {...rootProps}>
      <div className="vds-pagination-meta">
        {!hidePageSize && <PaginationPageSize />}
        {!hideInfo && <PaginationInfo />}
      </div>
      <div className="vds-pagination-controls">
        <PaginationPrev />
        {!hidePageNumbers && <PaginationPages />}
        <PaginationNext />
      </div>
      {children}
    </PaginationRoot>
  );
}
