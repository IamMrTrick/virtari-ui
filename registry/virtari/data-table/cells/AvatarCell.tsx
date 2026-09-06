import { Avatar } from "../../avatar";
import type { AvatarColor, AvatarSize } from "../../avatar";
import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

export interface AvatarCellProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: AvatarSize;
  color?: AvatarColor;
  colorKey?: string;
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
  color = "auto",
  colorKey,
  primary,
  secondary,
  className,
}: AvatarCellProps) {
  return (
    <div className={cn("vds-data-table-avatar-cell", className)}>
      <Avatar
        src={src}
        alt={alt ?? fallback}
        fallback={fallback}
        size={size}
        color={color}
        colorKey={colorKey ?? (typeof primary === "string" ? primary : fallback)}
      />
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
