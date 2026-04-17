'use strict';

var utils = require('@virtari/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Stack.tsx
function Stack({
  as: Tag = "div",
  gap,
  recursive,
  className,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-stack", className),
      "data-gap": gap,
      "data-recursive": recursive || void 0,
      ...rest
    }
  );
}
function Cluster({
  as: Tag = "div",
  gap,
  align,
  justify,
  className,
  ref,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-cluster", className),
      "data-gap": gap,
      "data-align": align,
      "data-justify": justify,
      ...rest
    }
  );
}
function Grid({
  as: Tag = "div",
  gap,
  minItemWidth,
  className,
  style,
  ref,
  ...rest
}) {
  const mergedStyle = minItemWidth ? { ...style, ["--vds-grid-min-item-width"]: minItemWidth } : style;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-grid", className),
      "data-gap": gap,
      style: mergedStyle,
      ...rest
    }
  );
}
function Sidebar({
  as: Tag = "div",
  side,
  sideWidth,
  contentMin,
  gap,
  className,
  style,
  ref,
  ...rest
}) {
  const mergedStyle = { ...style };
  if (sideWidth) {
    mergedStyle["--vds-sidebar-side-width"] = sideWidth;
  }
  if (contentMin) {
    mergedStyle["--vds-sidebar-content-min"] = contentMin;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-sidebar", className),
      "data-side": side,
      "data-gap": gap,
      style: mergedStyle,
      ...rest
    }
  );
}
function Center({
  as: Tag = "div",
  maxWidth,
  gutter,
  intrinsic,
  maxInlineSize,
  className,
  style,
  ref,
  ...rest
}) {
  const mergedStyle = maxInlineSize ? { ...style, ["--vds-center-max-width"]: maxInlineSize } : style;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-center", className),
      "data-max-width": maxWidth,
      "data-gutter": gutter,
      "data-intrinsic": intrinsic || void 0,
      style: mergedStyle,
      ...rest
    }
  );
}

exports.Center = Center;
exports.Cluster = Cluster;
exports.Grid = Grid;
exports.Sidebar = Sidebar;
exports.Stack = Stack;
