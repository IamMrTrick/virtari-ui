'use strict';

var utils = require('@virtari/utils');
var SelectPrimitive = require('@radix-ui/react-select');
var jsxRuntime = require('react/jsx-runtime');
var PopoverPrimitive = require('@radix-ui/react-popover');
var reactChip = require('@virtari/react-chip');
var react = require('react');
var reactVirtual = require('@tanstack/react-virtual');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespace(SelectPrimitive);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);

// src/Select.tsx
var Select = SelectPrimitive__namespace.Root;
var SelectGroup = SelectPrimitive__namespace.Group;
var SelectValue = SelectPrimitive__namespace.Value;
function SelectTrigger({
  size = "md",
  appearance = "soft",
  invalid,
  loading,
  clearable,
  onClear,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Trigger,
    {
      ref,
      className: utils.cn("vds-select-trigger", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": invalid ? "true" : void 0,
      "data-loading": loading ? "true" : void 0,
      "aria-invalid": invalid || void 0,
      "aria-busy": loading || void 0,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-select-trigger-value", children }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-select-trigger-actions", children: [
          clearable ? /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              className: "vds-select-clear",
              "aria-label": "Clear selection",
              onPointerDown: (e) => e.preventDefault(),
              onClick: (e) => {
                e.stopPropagation();
                onClear?.();
              },
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "svg",
                {
                  viewBox: "0 0 12 12",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    "path",
                    {
                      d: "M9 3L3 9M3 3L9 9",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                }
              )
            }
          ) : null,
          loading ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-select-spinner", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntime.jsx(
            "circle",
            {
              cx: "12",
              cy: "12",
              r: "9",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              strokeDasharray: "40 60",
              opacity: "0.9"
            }
          ) }) }) : /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Icon, { className: "vds-select-icon", children: /* @__PURE__ */ jsxRuntime.jsx(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "path",
                {
                  d: "M3 4.5L6 7.5L9 4.5",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ) })
        ] })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  size = "md",
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Content,
    {
      ref,
      className: utils.cn("vds-select-content", className),
      "data-size": size,
      position,
      sideOffset: 4,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Viewport, { className: "vds-select-viewport", children })
    }
  ) });
}
function SelectItem({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Item,
    {
      ref,
      className: utils.cn("vds-select-item", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemText, { children }),
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemIndicator, { className: "vds-select-item-indicator", children: /* @__PURE__ */ jsxRuntime.jsx(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "path",
              {
                d: "M10 3L4.5 8.5L2 6",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ) })
      ]
    }
  );
}
function SelectLabel({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Label,
    {
      ref,
      className: utils.cn("vds-select-label", className),
      ...props
    }
  );
}
function SelectSeparator({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Separator,
    {
      ref,
      className: utils.cn("vds-select-separator", className),
      ...props
    }
  );
}
function SelectEmpty({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      role: "presentation",
      className: utils.cn("vds-select-empty", className),
      ...props,
      children
    }
  );
}
var ComboboxContext = react.createContext(null);
function useComboboxContext() {
  const ctx = react.useContext(ComboboxContext);
  if (!ctx) {
    throw new Error(
      "Combobox sub-components must be used inside <Combobox>."
    );
  }
  return ctx;
}
var ComboboxProvider = ComboboxContext.Provider;
var defaultFilter = (item, query) => {
  if (!query) return true;
  return item.label.toLowerCase().includes(query.toLowerCase());
};
function useCombobox(props) {
  const {
    items,
    value: controlledValue,
    defaultValue,
    onValueChange,
    multiple = false,
    searchable = true,
    disabled = false,
    invalid = false,
    loading = false,
    virtualized = false,
    emptyMessage = "No results",
    filter,
    onSearchChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange
  } = props;
  const externalSearch = typeof onSearchChange === "function";
  const [uncontrolledValue, setUncontrolledValue] = react.useState(
    () => defaultValue ?? (multiple ? [] : "")
  );
  const value = controlledValue !== void 0 ? controlledValue : uncontrolledValue;
  const commitValue = react.useCallback(
    (next) => {
      if (controlledValue === void 0) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [controlledValue, onValueChange]
  );
  const [uncontrolledOpen, setUncontrolledOpen] = react.useState(defaultOpen);
  const open = controlledOpen !== void 0 ? controlledOpen : uncontrolledOpen;
  const setOpen = react.useCallback(
    (next) => {
      if (controlledOpen === void 0) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange]
  );
  const [searchQuery, setSearchQuery] = react.useState("");
  react.useEffect(() => {
    if (externalSearch) onSearchChange?.(searchQuery);
  }, [searchQuery, externalSearch, onSearchChange]);
  const filteredItems = react.useMemo(() => {
    if (externalSearch || !searchable || !searchQuery) return items;
    const fn = filter ?? defaultFilter;
    return items.filter((it) => fn(it, searchQuery));
  }, [items, searchQuery, searchable, externalSearch, filter]);
  const valueArr = react.useMemo(
    () => Array.isArray(value) ? value : value ? [value] : [],
    [value]
  );
  const isSelected = react.useCallback((v) => valueArr.includes(v), [valueArr]);
  const toggleValue = react.useCallback(
    (v) => {
      if (multiple) {
        const next = valueArr.includes(v) ? valueArr.filter((x) => x !== v) : [...valueArr, v];
        commitValue(next);
      } else {
        commitValue(v);
        setOpen(false);
        setSearchQuery("");
      }
    },
    [multiple, valueArr, commitValue, setOpen]
  );
  const removeValue = react.useCallback(
    (v) => {
      if (multiple) {
        commitValue(valueArr.filter((x) => x !== v));
      } else if (value === v) {
        commitValue("");
      }
    },
    [multiple, valueArr, commitValue, value]
  );
  const clearValue = react.useCallback(() => {
    commitValue(multiple ? [] : "");
  }, [commitValue, multiple]);
  const selectedItems = react.useMemo(
    () => valueArr.map((v) => items.find((it) => it.value === v)).filter(Boolean),
    [valueArr, items]
  );
  const [highlightedIndex, setHighlightedIndex] = react.useState(0);
  react.useEffect(() => {
    setHighlightedIndex((i) => {
      if (filteredItems.length === 0) return -1;
      if (i < 0 || i >= filteredItems.length) return 0;
      return i;
    });
  }, [filteredItems.length]);
  react.useEffect(() => {
    if (!open) return;
    if (filteredItems.length === 0) {
      setHighlightedIndex(-1);
      return;
    }
    const firstSelected = filteredItems.findIndex((it) => valueArr.includes(it.value));
    setHighlightedIndex(firstSelected >= 0 ? firstSelected : 0);
  }, [open]);
  const moveHighlight = react.useCallback(
    (delta) => {
      if (filteredItems.length === 0) return;
      setHighlightedIndex((current) => {
        const count = filteredItems.length;
        if (delta === "start") return firstEnabled(filteredItems, 0, 1);
        if (delta === "end") return firstEnabled(filteredItems, count - 1, -1);
        const dir = delta > 0 ? 1 : -1;
        let next = current;
        for (let i = 0; i < count; i += 1) {
          next = (next + dir + count) % count;
          if (!filteredItems[next]?.disabled) return next;
        }
        return current;
      });
    },
    [filteredItems]
  );
  const commitHighlighted = react.useCallback(() => {
    const item = filteredItems[highlightedIndex];
    if (!item || item.disabled) return;
    toggleValue(item.value);
  }, [filteredItems, highlightedIndex, toggleValue]);
  const handleInputKeyDown = react.useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) setOpen(true);
          moveHighlight(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) setOpen(true);
          moveHighlight(-1);
          break;
        case "Home":
          e.preventDefault();
          moveHighlight("start");
          break;
        case "End":
          e.preventDefault();
          moveHighlight("end");
          break;
        case "Enter":
          if (open) {
            e.preventDefault();
            commitHighlighted();
          }
          break;
        case "Escape":
          if (searchQuery) {
            e.preventDefault();
            setSearchQuery("");
          } else if (open) {
            e.preventDefault();
            setOpen(false);
          }
          break;
        case "Backspace":
          if (multiple && !searchQuery && valueArr.length > 0) {
            e.preventDefault();
            removeValue(valueArr[valueArr.length - 1]);
          }
          break;
        case "Tab":
          if (open) setOpen(false);
          break;
      }
    },
    [
      open,
      setOpen,
      moveHighlight,
      commitHighlighted,
      searchQuery,
      multiple,
      valueArr,
      removeValue
    ]
  );
  const inputRef = react.useRef(null);
  const triggerRef = react.useRef(null);
  const baseId = react.useId();
  const listId = `${baseId}-list`;
  const inputId = `${baseId}-input`;
  const getItemId = react.useCallback(
    (index) => `${baseId}-item-${index}`,
    [baseId]
  );
  return {
    multiple,
    searchable,
    disabled,
    invalid,
    loading,
    virtualized,
    emptyMessage,
    filteredItems,
    selectedItems,
    value,
    isSelected,
    toggleValue,
    removeValue,
    clearValue,
    searchQuery,
    setSearchQuery,
    externalSearch,
    open,
    setOpen,
    highlightedIndex,
    setHighlightedIndex,
    moveHighlight,
    commitHighlighted,
    inputRef,
    triggerRef,
    listId,
    inputId,
    getItemId,
    handleInputKeyDown
  };
}
function firstEnabled(items, from, dir) {
  const count = items.length;
  let i = from;
  for (let step = 0; step < count; step += 1) {
    if (!items[i]?.disabled) return i;
    i = (i + dir + count) % count;
  }
  return from;
}
function useComboboxVirtualizer({
  count,
  scrollRef,
  estimateSize = 36,
  overscan = 8
}) {
  return reactVirtual.useVirtualizer({
    count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateSize,
    overscan
  });
}
var ComboboxVisualContext = react.createContext({ size: "md", appearance: "soft" });
var useComboboxVisual = () => react.useContext(ComboboxVisualContext);
function Combobox({
  size = "md",
  appearance = "soft",
  children,
  ...hookProps
}) {
  const ctx = useCombobox(hookProps);
  return /* @__PURE__ */ jsxRuntime.jsx(ComboboxProvider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsx(ComboboxVisualContext.Provider, { value: { size, appearance }, children: /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Root, { open: ctx.open, onOpenChange: ctx.setOpen, children }) }) });
}
function ComboboxTrigger({
  placeholder = "Select\u2026",
  clearable,
  renderValue,
  className,
  onClick,
  onKeyDown,
  ref,
  ...props
}) {
  const {
    multiple,
    disabled,
    invalid,
    loading,
    open,
    setOpen,
    value,
    selectedItems,
    removeValue,
    clearValue,
    listId,
    triggerRef,
    inputRef
  } = useComboboxContext();
  const { size, appearance } = useComboboxVisual();
  const hasValue = multiple ? value.length > 0 : Boolean(value);
  const setRef = react.useCallback(
    (el) => {
      triggerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref, triggerRef]
  );
  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
    if (e.defaultPrevented) return;
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };
  const handleKeyDown = (e) => {
    if (disabled) return;
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };
  const chipSize = size === "sm" || size === "xs" || size === "2xs" ? "sm" : "md";
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: setRef,
      role: "combobox",
      tabIndex: disabled ? -1 : 0,
      "aria-haspopup": "listbox",
      "aria-expanded": open,
      "aria-controls": listId,
      "aria-disabled": disabled || void 0,
      "aria-invalid": invalid || void 0,
      "aria-busy": loading || void 0,
      className: utils.cn("vds-combobox-trigger", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-state": open ? "open" : "closed",
      "data-disabled": disabled ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      "data-loading": loading ? "true" : void 0,
      "data-placeholder": !hasValue ? "" : void 0,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-combobox-trigger-value", children: multiple ? selectedItems.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-combobox-trigger-placeholder", children: placeholder }) : selectedItems.map((item) => /* @__PURE__ */ jsxRuntime.jsxs(reactChip.Chip, { size: chipSize, appearance: "soft", children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactChip.ChipLabel, { children: item.label }),
          /* @__PURE__ */ jsxRuntime.jsx(
            reactChip.ChipRemove,
            {
              tabIndex: -1,
              "aria-label": `Remove ${item.label}`,
              onPointerDown: (e) => e.preventDefault(),
              onClick: (e) => {
                e.stopPropagation();
                removeValue(item.value);
              }
            }
          )
        ] }, item.value)) : selectedItems[0] ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-combobox-trigger-label", children: renderValue ? renderValue(selectedItems[0]) : selectedItems[0].label }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-combobox-trigger-placeholder", children: placeholder }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-combobox-trigger-actions", children: [
          clearable && hasValue && !disabled ? /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              className: "vds-combobox-clear",
              "aria-label": "Clear selection",
              onPointerDown: (e) => e.preventDefault(),
              onClick: (e) => {
                e.stopPropagation();
                clearValue();
              },
              children: /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx(
                "path",
                {
                  d: "M9 3L3 9M3 3L9 9",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              ) })
            }
          ) : null,
          loading ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-combobox-spinner", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsxRuntime.jsx(
            "circle",
            {
              cx: "12",
              cy: "12",
              r: "9",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              strokeDasharray: "40 60",
              opacity: "0.9"
            }
          ) }) }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-combobox-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsxRuntime.jsx(
                "path",
                {
                  d: "M3 4.5L6 7.5L9 4.5",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ) })
        ] })
      ]
    }
  ) });
}
function ComboboxContent({
  className,
  sideOffset = 4,
  align = "start",
  children,
  onOpenAutoFocus,
  onCloseAutoFocus,
  ref,
  ...props
}) {
  const { size } = useComboboxVisual();
  const { inputRef, triggerRef, searchable } = useComboboxContext();
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    PopoverPrimitive__namespace.Content,
    {
      ref,
      sideOffset,
      align,
      className: utils.cn("vds-combobox-content", className),
      "data-size": size,
      onOpenAutoFocus: (e) => {
        onOpenAutoFocus?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        if (searchable) inputRef.current?.focus();
      },
      onCloseAutoFocus: (e) => {
        onCloseAutoFocus?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        triggerRef.current?.focus();
      },
      ...props,
      children
    }
  ) });
}
function ComboboxInput({
  className,
  placeholder = "Search\u2026",
  onKeyDown,
  ref,
  ...props
}) {
  const {
    inputRef,
    inputId,
    listId,
    searchQuery,
    setSearchQuery,
    handleInputKeyDown,
    highlightedIndex,
    getItemId,
    searchable,
    filteredItems
  } = useComboboxContext();
  const setRef = react.useCallback(
    (el) => {
      inputRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref, inputRef]
  );
  if (!searchable) return null;
  const activeId = highlightedIndex >= 0 && highlightedIndex < filteredItems.length ? getItemId(highlightedIndex) : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-combobox-input-wrap", children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-combobox-input-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsxs("svg", { viewBox: "0 0 16 16", fill: "none", children: [
      /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "7", cy: "7", r: "5", stroke: "currentColor", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "path",
        {
          d: "M14 14L11 11",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref: setRef,
        id: inputId,
        type: "text",
        "aria-autocomplete": "list",
        "aria-controls": listId,
        "aria-activedescendant": activeId,
        autoComplete: "off",
        spellCheck: false,
        className: utils.cn("vds-combobox-input", className),
        placeholder,
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        onKeyDown: (e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          handleInputKeyDown(e);
        },
        ...props
      }
    )
  ] });
}
function ComboboxList({ className, children, ref, ...props }) {
  const { listId } = useComboboxContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      id: listId,
      role: "listbox",
      className: utils.cn("vds-combobox-list", className),
      ...props,
      children
    }
  );
}
function ComboboxOptions({
  children,
  estimateSize = 36,
  maxHeight = 280
}) {
  const { filteredItems, virtualized, loading } = useComboboxContext();
  if (loading || filteredItems.length === 0) return null;
  if (virtualized) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      VirtualOptions,
      {
        items: filteredItems,
        estimateSize,
        maxHeight,
        renderItem: children
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: "vds-combobox-options",
      style: { maxBlockSize: maxHeight, overflowY: "auto" },
      children: filteredItems.map((item, index) => children(item, index))
    }
  );
}
function VirtualOptions({
  items,
  estimateSize,
  maxHeight,
  renderItem
}) {
  const scrollRef = react.useRef(null);
  const virtualizer = useComboboxVirtualizer({
    count: items.length,
    scrollRef,
    estimateSize,
    overscan: 8
  });
  const { highlightedIndex } = useComboboxContext();
  react.useEffect(() => {
    if (highlightedIndex < 0) return;
    virtualizer.scrollToIndex(highlightedIndex, { align: "auto" });
  }, [highlightedIndex, virtualizer]);
  const totalSize = virtualizer.getTotalSize();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: scrollRef,
      className: "vds-combobox-options",
      style: { maxBlockSize: maxHeight, overflowY: "auto", position: "relative" },
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { style: { blockSize: totalSize, position: "relative" }, children: virtualizer.getVirtualItems().map((v) => {
        const item = items[v.index];
        return /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            "data-virtual-row": true,
            style: {
              position: "absolute",
              insetInlineStart: 0,
              insetInlineEnd: 0,
              transform: `translateY(${v.start}px)`
            },
            children: renderItem(item, v.index)
          },
          item.value
        );
      }) })
    }
  );
}
function ComboboxItem({
  value,
  disabled,
  className,
  children,
  onSelect,
  onClick,
  onMouseMove,
  ref,
  ...props
}) {
  const {
    filteredItems,
    highlightedIndex,
    setHighlightedIndex,
    isSelected,
    toggleValue,
    getItemId
  } = useComboboxContext();
  const index = react.useMemo(
    () => filteredItems.findIndex((it) => it.value === value),
    [filteredItems, value]
  );
  const highlighted = index >= 0 && index === highlightedIndex;
  const selected = isSelected(value);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      id: index >= 0 ? getItemId(index) : void 0,
      role: "option",
      "aria-selected": selected,
      "aria-disabled": disabled || void 0,
      className: utils.cn("vds-combobox-item", className),
      "data-highlighted": highlighted ? "true" : void 0,
      "data-selected": selected ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      onPointerDown: (e) => e.preventDefault(),
      onMouseMove: (e) => {
        onMouseMove?.(e);
        if (disabled || index < 0) return;
        if (highlightedIndex !== index) setHighlightedIndex(index);
      },
      onClick: (e) => {
        onClick?.(e);
        if (e.defaultPrevented || disabled) return;
        toggleValue(value);
        onSelect?.(value);
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-combobox-item-label", children }),
        selected ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-combobox-item-indicator", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "path",
              {
                d: "M10 3L4.5 8.5L2 6",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ) }) : null
      ]
    }
  );
}
function ComboboxGroup({
  heading,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      role: "group",
      className: utils.cn("vds-combobox-group", className),
      ...props,
      children: [
        heading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-combobox-group-heading", children: heading }) : null,
        children
      ]
    }
  );
}
function ComboboxEmpty({
  className,
  children,
  ref,
  ...props
}) {
  const { filteredItems, loading, emptyMessage } = useComboboxContext();
  if (loading || filteredItems.length > 0) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      role: "presentation",
      className: utils.cn("vds-combobox-empty", className),
      ...props,
      children: children ?? emptyMessage
    }
  );
}
function ComboboxLoading({
  className,
  children,
  ref,
  ...props
}) {
  const { loading } = useComboboxContext();
  if (!loading) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      role: "status",
      "aria-live": "polite",
      className: utils.cn("vds-combobox-loading", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-combobox-loading-spinner", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsxRuntime.jsx(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "9",
            stroke: "currentColor",
            strokeWidth: "2.5",
            strokeLinecap: "round",
            strokeDasharray: "40 60",
            opacity: "0.9"
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: children ?? "Loading\u2026" })
      ]
    }
  );
}
function ComboboxSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      role: "separator",
      className: utils.cn("vds-combobox-separator", className),
      ...props
    }
  );
}

exports.Combobox = Combobox;
exports.ComboboxContent = ComboboxContent;
exports.ComboboxEmpty = ComboboxEmpty;
exports.ComboboxGroup = ComboboxGroup;
exports.ComboboxInput = ComboboxInput;
exports.ComboboxItem = ComboboxItem;
exports.ComboboxList = ComboboxList;
exports.ComboboxLoading = ComboboxLoading;
exports.ComboboxOptions = ComboboxOptions;
exports.ComboboxSeparator = ComboboxSeparator;
exports.ComboboxTrigger = ComboboxTrigger;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectEmpty = SelectEmpty;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
