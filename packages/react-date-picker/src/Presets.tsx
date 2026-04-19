import { cn } from "@virtari-packages/utils";
import type { ReactNode, Ref } from "react";
import type { DateRange } from "@react-stately/datepicker";
import { RadioGroup, RadioField } from "@virtari-packages/react-radio-group";
import type { DateValue } from "./date-utils";

export interface DatePickerPreset {
  id: string;
  label: ReactNode;
  value: DateValue;
  description?: ReactNode;
}

export interface DateRangePickerPreset {
  id: string;
  label: ReactNode;
  value: DateRange;
  description?: ReactNode;
}

/* ──────────────────────────────────────────────────────────── *
 * Single-date presets (radio group)
 * ──────────────────────────────────────────────────────────── */

export interface DatePickerPresetsProps {
  presets: DatePickerPreset[];
  value?: DateValue | null;
  onSelect: (value: DateValue) => void;
  /** Group label — announced by assistive tech. */
  label?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function DatePickerPresets({
  presets,
  value,
  onSelect,
  label = "Quick select",
  className,
  ref,
}: DatePickerPresetsProps) {
  const selectedId = presets.find((preset) =>
    value ? sameDay(value, preset.value) : false,
  )?.id;

  return (
    <RadioGroup
      ref={ref}
      label={label}
      className={cn("vds-date-picker-presets-list", className)}
      value={selectedId}
      onValueChange={(nextId) => {
        const preset = presets.find((item) => item.id === nextId);
        if (preset) onSelect(preset.value);
      }}
    >
      {presets.map((preset) => (
        <RadioField
          key={preset.id}
          value={preset.id}
          label={preset.label}
          description={preset.description}
        />
      ))}
    </RadioGroup>
  );
}

/* ──────────────────────────────────────────────────────────── *
 * Range presets (radio group)
 * ──────────────────────────────────────────────────────────── */

export interface DateRangePickerPresetsProps {
  presets: DateRangePickerPreset[];
  value?: DateRange | null;
  onSelect: (value: DateRange) => void;
  label?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function DateRangePickerPresets({
  presets,
  value,
  onSelect,
  label = "Quick select",
  className,
  ref,
}: DateRangePickerPresetsProps) {
  const selectedId = presets.find((preset) =>
    value
      ? sameDay(value.start, preset.value.start) &&
        sameDay(value.end, preset.value.end)
      : false,
  )?.id;

  return (
    <RadioGroup
      ref={ref}
      label={label}
      className={cn("vds-date-picker-presets-list", className)}
      value={selectedId}
      onValueChange={(nextId) => {
        const preset = presets.find((item) => item.id === nextId);
        if (preset) onSelect(preset.value);
      }}
    >
      {presets.map((preset) => (
        <RadioField
          key={preset.id}
          value={preset.id}
          label={preset.label}
          description={preset.description}
        />
      ))}
    </RadioGroup>
  );
}

function sameDay(a: DateValue, b: DateValue): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}
