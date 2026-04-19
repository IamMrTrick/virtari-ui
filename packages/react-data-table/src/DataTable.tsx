import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import type {
  Cell,
  Column,
  ColumnDef,
  Header,
  HeaderGroup,
  Row,
  Table,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Checkbox } from "@virtari-packages/react-checkbox";
import { cn } from "@virtari-packages/utils";
import {
  IconArrowsSort,
  IconChevronRight,
  IconChevronUp,
} from "@virtari-packages/react-icons";

import {
  DataTableProvider,
  useDataTableContext,
} from "./DataTableContext";
import { composeRefs } from "./utils/compose-refs";
import { buildColumnSizeVars } from "./utils/css-vars";
import { boolAttr, pinnedAttr, rowPinnedAttr, sortedAttr } from "./utils/data-attrs";
import { useDataTable } from "./use-data-table";
import { useControllableState } from "./use-controllable-state";
import { useColumnResize } from "./use-column-resize";
import { useAutoFitColumn } from "./use-auto-fit-column";
import { useHorizontalScrollShadow } from "./utils/scroll-sync";
import { useScrollDrag } from "./utils/use-scroll-drag";
import { useDataTableVirtualizer } from "./virtualizer";
import { useKeyboardGridNav } from "./use-keyboard-grid-nav";
import { useSrAnnouncements } from "./utils/announce";
import type {
  DataTableBorderMode,
  DataTableInteractionMode,
  DataTableMode,
  DataTableServerRequestState,
  DataTableSize,
  DataTableStatePairs,
  DataTableViewMode,
  DataTableVirtualizationOptions,
} from "./types";

/* ────────────────────────────────────────────────────────────
 * Root
 * ──────────────────────────────────────────────────────────── */

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
  onCellEdit?: (
    row: Row<unknown>,
    columnId: string,
    nextValue: unknown,
  ) => void | Promise<void>;
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

export type DataTableRootProps<TData, TValue = unknown> =
  DataTableRootOwnProps & (AdvancedProps<TData> | SimpleProps<TData, TValue>);

/* Shared renderer that takes a fully-built TanStack table instance. */
function DataTableRootRender<TData>({
  table,
  size,
  interactionMode,
  bordered,
  striped,
  stickyHeader,
  mode,
  virtualization,
  columnResizeMode,
  rowCount,
  viewMode,
  defaultViewMode,
  onViewModeChange,
  onCellEdit,
  onDataRequest,
  id,
  className,
  style,
  children,
  forwardedRef,
}: {
  table: Table<TData>;
  size: DataTableSize;
  interactionMode: DataTableInteractionMode;
  bordered: DataTableBorderMode;
  striped: boolean;
  stickyHeader: boolean;
  mode: DataTableMode;
  virtualization: false | DataTableVirtualizationOptions;
  columnResizeMode: "onChange" | "onEnd";
  rowCount: number | undefined;
  viewMode?: DataTableViewMode;
  defaultViewMode?: DataTableViewMode;
  onViewModeChange?: (mode: DataTableViewMode) => void;
  onCellEdit?: (
    row: Row<TData>,
    columnId: string,
    next: unknown,
  ) => void | Promise<void>;
  onDataRequest?: (state: DataTableServerRequestState) => void;
  id: string | undefined;
  className: string | undefined;
  style: CSSProperties | undefined;
  children: ReactNode;
  forwardedRef: React.Ref<HTMLDivElement>;
}) {
  const [viewModeState, setViewMode] = useControllableState<DataTableViewMode>({
    value: viewMode,
    defaultValue: defaultViewMode ?? "table",
    onChange: onViewModeChange,
  });
  /* Stage 11 — server-side mode: fire onDataRequest whenever any server-driven
   * state changes. Debounced 150ms to avoid firing on every key press. */
  useEffect(() => {
    if (mode !== "server" || !onDataRequest) return;
    const id = window.setTimeout(() => {
      const s = table.getState();
      onDataRequest({
        sorting: s.sorting,
        columnFilters: s.columnFilters,
        globalFilter: s.globalFilter ?? "",
        pagination: s.pagination,
        grouping: s.grouping,
      });
    }, 150);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mode,
    onDataRequest,
    table.getState().sorting,
    table.getState().columnFilters,
    table.getState().globalFilter,
    table.getState().pagination,
    table.getState().grouping,
  ]);

  return (
    <DataTableProvider<TData>
      id={id}
      table={table}
      size={size}
      interactionMode={interactionMode}
      bordered={bordered}
      striped={striped}
      stickyHeader={stickyHeader}
      mode={mode}
      virtualization={virtualization}
      columnResizeMode={columnResizeMode}
      rowCount={rowCount}
      viewMode={viewModeState}
      setViewMode={setViewMode}
      onCellEdit={onCellEdit}
      onDataRequest={onDataRequest}
    >
      <DataTableRootDiv
        className={className}
        style={style}
        size={size}
        interactionMode={interactionMode}
        bordered={bordered}
        striped={striped}
        stickyHeader={stickyHeader}
        mode={mode}
        virtualization={virtualization}
        forwardedRef={forwardedRef}
      >
        {children}
      </DataTableRootDiv>
    </DataTableProvider>
  );
}

/** Compute sticky-offset style for a pinned column cell. Returns empty
 * object for non-pinned columns. Uses TanStack's cumulative getStart/getAfter.
 */
function pinOffsetStyle(column: Column<unknown, unknown>): CSSProperties {
  const pinned = column.getIsPinned();
  if (pinned === "left") {
    return { left: `${column.getStart("left")}px` };
  }
  if (pinned === "right") {
    return { right: `${column.getAfter("right")}px` };
  }
  return {};
}

/** Inner div split so we can read context (resizing flag) next to the DOM. */
function DataTableRootDiv({
  size,
  interactionMode,
  bordered,
  striped,
  stickyHeader,
  mode,
  virtualization,
  className,
  style,
  children,
  forwardedRef,
}: {
  size: DataTableSize;
  interactionMode: DataTableInteractionMode;
  bordered: DataTableBorderMode;
  striped: boolean;
  stickyHeader: boolean;
  mode: DataTableMode;
  virtualization: false | DataTableVirtualizationOptions;
  className: string | undefined;
  style: CSSProperties | undefined;
  children: ReactNode;
  forwardedRef: React.Ref<HTMLDivElement>;
}) {
  const { table, scrollRef } = useDataTableContext();
  const resizingId = table.getState().columnSizingInfo.isResizingColumn as
    | string
    | false;
  const scrolledX = useHorizontalScrollShadow(scrollRef);
  useKeyboardGridNav(interactionMode === "grid", scrollRef);
  const announcement = useSrAnnouncements(table);
  return (
    <div
      ref={forwardedRef}
      className={cn("vds-data-table", className)}
      data-size={size}
      data-interaction-mode={interactionMode}
      data-bordered={bordered}
      data-striped={boolAttr(striped)}
      data-sticky-header={boolAttr(stickyHeader)}
      data-mode={mode}
      data-virtualized={boolAttr(virtualization !== false)}
      data-resizing={resizingId ? "" : undefined}
      data-scrolled-x={scrolledX}
      style={style}
    >
      {children}
      {/* Stage 15: screen-reader announcements for sort/filter/selection. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="vds-data-table-sr-only"
      >
        {announcement}
      </div>
    </div>
  );
}

/* Simple-API branch: builds the table internally. */
function DataTableSimpleRoot<TData, TValue>({
  columns,
  data,
  size = "md",
  interactionMode = "table",
  bordered = "rows",
  striped = false,
  stickyHeader = true,
  mode = "client",
  virtualization = false,
  columnResizeMode = "onChange",
  rowCount,
  viewMode,
  defaultViewMode,
  onViewModeChange,
  onCellEdit,
  onDataRequest,
  id,
  className,
  style,
  children,
  forwardedRef,
  ...statePairs
}: DataTableRootOwnProps &
  SimpleProps<TData, TValue> & {
    forwardedRef: React.Ref<HTMLDivElement>;
  }) {
  const table = useDataTable<TData, TValue>({
    columns,
    data,
    mode,
    columnResizeMode,
    rowCount,
    ...(statePairs as DataTableStatePairs),
  });
  return (
    <DataTableRootRender<TData>
      table={table}
      size={size}
      interactionMode={interactionMode}
      bordered={bordered}
      striped={striped}
      stickyHeader={stickyHeader}
      mode={mode}
      virtualization={virtualization}
      columnResizeMode={columnResizeMode}
      rowCount={rowCount}
      viewMode={viewMode}
      defaultViewMode={defaultViewMode}
      onViewModeChange={onViewModeChange}
      onCellEdit={
        onCellEdit as
          | ((row: Row<TData>, columnId: string, next: unknown) => void | Promise<void>)
          | undefined
      }
      onDataRequest={onDataRequest}
      id={id}
      className={className}
      style={style}
      forwardedRef={forwardedRef}
    >
      {children}
    </DataTableRootRender>
  );
}

/* Advanced-API branch: consumer passes the table. */
function DataTableAdvancedRoot<TData>({
  table,
  size = "md",
  interactionMode = "table",
  bordered = "rows",
  striped = false,
  stickyHeader = true,
  mode = "client",
  virtualization = false,
  columnResizeMode = "onChange",
  rowCount,
  viewMode,
  defaultViewMode,
  onViewModeChange,
  onCellEdit,
  onDataRequest,
  id,
  className,
  style,
  children,
  forwardedRef,
}: DataTableRootOwnProps &
  AdvancedProps<TData> & { forwardedRef: React.Ref<HTMLDivElement> }) {
  return (
    <DataTableRootRender<TData>
      table={table}
      size={size}
      interactionMode={interactionMode}
      bordered={bordered}
      striped={striped}
      stickyHeader={stickyHeader}
      mode={mode}
      virtualization={virtualization}
      columnResizeMode={columnResizeMode}
      rowCount={rowCount}
      viewMode={viewMode}
      defaultViewMode={defaultViewMode}
      onViewModeChange={onViewModeChange}
      onCellEdit={
        onCellEdit as
          | ((row: Row<TData>, columnId: string, next: unknown) => void | Promise<void>)
          | undefined
      }
      onDataRequest={onDataRequest}
      id={id}
      className={className}
      style={style}
      forwardedRef={forwardedRef}
    >
      {children}
    </DataTableRootRender>
  );
}

export const DataTableRoot = forwardRef(function DataTableRoot<
  TData,
  TValue = unknown,
>(
  props: DataTableRootProps<TData, TValue>,
  ref: React.Ref<HTMLDivElement>,
) {
  if ("table" in props && props.table) {
    return (
      <DataTableAdvancedRoot<TData>
        {...(props as DataTableRootOwnProps & AdvancedProps<TData>)}
        forwardedRef={ref}
      />
    );
  }
  return (
    <DataTableSimpleRoot<TData, TValue>
      {...(props as DataTableRootOwnProps & SimpleProps<TData, TValue>)}
      forwardedRef={ref}
    />
  );
}) as <TData, TValue = unknown>(
  props: DataTableRootProps<TData, TValue> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement;

/* ────────────────────────────────────────────────────────────
 * Toolbar — thin slot
 * ──────────────────────────────────────────────────────────── */

export interface DataTableToolbarProps
  extends HTMLAttributes<HTMLDivElement> {}

export const DataTableToolbar = forwardRef<HTMLDivElement, DataTableToolbarProps>(
  function DataTableToolbar({ className, children, ...props }, ref) {
    const { tableId } = useDataTableContext();
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-controls={tableId}
        className={cn("vds-data-table-toolbar", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * ScrollArea — owns the scroll ref (shared with virtualizer later)
 * ──────────────────────────────────────────────────────────── */

export interface DataTableScrollAreaProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Enable click-and-drag panning of the scroll area (like Google Sheets /
   * Figma canvas). Buttons/links/inputs/resize-handles remain clickable.
   * Default: `true`.
   */
  scrollDrag?: boolean;
}

export const DataTableScrollArea = forwardRef<
  HTMLDivElement,
  DataTableScrollAreaProps
>(function DataTableScrollArea(
  { className, children, scrollDrag = true, ...props },
  ref,
) {
  const { scrollRef } = useDataTableContext();
  useScrollDrag(scrollRef, scrollDrag);
  return (
    <div
      ref={composeRefs(scrollRef, ref)}
      data-scroll-drag={scrollDrag ? "" : undefined}
      className={cn("vds-data-table-scroll-area", className)}
      {...props}
    >
      {children}
    </div>
  );
});

/* ────────────────────────────────────────────────────────────
 * Table — the actual <table> element, sets per-column CSS vars
 * ──────────────────────────────────────────────────────────── */

export interface DataTableTableProps
  extends TableHTMLAttributes<HTMLTableElement> {}

export const DataTableTable = forwardRef<HTMLTableElement, DataTableTableProps>(
  function DataTableTable({ className, style, children, ...props }, ref) {
    const { table, interactionMode, tableId } = useDataTableContext();
    const sizeVars = useMemo(() => buildColumnSizeVars(table), [
      table,
      // Re-evaluate when any column size changes
      table.getState().columnSizing,
      table.getState().columnSizingInfo,
    ]);

    return (
      <table
        ref={ref}
        id={tableId}
        role={interactionMode === "grid" ? "grid" : undefined}
        className={cn("vds-data-table-table", className)}
        style={{ ...sizeVars, ...style }}
        {...props}
      >
        {children}
      </table>
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * Header — auto-renders rows by default; render-prop override supported
 * ──────────────────────────────────────────────────────────── */

export interface DataTableHeaderProps
  extends Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> {
  children?:
    | ReactNode
    | ((headerGroups: HeaderGroup<unknown>[]) => ReactNode);
}

export const DataTableHeader = forwardRef<
  HTMLTableSectionElement,
  DataTableHeaderProps
>(function DataTableHeader({ className, children, ...props }, ref) {
  const { table, stickyHeader } = useDataTableContext();
  const groups = table.getHeaderGroups() as HeaderGroup<unknown>[];

  const content =
    typeof children === "function"
      ? (children as (g: HeaderGroup<unknown>[]) => ReactNode)(groups)
      : (children ??
          groups.map((group) => (
            <DataTableHeaderGroup
              key={group.id}
              headerGroup={group as HeaderGroup<unknown>}
            />
          )));

  return (
    <thead
      ref={ref}
      role="rowgroup"
      data-sticky={boolAttr(stickyHeader)}
      className={cn("vds-data-table-header", className)}
      {...props}
    >
      {content}
    </thead>
  );
});

/* ────────────────────────────────────────────────────────────
 * HeaderGroup — <tr> wrapping a set of HeaderCells
 * ──────────────────────────────────────────────────────────── */

export interface DataTableHeaderGroupProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
  headerGroup: HeaderGroup<TData>;
  children?:
    | ReactNode
    | ((headers: Header<TData, unknown>[]) => ReactNode);
}

export const DataTableHeaderGroup = forwardRef<
  HTMLTableRowElement,
  DataTableHeaderGroupProps
>(function DataTableHeaderGroup(
  { headerGroup, className, children, ...props },
  ref,
) {
  const headers = headerGroup.headers as Header<unknown, unknown>[];
  const content =
    typeof children === "function"
      ? (children as (h: Header<unknown, unknown>[]) => ReactNode)(headers)
      : (children ??
          headers.map((header) => (
            <DataTableHeaderCell key={header.id} header={header} />
          )));
  return (
    <tr
      ref={ref}
      role="row"
      className={cn("vds-data-table-header-row", className)}
      {...props}
    >
      {content}
    </tr>
  );
});

/* ────────────────────────────────────────────────────────────
 * HeaderCell — <th> with data-sorted / data-pinned / data-can-resize
 * ──────────────────────────────────────────────────────────── */

export interface DataTableHeaderCellProps<TData = unknown, TValue = unknown>
  extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "children"> {
  header: Header<TData, TValue>;
  children?: ReactNode;
}

export const DataTableHeaderCell = forwardRef<
  HTMLTableCellElement,
  DataTableHeaderCellProps
>(function DataTableHeaderCell(
  { header, className, style, children, ...props },
  ref,
) {
  const column = header.column;
  const sort = sortedAttr(header);
  const pin = pinnedAttr(column);
  const canSort = column.getCanSort();
  const canResize = column.getCanResize();
  const ariaSort: ThHTMLAttributes<HTMLTableCellElement>["aria-sort"] =
    sort === "asc" ? "ascending" : sort === "desc" ? "descending" : canSort ? "none" : undefined;

  return (
    <th
      ref={ref}
      role="columnheader"
      colSpan={header.colSpan}
      scope="col"
      aria-sort={ariaSort}
      data-sorted={sort}
      data-pinned={pin}
      data-pinned-last={
        pin === "left" && column.getIsLastColumn("left") ? "" : undefined
      }
      data-pinned-first={
        pin === "right" && column.getIsFirstColumn("right") ? "" : undefined
      }
      data-can-sort={boolAttr(canSort)}
      data-can-resize={boolAttr(canResize)}
      data-resizing={boolAttr(column.getIsResizing())}
      data-column-id={column.id}
      className={cn("vds-data-table-header-cell", className)}
      style={{
        ["--col-size" as string]: `var(--col-${column.id})`,
        ...pinOffsetStyle(column as Column<unknown, unknown>),
        ...style,
      }}
      {...props}
    >
      {header.isPlaceholder ? null : (
        <>
          <span className="vds-data-table-header-cell-content">
            {children ?? (
              canSort ? (
                <DataTableSortTrigger header={header}>
                  {flexRender(column.columnDef.header, header.getContext())}
                </DataTableSortTrigger>
              ) : (
                flexRender(column.columnDef.header, header.getContext())
              )
            )}
          </span>
          {canResize && <DataTableResizeHandle header={header} />}
        </>
      )}
    </th>
  );
});

/* ────────────────────────────────────────────────────────────
 * Body — auto-renders rows; render-prop override supported
 * ──────────────────────────────────────────────────────────── */

export interface DataTableBodyProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> {
  children?: ReactNode | ((rows: Row<TData>[]) => ReactNode);
  emptyMessage?: ReactNode;
}

/* Inner body that takes `rows` directly; the wrapper below swaps between
 * a regular version and a memo'd version during active resize.
 * This is the TanStack `column-resizing-performant` pattern — during drag,
 * the memoized body sees the same `rows` reference and skips re-rendering,
 * while only the `<table style>` inline vars (the widths) change. */
interface InnerBodyProps {
  rows: Row<unknown>[];
  children?:
    | ReactNode
    | ((rows: Row<unknown>[]) => ReactNode);
}

function DataTableBodyInner({ rows, children }: InnerBodyProps) {
  if (typeof children === "function") {
    return <>{(children as (rs: Row<unknown>[]) => ReactNode)(rows)}</>;
  }
  if (children !== undefined) return <>{children}</>;
  return (
    <>
      {rows.map((row) =>
        row.getIsGrouped() ? (
          <DataTableGroupHeaderRow key={row.id} row={row} />
        ) : (
          <DataTableRow key={row.id} row={row} />
        ),
      )}
    </>
  );
}

const DataTableBodyInnerMemo = memo(DataTableBodyInner) as typeof DataTableBodyInner;

export const DataTableBody = forwardRef<
  HTMLTableSectionElement,
  DataTableBodyProps
>(function DataTableBody({ className, children, emptyMessage, ...props }, ref) {
  const { table, virtualization } = useDataTableContext();
  const rows = table.getRowModel().rows as Row<unknown>[];
  const isResizing = Boolean(
    table.getState().columnSizingInfo.isResizingColumn,
  );

  if (rows.length === 0 && emptyMessage) {
    const colCount = table.getVisibleFlatColumns().length || 1;
    return (
      <tbody
        ref={ref}
        role="rowgroup"
        data-empty=""
        className={cn("vds-data-table-body", className)}
        {...props}
      >
        <tr className="vds-data-table-row">
          <td
            colSpan={colCount}
            className="vds-data-table-cell vds-data-table-empty-cell"
          >
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  if (virtualization !== false) {
    /* Render-prop mode is not compatible with virtualization — the consumer
     * would get ALL rows, not the virtualized window. We render our own
     * internal virtualized body and ignore `children` in that case. */
    return (
      <DataTableBodyVirtualized
        ref={ref}
        className={className}
        rows={rows}
        virtualizationOptions={virtualization}
        {...props}
      />
    );
  }

  const Inner = isResizing ? DataTableBodyInnerMemo : DataTableBodyInner;

  return (
    <tbody
      ref={ref}
      role="rowgroup"
      className={cn("vds-data-table-body", className)}
      {...props}
    >
      <Inner rows={rows} children={children as InnerBodyProps["children"]} />
    </tbody>
  );
});

/* ────────────────────────────────────────────────────────────
 * BodyVirtualized — render window of rows with top/bottom spacer <tr>s.
 * Uses @tanstack/react-virtual via the isolated virtualizer.ts module.
 * NOTE: transforms on <tr> break table layout in some browsers —
 * the spacer-row approach is the portable way to absolutely position
 * a virtualized window inside a `table-layout: fixed` <table>.
 * ──────────────────────────────────────────────────────────── */

interface DataTableBodyVirtualizedProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  rows: Row<unknown>[];
  virtualizationOptions: DataTableVirtualizationOptions;
}

const DataTableBodyVirtualized = forwardRef<
  HTMLTableSectionElement,
  DataTableBodyVirtualizedProps
>(function DataTableBodyVirtualized(
  { rows, virtualizationOptions, className, ...props },
  ref,
) {
  const { scrollRef } = useDataTableContext();
  const virt = useDataTableVirtualizer({
    count: rows.length,
    scrollRef,
    estimateSize: virtualizationOptions.estimateRowSize ?? 40,
    overscan: virtualizationOptions.overscan ?? 8,
  });
  const items = virt.getVirtualItems();
  const totalSize = virt.getTotalSize();
  const paddingTop = items[0]?.start ?? 0;
  const paddingBottom =
    items.length > 0 ? totalSize - (items[items.length - 1]!.end ?? 0) : 0;
  const { table } = useDataTableContext();
  const colCount = table.getVisibleFlatColumns().length || 1;

  return (
    <tbody
      ref={ref}
      role="rowgroup"
      className={cn("vds-data-table-body", className)}
      {...props}
    >
      {paddingTop > 0 && (
        <tr
          aria-hidden="true"
          className="vds-data-table-virtual-spacer"
          style={{ blockSize: paddingTop }}
        >
          <td colSpan={colCount} style={{ padding: 0, border: 0 }} />
        </tr>
      )}
      {items.map((vi) => {
        const row = rows[vi.index];
        if (!row) return null;
        return (
          <DataTableRow
            key={row.id}
            row={row}
            data-index={vi.index}
            ref={virt.measureElement as unknown as React.Ref<HTMLTableRowElement>}
          />
        );
      })}
      {paddingBottom > 0 && (
        <tr
          aria-hidden="true"
          className="vds-data-table-virtual-spacer"
          style={{ blockSize: paddingBottom }}
        >
          <td colSpan={colCount} style={{ padding: 0, border: 0 }} />
        </tr>
      )}
    </tbody>
  );
});

/* ────────────────────────────────────────────────────────────
 * Row
 * ──────────────────────────────────────────────────────────── */

export interface DataTableRowProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
  row: Row<TData>;
  children?: ReactNode | ((cells: Cell<TData, unknown>[]) => ReactNode);
}

export const DataTableRow = forwardRef<HTMLTableRowElement, DataTableRowProps>(
  function DataTableRow({ row, className, children, ...props }, ref) {
    const selected = row.getIsSelected();
    const expanded = row.getIsExpanded();
    const pinned = rowPinnedAttr(row as Row<unknown>);
    const cells = row.getVisibleCells() as Cell<unknown, unknown>[];
    const content =
      typeof children === "function"
        ? (children as (cs: Cell<unknown, unknown>[]) => ReactNode)(cells)
        : (children ??
            cells.map((cell) => <DataTableCell key={cell.id} cell={cell} />));

    return (
      <tr
        ref={ref}
        role="row"
        aria-selected={selected || undefined}
        aria-rowindex={row.index + 1}
        data-selected={boolAttr(selected)}
        data-expanded={boolAttr(expanded)}
        data-pinned={pinned}
        data-index={row.index}
        data-row-id={row.id}
        className={cn("vds-data-table-row", className)}
        {...props}
      >
        {content}
      </tr>
    );
  },
);

/* ────────────────────────────────────────────────────────────
 * Cell
 * ──────────────────────────────────────────────────────────── */

export interface DataTableCellProps<TData = unknown, TValue = unknown>
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "children"> {
  cell: Cell<TData, TValue>;
  children?: ReactNode;
}

export const DataTableCell = forwardRef<
  HTMLTableCellElement,
  DataTableCellProps
>(function DataTableCell({ cell, className, style, children, ...props }, ref) {
  const { interactionMode } = useDataTableContext();
  const column = cell.column;
  const pin = pinnedAttr(column);
  /* Grid mode uses roving tabindex — the first cell gets tabIndex=0 and
   * the rest get -1; arrow-key handler swaps which cell is tabbable. */
  const isFirstGridCell =
    interactionMode === "grid" &&
    cell.row.index === 0 &&
    column.getIndex() === 0;
  return (
    <td
      ref={ref}
      role={interactionMode === "grid" ? "gridcell" : "cell"}
      tabIndex={
        interactionMode === "grid" ? (isFirstGridCell ? 0 : -1) : undefined
      }
      data-pinned={pin}
      data-pinned-last={
        pin === "left" && column.getIsLastColumn("left") ? "" : undefined
      }
      data-pinned-first={
        pin === "right" && column.getIsFirstColumn("right") ? "" : undefined
      }
      data-column-id={column.id}
      className={cn("vds-data-table-cell", className)}
      style={{
        ["--col-size" as string]: `var(--col-${column.id})`,
        ...pinOffsetStyle(column as Column<unknown, unknown>),
        ...style,
      }}
      {...props}
    >
      <span className="vds-data-table-cell-content">
        {children ?? flexRender(column.columnDef.cell, cell.getContext())}
      </span>
    </td>
  );
});

/* ────────────────────────────────────────────────────────────
 * Footer — auto-renders footer groups
 * ──────────────────────────────────────────────────────────── */

export interface DataTableFooterProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const DataTableFooter = forwardRef<
  HTMLTableSectionElement,
  DataTableFooterProps
>(function DataTableFooter({ className, children, ...props }, ref) {
  const { table } = useDataTableContext();
  const groups = table.getFooterGroups() as HeaderGroup<unknown>[];
  const hasFooter = groups.some((g) =>
    g.headers.some((h) => h.column.columnDef.footer),
  );
  if (!hasFooter && !children) return null;
  return (
    <tfoot
      ref={ref}
      role="rowgroup"
      className={cn("vds-data-table-footer", className)}
      {...props}
    >
      {children ??
        groups.map((group) => (
          <DataTableFooterRow key={group.id} footerGroup={group} />
        ))}
    </tfoot>
  );
});

export interface DataTableFooterRowProps<TData = unknown>
  extends HTMLAttributes<HTMLTableRowElement> {
  footerGroup: HeaderGroup<TData>;
}

export const DataTableFooterRow = forwardRef<
  HTMLTableRowElement,
  DataTableFooterRowProps
>(function DataTableFooterRow(
  { footerGroup, className, children, ...props },
  ref,
) {
  return (
    <tr
      ref={ref}
      role="row"
      className={cn("vds-data-table-footer-row", className)}
      {...props}
    >
      {children ??
        footerGroup.headers.map((header) => (
          <DataTableFooterCell key={header.id} header={header} />
        ))}
    </tr>
  );
});

export interface DataTableFooterCellProps<TData = unknown, TValue = unknown>
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "children"> {
  header: Header<TData, TValue>;
  children?: ReactNode;
}

export const DataTableFooterCell = forwardRef<
  HTMLTableCellElement,
  DataTableFooterCellProps
>(function DataTableFooterCell(
  { header, className, style, children, ...props },
  ref,
) {
  const column = header.column;
  const pin = pinnedAttr(column);
  return (
    <td
      ref={ref}
      role="cell"
      data-pinned={pin}
      data-pinned-last={
        pin === "left" && column.getIsLastColumn("left") ? "" : undefined
      }
      data-pinned-first={
        pin === "right" && column.getIsFirstColumn("right") ? "" : undefined
      }
      data-column-id={column.id}
      className={cn("vds-data-table-footer-cell", className)}
      style={{
        ["--col-size" as string]: `var(--col-${column.id})`,
        ...pinOffsetStyle(column as Column<unknown, unknown>),
        ...style,
      }}
      {...props}
    >
      {header.isPlaceholder ? null : children ??
        flexRender(column.columnDef.footer, header.getContext())}
    </td>
  );
});

/* ────────────────────────────────────────────────────────────
 * Empty / LoadingOverlay — minimal for Stage 2
 * ──────────────────────────────────────────────────────────── */

export interface DataTableEmptyProps
  extends HTMLAttributes<HTMLDivElement> {}

export const DataTableEmpty = forwardRef<HTMLDivElement, DataTableEmptyProps>(
  function DataTableEmpty({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="status"
        className={cn("vds-data-table-empty", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export interface DataTableLoadingOverlayProps
  extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  label?: ReactNode;
}

export const DataTableLoadingOverlay = forwardRef<
  HTMLDivElement,
  DataTableLoadingOverlayProps
>(function DataTableLoadingOverlay(
  { open = true, label = "Loading", className, children, ...props },
  ref,
) {
  if (!open) return null;
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-state="open"
      className={cn("vds-data-table-loading", className)}
      {...props}
    >
      {children ?? <span className="vds-data-table-loading-label">{label}</span>}
    </div>
  );
});

/* ────────────────────────────────────────────────────────────
 * SortTrigger — button inside HeaderCell; toggles sort on click,
 * respects shift-click multi-sort (TanStack handles the state).
 * ──────────────────────────────────────────────────────────── */

export interface DataTableSortTriggerProps<TData = unknown, TValue = unknown>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  header: Header<TData, TValue>;
  children?: ReactNode;
}

export const DataTableSortTrigger = forwardRef<
  HTMLButtonElement,
  DataTableSortTriggerProps
>(function DataTableSortTrigger(
  { header, className, children, onClick, ...props },
  ref,
) {
  const column = header.column;
  const sort = sortedAttr(header);
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      column.getToggleSortingHandler()?.(e);
    },
    [column, onClick],
  );
  const nextLabel =
    sort === undefined
      ? "ascending"
      : sort === "asc"
        ? "descending"
        : "no sort";
  return (
    <button
      ref={ref}
      type="button"
      data-sorted={sort}
      aria-label={`Sort by column, ${nextLabel}`}
      className={cn("vds-data-table-sort-trigger", className)}
      onClick={handleClick}
      {...props}
    >
      <span className="vds-data-table-sort-label">{children}</span>
      <DataTableSortIcon sort={sort} />
    </button>
  );
});

/* Visual sort glyph — simple chevron; rotates based on data-direction. */

interface DataTableSortIconProps {
  sort: "asc" | "desc" | undefined;
}

function DataTableSortIcon({ sort }: DataTableSortIconProps) {
  if (sort === undefined) {
    return (
      <IconArrowsSort
        className="vds-data-table-sort-icon"
        data-direction="none"
        size={12}
        stroke={1.75}
        aria-hidden
        focusable={false}
      />
    );
  }
  return (
    <IconChevronUp
      className="vds-data-table-sort-icon"
      data-direction={sort}
      size={12}
      stroke={2}
      aria-hidden
      focusable={false}
    />
  );
}

/* ────────────────────────────────────────────────────────────
 * GlobalFilter — search input that writes to table.globalFilter state.
 * ──────────────────────────────────────────────────────────── */

export interface DataTableGlobalFilterProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
  > {
  /** Debounce in ms before committing to table state. Default 150. */
  debounceMs?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const DataTableGlobalFilter = forwardRef<
  HTMLInputElement,
  DataTableGlobalFilterProps
>(function DataTableGlobalFilter(
  {
    debounceMs = 150,
    value,
    defaultValue,
    onValueChange,
    placeholder = "Search…",
    className,
    ...props
  },
  ref,
) {
  const { table } = useDataTableContext();
  const currentTableValue =
    (table.getState().globalFilter as string | undefined) ?? "";
  const [local, setLocal] = useState<string>(
    value ?? defaultValue ?? currentTableValue,
  );

  /* Keep local state in sync with a controlled `value` prop. */
  useEffect(() => {
    if (value !== undefined) setLocal(value);
  }, [value]);

  /* Debounced commit to the table + consumer. */
  useEffect(() => {
    if (local === currentTableValue) return;
    const id = window.setTimeout(() => {
      table.setGlobalFilter(local);
      onValueChange?.(local);
    }, debounceMs);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local, debounceMs]);

  return (
    <input
      ref={ref}
      type="search"
      role="searchbox"
      aria-label="Search table"
      placeholder={placeholder}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      className={cn("vds-data-table-global-filter", className)}
      {...props}
    />
  );
});

/* ────────────────────────────────────────────────────────────
 * Row / header selection checkboxes — uses Virtari Checkbox
 * (which wraps the Checkbox primitive and handles indeterminate).
 * ──────────────────────────────────────────────────────────── */

export interface DataTableSelectAllCheckboxProps {
  className?: string;
  /** Scope: all rows vs current page. Default "page". */
  scope?: "page" | "all";
}

export function DataTableSelectAllCheckbox({
  className,
  scope = "page",
}: DataTableSelectAllCheckboxProps) {
  const { table } = useDataTableContext();
  const allSelected =
    scope === "all"
      ? table.getIsAllRowsSelected()
      : table.getIsAllPageRowsSelected();
  const someSelected =
    scope === "all"
      ? table.getIsSomeRowsSelected()
      : table.getIsSomePageRowsSelected();
  const handler =
    scope === "all"
      ? table.getToggleAllRowsSelectedHandler()
      : table.getToggleAllPageRowsSelectedHandler();
  const checked = allSelected
    ? true
    : someSelected
      ? "indeterminate"
      : false;
  return (
    <Checkbox
      className={cn("vds-data-table-select-all", className)}
      checked={checked}
      aria-label={
        scope === "all"
          ? "Select all rows across pages"
          : "Select all rows on this page"
      }
      onCheckedChange={() =>
        handler({
          target: { checked: !allSelected },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
      }
    />
  );
}

export interface DataTableRowSelectCheckboxProps<TData = unknown> {
  row: Row<TData>;
  className?: string;
}

export function DataTableRowSelectCheckbox<TData>({
  row,
  className,
}: DataTableRowSelectCheckboxProps<TData>) {
  const selected = row.getIsSelected();
  const canSelect = row.getCanSelect();
  const handler = row.getToggleSelectedHandler();
  return (
    <Checkbox
      className={cn("vds-data-table-row-select", className)}
      checked={selected}
      disabled={!canSelect}
      aria-label="Select row"
      onCheckedChange={() =>
        handler({
          target: { checked: !selected },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
      }
    />
  );
}

/* ────────────────────────────────────────────────────────────
 * ResizeHandle — 8px hit zone on the header cell's trailing edge.
 * Pointer drag delegates to TanStack. Keyboard arrows adjust width.
 * Double-click triggers auto-fit to max visible content.
 * ──────────────────────────────────────────────────────────── */

export interface DataTableResizeHandleProps<TData = unknown, TValue = unknown>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onKeyDown"> {
  header: Header<TData, TValue>;
}

export const DataTableResizeHandle = forwardRef<
  HTMLDivElement,
  DataTableResizeHandleProps
>(function DataTableResizeHandle({ header, className, ...props }, ref) {
  const { isResizing, onKeyDownAdjust, currentSize, minSize, maxSize } =
    useColumnResize(header);
  const { fit } = useAutoFitColumn(header.column.id);
  const columnName = String(header.column.columnDef.header ?? header.column.id);

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="vertical"
      aria-label={`Resize ${columnName} column`}
      aria-valuenow={Math.round(currentSize)}
      aria-valuemin={minSize}
      aria-valuemax={maxSize === Number.POSITIVE_INFINITY ? undefined : maxSize}
      tabIndex={0}
      data-resizing={boolAttr(isResizing)}
      className={cn("vds-data-table-resize-handle", className)}
      onPointerDown={(e) => {
        /* Stop the pointerdown from reaching the header cell — otherwise
         * dnd-kit's column-reorder listeners on the cell would steal the
         * gesture. Resize must always win on the resize handle. */
        e.stopPropagation();
        /* Let TanStack's internal resize state machine do the drag. */
        header.getResizeHandler()(e);
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
        header.getResizeHandler()(e);
      }}
      onDoubleClick={(e) => {
        e.preventDefault();
        fit();
      }}
      onKeyDown={onKeyDownAdjust}
      /* A mousedown on the handle should not bubble into the sort-trigger. */
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      <span
        className="vds-data-table-resize-handle-line"
        aria-hidden="true"
      />
    </div>
  );
});

/* ────────────────────────────────────────────────────────────
 * ColumnGuide — full-height guideline overlay shown during drag.
 * Positioned absolutely relative to the .vds-data-table root.
 * ──────────────────────────────────────────────────────────── */

export function DataTableColumnGuide() {
  const { table } = useDataTableContext();
  const info = table.getState().columnSizingInfo;
  const resizingId = info.isResizingColumn as string | false;
  if (!resizingId) return null;
  const offset = (info.startOffset ?? 0) + (info.deltaOffset ?? 0);
  return (
    <div
      className="vds-data-table-resize-guideline"
      aria-hidden="true"
      style={{
        ["--data-table-guideline-offset" as string]: `${offset}px`,
      }}
    />
  );
}

/* ────────────────────────────────────────────────────────────
 * PinColumnTrigger — cycles a column's pin state: none → side → none.
 * When `side` prop is set, pressing pins to that side (or unpins).
 * ──────────────────────────────────────────────────────────── */

export interface DataTablePinColumnTriggerProps<TData = unknown, TValue = unknown>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  column: Column<TData, TValue>;
  side: "left" | "right";
  children?: ReactNode;
}

export const DataTablePinColumnTrigger = forwardRef<
  HTMLButtonElement,
  DataTablePinColumnTriggerProps
>(function DataTablePinColumnTrigger(
  { column, side, className, children, onClick, ...props },
  ref,
) {
  const pinned = column.getIsPinned();
  const isPressed = pinned === side;
  const toggle = () => {
    column.pin(isPressed ? false : side);
  };
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isPressed}
      aria-label={`Pin column to ${side}`}
      data-pinned={isPressed ? side : undefined}
      className={cn("vds-data-table-pin-trigger", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggle();
      }}
      {...props}
    >
      {children ?? (isPressed ? "Unpin" : `Pin ${side}`)}
    </button>
  );
});

/* ────────────────────────────────────────────────────────────
 * RowExpandTrigger — toggles `row.getIsExpanded()` when row has subRows
 * or expansion is enabled. Renders a chevron that rotates 90° when open.
 * ──────────────────────────────────────────────────────────── */

export interface DataTableRowExpandTriggerProps<TData = unknown>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  row: Row<TData>;
  children?: ReactNode;
}

export const DataTableRowExpandTrigger = forwardRef<
  HTMLButtonElement,
  DataTableRowExpandTriggerProps
>(function DataTableRowExpandTrigger(
  { row, className, children, onClick, ...props },
  ref,
) {
  const canExpand = row.getCanExpand();
  const expanded = row.getIsExpanded();
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={expanded}
      aria-label={expanded ? "Collapse row" : "Expand row"}
      disabled={!canExpand}
      data-expanded={expanded ? "" : undefined}
      className={cn("vds-data-table-row-expand-trigger", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) row.toggleExpanded();
      }}
      {...props}
    >
      {children ?? (
        <IconChevronRight
          className="vds-data-table-row-expand-icon"
          size={10}
          stroke={1.75}
          aria-hidden
          focusable={false}
        />
      )}
    </button>
  );
});

/* ────────────────────────────────────────────────────────────
 * RowPinTrigger — toggle row pin to top/bottom.
 * ──────────────────────────────────────────────────────────── */

export interface DataTableRowPinTriggerProps<TData = unknown>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  row: Row<TData>;
  side: "top" | "bottom";
  children?: ReactNode;
}

export const DataTableRowPinTrigger = forwardRef<
  HTMLButtonElement,
  DataTableRowPinTriggerProps
>(function DataTableRowPinTrigger(
  { row, side, className, children, onClick, ...props },
  ref,
) {
  const pinned = row.getIsPinned();
  const isPressed = pinned === side;
  const toggle = () => {
    row.pin(isPressed ? false : side);
  };
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isPressed}
      aria-label={`Pin row to ${side}`}
      data-pinned={isPressed ? side : undefined}
      className={cn("vds-data-table-row-pin-trigger", className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggle();
      }}
      {...props}
    >
      {children ?? (isPressed ? "Unpin" : `Pin ${side}`)}
    </button>
  );
});

/* ────────────────────────────────────────────────────────────
 * ColumnVisibility — checkbox list of visible columns inside a popover.
 * Consumer passes the Popover wrapper; this component renders only
 * the inner list of toggle items. For a complete popover UI, compose
 * with @virtari-packages/react-popover (or use DataTable.ColumnMenu).
 * ──────────────────────────────────────────────────────────── */

export interface DataTableColumnVisibilityProps {
  className?: string;
  /** Include only columns matching this predicate; default: all that support hiding. */
  filter?: (column: Column<unknown, unknown>) => boolean;
}

export function DataTableColumnVisibility({
  className,
  filter,
}: DataTableColumnVisibilityProps) {
  const { table } = useDataTableContext();
  const columns = table
    .getAllLeafColumns()
    .filter((c) => c.getCanHide() && (filter ? filter(c as Column<unknown, unknown>) : true));
  return (
    <ul
      role="group"
      aria-label="Toggle column visibility"
      className={cn("vds-data-table-column-visibility", className)}
    >
      {columns.map((col) => {
        const visible = col.getIsVisible();
        const label = String(col.columnDef.header ?? col.id);
        return (
          <li key={col.id}>
            <label className="vds-data-table-column-visibility-item">
              <input
                type="checkbox"
                checked={visible}
                onChange={(e) => col.toggleVisibility(e.target.checked)}
              />
              <span>{label}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

/* ────────────────────────────────────────────────────────────
 * GroupHeaderRow — renders a header row for an aggregated group.
 * Uses `row.groupingColumnId` + `row.subRows.length` + `row.getValue`.
 * ──────────────────────────────────────────────────────────── */

export interface DataTableGroupHeaderRowProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLTableRowElement>, "children"> {
  row: Row<TData>;
}

export const DataTableGroupHeaderRow = forwardRef<
  HTMLTableRowElement,
  DataTableGroupHeaderRowProps
>(function DataTableGroupHeaderRow({ row, className, ...props }, ref) {
  const { table } = useDataTableContext();
  const colCount = table.getVisibleFlatColumns().length || 1;
  const groupColId = row.groupingColumnId;
  const groupValue = groupColId ? row.getValue(groupColId) : "Group";
  return (
    <tr
      ref={ref}
      role="row"
      data-group-row=""
      data-depth={row.depth}
      className={cn("vds-data-table-group-header-row", className)}
      {...props}
    >
      <td
        colSpan={colCount}
        className="vds-data-table-group-header-cell"
        style={{ paddingInlineStart: `${row.depth * 16 + 8}px` }}
      >
        <DataTableRowExpandTrigger row={row} />
        <span className="vds-data-table-group-label">
          {String(groupValue ?? "—")}
          <span className="vds-data-table-group-count">
            ({row.subRows.length})
          </span>
        </span>
      </td>
    </tr>
  );
});
