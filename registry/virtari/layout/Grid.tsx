import { cn } from "../../lib/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

export type GridGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: GridGap;
  minItemWidth?: string;
  ref?: Ref<HTMLElement>;
}

export function Grid({
  as: Tag = "div",
  gap,
  minItemWidth,
  className,
  style,
  ref,
  ...rest
}: GridProps) {
  const mergedStyle: CSSProperties | undefined = minItemWidth
    ? { ...style, ["--grid-min-item-width" as string]: minItemWidth }
    : style;
  return (
    <Tag
      ref={ref}
      className={cn("vds-grid", className)}
      data-gap={gap}
      style={mergedStyle}
      {...rest}
    />
  );
}
