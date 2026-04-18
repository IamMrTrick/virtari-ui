import { forwardRef } from "react";
import type { TdHTMLAttributes } from "react";
import type { Cell } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@virtari/utils";

import { useDataTableContext } from "../DataTableContext";
import { pinnedAttr } from "../utils/data-attrs";
import { CellEditor } from "./CellEditor";
import type { CellEditorMode } from "./CellEditor";
import { useCellEdit } from "./use-cell-edit";

export interface EditableCellProps<TData = unknown, TValue = unknown>
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "children"> {
  cell: Cell<TData, TValue>;
  mode?: CellEditorMode;
  /** Read the current value for editing. Default: `cell.getValue()`. */
  getValue?: () => string | number;
}

export const EditableCell = forwardRef<HTMLTableCellElement, EditableCellProps>(
  function EditableCell({ cell, mode = "text", getValue, className, style, ...props }, ref) {
    const { interactionMode } = useDataTableContext();
    const column = cell.column;
    const pin = pinnedAttr(column);
    const initial = (getValue ?? (() => cell.getValue() as string | number))();
    const edit = useCellEdit<unknown, string | number>(
      cell as unknown as Cell<unknown, string | number>,
      { initialValue: initial },
    );

    return (
      <td
        ref={ref}
        role={interactionMode === "grid" ? "gridcell" : "cell"}
        data-pinned={pin}
        data-column-id={column.id}
        data-editing={edit.editing ? "" : undefined}
        aria-busy={edit.isPending || undefined}
        className={cn("vds-data-table-cell", "vds-data-table-cell-editable", className)}
        style={{
          ["--col-size" as string]: `var(--col-${column.id})`,
          ...style,
        }}
        onDoubleClick={(e) => {
          e.preventDefault();
          if (!edit.editing) edit.start();
        }}
        {...props}
      >
        {edit.editing ? (
          <CellEditor
            mode={mode}
            value={edit.value}
            onValueChange={edit.setValue}
            onCommit={() => void edit.commit()}
            onCancel={edit.cancel}
          />
        ) : (
          <span className="vds-data-table-cell-content">
            {flexRender(column.columnDef.cell, cell.getContext())}
          </span>
        )}
      </td>
    );
  },
);
