"use client";
import { DataTableHeaderCell, useDataTableContext } from './chunk-LRLNRHO3.js';
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, sortableKeyboardCoordinates, horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { forwardRef, useMemo, useCallback, useState, useEffect } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@virtari-packages/utils';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody } from '@virtari-packages/react-drawer';
import { Input } from '@virtari-packages/react-input';
import { Switch } from '@virtari-packages/react-switch';
import { IconGripVertical } from '@virtari-packages/react-icons';

function useColumnDnd(options = {}) {
  const { table } = useDataTableContext();
  const { onColumnOrderChange } = options;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const items = useMemo(
    () => table.getVisibleLeafColumns().map((c) => c.id),
    [table, table.getState().columnOrder, table.getState().columnVisibility]
  );
  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const currentOrder = items.slice();
      const oldIndex = currentOrder.indexOf(active.id);
      const newIndex = currentOrder.indexOf(over.id);
      if (oldIndex < 0 || newIndex < 0) return;
      currentOrder.splice(oldIndex, 1);
      currentOrder.splice(newIndex, 0, active.id);
      table.setColumnOrder(currentOrder);
      onColumnOrderChange?.(currentOrder);
    },
    [items, table, onColumnOrderChange]
  );
  return { sensors, handleDragEnd, strategy: horizontalListSortingStrategy, items };
}
function DataTableDndProvider({
  children,
  onColumnOrderChange,
  sensors: overrideSensors,
  dndContextProps
}) {
  const { sensors, handleDragEnd, strategy, items } = useColumnDnd({
    onColumnOrderChange
  });
  return /* @__PURE__ */ jsx(
    DndContext,
    {
      sensors: overrideSensors ?? sensors,
      onDragEnd: handleDragEnd,
      ...dndContextProps,
      children: /* @__PURE__ */ jsx(SortableContext, { items, strategy, children })
    }
  );
}
var DataTableDraggableHeaderCell = forwardRef(function DataTableDraggableHeaderCell2({ header, className, dragHandle, style, children, ...props }, ref) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id: header.column.id });
  const dragStyle = {
    transform: CSS.Translate.toString(transform),
    transition: "transform 150ms cubic-bezier(0,0,0.2,1)",
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 5 : void 0,
    position: isDragging ? "relative" : void 0
  };
  return /* @__PURE__ */ jsx(
    DataTableHeaderCell,
    {
      ref: (node) => {
        setNodeRef(node);
        if (typeof ref === "function") ref(node);
        else if (ref)
          ref.current = node;
      },
      header,
      className: cn("vds-data-table-header-cell-draggable", className),
      "data-dragging": isDragging ? "" : void 0,
      style: { ...dragStyle, ...style },
      ...attributes,
      ...dragHandle ? {} : listeners,
      ...props,
      children: dragHandle ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { ...listeners, className: "vds-data-table-drag-handle", children: dragHandle }),
        children
      ] }) : children
    }
  );
});
function DataTableCustomizeDrawer({
  open,
  onOpenChange,
  columns: external,
  onColumnsChange,
  defaultColumns,
  title = "Customize view",
  side = "right"
}) {
  const [columns, setColumns] = useState(external);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (open) setColumns(external);
  }, [open, external]);
  const filtered = useMemo(() => {
    if (!search.trim()) return columns;
    const q = search.toLowerCase();
    return columns.filter(
      (c) => c.label.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  }, [columns, search]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setColumns((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      if (oldIndex < 0 || newIndex < 0) return prev;
      const next = arrayMove(prev, oldIndex, newIndex);
      onColumnsChange(next);
      return next;
    });
  };
  const toggleVisibility = (id, visible) => {
    setColumns((prev) => {
      const next = prev.map((c) => c.id === id ? { ...c, visible } : c);
      onColumnsChange(next);
      return next;
    });
  };
  const handleReset = () => {
    if (!defaultColumns) return;
    setColumns(defaultColumns);
    onColumnsChange(defaultColumns);
  };
  const visibleCount = columns.filter((c) => c.visible).length;
  return /* @__PURE__ */ jsx(
    Drawer,
    {
      direction: side,
      open,
      onOpenChange,
      sizeMode: "fixed",
      size: "min(24rem, 95vw)",
      children: /* @__PURE__ */ jsxs(
        DrawerContent,
        {
          className: "vds-data-table-customize-drawer",
          "aria-label": title,
          children: [
            /* @__PURE__ */ jsx(DrawerHeader, { children: /* @__PURE__ */ jsxs("div", { className: "vds-data-table-customize-drawer-header", children: [
              /* @__PURE__ */ jsx(DrawerTitle, { children: title }),
              /* @__PURE__ */ jsxs("span", { className: "vds-data-table-customize-drawer-count", children: [
                visibleCount,
                " / ",
                columns.length,
                " shown"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(DrawerBody, { children: /* @__PURE__ */ jsxs("div", { className: "vds-data-table-customize-drawer-body", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  inputSize: "md",
                  type: "search",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  placeholder: "Search columns\u2026"
                }
              ),
              /* @__PURE__ */ jsx(
                DndContext,
                {
                  sensors,
                  collisionDetection: closestCenter,
                  onDragEnd: handleDragEnd,
                  children: /* @__PURE__ */ jsx(
                    SortableContext,
                    {
                      items: filtered.map((c) => c.id),
                      strategy: verticalListSortingStrategy,
                      children: /* @__PURE__ */ jsx("div", { className: "vds-data-table-customize-drawer-list", children: filtered.map((column) => /* @__PURE__ */ jsx(
                        SortableColumnItem,
                        {
                          column,
                          onToggle: toggleVisibility
                        },
                        column.id
                      )) })
                    }
                  )
                }
              ),
              defaultColumns && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleReset,
                  className: "vds-data-table-customize-drawer-reset",
                  children: "Reset to default"
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}
function SortableColumnItem({ column, onToggle }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      "data-dragging": isDragging ? "" : void 0,
      className: cn("vds-data-table-customize-item"),
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            ...attributes,
            ...listeners,
            "aria-label": "Drag to reorder",
            className: "vds-data-table-customize-item-drag",
            children: /* @__PURE__ */ jsx(IconGripVertical, { size: 14, stroke: 1.75, "aria-hidden": true, focusable: false })
          }
        ),
        column.icon && /* @__PURE__ */ jsx("span", { className: "vds-data-table-customize-item-icon", children: column.icon }),
        /* @__PURE__ */ jsx("span", { className: "vds-data-table-customize-item-label", children: column.label }),
        /* @__PURE__ */ jsx(
          Switch,
          {
            checked: column.visible,
            onCheckedChange: (checked) => onToggle(column.id, Boolean(checked)),
            "aria-label": `Toggle ${column.label}`
          }
        )
      ]
    }
  );
}

export { DataTableCustomizeDrawer, DataTableDndProvider, DataTableDraggableHeaderCell, useColumnDnd };
