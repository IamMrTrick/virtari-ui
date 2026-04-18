import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@virtari/utils";

import { useDataTableContext } from "../DataTableContext";
import type { DataTableViewMode } from "../types";

export interface DataTableViewModeToggleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Which modes to show — defaults to all three. */
  modes?: DataTableViewMode[];
  /** Custom labels per mode. */
  labels?: Partial<Record<DataTableViewMode, ReactNode>>;
  /** Custom icons per mode. */
  icons?: Partial<Record<DataTableViewMode, ReactNode>>;
}

const DEFAULT_MODES: DataTableViewMode[] = ["table", "board", "list"];

const DEFAULT_LABELS: Record<DataTableViewMode, string> = {
  table: "Table",
  board: "Board",
  list: "List",
};

const DEFAULT_ICONS: Record<DataTableViewMode, ReactNode> = {
  table: (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
      <rect x="1.5" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1.5 5.5h11M5 2v10" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
  board: (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <rect x="8" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <rect x="1.5" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <rect x="8" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
  list: (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
      <path d="M2 3.5h10M2 7h10M2 10.5h10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
};

export const DataTableViewModeToggle = forwardRef<
  HTMLDivElement,
  DataTableViewModeToggleProps
>(function DataTableViewModeToggle(
  { modes = DEFAULT_MODES, labels, icons, className, ...props },
  ref,
) {
  const { viewMode, setViewMode } = useDataTableContext();
  return (
    <div
      ref={ref}
      role="group"
      aria-label="View mode"
      className={cn("vds-data-table-view-toggle", className)}
      {...props}
    >
      {modes.map((m) => {
        const active = viewMode === m;
        return (
          <button
            key={m}
            type="button"
            aria-pressed={active}
            aria-label={`${DEFAULT_LABELS[m]} view`}
            data-active={active ? "" : undefined}
            data-mode={m}
            className="vds-data-table-view-toggle-button"
            onClick={() => setViewMode(m)}
          >
            <span className="vds-data-table-view-toggle-icon">
              {icons?.[m] ?? DEFAULT_ICONS[m]}
            </span>
            <span className="vds-data-table-view-toggle-label">
              {labels?.[m] ?? DEFAULT_LABELS[m]}
            </span>
          </button>
        );
      })}
    </div>
  );
});
