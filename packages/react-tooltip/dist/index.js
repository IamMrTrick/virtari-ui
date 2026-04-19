"use client";
import { cn } from '@virtari/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { jsx } from 'react/jsx-runtime';

// src/Tooltip.tsx
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
function TooltipContent({
  className,
  sideOffset = 4,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    TooltipPrimitive.Content,
    {
      ref,
      sideOffset,
      className: cn("vds-tooltip-content", className),
      ...props
    }
  ) });
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
