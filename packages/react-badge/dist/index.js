import { cn } from '@virtari/utils';
import { Slot } from '@radix-ui/react-slot';
import { jsx } from 'react/jsx-runtime';

// src/Badge.tsx
function Badge({
  variant = "default",
  asChild = false,
  className,
  ref,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("vds-badge", className),
      "data-variant": variant,
      ...props
    }
  );
}

export { Badge };
