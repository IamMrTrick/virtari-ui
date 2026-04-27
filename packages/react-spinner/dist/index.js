import { cn } from '@virtari-packages/utils';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

// src/Spinner.tsx
function Spinner({
  variant = "ring",
  size = "md",
  color = "primary",
  speed,
  label = "Loading",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref,
      role: "status",
      "aria-label": label,
      className: cn("vds-spinner", className),
      "data-variant": variant,
      "data-size": size,
      "data-color": color,
      "data-speed": speed,
      ...props,
      children: [
        variant === "dots" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "vds-spinner__dot", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "vds-spinner__dot", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "vds-spinner__dot", "aria-hidden": "true" })
        ] }),
        variant === "bars" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "vds-spinner__bar", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "vds-spinner__bar", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "vds-spinner__bar", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "vds-spinner__bar", "aria-hidden": "true" })
        ] })
      ]
    }
  );
}

export { Spinner };
