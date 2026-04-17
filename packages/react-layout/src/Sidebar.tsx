import { cn } from "@virtari/utils";
import type { CSSProperties, ElementType, HTMLAttributes, Ref } from "react";

export type SidebarSide = "start" | "end";
export type SidebarGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  side?: SidebarSide;
  sideWidth?: string;
  contentMin?: string;
  gap?: SidebarGap;
  ref?: Ref<HTMLElement>;
}

export function Sidebar({
  as: Tag = "div",
  side,
  sideWidth,
  contentMin,
  gap,
  className,
  style,
  ref,
  ...rest
}: SidebarProps) {
  const mergedStyle: CSSProperties = { ...style };
  if (sideWidth) {
    (mergedStyle as Record<string, string>)["--vds-sidebar-side-width"] =
      sideWidth;
  }
  if (contentMin) {
    (mergedStyle as Record<string, string>)["--vds-sidebar-content-min"] =
      contentMin;
  }

  return (
    <Tag
      ref={ref}
      className={cn("vds-sidebar", className)}
      data-side={side}
      data-gap={gap}
      style={mergedStyle}
      {...rest}
    />
  );
}
