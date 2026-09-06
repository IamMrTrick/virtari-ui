import { useEffect, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Input } from "../../input";
import type { InputSize } from "../../input";
import { cn } from "../../../lib/utils";
import { IconSearch, IconX } from "../../icons";

import { useDataTableContext } from "../DataTableContext";

export interface DataTableSearchFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "defaultValue" | "onChange" | "size" | "value"
  > {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  debounceMs?: number;
  clearable?: boolean;
  icon?: ReactNode;
  inputSize?: InputSize;
  wrapperClassName?: string;
}

export function DataTableSearchField({
  value,
  defaultValue,
  onValueChange,
  debounceMs = 150,
  clearable = true,
  icon,
  inputSize = "md",
  className,
  wrapperClassName,
  placeholder = "Search",
  "aria-label": ariaLabel = "Search table",
  ...props
}: DataTableSearchFieldProps) {
  const { table } = useDataTableContext();
  const tableValue = String(table.getState().globalFilter ?? "");
  const controlled = value !== undefined;
  const [local, setLocal] = useState(value ?? defaultValue ?? tableValue);

  useEffect(() => {
    if (controlled) setLocal(value ?? "");
  }, [controlled, value]);

  useEffect(() => {
    if (controlled) return;
    setLocal(tableValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableValue]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      table.setGlobalFilter(local);
      onValueChange?.(local);
    }, debounceMs);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local, debounceMs]);

  const clear = () => setLocal("");

  return (
    <div className={cn("vds-data-table-search-field", wrapperClassName)}>
      <span className="vds-data-table-search-field-icon" aria-hidden="true">
        {icon ?? <IconSearch size={14} stroke={1.75} focusable={false} />}
      </span>
      <Input
        inputSize={inputSize}
        type="search"
        value={local}
        onChange={(event) => setLocal(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn("vds-data-table-search-field-input", className)}
        {...props}
      />
      {clearable && local.length > 0 && (
        <button
          type="button"
          className="vds-data-table-search-field-clear"
          aria-label="Clear search"
          onClick={clear}
        >
          <IconX size={12} stroke={1.9} aria-hidden focusable={false} />
        </button>
      )}
    </div>
  );
}
