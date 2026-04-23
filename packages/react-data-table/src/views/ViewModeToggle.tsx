import { forwardRef } from "react";
import type { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@virtari-packages/react-tabs";
import type { TabsProps, TabsSize, TabsVariant } from "@virtari-packages/react-tabs";
import {
  IconLayoutBoard,
  IconLayoutList,
  IconTable,
} from "@virtari-packages/react-icons";
import { cn } from "@virtari-packages/utils";

import { useDataTableContext } from "../DataTableContext";
import type { DataTableViewMode } from "../types";

export interface DataTableViewModeToggleProps
  extends Omit<
    TabsProps,
    "children" | "defaultValue" | "onValueChange" | "value"
  > {
  /** Which modes to show — defaults to all three. */
  modes?: DataTableViewMode[];
  /** Custom labels per mode. */
  labels?: Partial<Record<DataTableViewMode, ReactNode>>;
  /** Custom icons per mode. */
  icons?: Partial<Record<DataTableViewMode, ReactNode>>;
  /** Tabs visual style. Defaults to the design-system segmented control. */
  variant?: TabsVariant;
  /** Size preset shared with Button/Input/Select. */
  size?: TabsSize;
}

const DEFAULT_MODES: DataTableViewMode[] = ["table", "board", "list"];

const DEFAULT_LABELS: Record<DataTableViewMode, string> = {
  table: "Table",
  board: "Board",
  list: "List",
};

const DEFAULT_ICON_PROPS = {
  size: 14,
  stroke: 1.75,
  "aria-hidden": true as const,
  focusable: false as const,
};

const DEFAULT_ICONS: Record<DataTableViewMode, ReactNode> = {
  table: <IconTable {...DEFAULT_ICON_PROPS} />,
  board: <IconLayoutBoard {...DEFAULT_ICON_PROPS} />,
  list: <IconLayoutList {...DEFAULT_ICON_PROPS} />,
};

function iconForMode(
  icons: Partial<Record<DataTableViewMode, ReactNode>> | undefined,
  mode: DataTableViewMode,
) {
  if (icons && Object.prototype.hasOwnProperty.call(icons, mode)) {
    return icons[mode];
  }
  return DEFAULT_ICONS[mode];
}

export const DataTableViewModeToggle = forwardRef<
  HTMLDivElement,
  DataTableViewModeToggleProps
>(function DataTableViewModeToggle(
  {
    modes = DEFAULT_MODES,
    labels,
    icons,
    variant = "segmented",
    size = "md",
    className,
    ...props
  },
  ref,
) {
  const { viewMode, setViewMode } = useDataTableContext();
  return (
    <Tabs
      ref={ref}
      value={viewMode}
      onValueChange={(value) => setViewMode(value as DataTableViewMode)}
      className={cn("vds-data-table-view-toggle", className)}
      {...props}
    >
      <TabsList
        variant={variant}
        size={size}
        aria-label="View mode"
      >
        {modes.map((m) => {
          const icon = iconForMode(icons, m);
          return (
            <TabsTrigger
              key={m}
              value={m}
              aria-label={`${DEFAULT_LABELS[m]} view`}
            >
              {icon ? (
                <span className="vds-data-table-view-toggle-icon">
                  {icon}
                </span>
              ) : null}
              {labels?.[m] ?? DEFAULT_LABELS[m]}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
});
