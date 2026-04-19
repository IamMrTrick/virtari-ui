/* ── Calendar / RangeCalendar (standalone) ── */
export { Calendar, RangeCalendar } from "./Calendar";
export type { CalendarProps, RangeCalendarProps } from "./Calendar";

/* ── DateField (segmented date input) ── */
export { DateField, FieldSegment } from "./DateField";
export type { DateFieldProps } from "./DateField";

/* ── TimeField (segmented time input) ── */
export { TimeField } from "./TimeField";
export type { TimeFieldProps } from "./TimeField";

/* ── DatePicker (single date, field + popover calendar) ── */
export { DatePicker } from "./DatePicker";
export type { DatePickerProps, DatePickerPresetRenderProps } from "./DatePicker";

/* ── DateRangePicker (start/end, field + popover range calendar) ── */
export { DateRangePicker } from "./DateRangePicker";
export type { DateRangePickerProps, DateRangePickerPresetRenderProps } from "./DateRangePicker";

/* ── Presets sidebar ── */
export { DatePickerPresets, DateRangePickerPresets } from "./Presets";
export type {
  DatePickerPreset,
  DateRangePickerPreset,
  DatePickerPresetsProps,
  DateRangePickerPresetsProps,
} from "./Presets";

/* ── Shared visual types ── */
export type { DatePickerSize, DatePickerAppearance } from "./context";
export type {
  MobilePickerPresentation,
  MobilePickerSizeMode,
  PickerOverlayMode,
} from "./picker-overlay";

/* ── Date engine utilities ── */
export { createCalendar, resolveLocale } from "./date-utils";
export type { CalendarSystem, DateValue } from "./date-utils";

/* ── Convenience re-exports from @internationalized/date ── */
export {
  CalendarDate,
  CalendarDateTime,
  Time,
  ZonedDateTime,
  today,
  now,
  getLocalTimeZone,
  parseDate,
  parseDateTime,
  parseTime,
  parseAbsolute,
  parseZonedDateTime,
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isWeekend,
  startOfMonth,
  startOfWeek,
  startOfYear,
  endOfMonth,
  endOfWeek,
  endOfYear,
  toCalendar,
  toCalendarDate,
  toCalendarDateTime,
  toZoned,
  GregorianCalendar,
  PersianCalendar,
  IslamicUmalquraCalendar,
  IslamicCivilCalendar,
  BuddhistCalendar,
  JapaneseCalendar,
  HebrewCalendar,
  IndianCalendar,
  EthiopicCalendar,
  TaiwanCalendar,
} from "@internationalized/date";

/* ── i18n primitives needed by consumers ── */
export { I18nProvider, useLocale } from "@react-aria/i18n";

/* ── DateRange type for consumers binding their own state ── */
export type { DateRange } from "@react-stately/datepicker";
