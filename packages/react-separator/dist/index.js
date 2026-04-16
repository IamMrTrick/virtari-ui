import { cn } from '@virtari/utils';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { jsx } from 'react/jsx-runtime';

// src/Separator.tsx
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ref,
  ...props
}) {
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
