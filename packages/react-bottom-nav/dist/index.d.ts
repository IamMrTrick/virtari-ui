import * as react from 'react';
import { HTMLAttributes, ElementType, Ref, ReactNode, ButtonHTMLAttributes } from 'react';

type BottomNavVariant = "material" | "ios" | "floating" | "underline";
type BottomNavSize = "sm" | "md" | "lg";
type BottomNavMatchStrategy = "exact" | "startsWith";

type BottomNavPosition = "fixed" | "sticky" | "static";
interface BottomNavProps extends HTMLAttributes<HTMLElement> {
    /** Custom root tag. Defaults to the semantic `<nav>` landmark. */
    as?: ElementType;
    /** Visual style. */
    variant?: BottomNavVariant;
    /** Height ramp. All sizes meet the 44px touch minimum. */
    size?: BottomNavSize;
    /** CSS positioning. Default `"fixed"` — pins to the viewport bottom. */
    position?: BottomNavPosition;
    /**
     * Current app route / pathname. When matched against an item's `href`,
     * that item auto-receives `aria-current="page"` and `data-active="true"`.
     */
    currentPath?: string;
    /** How `currentPath` is compared to each item's `href`. Default `"exact"`. */
    matchStrategy?: BottomNavMatchStrategy;
    /**
     * Respect iOS home-bar safe-area inset. When `true` (default), the bar
     * adds `env(safe-area-inset-bottom)` to its block-end padding.
     */
    safeArea?: boolean;
    /**
     * When `true`, the bar translates out on scroll-down and returns on
     * scroll-up. Respects `prefers-reduced-motion`. Default `false`.
     */
    autoHide?: boolean;
    /**
     * Slide a shared-element indicator between items on active change.
     * Applies to `"material"` and `"underline"` variants. Default `true`.
     */
    animatedIndicator?: boolean;
    /**
     * Adds a drop shadow. Ignored for `"floating"` which is always elevated.
     */
    elevated?: boolean;
    /**
     * Carve a rounded arc out of the bar behind a centre FAB.
     * Set to `true` when you render `<BottomNavFab>` between items.
     */
    notch?: boolean;
    /** Controlled hidden state — overrides `autoHide`. */
    hidden?: boolean;
    ref?: Ref<HTMLElement>;
}
/**
 * Mobile bottom-navigation bar. Composes `<BottomNavItem>` children and an
 * optional `<BottomNavFab>`. All styling flows from CSS custom properties
 * declared in `BottomNav.tokens.css`; override any knob at call-site.
 */
declare const BottomNav: react.ForwardRefExoticComponent<Omit<BottomNavProps, "ref"> & react.RefAttributes<HTMLElement>>;

interface BottomNavItemProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    /** Renders the item as an <a> when set; otherwise a <button>. */
    href?: string;
    /** Render as child element (polymorphic via Radix Slot). */
    asChild?: boolean;
    /** The tab's glyph — required. */
    icon: ReactNode;
    /** The tab's text label. */
    label?: ReactNode;
    /** Notification badge. `true` → dot, `number` → count pill, node → custom. */
    badge?: ReactNode | number | boolean;
    /** Override `currentPath` matching — force active state. */
    active?: boolean;
    /** Visually mutes and blocks clicks. */
    disabled?: boolean;
    /** Anchor-only: window target. */
    target?: string;
    /** Anchor-only: rel attribute. */
    rel?: string;
    /** Anchor-only: filename for download links. */
    download?: string | boolean;
    children?: ReactNode;
}
/**
 * A single tab in the BottomNav. Renders as `<a>` when `href` is set,
 * otherwise as `<button type="button">`. Auto-activates via the parent
 * `currentPath` + `matchStrategy`; pass `active` to override.
 */
declare const BottomNavItem: react.ForwardRefExoticComponent<BottomNavItemProps & react.RefAttributes<HTMLElement>>;

type BottomNavFabColor = "primary" | "accent" | "success";
interface BottomNavFabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
declare const BottomNavFab: react.ForwardRefExoticComponent<BottomNavFabProps & react.RefAttributes<HTMLButtonElement>>;

interface BottomNavBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** Render as a dot (no number) when `true`. */
    dot?: boolean;
    /** Numeric count. Values above `max` are shown as `${max}+`. */
    count?: number;
    /** Upper bound before the "+" overflow marker. Default 99. */
    max?: number;
    /** Custom content (overrides count/dot rendering). */
    children?: ReactNode;
}
/**
 * Notification badge for a BottomNavItem. Two modes:
 *
 * - `dot`: a small colored circle (no content).
 * - `count`: a pill with the number; values > `max` render as "`${max}+`".
 *
 * Passing `children` overrides both and renders the node as-is.
 */
declare const BottomNavBadge: react.ForwardRefExoticComponent<BottomNavBadgeProps & react.RefAttributes<HTMLSpanElement>>;

/**
 * Tracks window scroll direction and returns `true` when the nav should be
 * hidden (user scrolled down past the threshold). Returns `false` when near
 * the top or after any scroll-up.
 *
 * - Listener is rAF-throttled to one update per frame.
 * - Respects `prefers-reduced-motion` by staying visible (no surprise jumps).
 * - SSR-safe: returns `false` until mounted.
 */
declare function useAutoHide(enabled: boolean): boolean;

export { BottomNav, BottomNavBadge, type BottomNavBadgeProps, BottomNavFab, type BottomNavFabColor, type BottomNavFabProps, BottomNavItem, type BottomNavItemProps, type BottomNavMatchStrategy, type BottomNavPosition, type BottomNavProps, type BottomNavSize, type BottomNavVariant, useAutoHide };
