import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, ElementType, Ref, ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type NavOrientation = "vertical" | "horizontal";
type NavSubmenuMode = "inline" | "popover";
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
type NavVariant = "ghost" | "filled" | "pill" | "underline" | "reveal" | "outline" | "lift" | "none" | "dot" | "tab";
type NavSize = "sm" | "md" | "lg";
interface NavContextValue {
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
interface NavSubmenuContextValue {
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
interface FloatingBridge {
    refs: {
        setReference: (el: HTMLElement | null) => void;
        setFloating: (el: HTMLElement | null) => void;
    };
    floatingStyles: React.CSSProperties;
    context: unknown;
    getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>;
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
    isMounted: boolean;
}
/**
 * Match helper used by NavLink to auto-flag `aria-current="page"`.
 * - exact: full-string equality
 * - startsWith: prefix match (useful for nested docs routes, e.g.
 *   `/docs/layout` matches while you're on `/docs/layout/grid`).
 */
declare function isActivePath(href: string | undefined, currentPath: string | undefined, strategy: "exact" | "startsWith"): boolean;

interface NavProps extends HTMLAttributes<HTMLElement> {
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
    /**
     * Vertical tree-guide lines. When `true`, each inline submenu draws a 1px
     * vertical guide from the parent item's icon-centre down through its
     * children — the file-tree look (VS Code, finder). Only affects vertical
     * orientation with inline submenus; no-op for popover / horizontal navs.
     */
    tree?: boolean;
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
declare function Nav({ as: Tag, orientation, submenu, variant, size, currentPath, matchStrategy, collapsed, tree, className, children, ref, "aria-label": ariaLabel, ...rest }: NavProps): react_jsx_runtime.JSX.Element;

interface NavListProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    /** Override the orientation inherited from <Nav> (e.g. a horizontal sub-row in a vertical menubar). */
    orientation?: "vertical" | "horizontal";
    ref?: Ref<HTMLElement>;
}
declare function NavList({ as: Tag, orientation, className, children, ref, ...rest }: NavListProps): react_jsx_runtime.JSX.Element;
interface NavGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Group label displayed above the list. Also used as the accessible name of the `<ul>`. */
    label: React.ReactNode;
    /** Optional explicit id for the label element. */
    labelId?: string;
    /** Render as a wrapper only (omit visible label, keep aria association). */
    hideLabel?: boolean;
    ref?: Ref<HTMLDivElement>;
}
declare function NavGroup({ label, labelId, hideLabel, className, children, ref, ...rest }: NavGroupProps): react_jsx_runtime.JSX.Element;
interface NavSeparatorProps extends HTMLAttributes<HTMLHRElement> {
    ref?: Ref<HTMLHRElement>;
}
declare function NavSeparator({ className, ref, ...rest }: NavSeparatorProps): react_jsx_runtime.JSX.Element;

interface Options {
    mode: NavSubmenuMode;
    orientation: "vertical" | "horizontal";
    /** Controlled `open` state — overrides internal state when provided. */
    open?: boolean;
    /** Notification when open changes (controlled or uncontrolled). */
    onOpenChange?: (open: boolean) => void;
    /** Placement override for popover mode. Defaults: `bottom-start` for horizontal nav, `right-start` for nested popovers in vertical nav. */
    placement?: "top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end";
}
/**
 * Builds the state + (optionally) Floating UI wiring for a NavItem submenu.
 *
 * Always returns a fully-formed `NavSubmenuContextValue`. In `inline` mode
 * the `floating` bridge is `null`; in `popover` mode it carries the refs,
 * style and interaction getters produced by `@floating-ui/react`.
 *
 * Floating UI hooks are called unconditionally (rules of hooks). When mode
 * is `inline` we simply don't attach the refs — the positioning work is
 * idle and free.
 */
declare function useSubmenu({ mode, orientation, open: openProp, onOpenChange, placement, }: Options): NavSubmenuContextValue;

interface NavIconProps extends HTMLAttributes<HTMLSpanElement> {
    asChild?: boolean;
    ref?: Ref<HTMLSpanElement>;
}
declare function NavIcon({ asChild, className, ref, ...rest }: NavIconProps): react_jsx_runtime.JSX.Element;
interface NavLabelProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>;
}
declare function NavLabel({ className, ref, ...rest }: NavLabelProps): react_jsx_runtime.JSX.Element;
interface NavBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    ref?: Ref<HTMLSpanElement>;
}
declare function NavBadge({ className, ref, ...rest }: NavBadgeProps): react_jsx_runtime.JSX.Element;
interface NavKbdProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>;
}
declare function NavKbd({ className, ref, ...rest }: NavKbdProps): react_jsx_runtime.JSX.Element;
interface NavChevronProps extends HTMLAttributes<SVGElement> {
}
declare function NavChevron({ className, ...rest }: NavChevronProps): react_jsx_runtime.JSX.Element;
interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> {
    asChild?: boolean;
    /** Manually force active state (overrides auto-match). */
    active?: boolean;
    /** Disabled state — sets aria-disabled + removes pointer events. */
    disabled?: boolean;
    ref?: Ref<HTMLAnchorElement>;
}
declare function NavLink({ asChild, active, disabled, href, className, onClick, children, ref, ...rest }: NavLinkProps): react_jsx_runtime.JSX.Element;
interface NavTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
    asChild?: boolean;
    /** Visual active state (e.g. one of its descendants is the current page). */
    active?: boolean;
    ref?: Ref<HTMLButtonElement>;
}
declare function NavTrigger({ asChild, active, disabled, className, type, children, ref, ...rest }: NavTriggerProps): react_jsx_runtime.JSX.Element;
interface NavItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "children"> {
    href?: string;
    label?: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    kbd?: ReactNode;
    /** When provided, item renders with a disclosure trigger and this submenu content. */
    submenu?: ReactNode;
    /** Per-item submenu mode override — defaults to Nav's `submenu` setting. */
    submenuMode?: NavSubmenuMode;
    /** Controlled open state for the submenu (advanced). */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Floating placement (popover mode). */
    placement?: Parameters<typeof useSubmenu>[0]["placement"];
    active?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    ref?: Ref<HTMLLIElement>;
}
declare function NavItem({ href, label, icon, badge, kbd, submenu, submenuMode, open, onOpenChange, placement, active, disabled, className, children, ref, ...rest }: NavItemProps): react_jsx_runtime.JSX.Element;

interface NavSubmenuProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function NavSubmenu({ className, style, children, ref, ...rest }: NavSubmenuProps): react_jsx_runtime.JSX.Element | null;
interface NavMegaProps extends HTMLAttributes<HTMLDivElement> {
    /** Number of columns in the mega grid. Default 3. */
    columns?: number;
    /** Anchor to the trigger (popover, default) or pin to the viewport edges (full-bleed). */
    layout?: "popover" | "full-bleed";
    ref?: Ref<HTMLDivElement>;
}
declare function NavMega({ columns, layout, className, style, children, ref, ...rest }: NavMegaProps): react_jsx_runtime.JSX.Element | null;
interface NavMegaSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Section heading rendered as a small uppercase label. */
    heading?: ReactNode;
    ref?: Ref<HTMLDivElement>;
}
declare function NavMegaSection({ heading, className, children, ref, ...rest }: NavMegaSectionProps): react_jsx_runtime.JSX.Element;

export { Nav, NavBadge, type NavBadgeProps, NavChevron, type NavChevronProps, type NavContextValue, NavGroup, type NavGroupProps, NavIcon, type NavIconProps, NavItem, type NavItemProps, NavKbd, type NavKbdProps, NavLabel, type NavLabelProps, NavLink, type NavLinkProps, NavList, type NavListProps, NavMega, type NavMegaProps, NavMegaSection, type NavMegaSectionProps, type NavOrientation, type NavProps, NavSeparator, type NavSeparatorProps, type NavSize, NavSubmenu, type NavSubmenuMode, type NavSubmenuProps, NavTrigger, type NavTriggerProps, type NavVariant, isActivePath };
