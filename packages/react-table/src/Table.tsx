import { cn } from "@virtari/utils";
import {
  createContext,
  useContext,
  useId,
  type Ref,
  type ReactNode,
} from "react";

/* ─────────────────────────────────────────────────────────────────────────
 * Types — variant axes are orthogonal: variant (frame) × rows (body paint)
 * × size (padding/type) × density (extra tight/roomy) × color (accent).
 * ──────────────────────────────────────────────────────────────────────── */

/** Frame strategy. `surface` (default) = raised framed table. */
export type TableVariant = "surface" | "plain" | "bordered" | "ghost";

/** Body row chrome. `divided` (default) = bottom dividers. */
export type TableRowStyle = "divided" | "striped" | "none";

/** Size preset — sm(36) · md(44, default) · lg(52). */
export type TableSize = "sm" | "md" | "lg";

/** Padding density, composes with size. */
export type TableDensity = "compact" | "normal" | "comfortable";

/** Accent color — drives selected row tint + sort indicator. */
export type TableColor =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

/** Column/table layout algorithm. */
export type TableLayout = "auto" | "fixed";

/** Header casing modifier. */
export type TableHeaderCase = "uppercase" | "sentence";

/** Text alignment — logical (RTL-safe). */
export type TableAlign = "start" | "center" | "end";

/** Sticky column edge. */
export type TableSticky = "start" | "end";

/** aria-sort values accepted by sortable headers. */
export type TableSortDirection = "ascending" | "descending" | "none";

/* ─────────────────────────────────────────────────────────────────────────
 * Root context — lets cells know the root's size without prop drilling.
 * Currently unused by cells, but reserved for future features (e.g., auto
 * caption association, density-aware icon sizing). Kept lean so tree-shaking
 * can still drop it when consumers don't read it.
 * ──────────────────────────────────────────────────────────────────────── */
interface TableContextValue {
  captionId?: string;
}
const TableContext = createContext<TableContextValue>({});

/* ─────────────────────────────────────────────────────────────────────────
 * Table — root scroll container wrapping a real <table>.
 * Consumers compose children: Header / Body / Footer / Row / Head / Cell.
 * ──────────────────────────────────────────────────────────────────────── */

export interface TableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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

export function Table({
  variant = "surface",
  rows = "divided",
  size = "md",
  density = "normal",
  color = "primary",
  layout = "auto",
  headerCase = "uppercase",
  stickyHeader = false,
  hoverable = false,
  loading = false,
  tableProps,
  tableRef,
  ref,
  className,
  children,
  ...props
}: TableProps) {
  const captionId = useId();

  return (
    <TableContext.Provider value={{ captionId }}>
      <div
        ref={ref}
        className={cn("vds-table", className)}
        data-variant={variant}
        data-rows={rows}
        data-size={size}
        data-density={density !== "normal" ? density : undefined}
        data-color={color !== "primary" ? color : undefined}
        data-layout={layout !== "auto" ? layout : undefined}
        data-header-case={headerCase !== "uppercase" ? headerCase : undefined}
        data-sticky-header={stickyHeader || undefined}
        data-hoverable={hoverable || undefined}
        data-loading={loading || undefined}
        role="region"
        {...props}
      >
        <table
          ref={tableRef}
          className="vds-table__element"
          {...tableProps}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Sections — thead / tbody / tfoot.
 * ──────────────────────────────────────────────────────────────────────── */

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: Ref<HTMLTableSectionElement>;
}

export function TableHeader({ className, ref, ...props }: TableHeaderProps) {
  return (
    <thead
      ref={ref}
      className={cn("vds-table__thead", className)}
      {...props}
    />
  );
}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: Ref<HTMLTableSectionElement>;
}

export function TableBody({ className, ref, ...props }: TableBodyProps) {
  return (
    <tbody
      ref={ref}
      className={cn("vds-table__tbody", className)}
      {...props}
    />
  );
}

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: Ref<HTMLTableSectionElement>;
}

export function TableFooter({ className, ref, ...props }: TableFooterProps) {
  return (
    <tfoot
      ref={ref}
      className={cn("vds-table__tfoot", className)}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Row
 * ──────────────────────────────────────────────────────────────────────── */

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Mark the row as selected (paints accent stripe + tint). */
  selected?: boolean;
  ref?: Ref<HTMLTableRowElement>;
}

export function TableRow({
  className,
  selected,
  ref,
  ...props
}: TableRowProps) {
  return (
    <tr
      ref={ref}
      className={cn("vds-table__tr", className)}
      data-selected={selected || undefined}
      aria-selected={selected || undefined}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Head (th) — supports sorting and sticky columns.
 * ──────────────────────────────────────────────────────────────────────── */

export interface TableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
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

const defaultSortIndicator = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
);

export function TableHead({
  className,
  align,
  numeric,
  wrap,
  sticky,
  sortable,
  sortDirection,
  sortIndicator,
  children,
  ref,
  onKeyDown,
  ...props
}: TableHeadProps) {
  const handleKeyDown = sortable
    ? (e: React.KeyboardEvent<HTMLTableCellElement>) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).click();
        }
      }
    : onKeyDown;

  return (
    <th
      ref={ref}
      scope={props.scope ?? "col"}
      className={cn("vds-table__th", className)}
      data-align={align}
      data-numeric={numeric || undefined}
      data-wrap={wrap || undefined}
      data-sticky={sticky}
      data-sortable={sortable || undefined}
      aria-sort={sortable ? sortDirection ?? "none" : undefined}
      tabIndex={sortable ? 0 : undefined}
      role={sortable ? "columnheader" : undefined}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
      {sortable && (
        <span className="vds-table__sort-indicator" aria-hidden="true">
          {sortIndicator ?? defaultSortIndicator}
        </span>
      )}
    </th>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Cell (td)
 * ──────────────────────────────────────────────────────────────────────── */

export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> {
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

export function TableCell({
  className,
  align,
  numeric,
  wrap,
  sticky,
  ref,
  ...props
}: TableCellProps) {
  return (
    <td
      ref={ref}
      className={cn("vds-table__td", className)}
      data-align={align}
      data-numeric={numeric || undefined}
      data-wrap={wrap || undefined}
      data-sticky={sticky}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Caption — renders as a <caption> nested inside the <table>.
 *
 * ⚠ Must be used as a direct child of <Table> (the root). The browser
 * only honors <caption> when it's the first child of <table>, so place it
 * before <TableHeader>.
 * ──────────────────────────────────────────────────────────────────────── */

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  ref?: Ref<HTMLTableCaptionElement>;
}

export function TableCaption({ className, ref, ...props }: TableCaptionProps) {
  const { captionId } = useContext(TableContext);
  return (
    <caption
      ref={ref}
      id={captionId}
      className={cn("vds-table__caption", className)}
      {...props}
    />
  );
}
