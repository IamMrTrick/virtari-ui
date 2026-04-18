import type { ReactNode } from "react";
import { cn } from "@virtari/utils";

export interface TextCellProps {
  value?: ReactNode;
  /** Visual weight — default "regular". */
  weight?: "regular" | "medium" | "semibold";
  /** Force ellipsis truncation with `title` fallback. */
  truncate?: boolean;
  /** Muted color tone. */
  muted?: boolean;
  className?: string;
}

export function TextCell({
  value,
  weight = "regular",
  truncate = true,
  muted = false,
  className,
}: TextCellProps) {
  const title = typeof value === "string" ? value : undefined;
  return (
    <span
      title={truncate ? title : undefined}
      data-weight={weight}
      data-muted={muted ? "" : undefined}
      data-truncate={truncate ? "" : undefined}
      className={cn("vds-data-table-text-cell", className)}
    >
      {value ?? "—"}
    </span>
  );
}
