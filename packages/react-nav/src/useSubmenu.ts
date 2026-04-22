import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import { useCallback, useId, useRef, useState } from "react";
import type {
  FloatingBridge,
  NavSubmenuContextValue,
  NavSubmenuMode,
} from "./context";

interface Options {
  mode: NavSubmenuMode;
  orientation: "vertical" | "horizontal";
  /** Controlled `open` state — overrides internal state when provided. */
  open?: boolean;
  /** Notification when open changes (controlled or uncontrolled). */
  onOpenChange?: (open: boolean) => void;
  /** Placement override for popover mode. Defaults: `bottom-start` for horizontal nav, `right-start` for nested popovers in vertical nav. */
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
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
export function useSubmenu({
  mode,
  orientation,
  open: openProp,
  onOpenChange,
  placement,
}: Options): NavSubmenuContextValue {
  const id = useId();
  const [uncontrolled, setUncontrolled] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = openProp ?? uncontrolled;
  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp == null) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const resolvedPlacement =
    placement ?? (orientation === "horizontal" ? "bottom-start" : "right-start");

  const floatingState = useFloating({
    open,
    onOpenChange: setOpen,
    placement: resolvedPlacement,
    strategy: "fixed",
    middleware: [offset(6), flip({ padding: 8 }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(floatingState.context, {
    // Space / Enter on the trigger + click both toggle.
    keyboardHandlers: true,
  });
  const dismiss = useDismiss(floatingState.context, {
    enabled: mode === "popover",
    escapeKey: true,
    outsidePress: true,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const bridge: FloatingBridge | null =
    mode === "popover"
      ? {
          refs: {
            setReference: (el) => {
              floatingState.refs.setReference(el);
              triggerRef.current = el as HTMLElement | null;
            },
            setFloating: floatingState.refs.setFloating,
          },
          floatingStyles: floatingState.floatingStyles,
          context: floatingState.context,
          getReferenceProps,
          getFloatingProps,
          isMounted: open,
          isPositioned: floatingState.isPositioned,
        }
      : null;

  return {
    id: `vds-nav-submenu-${id}`,
    open,
    setOpen,
    mode,
    triggerRef,
    floating: bridge,
  };
}
