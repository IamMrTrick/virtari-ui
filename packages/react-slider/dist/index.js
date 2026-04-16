import { cn } from '@virtari/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/Slider.tsx
function Slider({ className, ref, ...props }) {
  return /* @__PURE__ */ jsxs(
    SliderPrimitive.Root,
    {
      ref,
      className: cn("vds-slider", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "vds-slider-track", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "vds-slider-range" }) }),
        /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "vds-slider-thumb" })
      ]
    }
  );
}

export { Slider };
