import { cn, useComposedRefs, useFormReset } from "../../lib/utils";
import * as PopoverPrimitive from "../../lib/primitives/popover";
import {
  Chip,
  ChipLabel,
  ChipRemove,
  type ChipSize,
} from "../chip";
import {
  forwardRef,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";
import {
  ComboboxProvider,
  useCombobox,
  useComboboxContext,
  type ComboboxItemData,
  type UseComboboxProps,
} from "./use-combobox";
import { useComboboxVirtualizer } from "./virtualizer";
import type { SelectSize, SelectAppearance } from "./Select";

export type ComboboxSize = SelectSize;
export type ComboboxAppearance = SelectAppearance;

/* ─────────────────────────────────────────────
 * Size/appearance context — sub-components read it to paint
 * the right data-* attrs without threading props.
 * ───────────────────────────────────────────── */
const ComboboxVisualContext = createContext<{
  size: ComboboxSize;
  appearance: ComboboxAppearance;
}>({ size: "md", appearance: "soft" });

const useComboboxVisual = () => useContext(ComboboxVisualContext);

/* ─────────────────────────────────────────────
 * <Combobox> — provider + Popover root
 * ───────────────────────────────────────────── */

export interface ComboboxProps<T extends ComboboxItemData = ComboboxItemData>
  extends UseComboboxProps<T> {
  size?: ComboboxSize;
  appearance?: ComboboxAppearance;
  children?: ReactNode;
}

export function Combobox<T extends ComboboxItemData = ComboboxItemData>({
  size = "md",
  appearance = "soft",
  children,
  ...hookProps
}: ComboboxProps<T>) {
  const ctx = useCombobox(hookProps);
  useFormReset(ctx.triggerRef, ctx.reset, hookProps.form);

  return (
    <ComboboxProvider value={ctx}>
      <ComboboxVisualContext.Provider value={{ size, appearance }}>
        <PopoverPrimitive.Root open={ctx.open} onOpenChange={ctx.setOpen}>
          {children}
          {hookProps.name && (Array.isArray(ctx.value) ? ctx.value : [ctx.value]).map((value, index) => (
            <input key={index} type="hidden" name={hookProps.name} form={hookProps.form} value={value} disabled={ctx.disabled} />
          ))}
        </PopoverPrimitive.Root>
      </ComboboxVisualContext.Provider>
    </ComboboxProvider>
  );
}

/* ─────────────────────────────────────────────
 * <ComboboxChipList>
 * Renders selected chips on a single line, collapsing overflow into a
 * "+N" counter chip. Uses an off-screen measurement container so it can
 * know every chip's natural width without laying them out in-flow.
 * ───────────────────────────────────────────── */

interface ComboboxChipListProps {
  disabled: boolean;
  items: ReadonlyArray<ComboboxItemData>;
  chipSize: ChipSize;
  onRemove: (value: string) => void;
}

function ComboboxChipList({ items, chipSize, onRemove, disabled }: ComboboxChipListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
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
      const chipEls: HTMLElement[] = [];
      for (let i = 0; i < items.length; i += 1) {
        const el = children.item(i);
        if (el instanceof HTMLElement) chipEls.push(el);
      }
      const counterEl = children.item(items.length);
      const counterWidth = counterEl instanceof HTMLElement ? counterEl.offsetWidth : 0;

      let used = 0;
      let fits = 0;
      for (let i = 0; i < chipEls.length; i += 1) {
        const w = chipEls[i]!.offsetWidth;
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
            total += (i > 0 ? gap : 0) + chipEls[i]!.offsetWidth;
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

  return (
    <>
      <div ref={containerRef} className="vds-combobox-trigger-chips">
        {visibleItems.map((item) => (
          <Chip key={item.value} size={chipSize} appearance="soft">
            <ChipLabel>{item.label}</ChipLabel>
            <ChipRemove
              disabled={disabled}
              aria-label={`Remove ${item.label}`}
              onPointerDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.value);
              }}
            />
          </Chip>
        ))}
        {hidden > 0 ? (
          <Chip size={chipSize} appearance="soft" aria-label={`${hidden} more selected`}>
            <ChipLabel>+{hidden}</ChipLabel>
          </Chip>
        ) : null}
      </div>
      <div ref={measureRef} className="vds-combobox-trigger-chips-measure" aria-hidden="true">
        {items.map((item) => (
          <Chip key={item.value} size={chipSize} appearance="soft">
            <ChipLabel>{item.label}</ChipLabel>
            <ChipRemove tabIndex={-1} />
          </Chip>
        ))}
        <Chip size={chipSize} appearance="soft">
          <ChipLabel>+{items.length}</ChipLabel>
        </Chip>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
 * <ComboboxTrigger>
 * role=combobox, opens popover, hosts the display (value/chips/clear/chevron).
 * ───────────────────────────────────────────── */

export interface ComboboxTriggerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  placeholder?: ReactNode;
  clearable?: boolean;
  renderValue?: (item: ComboboxItemData) => ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const ComboboxTrigger = forwardRef<HTMLDivElement, ComboboxTriggerProps>(function ComboboxTrigger({
  placeholder = "Select…",
  clearable,
  renderValue,
  className,
  onClick,
  onKeyDown,
  ...props
}, ref) {
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
    inputRef,
    searchable,
    handleInputKeyDown,
    highlightedIndex,
    getItemId,
  } = useComboboxContext();
  const { size, appearance } = useComboboxVisual();

  const hasValue = multiple
    ? (value as string[]).length > 0
    : Boolean(value);

  const setRef = useComposedRefs(triggerRef, ref);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(e);
    if (e.defaultPrevented) return;
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.target !== e.currentTarget) return;
    if (!searchable && open) {
      handleInputKeyDown(e);
      return;
    }
    if (
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "ArrowDown" ||
      e.key === "ArrowUp"
    ) {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const chipSize: ChipSize = size === "sm" || size === "xs" || size === "2xs" ? "sm" : "md";

  return (
    <PopoverPrimitive.Anchor asChild>
      <div
        ref={setRef}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={!searchable && open && highlightedIndex >= 0 ? getItemId(highlightedIndex) : undefined}
        aria-disabled={disabled || undefined}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        className={cn("vds-combobox-trigger", className)}
        data-size={size}
        data-appearance={appearance}
        data-state={open ? "open" : "closed"}
        data-placeholder={!hasValue ? "" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div className="vds-combobox-trigger-value">
          {multiple ? (
            selectedItems.length === 0 ? (
              <span className="vds-combobox-trigger-placeholder">{placeholder}</span>
            ) : (
              <ComboboxChipList
                disabled={disabled}
                items={selectedItems}
                chipSize={chipSize}
                onRemove={(value) => {
                  removeValue(value);
                  triggerRef.current?.focus();
                }}
              />
            )
          ) : selectedItems[0] ? (
            <span className="vds-combobox-trigger-label">
              {renderValue ? renderValue(selectedItems[0]) : selectedItems[0].label}
            </span>
          ) : (
            <span className="vds-combobox-trigger-placeholder">{placeholder}</span>
          )}
        </div>
        <div className="vds-combobox-trigger-actions">
          {clearable && hasValue && !disabled ? (
            <button
              type="button"
              className="vds-combobox-clear"
              aria-label="Clear selection"
              onPointerDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                clearValue();
                triggerRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M9 3L3 9M3 3L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
          {loading ? (
            <span className="vds-combobox-spinner" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="40 60"
                  opacity="0.9"
                />
              </svg>
            </span>
          ) : (
            <span className="vds-combobox-icon" aria-hidden="true">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
    </PopoverPrimitive.Anchor>
  );
});

/* ─────────────────────────────────────────────
 * <ComboboxContent>
 * Popover content. Focuses the input on open, returns focus to trigger on close.
 * ───────────────────────────────────────────── */

export interface ComboboxContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  ref?: Ref<React.ComponentRef<typeof PopoverPrimitive.Content>>;
}

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(function ComboboxContent({
  className,
  sideOffset = 4,
  align = "start",
  children,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onInteractOutside,
  onKeyDownCapture,
  ...props
}, ref) {
  const { size } = useComboboxVisual();
  const { inputRef, triggerRef, searchable } = useComboboxContext();
  const leaveFocus = useRef(false);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn("vds-combobox-content", className)}
        data-size={size}
        onOpenAutoFocus={(e) => {
          leaveFocus.current = false;
          onOpenAutoFocus?.(e);
          if (e.defaultPrevented) return;
          if (searchable) {
            e.preventDefault();
            inputRef.current?.focus();
          } else {
            e.preventDefault();
            triggerRef.current?.focus();
          }
        }}
        onInteractOutside={(e) => {
          onInteractOutside?.(e);
          if (!e.defaultPrevented) leaveFocus.current = true;
        }}
        onKeyDownCapture={(e) => {
          onKeyDownCapture?.(e);
          if (!e.defaultPrevented && e.key === "Tab") leaveFocus.current = true;
        }}
        onCloseAutoFocus={(e) => {
          onCloseAutoFocus?.(e);
          if (e.defaultPrevented) return;
          e.preventDefault();
          if (!leaveFocus.current) triggerRef.current?.focus();
        }}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

/* ─────────────────────────────────────────────
 * <ComboboxInput>
 * Text input for filter. Drives aria-activedescendant on the trigger.
 * Not `role="combobox"` — the trigger holds that role.
 * ───────────────────────────────────────────── */

export interface ComboboxInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(function ComboboxInput({
  className,
  placeholder = "Search…",
  onKeyDown,
  ...props
}, ref) {
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
    filteredItems,
  } = useComboboxContext();

  const setRef = useComposedRefs(inputRef, ref);

  if (!searchable) return null;

  const activeId =
    highlightedIndex >= 0 && highlightedIndex < filteredItems.length
      ? getItemId(highlightedIndex)
      : undefined;

  return (
    <div className="vds-combobox-input-wrap">
      <span className="vds-combobox-input-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M14 14L11 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <input
        ref={setRef}
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={true}
        aria-autocomplete="list"
        aria-label={placeholder}
        aria-controls={listId}
        aria-activedescendant={activeId}
        autoComplete="off"
        spellCheck={false}
        className={cn("vds-combobox-input", className)}
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          handleInputKeyDown(e);
        }}
        {...props}
      />
    </div>
  );
});

/* ─────────────────────────────────────────────
 * <ComboboxList>
 * Scroll container + role=listbox.
 * ───────────────────────────────────────────── */

export interface ComboboxListProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const ComboboxList = forwardRef<HTMLDivElement, ComboboxListProps>(function ComboboxList({ className, children, ...props }, ref) {
  const { listId, multiple } = useComboboxContext();
  return (
    <div
      ref={ref}
      id={listId}
      role="listbox"
      aria-multiselectable={multiple || undefined}
      className={cn("vds-combobox-list", className)}
      {...props}
    >
      {children}
    </div>
  );
});

/* ─────────────────────────────────────────────
 * <ComboboxOptions>
 * Renders filteredItems via render prop; virtualizes when opted in.
 * ───────────────────────────────────────────── */

export interface ComboboxOptionsProps {
  children: (item: ComboboxItemData, index: number) => ReactNode;
  estimateSize?: number;
  maxHeight?: number | string;
}

export function ComboboxOptions({
  children,
  estimateSize = 36,
  maxHeight = 280,
}: ComboboxOptionsProps) {
  const { filteredItems, virtualized, loading } = useComboboxContext();

  if (loading || filteredItems.length === 0) return null;

  if (virtualized) {
    return (
      <VirtualOptions
        items={filteredItems}
        estimateSize={estimateSize}
        maxHeight={maxHeight}
        renderItem={children}
      />
    );
  }

  return (
    <div
      className="vds-combobox-options"
      style={{ maxBlockSize: maxHeight, overflowY: "auto" }}
    >
      {filteredItems.map((item, index) => children(item, index))}
    </div>
  );
}

interface VirtualOptionsProps {
  items: ComboboxItemData[];
  estimateSize: number;
  maxHeight: number | string;
  renderItem: (item: ComboboxItemData, index: number) => ReactNode;
}

function VirtualOptions({
  items,
  estimateSize,
  maxHeight,
  renderItem,
}: VirtualOptionsProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useComboboxVirtualizer({
    count: items.length,
    scrollRef,
    estimateSize,
    overscan: 8,
  });

  const { highlightedIndex } = useComboboxContext();

  useEffect(() => {
    if (highlightedIndex < 0) return;
    virtualizer.scrollToIndex(highlightedIndex, { align: "auto" });
  }, [highlightedIndex, virtualizer]);

  const totalSize = virtualizer.getTotalSize();

  return (
    <div
      ref={scrollRef}
      className="vds-combobox-options"
      style={{ maxBlockSize: maxHeight, overflowY: "auto", position: "relative" }}
    >
      <div style={{ blockSize: totalSize, position: "relative" }}>
        {virtualizer.getVirtualItems().map((v) => {
          const item = items[v.index]!;
          return (
            <div
              key={item.value}
              ref={virtualizer.measureElement}
              data-index={v.index}
              data-virtual-row
              style={{
                position: "absolute",
                insetInlineStart: 0,
                insetInlineEnd: 0,
                transform: `translateY(${v.start}px)`,
              }}
            >
              {renderItem(item, v.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * <ComboboxItem>
 * role=option, aria-selected, data-highlighted (active-descendant target).
 * ───────────────────────────────────────────── */

export interface ComboboxItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  ref?: Ref<HTMLDivElement>;
}

export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(function ComboboxItem({
  value,
  disabled,
  className,
  children,
  onSelect,
  onClick,
  onMouseMove,
  onPointerDown,
  ...props
}, ref) {
  const {
    filteredItems,
    highlightedIndex,
    setHighlightedIndex,
    isSelected,
    toggleValue,
    getItemId,
    virtualized,
    setItemDisabled,
  } = useComboboxContext();

  const itemRef = useRef<HTMLDivElement>(null);
  const mergedRef = useComposedRefs(itemRef, ref);

  const index = useMemo(
    () => filteredItems.findIndex((it) => it.value === value),
    [filteredItems, value],
  );

  const highlighted = index >= 0 && index === highlightedIndex;
  const selected = isSelected(value);
  const itemDisabled = disabled || filteredItems[index]?.disabled;

  useEffect(() => {
    if (!disabled) return;
    setItemDisabled(value, true);
    return () => setItemDisabled(value, false);
  }, [value, disabled, setItemDisabled]);

  useEffect(() => {
    if (!highlighted || virtualized) return;
    const item = itemRef.current;
    const scroller = item?.closest<HTMLElement>('.vds-combobox-options') ?? item?.closest<HTMLElement>('.vds-combobox-list');
    if (!item || !scroller) return;
    const row = item.getBoundingClientRect();
    const viewport = scroller.getBoundingClientRect();
    if (row.top < viewport.top) scroller.scrollTop -= viewport.top - row.top;
    else if (row.bottom > viewport.bottom) scroller.scrollTop += row.bottom - viewport.bottom;
  }, [highlighted, virtualized]);

  return (
    <div
      ref={mergedRef}
      id={index >= 0 ? getItemId(index) : undefined}
      role="option"
      aria-selected={selected}
      aria-disabled={itemDisabled || undefined}
      className={cn("vds-combobox-item", className)}
      data-highlighted={highlighted ? "true" : undefined}
      onPointerDown={(e) => {
        onPointerDown?.(e);
        if (!e.defaultPrevented) e.preventDefault();
      }}
      onMouseMove={(e) => {
        onMouseMove?.(e);
        if (e.defaultPrevented || itemDisabled || index < 0) return;
        if (highlightedIndex !== index) setHighlightedIndex(index);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || itemDisabled) return;
        toggleValue(value);
        onSelect?.(value);
      }}
      {...props}
    >
      <span className="vds-combobox-item-label">{children}</span>
      {selected ? (
        <span className="vds-combobox-item-indicator" aria-hidden="true">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
    </div>
  );
});

/* ─────────────────────────────────────────────
 * <ComboboxGroup>
 * ───────────────────────────────────────────── */

export interface ComboboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(function ComboboxGroup({
  heading,
  className,
  children,
  ...props
}, ref) {
  const headingId = useId();
  return (
    <div
      ref={ref}
      role="group"
      aria-labelledby={heading ? headingId : undefined}
      className={cn("vds-combobox-group", className)}
      {...props}
    >
      {heading ? <div id={headingId} className="vds-combobox-group-heading">{heading}</div> : null}
      {children}
    </div>
  );
});

/* ─────────────────────────────────────────────
 * <ComboboxEmpty>
 * ───────────────────────────────────────────── */

export interface ComboboxEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(function ComboboxEmpty({
  className,
  children,
  ...props
}, ref) {
  const { filteredItems, loading, emptyMessage } = useComboboxContext();
  if (loading || filteredItems.length > 0) return null;
  return (
    <div
      ref={ref}
      role="presentation"
      className={cn("vds-combobox-empty", className)}
      {...props}
    >
      {children ?? emptyMessage}
    </div>
  );
});

/* ─────────────────────────────────────────────
 * <ComboboxLoading>
 * ───────────────────────────────────────────── */

export interface ComboboxLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export const ComboboxLoading = forwardRef<HTMLDivElement, ComboboxLoadingProps>(function ComboboxLoading({
  className,
  children,
  ...props
}, ref) {
  const { loading } = useComboboxContext();
  if (!loading) return null;
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn("vds-combobox-loading", className)}
      {...props}
    >
      <span className="vds-combobox-loading-spinner" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="40 60"
            opacity="0.9"
          />
        </svg>
      </span>
      <span>{children ?? "Loading…"}</span>
    </div>
  );
});

/* ─────────────────────────────────────────────
 * <ComboboxSeparator>
 * ───────────────────────────────────────────── */

export function ComboboxSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("vds-combobox-separator", className)}
      {...props}
    />
  );
}

export type { ComboboxItemData };
