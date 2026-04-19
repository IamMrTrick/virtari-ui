"use client";
import { createContext, forwardRef, useMemo, memo, useCallback, useState, useEffect, useContext, useRef, useId } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { flexRender, useReactTable, getFacetedUniqueValues, getFacetedRowModel, getGroupedRowModel, getExpandedRowModel, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, getCoreRowModel } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Checkbox } from '@virtari/react-checkbox';
import { cn } from '@virtari/utils';
import { IconArrowsSort, IconChevronUp, IconChevronRight } from '@virtari/react-icons';

// src/DataTableContext.tsx
var DataTableCtx = createContext(null);
function DataTableProvider({
  id,
  children,
  ...rest
}) {
  const autoId = useId();
  const scrollRef = useRef(null);
  const value = useMemo(
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
  return /* @__PURE__ */ jsx(DataTableCtx.Provider, { value, children });
}
function useDataTableContext() {
  const ctx = useContext(DataTableCtx);
  if (!ctx) {
    throw new Error(
      "useDataTableContext must be used inside <DataTable.Root>."
    );
  }
  return ctx;
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
function useControllableState({
  value,
  defaultValue,
  onChange
}) {
  const isControlled = value !== void 0;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const set = useCallback(
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
  return useReactTable({
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
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: isServer ? void 0 : getSortedRowModel(),
    getFilteredRowModel: isServer ? void 0 : getFilteredRowModel(),
    getPaginationRowModel: isServer ? void 0 : getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: isServer ? void 0 : getGroupedRowModel(),
    getFacetedRowModel: isServer ? void 0 : getFacetedRowModel(),
    getFacetedUniqueValues: isServer ? void 0 : getFacetedUniqueValues()
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
  const setSize = useCallback(
    (next) => {
      const clamped = Math.max(minSize, Math.min(maxSize, Math.round(next)));
      table.setColumnSizing((prev) => ({ ...prev, [column.id]: clamped }));
    },
    [table, column.id, minSize, maxSize]
  );
  const onKeyDownAdjust = useCallback(
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
  const getGuidelineStyle = useCallback(() => {
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
  return useMemo(
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
  const measure = useCallback(() => {
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
  const fit = useCallback(() => {
    const next = measure();
    table.setColumnSizing((prev) => ({ ...prev, [columnId]: next }));
  }, [columnId, measure, table]);
  return { fit, measure, minSize, maxSize };
}
function useDataTableVirtualizer({
  count,
  scrollRef,
  estimateSize = 40,
  overscan = 8
}) {
  const getScrollElement = useCallback(() => scrollRef.current, [scrollRef]);
  return useVirtualizer({
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
function useHorizontalScrollShadow(ref) {
  const [state, setState] = useState("none");
  useEffect(() => {
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
function useScrollDrag(ref, enabled) {
  const stateRef = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const isInteractive = (target) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          [
            /* The entire header area owns its own gestures: sort (click),
             * resize (drag edge), reorder (drag body). Scroll-drag would
             * steal those — so never start panning from inside <thead>. */
            "thead",
            "th",
            ".vds-data-table-header",
            ".vds-data-table-header-cell",
            /* Interactive controls inside the body. */
            "button",
            "a",
            "input",
            "select",
            "textarea",
            "[role='button']",
            "[role='checkbox']",
            "[role='switch']",
            "[role='menu']",
            "[role='menuitem']",
            "[role='combobox']",
            "[contenteditable='true']",
            "[contenteditable='']",
            "[data-no-scroll-drag]",
            ".vds-data-table-resize-handle",
            ".vds-data-table-sort-trigger",
            ".vds-data-table-drag-handle",
            ".vds-data-table-actions-cell-trigger",
            ".vds-data-table-link-cell"
          ].join(",")
        )
      );
    };
    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      if (isInteractive(e.target)) return;
      if (el.ownerDocument.querySelector(".vds-data-table[data-resizing]")) return;
      stateRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
        pointerId: e.pointerId,
        moved: false
      };
      el.setAttribute("data-scroll-dragging", "");
    };
    const onPointerMove = (e) => {
      const s = stateRef.current;
      if (!s || !s.active) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;
      if (!s.moved && Math.hypot(dx, dy) > 4) {
        s.moved = true;
        try {
          el.setPointerCapture(s.pointerId);
        } catch {
        }
      }
      if (s.moved) {
        el.scrollLeft = s.scrollLeft - dx;
        el.scrollTop = s.scrollTop - dy;
      }
    };
    const end = () => {
      const s = stateRef.current;
      if (!s) return;
      if (s.active) {
        try {
          el.releasePointerCapture(s.pointerId);
        } catch {
        }
      }
      stateRef.current = null;
      el.removeAttribute("data-scroll-dragging");
    };
    const onPointerUp = () => end();
    const onPointerCancel = () => end();
    const onClickCapture = (e) => {
      const s = stateRef.current;
      if (s && s.moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerCancel);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerCancel);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [ref, enabled]);
}
function useKeyboardGridNav(enabled, scrollRef) {
  const handler = useCallback(
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
  useEffect(() => {
    if (!enabled) return;
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [enabled, handler, scrollRef]);
}
function useSrAnnouncements(table) {
  const [message, setMessage] = useState("");
  const lastSorted = useRef("");
  const lastFilterCount = useRef(0);
  const lastSelectedCount = useRef(0);
  const sorting = table.getState().sorting;
  const columnFilters = table.getState().columnFilters;
  const globalFilter = table.getState().globalFilter ?? "";
  const selectedCount = table.getSelectedRowModel().rows.length;
  const filterCount = useMemo(
    () => columnFilters.filter((f) => f.value !== void 0 && f.value !== "").length + (globalFilter ? 1 : 0),
    [columnFilters, globalFilter]
  );
  useEffect(() => {
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
  useEffect(() => {
    if (filterCount === lastFilterCount.current) return;
    lastFilterCount.current = filterCount;
    const rows = table.getFilteredRowModel().rows.length;
    if (filterCount === 0) setMessage("Filters cleared.");
    else setMessage(`${filterCount} filter${filterCount === 1 ? "" : "s"} active. ${rows} result${rows === 1 ? "" : "s"}.`);
  }, [filterCount, table]);
  useEffect(() => {
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
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: forwardedRef,
      className: cn("vds-data-table", className),
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
        /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
var DataTableRoot = forwardRef(function DataTableRoot2(props, ref) {
  if ("table" in props && props.table) {
    return /* @__PURE__ */ jsx(
      DataTableAdvancedRoot,
      {
        ...props,
        forwardedRef: ref
      }
    );
  }
  return /* @__PURE__ */ jsx(
    DataTableSimpleRoot,
    {
      ...props,
      forwardedRef: ref
    }
  );
});
var DataTableToolbar = forwardRef(
  function DataTableToolbar2({ className, children, ...props }, ref) {
    const { tableId } = useDataTableContext();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "toolbar",
        "aria-controls": tableId,
        className: cn("vds-data-table-toolbar", className),
        ...props,
        children
      }
    );
  }
);
var DataTableScrollArea = forwardRef(function DataTableScrollArea2({ className, children, scrollDrag = true, ...props }, ref) {
  const { scrollRef } = useDataTableContext();
  useScrollDrag(scrollRef, scrollDrag);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: composeRefs(scrollRef, ref),
      "data-scroll-drag": scrollDrag ? "" : void 0,
      className: cn("vds-data-table-scroll-area", className),
      ...props,
      children
    }
  );
});
var DataTableTable = forwardRef(
  function DataTableTable2({ className, style, children, ...props }, ref) {
    const { table, interactionMode, tableId } = useDataTableContext();
    const sizeVars = useMemo(() => buildColumnSizeVars(table), [
      table,
      // Re-evaluate when any column size changes
      table.getState().columnSizing,
      table.getState().columnSizingInfo
    ]);
    return /* @__PURE__ */ jsx(
      "table",
      {
        ref,
        id: tableId,
        role: interactionMode === "grid" ? "grid" : void 0,
        className: cn("vds-data-table-table", className),
        style: { ...sizeVars, ...style },
        ...props,
        children
      }
    );
  }
);
var DataTableHeader = forwardRef(function DataTableHeader2({ className, children, ...props }, ref) {
  const { table, stickyHeader } = useDataTableContext();
  const groups = table.getHeaderGroups();
  const content = typeof children === "function" ? children(groups) : children ?? groups.map((group) => /* @__PURE__ */ jsx(
    DataTableHeaderGroup,
    {
      headerGroup: group
    },
    group.id
  ));
  return /* @__PURE__ */ jsx(
    "thead",
    {
      ref,
      role: "rowgroup",
      "data-sticky": boolAttr(stickyHeader),
      className: cn("vds-data-table-header", className),
      ...props,
      children: content
    }
  );
});
var DataTableHeaderGroup = forwardRef(function DataTableHeaderGroup2({ headerGroup, className, children, ...props }, ref) {
  const headers = headerGroup.headers;
  const content = typeof children === "function" ? children(headers) : children ?? headers.map((header) => /* @__PURE__ */ jsx(DataTableHeaderCell, { header }, header.id));
  return /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      role: "row",
      className: cn("vds-data-table-header-row", className),
      ...props,
      children: content
    }
  );
});
var DataTableHeaderCell = forwardRef(function DataTableHeaderCell2({ header, className, style, children, ...props }, ref) {
  const column = header.column;
  const sort = sortedAttr(header);
  const pin = pinnedAttr(column);
  const canSort = column.getCanSort();
  const canResize = column.getCanResize();
  const ariaSort = sort === "asc" ? "ascending" : sort === "desc" ? "descending" : canSort ? "none" : void 0;
  return /* @__PURE__ */ jsx(
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
      className: cn("vds-data-table-header-cell", className),
      style: {
        ["--col-size"]: `var(--col-${column.id})`,
        ...pinOffsetStyle(column),
        ...style
      },
      ...props,
      children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "vds-data-table-header-cell-content", children: children ?? (canSort ? /* @__PURE__ */ jsx(DataTableSortTrigger, { header, children: flexRender(column.columnDef.header, header.getContext()) }) : flexRender(column.columnDef.header, header.getContext())) }),
        canResize && /* @__PURE__ */ jsx(DataTableResizeHandle, { header })
      ] })
    }
  );
});
function DataTableBodyInner({ rows, children }) {
  if (typeof children === "function") {
    return /* @__PURE__ */ jsx(Fragment, { children: children(rows) });
  }
  if (children !== void 0) return /* @__PURE__ */ jsx(Fragment, { children });
  return /* @__PURE__ */ jsx(Fragment, { children: rows.map(
    (row) => row.getIsGrouped() ? /* @__PURE__ */ jsx(DataTableGroupHeaderRow, { row }, row.id) : /* @__PURE__ */ jsx(DataTableRow, { row }, row.id)
  ) });
}
var DataTableBodyInnerMemo = memo(DataTableBodyInner);
var DataTableBody = forwardRef(function DataTableBody2({ className, children, emptyMessage, ...props }, ref) {
  const { table, virtualization } = useDataTableContext();
  const rows = table.getRowModel().rows;
  const isResizing = Boolean(
    table.getState().columnSizingInfo.isResizingColumn
  );
  if (rows.length === 0 && emptyMessage) {
    const colCount = table.getVisibleFlatColumns().length || 1;
    return /* @__PURE__ */ jsx(
      "tbody",
      {
        ref,
        role: "rowgroup",
        "data-empty": "",
        className: cn("vds-data-table-body", className),
        ...props,
        children: /* @__PURE__ */ jsx("tr", { className: "vds-data-table-row", children: /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      ref,
      role: "rowgroup",
      className: cn("vds-data-table-body", className),
      ...props,
      children: /* @__PURE__ */ jsx(Inner, { rows, children })
    }
  );
});
var DataTableBodyVirtualized = forwardRef(function DataTableBodyVirtualized2({ rows, virtualizationOptions, className, ...props }, ref) {
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
  return /* @__PURE__ */ jsxs(
    "tbody",
    {
      ref,
      role: "rowgroup",
      className: cn("vds-data-table-body", className),
      ...props,
      children: [
        paddingTop > 0 && /* @__PURE__ */ jsx(
          "tr",
          {
            "aria-hidden": "true",
            className: "vds-data-table-virtual-spacer",
            style: { blockSize: paddingTop },
            children: /* @__PURE__ */ jsx("td", { colSpan: colCount, style: { padding: 0, border: 0 } })
          }
        ),
        items.map((vi) => {
          const row = rows[vi.index];
          if (!row) return null;
          return /* @__PURE__ */ jsx(
            DataTableRow,
            {
              row,
              "data-index": vi.index,
              ref: virt.measureElement
            },
            row.id
          );
        }),
        paddingBottom > 0 && /* @__PURE__ */ jsx(
          "tr",
          {
            "aria-hidden": "true",
            className: "vds-data-table-virtual-spacer",
            style: { blockSize: paddingBottom },
            children: /* @__PURE__ */ jsx("td", { colSpan: colCount, style: { padding: 0, border: 0 } })
          }
        )
      ]
    }
  );
});
var DataTableRow = forwardRef(
  function DataTableRow2({ row, className, children, ...props }, ref) {
    const selected = row.getIsSelected();
    const expanded = row.getIsExpanded();
    const pinned = rowPinnedAttr(row);
    const cells = row.getVisibleCells();
    const content = typeof children === "function" ? children(cells) : children ?? cells.map((cell) => /* @__PURE__ */ jsx(DataTableCell, { cell }, cell.id));
    return /* @__PURE__ */ jsx(
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
        className: cn("vds-data-table-row", className),
        ...props,
        children: content
      }
    );
  }
);
var DataTableCell = forwardRef(function DataTableCell2({ cell, className, style, children, ...props }, ref) {
  const { interactionMode } = useDataTableContext();
  const column = cell.column;
  const pin = pinnedAttr(column);
  const isFirstGridCell = interactionMode === "grid" && cell.row.index === 0 && column.getIndex() === 0;
  return /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      role: interactionMode === "grid" ? "gridcell" : "cell",
      tabIndex: interactionMode === "grid" ? isFirstGridCell ? 0 : -1 : void 0,
      "data-pinned": pin,
      "data-pinned-last": pin === "left" && column.getIsLastColumn("left") ? "" : void 0,
      "data-pinned-first": pin === "right" && column.getIsFirstColumn("right") ? "" : void 0,
      "data-column-id": column.id,
      className: cn("vds-data-table-cell", className),
      style: {
        ["--col-size"]: `var(--col-${column.id})`,
        ...pinOffsetStyle(column),
        ...style
      },
      ...props,
      children: /* @__PURE__ */ jsx("span", { className: "vds-data-table-cell-content", children: children ?? flexRender(column.columnDef.cell, cell.getContext()) })
    }
  );
});
var DataTableFooter = forwardRef(function DataTableFooter2({ className, children, ...props }, ref) {
  const { table } = useDataTableContext();
  const groups = table.getFooterGroups();
  const hasFooter = groups.some(
    (g) => g.headers.some((h) => h.column.columnDef.footer)
  );
  if (!hasFooter && !children) return null;
  return /* @__PURE__ */ jsx(
    "tfoot",
    {
      ref,
      role: "rowgroup",
      className: cn("vds-data-table-footer", className),
      ...props,
      children: children ?? groups.map((group) => /* @__PURE__ */ jsx(DataTableFooterRow, { footerGroup: group }, group.id))
    }
  );
});
var DataTableFooterRow = forwardRef(function DataTableFooterRow2({ footerGroup, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      role: "row",
      className: cn("vds-data-table-footer-row", className),
      ...props,
      children: children ?? footerGroup.headers.map((header) => /* @__PURE__ */ jsx(DataTableFooterCell, { header }, header.id))
    }
  );
});
var DataTableFooterCell = forwardRef(function DataTableFooterCell2({ header, className, style, children, ...props }, ref) {
  const column = header.column;
  const pin = pinnedAttr(column);
  return /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      role: "cell",
      "data-pinned": pin,
      "data-pinned-last": pin === "left" && column.getIsLastColumn("left") ? "" : void 0,
      "data-pinned-first": pin === "right" && column.getIsFirstColumn("right") ? "" : void 0,
      "data-column-id": column.id,
      className: cn("vds-data-table-footer-cell", className),
      style: {
        ["--col-size"]: `var(--col-${column.id})`,
        ...pinOffsetStyle(column),
        ...style
      },
      ...props,
      children: header.isPlaceholder ? null : children ?? flexRender(column.columnDef.footer, header.getContext())
    }
  );
});
var DataTableEmpty = forwardRef(
  function DataTableEmpty2({ className, children, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "status",
        className: cn("vds-data-table-empty", className),
        ...props,
        children
      }
    );
  }
);
var DataTableLoadingOverlay = forwardRef(function DataTableLoadingOverlay2({ open = true, label = "Loading", className, children, ...props }, ref) {
  if (!open) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "status",
      "aria-live": "polite",
      "aria-busy": "true",
      "data-state": "open",
      className: cn("vds-data-table-loading", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx("span", { className: "vds-data-table-loading-label", children: label })
    }
  );
});
var DataTableSortTrigger = forwardRef(function DataTableSortTrigger2({ header, className, children, onClick, ...props }, ref) {
  const column = header.column;
  const sort = sortedAttr(header);
  const handleClick = useCallback(
    (e) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      column.getToggleSortingHandler()?.(e);
    },
    [column, onClick]
  );
  const nextLabel = sort === void 0 ? "ascending" : sort === "asc" ? "descending" : "no sort";
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      type: "button",
      "data-sorted": sort,
      "aria-label": `Sort by column, ${nextLabel}`,
      className: cn("vds-data-table-sort-trigger", className),
      onClick: handleClick,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "vds-data-table-sort-label", children }),
        /* @__PURE__ */ jsx(DataTableSortIcon, { sort })
      ]
    }
  );
});
function DataTableSortIcon({ sort }) {
  if (sort === void 0) {
    return /* @__PURE__ */ jsx(
      IconArrowsSort,
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
  return /* @__PURE__ */ jsx(
    IconChevronUp,
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
var DataTableGlobalFilter = forwardRef(function DataTableGlobalFilter2({
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
  const [local, setLocal] = useState(
    value ?? defaultValue ?? currentTableValue
  );
  useEffect(() => {
    if (value !== void 0) setLocal(value);
  }, [value]);
  useEffect(() => {
    if (local === currentTableValue) return;
    const id = window.setTimeout(() => {
      table.setGlobalFilter(local);
      onValueChange?.(local);
    }, debounceMs);
    return () => window.clearTimeout(id);
  }, [local, debounceMs]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type: "search",
      role: "searchbox",
      "aria-label": "Search table",
      placeholder,
      value: local,
      onChange: (e) => setLocal(e.target.value),
      className: cn("vds-data-table-global-filter", className),
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
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      className: cn("vds-data-table-select-all", className),
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
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      className: cn("vds-data-table-row-select", className),
      checked: selected,
      disabled: !canSelect,
      "aria-label": "Select row",
      onCheckedChange: () => handler({
        target: { checked: !selected }
      })
    }
  );
}
var DataTableResizeHandle = forwardRef(function DataTableResizeHandle2({ header, className, ...props }, ref) {
  const { isResizing, onKeyDownAdjust, currentSize, minSize, maxSize } = useColumnResize(header);
  const { fit } = useAutoFitColumn(header.column.id);
  const columnName = String(header.column.columnDef.header ?? header.column.id);
  return /* @__PURE__ */ jsx(
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
      className: cn("vds-data-table-resize-handle", className),
      onPointerDown: (e) => {
        e.stopPropagation();
        header.getResizeHandler()(e);
      },
      onTouchStart: (e) => {
        e.stopPropagation();
        header.getResizeHandler()(e);
      },
      onDoubleClick: (e) => {
        e.preventDefault();
        fit();
      },
      onKeyDown: onKeyDownAdjust,
      onMouseDown: (e) => e.stopPropagation(),
      onClick: (e) => e.stopPropagation(),
      ...props,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
var DataTablePinColumnTrigger = forwardRef(function DataTablePinColumnTrigger2({ column, side, className, children, onClick, ...props }, ref) {
  const pinned = column.getIsPinned();
  const isPressed = pinned === side;
  const toggle = () => {
    column.pin(isPressed ? false : side);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-pressed": isPressed,
      "aria-label": `Pin column to ${side}`,
      "data-pinned": isPressed ? side : void 0,
      className: cn("vds-data-table-pin-trigger", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) toggle();
      },
      ...props,
      children: children ?? (isPressed ? "Unpin" : `Pin ${side}`)
    }
  );
});
var DataTableRowExpandTrigger = forwardRef(function DataTableRowExpandTrigger2({ row, className, children, onClick, ...props }, ref) {
  const canExpand = row.getCanExpand();
  const expanded = row.getIsExpanded();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-expanded": expanded,
      "aria-label": expanded ? "Collapse row" : "Expand row",
      disabled: !canExpand,
      "data-expanded": expanded ? "" : void 0,
      className: cn("vds-data-table-row-expand-trigger", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) row.toggleExpanded();
      },
      ...props,
      children: children ?? /* @__PURE__ */ jsx(
        IconChevronRight,
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
var DataTableRowPinTrigger = forwardRef(function DataTableRowPinTrigger2({ row, side, className, children, onClick, ...props }, ref) {
  const pinned = row.getIsPinned();
  const isPressed = pinned === side;
  const toggle = () => {
    row.pin(isPressed ? false : side);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-pressed": isPressed,
      "aria-label": `Pin row to ${side}`,
      "data-pinned": isPressed ? side : void 0,
      className: cn("vds-data-table-row-pin-trigger", className),
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
  return /* @__PURE__ */ jsx(
    "ul",
    {
      role: "group",
      "aria-label": "Toggle column visibility",
      className: cn("vds-data-table-column-visibility", className),
      children: columns.map((col) => {
        const visible = col.getIsVisible();
        const label = String(col.columnDef.header ?? col.id);
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "vds-data-table-column-visibility-item", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: visible,
              onChange: (e) => col.toggleVisibility(e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("span", { children: label })
        ] }) }, col.id);
      })
    }
  );
}
var DataTableGroupHeaderRow = forwardRef(function DataTableGroupHeaderRow2({ row, className, ...props }, ref) {
  const { table } = useDataTableContext();
  const colCount = table.getVisibleFlatColumns().length || 1;
  const groupColId = row.groupingColumnId;
  const groupValue = groupColId ? row.getValue(groupColId) : "Group";
  return /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      role: "row",
      "data-group-row": "",
      "data-depth": row.depth,
      className: cn("vds-data-table-group-header-row", className),
      ...props,
      children: /* @__PURE__ */ jsxs(
        "td",
        {
          colSpan: colCount,
          className: "vds-data-table-group-header-cell",
          style: { paddingInlineStart: `${row.depth * 16 + 8}px` },
          children: [
            /* @__PURE__ */ jsx(DataTableRowExpandTrigger, { row }),
            /* @__PURE__ */ jsxs("span", { className: "vds-data-table-group-label", children: [
              String(groupValue ?? "\u2014"),
              /* @__PURE__ */ jsxs("span", { className: "vds-data-table-group-count", children: [
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

export { DataTableBody, DataTableCell, DataTableColumnGuide, DataTableColumnVisibility, DataTableEmpty, DataTableFooter, DataTableFooterCell, DataTableFooterRow, DataTableGlobalFilter, DataTableGroupHeaderRow, DataTableHeader, DataTableHeaderCell, DataTableHeaderGroup, DataTableLoadingOverlay, DataTablePinColumnTrigger, DataTableResizeHandle, DataTableRoot, DataTableRow, DataTableRowExpandTrigger, DataTableRowPinTrigger, DataTableRowSelectCheckbox, DataTableScrollArea, DataTableSelectAllCheckbox, DataTableSortTrigger, DataTableTable, DataTableToolbar, boolAttr, buildColumnSizeVars, columnVar, pinnedAttr, resolveUpdater, useAutoFitColumn, useColumnResize, useControllableState, useDataTable, useDataTableContext, useDataTableVirtualizer };
