"use client";
import { useDataTableContext, pinnedAttr, boolAttr, DataTableColumnVisibility, DataTableGlobalFilter, DataTableLoadingOverlay, DataTableEmpty, DataTableRowSelectCheckbox, DataTableSelectAllCheckbox, DataTableFooterCell, DataTableFooterRow, DataTableFooter, DataTableRowPinTrigger, DataTableRowExpandTrigger, DataTableGroupHeaderRow, DataTableCell, DataTableRow, DataTableBody, DataTablePinColumnTrigger, DataTableColumnGuide, DataTableResizeHandle, DataTableSortTrigger, DataTableHeaderCell, DataTableHeaderGroup, DataTableHeader, DataTableTable, DataTableScrollArea, DataTableToolbar, DataTableRoot } from './chunk-LRLNRHO3.js';
export { DataTableBody, DataTableCell, DataTableColumnGuide, DataTableColumnVisibility, DataTableEmpty, DataTableFooter, DataTableFooterCell, DataTableFooterRow, DataTableGlobalFilter, DataTableGroupHeaderRow, DataTableHeader, DataTableHeaderCell, DataTableHeaderGroup, DataTableLoadingOverlay, DataTablePinColumnTrigger, DataTableResizeHandle, DataTableRoot, DataTableRow, DataTableRowExpandTrigger, DataTableRowPinTrigger, DataTableRowSelectCheckbox, DataTableScrollArea, DataTableSelectAllCheckbox, DataTableSortTrigger, DataTableTable, DataTableToolbar, buildColumnSizeVars, columnVar, resolveUpdater, useAutoFitColumn, useColumnResize, useControllableState, useDataTable, useDataTableContext, useDataTableVirtualizer } from './chunk-LRLNRHO3.js';
import { forwardRef, useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { cn } from '@virtari-packages/utils';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '@virtari-packages/react-dropdown-menu';
import { IconFilter, IconRefresh, IconDownload, IconChevronDown, IconPlus, IconSettings, IconRotateClockwise2, IconEyeOff, IconTrash, IconX, IconSearch, IconDotsVertical, IconList, IconLayoutKanban, IconTable, IconDots, IconCheck, IconCopy, IconChevronLeft, IconFilterFilled } from '@virtari-packages/react-icons';
import { Avatar } from '@virtari-packages/react-avatar';
import { Badge } from '@virtari-packages/react-badge';
import { Input } from '@virtari-packages/react-input';
import { flexRender } from '@tanstack/react-table';
export { createColumnHelper, flexRender } from '@tanstack/react-table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from '@virtari-packages/react-drawer';
import { Switch } from '@virtari-packages/react-switch';
import { Popover, PopoverTrigger, PopoverContent } from '@virtari-packages/react-popover';

var DataTableBulkActions = forwardRef(function DataTableBulkActions2({
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "region",
      "aria-label": `Bulk actions, ${selectedCount} selected`,
      "data-sticky": sticky ? "" : void 0,
      className: cn("vds-data-table-bulk-actions", className),
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
  primary,
  secondary,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("vds-data-table-avatar-cell", className), children: [
    /* @__PURE__ */ jsx(Avatar, { src, alt: alt ?? fallback, fallback, size }),
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
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: cn(
            "vds-data-table-toolbar-button",
            "vds-data-table-filter-config-cancel"
          ),
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleAdd,
          disabled: !canAdd,
          "data-intent": "primary",
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
                  placeholder: "Search filters\u2026"
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
                  group.conditions.map((c) => /* @__PURE__ */ jsxs("span", { className: "vds-data-table-filter-drawer-chip", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      c.fieldLabel,
                      ": ",
                      String(c.value)
                    ] }),
                    /* @__PURE__ */ jsx(
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
                "button",
                {
                  type: "button",
                  onClick: () => onOpenChange(false),
                  className: "vds-data-table-toolbar-button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(
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
var PaginationRoot = forwardRef(
  function PaginationRoot2({ className, children, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      "nav",
      {
        ref,
        role: "navigation",
        "aria-label": "Pagination",
        className: cn("vds-data-table-pagination", className),
        ...props,
        children
      }
    );
  }
);
var PaginationInfo = forwardRef(
  function PaginationInfo2({ className, renderLabel, ...props }, ref) {
    const { table, rowCount, mode } = useDataTableContext();
    const pagination = table.getState().pagination;
    const total = mode === "server" ? rowCount ?? 0 : table.getFilteredRowModel().rows.length;
    const start = total === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
    const end = Math.min(
      total,
      (pagination.pageIndex + 1) * pagination.pageSize
    );
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("vds-data-table-pagination-info", className),
        ...props,
        children: renderLabel ? renderLabel({ start, end, total }) : `${start}\u2013${end} of ${total}`
      }
    );
  }
);
var PaginationPrev = forwardRef(function PaginationPrev2({ className, children = "Previous", onClick, ...props }, ref) {
  const { table } = useDataTableContext();
  const canPrev = table.getCanPreviousPage();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": "Previous page",
      disabled: !canPrev,
      className: cn("vds-data-table-pagination-button", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) table.previousPage();
      },
      ...props,
      children
    }
  );
});
var PaginationNext = forwardRef(function PaginationNext2({ className, children = "Next", onClick, ...props }, ref) {
  const { table } = useDataTableContext();
  const canNext = table.getCanNextPage();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": "Next page",
      disabled: !canNext,
      className: cn("vds-data-table-pagination-button", className),
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
  return /* @__PURE__ */ jsxs("label", { className: cn("vds-data-table-pagination-page-size", className), children: [
    /* @__PURE__ */ jsx("span", { className: "vds-data-table-pagination-page-size-label", children: label }),
    /* @__PURE__ */ jsx(
      "select",
      {
        className: "vds-data-table-pagination-page-size-select",
        value: pageSize,
        onChange: (e) => table.setPageSize(Number(e.target.value)),
        children: options.map((n) => /* @__PURE__ */ jsx("option", { value: n, children: n }, n))
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
  return /* @__PURE__ */ jsx("ul", { className: cn("vds-data-table-pagination-pages", className), children: items.map(
    (it, i) => typeof it === "number" ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
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
    ) }, `p-${it}`) : /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "vds-data-table-pagination-ellipsis", children: "\u2026" }) }, `e-${i}`)
  ) });
}
function PaginationDefault({
  className,
  pageSizeOptions,
  hidePageSize = false,
  hidePageNumbers = false
}) {
  return /* @__PURE__ */ jsxs(PaginationRoot, { className, children: [
    /* @__PURE__ */ jsx(PaginationInfo, {}),
    /* @__PURE__ */ jsxs("div", { className: "vds-data-table-pagination-controls", children: [
      !hidePageSize && /* @__PURE__ */ jsx(PaginationPageSize, { options: pageSizeOptions }),
      /* @__PURE__ */ jsx(PaginationPrev, {}),
      !hidePageNumbers && /* @__PURE__ */ jsx(PaginationPages, {}),
      /* @__PURE__ */ jsx(PaginationNext, {})
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
  return /* @__PURE__ */ jsx("span", { className: "vds-data-table-toolbar-button-icon", children });
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
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      type: "button",
      "data-intent": intent,
      "data-variant": variant,
      "data-size": size,
      "data-icon-only": iconOnly ? "" : void 0,
      className: cn("vds-data-table-toolbar-button", className),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx(Glyph, { children: icon }),
        showLabel && /* @__PURE__ */ jsx("span", { className: "vds-data-table-toolbar-button-label", children: children ?? label }),
        count !== void 0 && count !== 0 && /* @__PURE__ */ jsx("span", { className: "vds-data-table-toolbar-button-count", children: count }),
        trailingIcon && /* @__PURE__ */ jsx(Glyph, { children: trailingIcon })
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
  function DataTableExportButton2({ label = "Export", variant = "outline", ...props }, ref) {
    return /* @__PURE__ */ jsx(
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
forwardRef(
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
forwardRef(
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
forwardRef(function DataTableRowAction2({ size = "sm", variant = "ghost", ...props }, ref) {
  return /* @__PURE__ */ jsx(ToolbarActionButton, { ref, size, variant, ...props });
});
var DataTableSearchIcon = SearchIcon;
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
      "data-selected": boolAttr(selected),
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
      "data-selected": boolAttr(selected),
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
var DEFAULT_ICONS = {
  table: /* @__PURE__ */ jsx(IconTable, { size: 14, stroke: 1.5, "aria-hidden": true, focusable: false }),
  board: /* @__PURE__ */ jsx(IconLayoutKanban, { size: 14, stroke: 1.5, "aria-hidden": true, focusable: false }),
  list: /* @__PURE__ */ jsx(IconList, { size: 14, stroke: 1.5, "aria-hidden": true, focusable: false })
};
var DataTableViewModeToggle = forwardRef(function DataTableViewModeToggle2({ modes = DEFAULT_MODES, labels, icons, className, ...props }, ref) {
  const { viewMode, setViewMode } = useDataTableContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-label": "View mode",
      className: cn("vds-data-table-view-toggle", className),
      ...props,
      children: modes.map((m) => {
        const active = viewMode === m;
        return /* @__PURE__ */ jsxs(
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
              /* @__PURE__ */ jsx("span", { className: "vds-data-table-view-toggle-icon", children: icons?.[m] ?? DEFAULT_ICONS[m] }),
              /* @__PURE__ */ jsx("span", { className: "vds-data-table-view-toggle-label", children: labels?.[m] ?? DEFAULT_LABELS[m] })
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

export { ActionsCell, AvatarCell, BadgeCell, BulkActions, CellEditor, Cells, CopyableCell, DataTable, DataTableAddButton, DataTableBoard, DataTableBulkActions, DataTableBulkClear, DataTableBulkCount, DataTableCloseButton, DataTableCustomizeButton, DataTableDeleteButton, DataTableExportButton, DataTableFilterButton, DataTableFilterDrawer, DataTableHideColumnsButton, DataTableListView, DataTableRefreshButton, DataTableResetLayoutButton, DataTableSearchIcon, DataTableSelectAllAcrossPages, DataTableViewModeToggle, DataTableViews, DateCell, DateFilter, EditableCell, FilterConfigPanel, FilterPopover, Filters, LinkCell, NumberCell, NumberFilter, Pagination, PaginationDefault, PaginationInfo, PaginationNext, PaginationPageSize, PaginationPages, PaginationPrev, PaginationRoot, SelectFilter, StatusBadgeCell, TextCell, TextFilter, ToolbarActionButton, countConditions, useCellEdit, useColumnFilter };
