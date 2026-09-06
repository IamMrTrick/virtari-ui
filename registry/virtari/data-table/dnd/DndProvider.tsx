import { DndContext } from "@dnd-kit/core";
import type { DndContextProps } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { ReactNode } from "react";
import type { ColumnOrderState } from "@tanstack/react-table";

import { useColumnDnd } from "./use-column-dnd";

export interface DataTableDndProviderProps {
  children: ReactNode;
  onColumnOrderChange?: (order: ColumnOrderState) => void;
  /** Override dnd-kit sensors if needed. */
  sensors?: DndContextProps["sensors"];
  /** Called on drag start / move — pass through to DndContext if needed. */
  dndContextProps?: Omit<DndContextProps, "sensors" | "onDragEnd" | "children">;
}

export function DataTableDndProvider({
  children,
  onColumnOrderChange,
  sensors: overrideSensors,
  dndContextProps,
}: DataTableDndProviderProps) {
  const { sensors, handleDragEnd, strategy, items } = useColumnDnd({
    onColumnOrderChange,
  });
  return (
    <DndContext
      sensors={overrideSensors ?? sensors}
      onDragEnd={handleDragEnd}
      {...dndContextProps}
    >
      <SortableContext items={items} strategy={strategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
