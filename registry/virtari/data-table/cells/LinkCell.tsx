import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/utils";

export interface LinkCellProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  external?: boolean;
}

export function LinkCell({
  children,
  external,
  className,
  target,
  rel,
  ...props
}: LinkCellProps) {
  return (
    <a
      target={external ? "_blank" : target}
      rel={external ? "noopener noreferrer" : rel}
      className={cn("vds-data-table-link-cell", className)}
      {...props}
    >
      {children}
    </a>
  );
}
