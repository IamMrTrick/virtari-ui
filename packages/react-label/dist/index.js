"use client";
import { cn } from '@virtari-packages/utils';
import * as LabelPrimitive from '@radix-ui/react-label';
import { jsx } from 'react/jsx-runtime';

// src/Label.tsx
function Label({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      ref,
      className: cn("vds-label", className),
      ...props
    }
  );
}

export { Label };
