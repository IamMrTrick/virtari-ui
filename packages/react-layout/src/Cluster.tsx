import { cn } from "@virtari-packages/utils";
import type { ElementType, HTMLAttributes, Ref } from "react";

export type ClusterGap = "xs" | "sm" | "md" | "lg" | "xl";
export type ClusterAlign = "start" | "center" | "end" | "baseline" | "stretch";
export type ClusterJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

export interface ClusterProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: ClusterGap;
  align?: ClusterAlign;
  justify?: ClusterJustify;
  ref?: Ref<HTMLElement>;
}

export function Cluster({
  as: Tag = "div",
  gap,
  align,
  justify,
  className,
  ref,
  ...rest
}: ClusterProps) {
  return (
    <Tag
      ref={ref}
      className={cn("vds-cluster", className)}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      {...rest}
    />
  );
}
