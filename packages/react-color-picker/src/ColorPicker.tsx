import { Button } from "@virtari-packages/react-button";
import { Input } from "@virtari-packages/react-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@virtari-packages/react-popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@virtari-packages/react-select";
import { Textarea } from "@virtari-packages/react-textarea";
import {
  IconArrowsLeftRight,
  IconCheck,
  IconCircleFilled,
  IconCode,
  IconColorPicker,
  IconCopy,
  IconColorSwatch,
  IconGripVertical,
  IconMinus,
  IconPlus,
  IconRepeat,
} from "@virtari-packages/react-icons";
import { cn } from "@virtari-packages/utils";
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ComponentProps,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type {
  ColorPickerChangeDetail,
  ColorPickerFormat,
  ColorPickerType,
  ColorPickerValue,
  ColorPickerView,
  ColorStop,
  GradientShape,
  HslaColor,
  HsvaColor,
  RgbaColor,
} from "./types";
import {
  addGradientStop,
  clamp,
  convertValueType,
  getActiveColor,
  hslaToRgba,
  hsvaToRgba,
  normalizeColorPickerValue,
  parseColorPickerValue,
  parseColorString,
  removeGradientStop,
  reorderGradientStop,
  rgbaToHexString,
  rgbaToHsla,
  rgbaToHsva,
  round,
  serializeColorPickerValue,
  updateActiveColor,
  updateStopById,
  updateStopPosition,
} from "./color-utils";
import { useControllableState } from "./useControllableState";

declare global {
  interface EyeDropper {
    open(): Promise<{ sRGBHex: string }>;
  }

  interface Window {
    EyeDropper?: {
      new (): EyeDropper;
    };
  }
}

const DEFAULT_SWATCHES: string[] = [];

export type ColorPickerMode = "solid" | "gradient" | "both";

/**
 * Surface treatment for the picker root.
 * - `card`     — solid background + 1px border (default; drops into any layout)
 * - `flat`     — transparent background, no border, zero padding (for embedding)
 * - `floating` — solid background + soft shadow + stronger border (popover/floating)
 */
export type ColorPickerAppearance = "card" | "flat" | "floating";

const TYPE_OPTIONS: Array<{ type: ColorPickerType; label: string }> = [
  { type: "solid", label: "Solid" },
  { type: "linear", label: "Linear" },
  { type: "radial", label: "Radial" },
  { type: "conic", label: "Angular" },
];

const MODE_OPTIONS = [
  { mode: "solid", label: "Solid", icon: IconCircleFilled },
  { mode: "gradient", label: "Gradient", icon: IconColorSwatch },
] as const;

const FORMAT_OPTIONS: Array<{ format: ColorPickerFormat; label: string }> = [
  { format: "hex", label: "HEX" },
  { format: "rgb", label: "RGB" },
  { format: "hsl", label: "HSL" },
  { format: "hsb", label: "HSB" },
];

const SHAPE_OPTIONS: Array<{ shape: GradientShape; label: string }> = [
  { shape: "circle", label: "Circle" },
  { shape: "ellipse", label: "Ellipse" },
];

interface FieldDescriptor {
  label: string;
  value: string;
  unit?: string;
  inputMode: "text" | "decimal";
  min?: number;
  max?: number;
  wide?: boolean;
}

type InternalMode = (typeof MODE_OPTIONS)[number]["mode"];

interface SliderControlProps {
  ariaLabel: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  background: string;
  className?: string;
  onChange: (value: number) => void;
}

interface ActiveStopSnapshot {
  position: number;
  color: RgbaColor;
}

function toFiniteNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

function safeRound(value: number, precision = 0, fallback = 0) {
  return round(toFiniteNumber(value, fallback), precision);
}

function getStopSnapshot(stop: ColorStop | null | undefined): ActiveStopSnapshot | null {
  if (!stop) return null;
  return {
    position: toFiniteNumber(stop.position, 0),
    color: { ...stop.color },
  };
}

function getBestMatchingStopId(
  stops: ColorStop[],
  snapshot: ActiveStopSnapshot | null,
): string | null {
  if (!stops.length) return null;
  if (!snapshot) return stops[0]?.id ?? null;

  let bestStop = stops[0] ?? null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const stop of stops) {
    const positionDelta = Math.abs(toFiniteNumber(stop.position, 0) - snapshot.position);
    const colorDelta =
      Math.abs(stop.color.r - snapshot.color.r) +
      Math.abs(stop.color.g - snapshot.color.g) +
      Math.abs(stop.color.b - snapshot.color.b) +
      (Math.abs(stop.color.a - snapshot.color.a) * 255);
    const score = positionDelta * 4 + colorDelta / 12;

    if (score < bestScore) {
      bestScore = score;
      bestStop = stop;
    }
  }

  return bestStop?.id ?? null;
}

export interface ColorPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  value?: string | ColorPickerValue;
  defaultValue?: string | ColorPickerValue;
  onValueChange?: (cssValue: string, detail: ColorPickerChangeDetail) => void;
  format?: ColorPickerFormat;
  defaultFormat?: ColorPickerFormat;
  onFormatChange?: (format: ColorPickerFormat) => void;
  view?: ColorPickerView;
  defaultView?: ColorPickerView;
  onViewChange?: (view: ColorPickerView) => void;
  /**
   * Restricts which kinds of color the picker exposes:
   * - `"solid"`     → only solid colors
   * - `"gradient"`  → only gradient (linear/radial/conic)
   * - `"both"`      → renders a Solid/Gradient switcher (default)
   */
  mode?: ColorPickerMode;
  /** Fine-grained whitelist of gradient sub-types. Falls back to all when omitted. */
  allowedTypes?: ColorPickerType[];
  allowAlpha?: boolean;
  allowEyedropper?: boolean;
  showCodeView?: boolean;
  swatches?: string[];
  disabled?: boolean;
  /** Visual chrome of the picker root. Defaults to `"card"`. */
  appearance?: ColorPickerAppearance;
}

function SliderControl({
  ariaLabel,
  value,
  min,
  max,
  step = 1,
  disabled,
  background,
  className,
  onChange,
}: SliderControlProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const safeValue = toFiniteNumber(value, min);
  const percent = max === min ? 0 : ((safeValue - min) / (max - min)) * 100;

  function updateFromClientX(clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const next = min + ratio * (max - min);
    const stepped = Math.round(next / step) * step;
    onChange(clamp(stepped, min, max));
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) return;
    event.preventDefault();
    updateFromClientX(event.clientX);

    const move = (nativeEvent: PointerEvent) => updateFromClientX(nativeEvent.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    let delta = 0;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") delta = -step;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") delta = step;
    if (event.key === "PageDown") delta = -step * 10;
    if (event.key === "PageUp") delta = step * 10;
    if (event.key === "Home") {
      event.preventDefault();
      onChange(min);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      onChange(max);
      return;
    }
    if (!delta) return;
    event.preventDefault();
    onChange(clamp(round(value + delta, 4), min, max));
  }

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={safeRound(safeValue, 2, min)}
      className={cn("vds-color-picker-slider", className)}
      data-disabled={disabled ? "true" : undefined}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
    >
      <span className="vds-color-picker-slider-track" style={{ background }} />
      <span
        className="vds-color-picker-slider-thumb"
        style={{ insetInlineStart: `${toFiniteNumber(percent, 0)}%` }}
      />
    </div>
  );
}

interface PickerButtonProps extends ComponentProps<typeof Button> {
  active?: boolean;
  iconOnly?: boolean;
}

function PickerButton({
  active,
  iconOnly = false,
  size,
  variant,
  color,
  className,
  type,
  ...props
}: PickerButtonProps) {
  return (
    <Button
      type={type ?? "button"}
      size={size ?? "xs"}
      variant={variant ?? (active ? "soft" : "ghost")}
      color={color ?? (active ? "primary" : "contrast")}
      className={cn(
        "vds-color-picker-button",
        iconOnly && "vds-color-picker-button--icon",
        className,
      )}
      {...props}
    />
  );
}

interface NumberFieldProps extends Omit<ComponentProps<typeof Input>, "onChange" | "value"> {
  value: string;
  min?: number;
  max?: number;
  step?: number;
  /** Called with the raw string the user produced (typed or scrubbed). */
  onValueChange: (raw: string) => void;
}

/**
 * Number-style input built on the design-system Input that:
 *  - keeps `type="text"` + `inputMode="decimal"` (no native spinner ugliness)
 *  - increments / decrements on mouse wheel while focused (Shift = ×10)
 */
function NumberField({
  value,
  min,
  max,
  step = 1,
  onValueChange,
  inputSize = "xs",
  className,
  onWheel,
  onKeyDown,
  ...props
}: NumberFieldProps) {
  const ref = useRef<HTMLInputElement>(null);

  // Native wheel listener (passive=false so we can preventDefault).
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handler = (event: WheelEvent) => {
      if (document.activeElement !== node) return;
      const current = Number.parseFloat(node.value);
      if (!Number.isFinite(current)) return;
      event.preventDefault();
      const magnitude = event.shiftKey ? step * 10 : event.altKey ? step / 10 : step;
      const direction = event.deltaY < 0 ? 1 : -1;
      let next = current + magnitude * direction;
      if (typeof min === "number") next = Math.max(min, next);
      if (typeof max === "number") next = Math.min(max, next);
      const precision = magnitude < 1 ? 2 : 0;
      onValueChange(String(round(next, precision)));
    };
    node.addEventListener("wheel", handler, { passive: false });
    return () => node.removeEventListener("wheel", handler);
  }, [max, min, onValueChange, step]);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    const current = Number.parseFloat(event.currentTarget.value);
    if (!Number.isFinite(current)) return;
    event.preventDefault();
    const magnitude = event.shiftKey ? step * 10 : step;
    const direction = event.key === "ArrowUp" ? 1 : -1;
    let next = current + magnitude * direction;
    if (typeof min === "number") next = Math.max(min, next);
    if (typeof max === "number") next = Math.min(max, next);
    onValueChange(String(round(next, 0)));
  }

  return (
    <Input
      ref={ref}
      inputSize={inputSize}
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(event) => onValueChange(event.currentTarget.value)}
      onKeyDown={handleKeyDown}
      onWheel={onWheel}
      className={cn("vds-color-picker-input", className)}
      {...props}
    />
  );
}

function HexField({
  value,
  className,
  inputSize = "xs",
  onValueChange,
  ...props
}: Omit<ComponentProps<typeof Input>, "onChange" | "value"> & {
  value: string;
  onValueChange: (raw: string) => void;
}) {
  return (
    <Input
      inputSize={inputSize}
      type="text"
      value={value}
      onChange={(event) => onValueChange(event.currentTarget.value)}
      className={cn("vds-color-picker-input vds-color-picker-input--hex", className)}
      {...props}
    />
  );
}

function PickerTextarea({
  inputSize = "sm",
  className,
  ...props
}: ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      inputSize={inputSize}
      className={cn("vds-color-picker-textarea", className)}
      {...props}
    />
  );
}

/* ── Solid editor (saturation + hue/alpha + value bar) ───── */

interface SolidEditorProps {
  color: RgbaColor;
  format: ColorPickerFormat;
  onFormatChange: (format: ColorPickerFormat) => void;
  onColorChange: (next: RgbaColor) => void;
  allowAlpha?: boolean;
  allowEyedropper?: boolean;
  disabled?: boolean;
  /** Compact = smaller saturation square (used inside the per-stop popover). */
  compact?: boolean;
}

function SolidEditor({
  color,
  format,
  onFormatChange,
  onColorChange,
  allowAlpha = true,
  allowEyedropper = true,
  disabled,
  compact = false,
}: SolidEditorProps) {
  const saturationRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const hsva = rgbaToHsva(color);
  const hsla = rgbaToHsla(color);
  const fields = getFieldDescriptors(color, format);
  const eyeDropperSupported =
    allowEyedropper && typeof window !== "undefined" && typeof window.EyeDropper === "function";

  const saturationStyle = {
    "--vds-color-picker-hue": `${hsva.h}deg`,
  } as CSSProperties;

  function handleSaturationPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled) return;
    event.preventDefault();

    const update = (clientX: number, clientY: number) => {
      const rect = saturationRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nextS = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      const nextV = clamp(100 - ((clientY - rect.top) / rect.height) * 100, 0, 100);
      onColorChange(hsvaToRgba({ ...hsva, s: nextS, v: nextV }));
    };

    update(event.clientX, event.clientY);
    const move = (e: PointerEvent) => update(e.clientX, e.clientY);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
  }

  function handleSaturationKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    let next: HsvaColor | null = null;
    if (event.key === "ArrowLeft") next = { ...hsva, s: clamp(hsva.s - 1, 0, 100) };
    if (event.key === "ArrowRight") next = { ...hsva, s: clamp(hsva.s + 1, 0, 100) };
    if (event.key === "ArrowDown") next = { ...hsva, v: clamp(hsva.v - 1, 0, 100) };
    if (event.key === "ArrowUp") next = { ...hsva, v: clamp(hsva.v + 1, 0, 100) };
    if (!next) return;
    event.preventDefault();
    onColorChange(hsvaToRgba(next));
  }

  async function handleEyeDropper() {
    if (!eyeDropperSupported || disabled) return;
    try {
      const eyeDropper = new window.EyeDropper!();
      const result = await eyeDropper.open();
      const next = parseColorString(result.sRGBHex);
      if (!next) return;
      onColorChange(allowAlpha ? next : { ...next, a: 1 });
    } catch {
      // user cancelled
    }
  }

  function handleFieldChange(index: number, raw: string) {
    if (disabled) return;
    if (format === "hex") {
      if (index === 0) {
        const parsed = parseColorString(raw.startsWith("#") ? raw : `#${raw}`);
        if (parsed) {
          // 6-digit hex (#RRGGBB) carries no alpha — parsed.a is always 1.
          // Preserve the user's existing alpha unless they typed an explicit
          // 8-digit hex (#RRGGBBAA) where they meant to set it.
          const trimmed = raw.trim().replace(/^#/, "");
          const isExplicitAlphaHex = /^[0-9a-f]{8}$/i.test(trimmed);
          const nextAlpha = !allowAlpha
            ? color.a
            : isExplicitAlphaHex
              ? parsed.a
              : color.a;
          onColorChange({ ...parsed, a: nextAlpha });
        }
        return;
      }
      const alpha = Number.parseFloat(raw);
      if (!Number.isFinite(alpha)) return;
      onColorChange({ ...color, a: clamp(alpha / 100, 0, 1) });
      return;
    }
    if (format === "rgb") {
      const next = Number.parseFloat(raw);
      if (!Number.isFinite(next)) return;
      const draft = { ...color };
      if (index === 0) draft.r = clamp(next, 0, 255);
      if (index === 1) draft.g = clamp(next, 0, 255);
      if (index === 2) draft.b = clamp(next, 0, 255);
      if (index === 3) draft.a = clamp(next / 100, 0, 1);
      onColorChange(draft);
      return;
    }
    if (format === "hsl") {
      const next = Number.parseFloat(raw);
      if (!Number.isFinite(next)) return;
      const draft: HslaColor = { ...hsla };
      if (index === 0) draft.h = next;
      if (index === 1) draft.s = clamp(next, 0, 100);
      if (index === 2) draft.l = clamp(next, 0, 100);
      if (index === 3) draft.a = clamp(next / 100, 0, 1);
      onColorChange(hslaToRgba(draft));
      return;
    }
    const next = Number.parseFloat(raw);
    if (!Number.isFinite(next)) return;
    const draft: HsvaColor = { ...hsva };
    if (index === 0) draft.h = next;
    if (index === 1) draft.s = clamp(next, 0, 100);
    if (index === 2) draft.v = clamp(next, 0, 100);
    if (index === 3) draft.a = clamp(next / 100, 0, 1);
    onColorChange(hsvaToRgba(draft));
  }

  return (
    <div
      className={cn("vds-color-picker-solid-editor", compact && "vds-color-picker-solid-editor--compact")}
    >
      <div
        ref={saturationRef}
        role="application"
        tabIndex={disabled ? -1 : 0}
        aria-label="Saturation and brightness"
        aria-describedby={labelId}
        className="vds-color-picker-saturation"
        style={saturationStyle}
        onPointerDown={handleSaturationPointerDown}
        onKeyDown={handleSaturationKeyDown}
      >
        <span
          className="vds-color-picker-saturation-thumb"
          style={{
            insetInlineStart: `${toFiniteNumber(hsva.s, 0)}%`,
            insetBlockStart: `${toFiniteNumber(100 - hsva.v, 0)}%`,
          }}
        />
      </div>
      <span id={labelId} className="vds-color-picker-sr-only">
        Use arrow keys to adjust saturation and brightness.
      </span>

      <div className="vds-color-picker-slider-stack">
        <div className="vds-color-picker-slider-row">
          {eyeDropperSupported ? (
            <PickerButton
              iconOnly
              className="vds-color-picker-slider-action"
              aria-label="Pick color from screen"
              onClick={handleEyeDropper}
              disabled={disabled}
              leftSection={<IconColorPicker size={16} stroke={1.75} aria-hidden="true" />}
            />
          ) : (
            <span className="vds-color-picker-slider-spacer" aria-hidden="true" />
          )}
          <SliderControl
            ariaLabel="Hue"
            value={hsva.h}
            min={0}
            max={360}
            step={1}
            disabled={disabled}
            background="linear-gradient(90deg, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)"
            onChange={(nextHue) => onColorChange(hsvaToRgba({ ...hsva, h: nextHue }))}
          />
        </div>

        {allowAlpha ? (
          <div className="vds-color-picker-slider-row">
            <span className="vds-color-picker-slider-spacer" aria-hidden="true" />
            <SliderControl
              ariaLabel="Alpha"
              className="vds-color-picker-slider--alpha"
              value={color.a * 100}
              min={0}
              max={100}
              step={1}
              disabled={disabled}
              background={`linear-gradient(90deg, rgba(${color.r}, ${color.g}, ${color.b}, 0) 0%, rgba(${color.r}, ${color.g}, ${color.b}, 1) 100%)`}
              onChange={(nextAlpha) => onColorChange({ ...color, a: nextAlpha / 100 })}
            />
          </div>
        ) : null}
      </div>

      <div className="vds-color-picker-value-bar">
        <Select
          value={format}
          onValueChange={(nextValue) => onFormatChange(nextValue as ColorPickerFormat)}
          disabled={disabled}
        >
          <SelectTrigger
            size="xs"
            appearance="soft"
            className="vds-color-picker-format-select"
            aria-label="Color format"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent size="xs">
            {FORMAT_OPTIONS.map((option) => (
              <SelectItem key={option.format} value={option.format}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="vds-color-picker-value-fields" data-format={format}>
          {fields.map((field, index) => (
            <div
              key={`${field.label}-${index}`}
              className="vds-color-picker-value-field"
              data-wide={field.wide ? "true" : undefined}
            >
              <span className="vds-color-picker-sr-only">{field.label}</span>
              <span
                className="vds-color-picker-field-input-wrap"
                data-has-prefix={field.label === "Hex" ? "true" : undefined}
              >
                {field.label === "Hex" ? (
                  <span className="vds-color-picker-field-prefix">#</span>
                ) : null}
                {field.inputMode === "text" ? (
                  <HexField
                    className="vds-color-picker-value-input"
                    value={field.value}
                    aria-label={field.label}
                    onValueChange={(raw) => handleFieldChange(index, raw)}
                    disabled={disabled}
                  />
                ) : (
                  <NumberField
                    className="vds-color-picker-value-input"
                    value={field.value}
                    min={field.min}
                    max={field.max}
                    aria-label={field.label}
                    onValueChange={(raw) => handleFieldChange(index, raw)}
                    disabled={disabled || (!allowAlpha && field.label === "A")}
                  />
                )}
                {field.unit ? (
                  <span className="vds-color-picker-field-unit">{field.unit}</span>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Top-level ColorPicker ────────────────────────────── */

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  {
    value,
    defaultValue,
    onValueChange,
    format,
    defaultFormat = "hsl",
    onFormatChange,
    view,
    defaultView = "visual",
    onViewChange,
    mode = "both",
    allowedTypes,
    allowAlpha = true,
    allowEyedropper = true,
    showCodeView = true,
    swatches = DEFAULT_SWATCHES,
    appearance = "card",
    className,
    disabled,
    ...props
  },
  forwardedRef,
) {
  /**
   * When the parent echoes our own emit back to us as a controlled `value`
   * string, re-parsing it through `normalizeColorPickerValue` would generate
   * brand-new stop IDs. React would then unmount and remount every stop
   * handle on every keystroke (e.g. while editing the gradient angle),
   * re-firing the @starting-style mount animation — which looks like new
   * stops are being created on every keystroke. The ref below caches the
   * exact CSS string + ColorPickerValue pair we last emitted so that when
   * the parent simply hands it back, we can reuse the original (ID-stable)
   * value object and skip the expensive (and identity-destroying) reparse.
   */
  const lastEmittedRef = useRef<{ css: string; value: ColorPickerValue } | null>(null);

  const normalizedControlledValue = useMemo(() => {
    if (value === undefined) return undefined;
    if (typeof value === "string" && lastEmittedRef.current?.css === value) {
      return lastEmittedRef.current.value;
    }
    if (typeof value !== "string") {
      // Object value — caller has full control over IDs, no caching needed.
      return normalizeColorPickerValue(value);
    }
    return normalizeColorPickerValue(value);
  }, [value]);
  const initialValue = useMemo(
    () =>
      normalizeColorPickerValue(
        value ??
          defaultValue ??
          (mode === "gradient"
            ? "linear-gradient(90deg, #d9d9d9 0%, #737373 100%)"
            : "#ffffff"),
      ),
    [defaultValue, mode, value],
  );
  const [currentValue, setCurrentValue] = useControllableState<ColorPickerValue>({
    value: normalizedControlledValue,
    defaultValue: initialValue,
  });
  const [currentFormat, setCurrentFormat] = useControllableState<ColorPickerFormat>({
    value: format,
    defaultValue: defaultFormat,
    onChange: onFormatChange,
  });
  const [currentView, setCurrentView] = useControllableState<ColorPickerView>({
    value: view,
    defaultValue: defaultView,
    onChange: onViewChange,
  });
  const [activeStopId, setActiveStopId] = useState<string | null>(() =>
    initialValue.type !== "solid" ? initialValue.stops[0]?.id ?? null : null,
  );
  const [openStopId, setOpenStopId] = useState<string | null>(null);
  const [draggingStopId, setDraggingStopId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{ id: string; slot: "before" | "after" } | null>(null);
  const [codeDraft, setCodeDraft] = useState(() => serializeColorPickerValue(initialValue));
  const [codeError, setCodeError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const gradientTrackRef = useRef<HTMLDivElement>(null);
  const activeStopSnapshotRef = useRef<ActiveStopSnapshot | null>(null);
  const lastGradientTypeRef = useRef<Exclude<ColorPickerType, "solid">>(
    initialValue.type === "solid" ? "linear" : initialValue.type,
  );
  const lastGradientValueRef = useRef<ColorPickerValue | null>(
    initialValue.type === "solid" ? null : initialValue,
  );
  const inlineId = useId();

  const allowedFromMode: ColorPickerType[] =
    mode === "solid"
      ? ["solid"]
      : mode === "gradient"
        ? ["linear", "radial", "conic"]
        : ["solid", "linear", "radial", "conic"];
  const effectiveTypes = (allowedTypes?.length ? allowedTypes : allowedFromMode).filter(
    (type, index, list) => allowedFromMode.includes(type) && list.indexOf(type) === index,
  );

  const gradientTypeOptions = TYPE_OPTIONS.filter(
    (option) => option.type !== "solid" && effectiveTypes.includes(option.type),
  ) as Array<{ type: Exclude<ColorPickerType, "solid">; label: string }>;
  const showModeStrip =
    mode === "both" && effectiveTypes.includes("solid") && gradientTypeOptions.length > 0;

  const activeType = currentValue.type;
  const activeColor = getActiveColor(currentValue, activeStopId);
  const cssValue = serializeColorPickerValue(currentValue);
  const internalMode: InternalMode = activeType === "solid" ? "solid" : "gradient";
  const eyeDropperSupported =
    allowEyedropper && typeof window !== "undefined" && typeof window.EyeDropper === "function";
  const swatchColors = swatches
    .map((swatch) => parseColorString(swatch))
    .filter((swatch): swatch is RgbaColor => swatch != null);
  const gradientStops = currentValue.type === "solid" ? [] : currentValue.stops;

  useEffect(() => {
    if (currentValue.type === "solid") {
      activeStopSnapshotRef.current = null;
      if (activeStopId != null) setActiveStopId(null);
      return;
    }
    lastGradientTypeRef.current = currentValue.type;
    lastGradientValueRef.current = currentValue;
    const activeStop = currentValue.stops.find((stop) => stop.id === activeStopId) ?? null;
    if (activeStop) {
      activeStopSnapshotRef.current = getStopSnapshot(activeStop);
      return;
    }
    const fallbackStopId = getBestMatchingStopId(
      currentValue.stops,
      activeStopSnapshotRef.current,
    );
    if (fallbackStopId !== activeStopId) {
      setActiveStopId(fallbackStopId);
    }
  }, [activeStopId, currentValue]);

  useEffect(() => {
    setCodeDraft(cssValue);
  }, [cssValue]);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  function emitValue(nextValue: ColorPickerValue, nextActiveStopId = activeStopId) {
    if (nextValue.type === "solid") {
      activeStopSnapshotRef.current = null;
    } else {
      const resolvedStop =
        nextValue.stops.find((stop) => stop.id === nextActiveStopId) ?? nextValue.stops[0] ?? null;
      activeStopSnapshotRef.current = getStopSnapshot(resolvedStop);
    }
    const cssValue = serializeColorPickerValue(nextValue);
    // Cache before notifying the parent so the controlled-value memo can
    // skip the round-trip reparse on the next render. Without this, the
    // parser would re-issue stop IDs and force every stop handle to remount.
    lastEmittedRef.current = { css: cssValue, value: nextValue };
    setCurrentValue(nextValue);
    const detail: ColorPickerChangeDetail = {
      value: nextValue,
      cssValue,
      activeColor: getActiveColor(nextValue, nextActiveStopId),
      format: currentFormat,
    };
    onValueChange?.(cssValue, detail);
  }

  function applyActiveColor(nextColor: RgbaColor) {
    emitValue(updateActiveColor(currentValue, nextColor, activeStopId));
  }

  function applyStopColor(stopId: string, nextColor: RgbaColor) {
    if (currentValue.type === "solid") return;
    emitValue(updateStopById(currentValue, stopId, { color: nextColor }), stopId);
  }

  function handleTypeChange(nextType: ColorPickerType) {
    if (disabled || activeType === nextType) return;
    const nextValue = convertValueType(currentValue, nextType, activeStopId);
    const nextStop = nextValue.type === "solid" ? null : nextValue.stops[0]?.id ?? null;
    setActiveStopId(nextStop);
    emitValue(nextValue, nextStop);
  }

  function handleModeChange(nextMode: InternalMode) {
    if (disabled || nextMode === internalMode) return;
    if (nextMode === "solid") {
      handleTypeChange("solid");
      return;
    }
    const fallbackType =
      gradientTypeOptions.find((option) => option.type === lastGradientTypeRef.current)?.type ??
      gradientTypeOptions[0]?.type;
    if (!fallbackType) return;

    const savedGradient = lastGradientValueRef.current;
    if (savedGradient && savedGradient.type !== "solid") {
      const restored =
        savedGradient.type === fallbackType
          ? savedGradient
          : convertValueType(savedGradient, fallbackType, savedGradient.stops[0]?.id ?? null);
      if (restored.type === "solid") {
        handleTypeChange(fallbackType);
        return;
      }
      const nextStop = restored.stops[0]?.id ?? null;
      setActiveStopId(nextStop);
      emitValue(restored, nextStop);
      return;
    }
    handleTypeChange(fallbackType);
  }

  function handleGradientTrackPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (disabled || currentValue.type === "solid") return;
    if ((event.target as HTMLElement).closest("[data-stop-handle]")) return;
    const rect = gradientTrackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const position = ((event.clientX - rect.left) / rect.width) * 100;
    const result = addGradientStop(currentValue, position);
    if (!result.stopId) return;
    setActiveStopId(result.stopId);
    emitValue(result.value, result.stopId);
  }

  function handleStopPointerDown(stopId: string, event: ReactPointerEvent<HTMLButtonElement>) {
    if (disabled || currentValue.type === "solid") return;
    event.preventDefault();
    setActiveStopId(stopId);

    let moved = false;
    const startX = event.clientX;
    const update = (clientX: number) => {
      const rect = gradientTrackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const position = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      emitValue(updateStopPosition(currentValue, stopId, position), stopId);
    };

    const move = (e: PointerEvent) => {
      if (Math.abs(e.clientX - startX) > 2) moved = true;
      if (moved) update(e.clientX);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
  }

  function handleStopKeyDown(stop: ColorStop, event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled || currentValue.type === "solid") return;
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      if (currentValue.stops.length <= 2) return;
      const index = currentValue.stops.findIndex((item) => item.id === stop.id);
      const fallback = currentValue.stops[index - 1] ?? currentValue.stops[index + 1] ?? null;
      const nextValue = removeGradientStop(currentValue, stop.id);
      setActiveStopId(fallback?.id ?? null);
      emitValue(nextValue, fallback?.id ?? null);
      return;
    }
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const delta = event.shiftKey ? 5 : 1;
    const nextPosition = stop.position + (event.key === "ArrowRight" ? delta : -delta);
    emitValue(updateStopPosition(currentValue, stop.id, nextPosition), stop.id);
  }

  async function handleCopyCss() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(cssValue);
    setCopied(true);
  }

  function handleCodeApply() {
    const parsed = parseColorPickerValue(codeDraft);
    if (!parsed) {
      setCodeError("Enter a valid CSS color or gradient.");
      return;
    }
    setCodeError(null);
    const nextStop = parsed.type === "solid" ? null : parsed.stops[0]?.id ?? null;
    setActiveStopId(nextStop);
    emitValue(parsed, nextStop);
    // Return to the visual editor automatically — the user just committed
    // their CSS, so the next thing they want is to fine-tune it visually.
    setCurrentView("visual");
  }

  function handleGradientMetaChange(
    next: Partial<Record<"angle" | "centerX" | "centerY", number>> & {
      repeating?: boolean;
      shape?: GradientShape;
    },
  ) {
    if (disabled || currentValue.type === "solid") return;
    emitValue({ ...currentValue, ...next });
  }

  function handleStopRowChange(stopId: string, field: "position" | "hex" | "alpha", raw: string) {
    if (disabled || currentValue.type === "solid") return;
    if (field === "position") {
      const next = Number.parseFloat(raw);
      if (Number.isFinite(next))
        emitValue(updateStopById(currentValue, stopId, { position: next }), stopId);
      return;
    }
    if (field === "hex") {
      const color = parseColorString(raw.startsWith("#") ? raw : `#${raw}`);
      if (color) emitValue(updateStopById(currentValue, stopId, { color }), stopId);
      return;
    }
    const alpha = Number.parseFloat(raw);
    if (!Number.isFinite(alpha)) return;
    const stopColor = currentValue.stops.find((stop) => stop.id === stopId)?.color;
    if (!stopColor) return;
    emitValue(
      updateStopById(currentValue, stopId, {
        color: { ...stopColor, a: clamp(alpha / 100, 0, 1) },
      }),
      stopId,
    );
  }

  function handleRemoveStop(stopId: string) {
    if (disabled || currentValue.type === "solid" || currentValue.stops.length <= 2) return;
    const index = currentValue.stops.findIndex((stop) => stop.id === stopId);
    const fallback = currentValue.stops[index - 1] ?? currentValue.stops[index + 1] ?? null;
    const nextValue = removeGradientStop(currentValue, stopId);
    setActiveStopId(fallback?.id ?? null);
    emitValue(nextValue, fallback?.id ?? null);
  }

  function handleReverseStops() {
    if (disabled || currentValue.type === "solid") return;
    const reversed = [...currentValue.stops]
      .map((stop) => ({ ...stop, position: 100 - stop.position }))
      .sort((a, b) => a.position - b.position);
    emitValue({ ...currentValue, stops: reversed }, activeStopId);
  }

  const showHeader = showModeStrip || showCodeView;
  const isGradient = currentValue.type !== "solid";

  return (
    <div
      ref={forwardedRef}
      className={cn("vds-color-picker", className)}
      data-mode={isGradient ? "gradient" : "solid"}
      data-appearance={appearance}
      data-view={currentView}
      data-disabled={disabled ? "true" : undefined}
      {...props}
    >
      {showHeader ? (
        <div className="vds-color-picker-header">
          {showModeStrip ? (
            <div className="vds-color-picker-mode-strip" role="tablist" aria-label="Picker mode">
              {MODE_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isActive = internalMode === option.mode;
                return (
                  <PickerButton
                    key={option.mode}
                    iconOnly
                    active={isActive}
                    aria-pressed={isActive}
                    aria-label={option.label}
                    onClick={() => handleModeChange(option.mode)}
                    disabled={disabled}
                    leftSection={<Icon size={16} stroke={1.75} aria-hidden="true" />}
                  />
                );
              })}
            </div>
          ) : (
            <span aria-hidden="true" />
          )}

          {showCodeView ? (
            <div className="vds-color-picker-header-actions">
              <PickerButton
                iconOnly
                active={currentView === "code"}
                aria-pressed={currentView === "code"}
                aria-label="Toggle code mode"
                onClick={() => setCurrentView(currentView === "code" ? "visual" : "code")}
                disabled={disabled}
                leftSection={<IconCode size={16} stroke={1.75} aria-hidden="true" />}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {currentView === "code" && showCodeView ? (
        <div
          className="vds-color-picker-code-preview"
          aria-label="Current value preview"
          style={{ background: cssValue }}
        />
      ) : null}

      {currentView !== "code" && !isGradient ? (
        <SolidEditor
          color={activeColor}
          format={currentFormat}
          onFormatChange={setCurrentFormat}
          onColorChange={applyActiveColor}
          allowAlpha={allowAlpha}
          allowEyedropper={eyeDropperSupported}
          disabled={disabled}
        />
      ) : currentView !== "code" && isGradient ? (
        <div className="vds-color-picker-gradient-section">
          <div className="vds-color-picker-gradient-topbar">
            <Select
              value={currentValue.type}
              onValueChange={(nextValue) => handleTypeChange(nextValue as ColorPickerType)}
              disabled={disabled}
            >
              <SelectTrigger
                size="xs"
                appearance="soft"
                className="vds-color-picker-select-trigger"
                aria-label="Gradient type"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent size="xs">
                {gradientTypeOptions.map((option) => (
                  <SelectItem key={option.type} value={option.type}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="vds-color-picker-gradient-actions">
              <PickerButton
                iconOnly
                aria-label="Reverse gradient stops"
                onClick={handleReverseStops}
                disabled={disabled}
                leftSection={<IconArrowsLeftRight size={16} stroke={1.75} aria-hidden="true" />}
              />
              {"angle" in currentValue ? (
                <label
                  className="vds-color-picker-inline-chip"
                  htmlFor={`${inlineId}-angle`}
                >
                  <NumberField
                    id={`${inlineId}-angle`}
                    className="vds-color-picker-inline-input"
                    value={String(safeRound(currentValue.angle, 0))}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={(raw) =>
                      handleGradientMetaChange({ angle: Number.parseFloat(raw) || 0 })
                    }
                    disabled={disabled}
                    aria-label="Gradient angle"
                  />
                  <span className="vds-color-picker-inline-unit">°</span>
                </label>
              ) : (
                <PickerButton
                  iconOnly
                  active={currentValue.repeating}
                  aria-pressed={currentValue.repeating}
                  aria-label="Toggle repeating gradient"
                  onClick={() => handleGradientMetaChange({ repeating: !currentValue.repeating })}
                  disabled={disabled}
                  leftSection={<IconRepeat size={16} stroke={1.75} aria-hidden="true" />}
                />
              )}
            </div>
          </div>

          <div
            ref={gradientTrackRef}
            className="vds-color-picker-gradient-track"
            style={{ background: cssValue }}
            onPointerDown={handleGradientTrackPointerDown}
          >
            {gradientStops.map((stop) => (
              <button
                key={stop.id}
                type="button"
                data-stop-handle
                className="vds-color-picker-stop"
                data-active={stop.id === activeStopId ? "true" : undefined}
                style={{
                  insetInlineStart: `${toFiniteNumber(stop.position, 0)}%`,
                  "--vds-color-picker-stop-color": rgbaToHexString(stop.color, stop.color.a < 1),
                } as CSSProperties}
                aria-label={`Gradient stop at ${safeRound(stop.position, 1)} percent`}
                onClick={() => {
                  setActiveStopId(stop.id);
                  setOpenStopId(stop.id);
                }}
                onPointerDown={(event) => handleStopPointerDown(stop.id, event)}
                onKeyDown={(event) => handleStopKeyDown(stop, event)}
                disabled={disabled}
              >
                <span className="vds-color-picker-stop-swatch" />
              </button>
            ))}
          </div>

          <div className="vds-color-picker-stop-list">
            <div className="vds-color-picker-stop-list-header">
              <span>Stops</span>
              <PickerButton
                iconOnly
                aria-label="Add gradient stop"
                onClick={() => {
                  const result = addGradientStop(currentValue, 50);
                  if (!result.stopId) return;
                  setActiveStopId(result.stopId);
                  emitValue(result.value, result.stopId);
                }}
                disabled={disabled}
                leftSection={<IconPlus size={14} stroke={2} aria-hidden="true" />}
              />
            </div>
            {gradientStops.map((stop) => (
              <div
                key={stop.id}
                className="vds-color-picker-stop-row"
                data-active={stop.id === activeStopId ? "true" : undefined}
                data-dragging={draggingStopId === stop.id ? "true" : undefined}
                data-drop-target={dropTarget?.id === stop.id ? dropTarget.slot : undefined}
                onClick={() => setActiveStopId(stop.id)}
                onDragOver={(event) => {
                  if (!draggingStopId || draggingStopId === stop.id) return;
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                  const rect = event.currentTarget.getBoundingClientRect();
                  const slot = event.clientY < rect.top + rect.height / 2 ? "before" : "after";
                  if (dropTarget?.id !== stop.id || dropTarget.slot !== slot) {
                    setDropTarget({ id: stop.id, slot });
                  }
                }}
                onDragLeave={(event) => {
                  // Only clear when leaving the row (not when entering a child).
                  if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
                  if (dropTarget?.id === stop.id) setDropTarget(null);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  if (!draggingStopId || !dropTarget) return;
                  if (draggingStopId !== stop.id) {
                    emitValue(
                      reorderGradientStop(currentValue, draggingStopId, stop.id, dropTarget.slot),
                      draggingStopId,
                    );
                  }
                  setDropTarget(null);
                  setDraggingStopId(null);
                }}
              >
                <button
                  type="button"
                  className="vds-color-picker-stop-grip"
                  aria-label="Reorder stop — drag to move"
                  draggable={!disabled}
                  onDragStart={(event) => {
                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setData("text/plain", stop.id);
                    setDraggingStopId(stop.id);
                  }}
                  onDragEnd={() => {
                    setDraggingStopId(null);
                    setDropTarget(null);
                  }}
                  disabled={disabled}
                  tabIndex={-1}
                >
                  <IconGripVertical size={14} stroke={1.75} aria-hidden="true" />
                </button>

                <div className="vds-color-picker-stop-cell">
                  <NumberField
                    value={String(safeRound(stop.position, 0))}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(raw) => handleStopRowChange(stop.id, "position", raw)}
                    disabled={disabled}
                    aria-label="Stop position"
                  />
                  <span className="vds-color-picker-stop-cell-suffix" aria-hidden="true">
                    %
                  </span>
                </div>

                <div className="vds-color-picker-stop-hex">
                  <Popover
                    open={openStopId === stop.id}
                    onOpenChange={(next) => {
                      if (next) {
                        setActiveStopId(stop.id);
                        setOpenStopId(stop.id);
                      } else if (openStopId === stop.id) {
                        setOpenStopId(null);
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="vds-color-picker-stop-color-chip"
                        style={{
                          background: rgbaToHexString(stop.color, stop.color.a < 1),
                        }}
                        aria-label="Edit stop color"
                        disabled={disabled}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      side="left"
                      align="start"
                      sideOffset={8}
                      collisionPadding={12}
                      avoidCollisions
                      className="vds-color-picker-popover"
                    >
                      <SolidEditor
                        compact
                        color={stop.color}
                        format={currentFormat}
                        onFormatChange={setCurrentFormat}
                        onColorChange={(next) => applyStopColor(stop.id, next)}
                        allowAlpha={allowAlpha}
                        allowEyedropper={eyeDropperSupported}
                        disabled={disabled}
                      />
                    </PopoverContent>
                  </Popover>
                  <HexField
                    className="vds-color-picker-stop-hex-input"
                    value={rgbaToHexString(stop.color, false).replace(/^#/, "").toUpperCase()}
                    onValueChange={(raw) => handleStopRowChange(stop.id, "hex", raw)}
                    disabled={disabled}
                    aria-label="Stop hex"
                  />
                </div>

                <div className="vds-color-picker-stop-cell">
                  <NumberField
                    value={String(safeRound(stop.color.a * 100, 0))}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(raw) => handleStopRowChange(stop.id, "alpha", raw)}
                    disabled={disabled || !allowAlpha}
                    aria-label="Stop alpha"
                  />
                  <span className="vds-color-picker-stop-cell-suffix" aria-hidden="true">
                    %
                  </span>
                </div>

                <PickerButton
                  iconOnly
                  className="vds-color-picker-stop-row-action"
                  aria-label="Remove stop"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveStop(stop.id);
                  }}
                  disabled={disabled || gradientStops.length <= 2}
                  leftSection={<IconMinus size={14} stroke={2} aria-hidden="true" />}
                />
              </div>
            ))}
          </div>

          {"shape" in currentValue || "centerX" in currentValue ? (
            <div className="vds-color-picker-gradient-meta">
              {"shape" in currentValue ? (
                <Select
                  value={currentValue.shape}
                  onValueChange={(nextValue) =>
                    handleGradientMetaChange({ shape: nextValue as GradientShape })
                  }
                  disabled={disabled}
                >
                  <SelectTrigger
                    size="xs"
                    appearance="soft"
                    className="vds-color-picker-select-trigger"
                    aria-label="Gradient shape"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent size="xs">
                    {SHAPE_OPTIONS.map((option) => (
                      <SelectItem key={option.shape} value={option.shape}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}

              {"centerX" in currentValue ? (
                <>
                  <label
                    className="vds-color-picker-inline-chip"
                    htmlFor={`${inlineId}-center-x`}
                  >
                    <span className="vds-color-picker-inline-label">X</span>
                    <NumberField
                      id={`${inlineId}-center-x`}
                      className="vds-color-picker-inline-input"
                      value={String(safeRound(currentValue.centerX, 0))}
                      min={-100}
                      max={100}
                      onValueChange={(raw) =>
                        handleGradientMetaChange({ centerX: Number.parseFloat(raw) || 0 })
                      }
                      disabled={disabled}
                      aria-label="Center X"
                    />
                    <span className="vds-color-picker-inline-unit">%</span>
                  </label>
                  <label
                    className="vds-color-picker-inline-chip"
                    htmlFor={`${inlineId}-center-y`}
                  >
                    <span className="vds-color-picker-inline-label">Y</span>
                    <NumberField
                      id={`${inlineId}-center-y`}
                      className="vds-color-picker-inline-input"
                      value={String(safeRound(currentValue.centerY, 0))}
                      min={-100}
                      max={100}
                      onValueChange={(raw) =>
                        handleGradientMetaChange({ centerY: Number.parseFloat(raw) || 0 })
                      }
                      disabled={disabled}
                      aria-label="Center Y"
                    />
                    <span className="vds-color-picker-inline-unit">%</span>
                  </label>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {currentView !== "code" && swatchColors.length ? (
        <div className="vds-color-picker-swatches" aria-label="Swatches">
          {swatchColors.map((swatch, index) => (
            <button
              key={`${swatch.r}-${swatch.g}-${swatch.b}-${swatch.a}-${index}`}
              type="button"
              className="vds-color-picker-swatch"
              style={{ background: rgbaToHexString(swatch, swatch.a < 1) }}
              onClick={() => applyActiveColor(allowAlpha ? swatch : { ...swatch, a: 1 })}
              disabled={disabled}
              aria-label={`Apply swatch ${index + 1}`}
            />
          ))}
        </div>
      ) : null}

      {currentView === "code" && showCodeView ? (
        <div className="vds-color-picker-code-panel">
          <div className="vds-color-picker-code-header">
            <span>Code</span>
            <div className="vds-color-picker-code-actions">
              <PickerButton
                iconOnly
                aria-label={copied ? "Copied" : "Copy CSS"}
                onClick={handleCopyCss}
                disabled={disabled}
                leftSection={copied
                  ? <IconCheck size={16} stroke={2} aria-hidden="true" />
                  : <IconCopy size={16} stroke={1.75} aria-hidden="true" />}
              />
              <Button
                type="button"
                className="vds-color-picker-text-button"
                size="xs"
                variant="soft"
                color="primary"
                onClick={handleCodeApply}
                disabled={disabled}
              >
                Apply
              </Button>
            </div>
          </div>
          <PickerTextarea
            className="vds-color-picker-code-input"
            value={codeDraft}
            onChange={(event) => setCodeDraft(event.currentTarget.value)}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                event.preventDefault();
                handleCodeApply();
              }
            }}
            spellCheck={false}
            disabled={disabled}
          />
          {codeError ? <span className="vds-color-picker-code-error">{codeError}</span> : null}
        </div>
      ) : null}
    </div>
  );
});

function getFieldDescriptors(color: RgbaColor, format: ColorPickerFormat): FieldDescriptor[] {
  if (format === "hex") {
    return [
      {
        label: "Hex",
        value: rgbaToHexString(color, false).replace(/^#/, "").toUpperCase(),
        inputMode: "text",
        wide: true,
      },
      {
        label: "A",
        value: String(safeRound(color.a * 100, 0)),
        inputMode: "decimal",
        unit: "%",
        min: 0,
        max: 100,
      },
    ];
  }
  if (format === "rgb") {
    return [
      { label: "R", value: String(safeRound(color.r, 0)), inputMode: "decimal", min: 0, max: 255 },
      { label: "G", value: String(safeRound(color.g, 0)), inputMode: "decimal", min: 0, max: 255 },
      { label: "B", value: String(safeRound(color.b, 0)), inputMode: "decimal", min: 0, max: 255 },
      {
        label: "A",
        value: String(safeRound(color.a * 100, 0)),
        inputMode: "decimal",
        unit: "%",
        min: 0,
        max: 100,
      },
    ];
  }
  if (format === "hsl") {
    const hsl = rgbaToHsla(color);
    return [
      { label: "H", value: String(safeRound(hsl.h, 0)), inputMode: "decimal", min: 0, max: 360 },
      {
        label: "S",
        value: String(safeRound(hsl.s, 0)),
        inputMode: "decimal",
        unit: "%",
        min: 0,
        max: 100,
      },
      {
        label: "L",
        value: String(safeRound(hsl.l, 0)),
        inputMode: "decimal",
        unit: "%",
        min: 0,
        max: 100,
      },
      {
        label: "A",
        value: String(safeRound(hsl.a * 100, 0)),
        inputMode: "decimal",
        unit: "%",
        min: 0,
        max: 100,
      },
    ];
  }
  const hsb = rgbaToHsva(color);
  return [
    { label: "H", value: String(safeRound(hsb.h, 0)), inputMode: "decimal", min: 0, max: 360 },
    {
      label: "S",
      value: String(safeRound(hsb.s, 0)),
      inputMode: "decimal",
      unit: "%",
      min: 0,
      max: 100,
    },
    {
      label: "B",
      value: String(safeRound(hsb.v, 0)),
      inputMode: "decimal",
      unit: "%",
      min: 0,
      max: 100,
    },
    {
      label: "A",
      value: String(safeRound(hsb.a * 100, 0)),
      inputMode: "decimal",
      unit: "%",
      min: 0,
      max: 100,
    },
  ];
}

