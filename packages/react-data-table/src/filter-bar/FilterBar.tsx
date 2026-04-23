import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Button } from "@virtari-packages/react-button";
import {
  Chip,
  ChipIcon,
  ChipLabel,
  ChipRemove,
} from "@virtari-packages/react-chip";
import type { ChipVariant } from "@virtari-packages/react-chip";
import { cn } from "@virtari-packages/utils";
import { IconPlus } from "@virtari-packages/react-icons";
import { stickyAttr } from "../utils/sticky";
import type { DataTableStickyMode } from "../utils/sticky";

export interface DataTableFilterChip {
  id: string;
  label: ReactNode;
  value?: ReactNode;
  icon?: ReactNode;
  variant?: ChipVariant;
  disabled?: boolean;
  removeLabel?: string;
}

export interface DataTableFilterBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  filters?: DataTableFilterChip[];
  onFilterClick?: (filter: DataTableFilterChip) => void;
  onRemoveFilter?: (filterId: string) => void;
  onAddFilter?: () => void;
  addLabel?: ReactNode;
  sticky?: DataTableStickyMode;
  stickyOffset?: CSSProperties["top"];
  children?: ReactNode;
}

export const DataTableFilterBar = forwardRef<
  HTMLDivElement,
  DataTableFilterBarProps
>(function DataTableFilterBar(
  {
    filters,
    onFilterClick,
    onRemoveFilter,
    onAddFilter,
    addLabel = "Add filter",
    sticky = false,
    stickyOffset,
    className,
    children,
    style,
    ...props
  },
  ref,
) {
  const stickyStyle =
    stickyOffset === undefined
      ? style
      : ({
          ["--vds-sticky-offset-top" as string]: stickyOffset,
          ...style,
        } as CSSProperties);
  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label="Active filters"
      data-sticky={stickyAttr(sticky)}
      data-sticky-axis="top"
      className={cn("vds-data-table-filter-bar", className)}
      style={stickyStyle}
      {...props}
    >
      {children ??
        filters?.map((filter) => (
          <DataTableFilterChipItem
            key={filter.id}
            filter={filter}
            onClick={onFilterClick}
            onRemove={onRemoveFilter}
          />
        ))}
      {onAddFilter && (
        <Button
          type="button"
          variant="ghost"
          color="contrast"
          size="xs"
          className="vds-data-table-filter-add"
          onClick={onAddFilter}
        >
          <IconPlus size={12} stroke={1.75} aria-hidden focusable={false} />
          <span>{addLabel}</span>
        </Button>
      )}
    </div>
  );
});

export interface DataTableFilterChipItemProps {
  filter: DataTableFilterChip;
  onClick?: (filter: DataTableFilterChip) => void;
  onRemove?: (filterId: string) => void;
}

export function DataTableFilterChipItem({
  filter,
  onClick,
  onRemove,
}: DataTableFilterChipItemProps) {
  return (
    <Chip
      size="sm"
      appearance="outline"
      variant={filter.variant ?? "default"}
      interactive={!filter.disabled}
      disabled={filter.disabled}
      role="button"
      tabIndex={filter.disabled ? undefined : 0}
      className="vds-data-table-filter-chip"
      onClick={() => {
        if (!filter.disabled) onClick?.(filter);
      }}
      onKeyDown={(event) => {
        if (filter.disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.(filter);
        }
      }}
    >
      {filter.icon && <ChipIcon>{filter.icon}</ChipIcon>}
      <ChipLabel className="vds-data-table-filter-chip-label">
        {filter.label}
      </ChipLabel>
      {filter.value !== undefined && (
        <span className="vds-data-table-filter-chip-value">
          {filter.value}
        </span>
      )}
      {onRemove && (
        <ChipRemove
          aria-label={filter.removeLabel ?? `Remove ${String(filter.label)} filter`}
          onClick={(event) => {
            event.stopPropagation();
            onRemove(filter.id);
          }}
        />
      )}
    </Chip>
  );
}
