import type { HTMLAttributes, Ref } from "react";
import { cn } from "@virtari-packages/utils";

export type InlineCodeColor = "neutral" | "primary" | "accent";

export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  /** Color variant. Defaults to neutral (subtle gray). */
  color?: InlineCodeColor;
  /** Forwarded ref for the <code> element. */
  ref?: Ref<HTMLElement>;
}

export function InlineCode({
  color = "neutral",
  className,
  children,
  ref,
  ...props
}: InlineCodeProps) {
  return (
    <code
      ref={ref}
      className={cn("vds-code-inline", className)}
      data-color={color !== "neutral" ? color : undefined}
      {...props}
    >
      {children}
    </code>
  );
}
