import { forwardRef } from "react";
import type { Column } from "@tanstack/react-table";
import { Input } from "@virtari-packages/react-input";
import { cn } from "@virtari-packages/utils";

import { useColumnFilter } from "../use-column-filter";

export type NumberRange = [number | undefined, number | undefined];

export interface NumberFilterProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  placeholder?: [string, string];
  className?: string;
}

export const NumberFilter = forwardRef<HTMLDivElement, NumberFilterProps>(
  function NumberFilter(
    { column, placeholder = ["Min", "Max"], className },
    ref,
  ) {
    const { value, setValue } = useColumnFilter<NumberRange>(column);
    const [min, max] = value ?? [undefined, undefined];
    const update = (nextMin: number | undefined, nextMax: number | undefined) => {
      if (nextMin === undefined && nextMax === undefined) {
        setValue(undefined);
      } else {
        setValue([nextMin, nextMax]);
      }
    };
    return (
      <div
        ref={ref}
        className={cn("vds-data-table-filter-number", className)}
        role="group"
        aria-label={`Filter ${column.id} by number range`}
      >
        <Input
          inputSize="sm"
          type="number"
          aria-label="Minimum"
          placeholder={placeholder[0]}
          value={min ?? ""}
          onChange={(e) =>
            update(
              e.target.value === "" ? undefined : Number(e.target.value),
              max,
            )
          }
        />
        <span className="vds-data-table-filter-sep" aria-hidden="true">
          –
        </span>
        <Input
          inputSize="sm"
          type="number"
          aria-label="Maximum"
          placeholder={placeholder[1]}
          value={max ?? ""}
          onChange={(e) =>
            update(
              min,
              e.target.value === "" ? undefined : Number(e.target.value),
            )
          }
        />
      </div>
    );
  },
);
