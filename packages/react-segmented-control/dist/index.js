import { cn } from '@virtari-packages/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

// src/SegmentedControl.tsx
function SegmentedControl({
  size = "md",
  fullWidth = false,
  orientation = "horizontal",
  disabled,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    RadioGroupPrimitive.Root,
    {
      ref,
      orientation,
      disabled,
      "data-size": size,
      "data-full-width": fullWidth || void 0,
      "data-orientation": orientation,
      "data-disabled": disabled || void 0,
      className: cn("vds-segmented-control", className),
      ...props
    },
    children
  );
}
function SegmentedControlItem({
  icon,
  className,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ React.createElement(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn("vds-segmented-control-item", className),
      ...props
    },
    icon && /* @__PURE__ */ React.createElement("span", { className: "vds-segmented-control-icon", "aria-hidden": "true" }, icon),
    children
  );
}

export { SegmentedControl, SegmentedControlItem };
