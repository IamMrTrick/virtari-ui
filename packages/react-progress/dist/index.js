"use client";
import { cn } from '@virtari-packages/utils';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/Progress.tsx
var PRESET_COLORS = /* @__PURE__ */ new Set([
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "accent",
  "contrast"
]);
function Progress({
  className,
  value,
  color = "primary",
  variant,
  size,
  animated,
  showLabel,
  style,
  ref,
  ...props
}) {
  const isPreset = PRESET_COLORS.has(color);
  const dataColor = isPreset ? color : "custom";
  const customStyle = isPreset ? {} : { "--progress-fill-color": color };
  const animatedValue = animated === true ? "pulse" : animated === false ? void 0 : animated;
  return /* @__PURE__ */ jsxs(
    ProgressPrimitive.Root,
    {
      ref,
      className: cn("vds-progress", className),
      "data-color": dataColor,
      "data-variant": variant,
      "data-size": size,
      "data-animated": animatedValue,
      value,
      style: { ...customStyle, ...style },
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ProgressPrimitive.Indicator,
          {
            className: "vds-progress-indicator",
            style: { inlineSize: `${value ?? 0}%` }
          }
        ),
        showLabel && value != null && /* @__PURE__ */ jsxs("span", { className: "vds-progress-label", "aria-hidden": true, children: [
          Math.round(value),
          "%"
        ] })
      ]
    }
  );
}

export { Progress };
