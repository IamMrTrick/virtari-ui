import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: ToggleVariant;
  /** Size preset — shares height ramp with Button, Input, Select */
  size?: ToggleSize;
  ref?: Ref<ComponentRef<typeof TogglePrimitive.Root>>;
}

export function Toggle({
  variant = "default",
  size = "md",
  className,
  ref,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn("vds-toggle", className)}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
}
