import { forwardRef, useMemo } from "react";
import type { Column } from "@tanstack/react-table";
import { cn } from "@virtari/utils";

import { useColumnFilter } from "../use-column-filter";

export interface SelectFilterOption {
  value: string;
  label?: string;
}

export interface SelectFilterProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  options?: (string | SelectFilterOption)[];
  /** Allow multi-select. Default false. */
  multiple?: boolean;
  placeholder?: string;
  className?: string;
}

export const SelectFilter = forwardRef<HTMLSelectElement, SelectFilterProps>(
  function SelectFilter(
    {
      column,
      options,
      multiple = false,
      placeholder = "All",
      className,
    },
    ref,
  ) {
    const { value, setValue } = useColumnFilter<string | string[]>(column);

    /* Auto-derive options from faceted unique values when none provided. */
    const resolvedOptions = useMemo<SelectFilterOption[]>(() => {
      if (options) {
        return options.map((o) =>
          typeof o === "string" ? { value: o, label: o } : o,
        );
      }
      const facet = column.getFacetedUniqueValues();
      return Array.from(facet.keys())
        .filter((k) => k != null && k !== "")
        .map((k) => ({ value: String(k), label: String(k) }));
    }, [options, column]);

    return (
      <select
        ref={ref}
        multiple={multiple}
        value={
          multiple
            ? Array.isArray(value)
              ? value
              : []
            : typeof value === "string"
              ? value
              : ""
        }
        aria-label={`Filter ${column.id}`}
        className={cn("vds-data-table-filter-select", className)}
        onChange={(e) => {
          if (multiple) {
            const selected = Array.from(e.target.selectedOptions, (o) =>
              o.value,
            );
            setValue(selected.length ? selected : undefined);
          } else {
            const v = e.target.value;
            setValue(v === "" ? undefined : v);
          }
        }}
      >
        {!multiple && <option value="">{placeholder}</option>}
        {resolvedOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label ?? opt.value}
          </option>
        ))}
      </select>
    );
  },
);
