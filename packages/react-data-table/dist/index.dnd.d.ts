import * as react_jsx_runtime from 'react/jsx-runtime';
import { DndContextProps, SensorDescriptor, SensorOptions, DragEndEvent } from '@dnd-kit/core';
import * as react from 'react';
import { ReactNode } from 'react';
import { ColumnOrderState } from '@tanstack/react-table';
import { D as DataTableHeaderCellProps } from './DataTable-DoUCBg76.js';
import { SortingStrategy } from '@dnd-kit/sortable';

interface DataTableDndProviderProps {
    children: ReactNode;
    onColumnOrderChange?: (order: ColumnOrderState) => void;
    /** Override dnd-kit sensors if needed. */
    sensors?: DndContextProps["sensors"];
    /** Called on drag start / move — pass through to DndContext if needed. */
    dndContextProps?: Omit<DndContextProps, "sensors" | "onDragEnd" | "children">;
}
declare function DataTableDndProvider({ children, onColumnOrderChange, sensors: overrideSensors, dndContextProps, }: DataTableDndProviderProps): react_jsx_runtime.JSX.Element;

interface DataTableDraggableHeaderCellProps<TData = unknown, TValue = unknown> extends DataTableHeaderCellProps<TData, TValue> {
    /** Optional visual drag handle; if omitted the entire cell is draggable. */
    dragHandle?: ReactNode;
}
declare const DataTableDraggableHeaderCell: react.ForwardRefExoticComponent<DataTableDraggableHeaderCellProps<unknown, unknown> & react.RefAttributes<HTMLTableCellElement>>;

interface UseColumnDndOptions {
    onColumnOrderChange?: (order: ColumnOrderState) => void;
}
interface UseColumnDndResult {
    sensors: SensorDescriptor<SensorOptions>[];
    handleDragEnd: (event: DragEndEvent) => void;
    strategy: SortingStrategy;
    items: string[];
}
declare function useColumnDnd(options?: UseColumnDndOptions): UseColumnDndResult;

interface ColumnConfig {
    id: string;
    label: string;
    icon?: React.ReactNode;
    visible: boolean;
}
interface DataTableCustomizeDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    columns: ColumnConfig[];
    onColumnsChange: (columns: ColumnConfig[]) => void;
    defaultColumns?: ColumnConfig[];
    title?: string;
    side?: "left" | "right" | "top" | "bottom";
}
declare function DataTableCustomizeDrawer({ open, onOpenChange, columns: external, onColumnsChange, defaultColumns, title, side, }: DataTableCustomizeDrawerProps): react_jsx_runtime.JSX.Element;

export { type ColumnConfig, DataTableCustomizeDrawer, type DataTableCustomizeDrawerProps, DataTableDndProvider, type DataTableDndProviderProps, DataTableDraggableHeaderCell, type DataTableDraggableHeaderCellProps, type UseColumnDndOptions, type UseColumnDndResult, useColumnDnd };
