import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

/* ── RadioGroup ── */
export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}

export function RadioGroup({ className, ref, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("vds-radio-group", className)}
      {...props}
    />
  );
}

/* ── RadioGroupItem ── */
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}

export function RadioGroupItem({
  className,
  ref,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn("vds-radio-item", className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="vds-radio-indicator" />
    </RadioGroupPrimitive.Item>
  );
}
