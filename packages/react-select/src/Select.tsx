import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

/* ── Root ── */
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

/* ── Trigger ── */
export type SelectSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  /** Size preset — shares height ramp with Button, Input, Toggle */
  size?: SelectSize;
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Trigger>>;
}

export function SelectTrigger({ size = "md", className, children, ref, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn("vds-select-trigger", className)}
      data-size={size}
      {...props}
    >
      {children}
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
    </SelectPrimitive.Trigger>
  );
}

/* ── Content ── */
export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof SelectPrimitive.Content>>;
}

export function SelectContent({
  className,
  children,
  position = "popper",
  ref,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn("vds-select-content", className)}
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

