import type { Table } from "@tanstack/react-table";
import type { CSSProperties } from "react";

/**
 * Build the per-column CSS custom properties to put on the <table> element.
 * Only these change on resize; cells reference them via `var(--col-<id>)`
 * through an indirection set once per column on the <th>/<td>.
 *
 * Returns { --col-<id>: "<px>px", ... } as a CSSProperties-compatible object.
 */
export function buildColumnSizeVars<TData>(
  table: Table<TData>,
): CSSProperties {
  const headers = table.getFlatHeaders();
  const out: Record<string, string> = {};
  for (const header of headers) {
    out[`--col-${header.column.id}`] = `${header.getSize()}px`;
  }
  return out as CSSProperties;
}

export function columnVar(columnId: string): string {
  return `var(--col-${columnId})`;
}
