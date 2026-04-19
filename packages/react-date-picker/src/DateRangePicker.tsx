import { cn } from "@virtari/utils";
import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { useDateRangePicker, useDateField } from "@react-aria/datepicker";
import {
  useDateRangePickerState,
  useDateFieldState,
  type DateRange,
} from "@react-stately/datepicker";
import { useLocale } from "@react-aria/i18n";
import { Time } from "@internationalized/date";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Button } from "@virtari/react-button";
import { IconChevronLeft } from "@virtari/react-icons";
import { createCalendar, resolveLocale, type CalendarSystem, type DateValue } from "./date-utils";
import type { DatePickerSize, DatePickerAppearance } from "./context";
import { RangeCalendar } from "./Calendar";
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

  size?: DatePickerSize;
  appearance?: DatePickerAppearance;
  invalid?: boolean;
  calendar?: CalendarSystem;
  locale?: string;
  className?: string;
  presets?: ReactNode | ((props: DateRangePickerPresetRenderProps) => ReactNode);
  footer?: ReactNode;
  overlayMode?: PickerOverlayMode;
  mobilePresentation?: MobilePickerPresentation;
  mobileSizeMode?: MobilePickerSizeMode;

  ref?: Ref<HTMLDivElement>;
}

export interface DateRangePickerPresetRenderProps {
  value: DateRange | null;
  setValue: (value: DateRange | null) => void;
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
  overlayMode = "auto",
  mobilePresentation = "drawer",
  mobileSizeMode = "full",
  ref,
  ...props
}: DateRangePickerProps) {
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

  const state = useDateRangePickerState({
    ...props,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false,
  });
  const [draftRange, setDraftRange] = useState<DateRange | null>(toCompleteRange(state.value));
  const [mobileView, setMobileView] = useState<"date" | "start-time" | "end-time">("date");

  useEffect(() => {
    if (!state.isOpen) {
      setDraftRange(toCompleteRange(state.value));
      setMobileView("date");
    }
  }, [state.isOpen, state.value]);

  useEffect(() => {
    if (state.isOpen) {
      setDraftRange(toCompleteRange(state.value));
      setMobileView("date");
    }
  }, [state.isOpen]);

  const groupRef = useRef<HTMLDivElement>(null);
  const {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    descriptionProps,
    errorMessageProps,
  } = useDateRangePicker(
    { ...props, label, isInvalid: invalid ?? props.isInvalid },
    state,
    groupRef,
  );
  const triggerButtonProps = toButtonProps(buttonProps);

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

  const draftState = useDateRangePickerState({
    ...props,
    value: draftRange,
    onChange: setDraftRange,
    isInvalid: invalid ?? props.isInvalid,
    shouldCloseOnSelect: false,
  });

  const isInvalid = invalid ?? state.isInvalid;
  const isSplitLayout = state.hasTime && (size === "lg" || size === "xl" || size === "2xl");
  const triggerUsesReadonlyField = useSheetSurface;
  const timeGranularity = props.granularity === "day" ? "hour" : props.granularity ?? "hour";
  const startTimeSummary = formatTimeValue(draftState.timeRange?.start ?? null, {
    hourCycle: props.hourCycle,
    granularity: timeGranularity,
    showMilliseconds: props.showMilliseconds,
  });
  const endTimeSummary = formatTimeValue(draftState.timeRange?.end ?? null, {
    hourCycle: props.hourCycle,
    granularity: timeGranularity,
    showMilliseconds: props.showMilliseconds,
  });
  const draftStartTime = (draftState.timeRange?.start ?? new Time()).copy();
  const draftEndTime = (draftState.timeRange?.end ?? new Time()).copy();
  const renderedPresets = typeof presets === "function"
    ? presets({
        value: draftRange,
        setValue: setDraftRange,
      })
    : presets;
  const applyDisabled = Boolean(
    draftState.value &&
    ((!draftState.value.start && draftState.value.end) ||
      (draftState.value.start && !draftState.value.end)),
  );
  const actionBar = (
    <PickerActionBar
      className="vds-date-range-picker-actions"
      buttonSize={size === "2xs" || size === "xs" ? "sm" : "md"}
      applyDisabled={applyDisabled}
      onCancel={() => {
        setDraftRange(toCompleteRange(state.value));
        state.setOpen(false);
      }}
      onApply={() => {
        state.setValue(toCompleteRange(draftState.value));
        state.setOpen(false);
      }}
    />
  );

  const rangeCalendar = (
    <RangeCalendar
      value={toCompleteRange(draftState.dateRange)}
      onChange={draftState.setDateRange}
      minValue={props.minValue ?? null}
      maxValue={props.maxValue ?? null}
      isDateUnavailable={props.isDateUnavailable}
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
      allowsNonContiguousRanges={props.allowsNonContiguousRanges}
      autoFocus={!isMobile}
      aria-label={props["aria-label"] ?? "Date range calendar"}
      visibleDuration={isMobile ? { months: 1 } : { months: 2 }}
      pageBehavior="single"
      size={size}
      appearance={appearance}
      invalid={isInvalid}
      locale={usedLocale}
    />
  );

  const overlayBody = (
    <div className="vds-date-range-picker-overlay">
      <div className="vds-date-range-picker-content-inner">
        {renderedPresets ? (
          <div className="vds-date-range-picker-presets">{renderedPresets}</div>
        ) : null}
        <div
          className="vds-date-range-picker-main"
          data-layout={isSplitLayout ? "split" : "stack"}
          data-has-time={state.hasTime ? "true" : undefined}
        >
          {rangeCalendar}
          {state.hasTime ? (
            <div className="vds-date-range-picker-time">
              <TimeField
                value={draftState.timeRange?.start ?? null}
                onChange={(value) => {
                  if (value) {
                    draftState.setTime("start", value);
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
                label="Start time"
                aria-label="Start time"
              />
              <TimeField
                value={draftState.timeRange?.end ?? null}
                onChange={(value) => {
                  if (value) {
                    draftState.setTime("end", value);
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
                label="End time"
                aria-label="End time"
              />
            </div>
          ) : null}
          {footer ? (
            <div className="vds-date-range-picker-footer">{footer}</div>
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
      className="vds-date-range-picker-group"
      data-surface-trigger={triggerUsesReadonlyField ? "true" : undefined}
      onClick={() => {
        if (triggerUsesReadonlyField && !props.isDisabled && !props.isReadOnly) {
          state.setOpen(true);
        }
      }}
    >
      {triggerUsesReadonlyField ? (
        <StaticFieldSegments segments={startFieldState.segments} className="vds-date-range-picker-field" />
      ) : (
        <div
          {...innerStartFieldProps}
          ref={startFieldRef}
          className="vds-date-range-picker-field"
        >
          {startFieldState.segments.map((segment, index) => (
            <FieldSegment key={index} segment={segment} state={startFieldState} />
          ))}
        </div>
      )}

      <span className="vds-date-range-picker-separator" aria-hidden="true">
        -
      </span>

      {triggerUsesReadonlyField ? (
        <StaticFieldSegments segments={endFieldState.segments} className="vds-date-range-picker-field" />
      ) : (
        <div
          {...innerEndFieldProps}
          ref={endFieldRef}
          className="vds-date-range-picker-field"
        >
          {endFieldState.segments.map((segment, index) => (
            <FieldSegment key={index} segment={segment} state={endFieldState} />
          ))}
        </div>
      )}

      <button
        {...triggerButtonProps}
        type="button"
        className="vds-date-range-picker-trigger"
        aria-label={triggerButtonProps["aria-label"] ?? "Open calendar"}
      >
        <CalendarIcon />
      </button>
    </div>
  );

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

      {usePopoverSurface ? (
        <PopoverPrimitive.Root open={state.isOpen} onOpenChange={state.setOpen}>
          <PopoverPrimitive.Anchor asChild>{pickerGroup}</PopoverPrimitive.Anchor>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              sideOffset={6}
              align="start"
              collisionPadding={8}
              className="vds-date-range-picker-content"
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
              setDraftRange(toCompleteRange(state.value));
              setMobileView("date");
            }
            state.setOpen(open);
          }}
          title={
            mobileView === "start-time"
              ? "Start time"
              : mobileView === "end-time"
                ? "End time"
                : label ?? "Select range"
          }
          presentation={resolvedOverlayMode}
          sizeMode={mobileSizeMode}
          bodyClassName="vds-date-range-picker-mobile-body"
          leadingAction={mobileView !== "date" ? (
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
          {mobileView === "start-time" || mobileView === "end-time" ? (
            <div className="vds-date-range-picker-mobile-panel vds-date-range-picker-mobile-time-panel">
              <div className="vds-time-picker-panel vds-time-picker-panel--embedded">
              <TimePickerEditor
                value={mobileView === "start-time" ? draftStartTime : draftEndTime}
                onChange={(value) => draftState.setTime(mobileView === "start-time" ? "start" : "end", value)}
                hourCycle={props.hourCycle}
                granularity={timeGranularity}
                showMilliseconds={props.showMilliseconds}
                millisecondStep={props.millisecondStep ?? 10}
              />
              </div>
            </div>
          ) : (
            <div className="vds-date-range-picker-mobile-panel">
              <div className="vds-date-range-picker-content-inner">
                {renderedPresets ? (
                  <div className="vds-date-range-picker-presets">{renderedPresets}</div>
                ) : null}
                <div
                  className="vds-date-range-picker-main"
                  data-layout="stack"
                  data-has-time={state.hasTime ? "true" : undefined}
                >
                  <RangeCalendar
                    value={toCompleteRange(draftState.dateRange)}
                    onChange={draftState.setDateRange}
                    minValue={props.minValue ?? null}
                    maxValue={props.maxValue ?? null}
                    isDateUnavailable={props.isDateUnavailable}
                    isDisabled={props.isDisabled}
                    isReadOnly={props.isReadOnly}
                  allowsNonContiguousRanges={props.allowsNonContiguousRanges}
                  aria-label={props["aria-label"] ?? "Date range calendar"}
                  visibleDuration={{ months: 2 }}
                  pageBehavior="single"
                  size={size}
                  appearance={appearance}
                  invalid={isInvalid}
                  locale={usedLocale}
                  className="vds-date-range-picker-mobile-calendar"
                />
                  {state.hasTime ? (
                    <div className="vds-date-range-picker-time" data-mobile-time-links="true">
                      <Button
                        type="button"
                        color="neutral"
                        variant="soft"
                        fullWidth
                        className="vds-picker-mobile-mode-link"
                        onClick={() => setMobileView("start-time")}
                        disabled={!draftState.dateRange?.start}
                      >
                        <span className="vds-picker-mobile-mode-label">Start time</span>
                        <span className="vds-picker-mobile-mode-value">{startTimeSummary}</span>
                      </Button>
                      <Button
                        type="button"
                        color="neutral"
                        variant="soft"
                        fullWidth
                        className="vds-picker-mobile-mode-link"
                        onClick={() => setMobileView("end-time")}
                        disabled={!draftState.dateRange?.end}
                      >
                        <span className="vds-picker-mobile-mode-label">End time</span>
                        <span className="vds-picker-mobile-mode-value">{endTimeSummary}</span>
                      </Button>
                    </div>
                  ) : null}
                  {footer ? (
                    <div className="vds-date-range-picker-footer">{footer}</div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </MobilePickerSurface>
      ) : null}

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

function toCompleteRange(
  value: { start: DateValue | null; end: DateValue | null } | null | undefined,
): DateRange | null {
  if (!value?.start || !value.end) {
    return null;
  }

  return {
    start: value.start,
    end: value.end,
  };
}
