import { cn } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

/* ── Progress ── */
export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof ProgressPrimitive.Root>>;
}

export function Progress({ className, value, ref, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("vds-progress", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="vds-progress-indicator"
        style={{ width: `${value ?? 0}%` }}
      />
    </ProgressPrimitive.Root>
  );
}
