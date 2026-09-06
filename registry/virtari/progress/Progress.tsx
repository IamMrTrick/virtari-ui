import { cn } from "../../lib/utils";
import type { CSSProperties, ComponentRef, Ref } from "react";
import * as ProgressPrimitive from "../../lib/primitives/progress";

export type ProgressColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "contrast";

export type ProgressVariant = "solid" | "striped" | "gradient";
export type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressAnimation = "pulse" | "glow";

const PRESET_COLORS = new Set<string>([
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "accent",
  "contrast",
]);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof ProgressPrimitive.Root>>;
  color?: ProgressColor | (string & {});
  variant?: ProgressVariant;
  size?: ProgressSize;
  animated?: boolean | ProgressAnimation;
  showLabel?: boolean;
}

export function Progress({
  className,
  value,
  color = "primary",
  variant,
  size = "md",
  animated,
  showLabel,
  style,
  ref,
  ...props
}: ProgressProps) {
  const isPreset = PRESET_COLORS.has(color);
  const dataColor = isPreset ? color : "custom";
  const customStyle: CSSProperties = isPreset
    ? {}
    : ({ "--progress-fill-color": color } as CSSProperties);

  const animatedValue =
    animated === true ? "pulse" : animated === false ? undefined : animated;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("vds-progress", className)}
      data-color={dataColor}
      data-variant={variant}
      data-size={size}
      data-animated={animatedValue}
      value={value}
      style={{ ...customStyle, ...style }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="vds-progress-indicator"
        style={{ inlineSize: `${value ?? 0}%` }}
      />
      {showLabel && value != null && (
        <span className="vds-progress-label" aria-hidden>
          {Math.round(value)}%
        </span>
      )}
    </ProgressPrimitive.Root>
  );
}
