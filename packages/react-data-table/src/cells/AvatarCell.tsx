import { Avatar } from "@virtari/react-avatar";
import type { AvatarSize } from "@virtari/react-avatar";
import type { ReactNode } from "react";
import { cn } from "@virtari/utils";

export interface AvatarCellProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: AvatarSize;
  primary?: ReactNode;
  secondary?: ReactNode;
  className?: string;
}

/** Avatar + optional primary/secondary text; ideal for name columns. */
export function AvatarCell({
  src,
  alt,
  fallback,
  size = "sm",
  primary,
  secondary,
  className,
}: AvatarCellProps) {
  return (
    <div className={cn("vds-data-table-avatar-cell", className)}>
      <Avatar src={src} alt={alt ?? fallback} fallback={fallback} size={size} />
      {(primary || secondary) && (
        <div className="vds-data-table-avatar-cell-text">
          {primary && (
            <span className="vds-data-table-avatar-cell-primary">{primary}</span>
          )}
          {secondary && (
            <span className="vds-data-table-avatar-cell-secondary">
              {secondary}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
