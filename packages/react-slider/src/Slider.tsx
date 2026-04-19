import { cn } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

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
  ...props
}: SliderProps) {
  const thumbValues =
    Array.isArray(value)
      ? value
      : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("vds-slider", className)}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Track className="vds-slider-track">
        <SliderPrimitive.Range className="vds-slider-range" />
      </SliderPrimitive.Track>
      {thumbValues.map((_, i) => (
        <SliderPrimitive.Thumb key={i} className="vds-slider-thumb" />
      ))}
    </SliderPrimitive.Root>
  );
}
