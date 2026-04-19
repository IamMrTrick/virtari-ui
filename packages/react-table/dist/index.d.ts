import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ReactNode } from 'react';

/** Frame strategy. `surface` (default) = raised framed table. */
type TableVariant = "surface" | "plain" | "bordered" | "ghost";
/** Body row chrome. `divided` (default) = bottom dividers. */
type TableRowStyle = "divided" | "striped" | "none";
/** Size preset — sm(36) · md(44, default) · lg(52). */
type TableSize = "sm" | "md" | "lg";
/** Padding density, composes with size. */
type TableDensity = "compact" | "normal" | "comfortable";
/** Accent color — drives selected row tint + sort indicator. */
type TableColor = "primary" | "accent" | "success" | "warning" | "danger" | "info" | "neutral";
/** Column/table layout algorithm. */
type TableLayout = "auto" | "fixed";
/** Header casing modifier. */
type TableHeaderCase = "uppercase" | "sentence";
/** Text alignment — logical (RTL-safe). */
type TableAlign = "start" | "center" | "end";
/** Sticky column edge. */
type TableSticky = "start" | "end";
/** aria-sort values accepted by sortable headers. */
type TableSortDirection = "ascending" | "descending" | "none";
interface TableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Frame strategy. Default: `surface`. */
    variant?: TableVariant;
    /** Body row chrome. Default: `divided`. */
    rows?: TableRowStyle;
    /** Size preset. Default: `md`. */
    size?: TableSize;
    /** Padding density. Default: `normal`. */
    density?: TableDensity;
    /** Accent color for selection + sort indicator. Default: `primary`. */
    color?: TableColor;
    /** Layout algorithm for the inner <table>. Default: `auto`. */
    layout?: TableLayout;
    /** Header casing. Default: `uppercase`. */
    headerCase?: TableHeaderCase;
    /** Keep the thead pinned to the scroll container's top. Default: `false`. */
    stickyHeader?: boolean;
    /** Tint tbody rows on hover. Default: `false`. */
    hoverable?: boolean;
    /** Dim the tbody while data is loading. Default: `false`. */
    loading?: boolean;
    /** Forward props onto the inner <table> (e.g., `id`, `aria-label`). */
    tableProps?: React.TableHTMLAttributes<HTMLTableElement>;
    /** Ref onto the inner <table>. */
    tableRef?: Ref<HTMLTableElement>;
    /** Ref onto the scroll container (root div). */
    ref?: Ref<HTMLDivElement>;
    /** <thead>, <tbody>, <tfoot>, optional <caption>. */
    children?: ReactNode;
}
declare function Table({ variant, rows, size, density, color, layout, headerCase, stickyHeader, hoverable, loading, tableProps, tableRef, ref, className, children, ...props }: TableProps): react_jsx_runtime.JSX.Element;
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    ref?: Ref<HTMLTableSectionElement>;
}
declare function TableHeader({ className, ref, ...props }: TableHeaderProps): react_jsx_runtime.JSX.Element;
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    ref?: Ref<HTMLTableSectionElement>;
}
declare function TableBody({ className, ref, ...props }: TableBodyProps): react_jsx_runtime.JSX.Element;
interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    ref?: Ref<HTMLTableSectionElement>;
}
declare function TableFooter({ className, ref, ...props }: TableFooterProps): react_jsx_runtime.JSX.Element;
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    /** Mark the row as selected (paints accent stripe + tint). */
    selected?: boolean;
    ref?: Ref<HTMLTableRowElement>;
}
declare function TableRow({ className, selected, ref, ...props }: TableRowProps): react_jsx_runtime.JSX.Element;
interface TableHeadProps extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
    /** Logical text alignment. RTL-safe. */
    align?: TableAlign;
    /** Tabular numerals + end alignment. */
    numeric?: boolean;
    /** Allow wrapping instead of the default nowrap. */
    wrap?: boolean;
    /** Pin the column to the scroll container's start or end edge. */
    sticky?: TableSticky;
    /** Render as a sortable column (cursor, hover affordance, focusability). */
    sortable?: boolean;
    /** Sort direction — sets `aria-sort`. */
    sortDirection?: TableSortDirection;
    /** Custom sort indicator node (e.g. an icon). Defaults to a chevron. */
    sortIndicator?: ReactNode;
    ref?: Ref<HTMLTableCellElement>;
}
declare function TableHead({ className, align, numeric, wrap, sticky, sortable, sortDirection, sortIndicator, children, ref, onKeyDown, ...props }: TableHeadProps): react_jsx_runtime.JSX.Element;
interface TableCellProps extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> {
    /** Logical text alignment. RTL-safe. */
    align?: TableAlign;
    /** Tabular numerals + end alignment. */
    numeric?: boolean;
    /** Allow wrapping instead of the default nowrap. */
    wrap?: boolean;
    /** Pin the column to the scroll container's start or end edge. */
    sticky?: TableSticky;
    ref?: Ref<HTMLTableCellElement>;
}
declare function TableCell({ className, align, numeric, wrap, sticky, ref, ...props }: TableCellProps): react_jsx_runtime.JSX.Element;
interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
    ref?: Ref<HTMLTableCaptionElement>;
}
declare function TableCaption({ className, ref, ...props }: TableCaptionProps): react_jsx_runtime.JSX.Element;

export { Table, type TableAlign, TableBody, type TableBodyProps, TableCaption, type TableCaptionProps, TableCell, type TableCellProps, type TableColor, type TableDensity, TableFooter, type TableFooterProps, TableHead, type TableHeadProps, TableHeader, type TableHeaderCase, type TableHeaderProps, type TableLayout, type TableProps, TableRow, type TableRowProps, type TableRowStyle, type TableSize, type TableSortDirection, type TableSticky, type TableVariant };
