import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export type TooltipSize = "sm" | "md" | "lg";
export type TooltipVariant =
  | "default"
  | "inverted"
  | "info"
  | "success"
  | "warning"
  | "danger";

/* ── Provider ──
 * Snappier default delay (300ms vs Radix default of 700ms) so tooltips
 * feel responsive in design-system contexts. Override per-instance
 * with `delayDuration={n}`. */
export interface TooltipProviderProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider> {}

export function TooltipProvider({
  delayDuration = 300,
  skipDelayDuration = 200,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  );
}

/* ── Re-exports ── */
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

/* ── TooltipContent ── */
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof TooltipPrimitive.Content>>;
  size?: TooltipSize;
  variant?: TooltipVariant;
  /** Render an arrow pointing to the trigger. */
  arrow?: boolean;
}

export function TooltipContent({
  className,
  sideOffset = 6,
  collisionPadding = 8,
  size = "md",
  variant = "default",
  arrow = false,
  children,
  ref,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        data-size={size}
        data-variant={variant}
        className={cn("vds-tooltip-content", className)}
        {...props}
      >
        {children}
        {arrow ? <TooltipPrimitive.Arrow className="vds-tooltip-arrow" /> : null}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

/* ── TooltipArrow (standalone export, for power users) ── */
export interface TooltipArrowProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow> {
  ref?: Ref<ComponentRef<typeof TooltipPrimitive.Arrow>>;
}

export function TooltipArrow({ className, ref, ...props }: TooltipArrowProps) {
  return (
    <TooltipPrimitive.Arrow
      ref={ref}
      className={cn("vds-tooltip-arrow", className)}
      {...props}
    />
  );
}
