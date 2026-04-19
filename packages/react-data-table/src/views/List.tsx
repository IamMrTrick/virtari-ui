import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@virtari-packages/utils";

import { useDataTableContext } from "../DataTableContext";
import { boolAttr } from "../utils/data-attrs";

/** Compact vertical-list view — first column is the primary line, the rest
 * are secondary inline fields. Good for mobile or narrow layouts. */
export interface DataTableListProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  renderItem?: (row: Row<unknown>, index: number) => ReactNode;
  emptyMessage?: ReactNode;
  skipColumns?: string[];
}

export const DataTableListView = forwardRef<HTMLDivElement, DataTableListProps>(
  function DataTableListView(
    { className, renderItem, emptyMessage, skipColumns = [], ...props },
    ref,
  ) {
    const { table } = useDataTableContext();
    const rows = table.getRowModel().rows as Row<unknown>[];

    if (rows.length === 0 && emptyMessage) {
      return (
        <div
          ref={ref}
          role="status"
          className={cn(
            "vds-data-table-list",
            "vds-data-table-list-empty",
            className,
          )}
          {...props}
        >
          {emptyMessage}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="list"
        className={cn("vds-data-table-list", className)}
        {...props}
      >
        {rows.map((row, i) =>
          renderItem ? (
            renderItem(row, i)
          ) : (
            <DataTableListItem
              key={row.id}
              row={row}
              skipColumns={skipColumns}
            />
          ),
        )}
      </div>
    );
  },
);

function DataTableListItem({
  row,
  skipColumns,
}: {
  row: Row<unknown>;
  skipColumns: string[];
}) {
  const { table } = useDataTableContext();
  const columns = table
    .getVisibleLeafColumns()
    .filter((c) => !skipColumns.includes(c.id));
  if (columns.length === 0) return null;
  const [primary, ...rest] = columns;
  const selected = row.getIsSelected();
  const primaryCell = primary
    ? row.getVisibleCells().find((c) => c.column.id === primary.id)
    : undefined;

  return (
    <div
      role="listitem"
      data-selected={boolAttr(selected)}
      data-row-id={row.id}
      aria-selected={selected || undefined}
      className="vds-data-table-list-item"
    >
      {primary && primaryCell && (
        <div className="vds-data-table-list-primary">
          {flexRender(primary.columnDef.cell, primaryCell.getContext())}
        </div>
      )}
      {rest.length > 0 && (
        <div className="vds-data-table-list-secondary">
          {rest.map((column) => {
            const cell = row
              .getVisibleCells()
              .find((c) => c.column.id === column.id);
            if (!cell) return null;
            return (
              <span key={column.id} className="vds-data-table-list-field">
                {flexRender(column.columnDef.cell, cell.getContext())}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
