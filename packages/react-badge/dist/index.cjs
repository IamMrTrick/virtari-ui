'use strict';

var utils = require('@virtari/utils');
var reactSlot = require('@radix-ui/react-slot');
var jsxRuntime = require('react/jsx-runtime');

// src/Badge.tsx
function resolveLegacy(color, variant) {
  switch (variant) {
    case "default":
    case "secondary":
      return { color: "neutral", variant: "soft" };
    case "destructive":
      return { color: "danger", variant: "soft" };
    default:
      return { color, variant };
  }
}
function Badge({
  color = "primary",
  variant = "soft",
  size = "md",
  shape = "pill",
  dot = false,
  dotOnly = false,
  leftSection,
  rightSection,
  onRemove,
  removeLabel = "Remove",
  asChild = false,
  className,
  children,
  ref,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "span";
  const { color: resolvedColor, variant: resolvedVariant } = resolveLegacy(color, variant);
  const interactive = !!props.onClick && !asChild;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Comp,
    {
      ref,
      className: utils.cn("vds-badge", className),
      "data-color": resolvedColor,
      "data-variant": resolvedVariant,
      "data-size": size,
      "data-shape": shape !== "pill" ? shape : void 0,
      "data-interactive": interactive || void 0,
      "data-dot-only": dotOnly || void 0,
      ...props,
      children: [
        !dotOnly && dot && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-badge-dot", "aria-hidden": "true" }),
        !dotOnly && !dot && leftSection && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-badge-section", "data-position": "start", children: leftSection }),
        !dotOnly && /* @__PURE__ */ jsxRuntime.jsx(reactSlot.Slottable, { children }),
        !dotOnly && !onRemove && rightSection && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-badge-section", "data-position": "end", children: rightSection }),
        !dotOnly && onRemove && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: "vds-badge-close",
            "aria-label": removeLabel,
            onClick: (e) => {
              e.stopPropagation();
              onRemove(e);
            },
            children: /* @__PURE__ */ jsxRuntime.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false", children: [
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 6 6 18" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m6 6 12 12" })
            ] })
          }
        )
      ]
    }
  );
}

exports.Badge = Badge;
