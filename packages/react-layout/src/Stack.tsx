import { cn } from "@virtari-packages/utils";
import type { ElementType, HTMLAttributes, Ref } from "react";

export type StackGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: StackGap;
  recursive?: boolean;
  ref?: Ref<HTMLElement>;
}

export function Stack({
  as: Tag = "div",
  gap,
  recursive,
  className,
  ref,
  ...rest
}: StackProps) {
  return (
    <Tag
      ref={ref}
      className={cn("vds-stack", className)}
      data-gap={gap}
      data-recursive={recursive || undefined}
      {...rest}
    />
  );
}
