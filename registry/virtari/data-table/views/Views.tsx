import type { ReactNode } from "react";

import { useDataTableContext } from "../DataTableContext";
import type { DataTableViewMode } from "../types";
import { DataTableBoard } from "./Board";
import { DataTableListView } from "./List";

export interface DataTableViewsProps {
  /** Render-prop override. If omitted, auto-dispatches to default Table/Board/List. */
  children?: (viewMode: DataTableViewMode) => ReactNode;
  /** Default children for each mode when not using render-prop. */
  table?: ReactNode;
  board?: ReactNode;
  list?: ReactNode;
  /** Hide these columns in board/list auto-renders. */
  skipColumns?: string[];
  emptyMessage?: ReactNode;
}

/**
 * View dispatcher — reads `viewMode` from context and renders one of:
 *   - the matching slot (table/board/list) if provided,
 *   - a render-prop fallback,
 *   - or sensible defaults (Board + List auto, Table must be provided).
 *
 * The Table view has no default because consumers usually need to compose
 * their own `<ScrollArea><Table><Header/><Body/></Table></ScrollArea>`.
 */
export function DataTableViews({
  children,
  table,
  board,
  list,
  skipColumns,
  emptyMessage,
}: DataTableViewsProps) {
  const { viewMode } = useDataTableContext();
  if (children) return <>{children(viewMode)}</>;
  if (viewMode === "table") return <>{table}</>;
  if (viewMode === "board") {
    return (
      <>
        {board ?? (
          <DataTableBoard
            skipColumns={skipColumns}
            emptyMessage={emptyMessage}
          />
        )}
      </>
    );
  }
  return (
    <>
      {list ?? (
        <DataTableListView
          skipColumns={skipColumns}
          emptyMessage={emptyMessage}
        />
      )}
    </>
  );
}
