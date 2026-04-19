import { cn } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

/* ── Re-exports ── */
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

/* ── PopoverContent ── */
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof PopoverPrimitive.Content>>;
}

export function PopoverContent({
  className,
  sideOffset = 4,
  align = "center",
  ref,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn("vds-popover-content", className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
