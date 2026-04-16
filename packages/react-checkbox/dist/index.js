import { cn } from '@virtari/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Checkbox.tsx
function Checkbox({ size = "md", className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      ref,
      className: cn("vds-checkbox", className),
      "data-size": size,
      ...props,
      children: /* @__PURE__ */ jsxs(CheckboxPrimitive.Indicator, { className: "vds-checkbox-indicator", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "vds-checkbox-check",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M10 3L4.5 8.5L2 6",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: "vds-checkbox-indeterminate",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M2.5 6H9.5",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round"
              }
            )
          }
        )
      ] })
    }
  );
}

export { Checkbox };
