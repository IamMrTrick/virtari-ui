"use client";
import { useDataTableContext, stickyAttr, pinnedAttr, DataTableColumnVisibility, DataTableGlobalFilter, DataTableLoadingOverlay, DataTableEmpty, DataTableRowSelectCheckbox, DataTableSelectAllCheckbox, DataTableFooterCell, DataTableFooterRow, DataTableFooter, DataTableRowPinTrigger, DataTableRowExpandTrigger, DataTableGroupHeaderRow, DataTableCell, DataTableRow, DataTableBody, DataTablePinColumnTrigger, DataTableColumnGuide, DataTableResizeHandle, DataTableSortTrigger, DataTableHeaderCell, DataTableHeaderGroup, DataTableHeader, DataTableTable, DataTableScrollArea, DataTableToolbar, DataTableRoot } from './chunk-NMX6BR4M.js';
export { DataTableBody, DataTableCell, DataTableColumnGuide, DataTableColumnVisibility, DataTableEmpty, DataTableFooter, DataTableFooterCell, DataTableFooterRow, DataTableGlobalFilter, DataTableGroupHeaderRow, DataTableHeader, DataTableHeaderCell, DataTableHeaderGroup, DataTableLoadingOverlay, DataTablePinColumnTrigger, DataTableResizeHandle, DataTableRoot, DataTableRow, DataTableRowExpandTrigger, DataTableRowPinTrigger, DataTableRowSelectCheckbox, DataTableScrollArea, DataTableSelectAllCheckbox, DataTableSortTrigger, DataTableTable, DataTableToolbar, buildColumnSizeVars, columnVar, resolveUpdater, useAutoFitColumn, useColumnResize, useControllableState, useDataTable, useDataTableContext, useDataTableVirtualizer } from './chunk-NMX6BR4M.js';
import { forwardRef, useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { cn } from '@virtari-packages/utils';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '@virtari-packages/react-dropdown-menu';
import { IconPlus, IconFilter, IconRefresh, IconDownload, IconChevronDown, IconSettings, IconRotateClockwise2, IconEyeOff, IconTrash, IconX, IconSearch, IconDotsVertical, IconLayoutList, IconLayoutBoard, IconTable, IconDots, IconCheck, IconCopy, IconChevronLeft, IconFilterFilled } from '@virtari-packages/react-icons';
import { Avatar } from '@virtari-packages/react-avatar';
import { Badge } from '@virtari-packages/react-badge';
import { Input } from '@virtari-packages/react-input';
import { flexRender } from '@tanstack/react-table';
export { createColumnHelper, flexRender } from '@tanstack/react-table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from '@virtari-packages/react-drawer';
import { Button } from '@virtari-packages/react-button';
import { Chip, ChipIcon, ChipLabel, ChipRemove } from '@virtari-packages/react-chip';
import { Switch } from '@virtari-packages/react-switch';
import { Popover, PopoverTrigger, PopoverContent } from '@virtari-packages/react-popover';
import { Pagination } from '@virtari-packages/react-pagination';
import { Tabs, TabsList, TabsTrigger } from '@virtari-packages/react-tabs';

var DataTableBulkActions = forwardRef(function DataTableBulkActions2({
  children,
  showWhenAllAcrossPagesSelected = true,
  isAllAcrossPagesSelected = false,
  sticky = true,
  stickyOffset,
  className,
  style,
  ...props
}, ref) {
  const { table } = useDataTableContext();
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedCount = selectedRows.length;
  const shouldShow = selectedCount > 0 || showWhenAllAcrossPagesSelected && isAllAcrossPagesSelected;
  if (!shouldShow) return null;
  const clearSelection = () => table.resetRowSelection();
  const stickyStyle = stickyOffset === void 0 ? style : {
    ["--vds-sticky-offset-bottom"]: stickyOffset,
    ...style
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "region",
      "aria-label": `Bulk actions, ${selectedCount} selected`,
      "data-sticky": stickyAttr(sticky),
      "data-sticky-axis": "bottom",
      className: cn("vds-data-table-bulk-actions", className),
      style: stickyStyle,
      ...props,
      children: typeof children === "function" ? children({ selectedRows, selectedCount, clearSelection }) : children ?? /* @__PURE__ */ jsx(
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
var DataTableBulkCount = forwardRef(function DataTableBulkCount2({ count, label, className, ...props }, ref) {
  const { table } = useDataTableContext();
  const n = count ?? table.getSelectedRowModel().rows.length;
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cn("vds-data-table-bulk-count", className),
      ...props,
      children: label ? label(n) : `${n} selected`
    }
  );
});
var DataTableBulkClear = forwardRef(function DataTableBulkClear2({ children = "Clear", onClick, className, ...props }, ref) {
  const { table } = useDataTableContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) table.resetRowSelection();
      },
      className: cn("vds-data-table-bulk-clear", className),
      ...props,
      children
    }
  );
});
function DataTableBulkActionsDefault({
  selectedCount,
  clearSelection
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DataTableBulkCount, { count: selectedCount }),
    /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "status",
      "data-active": isAllAcrossPagesSelected ? "" : void 0,
      className: cn("vds-data-table-select-all-banner", className),
      children: isAllAcrossPagesSelected ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "All ",
          totalCount.toLocaleString(),
          " entries are selected."
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClear,
            className: "vds-data-table-select-all-link",
            children: "Clear selection"
          }
        )
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "All ",
          pageRowCount,
          " items on this page are selected."
        ] }),
        /* @__PURE__ */ jsxs(
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
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": "Row actions",
        className: cn("vds-data-table-actions-cell-trigger", className),
        children: trigger ?? /* @__PURE__ */ jsx(IconDots, { size: 14, stroke: 1.75, "aria-hidden": true, focusable: false })
      }
    ) }),
    /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", children: items.map((item, i) => /* @__PURE__ */ jsxs("div", { children: [
      item.separatorBefore && i > 0 && /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          disabled: item.disabled,
          onSelect: () => item.onSelect?.(),
          "data-tone": item.tone,
          children: [
            item.icon && /* @__PURE__ */ jsx("span", { className: "vds-data-table-actions-cell-item-icon", children: item.icon }),
            /* @__PURE__ */ jsx("span", { children: item.label })
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
  color = "auto",
  colorKey,
  primary,
  secondary,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("vds-data-table-avatar-cell", className), children: [
    /* @__PURE__ */ jsx(
      Avatar,
      {
        src,
        alt: alt ?? fallback,
        fallback,
        size,
        color,
        colorKey: colorKey ?? (typeof primary === "string" ? primary : fallback)
      }
    ),
    (primary || secondary) && /* @__PURE__ */ jsxs("div", { className: "vds-data-table-avatar-cell-text", children: [
      primary && /* @__PURE__ */ jsx("span", { className: "vds-data-table-avatar-cell-primary", children: primary }),
      secondary && /* @__PURE__ */ jsx("span", { className: "vds-data-table-avatar-cell-secondary", children: secondary })
    ] })
  ] });
}
function BadgeCell({ variant, children, className }) {
  return /* @__PURE__ */ jsx(Badge, { variant, className: cn("vds-data-table-badge-cell", className), children });
}
function StatusBadgeCell({
  tone,
  label,
  withDot = true,
  variant = "pill",
  className
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "data-tone": tone,
      "data-variant": variant,
      className: cn("vds-data-table-status-cell", className),
      children: [
        withDot && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "vds-data-table-status-cell-dot" }),
        /* @__PURE__ */ jsx("span", { children: label })
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
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    const text = copyText ?? extractText(children);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), feedbackMs);
    } catch {
    }
  }, [copyText, children, feedbackMs]);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "data-copied": copied ? "" : void 0,
      className: cn("vds-data-table-copyable-cell", className),
      children: [
        /* @__PURE__ */ jsx("span", { className: "vds-data-table-copyable-cell-content", children }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleCopy,
            "aria-label": copied ? "Copied" : "Copy to clipboard",
            className: "vds-data-table-copyable-cell-button",
            tabIndex: -1,
            children: copied ? /* @__PURE__ */ jsx(IconCheck, { size: 12, stroke: 2, "aria-hidden": true, focusable: false }) : /* @__PURE__ */ jsx(IconCopy, { size: 12, stroke: 1.75, "aria-hidden": true, focusable: false })
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
    return /* @__PURE__ */ jsx("span", { className: cn("vds-data-table-date-cell", className), children: "\u2014" });
  }
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) {
    return /* @__PURE__ */ jsx("span", { className: cn("vds-data-table-date-cell", className), children: "\u2014" });
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
  return /* @__PURE__ */ jsx(
    "time",
    {
      dateTime: d.toISOString(),
      title: d.toLocaleString(locale),
      className: cn("vds-data-table-date-cell", className),
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
  return /* @__PURE__ */ jsx(
    "a",
    {
      target: external ? "_blank" : target,
      rel: external ? "noopener noreferrer" : rel,
      className: cn("vds-data-table-link-cell", className),
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
    return /* @__PURE__ */ jsx(
      "span",
      {
        "data-align": align,
        className: cn("vds-data-table-number-cell", className),
        children: "\u2014"
      }
    );
  }
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) {
    return /* @__PURE__ */ jsx(
      "span",
      {
        "data-align": align,
        className: cn("vds-data-table-number-cell", className),
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
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-align": align,
      className: cn("vds-data-table-number-cell", className),
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
  return /* @__PURE__ */ jsx(
    "span",
    {
      title: truncate ? title : void 0,
      "data-weight": weight,
      "data-muted": muted ? "" : void 0,
      "data-truncate": truncate ? "" : void 0,
      className: cn("vds-data-table-text-cell", className),
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
var CellEditor = forwardRef(
  function CellEditor2({
    mode = "text",
    value,
    onValueChange,
    onCommit,
    onCancel,
    autoFocus = true,
    className
  }, ref) {
    const inputRef = useRef(null);
    useEffect(() => {
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
    return /* @__PURE__ */ jsx(
      Input,
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
        className: cn("vds-data-table-cell-editor", className)
      }
    );
  }
);
function useCellEdit(cell, options) {
  const ctx = useDataTableContext();
  const onCellEdit = ctx.onCellEdit;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(options.initialValue);
  const [isPending, setPending] = useState(false);
  const start = useCallback(() => {
    setValue(options.initialValue);
    setEditing(true);
  }, [options.initialValue]);
  const cancel = useCallback(() => {
    setEditing(false);
    setValue(options.initialValue);
  }, [options.initialValue]);
  const commit = useCallback(async () => {
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
var EditableCell = forwardRef(
  function EditableCell2({ cell, mode = "text", getValue, className, style, ...props }, ref) {
    const { interactionMode } = useDataTableContext();
    const column = cell.column;
    const pin = pinnedAttr(column);
    const initial = (getValue ?? (() => cell.getValue()))();
    const edit = useCellEdit(
      cell,
      { initialValue: initial }
    );
    return /* @__PURE__ */ jsx(
      "td",
      {
        ref,
        role: interactionMode === "grid" ? "gridcell" : "cell",
        "data-pinned": pin,
        "data-column-id": column.id,
        "data-editing": edit.editing ? "" : void 0,
        "aria-busy": edit.isPending || void 0,
        className: cn("vds-data-table-cell", "vds-data-table-cell-editable", className),
        style: {
          ["--col-size"]: `var(--col-${column.id})`,
          ...style
        },
        onDoubleClick: (e) => {
          e.preventDefault();
          if (!edit.editing) edit.start();
        },
        ...props,
        children: edit.editing ? /* @__PURE__ */ jsx(
          CellEditor,
          {
            mode,
            value: edit.value,
            onValueChange: edit.setValue,
            onCommit: () => void edit.commit(),
            onCancel: edit.cancel
          }
        ) : /* @__PURE__ */ jsx("span", { className: "vds-data-table-cell-content", children: flexRender(column.columnDef.cell, cell.getContext()) })
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
  const [comparison, setComparison] = useState(
    operators[0].value
  );
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
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
  return /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-config", children: [
    /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-config-row", children: [
      /* @__PURE__ */ jsx("label", { className: "vds-data-table-filter-config-label", children: "Operator" }),
      /* @__PURE__ */ jsx(
        "select",
        {
          value: comparison,
          onChange: (e) => setComparison(e.target.value),
          className: "vds-data-table-filter-config-select",
          children: operators.map((op) => /* @__PURE__ */ jsx("option", { value: op.value, children: op.label }, op.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-config-row", children: [
      /* @__PURE__ */ jsx("label", { className: "vds-data-table-filter-config-label", children: "Value" }),
      field.type === "select" ? /* @__PURE__ */ jsxs(
        "select",
        {
          value: String(value),
          onChange: (e) => setValue(e.target.value),
          className: "vds-data-table-filter-config-select",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "\u2014" }),
            (field.options ?? []).map((opt) => /* @__PURE__ */ jsx("option", { value: String(opt.value), children: opt.label }, String(opt.value)))
          ]
        }
      ) : field.type === "boolean" ? /* @__PURE__ */ jsxs(
        "select",
        {
          value,
          onChange: (e) => setValue(e.target.value),
          className: "vds-data-table-filter-config-select",
          children: [
            /* @__PURE__ */ jsx("option", { value: "true", children: "True" }),
            /* @__PURE__ */ jsx("option", { value: "false", children: "False" })
          ]
        }
      ) : /* @__PURE__ */ jsx(
        Input,
        {
          inputSize: "sm",
          type: field.type === "number" ? "number" : field.type === "date" ? "date" : "text",
          value,
          onChange: (e) => setValue(e.target.value),
          placeholder: field.placeholder
        }
      )
    ] }),
    comparison === "between" && /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-config-row", children: [
      /* @__PURE__ */ jsx("label", { className: "vds-data-table-filter-config-label", children: "And" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          inputSize: "sm",
          type: field.type === "number" ? "number" : field.type === "date" ? "date" : "text",
          value: value2,
          onChange: (e) => setValue2(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-config-actions", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onCancel,
          variant: "ghost",
          color: "contrast",
          size: "sm",
          className: cn(
            "vds-data-table-toolbar-button",
            "vds-data-table-filter-config-cancel"
          ),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleAdd,
          disabled: !canAdd,
          "data-intent": "primary",
          variant: "solid",
          color: "primary",
          size: "sm",
          className: cn("vds-data-table-toolbar-button"),
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
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState(externalGroups);
  const [configField, setConfigField] = useState(
    null
  );
  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setGroups(externalGroups);
      setSearchQuery("");
      setConfigField(null);
    }
    prevOpenRef.current = open;
  }, [open, externalGroups]);
  const filteredFields = useMemo(() => {
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
  return /* @__PURE__ */ jsx(
    Drawer,
    {
      direction: side,
      open,
      onOpenChange,
      sizeMode: "fixed",
      size: "min(26rem, 95vw)",
      children: /* @__PURE__ */ jsxs(
        DrawerContent,
        {
          className: "vds-data-table-filter-drawer",
          "aria-label": title,
          children: [
            /* @__PURE__ */ jsx(DrawerHeader, { children: /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-drawer-header", children: [
              configField && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setConfigField(null),
                  "aria-label": "Back",
                  className: "vds-data-table-filter-drawer-back",
                  children: /* @__PURE__ */ jsx(IconChevronLeft, { size: 14, stroke: 1.75, "aria-hidden": true, focusable: false })
                }
              ),
              /* @__PURE__ */ jsx(DrawerTitle, { children: configField ? configField.label : title }),
              !configField && activeCount > 0 && /* @__PURE__ */ jsx("span", { className: "vds-data-table-filter-drawer-count", children: activeCount })
            ] }) }),
            /* @__PURE__ */ jsx(DrawerBody, { children: !configField ? /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-drawer-body", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  inputSize: "md",
                  type: "search",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  placeholder: "Search filters..."
                }
              ),
              activeCount > 0 && /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-drawer-active", children: [
                /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-drawer-active-header", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Active (",
                    activeCount,
                    ")"
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleClear,
                      className: "vds-data-table-filter-drawer-clear",
                      children: "Clear all"
                    }
                  )
                ] }),
                groups.map((group, gi) => /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-drawer-group", children: [
                  gi > 0 && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleOperator(group.id),
                      className: "vds-data-table-filter-drawer-operator",
                      children: group.operator
                    }
                  ),
                  group.conditions.map((c) => /* @__PURE__ */ jsxs(
                    Chip,
                    {
                      size: "sm",
                      appearance: "outline",
                      variant: "primary",
                      className: "vds-data-table-filter-drawer-chip",
                      children: [
                        /* @__PURE__ */ jsxs(ChipLabel, { children: [
                          c.fieldLabel,
                          ": ",
                          String(c.value)
                        ] }),
                        /* @__PURE__ */ jsx(
                          ChipRemove,
                          {
                            onClick: () => removeCondition(group.id, c.id),
                            "aria-label": `Remove ${c.fieldLabel} filter`
                          }
                        )
                      ]
                    },
                    c.id
                  ))
                ] }, group.id))
              ] }),
              shown.length > 0 && /* @__PURE__ */ jsx(
                FilterSection,
                {
                  title: "Shown",
                  fields: shown,
                  hasActive,
                  onPick: setConfigField
                }
              ),
              popular.length > 0 && /* @__PURE__ */ jsx(
                FilterSection,
                {
                  title: "Popular",
                  fields: popular,
                  hasActive,
                  onPick: setConfigField
                }
              )
            ] }) : /* @__PURE__ */ jsx(
              FilterConfigPanel,
              {
                field: configField,
                onAdd: addCondition,
                onCancel: () => setConfigField(null)
              }
            ) }),
            !configField && /* @__PURE__ */ jsx(DrawerFooter, { children: /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-drawer-footer", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => onOpenChange(false),
                  variant: "ghost",
                  color: "contrast",
                  size: "sm",
                  className: "vds-data-table-toolbar-button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: handleApply,
                  disabled: activeCount === 0,
                  "data-intent": "primary",
                  variant: "solid",
                  color: "primary",
                  size: "sm",
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
  return /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-drawer-section", children: [
    /* @__PURE__ */ jsx("div", { className: "vds-data-table-filter-drawer-section-title", children: title }),
    /* @__PURE__ */ jsx("div", { className: "vds-data-table-filter-drawer-fields", children: fields.map((field) => /* @__PURE__ */ jsxs(
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
        className: cn("vds-data-table-filter-drawer-field"),
        "data-active": hasActive(field.id) ? "" : void 0,
        children: [
          /* @__PURE__ */ jsxs("span", { className: "vds-data-table-filter-drawer-field-left", children: [
            field.icon && /* @__PURE__ */ jsx("span", { children: field.icon }),
            /* @__PURE__ */ jsx("span", { children: field.label })
          ] }),
          /* @__PURE__ */ jsx(
            Switch,
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
  const setValue = useCallback(
    (next) => {
      column.setFilterValue(next);
    },
    [column]
  );
  const clear = useCallback(() => {
    column.setFilterValue(void 0);
  }, [column]);
  const isActive = value !== void 0 && value !== "" && !(Array.isArray(value) && value.length === 0);
  return useMemo(
    () => ({ value, setValue, clear, isActive }),
    [value, setValue, clear, isActive]
  );
}
var DateFilter = forwardRef(
  function DateFilter2({ column, mode = "range", className }, ref) {
    if (mode === "single") {
      return /* @__PURE__ */ jsx(DateFilterSingle, { column, className, ref });
    }
    return /* @__PURE__ */ jsx(DateFilterRange, { column, className, ref });
  }
);
var DateFilterSingle = forwardRef(
  function DateFilterSingle2({ column, className }, ref) {
    const { value, setValue } = useColumnFilter(column);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("vds-data-table-filter-date", className),
        role: "group",
        "aria-label": `Filter ${column.id} by date`,
        children: /* @__PURE__ */ jsx(
          Input,
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
var DateFilterRange = forwardRef(
  function DateFilterRange2({ column, className }, ref) {
    const { value, setValue } = useColumnFilter(column);
    const [from, to] = value ?? [void 0, void 0];
    const update = (f, t) => {
      if (!f && !t) setValue(void 0);
      else setValue([f, t]);
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("vds-data-table-filter-date", className),
        role: "group",
        "aria-label": `Filter ${column.id} by date range`,
        children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              inputSize: "sm",
              type: "date",
              "aria-label": "From",
              value: from ?? "",
              onChange: (e) => update(e.target.value || void 0, to)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "vds-data-table-filter-sep", "aria-hidden": "true", children: "\u2013" }),
          /* @__PURE__ */ jsx(
            Input,
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
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": `Filter ${column.id}`,
        "data-active": isActive ? "" : void 0,
        className: cn("vds-data-table-filter-trigger", className),
        children: trigger ?? (isActive ? /* @__PURE__ */ jsx(IconFilterFilled, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false }) : /* @__PURE__ */ jsx(IconFilter, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false }))
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { side, align: "start", sideOffset: 4, children: /* @__PURE__ */ jsxs("div", { className: "vds-data-table-filter-popover", children: [
      children,
      isActive && /* @__PURE__ */ jsx(
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
var NumberFilter = forwardRef(
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
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("vds-data-table-filter-number", className),
        role: "group",
        "aria-label": `Filter ${column.id} by number range`,
        children: [
          /* @__PURE__ */ jsx(
            Input,
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
          /* @__PURE__ */ jsx("span", { className: "vds-data-table-filter-sep", "aria-hidden": "true", children: "\u2013" }),
          /* @__PURE__ */ jsx(
            Input,
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
var SelectFilter = forwardRef(
  function SelectFilter2({
    column,
    options,
    multiple = false,
    placeholder = "All",
    className
  }, ref) {
    const { value, setValue } = useColumnFilter(column);
    const resolvedOptions = useMemo(() => {
      if (options) {
        return options.map(
          (o) => typeof o === "string" ? { value: o, label: o } : o
        );
      }
      const facet = column.getFacetedUniqueValues();
      return Array.from(facet.keys()).filter((k) => k != null && k !== "").map((k) => ({ value: String(k), label: String(k) }));
    }, [options, column]);
    return /* @__PURE__ */ jsxs(
      "select",
      {
        ref,
        multiple,
        value: multiple ? Array.isArray(value) ? value : [] : typeof value === "string" ? value : "",
        "aria-label": `Filter ${column.id}`,
        className: cn("vds-data-table-filter-select", className),
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
          !multiple && /* @__PURE__ */ jsx("option", { value: "", children: placeholder }),
          resolvedOptions.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label ?? opt.value }, opt.value))
        ]
      }
    );
  }
);
var TextFilter = forwardRef(
  function TextFilter2({ column, placeholder = "Filter\u2026", className }, ref) {
    const { value, setValue } = useColumnFilter(column);
    return /* @__PURE__ */ jsx(
      Input,
      {
        ref,
        inputSize: "sm",
        type: "text",
        "aria-label": `Filter ${column.id}`,
        placeholder,
        value: value ?? "",
        onChange: (e) => setValue(e.target.value === "" ? void 0 : e.target.value),
        className: cn("vds-data-table-filter-text", className)
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
function DataTablePagination({
  className,
  sticky = false,
  stickyOffset,
  pageSizeOptions,
  siblingCount,
  size,
  hidePageSize,
  hidePageNumbers,
  hideInfo,
  children
}) {
  const { table, rowCount, mode, size: tableSize } = useDataTableContext();
  const { pageIndex, pageSize } = table.getState().pagination;
  const total = mode === "server" ? rowCount ?? 0 : table.getFilteredRowModel().rows.length;
  const resolvedSize = size ?? tableSize;
  const style = stickyOffset === void 0 ? void 0 : {
    ["--vds-sticky-offset-bottom"]: stickyOffset
  };
  return /* @__PURE__ */ jsx(
    Pagination.Default,
    {
      page: pageIndex,
      pageSize,
      total,
      siblingCount,
      pageSizeOptions,
      size: resolvedSize,
      onPageChange: (p) => table.setPageIndex(p),
      onPageSizeChange: (s) => table.setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
        pageSize: s
      })),
      hidePageSize,
      hidePageNumbers,
      hideInfo,
      className: cn("vds-data-table-pagination", className),
      "data-sticky": stickyAttr(sticky),
      "data-sticky-axis": "bottom",
      style,
      children
    }
  );
}
var ToolbarActionButton = forwardRef(function ToolbarActionButton2({
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
  const color = intent === "danger" ? "danger" : intent === "primary" ? "primary" : "contrast";
  const labelNode = showLabel ? /* @__PURE__ */ jsx("span", { className: "vds-data-table-toolbar-button-label", children: children ?? label }) : null;
  const countNode = count !== void 0 && count !== 0 ? /* @__PURE__ */ jsx("span", { className: "vds-data-table-toolbar-button-count", children: count }) : null;
  if (iconOnly && icon && !labelNode && !countNode && !trailingIcon) {
    return /* @__PURE__ */ jsx(
      Button,
      {
        ref,
        type: "button",
        color,
        variant,
        size,
        "data-intent": intent,
        className,
        ...props,
        children: icon
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      type: "button",
      color,
      variant,
      size,
      "data-intent": intent,
      "data-mobile-icon-only": icon && showLabel ? "" : void 0,
      className,
      leftSection: icon,
      rightSection: trailingIcon,
      ...props,
      children: [
        labelNode,
        countNode
      ]
    }
  );
});
var TOOLBAR_ICON = { size: 14, stroke: 1.5, "aria-hidden": true, focusable: false };
var CHEVRON_ICON = { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false };
var SearchIcon = /* @__PURE__ */ jsx(IconSearch, { ...TOOLBAR_ICON });
var FilterIcon = /* @__PURE__ */ jsx(IconFilter, { ...TOOLBAR_ICON });
var RefreshIcon = /* @__PURE__ */ jsx(IconRefresh, { ...TOOLBAR_ICON });
var DownloadIcon = /* @__PURE__ */ jsx(IconDownload, { ...TOOLBAR_ICON });
var PlusIcon = /* @__PURE__ */ jsx(IconPlus, { ...TOOLBAR_ICON });
var SettingsIcon = /* @__PURE__ */ jsx(IconSettings, { ...TOOLBAR_ICON });
var RotateCcwIcon = /* @__PURE__ */ jsx(IconRotateClockwise2, { ...TOOLBAR_ICON });
var EyeOffIcon = /* @__PURE__ */ jsx(IconEyeOff, { ...TOOLBAR_ICON });
var TrashIcon = /* @__PURE__ */ jsx(IconTrash, { ...TOOLBAR_ICON });
var XIcon = /* @__PURE__ */ jsx(IconX, { ...TOOLBAR_ICON });
var MoreIcon = /* @__PURE__ */ jsx(IconDotsVertical, { ...TOOLBAR_ICON });
var ChevronDownIcon = /* @__PURE__ */ jsx(IconChevronDown, { ...CHEVRON_ICON });
var DataTableFilterButton = forwardRef(function DataTableFilterButton2({ label = "Filter", count, intent, ...props }, ref) {
  return /* @__PURE__ */ jsx(
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
var DataTableRefreshButton = forwardRef(
  function DataTableRefreshButton2({ label = "Refresh", ...props }, ref) {
    return /* @__PURE__ */ jsx(ToolbarActionButton, { ref, icon: RefreshIcon, label, ...props });
  }
);
var DataTableExportButton = forwardRef(
  function DataTableExportButton2({ label = "Export", variant = "soft", intent = "neutral", ...props }, ref) {
    return /* @__PURE__ */ jsx(
      ToolbarActionButton,
      {
        ref,
        icon: DownloadIcon,
        label,
        intent,
        variant,
        ...props
      }
    );
  }
);
var DataTableAddButton = forwardRef(function DataTableAddButton2({
  label = "Add",
  intent = "primary",
  variant = "solid",
  withChevron = false,
  trailingIcon,
  ...props
}, ref) {
  return /* @__PURE__ */ jsx(
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
var DataTableCustomizeButton = forwardRef(
  function DataTableCustomizeButton2({ label = "Customize", ...props }, ref) {
    return /* @__PURE__ */ jsx(ToolbarActionButton, { ref, icon: SettingsIcon, label, ...props });
  }
);
var DataTableResetLayoutButton = forwardRef(function DataTableResetLayoutButton2({ label = "Reset Layout", ...props }, ref) {
  return /* @__PURE__ */ jsx(ToolbarActionButton, { ref, icon: RotateCcwIcon, label, ...props });
});
var DataTableHideColumnsButton = forwardRef(function DataTableHideColumnsButton2({ label = "Hide", ...props }, ref) {
  return /* @__PURE__ */ jsx(ToolbarActionButton, { ref, icon: EyeOffIcon, label, ...props });
});
var DataTableDeleteButton = forwardRef(
  function DataTableDeleteButton2({ label = "Delete", intent = "danger", ...props }, ref) {
    return /* @__PURE__ */ jsx(
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
var DataTableCloseButton = forwardRef(
  function DataTableCloseButton2({ label, ...props }, ref) {
    return /* @__PURE__ */ jsx(
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
var DataTableSearchButton = forwardRef(
  function DataTableSearchButton2({ label = "Search", ...props }, ref) {
    return /* @__PURE__ */ jsx(
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
var DataTableMoreButton = forwardRef(
  function DataTableMoreButton2({ ...props }, ref) {
    return /* @__PURE__ */ jsx(
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
var DataTableRowAction = forwardRef(function DataTableRowAction2({ size = "sm", variant = "ghost", ...props }, ref) {
  return /* @__PURE__ */ jsx(ToolbarActionButton, { ref, size, variant, ...props });
});
var DataTableSearchIcon = SearchIcon;
function DataTableSearchField({
  value,
  defaultValue,
  onValueChange,
  debounceMs = 150,
  clearable = true,
  icon,
  inputSize = "md",
  className,
  wrapperClassName,
  placeholder = "Search",
  "aria-label": ariaLabel = "Search table",
  ...props
}) {
  const { table } = useDataTableContext();
  const tableValue = String(table.getState().globalFilter ?? "");
  const controlled = value !== void 0;
  const [local, setLocal] = useState(value ?? defaultValue ?? tableValue);
  useEffect(() => {
    if (controlled) setLocal(value ?? "");
  }, [controlled, value]);
  useEffect(() => {
    if (controlled) return;
    setLocal(tableValue);
  }, [tableValue]);
  useEffect(() => {
    const id = window.setTimeout(() => {
      table.setGlobalFilter(local);
      onValueChange?.(local);
    }, debounceMs);
    return () => window.clearTimeout(id);
  }, [local, debounceMs]);
  const clear = () => setLocal("");
  return /* @__PURE__ */ jsxs("div", { className: cn("vds-data-table-search-field", wrapperClassName), children: [
    /* @__PURE__ */ jsx("span", { className: "vds-data-table-search-field-icon", "aria-hidden": "true", children: icon ?? /* @__PURE__ */ jsx(IconSearch, { size: 14, stroke: 1.75, focusable: false }) }),
    /* @__PURE__ */ jsx(
      Input,
      {
        inputSize,
        type: "search",
        value: local,
        onChange: (event) => setLocal(event.target.value),
        placeholder,
        "aria-label": ariaLabel,
        className: cn("vds-data-table-search-field-input", className),
        ...props
      }
    ),
    clearable && local.length > 0 && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "vds-data-table-search-field-clear",
        "aria-label": "Clear search",
        onClick: clear,
        children: /* @__PURE__ */ jsx(IconX, { size: 12, stroke: 1.9, "aria-hidden": true, focusable: false })
      }
    )
  ] });
}
var DataTableFilterBar = forwardRef(function DataTableFilterBar2({
  filters,
  onFilterClick,
  onRemoveFilter,
  onAddFilter,
  addLabel = "Add filter",
  sticky = false,
  stickyOffset,
  className,
  children,
  style,
  ...props
}, ref) {
  const stickyStyle = stickyOffset === void 0 ? style : {
    ["--vds-sticky-offset-top"]: stickyOffset,
    ...style
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "toolbar",
      "aria-label": "Active filters",
      "data-sticky": stickyAttr(sticky),
      "data-sticky-axis": "top",
      className: cn("vds-data-table-filter-bar", className),
      style: stickyStyle,
      ...props,
      children: [
        children ?? filters?.map((filter) => /* @__PURE__ */ jsx(
          DataTableFilterChipItem,
          {
            filter,
            onClick: onFilterClick,
            onRemove: onRemoveFilter
          },
          filter.id
        )),
        onAddFilter && /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            color: "contrast",
            size: "xs",
            className: "vds-data-table-filter-add",
            onClick: onAddFilter,
            children: [
              /* @__PURE__ */ jsx(IconPlus, { size: 12, stroke: 1.75, "aria-hidden": true, focusable: false }),
              /* @__PURE__ */ jsx("span", { children: addLabel })
            ]
          }
        )
      ]
    }
  );
});
function DataTableFilterChipItem({
  filter,
  onClick,
  onRemove
}) {
  return /* @__PURE__ */ jsxs(
    Chip,
    {
      size: "sm",
      appearance: "outline",
      variant: filter.variant ?? "default",
      interactive: !filter.disabled,
      disabled: filter.disabled,
      role: "button",
      tabIndex: filter.disabled ? void 0 : 0,
      className: "vds-data-table-filter-chip",
      onClick: () => {
        if (!filter.disabled) onClick?.(filter);
      },
      onKeyDown: (event) => {
        if (filter.disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.(filter);
        }
      },
      children: [
        filter.icon && /* @__PURE__ */ jsx(ChipIcon, { children: filter.icon }),
        /* @__PURE__ */ jsx(ChipLabel, { className: "vds-data-table-filter-chip-label", children: filter.label }),
        filter.value !== void 0 && /* @__PURE__ */ jsx("span", { className: "vds-data-table-filter-chip-value", children: filter.value }),
        onRemove && /* @__PURE__ */ jsx(
          ChipRemove,
          {
            "aria-label": filter.removeLabel ?? `Remove ${String(filter.label)} filter`,
            onClick: (event) => {
              event.stopPropagation();
              onRemove(filter.id);
            }
          }
        )
      ]
    }
  );
}
var DataTableBoard = forwardRef(
  function DataTableBoard2({ className, renderCard, emptyMessage, skipColumns = [], ...props }, ref) {
    const { table } = useDataTableContext();
    const rows = table.getRowModel().rows;
    table.getVisibleLeafColumns().filter((c) => !skipColumns.includes(c.id));
    if (rows.length === 0 && emptyMessage) {
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          role: "status",
          className: cn("vds-data-table-board", "vds-data-table-board-empty", className),
          ...props,
          children: emptyMessage
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "list",
        className: cn("vds-data-table-board", className),
        ...props,
        children: rows.map(
          (row, i) => renderCard ? renderCard(row, i) : /* @__PURE__ */ jsx(DataTableBoardCard, { row, skipColumns }, row.id)
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
  return /* @__PURE__ */ jsx(
    "article",
    {
      role: "listitem",
      "data-row-id": row.id,
      "aria-selected": selected || void 0,
      className: "vds-data-table-board-card",
      children: columns.map((column) => {
        const cell = row.getVisibleCells().find((c) => c.column.id === column.id);
        if (!cell) return null;
        const headerDef = column.columnDef.header;
        const label = typeof headerDef === "string" ? headerDef : column.id;
        return /* @__PURE__ */ jsxs("div", { className: "vds-data-table-board-field", children: [
          /* @__PURE__ */ jsx("div", { className: "vds-data-table-board-label", children: label }),
          /* @__PURE__ */ jsx("div", { className: "vds-data-table-board-value", children: flexRender(column.columnDef.cell, cell.getContext()) })
        ] }, column.id);
      })
    }
  );
}
var DataTableListView = forwardRef(
  function DataTableListView2({ className, renderItem, emptyMessage, skipColumns = [], ...props }, ref) {
    const { table } = useDataTableContext();
    const rows = table.getRowModel().rows;
    if (rows.length === 0 && emptyMessage) {
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          role: "status",
          className: cn(
            "vds-data-table-list",
            "vds-data-table-list-empty",
            className
          ),
          ...props,
          children: emptyMessage
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "list",
        className: cn("vds-data-table-list", className),
        ...props,
        children: rows.map(
          (row, i) => renderItem ? renderItem(row, i) : /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "listitem",
      "data-row-id": row.id,
      "aria-selected": selected || void 0,
      className: "vds-data-table-list-item",
      children: [
        primary && primaryCell && /* @__PURE__ */ jsx("div", { className: "vds-data-table-list-primary", children: flexRender(primary.columnDef.cell, primaryCell.getContext()) }),
        rest.length > 0 && /* @__PURE__ */ jsx("div", { className: "vds-data-table-list-secondary", children: rest.map((column) => {
          const cell = row.getVisibleCells().find((c) => c.column.id === column.id);
          if (!cell) return null;
          return /* @__PURE__ */ jsx("span", { className: "vds-data-table-list-field", children: flexRender(column.columnDef.cell, cell.getContext()) }, column.id);
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
var DEFAULT_ICON_PROPS = {
  size: 14,
  stroke: 1.75,
  "aria-hidden": true,
  focusable: false
};
var DEFAULT_ICONS = {
  table: /* @__PURE__ */ jsx(IconTable, { ...DEFAULT_ICON_PROPS }),
  board: /* @__PURE__ */ jsx(IconLayoutBoard, { ...DEFAULT_ICON_PROPS }),
  list: /* @__PURE__ */ jsx(IconLayoutList, { ...DEFAULT_ICON_PROPS })
};
function iconForMode(icons, mode) {
  if (icons && Object.prototype.hasOwnProperty.call(icons, mode)) {
    return icons[mode];
  }
  return DEFAULT_ICONS[mode];
}
var DataTableViewModeToggle = forwardRef(function DataTableViewModeToggle2({
  modes = DEFAULT_MODES,
  labels,
  icons,
  variant = "segmented",
  size = "md",
  className,
  ...props
}, ref) {
  const { viewMode, setViewMode } = useDataTableContext();
  return /* @__PURE__ */ jsx(
    Tabs,
    {
      ref,
      value: viewMode,
      onValueChange: (value) => setViewMode(value),
      className: cn("vds-data-table-view-toggle", className),
      ...props,
      children: /* @__PURE__ */ jsx(
        TabsList,
        {
          variant,
          size,
          "aria-label": "View mode",
          children: modes.map((m) => {
            const icon = iconForMode(icons, m);
            return /* @__PURE__ */ jsxs(
              TabsTrigger,
              {
                value: m,
                "aria-label": `${DEFAULT_LABELS[m]} view`,
                children: [
                  icon ? /* @__PURE__ */ jsx("span", { className: "vds-data-table-view-toggle-icon", children: icon }) : null,
                  /* @__PURE__ */ jsx("span", { className: "vds-data-table-view-toggle-label", children: labels?.[m] ?? DEFAULT_LABELS[m] })
                ]
              },
              m
            );
          })
        }
      )
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
  if (children) return /* @__PURE__ */ jsx(Fragment, { children: children(viewMode) });
  if (viewMode === "table") return /* @__PURE__ */ jsx(Fragment, { children: table });
  if (viewMode === "board") {
    return /* @__PURE__ */ jsx(Fragment, { children: board ?? /* @__PURE__ */ jsx(
      DataTableBoard,
      {
        skipColumns,
        emptyMessage
      }
    ) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: list ?? /* @__PURE__ */ jsx(
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
  SearchButton: DataTableSearchButton,
  MoreButton: DataTableMoreButton,
  RowAction: DataTableRowAction,
  SearchField: DataTableSearchField,
  /* Global filter input (simple) */
  GlobalFilter: DataTableGlobalFilter,
  FilterBar: DataTableFilterBar,
  FilterChip: DataTableFilterChipItem,
  /* Column visibility list (simple) */
  ColumnVisibility: DataTableColumnVisibility,
  /* Compounds */
  Pagination: DataTablePagination,
  Filters,
  FilterDrawer: DataTableFilterDrawer,
  BulkActions,
  Cells
};
function readStorage(storageKey) {
  if (!storageKey || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeStorage(storageKey, state) {
  if (!storageKey || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
  }
}
function clearStorage(storageKey) {
  if (!storageKey || typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
  }
}
function useDataTablePreferences({
  value,
  defaultValue = {},
  onValueChange,
  adapter,
  storageKey,
  autoSave = true,
  debounceMs = 200
} = {}) {
  const controlled = value !== void 0;
  const initialRef = useRef(defaultValue);
  const [internal, setInternal] = useState(() => ({
    ...defaultValue,
    ...readStorage(storageKey) ?? {}
  }));
  const preferences = controlled ? value ?? {} : internal;
  const commit = useCallback(
    (next) => {
      if (!controlled) setInternal(next);
      onValueChange?.(next);
    },
    [controlled, onValueChange]
  );
  const updatePreferences = useCallback(
    (patch) => {
      commit({ ...preferences, ...patch });
    },
    [commit, preferences]
  );
  const resetPreferences = useCallback(() => {
    const next = initialRef.current;
    if (!controlled) setInternal(next);
    onValueChange?.(next);
    clearStorage(storageKey);
    void adapter?.clear?.();
  }, [adapter, controlled, onValueChange, storageKey]);
  useEffect(() => {
    let active = true;
    const loaded = adapter?.load?.();
    if (!loaded) return;
    Promise.resolve(loaded).then((next) => {
      if (!active || !next) return;
      commit({ ...initialRef.current, ...next });
    });
    return () => {
      active = false;
    };
  }, [adapter, commit]);
  useEffect(() => {
    if (!autoSave) return;
    const id = window.setTimeout(() => {
      writeStorage(storageKey, preferences);
      void adapter?.save?.(preferences);
    }, debounceMs);
    return () => window.clearTimeout(id);
  }, [adapter, autoSave, debounceMs, preferences, storageKey]);
  const statePairs = useMemo(
    () => ({
      viewMode: preferences.viewMode,
      onViewModeChange: (viewMode) => updatePreferences({ viewMode }),
      sorting: preferences.sorting,
      onSortingChange: (sorting) => updatePreferences({ sorting }),
      columnFilters: preferences.columnFilters,
      onColumnFiltersChange: (columnFilters) => updatePreferences({ columnFilters }),
      globalFilter: preferences.globalFilter,
      onGlobalFilterChange: (globalFilter) => updatePreferences({ globalFilter }),
      rowSelection: preferences.rowSelection,
      onRowSelectionChange: (rowSelection) => updatePreferences({ rowSelection }),
      columnSizing: preferences.columnSizing,
      onColumnSizingChange: (columnSizing) => updatePreferences({ columnSizing }),
      columnOrder: preferences.columnOrder,
      onColumnOrderChange: (columnOrder) => updatePreferences({ columnOrder }),
      columnPinning: preferences.columnPinning,
      onColumnPinningChange: (columnPinning) => updatePreferences({ columnPinning }),
      columnVisibility: preferences.columnVisibility,
      onColumnVisibilityChange: (columnVisibility) => updatePreferences({ columnVisibility }),
      pagination: preferences.pagination,
      onPaginationChange: (pagination) => updatePreferences({ pagination }),
      grouping: preferences.grouping,
      onGroupingChange: (grouping) => updatePreferences({ grouping }),
      expanded: preferences.expanded,
      onExpandedChange: (expanded) => updatePreferences({ expanded }),
      rowPinning: preferences.rowPinning,
      onRowPinningChange: (rowPinning) => updatePreferences({ rowPinning })
    }),
    [preferences, updatePreferences]
  );
  return {
    preferences,
    setPreferences: commit,
    updatePreferences,
    resetPreferences,
    statePairs
  };
}

export { ActionsCell, AvatarCell, BadgeCell, BulkActions, CellEditor, Cells, CopyableCell, DataTable, DataTableAddButton, DataTableBoard, DataTableBulkActions, DataTableBulkClear, DataTableBulkCount, DataTableCloseButton, DataTableCustomizeButton, DataTableDeleteButton, DataTableExportButton, DataTableFilterBar, DataTableFilterButton, DataTableFilterChipItem, DataTableFilterDrawer, DataTableHideColumnsButton, DataTableListView, DataTableMoreButton, DataTablePagination, DataTableRefreshButton, DataTableResetLayoutButton, DataTableRowAction, DataTableSearchButton, DataTableSearchField, DataTableSearchIcon, DataTableSelectAllAcrossPages, DataTableViewModeToggle, DataTableViews, DateCell, DateFilter, EditableCell, FilterConfigPanel, FilterPopover, Filters, LinkCell, NumberCell, NumberFilter, SelectFilter, StatusBadgeCell, TextCell, TextFilter, ToolbarActionButton, countConditions, useCellEdit, useColumnFilter, useDataTablePreferences };
