import { cn } from "@virtari/utils";
import { useRef, type ReactNode, type Ref } from "react";
import {
  useCalendar,
  useCalendarGrid,
  useCalendarCell,
  useRangeCalendar,
} from "@react-aria/calendar";
import {
  useCalendarState,
  useRangeCalendarState,
  type CalendarState,
  type RangeCalendarState,
} from "@react-stately/calendar";
import { useLocale } from "@react-aria/i18n";
import {
  getWeeksInMonth,
  isSameDay,
  type CalendarDate,
} from "@internationalized/date";
import { createCalendar, resolveLocale, type CalendarSystem, type DateValue } from "./date-utils";
import type { DatePickerSize, DatePickerAppearance } from "./context";

/* ──────────────────────────────────────────────────────────── *
 * Shared visual props
 * ──────────────────────────────────────────────────────────── */

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

/* ──────────────────────────────────────────────────────────── *
 * Chevron icons — match the Virtari SVG style (1.5 stroke)
 * ──────────────────────────────────────────────────────────── */

function ChevronLeft() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path d="M7.5 3L4.5 6L7.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────── *
 * Calendar (single-date)
 * ──────────────────────────────────────────────────────────── */

export interface CalendarProps extends CalendarVisualProps {
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

export function Calendar({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  footer,
  className,
  ref,
  ...props
}: CalendarProps) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = useCalendarState({
    ...props,
    locale: usedLocale,
    createCalendar,
  });
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state,
  );

  return (
    <div
      {...calendarProps}
      ref={ref}
      className={cn("vds-calendar", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={invalid ? "true" : undefined}
      data-dir={direction}
    >
      <div className="vds-calendar-header">
        <button
          {...prevButtonProps}
          type="button"
          className="vds-calendar-nav"
          aria-label={prevButtonProps["aria-label"] ?? "Previous month"}
        >
          {direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <h2 className="vds-calendar-heading" aria-live="polite">
          {title}
        </h2>
        <button
          {...nextButtonProps}
          type="button"
          className="vds-calendar-nav"
          aria-label={nextButtonProps["aria-label"] ?? "Next month"}
        >
          {direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>
      <CalendarGrid state={state} />
      {footer ? <div className="vds-calendar-footer">{footer}</div> : null}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── *
 * RangeCalendar
 * ──────────────────────────────────────────────────────────── */

export interface RangeCalendarProps extends CalendarVisualProps {
  value?: { start: DateValue; end: DateValue } | null;
  defaultValue?: { start: DateValue; end: DateValue } | null;
  onChange?: (value: { start: DateValue; end: DateValue }) => void;
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

export function RangeCalendar({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  footer,
  className,
  ref,
  ...props
}: RangeCalendarProps) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = useRangeCalendarState({
    ...props,
    locale: usedLocale,
    createCalendar,
  });
  const localRef = useRef<HTMLDivElement>(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(
    props,
    state,
    localRef,
  );

  return (
    <div
      {...calendarProps}
      ref={ref ?? localRef}
      className={cn("vds-calendar", "vds-calendar-range", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={invalid ? "true" : undefined}
      data-dir={direction}
    >
      <div className="vds-calendar-header">
        <button
          {...prevButtonProps}
          type="button"
          className="vds-calendar-nav"
          aria-label={prevButtonProps["aria-label"] ?? "Previous month"}
        >
          {direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <h2 className="vds-calendar-heading" aria-live="polite">
          {title}
        </h2>
        <button
          {...nextButtonProps}
          type="button"
          className="vds-calendar-nav"
          aria-label={nextButtonProps["aria-label"] ?? "Next month"}
        >
          {direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>
      <CalendarGrid state={state} isRange />
      {footer ? <div className="vds-calendar-footer">{footer}</div> : null}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── *
 * Grid + Cell (shared between Calendar and RangeCalendar)
 * ──────────────────────────────────────────────────────────── */

interface CalendarGridProps {
  state: CalendarState | RangeCalendarState;
  isRange?: boolean;
}

function CalendarGrid({ state, isRange }: CalendarGridProps) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} className="vds-calendar-grid">
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, i) => (
            <th key={i} className="vds-calendar-weekday" scope="col">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: weeksInMonth }, (_, weekIdx) => (
          <tr key={weekIdx}>
            {state
              .getDatesInWeek(weekIdx)
              .map((date, i) =>
                date ? (
                  <Cell key={i} state={state} date={date} isRange={isRange} />
                ) : (
                  <td key={i} className="vds-calendar-cell-td" />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface CellProps {
  state: CalendarState | RangeCalendarState;
  date: CalendarDate;
  isRange?: boolean;
}

function Cell({ state, date, isRange }: CellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    isInvalid,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  let isRangeStart = false;
  let isRangeEnd = false;
  let isRangeMiddle = false;

  if (isRange && isSelected) {
    const rangeState = state as RangeCalendarState;
    const highlighted = rangeState.highlightedRange;
    if (highlighted) {
      isRangeStart = isSameDay(date, highlighted.start);
      isRangeEnd = isSameDay(date, highlighted.end);
      isRangeMiddle = !isRangeStart && !isRangeEnd;
    }
  }

  return (
    <td {...cellProps} className="vds-calendar-cell-td">
      <div
        {...buttonProps}
        ref={ref}
        className="vds-calendar-cell"
        data-outside={isOutsideVisibleRange ? "true" : undefined}
        data-selected={isSelected ? "true" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
        data-unavailable={isUnavailable ? "true" : undefined}
        data-invalid={isInvalid ? "true" : undefined}
        data-range-start={isRangeStart ? "true" : undefined}
        data-range-end={isRangeEnd ? "true" : undefined}
        data-range-middle={isRangeMiddle ? "true" : undefined}
        hidden={isOutsideVisibleRange}
      >
        {formattedDate}
      </div>
    </td>
  );
}
