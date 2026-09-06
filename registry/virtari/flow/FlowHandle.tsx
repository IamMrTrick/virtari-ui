import { cn } from "../../lib/utils";
import { Handle, type HandleProps } from "@xyflow/react";
import type { FlowTone } from "./FlowCanvas";

export type FlowHandleSize = "sm" | "md";

export interface FlowHandleProps extends HandleProps {
  size?: FlowHandleSize;
  tone?: FlowTone;
}

export function FlowHandle({
  className,
  size = "md",
  tone = "primary",
  ...props
}: FlowHandleProps) {
  return (
    <Handle
      className={cn("vds-flow-handle", className)}
      data-size={size}
      data-tone={tone}
      {...props}
    />
  );
}
