import { forwardRef } from "react";
import type { Column } from "@tanstack/react-table";
import { Input } from "../../input";
import { cn } from "../../../lib/utils";

import { useColumnFilter } from "../use-column-filter";

export type DateRange = [string | undefined, string | undefined];

export interface DateFilterProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  /** Whether to render as a range (two inputs) or single date. Default "range". */
  mode?: "single" | "range";
  className?: string;
}

export const DateFilter = forwardRef<HTMLDivElement, DateFilterProps>(
  function DateFilter({ column, mode = "range", className }, ref) {
    if (mode === "single") {
      return <DateFilterSingle column={column} className={className} ref={ref} />;
    }
    return <DateFilterRange column={column} className={className} ref={ref} />;
  },
);

const DateFilterSingle = forwardRef<HTMLDivElement, DateFilterProps>(
  function DateFilterSingle({ column, className }, ref) {
    const { value, setValue } = useColumnFilter<string>(column);
    return (
      <div
        ref={ref}
        className={cn("vds-data-table-filter-date", className)}
        role="group"
        aria-label={`Filter ${column.id} by date`}
      >
        <Input
          inputSize="sm"
          type="date"
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value || undefined)}
        />
      </div>
    );
  },
);

const DateFilterRange = forwardRef<HTMLDivElement, DateFilterProps>(
  function DateFilterRange({ column, className }, ref) {
    const { value, setValue } = useColumnFilter<DateRange>(column);
    const [from, to] = value ?? [undefined, undefined];
    const update = (f: string | undefined, t: string | undefined) => {
      if (!f && !t) setValue(undefined);
      else setValue([f, t]);
    };
    return (
      <div
        ref={ref}
        className={cn("vds-data-table-filter-date", className)}
        role="group"
        aria-label={`Filter ${column.id} by date range`}
      >
        <Input
          inputSize="sm"
          type="date"
          aria-label="From"
          value={from ?? ""}
          onChange={(e) => update(e.target.value || undefined, to)}
        />
        <span className="vds-data-table-filter-sep" aria-hidden="true">
          –
        </span>
        <Input
          inputSize="sm"
          type="date"
          aria-label="To"
          value={to ?? ""}
          onChange={(e) => update(from, e.target.value || undefined)}
        />
      </div>
    );
  },
);
