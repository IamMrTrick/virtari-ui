import { cn } from '@virtari-packages/utils';
import { Slot } from '@radix-ui/react-slot';
import { jsx } from 'react/jsx-runtime';

// src/VisuallyHidden.tsx
function VisuallyHidden({
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
      className: cn("vds-visually-hidden", className),
      ...props
    }
  );
}

export { VisuallyHidden };
