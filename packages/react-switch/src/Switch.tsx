import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: SwitchSize;
  ref?: Ref<ComponentRef<typeof SwitchPrimitive.Root>>;
}

export function Switch({ size = "md", className, ref, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn("vds-switch", className)}
      data-size={size}
      {...props}
    >
      <SwitchPrimitive.Thumb className="vds-switch-thumb" />
    </SwitchPrimitive.Root>
  );
}

