import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@virtari-packages/utils";

import { useDataTableContext } from "../DataTableContext";
import { boolAttr } from "../utils/data-attrs";

/** Card-grid view — each row renders as a card with label:value pairs. */
export interface DataTableBoardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Override card rendering per row. */
  renderCard?: (row: Row<unknown>, index: number) => ReactNode;
  emptyMessage?: ReactNode;
  /** Hide columns in this list when rendering cards (e.g. `["__select","actions"]`). */
  skipColumns?: string[];
}

export const DataTableBoard = forwardRef<HTMLDivElement, DataTableBoardProps>(
  function DataTableBoard(
    { className, renderCard, emptyMessage, skipColumns = [], ...props },
    ref,
  ) {
    const { table } = useDataTableContext();
    const rows = table.getRowModel().rows as Row<unknown>[];
    const visibleColumns = table
      .getVisibleLeafColumns()
      .filter((c) => !skipColumns.includes(c.id));

    if (rows.length === 0 && emptyMessage) {
      return (
        <div
          ref={ref}
          role="status"
          className={cn("vds-data-table-board", "vds-data-table-board-empty", className)}
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
        className={cn("vds-data-table-board", className)}
        {...props}
      >
        {rows.map((row, i) =>
          renderCard ? (
            renderCard(row, i)
          ) : (
            <DataTableBoardCard key={row.id} row={row} skipColumns={skipColumns} />
          ),
        )}
      </div>
    );
  },
);

function DataTableBoardCard({
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
  const selected = row.getIsSelected();
  return (
    <article
      role="listitem"
      data-row-id={row.id}
      aria-selected={selected || undefined}
      className="vds-data-table-board-card"
    >
      {columns.map((column) => {
        const cell = row
          .getVisibleCells()
          .find((c) => c.column.id === column.id);
        if (!cell) return null;
        /* Guard: header may be a function (e.g. `() => <SelectAllCheckbox/>`).
         * Stringifying a function leaks its source code into the DOM. Fall
         * back to the column id when the header isn't a plain string. */
        const headerDef = column.columnDef.header;
        const label =
          typeof headerDef === "string" ? headerDef : column.id;
        return (
          <div key={column.id} className="vds-data-table-board-field">
            <div className="vds-data-table-board-label">{label}</div>
            <div className="vds-data-table-board-value">
              {flexRender(column.columnDef.cell, cell.getContext())}
            </div>
          </div>
        );
      })}
    </article>
  );
}
