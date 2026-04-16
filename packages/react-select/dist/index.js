import { cn } from '@virtari/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/Select.tsx
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
function SelectTrigger({ size = "md", className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      ref,
      className: cn("vds-select-trigger", className),
      "data-size": size,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { className: "vds-select-icon", children: /* @__PURE__ */ jsx(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3 4.5L6 7.5L9 4.5",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    SelectPrimitive.Content,
    {
      ref,
      className: cn("vds-select-content", className),
      position,
      sideOffset: 4,
      ...props,
      children: /* @__PURE__ */ jsx(SelectPrimitive.Viewport, { className: "vds-select-viewport", children })
    }
  ) });
}
function SelectItem({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      ref,
      className: cn("vds-select-item", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { className: "vds-select-item-indicator", children: /* @__PURE__ */ jsx(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M10 3L4.5 8.5L2 6",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ) })
      ]
    }
  );
}
function SelectLabel({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Label,
    {
      ref,
      className: cn("vds-select-label", className),
      ...props
    }
  );
}
function SelectSeparator({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Separator,
    {
      ref,
      className: cn("vds-select-separator", className),
      ...props
    }
  );
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue };
