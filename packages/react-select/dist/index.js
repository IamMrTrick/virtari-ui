"use client";
import { cn } from '@virtari-packages/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import { IconX, IconLoader2, IconChevronDown, IconCheck } from '@virtari-packages/react-icons';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Chip, ChipLabel, ChipRemove } from '@virtari-packages/react-chip';
import { createContext, useContext, useCallback, useRef, useEffect, useMemo, useState, useId, useLayoutEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

// src/Select.tsx
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
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
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      ref,
      className: cn("vds-select-trigger", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": invalid ? "true" : void 0,
      "data-loading": loading ? "true" : void 0,
      "aria-invalid": invalid || void 0,
      "aria-busy": loading || void 0,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "vds-select-trigger-value", children }),
        /* @__PURE__ */ jsxs("span", { className: "vds-select-trigger-actions", children: [
          clearable ? /* @__PURE__ */ jsx(
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
              children: /* @__PURE__ */ jsx(IconX, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false })
            }
          ) : null,
          loading ? /* @__PURE__ */ jsx("span", { className: "vds-select-spinner", "aria-hidden": "true", children: /* @__PURE__ */ jsx(IconLoader2, { size: 24, stroke: 2.5, "aria-hidden": true, focusable: false }) }) : /* @__PURE__ */ jsx(SelectPrimitive.Icon, { className: "vds-select-icon", children: /* @__PURE__ */ jsx(IconChevronDown, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false }) })
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
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    SelectPrimitive.Content,
    {
      ref,
      className: cn("vds-select-content", className),
      "data-size": size,
      position,
      sideOffset: 4,
      ...props,
      children: /* @__PURE__ */ jsx(SelectPrimitive.Viewport, { className: "vds-select-viewport", children })
    }
  ) });
}
function SelectItem({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      ref,
      className: cn("vds-select-item", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { className: "vds-select-item-indicator", children: /* @__PURE__ */ jsx(IconCheck, { size: 12, stroke: 2, "aria-hidden": true, focusable: false }) })
      ]
    }
  );
}
function SelectLabel({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Label,
    {
      ref,
      className: cn("vds-select-label", className),
      ...props
    }
  );
}
function SelectSeparator({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Separator,
    {
      ref,
      className: cn("vds-select-separator", className),
      ...props
    }
  );
}
function SelectEmpty({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "presentation",
      className: cn("vds-select-empty", className),
      ...props,
      children
    }
  );
}
var ComboboxContext = createContext(null);
function useComboboxContext() {
  const ctx = useContext(ComboboxContext);
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
  const [uncontrolledValue, setUncontrolledValue] = useState(
    () => defaultValue ?? (multiple ? [] : "")
  );
  const value = controlledValue !== void 0 ? controlledValue : uncontrolledValue;
  const commitValue = useCallback(
    (next) => {
      if (controlledValue === void 0) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [controlledValue, onValueChange]
  );
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen !== void 0 ? controlledOpen : uncontrolledOpen;
  const setOpen = useCallback(
    (next) => {
      if (controlledOpen === void 0) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange]
  );
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (externalSearch) onSearchChange?.(searchQuery);
  }, [searchQuery, externalSearch, onSearchChange]);
  const filteredItems = useMemo(() => {
    if (externalSearch || !searchable || !searchQuery) return items;
    const fn = filter ?? defaultFilter;
    return items.filter((it) => fn(it, searchQuery));
  }, [items, searchQuery, searchable, externalSearch, filter]);
  const valueArr = useMemo(
    () => Array.isArray(value) ? value : value ? [value] : [],
    [value]
  );
  const isSelected = useCallback((v) => valueArr.includes(v), [valueArr]);
  const toggleValue = useCallback(
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
  const removeValue = useCallback(
    (v) => {
      if (multiple) {
        commitValue(valueArr.filter((x) => x !== v));
      } else if (value === v) {
        commitValue("");
      }
    },
    [multiple, valueArr, commitValue, value]
  );
  const clearValue = useCallback(() => {
    commitValue(multiple ? [] : "");
  }, [commitValue, multiple]);
  const selectedItems = useMemo(
    () => valueArr.map((v) => items.find((it) => it.value === v)).filter(Boolean),
    [valueArr, items]
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  useEffect(() => {
    setHighlightedIndex((i) => {
      if (filteredItems.length === 0) return -1;
      if (i < 0 || i >= filteredItems.length) return 0;
      return i;
    });
  }, [filteredItems.length]);
  useEffect(() => {
    if (!open) return;
    if (filteredItems.length === 0) {
      setHighlightedIndex(-1);
      return;
    }
    const firstSelected = filteredItems.findIndex((it) => valueArr.includes(it.value));
    setHighlightedIndex(firstSelected >= 0 ? firstSelected : 0);
  }, [open]);
  const moveHighlight = useCallback(
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
  const commitHighlighted = useCallback(() => {
    const item = filteredItems[highlightedIndex];
    if (!item || item.disabled) return;
    toggleValue(item.value);
  }, [filteredItems, highlightedIndex, toggleValue]);
  const handleInputKeyDown = useCallback(
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
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const baseId = useId();
  const listId = `${baseId}-list`;
  const inputId = `${baseId}-input`;
  const getItemId = useCallback(
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
  return useVirtualizer({
    count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimateSize,
    overscan
  });
}
var ComboboxVisualContext = createContext({ size: "md", appearance: "soft" });
var useComboboxVisual = () => useContext(ComboboxVisualContext);
function Combobox({
  size = "md",
  appearance = "soft",
  children,
  ...hookProps
}) {
  const ctx = useCombobox(hookProps);
  return /* @__PURE__ */ jsx(ComboboxProvider, { value: ctx, children: /* @__PURE__ */ jsx(ComboboxVisualContext.Provider, { value: { size, appearance }, children: /* @__PURE__ */ jsx(PopoverPrimitive.Root, { open: ctx.open, onOpenChange: ctx.setOpen, children }) }) });
}
function ComboboxChipList({ items, chipSize, onRemove }) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;
    const recompute = () => {
      const cs = getComputedStyle(container);
      const gap = parseFloat(cs.columnGap || cs.gap) || 0;
      const width = container.clientWidth;
      const children = measure.children;
      const chipEls = [];
      for (let i = 0; i < items.length; i += 1) {
        const el = children.item(i);
        if (el instanceof HTMLElement) chipEls.push(el);
      }
      const counterEl = children.item(items.length);
      const counterWidth = counterEl instanceof HTMLElement ? counterEl.offsetWidth : 0;
      let used = 0;
      let fits = 0;
      for (let i = 0; i < chipEls.length; i += 1) {
        const w = chipEls[i].offsetWidth;
        const next = used + (i > 0 ? gap : 0) + w;
        if (next <= width) {
          used = next;
          fits = i + 1;
        } else {
          break;
        }
      }
      if (fits < items.length) {
        while (fits > 0) {
          let total = 0;
          for (let i = 0; i < fits; i += 1) {
            total += (i > 0 ? gap : 0) + chipEls[i].offsetWidth;
          }
          total += gap + counterWidth;
          if (total <= width) break;
          fits -= 1;
        }
      }
      setVisibleCount(fits);
    };
    recompute();
    const obs = new ResizeObserver(recompute);
    obs.observe(container);
    return () => obs.disconnect();
  }, [items]);
  const hidden = items.length - visibleCount;
  const visibleItems = hidden > 0 ? items.slice(0, visibleCount) : items;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "vds-combobox-trigger-chips", children: [
      visibleItems.map((item) => /* @__PURE__ */ jsxs(Chip, { size: chipSize, appearance: "soft", children: [
        /* @__PURE__ */ jsx(ChipLabel, { children: item.label }),
        /* @__PURE__ */ jsx(
          ChipRemove,
          {
            tabIndex: -1,
            "aria-label": `Remove ${item.label}`,
            onPointerDown: (e) => e.preventDefault(),
            onClick: (e) => {
              e.stopPropagation();
              onRemove(item.value);
            }
          }
        )
      ] }, item.value)),
      hidden > 0 ? /* @__PURE__ */ jsx(Chip, { size: chipSize, appearance: "soft", "aria-label": `${hidden} more selected`, children: /* @__PURE__ */ jsxs(ChipLabel, { children: [
        "+",
        hidden
      ] }) }) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: measureRef, className: "vds-combobox-trigger-chips-measure", "aria-hidden": "true", children: [
      items.map((item) => /* @__PURE__ */ jsxs(Chip, { size: chipSize, appearance: "soft", children: [
        /* @__PURE__ */ jsx(ChipLabel, { children: item.label }),
        /* @__PURE__ */ jsx(ChipRemove, { tabIndex: -1 })
      ] }, item.value)),
      /* @__PURE__ */ jsx(Chip, { size: chipSize, appearance: "soft", children: /* @__PURE__ */ jsxs(ChipLabel, { children: [
        "+",
        items.length
      ] }) })
    ] })
  ] });
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
  const setRef = useCallback(
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
  return /* @__PURE__ */ jsx(PopoverPrimitive.Anchor, { asChild: true, children: /* @__PURE__ */ jsxs(
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
      className: cn("vds-combobox-trigger", className),
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
        /* @__PURE__ */ jsx("div", { className: "vds-combobox-trigger-value", children: multiple ? selectedItems.length === 0 ? /* @__PURE__ */ jsx("span", { className: "vds-combobox-trigger-placeholder", children: placeholder }) : /* @__PURE__ */ jsx(
          ComboboxChipList,
          {
            items: selectedItems,
            chipSize,
            onRemove: removeValue
          }
        ) : selectedItems[0] ? /* @__PURE__ */ jsx("span", { className: "vds-combobox-trigger-label", children: renderValue ? renderValue(selectedItems[0]) : selectedItems[0].label }) : /* @__PURE__ */ jsx("span", { className: "vds-combobox-trigger-placeholder", children: placeholder }) }),
        /* @__PURE__ */ jsxs("div", { className: "vds-combobox-trigger-actions", children: [
          clearable && hasValue && !disabled ? /* @__PURE__ */ jsx(
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
              children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
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
          loading ? /* @__PURE__ */ jsx("span", { className: "vds-combobox-spinner", "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
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
          ) }) }) : /* @__PURE__ */ jsx("span", { className: "vds-combobox-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      ref,
      sideOffset,
      align,
      className: cn("vds-combobox-content", className),
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
  const setRef = useCallback(
    (el) => {
      inputRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref, inputRef]
  );
  if (!searchable) return null;
  const activeId = highlightedIndex >= 0 && highlightedIndex < filteredItems.length ? getItemId(highlightedIndex) : void 0;
  return /* @__PURE__ */ jsxs("div", { className: "vds-combobox-input-wrap", children: [
    /* @__PURE__ */ jsx("span", { className: "vds-combobox-input-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 16 16", fill: "none", children: [
      /* @__PURE__ */ jsx("circle", { cx: "7", cy: "7", r: "5", stroke: "currentColor", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M14 14L11 11",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
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
        className: cn("vds-combobox-input", className),
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      id: listId,
      role: "listbox",
      className: cn("vds-combobox-list", className),
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
    return /* @__PURE__ */ jsx(
      VirtualOptions,
      {
        items: filteredItems,
        estimateSize,
        maxHeight,
        renderItem: children
      }
    );
  }
  return /* @__PURE__ */ jsx(
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
  const scrollRef = useRef(null);
  const virtualizer = useComboboxVirtualizer({
    count: items.length,
    scrollRef,
    estimateSize,
    overscan: 8
  });
  const { highlightedIndex } = useComboboxContext();
  useEffect(() => {
    if (highlightedIndex < 0) return;
    virtualizer.scrollToIndex(highlightedIndex, { align: "auto" });
  }, [highlightedIndex, virtualizer]);
  const totalSize = virtualizer.getTotalSize();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: scrollRef,
      className: "vds-combobox-options",
      style: { maxBlockSize: maxHeight, overflowY: "auto", position: "relative" },
      children: /* @__PURE__ */ jsx("div", { style: { blockSize: totalSize, position: "relative" }, children: virtualizer.getVirtualItems().map((v) => {
        const item = items[v.index];
        return /* @__PURE__ */ jsx(
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
  const index = useMemo(
    () => filteredItems.findIndex((it) => it.value === value),
    [filteredItems, value]
  );
  const highlighted = index >= 0 && index === highlightedIndex;
  const selected = isSelected(value);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      id: index >= 0 ? getItemId(index) : void 0,
      role: "option",
      "aria-selected": selected,
      "aria-disabled": disabled || void 0,
      className: cn("vds-combobox-item", className),
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
        /* @__PURE__ */ jsx("span", { className: "vds-combobox-item-label", children }),
        selected ? /* @__PURE__ */ jsx("span", { className: "vds-combobox-item-indicator", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "group",
      className: cn("vds-combobox-group", className),
      ...props,
      children: [
        heading ? /* @__PURE__ */ jsx("div", { className: "vds-combobox-group-heading", children: heading }) : null,
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "presentation",
      className: cn("vds-combobox-empty", className),
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "status",
      "aria-live": "polite",
      className: cn("vds-combobox-loading", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "vds-combobox-loading-spinner", "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx("span", { children: children ?? "Loading\u2026" })
      ]
    }
  );
}
function ComboboxSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "separator",
      className: cn("vds-combobox-separator", className),
      ...props
    }
  );
}

export { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList, ComboboxLoading, ComboboxOptions, ComboboxSeparator, ComboboxTrigger, Select, SelectContent, SelectEmpty, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, useComboboxContext };
