import { useCallback, useEffect } from "react";
import type { MutableRefObject } from "react";

/**
 * Roving-tabindex arrow-key navigation for `interactionMode="grid"`.
 *
 * Wires a single delegated keydown listener on the scroll container.
 * Expects each cell to have `data-column-id` + each row to have
 * `data-row-id` attributes (which Stage 2 already emits). Focus lands on
 * `<td>` elements directly; those elements become tabbable via their
 * intrinsic participation in roving tabindex (we set `tabIndex={-1}` on
 * non-active cells and `0` on the active one via data-attributes in CSS).
 *
 * Supported keys:
 *   Arrow{Up,Down,Left,Right}  — move one cell
 *   Home / End                 — first / last cell of current row
 *   Ctrl+Home / Ctrl+End       — first / last cell overall
 *   PageUp / PageDown          — move by 10 rows (approximate)
 */
export function useKeyboardGridNav(
  enabled: boolean,
  scrollRef: MutableRefObject<HTMLElement | null>,
): void {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      const scroll = scrollRef.current;
      if (!scroll) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const currentCell = target.closest(
        '.vds-data-table-cell, .vds-data-table-header-cell',
      ) as HTMLElement | null;
      if (!currentCell) return;
      const currentRow = currentCell.closest(
        '.vds-data-table-row, .vds-data-table-header-row',
      ) as HTMLElement | null;
      if (!currentRow) return;

      const move = (nextCell: HTMLElement | null | undefined) => {
        if (!nextCell) return;
        e.preventDefault();
        nextCell.setAttribute("tabindex", "0");
        currentCell.setAttribute("tabindex", "-1");
        nextCell.focus();
      };

      const siblingCells = (row: HTMLElement): HTMLElement[] =>
        Array.from(
          row.querySelectorAll<HTMLElement>(
            '.vds-data-table-cell, .vds-data-table-header-cell',
          ),
        );
      const cellIndex = siblingCells(currentRow).indexOf(currentCell);
      const allRows = Array.from(
        scroll.querySelectorAll<HTMLElement>(
          '.vds-data-table-row, .vds-data-table-header-row',
        ),
      );
      const rowIndex = allRows.indexOf(currentRow);

      switch (e.key) {
        case "ArrowRight":
          move(siblingCells(currentRow)[cellIndex + 1]);
          return;
        case "ArrowLeft":
          move(siblingCells(currentRow)[cellIndex - 1]);
          return;
        case "ArrowDown": {
          const nextRow = allRows[rowIndex + 1];
          if (nextRow) move(siblingCells(nextRow)[cellIndex]);
          return;
        }
        case "ArrowUp": {
          const prevRow = allRows[rowIndex - 1];
          if (prevRow) move(siblingCells(prevRow)[cellIndex]);
          return;
        }
        case "Home":
          if (e.ctrlKey || e.metaKey) {
            const firstRow = allRows[0];
            if (firstRow) move(siblingCells(firstRow)[0]);
          } else {
            move(siblingCells(currentRow)[0]);
          }
          return;
        case "End":
          if (e.ctrlKey || e.metaKey) {
            const lastRow = allRows[allRows.length - 1];
            if (lastRow) {
              const cells = siblingCells(lastRow);
              move(cells[cells.length - 1]);
            }
          } else {
            const cells = siblingCells(currentRow);
            move(cells[cells.length - 1]);
          }
          return;
        case "PageDown": {
          const nextRow = allRows[Math.min(rowIndex + 10, allRows.length - 1)];
          if (nextRow) move(siblingCells(nextRow)[cellIndex]);
          return;
        }
        case "PageUp": {
          const prevRow = allRows[Math.max(rowIndex - 10, 0)];
          if (prevRow) move(siblingCells(prevRow)[cellIndex]);
          return;
        }
      }
    },
    [enabled, scrollRef],
  );

  useEffect(() => {
    if (!enabled) return;
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("keydown", handler as EventListener);
    return () => el.removeEventListener("keydown", handler as EventListener);
  }, [enabled, handler, scrollRef]);
}
