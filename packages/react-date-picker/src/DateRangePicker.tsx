import { cn } from "@virtari/utils";
import { useRef, type ReactNode, type Ref } from "react";
import { useDateRangePicker, useDateField } from "@react-aria/datepicker";
import {
  useDateRangePickerState,
  useDateFieldState,
  type DateRange,
} from "@react-stately/datepicker";
import { useLocale } from "@react-aria/i18n";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { createCalendar, resolveLocale, type CalendarSystem, type DateValue } from "./date-utils";
import type { DatePickerSize, DatePickerAppearance } from "./context";
import { RangeCalendar } from "./Calendar";
import { FieldSegment } from "./DateField";
import { TimeField } from "./TimeField";

export interface DateRangePickerProps {
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onChange?: (value: DateRange | null) => void;
  minValue?: DateValue;
  maxValue?: DateValue;
  placeholderValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  granularity?: "day" | "hour" | "minute" | "second";
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  shouldCloseOnSelect?: boolean;
  showTimePicker?: boolean;
  showMilliseconds?: boolean;
  millisecondStep?: number;
  allowsNonContiguousRanges?: boolean;
  autoFocus?: boolean;
  startName?: string;
  endName?: string;

  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  "aria-label"?: string;

  /* Visual */
  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  invalid?: boolean;
  calendar?: CalendarSystem;
  locale?: string;
  className?: string;

  /* Slots */
  presets?: ReactNode;
  footer?: ReactNode;

  ref?: Ref<HTMLDivElement>;
}

export function DateRangePicker({
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
}: DateRangePickerProps) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);

  const state = useDateRangePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: props.shouldCloseOnSelect,
  });

  const groupRef = useRef<HTMLDivElement>(null);
  const {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps,
  } = useDateRangePicker(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef,
  );

  const startFieldState = useDateFieldState({
    ...startFieldProps,
    locale: usedLocale,
    createCalendar,
  });
  const startFieldRef = useRef<HTMLDivElement>(null);
  const { fieldProps: innerStartFieldProps } = useDateField(
    startFieldProps,
    startFieldState,
    startFieldRef,
  );

  const endFieldState = useDateFieldState({
    ...endFieldProps,
    locale: usedLocale,
    createCalendar,
  });
  const endFieldRef = useRef<HTMLDivElement>(null);
  const { fieldProps: innerEndFieldProps } = useDateField(
    endFieldProps,
    endFieldState,
    endFieldRef,
  );

  const isInvalid = invalid ?? state.isInvalid;

  return (
    <div
      ref={ref}
      className={cn("vds-date-range-picker", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={isInvalid ? "true" : undefined}
      data-disabled={props.isDisabled ? "true" : undefined}
      data-readonly={props.isReadOnly ? "true" : undefined}
      data-dir={direction}
    >
      {label ? (
        <span {...labelProps} className="vds-date-range-picker-label">
          {label}
        </span>
      ) : null}

      <PopoverPrimitive.Root open={state.isOpen} onOpenChange={state.setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div
            {...groupProps}
            ref={groupRef}
            className="vds-date-range-picker-group"
          >
            <div
              {...innerStartFieldProps}
              ref={startFieldRef}
              className="vds-date-range-picker-field"
            >
              {startFieldState.segments.map((segment, i) => (
                <FieldSegment key={i} segment={segment} state={startFieldState} />
              ))}
            </div>

            <span className="vds-date-range-picker-separator" aria-hidden="true">
              –
            </span>

            <div
              {...innerEndFieldProps}
              ref={endFieldRef}
              className="vds-date-range-picker-field"
            >
              {endFieldState.segments.map((segment, i) => (
                <FieldSegment key={i} segment={segment} state={endFieldState} />
              ))}
            </div>

            <PopoverPrimitive.Trigger asChild>
              <button
                {...buttonProps}
                type="button"
                className="vds-date-range-picker-trigger"
                aria-label={buttonProps["aria-label"] ?? "Open calendar"}
              >
                <CalendarIcon />
              </button>
            </PopoverPrimitive.Trigger>
          </div>
        </PopoverPrimitive.Anchor>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            {...dialogProps}
            sideOffset={6}
            align="start"
            className="vds-date-range-picker-content"
          >
            <div className="vds-date-range-picker-content-inner">
              {presets ? (
                <div className="vds-date-range-picker-presets">{presets}</div>
              ) : null}
              <div className="vds-date-range-picker-main">
                <RangeCalendar
                  {...calendarProps}
                  size={size}
                  appearance={appearance}
                  invalid={isInvalid}
                  locale={usedLocale}
                />
                {state.hasTime ? (
                  <div className="vds-date-range-picker-time">
                    <TimeField
                      value={state.timeRange?.start ?? null}
                      onChange={(v) =>
                        v &&
                        state.setTime("start", v)
                      }
                      granularity={
                        props.granularity === "day" ? "hour" : props.granularity ?? "hour"
                      }
                      hourCycle={props.hourCycle}
                      hideTimeZone={props.hideTimeZone}
                      showPicker={props.showTimePicker ?? true}
                      showMilliseconds={props.showMilliseconds}
                      millisecondStep={props.millisecondStep}
                      size={size}
                      appearance={appearance}
                      aria-label="Start time"
                    />
                    <TimeField
                      value={state.timeRange?.end ?? null}
                      onChange={(v) =>
                        v &&
                        state.setTime("end", v)
                      }
                      granularity={
                        props.granularity === "day" ? "hour" : props.granularity ?? "hour"
                      }
                      hourCycle={props.hourCycle}
                      hideTimeZone={props.hideTimeZone}
                      showPicker={props.showTimePicker ?? true}
                      showMilliseconds={props.showMilliseconds}
                      millisecondStep={props.millisecondStep}
                      size={size}
                      appearance={appearance}
                      aria-label="End time"
                    />
                  </div>
                ) : null}
                {footer ? (
                  <div className="vds-date-range-picker-footer">{footer}</div>
                ) : null}
              </div>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {description ? (
        <span {...descriptionProps} className="vds-date-range-picker-description">
          {description}
        </span>
      ) : null}
      {isInvalid && errorMessage ? (
        <span {...errorMessageProps} className="vds-date-range-picker-error">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.5 6.5H13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M5.5 2V5M10.5 2V5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
