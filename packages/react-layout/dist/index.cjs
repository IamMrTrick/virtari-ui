'use strict';

var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Section.tsx
function Section({
  as: Tag = "section",
  padding,
  gutter,
  width,
  maxInlineSize,
  contained = true,
  background = "none",
  align,
  gap,
  fullHeight,
  className,
  style,
  children,
  ref,
  ...rest
}) {
  const mergedStyle = maxInlineSize ? { ...style, ["--section-container-width"]: maxInlineSize } : style;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-section", className),
      "data-padding": padding,
      "data-gutter": gutter,
      "data-width": width,
      "data-contained": contained ? void 0 : "false",
      "data-background": background === "none" ? void 0 : background,
      "data-align": align,
      "data-gap": gap,
      "data-full-height": fullHeight ? "true" : void 0,
      style: mergedStyle,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-section__inner", children })
    }
  );
}
function Main({
  id = "main",
  tabIndex = -1,
  padding = "none",
  gutter = "none",
  contained = true,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Section,
    {
      as: "main",
      id,
      tabIndex,
      padding,
      gutter,
      contained,
      className: utils.cn("vds-main", className),
      ...rest
    }
  );
}
function Row({
  as: Tag = "div",
  mode = "grid",
  cols,
  gap,
  colGap,
  rowGap,
  align,
  justify,
  wrap,
  reverse,
  autoFit,
  minColWidth,
  className,
  style,
  ref,
  ...rest
}) {
  const mergedStyle = minColWidth ? { ...style, ["--row-min-col"]: minColWidth } : style;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-row", className),
      "data-mode": mode === "grid" ? void 0 : mode,
      "data-cols": mode === "grid" && !autoFit ? cols : void 0,
      "data-gap": gap,
      "data-col-gap": colGap,
      "data-row-gap": rowGap,
      "data-align": align,
      "data-justify": justify,
      "data-wrap": wrap ? "true" : void 0,
      "data-reverse": reverse ? "true" : void 0,
      "data-auto-fit": autoFit ? "true" : void 0,
      style: mergedStyle,
      ...rest
    }
  );
}
function spanToGridColumn(span) {
  if (span == null) return void 0;
  if (span === "full") return "1 / -1";
  if (span === "auto") return "auto";
  return `span ${span}`;
}
function Col({
  as: Tag = "div",
  span,
  spanSm,
  spanMd,
  spanLg,
  spanXl,
  start,
  order,
  align,
  justify,
  grow,
  shrink,
  basis,
  className,
  style,
  ref,
  ...rest
}) {
  const usesFlexProps = grow != null || shrink != null || basis != null;
  const mergedStyle = { ...style };
  const base = spanToGridColumn(span);
  const sm = spanToGridColumn(spanSm);
  const md = spanToGridColumn(spanMd);
  const lg = spanToGridColumn(spanLg);
  const xl = spanToGridColumn(spanXl);
  if (base != null) mergedStyle["--col-span-base"] = base;
  if (sm != null) mergedStyle["--col-span-sm"] = sm;
  if (md != null) mergedStyle["--col-span-md"] = md;
  if (lg != null) mergedStyle["--col-span-lg"] = lg;
  if (xl != null) mergedStyle["--col-span-xl"] = xl;
  if (start != null) mergedStyle["--col-start"] = String(start);
  if (order != null) mergedStyle["--col-order"] = String(order);
  if (grow != null) mergedStyle["--col-grow"] = String(grow);
  if (shrink != null) mergedStyle["--col-shrink"] = String(shrink);
  if (basis != null) mergedStyle["--col-basis"] = basis;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-col", className),
      "data-align": align,
      "data-justify": justify,
      "data-flex": usesFlexProps ? "true" : void 0,
      style: mergedStyle,
      ...rest
    }
  );
}
function Container({
  as: Tag = "div",
  width,
  maxInlineSize,
  gutter,
  center = true,
  className,
  style,
  ref,
  ...rest
}) {
  const mergedStyle = maxInlineSize ? { ...style, ["--container-width"]: maxInlineSize } : style;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-container", className),
      "data-width": width,
      "data-gutter": gutter,
      "data-center": center ? void 0 : "false",
      style: mergedStyle,
      ...rest
    }
  );
}
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
  const mergedStyle = minItemWidth ? { ...style, ["--grid-min-item-width"]: minItemWidth } : style;
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
    mergedStyle["--split-side-width"] = sideWidth;
  }
  if (contentMin) {
    mergedStyle["--split-content-min"] = contentMin;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tag,
    {
      ref,
      className: utils.cn("vds-split", className),
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
  const mergedStyle = maxInlineSize ? { ...style, ["--center-max-width"]: maxInlineSize } : style;
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
exports.Col = Col;
exports.Container = Container;
exports.Grid = Grid;
exports.Main = Main;
exports.Row = Row;
exports.Section = Section;
exports.Sidebar = Sidebar;
exports.Stack = Stack;
