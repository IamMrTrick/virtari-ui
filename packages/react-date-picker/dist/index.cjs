'use strict';

var utils = require('@virtari/utils');
var react = require('react');
var calendar$1 = require('@react-aria/calendar');
var calendar = require('@react-stately/calendar');
var i18n = require('@react-aria/i18n');
var date = require('@internationalized/date');
var jsxRuntime = require('react/jsx-runtime');
var datepicker$1 = require('@react-aria/datepicker');
var datepicker = require('@react-stately/datepicker');
var PopoverPrimitive = require('@radix-ui/react-popover');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);

// src/Calendar.tsx
function createCalendar(identifier) {
  switch (identifier) {
    case "persian":
      return new date.PersianCalendar();
    case "islamic-umalqura":
      return new date.IslamicUmalquraCalendar();
    case "islamic-civil":
      return new date.IslamicCivilCalendar();
    case "islamic-tbla":
      return new date.IslamicTabularCalendar();
    case "buddhist":
      return new date.BuddhistCalendar();
    case "japanese":
      return new date.JapaneseCalendar();
    case "hebrew":
      return new date.HebrewCalendar();
    case "indian":
      return new date.IndianCalendar();
    case "ethiopic":
      return new date.EthiopicCalendar();
    case "ethioaa":
      return new date.EthiopicAmeteAlemCalendar();
    case "roc":
      return new date.TaiwanCalendar();
    case "gregory":
    default:
      return new date.GregorianCalendar();
  }
}
function resolveLocale(locale, calendar) {
  if (!calendar || calendar === "gregory") return locale;
  return locale.includes("-u-") ? locale : `${locale}-u-ca-${calendar}`;
}
function ChevronLeft() {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M7.5 3L4.5 6L7.5 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ChevronRight() {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M4.5 3L7.5 6L4.5 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Calendar({
  size = "md",
  appearance = "soft",
  invalid,
  calendar: calendar$2,
  locale,
  footer,
  className,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar$2);
  const state = calendar.useCalendarState({
    ...props,
    locale: usedLocale,
    createCalendar
  });
  const { calendarProps, prevButtonProps, nextButtonProps, title } = calendar$1.useCalendar(
    props,
    state
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ...calendarProps,
      ref,
      className: utils.cn("vds-calendar", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": invalid ? "true" : void 0,
      "data-dir": direction,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-calendar-header", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              ...prevButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": prevButtonProps["aria-label"] ?? "Previous month",
              children: direction === "rtl" ? /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, {}) : /* @__PURE__ */ jsxRuntime.jsx(ChevronLeft, {})
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "vds-calendar-heading", "aria-live": "polite", children: title }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              ...nextButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": nextButtonProps["aria-label"] ?? "Next month",
              children: direction === "rtl" ? /* @__PURE__ */ jsxRuntime.jsx(ChevronLeft, {}) : /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CalendarGrid, { state }),
        footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-calendar-footer", children: footer }) : null
      ]
    }
  );
}
function RangeCalendar({
  size = "md",
  appearance = "soft",
  invalid,
  calendar: calendar$2,
  locale,
  footer,
  className,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar$2);
  const state = calendar.useRangeCalendarState({
    ...props,
    locale: usedLocale,
    createCalendar
  });
  const localRef = react.useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } = calendar$1.useRangeCalendar(
    props,
    state,
    localRef
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ...calendarProps,
      ref: ref ?? localRef,
      className: utils.cn("vds-calendar", "vds-calendar-range", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": invalid ? "true" : void 0,
      "data-dir": direction,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-calendar-header", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              ...prevButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": prevButtonProps["aria-label"] ?? "Previous month",
              children: direction === "rtl" ? /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, {}) : /* @__PURE__ */ jsxRuntime.jsx(ChevronLeft, {})
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "vds-calendar-heading", "aria-live": "polite", children: title }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              ...nextButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": nextButtonProps["aria-label"] ?? "Next month",
              children: direction === "rtl" ? /* @__PURE__ */ jsxRuntime.jsx(ChevronLeft, {}) : /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CalendarGrid, { state, isRange: true }),
        footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-calendar-footer", children: footer }) : null
      ]
    }
  );
}
function CalendarGrid({ state, isRange }) {
  const { locale } = i18n.useLocale();
  const { gridProps, headerProps, weekDays } = calendar$1.useCalendarGrid({}, state);
  const weeksInMonth = date.getWeeksInMonth(state.visibleRange.start, locale);
  return /* @__PURE__ */ jsxRuntime.jsxs("table", { ...gridProps, className: "vds-calendar-grid", children: [
    /* @__PURE__ */ jsxRuntime.jsx("thead", { ...headerProps, children: /* @__PURE__ */ jsxRuntime.jsx("tr", { children: weekDays.map((day, i) => /* @__PURE__ */ jsxRuntime.jsx("th", { className: "vds-calendar-weekday", scope: "col", children: day }, i)) }) }),
    /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: Array.from({ length: weeksInMonth }, (_, weekIdx) => /* @__PURE__ */ jsxRuntime.jsx("tr", { children: state.getDatesInWeek(weekIdx).map(
      (date, i) => date ? /* @__PURE__ */ jsxRuntime.jsx(Cell, { state, date, isRange }, i) : /* @__PURE__ */ jsxRuntime.jsx("td", { className: "vds-calendar-cell-td" }, i)
    ) }, weekIdx)) })
  ] });
}
function Cell({ state, date: date$1, isRange }) {
  const ref = react.useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    isInvalid,
    formattedDate
  } = calendar$1.useCalendarCell({ date: date$1 }, state, ref);
  let isRangeStart = false;
  let isRangeEnd = false;
  let isRangeMiddle = false;
  if (isRange && isSelected) {
    const rangeState = state;
    const highlighted = rangeState.highlightedRange;
    if (highlighted) {
      isRangeStart = date.isSameDay(date$1, highlighted.start);
      isRangeEnd = date.isSameDay(date$1, highlighted.end);
      isRangeMiddle = !isRangeStart && !isRangeEnd;
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsx("td", { ...cellProps, className: "vds-calendar-cell-td", children: /* @__PURE__ */ jsxRuntime.jsx(
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
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = datepicker.useDateFieldState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    locale: usedLocale,
    createCalendar
  });
  const localRef = react.useRef(null);
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = datepicker$1.useDateField({ ...props, isInvalid: invalid ?? props.isInvalid }, state, localRef);
  const isInvalid = invalid ?? state.isInvalid;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: utils.cn("vds-date-field", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-disabled": props.isDisabled ? "true" : void 0,
      "data-readonly": props.isReadOnly ? "true" : void 0,
      "data-dir": direction,
      children: [
        label ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...labelProps, className: "vds-date-field-label", children: label }) : null,
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            ...fieldProps,
            ref: ref ?? localRef,
            className: "vds-date-field-group",
            children: state.segments.map((segment, i) => /* @__PURE__ */ jsxRuntime.jsx(FieldSegment, { segment, state }, i))
          }
        ),
        description ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...descriptionProps, className: "vds-date-field-description", children: description }) : null,
        isInvalid && errorMessage ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...errorMessageProps, className: "vds-date-field-error", children: errorMessage }) : null
      ]
    }
  );
}
function FieldSegment({ segment, state }) {
  const ref = react.useRef(null);
  const { segmentProps } = datepicker$1.useDateSegment(segment, state, ref);
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const state = datepicker.useTimeFieldState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    locale: locale ?? detectedLocale
  });
  const localRef = react.useRef(null);
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = datepicker$1.useTimeField(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    localRef
  );
  const isInvalid = invalid ?? state.isInvalid;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: utils.cn("vds-time-field", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-disabled": props.isDisabled ? "true" : void 0,
      "data-readonly": props.isReadOnly ? "true" : void 0,
      "data-dir": direction,
      children: [
        label ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...labelProps, className: "vds-time-field-label", children: label }) : null,
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            ...fieldProps,
            ref: ref ?? localRef,
            className: "vds-time-field-group",
            children: state.segments.map((segment, i) => /* @__PURE__ */ jsxRuntime.jsx(TimeSegment, { segment, state }, i))
          }
        ),
        description ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...descriptionProps, className: "vds-time-field-description", children: description }) : null,
        isInvalid && errorMessage ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...errorMessageProps, className: "vds-time-field-error", children: errorMessage }) : null
      ]
    }
  );
}
function TimeSegment({ segment, state }) {
  const ref = react.useRef(null);
  const { segmentProps } = datepicker$1.useDateSegment(segment, state, ref);
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = datepicker.useDatePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: props.shouldCloseOnSelect
  });
  const groupRef = react.useRef(null);
  const {
    labelProps,
    groupProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps
  } = datepicker$1.useDatePicker(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef
  );
  const fieldState = datepicker.useDateFieldState({
    ...fieldProps,
    locale: usedLocale,
    createCalendar
  });
  const fieldRef = react.useRef(null);
  const { fieldProps: innerFieldProps } = datepicker$1.useDateField(fieldProps, fieldState, fieldRef);
  const isInvalid = invalid ?? state.isInvalid;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      className: utils.cn("vds-date-picker", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-disabled": props.isDisabled ? "true" : void 0,
      "data-readonly": props.isReadOnly ? "true" : void 0,
      "data-dir": direction,
      children: [
        label ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...labelProps, className: "vds-date-picker-label", children: label }) : null,
        /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open: state.isOpen, onOpenChange: state.setOpen, children: [
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              ...groupProps,
              ref: groupRef,
              className: "vds-date-picker-group",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    ...innerFieldProps,
                    ref: fieldRef,
                    className: "vds-date-picker-field",
                    children: fieldState.segments.map((segment, i) => /* @__PURE__ */ jsxRuntime.jsx(FieldSegment, { segment, state: fieldState }, i))
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    ...buttonProps,
                    type: "button",
                    className: "vds-date-picker-trigger",
                    "aria-label": buttonProps["aria-label"] ?? "Open calendar",
                    children: /* @__PURE__ */ jsxRuntime.jsx(CalendarIcon, {})
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
            PopoverPrimitive__namespace.Content,
            {
              ...dialogProps,
              sideOffset: 6,
              align: "start",
              className: "vds-date-picker-content",
              children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-picker-content-inner", children: [
                presets ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-picker-presets", children: presets }) : null,
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-picker-main", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    Calendar,
                    {
                      ...calendarProps,
                      size,
                      appearance,
                      invalid: isInvalid,
                      locale: usedLocale
                    }
                  ),
                  state.hasTime ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-picker-time", children: /* @__PURE__ */ jsxRuntime.jsx(
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
                  footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-picker-footer", children: footer }) : null
                ] })
              ] })
            }
          ) })
        ] }),
        description ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...descriptionProps, className: "vds-date-picker-description", children: description }) : null,
        isInvalid && errorMessage ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...errorMessageProps, className: "vds-date-picker-error", children: errorMessage }) : null
      ]
    }
  );
}
function CalendarIcon() {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": "true",
      focusable: "false",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            d: "M2.5 6.5H13.5",
            stroke: "currentColor",
            strokeWidth: "1.25",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
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
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const state = datepicker.useDateRangePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: props.shouldCloseOnSelect
  });
  const groupRef = react.useRef(null);
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
  } = datepicker$1.useDateRangePicker(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef
  );
  const startFieldState = datepicker.useDateFieldState({
    ...startFieldProps,
    locale: usedLocale,
    createCalendar
  });
  const startFieldRef = react.useRef(null);
  const { fieldProps: innerStartFieldProps } = datepicker$1.useDateField(
    startFieldProps,
    startFieldState,
    startFieldRef
  );
  const endFieldState = datepicker.useDateFieldState({
    ...endFieldProps,
    locale: usedLocale,
    createCalendar
  });
  const endFieldRef = react.useRef(null);
  const { fieldProps: innerEndFieldProps } = datepicker$1.useDateField(
    endFieldProps,
    endFieldState,
    endFieldRef
  );
  const isInvalid = invalid ?? state.isInvalid;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref,
      className: utils.cn("vds-date-range-picker", className),
      "data-size": size,
      "data-appearance": appearance,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-disabled": props.isDisabled ? "true" : void 0,
      "data-readonly": props.isReadOnly ? "true" : void 0,
      "data-dir": direction,
      children: [
        label ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...labelProps, className: "vds-date-range-picker-label", children: label }) : null,
        /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open: state.isOpen, onOpenChange: state.setOpen, children: [
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              ...groupProps,
              ref: groupRef,
              className: "vds-date-range-picker-group",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    ...innerStartFieldProps,
                    ref: startFieldRef,
                    className: "vds-date-range-picker-field",
                    children: startFieldState.segments.map((segment, i) => /* @__PURE__ */ jsxRuntime.jsx(FieldSegment, { segment, state: startFieldState }, i))
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-date-range-picker-separator", "aria-hidden": "true", children: "\u2013" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    ...innerEndFieldProps,
                    ref: endFieldRef,
                    className: "vds-date-range-picker-field",
                    children: endFieldState.segments.map((segment, i) => /* @__PURE__ */ jsxRuntime.jsx(FieldSegment, { segment, state: endFieldState }, i))
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    ...buttonProps,
                    type: "button",
                    className: "vds-date-range-picker-trigger",
                    "aria-label": buttonProps["aria-label"] ?? "Open calendar",
                    children: /* @__PURE__ */ jsxRuntime.jsx(CalendarIcon2, {})
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
            PopoverPrimitive__namespace.Content,
            {
              ...dialogProps,
              sideOffset: 6,
              align: "start",
              className: "vds-date-range-picker-content",
              children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-range-picker-content-inner", children: [
                presets ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-range-picker-presets", children: presets }) : null,
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-range-picker-main", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    RangeCalendar,
                    {
                      ...calendarProps,
                      size,
                      appearance,
                      invalid: isInvalid,
                      locale: usedLocale
                    }
                  ),
                  state.hasTime ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-range-picker-time", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
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
                    /* @__PURE__ */ jsxRuntime.jsx(
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
                  footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-range-picker-footer", children: footer }) : null
                ] })
              ] })
            }
          ) })
        ] }),
        description ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...descriptionProps, className: "vds-date-range-picker-description", children: description }) : null,
        isInvalid && errorMessage ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...errorMessageProps, className: "vds-date-range-picker-error", children: errorMessage }) : null
      ]
    }
  );
}
function CalendarIcon2() {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsxRuntime.jsx("rect", { x: "2.5", y: "3.5", width: "11", height: "10", rx: "1.5", stroke: "currentColor", strokeWidth: "1.25" }),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M2.5 6.5H13.5", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round" }),
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M5.5 2V5M10.5 2V5", stroke: "currentColor", strokeWidth: "1.25", strokeLinecap: "round" })
  ] });
}
function DatePickerPresets({
  presets,
  value,
  onSelect,
  className,
  ref
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-date-picker-presets-list", className), children: presets.map((preset) => {
    const selected = value ? sameDay(value, preset.value) : false;
    return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: utils.cn("vds-date-picker-presets-list", className), children: presets.map((preset) => {
    const selected = value ? sameDay(value.start, preset.value.start) && sameDay(value.end, preset.value.end) : false;
    return /* @__PURE__ */ jsxRuntime.jsx(
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

Object.defineProperty(exports, "I18nProvider", {
  enumerable: true,
  get: function () { return i18n.I18nProvider; }
});
Object.defineProperty(exports, "useLocale", {
  enumerable: true,
  get: function () { return i18n.useLocale; }
});
Object.defineProperty(exports, "BuddhistCalendar", {
  enumerable: true,
  get: function () { return date.BuddhistCalendar; }
});
Object.defineProperty(exports, "CalendarDate", {
  enumerable: true,
  get: function () { return date.CalendarDate; }
});
Object.defineProperty(exports, "CalendarDateTime", {
  enumerable: true,
  get: function () { return date.CalendarDateTime; }
});
Object.defineProperty(exports, "EthiopicCalendar", {
  enumerable: true,
  get: function () { return date.EthiopicCalendar; }
});
Object.defineProperty(exports, "GregorianCalendar", {
  enumerable: true,
  get: function () { return date.GregorianCalendar; }
});
Object.defineProperty(exports, "HebrewCalendar", {
  enumerable: true,
  get: function () { return date.HebrewCalendar; }
});
Object.defineProperty(exports, "IndianCalendar", {
  enumerable: true,
  get: function () { return date.IndianCalendar; }
});
Object.defineProperty(exports, "IslamicCivilCalendar", {
  enumerable: true,
  get: function () { return date.IslamicCivilCalendar; }
});
Object.defineProperty(exports, "IslamicUmalquraCalendar", {
  enumerable: true,
  get: function () { return date.IslamicUmalquraCalendar; }
});
Object.defineProperty(exports, "JapaneseCalendar", {
  enumerable: true,
  get: function () { return date.JapaneseCalendar; }
});
Object.defineProperty(exports, "PersianCalendar", {
  enumerable: true,
  get: function () { return date.PersianCalendar; }
});
Object.defineProperty(exports, "TaiwanCalendar", {
  enumerable: true,
  get: function () { return date.TaiwanCalendar; }
});
Object.defineProperty(exports, "Time", {
  enumerable: true,
  get: function () { return date.Time; }
});
Object.defineProperty(exports, "ZonedDateTime", {
  enumerable: true,
  get: function () { return date.ZonedDateTime; }
});
Object.defineProperty(exports, "endOfMonth", {
  enumerable: true,
  get: function () { return date.endOfMonth; }
});
Object.defineProperty(exports, "endOfWeek", {
  enumerable: true,
  get: function () { return date.endOfWeek; }
});
Object.defineProperty(exports, "endOfYear", {
  enumerable: true,
  get: function () { return date.endOfYear; }
});
Object.defineProperty(exports, "getLocalTimeZone", {
  enumerable: true,
  get: function () { return date.getLocalTimeZone; }
});
Object.defineProperty(exports, "isSameDay", {
  enumerable: true,
  get: function () { return date.isSameDay; }
});
Object.defineProperty(exports, "isSameMonth", {
  enumerable: true,
  get: function () { return date.isSameMonth; }
});
Object.defineProperty(exports, "isSameYear", {
  enumerable: true,
  get: function () { return date.isSameYear; }
});
Object.defineProperty(exports, "isToday", {
  enumerable: true,
  get: function () { return date.isToday; }
});
Object.defineProperty(exports, "isWeekend", {
  enumerable: true,
  get: function () { return date.isWeekend; }
});
Object.defineProperty(exports, "now", {
  enumerable: true,
  get: function () { return date.now; }
});
Object.defineProperty(exports, "parseAbsolute", {
  enumerable: true,
  get: function () { return date.parseAbsolute; }
});
Object.defineProperty(exports, "parseDate", {
  enumerable: true,
  get: function () { return date.parseDate; }
});
Object.defineProperty(exports, "parseDateTime", {
  enumerable: true,
  get: function () { return date.parseDateTime; }
});
Object.defineProperty(exports, "parseTime", {
  enumerable: true,
  get: function () { return date.parseTime; }
});
Object.defineProperty(exports, "parseZonedDateTime", {
  enumerable: true,
  get: function () { return date.parseZonedDateTime; }
});
Object.defineProperty(exports, "startOfMonth", {
  enumerable: true,
  get: function () { return date.startOfMonth; }
});
Object.defineProperty(exports, "startOfWeek", {
  enumerable: true,
  get: function () { return date.startOfWeek; }
});
Object.defineProperty(exports, "startOfYear", {
  enumerable: true,
  get: function () { return date.startOfYear; }
});
Object.defineProperty(exports, "toCalendar", {
  enumerable: true,
  get: function () { return date.toCalendar; }
});
Object.defineProperty(exports, "toCalendarDate", {
  enumerable: true,
  get: function () { return date.toCalendarDate; }
});
Object.defineProperty(exports, "toCalendarDateTime", {
  enumerable: true,
  get: function () { return date.toCalendarDateTime; }
});
Object.defineProperty(exports, "toZoned", {
  enumerable: true,
  get: function () { return date.toZoned; }
});
Object.defineProperty(exports, "today", {
  enumerable: true,
  get: function () { return date.today; }
});
exports.Calendar = Calendar;
exports.DateField = DateField;
exports.DatePicker = DatePicker;
exports.DatePickerPresets = DatePickerPresets;
exports.DateRangePicker = DateRangePicker;
exports.DateRangePickerPresets = DateRangePickerPresets;
exports.FieldSegment = FieldSegment;
exports.RangeCalendar = RangeCalendar;
exports.TimeField = TimeField;
exports.createCalendar = createCalendar;
exports.resolveLocale = resolveLocale;
