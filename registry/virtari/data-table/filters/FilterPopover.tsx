import type { ReactNode } from "react";
import type { Column } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../popover";
import { cn } from "../../../lib/utils";
import { IconFilter, IconFilterFilled } from "../../icons";

import { useColumnFilter } from "../use-column-filter";

export interface FilterPopoverProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  /** Body of the popover — a filter control (e.g., `<TextFilter column={col} />`). */
  children: ReactNode;
  /** Trigger content — defaults to a funnel glyph. */
  trigger?: ReactNode;
  className?: string;
  /** Side the popover opens to. */
  side?: "top" | "right" | "bottom" | "left";
}

export function FilterPopover<TData, TValue>({
  column,
  children,
  trigger,
  className,
  side = "bottom",
}: FilterPopoverProps<TData, TValue>) {
  const { isActive, clear } = useColumnFilter(column);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Filter ${column.id}`}
          data-active={isActive ? "" : undefined}
          className={cn("vds-data-table-filter-trigger", className)}
        >
          {trigger ?? (
            isActive ? (
              <IconFilterFilled size={12} stroke={1.5} aria-hidden focusable={false} />
            ) : (
              <IconFilter size={12} stroke={1.5} aria-hidden focusable={false} />
            )
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent side={side} align="start" sideOffset={4}>
        <div className="vds-data-table-filter-popover">
          {children}
          {isActive && (
            <button
              type="button"
              onClick={clear}
              className="vds-data-table-filter-clear"
            >
              Clear filter
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
