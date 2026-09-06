import { cn } from "../../../lib/utils";

export type DateFormat =
  | "short"
  | "medium"
  | "long"
  | "relative"
  | ((d: Date) => string);

export interface DateCellProps {
  value: Date | string | number | null | undefined;
  format?: DateFormat;
  locale?: string;
  className?: string;
}

function formatRelative(d: Date): string {
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;
  const abs = Math.abs(diff);
  const units: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [3600, "minute"],
    [86400, "hour"],
    [604800, "day"],
    [2592000, "week"],
    [31536000, "month"],
    [Infinity, "year"],
  ];
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const divisors = [1, 60, 3600, 86400, 604800, 2592000, 31536000];
  for (let i = 0; i < units.length; i++) {
    const [limit, unit] = units[i]!;
    if (abs < limit) {
      const value = Math.round(-diff / divisors[i]!);
      return rtf.format(value, unit);
    }
  }
  return d.toLocaleDateString();
}

export function DateCell({
  value,
  format = "medium",
  locale,
  className,
}: DateCellProps) {
  if (value == null || value === "") {
    return <span className={cn("vds-data-table-date-cell", className)}>—</span>;
  }
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) {
    return <span className={cn("vds-data-table-date-cell", className)}>—</span>;
  }

  let text: string;
  if (typeof format === "function") {
    text = format(d);
  } else if (format === "relative") {
    text = formatRelative(d);
  } else {
    const dateStyle =
      format === "short" ? "short" : format === "long" ? "long" : "medium";
    text = new Intl.DateTimeFormat(locale, { dateStyle }).format(d);
  }

  return (
    <time
      dateTime={d.toISOString()}
      title={d.toLocaleString(locale)}
      className={cn("vds-data-table-date-cell", className)}
    >
      {text}
    </time>
  );
}
