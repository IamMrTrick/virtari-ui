import { cn } from "@virtari-packages/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type BottomNavFabColor = "primary" | "accent" | "success";

export interface BottomNavFabProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The FAB glyph (required). */
  icon: ReactNode;
  /** Accessible name. Falls back to `aria-label`. */
  label?: string;
  /** Color intent. Default `"primary"`. */
  color?: BottomNavFabColor;
  /** Render as child element (polymorphic via Radix Slot). */
  asChild?: boolean;
}

/**
 * Prominent centre action button that escapes the nav bar upward.
 * Designed to be placed as a sibling of `<BottomNavItem>` in a 2+FAB+2
 * layout (or 1+FAB+1 for minimal bars).
 */
export const BottomNavFab = forwardRef<HTMLButtonElement, BottomNavFabProps>(
  function BottomNavFab(
    {
      icon,
      label,
      color = "primary",
      asChild = false,
      className,
      type,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn("vds-bottom-nav__fab", className)}
        data-color={color}
        type={asChild ? undefined : type ?? "button"}
        aria-label={ariaLabel ?? label}
        {...rest}
      >
        {icon}
      </Comp>
    );
  },
);
