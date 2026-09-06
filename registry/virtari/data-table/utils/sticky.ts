export type DataTableStickyMode = boolean | "always" | "smart";

export type DataTableStickyAxis = "top" | "bottom";

export function stickyAttr(sticky: DataTableStickyMode | undefined) {
  if (!sticky) return undefined;
  return sticky === true ? "" : sticky;
}

export function stickyAxisAttr(
  axis: DataTableStickyAxis,
): DataTableStickyAxis {
  return axis;
}
