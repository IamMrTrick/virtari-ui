"use client";
'use strict';

var react = require('react');
var reactTable = require('@tanstack/react-table');
var reactCheckbox = require('@virtari/react-checkbox');
var utils = require('@virtari/utils');
var reactIcons = require('@virtari/react-icons');
var jsxRuntime = require('react/jsx-runtime');
var reactVirtual = require('@tanstack/react-virtual');
var reactDropdownMenu = require('@virtari/react-dropdown-menu');
var reactAvatar = require('@virtari/react-avatar');
var reactBadge = require('@virtari/react-badge');
var reactInput = require('@virtari/react-input');
var reactDrawer = require('@virtari/react-drawer');
var reactSwitch = require('@virtari/react-switch');
var reactPopover = require('@virtari/react-popover');

// src/DataTable.tsx
var DataTableCtx = react.createContext(null);
function DataTableProvider({
  id,
  children,
  ...rest
}) {
  const autoId = react.useId();
  const scrollRef = react.useRef(null);
  const value = react.useMemo(
    () => ({
      ...rest,
      tableId: id ?? `vds-data-table-${autoId}`,
      scrollRef
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      rest.table,
      rest.size,
      rest.interactionMode,
      rest.bordered,
      rest.striped,
      rest.stickyHeader,
      rest.mode,
      rest.virtualization,
      rest.columnResizeMode,
      rest.rowCount,
      rest.viewMode,
      rest.setViewMode,
      rest.onCellEdit,
      rest.onDataRequest,
      id,
      autoId
    ]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(DataTableCtx.Provider, { value, children });
}
function useDataTableContext() {
  const ctx = react.useContext(DataTableCtx);
  if (!ctx) {
    throw new Error(
      "useDataTableContext must be used inside <DataTable.Root>."
    );
  }
  return ctx;
}

// src/utils/compose-refs.ts
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref != null) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    for (const ref of refs) setRef(ref, node);
  };
}

// src/utils/css-vars.ts
function buildColumnSizeVars(table) {
  const headers = table.getFlatHeaders();
  const out = {};
  for (const header of headers) {
    out[`--col-${header.column.id}`] = `${header.getSize()}px`;
  }
  return out;
}
function columnVar(columnId) {
  return `var(--col-${columnId})`;
}

// src/utils/data-attrs.ts
function sortedAttr(header) {
  const s = header.column.getIsSorted();
  return s === false ? void 0 : s;
}
function pinnedAttr(column) {
  const p = column.getIsPinned();
  return p === false ? void 0 : p;
}
function rowPinnedAttr(row) {
  const p = row.getIsPinned();
  return p === false ? void 0 : p;
}
function boolAttr(value) {
  return value ? "" : void 0;
}
function useControllableState({
  value,
  defaultValue,
  onChange
}) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = react.useState(defaultValue);
  const current = isControlled ? value : internal;
  const onChangeRef = react.useRef(onChange);
  onChangeRef.current = onChange;
  const set = react.useCallback(
    (next) => {
      const resolved = typeof next === "function" ? next(current) : next;
      if (!isControlled) setInternal(resolved);
      onChangeRef.current?.(resolved);
    },
    [current, isControlled]
  );
  return [current, set];
}
function resolveUpdater(updater, prev) {
  return typeof updater === "function" ? updater(prev) : updater;
}

// src/use-data-table.ts
function useDataTable(options) {
  const {
    columns,
    data,
    mode = "client",
    columnResizeMode = "onChange",
    rowCount,
    sorting,
    defaultSorting,
    onSortingChange,
    columnFilters,
    defaultColumnFilters,
    onColumnFiltersChange,
    globalFilter,
    defaultGlobalFilter,
    onGlobalFilterChange,
    rowSelection,
    defaultRowSelection,
    onRowSelectionChange,
    columnSizing,
    defaultColumnSizing,
    onColumnSizingChange,
    columnOrder,
    defaultColumnOrder,
    onColumnOrderChange,
    columnPinning,
    defaultColumnPinning,
    onColumnPinningChange,
    columnVisibility,
    defaultColumnVisibility,
    onColumnVisibilityChange,
    pagination,
    defaultPagination,
    onPaginationChange,
    grouping,
    defaultGrouping,
    onGroupingChange,
    expanded,
    defaultExpanded,
    onExpandedChange,
    rowPinning,
    defaultRowPinning,
    onRowPinningChange
  } = options;
  const [sortingState, setSorting] = useControllableState({
    value: sorting,
    defaultValue: defaultSorting ?? [],
    onChange: onSortingChange
  });
  const [columnFiltersState, setColumnFilters] = useControllableState({
    value: columnFilters,
    defaultValue: defaultColumnFilters ?? [],
    onChange: onColumnFiltersChange
  });
  const [globalFilterState, setGlobalFilter] = useControllableState({
    value: globalFilter,
    defaultValue: defaultGlobalFilter ?? "",
    onChange: onGlobalFilterChange
  });
  const [rowSelectionState, setRowSelection] = useControllableState({
    value: rowSelection,
    defaultValue: defaultRowSelection ?? {},
    onChange: onRowSelectionChange
  });
  const [columnSizingState, setColumnSizing] = useControllableState({
    value: columnSizing,
    defaultValue: defaultColumnSizing ?? {},
    onChange: onColumnSizingChange
  });
  const [columnOrderState, setColumnOrder] = useControllableState({
    value: columnOrder,
    defaultValue: defaultColumnOrder ?? [],
    onChange: onColumnOrderChange
  });
  const [columnPinningState, setColumnPinning] = useControllableState({
    value: columnPinning,
    defaultValue: defaultColumnPinning ?? { left: [], right: [] },
    onChange: onColumnPinningChange
  });
  const [columnVisibilityState, setColumnVisibility] = useControllableState({
    value: columnVisibility,
    defaultValue: defaultColumnVisibility ?? {},
    onChange: onColumnVisibilityChange
  });
  const [paginationState, setPagination] = useControllableState({
    value: pagination,
    defaultValue: defaultPagination ?? { pageIndex: 0, pageSize: 10 },
    onChange: onPaginationChange
  });
  const [groupingState, setGrouping] = useControllableState({
    value: grouping,
    defaultValue: defaultGrouping ?? [],
    onChange: onGroupingChange
  });
  const [expandedState, setExpanded] = useControllableState({
    value: expanded,
    defaultValue: defaultExpanded ?? {},
    onChange: onExpandedChange
  });
  const [rowPinningState, setRowPinning] = useControllableState({
    value: rowPinning,
    defaultValue: defaultRowPinning ?? { top: [], bottom: [] },
    onChange: onRowPinningChange
  });
  const bridgeWithPrev = (setter, current) => (updater) => setter(resolveUpdater(updater, current));
  const isServer = mode === "server";
  return reactTable.useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState,
      columnFilters: columnFiltersState,
      globalFilter: globalFilterState,
      rowSelection: rowSelectionState,
      columnSizing: columnSizingState,
      columnOrder: columnOrderState,
      columnPinning: columnPinningState,
      columnVisibility: columnVisibilityState,
      pagination: paginationState,
      grouping: groupingState,
      expanded: expandedState,
      rowPinning: rowPinningState
    },
    columnResizeMode,
    enableColumnResizing: true,
    enableRowSelection: true,
    enableSorting: true,
    enableMultiSort: true,
    enableGrouping: true,
    enableExpanding: true,
    enableRowPinning: true,
    enableColumnPinning: true,
    rowCount,
    manualSorting: isServer,
    manualFiltering: isServer,
    manualPagination: isServer,
    manualGrouping: isServer,
    onSortingChange: bridgeWithPrev(setSorting, sortingState),
    onColumnFiltersChange: bridgeWithPrev(setColumnFilters, columnFiltersState),
    onGlobalFilterChange: bridgeWithPrev(setGlobalFilter, globalFilterState),
    onRowSelectionChange: bridgeWithPrev(setRowSelection, rowSelectionState),
    onColumnSizingChange: bridgeWithPrev(setColumnSizing, columnSizingState),
    onColumnOrderChange: bridgeWithPrev(setColumnOrder, columnOrderState),
    onColumnPinningChange: bridgeWithPrev(setColumnPinning, columnPinningState),
    onColumnVisibilityChange: bridgeWithPrev(
      setColumnVisibility,
      columnVisibilityState
    ),
    onPaginationChange: bridgeWithPrev(setPagination, paginationState),
    onGroupingChange: bridgeWithPrev(setGrouping, groupingState),
    onExpandedChange: bridgeWithPrev(setExpanded, expandedState),
    onRowPinningChange: bridgeWithPrev(setRowPinning, rowPinningState),
    getCoreRowModel: reactTable.getCoreRowModel(),
    getSortedRowModel: isServer ? void 0 : reactTable.getSortedRowModel(),
    getFilteredRowModel: isServer ? void 0 : reactTable.getFilteredRowModel(),
    getPaginationRowModel: isServer ? void 0 : reactTable.getPaginationRowModel(),
    getExpandedRowModel: reactTable.getExpandedRowModel(),
    getGroupedRowModel: isServer ? void 0 : reactTable.getGroupedRowModel(),
    getFacetedRowModel: isServer ? void 0 : reactTable.getFacetedRowModel(),
    getFacetedUniqueValues: isServer ? void 0 : reactTable.getFacetedUniqueValues()
  });
}
var BASE_STEP = 8;
var LARGE_STEP = 32;
function useColumnResize(header) {
  const { table } = useDataTableContext();
  const column = header.column;
  const isResizing = column.getIsResizing();
  const currentSize = header.getSize();
  const minSize = column.columnDef.minSize ?? 40;
  const maxSize = column.columnDef.maxSize ?? Number.POSITIVE_INFINITY;
  const setSize = react.useCallback(
    (next) => {
      const clamped = Math.max(minSize, Math.min(maxSize, Math.round(next)));
      table.setColumnSizing((prev) => ({ ...prev, [column.id]: clamped }));
    },
    [table, column.id, minSize, maxSize]
  );
  const onKeyDownAdjust = react.useCallback(
    (e) => {
      const step = e.shiftKey ? LARGE_STEP : BASE_STEP;
      const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
      const dir = rtl ? -1 : 1;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setSize(currentSize - step * dir);
          break;
        case "ArrowRight":
          e.preventDefault();
          setSize(currentSize + step * dir);
          break;
        case "Home":
          e.preventDefault();
          setSize(minSize);
          break;
        case "End":
          e.preventDefault();
          if (maxSize !== Number.POSITIVE_INFINITY) setSize(maxSize);
          break;
      }
    },
    [currentSize, minSize, maxSize, setSize]
  );
  const getGuidelineStyle = react.useCallback(() => {
    if (!isResizing) return { display: "none" };
    const info = table.getState().columnSizingInfo;
    const offset = info.startOffset ?? 0;
    const delta = info.deltaOffset ?? 0;
    return {
      /* The guideline overlay is positioned inside ScrollArea,
       * offset horizontally by (column start + current delta).
       * We use a single translateX with a combined px value. */
      ["--data-table-guideline-offset"]: `${offset + delta}px`,
      display: "block"
    };
  }, [isResizing, table]);
  return react.useMemo(
    () => ({
      isResizing,
      currentSize,
      minSize,
      maxSize,
      onKeyDownAdjust,
      getGuidelineStyle
    }),
    [isResizing, currentSize, minSize, maxSize, onKeyDownAdjust, getGuidelineStyle]
  );
}

// src/utils/measure-cell.ts
function readComputedPxPair(el, prop) {
  const v = getComputedStyle(el).getPropertyValue(prop);
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}
function createMeasureSpan({ reference }) {
  const cs = getComputedStyle(reference);
  const span = document.createElement("span");
  span.style.cssText = [
    "position:absolute",
    "visibility:hidden",
    "pointer-events:none",
    "top:-9999px",
    "left:-9999px",
    "white-space:pre",
    `font-family:${cs.fontFamily}`,
    `font-size:${cs.fontSize}`,
    `font-weight:${cs.fontWeight}`,
    `font-style:${cs.fontStyle}`,
    `letter-spacing:${cs.letterSpacing}`,
    `text-transform:${cs.textTransform}`
  ].join(";");
  document.body.appendChild(span);
  return {
    span,
    dispose() {
      span.remove();
    }
  };
}
function measureCellWidth(cell, span, fudge = 1) {
  const text = cell.textContent ?? "";
  span.textContent = text;
  const spanWidth = span.offsetWidth;
  getComputedStyle(cell);
  const padLeft = readComputedPxPair(cell, "padding-left");
  const padRight = readComputedPxPair(cell, "padding-right");
  const scrollWidth = cell.scrollWidth - padLeft - padRight;
  const best = Math.max(spanWidth, scrollWidth);
  return Math.ceil(best + padLeft + padRight + fudge);
}

// src/use-auto-fit-column.ts
function useAutoFitColumn(columnId) {
  const { table, scrollRef } = useDataTableContext();
  const column = table.getColumn(columnId);
  const minSize = column?.columnDef.minSize ?? 40;
  const maxSize = column?.columnDef.maxSize ?? 800;
  const measure = react.useCallback(() => {
    const scroll = scrollRef.current;
    if (!scroll || !column) return column?.getSize() ?? 0;
    const headerCell = scroll.querySelector(
      `.vds-data-table-header-cell[data-column-id="${CSS.escape(columnId)}"]`
    );
    const bodyCells = Array.from(
      scroll.querySelectorAll(
        `.vds-data-table-cell[data-column-id="${CSS.escape(columnId)}"]`
      )
    );
    if (!headerCell && bodyCells.length === 0) return column.getSize();
    const reference = headerCell ?? bodyCells[0];
    const { span, dispose } = createMeasureSpan({ reference });
    let best = 0;
    if (headerCell) best = Math.max(best, measureCellWidth(headerCell, span));
    for (const cell of bodyCells) {
      best = Math.max(best, measureCellWidth(cell, span));
    }
    dispose();
    const clamped = Math.max(minSize, Math.min(maxSize, best));
    return clamped;
  }, [columnId, column, minSize, maxSize, scrollRef]);
  const fit = react.useCallback(() => {
    const next = measure();
    table.setColumnSizing((prev) => ({ ...prev, [columnId]: next }));
  }, [columnId, measure, table]);
  return { fit, measure, minSize, maxSize };
}
function useHorizontalScrollShadow(ref) {
  const [state, setState] = react.useState("none");
  react.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const overflow = el.scrollWidth - el.clientWidth;
      if (overflow <= 1) {
        setState("none");
        return;
      }
      const at = el.scrollLeft;
      if (at <= 1) setState("start");
      else if (at >= overflow - 1) setState("end");
      else setState("middle");
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [ref]);
  return state;
}
function useDataTableVirtualizer({
  count,
  scrollRef,
  estimateSize = 40,
  overscan = 8
}) {
  const getScrollElement = react.useCallback(() => scrollRef.current, [scrollRef]);
  return reactVirtual.useVirtualizer({
    count,
    getScrollElement,
    estimateSize: () => estimateSize,
    overscan
    /* The virtualizer measures dynamic row heights automatically via
     * `ref={virt.measureElement}` attached to each rendered row. The
     * default `getBoundingClientRect().height` measurement is correct
     * here — no override needed. */
  });
}
function useKeyboardGridNav(enabled, scrollRef) {
  const handler = react.useCallback(
    (e) => {
      if (!enabled) return;
      const scroll = scrollRef.current;
      if (!scroll) return;
      const target = e.target;
      if (!target) return;
      const currentCell = target.closest(
        ".vds-data-table-cell, .vds-data-table-header-cell"
      );
      if (!currentCell) return;
      const currentRow = currentCell.closest(
        ".vds-data-table-row, .vds-data-table-header-row"
      );
      if (!currentRow) return;
      const move = (nextCell) => {
        if (!nextCell) return;
        e.preventDefault();
        nextCell.setAttribute("tabindex", "0");
        currentCell.setAttribute("tabindex", "-1");
        nextCell.focus();
      };
      const siblingCells = (row) => Array.from(
        row.querySelectorAll(
          ".vds-data-table-cell, .vds-data-table-header-cell"
        )
      );
      const cellIndex = siblingCells(currentRow).indexOf(currentCell);
      const allRows = Array.from(
        scroll.querySelectorAll(
          ".vds-data-table-row, .vds-data-table-header-row"
        )
      );
      const rowIndex = allRows.indexOf(currentRow);
      switch (e.key) {
        case "ArrowRight":
          move(siblingCells(currentRow)[cellIndex + 1]);
          return;
        case "ArrowLeft":
          move(siblingCells(currentRow)[cellIndex - 1]);
          return;
        case "ArrowDown": {
          const nextRow = allRows[rowIndex + 1];
          if (nextRow) move(siblingCells(nextRow)[cellIndex]);
          return;
        }
        case "ArrowUp": {
          const prevRow = allRows[rowIndex - 1];
          if (prevRow) move(siblingCells(prevRow)[cellIndex]);
          return;
        }
        case "Home":
          if (e.ctrlKey || e.metaKey) {
            const firstRow = allRows[0];
            if (firstRow) move(siblingCells(firstRow)[0]);
          } else {
            move(siblingCells(currentRow)[0]);
          }
          return;
        case "End":
          if (e.ctrlKey || e.metaKey) {
            const lastRow = allRows[allRows.length - 1];
            if (lastRow) {
              const cells = siblingCells(lastRow);
              move(cells[cells.length - 1]);
            }
          } else {
            const cells = siblingCells(currentRow);
            move(cells[cells.length - 1]);
          }
          return;
        case "PageDown": {
          const nextRow = allRows[Math.min(rowIndex + 10, allRows.length - 1)];
          if (nextRow) move(siblingCells(nextRow)[cellIndex]);
          return;
        }
        case "PageUp": {
          const prevRow = allRows[Math.max(rowIndex - 10, 0)];
          if (prevRow) move(siblingCells(prevRow)[cellIndex]);
          return;
        }
      }
    },
    [enabled, scrollRef]
  );
  react.useEffect(() => {
    if (!enabled) return;
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [enabled, handler, scrollRef]);
}
function useSrAnnouncements(table) {
  const [message, setMessage] = react.useState("");
  const lastSorted = react.useRef("");
  const lastFilterCount = react.useRef(0);
  const lastSelectedCount = react.useRef(0);
  const sorting = table.getState().sorting;
  const columnFilters = table.getState().columnFilters;
  const globalFilter = table.getState().globalFilter ?? "";
  const selectedCount = table.getSelectedRowModel().rows.length;
  const filterCount = react.useMemo(
    () => columnFilters.filter((f) => f.value !== void 0 && f.value !== "").length + (globalFilter ? 1 : 0),
    [columnFilters, globalFilter]
  );
  react.useEffect(() => {
    const key = sorting.map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`).join(",");
    if (key === lastSorted.current) return;
    lastSorted.current = key;
    if (!key) setMessage("Sorting cleared.");
    else {
      const first = sorting[0];
      const rest = sorting.length > 1 ? `, plus ${sorting.length - 1} more` : "";
      setMessage(
        `Sorted by ${first.id}, ${first.desc ? "descending" : "ascending"}${rest}.`
      );
    }
  }, [sorting]);
  react.useEffect(() => {
    if (filterCount === lastFilterCount.current) return;
    lastFilterCount.current = filterCount;
    const rows = table.getFilteredRowModel().rows.length;
    if (filterCount === 0) setMessage("Filters cleared.");
    else setMessage(`${filterCount} filter${filterCount === 1 ? "" : "s"} active. ${rows} result${rows === 1 ? "" : "s"}.`);
  }, [filterCount, table]);
  react.useEffect(() => {
    if (selectedCount === lastSelectedCount.current) return;
    lastSelectedCount.current = selectedCount;
    if (selectedCount === 0) setMessage("Selection cleared.");
    else
      setMessage(
        `${selectedCount} row${selectedCount === 1 ? "" : "s"} selected.`
      );
  }, [selectedCount]);
  return message;
}
function DataTableRootRender({
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
  forwardedRef
}) {
  const [viewModeState, setViewMode] = useControllableState({
    value: viewMode,
    defaultValue: defaultViewMode ?? "table",
    onChange: onViewModeChange
  });
  react.useEffect(() => {
    if (mode !== "server" || !onDataRequest) return;
    const id2 = window.setTimeout(() => {
      const s = table.getState();
      onDataRequest({
        sorting: s.sorting,
        columnFilters: s.columnFilters,
        globalFilter: s.globalFilter ?? "",
        pagination: s.pagination,
        grouping: s.grouping
      });
    }, 150);
    return () => window.clearTimeout(id2);
  }, [
    mode,
    onDataRequest,
    table.getState().sorting,
    table.getState().columnFilters,
    table.getState().globalFilter,
    table.getState().pagination,
    table.getState().grouping
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    DataTableProvider,
    {
      id,
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
      viewMode: viewModeState,
      setViewMode,
      onCellEdit,
      onDataRequest,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        DataTableRootDiv,
        {
          className,
          style,
          size,
          interactionMode,
          bordered,
          striped,
          stickyHeader,
          mode,
          virtualization,
          forwardedRef,
          children
        }
      )
    }
  );
}
function pinOffsetStyle(column) {
  const pinned = column.getIsPinned();
  if (pinned === "left") {
    return { left: `${column.getStart("left")}px` };
  }
  if (pinned === "right") {
    return { right: `${column.getAfter("right")}px` };
  }
  return {};
}
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
  forwardedRef
}) {
  const { table, scrollRef } = useDataTableContext();
  const resizingId = table.getState().columnSizingInfo.isResizingColumn;
  const scrolledX = useHorizontalScrollShadow(scrollRef);
  useKeyboardGridNav(interactionMode === "grid", scrollRef);
  const announcement = useSrAnnouncements(table);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: forwardedRef,
      className: utils.cn("vds-data-table", className),
      "data-size": size,
      "data-interaction-mode": interactionMode,
      "data-bordered": bordered,
      "data-striped": boolAttr(striped),
      "data-sticky-header": boolAttr(stickyHeader),
      "data-mode": mode,
      "data-virtualized": boolAttr(virtualization !== false),
      "data-resizing": resizingId ? "" : void 0,
      "data-scrolled-x": scrolledX,
      style,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            role: "status",
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "vds-data-table-sr-only",
            children: announcement
          }
        )
      ]
    }
  );
}
function DataTableSimpleRoot({
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
}) {
  const table = useDataTable({
    columns,
    data,
    mode,
    columnResizeMode,
    rowCount,
    ...statePairs
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
    DataTableRootRender,
    {
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
      forwardedRef,
      children
    }
  );
}
function DataTableAdvancedRoot({
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
  forwardedRef
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DataTableRootRender,
    {
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
      forwardedRef,
      children
    }
  );
}
var DataTableRoot = react.forwardRef(function DataTableRoot2(props, ref) {
  if ("table" in props && props.table) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      DataTableAdvancedRoot,
      {
        ...props,
        forwardedRef: ref
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    DataTableSimpleRoot,
    {
      ...props,
      forwardedRef: ref
    }
  );
});
var DataTableToolbar = react.forwardRef(
  function DataTableToolbar2({ className, children, ...props }, ref) {
    const { tableId } = useDataTableContext();
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "toolbar",
        "aria-controls": tableId,
        className: utils.cn("vds-data-table-toolbar", className),
        ...props,
        children
      }
    );
  }
);
var DataTableScrollArea = react.forwardRef(function DataTableScrollArea2({ className, children, ...props }, ref) {
  const { scrollRef } = useDataTableContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: composeRefs(scrollRef, ref),
      className: utils.cn("vds-data-table-scroll-area", className),
      ...props,
      children
    }
  );
});
var DataTableTable = react.forwardRef(
  function DataTableTable2({ className, style, children, ...props }, ref) {
    const { table, interactionMode, tableId } = useDataTableContext();
    const sizeVars = react.useMemo(() => buildColumnSizeVars(table), [
      table,
      // Re-evaluate when any column size changes
      table.getState().columnSizing,
      table.getState().columnSizingInfo
    ]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "table",
      {
        ref,
        id: tableId,
        role: interactionMode === "grid" ? "grid" : void 0,
        className: utils.cn("vds-data-table-table", className),
        style: { ...sizeVars, ...style },
        ...props,
        children
      }
    );
  }
);
var DataTableHeader = react.forwardRef(function DataTableHeader2({ className, children, ...props }, ref) {
  const { table, stickyHeader } = useDataTableContext();
  const groups = table.getHeaderGroups();
  const content = typeof children === "function" ? children(groups) : children ?? groups.map((group) => /* @__PURE__ */ jsxRuntime.jsx(
    DataTableHeaderGroup,
    {
      headerGroup: group
    },
    group.id
  ));
  return /* @__PURE__ */ jsxRuntime.jsx(
    "thead",
    {
      ref,
      role: "rowgroup",
      "data-sticky": boolAttr(stickyHeader),
      className: utils.cn("vds-data-table-header", className),
      ...props,
      children: content
    }
  );
});
var DataTableHeaderGroup = react.forwardRef(function DataTableHeaderGroup2({ headerGroup, className, children, ...props }, ref) {
  const headers = headerGroup.headers;
  const content = typeof children === "function" ? children(headers) : children ?? headers.map((header) => /* @__PURE__ */ jsxRuntime.jsx(DataTableHeaderCell, { header }, header.id));
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tr",
    {
      ref,
      role: "row",
      className: utils.cn("vds-data-table-header-row", className),
      ...props,
      children: content
    }
  );
});
var DataTableHeaderCell = react.forwardRef(function DataTableHeaderCell2({ header, className, style, children, ...props }, ref) {
  const column = header.column;
  const sort = sortedAttr(header);
  const pin = pinnedAttr(column);
  const canSort = column.getCanSort();
  const canResize = column.getCanResize();
  const ariaSort = sort === "asc" ? "ascending" : sort === "desc" ? "descending" : canSort ? "none" : void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "th",
    {
      ref,
      role: "columnheader",
      colSpan: header.colSpan,
      scope: "col",
      "aria-sort": ariaSort,
      "data-sorted": sort,
      "data-pinned": pin,
      "data-pinned-last": pin === "left" && column.getIsLastColumn("left") ? "" : void 0,
      "data-pinned-first": pin === "right" && column.getIsFirstColumn("right") ? "" : void 0,
      "data-can-sort": boolAttr(canSort),
      "data-can-resize": boolAttr(canResize),
      "data-resizing": boolAttr(column.getIsResizing()),
      "data-column-id": column.id,
      className: utils.cn("vds-data-table-header-cell", className),
      style: {
        ["--col-size"]: `var(--col-${column.id})`,
        ...pinOffsetStyle(column),
        ...style
      },
      ...props,
      children: header.isPlaceholder ? null : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-header-cell-content", children: children ?? (canSort ? /* @__PURE__ */ jsxRuntime.jsx(DataTableSortTrigger, { header, children: reactTable.flexRender(column.columnDef.header, header.getContext()) }) : reactTable.flexRender(column.columnDef.header, header.getContext())) }),
        canResize && /* @__PURE__ */ jsxRuntime.jsx(DataTableResizeHandle, { header })
      ] })
    }
  );
});
function DataTableBodyInner({ rows, children }) {
  if (typeof children === "function") {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: children(rows) });
  }
  if (children !== void 0) return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: rows.map(
    (row) => row.getIsGrouped() ? /* @__PURE__ */ jsxRuntime.jsx(DataTableGroupHeaderRow, { row }, row.id) : /* @__PURE__ */ jsxRuntime.jsx(DataTableRow, { row }, row.id)
  ) });
}
var DataTableBodyInnerMemo = react.memo(DataTableBodyInner);
var DataTableBody = react.forwardRef(function DataTableBody2({ className, children, emptyMessage, ...props }, ref) {
  const { table, virtualization } = useDataTableContext();
  const rows = table.getRowModel().rows;
  const isResizing = Boolean(
    table.getState().columnSizingInfo.isResizingColumn
  );
  if (rows.length === 0 && emptyMessage) {
    const colCount = table.getVisibleFlatColumns().length || 1;
    return /* @__PURE__ */ jsxRuntime.jsx(
      "tbody",
      {
        ref,
        role: "rowgroup",
        "data-empty": "",
        className: utils.cn("vds-data-table-body", className),
        ...props,
        children: /* @__PURE__ */ jsxRuntime.jsx("tr", { className: "vds-data-table-row", children: /* @__PURE__ */ jsxRuntime.jsx(
          "td",
          {
            colSpan: colCount,
            className: "vds-data-table-cell vds-data-table-empty-cell",
            children: emptyMessage
          }
        ) })
      }
    );
  }
  if (virtualization !== false) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      DataTableBodyVirtualized,
      {
        ref,
        className,
        rows,
        virtualizationOptions: virtualization,
        ...props
      }
    );
  }
  const Inner = isResizing ? DataTableBodyInnerMemo : DataTableBodyInner;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tbody",
    {
      ref,
      role: "rowgroup",
      className: utils.cn("vds-data-table-body", className),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(Inner, { rows, children })
    }
  );
});
var DataTableBodyVirtualized = react.forwardRef(function DataTableBodyVirtualized2({ rows, virtualizationOptions, className, ...props }, ref) {
  const { scrollRef } = useDataTableContext();
  const virt = useDataTableVirtualizer({
    count: rows.length,
    scrollRef,
    estimateSize: virtualizationOptions.estimateRowSize ?? 40,
    overscan: virtualizationOptions.overscan ?? 8
  });
  const items = virt.getVirtualItems();
  const totalSize = virt.getTotalSize();
  const paddingTop = items[0]?.start ?? 0;
  const paddingBottom = items.length > 0 ? totalSize - (items[items.length - 1].end ?? 0) : 0;
  const { table } = useDataTableContext();
  const colCount = table.getVisibleFlatColumns().length || 1;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "tbody",
    {
      ref,
      role: "rowgroup",
      className: utils.cn("vds-data-table-body", className),
      ...props,
      children: [
        paddingTop > 0 && /* @__PURE__ */ jsxRuntime.jsx(
          "tr",
          {
            "aria-hidden": "true",
            className: "vds-data-table-virtual-spacer",
            style: { blockSize: paddingTop },
            children: /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan: colCount, style: { padding: 0, border: 0 } })
          }
        ),
        items.map((vi) => {
          const row = rows[vi.index];
          if (!row) return null;
          return /* @__PURE__ */ jsxRuntime.jsx(
            DataTableRow,
            {
              row,
              "data-index": vi.index,
              ref: virt.measureElement
            },
            row.id
          );
        }),
        paddingBottom > 0 && /* @__PURE__ */ jsxRuntime.jsx(
          "tr",
          {
            "aria-hidden": "true",
            className: "vds-data-table-virtual-spacer",
            style: { blockSize: paddingBottom },
            children: /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan: colCount, style: { padding: 0, border: 0 } })
          }
        )
      ]
    }
  );
});
var DataTableRow = react.forwardRef(
  function DataTableRow2({ row, className, children, ...props }, ref) {
    const selected = row.getIsSelected();
    const expanded = row.getIsExpanded();
    const pinned = rowPinnedAttr(row);
    const cells = row.getVisibleCells();
    const content = typeof children === "function" ? children(cells) : children ?? cells.map((cell) => /* @__PURE__ */ jsxRuntime.jsx(DataTableCell, { cell }, cell.id));
    return /* @__PURE__ */ jsxRuntime.jsx(
      "tr",
      {
        ref,
        role: "row",
        "aria-selected": selected || void 0,
        "aria-rowindex": row.index + 1,
        "data-selected": boolAttr(selected),
        "data-expanded": boolAttr(expanded),
        "data-pinned": pinned,
        "data-index": row.index,
        "data-row-id": row.id,
        className: utils.cn("vds-data-table-row", className),
        ...props,
        children: content
      }
    );
  }
);
var DataTableCell = react.forwardRef(function DataTableCell2({ cell, className, style, children, ...props }, ref) {
  const { interactionMode } = useDataTableContext();
  const column = cell.column;
  const pin = pinnedAttr(column);
  const isFirstGridCell = interactionMode === "grid" && cell.row.index === 0 && column.getIndex() === 0;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "td",
    {
      ref,
      role: interactionMode === "grid" ? "gridcell" : "cell",
      tabIndex: interactionMode === "grid" ? isFirstGridCell ? 0 : -1 : void 0,
      "data-pinned": pin,
      "data-pinned-last": pin === "left" && column.getIsLastColumn("left") ? "" : void 0,
      "data-pinned-first": pin === "right" && column.getIsFirstColumn("right") ? "" : void 0,
      "data-column-id": column.id,
      className: utils.cn("vds-data-table-cell", className),
      style: {
        ["--col-size"]: `var(--col-${column.id})`,
        ...pinOffsetStyle(column),
        ...style
      },
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-cell-content", children: children ?? reactTable.flexRender(column.columnDef.cell, cell.getContext()) })
    }
  );
});
var DataTableFooter = react.forwardRef(function DataTableFooter2({ className, children, ...props }, ref) {
  const { table } = useDataTableContext();
  const groups = table.getFooterGroups();
  const hasFooter = groups.some(
    (g) => g.headers.some((h) => h.column.columnDef.footer)
  );
  if (!hasFooter && !children) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tfoot",
    {
      ref,
      role: "rowgroup",
      className: utils.cn("vds-data-table-footer", className),
      ...props,
      children: children ?? groups.map((group) => /* @__PURE__ */ jsxRuntime.jsx(DataTableFooterRow, { footerGroup: group }, group.id))
    }
  );
});
var DataTableFooterRow = react.forwardRef(function DataTableFooterRow2({ footerGroup, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tr",
    {
      ref,
      role: "row",
      className: utils.cn("vds-data-table-footer-row", className),
      ...props,
      children: children ?? footerGroup.headers.map((header) => /* @__PURE__ */ jsxRuntime.jsx(DataTableFooterCell, { header }, header.id))
    }
  );
});
var DataTableFooterCell = react.forwardRef(function DataTableFooterCell2({ header, className, style, children, ...props }, ref) {
  const column = header.column;
  const pin = pinnedAttr(column);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "td",
    {
      ref,
      role: "cell",
      "data-pinned": pin,
      "data-pinned-last": pin === "left" && column.getIsLastColumn("left") ? "" : void 0,
      "data-pinned-first": pin === "right" && column.getIsFirstColumn("right") ? "" : void 0,
      "data-column-id": column.id,
      className: utils.cn("vds-data-table-footer-cell", className),
      style: {
        ["--col-size"]: `var(--col-${column.id})`,
        ...pinOffsetStyle(column),
        ...style
      },
      ...props,
      children: header.isPlaceholder ? null : children ?? reactTable.flexRender(column.columnDef.footer, header.getContext())
    }
  );
});
var DataTableEmpty = react.forwardRef(
  function DataTableEmpty2({ className, children, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "status",
        className: utils.cn("vds-data-table-empty", className),
        ...props,
        children
      }
    );
  }
);
var DataTableLoadingOverlay = react.forwardRef(function DataTableLoadingOverlay2({ open = true, label = "Loading", className, children, ...props }, ref) {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      role: "status",
      "aria-live": "polite",
      "aria-busy": "true",
      "data-state": "open",
      className: utils.cn("vds-data-table-loading", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-loading-label", children: label })
    }
  );
});
var DataTableSortTrigger = react.forwardRef(function DataTableSortTrigger2({ header, className, children, onClick, ...props }, ref) {
  const column = header.column;
  const sort = sortedAttr(header);
  const handleClick = react.useCallback(
    (e) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      column.getToggleSortingHandler()?.(e);
    },
    [column, onClick]
  );
  const nextLabel = sort === void 0 ? "ascending" : sort === "asc" ? "descending" : "no sort";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      ref,
      type: "button",
      "data-sorted": sort,
      "aria-label": `Sort by column, ${nextLabel}`,
      className: utils.cn("vds-data-table-sort-trigger", className),
      onClick: handleClick,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-sort-label", children }),
        /* @__PURE__ */ jsxRuntime.jsx(DataTableSortIcon, { sort })
      ]
    }
  );
});
function DataTableSortIcon({ sort }) {
  if (sort === void 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactIcons.IconArrowsSort,
      {
        className: "vds-data-table-sort-icon",
        "data-direction": "none",
        size: 12,
        stroke: 1.75,
        "aria-hidden": true,
        focusable: false
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactIcons.IconChevronUp,
    {
      className: "vds-data-table-sort-icon",
      "data-direction": sort,
      size: 12,
      stroke: 2,
      "aria-hidden": true,
      focusable: false
    }
  );
}
var DataTableGlobalFilter = react.forwardRef(function DataTableGlobalFilter2({
  debounceMs = 150,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Search\u2026",
  className,
  ...props
}, ref) {
  const { table } = useDataTableContext();
  const currentTableValue = table.getState().globalFilter ?? "";
  const [local, setLocal] = react.useState(
    value ?? defaultValue ?? currentTableValue
  );
  react.useEffect(() => {
    if (value !== void 0) setLocal(value);
  }, [value]);
  react.useEffect(() => {
    if (local === currentTableValue) return;
    const id = window.setTimeout(() => {
      table.setGlobalFilter(local);
      onValueChange?.(local);
    }, debounceMs);
    return () => window.clearTimeout(id);
  }, [local, debounceMs]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      ref,
      type: "search",
      role: "searchbox",
      "aria-label": "Search table",
      placeholder,
      value: local,
      onChange: (e) => setLocal(e.target.value),
      className: utils.cn("vds-data-table-global-filter", className),
      ...props
    }
  );
});
function DataTableSelectAllCheckbox({
  className,
  scope = "page"
}) {
  const { table } = useDataTableContext();
  const allSelected = scope === "all" ? table.getIsAllRowsSelected() : table.getIsAllPageRowsSelected();
  const someSelected = scope === "all" ? table.getIsSomeRowsSelected() : table.getIsSomePageRowsSelected();
  const handler = scope === "all" ? table.getToggleAllRowsSelectedHandler() : table.getToggleAllPageRowsSelectedHandler();
  const checked = allSelected ? true : someSelected ? "indeterminate" : false;
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactCheckbox.Checkbox,
    {
      className: utils.cn("vds-data-table-select-all", className),
      checked,
      "aria-label": scope === "all" ? "Select all rows across pages" : "Select all rows on this page",
      onCheckedChange: () => handler({
        target: { checked: !allSelected }
      })
    }
  );
}
function DataTableRowSelectCheckbox({
  row,
  className
}) {
  const selected = row.getIsSelected();
  const canSelect = row.getCanSelect();
  const handler = row.getToggleSelectedHandler();
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactCheckbox.Checkbox,
    {
      className: utils.cn("vds-data-table-row-select", className),
      checked: selected,
      disabled: !canSelect,
      "aria-label": "Select row",
      onCheckedChange: () => handler({
        target: { checked: !selected }
      })
    }
  );
}
var DataTableResizeHandle = react.forwardRef(function DataTableResizeHandle2({ header, className, ...props }, ref) {
  const { isResizing, onKeyDownAdjust, currentSize, minSize, maxSize } = useColumnResize(header);
  const { fit } = useAutoFitColumn(header.column.id);
  const columnName = String(header.column.columnDef.header ?? header.column.id);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      role: "separator",
      "aria-orientation": "vertical",
      "aria-label": `Resize ${columnName} column`,
      "aria-valuenow": Math.round(currentSize),
      "aria-valuemin": minSize,
      "aria-valuemax": maxSize === Number.POSITIVE_INFINITY ? void 0 : maxSize,
      tabIndex: 0,
      "data-resizing": boolAttr(isResizing),
      className: utils.cn("vds-data-table-resize-handle", className),
      onPointerDown: (e) => {
        header.getResizeHandler()(e);
      },
      onTouchStart: (e) => header.getResizeHandler()(e),
      onDoubleClick: (e) => {
        e.preventDefault();
        fit();
      },
      onKeyDown: onKeyDownAdjust,
      onMouseDown: (e) => e.stopPropagation(),
      onClick: (e) => e.stopPropagation(),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "span",
        {
          className: "vds-data-table-resize-handle-line",
          "aria-hidden": "true"
        }
      )
    }
  );
});
function DataTableColumnGuide() {
  const { table } = useDataTableContext();
  const info = table.getState().columnSizingInfo;
  const resizingId = info.isResizingColumn;
  if (!resizingId) return null;
  const offset = (info.startOffset ?? 0) + (info.deltaOffset ?? 0);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: "vds-data-table-resize-guideline",
      "aria-hidden": "true",
      style: {
        ["--data-table-guideline-offset"]: `${offset}px`
      }
    }
  );
}
var DataTablePinColumnTrigger = react.forwardRef(function DataTablePinColumnTrigger2({ column, side, className, children, onClick, ...props }, ref) {
  const pinned = column.getIsPinned();
  const isPressed = pinned === side;
  const toggle = () => {
    column.pin(isPressed ? false : side);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-pressed": isPressed,
      "aria-label": `Pin column to ${side}`,
      "data-pinned": isPressed ? side : void 0,
      className: utils.cn("vds-data-table-pin-trigger", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggle();
      },
      ...props,
      children: children ?? (isPressed ? "Unpin" : `Pin ${side}`)
    }
  );
});
var DataTableRowExpandTrigger = react.forwardRef(function DataTableRowExpandTrigger2({ row, className, children, onClick, ...props }, ref) {
  const canExpand = row.getCanExpand();
  const expanded = row.getIsExpanded();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-expanded": expanded,
      "aria-label": expanded ? "Collapse row" : "Expand row",
      disabled: !canExpand,
      "data-expanded": expanded ? "" : void 0,
      className: utils.cn("vds-data-table-row-expand-trigger", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) row.toggleExpanded();
      },
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx(
        reactIcons.IconChevronRight,
        {
          className: "vds-data-table-row-expand-icon",
          size: 10,
          stroke: 1.75,
          "aria-hidden": true,
          focusable: false
        }
      )
    }
  );
});
var DataTableRowPinTrigger = react.forwardRef(function DataTableRowPinTrigger2({ row, side, className, children, onClick, ...props }, ref) {
  const pinned = row.getIsPinned();
  const isPressed = pinned === side;
  const toggle = () => {
    row.pin(isPressed ? false : side);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-pressed": isPressed,
      "aria-label": `Pin row to ${side}`,
      "data-pinned": isPressed ? side : void 0,
      className: utils.cn("vds-data-table-row-pin-trigger", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggle();
      },
      ...props,
      children: children ?? (isPressed ? "Unpin" : `Pin ${side}`)
    }
  );
});
function DataTableColumnVisibility({
  className,
  filter
}) {
  const { table } = useDataTableContext();
  const columns = table.getAllLeafColumns().filter((c) => c.getCanHide() && (filter ? filter(c) : true));
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ul",
    {
      role: "group",
      "aria-label": "Toggle column visibility",
      className: utils.cn("vds-data-table-column-visibility", className),
      children: columns.map((col) => {
        const visible = col.getIsVisible();
        const label = String(col.columnDef.header ?? col.id);
        return /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "vds-data-table-column-visibility-item", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              type: "checkbox",
              checked: visible,
              onChange: (e) => col.toggleVisibility(e.target.checked)
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: label })
        ] }) }, col.id);
      })
    }
  );
}
var DataTableGroupHeaderRow = react.forwardRef(function DataTableGroupHeaderRow2({ row, className, ...props }, ref) {
  const { table } = useDataTableContext();
  const colCount = table.getVisibleFlatColumns().length || 1;
  const groupColId = row.groupingColumnId;
  const groupValue = groupColId ? row.getValue(groupColId) : "Group";
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tr",
    {
      ref,
      role: "row",
      "data-group-row": "",
      "data-depth": row.depth,
      className: utils.cn("vds-data-table-group-header-row", className),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        "td",
        {
          colSpan: colCount,
          className: "vds-data-table-group-header-cell",
          style: { paddingInlineStart: `${row.depth * 16 + 8}px` },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(DataTableRowExpandTrigger, { row }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-data-table-group-label", children: [
              String(groupValue ?? "\u2014"),
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-data-table-group-count", children: [
                "(",
                row.subRows.length,
                ")"
              ] })
            ] })
          ]
        }
      )
    }
  );
});
var DataTableBulkActions = react.forwardRef(function DataTableBulkActions2({
  children,
  showWhenAllAcrossPagesSelected = true,
  isAllAcrossPagesSelected = false,
  sticky = true,
  className,
  ...props
}, ref) {
  const { table } = useDataTableContext();
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedCount = selectedRows.length;
  const shouldShow = selectedCount > 0 || showWhenAllAcrossPagesSelected && isAllAcrossPagesSelected;
  if (!shouldShow) return null;
  const clearSelection = () => table.resetRowSelection();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      role: "region",
      "aria-label": `Bulk actions, ${selectedCount} selected`,
      "data-sticky": sticky ? "" : void 0,
      className: utils.cn("vds-data-table-bulk-actions", className),
      ...props,
      children: typeof children === "function" ? children({ selectedRows, selectedCount, clearSelection }) : children ?? /* @__PURE__ */ jsxRuntime.jsx(
        DataTableBulkActionsDefault,
        {
          selectedRows,
          selectedCount,
          clearSelection
        }
      )
    }
  );
});
var DataTableBulkCount = react.forwardRef(function DataTableBulkCount2({ count, label, className, ...props }, ref) {
  const { table } = useDataTableContext();
  const n = count ?? table.getSelectedRowModel().rows.length;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      className: utils.cn("vds-data-table-bulk-count", className),
      ...props,
      children: label ? label(n) : `${n} selected`
    }
  );
});
var DataTableBulkClear = react.forwardRef(function DataTableBulkClear2({ children = "Clear", onClick, className, ...props }, ref) {
  const { table } = useDataTableContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) table.resetRowSelection();
      },
      className: utils.cn("vds-data-table-bulk-clear", className),
      ...props,
      children
    }
  );
});
function DataTableBulkActionsDefault({
  selectedCount,
  clearSelection
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DataTableBulkCount, { count: selectedCount }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        onClick: clearSelection,
        className: "vds-data-table-bulk-clear",
        children: "Clear"
      }
    )
  ] });
}
function DataTableSelectAllAcrossPages({
  totalCount,
  isAllAcrossPagesSelected,
  onSelectAll,
  onClear,
  className
}) {
  const { table } = useDataTableContext();
  const pageRowCount = table.getRowModel().rows.length;
  const allOnPageSelected = pageRowCount > 0 && table.getSelectedRowModel().rows.length === pageRowCount;
  const visible = allOnPageSelected && !isAllAcrossPagesSelected && totalCount > pageRowCount || isAllAcrossPagesSelected;
  if (!visible) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      role: "status",
      "data-active": isAllAcrossPagesSelected ? "" : void 0,
      className: utils.cn("vds-data-table-select-all-banner", className),
      children: isAllAcrossPagesSelected ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          "All ",
          totalCount.toLocaleString(),
          " entries are selected."
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: onClear,
            className: "vds-data-table-select-all-link",
            children: "Clear selection"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          "All ",
          pageRowCount,
          " items on this page are selected."
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            onClick: onSelectAll,
            className: "vds-data-table-select-all-link",
            children: [
              "Select all ",
              totalCount.toLocaleString(),
              " entries"
            ]
          }
        )
      ] })
    }
  );
}

// src/bulk/index.ts
var BulkActions = {
  Root: DataTableBulkActions,
  Count: DataTableBulkCount,
  Clear: DataTableBulkClear,
  SelectAllAcrossPages: DataTableSelectAllAcrossPages
};
function ActionsCell({ items, trigger, className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactDropdownMenu.DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactDropdownMenu.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        "aria-label": "Row actions",
        className: utils.cn("vds-data-table-actions-cell-trigger", className),
        children: trigger ?? /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconDots, { size: 14, stroke: 1.75, "aria-hidden": true, focusable: false })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactDropdownMenu.DropdownMenuContent, { align: "end", children: items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      item.separatorBefore && i > 0 && /* @__PURE__ */ jsxRuntime.jsx(reactDropdownMenu.DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntime.jsxs(
        reactDropdownMenu.DropdownMenuItem,
        {
          disabled: item.disabled,
          onSelect: () => item.onSelect?.(),
          "data-tone": item.tone,
          children: [
            item.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-actions-cell-item-icon", children: item.icon }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: item.label })
          ]
        }
      )
    ] }, item.id)) })
  ] });
}
function AvatarCell({
  src,
  alt,
  fallback,
  size = "sm",
  primary,
  secondary,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: utils.cn("vds-data-table-avatar-cell", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactAvatar.Avatar, { src, alt: alt ?? fallback, fallback, size }),
    (primary || secondary) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-avatar-cell-text", children: [
      primary && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-avatar-cell-primary", children: primary }),
      secondary && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-avatar-cell-secondary", children: secondary })
    ] })
  ] });
}
function BadgeCell({ variant, children, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(reactBadge.Badge, { variant, className: utils.cn("vds-data-table-badge-cell", className), children });
}
function StatusBadgeCell({
  tone,
  label,
  withDot = true,
  variant = "pill",
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      "data-tone": tone,
      "data-variant": variant,
      className: utils.cn("vds-data-table-status-cell", className),
      children: [
        withDot && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", className: "vds-data-table-status-cell-dot" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: label })
      ]
    }
  );
}
function extractText(node) {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = node.props;
    return extractText(props?.children);
  }
  return "";
}
function CopyableCell({
  children,
  copyText,
  feedbackMs = 1200,
  className
}) {
  const [copied, setCopied] = react.useState(false);
  const handleCopy = react.useCallback(async () => {
    const text = copyText ?? extractText(children);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), feedbackMs);
    } catch {
    }
  }, [copyText, children, feedbackMs]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      "data-copied": copied ? "" : void 0,
      className: utils.cn("vds-data-table-copyable-cell", className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-copyable-cell-content", children }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: handleCopy,
            "aria-label": copied ? "Copied" : "Copy to clipboard",
            className: "vds-data-table-copyable-cell-button",
            tabIndex: -1,
            children: copied ? /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCheck, { size: 12, stroke: 2, "aria-hidden": true, focusable: false }) : /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCopy, { size: 12, stroke: 1.75, "aria-hidden": true, focusable: false })
          }
        )
      ]
    }
  );
}
function formatRelative(d) {
  const now = Date.now();
  const diff = (now - d.getTime()) / 1e3;
  const abs = Math.abs(diff);
  const units = [
    [60, "second"],
    [3600, "minute"],
    [86400, "hour"],
    [604800, "day"],
    [2592e3, "week"],
    [31536e3, "month"],
    [Infinity, "year"]
  ];
  const rtf = new Intl.RelativeTimeFormat(void 0, { numeric: "auto" });
  const divisors = [1, 60, 3600, 86400, 604800, 2592e3, 31536e3];
  for (let i = 0; i < units.length; i++) {
    const [limit, unit] = units[i];
    if (abs < limit) {
      const value = Math.round(-diff / divisors[i]);
      return rtf.format(value, unit);
    }
  }
  return d.toLocaleDateString();
}
function DateCell({
  value,
  format = "medium",
  locale,
  className
}) {
  if (value == null || value === "") {
    return /* @__PURE__ */ jsxRuntime.jsx("span", { className: utils.cn("vds-data-table-date-cell", className), children: "\u2014" });
  }
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) {
    return /* @__PURE__ */ jsxRuntime.jsx("span", { className: utils.cn("vds-data-table-date-cell", className), children: "\u2014" });
  }
  let text;
  if (typeof format === "function") {
    text = format(d);
  } else if (format === "relative") {
    text = formatRelative(d);
  } else {
    const dateStyle = format === "short" ? "short" : format === "long" ? "long" : "medium";
    text = new Intl.DateTimeFormat(locale, { dateStyle }).format(d);
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "time",
    {
      dateTime: d.toISOString(),
      title: d.toLocaleString(locale),
      className: utils.cn("vds-data-table-date-cell", className),
      children: text
    }
  );
}
function LinkCell({
  children,
  external,
  className,
  target,
  rel,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "a",
    {
      target: external ? "_blank" : target,
      rel: external ? "noopener noreferrer" : rel,
      className: utils.cn("vds-data-table-link-cell", className),
      ...props,
      children
    }
  );
}
function NumberCell({
  value,
  format = "decimal",
  currency = "USD",
  locale,
  fractionDigits,
  align = "end",
  className
}) {
  if (value == null || value === "") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        "data-align": align,
        className: utils.cn("vds-data-table-number-cell", className),
        children: "\u2014"
      }
    );
  }
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        "data-align": align,
        className: utils.cn("vds-data-table-number-cell", className),
        children: "\u2014"
      }
    );
  }
  let text;
  if (typeof format === "function") {
    text = format(n);
  } else {
    const opts = {};
    if (format === "integer") opts.maximumFractionDigits = 0;
    else if (format === "decimal")
      opts.maximumFractionDigits = fractionDigits ?? 2;
    else if (format === "currency") {
      opts.style = "currency";
      opts.currency = currency;
      if (fractionDigits !== void 0)
        opts.minimumFractionDigits = opts.maximumFractionDigits = fractionDigits;
    } else if (format === "percent") {
      opts.style = "percent";
      opts.maximumFractionDigits = fractionDigits ?? 1;
    } else if (format === "compact") {
      opts.notation = "compact";
    }
    text = new Intl.NumberFormat(locale, opts).format(n);
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "data-align": align,
      className: utils.cn("vds-data-table-number-cell", className),
      children: text
    }
  );
}
function TextCell({
  value,
  weight = "regular",
  truncate = true,
  muted = false,
  className
}) {
  const title = typeof value === "string" ? value : void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      title: truncate ? title : void 0,
      "data-weight": weight,
      "data-muted": muted ? "" : void 0,
      "data-truncate": truncate ? "" : void 0,
      className: utils.cn("vds-data-table-text-cell", className),
      children: value ?? "\u2014"
    }
  );
}

// src/cells/index.ts
var Cells = {
  Actions: ActionsCell,
  Avatar: AvatarCell,
  Badge: BadgeCell,
  StatusBadge: StatusBadgeCell,
  Copyable: CopyableCell,
  Date: DateCell,
  Link: LinkCell,
  Number: NumberCell,
  Text: TextCell
};
var CellEditor = react.forwardRef(
  function CellEditor2({
    mode = "text",
    value,
    onValueChange,
    onCommit,
    onCancel,
    autoFocus = true,
    className
  }, ref) {
    const inputRef = react.useRef(null);
    react.useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [autoFocus]);
    const handleChange = (e) => {
      if (mode === "number") {
        onValueChange(
          e.target.value === "" ? "" : Number(e.target.value)
        );
      } else {
        onValueChange(e.target.value);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onCommit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactInput.Input,
      {
        ref: (node) => {
          inputRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        },
        inputSize: "sm",
        type: mode === "number" ? "number" : mode === "date" ? "date" : "text",
        value,
        onChange: handleChange,
        onBlur: onCommit,
        onKeyDown: handleKey,
        className: utils.cn("vds-data-table-cell-editor", className)
      }
    );
  }
);
function useCellEdit(cell, options) {
  const ctx = useDataTableContext();
  const onCellEdit = ctx.onCellEdit;
  const [editing, setEditing] = react.useState(false);
  const [value, setValue] = react.useState(options.initialValue);
  const [isPending, setPending] = react.useState(false);
  const start = react.useCallback(() => {
    setValue(options.initialValue);
    setEditing(true);
  }, [options.initialValue]);
  const cancel = react.useCallback(() => {
    setEditing(false);
    setValue(options.initialValue);
  }, [options.initialValue]);
  const commit = react.useCallback(async () => {
    const maybePromise = onCellEdit?.(cell.row, cell.column.id, value);
    if (maybePromise && typeof maybePromise.then === "function") {
      setPending(true);
      try {
        await maybePromise;
      } finally {
        setPending(false);
      }
    }
    setEditing(false);
  }, [cell.row, cell.column.id, value, onCellEdit]);
  return { editing, value, setValue, start, commit, cancel, isPending };
}
var EditableCell = react.forwardRef(
  function EditableCell2({ cell, mode = "text", getValue, className, style, ...props }, ref) {
    const { interactionMode } = useDataTableContext();
    const column = cell.column;
    const pin = pinnedAttr(column);
    const initial = (getValue ?? (() => cell.getValue()))();
    const edit = useCellEdit(
      cell,
      { initialValue: initial }
    );
    return /* @__PURE__ */ jsxRuntime.jsx(
      "td",
      {
        ref,
        role: interactionMode === "grid" ? "gridcell" : "cell",
        "data-pinned": pin,
        "data-column-id": column.id,
        "data-editing": edit.editing ? "" : void 0,
        "aria-busy": edit.isPending || void 0,
        className: utils.cn("vds-data-table-cell", "vds-data-table-cell-editable", className),
        style: {
          ["--col-size"]: `var(--col-${column.id})`,
          ...style
        },
        onDoubleClick: (e) => {
          e.preventDefault();
          if (!edit.editing) edit.start();
        },
        ...props,
        children: edit.editing ? /* @__PURE__ */ jsxRuntime.jsx(
          CellEditor,
          {
            mode,
            value: edit.value,
            onValueChange: edit.setValue,
            onCommit: () => void edit.commit(),
            onCancel: edit.cancel
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-cell-content", children: reactTable.flexRender(column.columnDef.cell, cell.getContext()) })
      }
    );
  }
);
var OPERATORS_BY_TYPE = {
  text: [
    { value: "contains", label: "Contains" },
    { value: "notContains", label: "Does not contain" },
    { value: "equals", label: "Equals" },
    { value: "notEquals", label: "Does not equal" }
  ],
  number: [
    { value: "equals", label: "Equals" },
    { value: "notEquals", label: "Not equal" },
    { value: "greaterThan", label: "Greater than" },
    { value: "lessThan", label: "Less than" },
    { value: "between", label: "Between" }
  ],
  date: [
    { value: "equals", label: "On" },
    { value: "greaterThan", label: "After" },
    { value: "lessThan", label: "Before" },
    { value: "between", label: "Between" }
  ],
  "date-range": [{ value: "between", label: "Between" }],
  select: [
    { value: "equals", label: "Is" },
    { value: "notEquals", label: "Is not" }
  ],
  boolean: [{ value: "equals", label: "Is" }]
};
function FilterConfigPanel({
  field,
  onAdd,
  onCancel
}) {
  const operators = OPERATORS_BY_TYPE[field.type];
  const [comparison, setComparison] = react.useState(
    operators[0].value
  );
  const [value, setValue] = react.useState("");
  const [value2, setValue2] = react.useState("");
  const canAdd = comparison === "between" ? value !== "" && value2 !== "" : value !== "" || field.type === "boolean";
  const handleAdd = () => {
    const cond = {
      id: `cond-${Date.now()}`,
      fieldId: field.id,
      fieldLabel: field.label,
      comparison,
      value: field.type === "number" ? Number(value) : field.type === "boolean" ? value === "true" : value,
      value2: comparison === "between" ? field.type === "number" ? Number(value2) : value2 : void 0
    };
    onAdd(cond);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-config", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-config-row", children: [
      /* @__PURE__ */ jsxRuntime.jsx("label", { className: "vds-data-table-filter-config-label", children: "Operator" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "select",
        {
          value: comparison,
          onChange: (e) => setComparison(e.target.value),
          className: "vds-data-table-filter-config-select",
          children: operators.map((op) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: op.value, children: op.label }, op.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-config-row", children: [
      /* @__PURE__ */ jsxRuntime.jsx("label", { className: "vds-data-table-filter-config-label", children: "Value" }),
      field.type === "select" ? /* @__PURE__ */ jsxRuntime.jsxs(
        "select",
        {
          value: String(value),
          onChange: (e) => setValue(e.target.value),
          className: "vds-data-table-filter-config-select",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "", children: "\u2014" }),
            (field.options ?? []).map((opt) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: String(opt.value), children: opt.label }, String(opt.value)))
          ]
        }
      ) : field.type === "boolean" ? /* @__PURE__ */ jsxRuntime.jsxs(
        "select",
        {
          value,
          onChange: (e) => setValue(e.target.value),
          className: "vds-data-table-filter-config-select",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "true", children: "True" }),
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "false", children: "False" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntime.jsx(
        reactInput.Input,
        {
          inputSize: "sm",
          type: field.type === "number" ? "number" : field.type === "date" ? "date" : "text",
          value,
          onChange: (e) => setValue(e.target.value),
          placeholder: field.placeholder
        }
      )
    ] }),
    comparison === "between" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-config-row", children: [
      /* @__PURE__ */ jsxRuntime.jsx("label", { className: "vds-data-table-filter-config-label", children: "And" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        reactInput.Input,
        {
          inputSize: "sm",
          type: field.type === "number" ? "number" : field.type === "date" ? "date" : "text",
          value: value2,
          onChange: (e) => setValue2(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-config-actions", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: utils.cn(
            "vds-data-table-toolbar-button",
            "vds-data-table-filter-config-cancel"
          ),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          onClick: handleAdd,
          disabled: !canAdd,
          "data-intent": "primary",
          className: utils.cn("vds-data-table-toolbar-button"),
          children: "Add filter"
        }
      )
    ] })
  ] });
}

// src/filter-drawer/types.ts
function countConditions(groups) {
  return groups.reduce((sum, g) => sum + g.conditions.length, 0);
}
function DataTableFilterDrawer({
  open,
  onOpenChange,
  availableFilters,
  filterGroups: externalGroups = [],
  onApplyFilters,
  title = "Filters",
  side = "right"
}) {
  const [searchQuery, setSearchQuery] = react.useState("");
  const [groups, setGroups] = react.useState(externalGroups);
  const [configField, setConfigField] = react.useState(
    null
  );
  const prevOpenRef = react.useRef(false);
  react.useEffect(() => {
    if (open && !prevOpenRef.current) {
      setGroups(externalGroups);
      setSearchQuery("");
      setConfigField(null);
    }
    prevOpenRef.current = open;
  }, [open, externalGroups]);
  const filteredFields = react.useMemo(() => {
    if (!searchQuery.trim()) return availableFilters;
    const q = searchQuery.toLowerCase();
    return availableFilters.filter(
      (f) => f.label.toLowerCase().includes(q) || f.id.toLowerCase().includes(q)
    );
  }, [availableFilters, searchQuery]);
  const shown = filteredFields.filter(
    (f) => f.category === "shown" || !f.category
  );
  const popular = filteredFields.filter((f) => f.category === "popular");
  const activeCount = countConditions(groups);
  const hasActive = (fieldId) => groups.some((g) => g.conditions.some((c) => c.fieldId === fieldId));
  const addCondition = (cond) => {
    setGroups((prev) => {
      if (prev.length === 0) {
        return [
          {
            id: `group-${Date.now()}`,
            operator: "AND",
            conditions: [cond]
          }
        ];
      }
      const next = [...prev];
      next[next.length - 1].conditions.push(cond);
      return next;
    });
    setConfigField(null);
  };
  const removeCondition = (groupId, conditionId) => {
    setGroups(
      (prev) => prev.map(
        (g) => g.id === groupId ? {
          ...g,
          conditions: g.conditions.filter((c) => c.id !== conditionId)
        } : g
      ).filter((g) => g.conditions.length > 0)
    );
  };
  const toggleOperator = (groupId) => {
    setGroups(
      (prev) => prev.map(
        (g) => g.id === groupId ? { ...g, operator: g.operator === "AND" ? "OR" : "AND" } : g
      )
    );
  };
  const handleApply = () => {
    onApplyFilters(groups);
    onOpenChange(false);
  };
  const handleClear = () => {
    setGroups([]);
    onApplyFilters([]);
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactDrawer.Drawer,
    {
      direction: side,
      open,
      onOpenChange,
      sizeMode: "fixed",
      size: "min(26rem, 95vw)",
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        reactDrawer.DrawerContent,
        {
          className: "vds-data-table-filter-drawer",
          "aria-label": title,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-drawer-header", children: [
              configField && /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setConfigField(null),
                  "aria-label": "Back",
                  className: "vds-data-table-filter-drawer-back",
                  children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconChevronLeft, { size: 14, stroke: 1.75, "aria-hidden": true, focusable: false })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerTitle, { children: configField ? configField.label : title }),
              !configField && activeCount > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-filter-drawer-count", children: activeCount })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerBody, { children: !configField ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-drawer-body", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                reactInput.Input,
                {
                  inputSize: "md",
                  type: "search",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  placeholder: "Search filters\u2026"
                }
              ),
              activeCount > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-drawer-active", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-drawer-active-header", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                    "Active (",
                    activeCount,
                    ")"
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleClear,
                      className: "vds-data-table-filter-drawer-clear",
                      children: "Clear all"
                    }
                  )
                ] }),
                groups.map((group, gi) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-drawer-group", children: [
                  gi > 0 && /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleOperator(group.id),
                      className: "vds-data-table-filter-drawer-operator",
                      children: group.operator
                    }
                  ),
                  group.conditions.map((c) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-data-table-filter-drawer-chip", children: [
                    /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                      c.fieldLabel,
                      ": ",
                      String(c.value)
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeCondition(group.id, c.id),
                        "aria-label": `Remove ${c.fieldLabel} filter`,
                        className: "vds-data-table-filter-drawer-chip-remove",
                        children: "\xD7"
                      }
                    )
                  ] }, c.id))
                ] }, group.id))
              ] }),
              shown.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
                FilterSection,
                {
                  title: "Shown",
                  fields: shown,
                  hasActive,
                  onPick: setConfigField
                }
              ),
              popular.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
                FilterSection,
                {
                  title: "Popular",
                  fields: popular,
                  hasActive,
                  onPick: setConfigField
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntime.jsx(
              FilterConfigPanel,
              {
                field: configField,
                onAdd: addCondition,
                onCancel: () => setConfigField(null)
              }
            ) }),
            !configField && /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerFooter, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-drawer-footer", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onOpenChange(false),
                  className: "vds-data-table-toolbar-button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleApply,
                  disabled: activeCount === 0,
                  "data-intent": "primary",
                  className: "vds-data-table-toolbar-button",
                  children: "Apply"
                }
              )
            ] }) })
          ]
        }
      )
    }
  );
}
function FilterSection({
  title,
  fields,
  hasActive,
  onPick
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-drawer-section", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-data-table-filter-drawer-section-title", children: title }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-data-table-filter-drawer-fields", children: fields.map((field) => /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        onClick: () => onPick(field),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPick(field);
          }
        },
        className: utils.cn("vds-data-table-filter-drawer-field"),
        "data-active": hasActive(field.id) ? "" : void 0,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-data-table-filter-drawer-field-left", children: [
            field.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { children: field.icon }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: field.label })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            reactSwitch.Switch,
            {
              checked: hasActive(field.id),
              onCheckedChange: () => onPick(field),
              "aria-label": `Toggle ${field.label}`
            }
          )
        ]
      },
      field.id
    )) })
  ] });
}
function useColumnFilter(column) {
  useDataTableContext();
  const value = column.getFilterValue();
  const setValue = react.useCallback(
    (next) => {
      column.setFilterValue(next);
    },
    [column]
  );
  const clear = react.useCallback(() => {
    column.setFilterValue(void 0);
  }, [column]);
  const isActive = value !== void 0 && value !== "" && !(Array.isArray(value) && value.length === 0);
  return react.useMemo(
    () => ({ value, setValue, clear, isActive }),
    [value, setValue, clear, isActive]
  );
}
var DateFilter = react.forwardRef(
  function DateFilter2({ column, mode = "range", className }, ref) {
    if (mode === "single") {
      return /* @__PURE__ */ jsxRuntime.jsx(DateFilterSingle, { column, className, ref });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(DateFilterRange, { column, className, ref });
  }
);
var DateFilterSingle = react.forwardRef(
  function DateFilterSingle2({ column, className }, ref) {
    const { value, setValue } = useColumnFilter(column);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: utils.cn("vds-data-table-filter-date", className),
        role: "group",
        "aria-label": `Filter ${column.id} by date`,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          reactInput.Input,
          {
            inputSize: "sm",
            type: "date",
            value: value ?? "",
            onChange: (e) => setValue(e.target.value || void 0)
          }
        )
      }
    );
  }
);
var DateFilterRange = react.forwardRef(
  function DateFilterRange2({ column, className }, ref) {
    const { value, setValue } = useColumnFilter(column);
    const [from, to] = value ?? [void 0, void 0];
    const update = (f, t) => {
      if (!f && !t) setValue(void 0);
      else setValue([f, t]);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: utils.cn("vds-data-table-filter-date", className),
        role: "group",
        "aria-label": `Filter ${column.id} by date range`,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            reactInput.Input,
            {
              inputSize: "sm",
              type: "date",
              "aria-label": "From",
              value: from ?? "",
              onChange: (e) => update(e.target.value || void 0, to)
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-filter-sep", "aria-hidden": "true", children: "\u2013" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            reactInput.Input,
            {
              inputSize: "sm",
              type: "date",
              "aria-label": "To",
              value: to ?? "",
              onChange: (e) => update(from, e.target.value || void 0)
            }
          )
        ]
      }
    );
  }
);
function FilterPopover({
  column,
  children,
  trigger,
  className,
  side = "bottom"
}) {
  const { isActive, clear } = useColumnFilter(column);
  return /* @__PURE__ */ jsxRuntime.jsxs(reactPopover.Popover, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactPopover.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        "aria-label": `Filter ${column.id}`,
        "data-active": isActive ? "" : void 0,
        className: utils.cn("vds-data-table-filter-trigger", className),
        children: trigger ?? (isActive ? /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconFilterFilled, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false }) : /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconFilter, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false }))
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactPopover.PopoverContent, { side, align: "start", sideOffset: 4, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-filter-popover", children: [
      children,
      isActive && /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          onClick: clear,
          className: "vds-data-table-filter-clear",
          children: "Clear filter"
        }
      )
    ] }) })
  ] });
}
var NumberFilter = react.forwardRef(
  function NumberFilter2({ column, placeholder = ["Min", "Max"], className }, ref) {
    const { value, setValue } = useColumnFilter(column);
    const [min, max] = value ?? [void 0, void 0];
    const update = (nextMin, nextMax) => {
      if (nextMin === void 0 && nextMax === void 0) {
        setValue(void 0);
      } else {
        setValue([nextMin, nextMax]);
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: utils.cn("vds-data-table-filter-number", className),
        role: "group",
        "aria-label": `Filter ${column.id} by number range`,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            reactInput.Input,
            {
              inputSize: "sm",
              type: "number",
              "aria-label": "Minimum",
              placeholder: placeholder[0],
              value: min ?? "",
              onChange: (e) => update(
                e.target.value === "" ? void 0 : Number(e.target.value),
                max
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-filter-sep", "aria-hidden": "true", children: "\u2013" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            reactInput.Input,
            {
              inputSize: "sm",
              type: "number",
              "aria-label": "Maximum",
              placeholder: placeholder[1],
              value: max ?? "",
              onChange: (e) => update(
                min,
                e.target.value === "" ? void 0 : Number(e.target.value)
              )
            }
          )
        ]
      }
    );
  }
);
var SelectFilter = react.forwardRef(
  function SelectFilter2({
    column,
    options,
    multiple = false,
    placeholder = "All",
    className
  }, ref) {
    const { value, setValue } = useColumnFilter(column);
    const resolvedOptions = react.useMemo(() => {
      if (options) {
        return options.map(
          (o) => typeof o === "string" ? { value: o, label: o } : o
        );
      }
      const facet = column.getFacetedUniqueValues();
      return Array.from(facet.keys()).filter((k) => k != null && k !== "").map((k) => ({ value: String(k), label: String(k) }));
    }, [options, column]);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "select",
      {
        ref,
        multiple,
        value: multiple ? Array.isArray(value) ? value : [] : typeof value === "string" ? value : "",
        "aria-label": `Filter ${column.id}`,
        className: utils.cn("vds-data-table-filter-select", className),
        onChange: (e) => {
          if (multiple) {
            const selected = Array.from(
              e.target.selectedOptions,
              (o) => o.value
            );
            setValue(selected.length ? selected : void 0);
          } else {
            const v = e.target.value;
            setValue(v === "" ? void 0 : v);
          }
        },
        children: [
          !multiple && /* @__PURE__ */ jsxRuntime.jsx("option", { value: "", children: placeholder }),
          resolvedOptions.map((opt) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: opt.value, children: opt.label ?? opt.value }, opt.value))
        ]
      }
    );
  }
);
var TextFilter = react.forwardRef(
  function TextFilter2({ column, placeholder = "Filter\u2026", className }, ref) {
    const { value, setValue } = useColumnFilter(column);
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactInput.Input,
      {
        ref,
        inputSize: "sm",
        type: "text",
        "aria-label": `Filter ${column.id}`,
        placeholder,
        value: value ?? "",
        onChange: (e) => setValue(e.target.value === "" ? void 0 : e.target.value),
        className: utils.cn("vds-data-table-filter-text", className)
      }
    );
  }
);

// src/filters/index.ts
var Filters = {
  Text: TextFilter,
  Number: NumberFilter,
  Select: SelectFilter,
  Date: DateFilter,
  Popover: FilterPopover
};
var PaginationRoot = react.forwardRef(
  function PaginationRoot2({ className, children, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "nav",
      {
        ref,
        role: "navigation",
        "aria-label": "Pagination",
        className: utils.cn("vds-data-table-pagination", className),
        ...props,
        children
      }
    );
  }
);
var PaginationInfo = react.forwardRef(
  function PaginationInfo2({ className, renderLabel, ...props }, ref) {
    const { table, rowCount, mode } = useDataTableContext();
    const pagination = table.getState().pagination;
    const total = mode === "server" ? rowCount ?? 0 : table.getFilteredRowModel().rows.length;
    const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
    const end = Math.min(
      total,
      (pagination.pageIndex + 1) * pagination.pageSize
    );
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: utils.cn("vds-data-table-pagination-info", className),
        ...props,
        children: renderLabel ? renderLabel({ start, end, total }) : `${start}\u2013${end} of ${total}`
      }
    );
  }
);
var PaginationPrev = react.forwardRef(function PaginationPrev2({ className, children = "Previous", onClick, ...props }, ref) {
  const { table } = useDataTableContext();
  const canPrev = table.getCanPreviousPage();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": "Previous page",
      disabled: !canPrev,
      className: utils.cn("vds-data-table-pagination-button", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) table.previousPage();
      },
      ...props,
      children
    }
  );
});
var PaginationNext = react.forwardRef(function PaginationNext2({ className, children = "Next", onClick, ...props }, ref) {
  const { table } = useDataTableContext();
  const canNext = table.getCanNextPage();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": "Next page",
      disabled: !canNext,
      className: utils.cn("vds-data-table-pagination-button", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) table.nextPage();
      },
      ...props,
      children
    }
  );
});
function PaginationPageSize({
  options = [10, 25, 50, 100],
  className,
  label = "Rows per page"
}) {
  const { table } = useDataTableContext();
  const pageSize = table.getState().pagination.pageSize;
  return /* @__PURE__ */ jsxRuntime.jsxs("label", { className: utils.cn("vds-data-table-pagination-page-size", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-pagination-page-size-label", children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "select",
      {
        className: "vds-data-table-pagination-page-size-select",
        value: pageSize,
        onChange: (e) => table.setPageSize(Number(e.target.value)),
        children: options.map((n) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: n, children: n }, n))
      }
    )
  ] });
}
function pageRange(current, total, siblingCount) {
  const pages = [];
  if (total <= siblingCount + 4) {
    for (let i = 0; i < total; i++) pages.push(i);
    return pages;
  }
  const left = Math.max(current - Math.floor(siblingCount / 2), 1);
  const right = Math.min(left + siblingCount - 1, total - 2);
  pages.push(0);
  if (left > 1) pages.push("ellipsis-l");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 2) pages.push("ellipsis-r");
  pages.push(total - 1);
  return pages;
}
function PaginationPages({
  className,
  siblingCount = 5
}) {
  const { table } = useDataTableContext();
  const current = table.getState().pagination.pageIndex;
  const total = table.getPageCount();
  const items = pageRange(current, total, siblingCount);
  return /* @__PURE__ */ jsxRuntime.jsx("ul", { className: utils.cn("vds-data-table-pagination-pages", className), children: items.map(
    (it, i) => typeof it === "number" ? /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        "aria-label": `Page ${it + 1}`,
        "aria-current": it === current ? "page" : void 0,
        "data-active": it === current ? "" : void 0,
        className: "vds-data-table-pagination-page-button",
        onClick: () => table.setPageIndex(it),
        children: it + 1
      }
    ) }, `p-${it}`) : /* @__PURE__ */ jsxRuntime.jsx("li", { "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-pagination-ellipsis", children: "\u2026" }) }, `e-${i}`)
  ) });
}
function PaginationDefault({
  className,
  pageSizeOptions,
  hidePageSize = false,
  hidePageNumbers = false
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(PaginationRoot, { className, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PaginationInfo, {}),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-pagination-controls", children: [
      !hidePageSize && /* @__PURE__ */ jsxRuntime.jsx(PaginationPageSize, { options: pageSizeOptions }),
      /* @__PURE__ */ jsxRuntime.jsx(PaginationPrev, {}),
      !hidePageNumbers && /* @__PURE__ */ jsxRuntime.jsx(PaginationPages, {}),
      /* @__PURE__ */ jsxRuntime.jsx(PaginationNext, {})
    ] })
  ] });
}

// src/pagination/index.ts
var Pagination = {
  Root: PaginationRoot,
  Prev: PaginationPrev,
  Next: PaginationNext,
  PageSize: PaginationPageSize,
  Info: PaginationInfo,
  Pages: PaginationPages,
  Default: PaginationDefault
};
function Glyph({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-toolbar-button-icon", children });
}
var ToolbarActionButton = react.forwardRef(function ToolbarActionButton2({
  icon,
  trailingIcon,
  label,
  count,
  intent = "neutral",
  variant = "ghost",
  size = "md",
  iconOnly = false,
  className,
  children,
  ...props
}, ref) {
  const showLabel = !iconOnly && (label !== void 0 || children !== void 0);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      ref,
      type: "button",
      "data-intent": intent,
      "data-variant": variant,
      "data-size": size,
      "data-icon-only": iconOnly ? "" : void 0,
      className: utils.cn("vds-data-table-toolbar-button", className),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx(Glyph, { children: icon }),
        showLabel && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-toolbar-button-label", children: children ?? label }),
        count !== void 0 && count !== 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-toolbar-button-count", children: count }),
        trailingIcon && /* @__PURE__ */ jsxRuntime.jsx(Glyph, { children: trailingIcon })
      ]
    }
  );
});
var TOOLBAR_ICON = { size: 14, stroke: 1.5, "aria-hidden": true, focusable: false };
var CHEVRON_ICON = { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false };
var SearchIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconSearch, { ...TOOLBAR_ICON });
var FilterIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconFilter, { ...TOOLBAR_ICON });
var RefreshIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconRefresh, { ...TOOLBAR_ICON });
var DownloadIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconDownload, { ...TOOLBAR_ICON });
var PlusIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconPlus, { ...TOOLBAR_ICON });
var SettingsIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconSettings, { ...TOOLBAR_ICON });
var RotateCcwIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconRotateClockwise2, { ...TOOLBAR_ICON });
var EyeOffIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconEyeOff, { ...TOOLBAR_ICON });
var TrashIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconTrash, { ...TOOLBAR_ICON });
var XIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconX, { ...TOOLBAR_ICON });
var MoreIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconDotsVertical, { ...TOOLBAR_ICON });
var ChevronDownIcon = /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconChevronDown, { ...CHEVRON_ICON });
var DataTableFilterButton = react.forwardRef(function DataTableFilterButton2({ label = "Filter", count, intent, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToolbarActionButton,
    {
      ref,
      icon: FilterIcon,
      label,
      count,
      intent: intent ?? (count && count > 0 ? "primary" : "neutral"),
      ...props
    }
  );
});
var DataTableRefreshButton = react.forwardRef(
  function DataTableRefreshButton2({ label = "Refresh", ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(ToolbarActionButton, { ref, icon: RefreshIcon, label, ...props });
  }
);
var DataTableExportButton = react.forwardRef(
  function DataTableExportButton2({ label = "Export", variant = "outline", ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarActionButton,
      {
        ref,
        icon: DownloadIcon,
        label,
        variant,
        ...props
      }
    );
  }
);
var DataTableAddButton = react.forwardRef(function DataTableAddButton2({
  label = "Add",
  intent = "primary",
  variant = "solid",
  withChevron = false,
  trailingIcon,
  ...props
}, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToolbarActionButton,
    {
      ref,
      icon: PlusIcon,
      label,
      intent,
      variant,
      trailingIcon: trailingIcon ?? (withChevron ? ChevronDownIcon : void 0),
      ...props
    }
  );
});
var DataTableCustomizeButton = react.forwardRef(
  function DataTableCustomizeButton2({ label = "Customize", ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(ToolbarActionButton, { ref, icon: SettingsIcon, label, ...props });
  }
);
var DataTableResetLayoutButton = react.forwardRef(function DataTableResetLayoutButton2({ label = "Reset Layout", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(ToolbarActionButton, { ref, icon: RotateCcwIcon, label, ...props });
});
var DataTableHideColumnsButton = react.forwardRef(function DataTableHideColumnsButton2({ label = "Hide", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(ToolbarActionButton, { ref, icon: EyeOffIcon, label, ...props });
});
var DataTableDeleteButton = react.forwardRef(
  function DataTableDeleteButton2({ label = "Delete", intent = "danger", ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarActionButton,
      {
        ref,
        icon: TrashIcon,
        label,
        intent,
        ...props
      }
    );
  }
);
var DataTableCloseButton = react.forwardRef(
  function DataTableCloseButton2({ label, ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarActionButton,
      {
        ref,
        icon: XIcon,
        "aria-label": props["aria-label"] ?? "Close",
        label,
        iconOnly: label === void 0,
        ...props
      }
    );
  }
);
react.forwardRef(
  function DataTableSearchButton2({ label = "Search", ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarActionButton,
      {
        ref,
        icon: SearchIcon,
        label,
        ...props
      }
    );
  }
);
react.forwardRef(
  function DataTableMoreButton2({ ...props }, ref) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      ToolbarActionButton,
      {
        ref,
        icon: MoreIcon,
        iconOnly: true,
        "aria-label": props["aria-label"] ?? "More",
        ...props
      }
    );
  }
);
react.forwardRef(function DataTableRowAction2({ size = "sm", variant = "ghost", ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(ToolbarActionButton, { ref, size, variant, ...props });
});
var DataTableSearchIcon = SearchIcon;
var DataTableBoard = react.forwardRef(
  function DataTableBoard2({ className, renderCard, emptyMessage, skipColumns = [], ...props }, ref) {
    const { table } = useDataTableContext();
    const rows = table.getRowModel().rows;
    table.getVisibleLeafColumns().filter((c) => !skipColumns.includes(c.id));
    if (rows.length === 0 && emptyMessage) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref,
          role: "status",
          className: utils.cn("vds-data-table-board", "vds-data-table-board-empty", className),
          ...props,
          children: emptyMessage
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "list",
        className: utils.cn("vds-data-table-board", className),
        ...props,
        children: rows.map(
          (row, i) => renderCard ? renderCard(row, i) : /* @__PURE__ */ jsxRuntime.jsx(DataTableBoardCard, { row, skipColumns }, row.id)
        )
      }
    );
  }
);
function DataTableBoardCard({
  row,
  skipColumns
}) {
  const { table } = useDataTableContext();
  const columns = table.getVisibleLeafColumns().filter((c) => !skipColumns.includes(c.id));
  const selected = row.getIsSelected();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "article",
    {
      role: "listitem",
      "data-selected": boolAttr(selected),
      "data-row-id": row.id,
      "aria-selected": selected || void 0,
      className: "vds-data-table-board-card",
      children: columns.map((column) => {
        const cell = row.getVisibleCells().find((c) => c.column.id === column.id);
        if (!cell) return null;
        const label = String(column.columnDef.header ?? column.id);
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-board-field", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-data-table-board-label", children: label }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-data-table-board-value", children: reactTable.flexRender(column.columnDef.cell, cell.getContext()) })
        ] }, column.id);
      })
    }
  );
}
var DataTableListView = react.forwardRef(
  function DataTableListView2({ className, renderItem, emptyMessage, skipColumns = [], ...props }, ref) {
    const { table } = useDataTableContext();
    const rows = table.getRowModel().rows;
    if (rows.length === 0 && emptyMessage) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref,
          role: "status",
          className: utils.cn(
            "vds-data-table-list",
            "vds-data-table-list-empty",
            className
          ),
          ...props,
          children: emptyMessage
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "list",
        className: utils.cn("vds-data-table-list", className),
        ...props,
        children: rows.map(
          (row, i) => renderItem ? renderItem(row, i) : /* @__PURE__ */ jsxRuntime.jsx(
            DataTableListItem,
            {
              row,
              skipColumns
            },
            row.id
          )
        )
      }
    );
  }
);
function DataTableListItem({
  row,
  skipColumns
}) {
  const { table } = useDataTableContext();
  const columns = table.getVisibleLeafColumns().filter((c) => !skipColumns.includes(c.id));
  if (columns.length === 0) return null;
  const [primary, ...rest] = columns;
  const selected = row.getIsSelected();
  const primaryCell = primary ? row.getVisibleCells().find((c) => c.column.id === primary.id) : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      role: "listitem",
      "data-selected": boolAttr(selected),
      "data-row-id": row.id,
      "aria-selected": selected || void 0,
      className: "vds-data-table-list-item",
      children: [
        primary && primaryCell && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-data-table-list-primary", children: reactTable.flexRender(primary.columnDef.cell, primaryCell.getContext()) }),
        rest.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-data-table-list-secondary", children: rest.map((column) => {
          const cell = row.getVisibleCells().find((c) => c.column.id === column.id);
          if (!cell) return null;
          return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-list-field", children: reactTable.flexRender(column.columnDef.cell, cell.getContext()) }, column.id);
        }) })
      ]
    }
  );
}
var DEFAULT_MODES = ["table", "board", "list"];
var DEFAULT_LABELS = {
  table: "Table",
  board: "Board",
  list: "List"
};
var DEFAULT_ICONS = {
  table: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconTable, { size: 14, stroke: 1.5, "aria-hidden": true, focusable: false }),
  board: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconLayoutKanban, { size: 14, stroke: 1.5, "aria-hidden": true, focusable: false }),
  list: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconList, { size: 14, stroke: 1.5, "aria-hidden": true, focusable: false })
};
var DataTableViewModeToggle = react.forwardRef(function DataTableViewModeToggle2({ modes = DEFAULT_MODES, labels, icons, className, ...props }, ref) {
  const { viewMode, setViewMode } = useDataTableContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-label": "View mode",
      className: utils.cn("vds-data-table-view-toggle", className),
      ...props,
      children: modes.map((m) => {
        const active = viewMode === m;
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            "aria-pressed": active,
            "aria-label": `${DEFAULT_LABELS[m]} view`,
            "data-active": active ? "" : void 0,
            "data-mode": m,
            className: "vds-data-table-view-toggle-button",
            onClick: () => setViewMode(m),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-view-toggle-icon", children: icons?.[m] ?? DEFAULT_ICONS[m] }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-view-toggle-label", children: labels?.[m] ?? DEFAULT_LABELS[m] })
            ]
          },
          m
        );
      })
    }
  );
});
function DataTableViews({
  children,
  table,
  board,
  list,
  skipColumns,
  emptyMessage
}) {
  const { viewMode } = useDataTableContext();
  if (children) return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: children(viewMode) });
  if (viewMode === "table") return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: table });
  if (viewMode === "board") {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: board ?? /* @__PURE__ */ jsxRuntime.jsx(
      DataTableBoard,
      {
        skipColumns,
        emptyMessage
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: list ?? /* @__PURE__ */ jsxRuntime.jsx(
    DataTableListView,
    {
      skipColumns,
      emptyMessage
    }
  ) });
}

// src/DataTableNamespace.ts
var DataTable = {
  Root: DataTableRoot,
  /* Layout */
  Toolbar: DataTableToolbar,
  ScrollArea: DataTableScrollArea,
  /* Table view */
  Table: DataTableTable,
  Header: DataTableHeader,
  HeaderGroup: DataTableHeaderGroup,
  HeaderCell: DataTableHeaderCell,
  SortTrigger: DataTableSortTrigger,
  ResizeHandle: DataTableResizeHandle,
  ColumnGuide: DataTableColumnGuide,
  PinColumnTrigger: DataTablePinColumnTrigger,
  Body: DataTableBody,
  Row: DataTableRow,
  Cell: DataTableCell,
  EditableCell,
  GroupHeaderRow: DataTableGroupHeaderRow,
  RowExpandTrigger: DataTableRowExpandTrigger,
  RowPinTrigger: DataTableRowPinTrigger,
  Footer: DataTableFooter,
  FooterRow: DataTableFooterRow,
  FooterCell: DataTableFooterCell,
  /* Selection */
  SelectAllCheckbox: DataTableSelectAllCheckbox,
  RowSelectCheckbox: DataTableRowSelectCheckbox,
  /* Empty / loading */
  Empty: DataTableEmpty,
  LoadingOverlay: DataTableLoadingOverlay,
  /* Views */
  Views: DataTableViews,
  Board: DataTableBoard,
  List: DataTableListView,
  ViewModeToggle: DataTableViewModeToggle,
  /* Toolbar action buttons */
  ActionButton: ToolbarActionButton,
  FilterButton: DataTableFilterButton,
  RefreshButton: DataTableRefreshButton,
  ExportButton: DataTableExportButton,
  AddButton: DataTableAddButton,
  CustomizeButton: DataTableCustomizeButton,
  ResetLayoutButton: DataTableResetLayoutButton,
  HideColumnsButton: DataTableHideColumnsButton,
  DeleteButton: DataTableDeleteButton,
  CloseButton: DataTableCloseButton,
  /* Global filter input (simple) */
  GlobalFilter: DataTableGlobalFilter,
  /* Column visibility list (simple) */
  ColumnVisibility: DataTableColumnVisibility,
  /* Compounds */
  Pagination,
  Filters,
  FilterDrawer: DataTableFilterDrawer,
  BulkActions,
  Cells
};

Object.defineProperty(exports, "createColumnHelper", {
  enumerable: true,
  get: function () { return reactTable.createColumnHelper; }
});
Object.defineProperty(exports, "flexRender", {
  enumerable: true,
  get: function () { return reactTable.flexRender; }
});
exports.ActionsCell = ActionsCell;
exports.AvatarCell = AvatarCell;
exports.BadgeCell = BadgeCell;
exports.BulkActions = BulkActions;
exports.CellEditor = CellEditor;
exports.Cells = Cells;
exports.CopyableCell = CopyableCell;
exports.DataTable = DataTable;
exports.DataTableAddButton = DataTableAddButton;
exports.DataTableBoard = DataTableBoard;
exports.DataTableBody = DataTableBody;
exports.DataTableBulkActions = DataTableBulkActions;
exports.DataTableBulkClear = DataTableBulkClear;
exports.DataTableBulkCount = DataTableBulkCount;
exports.DataTableCell = DataTableCell;
exports.DataTableCloseButton = DataTableCloseButton;
exports.DataTableColumnGuide = DataTableColumnGuide;
exports.DataTableColumnVisibility = DataTableColumnVisibility;
exports.DataTableCustomizeButton = DataTableCustomizeButton;
exports.DataTableDeleteButton = DataTableDeleteButton;
exports.DataTableEmpty = DataTableEmpty;
exports.DataTableExportButton = DataTableExportButton;
exports.DataTableFilterButton = DataTableFilterButton;
exports.DataTableFilterDrawer = DataTableFilterDrawer;
exports.DataTableFooter = DataTableFooter;
exports.DataTableFooterCell = DataTableFooterCell;
exports.DataTableFooterRow = DataTableFooterRow;
exports.DataTableGlobalFilter = DataTableGlobalFilter;
exports.DataTableGroupHeaderRow = DataTableGroupHeaderRow;
exports.DataTableHeader = DataTableHeader;
exports.DataTableHeaderCell = DataTableHeaderCell;
exports.DataTableHeaderGroup = DataTableHeaderGroup;
exports.DataTableHideColumnsButton = DataTableHideColumnsButton;
exports.DataTableListView = DataTableListView;
exports.DataTableLoadingOverlay = DataTableLoadingOverlay;
exports.DataTablePinColumnTrigger = DataTablePinColumnTrigger;
exports.DataTableRefreshButton = DataTableRefreshButton;
exports.DataTableResetLayoutButton = DataTableResetLayoutButton;
exports.DataTableResizeHandle = DataTableResizeHandle;
exports.DataTableRoot = DataTableRoot;
exports.DataTableRow = DataTableRow;
exports.DataTableRowExpandTrigger = DataTableRowExpandTrigger;
exports.DataTableRowPinTrigger = DataTableRowPinTrigger;
exports.DataTableRowSelectCheckbox = DataTableRowSelectCheckbox;
exports.DataTableScrollArea = DataTableScrollArea;
exports.DataTableSearchIcon = DataTableSearchIcon;
exports.DataTableSelectAllAcrossPages = DataTableSelectAllAcrossPages;
exports.DataTableSelectAllCheckbox = DataTableSelectAllCheckbox;
exports.DataTableSortTrigger = DataTableSortTrigger;
exports.DataTableTable = DataTableTable;
exports.DataTableToolbar = DataTableToolbar;
exports.DataTableViewModeToggle = DataTableViewModeToggle;
exports.DataTableViews = DataTableViews;
exports.DateCell = DateCell;
exports.DateFilter = DateFilter;
exports.EditableCell = EditableCell;
exports.FilterConfigPanel = FilterConfigPanel;
exports.FilterPopover = FilterPopover;
exports.Filters = Filters;
exports.LinkCell = LinkCell;
exports.NumberCell = NumberCell;
exports.NumberFilter = NumberFilter;
exports.Pagination = Pagination;
exports.PaginationDefault = PaginationDefault;
exports.PaginationInfo = PaginationInfo;
exports.PaginationNext = PaginationNext;
exports.PaginationPageSize = PaginationPageSize;
exports.PaginationPages = PaginationPages;
exports.PaginationPrev = PaginationPrev;
exports.PaginationRoot = PaginationRoot;
exports.SelectFilter = SelectFilter;
exports.StatusBadgeCell = StatusBadgeCell;
exports.TextCell = TextCell;
exports.TextFilter = TextFilter;
exports.ToolbarActionButton = ToolbarActionButton;
exports.buildColumnSizeVars = buildColumnSizeVars;
exports.columnVar = columnVar;
exports.countConditions = countConditions;
exports.resolveUpdater = resolveUpdater;
exports.useAutoFitColumn = useAutoFitColumn;
exports.useCellEdit = useCellEdit;
exports.useColumnFilter = useColumnFilter;
exports.useColumnResize = useColumnResize;
exports.useControllableState = useControllableState;
exports.useDataTable = useDataTable;
exports.useDataTableContext = useDataTableContext;
exports.useDataTableVirtualizer = useDataTableVirtualizer;
