import { cn } from "@virtari/utils";
import {
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
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
  today,
  type CalendarDate,
  type DateDuration,
} from "@internationalized/date";
import { createCalendar, resolveLocale, type CalendarSystem, type DateValue } from "./date-utils";
import type { DatePickerAppearance, DatePickerSize } from "./context";
import { IconChevronLeft, IconChevronRight } from "@virtari/react-icons";
import { toButtonProps } from "./aria-button";

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

function ChevronLeft() {
  return <IconChevronLeft size={12} stroke={1.5} aria-hidden focusable={false} />;
}

function ChevronRight() {
  return <IconChevronRight size={12} stroke={1.5} aria-hidden focusable={false} />;
}

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
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state,
  );

  return (
    <CalendarFrame
      ref={ref}
      calendarProps={calendarProps}
      prevButtonProps={prevButtonProps}
      nextButtonProps={nextButtonProps}
      state={state}
      direction={direction}
      locale={usedLocale}
      size={size}
      appearance={appearance}
      invalid={invalid}
      footer={footer}
      className={className}
    />
  );
}

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
  const localRef = useRef<HTMLDivElement>(null);
  const state = useRangeCalendarState({
    ...props,
    locale: usedLocale,
    createCalendar,
  });
  const { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(
    props,
    state,
    localRef,
  );

  return (
    <CalendarFrame
      ref={ref ?? localRef}
      calendarProps={calendarProps}
      prevButtonProps={prevButtonProps}
      nextButtonProps={nextButtonProps}
      state={state}
      direction={direction}
      locale={usedLocale}
      size={size}
      appearance={appearance}
      invalid={invalid}
      footer={footer}
      className={cn("vds-calendar-range", className)}
    />
  );
}

interface CalendarFrameProps {
  calendarProps: HTMLAttributes<HTMLDivElement>;
  prevButtonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  state: CalendarState | RangeCalendarState;
  direction: "ltr" | "rtl";
  locale: string;
  size: DatePickerSize;
  appearance: DatePickerAppearance;
  invalid?: boolean;
  footer?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

function CalendarFrame({
  calendarProps,
  prevButtonProps,
  nextButtonProps,
  state,
  direction,
  locale,
  size,
  appearance,
  invalid,
  footer,
  className,
  ref,
}: CalendarFrameProps) {
  const [view, setView] = useState<CalendarView>("days");
  const previousButtonProps = toButtonProps(prevButtonProps);
  const followingButtonProps = toButtonProps(nextButtonProps);
  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }),
    [locale],
  );
  const monthCaptionFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }),
    [locale],
  );

  const visibleMonthCount = getVisibleMonthCount(state.visibleRange);
  const monthStartDates = useMemo(
    () =>
      Array.from({ length: visibleMonthCount }, (_, index) =>
        state.visibleRange.start.add({ months: index }).set({ day: 1 }),
      ),
    [state.visibleRange.start, visibleMonthCount],
  );
  const focusedDate = state.focusedDate;
  const monthLabel = monthFormatter.format(focusedDate.toDate("UTC"));
  const monthOptions = getMonthOptions(focusedDate, monthFormatter);
  const yearOptions = getYearOptions(focusedDate.year);

  const handlePrevious = () => {
    if (view === "months") {
      state.setFocusedDate(focusedDate.subtract({ years: 1 }));
      return;
    }

    if (view === "years") {
      state.setFocusedDate(focusedDate.subtract({ years: 12 }));
      return;
    }

    state.focusPreviousPage();
  };

  const handleNext = () => {
    if (view === "months") {
      state.setFocusedDate(focusedDate.add({ years: 1 }));
      return;
    }

    if (view === "years") {
      state.setFocusedDate(focusedDate.add({ years: 12 }));
      return;
    }

    state.focusNextPage();
  };

  return (
    <div
      {...calendarProps}
      ref={ref}
      className={cn("vds-calendar", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={invalid ? "true" : undefined}
      data-dir={direction}
      data-view={view}
    >
      <div className="vds-calendar-header">
        <button
          {...previousButtonProps}
          type="button"
          className="vds-calendar-nav"
          aria-label={view === "days" ? previousButtonProps["aria-label"] ?? "Previous month" : "Previous"}
          onClick={handlePrevious}
        >
          {direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <div className="vds-calendar-heading" aria-live="polite">
          <button
            type="button"
            className="vds-calendar-heading-button"
            onClick={() => setView((current) => current === "months" ? "days" : "months")}
          >
            {monthLabel}
          </button>
          <button
            type="button"
            className="vds-calendar-heading-button"
            onClick={() => setView((current) => current === "years" ? "days" : "years")}
          >
            {focusedDate.year}
          </button>
        </div>
        <button
          {...followingButtonProps}
          type="button"
          className="vds-calendar-nav"
          aria-label={view === "days" ? followingButtonProps["aria-label"] ?? "Next month" : "Next"}
          onClick={handleNext}
        >
          {direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {view === "days" ? (
        <div className="vds-calendar-months" data-month-count={monthStartDates.length}>
          {monthStartDates.map((startDate) => (
            <div key={startDate.toString()} className="vds-calendar-month">
              {monthStartDates.length > 1 ? (
                <div className="vds-calendar-month-caption">
                  {monthCaptionFormatter.format(startDate.toDate("UTC"))}
                </div>
              ) : null}
              <CalendarGrid state={state} startDate={startDate} isRange={"anchorDate" in state} />
            </div>
          ))}
        </div>
      ) : null}

      {view === "months" ? (
        <div className="vds-calendar-selector">
          {monthOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className="vds-calendar-selector-item"
              data-selected={option.value === focusedDate.month ? "true" : undefined}
              onClick={() => {
                state.setFocusedDate(focusedDate.set({ month: option.value, day: 1 }));
                setView("days");
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      {view === "years" ? (
        <div className="vds-calendar-selector">
          {yearOptions.map((year) => (
            <button
              key={year}
              type="button"
              className="vds-calendar-selector-item"
              data-selected={year === focusedDate.year ? "true" : undefined}
              onClick={() => {
                state.setFocusedDate(focusedDate.set({ year, day: 1 }));
                setView("days");
              }}
            >
              {year}
            </button>
          ))}
        </div>
      ) : null}

      {footer ? <div className="vds-calendar-footer">{footer}</div> : null}
    </div>
  );
}

interface CalendarGridProps {
  state: CalendarState | RangeCalendarState;
  startDate: CalendarDate;
  isRange?: boolean;
}

function CalendarGrid({ state, startDate, isRange }: CalendarGridProps) {
  const { gridProps, headerProps, weekDays, weeksInMonth } = useCalendarGrid(
    { startDate },
    state,
  );

  return (
    <table {...gridProps} className="vds-calendar-grid">
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index} className="vds-calendar-weekday" scope="col">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: weeksInMonth }, (_, weekIndex) => (
          <tr key={weekIndex}>
            {state.getDatesInWeek(weekIndex, startDate).map((date, index) =>
              date ? (
                <Cell key={index} state={state} date={date} isRange={isRange} />
              ) : (
                <td key={index} className="vds-calendar-cell-td" />
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
  const todayDate = today(state.timeZone);

  let isRangeStart = false;
  let isRangeEnd = false;
  let isRangeMiddle = false;

  if (isRange) {
    const rangeState = state as RangeCalendarState;
    const highlightedRange = rangeState.highlightedRange;
    if (highlightedRange) {
      isRangeStart = date.compare(highlightedRange.start) === 0;
      isRangeEnd = date.compare(highlightedRange.end) === 0;
      isRangeMiddle =
        date.compare(highlightedRange.start) > 0 &&
        date.compare(highlightedRange.end) < 0;
    }
  }

  return (
    <td {...cellProps} className="vds-calendar-cell-td">
      <div
        {...buttonProps}
        ref={ref}
        className="vds-calendar-cell"
        data-today={date.compare(todayDate) === 0 ? "true" : undefined}
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

function getVisibleMonthCount(visibleRange: { start: CalendarDate; end: CalendarDate }) {
  const months =
    (visibleRange.end.year - visibleRange.start.year) * 12 +
    (visibleRange.end.month - visibleRange.start.month);
  return Math.max(1, months + 1);
}

function getMonthOptions(date: CalendarDate, formatter: Intl.DateTimeFormat) {
  const count = date.calendar.getMonthsInYear(date);
  return Array.from({ length: count }, (_, index) => {
    const month = index + 1;
    return {
      value: month,
      label: formatter.format(date.set({ month, day: 1 }).toDate("UTC")),
    };
  });
}

function getYearOptions(year: number) {
  const start = year - 5;
  return Array.from({ length: 12 }, (_, index) => start + index);
}
