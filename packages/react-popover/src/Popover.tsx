import { cn, useDirection } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as PopoverPrimitive from "@virtari-packages/primitives/popover";
import { DirectionProvider } from "@virtari-packages/primitives/direction";

/* ── Root ──
 * Auto-threads the active text direction into the popover primitive so the Popper-positioned
 * content flips `side` / `align` under RTL (e.g. `side="left"` lays out on
 * the physical right in Persian/Arabic). Consumers can still override by
 * passing `dir`. DirectionProvider is the primitives' designated channel — the Root
 * itself doesn't accept `dir`. */
export interface PopoverProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
  /** Reading direction. Defaults to the document's active direction. */
  dir?: "ltr" | "rtl";
}

export function Popover({ dir, ...props }: PopoverProps) {
  const autoDir = useDirection();
  return (
    <DirectionProvider dir={dir ?? autoDir}>
      <PopoverPrimitive.Root {...props} />
    </DirectionProvider>
  );
}

export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverAnchor = PopoverPrimitive.Anchor;

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
