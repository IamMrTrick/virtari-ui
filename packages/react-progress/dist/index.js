"use client";
import { cn } from '@virtari-packages/utils';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { jsx } from 'react/jsx-runtime';

// src/Progress.tsx
function Progress({ className, value, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    ProgressPrimitive.Root,
    {
      ref,
      className: cn("vds-progress", className),
      ...props,
      children: /* @__PURE__ */ jsx(
        ProgressPrimitive.Indicator,
        {
          className: "vds-progress-indicator",
          style: { width: `${value ?? 0}%` }
        }
      )
    }
  );
}

export { Progress };
