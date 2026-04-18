import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, Ref } from 'react';
import { Calendar as Calendar$1, DateValue } from '@internationalized/date';
export { BuddhistCalendar, CalendarDate, CalendarDateTime, DateValue, EthiopicCalendar, GregorianCalendar, HebrewCalendar, IndianCalendar, IslamicCivilCalendar, IslamicUmalquraCalendar, JapaneseCalendar, PersianCalendar, TaiwanCalendar, Time, ZonedDateTime, endOfMonth, endOfWeek, endOfYear, getLocalTimeZone, isSameDay, isSameMonth, isSameYear, isToday, isWeekend, now, parseAbsolute, parseDate, parseDateTime, parseTime, parseZonedDateTime, startOfMonth, startOfWeek, startOfYear, toCalendar, toCalendarDate, toCalendarDateTime, toZoned, today } from '@internationalized/date';
import { DateSegment, DateFieldState, TimeValue, DateRange } from '@react-stately/datepicker';
export { DateRange } from '@react-stately/datepicker';
export { I18nProvider, useLocale } from '@react-aria/i18n';

type CalendarSystem = "gregory" | "persian" | "islamic-umalqura" | "islamic-civil" | "islamic-tbla" | "buddhist" | "japanese" | "hebrew" | "indian" | "ethiopic" | "ethioaa" | "roc";
/** Factory mapping calendar identifier → Calendar instance. */
declare function createCalendar(identifier: string): Calendar$1;
/** Resolve the locale string when a calendar system override is provided. */
declare function resolveLocale(locale: string, calendar?: CalendarSystem): string;

type DatePickerSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type DatePickerAppearance = "soft" | "outline" | "ghost" | "filled";

interface CalendarVisualProps {
    size?: DatePickerSize;
    appearance?: DatePickerAppearance;
    invalid?: boolean;
    /** Calendar system override (e.g. "persian", "islamic-umalqura"). */
    calendar?: CalendarSystem;
    /** Locale override, e.g. "fa-IR". Falls back to I18nProvider locale. */
    locale?: string;
    /** Custom footer rendered under the month grid. */
    footer?: ReactNode;
    className?: string;
}
interface CalendarProps extends CalendarVisualProps {
    value?: DateValue | null;
    defaultValue?: DateValue | null;
    onChange?: (value: DateValue) => void;
    minValue?: DateValue | null;
    maxValue?: DateValue | null;
    isDateUnavailable?: (date: DateValue) => boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    autoFocus?: boolean;
    "aria-label"?: string;
    ref?: Ref<HTMLDivElement>;
}
declare function Calendar({ size, appearance, invalid, calendar, locale, footer, className, ref, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;
interface RangeCalendarProps extends CalendarVisualProps {
    value?: {
        start: DateValue;
        end: DateValue;
    } | null;
    defaultValue?: {
        start: DateValue;
        end: DateValue;
    } | null;
    onChange?: (value: {
        start: DateValue;
        end: DateValue;
    }) => void;
    minValue?: DateValue | null;
    maxValue?: DateValue | null;
    isDateUnavailable?: (date: DateValue) => boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    allowsNonContiguousRanges?: boolean;
    autoFocus?: boolean;
    "aria-label"?: string;
    ref?: Ref<HTMLDivElement>;
}
declare function RangeCalendar({ size, appearance, invalid, calendar, locale, footer, className, ref, ...props }: RangeCalendarProps): react_jsx_runtime.JSX.Element;

interface DateFieldProps {
    value?: DateValue | null;
    defaultValue?: DateValue | null;
    onChange?: (value: DateValue | null) => void;
    minValue?: DateValue;
    maxValue?: DateValue;
    placeholderValue?: DateValue;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isInvalid?: boolean;
    granularity?: "day" | "hour" | "minute" | "second";
    hourCycle?: 12 | 24;
    hideTimeZone?: boolean;
    label?: ReactNode;
    description?: ReactNode;
    errorMessage?: ReactNode;
    "aria-label"?: string;
    name?: string;
    autoFocus?: boolean;
    size?: DatePickerSize;
    appearance?: DatePickerAppearance;
    /** Shorthand for isInvalid plus error styling. */
    invalid?: boolean;
    calendar?: CalendarSystem;
    locale?: string;
    className?: string;
    ref?: Ref<HTMLDivElement>;
}
declare function DateField({ size, appearance, invalid, calendar, locale, label, description, errorMessage, className, ref, ...props }: DateFieldProps): react_jsx_runtime.JSX.Element;
interface FieldSegmentProps {
    segment: DateSegment;
    state: DateFieldState;
}
declare function FieldSegment({ segment, state }: FieldSegmentProps): react_jsx_runtime.JSX.Element;

interface TimeFieldProps {
    value?: TimeValue | null;
    defaultValue?: TimeValue | null;
    onChange?: (value: TimeValue | null) => void;
    minValue?: TimeValue;
    maxValue?: TimeValue;
    placeholderValue?: TimeValue;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isInvalid?: boolean;
    granularity?: "hour" | "minute" | "second";
    hourCycle?: 12 | 24;
    hideTimeZone?: boolean;
    label?: ReactNode;
    description?: ReactNode;
    errorMessage?: ReactNode;
    "aria-label"?: string;
    name?: string;
    autoFocus?: boolean;
    size?: DatePickerSize;
    appearance?: DatePickerAppearance;
    invalid?: boolean;
    locale?: string;
    className?: string;
    ref?: Ref<HTMLDivElement>;
}
declare function TimeField({ size, appearance, invalid, locale, label, description, errorMessage, className, ref, ...props }: TimeFieldProps): react_jsx_runtime.JSX.Element;

interface DatePickerProps {
    value?: DateValue | null;
    defaultValue?: DateValue | null;
    onChange?: (value: DateValue | null) => void;
    minValue?: DateValue;
    maxValue?: DateValue;
    placeholderValue?: DateValue;
    isDateUnavailable?: (date: DateValue) => boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isInvalid?: boolean;
    granularity?: "day" | "hour" | "minute" | "second";
    hourCycle?: 12 | 24;
    hideTimeZone?: boolean;
    shouldCloseOnSelect?: boolean;
    autoFocus?: boolean;
    name?: string;
    label?: ReactNode;
    description?: ReactNode;
    errorMessage?: ReactNode;
    "aria-label"?: string;
    size?: DatePickerSize;
    appearance?: DatePickerAppearance;
    invalid?: boolean;
    calendar?: CalendarSystem;
    locale?: string;
    className?: string;
    /** Rendered to the left of the calendar — e.g., `<DatePickerPresets>` */
    presets?: ReactNode;
    /** Rendered below the calendar (after the optional time field) */
    footer?: ReactNode;
    ref?: Ref<HTMLDivElement>;
}
declare function DatePicker({ size, appearance, invalid, calendar, locale, label, description, errorMessage, presets, footer, className, ref, ...props }: DatePickerProps): react_jsx_runtime.JSX.Element;

interface DateRangePickerProps {
    value?: DateRange | null;
    defaultValue?: DateRange | null;
    onChange?: (value: DateRange | null) => void;
    minValue?: DateValue;
    maxValue?: DateValue;
    placeholderValue?: DateValue;
    isDateUnavailable?: (date: DateValue) => boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isInvalid?: boolean;
    granularity?: "day" | "hour" | "minute" | "second";
    hourCycle?: 12 | 24;
    hideTimeZone?: boolean;
    shouldCloseOnSelect?: boolean;
    allowsNonContiguousRanges?: boolean;
    autoFocus?: boolean;
    startName?: string;
    endName?: string;
    label?: ReactNode;
    description?: ReactNode;
    errorMessage?: ReactNode;
    "aria-label"?: string;
    size?: DatePickerSize;
    appearance?: DatePickerAppearance;
    invalid?: boolean;
    calendar?: CalendarSystem;
    locale?: string;
    className?: string;
    presets?: ReactNode;
    footer?: ReactNode;
    ref?: Ref<HTMLDivElement>;
}
declare function DateRangePicker({ size, appearance, invalid, calendar, locale, label, description, errorMessage, presets, footer, className, ref, ...props }: DateRangePickerProps): react_jsx_runtime.JSX.Element;

interface DatePickerPreset {
    id: string;
    label: ReactNode;
    value: DateValue;
}
interface DateRangePickerPreset {
    id: string;
    label: ReactNode;
    value: DateRange;
}
interface DatePickerPresetsProps {
    presets: DatePickerPreset[];
    value?: DateValue | null;
    onSelect: (value: DateValue) => void;
    className?: string;
    ref?: Ref<HTMLDivElement>;
}
declare function DatePickerPresets({ presets, value, onSelect, className, ref, }: DatePickerPresetsProps): react_jsx_runtime.JSX.Element;
interface DateRangePickerPresetsProps {
    presets: DateRangePickerPreset[];
    value?: DateRange | null;
    onSelect: (value: DateRange) => void;
    className?: string;
    ref?: Ref<HTMLDivElement>;
}
declare function DateRangePickerPresets({ presets, value, onSelect, className, ref, }: DateRangePickerPresetsProps): react_jsx_runtime.JSX.Element;

export { Calendar, type CalendarProps, type CalendarSystem, DateField, type DateFieldProps, DatePicker, type DatePickerAppearance, type DatePickerPreset, DatePickerPresets, type DatePickerPresetsProps, type DatePickerProps, type DatePickerSize, DateRangePicker, type DateRangePickerPreset, DateRangePickerPresets, type DateRangePickerPresetsProps, type DateRangePickerProps, FieldSegment, RangeCalendar, type RangeCalendarProps, TimeField, type TimeFieldProps, createCalendar, resolveLocale };
