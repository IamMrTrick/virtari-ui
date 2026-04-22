"use client";
import { useDirection, cn } from '@virtari-packages/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { DirectionProvider } from '@radix-ui/react-direction';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Tooltip.tsx
function TooltipProvider({
  delayDuration = 300,
  skipDelayDuration = 200,
  dir,
  children,
  ...props
}) {
  const autoDir = useDirection();
  return /* @__PURE__ */ jsx(DirectionProvider, { dir: dir ?? autoDir, children: /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      delayDuration,
      skipDelayDuration,
      ...props,
      children
    }
  ) });
}
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
function TooltipContent({
  className,
  sideOffset = 6,
  collisionPadding = 8,
  size = "md",
  variant = "default",
  arrow = false,
  children,
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      ref,
      sideOffset,
      collisionPadding,
      "data-size": size,
      "data-variant": variant,
      className: cn("vds-tooltip-content", className),
      ...props,
      children: [
        children,
        arrow ? /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "vds-tooltip-arrow" }) : null
      ]
    }
  ) });
}
function TooltipArrow({ className, ref, ...props }) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Arrow,
    {
      ref,
      className: cn("vds-tooltip-arrow", className),
      ...props
    }
  );
}

export { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger };
