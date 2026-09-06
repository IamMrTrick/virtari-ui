import { forwardRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Header } from "@tanstack/react-table";
import { cn } from "../../../lib/utils";

import {
  DataTableHeaderCell,
  type DataTableHeaderCellProps,
} from "../DataTable";

export interface DataTableDraggableHeaderCellProps<
  TData = unknown,
  TValue = unknown,
> extends DataTableHeaderCellProps<TData, TValue> {
  /** Optional visual drag handle; if omitted the entire cell is draggable. */
  dragHandle?: ReactNode;
}

export const DataTableDraggableHeaderCell = forwardRef<
  HTMLTableCellElement,
  DataTableDraggableHeaderCellProps
>(function DataTableDraggableHeaderCell(
  { header, className, dragHandle, style, children, ...props },
  ref,
) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: (header as Header<unknown, unknown>).column.id });

  const dragStyle: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition: "transform 150ms cubic-bezier(0,0,0.2,1)",
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 5 : undefined,
    position: isDragging ? "relative" : undefined,
  };

  return (
    <DataTableHeaderCell
      ref={(node) => {
        setNodeRef(node);
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLTableCellElement | null>).current =
            node;
      }}
      header={header}
      className={cn("vds-data-table-header-cell-draggable", className)}
      data-dragging={isDragging ? "" : undefined}
      style={{ ...dragStyle, ...style }}
      {...attributes}
      {...(dragHandle ? {} : listeners)}
      {...props}
    >
      {dragHandle ? (
        <>
          <span {...listeners} className="vds-data-table-drag-handle">
            {dragHandle}
          </span>
          {children}
        </>
      ) : (
        children
      )}
    </DataTableHeaderCell>
  );
});
