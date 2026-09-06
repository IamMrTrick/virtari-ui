import { forwardRef } from "react";
import { cn, useComposedRefs } from "../../lib/utils";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react";
import { ScrollWheel } from "./Wheel";
import { useTimeField, useDateSegment } from "@react-aria/datepicker";
import {
  useTimeFieldState,
  type DateSegment,
  type TimeFieldState,
  type TimeValue,
} from "@react-stately/datepicker";
import { useLocale } from "@react-aria/i18n";
import { Time } from "@internationalized/date";
import * as PopoverPrimitive from "../../lib/primitives/popover";
import type { DatePickerAppearance, DatePickerSize } from "./context";
import { StaticFieldSegments, padTimeSegmentText } from "./DateField";
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
  form?: string;
  validationBehavior?: "native" | "aria";

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

export interface TimePickerEditorProps {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  hourCycle?: 12 | 24;
  granularity: "hour" | "minute" | "second";
  showMilliseconds?: boolean;
  millisecondStep: number;
}

export const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(function TimeField({
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
  ...props
}, ref) {
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
  const nativeInputRef = useRef<HTMLInputElement>(null);
  const mergedRef = useComposedRefs(localRef, ref);
  const { labelProps, fieldProps, inputProps, descriptionProps, errorMessageProps } = useTimeField(
    { ...props, inputRef: nativeInputRef, label, isInvalid: invalid ?? props.isInvalid },
    state,
    localRef,
  );

  const isInvalid = invalid ?? state.isInvalid;
  const delegatedToParent = !!onTriggerClick;
  const canOpenPicker = showPicker && !props.isDisabled && !props.isReadOnly;
  const usesSurfaceField = showPicker && (useSheetSurface || delegatedToParent);
  const pickerTitle = label ?? "Set time";
  const resolvedGranularity = props.granularity ?? "minute";
  const closePicker = () => setPickerOpen(false);
  const seedTime = useCallback(
    () => ((state.timeValue ?? defaultTimeValue ?? nowAsTime(resolvedGranularity)).copy() as TimeValue),
    [state.timeValue, defaultTimeValue, resolvedGranularity],
  );
  const [surfaceDraftTime, setSurfaceDraftTime] = useState<TimeValue>(seedTime);

  useEffect(() => {
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

  const openOrDelegate = () => {
    if (delegatedToParent) {
      onTriggerClick?.();
    } else {
      setPickerOpen(true);
    }
  };
  const fieldGroup = (
    <div
      {...fieldProps}
      ref={mergedRef}
      className="vds-time-field-group"
      data-surface-trigger={usesSurfaceField ? "true" : undefined}
      onClick={(event) => {
        fieldProps.onClick?.(event);
        if (!canOpenPicker) {
          return;
        }

        if (usesSurfaceField || event.target === event.currentTarget) {
          openOrDelegate();
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
          aria-expanded={delegatedToParent ? undefined : pickerOpen}
          disabled={!canOpenPicker}
          onClick={(event) => {
            event.stopPropagation();
            openOrDelegate();
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
      <input {...inputProps} ref={nativeInputRef} form={props.form} />
      {label ? (
        <span {...labelProps} className="vds-time-field-label">
          {label}
        </span>
      ) : null}

      {showPicker && !delegatedToParent && usePopoverSurface ? (
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
                defaultTimeValue={defaultTimeValue}
                onClose={closePicker}
              />
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      ) : (
        fieldGroup
      )}

      {showPicker && !delegatedToParent && useSheetSurface ? (
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
      <span
        {...errorMessageProps}
        role={isInvalid && errorMessage ? "alert" : undefined}
        aria-hidden={isInvalid && errorMessage ? undefined : true}
        data-visible={isInvalid && errorMessage ? "" : undefined}
        data-empty={isInvalid && errorMessage ? undefined : ""}
        className="vds-time-field-error"
      >
        <span className="vds-time-field-error-body">{errorMessage}</span>
      </span>
    </div>
  );
});

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
      {padTimeSegmentText(segment)}
    </div>
  );
}

interface TimePickerPanelProps {
  state: TimeFieldState;
  hourCycle?: 12 | 24;
  granularity: "hour" | "minute" | "second";
  showMilliseconds?: boolean;
  millisecondStep: number;
  defaultTimeValue?: TimeValue;
  onClose: () => void;
}

function TimePickerPanel({
  state,
  hourCycle,
  granularity,
  showMilliseconds,
  millisecondStep,
  defaultTimeValue,
  onClose,
}: TimePickerPanelProps) {
  const sourceTime = state.timeValue ?? defaultTimeValue ?? nowAsTime(granularity);
  const [draftTime, setDraftTime] = useState<TimeValue>(() => sourceTime.copy() as TimeValue);

  useEffect(() => {
    setDraftTime(sourceTime.copy() as TimeValue);
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
      <ScrollWheel
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
          <ScrollWheel
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
          <ScrollWheel
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
          <ScrollWheel
            label="MS"
            values={milliseconds}
            value={nearestValue(milliseconds, value.millisecond)}
            formatValue={(nextValue) => String(nextValue).padStart(3, "0")}
            onChange={(nextValue) => setNextValue({ millisecond: nextValue })}
          />
        </>
      ) : null}
      {showPeriod ? (
        <ScrollWheel
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

function TimeColon({ variant = "colon" }: { variant?: "colon" | "dot" }) {
  return (
    <div className="vds-time-picker-colon" data-variant={variant} aria-hidden="true">
      {variant === "dot" ? "." : ":"}
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

export function nowAsTime(
  granularity: "hour" | "minute" | "second" = "minute",
): TimeValue {
  const now = new Date();
  const hour = now.getHours();
  const minute = granularity === "hour" ? 0 : now.getMinutes();
  const second = granularity === "second" ? now.getSeconds() : 0;
  return new Time(hour, minute, second) as TimeValue;
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
