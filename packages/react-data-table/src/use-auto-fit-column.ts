import { useCallback } from "react";

import { useDataTableContext } from "./DataTableContext";
import { createMeasureSpan, measureCellWidth } from "./utils/measure-cell";

export interface UseAutoFitColumnResult {
  /** Measure visible rendered cells for this column; apply as new size. */
  fit(): void;
  /** Measure only, without applying. */
  measure(): number;
  minSize: number;
  maxSize: number;
}

export function useAutoFitColumn(columnId: string): UseAutoFitColumnResult {
  const { table, scrollRef } = useDataTableContext();
  const column = table.getColumn(columnId);
  const minSize = column?.columnDef.minSize ?? 40;
  const maxSize = column?.columnDef.maxSize ?? 800;

  const measure = useCallback((): number => {
    const scroll = scrollRef.current;
    if (!scroll || !column) return column?.getSize() ?? 0;

    /* Collect the visible header + body cells for this column via
     * data-column-id selector; we only measure DOM in the viewport
     * (virtualized windows only render visible rows — this is the intent). */
    const headerCell = scroll.querySelector<HTMLElement>(
      `.vds-data-table-header-cell[data-column-id="${CSS.escape(columnId)}"]`,
    );
    const bodyCells = Array.from(
      scroll.querySelectorAll<HTMLElement>(
        `.vds-data-table-cell[data-column-id="${CSS.escape(columnId)}"]`,
      ),
    );
    if (!headerCell && bodyCells.length === 0) return column.getSize();

    const reference = headerCell ?? bodyCells[0]!;
    const { span, dispose } = createMeasureSpan({ reference });
    let best = 0;
    if (headerCell) best = Math.max(best, measureCellWidth(headerCell, span));
    for (const cell of bodyCells) {
      best = Math.max(best, measureCellWidth(cell, span));
    }
    dispose();
    const clamped = Math.max(minSize, Math.min(maxSize, best));
    return clamped;
  }, [columnId, column, minSize, maxSize, scrollRef]);

  const fit = useCallback(() => {
    const next = measure();
    table.setColumnSizing((prev) => ({ ...prev, [columnId]: next }));
  }, [columnId, measure, table]);

  return { fit, measure, minSize, maxSize };
}
