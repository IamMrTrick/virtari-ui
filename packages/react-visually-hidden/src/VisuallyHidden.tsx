import { cn } from "@virtari-packages/utils";
import { Slot } from "@radix-ui/react-slot";
import type { Ref } from "react";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

export function VisuallyHidden({
  asChild = false,
  className,
  ref,
  ...props
}: VisuallyHiddenProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      ref={ref}
      className={cn("vds-visually-hidden", className)}
      {...props}
    />
  );
}
