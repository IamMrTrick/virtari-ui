import { createContext, useContext } from "react";

/* ──────────────────────────────────────────────
 * NavContext — global, set once by <Nav>.
 * ────────────────────────────────────────────── */

export type NavOrientation = "vertical" | "horizontal";
export type NavSubmenuMode = "inline" | "popover";
/**
 * Visual treatment of NavLink / NavTrigger.
 *
 * - `ghost`     — minimal bg tint on hover (default).
 * - `filled`    — solid bg block on hover.
 * - `pill`      — fully-rounded bg on hover / current.
 * - `underline` — thin bottom border on current, tints on hover.
 * - `reveal`    — animated underline that grows from the centre on hover.
 * - `outline`   — hollow border ring that fades in on hover.
 * - `lift`      — soft shadow + 1px translate on hover (card-like).
 * - `none`      — no bg, no border, no decoration — just the text colors to
 *                 primary on hover / current. The quietest possible look.
 * - `dot`       — small circular primary indicator below the label.
 * - `tab`       — thick primary bar below the item, top corners rounded.
 *                 Reads as a tab-strip indicator.
 */
export type NavVariant =
  | "ghost"
  | "filled"
  | "pill"
  | "underline"
  | "reveal"
  | "outline"
  | "lift"
  | "none"
  | "dot"
  | "tab";
export type NavSize = "sm" | "md" | "lg";

export interface NavContextValue {
  orientation: NavOrientation;
  submenuMode: NavSubmenuMode;
  variant: NavVariant;
  size: NavSize;
  /** Pathname / key used to auto-mark an item as current when its `href` matches. */
  currentPath?: string;
  /** Exact vs startsWith match against `currentPath`. */
  matchStrategy: "exact" | "startsWith";
  /**
   * Rail / icon-only mode. When `true`:
   *   • Labels, badges, kbd hints and chevrons are visually hidden (labels remain SR-readable).
   *   • Items shrink to a square icon-button shape.
   *   • Submenus force `popover` mode regardless of per-item or nav default — a
   *     collapsed rail can't meaningfully host an inline (accordion) expansion.
   */
  collapsed: boolean;
}

export const NAV_DEFAULT: NavContextValue = {
  orientation: "vertical",
  submenuMode: "inline",
  variant: "ghost",
  size: "md",
  matchStrategy: "exact",
  collapsed: false,
};

export const NavContext = createContext<NavContextValue>(NAV_DEFAULT);

export function useNavContext(): NavContextValue {
  return useContext(NavContext);
}

/* ──────────────────────────────────────────────
 * NavLevelContext — nesting depth for indent + ARIA.
 * Root lists are level 0; each NavSubmenu bumps +1.
 * ────────────────────────────────────────────── */

export const NavLevelContext = createContext<number>(0);

export function useNavLevel(): number {
  return useContext(NavLevelContext);
}

/* ──────────────────────────────────────────────
 * NavSubmenuContext — shared between the trigger
 * and the submenu so they can wire up aria-controls
 * / aria-expanded / focus return without the user
 * having to lift state.
 * ────────────────────────────────────────────── */

export interface NavSubmenuContextValue {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: NavSubmenuMode;
  /** Ref to the trigger button — used to return focus on close in popover mode. */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Floating UI refs / props (only populated in popover mode). */
  floating: FloatingBridge | null;
}

/**
 * Opaque bridge object. Carries just enough from `useFloating` / `useInteractions`
 * so the submenu can render with positioning and dismiss wiring without leaking
 * Floating UI types through the public API.
 */
export interface FloatingBridge {
  refs: {
    setReference: (el: HTMLElement | null) => void;
    setFloating: (el: HTMLElement | null) => void;
  };
  floatingStyles: React.CSSProperties;
  context: unknown;
  getReferenceProps: (
    userProps?: React.HTMLProps<Element>,
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  isMounted: boolean;
}

export const NavSubmenuContext = createContext<NavSubmenuContextValue | null>(
  null,
);

export function useNavSubmenuContext(): NavSubmenuContextValue | null {
  return useContext(NavSubmenuContext);
}

/* ──────────────────────────────────────────────
 * Helpers
 * ────────────────────────────────────────────── */

/**
 * Match helper used by NavLink to auto-flag `aria-current="page"`.
 * - exact: full-string equality
 * - startsWith: prefix match (useful for nested docs routes, e.g.
 *   `/docs/layout` matches while you're on `/docs/layout/grid`).
 */
export function isActivePath(
  href: string | undefined,
  currentPath: string | undefined,
  strategy: "exact" | "startsWith",
): boolean {
  if (!href || !currentPath) return false;
  if (strategy === "exact") return href === currentPath;
  // startsWith: treat trailing slashes loosely so "/foo" matches "/foo/bar" but not "/foobar"
  if (currentPath === href) return true;
  const normalized = href.endsWith("/") ? href : `${href}/`;
  return currentPath.startsWith(normalized);
}
