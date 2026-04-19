"use client";
import { cn } from '@virtari-packages/utils';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { jsx } from 'react/jsx-runtime';

// src/Collapsible.tsx
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger = CollapsiblePrimitive.Trigger;
function CollapsibleContent({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.Content,
    {
      ref,
      className: cn("vds-collapsible-content", className),
      ...props
    }
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
