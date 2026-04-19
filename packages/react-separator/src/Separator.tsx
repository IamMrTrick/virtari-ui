import { cn } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

/* ── Separator ── */
export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof SeparatorPrimitive.Root>>;
}

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ref,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn("vds-separator", className)}
      {...props}
    />
  );
}
