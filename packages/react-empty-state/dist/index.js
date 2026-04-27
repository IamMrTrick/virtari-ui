import { cn } from '@virtari-packages/utils';
import { jsx } from 'react/jsx-runtime';

// src/EmptyState.tsx
function EmptyState({
  size = "md",
  orientation = "vertical",
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-empty-state", className),
      "data-size": size,
      "data-orientation": orientation,
      ...props,
      children
    }
  );
}
function EmptyStateIcon({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-empty-state-icon", className), "aria-hidden": "true", ...props, children });
}
function EmptyStateTitle({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsx("h3", { ref, className: cn("vds-empty-state-title", className), ...props, children });
}
function EmptyStateDescription({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsx("p", { ref, className: cn("vds-empty-state-description", className), ...props, children });
}
function EmptyStateActions({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-empty-state-actions", className), ...props, children });
}

export { EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle };
