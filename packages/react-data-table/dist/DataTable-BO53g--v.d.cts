import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ThHTMLAttributes, ReactNode, CSSProperties, HTMLAttributes, TableHTMLAttributes, ButtonHTMLAttributes, TdHTMLAttributes, InputHTMLAttributes } from 'react';
import { SortingState, ColumnFiltersState, PaginationState, GroupingState, RowSelectionState, ColumnSizingState, ColumnOrderState, ColumnPinningState, VisibilityState, ExpandedState, RowPinningState, Row, Table, ColumnDef, Header, HeaderGroup, Column, Cell } from '@tanstack/react-table';

type DataTableSize = "sm" | "md" | "lg";
type DataTableInteractionMode = "table" | "grid";
type DataTableBorderMode = "none" | "rows" | "grid";
type DataTableMode = "client" | "server";
type DataTableViewMode = "table" | "board" | "list";
interface DataTableVirtualizationOptions {
    estimateRowSize?: number;
    overscan?: number;
}
interface ControlledPair<T> {
    value?: T;
    defaultValue?: T;
    onValueChange?: (next: T) => void;
}
interface DataTableStatePairs {
    sorting?: SortingState;
    defaultSorting?: SortingState;
    onSortingChange?: (state: SortingState) => void;
    columnFilters?: ColumnFiltersState;
    defaultColumnFilters?: ColumnFiltersState;
    onColumnFiltersChange?: (state: ColumnFiltersState) => void;
    globalFilter?: string;
    defaultGlobalFilter?: string;
    onGlobalFilterChange?: (state: string) => void;
    rowSelection?: RowSelectionState;
    defaultRowSelection?: RowSelectionState;
    onRowSelectionChange?: (state: RowSelectionState) => void;
    columnSizing?: ColumnSizingState;
    defaultColumnSizing?: ColumnSizingState;
    onColumnSizingChange?: (state: ColumnSizingState) => void;
    columnOrder?: ColumnOrderState;
    defaultColumnOrder?: ColumnOrderState;
    onColumnOrderChange?: (state: ColumnOrderState) => void;
    columnPinning?: ColumnPinningState;
    defaultColumnPinning?: ColumnPinningState;
    onColumnPinningChange?: (state: ColumnPinningState) => void;
    columnVisibility?: VisibilityState;
    defaultColumnVisibility?: VisibilityState;
    onColumnVisibilityChange?: (state: VisibilityState) => void;
    pagination?: PaginationState;
    defaultPagination?: PaginationState;
    onPaginationChange?: (state: PaginationState) => void;
    grouping?: GroupingState;
    defaultGrouping?: GroupingState;
    onGroupingChange?: (state: GroupingState) => void;
    expanded?: ExpandedState;
    defaultExpanded?: ExpandedState;
    onExpandedChange?: (state: ExpandedState) => void;
    rowPinning?: RowPinningState;
    defaultRowPinning?: RowPinningState;
    onRowPinningChange?: (state: RowPinningState) => void;
}
interface DataTableServerRequestState {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    globalFilter: string;
    pagination: PaginationState;
    grouping: GroupingState;
}
interface DataTableBaseOptions {
    size?: DataTableSize;
    interactionMode?: DataTableInteractionMode;
    bordered?: DataTableBorderMode;
    striped?: boolean;
    stickyHeader?: boolean;
    mode?: DataTableMode;
    virtualization?: false | DataTableVirtualizationOptions;
    columnResizeMode?: "onChange" | "onEnd";
    rowCount?: number;
    onDataRequest?: (state: DataTableServerRequestState) => void;
    onCellEdit?: (row: Row<unknown>, columnId: string, nextValue: unknown) => void | Promise<void>;
}
interface DataTableOptions<TData, TValue = unknown> extends DataTableBaseOptions, DataTableStatePairs {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}
type DataTableInstance<TData> = Table<TData>;

type DataTableRootOwnProps = {
    size?: DataTableSize;
    interactionMode?: DataTableInteractionMode;
    bordered?: DataTableBorderMode;
    striped?: boolean;
    stickyHeader?: boolean;
    mode?: DataTableMode;
    virtualization?: false | DataTableVirtualizationOptions;
    columnResizeMode?: "onChange" | "onEnd";
    rowCount?: number;
    viewMode?: DataTableViewMode;
    defaultViewMode?: DataTableViewMode;
    onViewModeChange?: (mode: DataTableViewMode) => void;
    onDataRequest?: (state: DataTableServerRequestState) => void;
    onCellEdit?: (row: Row<unknown>, columnId: string, nextValue: unknown) => void | Promise<void>;
    id?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
} & DataTableStatePairs;
type AdvancedProps<TData> = {
    table: Table<TData>;
    columns?: never;
    data?: never;
};
type SimpleProps<TData, TValue = unknown> = {
    table?: never;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
};
type DataTableRootProps<TData, TValue = unknown> = DataTableRootOwnProps & (AdvancedProps<TData> | SimpleProps<TData, TValue>);
declare const DataTableRoot: <TData, TValue = unknown>(props: DataTableRootProps<TData, TValue> & {
    ref?: React.Ref<HTMLDivElement>;
}) => React.ReactElement;
interface DataTableToolbarProps extends HTMLAttributes<HTMLDivElement> {
}
declare const DataTableToolbar: react.ForwardRefExoticComponent<DataTableToolbarProps & react.RefAttributes<HTMLDivElement>>;
interface DataTableScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Enable click-and-drag panning of the scroll area (like Google Sheets /
     * Figma canvas). Buttons/links/inputs/resize-handles remain clickable.
     * Default: `true`.
     */
    scrollDrag?: boolean;
}
declare const DataTableScrollArea: react.ForwardRefExoticComponent<DataTableScrollAreaProps & react.RefAttributes<HTMLDivElement>>;
interface DataTableTableProps extends TableHTMLAttributes<HTMLTableElement> {
}
declare const DataTableTable: react.ForwardRefExoticComponent<DataTableTableProps & react.RefAttributes<HTMLTableElement>>;
interface DataTableHeaderProps extends Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> {
    children?: ReactNode | ((headerGroups: HeaderGroup<unknown>[]) => ReactNode);
}
declare const DataTableHeader: react.ForwardRefExoticComponent<DataTableHeaderProps & react.RefAttributes<HTMLTableSectionElement>>;
interface DataTableHeaderGroupProps<TData = unknown> extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
    headerGroup: HeaderGroup<TData>;
    children?: ReactNode | ((headers: Header<TData, unknown>[]) => ReactNode);
}
declare const DataTableHeaderGroup: react.ForwardRefExoticComponent<DataTableHeaderGroupProps<unknown> & react.RefAttributes<HTMLTableRowElement>>;
interface DataTableHeaderCellProps<TData = unknown, TValue = unknown> extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "children"> {
    header: Header<TData, TValue>;
    children?: ReactNode;
}
declare const DataTableHeaderCell: react.ForwardRefExoticComponent<DataTableHeaderCellProps<unknown, unknown> & react.RefAttributes<HTMLTableCellElement>>;
interface DataTableBodyProps<TData = unknown> extends Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> {
    children?: ReactNode | ((rows: Row<TData>[]) => ReactNode);
    emptyMessage?: ReactNode;
}
declare const DataTableBody: react.ForwardRefExoticComponent<DataTableBodyProps<unknown> & react.RefAttributes<HTMLTableSectionElement>>;
interface DataTableRowProps<TData = unknown> extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
    row: Row<TData>;
    children?: ReactNode | ((cells: Cell<TData, unknown>[]) => ReactNode);
}
declare const DataTableRow: react.ForwardRefExoticComponent<DataTableRowProps<unknown> & react.RefAttributes<HTMLTableRowElement>>;
interface DataTableCellProps<TData = unknown, TValue = unknown> extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "children"> {
    cell: Cell<TData, TValue>;
    children?: ReactNode;
}
declare const DataTableCell: react.ForwardRefExoticComponent<DataTableCellProps<unknown, unknown> & react.RefAttributes<HTMLTableCellElement>>;
interface DataTableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
}
declare const DataTableFooter: react.ForwardRefExoticComponent<DataTableFooterProps & react.RefAttributes<HTMLTableSectionElement>>;
interface DataTableFooterRowProps<TData = unknown> extends HTMLAttributes<HTMLTableRowElement> {
    footerGroup: HeaderGroup<TData>;
}
declare const DataTableFooterRow: react.ForwardRefExoticComponent<DataTableFooterRowProps<unknown> & react.RefAttributes<HTMLTableRowElement>>;
interface DataTableFooterCellProps<TData = unknown, TValue = unknown> extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "children"> {
    header: Header<TData, TValue>;
    children?: ReactNode;
}
declare const DataTableFooterCell: react.ForwardRefExoticComponent<DataTableFooterCellProps<unknown, unknown> & react.RefAttributes<HTMLTableCellElement>>;
interface DataTableEmptyProps extends HTMLAttributes<HTMLDivElement> {
}
declare const DataTableEmpty: react.ForwardRefExoticComponent<DataTableEmptyProps & react.RefAttributes<HTMLDivElement>>;
interface DataTableLoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    label?: ReactNode;
}
declare const DataTableLoadingOverlay: react.ForwardRefExoticComponent<DataTableLoadingOverlayProps & react.RefAttributes<HTMLDivElement>>;
interface DataTableSortTriggerProps<TData = unknown, TValue = unknown> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    header: Header<TData, TValue>;
    children?: ReactNode;
}
declare const DataTableSortTrigger: react.ForwardRefExoticComponent<DataTableSortTriggerProps<unknown, unknown> & react.RefAttributes<HTMLButtonElement>>;
interface DataTableGlobalFilterProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> {
    /** Debounce in ms before committing to table state. Default 150. */
    debounceMs?: number;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}
declare const DataTableGlobalFilter: react.ForwardRefExoticComponent<DataTableGlobalFilterProps & react.RefAttributes<HTMLInputElement>>;
interface DataTableSelectAllCheckboxProps {
    className?: string;
    /** Scope: all rows vs current page. Default "page". */
    scope?: "page" | "all";
}
declare function DataTableSelectAllCheckbox({ className, scope, }: DataTableSelectAllCheckboxProps): react_jsx_runtime.JSX.Element;
interface DataTableRowSelectCheckboxProps<TData = unknown> {
    row: Row<TData>;
    className?: string;
}
declare function DataTableRowSelectCheckbox<TData>({ row, className, }: DataTableRowSelectCheckboxProps<TData>): react_jsx_runtime.JSX.Element;
interface DataTableResizeHandleProps<TData = unknown, TValue = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, "onKeyDown"> {
    header: Header<TData, TValue>;
}
declare const DataTableResizeHandle: react.ForwardRefExoticComponent<DataTableResizeHandleProps<unknown, unknown> & react.RefAttributes<HTMLDivElement>>;
declare function DataTableColumnGuide(): react_jsx_runtime.JSX.Element | null;
interface DataTablePinColumnTriggerProps<TData = unknown, TValue = unknown> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    column: Column<TData, TValue>;
    side: "left" | "right";
    children?: ReactNode;
}
declare const DataTablePinColumnTrigger: react.ForwardRefExoticComponent<DataTablePinColumnTriggerProps<unknown, unknown> & react.RefAttributes<HTMLButtonElement>>;
interface DataTableRowExpandTriggerProps<TData = unknown> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    row: Row<TData>;
    children?: ReactNode;
}
declare const DataTableRowExpandTrigger: react.ForwardRefExoticComponent<DataTableRowExpandTriggerProps<unknown> & react.RefAttributes<HTMLButtonElement>>;
interface DataTableRowPinTriggerProps<TData = unknown> extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    row: Row<TData>;
    side: "top" | "bottom";
    children?: ReactNode;
}
declare const DataTableRowPinTrigger: react.ForwardRefExoticComponent<DataTableRowPinTriggerProps<unknown> & react.RefAttributes<HTMLButtonElement>>;
interface DataTableColumnVisibilityProps {
    className?: string;
    /** Include only columns matching this predicate; default: all that support hiding. */
    filter?: (column: Column<unknown, unknown>) => boolean;
}
declare function DataTableColumnVisibility({ className, filter, }: DataTableColumnVisibilityProps): react_jsx_runtime.JSX.Element;
interface DataTableGroupHeaderRowProps<TData = unknown> extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
    row: Row<TData>;
}
declare const DataTableGroupHeaderRow: react.ForwardRefExoticComponent<DataTableGroupHeaderRowProps<unknown> & react.RefAttributes<HTMLTableRowElement>>;

export { DataTableRow as $, type DataTableOptions as A, type DataTableSize as B, type DataTableInteractionMode as C, type DataTableHeaderCellProps as D, type DataTableBorderMode as E, type DataTableMode as F, type DataTableVirtualizationOptions as G, type DataTableServerRequestState as H, type ControlledPair as I, type DataTableBaseOptions as J, DataTableBody as K, DataTableCell as L, type DataTableColumnVisibilityProps as M, DataTableEmpty as N, DataTableFooter as O, DataTableFooterCell as P, DataTableFooterRow as Q, DataTableGlobalFilter as R, DataTableGroupHeaderRow as S, DataTableHeader as T, DataTableHeaderCell as U, DataTableHeaderGroup as V, type DataTableInstance as W, DataTableLoadingOverlay as X, DataTablePinColumnTrigger as Y, DataTableResizeHandle as Z, DataTableRoot as _, type DataTableViewMode as a, DataTableRowExpandTrigger as a0, DataTableRowPinTrigger as a1, type DataTableRowSelectCheckboxProps as a2, DataTableScrollArea as a3, type DataTableSelectAllCheckboxProps as a4, DataTableSortTrigger as a5, type DataTableStatePairs as a6, DataTableTable as a7, DataTableToolbar as a8, type DataTableRootProps as b, type DataTableToolbarProps as c, type DataTableScrollAreaProps as d, type DataTableTableProps as e, type DataTableHeaderProps as f, type DataTableHeaderGroupProps as g, type DataTableSortTriggerProps as h, type DataTableResizeHandleProps as i, DataTableColumnGuide as j, type DataTablePinColumnTriggerProps as k, type DataTableBodyProps as l, type DataTableRowProps as m, type DataTableCellProps as n, type DataTableGroupHeaderRowProps as o, type DataTableRowExpandTriggerProps as p, type DataTableRowPinTriggerProps as q, type DataTableFooterProps as r, type DataTableFooterRowProps as s, type DataTableFooterCellProps as t, DataTableSelectAllCheckbox as u, DataTableRowSelectCheckbox as v, type DataTableEmptyProps as w, type DataTableLoadingOverlayProps as x, type DataTableGlobalFilterProps as y, DataTableColumnVisibility as z };
