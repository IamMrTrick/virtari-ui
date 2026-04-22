"use client";
import { useDirection, cn } from '@virtari-packages/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { DirectionProvider } from '@radix-ui/react-direction';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/Slider.tsx
function Slider({
  className,
  ref,
  value,
  defaultValue,
  min = 0,
  max = 100,
  minStepsBetweenThumbs = 1,
  dir,
  ...props
}) {
  const thumbValues = Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max];
  const autoDir = useDirection();
  return /* @__PURE__ */ jsx(DirectionProvider, { dir: dir ?? autoDir, children: /* @__PURE__ */ jsxs(
    SliderPrimitive.Root,
    {
      ref,
      className: cn("vds-slider", className),
      value,
      defaultValue,
      min,
      max,
      minStepsBetweenThumbs,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "vds-slider-track", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "vds-slider-range" }) }),
        thumbValues.map((_, i) => /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "vds-slider-thumb" }, i))
      ]
    }
  ) });
}

export { Slider };
