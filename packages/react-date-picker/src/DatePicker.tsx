import { cn } from "@virtari/utils";
import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { useDatePicker, useDateField } from "@react-aria/datepicker";
import {
  useDatePickerState,
  useDateFieldState,
} from "@react-stately/datepicker";
import { useLocale } from "@react-aria/i18n";
import { Time } from "@internationalized/date";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Button } from "@virtari/react-button";
import { IconChevronLeft } from "@virtari/react-icons";
import { createCalendar, resolveLocale, type CalendarSystem, type DateValue } from "./date-utils";
import type { DatePickerSize, DatePickerAppearance } from "./context";
import { Calendar } from "./Calendar";
import { FieldSegment, StaticFieldSegments } from "./DateField";
import { TimeField, TimePickerEditor, formatTimeValue } from "./TimeField";
import { toButtonProps } from "./aria-button";
import {
  MobilePickerSurface,
  type MobilePickerPresentation,
  type MobilePickerSizeMode,
  type PickerOverlayMode,
  PickerActionBar,
  useIsMobileViewport,
} from "./picker-overlay";

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

  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  invalid?: boolean;
  calendar?: CalendarSystem;
  locale?: string;
  className?: string;
  presets?: ReactNode | ((props: DatePickerPresetRenderProps) => ReactNode);
  footer?: ReactNode;
  overlayMode?: PickerOverlayMode;
  mobilePresentation?: MobilePickerPresentation;
  mobileSizeMode?: MobilePickerSizeMode;

  ref?: Ref<HTMLDivElement>;
}

export interface DatePickerPresetRenderProps {
  value: DateValue | null;
  setValue: (value: DateValue | null) => void;
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
  overlayMode = "auto",
  mobilePresentation = "drawer",
  mobileSizeMode = "content",
  ref,
  ...props
}: DatePickerProps) {
  const { locale: detectedLocale, direction } = useLocale();
  const usedLocale = resolveLocale(locale ?? detectedLocale, calendar);
  const isMobile = useIsMobileViewport();
  const preferredOverlayMode = overlayMode === "auto"
    ? (isMobile ? mobilePresentation : "popover")
    : overlayMode;
  const resolvedOverlayMode = !isMobile && preferredOverlayMode === "drawer"
    ? "dialog"
    : preferredOverlayMode;
  const usePopoverSurface = resolvedOverlayMode === "popover";
  const useSheetSurface = resolvedOverlayMode === "drawer" || resolvedOverlayMode === "dialog";

  const state = useDatePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false,
  });
  const [draftValue, setDraftValue] = useState<DateValue | null>(state.value);
  const [mobileView, setMobileView] = useState<"date" | "time">("date");

  useEffect(() => {
    if (!state.isOpen) {
      setDraftValue(state.value);
      setMobileView("date");
    }
  }, [state.isOpen, state.value]);

  useEffect(() => {
    if (state.isOpen) {
      setDraftValue(state.value);
      setMobileView("date");
    }
  }, [state.isOpen]);

  const groupRef = useRef<HTMLDivElement>(null);
  const {
    labelProps,
    groupProps,
    fieldProps,
    buttonProps,
    descriptionProps,
    errorMessageProps,
  } = useDatePicker(
    { ...props, label, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef,
  );
  const triggerButtonProps = toButtonProps(buttonProps);

  const fieldState = useDateFieldState({
    ...fieldProps,
    locale: usedLocale,
    createCalendar,
  });
  const fieldRef = useRef<HTMLDivElement>(null);
  const { fieldProps: innerFieldProps } = useDateField(fieldProps, fieldState, fieldRef);

  const draftPickerState = useDatePickerState({
    ...props,
    value: draftValue,
    onChange: setDraftValue,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false,
  });

  const isInvalid = invalid ?? state.isInvalid;
  const isSplitLayout = state.hasTime && (size === "lg" || size === "xl" || size === "2xl");
  const triggerUsesReadonlyField = useSheetSurface;
  const draftTimeValue = (draftPickerState.timeValue ?? new Time()).copy();
  const timeSummary = formatTimeValue(draftPickerState.timeValue, {
    hourCycle: props.hourCycle,
    granularity: props.granularity === "day" ? "hour" : props.granularity ?? "hour",
    showMilliseconds: props.showMilliseconds,
  });
  const renderedPresets = typeof presets === "function"
    ? presets({
        value: draftValue,
        setValue: setDraftValue,
      })
    : presets;
  const actionBar = (
    <PickerActionBar
      className="vds-date-picker-actions"
      buttonSize={size === "2xs" || size === "xs" ? "sm" : "md"}
      onCancel={() => {
        setDraftValue(state.value);
        state.setOpen(false);
      }}
      onApply={() => {
        state.setValue(draftPickerState.value);
        state.setOpen(false);
      }}
    />
  );

  const overlayBody = (
    <div className="vds-date-picker-overlay">
      <div className="vds-date-picker-content-inner">
        {renderedPresets ? (
          <div className="vds-date-picker-presets">{renderedPresets}</div>
        ) : null}
        <div
          className="vds-date-picker-main"
          data-layout={isSplitLayout ? "split" : "stack"}
          data-has-time={state.hasTime ? "true" : undefined}
        >
          <Calendar
            value={draftPickerState.dateValue ?? null}
            onChange={draftPickerState.setDateValue}
            minValue={props.minValue ?? null}
            maxValue={props.maxValue ?? null}
            isDateUnavailable={props.isDateUnavailable}
            isDisabled={props.isDisabled}
            isReadOnly={props.isReadOnly}
            autoFocus={!isMobile}
            aria-label={props["aria-label"] ?? "Calendar"}
            size={size}
            appearance={appearance}
            invalid={isInvalid}
            locale={usedLocale}
          />
          {state.hasTime ? (
            <div className="vds-date-picker-time">
              <TimeField
                value={draftPickerState.timeValue ?? null}
                onChange={(value) => {
                  if (value) {
                    draftPickerState.setTimeValue(value);
                  }
                }}
                granularity={
                  props.granularity === "day" ? "hour" : props.granularity ?? "hour"
                }
                hourCycle={props.hourCycle}
                hideTimeZone={props.hideTimeZone}
                showPicker={props.showTimePicker ?? true}
                showMilliseconds={props.showMilliseconds}
                millisecondStep={props.millisecondStep}
                mobilePresentation={mobilePresentation}
                mobileSizeMode="content"
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
      {actionBar}
    </div>
  );

  const pickerGroup = (
    <div
      {...groupProps}
      ref={groupRef}
      className="vds-date-picker-group"
      data-surface-trigger={triggerUsesReadonlyField ? "true" : undefined}
      onClick={() => {
        if (triggerUsesReadonlyField && !props.isDisabled && !props.isReadOnly) {
          state.setOpen(true);
        }
      }}
    >
      {triggerUsesReadonlyField ? (
        <StaticFieldSegments segments={fieldState.segments} className="vds-date-picker-field" />
      ) : (
        <div
          {...innerFieldProps}
          ref={fieldRef}
          className="vds-date-picker-field"
        >
          {fieldState.segments.map((segment, index) => (
            <FieldSegment key={index} segment={segment} state={fieldState} />
          ))}
        </div>
      )}
      <button
        {...triggerButtonProps}
        type="button"
        className="vds-date-picker-trigger"
        aria-label={triggerButtonProps["aria-label"] ?? "Open calendar"}
      >
        <CalendarIcon />
      </button>
    </div>
  );

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

      {usePopoverSurface ? (
        <PopoverPrimitive.Root open={state.isOpen} onOpenChange={state.setOpen}>
          <PopoverPrimitive.Anchor asChild>{pickerGroup}</PopoverPrimitive.Anchor>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              sideOffset={6}
              align="start"
              collisionPadding={8}
              className="vds-date-picker-content"
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              {overlayBody}
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      ) : pickerGroup}

      {useSheetSurface ? (
        <MobilePickerSurface
          open={state.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              setDraftValue(state.value);
              setMobileView("date");
            }
            state.setOpen(open);
          }}
          title={mobileView === "time" ? "Select time" : label ?? "Select date"}
          presentation={resolvedOverlayMode}
          sizeMode={mobileSizeMode}
          bodyClassName="vds-date-picker-mobile-body"
          leadingAction={mobileView === "time" ? (
            <Button
              type="button"
              color="neutral"
              variant="ghost"
              size="sm"
              leftSection={<IconChevronLeft size={14} stroke={1.75} aria-hidden focusable={false} />}
              onClick={() => setMobileView("date")}
            >
              Back
            </Button>
          ) : null}
          footer={actionBar}
        >
          {mobileView === "time" ? (
            <div className="vds-date-picker-mobile-panel vds-date-picker-mobile-time-panel">
              <div className="vds-time-picker-panel vds-time-picker-panel--embedded">
              <TimePickerEditor
                value={draftTimeValue}
                onChange={(value) => draftPickerState.setTimeValue(value)}
                hourCycle={props.hourCycle}
                granularity={
                  props.granularity === "day" ? "hour" : props.granularity ?? "hour"
                }
                showMilliseconds={props.showMilliseconds}
                millisecondStep={props.millisecondStep ?? 10}
              />
              </div>
            </div>
          ) : (
            <div className="vds-date-picker-mobile-panel">
              <div className="vds-date-picker-content-inner">
                {renderedPresets ? (
                  <div className="vds-date-picker-presets">{renderedPresets}</div>
                ) : null}
                <div
                  className="vds-date-picker-main"
                  data-layout="stack"
                  data-has-time={state.hasTime ? "true" : undefined}
                >
                  <Calendar
                    value={draftPickerState.dateValue ?? null}
                    onChange={draftPickerState.setDateValue}
                    minValue={props.minValue ?? null}
                    maxValue={props.maxValue ?? null}
                    isDateUnavailable={props.isDateUnavailable}
                    isDisabled={props.isDisabled}
                    isReadOnly={props.isReadOnly}
                    aria-label={props["aria-label"] ?? "Calendar"}
                    size={size}
                    appearance={appearance}
                    invalid={isInvalid}
                    locale={usedLocale}
                  />
                  {state.hasTime ? (
                    <Button
                      type="button"
                      color="neutral"
                      variant="soft"
                      fullWidth
                      className="vds-picker-mobile-mode-link"
                      onClick={() => setMobileView("time")}
                    >
                      <span className="vds-picker-mobile-mode-label">Time</span>
                      <span className="vds-picker-mobile-mode-value">{timeSummary}</span>
                    </Button>
                  ) : null}
                  {footer ? (
                    <div className="vds-date-picker-footer">{footer}</div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </MobilePickerSurface>
      ) : null}

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
