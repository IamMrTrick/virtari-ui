import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

/* ── Slider ── */
export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof SliderPrimitive.Root>>;
}

export function Slider({ className, ref, ...props }: SliderProps) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("vds-slider", className)}
      {...props}
    >
      <SliderPrimitive.Track className="vds-slider-track">
        <SliderPrimitive.Range className="vds-slider-range" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="vds-slider-thumb" />
    </SliderPrimitive.Root>
  );
}
