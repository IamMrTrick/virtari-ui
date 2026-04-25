"use client";
'use strict';

var core = require('@dnd-kit/core');
var sortable = require('@dnd-kit/sortable');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var utilities = require('@dnd-kit/utilities');
var utils = require('@virtari-packages/utils');
var reactTable = require('@tanstack/react-table');
require('@virtari-packages/react-checkbox');
var reactIcons = require('@virtari-packages/react-icons');
var reactVirtual = require('@tanstack/react-virtual');
var reactDrawer = require('@virtari-packages/react-drawer');
var reactInput = require('@virtari-packages/react-input');
var reactSwitch = require('@virtari-packages/react-switch');

// src/dnd/DndProvider.tsx
var DataTableCtx = react.createContext(null);
function DataTableProvider({
  id,
  children,
  ...rest
}) {
  const autoId = react.useId();
  const scrollRef = react.useRef(null);
  const tableState = rest.table.getState();
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
      tableState.sorting,
      tableState.columnFilters,
      tableState.globalFilter,
      tableState.rowSelection,
      tableState.columnSizing,
      tableState.columnSizingInfo,
      tableState.columnOrder,
      tableState.columnPinning,
      tableState.columnVisibility,
      tableState.pagination,
      tableState.grouping,
      tableState.expanded,
      tableState.rowPinning,
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

// src/dnd/use-column-dnd.ts
function useColumnDnd(options = {}) {
  const { table } = useDataTableContext();
  const { onColumnOrderChange } = options;
  const sensors = core.useSensors(
    core.useSensor(core.PointerSensor, { activationConstraint: { distance: 4 } }),
    core.useSensor(core.KeyboardSensor, {
      coordinateGetter: sortable.sortableKeyboardCoordinates
    })
  );
  const items = react.useMemo(
    () => table.getVisibleLeafColumns().map((c) => c.id),
    [table, table.getState().columnOrder, table.getState().columnVisibility]
  );
  const completeOrder = react.useCallback(() => {
    const allIds = table.getAllLeafColumns().map((c) => c.id);
    const known = new Set(allIds);
    const current = table.getState().columnOrder.filter((id) => known.has(id));
    const missing = allIds.filter((id) => !current.includes(id));
    return current.length > 0 ? [...current, ...missing] : allIds;
  }, [table]);
  const handleDragEnd = react.useCallback(
    (event) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const currentOrder = completeOrder();
      const oldIndex = currentOrder.indexOf(active.id);
      const newIndex = currentOrder.indexOf(over.id);
      if (oldIndex < 0 || newIndex < 0) return;
      const next = sortable.arrayMove(currentOrder, oldIndex, newIndex);
      table.setColumnOrder(next);
      onColumnOrderChange?.(next);
    },
    [completeOrder, table, onColumnOrderChange]
  );
  return { sensors, handleDragEnd, strategy: sortable.horizontalListSortingStrategy, items };
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    core.DndContext,
    {
      sensors: overrideSensors ?? sensors,
      onDragEnd: handleDragEnd,
      ...dndContextProps,
      children: /* @__PURE__ */ jsxRuntime.jsx(sortable.SortableContext, { items, strategy, children })
    }
  );
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
  out["--data-table-total-width"] = `${table.getTotalSize()}px`;
  for (const header of headers) {
    out[`--col-${header.column.id}`] = `${header.getSize()}px`;
  }
  return out;
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
function useScrollDrag(ref, enabled) {
  const stateRef = react.useRef(null);
  react.useEffect(() => {
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

// src/utils/sticky.ts
function stickyAttr(sticky) {
  if (!sticky) return void 0;
  return sticky === true ? "" : sticky;
}
var TOP_BAND_SELECTOR = [
  ".vds-data-table-toolbar[data-sticky]",
  ".vds-data-table-filter-bar[data-sticky]",
  ".vds-data-table-sticky-header-rail[data-sticky]",
  ".vds-data-table-header[data-sticky]:not([data-vds-detached-header])"
].join(",");
var BOTTOM_BAND_SELECTOR = [
  ".vds-data-table-footer[data-sticky]",
  ".vds-data-table-bulk-actions[data-sticky]",
  ".vds-data-table-pagination[data-sticky]"
].join(",");
var SMART_THRESHOLD = 4;
var FOOTER_SAFE_ZONE = 24;
function isWindow(target) {
  return target === window;
}
function findScrollAncestor(el) {
  let parent = el.parentElement;
  while (parent) {
    const style = window.getComputedStyle(parent);
    if (style.overflowY === "auto" || style.overflowY === "scroll" || style.overflowY === "overlay") {
      return parent;
    }
    parent = parent.parentElement;
  }
  return window;
}
function scrollTopOf(target) {
  return isWindow(target) ? window.scrollY : target.scrollTop;
}
function viewportBoundsOf(target) {
  if (isWindow(target)) {
    return { top: 0, bottom: window.innerHeight };
  }
  const rect = target.getBoundingClientRect();
  return {
    top: rect.top + target.clientTop,
    bottom: rect.top + target.clientTop + target.clientHeight
  };
}
function isSmart(el) {
  return el.getAttribute("data-sticky") === "smart";
}
function isVisible(el) {
  return el.getClientRects().length > 0;
}
function cssLengthToPx(value, el) {
  const raw = value.trim();
  if (!raw || raw === "0") return 0;
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed)) return 0;
  if (raw.endsWith("rem")) {
    const rootFont = Number.parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    return parsed * (Number.isFinite(rootFont) ? rootFont : 16);
  }
  if (raw.endsWith("em")) {
    const font = Number.parseFloat(window.getComputedStyle(el).fontSize);
    return parsed * (Number.isFinite(font) ? font : 16);
  }
  return parsed;
}
function cssVarPx(el, name) {
  return cssLengthToPx(window.getComputedStyle(el).getPropertyValue(name), el);
}
function effectiveTopOffsetPx(el, target) {
  const raw = cssVarPx(el, "--vds-sticky-offset-top");
  if (raw <= 0) return 0;
  if (isWindow(target)) return raw;
  return Math.max(0, raw - viewportBoundsOf(target).top);
}
function effectiveBottomOffsetPx(el, target) {
  const raw = cssVarPx(el, "--vds-sticky-offset-bottom");
  if (raw <= 0) return 0;
  if (isWindow(target)) return raw;
  const viewport = viewportBoundsOf(target);
  const distanceFromViewportBottom = Math.max(0, window.innerHeight - viewport.bottom);
  return Math.max(0, raw - distanceFromViewportBottom);
}
function useDataTableStickyStack(rootRef) {
  react.useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;
    const rootEl = root;
    const scrollTarget = findScrollAncestor(rootEl);
    const scrollNode = isWindow(scrollTarget) ? window : scrollTarget;
    let topBands = [];
    let bottomBands = [];
    let hasSmart = false;
    let observedBands = /* @__PURE__ */ new Set();
    let publishFrame = 0;
    let scrollFrame = 0;
    let lastScrollTop = scrollTopOf(scrollTarget);
    let lastDirection = "";
    function schedulePublish() {
      if (publishFrame) return;
      publishFrame = window.requestAnimationFrame(publishStack);
    }
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedulePublish);
    const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => {
      refreshBands();
      schedulePublish();
    });
    function clearBandVars(el) {
      el.style.removeProperty("--vds-sticky-top");
      el.style.removeProperty("--vds-sticky-bottom");
      el.style.removeProperty("--vds-sticky-effective-offset-top");
      el.style.removeProperty("--vds-sticky-effective-offset-bottom");
    }
    function refreshBands() {
      topBands = Array.from(
        rootEl.querySelectorAll(TOP_BAND_SELECTOR)
      );
      bottomBands = Array.from(
        rootEl.querySelectorAll(BOTTOM_BAND_SELECTOR)
      );
      hasSmart = topBands.some(isSmart) || bottomBands.some(isSmart);
      if (!resizeObserver) return;
      const next = /* @__PURE__ */ new Set([...topBands, ...bottomBands]);
      for (const el of observedBands) {
        if (!next.has(el)) {
          resizeObserver.unobserve(el);
          clearBandVars(el);
        }
      }
      for (const el of next) {
        if (!observedBands.has(el)) resizeObserver.observe(el);
      }
      observedBands = next;
    }
    function publishStack() {
      publishFrame = 0;
      if (rootEl.hasAttribute("data-resizing")) {
        return;
      }
      const scrollingDown = rootEl.hasAttribute("data-scrolling-down");
      publishSide(topBands, "top", scrollingDown);
      publishSide([...bottomBands].reverse(), "bottom", scrollingDown);
    }
    function publishSide(bands, axis, scrollingDown) {
      const varName = axis === "top" ? "--vds-sticky-top" : "--vds-sticky-bottom";
      const offsetVarName = axis === "top" ? "--vds-sticky-effective-offset-top" : "--vds-sticky-effective-offset-bottom";
      let stack = 0;
      for (const el of bands) {
        if (!isVisible(el)) {
          clearBandVars(el);
          continue;
        }
        const effectiveOffset = axis === "top" ? effectiveTopOffsetPx(el, scrollTarget) : effectiveBottomOffsetPx(el, scrollTarget);
        if (effectiveOffset > 0) {
          el.style.setProperty(offsetVarName, `${effectiveOffset}px`);
        } else {
          el.style.removeProperty(offsetVarName);
        }
        el.style.setProperty(varName, `${stack}px`);
        const hidden = scrollingDown && isSmart(el);
        if (!hidden) {
          stack += el.getBoundingClientRect().height;
        }
      }
    }
    function onScroll() {
      if (!hasSmart) return;
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(handleScrollFrame);
    }
    function handleScrollFrame() {
      scrollFrame = 0;
      detectDirection();
    }
    function detectDirection() {
      const st = scrollTopOf(scrollTarget);
      const delta = st - lastScrollTop;
      const rootRect = rootEl.getBoundingClientRect();
      const vp = viewportBoundsOf(scrollTarget);
      if (rootRect.top >= vp.top) {
        setDirection("");
        lastScrollTop = st;
        return;
      }
      if (rootRect.bottom <= vp.bottom + FOOTER_SAFE_ZONE) {
        setDirection("");
        lastScrollTop = st;
        return;
      }
      if (Math.abs(delta) < SMART_THRESHOLD) return;
      setDirection(delta > 0 ? "down" : "");
      lastScrollTop = st;
    }
    function setDirection(next) {
      if (next === lastDirection) return;
      lastDirection = next;
      if (next === "down") {
        rootEl.setAttribute("data-scrolling-down", "");
      } else {
        rootEl.removeAttribute("data-scrolling-down");
      }
      schedulePublish();
    }
    resizeObserver?.observe(rootEl);
    refreshBands();
    mutationObserver?.observe(rootEl, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        "data-sticky",
        "data-sticky-axis",
        "data-resizing",
        "class"
      ]
    });
    scrollNode.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedulePublish, { passive: true });
    schedulePublish();
    onScroll();
    return () => {
      scrollNode.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedulePublish);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
      if (publishFrame) window.cancelAnimationFrame(publishFrame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      for (const el of observedBands) clearBandVars(el);
      rootEl.removeAttribute("data-scrolling-down");
    };
  }, [rootRef]);
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
  stickyOffset,
  stickyBottomOffset,
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
          stickyOffset,
          stickyBottomOffset,
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
  stickyOffset,
  stickyBottomOffset,
  mode,
  virtualization,
  className,
  style,
  children,
  forwardedRef
}) {
  const rootRef = react.useRef(null);
  const { table, scrollRef } = useDataTableContext();
  const resizingId = table.getState().columnSizingInfo.isResizingColumn;
  const scrolledX = useHorizontalScrollShadow(scrollRef);
  useDataTableStickyStack(rootRef);
  useKeyboardGridNav(interactionMode === "grid", scrollRef);
  const announcement = useSrAnnouncements(table);
  const rootStyle = stickyOffset === void 0 && stickyBottomOffset === void 0 ? style : {
    ...stickyOffset !== void 0 ? { ["--vds-sticky-offset-top"]: stickyOffset } : null,
    ...stickyBottomOffset !== void 0 ? { ["--vds-sticky-offset-bottom"]: stickyBottomOffset } : null,
    ...style
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: composeRefs(rootRef, forwardedRef),
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
      style: rootStyle,
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
  stickyOffset,
  stickyBottomOffset,
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
      stickyOffset,
      stickyBottomOffset,
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
  stickyOffset,
  stickyBottomOffset,
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
      stickyOffset,
      stickyBottomOffset,
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
react.forwardRef(function DataTableRoot2(props, ref) {
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
react.forwardRef(
  function DataTableToolbar2({
    className,
    children,
    sticky = false,
    stickyOffset,
    style,
    ...props
  }, ref) {
    const { tableId } = useDataTableContext();
    const stickyStyle = stickyOffset === void 0 ? style : {
      ["--vds-sticky-offset-top"]: stickyOffset,
      ...style
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: "toolbar",
        "aria-controls": tableId,
        "data-sticky": stickyAttr(sticky),
        "data-sticky-axis": "top",
        className: utils.cn("vds-data-table-toolbar", className),
        style: stickyStyle,
        ...props,
        children
      }
    );
  }
);
function isDataTableTableElement(node) {
  return react.isValidElement(node) && node.type === DataTableTable;
}
function isDataTableHeaderElement(node) {
  return react.isValidElement(node) && node.type === DataTableHeader;
}
function splitTableForDetachedHeader(node) {
  const tableChildren = react.Children.toArray(node.props.children);
  const headerIndex = tableChildren.findIndex(isDataTableHeaderElement);
  if (headerIndex === -1) return null;
  const headerNode = tableChildren[headerIndex];
  const bodyChildren = tableChildren.filter((_, index) => index !== headerIndex);
  const railStyle = headerNode.props.stickyOffset === void 0 && headerNode.props.style === void 0 ? void 0 : {
    ...headerNode.props.stickyOffset !== void 0 ? { ["--vds-sticky-offset-top"]: headerNode.props.stickyOffset } : null,
    ...headerNode.props.style
  };
  return {
    bodyTable: react.cloneElement(node, {
      __vdsRenderMode: "body"
    }, bodyChildren),
    headerTable: react.cloneElement(
      node,
      {
        __vdsRenderMode: "header",
        className: utils.cn(node.props.className, "vds-data-table-sticky-header-table")
      },
      react.cloneElement(headerNode, {
        __vdsDetachedHeader: true
      })
    ),
    railStyle
  };
}
function DataTableColGroup() {
  const { table } = useDataTableContext();
  const leafColumns = table.getVisibleLeafColumns();
  return /* @__PURE__ */ jsxRuntime.jsx("colgroup", { className: "vds-data-table-colgroup", children: leafColumns.map((column) => /* @__PURE__ */ jsxRuntime.jsx(
    "col",
    {
      "data-column-id": column.id,
      style: { width: `var(--col-${column.id})` }
    },
    column.id
  )) });
}
react.forwardRef(function DataTableScrollArea2({ className, children, scrollDrag = true, ...props }, ref) {
  const { scrollRef, stickyHeader } = useDataTableContext();
  const headerScrollRef = react.useRef(null);
  useScrollDrag(scrollRef, scrollDrag);
  const childArray = react.Children.toArray(children);
  const tableIndex = childArray.findIndex(isDataTableTableElement);
  const detached = stickyHeader && tableIndex !== -1 ? splitTableForDetachedHeader(
    childArray[tableIndex]
  ) : null;
  const viewportChildren = detached && tableIndex !== -1 ? childArray.map(
    (child, index) => index === tableIndex ? detached.bodyTable : child
  ) : children;
  react.useEffect(() => {
    const viewport = scrollRef.current;
    const header = headerScrollRef.current;
    if (!detached || !viewport || !header) return;
    let syncingFromViewport = false;
    let syncingFromHeader = false;
    let releaseFrame = 0;
    const release = () => {
      releaseFrame = 0;
      syncingFromViewport = false;
      syncingFromHeader = false;
    };
    const syncGeometry = () => {
      if (viewport.clientWidth > 0) {
        header.style.inlineSize = `${viewport.clientWidth}px`;
      } else {
        header.style.removeProperty("inline-size");
      }
    };
    const syncHeader = () => {
      if (syncingFromHeader) return;
      syncingFromViewport = true;
      header.scrollLeft = viewport.scrollLeft;
      if (!releaseFrame) releaseFrame = window.requestAnimationFrame(release);
    };
    const syncViewport = () => {
      if (syncingFromViewport) return;
      syncingFromHeader = true;
      viewport.scrollLeft = header.scrollLeft;
      if (!releaseFrame) releaseFrame = window.requestAnimationFrame(release);
    };
    syncGeometry();
    syncHeader();
    viewport.addEventListener("scroll", syncHeader, { passive: true });
    header.addEventListener("scroll", syncViewport, { passive: true });
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => {
      syncGeometry();
      syncHeader();
    });
    resizeObserver?.observe(viewport);
    if (viewport.firstElementChild instanceof HTMLElement) {
      resizeObserver?.observe(viewport.firstElementChild);
    }
    if (header.firstElementChild instanceof HTMLElement) {
      resizeObserver?.observe(header.firstElementChild);
    }
    return () => {
      viewport.removeEventListener("scroll", syncHeader);
      header.removeEventListener("scroll", syncViewport);
      resizeObserver?.disconnect();
      if (releaseFrame) window.cancelAnimationFrame(releaseFrame);
      header.style.removeProperty("inline-size");
    };
  }, [detached, scrollRef]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-scroll-shell", children: [
    detached && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        "data-sticky": boolAttr(stickyHeader),
        "data-sticky-axis": "top",
        className: "vds-data-table-sticky-header-rail",
        style: detached.railStyle,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            ref: headerScrollRef,
            className: "vds-data-table-sticky-header-scroll",
            children: detached.headerTable
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: composeRefs(scrollRef, ref),
        "data-scroll-drag": scrollDrag ? "" : void 0,
        className: utils.cn("vds-data-table-scroll-area", className),
        ...props,
        children: viewportChildren
      }
    )
  ] });
});
var DataTableTable = react.forwardRef(
  function DataTableTable2({ className, style, children, __vdsRenderMode = "full", ...props }, ref) {
    const { table, interactionMode, tableId } = useDataTableContext();
    const sizeVars = react.useMemo(() => buildColumnSizeVars(table), [
      table,
      // Re-evaluate when any column size changes
      table.getState().columnSizing,
      table.getState().columnOrder,
      table.getState().columnVisibility
    ]);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "table",
      {
        ref,
        id: __vdsRenderMode === "header" ? void 0 : tableId,
        role: __vdsRenderMode === "header" ? void 0 : interactionMode === "grid" ? "grid" : void 0,
        className: utils.cn("vds-data-table-table", className),
        style: { ...sizeVars, ...style },
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(DataTableColGroup, {}),
          children
        ]
      }
    );
  }
);
var DataTableHeader = react.forwardRef(function DataTableHeader2({
  className,
  children,
  stickyOffset,
  style,
  __vdsDetachedHeader = false,
  ...props
}, ref) {
  const { table, stickyHeader } = useDataTableContext();
  const groups = table.getHeaderGroups();
  const stickyStyle = stickyOffset === void 0 ? style : {
    ["--vds-sticky-offset-top"]: stickyOffset,
    ...style
  };
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
      "data-sticky-axis": "top",
      "data-vds-detached-header": boolAttr(__vdsDetachedHeader),
      className: utils.cn("vds-data-table-header", className),
      style: stickyStyle,
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
  const headerSizeStyle = header.colSpan > 1 ? {
    inlineSize: `${header.getSize()}px`,
    minInlineSize: `${header.getSize()}px`
  } : {
    ["--col-size"]: `var(--col-${column.id})`
  };
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
        ...headerSizeStyle,
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
react.forwardRef(function DataTableBody2({ className, children, emptyMessage, ...props }, ref) {
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
react.forwardRef(function DataTableFooter2({ className, children, sticky = false, stickyOffset, style, ...props }, ref) {
  const { table } = useDataTableContext();
  const groups = table.getFooterGroups();
  const hasFooter = groups.some(
    (g) => g.headers.some((h) => h.column.columnDef.footer)
  );
  if (!hasFooter && !children) return null;
  const stickyStyle = stickyOffset === void 0 ? style : {
    ["--vds-sticky-offset-bottom"]: stickyOffset,
    ...style
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tfoot",
    {
      ref,
      role: "rowgroup",
      "data-sticky": stickyAttr(sticky),
      "data-sticky-axis": "bottom",
      className: utils.cn("vds-data-table-footer", className),
      style: stickyStyle,
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
  const footerSizeStyle = header.colSpan > 1 ? {
    inlineSize: `${header.getSize()}px`,
    minInlineSize: `${header.getSize()}px`
  } : {
    ["--col-size"]: `var(--col-${column.id})`
  };
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
        ...footerSizeStyle,
        ...pinOffsetStyle(column),
        ...style
      },
      ...props,
      children: header.isPlaceholder ? null : children ?? reactTable.flexRender(column.columnDef.footer, header.getContext())
    }
  );
});
react.forwardRef(
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
react.forwardRef(function DataTableLoadingOverlay2({ open = true, label = "Loading", className, children, ...props }, ref) {
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
react.forwardRef(function DataTableGlobalFilter2({
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
        e.stopPropagation();
      },
      onMouseDown: (e) => {
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
react.forwardRef(function DataTablePinColumnTrigger2({ column, side, className, children, onClick, ...props }, ref) {
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
react.forwardRef(function DataTableRowPinTrigger2({ row, side, className, children, onClick, ...props }, ref) {
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
var DataTableDraggableHeaderCell = react.forwardRef(function DataTableDraggableHeaderCell2({ header, className, dragHandle, style, children, ...props }, ref) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = sortable.useSortable({ id: header.column.id });
  const dragStyle = {
    transform: utilities.CSS.Translate.toString(transform),
    transition: "transform 150ms cubic-bezier(0,0,0.2,1)",
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 5 : void 0,
    position: isDragging ? "relative" : void 0
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    DataTableHeaderCell,
    {
      ref: (node) => {
        setNodeRef(node);
        if (typeof ref === "function") ref(node);
        else if (ref)
          ref.current = node;
      },
      header,
      className: utils.cn("vds-data-table-header-cell-draggable", className),
      "data-dragging": isDragging ? "" : void 0,
      style: { ...dragStyle, ...style },
      ...attributes,
      ...dragHandle ? {} : listeners,
      ...props,
      children: dragHandle ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { ...listeners, className: "vds-data-table-drag-handle", children: dragHandle }),
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
  const [columns, setColumns] = react.useState(external);
  const [search, setSearch] = react.useState("");
  react.useEffect(() => {
    if (open) setColumns(external);
  }, [open, external]);
  const filtered = react.useMemo(() => {
    if (!search.trim()) return columns;
    const q = search.toLowerCase();
    return columns.filter(
      (c) => c.label.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  }, [columns, search]);
  const sensors = core.useSensors(
    core.useSensor(core.PointerSensor, { activationConstraint: { distance: 4 } }),
    core.useSensor(core.KeyboardSensor, {
      coordinateGetter: sortable.sortableKeyboardCoordinates
    })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setColumns((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      if (oldIndex < 0 || newIndex < 0) return prev;
      const next = sortable.arrayMove(prev, oldIndex, newIndex);
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactDrawer.Drawer,
    {
      direction: side,
      open,
      onOpenChange,
      sizeMode: "fixed",
      size: "min(24rem, 95vw)",
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        reactDrawer.DrawerContent,
        {
          className: "vds-data-table-customize-drawer",
          "aria-label": title,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-customize-drawer-header", children: [
              /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerTitle, { children: title }),
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-data-table-customize-drawer-count", children: [
                visibleCount,
                " / ",
                columns.length,
                " shown"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerBody, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-data-table-customize-drawer-body", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                reactInput.Input,
                {
                  inputSize: "md",
                  type: "search",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  placeholder: "Search columns\u2026"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                core.DndContext,
                {
                  sensors,
                  collisionDetection: core.closestCenter,
                  onDragEnd: handleDragEnd,
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    sortable.SortableContext,
                    {
                      items: filtered.map((c) => c.id),
                      strategy: sortable.verticalListSortingStrategy,
                      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-data-table-customize-drawer-list", children: filtered.map((column) => /* @__PURE__ */ jsxRuntime.jsx(
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
              defaultColumns && /* @__PURE__ */ jsxRuntime.jsx(
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = sortable.useSortable({ id: column.id });
  const style = {
    transform: utilities.CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      "data-dragging": isDragging ? "" : void 0,
      className: utils.cn("vds-data-table-customize-item"),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            ...attributes,
            ...listeners,
            "aria-label": "Drag to reorder",
            className: "vds-data-table-customize-item-drag",
            children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconGripVertical, { size: 14, stroke: 1.75, "aria-hidden": true, focusable: false })
          }
        ),
        column.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-customize-item-icon", children: column.icon }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-data-table-customize-item-label", children: column.label }),
        /* @__PURE__ */ jsxRuntime.jsx(
          reactSwitch.Switch,
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

exports.DataTableCustomizeDrawer = DataTableCustomizeDrawer;
exports.DataTableDndProvider = DataTableDndProvider;
exports.DataTableDraggableHeaderCell = DataTableDraggableHeaderCell;
exports.useColumnDnd = useColumnDnd;
