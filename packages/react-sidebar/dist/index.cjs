"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/Sidebar.tsx
var SidebarContext = react.createContext(null);
function useSidebar() {
  const ctx = react.useContext(SidebarContext);
  if (!ctx) {
    throw new Error(
      "useSidebar(): must be used inside a <Sidebar> element."
    );
  }
  return ctx;
}
function useSidebarOptional() {
  return react.useContext(SidebarContext);
}
function isEditableTarget(target) {
  if (!target || !(target instanceof Element)) return false;
  const tag = target.tagName;
  if (tag === "TEXTAREA") return true;
  if (tag === "INPUT") {
    const type = target.type.toLowerCase();
    const nonText = /* @__PURE__ */ new Set([
      "button",
      "submit",
      "reset",
      "checkbox",
      "radio",
      "color",
      "file",
      "image",
      "range",
      "hidden"
    ]);
    return !nonText.has(type);
  }
  if (target.isContentEditable) return true;
  return false;
}
function Sidebar({
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
}) {
  const isControlled = collapsedProp !== void 0;
  const [internalCollapsed, setInternalCollapsed] = react.useState(defaultCollapsed);
  const collapsed = isControlled ? collapsedProp : internalCollapsed;
  const setCollapsed = react.useCallback(
    (next) => {
      if (!collapsible) return;
      if (!isControlled) setInternalCollapsed(next);
      onCollapsedChange?.(next);
    },
    [collapsible, isControlled, onCollapsedChange]
  );
  const toggle = react.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);
  react.useEffect(() => {
    if (!shortcut || !collapsible) return;
    if (typeof document === "undefined") return;
    const expected = `Key${shortcutKey.toUpperCase()}`;
    const handleKeydown = (e) => {
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
  const ctxValue = react.useMemo(
    () => ({ collapsed, toggle, setCollapsed, collapsible, side }),
    [collapsed, toggle, setCollapsed, collapsible, side]
  );
  const mergedStyle = {
    ...style,
    ["--sidebar-sticky-offset"]: stickyOffset
  };
  if (inlineSize) {
    mergedStyle["--sidebar-width"] = inlineSize;
  }
  if (railSize) {
    mergedStyle["--sidebar-rail"] = railSize;
  }
  if (blockSize) {
    mergedStyle["--sidebar-block-size"] = blockSize;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(SidebarContext.Provider, { value: ctxValue, children: /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-sidebar", className),
      "data-mode": mode,
      "data-side": side,
      "data-size": size,
      "data-background": background === "surface" ? void 0 : background,
      "data-bordered": bordered ? void 0 : "false",
      "data-collapsed": collapsed ? "true" : void 0,
      "data-collapsible": collapsible ? void 0 : "false",
      style: mergedStyle,
      ...rest,
      children
    }
  ) });
}
function SidebarHeader({
  as: Tag = "header",
  className,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-sidebar__header", className),
      ...rest
    }
  );
}
function SidebarBody({
  as: Tag = "div",
  className,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-sidebar__body", className),
      ...rest
    }
  );
}
function SidebarFooter({
  as: Tag = "footer",
  className,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-sidebar__footer", className),
      ...rest
    }
  );
}
function SidebarSeparator({
  as: Tag = "hr",
  className,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-sidebar__separator", className),
      role: "separator",
      "aria-orientation": "horizontal",
      ...rest
    }
  );
}
function ChevronIcon() {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      className: "vds-sidebar-trigger__chevron",
      viewBox: "0 0 16 16",
      width: "16",
      height: "16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M10 4 6 8l4 4" })
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  children,
  expandLabel = "Expand sidebar",
  collapseLabel = "Collapse sidebar",
  "aria-label": ariaLabelProp,
  type,
  disabled: disabledProp,
  ref,
  ...rest
}) {
  const ctx = useSidebarOptional();
  const collapsed = ctx?.collapsed ?? false;
  const collapsible = ctx?.collapsible ?? false;
  const disabled = disabledProp || !ctx || !collapsible;
  const label = ariaLabelProp ?? (collapsed ? expandLabel : collapseLabel);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type: type ?? "button",
      className: utils.cn("vds-sidebar-trigger", className),
      "data-collapsed": collapsed ? "true" : void 0,
      "aria-expanded": !collapsed,
      "aria-controls": void 0,
      "aria-label": label,
      disabled,
      onClick: (e) => {
        if (!disabled) ctx?.toggle();
        onClick?.(e);
      },
      ...rest,
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx(ChevronIcon, {})
    }
  );
}

exports.Sidebar = Sidebar;
exports.SidebarBody = SidebarBody;
exports.SidebarFooter = SidebarFooter;
exports.SidebarHeader = SidebarHeader;
exports.SidebarSeparator = SidebarSeparator;
exports.SidebarTrigger = SidebarTrigger;
exports.useSidebar = useSidebar;
exports.useSidebarOptional = useSidebarOptional;
