'use strict';

var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/Timeline.tsx
function toneForStatus(status) {
  switch (status) {
    case "complete":
      return "success";
    case "active":
      return "primary";
    case "error":
      return "danger";
    case "warning":
      return "warning";
    case "pending":
    default:
      return "neutral";
  }
}
function Timeline({
  align = "start",
  connector = "gap",
  density = "comfortable",
  line = "solid",
  orientation = "vertical",
  size = "md",
  variant = "default",
  className,
  children,
  ref,
  ...props
}) {
  const labelProps = props["aria-label"] || props["aria-labelledby"] ? void 0 : { "aria-label": "Timeline" };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ol",
    {
      ref,
      className: utils.cn("vds-timeline", className),
      "data-align": align,
      "data-connector": connector,
      "data-density": density,
      "data-line": line,
      "data-orientation": orientation,
      "data-size": size,
      "data-variant": variant,
      ...labelProps,
      ...props,
      children
    }
  );
}
function TimelineItem({
  effect = "none",
  status = "pending",
  tone,
  side,
  interactive,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      ref,
      className: utils.cn("vds-timeline-item", className),
      "data-effect": effect === "none" ? void 0 : effect,
      "data-interactive": interactive || void 0,
      "data-side": side,
      "data-status": status,
      "data-tone": tone ?? toneForStatus(status),
      "aria-current": status === "active" ? "step" : void 0,
      ...props,
      children
    }
  );
}
function TimelineIndicator({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-timeline-indicator", className), ...props, children });
}
function TimelineConnector({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-timeline-connector", className),
      "aria-hidden": "true",
      ...props
    }
  );
}
function TimelineOppositeContent({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-timeline-opposite", className),
      ...props,
      children
    }
  );
}
function TimelineContent({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-timeline-content", className), ...props, children });
}
function TimelineCard({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-timeline-card", className), ...props, children });
}
function TimelineTitle({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("h3", { ref, className: utils.cn("vds-timeline-title", className), ...props, children });
}
function TimelineDescription({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      ref,
      className: utils.cn("vds-timeline-description", className),
      ...props,
      children
    }
  );
}
function TimelineMeta({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-timeline-meta", className), ...props, children });
}
function TimelineMedia({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-timeline-media", className), ...props, children });
}
function TimelineBadge({
  tone,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      className: utils.cn("vds-timeline-badge", className),
      "data-tone": tone,
      ...props,
      children
    }
  );
}
function TimelineTime({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("time", { ref, className: utils.cn("vds-timeline-time", className), ...props, children });
}

exports.Timeline = Timeline;
exports.TimelineBadge = TimelineBadge;
exports.TimelineCard = TimelineCard;
exports.TimelineConnector = TimelineConnector;
exports.TimelineContent = TimelineContent;
exports.TimelineDescription = TimelineDescription;
exports.TimelineIndicator = TimelineIndicator;
exports.TimelineItem = TimelineItem;
exports.TimelineMedia = TimelineMedia;
exports.TimelineMeta = TimelineMeta;
exports.TimelineOppositeContent = TimelineOppositeContent;
exports.TimelineTime = TimelineTime;
exports.TimelineTitle = TimelineTitle;
