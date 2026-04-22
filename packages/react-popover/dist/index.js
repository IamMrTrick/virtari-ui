"use client";
import { useDirection, cn } from '@virtari-packages/utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { DirectionProvider } from '@radix-ui/react-direction';
import { jsx } from 'react/jsx-runtime';

// src/Popover.tsx
function Popover({ dir, ...props }) {
  const autoDir = useDirection();
  return /* @__PURE__ */ jsx(DirectionProvider, { dir: dir ?? autoDir, children: /* @__PURE__ */ jsx(PopoverPrimitive.Root, { ...props }) });
}
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverClose = PopoverPrimitive.Close;
function PopoverContent({
  className,
  sideOffset = 4,
  align = "center",
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      ref,
      sideOffset,
      align,
      className: cn("vds-popover-content", className),
      ...props
    }
  ) });
}

export { Popover, PopoverClose, PopoverContent, PopoverTrigger };
