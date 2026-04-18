import { cn } from '@virtari/utils';
import { useRef } from 'react';
import { useCalendar, useRangeCalendar, useCalendarGrid, useCalendarCell } from '@react-aria/calendar';
import { useCalendarState, useRangeCalendarState } from '@react-stately/calendar';
import { useLocale } from '@react-aria/i18n';
export { I18nProvider, useLocale } from '@react-aria/i18n';
import { GregorianCalendar, TaiwanCalendar, EthiopicAmeteAlemCalendar, EthiopicCalendar, IndianCalendar, HebrewCalendar, JapaneseCalendar, BuddhistCalendar, IslamicTabularCalendar, IslamicCivilCalendar, IslamicUmalquraCalendar, PersianCalendar, getWeeksInMonth, isSameDay } from '@internationalized/date';
export { BuddhistCalendar, CalendarDate, CalendarDateTime, EthiopicCalendar, GregorianCalendar, HebrewCalendar, IndianCalendar, IslamicCivilCalendar, IslamicUmalquraCalendar, JapaneseCalendar, PersianCalendar, TaiwanCalendar, Time, ZonedDateTime, endOfMonth, endOfWeek, endOfYear, getLocalTimeZone, isSameDay, isSameMonth, isSameYear, isToday, isWeekend, now, parseAbsolute, parseDate, parseDateTime, parseTime, parseZonedDateTime, startOfMonth, startOfWeek, startOfYear, toCalendar, toCalendarDate, toCalendarDateTime, toZoned, today } from '@internationalized/date';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useDateField, useDateSegment, useTimeField, useDatePicker, useDateRangePicker } from '@react-aria/datepicker';
import { useDateFieldState, useTimeFieldState, useDatePickerState, useDateRangePickerState } from '@react-stately/datepicker';
import * as PopoverPrimitive from '@radix-ui/react-popover';

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
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M7.5 3L4.5 6L7.5 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ChevronRight() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M4.5 3L7.5 6L4.5 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
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
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = useLocale();
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
      children: [
        label ? /* @__PURE__ */ jsx("span", { ...labelProps, className: "vds-time-field-label", children: label }) : null,
        /* @__PURE__ */ jsx(
          "div",
          {
            ...fieldProps,
            ref: ref ?? localRef,
            className: "vds-time-field-group",
            children: state.segments.map((segment, i) => /* @__PURE__ */ jsx(TimeSegment, { segment, state }, i))
          }
        ),
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
        /* @__PURE__ */ jsxs(PopoverPrimitive.Root, { open: state.isOpen, onOpenChange: state.setOpen, children: [
          /* @__PURE__ */ jsx(PopoverPrimitive.Anchor, { asChild: true, children: /* @__PURE__ */ jsxs(
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
                /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
            PopoverPrimitive.Content,
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
        /* @__PURE__ */ jsxs(PopoverPrimitive.Root, { open: state.isOpen, onOpenChange: state.setOpen, children: [
          /* @__PURE__ */ jsx(PopoverPrimitive.Anchor, { asChild: true, children: /* @__PURE__ */ jsxs(
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
                /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
            PopoverPrimitive.Content,
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
