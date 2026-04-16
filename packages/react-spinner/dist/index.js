import { cn } from '@virtari/utils';
import { jsx } from 'react/jsx-runtime';

// src/Spinner.tsx
function Spinner({
  size = "md",
  className,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      role: "status",
      "aria-label": "Loading",
      className: cn("vds-spinner", className),
      "data-size": size,
      ...props
    }
  );
}

export { Spinner };
