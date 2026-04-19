import { cn } from "@virtari/utils";
import { useRef, type ReactNode, type Ref } from "react";
import { useDatePicker, useDateField } from "@react-aria/datepicker";
import {
  useDatePickerState,
  useDateFieldState,
} from "@react-stately/datepicker";
import { useLocale } from "@react-aria/i18n";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { createCalendar, resolveLocale, type CalendarSystem, type DateValue } from "./date-utils";
import type { DatePickerSize, DatePickerAppearance } from "./context";
import { Calendar } from "./Calendar";
import { FieldSegment } from "./DateField";
import { TimeField } from "./TimeField";

export interface DatePickerProps {
  value?: DateValue | null;
  defaultValue?: DateValue | null;
  onChange?: (value: DateValue | null) => void;
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
  autoFocus?: boolean;
  name?: string;

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
  /** Rendered to the left of the calendar — e.g., `<DatePickerPresets>` */
  presets?: ReactNode;
  /** Rendered below the calendar (after the optional time field) */
  footer?: ReactNode;

  ref?: Ref<HTMLDivElement>;
}

export function DatePicker({
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
}: DatePickerProps) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);

  const state = useDatePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: props.shouldCloseOnSelect,
  });

  const groupRef = useRef<HTMLDivElement>(null);
  const {
    labelProps,
    groupProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
    descriptionProps,
    errorMessageProps,
  } = useDatePicker(
    { ...props, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef,
  );

  const fieldState = useDateFieldState({
    ...fieldProps,
    locale: usedLocale,
    createCalendar,
  });
  const fieldRef = useRef<HTMLDivElement>(null);
  const { fieldProps: innerFieldProps } = useDateField(fieldProps, fieldState, fieldRef);

  const isInvalid = invalid ?? state.isInvalid;

  return (
    <div
      ref={ref}
      className={cn("vds-date-picker", className)}
      data-size={size}
      data-appearance={appearance}
      data-invalid={isInvalid ? "true" : undefined}
      data-disabled={props.isDisabled ? "true" : undefined}
      data-readonly={props.isReadOnly ? "true" : undefined}
      data-dir={direction}
    >
      {label ? (
        <span {...labelProps} className="vds-date-picker-label">
          {label}
        </span>
      ) : null}

      <PopoverPrimitive.Root open={state.isOpen} onOpenChange={state.setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div
            {...groupProps}
            ref={groupRef}
            className="vds-date-picker-group"
          >
            <div
              {...innerFieldProps}
              ref={fieldRef}
              className="vds-date-picker-field"
            >
              {fieldState.segments.map((segment, i) => (
                <FieldSegment key={i} segment={segment} state={fieldState} />
              ))}
            </div>
            <PopoverPrimitive.Trigger asChild>
              <button
                {...buttonProps}
                type="button"
                className="vds-date-picker-trigger"
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
            className="vds-date-picker-content"
          >
            <div className="vds-date-picker-content-inner">
              {presets ? (
                <div className="vds-date-picker-presets">{presets}</div>
              ) : null}
              <div className="vds-date-picker-main">
                <Calendar
                  {...calendarProps}
                  size={size}
                  appearance={appearance}
                  invalid={isInvalid}
                  locale={usedLocale}
                />
                {state.hasTime ? (
                  <div className="vds-date-picker-time">
                    <TimeField
                      value={state.timeValue ?? null}
                      onChange={(v) => v && state.setTimeValue(v)}
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
                      aria-label="Time"
                    />
                  </div>
                ) : null}
                {footer ? (
                  <div className="vds-date-picker-footer">{footer}</div>
                ) : null}
              </div>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {description ? (
        <span {...descriptionProps} className="vds-date-picker-description">
          {description}
        </span>
      ) : null}
      {isInvalid && errorMessage ? (
        <span {...errorMessageProps} className="vds-date-picker-error">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="2.5"
        y="3.5"
        width="11"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M2.5 6.5H13.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M5.5 2V5M10.5 2V5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
