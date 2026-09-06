import { cn } from "../../../lib/utils";

export type NumberFormat =
  | "integer"
  | "decimal"
  | "currency"
  | "percent"
  | "compact"
  | ((n: number) => string);

export interface NumberCellProps {
  value: number | string | null | undefined;
  format?: NumberFormat;
  currency?: string;
  locale?: string;
  fractionDigits?: number;
  align?: "start" | "center" | "end";
  className?: string;
}

export function NumberCell({
  value,
  format = "decimal",
  currency = "USD",
  locale,
  fractionDigits,
  align = "end",
  className,
}: NumberCellProps) {
  if (value == null || value === "") {
    return (
      <span
        data-align={align}
        className={cn("vds-data-table-number-cell", className)}
      >
        —
      </span>
    );
  }
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) {
    return (
      <span
        data-align={align}
        className={cn("vds-data-table-number-cell", className)}
      >
        —
      </span>
    );
  }

  let text: string;
  if (typeof format === "function") {
    text = format(n);
  } else {
    const opts: Intl.NumberFormatOptions = {};
    if (format === "integer") opts.maximumFractionDigits = 0;
    else if (format === "decimal")
      opts.maximumFractionDigits = fractionDigits ?? 2;
    else if (format === "currency") {
      opts.style = "currency";
      opts.currency = currency;
      if (fractionDigits !== undefined)
        opts.minimumFractionDigits = opts.maximumFractionDigits = fractionDigits;
    } else if (format === "percent") {
      opts.style = "percent";
      opts.maximumFractionDigits = fractionDigits ?? 1;
    } else if (format === "compact") {
      opts.notation = "compact";
    }
    text = new Intl.NumberFormat(locale, opts).format(n);
  }

  return (
    <span
      data-align={align}
      className={cn("vds-data-table-number-cell", className)}
    >
      {text}
    </span>
  );
}
