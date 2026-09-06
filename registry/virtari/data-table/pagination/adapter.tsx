import type { CSSProperties, ReactNode } from "react";
import {
  Pagination,
  type PaginationSize,
} from "../../pagination";
import { cn } from "../../../lib/utils";

import { useDataTableContext } from "../DataTableContext";
import { stickyAttr } from "../utils/sticky";
import type { DataTableStickyMode } from "../utils/sticky";

export interface DataTablePaginationProps {
  className?: string;
  sticky?: DataTableStickyMode;
  stickyOffset?: CSSProperties["bottom"];
  pageSizeOptions?: number[];
  siblingCount?: number;
  size?: PaginationSize;
  hidePageSize?: boolean;
  hidePageNumbers?: boolean;
  hideInfo?: boolean;
  children?: ReactNode;
}

/**
 * Adapter that wires the new `@virtari-packages/react-pagination` compound to
 * the TanStack Table state held inside DataTableContext.
 */
export function DataTablePagination({
  className,
  sticky = false,
  stickyOffset,
  pageSizeOptions,
  siblingCount,
  size,
  hidePageSize,
  hidePageNumbers,
  hideInfo,
  children,
}: DataTablePaginationProps) {
  const { table, rowCount, mode, size: tableSize } = useDataTableContext();
  const { pageIndex, pageSize } = table.getState().pagination;
  const total =
    mode === "server"
      ? (rowCount ?? 0)
      : table.getFilteredRowModel().rows.length;
  const resolvedSize = size ?? tableSize;

  const style =
    stickyOffset === undefined
      ? undefined
      : ({
          ["--vds-sticky-offset-bottom" as string]: stickyOffset,
        } as CSSProperties);

  return (
    <Pagination.Default
      page={pageIndex}
      pageSize={pageSize}
      total={total}
      siblingCount={siblingCount}
      pageSizeOptions={pageSizeOptions}
      size={resolvedSize}
      onPageChange={(p) => table.setPageIndex(p)}
      onPageSizeChange={(s) =>
        table.setPagination((prev) => ({
          ...prev,
          pageIndex: 0,
          pageSize: s,
        }))
      }
      hidePageSize={hidePageSize}
      hidePageNumbers={hidePageNumbers}
      hideInfo={hideInfo}
      className={cn("vds-data-table-pagination", className)}
      data-sticky={stickyAttr(sticky)}
      data-sticky-axis="bottom"
      style={style}
    >
      {children}
    </Pagination.Default>
  );
}
