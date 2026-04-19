import { cn } from "@virtari-packages/utils";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
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
  toCalendar,
  type CalendarDate,
  type DateDuration,
} from "@internationalized/date";
import { createCalendar, resolveLocale, type CalendarSystem, type DateValue } from "./date-utils";
import type { DatePickerAppearance, DatePickerSize } from "./context";
import { IconChevronLeft, IconChevronRight } from "@virtari-packages/react-icons";
import { toButtonProps } from "./aria-button";
import { ScrollWheel } from "./Wheel";

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

export type CalendarView = "days" | "months" | "years";

/** Imperative handle exposed via `apiRef` so a parent (e.g. DatePicker)
 * can drive the year/month draft commit from an external action bar. */
export interface CalendarHandle {
  getView: () => CalendarView;
  setView: (view: CalendarView) => void;
  hasMonthDraft: () => boolean;
  hasYearDraft: () => boolean;
  applyMonthDraft: () => void;
  applyYearDraft: () => void;
  cancelDraft: () => void;
}

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
  /** Fires when the internal view changes (days/months/years). */
  onViewChange?: (view: CalendarView) => void;
  /** Parent-supplied ref populated with year/month draft-commit methods. */
  apiRef?: { current: CalendarHandle | null };
  /** If true, Calendar hides its own Cancel/Change-Year/Month footer.
   *  Parent is expected to render an external action bar and drive
   *  commits through `apiRef`. */
  hideInternalActions?: boolean;
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
  onViewChange,
  apiRef,
  hideInternalActions,
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
      onViewChange={onViewChange}
      apiRef={apiRef}
      hideInternalActions={hideInternalActions}
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
  onViewChange?: (view: CalendarView) => void;
  apiRef?: { current: CalendarHandle | null };
  hideInternalActions?: boolean;
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
  onViewChange,
  apiRef,
  hideInternalActions,
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
      onViewChange={onViewChange}
      apiRef={apiRef}
      hideInternalActions={hideInternalActions}
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
  onViewChange?: (view: CalendarView) => void;
  apiRef?: { current: CalendarHandle | null };
  hideInternalActions?: boolean;
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
  onViewChange,
  apiRef,
  hideInternalActions,
  ref,
}: CalendarFrameProps) {
  const [view, setViewInternal] = useState<CalendarView>("days");
  const [draftYear, setDraftYear] = useState<number | null>(null);
  const [draftMonth, setDraftMonth] = useState<number | null>(null);

  const setView = useCallback(
    (next: CalendarView | ((prev: CalendarView) => CalendarView)) => {
      setViewInternal((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        if (resolved !== prev) {
          onViewChange?.(resolved);
        }
        return resolved;
      });
    },
    [onViewChange],
  );

  // Drop drafts when we leave the wheel views.
  useEffect(() => {
    if (view !== "years") setDraftYear(null);
    if (view !== "months") setDraftMonth(null);
  }, [view]);

  // When the selection changes externally (e.g. a preset click) and the new
  // date sits in a different month/year than the focused page, re-focus so
  // the calendar visibly jumps to that month. React-stately only syncs
  // focusedDate on the FIRST render — subsequent `value` prop changes
  // leave focusedDate untouched, so the calendar looked "dead" after
  // preset clicks that land outside the current month.
  const primaryValue = getPrimaryValue(state);
  const primaryKey = primaryValue
    ? `${primaryValue.calendar.identifier}:${primaryValue.year}-${primaryValue.month}-${primaryValue.day}`
    : null;
  useEffect(() => {
    if (!primaryValue) return;
    const focused = state.focusedDate;
    if (
      focused.year !== primaryValue.year ||
      focused.month !== primaryValue.month
    ) {
      state.setFocusedDate(primaryValue);
    }
    // state.setFocusedDate / state.focusedDate are stable-ish; primaryKey
    // is the fingerprint we want to react to.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryKey]);

  // Expose commit handles to parents (e.g. DatePicker) via apiRef.
  const focusedForHandle = state.focusedDate;
  const applyYearDraft = useCallback(() => {
    const picked = draftYear ?? focusedForHandle.year;
    state.setFocusedDate(focusedForHandle.set({ year: picked, day: 1 }));
    setDraftYear(null);
    setView("days");
  }, [draftYear, focusedForHandle, state, setView]);
  const applyMonthDraft = useCallback(() => {
    const picked = draftMonth ?? focusedForHandle.month;
    state.setFocusedDate(focusedForHandle.set({ month: picked, day: 1 }));
    setDraftMonth(null);
    setView("days");
  }, [draftMonth, focusedForHandle, state, setView]);
  const cancelDraft = useCallback(() => {
    setDraftYear(null);
    setDraftMonth(null);
    setView("days");
  }, [setView]);

  useLayoutEffect(() => {
    if (!apiRef) return;
    apiRef.current = {
      getView: () => view,
      setView,
      hasMonthDraft: () => draftMonth !== null,
      hasYearDraft: () => draftYear !== null,
      applyMonthDraft,
      applyYearDraft,
      cancelDraft,
    };
    return () => {
      if (apiRef.current && typeof apiRef === "object") {
        apiRef.current = null;
      }
    };
  }, [apiRef, applyMonthDraft, applyYearDraft, cancelDraft, draftMonth, draftYear, setView, view]);

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
  const yearOptions = useMemo(
    () => getYearWheelOptions(focusedDate),
    [focusedDate.calendar.identifier, focusedDate.year],
  );

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
            <SlotCounter value={monthLabel} />
          </button>
          <button
            type="button"
            className="vds-calendar-heading-button"
            onClick={() => setView((current) => current === "years" ? "days" : "years")}
          >
            <SlotCounter value={String(focusedDate.year)} />
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
              <CalendarGrid
                state={state}
                startDate={startDate}
                isRange={"anchorDate" in state}
                hideOutsideMonth={monthStartDates.length > 1}
              />
            </div>
          ))}
        </div>
      ) : null}

      {view === "months" ? (
        <div className="vds-calendar-wheel-view">
          <div className="vds-calendar-year-wheel" data-role="month-wheel">
            <ScrollWheel
              label="Month"
              variant="year"
              showHeader={false}
              values={monthOptions.map((option) => option.value)}
              value={draftMonth ?? focusedDate.month}
              formatValue={(monthNumber) => {
                const option = monthOptions.find((item) => item.value === monthNumber);
                return option ? String(option.label) : String(monthNumber);
              }}
              onChange={(monthNumber) => setDraftMonth(monthNumber)}
            />
          </div>
          {hideInternalActions ? null : (
            <div className="vds-calendar-year-actions">
              <button
                type="button"
                className="vds-calendar-year-action vds-calendar-year-action--secondary"
                onClick={cancelDraft}
              >
                Cancel
              </button>
              <button
                type="button"
                className="vds-calendar-year-action vds-calendar-year-action--primary"
                onClick={applyMonthDraft}
              >
                Change Month
              </button>
            </div>
          )}
        </div>
      ) : null}

      {view === "years" ? (
        <div className="vds-calendar-wheel-view">
          <div className="vds-calendar-year-wheel">
            <ScrollWheel
              label="Year"
              variant="year"
              showHeader={false}
              values={yearOptions}
              value={draftYear ?? focusedDate.year}
              formatValue={(year) => String(year)}
              onChange={(year) => setDraftYear(year)}
            />
          </div>
          {hideInternalActions ? null : (
            <div className="vds-calendar-year-actions">
              <button
                type="button"
                className="vds-calendar-year-action vds-calendar-year-action--secondary"
                onClick={cancelDraft}
              >
                Cancel
              </button>
              <button
                type="button"
                className="vds-calendar-year-action vds-calendar-year-action--primary"
                onClick={applyYearDraft}
              >
                Change Year
              </button>
            </div>
          )}
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
  hideOutsideMonth?: boolean;
}

function CalendarGrid({ state, startDate, isRange, hideOutsideMonth }: CalendarGridProps) {
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
                <Cell
                  key={index}
                  state={state}
                  date={date}
                  isRange={isRange}
                  gridStartDate={startDate}
                  hideOutsideMonth={hideOutsideMonth}
                />
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
  gridStartDate: CalendarDate;
  hideOutsideMonth?: boolean;
}

function Cell({ state, date, isRange, gridStartDate, hideOutsideMonth }: CellProps) {
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

  // In a multi-month grid layout, cells that belong to the *other* visible
  // month would otherwise appear duplicated as leading/trailing padding in
  // each grid. Hide them from their non-owning grid.
  const isOutsideMonth =
    date.month !== gridStartDate.month || date.year !== gridStartDate.year;
  const hideAsOutsideMonth = Boolean(hideOutsideMonth) && isOutsideMonth;

  let isRangeStart = false;
  let isRangeEnd = false;
  let isRangeMiddle = false;

  if (isRange && !hideAsOutsideMonth) {
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
        data-selected={isSelected && !hideAsOutsideMonth ? "true" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
        data-unavailable={isUnavailable ? "true" : undefined}
        data-invalid={isInvalid ? "true" : undefined}
        data-range-start={isRangeStart ? "true" : undefined}
        data-range-end={isRangeEnd ? "true" : undefined}
        data-range-middle={isRangeMiddle ? "true" : undefined}
        hidden={isOutsideVisibleRange || hideAsOutsideMonth}
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

/** Extracts a single "primary" date from either CalendarState (single) or
 *  RangeCalendarState — used to decide when to re-focus the calendar after
 *  external value changes. */
function getPrimaryValue(
  state: CalendarState | RangeCalendarState,
): CalendarDate | null {
  if ("anchorDate" in state) {
    const range = state.value as { start?: CalendarDate; end?: CalendarDate } | null;
    return range?.start ?? range?.end ?? null;
  }
  return (state.value as CalendarDate | null) ?? null;
}

/** Slot-machine counter: when `value` changes, slides the old value up and
 *  animates the new value in from below. Returns to a static, animation-free
 *  state once the transition completes. */
function SlotCounter({ value }: { value: string }) {
  const [prev, setPrev] = useState<string | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const priorValue = useRef(value);

  useLayoutEffect(() => {
    if (priorValue.current === value) return;
    const oldValue = priorValue.current;
    const a = parseNumeric(oldValue);
    const b = parseNumeric(value);
    setDirection(a !== null && b !== null && b < a ? -1 : 1);
    priorValue.current = value;
    setPrev(oldValue);
    const t = window.setTimeout(() => setPrev(null), 260);
    return () => window.clearTimeout(t);
  }, [value]);

  return (
    <span className="vds-slot-counter" data-direction={direction === -1 ? "down" : "up"}>
      {prev !== null ? (
        <span key={`out-${prev}`} className="vds-slot-counter-prev" aria-hidden="true">
          {prev}
        </span>
      ) : null}
      <span key={`in-${value}`} className="vds-slot-counter-current">
        {value}
      </span>
    </span>
  );
}

function parseNumeric(value: string): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function getYearWheelOptions(focusedDate: CalendarDate): number[] {
  // Translate today's Gregorian date into the focused calendar system so the
  // "now" year is meaningful whether it's Gregorian, Persian, Hijri, etc.
  const nowInCalendar = toCalendar(today("UTC"), focusedDate.calendar).year;
  const isGregorian = focusedDate.calendar.identifier === "gregory";
  const defaultStart = isGregorian ? 1990 : Math.max(1, nowInCalendar - 36);
  const start = Math.min(defaultStart, focusedDate.year);
  // Give headroom for future dates (20 years ahead of "now") so users can
  // pick ahead of today. If the focused date sits further out, extend.
  const end = Math.max(nowInCalendar + 20, focusedDate.year);
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
}
