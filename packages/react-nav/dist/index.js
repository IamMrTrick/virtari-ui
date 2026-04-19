"use client";
import { cn } from '@virtari/utils';
import { createContext, useMemo, useCallback, useContext, useId, useState, useRef } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Slot } from '@radix-ui/react-slot';
import { FloatingPortal, FloatingFocusManager, useFloating, autoUpdate, offset, flip, shift, useClick, useDismiss, useInteractions } from '@floating-ui/react';

// src/Nav.tsx
var NAV_DEFAULT = {
  orientation: "vertical",
  submenuMode: "inline",
  variant: "ghost",
  size: "md",
  matchStrategy: "exact",
  collapsed: false
};
var NavContext = createContext(NAV_DEFAULT);
function useNavContext() {
  return useContext(NavContext);
}
var NavLevelContext = createContext(0);
function useNavLevel() {
  return useContext(NavLevelContext);
}
var NavSubmenuContext = createContext(
  null
);
function useNavSubmenuContext() {
  return useContext(NavSubmenuContext);
}
function isActivePath(href, currentPath, strategy) {
  if (!href || !currentPath) return false;
  if (strategy === "exact") return href === currentPath;
  if (currentPath === href) return true;
  const normalized = href.endsWith("/") ? href : `${href}/`;
  return currentPath.startsWith(normalized);
}
function Nav({
  as: Tag = "nav",
  orientation = "vertical",
  submenu,
  variant = "ghost",
  size = "md",
  currentPath,
  matchStrategy = "exact",
  collapsed = false,
  tree = false,
  className,
  children,
  ref,
  "aria-label": ariaLabel,
  ...rest
}) {
  const resolvedSubmenu = submenu ?? (orientation === "horizontal" ? "popover" : "inline");
  const contextValue = useMemo(
    () => ({
      orientation,
      submenuMode: resolvedSubmenu,
      variant,
      size,
      currentPath,
      matchStrategy,
      collapsed
    }),
    [
      orientation,
      resolvedSubmenu,
      variant,
      size,
      currentPath,
      matchStrategy,
      collapsed
    ]
  );
  return /* @__PURE__ */ jsx(NavContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn("vds-nav", className),
      "data-orientation": orientation,
      "data-variant": variant === "ghost" ? void 0 : variant,
      "data-size": size === "md" ? void 0 : size,
      "data-submenu": resolvedSubmenu,
      "data-collapsed": collapsed ? "true" : void 0,
      "data-tree": tree ? "true" : void 0,
      "aria-label": ariaLabel ?? "Navigation",
      ...rest,
      children
    }
  ) });
}
function NavList({
  as: Tag = "ul",
  orientation,
  className,
  children,
  ref,
  ...rest
}) {
  const level = useNavLevel();
  const { orientation: ctxOrientation } = useNavContext();
  const resolvedOrientation = orientation ?? ctxOrientation;
  return /* @__PURE__ */ jsx(NavLevelContext.Provider, { value: level + 1, children: /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cn("vds-nav__list", className),
      "data-orientation": resolvedOrientation,
      "data-level": level,
      ...rest,
      children
    }
  ) });
}
var groupIdCounter = 0;
function useGroupLabelId(explicit) {
  if (explicit) return explicit;
  return `vds-nav-group-${groupIdCounter++}`;
}
function NavGroup({
  label,
  labelId,
  hideLabel,
  className,
  children,
  ref,
  ...rest
}) {
  const id = useGroupLabelId(labelId);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("vds-nav__group", className),
      role: "group",
      "aria-labelledby": id,
      ...rest,
      children: [
        hideLabel ? /* @__PURE__ */ jsx(
          "span",
          {
            id,
            style: {
              position: "absolute",
              width: 1,
              height: 1,
              margin: -1,
              padding: 0,
              overflow: "hidden",
              clip: "rect(0 0 0 0)",
              whiteSpace: "nowrap",
              border: 0
            },
            children: label
          }
        ) : /* @__PURE__ */ jsx("span", { id, className: "vds-nav__group-label", children: label }),
        children
      ]
    }
  );
}
function NavSeparator({
  className,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "hr",
    {
      ref,
      className: cn("vds-nav__separator", className),
      role: "separator",
      "aria-orientation": "horizontal",
      ...rest
    }
  );
}
function useSubmenu({
  mode,
  orientation,
  open: openProp,
  onOpenChange,
  placement
}) {
  const id = useId();
  const [uncontrolled, setUncontrolled] = useState(false);
  const triggerRef = useRef(null);
  const open = openProp ?? uncontrolled;
  const setOpen = useCallback(
    (next) => {
      if (openProp == null) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );
  const resolvedPlacement = placement ?? (orientation === "horizontal" ? "bottom-start" : "right-start");
  const floatingState = useFloating({
    open,
    onOpenChange: setOpen,
    placement: resolvedPlacement,
    strategy: "fixed",
    middleware: [offset(6), flip({ padding: 8 }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate
  });
  const click = useClick(floatingState.context, {
    // Space / Enter on the trigger + click both toggle.
    keyboardHandlers: true
  });
  const dismiss = useDismiss(floatingState.context, {
    enabled: mode === "popover",
    escapeKey: true,
    outsidePress: true
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss
  ]);
  const bridge = mode === "popover" ? {
    refs: {
      setReference: (el) => {
        floatingState.refs.setReference(el);
        triggerRef.current = el;
      },
      setFloating: floatingState.refs.setFloating
    },
    floatingStyles: floatingState.floatingStyles,
    context: floatingState.context,
    getReferenceProps,
    getFloatingProps,
    isMounted: open
  } : null;
  return {
    id: `vds-nav-submenu-${id}`,
    open,
    setOpen,
    mode,
    triggerRef,
    floating: bridge
  };
}
function NavIcon({
  asChild = false,
  className,
  ref,
  ...rest
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("vds-nav__icon", className),
      "aria-hidden": "true",
      ...rest
    }
  );
}
function NavLabel({ className, ref, ...rest }) {
  return /* @__PURE__ */ jsx("span", { ref, className: cn("vds-nav__label", className), ...rest });
}
function NavBadge({ className, ref, ...rest }) {
  return /* @__PURE__ */ jsx("span", { ref, className: cn("vds-nav__badge", className), ...rest });
}
function NavKbd({ className, ref, ...rest }) {
  return /* @__PURE__ */ jsx("kbd", { ref, className: cn("vds-nav__kbd", className), ...rest });
}
function NavChevron({ className, ...rest }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cn("vds-nav__chevron", className),
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      ...rest,
      children: /* @__PURE__ */ jsx("path", { d: "M4 6l4 4 4-4" })
    }
  );
}
function NavLink({
  asChild = false,
  active,
  disabled,
  href,
  className,
  onClick,
  children,
  ref,
  ...rest
}) {
  const { currentPath, matchStrategy } = useNavContext();
  const Comp = asChild ? Slot : "a";
  const autoActive = active ?? isActivePath(href, currentPath, matchStrategy);
  const handleClick = useCallback(
    (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    },
    [disabled, onClick]
  );
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      href: disabled ? void 0 : href,
      className: cn("vds-nav__link", className),
      "aria-current": autoActive ? "page" : void 0,
      "aria-disabled": disabled || void 0,
      "data-active": autoActive || void 0,
      onClick: handleClick,
      ...rest,
      children
    }
  );
}
function NavTrigger({
  asChild = false,
  active,
  disabled,
  className,
  type,
  children,
  ref,
  ...rest
}) {
  const submenu = useNavSubmenuContext();
  const Comp = asChild ? Slot : "button";
  if (!submenu) {
    return /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        type: asChild ? void 0 : type ?? "button",
        className: cn("vds-nav__trigger", className),
        disabled: asChild ? void 0 : disabled,
        "data-active": active || void 0,
        "aria-disabled": disabled || void 0,
        ...rest,
        children
      }
    );
  }
  const { id, open, setOpen, floating } = submenu;
  const referenceProps = floating?.getReferenceProps({
    onClick: () => setOpen(!open)
  }) ?? { onClick: () => setOpen(!open) };
  const mergedRef = (el) => {
    if (floating) floating.refs.setReference(el);
    if (typeof ref === "function") ref(el);
    else if (ref && typeof ref === "object") {
      ref.current = el;
    }
  };
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref: mergedRef,
      type: asChild ? void 0 : type ?? "button",
      className: cn("vds-nav__trigger", className),
      "aria-expanded": open,
      "aria-controls": id,
      "aria-disabled": disabled || void 0,
      disabled: asChild ? void 0 : disabled,
      "data-active": active || void 0,
      ...referenceProps,
      ...rest,
      children
    }
  );
}
function NavItem({
  href,
  label,
  icon,
  badge,
  kbd,
  submenu,
  submenuMode,
  open,
  onOpenChange,
  placement,
  active,
  disabled,
  className,
  children,
  ref,
  ...rest
}) {
  const navCtx = useNavContext();
  const level = useNavLevel();
  const isDeclarative = href != null || label != null || icon != null || badge != null || kbd != null || submenu != null;
  const resolvedMode = navCtx.collapsed ? "popover" : submenuMode ?? navCtx.submenuMode;
  const submenuState = useSubmenu({
    mode: resolvedMode,
    orientation: navCtx.orientation,
    open,
    onOpenChange,
    placement
  });
  const collapsedA11yProps = {};
  if (navCtx.collapsed && typeof label === "string") {
    collapsedA11yProps["aria-label"] = label;
    collapsedA11yProps.title = label;
  }
  const itemContent = isDeclarative ? submenu != null ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(NavTrigger, { active, disabled, ...collapsedA11yProps, children: [
      icon != null && /* @__PURE__ */ jsx(NavIcon, { children: icon }),
      label != null && /* @__PURE__ */ jsx(NavLabel, { children: label }),
      badge != null && /* @__PURE__ */ jsx(NavBadge, { children: badge }),
      kbd != null && /* @__PURE__ */ jsx(NavKbd, { children: kbd }),
      /* @__PURE__ */ jsx(NavChevron, {})
    ] }),
    submenu
  ] }) : /* @__PURE__ */ jsxs(
    NavLink,
    {
      href,
      active,
      disabled,
      ...collapsedA11yProps,
      children: [
        icon != null && /* @__PURE__ */ jsx(NavIcon, { children: icon }),
        label != null && /* @__PURE__ */ jsx(NavLabel, { children: label }),
        badge != null && /* @__PURE__ */ jsx(NavBadge, { children: badge }),
        kbd != null && /* @__PURE__ */ jsx(NavKbd, { children: kbd })
      ]
    }
  ) : children;
  return /* @__PURE__ */ jsx(NavSubmenuContext.Provider, { value: submenuState, children: /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      className: cn("vds-nav__item", className),
      "data-orientation": navCtx.orientation,
      "data-level": level,
      ...rest,
      children: itemContent
    }
  ) });
}
function NavSubmenu({
  className,
  style,
  children,
  ref,
  ...rest
}) {
  const ctx = useNavSubmenuContext();
  if (!ctx) {
    throw new Error(
      "vds-nav: <NavSubmenu> must be rendered inside <NavItem>."
    );
  }
  const { id, open, mode, floating } = ctx;
  if (mode === "inline") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        id,
        className: cn("vds-nav__submenu", className),
        "data-mode": "inline",
        "data-state": open ? "open" : "closed",
        hidden: !open,
        style,
        ...rest,
        children
      }
    );
  }
  if (!open || !floating) return null;
  const mergedStyle = {
    ...floating.floatingStyles,
    ...style
  };
  const floatingProps = floating.getFloatingProps();
  const setFloatingRef = (el) => {
    floating.refs.setFloating(el);
    if (typeof ref === "function") ref(el);
    else if (ref && typeof ref === "object") {
      ref.current = el;
    }
  };
  return /* @__PURE__ */ jsx(FloatingPortal, { children: /* @__PURE__ */ jsx(
    FloatingFocusManager,
    {
      context: floating.context,
      modal: false,
      returnFocus: true,
      initialFocus: -1,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: setFloatingRef,
          id,
          className: cn("vds-nav__submenu", className),
          "data-mode": "popover",
          "data-state": "open",
          style: mergedStyle,
          ...floatingProps,
          ...rest,
          children
        }
      )
    }
  ) });
}
function NavMega({
  columns = 3,
  layout = "popover",
  className,
  style,
  children,
  ref,
  ...rest
}) {
  const ctx = useNavSubmenuContext();
  if (!ctx) {
    throw new Error(
      "vds-nav: <NavMega> must be rendered inside <NavItem>."
    );
  }
  const { id, open, floating } = ctx;
  if (!open || !floating) return null;
  const mergedStyle = {
    ...floating.floatingStyles,
    ...style,
    // @ts-expect-error — custom property passed to CSS
    "--mega-cols": columns,
    ...layout === "full-bleed" ? {
      position: "fixed",
      insetInlineStart: 0,
      insetInlineEnd: 0,
      insetBlockStart: floating.floatingStyles.top,
      transform: void 0,
      inlineSize: "100%"
    } : {}
  };
  const floatingProps = floating.getFloatingProps();
  const setFloatingRef = (el) => {
    floating.refs.setFloating(el);
    if (typeof ref === "function") ref(el);
    else if (ref && typeof ref === "object") {
      ref.current = el;
    }
  };
  return /* @__PURE__ */ jsx(FloatingPortal, { children: /* @__PURE__ */ jsx(
    FloatingFocusManager,
    {
      context: floating.context,
      modal: false,
      returnFocus: true,
      initialFocus: -1,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: setFloatingRef,
          id,
          className: cn("vds-nav__mega", className),
          "data-columns": true,
          "data-layout": layout,
          "data-state": "open",
          style: mergedStyle,
          ...floatingProps,
          ...rest,
          children
        }
      )
    }
  ) });
}
function NavMegaSection({
  heading,
  className,
  children,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("vds-nav__mega-section", className),
      ...rest,
      children: [
        heading != null && /* @__PURE__ */ jsx("span", { className: "vds-nav__mega-section-title", children: heading }),
        children
      ]
    }
  );
}

export { Nav, NavBadge, NavChevron, NavGroup, NavIcon, NavItem, NavKbd, NavLabel, NavLink, NavList, NavMega, NavMegaSection, NavSeparator, NavSubmenu, NavTrigger, isActivePath };
