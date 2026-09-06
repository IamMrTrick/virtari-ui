import type {
  ColorPickerFormat,
  ColorPickerType,
  ColorPickerValue,
  ColorStop,
  ConicGradientValue,
  GradientShape,
  HslaColor,
  HsvaColor,
  LinearGradientValue,
  RadialGradientValue,
  RgbaColor,
  SolidColorValue,
} from "./types";

let stopIdSequence = 0;

function nextStopId() {
  stopIdSequence += 1;
  return `vds-color-stop-${stopIdSequence}`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function round(value: number, precision = 0) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

export function normalizeDegrees(value: number) {
  const normalized = value % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

export function normalizeRgba(color: RgbaColor): RgbaColor {
  return {
    r: clamp(Math.round(color.r), 0, 255),
    g: clamp(Math.round(color.g), 0, 255),
    b: clamp(Math.round(color.b), 0, 255),
    a: clamp(round(color.a, 4), 0, 1),
  };
}

export function cloneRgba(color: RgbaColor): RgbaColor {
  return { ...normalizeRgba(color) };
}

export function rgbaToHsva(color: RgbaColor): HsvaColor {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta > 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
  }

  return {
    h: normalizeDegrees(hue * 60),
    s: max === 0 ? 0 : round((delta / max) * 100, 2),
    v: round(max * 100, 2),
    a: clamp(color.a, 0, 1),
  };
}

export function hsvaToRgba(color: HsvaColor): RgbaColor {
  const h = normalizeDegrees(color.h);
  const s = clamp(color.s, 0, 100) / 100;
  const v = clamp(color.v, 0, 100) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return normalizeRgba({
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255,
    a: color.a,
  });
}

export function rgbaToHsla(color: RgbaColor): HslaColor {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;

  let hue = 0;
  if (delta > 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
  }

  const chroma = 1 - Math.abs((2 * lightness) - 1);
  return {
    h: normalizeDegrees(hue * 60),
    s: chroma === 0 ? 0 : round((delta / chroma) * 100, 2),
    l: round(lightness * 100, 2),
    a: clamp(color.a, 0, 1),
  };
}

export function hslaToRgba(color: HslaColor): RgbaColor {
  const h = normalizeDegrees(color.h);
  const s = clamp(color.s, 0, 100) / 100;
  const l = clamp(color.l, 0, 100) / 100;
  const c = (1 - Math.abs((2 * l) - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return normalizeRgba({
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255,
    a: color.a,
  });
}

function toHex(channel: number) {
  return clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0").toUpperCase();
}

export function rgbaToHexString(color: RgbaColor, includeAlpha = color.a < 1) {
  const alpha = toHex(color.a * 255);
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${includeAlpha ? alpha : ""}`;
}

function formatAlpha(alpha: number) {
  return alpha >= 1 ? "1" : `${round(alpha, 3)}`.replace(/0+$/, "").replace(/\.$/, "");
}

export function rgbaToRgbString(color: RgbaColor) {
  if (color.a >= 1) return `rgb(${color.r} ${color.g} ${color.b})`;
  return `rgb(${color.r} ${color.g} ${color.b} / ${formatAlpha(color.a)})`;
}

export function rgbaToHslString(color: RgbaColor) {
  const hsl = rgbaToHsla(color);
  const base = `${round(hsl.h, 1)} ${round(hsl.s, 1)}% ${round(hsl.l, 1)}%`;
  if (color.a >= 1) return `hsl(${base})`;
  return `hsl(${base} / ${formatAlpha(color.a)})`;
}

export function rgbaToHsbString(color: RgbaColor) {
  const hsb = rgbaToHsva(color);
  return `hsb(${round(hsb.h, 1)} ${round(hsb.s, 1)}% ${round(hsb.v, 1)}% / ${round(hsb.a * 100, 1)}%)`;
}

export function rgbaToDisplayString(color: RgbaColor, format: ColorPickerFormat) {
  if (format === "rgb") return rgbaToRgbString(color);
  if (format === "hsl") return rgbaToHslString(color);
  if (format === "hsb") return rgbaToHsbString(color);
  return rgbaToHexString(color, color.a < 1);
}

function parseHexColor(input: string): RgbaColor | null {
  const value = input.trim().replace(/^#/, "");
  if (![3, 4, 6, 8].includes(value.length)) return null;

  if (value.length === 3 || value.length === 4) {
    const [r, g, b, a = "F"] = value.split("");
    return normalizeRgba({
      r: parseInt(`${r}${r}`, 16),
      g: parseInt(`${g}${g}`, 16),
      b: parseInt(`${b}${b}`, 16),
      a: parseInt(`${a}${a}`, 16) / 255,
    });
  }

  const r = value.slice(0, 2);
  const g = value.slice(2, 4);
  const b = value.slice(4, 6);
  // For 6-char hex, slice(6, 8) returns "" (not undefined), which means
  // the destructuring `a = "FF"` default does NOT trigger. Default to "FF"
  // explicitly so 6-char hex parses with full alpha instead of NaN.
  const a = value.length === 8 ? value.slice(6, 8) : "FF";

  return normalizeRgba({
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
    a: parseInt(a, 16) / 255,
  });
}

function parseHueValue(input: string) {
  const token = input.trim().toLowerCase();
  const raw = Number.parseFloat(token);
  if (!Number.isFinite(raw)) return null;
  if (token.endsWith("turn")) return normalizeDegrees(raw * 360);
  if (token.endsWith("rad")) return normalizeDegrees((raw * 180) / Math.PI);
  return normalizeDegrees(raw);
}

function parsePercentageOrNumber(input: string) {
  const token = input.trim();
  const raw = Number.parseFloat(token);
  if (!Number.isFinite(raw)) return null;
  return token.endsWith("%") ? raw : raw;
}

function parseRgbChannel(input: string) {
  const token = input.trim();
  const raw = Number.parseFloat(token);
  if (!Number.isFinite(raw)) return null;
  if (token.endsWith("%")) return clamp((raw / 100) * 255, 0, 255);
  return clamp(raw, 0, 255);
}

function parseAlphaValue(input: string) {
  const token = input.trim();
  const raw = Number.parseFloat(token);
  if (!Number.isFinite(raw)) return null;
  if (token.endsWith("%")) return clamp(raw / 100, 0, 1);
  return clamp(raw, 0, 1);
}

function splitFunctionalArguments(input: string) {
  if (input.includes(",")) return input.split(",").map((part) => part.trim()).filter(Boolean);
  return input.split(/\s+/).map((part) => part.trim()).filter(Boolean);
}

function parseRgbColor(input: string): RgbaColor | null {
  const match = input.trim().match(/^rgba?\((.*)\)$/i);
  if (!match) return null;
  let body = match[1].trim();
  let alpha = 1;

  if (body.includes("/")) {
    const [rgbBody, alphaBody] = body.split("/");
    body = rgbBody.trim();
    const parsedAlpha = parseAlphaValue(alphaBody.trim());
    if (parsedAlpha == null) return null;
    alpha = parsedAlpha;
  }

  const parts = splitFunctionalArguments(body);
  if (parts.length === 4) {
    const parsedAlpha = parseAlphaValue(parts[3]);
    if (parsedAlpha == null) return null;
    alpha = parsedAlpha;
  }

  const channels = parts.slice(0, 3).map(parseRgbChannel);
  if (channels.some((channel) => channel == null)) return null;

  return normalizeRgba({
    r: channels[0] ?? 0,
    g: channels[1] ?? 0,
    b: channels[2] ?? 0,
    a: alpha,
  });
}

function parseHslColor(input: string): RgbaColor | null {
  const match = input.trim().match(/^hsla?\((.*)\)$/i);
  if (!match) return null;
  let body = match[1].trim();
  let alpha = 1;

  if (body.includes("/")) {
    const [hslBody, alphaBody] = body.split("/");
    body = hslBody.trim();
    const parsedAlpha = parseAlphaValue(alphaBody.trim());
    if (parsedAlpha == null) return null;
    alpha = parsedAlpha;
  }

  const parts = splitFunctionalArguments(body);
  if (parts.length === 4) {
    const parsedAlpha = parseAlphaValue(parts[3]);
    if (parsedAlpha == null) return null;
    alpha = parsedAlpha;
  }

  if (parts.length < 3) return null;
  const hue = parseHueValue(parts[0]);
  const saturation = parsePercentageOrNumber(parts[1]);
  const lightness = parsePercentageOrNumber(parts[2]);
  if (hue == null || saturation == null || lightness == null) return null;

  return hslaToRgba({
    h: hue,
    s: clamp(saturation, 0, 100),
    l: clamp(lightness, 0, 100),
    a: alpha,
  });
}

function parseBrowserColor(input: string): RgbaColor | null {
  if (typeof document === "undefined") return null;
  const node = document.createElement("span");
  node.style.color = "";
  node.style.color = input.trim();
  if (!node.style.color) return null;
  return parseRgbColor(node.style.color);
}

export function parseColorString(input: string): RgbaColor | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.toLowerCase() === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0 };
  }
  return (
    parseHexColor(trimmed) ??
    parseRgbColor(trimmed) ??
    parseHslColor(trimmed) ??
    parseBrowserColor(trimmed)
  );
}

function splitTopLevel(input: string, separator = ",") {
  const parts: string[] = [];
  let depth = 0;
  let current = "";

  for (const character of input) {
    if (character === "(") depth += 1;
    if (character === ")") depth = Math.max(0, depth - 1);
    if (character === separator && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }

  if (current.trim()) parts.push(current.trim());
  return parts;
}

function parseStop(input: string) {
  const doublePosition = input.match(
    /^(.*?)(?:\s+(-?(?:\d+|\d*\.\d+)%?))?(?:\s+(-?(?:\d+|\d*\.\d+)%?))?\s*$/i,
  );
  if (!doublePosition) return null;
  const [, colorToken, firstPosition, secondPosition] = doublePosition;
  const color = parseColorString(colorToken.trim());
  if (!color) return null;

  const positionToken = firstPosition ?? secondPosition;
  const positionValue =
    positionToken == null ? undefined : clamp(Number.parseFloat(positionToken), 0, 100);

  return {
    color,
    position: Number.isFinite(positionValue) ? positionValue : undefined,
  };
}

function resolveStopPositions(
  stops: Array<{ color: RgbaColor; position?: number }>,
): ColorStop[] {
  if (stops.length === 0) return [];
  const normalized = stops.map((stop, index) => ({
    color: cloneRgba(stop.color),
    position: stop.position,
    index,
  }));

  if (normalized.every((stop) => stop.position == null)) {
    return normalized.map((stop, index) => ({
      id: nextStopId(),
      color: stop.color,
      position: normalized.length === 1 ? 0 : round((index / (normalized.length - 1)) * 100, 2),
    }));
  }

  if (normalized[0].position == null) normalized[0].position = 0;
  if (normalized[normalized.length - 1].position == null) {
    normalized[normalized.length - 1].position = 100;
  }

  let anchor = 0;
  while (anchor < normalized.length) {
    if (normalized[anchor].position != null) {
      anchor += 1;
      continue;
    }

    const startIndex = anchor - 1;
    let endIndex = anchor;
    while (endIndex < normalized.length && normalized[endIndex].position == null) endIndex += 1;
    const start = normalized[startIndex].position ?? 0;
    const end = normalized[endIndex]?.position ?? 100;
    const step = (end - start) / (endIndex - startIndex);
    for (let index = anchor; index < endIndex; index += 1) {
      normalized[index].position = start + step * (index - startIndex);
    }
    anchor = endIndex + 1;
  }

  return normalized
    .map((stop) => ({
      id: nextStopId(),
      color: stop.color,
      position: clamp(round(stop.position ?? 0, 2), 0, 100),
    }))
    .sort((left, right) => left.position - right.position);
}

function parseLinearDescriptor(descriptor: string) {
  if (!descriptor) return 180;
  const token = descriptor.trim().toLowerCase();
  const angle = parseHueValue(token);
  if (angle != null) return angle;
  if (!token.startsWith("to ")) return 180;

  const directions = token.slice(3).trim().split(/\s+/);
  const vertical = directions.includes("top") ? 0 : directions.includes("bottom") ? 180 : null;
  const horizontal = directions.includes("right") ? 90 : directions.includes("left") ? 270 : null;

  if (vertical == null && horizontal == null) return 180;
  if (vertical != null && horizontal != null) {
    if (vertical === 0 && horizontal === 90) return 45;
    if (vertical === 0 && horizontal === 270) return 315;
    if (vertical === 180 && horizontal === 90) return 135;
    if (vertical === 180 && horizontal === 270) return 225;
  }
  return vertical ?? horizontal ?? 180;
}

function parsePositionPair(descriptor: string) {
  const match = descriptor.match(/at\s+(-?(?:\d+|\d*\.\d+)%)\s+(-?(?:\d+|\d*\.\d+)%)$/i);
  if (!match) return null;
  return {
    centerX: clamp(Number.parseFloat(match[1]), -100, 100),
    centerY: clamp(Number.parseFloat(match[2]), -100, 100),
  };
}

function parseRadialDescriptor(descriptor: string) {
  const shape: GradientShape = /\bcircle\b/i.test(descriptor) ? "circle" : "ellipse";
  const position = parsePositionPair(descriptor);
  return {
    shape,
    centerX: position?.centerX ?? 50,
    centerY: position?.centerY ?? 50,
  };
}

function parseConicDescriptor(descriptor: string) {
  const angleMatch = descriptor.match(/from\s+([^\s]+(?:deg|turn|rad)?)/i);
  const position = parsePositionPair(descriptor);
  return {
    angle: angleMatch ? parseHueValue(angleMatch[1]) ?? 0 : 0,
    centerX: position?.centerX ?? 50,
    centerY: position?.centerY ?? 50,
  };
}

function parseGradientString(input: string): ColorPickerValue | null {
  const match = input
    .trim()
    .match(/^(repeating-)?(linear|radial|conic)-gradient\s*\(([\s\S]+)\)$/i);
  if (!match) return null;

  const repeating = Boolean(match[1]);
  const type = match[2].toLowerCase() as Exclude<ColorPickerType, "solid">;
  const parts = splitTopLevel(match[3]);
  if (parts.length < 2) return null;

  let descriptor = "";
  let startIndex = 0;
  if (!parseStop(parts[0])) {
    descriptor = parts[0];
    startIndex = 1;
  }

  const stops = parts.slice(startIndex).map(parseStop);
  if (stops.some((stop) => stop == null)) return null;
  const resolvedStops = resolveStopPositions(stops.filter(Boolean) as Array<{ color: RgbaColor; position?: number }>);

  if (type === "linear") {
    const value: LinearGradientValue = {
      type,
      repeating,
      angle: parseLinearDescriptor(descriptor),
      stops: resolvedStops,
    };
    return value;
  }

  if (type === "radial") {
    const radial = parseRadialDescriptor(descriptor);
    const value: RadialGradientValue = {
      type,
      repeating,
      shape: radial.shape,
      centerX: radial.centerX,
      centerY: radial.centerY,
      stops: resolvedStops,
    };
    return value;
  }

  const conic = parseConicDescriptor(descriptor);
  const value: ConicGradientValue = {
    type,
    repeating,
    angle: conic.angle,
    centerX: conic.centerX,
    centerY: conic.centerY,
    stops: resolvedStops,
  };
  return value;
}

export function parseColorPickerValue(input: string): ColorPickerValue | null {
  return parseGradientString(input) ?? (parseColorString(input) ? { type: "solid", color: parseColorString(input)! } : null);
}

function sortStops(stops: ColorStop[]) {
  return [...stops]
    .map((stop) => ({
      id: stop.id || nextStopId(),
      color: cloneRgba(stop.color),
      position: clamp(round(stop.position, 2), 0, 100),
    }))
    .sort((left, right) => left.position - right.position);
}

export function mixColors(left: RgbaColor, right: RgbaColor, amount: number): RgbaColor {
  const ratio = clamp(amount, 0, 1);
  return normalizeRgba({
    r: left.r + (right.r - left.r) * ratio,
    g: left.g + (right.g - left.g) * ratio,
    b: left.b + (right.b - left.b) * ratio,
    a: left.a + (right.a - left.a) * ratio,
  });
}

export function createDefaultStops(baseColor: RgbaColor): ColorStop[] {
  const light = mixColors(baseColor, { r: 255, g: 255, b: 255, a: baseColor.a }, 0.45);
  const dark = mixColors(baseColor, { r: 0, g: 0, b: 0, a: baseColor.a }, 0.55);
  return [
    { id: nextStopId(), color: light, position: 0 },
    { id: nextStopId(), color: dark, position: 100 },
  ];
}

export function createColorPickerValue(type: ColorPickerType, seed?: RgbaColor): ColorPickerValue {
  const base = cloneRgba(seed ?? { r: 255, g: 0, b: 48, a: 1 });
  if (type === "solid") {
    return { type, color: base };
  }

  const stops = createDefaultStops(base);
  if (type === "linear") {
    return { type, repeating: false, angle: 90, stops };
  }
  if (type === "radial") {
    return { type, repeating: false, shape: "circle", centerX: 50, centerY: 50, stops };
  }
  return { type, repeating: false, angle: 0, centerX: 50, centerY: 50, stops };
}

export function cloneColorPickerValue(value: ColorPickerValue): ColorPickerValue {
  if (value.type === "solid") {
    return { type: "solid", color: cloneRgba(value.color) };
  }
  if (value.type === "linear") {
    return {
      type: "linear",
      repeating: value.repeating,
      angle: normalizeDegrees(value.angle),
      stops: sortStops(value.stops),
    };
  }
  if (value.type === "radial") {
    return {
      type: "radial",
      repeating: value.repeating,
      shape: value.shape,
      centerX: clamp(round(value.centerX, 2), -100, 100),
      centerY: clamp(round(value.centerY, 2), -100, 100),
      stops: sortStops(value.stops),
    };
  }
  return {
    type: "conic",
    repeating: value.repeating,
    angle: normalizeDegrees(value.angle),
    centerX: clamp(round(value.centerX, 2), 0, 100),
    centerY: clamp(round(value.centerY, 2), 0, 100),
    stops: sortStops(value.stops),
  };
}

export function normalizeColorPickerValue(input?: string | ColorPickerValue | null): ColorPickerValue {
  if (!input) return createColorPickerValue("solid");
  if (typeof input === "string") return parseColorPickerValue(input) ?? createColorPickerValue("solid");
  return cloneColorPickerValue(input);
}

export function serializeColorPickerValue(value: ColorPickerValue) {
  if (value.type === "solid") return rgbaToHexString(value.color, value.color.a < 1);

  const prefix = value.repeating ? "repeating-" : "";
  const stops = value.stops
    .map((stop) => `${rgbaToHexString(stop.color, stop.color.a < 1)} ${round(stop.position, 2)}%`)
    .join(", ");

  if (value.type === "linear") {
    return `${prefix}linear-gradient(${round(normalizeDegrees(value.angle), 2)}deg, ${stops})`;
  }

  if (value.type === "radial") {
    return `${prefix}radial-gradient(${value.shape} at ${round(value.centerX, 2)}% ${round(value.centerY, 2)}%, ${stops})`;
  }

  return `${prefix}conic-gradient(from ${round(normalizeDegrees(value.angle), 2)}deg at ${round(value.centerX, 2)}% ${round(value.centerY, 2)}%, ${stops})`;
}

export function getActiveColor(value: ColorPickerValue, activeStopId?: string | null): RgbaColor {
  if (value.type === "solid") return cloneRgba(value.color);
  return cloneRgba(value.stops.find((stop) => stop.id === activeStopId)?.color ?? value.stops[0]?.color ?? { r: 255, g: 0, b: 48, a: 1 });
}

export function updateActiveColor(
  value: ColorPickerValue,
  color: RgbaColor,
  activeStopId?: string | null,
): ColorPickerValue {
  if (value.type === "solid") {
    return { type: "solid", color: cloneRgba(color) };
  }

  return {
    ...value,
    stops: sortStops(
      value.stops.map((stop) =>
        stop.id === activeStopId || (!activeStopId && stop === value.stops[0])
          ? { ...stop, color: cloneRgba(color) }
          : stop,
      ),
    ),
  };
}

export function updateStopPosition(value: ColorPickerValue, stopId: string, position: number): ColorPickerValue {
  if (value.type === "solid") return value;
  return {
    ...value,
    stops: sortStops(
      value.stops.map((stop) => (stop.id === stopId ? { ...stop, position: clamp(position, 0, 100) } : stop)),
    ),
  };
}

export function updateStopById(
  value: ColorPickerValue,
  stopId: string,
  patch: Partial<Pick<ColorStop, "position" | "color">>,
): ColorPickerValue {
  if (value.type === "solid") return value;
  return {
    ...value,
    stops: sortStops(
      value.stops.map((stop) =>
        stop.id === stopId
          ? {
              ...stop,
              position: patch.position == null ? stop.position : clamp(patch.position, 0, 100),
              color: patch.color == null ? stop.color : cloneRgba(patch.color),
            }
          : stop,
      ),
    ),
  };
}

export function addGradientStop(value: ColorPickerValue, position = 50): { value: ColorPickerValue; stopId: string | null } {
  if (value.type === "solid") return { value, stopId: null };
  const sorted = sortStops(value.stops);
  const target = clamp(position, 0, 100);
  const right = sorted.find((stop) => stop.position >= target);
  const left = [...sorted].reverse().find((stop) => stop.position <= target);
  const leftColor = left?.color ?? right?.color ?? { r: 255, g: 0, b: 48, a: 1 };
  const rightColor = right?.color ?? left?.color ?? leftColor;

  const span =
    left && right && right.position !== left.position
      ? (target - left.position) / (right.position - left.position)
      : 0.5;
  const nextStop: ColorStop = {
    id: nextStopId(),
    position: target,
    color: mixColors(leftColor, rightColor, span),
  };

  return {
    stopId: nextStop.id,
    value: {
      ...value,
      stops: sortStops([...sorted, nextStop]),
    },
  };
}

export function removeGradientStop(value: ColorPickerValue, stopId: string): ColorPickerValue {
  if (value.type === "solid") return value;
  if (value.stops.length <= 2) return value;
  return {
    ...value,
    stops: sortStops(value.stops.filter((stop) => stop.id !== stopId)),
  };
}

/**
 * Reorder gradient stops by dragging a row to a new slot in the sorted list.
 *
 * Position values are kept in their original order — only the colors (and the
 * stop identities that travel with them) move. So if the gradient was
 * `[red@0, green@38, blue@100]` and you drag green above red, the result is
 * `[green@0, red@38, blue@100]`. The visible gradient changes (color order
 * shifts) but the stop count and position layout stay intact.
 *
 * `slot` is whether the dragged row should land BEFORE or AFTER the target.
 */
export function reorderGradientStop(
  value: ColorPickerValue,
  fromId: string,
  toId: string,
  slot: "before" | "after",
): ColorPickerValue {
  if (value.type === "solid" || fromId === toId) return value;
  const sorted = [...value.stops].sort((left, right) => left.position - right.position);
  const fromIndex = sorted.findIndex((stop) => stop.id === fromId);
  const toIndex = sorted.findIndex((stop) => stop.id === toId);
  if (fromIndex < 0 || toIndex < 0) return value;

  // Compute the destination index in the array AFTER pulling out fromIndex.
  let insertAt = slot === "before" ? toIndex : toIndex + 1;
  if (fromIndex < insertAt) insertAt -= 1;
  if (insertAt === fromIndex) return value;

  const positions = sorted.map((stop) => stop.position);
  const next = [...sorted];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(insertAt, 0, moved);

  return {
    ...value,
    stops: next.map((stop, index) => ({ ...stop, position: positions[index] })),
  };
}

export function convertValueType(
  value: ColorPickerValue,
  nextType: ColorPickerType,
  activeStopId?: string | null,
): ColorPickerValue {
  if (value.type === nextType) return cloneColorPickerValue(value);
  const seed = getActiveColor(value, activeStopId);
  if (nextType === "solid") return { type: "solid", color: seed };
  if (value.type === "solid") return createColorPickerValue(nextType, seed);

  if (nextType === "linear") {
    return {
      type: "linear",
      repeating: value.repeating,
      angle: "angle" in value ? value.angle : 90,
      stops: sortStops(value.stops),
    };
  }

  if (nextType === "radial") {
    return {
      type: "radial",
      repeating: value.repeating,
      shape: "shape" in value ? value.shape : "circle",
      centerX: "centerX" in value ? value.centerX : 50,
      centerY: "centerY" in value ? value.centerY : 50,
      stops: sortStops(value.stops),
    };
  }

  return {
    type: "conic",
    repeating: value.repeating,
    angle: "angle" in value ? value.angle : 0,
    centerX: "centerX" in value ? value.centerX : 50,
    centerY: "centerY" in value ? value.centerY : 50,
    stops: sortStops(value.stops),
  };
}
