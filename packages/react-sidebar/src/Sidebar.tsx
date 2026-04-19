import { cn } from "@virtari/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from "react";

/* ── Types ── */

export type SidebarMode = "full-height" | "below-header";
export type SidebarSide = "start" | "end";
export type SidebarSize = "sm" | "md" | "lg" | "xl";
export type SidebarBackground = "none" | "surface" | "subtle" | "muted";

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

const SidebarContext = createContext<SidebarContextValue | null>(null);

/** Hook for external control of the sidebar's collapsed state. Must be used inside <Sidebar>. */
export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error(
      "useSidebar(): must be used inside a <Sidebar> element."
    );
  }
  return ctx;
}

/** Read-only context accessor — returns `null` outside a Sidebar (for optional triggers). */
export function useSidebarOptional(): SidebarContextValue | null {
  return useContext(SidebarContext);
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
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
 * Returns true when the keyboard event's target is a text-editable element
 * (INPUT of a text-y type, TEXTAREA, or any descendant of a contenteditable
 * region). Buttons / checkboxes / radios etc. are NOT considered editable —
 * the shortcut should still fire when focus is on those.
 */
function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || !(target instanceof Element)) return false;
  const tag = target.tagName;

  if (tag === "TEXTAREA") return true;

  if (tag === "INPUT") {
    const type = (target as HTMLInputElement).type.toLowerCase();
    const nonText = new Set([
      "button",
      "submit",
      "reset",
      "checkbox",
      "radio",
      "color",
      "file",
      "image",
      "range",
      "hidden",
    ]);
    return !nonText.has(type);
  }

  // `isContentEditable` walks the tree, catching both `contenteditable="true"`
  // on the target itself and inherited values from an ancestor.
  if ((target as HTMLElement).isContentEditable) return true;

  return false;
}

/**
 * App-chrome sidebar. Renders an `<aside>` landmark by default.
 *
 * Comes with `<SidebarHeader>`, `<SidebarBody>`, `<SidebarFooter>`,
 * `<SidebarSeparator>` and `<SidebarTrigger>` sub-parts plus a
 * `useSidebar()` hook for external collapse control.
 */
export function Sidebar({
  as: Tag = "aside",
  mode = "full-height",
  side = "start",
  size,
  inlineSize,
  railSize,
  blockSize,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsible = true,
  stickyOffset = "0px",
  background = "surface",
  bordered = true,
  shortcut = true,
  shortcutKey = "b",
  onShortcut,
  onShortcutBlocked,
  className,
  style,
  children,
  ref,
  ...rest
}: SidebarProps) {
  const isControlled = collapsedProp !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const collapsed = isControlled ? collapsedProp : internalCollapsed;

  const setCollapsed = useCallback<(next: boolean) => void>(
    (next) => {
      if (!collapsible) return;
      if (!isControlled) setInternalCollapsed(next);
      onCollapsedChange?.(next);
    },
    [collapsible, isControlled, onCollapsedChange]
  );

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  /**
   * Global keyboard shortcut — toggles the sidebar on `Ctrl+B` (Win/Linux)
   * or `Cmd+B` (macOS). Uses `event.code` ("KeyB") so the shortcut keeps
   * working when the physical B key produces a non-Latin character on
   * Farsi / Arabic / Cyrillic / etc. layouts.
   *
   * Suppressed while focus is on an editable element — wire
   * `onShortcutBlocked` to show a toast explaining the suppression.
   */
  useEffect(() => {
    if (!shortcut || !collapsible) return;
    if (typeof document === "undefined") return;

    const expected = `Key${shortcutKey.toUpperCase()}`;

    const handleKeydown = (e: KeyboardEvent) => {
      const modifier = e.ctrlKey || e.metaKey;
      if (!modifier) return;
      if (e.altKey || e.shiftKey) return;
      if (e.code !== expected) return;

      if (isEditableTarget(e.target)) {
        onShortcutBlocked?.(e);
        return;
      }

      e.preventDefault();
      toggle();
      onShortcut?.(e);
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [shortcut, shortcutKey, collapsible, toggle, onShortcut, onShortcutBlocked]);

  const ctxValue = useMemo<SidebarContextValue>(
    () => ({ collapsed, toggle, setCollapsed, collapsible, side }),
    [collapsed, toggle, setCollapsed, collapsible, side]
  );

  const mergedStyle: CSSProperties = {
    ...style,
    ["--sidebar-sticky-offset" as string]: stickyOffset,
  };
  if (inlineSize) {
    (mergedStyle as Record<string, string>)["--sidebar-width"] = inlineSize;
  }
  if (railSize) {
    (mergedStyle as Record<string, string>)["--sidebar-rail"] = railSize;
  }
  if (blockSize) {
    (mergedStyle as Record<string, string>)["--sidebar-block-size"] = blockSize;
  }

  return (
    <SidebarContext.Provider value={ctxValue}>
      <Tag
        ref={ref}
        className={cn("vds-sidebar", className)}
        data-mode={mode}
        data-side={side}
        data-size={size}
        data-background={background === "surface" ? undefined : background}
        data-bordered={bordered ? undefined : "false"}
        data-collapsed={collapsed ? "true" : undefined}
        data-collapsible={collapsible ? undefined : "false"}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Tag>
    </SidebarContext.Provider>
  );
}
