import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@virtari-packages/utils";
import { IconLayoutKanban, IconList, IconTable } from "@virtari-packages/react-icons";

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
  table: <IconTable size={14} stroke={1.5} aria-hidden focusable={false} />,
  board: <IconLayoutKanban size={14} stroke={1.5} aria-hidden focusable={false} />,
  list: <IconList size={14} stroke={1.5} aria-hidden focusable={false} />,
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
