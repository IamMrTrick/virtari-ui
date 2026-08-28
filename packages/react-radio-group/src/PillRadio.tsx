import { cn } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as RadioGroupPrimitive from "@virtari-packages/primitives/radio-group";

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
  disabled,
  ref,
  ...props
}: PillRadioProps) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
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
