import { cn } from '@virtari-packages/utils';
import { jsx } from 'react/jsx-runtime';

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
  return /* @__PURE__ */ jsx(
    "ol",
    {
      ref,
      className: cn("vds-timeline", className),
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
  return /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      className: cn("vds-timeline-item", className),
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
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-timeline-indicator", className), ...props, children });
}
function TimelineConnector({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-timeline-connector", className),
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-timeline-opposite", className),
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
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-timeline-content", className), ...props, children });
}
function TimelineCard({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-timeline-card", className), ...props, children });
}
function TimelineTitle({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx("h3", { ref, className: cn("vds-timeline-title", className), ...props, children });
}
function TimelineDescription({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      className: cn("vds-timeline-description", className),
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
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-timeline-meta", className), ...props, children });
}
function TimelineMedia({
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-timeline-media", className), ...props, children });
}
function TimelineBadge({
  tone,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cn("vds-timeline-badge", className),
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
  return /* @__PURE__ */ jsx("time", { ref, className: cn("vds-timeline-time", className), ...props, children });
}

export { Timeline, TimelineBadge, TimelineCard, TimelineConnector, TimelineContent, TimelineDescription, TimelineIndicator, TimelineItem, TimelineMedia, TimelineMeta, TimelineOppositeContent, TimelineTime, TimelineTitle };
