"use client";
import { cn } from '@virtari/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { IconCheck, IconMinus } from '@virtari/react-icons';
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
          IconCheck,
          {
            className: "vds-checkbox-check",
            size: 12,
            stroke: 2.5,
            "aria-hidden": true,
            focusable: false
          }
        ),
        /* @__PURE__ */ jsx(
          IconMinus,
          {
            className: "vds-checkbox-indeterminate",
            size: 12,
            stroke: 2.5,
            "aria-hidden": true,
            focusable: false
          }
        )
      ] })
    }
  );
}

export { Checkbox };
