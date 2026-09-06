import { cn, useDirection } from "../../lib/utils";
import type { ComponentRef, Ref } from "react";
import * as PopoverPrimitive from "../../lib/primitives/popover";
import { DirectionProvider } from "../../lib/primitives/direction";

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

/** Width ceiling preset. The popover stays content-driven; a size only moves
 *  the maximum it may grow to (sm 16rem · md 20rem · lg 24rem · xl 32rem). */
export type PopoverSize = "sm" | "md" | "lg" | "xl";

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /** Max-width preset. Defaults to `"md"`. */
  size?: PopoverSize;
  ref?: Ref<ComponentRef<typeof PopoverPrimitive.Content>>;
}

export function PopoverContent({
  className,
  size = "md",
  sideOffset = 4,
  align = "center",
  ref,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        data-size={size}
        sideOffset={sideOffset}
        align={align}
        className={cn("vds-popover-content", className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
