import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

/* ── Label ── */
export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof LabelPrimitive.Root>>;
}

export function Label({ className, ref, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn("vds-label", className)}
      {...props}
    />
  );
}
