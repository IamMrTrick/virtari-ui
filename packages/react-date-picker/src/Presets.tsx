import { cn } from "@virtari/utils";
import type { ReactNode, Ref } from "react";
import type { DateRange } from "@react-stately/datepicker";
import type { DateValue } from "./date-utils";

export interface DatePickerPreset {
  id: string;
  label: ReactNode;
  value: DateValue;
}

export interface DateRangePickerPreset {
  id: string;
  label: ReactNode;
  value: DateRange;
}

/* ──────────────────────────────────────────────────────────── *
 * Single-date presets
 * ──────────────────────────────────────────────────────────── */

export interface DatePickerPresetsProps {
  presets: DatePickerPreset[];
  value?: DateValue | null;
  onSelect: (value: DateValue) => void;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function DatePickerPresets({
  presets,
  value,
  onSelect,
  className,
  ref,
}: DatePickerPresetsProps) {
  return (
    <div ref={ref} className={cn("vds-date-picker-presets-list", className)}>
      {presets.map((preset) => {
        const selected = value ? sameDay(value, preset.value) : false;
        return (
          <button
            key={preset.id}
            type="button"
            className="vds-date-picker-preset"
            data-selected={selected ? "true" : undefined}
            onClick={() => onSelect(preset.value)}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── *
 * Range presets
 * ──────────────────────────────────────────────────────────── */

export interface DateRangePickerPresetsProps {
  presets: DateRangePickerPreset[];
  value?: DateRange | null;
  onSelect: (value: DateRange) => void;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function DateRangePickerPresets({
  presets,
  value,
  onSelect,
  className,
  ref,
}: DateRangePickerPresetsProps) {
  return (
    <div ref={ref} className={cn("vds-date-picker-presets-list", className)}>
      {presets.map((preset) => {
        const selected = value
          ? sameDay(value.start, preset.value.start) && sameDay(value.end, preset.value.end)
          : false;
        return (
          <button
            key={preset.id}
            type="button"
            className="vds-date-picker-preset"
            data-selected={selected ? "true" : undefined}
            onClick={() => onSelect(preset.value)}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}

function sameDay(a: DateValue, b: DateValue): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}
