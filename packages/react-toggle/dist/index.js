import { cn } from '@virtari/utils';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { jsx } from 'react/jsx-runtime';

// src/Toggle.tsx
function Toggle({
  variant = "default",
  size = "md",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TogglePrimitive.Root,
    {
      ref,
      className: cn("vds-toggle", className),
      "data-variant": variant,
      "data-size": size,
      ...props
    }
  );
}

export { Toggle };
