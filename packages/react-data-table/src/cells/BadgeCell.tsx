import { Badge } from "@virtari/react-badge";
import type { BadgeVariant } from "@virtari/react-badge";
import type { ReactNode } from "react";
import { cn } from "@virtari/utils";

export interface BadgeCellProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function BadgeCell({ variant, children, className }: BadgeCellProps) {
  return (
    <Badge variant={variant} className={cn("vds-data-table-badge-cell", className)}>
      {children}
    </Badge>
  );
}

export type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export interface StatusBadgeCellProps {
  tone: StatusTone;
  label: ReactNode;
  withDot?: boolean;
  className?: string;
}

/** Pre-styled status badge with a colored dot — maps tone → background. */
export function StatusBadgeCell({
  tone,
  label,
  withDot = true,
  className,
}: StatusBadgeCellProps) {
  return (
    <span
      data-tone={tone}
      className={cn("vds-data-table-status-cell", className)}
    >
      {withDot && (
        <span aria-hidden="true" className="vds-data-table-status-cell-dot" />
      )}
      <span>{label}</span>
    </span>
  );
}
