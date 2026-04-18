import { cn } from "@virtari/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

/* ── Types ── */

export type ContainerWidth =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "prose"
  | "full";
export type ContainerGutter = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Max inline size preset. */
  width?: ContainerWidth;
  /** Arbitrary max inline size (wins over `width` preset). */
  maxInlineSize?: string;
  /** Horizontal padding preset. */
  gutter?: ContainerGutter;
  /** Whether to center within parent (default `true`). */
  center?: boolean;
  ref?: Ref<HTMLElement>;
}

export function Container({
  as: Tag = "div",
  width,
  maxInlineSize,
  gutter,
  center = true,
  className,
  style,
  ref,
  ...rest
}: ContainerProps) {
  const mergedStyle: CSSProperties | undefined = maxInlineSize
    ? { ...style, ["--container-width" as string]: maxInlineSize }
    : style;

  return (
    <Tag
      ref={ref}
      className={cn("vds-container", className)}
      data-width={width}
      data-gutter={gutter}
      data-center={center ? undefined : "false"}
      style={mergedStyle}
      {...rest}
    />
  );
}
