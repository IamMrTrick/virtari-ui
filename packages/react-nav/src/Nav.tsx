import { cn } from "@virtari/utils";
import {
  useMemo,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from "react";
import {
  NavContext,
  type NavContextValue,
  type NavOrientation,
  type NavSize,
  type NavSubmenuMode,
  type NavVariant,
} from "./context";

export interface NavProps extends HTMLAttributes<HTMLElement> {
  /** Override the root tag. Defaults to the semantic `<nav>` landmark. */
  as?: ElementType;
  /**
   * Layout direction. `vertical` stacks items top-to-bottom (sidebar style);
   * `horizontal` runs them left-to-right (menubar style). Default `vertical`.
   */
  orientation?: NavOrientation;
  /**
   * How submenus appear by default. `inline` expands in-place (accordion),
   * `popover` floats them (dropdown). Each `<NavItem>` can override per-item.
   * When omitted, defaults to `popover` for horizontal nav and `inline` for vertical.
   */
  submenu?: NavSubmenuMode;
  /** Visual style of items. */
  variant?: NavVariant;
  /** Item height ramp. */
  size?: NavSize;
  /**
   * Current route / pathname. When set, `<NavLink>`s with matching `href`
   * auto-receive `aria-current="page"` — no need to pass `active` manually.
   */
  currentPath?: string;
  /**
   * How `currentPath` is compared to each link's `href`. Default `exact`.
   * `startsWith` is convenient for docs-style nested routes.
   */
  matchStrategy?: "exact" | "startsWith";
  /**
   * Rail / icon-only mode. Labels fade to sr-only, badges / chevrons hide, items
   * become square icon buttons, and any item with a submenu forces popover
   * presentation (inline accordion would be nonsensical on a narrow rail).
   */
  collapsed?: boolean;
  ref?: Ref<HTMLElement>;
}

/**
 * Site-navigation landmark. Wraps a tree of `<NavList>` / `<NavItem>` and
 * distributes shared config (orientation, submenu mode, variant, size,
 * current path) via React context.
 *
 * The component uses the W3C-recommended *disclosure* pattern for site nav
 * (plain `<nav>` + `<ul>` + `<a>` / `<button aria-expanded>`), not the
 * application-menu pattern (`role="menubar"`). Assistive tech announces it
 * as a navigation landmark, not an app menu.
 */
export function Nav({
  as: Tag = "nav",
  orientation = "vertical",
  submenu,
  variant = "ghost",
  size = "md",
  currentPath,
  matchStrategy = "exact",
  collapsed = false,
  className,
  children,
  ref,
  "aria-label": ariaLabel,
  ...rest
}: NavProps) {
  // If the caller didn't pick a submenu mode, choose a sensible default
  // based on orientation. Inline for sidebars, popover for menubars.
  const resolvedSubmenu: NavSubmenuMode =
    submenu ?? (orientation === "horizontal" ? "popover" : "inline");

  const contextValue = useMemo<NavContextValue>(
    () => ({
      orientation,
      submenuMode: resolvedSubmenu,
      variant,
      size,
      currentPath,
      matchStrategy,
      collapsed,
    }),
    [
      orientation,
      resolvedSubmenu,
      variant,
      size,
      currentPath,
      matchStrategy,
      collapsed,
    ],
  );

  return (
    <NavContext.Provider value={contextValue}>
      <Tag
        ref={ref}
        className={cn("vds-nav", className)}
        data-orientation={orientation}
        data-variant={variant === "ghost" ? undefined : variant}
        data-size={size === "md" ? undefined : size}
        data-submenu={resolvedSubmenu}
        data-collapsed={collapsed ? "true" : undefined}
        aria-label={ariaLabel ?? "Navigation"}
        {...rest}
      >
        {children}
      </Tag>
    </NavContext.Provider>
  );
}
