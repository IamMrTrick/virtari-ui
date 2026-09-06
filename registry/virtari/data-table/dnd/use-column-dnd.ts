import { useCallback, useMemo } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, SensorDescriptor, SensorOptions } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type { SortingStrategy } from "@dnd-kit/sortable";
import type { ColumnOrderState } from "@tanstack/react-table";

import { useDataTableContext } from "../DataTableContext";

export interface UseColumnDndOptions {
  onColumnOrderChange?: (order: ColumnOrderState) => void;
}

export interface UseColumnDndResult {
  sensors: SensorDescriptor<SensorOptions>[];
  handleDragEnd: (event: DragEndEvent) => void;
  strategy: SortingStrategy;
  items: string[];
}

export function useColumnDnd(
  options: UseColumnDndOptions = {},
): UseColumnDndResult {
  const { table } = useDataTableContext();
  const { onColumnOrderChange } = options;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const items = useMemo(
    () => table.getVisibleLeafColumns().map((c) => c.id),
    [table, table.getState().columnOrder, table.getState().columnVisibility],
  );

  const completeOrder = useCallback((): ColumnOrderState => {
    const allIds = table.getAllLeafColumns().map((c) => c.id);
    const known = new Set(allIds);
    const current = table.getState().columnOrder.filter((id) => known.has(id));
    const missing = allIds.filter((id) => !current.includes(id));
    return current.length > 0 ? [...current, ...missing] : allIds;
  }, [table]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const currentOrder = completeOrder();
      const oldIndex = currentOrder.indexOf(active.id as string);
      const newIndex = currentOrder.indexOf(over.id as string);
      if (oldIndex < 0 || newIndex < 0) return;
      const next = arrayMove(currentOrder, oldIndex, newIndex);
      table.setColumnOrder(next);
      onColumnOrderChange?.(next);
    },
    [completeOrder, table, onColumnOrderChange],
  );

  return { sensors, handleDragEnd, strategy: horizontalListSortingStrategy, items };
}
