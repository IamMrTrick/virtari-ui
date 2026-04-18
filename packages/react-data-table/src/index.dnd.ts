/* /dnd subpath — any feature that depends on @dnd-kit lives here so
 * consumers who never import it don't pay the bundle cost. */

export { DataTableDndProvider } from "./dnd/DndProvider";
export type { DataTableDndProviderProps } from "./dnd/DndProvider";
export { DataTableDraggableHeaderCell } from "./dnd/DraggableHeaderCell";
export type { DataTableDraggableHeaderCellProps } from "./dnd/DraggableHeaderCell";
export { useColumnDnd } from "./dnd/use-column-dnd";
export type {
  UseColumnDndOptions,
  UseColumnDndResult,
} from "./dnd/use-column-dnd";

/* Customize-view drawer (column reorder + visibility via dnd-kit). */
export { DataTableCustomizeDrawer } from "./customize/CustomizeDrawer";
export type {
  ColumnConfig,
  DataTableCustomizeDrawerProps,
} from "./customize/CustomizeDrawer";
