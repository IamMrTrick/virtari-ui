import { cn } from "@virtari-packages/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

export type CenterMaxWidth = "sm" | "md" | "lg" | "xl";
export type CenterGutter = "none" | "sm" | "md" | "lg";

export interface CenterProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  maxWidth?: CenterMaxWidth;
  gutter?: CenterGutter;
  intrinsic?: boolean;
  maxInlineSize?: string;
  ref?: Ref<HTMLElement>;
}

export function Center({
  as: Tag = "div",
  maxWidth,
  gutter,
  intrinsic,
  maxInlineSize,
  className,
  style,
  ref,
  ...rest
}: CenterProps) {
  const mergedStyle: CSSProperties | undefined = maxInlineSize
    ? { ...style, ["--center-max-width" as string]: maxInlineSize }
    : style;
  return (
    <Tag
      ref={ref}
      className={cn("vds-center", className)}
      data-max-width={maxWidth}
      data-gutter={gutter}
      data-intrinsic={intrinsic || undefined}
      style={mergedStyle}
      {...rest}
    />
  );
}
