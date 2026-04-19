"use client";
import { cn } from '@virtari/utils';
import { useRef, useState, useMemo, useEffect } from 'react';
import { useCalendar, useRangeCalendar, useCalendarGrid, useCalendarCell } from '@react-aria/calendar';
import { useCalendarState, useRangeCalendarState } from '@react-stately/calendar';
import { useLocale } from '@react-aria/i18n';
export { I18nProvider, useLocale } from '@react-aria/i18n';
import { GregorianCalendar, TaiwanCalendar, EthiopicAmeteAlemCalendar, EthiopicCalendar, IndianCalendar, HebrewCalendar, JapaneseCalendar, BuddhistCalendar, IslamicTabularCalendar, IslamicCivilCalendar, IslamicUmalquraCalendar, PersianCalendar, getWeeksInMonth, isSameDay, Time } from '@internationalized/date';
export { BuddhistCalendar, CalendarDate, CalendarDateTime, EthiopicCalendar, GregorianCalendar, HebrewCalendar, IndianCalendar, IslamicCivilCalendar, IslamicUmalquraCalendar, JapaneseCalendar, PersianCalendar, TaiwanCalendar, Time, ZonedDateTime, endOfMonth, endOfWeek, endOfYear, getLocalTimeZone, isSameDay, isSameMonth, isSameYear, isToday, isWeekend, now, parseAbsolute, parseDate, parseDateTime, parseTime, parseZonedDateTime, startOfMonth, startOfWeek, startOfYear, toCalendar, toCalendarDate, toCalendarDateTime, toZoned, today } from '@internationalized/date';
import { IconChevronRight, IconChevronLeft } from '@virtari/react-icons';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useDateField, useDateSegment, useTimeField, useDatePicker, useDateRangePicker } from '@react-aria/datepicker';
import { useDateFieldState, useTimeFieldState, useDatePickerState, useDateRangePickerState } from '@react-stately/datepicker';
import * as PopoverPrimitive2 from '@radix-ui/react-popover';

// src/Calendar.tsx
function createCalendar(identifier) {
  switch (identifier) {
    case "persian":
      return new PersianCalendar();
    case "islamic-umalqura":
      return new IslamicUmalquraCalendar();
    case "islamic-civil":
      return new IslamicCivilCalendar();
    case "islamic-tbla":
      return new IslamicTabularCalendar();
    case "buddhist":
      return new BuddhistCalendar();
    case "japanese":
      return new JapaneseCalendar();
    case "hebrew":
      return new HebrewCalendar();
    case "indian":
      return new IndianCalendar();
    case "ethiopic":
      return new EthiopicCalendar();
    case "ethioaa":
      return new EthiopicAmeteAlemCalendar();
    case "roc":
      return new TaiwanCalendar();
    case "gregory":
    default:
      return new GregorianCalendar();
  }
}
function resolveLocale(locale, calendar) {
  if (!calendar || calendar === "gregory") return locale;
  return locale.includes("-u-") ? locale : `${locale}-u-ca-${calendar}`;
}
function ChevronLeft() {
  return /* @__PURE__ */ jsx(IconChevronLeft, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false });
}
function ChevronRight() {
  return /* @__PURE__ */ jsx(IconChevronRight, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false });
}
function Calendar({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  footer,
  className,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = useCalendarState({
    ...props,
    locale: usedLocale,
    createCalendar
  });
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...calendarProps,
      ref,
      className: cn("vds-calendar", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": invalid ? "true" : void 0,
      "data-dir": direction,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "vds-calendar-header", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              ...prevButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": prevButtonProps["aria-label"] ?? "Previous month",
              children: direction === "rtl" ? /* @__PURE__ */ jsx(ChevronRight, {}) : /* @__PURE__ */ jsx(ChevronLeft, {})
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "vds-calendar-heading", "aria-live": "polite", children: title }),
          /* @__PURE__ */ jsx(
            "button",
            {
              ...nextButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": nextButtonProps["aria-label"] ?? "Next month",
              children: direction === "rtl" ? /* @__PURE__ */ jsx(ChevronLeft, {}) : /* @__PURE__ */ jsx(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx(CalendarGrid, { state }),
        footer ? /* @__PURE__ */ jsx("div", { className: "vds-calendar-footer", children: footer }) : null
      ]
    }
  );
}
function RangeCalendar({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  footer,
  className,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = useRangeCalendarState({
    ...props,
    locale: usedLocale,
    createCalendar
  });
  const localRef = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(
    props,
    state,
    localRef
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...calendarProps,
      ref: ref ?? localRef,
      className: cn("vds-calendar", "vds-calendar-range", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": invalid ? "true" : void 0,
      "data-dir": direction,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "vds-calendar-header", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              ...prevButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": prevButtonProps["aria-label"] ?? "Previous month",
              children: direction === "rtl" ? /* @__PURE__ */ jsx(ChevronRight, {}) : /* @__PURE__ */ jsx(ChevronLeft, {})
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "vds-calendar-heading", "aria-live": "polite", children: title }),
          /* @__PURE__ */ jsx(
            "button",
            {
              ...nextButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": nextButtonProps["aria-label"] ?? "Next month",
              children: direction === "rtl" ? /* @__PURE__ */ jsx(ChevronLeft, {}) : /* @__PURE__ */ jsx(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx(CalendarGrid, { state, isRange: true }),
        footer ? /* @__PURE__ */ jsx("div", { className: "vds-calendar-footer", children: footer }) : null
      ]
    }
  );
}
function CalendarGrid({ state, isRange }) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);
  return /* @__PURE__ */ jsxs("table", { ...gridProps, className: "vds-calendar-grid", children: [
    /* @__PURE__ */ jsx("thead", { ...headerProps, children: /* @__PURE__ */ jsx("tr", { children: weekDays.map((day, i) => /* @__PURE__ */ jsx("th", { className: "vds-calendar-weekday", scope: "col", children: day }, i)) }) }),
    /* @__PURE__ */ jsx("tbody", { children: Array.from({ length: weeksInMonth }, (_, weekIdx) => /* @__PURE__ */ jsx("tr", { children: state.getDatesInWeek(weekIdx).map(
      (date, i) => date ? /* @__PURE__ */ jsx(Cell, { state, date, isRange }, i) : /* @__PURE__ */ jsx("td", { className: "vds-calendar-cell-td" }, i)
    ) }, weekIdx)) })
  ] });
}
function Cell({ state, date, isRange }) {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    isInvalid,
    formattedDate
  } = useCalendarCell({ date }, state, ref);
  let isRangeStart = false;
  let isRangeEnd = false;
  let isRangeMiddle = false;
  if (isRange && isSelected) {
    const rangeState = state;
    const highlighted = rangeState.highlightedRange;
    if (highlighted) {
      isRangeStart = isSameDay(date, highlighted.start);
      isRangeEnd = isSameDay(date, highlighted.end);
      isRangeMiddle = !isRangeStart && !isRangeEnd;
    }
  }
  return /* @__PURE__ */ jsx("td", { ...cellProps, className: "vds-calendar-cell-td", children: /* @__PURE__ */ jsx(
    "div",
    {
      ...buttonProps,
      ref,
      className: "vds-calendar-cell",
      "data-outside": isOutsideVisibleRange ? "true" : void 0,
      "data-selected": isSelected ? "true" : void 0,
      "data-disabled": isDisabled ? "true" : void 0,
      "data-unavailable": isUnavailable ? "true" : void 0,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-range-start": isRangeStart ? "true" : void 0,
      "data-range-end": isRangeEnd ? "true" : void 0,
      "data-range-middle": isRangeMiddle ? "true" : void 0,
      hidden: isOutsideVisibleRange,
      children: formattedDate
    }
  ) });
}
function DateField({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  label,
  description,
  errorMessage,
  className,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = useDateFieldState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    locale: usedLocale,
    createCalendar
  });
  const localRef = useRef(null);
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useDateField({ ...props, isInvalid: invalid ?? props.isInvalid }, state, localRef);
  const isInvalid = invalid ?? state.isInvalid;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("vds-date-field", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-disabled": props.isDisabled ? "true" : void 0,
      "data-readonly": props.isReadOnly ? "true" : void 0,
      "data-dir": direction,
      children: [
        label ? /* @__PURE__ */ jsx("span", { ...labelProps, className: "vds-date-field-label", children: label }) : null,
        /* @__PURE__ */ jsx(
          "div",
          {
            ...fieldProps,
            ref: ref ?? localRef,
            className: "vds-date-field-group",
            children: state.segments.map((segment, i) => /* @__PURE__ */ jsx(FieldSegment, { segment, state }, i))
          }
        ),
        description ? /* @__PURE__ */ jsx("span", { ...descriptionProps, className: "vds-date-field-description", children: description }) : null,
        isInvalid && errorMessage ? /* @__PURE__ */ jsx("span", { ...errorMessageProps, className: "vds-date-field-error", children: errorMessage }) : null
      ]
    }
  );
}
function FieldSegment({ segment, state }) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...segmentProps,
      ref,
      className: "vds-date-field-segment",
      "data-type": segment.type,
      "data-placeholder": segment.isPlaceholder ? "true" : void 0,
      children: segment.text
    }
  );
}
function TimeField({
  size = "md",
  appearance = "soft",
  invalid,
  locale,
  label,
  description,
  errorMessage,
  className,
  showPicker = true,
  showMilliseconds,
  millisecondStep = 10,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = useLocale();
  const [pickerOpen, setPickerOpen] = useState(false);
  const state = useTimeFieldState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    locale: locale ?? detectedLocale
  });
  const localRef = useRef(null);
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useTimeField(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    localRef
  );
  const isInvalid = invalid ?? state.isInvalid;
  const canOpenPicker = showPicker && !props.isDisabled && !props.isReadOnly;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("vds-time-field", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-disabled": props.isDisabled ? "true" : void 0,
      "data-readonly": props.isReadOnly ? "true" : void 0,
      "data-dir": direction,
      "data-picker": showPicker ? "true" : void 0,
      children: [
        label ? /* @__PURE__ */ jsx("span", { ...labelProps, className: "vds-time-field-label", children: label }) : null,
        /* @__PURE__ */ jsxs(PopoverPrimitive2.Root, { open: pickerOpen, onOpenChange: setPickerOpen, children: [
          /* @__PURE__ */ jsx(PopoverPrimitive2.Anchor, { asChild: true, children: /* @__PURE__ */ jsxs(
            "div",
            {
              ...fieldProps,
              ref: composeRefs(ref, localRef),
              className: "vds-time-field-group",
              onClick: (event) => {
                fieldProps.onClick?.(event);
                if (canOpenPicker) {
                  setPickerOpen(true);
                }
              },
              children: [
                /* @__PURE__ */ jsx("div", { className: "vds-time-field-segments", children: state.segments.map((segment, i) => /* @__PURE__ */ jsx(TimeSegment, { segment, state }, i)) }),
                showPicker ? /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "vds-time-field-picker-trigger",
                    "aria-label": "Open time picker",
                    disabled: !canOpenPicker,
                    onClick: (event) => {
                      event.stopPropagation();
                      setPickerOpen(true);
                    },
                    children: /* @__PURE__ */ jsx(ClockIcon, {})
                  }
                ) : null
              ]
            }
          ) }),
          showPicker ? /* @__PURE__ */ jsx(PopoverPrimitive2.Portal, { children: /* @__PURE__ */ jsx(
            PopoverPrimitive2.Content,
            {
              sideOffset: 8,
              align: "start",
              collisionPadding: 8,
              className: "vds-time-field-picker-content",
              onOpenAutoFocus: (event) => event.preventDefault(),
              children: /* @__PURE__ */ jsx(
                TimePickerPanel,
                {
                  state,
                  hourCycle: props.hourCycle,
                  granularity: props.granularity ?? "minute",
                  showMilliseconds,
                  millisecondStep,
                  onClose: () => setPickerOpen(false)
                }
              )
            }
          ) }) : null
        ] }),
        description ? /* @__PURE__ */ jsx("span", { ...descriptionProps, className: "vds-time-field-description", children: description }) : null,
        isInvalid && errorMessage ? /* @__PURE__ */ jsx("span", { ...errorMessageProps, className: "vds-time-field-error", children: errorMessage }) : null
      ]
    }
  );
}
function TimeSegment({ segment, state }) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...segmentProps,
      ref,
      className: "vds-time-field-segment",
      "data-type": segment.type,
      "data-placeholder": segment.isPlaceholder ? "true" : void 0,
      children: segment.text
    }
  );
}
function TimePickerPanel({
  state,
  hourCycle,
  granularity,
  showMilliseconds,
  millisecondStep,
  onClose
}) {
  const sourceTime = state.timeValue ?? new Time();
  const [draftTime, setDraftTime] = useState(() => sourceTime.copy());
  const resolvedHourCycle = hourCycle ?? 24;
  const hours = resolvedHourCycle === 12 ? range(1, 12) : range(1, 24);
  const minutes = range(0, 59);
  const seconds = range(0, 59);
  const milliseconds = useMemo(
    () => getMillisecondValues(draftTime.millisecond, millisecondStep),
    [draftTime.millisecond, millisecondStep]
  );
  const columnCount = 1 + (granularity !== "hour" || showMilliseconds ? 1 : 0) + (granularity === "second" || showMilliseconds ? 1 : 0) + (showMilliseconds ? 1 : 0) + (resolvedHourCycle === 12 ? 1 : 0);
  useEffect(() => {
    setDraftTime(sourceTime.copy());
  }, [sourceTime.hour, sourceTime.minute, sourceTime.second, sourceTime.millisecond]);
  const setDraft = (fields) => {
    setDraftTime((current) => current.set(fields));
  };
  const commit = () => {
    state.setValue(draftTime);
    onClose();
  };
  const selectedHour = resolvedHourCycle === 12 ? to12Hour(draftTime.hour) : draftTime.hour === 0 ? 24 : draftTime.hour;
  const selectedPeriod = draftTime.hour >= 12 ? 1 : 0;
  const periodValues = [0, 1];
  return /* @__PURE__ */ jsxs("div", { className: "vds-time-picker-panel", "data-columns": columnCount, children: [
    /* @__PURE__ */ jsx("div", { className: "vds-time-picker-header", children: /* @__PURE__ */ jsx("span", { className: "vds-time-picker-title", children: "Set time" }) }),
    /* @__PURE__ */ jsxs("div", { className: "vds-time-picker-wheels", "data-columns": columnCount, children: [
      /* @__PURE__ */ jsx(
        TimeWheel,
        {
          label: "Hour",
          values: hours,
          value: selectedHour,
          formatValue: (value) => resolvedHourCycle === 12 ? String(value) : pad2(value),
          onChange: (value) => {
            if (resolvedHourCycle === 12) {
              setDraft({ hour: from12Hour(value, selectedPeriod === 1) });
              return;
            }
            setDraft({ hour: value === 24 ? 0 : value });
          }
        }
      ),
      granularity !== "hour" || showMilliseconds ? /* @__PURE__ */ jsx(
        TimeWheel,
        {
          label: "Minute",
          values: minutes,
          value: draftTime.minute,
          formatValue: pad2,
          onChange: (value) => setDraft({ minute: value })
        }
      ) : null,
      granularity === "second" || showMilliseconds ? /* @__PURE__ */ jsx(
        TimeWheel,
        {
          label: "Second",
          values: seconds,
          value: draftTime.second,
          formatValue: pad2,
          onChange: (value) => setDraft({ second: value })
        }
      ) : null,
      showMilliseconds ? /* @__PURE__ */ jsx(
        TimeWheel,
        {
          label: "MS",
          values: milliseconds,
          value: nearestValue(milliseconds, draftTime.millisecond),
          formatValue: (value) => String(value).padStart(3, "0"),
          onChange: (value) => setDraft({ millisecond: value })
        }
      ) : null,
      resolvedHourCycle === 12 ? /* @__PURE__ */ jsx(
        TimeWheel,
        {
          label: "Period",
          values: periodValues,
          value: selectedPeriod,
          formatValue: (value) => value === 1 ? "PM" : "AM",
          onChange: (value) => {
            const wantsPm = value === 1;
            if (wantsPm === draftTime.hour >= 12) {
              return;
            }
            setDraft({ hour: wantsPm ? draftTime.hour + 12 : draftTime.hour - 12 });
          }
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "vds-time-picker-actions", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "vds-time-picker-action",
          "data-variant": "secondary",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "vds-time-picker-action",
          "data-variant": "primary",
          onClick: commit,
          children: "Save"
        }
      )
    ] })
  ] });
}
function TimeWheel({ label, values, value, formatValue, onChange }) {
  const wheelRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const dragStateRef = useRef({
    pointerId: -1,
    startY: 0,
    startScrollTop: 0,
    moved: false,
    wasDragging: false
  });
  const centerValue = (nextValue, behavior) => {
    const wheel = wheelRef.current;
    const item = wheel?.querySelector(`[data-value="${nextValue}"]`);
    item?.scrollIntoView({ block: "center", inline: "nearest", behavior });
  };
  const selectNearest = (behavior = "smooth") => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    const wheelRect = wheel.getBoundingClientRect();
    const wheelCenter = wheelRect.top + wheelRect.height / 2;
    let nearest = valueRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;
    wheel.querySelectorAll(".vds-time-wheel-item").forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(itemCenter - wheelCenter);
      const itemValue = Number(item.dataset.value);
      if (distance < nearestDistance && Number.isFinite(itemValue)) {
        nearest = itemValue;
        nearestDistance = distance;
      }
    });
    if (nearest !== valueRef.current) {
      onChangeRef.current(nearest);
    }
    centerValue(nearest, behavior);
  };
  const scheduleSnap = () => {
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(selectNearest, 90);
  };
  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  }, [value, onChange]);
  useEffect(() => {
    centerValue(value, "auto");
  }, [value]);
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);
  const handlePointerDown = (event) => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    dragStateRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startScrollTop: wheel.scrollTop,
      moved: false,
      wasDragging: false
    };
    wheel.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event) => {
    const wheel = wheelRef.current;
    const drag = dragStateRef.current;
    if (!wheel || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    const delta = event.clientY - drag.startY;
    if (Math.abs(delta) > 3) {
      drag.moved = true;
      drag.wasDragging = true;
    }
    wheel.scrollTop = drag.startScrollTop - delta;
    scheduleSnap();
  };
  const handlePointerUp = (event) => {
    const wheel = wheelRef.current;
    const drag = dragStateRef.current;
    if (!wheel || drag.pointerId !== event.pointerId) return;
    wheel.releasePointerCapture(event.pointerId);
    drag.pointerId = -1;
    selectNearest();
    window.setTimeout(() => {
      drag.wasDragging = false;
    });
  };
  const handleWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const multiplier = event.deltaMode === 1 ? 36 : event.deltaMode === 2 ? event.currentTarget.clientHeight : 1;
    event.currentTarget.scrollTop += event.deltaY * multiplier;
    scheduleSnap();
  };
  return /* @__PURE__ */ jsxs("div", { className: "vds-time-wheel", "data-label": label, children: [
    /* @__PURE__ */ jsx("div", { className: "vds-time-wheel-label", children: label }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: wheelRef,
        className: "vds-time-wheel-track",
        onWheelCapture: handleWheel,
        onScroll: scheduleSnap,
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onPointerCancel: handlePointerUp,
        children: values.map((itemValue) => {
          const selected = itemValue === value;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "vds-time-wheel-item",
              "data-value": itemValue,
              "data-selected": selected ? "true" : void 0,
              "aria-pressed": selected,
              "aria-label": `${label} ${formatValue(itemValue)}`,
              onClick: () => {
                if (dragStateRef.current.wasDragging) return;
                onChange(itemValue);
              },
              children: formatValue(itemValue)
            },
            itemValue
          );
        })
      }
    )
  ] });
}
function ClockIcon() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "5.5", stroke: "currentColor", strokeWidth: "1.25" }),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M8 4.75V8L10.25 9.35",
        stroke: "currentColor",
        strokeWidth: "1.25",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
function pad2(value) {
  return String(value).padStart(2, "0");
}
function to12Hour(hour) {
  const remainder = hour % 12;
  return remainder === 0 ? 12 : remainder;
}
function from12Hour(hour, isPm) {
  if (hour === 12) {
    return isPm ? 12 : 0;
  }
  return isPm ? hour + 12 : hour;
}
function getMillisecondValues(current, step) {
  const normalizedStep = Math.max(1, Math.min(250, Math.round(step)));
  const values = [];
  for (let value = 0; value <= 999; value += normalizedStep) {
    values.push(value);
  }
  if (!values.includes(current)) {
    values.push(current);
    values.sort((a, b) => a - b);
  }
  return values;
}
function nearestValue(values, value) {
  return values.reduce(
    (nearest, item) => Math.abs(item - value) < Math.abs(nearest - value) ? item : nearest
  );
}
function composeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
}
function DatePicker({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  label,
  description,
  errorMessage,
  presets,
  footer,
  className,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = useDatePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: props.shouldCloseOnSelect
  });
  const groupRef = useRef(null);
  const {
    labelProps,
    groupProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps
  } = useDatePicker(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef
  );
  const fieldState = useDateFieldState({
    ...fieldProps,
    locale: usedLocale,
    createCalendar
  });
  const fieldRef = useRef(null);
  const { fieldProps: innerFieldProps } = useDateField(fieldProps, fieldState, fieldRef);
  const isInvalid = invalid ?? state.isInvalid;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("vds-date-picker", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-disabled": props.isDisabled ? "true" : void 0,
      "data-readonly": props.isReadOnly ? "true" : void 0,
      "data-dir": direction,
      children: [
        label ? /* @__PURE__ */ jsx("span", { ...labelProps, className: "vds-date-picker-label", children: label }) : null,
        /* @__PURE__ */ jsxs(PopoverPrimitive2.Root, { open: state.isOpen, onOpenChange: state.setOpen, children: [
          /* @__PURE__ */ jsx(PopoverPrimitive2.Anchor, { asChild: true, children: /* @__PURE__ */ jsxs(
            "div",
            {
              ...groupProps,
              ref: groupRef,
              className: "vds-date-picker-group",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    ...innerFieldProps,
                    ref: fieldRef,
                    className: "vds-date-picker-field",
                    children: fieldState.segments.map((segment, i) => /* @__PURE__ */ jsx(FieldSegment, { segment, state: fieldState }, i))
                  }
                ),
                /* @__PURE__ */ jsx(PopoverPrimitive2.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    ...buttonProps,
                    type: "button",
                    className: "vds-date-picker-trigger",
                    "aria-label": buttonProps["aria-label"] ?? "Open calendar",
                    children: /* @__PURE__ */ jsx(CalendarIcon, {})
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(PopoverPrimitive2.Portal, { children: /* @__PURE__ */ jsx(
            PopoverPrimitive2.Content,
            {
              ...dialogProps,
              sideOffset: 6,
              align: "start",
              className: "vds-date-picker-content",
              children: /* @__PURE__ */ jsxs("div", { className: "vds-date-picker-content-inner", children: [
                presets ? /* @__PURE__ */ jsx("div", { className: "vds-date-picker-presets", children: presets }) : null,
                /* @__PURE__ */ jsxs("div", { className: "vds-date-picker-main", children: [
                  /* @__PURE__ */ jsx(
                    Calendar,
                    {
                      ...calendarProps,
                      size,
                      appearance,
                      invalid: isInvalid,
                      locale: usedLocale
                    }
                  ),
                  state.hasTime ? /* @__PURE__ */ jsx("div", { className: "vds-date-picker-time", children: /* @__PURE__ */ jsx(
                    TimeField,
                    {
                      value: state.timeValue ?? null,
                      onChange: (v) => v && state.setTimeValue(v),
                      granularity: props.granularity === "day" ? "hour" : props.granularity ?? "hour",
                      hourCycle: props.hourCycle,
                      hideTimeZone: props.hideTimeZone,
                      showPicker: props.showTimePicker ?? true,
                      showMilliseconds: props.showMilliseconds,
                      millisecondStep: props.millisecondStep,
                      size,
                      appearance,
                      "aria-label": "Time"
                    }
                  ) }) : null,
                  footer ? /* @__PURE__ */ jsx("div", { className: "vds-date-picker-footer", children: footer }) : null
                ] })
              ] })
            }
          ) })
        ] }),
        description ? /* @__PURE__ */ jsx("span", { ...descriptionProps, className: "vds-date-picker-description", children: description }) : null,
        isInvalid && errorMessage ? /* @__PURE__ */ jsx("span", { ...errorMessageProps, className: "vds-date-picker-error", children: errorMessage }) : null
      ]
    }
  );
}
function CalendarIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": "true",
      focusable: "false",
      children: [
        /* @__PURE__ */ jsx(
          "rect",
          {
            x: "2.5",
            y: "3.5",
            width: "11",
            height: "10",
            rx: "1.5",
            stroke: "currentColor",
            strokeWidth: "1.25"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M2.5 6.5H13.5",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M5.5 2V5M10.5 2V5",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
}
function DateRangePicker({
  size = "md",
  appearance = "soft",
  invalid,
  calendar,
  locale,
  label,
  description,
  errorMessage,
  presets,
  footer,
  className,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = useDateRangePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: props.shouldCloseOnSelect
  });
  const groupRef = useRef(null);
  const {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps
  } = useDateRangePicker(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef
  );
  const startFieldState = useDateFieldState({
    ...startFieldProps,
    locale: usedLocale,
    createCalendar
  });
  const startFieldRef = useRef(null);
  const { fieldProps: innerStartFieldProps } = useDateField(
    startFieldProps,
    startFieldState,
    startFieldRef
  );
  const endFieldState = useDateFieldState({
    ...endFieldProps,
    locale: usedLocale,
    createCalendar
  });
  const endFieldRef = useRef(null);
  const { fieldProps: innerEndFieldProps } = useDateField(
    endFieldProps,
    endFieldState,
    endFieldRef
  );
  const isInvalid = invalid ?? state.isInvalid;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("vds-date-range-picker", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-disabled": props.isDisabled ? "true" : void 0,
      "data-readonly": props.isReadOnly ? "true" : void 0,
      "data-dir": direction,
      children: [
        label ? /* @__PURE__ */ jsx("span", { ...labelProps, className: "vds-date-range-picker-label", children: label }) : null,
        /* @__PURE__ */ jsxs(PopoverPrimitive2.Root, { open: state.isOpen, onOpenChange: state.setOpen, children: [
          /* @__PURE__ */ jsx(PopoverPrimitive2.Anchor, { asChild: true, children: /* @__PURE__ */ jsxs(
            "div",
            {
              ...groupProps,
              ref: groupRef,
              className: "vds-date-range-picker-group",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    ...innerStartFieldProps,
                    ref: startFieldRef,
                    className: "vds-date-range-picker-field",
                    children: startFieldState.segments.map((segment, i) => /* @__PURE__ */ jsx(FieldSegment, { segment, state: startFieldState }, i))
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "vds-date-range-picker-separator", "aria-hidden": "true", children: "\u2013" }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    ...innerEndFieldProps,
                    ref: endFieldRef,
                    className: "vds-date-range-picker-field",
                    children: endFieldState.segments.map((segment, i) => /* @__PURE__ */ jsx(FieldSegment, { segment, state: endFieldState }, i))
                  }
                ),
                /* @__PURE__ */ jsx(PopoverPrimitive2.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    ...buttonProps,
                    type: "button",
                    className: "vds-date-range-picker-trigger",
                    "aria-label": buttonProps["aria-label"] ?? "Open calendar",
                    children: /* @__PURE__ */ jsx(CalendarIcon2, {})
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(PopoverPrimitive2.Portal, { children: /* @__PURE__ */ jsx(
            PopoverPrimitive2.Content,
            {
              ...dialogProps,
              sideOffset: 6,
              align: "start",
              className: "vds-date-range-picker-content",
              children: /* @__PURE__ */ jsxs("div", { className: "vds-date-range-picker-content-inner", children: [
                presets ? /* @__PURE__ */ jsx("div", { className: "vds-date-range-picker-presets", children: presets }) : null,
                /* @__PURE__ */ jsxs("div", { className: "vds-date-range-picker-main", children: [
                  /* @__PURE__ */ jsx(
                    RangeCalendar,
                    {
                      ...calendarProps,
                      size,
                      appearance,
                      invalid: isInvalid,
                      locale: usedLocale
                    }
                  ),
                  state.hasTime ? /* @__PURE__ */ jsxs("div", { className: "vds-date-range-picker-time", children: [
                    /* @__PURE__ */ jsx(
                      TimeField,
                      {
                        value: state.timeRange?.start ?? null,
                        onChange: (v) => v && state.setTime("start", v),
                        granularity: props.granularity === "day" ? "hour" : props.granularity ?? "hour",
                        hourCycle: props.hourCycle,
                        hideTimeZone: props.hideTimeZone,
                        showPicker: props.showTimePicker ?? true,
                        showMilliseconds: props.showMilliseconds,
                        millisecondStep: props.millisecondStep,
                        size,
                        appearance,
                        "aria-label": "Start time"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      TimeField,
                      {
                        value: state.timeRange?.end ?? null,
                        onChange: (v) => v && state.setTime("end", v),
                        granularity: props.granularity === "day" ? "hour" : props.granularity ?? "hour",
                        hourCycle: props.hourCycle,
                        hideTimeZone: props.hideTimeZone,
                        showPicker: props.showTimePicker ?? true,
                        showMilliseconds: props.showMilliseconds,
                        millisecondStep: props.millisecondStep,
                        size,
                        appearance,
                        "aria-label": "End time"
                      }
                    )
                  ] }) : null,
                  footer ? /* @__PURE__ */ jsx("div", { className: "vds-date-range-picker-footer", children: footer }) : null
                ] })
              ] })
            }
          ) })
        ] }),
        description ? /* @__PURE__ */ jsx("span", { ...descriptionProps, className: "vds-date-range-picker-description", children: description }) : null,
        isInvalid && errorMessage ? /* @__PURE__ */ jsx("span", { ...errorMessageProps, className: "vds-date-range-picker-error", children: errorMessage }) : null
      ]
    }
  );
}
function CalendarIcon2() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "3.5", width: "11", height: "10", rx: "1.5", stroke: "currentColor", strokeWidth: "1.25" }),
    /* @__PURE__ */ jsx("path", { d: "M2.5 6.5H13.5", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M5.5 2V5M10.5 2V5", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round" })
  ] });
}
function DatePickerPresets({
  presets,
  value,
  onSelect,
  className,
  ref
}) {
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-date-picker-presets-list", className), children: presets.map((preset) => {
    const selected = value ? sameDay(value, preset.value) : false;
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "vds-date-picker-preset",
        "data-selected": selected ? "true" : void 0,
        onClick: () => onSelect(preset.value),
        children: preset.label
      },
      preset.id
    );
  }) });
}
function DateRangePickerPresets({
  presets,
  value,
  onSelect,
  className,
  ref
}) {
  return /* @__PURE__ */ jsx("div", { ref, className: cn("vds-date-picker-presets-list", className), children: presets.map((preset) => {
    const selected = value ? sameDay(value.start, preset.value.start) && sameDay(value.end, preset.value.end) : false;
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "vds-date-picker-preset",
        "data-selected": selected ? "true" : void 0,
        onClick: () => onSelect(preset.value),
        children: preset.label
      },
      preset.id
    );
  }) });
}
function sameDay(a, b) {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export { Calendar, DateField, DatePicker, DatePickerPresets, DateRangePicker, DateRangePickerPresets, FieldSegment, RangeCalendar, TimeField, createCalendar, resolveLocale };
