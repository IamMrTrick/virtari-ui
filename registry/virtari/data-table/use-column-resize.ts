import { useCallback, useMemo } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import type { Header } from "@tanstack/react-table";

import { useDataTableContext } from "./DataTableContext";

export interface UseColumnResizeResult {
  isResizing: boolean;
  currentSize: number;
  minSize: number;
  maxSize: number;
  /** Keyboard adjust: Arrow ±8 px, Shift+Arrow ±32 px, Home/End to min/max. */
  onKeyDownAdjust(event: KeyboardEvent<HTMLElement>): void;
  /** Style for the .vds-data-table-resize-guideline overlay. */
  getGuidelineStyle(): CSSProperties;
}

const BASE_STEP = 8;
const LARGE_STEP = 32;

export function useColumnResize<TData, TValue>(
  header: Header<TData, TValue>,
): UseColumnResizeResult {
  const { table } = useDataTableContext();
  const column = header.column;

  const isResizing = column.getIsResizing();
  const currentSize = header.getSize();
  const minSize = column.columnDef.minSize ?? 40;
  const maxSize = column.columnDef.maxSize ?? Number.POSITIVE_INFINITY;

  const setSize = useCallback(
    (next: number) => {
      const clamped = Math.max(minSize, Math.min(maxSize, Math.round(next)));
      table.setColumnSizing((prev) => ({ ...prev, [column.id]: clamped }));
    },
    [table, column.id, minSize, maxSize],
  );

  const onKeyDownAdjust = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      const step = e.shiftKey ? LARGE_STEP : BASE_STEP;
      const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
      const dir = rtl ? -1 : 1;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setSize(currentSize - step * dir);
          break;
        case "ArrowRight":
          e.preventDefault();
          setSize(currentSize + step * dir);
          break;
        case "Home":
          e.preventDefault();
          setSize(minSize);
          break;
        case "End":
          e.preventDefault();
          if (maxSize !== Number.POSITIVE_INFINITY) setSize(maxSize);
          break;
      }
    },
    [currentSize, minSize, maxSize, setSize],
  );

  const getGuidelineStyle = useCallback((): CSSProperties => {
    if (!isResizing) return { display: "none" };
    const info = table.getState().columnSizingInfo;
    const offset = info.startOffset ?? 0;
    const delta = info.deltaOffset ?? 0;
    return {
      /* The guideline overlay is positioned inside ScrollArea,
       * offset horizontally by (column start + current delta).
       * We use a single translateX with a combined px value. */
      ["--data-table-guideline-offset" as string]: `${offset + delta}px`,
      display: "block",
    };
  }, [isResizing, table]);

  return useMemo(
    () => ({
      isResizing,
      currentSize,
      minSize,
      maxSize,
      onKeyDownAdjust,
      getGuidelineStyle,
    }),
    [isResizing, currentSize, minSize, maxSize, onKeyDownAdjust, getGuidelineStyle],
  );
}
