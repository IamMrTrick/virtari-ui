import { cn } from '@virtari/utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/ScrollArea.tsx
function ScrollArea({ className, children, ref, ...props }) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      ref,
      className: cn("vds-scroll-area", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "vds-scroll-area-viewport", children }),
        /* @__PURE__ */ jsx(ScrollBar, {}),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ref,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      ref,
      orientation,
      className: cn("vds-scrollbar", className),
      ...props,
      children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "vds-scrollbar-thumb" })
    }
  );
}

export { ScrollArea, ScrollBar };
