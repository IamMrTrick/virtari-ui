import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

/* ── Re-exports ── */
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

/* ── TooltipContent ── */
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof TooltipPrimitive.Content>>;
}

export function TooltipContent({
  className,
  sideOffset = 4,
  ref,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn("vds-tooltip-content", className)}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}
