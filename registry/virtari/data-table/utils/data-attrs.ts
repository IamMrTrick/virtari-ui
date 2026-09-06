import type { Column, Header, Row } from "@tanstack/react-table";

export function sortedAttr(
  header: Header<unknown, unknown>,
): "asc" | "desc" | undefined {
  const s = header.column.getIsSorted();
  return s === false ? undefined : s;
}

export function pinnedAttr(
  column: Column<unknown, unknown>,
): "left" | "right" | undefined {
  const p = column.getIsPinned();
  return p === false ? undefined : (p as "left" | "right");
}

export function rowPinnedAttr(row: Row<unknown>): "top" | "bottom" | undefined {
  const p = row.getIsPinned();
  return p === false ? undefined : (p as "top" | "bottom");
}

/**
 * Turn a boolean flag into a data-attribute value:
 * - true  → "" (present)
 * - false → undefined (omitted)
 *
 * Using this keeps TSX compact: `data-selected={boolAttr(isSelected)}`.
 */
export function boolAttr(value: boolean): "" | undefined {
  return value ? "" : undefined;
}
