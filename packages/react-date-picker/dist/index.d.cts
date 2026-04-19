import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, Ref } from 'react';
import { Calendar as Calendar$1, DateDuration, DateValue } from '@internationalized/date';
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
    calendar?: CalendarSystem;
    locale?: string;
    footer?: ReactNode;
    className?: string;
    visibleDuration?: DateDuration;
    pageBehavior?: "single" | "visible";
}
type CalendarView = "days" | "months" | "years";
/** Imperative handle exposed via `apiRef` so a parent (e.g. DatePicker)
 * can drive the year/month draft commit from an external action bar. */
interface CalendarHandle {
    getView: () => CalendarView;
    setView: (view: CalendarView) => void;
    hasMonthDraft: () => boolean;
    hasYearDraft: () => boolean;
    applyMonthDraft: () => void;
    applyYearDraft: () => void;
    cancelDraft: () => void;
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
    /** Fires when the internal view changes (days/months/years). */
    onViewChange?: (view: CalendarView) => void;
    /** Parent-supplied ref populated with year/month draft-commit methods. */
    apiRef?: {
        current: CalendarHandle | null;
    };
    /** If true, Calendar hides its own Cancel/Change-Year/Month footer.
     *  Parent is expected to render an external action bar and drive
     *  commits through `apiRef`. */
    hideInternalActions?: boolean;
    ref?: Ref<HTMLDivElement>;
}
declare function Calendar({ size, appearance, invalid, calendar, locale, footer, className, onViewChange, apiRef, hideInternalActions, ref, ...props }: CalendarProps): react_jsx_runtime.JSX.Element;
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
    onViewChange?: (view: CalendarView) => void;
    apiRef?: {
        current: CalendarHandle | null;
    };
    hideInternalActions?: boolean;
    ref?: Ref<HTMLDivElement>;
}
declare function RangeCalendar({ size, appearance, invalid, calendar, locale, footer, className, onViewChange, apiRef, hideInternalActions, ref, ...props }: RangeCalendarProps): react_jsx_runtime.JSX.Element;

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

type MobilePickerPresentation = "drawer" | "dialog";
type MobilePickerSizeMode = "content" | "full";
type PickerOverlayMode = "auto" | "popover" | "drawer" | "dialog";

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
    showPicker?: boolean;
    showMilliseconds?: boolean;
    millisecondStep?: number;
    /**
     * Seeded time when the picker opens with no current value.
     * Defaults to the user's current local time (see `nowAsTime()`).
     */
    defaultTimeValue?: TimeValue;
    /**
     * When provided, intercepts field/trigger clicks and replaces the
     * default "open internal picker" behavior. The internal popover + mobile
     * surface are suppressed — parent owns picker presentation.
     * Used by DatePicker mobile step 1 to route to its time step.
     */
    onTriggerClick?: () => void;
    overlayMode?: PickerOverlayMode;
    mobilePresentation?: MobilePickerPresentation;
    mobileSizeMode?: MobilePickerSizeMode;
    ref?: Ref<HTMLDivElement>;
}
declare function TimeField({ size, appearance, invalid, locale, label, description, errorMessage, className, showPicker, showMilliseconds, millisecondStep, defaultTimeValue, onTriggerClick, overlayMode, mobilePresentation, mobileSizeMode, ref, ...props }: TimeFieldProps): react_jsx_runtime.JSX.Element;

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
    showTimePicker?: boolean;
    showMilliseconds?: boolean;
    millisecondStep?: number;
    /**
     * Seeded time when the picker opens without a value. Defaults to the user's
     * current local time (now). Pass any `TimeValue` to override.
     */
    defaultTimeValue?: TimeValue;
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
    presets?: ReactNode | ((props: DatePickerPresetRenderProps) => ReactNode);
    footer?: ReactNode;
    overlayMode?: PickerOverlayMode;
    mobilePresentation?: MobilePickerPresentation;
    mobileSizeMode?: MobilePickerSizeMode;
    ref?: Ref<HTMLDivElement>;
}
interface DatePickerPresetRenderProps {
    value: DateValue | null;
    setValue: (value: DateValue | null) => void;
}
declare function DatePicker({ size, appearance, invalid, calendar, locale, label, description, errorMessage, presets, footer, className, overlayMode, mobilePresentation, mobileSizeMode, defaultTimeValue, ref, ...props }: DatePickerProps): react_jsx_runtime.JSX.Element;

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
    showTimePicker?: boolean;
    showMilliseconds?: boolean;
    millisecondStep?: number;
    /**
     * Seeded time (applied to both start and end) when the picker opens
     * without a value. Defaults to the user's current local time (now).
     */
    defaultTimeValue?: TimeValue;
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
    presets?: ReactNode | ((props: DateRangePickerPresetRenderProps) => ReactNode);
    footer?: ReactNode;
    overlayMode?: PickerOverlayMode;
    mobilePresentation?: MobilePickerPresentation;
    mobileSizeMode?: MobilePickerSizeMode;
    ref?: Ref<HTMLDivElement>;
}
interface DateRangePickerPresetRenderProps {
    value: DateRange | null;
    setValue: (value: DateRange | null) => void;
}
declare function DateRangePicker({ size, appearance, invalid, calendar, locale, label, description, errorMessage, presets, footer, className, overlayMode, mobilePresentation, mobileSizeMode, defaultTimeValue, ref, ...props }: DateRangePickerProps): react_jsx_runtime.JSX.Element;

interface DatePickerPreset {
    id: string;
    label: ReactNode;
    value: DateValue;
    description?: ReactNode;
}
interface DateRangePickerPreset {
    id: string;
    label: ReactNode;
    value: DateRange;
    description?: ReactNode;
}
interface DatePickerPresetsProps {
    presets: DatePickerPreset[];
    value?: DateValue | null;
    onSelect: (value: DateValue) => void;
    /** Group label — announced by assistive tech. */
    label?: ReactNode;
    className?: string;
    ref?: Ref<HTMLDivElement>;
}
declare function DatePickerPresets({ presets, value, onSelect, label, className, ref, }: DatePickerPresetsProps): react_jsx_runtime.JSX.Element;
interface DateRangePickerPresetsProps {
    presets: DateRangePickerPreset[];
    value?: DateRange | null;
    onSelect: (value: DateRange) => void;
    label?: ReactNode;
    className?: string;
    ref?: Ref<HTMLDivElement>;
}
declare function DateRangePickerPresets({ presets, value, onSelect, label, className, ref, }: DateRangePickerPresetsProps): react_jsx_runtime.JSX.Element;

export { Calendar, type CalendarProps, type CalendarSystem, DateField, type DateFieldProps, DatePicker, type DatePickerAppearance, type DatePickerPreset, type DatePickerPresetRenderProps, DatePickerPresets, type DatePickerPresetsProps, type DatePickerProps, type DatePickerSize, DateRangePicker, type DateRangePickerPreset, type DateRangePickerPresetRenderProps, DateRangePickerPresets, type DateRangePickerPresetsProps, type DateRangePickerProps, FieldSegment, type MobilePickerPresentation, type MobilePickerSizeMode, type PickerOverlayMode, RangeCalendar, type RangeCalendarProps, TimeField, type TimeFieldProps, createCalendar, resolveLocale };
