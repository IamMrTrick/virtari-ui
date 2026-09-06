import { forwardRef } from "react";
import type { Column } from "@tanstack/react-table";
import { Input } from "../../input";
import { cn } from "../../../lib/utils";

import { useColumnFilter } from "../use-column-filter";

export interface TextFilterProps<TData = unknown, TValue = unknown> {
  column: Column<TData, TValue>;
  placeholder?: string;
  className?: string;
}

export const TextFilter = forwardRef<HTMLInputElement, TextFilterProps>(
  function TextFilter({ column, placeholder = "Filter…", className }, ref) {
    const { value, setValue } = useColumnFilter<string>(column);
    return (
      <Input
        ref={ref}
        inputSize="sm"
        type="text"
        aria-label={`Filter ${column.id}`}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) =>
          setValue(e.target.value === "" ? undefined : e.target.value)
        }
        className={cn("vds-data-table-filter-text", className)}
      />
    );
  },
);
