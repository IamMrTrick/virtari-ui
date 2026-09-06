import { cn } from "../../lib/utils";
import type { CSSProperties, Ref } from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed width (CSS value) */
  width?: string | number;
  /** Fixed height (CSS value) */
  height?: string | number;
  /** Render as a circle (sets border-radius to 50%) */
  circle?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function Skeleton({
  width,
  height,
  circle = false,
  className,
  style,
  ref,
  ...props
}: SkeletonProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-skeleton", className)}
      data-circle={circle || undefined}
      style={
        {
          "--_skeleton-w": typeof width === "number" ? `${width}px` : width,
          "--_skeleton-h": typeof height === "number" ? `${height}px` : height,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
