import { cn } from '@virtari-packages/utils';
import { jsx } from 'react/jsx-runtime';

// src/Skeleton.tsx
function Skeleton({
  width,
  height,
  circle = false,
  className,
  style,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("vds-skeleton", className),
      "data-circle": circle || void 0,
      style: {
        "--_skeleton-w": typeof width === "number" ? `${width}px` : width,
        "--_skeleton-h": typeof height === "number" ? `${height}px` : height,
        ...style
      },
      ...props
    }
  );
}

export { Skeleton };
