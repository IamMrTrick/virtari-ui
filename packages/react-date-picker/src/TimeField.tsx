import { cn } from "@virtari/utils";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type Ref,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { useTimeField, useDateSegment } from "@react-aria/datepicker";
import {
  useTimeFieldState,
  type DateSegment,
  type TimeFieldState,
  type TimeValue,
} from "@react-stately/datepicker";
import { useLocale } from "@react-aria/i18n";
import { Time } from "@internationalized/date";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { DatePickerAppearance, DatePickerSize } from "./context";
import { StaticFieldSegments } from "./DateField";
import {
  MobilePickerSurface,
  type MobilePickerPresentation,
  type MobilePickerSizeMode,
  type PickerOverlayMode,
  PickerActionBar,
  useIsMobileViewport,
} from "./picker-overlay";

export interface TimeFieldProps {
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
  overlayMode?: PickerOverlayMode;
  mobilePresentation?: MobilePickerPresentation;
  mobileSizeMode?: MobilePickerSizeMode;

  ref?: Ref<HTMLDivElement>;
}

export interface TimePickerEditorProps {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  hourCycle?: 12 | 24;
  granularity: "hour" | "minute" | "second";
  showMilliseconds?: boolean;
  millisecondStep: number;
}

export function TimeField({
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
  overlayMode = "auto",
  mobilePresentation = "drawer",
  mobileSizeMode = "content",
  ref,
  ...props
}: TimeFieldProps) {
  const { locale: detectedLocale, direction } = useLocale();
  const isMobile = useIsMobileViewport();
  const resolvedOverlayMode = overlayMode === "auto"
    ? (isMobile ? mobilePresentation : "popover")
    : overlayMode;
  const usePopoverSurface = resolvedOverlayMode === "popover";
  const useSheetSurface = resolvedOverlayMode === "drawer" || resolvedOverlayMode === "dialog";
  const [pickerOpen, setPickerOpen] = useState(false);
  const state = useTimeFieldState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    locale: locale ?? detectedLocale,
  });
  const localRef = useRef<HTMLDivElement>(null);
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useTimeField(
    { ...props, label, isInvalid: invalid ?? props.isInvalid },
    state,
    localRef,
  );

  const isInvalid = invalid ?? state.isInvalid;
  const canOpenPicker = showPicker && !props.isDisabled && !props.isReadOnly;
  const usesSurfaceField = showPicker && useSheetSurface;
  const pickerTitle = label ?? "Set time";
  const resolvedGranularity = props.granularity ?? "minute";
  const closePicker = () => setPickerOpen(false);
  const [surfaceDraftTime, setSurfaceDraftTime] = useState<TimeValue>(
    () => ((state.timeValue ?? new Time()).copy() as TimeValue),
  );

  useEffect(() => {
    if (!pickerOpen) {
      return;
    }
    setSurfaceDraftTime((state.timeValue ?? new Time()).copy() as TimeValue);
  }, [
    pickerOpen,
    state.timeValue?.hour,
    state.timeValue?.minute,
    state.timeValue?.second,
    state.timeValue?.millisecond,
  ]);

  const surfaceFooter = (
    <PickerActionBar
      className="vds-time-picker-actions"
      buttonSize="md"
      onCancel={() => {
        setSurfaceDraftTime((state.timeValue ?? new Time()).copy() as TimeValue);
        closePicker();
      }}
      onApply={() => {
        (state.setValue as (nextValue: TimeValue | null) => void)(surfaceDraftTime);
        closePicker();
      }}
    />
  );

  const fieldGroup = (
    <div
      {...fieldProps}
      ref={composeRefs(ref, localRef)}
      className="vds-time-field-group"
      data-surface-trigger={usesSurfaceField ? "true" : undefined}
      onClick={(event) => {
        fieldProps.onClick?.(event);
        if (!canOpenPicker) {
          return;
        }

        if (usesSurfaceField || event.target === event.currentTarget) {
          setPickerOpen(true);
        }
      }}
    >
      {usesSurfaceField ? (
        <StaticFieldSegments segments={state.segments} className="vds-time-field-segments" />
      ) : (
        <div className="vds-time-field-segments">
          {state.segments.map((segment, index) => (
            <TimeSegment key={index} segment={segment} state={state} />
          ))}
        </div>
      )}
      {showPicker ? (
        <button
          type="button"
          className="vds-time-field-picker-trigger"
          aria-label="Open time picker"
          aria-haspopup="dialog"
          aria-expanded={pickerOpen}
          disabled={!canOpenPicker}
          onClick={(event) => {
            event.stopPropagation();
            setPickerOpen(true);
          }}
        >
          <ClockIcon />
        </button>
      ) : null}
    </div>
  );

  return (
    <div
      className={cn("vds-time-field", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={isInvalid ? "true" : undefined}
      data-disabled={props.isDisabled ? "true" : undefined}
      data-readonly={props.isReadOnly ? "true" : undefined}
      data-dir={direction}
      data-picker={showPicker ? "true" : undefined}
    >
      {label ? (
        <span {...labelProps} className="vds-time-field-label">
          {label}
        </span>
      ) : null}

      {showPicker && usePopoverSurface ? (
        <PopoverPrimitive.Root open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverPrimitive.Anchor asChild>{fieldGroup}</PopoverPrimitive.Anchor>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              sideOffset={8}
              align="start"
              collisionPadding={8}
              className="vds-time-field-picker-content"
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              <TimePickerPanel
                state={state}
                hourCycle={props.hourCycle}
                granularity={resolvedGranularity}
                showMilliseconds={showMilliseconds}
                millisecondStep={millisecondStep}
                onClose={closePicker}
              />
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      ) : (
        fieldGroup
      )}

      {showPicker && useSheetSurface ? (
        <MobilePickerSurface
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          title={pickerTitle}
          presentation={resolvedOverlayMode}
          sizeMode={mobileSizeMode}
          bodyClassName="vds-time-picker-mobile-body"
          footer={surfaceFooter}
        >
          <TimePickerEditor
            value={surfaceDraftTime}
            onChange={setSurfaceDraftTime}
            hourCycle={props.hourCycle}
            granularity={resolvedGranularity}
            showMilliseconds={showMilliseconds}
            millisecondStep={millisecondStep}
          />
        </MobilePickerSurface>
      ) : null}

      {description ? (
        <span {...descriptionProps} className="vds-time-field-description">
          {description}
        </span>
      ) : null}
      {isInvalid && errorMessage ? (
        <span {...errorMessageProps} className="vds-time-field-error">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

interface TimeSegmentProps {
  segment: DateSegment;
  state: TimeFieldState;
}

function TimeSegment({ segment, state }: TimeSegmentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);
  return (
    <div
      {...segmentProps}
      ref={ref}
      className="vds-time-field-segment"
      data-type={segment.type}
      data-placeholder={segment.isPlaceholder ? "true" : undefined}
    >
      {segment.text}
    </div>
  );
}

interface TimePickerPanelProps {
  state: TimeFieldState;
  hourCycle?: 12 | 24;
  granularity: "hour" | "minute" | "second";
  showMilliseconds?: boolean;
  millisecondStep: number;
  onClose: () => void;
}

function TimePickerPanel({
  state,
  hourCycle,
  granularity,
  showMilliseconds,
  millisecondStep,
  onClose,
}: TimePickerPanelProps) {
  const sourceTime = state.timeValue ?? new Time();
  const [draftTime, setDraftTime] = useState<TimeValue>(() => sourceTime.copy());

  useEffect(() => {
    setDraftTime(sourceTime.copy());
  }, [sourceTime.hour, sourceTime.minute, sourceTime.second, sourceTime.millisecond]);

  const commit = () => {
    (state.setValue as (value: TimeValue | null) => void)(draftTime);
    onClose();
  };

  return (
    <div className="vds-time-picker-panel">
      <TimePickerEditor
        value={draftTime}
        onChange={setDraftTime}
        hourCycle={hourCycle}
        granularity={granularity}
        showMilliseconds={showMilliseconds}
        millisecondStep={millisecondStep}
      />
      <PickerActionBar
        className="vds-time-picker-actions"
        buttonSize="md"
        onCancel={onClose}
        onApply={commit}
      />
    </div>
  );
}

export function TimePickerEditor({
  value,
  onChange,
  hourCycle,
  granularity,
  showMilliseconds,
  millisecondStep,
}: TimePickerEditorProps) {
  const resolvedHourCycle = hourCycle ?? 24;
  const hours = resolvedHourCycle === 12 ? range(1, 12) : range(0, 23);
  const minutes = range(0, 59);
  const seconds = range(0, 59);
  const milliseconds = useMemo(
    () => getMillisecondValues(value.millisecond, millisecondStep),
    [millisecondStep, value.millisecond],
  );
  const showMinute = granularity !== "hour" || showMilliseconds;
  const showSecond = granularity === "second" || showMilliseconds;
  const showPeriod = resolvedHourCycle === 12;
  const selectedHour = resolvedHourCycle === 12 ? to12Hour(value.hour) : value.hour;
  const selectedPeriod = value.hour >= 12 ? 1 : 0;
  const setNextValue = (
    fields: Partial<Pick<Time, "hour" | "minute" | "second" | "millisecond">>,
  ) => {
    onChange(value.set(fields) as TimeValue);
  };

  return (
    <div className="vds-time-picker-wheels" role="group" aria-label="Time picker">
      <TimeWheel
        label="Hour"
        values={hours}
        value={selectedHour}
        formatValue={pad2}
        onChange={(nextValue) => {
          if (resolvedHourCycle === 12) {
            setNextValue({ hour: from12Hour(nextValue, selectedPeriod === 1) });
            return;
          }
          setNextValue({ hour: nextValue });
        }}
      />
      {showMinute ? (
        <>
          <TimeColon />
          <TimeWheel
            label="Minute"
            values={minutes}
            value={value.minute}
            formatValue={pad2}
            onChange={(nextValue) => setNextValue({ minute: nextValue })}
          />
        </>
      ) : null}
      {showSecond ? (
        <>
          <TimeColon />
          <TimeWheel
            label="Second"
            values={seconds}
            value={value.second}
            formatValue={pad2}
            onChange={(nextValue) => setNextValue({ second: nextValue })}
          />
        </>
      ) : null}
      {showMilliseconds ? (
        <>
          <TimeColon variant="dot" />
          <TimeWheel
            label="Millisecond"
            values={milliseconds}
            value={nearestValue(milliseconds, value.millisecond)}
            formatValue={(nextValue) => String(nextValue).padStart(3, "0")}
            onChange={(nextValue) => setNextValue({ millisecond: nextValue })}
          />
        </>
      ) : null}
      {showPeriod ? (
        <TimeWheel
          label="AM/PM"
          values={[0, 1]}
          value={selectedPeriod}
          formatValue={(nextValue) => (nextValue === 1 ? "PM" : "AM")}
          variant="period"
          onChange={(nextValue) => {
            const wantsPm = nextValue === 1;
            if (wantsPm === (value.hour >= 12)) {
              return;
            }
            setNextValue({ hour: from12Hour(selectedHour, wantsPm) });
          }}
        />
      ) : null}
    </div>
  );
}

interface TimeWheelProps {
  label: string;
  values: number[];
  value: number;
  formatValue: (value: number) => string;
  onChange: (value: number) => void;
  variant?: "number" | "period";
}

function TimeColon({ variant = "colon" }: { variant?: "colon" | "dot" }) {
  return (
    <div className="vds-time-picker-colon" data-variant={variant} aria-hidden="true">
      {variant === "dot" ? "." : ":"}
    </div>
  );
}

function TimeWheel({
  label,
  values,
  value,
  formatValue,
  onChange,
  variant = "number",
}: TimeWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<number, HTMLButtonElement>());
  const scrollTimerRef = useRef<number | null>(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const [activeValue, setActiveValue] = useState(value);
  const [dragging, setDragging] = useState(false);
  const dragStateRef = useRef({
    active: false,
    pointerId: -1,
    pointerType: "",
    startY: 0,
    lastY: 0,
    startScrollTop: 0,
    moved: false,
    velocity: 0,
    velocityTime: 0,
  });
  const centeredOnceRef = useRef(false);

  const centerValue = useCallback(
    (nextValue: number, behavior: ScrollBehavior) => {
      const wheel = wheelRef.current;
      const item = itemRefs.current.get(nextValue);
      if (!wheel || !item) {
        return;
      }
      const targetTop = item.offsetTop - (wheel.clientHeight - item.offsetHeight) / 2;
      wheel.scrollTo({ top: targetTop, behavior });
    },
    [],
  );

  const getNearestValue = useCallback((): number => {
    const wheel = wheelRef.current;
    if (!wheel) {
      return valueRef.current;
    }
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

  const commitNearest = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const nearest = getNearestValue();
      if (nearest !== valueRef.current) {
        onChangeRef.current(nearest);
      }
      centerValue(nearest, behavior);
    },
    [centerValue, getNearestValue],
  );

  const scheduleSnap = useCallback(
    (delay = 90, behavior: ScrollBehavior = "smooth") => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
      scrollTimerRef.current = window.setTimeout(() => {
        commitNearest(behavior);
      }, delay);
    },
    [commitNearest],
  );

  const stepValue = useCallback(
    (delta: number) => {
      if (!delta || values.length === 0) return;
      const currentIndex = values.indexOf(valueRef.current);
      const nearestIndex = values.indexOf(getNearestValue());
      const baseIndex = currentIndex >= 0 ? currentIndex : Math.max(nearestIndex, 0);
      const nextIndex = clamp(baseIndex + delta, 0, values.length - 1);
      const nextValue = values[nextIndex];
      if (nextValue === undefined) return;
      if (nextValue !== valueRef.current) {
        onChangeRef.current(nextValue);
      }
      setActiveValue(nextValue);
      centerValue(nextValue, "smooth");
    },
    [centerValue, getNearestValue, values],
  );

  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
    setActiveValue(value);
  }, [value, onChange]);

  useLayoutEffect(() => {
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

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    // Let primary-button mouse and pen drag; touch uses native scrolling.
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
      velocityTime: performance.now(),
    };
    setDragging(true);
    try {
      wheel.setPointerCapture(event.pointerId);
    } catch {
      /* noop */
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wheel = wheelRef.current;
    const dragState = dragStateRef.current;
    if (!wheel || !dragState.active || dragState.pointerId !== event.pointerId) return;

    event.preventDefault();
    event.stopPropagation();

    const now = performance.now();
    const delta = event.clientY - dragState.startY;
    if (Math.abs(delta) > 3) {
      dragState.moved = true;
    }
    const dt = Math.max(1, now - dragState.velocityTime);
    dragState.velocity = (event.clientY - dragState.lastY) / dt;
    dragState.lastY = event.clientY;
    dragState.velocityTime = now;

    wheel.scrollTop = dragState.startScrollTop - delta;
  };

  const handlePointerRelease = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wheel = wheelRef.current;
    const dragState = dragStateRef.current;
    if (!wheel || !dragState.active || dragState.pointerId !== event.pointerId) return;

    try {
      wheel.releasePointerCapture(event.pointerId);
    } catch {
      /* noop */
    }
    dragState.active = false;
    setDragging(false);

    // Apply a small momentum flick based on recent velocity.
    const flick = Math.max(-6, Math.min(6, Math.round(dragState.velocity * -60)));
    if (flick !== 0) {
      stepValue(flick);
    } else {
      scheduleSnap();
    }
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const multiplier =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? event.currentTarget.clientHeight
          : 1;
    const threshold = 24;
    const raw = event.deltaY * multiplier;
    const steps = Math.trunc(raw / threshold) || (raw === 0 ? 0 : raw > 0 ? 1 : -1);
    if (steps !== 0) {
      stepValue(steps);
    }
  };

  return (
    <div className="vds-time-wheel" data-variant={variant}>
      <div className="vds-time-wheel-header" aria-hidden="true">
        {label}
      </div>
      <div
        ref={wheelRef}
        className="vds-time-wheel-track"
        role="listbox"
        aria-label={label}
        data-dragging={dragging ? "true" : undefined}
        data-vds-drawer-no-drag=""
        onWheelCapture={handleWheel}
        onScroll={() => {
          setActiveValue(getNearestValue());
          if (!dragStateRef.current.active) {
            scheduleSnap(120);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerRelease}
        onPointerCancel={handlePointerRelease}
        onLostPointerCapture={() => {
          dragStateRef.current.active = false;
          setDragging(false);
        }}
      >
        {values.map((itemValue) => {
          const selected = itemValue === activeValue;
          return (
            <button
              key={itemValue}
              ref={(node) => {
                if (node) {
                  itemRefs.current.set(itemValue, node);
                } else {
                  itemRefs.current.delete(itemValue);
                }
              }}
              type="button"
              className="vds-time-wheel-item"
              role="option"
              data-value={itemValue}
              data-selected={selected ? "true" : undefined}
              aria-selected={selected}
              aria-label={`${label} ${formatValue(itemValue)}`}
              tabIndex={selected ? 0 : -1}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  stepValue(1);
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  stepValue(-1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  const first = values[0];
                  if (first !== undefined) {
                    setActiveValue(first);
                    onChangeRef.current(first);
                    centerValue(first, "smooth");
                  }
                } else if (event.key === "End") {
                  event.preventDefault();
                  const last = values[values.length - 1];
                  if (last !== undefined) {
                    setActiveValue(last);
                    onChangeRef.current(last);
                    centerValue(last, "smooth");
                  }
                }
              }}
              onClick={() => {
                if (dragStateRef.current.moved) {
                  dragStateRef.current.moved = false;
                  return;
                }
                setActiveValue(itemValue);
                onChange(itemValue);
              }}
            >
              {formatValue(itemValue)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8 4.75V8L10.25 9.35"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatTimeValue(
  value: TimeValue | null | undefined,
  options: {
    hourCycle?: 12 | 24;
    granularity?: "hour" | "minute" | "second";
    showMilliseconds?: boolean;
  } = {},
) {
  if (!value) {
    return "--:--";
  }

  const resolvedHourCycle = options.hourCycle ?? 24;
  const showMilliseconds = options.showMilliseconds;
  const granularity = options.granularity ?? "minute";
  const parts: string[] = [];
  const hour = resolvedHourCycle === 12 ? to12Hour(value.hour) : value.hour;

  parts.push(pad2(hour));

  if (granularity !== "hour" || showMilliseconds) {
    parts.push(pad2(value.minute));
  }

  if (granularity === "second" || showMilliseconds) {
    parts.push(pad2(value.second));
  }

  let formatted = parts.join(":");

  if (showMilliseconds) {
    formatted += `.${String(value.millisecond).padStart(3, "0")}`;
  }

  if (resolvedHourCycle === 12) {
    formatted += value.hour >= 12 ? " PM" : " AM";
  }

  return formatted;
}

function to12Hour(hour: number): number {
  const remainder = hour % 12;
  return remainder === 0 ? 12 : remainder;
}

function from12Hour(hour: number, isPm: boolean): number {
  if (hour === 12) {
    return isPm ? 12 : 0;
  }
  return isPm ? hour + 12 : hour;
}

function getMillisecondValues(current: number, step: number): number[] {
  const normalizedStep = Math.max(1, Math.min(250, Math.round(step)));
  const values: number[] = [];
  for (let value = 0; value <= 999; value += normalizedStep) {
    values.push(value);
  }
  if (!values.includes(current)) {
    values.push(current);
    values.sort((a, b) => a - b);
  }
  return values;
}

function nearestValue(values: number[], value: number): number {
  return values.reduce((nearest, item) =>
    Math.abs(item - value) < Math.abs(nearest - value) ? item : nearest,
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
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
