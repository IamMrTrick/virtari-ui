import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, ElementType, Ref, ButtonHTMLAttributes, ReactNode } from 'react';

type SidebarMode = "full-height" | "below-header";
type SidebarSide = "start" | "end";
type SidebarSize = "sm" | "md" | "lg" | "xl";
type SidebarBackground = "none" | "surface" | "subtle" | "muted";
interface SidebarContextValue {
    /** Current collapsed state. */
    collapsed: boolean;
    /** Toggle collapsed ↔ expanded. */
    toggle: () => void;
    /** Set collapsed state explicitly. */
    setCollapsed: (collapsed: boolean) => void;
    /** Whether collapse is allowed (when `false`, Trigger becomes inert). */
    collapsible: boolean;
    /** Side prop value — lets triggers reverse their chevron in RTL/end mode. */
    side: SidebarSide;
}
/** Hook for external control of the sidebar's collapsed state. Must be used inside <Sidebar>. */
declare function useSidebar(): SidebarContextValue;
/** Read-only context accessor — returns `null` outside a Sidebar (for optional triggers). */
declare function useSidebarOptional(): SidebarContextValue | null;
interface SidebarProps extends HTMLAttributes<HTMLElement> {
    /** Override root tag. Default `"aside"` (complementary landmark). Set to `"nav"` when this IS the primary navigation — remember to also pass `aria-label`. */
    as?: ElementType;
    /**
     * Layout mode:
     * - `"full-height"` (default): sidebar spans the whole viewport height and sits *beside* the header.
     * - `"below-header"`: sidebar starts below a sticky header — pair with `stickyOffset` equal to the header's height.
     */
    mode?: SidebarMode;
    /** Which edge the sidebar is anchored to. Logical: `"start"` = inline-start (LTR left, RTL right). */
    side?: SidebarSide;
    /** Width preset (expanded). */
    size?: SidebarSize;
    /** Arbitrary expanded width (wins over `size`). Any CSS length. */
    inlineSize?: string;
    /** Arbitrary rail width (collapsed state). Any CSS length. */
    railSize?: string;
    /**
     * Override the block-size (height). Defaults to `100svh` in `full-height`
     * mode, or `calc(100svh - stickyOffset)` in `below-header` mode. Useful for
     * embedding the sidebar inside a panel / demo frame with a fixed height.
     */
    blockSize?: string;
    /** Controlled collapsed state. */
    collapsed?: boolean;
    /** Initial collapsed state for uncontrolled use. */
    defaultCollapsed?: boolean;
    /** Fires on collapse/expand transitions. */
    onCollapsedChange?: (collapsed: boolean) => void;
    /** When `false`, the `<SidebarTrigger>` renders disabled and `toggle()` is a no-op. Default `true`. */
    collapsible?: boolean;
    /** Top sticky offset (for `mode="below-header"`). Any CSS length — usually the header's total height. Default `"0px"`. */
    stickyOffset?: string;
    /** Surface background preset. */
    background?: SidebarBackground;
    /** Show the inline-end border (or inline-start in `side="end"`). Default `true`. */
    bordered?: boolean;
    /**
     * Enable the global `Ctrl+B` / `Cmd+B` keyboard shortcut that toggles the
     * sidebar. Default `true`. The mapping uses `KeyboardEvent.code` so it's
     * layout-independent — works on Farsi, Arabic, Cyrillic, etc. keyboards
     * without producing a different symbol from the physical key. Disabled
     * automatically when `collapsible` is `false`.
     */
    shortcut?: boolean;
    /**
     * Physical key that combines with `Ctrl`/`Cmd` for the shortcut. Uses the
     * lowercase letter name that `event.code` exposes — e.g. `"b"` becomes
     * `"KeyB"`. Default `"b"`.
     */
    shortcutKey?: string;
    /** Fired when the shortcut successfully toggles the sidebar. */
    onShortcut?: (e: KeyboardEvent) => void;
    /**
     * Fired when the shortcut is pressed but focus is on an editable element
     * (input / textarea / contenteditable). The toggle is suppressed — wire
     * this callback to surface a toast / inline message telling the user why
     * nothing happened.
     */
    onShortcutBlocked?: (e: KeyboardEvent) => void;
    ref?: Ref<HTMLElement>;
}
/**
 * App-chrome sidebar. Renders an `<aside>` landmark by default.
 *
 * Comes with `<SidebarHeader>`, `<SidebarBody>`, `<SidebarFooter>`,
 * `<SidebarSeparator>` and `<SidebarTrigger>` sub-parts plus a
 * `useSidebar()` hook for external collapse control.
 */
declare function Sidebar({ as: Tag, mode, side, size, inlineSize, railSize, blockSize, collapsed: collapsedProp, defaultCollapsed, onCollapsedChange, collapsible, stickyOffset, background, bordered, shortcut, shortcutKey, onShortcut, onShortcutBlocked, className, style, children, ref, ...rest }: SidebarProps): react_jsx_runtime.JSX.Element;

interface SidebarHeaderProps extends HTMLAttributes<HTMLElement> {
    /** Override default tag `"header"`. */
    as?: ElementType;
    ref?: Ref<HTMLElement>;
}
declare function SidebarHeader({ as: Tag, className, ref, ...rest }: SidebarHeaderProps): react_jsx_runtime.JSX.Element;
interface SidebarBodyProps extends HTMLAttributes<HTMLElement> {
    /** Override default tag. `"div"` by default; pass `"nav"` + `aria-label` when body IS the nav. */
    as?: ElementType;
    ref?: Ref<HTMLElement>;
}
declare function SidebarBody({ as: Tag, className, ref, ...rest }: SidebarBodyProps): react_jsx_runtime.JSX.Element;
interface SidebarFooterProps extends HTMLAttributes<HTMLElement> {
    /** Override default tag `"footer"`. */
    as?: ElementType;
    ref?: Ref<HTMLElement>;
}
declare function SidebarFooter({ as: Tag, className, ref, ...rest }: SidebarFooterProps): react_jsx_runtime.JSX.Element;
interface SidebarSeparatorProps extends HTMLAttributes<HTMLElement> {
    /** Override default tag `"hr"`. */
    as?: ElementType;
    ref?: Ref<HTMLElement>;
}
declare function SidebarSeparator({ as: Tag, className, ref, ...rest }: SidebarSeparatorProps): react_jsx_runtime.JSX.Element;

interface SidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Custom icon. When omitted a built-in chevron is used; the chevron rotates
     * based on `side` and the collapsed state so it always points toward the
     * direction the sidebar will collapse into.
     */
    children?: ReactNode;
    /**
     * Accessible label. Default: "Collapse sidebar" / "Expand sidebar" depending on state.
     * Override for localization.
     */
    expandLabel?: string;
    collapseLabel?: string;
    ref?: Ref<HTMLButtonElement>;
}
/**
 * Collapse/expand toggle. Reads the current state from the nearest
 * <Sidebar> via context — if rendered outside a Sidebar, the button is
 * inert (useful for placing a placeholder trigger in a shell that may or
 * may not have a sidebar mounted).
 */
declare function SidebarTrigger({ className, onClick, children, expandLabel, collapseLabel, "aria-label": ariaLabelProp, type, disabled: disabledProp, ref, ...rest }: SidebarTriggerProps): react_jsx_runtime.JSX.Element;

export { Sidebar, type SidebarBackground, SidebarBody, type SidebarBodyProps, SidebarFooter, type SidebarFooterProps, SidebarHeader, type SidebarHeaderProps, type SidebarMode, type SidebarProps, SidebarSeparator, type SidebarSeparatorProps, type SidebarSide, type SidebarSize, SidebarTrigger, type SidebarTriggerProps, useSidebar, useSidebarOptional };
