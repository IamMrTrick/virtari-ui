import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../../drawer";
import { Input } from "../../input";
import { Switch } from "../../switch";
import { cn } from "../../../lib/utils";
import { IconGripVertical } from "../../icons";

export interface ColumnConfig {
  id: string;
  label: string;
  icon?: React.ReactNode;
  visible: boolean;
}

export interface DataTableCustomizeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
  defaultColumns?: ColumnConfig[];
  title?: string;
  side?: "left" | "right" | "top" | "bottom";
}

export function DataTableCustomizeDrawer({
  open,
  onOpenChange,
  columns: external,
  onColumnsChange,
  defaultColumns,
  title = "Customize view",
  side = "right",
}: DataTableCustomizeDrawerProps) {
  const [columns, setColumns] = useState<ColumnConfig[]>(external);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) setColumns(external);
  }, [open, external]);

  const filtered = useMemo(() => {
    if (!search.trim()) return columns;
    const q = search.toLowerCase();
    return columns.filter(
      (c) => c.label.toLowerCase().includes(q) || c.id.toLowerCase().includes(q),
    );
  }, [columns, search]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
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

  const toggleVisibility = (id: string, visible: boolean) => {
    setColumns((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, visible } : c));
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

  return (
    <Drawer
      direction={side}
      open={open}
      onOpenChange={onOpenChange}
      sizeMode="fixed"
      size="min(24rem, 95vw)"
    >
      <DrawerContent
        className="vds-data-table-customize-drawer"
        aria-label={title}
      >
        <DrawerHeader>
          <div className="vds-data-table-customize-drawer-header">
            <DrawerTitle>{title}</DrawerTitle>
            <span className="vds-data-table-customize-drawer-count">
              {visibleCount} / {columns.length} shown
            </span>
          </div>
        </DrawerHeader>

        <DrawerBody>
          <div className="vds-data-table-customize-drawer-body">
            <Input
              inputSize="md"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search columns…"
            />

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filtered.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="vds-data-table-customize-drawer-list">
                  {filtered.map((column) => (
                    <SortableColumnItem
                      key={column.id}
                      column={column}
                      onToggle={toggleVisibility}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {defaultColumns && (
              <button
                type="button"
                onClick={handleReset}
                className="vds-data-table-customize-drawer-reset"
              >
                Reset to default
              </button>
            )}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

interface SortableColumnItemProps {
  column: ColumnConfig;
  onToggle: (id: string, visible: boolean) => void;
}

function SortableColumnItem({ column, onToggle }: SortableColumnItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: column.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-dragging={isDragging ? "" : undefined}
      className={cn("vds-data-table-customize-item")}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="vds-data-table-customize-item-drag"
      >
        <IconGripVertical size={14} stroke={1.75} aria-hidden focusable={false} />
      </button>
      {column.icon && (
        <span className="vds-data-table-customize-item-icon">{column.icon}</span>
      )}
      <span className="vds-data-table-customize-item-label">{column.label}</span>
      <Switch
        checked={column.visible}
        onCheckedChange={(checked) => onToggle(column.id, Boolean(checked))}
        aria-label={`Toggle ${column.label}`}
      />
    </div>
  );
}
