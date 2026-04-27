'use strict';

var utils = require('@virtari-packages/utils');
var jsxRuntime = require('react/jsx-runtime');

// src/EmptyState.tsx
function EmptyState({
  size = "md",
  orientation = "vertical",
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      className: utils.cn("vds-empty-state", className),
      "data-size": size,
      "data-orientation": orientation,
      ...props,
      children
    }
  );
}
function EmptyStateIcon({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-empty-state-icon", className), "aria-hidden": "true", ...props, children });
}
function EmptyStateTitle({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("h3", { ref, className: utils.cn("vds-empty-state-title", className), ...props, children });
}
function EmptyStateDescription({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("p", { ref, className: utils.cn("vds-empty-state-description", className), ...props, children });
}
function EmptyStateActions({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-empty-state-actions", className), ...props, children });
}

exports.EmptyState = EmptyState;
exports.EmptyStateActions = EmptyStateActions;
exports.EmptyStateDescription = EmptyStateDescription;
exports.EmptyStateIcon = EmptyStateIcon;
exports.EmptyStateTitle = EmptyStateTitle;
