import { cn } from "@virtari/utils";
import type { Ref } from "react";
import { Slot } from "@radix-ui/react-slot";

export type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

export function Badge({
  variant = "default",
  asChild = false,
  className,
  ref,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      ref={ref}
      className={cn("vds-badge", className)}
      data-variant={variant}
      {...props}
    />
  );
}

