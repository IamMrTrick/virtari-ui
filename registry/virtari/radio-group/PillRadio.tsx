import { cn } from "../../lib/utils";
import type { ComponentRef, Ref } from "react";
import * as RadioGroupPrimitive from "../../lib/primitives/radio-group";
import { useRadioDirection } from "./useRadioDirection";

export type PillRadioSize = "sm" | "md" | "lg";

type PrimitiveRootProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

export interface PillRadioProps extends PrimitiveRootProps {
  size?: PillRadioSize;
  error?: boolean;
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}

export function PillRadio({
  size = "md",
  error = false,
  className,
  orientation = "horizontal",
  dir,
  disabled,
  ref,
  ...props
}: PillRadioProps) {
  const { direction, composedRef } = useRadioDirection(dir, ref);
  return (
    <RadioGroupPrimitive.Root
      ref={composedRef}
      dir={direction}
      orientation={orientation}
      disabled={disabled}
      aria-invalid={error || undefined}
      data-size={size}
      data-error={error ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn("vds-pill-radio", className)}
      {...props}
    />
  );
}

export interface PillRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}

export function PillRadioItem({
  className,
  ref,
  children,
  ...props
}: PillRadioItemProps) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn("vds-pill-radio-item", className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}
