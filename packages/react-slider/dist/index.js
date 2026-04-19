"use client";
import { cn } from '@virtari/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { jsxs, jsx } from 'react/jsx-runtime';

// src/Slider.tsx
function Slider({
  className,
  ref,
  value,
  defaultValue,
  min = 0,
  max = 100,
  ...props
}) {
  const thumbValues = Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max];
  return /* @__PURE__ */ jsxs(
    SliderPrimitive.Root,
    {
      ref,
      className: cn("vds-slider", className),
      value,
      defaultValue,
      min,
      max,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "vds-slider-track", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "vds-slider-range" }) }),
        thumbValues.map((_, i) => /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "vds-slider-thumb" }, i))
      ]
    }
  );
}

export { Slider };
