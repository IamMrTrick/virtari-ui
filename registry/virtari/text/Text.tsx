import { cn } from "../../lib/utils";
import type { ElementType, Ref } from "react";
import { Slot } from "../../lib/primitives/slot";

/* ── Types ── */

export type TextSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextTone =
  | "default"
  | "muted"
  | "subtle"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "inherit";
export type TextAlign = "start" | "center" | "end" | "justify";
export type TextLeading = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
export type TextWrap = "balance" | "pretty" | "nowrap";

export type TextElement = "p" | "span" | "div" | "label" | "strong" | "em";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  align?: TextAlign;
  leading?: TextLeading;
  truncate?: boolean;
  wrap?: TextWrap;
  asChild?: boolean;
  ref?: Ref<HTMLElement>;
}

export function Text({
  as = "p",
  size = "3",
  weight,
  tone,
  align,
  leading,
  truncate = false,
  wrap,
  asChild = false,
  className,
  ref,
  ...props
}: TextProps) {
  const Comp: ElementType = asChild ? Slot : as;

  return (
    <Comp
      ref={ref}
      className={cn("vds-text", className)}
      data-size={size}
      data-weight={weight}
      data-tone={tone}
      data-align={align}
      data-leading={leading}
      data-truncate={truncate ? "true" : undefined}
      data-wrap={wrap}
      {...props}
    />
  );
}
