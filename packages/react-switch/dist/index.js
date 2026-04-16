import { cn } from '@virtari/utils';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { jsx } from 'react/jsx-runtime';

// src/Switch.tsx
function Switch({ size = "md", className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    SwitchPrimitive.Root,
    {
      ref,
      className: cn("vds-switch", className),
      "data-size": size,
      ...props,
      children: /* @__PURE__ */ jsx(SwitchPrimitive.Thumb, { className: "vds-switch-thumb" })
    }
  );
}

export { Switch };
