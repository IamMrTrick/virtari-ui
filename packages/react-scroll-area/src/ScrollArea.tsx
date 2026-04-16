import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

/* ── ScrollArea ── */
export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.Root>>;
}

export function ScrollArea({ className, children, ref, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("vds-scroll-area", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="vds-scroll-area-viewport">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

/* ── ScrollBar ── */
export interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;
}

export function ScrollBar({
  className,
  orientation = "vertical",
  ref,
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn("vds-scrollbar", className)}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="vds-scrollbar-thumb" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}
