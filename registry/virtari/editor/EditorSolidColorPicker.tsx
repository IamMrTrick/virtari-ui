import { calculateZoomLevel } from "@lexical/utils";
import { Input } from "../input";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
} from "react";
import type { EditorColorSwatch } from "./types";

const SATURATION_WIDTH = 280;
const SATURATION_HEIGHT = 168;

interface RGBColor {
  b: number;
  g: number;
  r: number;
}

interface HSVColor {
  h: number;
  s: number;
  v: number;
}

interface ColorModel {
  hex: string;
  hsv: HSVColor;
  rgb: RGBColor;
}

interface Position {
  x: number;
  y: number;
}

interface MoveAreaProps {
  children: ReactElement;
  className: string;
  onChange: (position: Position, skipHistoryStack: boolean) => void;
  style?: CSSProperties;
}

interface EditorSolidColorPickerProps {
  onChange: (value: string, skipHistoryStack: boolean) => void;
  swatches: EditorColorSwatch[];
  value: string;
}

function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

function normalizeHex(value: string) {
  const normalized = value.trim();

  if (!normalized.startsWith("#")) {
    return `#${normalized}`;
  }

  return normalized;
}

function toHex(value: string) {
  if (typeof document === "undefined") {
    return /^#[0-9a-f]{6}$/i.test(value) ? value : "#000000";
  }

  if (value.trim().toLowerCase() === "transparent") {
    return "#ffffff";
  }

  const normalized = normalizeHex(value);

  if (/^#[0-9a-f]{3}$/i.test(normalized)) {
    const [, r, g, b] = normalized;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  if (/^#[0-9a-f]{6}$/i.test(normalized)) {
    return normalized.toLowerCase();
  }

  const sample = document.createElement("span");
  sample.style.position = "fixed";
  sample.style.opacity = "0";
  sample.style.pointerEvents = "none";
  sample.style.color = value;
  document.body.append(sample);

  const computedColor = window.getComputedStyle(sample).color;
  sample.remove();

  const match = computedColor.match(
    /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i,
  );

  if (!match) {
    return "#000000";
  }

  return `#${Number(match[1]).toString(16).padStart(2, "0")}${Number(match[2])
    .toString(16)
    .padStart(2, "0")}${Number(match[3]).toString(16).padStart(2, "0")}`;
}

function hexToRgb(hex: string): RGBColor {
  const normalized = toHex(hex).replace("#", "");

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHsv({ r, g, b }: RGBColor): HSVColor {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  let hue = 0;

  if (delta > 0) {
    if (max === red) {
      hue = ((green - blue) / delta + (green < blue ? 6 : 0)) * 60;
    } else if (max === green) {
      hue = ((blue - red) / delta + 2) * 60;
    } else {
      hue = ((red - green) / delta + 4) * 60;
    }
  }

  return {
    h: hue,
    s: max === 0 ? 0 : (delta / max) * 100,
    v: max * 100,
  };
}

function hsvToRgb({ h, s, v }: HSVColor): RGBColor {
  const saturation = s / 100;
  const value = v / 100;
  const chroma = value * saturation;
  const hueSegment = (h % 360) / 60;
  const x = chroma * (1 - Math.abs((hueSegment % 2) - 1));
  const match = value - chroma;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (hueSegment >= 0 && hueSegment < 1) {
    red = chroma;
    green = x;
  } else if (hueSegment < 2) {
    red = x;
    green = chroma;
  } else if (hueSegment < 3) {
    green = chroma;
    blue = x;
  } else if (hueSegment < 4) {
    green = x;
    blue = chroma;
  } else if (hueSegment < 5) {
    red = x;
    blue = chroma;
  } else {
    red = chroma;
    blue = x;
  }

  return {
    r: Math.round((red + match) * 255),
    g: Math.round((green + match) * 255),
    b: Math.round((blue + match) * 255),
  };
}

function rgbToHex({ r, g, b }: RGBColor) {
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function transformColor(kind: "hex" | "hsv", value: string | HSVColor): ColorModel {
  const rgb = kind === "hex" ? hexToRgb(value as string) : hsvToRgb(value as HSVColor);
  const hex = kind === "hex" ? toHex(value as string) : rgbToHex(rgb);

  return {
    hex,
    hsv: kind === "hex" ? rgbToHsv(rgb) : (value as HSVColor),
    rgb,
  };
}

function MoveArea({ children, className, onChange, style }: MoveAreaProps) {
  const areaRef = useRef<HTMLDivElement | null>(null);
  const draggedRef = useRef(false);

  function move(
    event: MouseEvent | ReactMouseEvent<HTMLDivElement>,
    skipHistoryStack: boolean,
  ) {
    const area = areaRef.current;

    if (!area) {
      return;
    }

    const rect = area.getBoundingClientRect();
    const zoomLevel = calculateZoomLevel(area);
    const x = clamp((event.clientX / zoomLevel) - rect.left, 0, rect.width);
    const y = clamp((event.clientY / zoomLevel) - rect.top, 0, rect.height);

    onChange({ x, y }, skipHistoryStack);
  }

  function handleMouseDown(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    move(event, false);

    const handleMouseMove = (nativeEvent: MouseEvent) => {
      draggedRef.current = true;
      move(nativeEvent, true);
    };

    const handleMouseUp = (nativeEvent: MouseEvent) => {
      document.removeEventListener("mousemove", handleMouseMove, false);
      document.removeEventListener("mouseup", handleMouseUp, false);
      move(nativeEvent, false);
      draggedRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove, false);
    document.addEventListener("mouseup", handleMouseUp, false);
  }

  return (
    <div
      ref={areaRef}
      className={className}
      style={style}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}

export function EditorSolidColorPicker({
  onChange,
  swatches,
  value,
}: EditorSolidColorPickerProps) {
  const [currentColor, setCurrentColor] = useState<ColorModel>(() =>
    transformColor("hex", value),
  );
  const [inputValue, setInputValue] = useState(() => toHex(value));

  useEffect(() => {
    const nextColor = transformColor("hex", value);
    setCurrentColor(nextColor);
    setInputValue(nextColor.hex);
  }, [value]);

  const saturationPosition = useMemo(
    () => ({
      x: (currentColor.hsv.s / 100) * SATURATION_WIDTH,
      y: ((100 - currentColor.hsv.v) / 100) * SATURATION_HEIGHT,
    }),
    [currentColor.hsv.s, currentColor.hsv.v],
  );

  const huePosition = useMemo(
    () => ({
      x: (currentColor.hsv.h / 360) * SATURATION_WIDTH,
    }),
    [currentColor.hsv.h],
  );

  function applyHexColor(nextHex: string, skipHistoryStack: boolean) {
    const nextColor = transformColor("hex", nextHex);
    setCurrentColor(nextColor);
    setInputValue(nextColor.hex);
    onChange(nextColor.hex, skipHistoryStack);
  }

  function handleSaturationChange(
    position: Position,
    skipHistoryStack: boolean,
  ) {
    const nextColor = transformColor("hsv", {
      ...currentColor.hsv,
      s: (position.x / SATURATION_WIDTH) * 100,
      v: 100 - (position.y / SATURATION_HEIGHT) * 100,
    });

    setCurrentColor(nextColor);
    setInputValue(nextColor.hex);
    onChange(nextColor.hex, skipHistoryStack);
  }

  function handleHueChange(position: Position, skipHistoryStack: boolean) {
    const nextColor = transformColor("hsv", {
      ...currentColor.hsv,
      h: (position.x / SATURATION_WIDTH) * 360,
    });

    setCurrentColor(nextColor);
    setInputValue(nextColor.hex);
    onChange(nextColor.hex, skipHistoryStack);
  }

  return (
    <div className="vds-editor-color-picker">
      <label className="vds-editor-color-input-row">
        <span className="vds-editor-color-input-label">Hex</span>
        <Input
          inputSize="sm"
          className="vds-editor-color-input"
          value={inputValue}
          onChange={(event) => {
            const nextValue = normalizeHex(event.target.value);
            setInputValue(nextValue);

            if (/^#[0-9a-f]{6}$/i.test(nextValue)) {
              applyHexColor(nextValue, false);
            }
          }}
        />
      </label>

      <div className="vds-editor-color-swatches">
        {swatches.map((swatch) => {
          const resolvedSwatch = toHex(swatch.value);
          const active = resolvedSwatch === currentColor.hex;

          return (
            <button
              key={swatch.value}
              type="button"
              className="vds-editor-color-swatch"
              data-active={active || undefined}
              aria-label={swatch.label}
              style={{ backgroundColor: swatch.value }}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setCurrentColor(transformColor("hex", resolvedSwatch));
                setInputValue(resolvedSwatch);
                onChange(swatch.value, false);
              }}
            />
          );
        })}
      </div>

      <MoveArea
        className="vds-editor-color-saturation"
        style={{
          backgroundColor: `hsl(${currentColor.hsv.h}, 100%, 50%)`,
        }}
        onChange={handleSaturationChange}
      >
        <div
          className="vds-editor-color-saturation-cursor"
          style={{
            backgroundColor: currentColor.hex,
            left: saturationPosition.x,
            top: saturationPosition.y,
          }}
        />
      </MoveArea>

      <MoveArea
        className="vds-editor-color-hue"
        onChange={handleHueChange}
      >
        <div
          className="vds-editor-color-hue-cursor"
          style={{
            backgroundColor: `hsl(${currentColor.hsv.h}, 100%, 50%)`,
            left: huePosition.x,
          }}
        />
      </MoveArea>

      <div
        className="vds-editor-color-preview"
        style={{ backgroundColor: currentColor.hex }}
      />
    </div>
  );
}
