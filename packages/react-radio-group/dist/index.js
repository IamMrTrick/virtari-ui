import { cn } from '@virtari/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { jsx } from 'react/jsx-runtime';

// src/RadioGroup.tsx
function RadioGroup({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      ref,
      className: cn("vds-radio-group", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn("vds-radio-item", className),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "vds-radio-indicator" })
    }
  );
}

export { RadioGroup, RadioGroupItem };
