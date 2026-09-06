import { cn } from "../../lib/utils";
import type { ComponentRef, Ref } from "react";
import * as CollapsiblePrimitive from "../../lib/primitives/collapsible";

/* ── Collapsible ── */
export const Collapsible = CollapsiblePrimitive.Root;

/* ── CollapsibleTrigger ── */
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

/* ── CollapsibleContent ── */
export interface CollapsibleContentProps
  extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {
  ref?: Ref<ComponentRef<typeof CollapsiblePrimitive.Content>>;
}

export function CollapsibleContent({ className, ref, ...props }: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn("vds-collapsible-content", className)}
      {...props}
    />
  );
}
