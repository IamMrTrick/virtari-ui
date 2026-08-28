import { cn, useDirection } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as SliderPrimitive from "@virtari-packages/primitives/slider";
import { DirectionProvider } from "@virtari-packages/primitives/direction";

/* ── Slider ── */
export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof SliderPrimitive.Root>>;
}

export function Slider({
  className,
  ref,
  value,
  defaultValue,
  min = 0,
  max = 100,
  minStepsBetweenThumbs = 1,
  dir,
  ...props
}: SliderProps) {
  const thumbValues =
    Array.isArray(value)
      ? value
      : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max];
  /* Auto-detect direction so the range fill anchors to inline-start and
     keyboard arrows mirror in RTL. DirectionProvider is the primitives' designated
     channel for passing direction down to primitives. Explicit `dir` wins. */
  const autoDir = useDirection();

  return (
    <DirectionProvider dir={dir ?? autoDir}>
      <SliderPrimitive.Root
        ref={ref}
        className={cn("vds-slider", className)}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        {...props}
      >
        <SliderPrimitive.Track className="vds-slider-track">
          <SliderPrimitive.Range className="vds-slider-range" />
        </SliderPrimitive.Track>
        {thumbValues.map((_, i) => (
          <SliderPrimitive.Thumb key={i} className="vds-slider-thumb" />
        ))}
      </SliderPrimitive.Root>
    </DirectionProvider>
  );
}
