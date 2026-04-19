import { cn } from "@virtari/utils";
import {
  useEffect,
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

  /* Visual */
  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  invalid?: boolean;
  locale?: string;
  className?: string;

  /** Shows the native-like wheel picker when the field is clicked. */
  showPicker?: boolean;
  /** Adds a millisecond wheel. */
  showMilliseconds?: boolean;
  /** Millisecond wheel increment. Defaults to 10. */
  millisecondStep?: number;

  ref?: Ref<HTMLDivElement>;
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
  ref,
  ...props
}: TimeFieldProps) {
  const { locale: detectedLocale, direction } = useLocale();
  const [pickerOpen, setPickerOpen] = useState(false);
  const state = useTimeFieldState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    locale: locale ?? detectedLocale,
  });
  const localRef = useRef<HTMLDivElement>(null);
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useTimeField(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    localRef,
  );

  const isInvalid = invalid ?? state.isInvalid;
  const canOpenPicker = showPicker && !props.isDisabled && !props.isReadOnly;

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

      <PopoverPrimitive.Root open={pickerOpen} onOpenChange={setPickerOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div
            {...fieldProps}
            ref={composeRefs(ref, localRef)}
            className="vds-time-field-group"
            onClick={(event) => {
              fieldProps.onClick?.(event);
              if (canOpenPicker) {
                setPickerOpen(true);
              }
            }}
          >
            <div className="vds-time-field-segments">
              {state.segments.map((segment, i) => (
                <TimeSegment key={i} segment={segment} state={state} />
              ))}
            </div>
            {showPicker ? (
              <button
                type="button"
                className="vds-time-field-picker-trigger"
                aria-label="Open time picker"
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
        </PopoverPrimitive.Anchor>

        {showPicker ? (
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
                granularity={props.granularity ?? "minute"}
                showMilliseconds={showMilliseconds}
                millisecondStep={millisecondStep}
                onClose={() => setPickerOpen(false)}
              />
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        ) : null}
      </PopoverPrimitive.Root>

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
  const resolvedHourCycle = hourCycle ?? 24;
  const hours = resolvedHourCycle === 12 ? range(1, 12) : range(1, 24);
  const minutes = range(0, 59);
  const seconds = range(0, 59);
  const milliseconds = useMemo(
    () => getMillisecondValues(draftTime.millisecond, millisecondStep),
    [draftTime.millisecond, millisecondStep],
  );
  const columnCount =
    1 +
    (granularity !== "hour" || showMilliseconds ? 1 : 0) +
    (granularity === "second" || showMilliseconds ? 1 : 0) +
    (showMilliseconds ? 1 : 0) +
    (resolvedHourCycle === 12 ? 1 : 0);

  useEffect(() => {
    setDraftTime(sourceTime.copy());
  }, [sourceTime.hour, sourceTime.minute, sourceTime.second, sourceTime.millisecond]);

  const setDraft = (fields: Partial<Pick<Time, "hour" | "minute" | "second" | "millisecond">>) => {
    setDraftTime((current) => current.set(fields) as TimeValue);
  };

  const commit = () => {
    (state.setValue as (value: TimeValue | null) => void)(draftTime);
    onClose();
  };

  const selectedHour = resolvedHourCycle === 12
    ? to12Hour(draftTime.hour)
    : draftTime.hour === 0 ? 24 : draftTime.hour;
  const selectedPeriod = draftTime.hour >= 12 ? 1 : 0;
  const periodValues = [0, 1];

  return (
    <div className="vds-time-picker-panel" data-columns={columnCount}>
      <div className="vds-time-picker-header">
        <span className="vds-time-picker-title">Set time</span>
      </div>
      <div className="vds-time-picker-wheels" data-columns={columnCount}>
        <TimeWheel
          label="Hour"
          values={hours}
          value={selectedHour}
          formatValue={(value) => resolvedHourCycle === 12 ? String(value) : pad2(value)}
          onChange={(value) => {
            if (resolvedHourCycle === 12) {
              setDraft({ hour: from12Hour(value, selectedPeriod === 1) });
              return;
            }

            setDraft({ hour: value === 24 ? 0 : value });
          }}
        />
        {granularity !== "hour" || showMilliseconds ? (
          <TimeWheel
            label="Minute"
            values={minutes}
            value={draftTime.minute}
            formatValue={pad2}
            onChange={(value) => setDraft({ minute: value })}
          />
        ) : null}
        {granularity === "second" || showMilliseconds ? (
          <TimeWheel
            label="Second"
            values={seconds}
            value={draftTime.second}
            formatValue={pad2}
            onChange={(value) => setDraft({ second: value })}
          />
        ) : null}
        {showMilliseconds ? (
          <TimeWheel
            label="MS"
            values={milliseconds}
            value={nearestValue(milliseconds, draftTime.millisecond)}
            formatValue={(value) => String(value).padStart(3, "0")}
            onChange={(value) => setDraft({ millisecond: value })}
          />
        ) : null}
        {resolvedHourCycle === 12 ? (
          <TimeWheel
            label="Period"
            values={periodValues}
            value={selectedPeriod}
            formatValue={(value) => value === 1 ? "PM" : "AM"}
            onChange={(value) => {
              const wantsPm = value === 1;
              if (wantsPm === (draftTime.hour >= 12)) {
                return;
              }
              setDraft({ hour: wantsPm ? draftTime.hour + 12 : draftTime.hour - 12 });
            }}
          />
        ) : null}
      </div>
      <div className="vds-time-picker-actions">
        <button
          type="button"
          className="vds-time-picker-action"
          data-variant="secondary"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="vds-time-picker-action"
          data-variant="primary"
          onClick={commit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

interface TimeWheelProps {
  label: string;
  values: number[];
  value: number;
  formatValue: (value: number) => string;
  onChange: (value: number) => void;
}

function TimeWheel({ label, values, value, formatValue, onChange }: TimeWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const dragStateRef = useRef({
    pointerId: -1,
    startY: 0,
    startScrollTop: 0,
    moved: false,
    wasDragging: false,
  });

  const centerValue = (nextValue: number, behavior: ScrollBehavior) => {
    const wheel = wheelRef.current;
    const item = wheel?.querySelector<HTMLElement>(`[data-value="${nextValue}"]`);
    item?.scrollIntoView({ block: "center", inline: "nearest", behavior });
  };

  const selectNearest = (behavior: ScrollBehavior = "smooth") => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    const wheelRect = wheel.getBoundingClientRect();
    const wheelCenter = wheelRect.top + wheelRect.height / 2;
    let nearest = valueRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;

    wheel.querySelectorAll<HTMLElement>(".vds-time-wheel-item").forEach((item) => {
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

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startScrollTop: wheel.scrollTop,
      moved: false,
      wasDragging: false,
    };
    wheel.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
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

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
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

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const multiplier = event.deltaMode === 1
      ? 36
      : event.deltaMode === 2 ? event.currentTarget.clientHeight : 1;
    event.currentTarget.scrollTop += event.deltaY * multiplier;
    scheduleSnap();
  };

  return (
    <div className="vds-time-wheel" data-label={label}>
      <div className="vds-time-wheel-label">{label}</div>
      <div
        ref={wheelRef}
        className="vds-time-wheel-track"
        onWheelCapture={handleWheel}
        onScroll={scheduleSnap}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {values.map((itemValue) => {
          const selected = itemValue === value;
          return (
            <button
              key={itemValue}
              type="button"
              className="vds-time-wheel-item"
              data-value={itemValue}
              data-selected={selected ? "true" : undefined}
              aria-pressed={selected}
              aria-label={`${label} ${formatValue(itemValue)}`}
              onClick={() => {
                if (dragStateRef.current.wasDragging) return;
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
