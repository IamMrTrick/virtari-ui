"use client";
'use strict';

var utils = require('@virtari-packages/utils');
var react = require('react');
var calendar$1 = require('@react-aria/calendar');
var calendar = require('@react-stately/calendar');
var i18n = require('@react-aria/i18n');
var date = require('@internationalized/date');
var reactIcons = require('@virtari-packages/react-icons');
var jsxRuntime = require('react/jsx-runtime');
var datepicker$1 = require('@react-aria/datepicker');
var datepicker = require('@react-stately/datepicker');
var PopoverPrimitive = require('@radix-ui/react-popover');
var reactButton = require('@virtari-packages/react-button');
var reactDialog = require('@virtari-packages/react-dialog');
var reactDrawer = require('@virtari-packages/react-drawer');
var reactRadioGroup = require('@virtari-packages/react-radio-group');

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

// src/aria-button.ts
function toButtonProps(props) {
  const {
    disabled,
    isDisabled,
    onBlur,
    onClick,
    onFocus,
    onFocusChange,
    onPress,
    ...domProps
  } = props;
  return {
    ...domProps,
    disabled: disabled ?? isDisabled,
    "aria-disabled": isDisabled ? true : domProps["aria-disabled"],
    onClick: chainMouseHandlers(onClick, () => {
      onPress?.(void 0);
    }),
    onFocus: chainFocusHandlers(onFocus, () => {
      onFocusChange?.(true);
    }),
    onBlur: chainFocusHandlers(onBlur, () => {
      onFocusChange?.(false);
    })
  };
}
function chainMouseHandlers(first, second) {
  return (event) => {
    first?.(event);
    if (!event.defaultPrevented) {
      second?.(event);
    }
  };
}
function chainFocusHandlers(first, second) {
  return (event) => {
    first?.(event);
    if (!event.defaultPrevented) {
      second?.(event);
    }
  };
}
function ScrollWheel({
  label,
  values,
  value,
  formatValue,
  onChange,
  variant = "number",
  className,
  showHeader = true
}) {
  const wheelRef = react.useRef(null);
  const itemRefs = react.useRef(/* @__PURE__ */ new Map());
  const scrollTimerRef = react.useRef(null);
  const valueRef = react.useRef(value);
  const onChangeRef = react.useRef(onChange);
  const [activeValue, setActiveValue] = react.useState(value);
  const [dragging, setDragging] = react.useState(false);
  const dragStateRef = react.useRef({
    active: false,
    pointerId: -1,
    pointerType: "",
    startY: 0,
    lastY: 0,
    startScrollTop: 0,
    moved: false,
    velocity: 0,
    velocityTime: 0
  });
  const centeredOnceRef = react.useRef(false);
  const centerValue = react.useCallback(
    (nextValue, behavior) => {
      const wheel = wheelRef.current;
      const item = itemRefs.current.get(nextValue);
      if (!wheel || !item) return;
      const targetTop = item.offsetTop - (wheel.clientHeight - item.offsetHeight) / 2;
      wheel.scrollTo({ top: targetTop, behavior });
    },
    []
  );
  const getNearestValue = react.useCallback(() => {
    const wheel = wheelRef.current;
    if (!wheel) return valueRef.current;
    const center = wheel.scrollTop + wheel.clientHeight / 2;
    let nearest = valueRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const itemValue of values) {
      const item = itemRefs.current.get(itemValue);
      if (!item) continue;
      const itemCenter = item.offsetTop + item.offsetHeight / 2;
      const distance = Math.abs(itemCenter - center);
      if (distance < nearestDistance) {
        nearest = itemValue;
        nearestDistance = distance;
      }
    }
    return nearest;
  }, [values]);
  const commitNearest = react.useCallback(
    (behavior = "smooth") => {
      const nearest = getNearestValue();
      if (nearest !== valueRef.current) {
        onChangeRef.current(nearest);
      }
      centerValue(nearest, behavior);
    },
    [centerValue, getNearestValue]
  );
  const scheduleSnap = react.useCallback(
    (delay = 90, behavior = "smooth") => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
      scrollTimerRef.current = window.setTimeout(() => {
        commitNearest(behavior);
      }, delay);
    },
    [commitNearest]
  );
  const stepValue = react.useCallback(
    (delta) => {
      if (!delta || values.length === 0) return;
      const currentIndex = values.indexOf(valueRef.current);
      const nearestIndex = values.indexOf(getNearestValue());
      const baseIndex = currentIndex >= 0 ? currentIndex : Math.max(nearestIndex, 0);
      const nextIndex = clamp(baseIndex + delta, 0, values.length - 1);
      const nextValue = values[nextIndex];
      if (nextValue === void 0) return;
      if (nextValue !== valueRef.current) {
        onChangeRef.current(nextValue);
      }
      setActiveValue(nextValue);
      centerValue(nextValue, "smooth");
    },
    [centerValue, getNearestValue, values]
  );
  react.useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
    setActiveValue(value);
  }, [value, onChange]);
  react.useLayoutEffect(() => {
    if (!wheelRef.current) return;
    if (!centeredOnceRef.current) {
      centerValue(value, "auto");
      centeredOnceRef.current = true;
      return;
    }
    if (!dragging) {
      centerValue(value, "auto");
    }
  }, [centerValue, dragging, value]);
  react.useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);
  const handlePointerDown = (event) => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    if (event.pointerType === "touch") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragStateRef.current = {
      active: true,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startY: event.clientY,
      lastY: event.clientY,
      startScrollTop: wheel.scrollTop,
      moved: false,
      velocity: 0,
      velocityTime: performance.now()
    };
    setDragging(true);
    try {
      wheel.setPointerCapture(event.pointerId);
    } catch {
    }
  };
  const handlePointerMove = (event) => {
    const wheel = wheelRef.current;
    const dragState = dragStateRef.current;
    if (!wheel || !dragState.active || dragState.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    const now2 = performance.now();
    const delta = event.clientY - dragState.startY;
    if (Math.abs(delta) > 3) {
      dragState.moved = true;
    }
    const dt = Math.max(1, now2 - dragState.velocityTime);
    dragState.velocity = (event.clientY - dragState.lastY) / dt;
    dragState.lastY = event.clientY;
    dragState.velocityTime = now2;
    wheel.scrollTop = dragState.startScrollTop - delta;
  };
  const handlePointerRelease = (event) => {
    const wheel = wheelRef.current;
    const dragState = dragStateRef.current;
    if (!wheel || !dragState.active || dragState.pointerId !== event.pointerId) return;
    try {
      wheel.releasePointerCapture(event.pointerId);
    } catch {
    }
    dragState.active = false;
    setDragging(false);
    const flick = Math.max(-6, Math.min(6, Math.round(dragState.velocity * -60)));
    if (flick !== 0) {
      stepValue(flick);
    } else {
      scheduleSnap();
    }
  };
  react.useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    const onNativeWheel = (event) => {
      if (event.deltaY === 0) return;
      event.preventDefault();
      event.stopPropagation();
      const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? wheel.clientHeight : 1;
      const threshold = 22;
      const raw = event.deltaY * multiplier;
      const steps = Math.trunc(raw / threshold) || (raw > 0 ? 1 : -1);
      stepValue(steps);
    };
    wheel.addEventListener("wheel", onNativeWheel, { passive: false });
    return () => wheel.removeEventListener("wheel", onNativeWheel);
  }, [stepValue]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: className ?? "vds-time-wheel", "data-variant": variant, children: [
    showHeader ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-time-wheel-header", "aria-hidden": "true", children: label }) : null,
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: wheelRef,
        className: "vds-time-wheel-track",
        role: "listbox",
        "aria-label": label,
        "data-dragging": dragging ? "true" : void 0,
        "data-vds-drawer-no-drag": "",
        onScroll: () => {
          setActiveValue(getNearestValue());
          if (!dragStateRef.current.active) {
            scheduleSnap(120);
          }
        },
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerRelease,
        onPointerCancel: handlePointerRelease,
        onLostPointerCapture: () => {
          dragStateRef.current.active = false;
          setDragging(false);
        },
        children: values.map((itemValue, index) => {
          const selected = itemValue === activeValue;
          const activeIndex = values.indexOf(activeValue);
          const distance = activeIndex < 0 ? 0 : Math.min(4, Math.abs(index - activeIndex));
          return /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              ref: (node) => {
                if (node) {
                  itemRefs.current.set(itemValue, node);
                } else {
                  itemRefs.current.delete(itemValue);
                }
              },
              type: "button",
              className: "vds-time-wheel-item",
              role: "option",
              "data-value": itemValue,
              "data-selected": selected ? "true" : void 0,
              "data-distance": distance,
              "aria-selected": selected,
              "aria-label": `${label} ${formatValue(itemValue)}`,
              tabIndex: selected ? 0 : -1,
              onKeyDown: (event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  stepValue(1);
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  stepValue(-1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  const first = values[0];
                  if (first !== void 0) {
                    setActiveValue(first);
                    onChangeRef.current(first);
                    centerValue(first, "smooth");
                  }
                } else if (event.key === "End") {
                  event.preventDefault();
                  const last = values[values.length - 1];
                  if (last !== void 0) {
                    setActiveValue(last);
                    onChangeRef.current(last);
                    centerValue(last, "smooth");
                  }
                }
              },
              onClick: () => {
                if (dragStateRef.current.moved) {
                  dragStateRef.current.moved = false;
                  return;
                }
                setActiveValue(itemValue);
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
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function ChevronLeft() {
  return /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconChevronLeft, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false });
}
function ChevronRight() {
  return /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconChevronRight, { size: 12, stroke: 1.5, "aria-hidden": true, focusable: false });
}
function Calendar({
  size = "md",
  appearance = "soft",
  invalid,
  calendar: calendar$2,
  locale,
  footer,
  className,
  onViewChange,
  apiRef,
  hideInternalActions,
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
  const { calendarProps, prevButtonProps, nextButtonProps } = calendar$1.useCalendar(
    props,
    state
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    CalendarFrame,
    {
      ref,
      calendarProps,
      prevButtonProps,
      nextButtonProps,
      state,
      direction,
      locale: usedLocale,
      size,
      appearance,
      invalid,
      footer,
      className,
      onViewChange,
      apiRef,
      hideInternalActions
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
  onViewChange,
  apiRef,
  hideInternalActions,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar$2);
  const localRef = react.useRef(null);
  const state = calendar.useRangeCalendarState({
    ...props,
    locale: usedLocale,
    createCalendar
  });
  const { calendarProps, prevButtonProps, nextButtonProps } = calendar$1.useRangeCalendar(
    props,
    state,
    localRef
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    CalendarFrame,
    {
      ref: ref ?? localRef,
      calendarProps,
      prevButtonProps,
      nextButtonProps,
      state,
      direction,
      locale: usedLocale,
      size,
      appearance,
      invalid,
      footer,
      className: utils.cn("vds-calendar-range", className),
      onViewChange,
      apiRef,
      hideInternalActions
    }
  );
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
  ref
}) {
  const [view, setViewInternal] = react.useState("days");
  const [draftYear, setDraftYear] = react.useState(null);
  const [draftMonth, setDraftMonth] = react.useState(null);
  const setView = react.useCallback(
    (next) => {
      setViewInternal((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        if (resolved !== prev) {
          onViewChange?.(resolved);
        }
        return resolved;
      });
    },
    [onViewChange]
  );
  react.useEffect(() => {
    if (view !== "years") setDraftYear(null);
    if (view !== "months") setDraftMonth(null);
  }, [view]);
  const primaryValue = getPrimaryValue(state);
  const primaryKey = primaryValue ? `${primaryValue.calendar.identifier}:${primaryValue.year}-${primaryValue.month}-${primaryValue.day}` : null;
  react.useEffect(() => {
    if (!primaryValue) return;
    const focused = state.focusedDate;
    if (focused.year !== primaryValue.year || focused.month !== primaryValue.month) {
      state.setFocusedDate(primaryValue);
    }
  }, [primaryKey]);
  const focusedForHandle = state.focusedDate;
  const applyYearDraft = react.useCallback(() => {
    const picked = draftYear ?? focusedForHandle.year;
    state.setFocusedDate(focusedForHandle.set({ year: picked, day: 1 }));
    setDraftYear(null);
    setView("days");
  }, [draftYear, focusedForHandle, state, setView]);
  const applyMonthDraft = react.useCallback(() => {
    const picked = draftMonth ?? focusedForHandle.month;
    state.setFocusedDate(focusedForHandle.set({ month: picked, day: 1 }));
    setDraftMonth(null);
    setView("days");
  }, [draftMonth, focusedForHandle, state, setView]);
  const cancelDraft = react.useCallback(() => {
    setDraftYear(null);
    setDraftMonth(null);
    setView("days");
  }, [setView]);
  react.useLayoutEffect(() => {
    if (!apiRef) return;
    apiRef.current = {
      getView: () => view,
      setView,
      hasMonthDraft: () => draftMonth !== null,
      hasYearDraft: () => draftYear !== null,
      applyMonthDraft,
      applyYearDraft,
      cancelDraft
    };
    return () => {
      if (apiRef.current && typeof apiRef === "object") {
        apiRef.current = null;
      }
    };
  }, [apiRef, applyMonthDraft, applyYearDraft, cancelDraft, draftMonth, draftYear, setView, view]);
  const previousButtonProps = toButtonProps(prevButtonProps);
  const followingButtonProps = toButtonProps(nextButtonProps);
  const monthFormatter = react.useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }),
    [locale]
  );
  const monthCaptionFormatter = react.useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }),
    [locale]
  );
  const visibleMonthCount = getVisibleMonthCount(state.visibleRange);
  const monthStartDates = react.useMemo(
    () => Array.from(
      { length: visibleMonthCount },
      (_, index) => state.visibleRange.start.add({ months: index }).set({ day: 1 })
    ),
    [state.visibleRange.start, visibleMonthCount]
  );
  const focusedDate = state.focusedDate;
  const monthLabel = monthFormatter.format(focusedDate.toDate("UTC"));
  const monthOptions = getMonthOptions(focusedDate, monthFormatter);
  const yearOptions = react.useMemo(
    () => getYearWheelOptions(focusedDate),
    [focusedDate.calendar.identifier, focusedDate.year]
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
      "data-view": view,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-calendar-header", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              ...previousButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": view === "days" ? previousButtonProps["aria-label"] ?? "Previous month" : "Previous",
              onClick: handlePrevious,
              children: direction === "rtl" ? /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, {}) : /* @__PURE__ */ jsxRuntime.jsx(ChevronLeft, {})
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-calendar-heading", "aria-live": "polite", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "vds-calendar-heading-button",
                onClick: () => setView((current) => current === "months" ? "days" : "months"),
                children: /* @__PURE__ */ jsxRuntime.jsx(SlotCounter, { value: monthLabel })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "vds-calendar-heading-button",
                onClick: () => setView((current) => current === "years" ? "days" : "years"),
                children: /* @__PURE__ */ jsxRuntime.jsx(SlotCounter, { value: String(focusedDate.year) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              ...followingButtonProps,
              type: "button",
              className: "vds-calendar-nav",
              "aria-label": view === "days" ? followingButtonProps["aria-label"] ?? "Next month" : "Next",
              onClick: handleNext,
              children: direction === "rtl" ? /* @__PURE__ */ jsxRuntime.jsx(ChevronLeft, {}) : /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, {})
            }
          )
        ] }),
        view === "days" ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-calendar-months", "data-month-count": monthStartDates.length, children: monthStartDates.map((startDate) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-calendar-month", children: [
          monthStartDates.length > 1 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-calendar-month-caption", children: monthCaptionFormatter.format(startDate.toDate("UTC")) }) : null,
          /* @__PURE__ */ jsxRuntime.jsx(
            CalendarGrid,
            {
              state,
              startDate,
              isRange: "anchorDate" in state,
              hideOutsideMonth: monthStartDates.length > 1
            }
          )
        ] }, startDate.toString())) }) : null,
        view === "months" ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-calendar-wheel-view", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-calendar-year-wheel", "data-role": "month-wheel", children: /* @__PURE__ */ jsxRuntime.jsx(
            ScrollWheel,
            {
              label: "Month",
              variant: "year",
              showHeader: false,
              values: monthOptions.map((option) => option.value),
              value: draftMonth ?? focusedDate.month,
              formatValue: (monthNumber) => {
                const option = monthOptions.find((item) => item.value === monthNumber);
                return option ? String(option.label) : String(monthNumber);
              },
              onChange: (monthNumber) => setDraftMonth(monthNumber)
            }
          ) }),
          hideInternalActions ? null : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-calendar-year-actions", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "vds-calendar-year-action vds-calendar-year-action--secondary",
                onClick: cancelDraft,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "vds-calendar-year-action vds-calendar-year-action--primary",
                onClick: applyMonthDraft,
                children: "Change Month"
              }
            )
          ] })
        ] }) : null,
        view === "years" ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-calendar-wheel-view", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-calendar-year-wheel", children: /* @__PURE__ */ jsxRuntime.jsx(
            ScrollWheel,
            {
              label: "Year",
              variant: "year",
              showHeader: false,
              values: yearOptions,
              value: draftYear ?? focusedDate.year,
              formatValue: (year) => String(year),
              onChange: (year) => setDraftYear(year)
            }
          ) }),
          hideInternalActions ? null : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-calendar-year-actions", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "vds-calendar-year-action vds-calendar-year-action--secondary",
                onClick: cancelDraft,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "vds-calendar-year-action vds-calendar-year-action--primary",
                onClick: applyYearDraft,
                children: "Change Year"
              }
            )
          ] })
        ] }) : null,
        footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-calendar-footer", children: footer }) : null
      ]
    }
  );
}
function CalendarGrid({ state, startDate, isRange, hideOutsideMonth }) {
  const { gridProps, headerProps, weekDays, weeksInMonth } = calendar$1.useCalendarGrid(
    { startDate },
    state
  );
  return /* @__PURE__ */ jsxRuntime.jsxs("table", { ...gridProps, className: "vds-calendar-grid", children: [
    /* @__PURE__ */ jsxRuntime.jsx("thead", { ...headerProps, children: /* @__PURE__ */ jsxRuntime.jsx("tr", { children: weekDays.map((day, index) => /* @__PURE__ */ jsxRuntime.jsx("th", { className: "vds-calendar-weekday", scope: "col", children: day }, index)) }) }),
    /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: Array.from({ length: weeksInMonth }, (_, weekIndex) => /* @__PURE__ */ jsxRuntime.jsx("tr", { children: state.getDatesInWeek(weekIndex, startDate).map(
      (date, index) => date ? /* @__PURE__ */ jsxRuntime.jsx(
        Cell,
        {
          state,
          date,
          isRange,
          gridStartDate: startDate,
          hideOutsideMonth
        },
        index
      ) : /* @__PURE__ */ jsxRuntime.jsx("td", { className: "vds-calendar-cell-td" }, index)
    ) }, weekIndex)) })
  ] });
}
function Cell({ state, date: date$1, isRange, gridStartDate, hideOutsideMonth }) {
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
  const todayDate = date.today(state.timeZone);
  const isOutsideMonth = date$1.month !== gridStartDate.month || date$1.year !== gridStartDate.year;
  const hideAsOutsideMonth = Boolean(hideOutsideMonth) && isOutsideMonth;
  let isRangeStart = false;
  let isRangeEnd = false;
  let isRangeMiddle = false;
  if (isRange && !hideAsOutsideMonth) {
    const rangeState = state;
    const highlightedRange = rangeState.highlightedRange;
    if (highlightedRange) {
      isRangeStart = date$1.compare(highlightedRange.start) === 0;
      isRangeEnd = date$1.compare(highlightedRange.end) === 0;
      isRangeMiddle = date$1.compare(highlightedRange.start) > 0 && date$1.compare(highlightedRange.end) < 0;
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsx("td", { ...cellProps, className: "vds-calendar-cell-td", children: /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ...buttonProps,
      ref,
      className: "vds-calendar-cell",
      "data-today": date$1.compare(todayDate) === 0 ? "true" : void 0,
      "data-outside": isOutsideVisibleRange ? "true" : void 0,
      "data-selected": isSelected && !hideAsOutsideMonth ? "true" : void 0,
      "data-disabled": isDisabled ? "true" : void 0,
      "data-unavailable": isUnavailable ? "true" : void 0,
      "data-invalid": isInvalid ? "true" : void 0,
      "data-range-start": isRangeStart ? "true" : void 0,
      "data-range-end": isRangeEnd ? "true" : void 0,
      "data-range-middle": isRangeMiddle ? "true" : void 0,
      hidden: isOutsideVisibleRange || hideAsOutsideMonth,
      children: formattedDate
    }
  ) });
}
function getVisibleMonthCount(visibleRange) {
  const months = (visibleRange.end.year - visibleRange.start.year) * 12 + (visibleRange.end.month - visibleRange.start.month);
  return Math.max(1, months + 1);
}
function getMonthOptions(date, formatter) {
  const count = date.calendar.getMonthsInYear(date);
  return Array.from({ length: count }, (_, index) => {
    const month = index + 1;
    return {
      value: month,
      label: formatter.format(date.set({ month, day: 1 }).toDate("UTC"))
    };
  });
}
function getPrimaryValue(state) {
  if ("anchorDate" in state) {
    const range2 = state.value;
    return range2?.start ?? range2?.end ?? null;
  }
  return state.value ?? null;
}
function SlotCounter({ value }) {
  const [prev, setPrev] = react.useState(null);
  const [direction, setDirection] = react.useState(1);
  const priorValue = react.useRef(value);
  react.useLayoutEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "vds-slot-counter", "data-direction": direction === -1 ? "down" : "up", children: [
    prev !== null ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-slot-counter-prev", "aria-hidden": "true", children: prev }, `out-${prev}`) : null,
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-slot-counter-current", children: value }, `in-${value}`)
  ] });
}
function parseNumeric(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
function getYearWheelOptions(focusedDate) {
  const nowInCalendar = date.toCalendar(date.today("UTC"), focusedDate.calendar).year;
  const isGregorian = focusedDate.calendar.identifier === "gregory";
  const defaultStart = isGregorian ? 1990 : Math.max(1, nowInCalendar - 36);
  const start = Math.min(defaultStart, focusedDate.year);
  const end = Math.max(nowInCalendar + 20, focusedDate.year);
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
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
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = datepicker$1.useDateField({ ...props, label, isInvalid: invalid ?? props.isInvalid }, state, localRef);
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
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            ...errorMessageProps,
            role: isInvalid && errorMessage ? "alert" : void 0,
            "aria-hidden": isInvalid && errorMessage ? void 0 : true,
            "data-visible": isInvalid && errorMessage ? "" : void 0,
            "data-empty": isInvalid && errorMessage ? void 0 : "",
            className: "vds-date-field-error",
            children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-date-field-error-body", children: errorMessage })
          }
        )
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
      children: padSegmentText(segment)
    }
  );
}
function StaticFieldSegments({ segments, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: utils.cn("vds-static-field-segments", className), "aria-hidden": "true", children: segments.map((segment, index) => /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: "vds-static-field-segment",
      "data-type": segment.type,
      "data-placeholder": segment.isPlaceholder ? "true" : void 0,
      children: padSegmentText(segment)
    },
    `${segment.type}-${index}`
  )) });
}
function padSegmentText(segment) {
  if (segment.isPlaceholder) return segment.text;
  if (!PADDABLE_SEGMENT_TYPES.has(segment.type)) return segment.text;
  if (segment.text.length === 1 && /^\d$/.test(segment.text)) {
    return `0${segment.text}`;
  }
  return segment.text;
}
var padTimeSegmentText = padSegmentText;
var PADDABLE_SEGMENT_TYPES = /* @__PURE__ */ new Set([
  "day",
  "month",
  "hour",
  "minute",
  "second"
]);
var MOBILE_BREAKPOINT = 42;
function useIsMobileViewport() {
  const [isMobile, setIsMobile] = react.useState(
    () => typeof window !== "undefined" ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}rem)`).matches : false
  );
  react.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}rem)`);
    const update = (event) => setIsMobile(event.matches);
    setIsMobile(query.matches);
    if ("addEventListener" in query) {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }
    const legacyQuery = query;
    legacyQuery.addListener?.(update);
    return () => legacyQuery.removeListener?.(update);
  }, []);
  return isMobile;
}
function PickerActionBar({
  onApply,
  onCancel,
  applyDisabled,
  applyLabel = "Apply",
  cancelLabel = "Cancel",
  buttonSize = "md",
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: utils.cn("vds-picker-action-bar", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      reactButton.Button,
      {
        type: "button",
        color: "contrast",
        variant: "soft",
        size: buttonSize,
        onClick: onCancel,
        children: cancelLabel
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactButton.Button,
      {
        type: "button",
        size: buttonSize,
        onClick: onApply,
        disabled: applyDisabled,
        children: applyLabel
      }
    )
  ] });
}
function MobilePickerSurface({
  open,
  onOpenChange,
  title,
  description,
  leadingAction,
  trailingAction,
  presentation = "drawer",
  sizeMode = "content",
  dialogSize = "sm",
  className,
  bodyClassName,
  footerClassName,
  children,
  footer
}) {
  if (presentation === "dialog") {
    return /* @__PURE__ */ jsxRuntime.jsx(reactDialog.Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(
      reactDialog.DialogContent,
      {
        size: sizeMode === "full" ? "full" : dialogSize,
        responsive: sizeMode === "full",
        backdrop: "blur",
        className: utils.cn("vds-picker-mobile-surface", "vds-picker-mobile-dialog", className),
        onOpenAutoFocus: (event) => event.preventDefault(),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactDialog.DialogHeader, { variant: "bordered", className: "vds-picker-mobile-header", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-picker-mobile-header-main", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: "vds-picker-mobile-header-slot",
                "data-slot": "leading",
                "data-empty": leadingAction ? void 0 : "true",
                children: leadingAction
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-picker-mobile-header-copy", children: [
              /* @__PURE__ */ jsxRuntime.jsx(reactDialog.DialogTitle, { className: "vds-picker-mobile-header-title", children: title }),
              description ? /* @__PURE__ */ jsxRuntime.jsx(reactDialog.DialogDescription, { className: "vds-picker-mobile-header-description", children: description }) : null
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: "vds-picker-mobile-header-slot",
                "data-slot": "trailing",
                "data-empty": trailingAction ? void 0 : "true",
                children: trailingAction
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(reactDialog.DialogBody, { className: utils.cn("vds-picker-mobile-body", bodyClassName), children }),
          footer ? /* @__PURE__ */ jsxRuntime.jsx(reactDialog.DialogFooter, { className: utils.cn("vds-picker-mobile-footer", footerClassName), children: footer }) : null
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactDrawer.Drawer,
    {
      open,
      onOpenChange,
      direction: "bottom",
      sizeMode: sizeMode === "full" ? "full" : "adaptive",
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        reactDrawer.DrawerContent,
        {
          className: utils.cn("vds-picker-mobile-surface", "vds-picker-mobile-drawer", className),
          onOpenAutoFocus: (event) => event.preventDefault(),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerHandle, {}),
            /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerHeader, { variant: "bordered", className: "vds-picker-mobile-header", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-picker-mobile-header-main", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "vds-picker-mobile-header-slot",
                  "data-slot": "leading",
                  "data-empty": leadingAction ? void 0 : "true",
                  children: leadingAction
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-picker-mobile-header-copy", children: [
                /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerTitle, { className: "vds-picker-mobile-header-title", children: title }),
                description ? /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerDescription, { className: "vds-picker-mobile-header-description", children: description }) : null
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "vds-picker-mobile-header-slot",
                  "data-slot": "trailing",
                  "data-empty": trailingAction ? void 0 : "true",
                  children: trailingAction
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerBody, { className: utils.cn("vds-picker-mobile-body", bodyClassName), children }),
            footer ? /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.DrawerFooter, { className: utils.cn("vds-picker-mobile-footer", footerClassName), children: footer }) : null
          ]
        }
      )
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
  defaultTimeValue,
  onTriggerClick,
  overlayMode = "auto",
  mobilePresentation = "drawer",
  mobileSizeMode = "content",
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const isMobile = useIsMobileViewport();
  const resolvedOverlayMode = overlayMode === "auto" ? isMobile ? mobilePresentation : "popover" : overlayMode;
  const usePopoverSurface = resolvedOverlayMode === "popover";
  const useSheetSurface = resolvedOverlayMode === "drawer" || resolvedOverlayMode === "dialog";
  const [pickerOpen, setPickerOpen] = react.useState(false);
  const state = datepicker.useTimeFieldState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    locale: locale ?? detectedLocale
  });
  const localRef = react.useRef(null);
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = datepicker$1.useTimeField(
    { ...props, label, isInvalid: invalid ?? props.isInvalid },
    state,
    localRef
  );
  const isInvalid = invalid ?? state.isInvalid;
  const delegatedToParent = !!onTriggerClick;
  const canOpenPicker = showPicker && !props.isDisabled && !props.isReadOnly;
  const usesSurfaceField = showPicker && (useSheetSurface || delegatedToParent);
  const pickerTitle = label ?? "Set time";
  const resolvedGranularity = props.granularity ?? "minute";
  const closePicker = () => setPickerOpen(false);
  const seedTime = react.useCallback(
    () => (state.timeValue ?? defaultTimeValue ?? nowAsTime(resolvedGranularity)).copy(),
    [state.timeValue, defaultTimeValue, resolvedGranularity]
  );
  const [surfaceDraftTime, setSurfaceDraftTime] = react.useState(seedTime);
  react.useEffect(() => {
    if (!pickerOpen) {
      return;
    }
    setSurfaceDraftTime(seedTime());
  }, [
    pickerOpen,
    seedTime,
    state.timeValue?.hour,
    state.timeValue?.minute,
    state.timeValue?.second,
    state.timeValue?.millisecond
  ]);
  const surfaceFooter = /* @__PURE__ */ jsxRuntime.jsx(
    PickerActionBar,
    {
      className: "vds-time-picker-actions",
      buttonSize: "md",
      onCancel: () => {
        setSurfaceDraftTime((state.timeValue ?? new date.Time()).copy());
        closePicker();
      },
      onApply: () => {
        state.setValue(surfaceDraftTime);
        closePicker();
      }
    }
  );
  const openOrDelegate = () => {
    if (delegatedToParent) {
      onTriggerClick?.();
    } else {
      setPickerOpen(true);
    }
  };
  const fieldGroup = /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ...fieldProps,
      ref: composeRefs(ref, localRef),
      className: "vds-time-field-group",
      "data-surface-trigger": usesSurfaceField ? "true" : void 0,
      onClick: (event) => {
        fieldProps.onClick?.(event);
        if (!canOpenPicker) {
          return;
        }
        if (usesSurfaceField || event.target === event.currentTarget) {
          openOrDelegate();
        }
      },
      children: [
        usesSurfaceField ? /* @__PURE__ */ jsxRuntime.jsx(StaticFieldSegments, { segments: state.segments, className: "vds-time-field-segments" }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-time-field-segments", children: state.segments.map((segment, index) => /* @__PURE__ */ jsxRuntime.jsx(TimeSegment, { segment, state }, index)) }),
        showPicker ? /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: "vds-time-field-picker-trigger",
            "aria-label": "Open time picker",
            "aria-haspopup": "dialog",
            "aria-expanded": delegatedToParent ? void 0 : pickerOpen,
            disabled: !canOpenPicker,
            onClick: (event) => {
              event.stopPropagation();
              openOrDelegate();
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(ClockIcon, {})
          }
        ) : null
      ]
    }
  );
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
      "data-picker": showPicker ? "true" : void 0,
      children: [
        label ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...labelProps, className: "vds-time-field-label", children: label }) : null,
        showPicker && !delegatedToParent && usePopoverSurface ? /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open: pickerOpen, onOpenChange: setPickerOpen, children: [
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { asChild: true, children: fieldGroup }),
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
            PopoverPrimitive__namespace.Content,
            {
              sideOffset: 8,
              align: "start",
              collisionPadding: 8,
              className: "vds-time-field-picker-content",
              onOpenAutoFocus: (event) => event.preventDefault(),
              children: /* @__PURE__ */ jsxRuntime.jsx(
                TimePickerPanel,
                {
                  state,
                  hourCycle: props.hourCycle,
                  granularity: resolvedGranularity,
                  showMilliseconds,
                  millisecondStep,
                  defaultTimeValue,
                  onClose: closePicker
                }
              )
            }
          ) })
        ] }) : fieldGroup,
        showPicker && !delegatedToParent && useSheetSurface ? /* @__PURE__ */ jsxRuntime.jsx(
          MobilePickerSurface,
          {
            open: pickerOpen,
            onOpenChange: setPickerOpen,
            title: pickerTitle,
            presentation: resolvedOverlayMode,
            sizeMode: mobileSizeMode,
            bodyClassName: "vds-time-picker-mobile-body",
            footer: surfaceFooter,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              TimePickerEditor,
              {
                value: surfaceDraftTime,
                onChange: setSurfaceDraftTime,
                hourCycle: props.hourCycle,
                granularity: resolvedGranularity,
                showMilliseconds,
                millisecondStep
              }
            )
          }
        ) : null,
        description ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...descriptionProps, className: "vds-time-field-description", children: description }) : null,
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            ...errorMessageProps,
            role: isInvalid && errorMessage ? "alert" : void 0,
            "aria-hidden": isInvalid && errorMessage ? void 0 : true,
            "data-visible": isInvalid && errorMessage ? "" : void 0,
            "data-empty": isInvalid && errorMessage ? void 0 : "",
            className: "vds-time-field-error",
            children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-time-field-error-body", children: errorMessage })
          }
        )
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
      children: padTimeSegmentText(segment)
    }
  );
}
function TimePickerPanel({
  state,
  hourCycle,
  granularity,
  showMilliseconds,
  millisecondStep,
  defaultTimeValue,
  onClose
}) {
  const sourceTime = state.timeValue ?? defaultTimeValue ?? nowAsTime(granularity);
  const [draftTime, setDraftTime] = react.useState(() => sourceTime.copy());
  react.useEffect(() => {
    setDraftTime(sourceTime.copy());
  }, [sourceTime.hour, sourceTime.minute, sourceTime.second, sourceTime.millisecond]);
  const commit = () => {
    state.setValue(draftTime);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-time-picker-panel", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      TimePickerEditor,
      {
        value: draftTime,
        onChange: setDraftTime,
        hourCycle,
        granularity,
        showMilliseconds,
        millisecondStep
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      PickerActionBar,
      {
        className: "vds-time-picker-actions",
        buttonSize: "md",
        onCancel: onClose,
        onApply: commit
      }
    )
  ] });
}
function TimePickerEditor({
  value,
  onChange,
  hourCycle,
  granularity,
  showMilliseconds,
  millisecondStep
}) {
  const resolvedHourCycle = hourCycle ?? 24;
  const hours = resolvedHourCycle === 12 ? range(1, 12) : range(0, 23);
  const minutes = range(0, 59);
  const seconds = range(0, 59);
  const milliseconds = react.useMemo(
    () => getMillisecondValues(value.millisecond, millisecondStep),
    [millisecondStep, value.millisecond]
  );
  const showMinute = granularity !== "hour" || showMilliseconds;
  const showSecond = granularity === "second" || showMilliseconds;
  const showPeriod = resolvedHourCycle === 12;
  const selectedHour = resolvedHourCycle === 12 ? to12Hour(value.hour) : value.hour;
  const selectedPeriod = value.hour >= 12 ? 1 : 0;
  const setNextValue = (fields) => {
    onChange(value.set(fields));
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-time-picker-wheels", role: "group", "aria-label": "Time picker", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      ScrollWheel,
      {
        label: "Hour",
        values: hours,
        value: selectedHour,
        formatValue: pad2,
        onChange: (nextValue) => {
          if (resolvedHourCycle === 12) {
            setNextValue({ hour: from12Hour(nextValue, selectedPeriod === 1) });
            return;
          }
          setNextValue({ hour: nextValue });
        }
      }
    ),
    showMinute ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(TimeColon, {}),
      /* @__PURE__ */ jsxRuntime.jsx(
        ScrollWheel,
        {
          label: "Minute",
          values: minutes,
          value: value.minute,
          formatValue: pad2,
          onChange: (nextValue) => setNextValue({ minute: nextValue })
        }
      )
    ] }) : null,
    showSecond ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(TimeColon, {}),
      /* @__PURE__ */ jsxRuntime.jsx(
        ScrollWheel,
        {
          label: "Second",
          values: seconds,
          value: value.second,
          formatValue: pad2,
          onChange: (nextValue) => setNextValue({ second: nextValue })
        }
      )
    ] }) : null,
    showMilliseconds ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(TimeColon, { variant: "dot" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        ScrollWheel,
        {
          label: "MS",
          values: milliseconds,
          value: nearestValue(milliseconds, value.millisecond),
          formatValue: (nextValue) => String(nextValue).padStart(3, "0"),
          onChange: (nextValue) => setNextValue({ millisecond: nextValue })
        }
      )
    ] }) : null,
    showPeriod ? /* @__PURE__ */ jsxRuntime.jsx(
      ScrollWheel,
      {
        label: "AM/PM",
        values: [0, 1],
        value: selectedPeriod,
        formatValue: (nextValue) => nextValue === 1 ? "PM" : "AM",
        variant: "period",
        onChange: (nextValue) => {
          const wantsPm = nextValue === 1;
          if (wantsPm === value.hour >= 12) {
            return;
          }
          setNextValue({ hour: from12Hour(selectedHour, wantsPm) });
        }
      }
    ) : null
  ] });
}
function TimeColon({ variant = "colon" }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-time-picker-colon", "data-variant": variant, "aria-hidden": "true", children: variant === "dot" ? "." : ":" });
}
function ClockIcon() {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "8", cy: "8", r: "5.5", stroke: "currentColor", strokeWidth: "1.25" }),
    /* @__PURE__ */ jsxRuntime.jsx(
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
function nowAsTime(granularity = "minute") {
  const now2 = /* @__PURE__ */ new Date();
  const hour = now2.getHours();
  const minute = granularity === "hour" ? 0 : now2.getMinutes();
  const second = granularity === "second" ? now2.getSeconds() : 0;
  return new date.Time(hour, minute, second);
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
  overlayMode = "auto",
  mobilePresentation = "drawer",
  mobileSizeMode = "content",
  defaultTimeValue,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const isMobile = useIsMobileViewport();
  const preferredOverlayMode = overlayMode === "auto" ? isMobile ? mobilePresentation : "popover" : overlayMode;
  const resolvedOverlayMode = !isMobile && preferredOverlayMode === "drawer" ? "dialog" : preferredOverlayMode;
  const usePopoverSurface = resolvedOverlayMode === "popover";
  const useSheetSurface = resolvedOverlayMode === "drawer" || resolvedOverlayMode === "dialog";
  const state = datepicker.useDatePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false
  });
  const [draftValue, setDraftValue] = react.useState(state.value);
  const [mobileView, setMobileView] = react.useState("date");
  const [calendarView, setCalendarView] = react.useState("days");
  const calendarApiRef = react.useRef(null);
  react.useEffect(() => {
    if (!state.isOpen) {
      setDraftValue(state.value);
      setMobileView("date");
      setCalendarView("days");
    }
  }, [state.isOpen, state.value]);
  react.useEffect(() => {
    if (state.isOpen) {
      setDraftValue(state.value);
      setMobileView("date");
      setCalendarView("days");
    }
  }, [state.isOpen]);
  const groupRef = react.useRef(null);
  const {
    labelProps,
    groupProps,
    fieldProps,
    buttonProps,
    descriptionProps,
    errorMessageProps
  } = datepicker$1.useDatePicker(
    { ...props, label, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef
  );
  const triggerButtonProps = toButtonProps(buttonProps);
  const fieldState = datepicker.useDateFieldState({
    ...fieldProps,
    locale: usedLocale,
    createCalendar
  });
  const fieldRef = react.useRef(null);
  const { fieldProps: innerFieldProps } = datepicker$1.useDateField(fieldProps, fieldState, fieldRef);
  const draftPickerState = datepicker.useDatePickerState({
    ...props,
    value: draftValue,
    onChange: setDraftValue,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false
  });
  const isInvalid = invalid ?? state.isInvalid;
  const isSplitLayout = state.hasTime && (size === "lg" || size === "xl" || size === "2xl");
  const triggerUsesReadonlyField = useSheetSurface;
  const timeGranularity = props.granularity === "day" ? "hour" : props.granularity ?? "hour";
  react.useEffect(() => {
    if (!state.isOpen || !state.hasTime) return;
    if (draftPickerState.timeValue != null) return;
    const seed = defaultTimeValue ?? nowAsTime(timeGranularity);
    draftPickerState.setTimeValue(seed);
  }, [state.isOpen, state.hasTime, draftPickerState, defaultTimeValue, timeGranularity]);
  const draftTimeValue = (draftPickerState.timeValue ?? defaultTimeValue ?? nowAsTime(timeGranularity)).copy();
  const renderedPresets = typeof presets === "function" ? presets({
    value: draftValue,
    setValue: setDraftValue
  }) : presets;
  const applyDisabled = state.hasTime ? draftPickerState.value == null : draftPickerState.dateValue == null;
  const commitAndClose = () => {
    state.setValue(draftPickerState.value);
    state.setOpen(false);
  };
  const resetAndClose = () => {
    setDraftValue(state.value);
    state.setOpen(false);
  };
  const buttonSize = size === "2xs" || size === "xs" ? "sm" : "md";
  const actionBarByCalendarView = () => {
    if (calendarView === "months") {
      return /* @__PURE__ */ jsxRuntime.jsx(
        PickerActionBar,
        {
          className: "vds-date-picker-actions",
          buttonSize,
          cancelLabel: "Cancel",
          applyLabel: "Change Month",
          onCancel: () => calendarApiRef.current?.cancelDraft(),
          onApply: () => calendarApiRef.current?.applyMonthDraft()
        }
      );
    }
    if (calendarView === "years") {
      return /* @__PURE__ */ jsxRuntime.jsx(
        PickerActionBar,
        {
          className: "vds-date-picker-actions",
          buttonSize,
          cancelLabel: "Cancel",
          applyLabel: "Change Year",
          onCancel: () => calendarApiRef.current?.cancelDraft(),
          onApply: () => calendarApiRef.current?.applyYearDraft()
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      PickerActionBar,
      {
        className: "vds-date-picker-actions",
        buttonSize,
        applyDisabled,
        onCancel: resetAndClose,
        onApply: commitAndClose
      }
    );
  };
  const actionBarDateView = actionBarByCalendarView();
  const hasDateSelected = draftPickerState.dateValue != null;
  const actionBarTimeView = /* @__PURE__ */ jsxRuntime.jsx(
    PickerActionBar,
    {
      className: "vds-date-picker-actions",
      buttonSize,
      cancelLabel: "Cancel",
      applyLabel: "Set Time",
      onCancel: resetAndClose,
      onApply: () => {
        if (hasDateSelected) {
          commitAndClose();
        } else {
          setMobileView("date");
        }
      }
    }
  );
  const overlayBody = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-picker-overlay", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-picker-content-inner", children: [
      renderedPresets ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-picker-presets", children: renderedPresets }) : null,
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: "vds-date-picker-main",
          "data-layout": isSplitLayout ? "split" : "stack",
          "data-has-time": state.hasTime ? "true" : void 0,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              Calendar,
              {
                value: draftPickerState.dateValue ?? null,
                onChange: draftPickerState.setDateValue,
                minValue: props.minValue ?? null,
                maxValue: props.maxValue ?? null,
                isDateUnavailable: props.isDateUnavailable,
                isDisabled: props.isDisabled,
                isReadOnly: props.isReadOnly,
                autoFocus: !isMobile,
                "aria-label": props["aria-label"] ?? "Calendar",
                size,
                appearance,
                invalid: isInvalid,
                locale: usedLocale,
                apiRef: calendarApiRef,
                onViewChange: setCalendarView,
                hideInternalActions: true
              }
            ),
            state.hasTime ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-picker-time", "data-embedded": "true", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-date-picker-time-label", children: "Time" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                TimeField,
                {
                  value: draftPickerState.timeValue ?? null,
                  onChange: (value) => {
                    if (value) {
                      draftPickerState.setTimeValue(value);
                    }
                  },
                  granularity: timeGranularity,
                  hourCycle: props.hourCycle,
                  hideTimeZone: props.hideTimeZone,
                  showPicker: props.showTimePicker ?? true,
                  showMilliseconds: props.showMilliseconds,
                  millisecondStep: props.millisecondStep,
                  defaultTimeValue,
                  overlayMode: "popover",
                  size,
                  appearance,
                  "aria-label": "Time"
                }
              )
            ] }) : null,
            footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-picker-footer", children: footer }) : null
          ]
        }
      )
    ] }),
    actionBarDateView
  ] });
  const pickerGroup = /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ...groupProps,
      ref: groupRef,
      className: "vds-date-picker-group",
      "data-surface-trigger": triggerUsesReadonlyField ? "true" : void 0,
      onClick: () => {
        if (triggerUsesReadonlyField && !props.isDisabled && !props.isReadOnly) {
          state.setOpen(true);
        }
      },
      children: [
        triggerUsesReadonlyField ? /* @__PURE__ */ jsxRuntime.jsx(StaticFieldSegments, { segments: fieldState.segments, className: "vds-date-picker-field" }) : /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            ...innerFieldProps,
            ref: fieldRef,
            className: "vds-date-picker-field",
            children: fieldState.segments.map((segment, index) => /* @__PURE__ */ jsxRuntime.jsx(FieldSegment, { segment, state: fieldState }, index))
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            ...triggerButtonProps,
            type: "button",
            className: "vds-date-picker-trigger",
            "aria-label": triggerButtonProps["aria-label"] ?? "Open calendar",
            children: /* @__PURE__ */ jsxRuntime.jsx(CalendarIcon, {})
          }
        )
      ]
    }
  );
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
        usePopoverSurface ? /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open: state.isOpen, onOpenChange: state.setOpen, children: [
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { asChild: true, children: pickerGroup }),
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
            PopoverPrimitive__namespace.Content,
            {
              sideOffset: 6,
              align: "start",
              collisionPadding: 8,
              className: "vds-date-picker-content",
              onOpenAutoFocus: (event) => event.preventDefault(),
              children: overlayBody
            }
          ) })
        ] }) : pickerGroup,
        useSheetSurface ? /* @__PURE__ */ jsxRuntime.jsx(
          MobilePickerSurface,
          {
            open: state.isOpen,
            onOpenChange: (open) => {
              if (!open) {
                setDraftValue(state.value);
                setMobileView("date");
              }
              state.setOpen(open);
            },
            title: mobileView === "time" ? "Select time" : label ?? "Select date",
            presentation: resolvedOverlayMode,
            sizeMode: mobileSizeMode,
            dialogSize: mobileView === "time" ? "sm" : "md",
            bodyClassName: "vds-date-picker-mobile-body",
            footer: mobileView === "time" ? actionBarTimeView : actionBarDateView,
            children: mobileView === "time" ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-picker-mobile-panel vds-date-picker-mobile-time-panel", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-time-picker-panel vds-time-picker-panel--embedded", children: /* @__PURE__ */ jsxRuntime.jsx(
              TimePickerEditor,
              {
                value: draftTimeValue,
                onChange: (value) => draftPickerState.setTimeValue(value),
                hourCycle: props.hourCycle,
                granularity: timeGranularity,
                showMilliseconds: props.showMilliseconds,
                millisecondStep: props.millisecondStep ?? 10
              }
            ) }) }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-picker-mobile-panel", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-picker-content-inner", children: [
              renderedPresets ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-picker-presets", children: renderedPresets }) : null,
              /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: "vds-date-picker-main",
                  "data-layout": "stack",
                  "data-has-time": state.hasTime ? "true" : void 0,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      Calendar,
                      {
                        value: draftPickerState.dateValue ?? null,
                        onChange: draftPickerState.setDateValue,
                        minValue: props.minValue ?? null,
                        maxValue: props.maxValue ?? null,
                        isDateUnavailable: props.isDateUnavailable,
                        isDisabled: props.isDisabled,
                        isReadOnly: props.isReadOnly,
                        "aria-label": props["aria-label"] ?? "Calendar",
                        size,
                        appearance,
                        invalid: isInvalid,
                        locale: usedLocale,
                        apiRef: calendarApiRef,
                        onViewChange: setCalendarView,
                        hideInternalActions: true
                      }
                    ),
                    state.hasTime ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-picker-time", "data-embedded": "true", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-date-picker-time-label", children: "Time" }),
                      /* @__PURE__ */ jsxRuntime.jsx(
                        TimeField,
                        {
                          value: draftPickerState.timeValue ?? draftTimeValue,
                          granularity: timeGranularity,
                          hourCycle: props.hourCycle,
                          hideTimeZone: props.hideTimeZone,
                          showPicker: true,
                          showMilliseconds: props.showMilliseconds,
                          millisecondStep: props.millisecondStep,
                          defaultTimeValue,
                          onTriggerClick: () => setMobileView("time"),
                          size,
                          appearance,
                          "aria-label": "Time"
                        }
                      )
                    ] }) : null,
                    footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-picker-footer", children: footer }) : null
                  ]
                }
              )
            ] }) })
          }
        ) : null,
        description ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...descriptionProps, className: "vds-date-picker-description", children: description }) : null,
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            ...errorMessageProps,
            role: isInvalid && errorMessage ? "alert" : void 0,
            "aria-hidden": isInvalid && errorMessage ? void 0 : true,
            "data-visible": isInvalid && errorMessage ? "" : void 0,
            "data-empty": isInvalid && errorMessage ? void 0 : "",
            className: "vds-date-picker-error",
            children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-date-picker-error-body", children: errorMessage })
          }
        )
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
  overlayMode = "auto",
  mobilePresentation = "drawer",
  mobileSizeMode = "full",
  defaultTimeValue,
  ref,
  ...props
}) {
  const { locale: detectedLocale, direction } = i18n.useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const isMobile = useIsMobileViewport();
  const preferredOverlayMode = overlayMode === "auto" ? isMobile ? mobilePresentation : "popover" : overlayMode;
  const resolvedOverlayMode = !isMobile && preferredOverlayMode === "drawer" ? "dialog" : preferredOverlayMode;
  const usePopoverSurface = resolvedOverlayMode === "popover";
  const useSheetSurface = resolvedOverlayMode === "drawer" || resolvedOverlayMode === "dialog";
  const effectiveSizeMode = !isMobile && resolvedOverlayMode === "dialog" ? "content" : mobileSizeMode;
  const state = datepicker.useDateRangePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false
  });
  const [draftRange, setDraftRange] = react.useState(toCompleteRange(state.value));
  const [mobileView, setMobileView] = react.useState("date");
  const [calendarView, setCalendarView] = react.useState("days");
  const calendarApiRef = react.useRef(null);
  react.useEffect(() => {
    if (!state.isOpen) {
      setDraftRange(toCompleteRange(state.value));
      setMobileView("date");
      setCalendarView("days");
    }
  }, [state.isOpen, state.value]);
  react.useEffect(() => {
    if (state.isOpen) {
      setDraftRange(toCompleteRange(state.value));
      setMobileView("date");
      setCalendarView("days");
    }
  }, [state.isOpen]);
  const groupRef = react.useRef(null);
  const {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    descriptionProps,
    errorMessageProps
  } = datepicker$1.useDateRangePicker(
    { ...props, label, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef
  );
  const triggerButtonProps = toButtonProps(buttonProps);
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
  const draftState = datepicker.useDateRangePickerState({
    ...props,
    value: draftRange,
    onChange: setDraftRange,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false
  });
  const isInvalid = invalid ?? state.isInvalid;
  const isSplitLayout = state.hasTime && (size === "lg" || size === "xl" || size === "2xl");
  const triggerUsesReadonlyField = useSheetSurface;
  const timeGranularity = props.granularity === "day" ? "hour" : props.granularity ?? "hour";
  react.useEffect(() => {
    if (!state.isOpen || !state.hasTime) return;
    const seed = defaultTimeValue ?? nowAsTime(timeGranularity);
    if (draftState.timeRange?.start == null) {
      draftState.setTime("start", seed);
    }
    if (draftState.timeRange?.end == null) {
      draftState.setTime("end", seed);
    }
  }, [state.isOpen, state.hasTime, draftState, defaultTimeValue, timeGranularity]);
  const fallbackTime = () => defaultTimeValue ?? nowAsTime(timeGranularity);
  const draftStartTime = (draftState.timeRange?.start ?? fallbackTime()).copy();
  const draftEndTime = (draftState.timeRange?.end ?? fallbackTime()).copy();
  const renderedPresets = typeof presets === "function" ? presets({
    value: draftRange,
    setValue: setDraftRange
  }) : presets;
  const applyDisabled = state.hasTime ? !(draftState.value?.start && draftState.value?.end) : !(draftState.dateRange?.start && draftState.dateRange?.end);
  const commitAndClose = () => {
    state.setValue(toCompleteRange(draftState.value));
    state.setOpen(false);
  };
  const resetAndClose = () => {
    setDraftRange(toCompleteRange(state.value));
    state.setOpen(false);
  };
  const buttonSize = size === "2xs" || size === "xs" ? "sm" : "md";
  const actionBarByCalendarView = () => {
    if (calendarView === "months") {
      return /* @__PURE__ */ jsxRuntime.jsx(
        PickerActionBar,
        {
          className: "vds-date-range-picker-actions",
          buttonSize,
          cancelLabel: "Cancel",
          applyLabel: "Change Month",
          onCancel: () => calendarApiRef.current?.cancelDraft(),
          onApply: () => calendarApiRef.current?.applyMonthDraft()
        }
      );
    }
    if (calendarView === "years") {
      return /* @__PURE__ */ jsxRuntime.jsx(
        PickerActionBar,
        {
          className: "vds-date-range-picker-actions",
          buttonSize,
          cancelLabel: "Cancel",
          applyLabel: "Change Year",
          onCancel: () => calendarApiRef.current?.cancelDraft(),
          onApply: () => calendarApiRef.current?.applyYearDraft()
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      PickerActionBar,
      {
        className: "vds-date-range-picker-actions",
        buttonSize,
        applyDisabled,
        onCancel: resetAndClose,
        onApply: commitAndClose
      }
    );
  };
  const actionBarDateView = actionBarByCalendarView();
  const hasRangeSelected = Boolean(
    draftState.dateRange?.start && draftState.dateRange?.end
  );
  const actionBarTimeView = /* @__PURE__ */ jsxRuntime.jsx(
    PickerActionBar,
    {
      className: "vds-date-range-picker-actions",
      buttonSize,
      cancelLabel: "Cancel",
      applyLabel: "Set Time",
      onCancel: resetAndClose,
      onApply: () => {
        if (hasRangeSelected) {
          commitAndClose();
        } else {
          setMobileView("date");
        }
      }
    }
  );
  const rangeCalendar = /* @__PURE__ */ jsxRuntime.jsx(
    RangeCalendar,
    {
      value: toCompleteRange(draftState.dateRange),
      onChange: draftState.setDateRange,
      minValue: props.minValue ?? null,
      maxValue: props.maxValue ?? null,
      isDateUnavailable: props.isDateUnavailable,
      isDisabled: props.isDisabled,
      isReadOnly: props.isReadOnly,
      allowsNonContiguousRanges: props.allowsNonContiguousRanges,
      autoFocus: !isMobile,
      "aria-label": props["aria-label"] ?? "Date range calendar",
      visibleDuration: isMobile ? { months: 1 } : { months: 2 },
      pageBehavior: "single",
      size,
      appearance,
      invalid: isInvalid,
      locale: usedLocale,
      apiRef: calendarApiRef,
      onViewChange: setCalendarView,
      hideInternalActions: true
    }
  );
  const overlayBody = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-range-picker-overlay", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-range-picker-content-inner", children: [
      renderedPresets ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-range-picker-presets", children: renderedPresets }) : null,
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: "vds-date-range-picker-main",
          "data-layout": isSplitLayout ? "split" : "stack",
          "data-has-time": state.hasTime ? "true" : void 0,
          children: [
            rangeCalendar,
            state.hasTime ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-range-picker-time", "data-embedded": "true", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                TimeField,
                {
                  value: draftState.timeRange?.start ?? null,
                  onChange: (value) => {
                    if (value) {
                      draftState.setTime("start", value);
                    }
                  },
                  granularity: timeGranularity,
                  hourCycle: props.hourCycle,
                  hideTimeZone: props.hideTimeZone,
                  showPicker: props.showTimePicker ?? true,
                  overlayMode: "popover",
                  showMilliseconds: props.showMilliseconds,
                  millisecondStep: props.millisecondStep,
                  defaultTimeValue,
                  size,
                  appearance,
                  label: "Start time",
                  "aria-label": "Start time"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                TimeField,
                {
                  value: draftState.timeRange?.end ?? null,
                  onChange: (value) => {
                    if (value) {
                      draftState.setTime("end", value);
                    }
                  },
                  granularity: timeGranularity,
                  hourCycle: props.hourCycle,
                  hideTimeZone: props.hideTimeZone,
                  showPicker: props.showTimePicker ?? true,
                  overlayMode: "popover",
                  showMilliseconds: props.showMilliseconds,
                  millisecondStep: props.millisecondStep,
                  defaultTimeValue,
                  size,
                  appearance,
                  label: "End time",
                  "aria-label": "End time"
                }
              )
            ] }) : null,
            footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-range-picker-footer", children: footer }) : null
          ]
        }
      )
    ] }),
    actionBarDateView
  ] });
  const pickerGroup = /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ...groupProps,
      ref: groupRef,
      className: "vds-date-range-picker-group",
      "data-surface-trigger": triggerUsesReadonlyField ? "true" : void 0,
      onClick: () => {
        if (triggerUsesReadonlyField && !props.isDisabled && !props.isReadOnly) {
          state.setOpen(true);
        }
      },
      children: [
        triggerUsesReadonlyField ? /* @__PURE__ */ jsxRuntime.jsx(StaticFieldSegments, { segments: startFieldState.segments, className: "vds-date-range-picker-field" }) : /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            ...innerStartFieldProps,
            ref: startFieldRef,
            className: "vds-date-range-picker-field",
            children: startFieldState.segments.map((segment, index) => /* @__PURE__ */ jsxRuntime.jsx(FieldSegment, { segment, state: startFieldState }, index))
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-date-range-picker-separator", "aria-hidden": "true", children: "-" }),
        triggerUsesReadonlyField ? /* @__PURE__ */ jsxRuntime.jsx(StaticFieldSegments, { segments: endFieldState.segments, className: "vds-date-range-picker-field" }) : /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            ...innerEndFieldProps,
            ref: endFieldRef,
            className: "vds-date-range-picker-field",
            children: endFieldState.segments.map((segment, index) => /* @__PURE__ */ jsxRuntime.jsx(FieldSegment, { segment, state: endFieldState }, index))
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            ...triggerButtonProps,
            type: "button",
            className: "vds-date-range-picker-trigger",
            "aria-label": triggerButtonProps["aria-label"] ?? "Open calendar",
            children: /* @__PURE__ */ jsxRuntime.jsx(CalendarIcon2, {})
          }
        )
      ]
    }
  );
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
        usePopoverSurface ? /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open: state.isOpen, onOpenChange: state.setOpen, children: [
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { asChild: true, children: pickerGroup }),
          /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
            PopoverPrimitive__namespace.Content,
            {
              sideOffset: 6,
              align: "start",
              collisionPadding: 8,
              className: "vds-date-range-picker-content",
              onOpenAutoFocus: (event) => event.preventDefault(),
              children: overlayBody
            }
          ) })
        ] }) : pickerGroup,
        useSheetSurface ? /* @__PURE__ */ jsxRuntime.jsx(
          MobilePickerSurface,
          {
            open: state.isOpen,
            onOpenChange: (open) => {
              if (!open) {
                setDraftRange(toCompleteRange(state.value));
                setMobileView("date");
              }
              state.setOpen(open);
            },
            title: mobileView === "start-time" ? "Start time" : mobileView === "end-time" ? "End time" : label ?? "Select range",
            presentation: resolvedOverlayMode,
            sizeMode: effectiveSizeMode,
            dialogSize: mobileView === "date" ? "lg" : "sm",
            bodyClassName: "vds-date-range-picker-mobile-body",
            footer: mobileView !== "date" ? actionBarTimeView : actionBarDateView,
            children: mobileView === "start-time" || mobileView === "end-time" ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-range-picker-mobile-panel vds-date-range-picker-mobile-time-panel", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-time-picker-panel vds-time-picker-panel--embedded", children: /* @__PURE__ */ jsxRuntime.jsx(
              TimePickerEditor,
              {
                value: mobileView === "start-time" ? draftStartTime : draftEndTime,
                onChange: (value) => draftState.setTime(mobileView === "start-time" ? "start" : "end", value),
                hourCycle: props.hourCycle,
                granularity: timeGranularity,
                showMilliseconds: props.showMilliseconds,
                millisecondStep: props.millisecondStep ?? 10
              }
            ) }) }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-range-picker-mobile-panel", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-date-range-picker-content-inner", children: [
              renderedPresets ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-range-picker-presets", children: renderedPresets }) : null,
              /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: "vds-date-range-picker-main",
                  "data-layout": "stack",
                  "data-has-time": state.hasTime ? "true" : void 0,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      RangeCalendar,
                      {
                        value: toCompleteRange(draftState.dateRange),
                        onChange: draftState.setDateRange,
                        minValue: props.minValue ?? null,
                        maxValue: props.maxValue ?? null,
                        isDateUnavailable: props.isDateUnavailable,
                        isDisabled: props.isDisabled,
                        isReadOnly: props.isReadOnly,
                        allowsNonContiguousRanges: props.allowsNonContiguousRanges,
                        "aria-label": props["aria-label"] ?? "Date range calendar",
                        visibleDuration: { months: 2 },
                        pageBehavior: "single",
                        size,
                        appearance,
                        invalid: isInvalid,
                        locale: usedLocale,
                        className: "vds-date-range-picker-mobile-calendar",
                        apiRef: calendarApiRef,
                        onViewChange: setCalendarView,
                        hideInternalActions: true
                      }
                    ),
                    state.hasTime ? /* @__PURE__ */ jsxRuntime.jsxs(
                      "div",
                      {
                        className: "vds-date-range-picker-time",
                        "data-embedded": "true",
                        "data-mobile-time-links": "true",
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(
                            TimeField,
                            {
                              value: draftState.timeRange?.start ?? draftStartTime,
                              granularity: timeGranularity,
                              hourCycle: props.hourCycle,
                              hideTimeZone: props.hideTimeZone,
                              showPicker: true,
                              showMilliseconds: props.showMilliseconds,
                              millisecondStep: props.millisecondStep,
                              defaultTimeValue,
                              onTriggerClick: () => setMobileView("start-time"),
                              size,
                              appearance,
                              label: "Start time",
                              "aria-label": "Start time"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntime.jsx(
                            TimeField,
                            {
                              value: draftState.timeRange?.end ?? draftEndTime,
                              granularity: timeGranularity,
                              hourCycle: props.hourCycle,
                              hideTimeZone: props.hideTimeZone,
                              showPicker: true,
                              showMilliseconds: props.showMilliseconds,
                              millisecondStep: props.millisecondStep,
                              defaultTimeValue,
                              onTriggerClick: () => setMobileView("end-time"),
                              size,
                              appearance,
                              label: "End time",
                              "aria-label": "End time"
                            }
                          )
                        ]
                      }
                    ) : null,
                    footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-date-range-picker-footer", children: footer }) : null
                  ]
                }
              )
            ] }) })
          }
        ) : null,
        description ? /* @__PURE__ */ jsxRuntime.jsx("span", { ...descriptionProps, className: "vds-date-range-picker-description", children: description }) : null,
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            ...errorMessageProps,
            role: isInvalid && errorMessage ? "alert" : void 0,
            "aria-hidden": isInvalid && errorMessage ? void 0 : true,
            "data-visible": isInvalid && errorMessage ? "" : void 0,
            "data-empty": isInvalid && errorMessage ? void 0 : "",
            className: "vds-date-range-picker-error",
            children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-date-range-picker-error-body", children: errorMessage })
          }
        )
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
function toCompleteRange(value) {
  if (!value?.start || !value.end) {
    return null;
  }
  return {
    start: value.start,
    end: value.end
  };
}
function DatePickerPresets({
  presets,
  value,
  onSelect,
  label = "Quick select",
  className,
  ref
}) {
  const selectedId = presets.find(
    (preset) => value ? sameDay(value, preset.value) : false
  )?.id;
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactRadioGroup.RadioGroup,
    {
      ref,
      label,
      className: utils.cn("vds-date-picker-presets-list", className),
      value: selectedId,
      onValueChange: (nextId) => {
        const preset = presets.find((item) => item.id === nextId);
        if (preset) onSelect(preset.value);
      },
      children: presets.map((preset) => /* @__PURE__ */ jsxRuntime.jsx(
        reactRadioGroup.RadioField,
        {
          value: preset.id,
          label: preset.label,
          description: preset.description
        },
        preset.id
      ))
    }
  );
}
function DateRangePickerPresets({
  presets,
  value,
  onSelect,
  label = "Quick select",
  className,
  ref
}) {
  const selectedId = presets.find(
    (preset) => value ? sameDay(value.start, preset.value.start) && sameDay(value.end, preset.value.end) : false
  )?.id;
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactRadioGroup.RadioGroup,
    {
      ref,
      label,
      className: utils.cn("vds-date-picker-presets-list", className),
      value: selectedId,
      onValueChange: (nextId) => {
        const preset = presets.find((item) => item.id === nextId);
        if (preset) onSelect(preset.value);
      },
      children: presets.map((preset) => /* @__PURE__ */ jsxRuntime.jsx(
        reactRadioGroup.RadioField,
        {
          value: preset.id,
          label: preset.label,
          description: preset.description
        },
        preset.id
      ))
    }
  );
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
