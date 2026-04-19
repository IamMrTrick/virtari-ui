import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export type SegmentedRadioSize = "sm" | "md" | "lg";

type PrimitiveRootProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

export interface SegmentedRadioProps extends PrimitiveRootProps {
  size?: SegmentedRadioSize;
  error?: boolean;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}

export function SegmentedRadio({
  size = "md",
  error = false,
  className,
  orientation = "horizontal",
  disabled,
  ref,
  ...props
}: SegmentedRadioProps) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={orientation}
      disabled={disabled}
      aria-invalid={error || undefined}
      data-size={size}
      data-error={error ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn("vds-segmented-radio", className)}
      {...props}
    />
  );
}

export interface SegmentedRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}

export function SegmentedRadioItem({
  className,
  ref,
  children,
  ...props
}: SegmentedRadioItemProps) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn("vds-segmented-radio-item", className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}
