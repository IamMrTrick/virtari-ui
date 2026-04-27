"use client";
import { cn } from '@virtari-packages/utils';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/Separator.tsx
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  label,
  ref,
  ...props
}) {
  if (label && orientation === "horizontal") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        role: decorative ? "none" : "separator",
        "aria-orientation": decorative ? void 0 : "horizontal",
        className: cn("vds-separator vds-separator--labeled", className),
        "data-orientation": "horizontal",
        children: [
          /* @__PURE__ */ jsx("span", { className: "vds-separator__line", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { className: "vds-separator__label", children: label }),
          /* @__PURE__ */ jsx("span", { className: "vds-separator__line", "aria-hidden": "true" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn("vds-separator", className),
      ...props
    }
  );
}

export { Separator };
