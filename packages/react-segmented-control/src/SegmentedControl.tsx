import { useRef } from "react";
import { cn } from "@virtari-packages/utils";
import * as RadioGroupPrimitive from "@virtari-packages/primitives/radio-group";
import type { ComponentRef, Ref, ReactNode } from "react";
import { useSegmentedIndicator } from "./use-segmented-indicator";

export type SegmentedControlSize = "sm" | "md" | "lg";

type PrimitiveRootProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;
type PrimitiveItemProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
>;

export interface SegmentedControlProps
  extends Omit<PrimitiveRootProps, "orientation"> {
  size?: SegmentedControlSize;
  /** Expand to fill parent width. */
  fullWidth?: boolean;
  /** Vertical stacking layout. */
  orientation?: "horizontal" | "vertical";
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}

export interface SegmentedControlItemProps extends PrimitiveItemProps {
  /** Leading icon before label text. */
  icon?: ReactNode;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}

export function SegmentedControl({
  size = "md",
  fullWidth = false,
  orientation = "horizontal",
  disabled,
  className,
  children,
  ref,
  ...props
}: SegmentedControlProps) {
  const listRef = useRef<HTMLDivElement>(null);
  useSegmentedIndicator(listRef);

  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={orientation}
      disabled={disabled}
      data-full-width={fullWidth ? "true" : undefined}
      data-disabled={disabled || undefined}
      className={cn("vds-segmented-control", className)}
      {...props}
    >
      <div
        ref={listRef}
        className="vds-tabs-list"
        data-variant="segmented"
        data-animated="true"
        data-size={size}
        data-full-width={fullWidth ? "true" : undefined}
        data-orientation={orientation}
      >
        {children}
      </div>
    </RadioGroupPrimitive.Root>
  );
}

export function SegmentedControlItem({
  icon,
  className,
  children,
  ref,
  ...props
}: SegmentedControlItemProps) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn("vds-tabs-trigger", className)}
      {...props}
    >
      {icon && (
        <span className="vds-segmented-control-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </RadioGroupPrimitive.Item>
  );
}
