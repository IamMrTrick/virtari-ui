import { cn } from "@virtari/utils";
import type { ComponentRef, MouseEvent, ReactNode, Ref } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

/* ── Root ── */
export const Select = SelectPrimitive.Root;
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

export function SelectTrigger({
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
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn("vds-select-trigger", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={invalid ? "true" : undefined}
      data-loading={loading ? "true" : undefined}
      aria-invalid={invalid || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      <span className="vds-select-trigger-value">{children}</span>
      <span className="vds-select-trigger-actions">
        {clearable ? (
          <button
            type="button"
            className="vds-select-clear"
            aria-label="Clear selection"
            onPointerDown={(e) => e.preventDefault()}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onClear?.();
            }}
          >
            <svg
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
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
          <span className="vds-select-spinner" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <SelectPrimitive.Icon className="vds-select-icon">
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
          </SelectPrimitive.Icon>
        )}
      </span>
    </SelectPrimitive.Trigger>
  );
}

/* ── Content ── */
export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  /** Propagated to descendant items for size-aware padding/typography */
  size?: SelectSize;
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Content>>;
}

export function SelectContent({
  className,
  children,
  position = "popper",
  size = "md",
  ref,
  ...props
}: SelectContentProps) {
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
}

/* ── Item ── */
export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Item>>;
}

export function SelectItem({ className, children, ref, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn("vds-select-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="vds-select-item-indicator">
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
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

/* ── Label ── */
export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Label>>;
}

export function SelectLabel({ className, ref, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("vds-select-label", className)}
      {...props}
    />
  );
}

/* ── Separator ── */
export interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Separator>>;
}

export function SelectSeparator({ className, ref, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("vds-select-separator", className)}
      {...props}
    />
  );
}

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
