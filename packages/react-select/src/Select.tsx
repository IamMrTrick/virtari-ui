import { createContext, useContext, forwardRef, useRef } from "react";
import { cn, useDirection, useComposedRefs } from "@virtari-packages/utils";
import type { ComponentRef, MouseEvent, ReactNode, Ref } from "react";
import * as SelectPrimitive from "@virtari-packages/primitives/select";
import { DirectionProvider } from "@virtari-packages/primitives/direction";
import { IconCheck, IconChevronDown, IconLoader2, IconX } from "@virtari-packages/react-icons";

/* ── Root ──
 * Auto-threads the active text direction so the select primitive's keyboard navigation,
 * type-ahead, and listbox popover placement flip under RTL. DirectionProvider
 * is the designated channel; Root doesn't accept `dir` directly. Explicit
 * `dir` still wins. */
export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  /** Reading direction. Defaults to the document's active direction. */
  dir?: "ltr" | "rtl";
}

const SelectDisabledContext = createContext(false);

export function Select({ dir, ...props }: SelectProps) {
  const autoDir = useDirection();
  return (
    <DirectionProvider dir={dir ?? autoDir}>
      <SelectDisabledContext.Provider value={props.disabled ?? false}>
        <SelectPrimitive.Root {...props} />
      </SelectDisabledContext.Provider>
    </DirectionProvider>
  );
}

export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

/* ── Shared types ── */
export type SelectSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type SelectAppearance = "soft" | "outline" | "ghost" | "filled";

/* ── Trigger ── */
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  /** Size preset — shares height ramp with Button, Input, Toggle */
  size?: SelectSize;
  /** Visual appearance — defaults to `soft` (surface bg + border) */
  appearance?: SelectAppearance;
  /** Form error state — paints border + ring with danger tokens */
  invalid?: boolean;
  /** Shows a spinner in place of the chevron, sets `aria-busy` */
  loading?: boolean;
  /** Render a clear (X) button that fires `onClear` when clicked */
  clearable?: boolean;
  /** Called when the clear button is clicked (only used when `clearable`) */
  onClear?: () => void;
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Trigger>>;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger({
  size = "md",
  appearance = "soft",
  invalid,
  loading,
  clearable,
  onClear,
  className,
  children,
  ...props
}, ref) {
  const rootDisabled = useContext(SelectDisabledContext);
  const disabled = rootDisabled || props.disabled;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mergedRef = useComposedRefs(triggerRef, ref);
  return (
    <span className="vds-select-control" data-size={size} data-appearance={appearance}>
    <SelectPrimitive.Trigger
      ref={mergedRef}
      className={cn("vds-select-trigger", className)}
      data-size={size}
      data-appearance={appearance}
      aria-invalid={invalid || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      <span className="vds-select-trigger-value">{children}</span>
      <span className="vds-select-trigger-actions">
        {clearable ? <span className="vds-select-clear-space" aria-hidden="true" /> : null}
        {loading ? (
          <span className="vds-select-spinner" aria-hidden="true">
            <IconLoader2 size={24} stroke={2.5} aria-hidden focusable={false} />
          </span>
        ) : (
          <SelectPrimitive.Icon className="vds-select-icon">
            <IconChevronDown size={12} stroke={1.5} aria-hidden focusable={false} />
          </SelectPrimitive.Icon>
        )}
      </span>
    </SelectPrimitive.Trigger>
      {clearable ? (
          <button
            type="button"
            disabled={disabled}
            className="vds-select-clear"
            aria-label="Clear selection"
            onPointerDown={(e) => e.preventDefault()}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onClear?.();
              triggerRef.current?.focus();
            }}
          >
            <IconX size={12} stroke={1.5} aria-hidden focusable={false} />
          </button>
        ) : null}
    </span>
  );
});

/* ── Content ── */
export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  /** Propagated to descendant items for size-aware padding/typography */
  size?: SelectSize;
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Content>>;
}

export const SelectContent = forwardRef<ComponentRef<typeof SelectPrimitive.Content>, SelectContentProps>(function SelectContent({
  className,
  children,
  position = "popper",
  size = "md",
  ...props
}, ref) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn("vds-select-content", className)}
        data-size={size}
        position={position}
        sideOffset={4}
        {...props}
      >
        <SelectPrimitive.Viewport className="vds-select-viewport">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

/* ── Item ── */
export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Item>>;
}

export const SelectItem = forwardRef<ComponentRef<typeof SelectPrimitive.Item>, SelectItemProps>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn("vds-select-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="vds-select-item-indicator">
        <IconCheck size={12} stroke={2} aria-hidden focusable={false} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

/* ── Label ── */
export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Label>>;
}

export const SelectLabel = forwardRef<ComponentRef<typeof SelectPrimitive.Label>, SelectLabelProps>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("vds-select-label", className)}
      {...props}
    />
  );
});

/* ── Separator ── */
export interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Separator>>;
}

export const SelectSeparator = forwardRef<ComponentRef<typeof SelectPrimitive.Separator>, SelectSeparatorProps>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("vds-select-separator", className)}
      {...props}
    />
  );
});

/* ── Empty state row ── *
 * Rendered inside SelectContent as a sibling of SelectItems when the
 * consumer knows there are no items. Non-interactive, not selectable.
 */
export interface SelectEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function SelectEmpty({ className, children, ref, ...props }: SelectEmptyProps) {
  return (
    <div
      ref={ref}
      role="presentation"
      className={cn("vds-select-empty", className)}
      {...props}
    >
      {children}
    </div>
  );
}
