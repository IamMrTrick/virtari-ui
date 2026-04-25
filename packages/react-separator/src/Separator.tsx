import { cn } from "@virtari-packages/utils";
import type { ComponentRef, Ref } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

/* ── Separator ── */
export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  label?: React.ReactNode;
  ref?: Ref<ComponentRef<typeof SeparatorPrimitive.Root>>;
}

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  label,
  ref,
  ...props
}: SeparatorProps) {
  if (label && orientation === "horizontal") {
    return (
      <div
        ref={ref as Ref<HTMLDivElement>}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : "horizontal"}
        className={cn("vds-separator vds-separator--labeled", className)}
        data-orientation="horizontal"
      >
        <span className="vds-separator__line" aria-hidden="true" />
        <span className="vds-separator__label">{label}</span>
        <span className="vds-separator__line" aria-hidden="true" />
      </div>
    );
  }

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
