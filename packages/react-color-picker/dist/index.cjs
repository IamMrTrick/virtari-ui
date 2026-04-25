'use strict';

var reactButton = require('@virtari-packages/react-button');
var reactInput = require('@virtari-packages/react-input');
var reactPopover = require('@virtari-packages/react-popover');
var reactSelect = require('@virtari-packages/react-select');
var reactTextarea = require('@virtari-packages/react-textarea');
var reactIcons = require('@virtari-packages/react-icons');
var utils = require('@virtari-packages/utils');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

// src/ColorPicker.tsx

// src/color-utils.ts
var stopIdSequence = 0;
function nextStopId() {
  stopIdSequence += 1;
  return `vds-color-stop-${stopIdSequence}`;
}
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function round(value, precision = 0) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
function normalizeDegrees(value) {
  const normalized = value % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}
function normalizeRgba(color) {
  return {
    r: clamp(Math.round(color.r), 0, 255),
    g: clamp(Math.round(color.g), 0, 255),
    b: clamp(Math.round(color.b), 0, 255),
    a: clamp(round(color.a, 4), 0, 1)
  };
}
function cloneRgba(color) {
  return { ...normalizeRgba(color) };
}
function rgbaToHsva(color) {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;
  if (delta > 0) {
    if (max === r) hue = (g - b) / delta % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
  }
  return {
    h: normalizeDegrees(hue * 60),
    s: max === 0 ? 0 : round(delta / max * 100, 2),
    v: round(max * 100, 2),
    a: clamp(color.a, 0, 1)
  };
}
function hsvaToRgba(color) {
  const h = normalizeDegrees(color.h);
  const s = clamp(color.s, 0, 100) / 100;
  const v = clamp(color.v, 0, 100) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
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
    a: color.a
  });
}
function rgbaToHsla(color) {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;
  let hue = 0;
  if (delta > 0) {
    if (max === r) hue = (g - b) / delta % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
  }
  const chroma = 1 - Math.abs(2 * lightness - 1);
  return {
    h: normalizeDegrees(hue * 60),
    s: chroma === 0 ? 0 : round(delta / chroma * 100, 2),
    l: round(lightness * 100, 2),
    a: clamp(color.a, 0, 1)
  };
}
function hslaToRgba(color) {
  const h = normalizeDegrees(color.h);
  const s = clamp(color.s, 0, 100) / 100;
  const l = clamp(color.l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
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
    a: color.a
  });
}
function toHex(channel) {
  return clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0").toUpperCase();
}
function rgbaToHexString(color, includeAlpha = color.a < 1) {
  const alpha = toHex(color.a * 255);
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${includeAlpha ? alpha : ""}`;
}
function formatAlpha(alpha) {
  return alpha >= 1 ? "1" : `${round(alpha, 3)}`.replace(/0+$/, "").replace(/\.$/, "");
}
function rgbaToRgbString(color) {
  if (color.a >= 1) return `rgb(${color.r} ${color.g} ${color.b})`;
  return `rgb(${color.r} ${color.g} ${color.b} / ${formatAlpha(color.a)})`;
}
function rgbaToHslString(color) {
  const hsl = rgbaToHsla(color);
  const base = `${round(hsl.h, 1)} ${round(hsl.s, 1)}% ${round(hsl.l, 1)}%`;
  if (color.a >= 1) return `hsl(${base})`;
  return `hsl(${base} / ${formatAlpha(color.a)})`;
}
function rgbaToHsbString(color) {
  const hsb = rgbaToHsva(color);
  return `hsb(${round(hsb.h, 1)} ${round(hsb.s, 1)}% ${round(hsb.v, 1)}% / ${round(hsb.a * 100, 1)}%)`;
}
function rgbaToDisplayString(color, format) {
  if (format === "rgb") return rgbaToRgbString(color);
  if (format === "hsl") return rgbaToHslString(color);
  if (format === "hsb") return rgbaToHsbString(color);
  return rgbaToHexString(color, color.a < 1);
}
function parseHexColor(input) {
  const value = input.trim().replace(/^#/, "");
  if (![3, 4, 6, 8].includes(value.length)) return null;
  if (value.length === 3 || value.length === 4) {
    const [r2, g2, b2, a2 = "F"] = value.split("");
    return normalizeRgba({
      r: parseInt(`${r2}${r2}`, 16),
      g: parseInt(`${g2}${g2}`, 16),
      b: parseInt(`${b2}${b2}`, 16),
      a: parseInt(`${a2}${a2}`, 16) / 255
    });
  }
  const r = value.slice(0, 2);
  const g = value.slice(2, 4);
  const b = value.slice(4, 6);
  const a = value.length === 8 ? value.slice(6, 8) : "FF";
  return normalizeRgba({
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
    a: parseInt(a, 16) / 255
  });
}
function parseHueValue(input) {
  const token = input.trim().toLowerCase();
  const raw = Number.parseFloat(token);
  if (!Number.isFinite(raw)) return null;
  if (token.endsWith("turn")) return normalizeDegrees(raw * 360);
  if (token.endsWith("rad")) return normalizeDegrees(raw * 180 / Math.PI);
  return normalizeDegrees(raw);
}
function parsePercentageOrNumber(input) {
  const token = input.trim();
  const raw = Number.parseFloat(token);
  if (!Number.isFinite(raw)) return null;
  return token.endsWith("%") ? raw : raw;
}
function parseRgbChannel(input) {
  const token = input.trim();
  const raw = Number.parseFloat(token);
  if (!Number.isFinite(raw)) return null;
  if (token.endsWith("%")) return clamp(raw / 100 * 255, 0, 255);
  return clamp(raw, 0, 255);
}
function parseAlphaValue(input) {
  const token = input.trim();
  const raw = Number.parseFloat(token);
  if (!Number.isFinite(raw)) return null;
  if (token.endsWith("%")) return clamp(raw / 100, 0, 1);
  return clamp(raw, 0, 1);
}
function splitFunctionalArguments(input) {
  if (input.includes(",")) return input.split(",").map((part) => part.trim()).filter(Boolean);
  return input.split(/\s+/).map((part) => part.trim()).filter(Boolean);
}
function parseRgbColor(input) {
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
    a: alpha
  });
}
function parseHslColor(input) {
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
    a: alpha
  });
}
function parseBrowserColor(input) {
  if (typeof document === "undefined") return null;
  const node = document.createElement("span");
  node.style.color = "";
  node.style.color = input.trim();
  if (!node.style.color) return null;
  return parseRgbColor(node.style.color);
}
function parseColorString(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.toLowerCase() === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0 };
  }
  return parseHexColor(trimmed) ?? parseRgbColor(trimmed) ?? parseHslColor(trimmed) ?? parseBrowserColor(trimmed);
}
function splitTopLevel(input, separator = ",") {
  const parts = [];
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
function parseStop(input) {
  const doublePosition = input.match(
    /^(.*?)(?:\s+(-?(?:\d+|\d*\.\d+)%?))?(?:\s+(-?(?:\d+|\d*\.\d+)%?))?\s*$/i
  );
  if (!doublePosition) return null;
  const [, colorToken, firstPosition, secondPosition] = doublePosition;
  const color = parseColorString(colorToken.trim());
  if (!color) return null;
  const positionToken = firstPosition ?? secondPosition;
  const positionValue = positionToken == null ? void 0 : clamp(Number.parseFloat(positionToken), 0, 100);
  return {
    color,
    position: Number.isFinite(positionValue) ? positionValue : void 0
  };
}
function resolveStopPositions(stops) {
  if (stops.length === 0) return [];
  const normalized = stops.map((stop, index) => ({
    color: cloneRgba(stop.color),
    position: stop.position,
    index
  }));
  if (normalized.every((stop) => stop.position == null)) {
    return normalized.map((stop, index) => ({
      id: nextStopId(),
      color: stop.color,
      position: normalized.length === 1 ? 0 : round(index / (normalized.length - 1) * 100, 2)
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
  return normalized.map((stop) => ({
    id: nextStopId(),
    color: stop.color,
    position: clamp(round(stop.position ?? 0, 2), 0, 100)
  })).sort((left, right) => left.position - right.position);
}
function parseLinearDescriptor(descriptor) {
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
function parsePositionPair(descriptor) {
  const match = descriptor.match(/at\s+(-?(?:\d+|\d*\.\d+)%)\s+(-?(?:\d+|\d*\.\d+)%)$/i);
  if (!match) return null;
  return {
    centerX: clamp(Number.parseFloat(match[1]), -100, 100),
    centerY: clamp(Number.parseFloat(match[2]), -100, 100)
  };
}
function parseRadialDescriptor(descriptor) {
  const shape = /\bcircle\b/i.test(descriptor) ? "circle" : "ellipse";
  const position = parsePositionPair(descriptor);
  return {
    shape,
    centerX: position?.centerX ?? 50,
    centerY: position?.centerY ?? 50
  };
}
function parseConicDescriptor(descriptor) {
  const angleMatch = descriptor.match(/from\s+([^\s]+(?:deg|turn|rad)?)/i);
  const position = parsePositionPair(descriptor);
  return {
    angle: angleMatch ? parseHueValue(angleMatch[1]) ?? 0 : 0,
    centerX: position?.centerX ?? 50,
    centerY: position?.centerY ?? 50
  };
}
function parseGradientString(input) {
  const match = input.trim().match(/^(repeating-)?(linear|radial|conic)-gradient\s*\(([\s\S]+)\)$/i);
  if (!match) return null;
  const repeating = Boolean(match[1]);
  const type = match[2].toLowerCase();
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
  const resolvedStops = resolveStopPositions(stops.filter(Boolean));
  if (type === "linear") {
    const value2 = {
      type,
      repeating,
      angle: parseLinearDescriptor(descriptor),
      stops: resolvedStops
    };
    return value2;
  }
  if (type === "radial") {
    const radial = parseRadialDescriptor(descriptor);
    const value2 = {
      type,
      repeating,
      shape: radial.shape,
      centerX: radial.centerX,
      centerY: radial.centerY,
      stops: resolvedStops
    };
    return value2;
  }
  const conic = parseConicDescriptor(descriptor);
  const value = {
    type,
    repeating,
    angle: conic.angle,
    centerX: conic.centerX,
    centerY: conic.centerY,
    stops: resolvedStops
  };
  return value;
}
function parseColorPickerValue(input) {
  return parseGradientString(input) ?? (parseColorString(input) ? { type: "solid", color: parseColorString(input) } : null);
}
function sortStops(stops) {
  return [...stops].map((stop) => ({
    id: stop.id || nextStopId(),
    color: cloneRgba(stop.color),
    position: clamp(round(stop.position, 2), 0, 100)
  })).sort((left, right) => left.position - right.position);
}
function mixColors(left, right, amount) {
  const ratio = clamp(amount, 0, 1);
  return normalizeRgba({
    r: left.r + (right.r - left.r) * ratio,
    g: left.g + (right.g - left.g) * ratio,
    b: left.b + (right.b - left.b) * ratio,
    a: left.a + (right.a - left.a) * ratio
  });
}
function createDefaultStops(baseColor) {
  const light = mixColors(baseColor, { r: 255, g: 255, b: 255, a: baseColor.a }, 0.45);
  const dark = mixColors(baseColor, { r: 0, g: 0, b: 0, a: baseColor.a }, 0.55);
  return [
    { id: nextStopId(), color: light, position: 0 },
    { id: nextStopId(), color: dark, position: 100 }
  ];
}
function createColorPickerValue(type, seed) {
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
function cloneColorPickerValue(value) {
  if (value.type === "solid") {
    return { type: "solid", color: cloneRgba(value.color) };
  }
  if (value.type === "linear") {
    return {
      type: "linear",
      repeating: value.repeating,
      angle: normalizeDegrees(value.angle),
      stops: sortStops(value.stops)
    };
  }
  if (value.type === "radial") {
    return {
      type: "radial",
      repeating: value.repeating,
      shape: value.shape,
      centerX: clamp(round(value.centerX, 2), -100, 100),
      centerY: clamp(round(value.centerY, 2), -100, 100),
      stops: sortStops(value.stops)
    };
  }
  return {
    type: "conic",
    repeating: value.repeating,
    angle: normalizeDegrees(value.angle),
    centerX: clamp(round(value.centerX, 2), 0, 100),
    centerY: clamp(round(value.centerY, 2), 0, 100),
    stops: sortStops(value.stops)
  };
}
function normalizeColorPickerValue(input) {
  if (!input) return createColorPickerValue("solid");
  if (typeof input === "string") return parseColorPickerValue(input) ?? createColorPickerValue("solid");
  return cloneColorPickerValue(input);
}
function serializeColorPickerValue(value) {
  if (value.type === "solid") return rgbaToHexString(value.color, value.color.a < 1);
  const prefix = value.repeating ? "repeating-" : "";
  const stops = value.stops.map((stop) => `${rgbaToHexString(stop.color, stop.color.a < 1)} ${round(stop.position, 2)}%`).join(", ");
  if (value.type === "linear") {
    return `${prefix}linear-gradient(${round(normalizeDegrees(value.angle), 2)}deg, ${stops})`;
  }
  if (value.type === "radial") {
    return `${prefix}radial-gradient(${value.shape} at ${round(value.centerX, 2)}% ${round(value.centerY, 2)}%, ${stops})`;
  }
  return `${prefix}conic-gradient(from ${round(normalizeDegrees(value.angle), 2)}deg at ${round(value.centerX, 2)}% ${round(value.centerY, 2)}%, ${stops})`;
}
function getActiveColor(value, activeStopId) {
  if (value.type === "solid") return cloneRgba(value.color);
  return cloneRgba(value.stops.find((stop) => stop.id === activeStopId)?.color ?? value.stops[0]?.color ?? { r: 255, g: 0, b: 48, a: 1 });
}
function updateActiveColor(value, color, activeStopId) {
  if (value.type === "solid") {
    return { type: "solid", color: cloneRgba(color) };
  }
  return {
    ...value,
    stops: sortStops(
      value.stops.map(
        (stop) => stop.id === activeStopId || !activeStopId && stop === value.stops[0] ? { ...stop, color: cloneRgba(color) } : stop
      )
    )
  };
}
function updateStopPosition(value, stopId, position) {
  if (value.type === "solid") return value;
  return {
    ...value,
    stops: sortStops(
      value.stops.map((stop) => stop.id === stopId ? { ...stop, position: clamp(position, 0, 100) } : stop)
    )
  };
}
function updateStopById(value, stopId, patch) {
  if (value.type === "solid") return value;
  return {
    ...value,
    stops: sortStops(
      value.stops.map(
        (stop) => stop.id === stopId ? {
          ...stop,
          position: patch.position == null ? stop.position : clamp(patch.position, 0, 100),
          color: patch.color == null ? stop.color : cloneRgba(patch.color)
        } : stop
      )
    )
  };
}
function addGradientStop(value, position = 50) {
  if (value.type === "solid") return { value, stopId: null };
  const sorted = sortStops(value.stops);
  const target = clamp(position, 0, 100);
  const right = sorted.find((stop) => stop.position >= target);
  const left = [...sorted].reverse().find((stop) => stop.position <= target);
  const leftColor = left?.color ?? right?.color ?? { r: 255, g: 0, b: 48, a: 1 };
  const rightColor = right?.color ?? left?.color ?? leftColor;
  const span = left && right && right.position !== left.position ? (target - left.position) / (right.position - left.position) : 0.5;
  const nextStop = {
    id: nextStopId(),
    position: target,
    color: mixColors(leftColor, rightColor, span)
  };
  return {
    stopId: nextStop.id,
    value: {
      ...value,
      stops: sortStops([...sorted, nextStop])
    }
  };
}
function removeGradientStop(value, stopId) {
  if (value.type === "solid") return value;
  if (value.stops.length <= 2) return value;
  return {
    ...value,
    stops: sortStops(value.stops.filter((stop) => stop.id !== stopId))
  };
}
function reorderGradientStop(value, fromId, toId, slot) {
  if (value.type === "solid" || fromId === toId) return value;
  const sorted = [...value.stops].sort((left, right) => left.position - right.position);
  const fromIndex = sorted.findIndex((stop) => stop.id === fromId);
  const toIndex = sorted.findIndex((stop) => stop.id === toId);
  if (fromIndex < 0 || toIndex < 0) return value;
  let insertAt = slot === "before" ? toIndex : toIndex + 1;
  if (fromIndex < insertAt) insertAt -= 1;
  if (insertAt === fromIndex) return value;
  const positions = sorted.map((stop) => stop.position);
  const next = [...sorted];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(insertAt, 0, moved);
  return {
    ...value,
    stops: next.map((stop, index) => ({ ...stop, position: positions[index] }))
  };
}
function convertValueType(value, nextType, activeStopId) {
  if (value.type === nextType) return cloneColorPickerValue(value);
  const seed = getActiveColor(value, activeStopId);
  if (nextType === "solid") return { type: "solid", color: seed };
  if (value.type === "solid") return createColorPickerValue(nextType, seed);
  if (nextType === "linear") {
    return {
      type: "linear",
      repeating: value.repeating,
      angle: "angle" in value ? value.angle : 90,
      stops: sortStops(value.stops)
    };
  }
  if (nextType === "radial") {
    return {
      type: "radial",
      repeating: value.repeating,
      shape: "shape" in value ? value.shape : "circle",
      centerX: "centerX" in value ? value.centerX : 50,
      centerY: "centerY" in value ? value.centerY : 50,
      stops: sortStops(value.stops)
    };
  }
  return {
    type: "conic",
    repeating: value.repeating,
    angle: "angle" in value ? value.angle : 0,
    centerX: "centerX" in value ? value.centerX : 50,
    centerY: "centerY" in value ? value.centerY : 50,
    stops: sortStops(value.stops)
  };
}
function useControllableState({
  value,
  defaultValue,
  onChange
}) {
  const isControlled = value !== void 0;
  const [internalValue, setInternalValue] = react.useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;
  const onChangeRef = react.useRef(onChange);
  onChangeRef.current = onChange;
  const setValue = react.useCallback(
    (next) => {
      const resolved = typeof next === "function" ? next(currentValue) : next;
      if (!isControlled) setInternalValue(resolved);
      onChangeRef.current?.(resolved);
    },
    [currentValue, isControlled]
  );
  return [currentValue, setValue];
}
var DEFAULT_SWATCHES = [];
var TYPE_OPTIONS = [
  { type: "solid", label: "Solid" },
  { type: "linear", label: "Linear" },
  { type: "radial", label: "Radial" },
  { type: "conic", label: "Angular" }
];
var MODE_OPTIONS = [
  { mode: "solid", label: "Solid", icon: reactIcons.IconCircleFilled },
  { mode: "gradient", label: "Gradient", icon: reactIcons.IconColorSwatch }
];
var FORMAT_OPTIONS = [
  { format: "hex", label: "HEX" },
  { format: "rgb", label: "RGB" },
  { format: "hsl", label: "HSL" },
  { format: "hsb", label: "HSB" }
];
var SHAPE_OPTIONS = [
  { shape: "circle", label: "Circle" },
  { shape: "ellipse", label: "Ellipse" }
];
function toFiniteNumber(value, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}
function safeRound(value, precision = 0, fallback = 0) {
  return round(toFiniteNumber(value, fallback), precision);
}
function getStopSnapshot(stop) {
  if (!stop) return null;
  return {
    position: toFiniteNumber(stop.position, 0),
    color: { ...stop.color }
  };
}
function getBestMatchingStopId(stops, snapshot) {
  if (!stops.length) return null;
  if (!snapshot) return stops[0]?.id ?? null;
  let bestStop = stops[0] ?? null;
  let bestScore = Number.POSITIVE_INFINITY;
  for (const stop of stops) {
    const positionDelta = Math.abs(toFiniteNumber(stop.position, 0) - snapshot.position);
    const colorDelta = Math.abs(stop.color.r - snapshot.color.r) + Math.abs(stop.color.g - snapshot.color.g) + Math.abs(stop.color.b - snapshot.color.b) + Math.abs(stop.color.a - snapshot.color.a) * 255;
    const score = positionDelta * 4 + colorDelta / 12;
    if (score < bestScore) {
      bestScore = score;
      bestStop = stop;
    }
  }
  return bestStop?.id ?? null;
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
  onChange
}) {
  const trackRef = react.useRef(null);
  const safeValue = toFiniteNumber(value, min);
  const percent = max === min ? 0 : (safeValue - min) / (max - min) * 100;
  function updateFromClientX(clientX) {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const next = min + ratio * (max - min);
    const stepped = Math.round(next / step) * step;
    onChange(clamp(stepped, min, max));
  }
  function handlePointerDown(event) {
    if (disabled) return;
    event.preventDefault();
    updateFromClientX(event.clientX);
    const move = (nativeEvent) => updateFromClientX(nativeEvent.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
  }
  function handleKeyDown(event) {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: trackRef,
      role: "slider",
      tabIndex: disabled ? -1 : 0,
      "aria-label": ariaLabel,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": safeRound(safeValue, 2, min),
      className: utils.cn("vds-color-picker-slider", className),
      "data-disabled": disabled ? "true" : void 0,
      onPointerDown: handlePointerDown,
      onKeyDown: handleKeyDown,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-slider-track", style: { background } }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: "vds-color-picker-slider-thumb",
            style: { insetInlineStart: `${toFiniteNumber(percent, 0)}%` }
          }
        )
      ]
    }
  );
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
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactButton.Button,
    {
      type: type ?? "button",
      size: size ?? "xs",
      variant: variant ?? (active ? "soft" : "ghost"),
      color: color ?? (active ? "primary" : "contrast"),
      className: utils.cn(
        "vds-color-picker-button",
        iconOnly && "vds-color-picker-button--icon",
        className
      ),
      ...props
    }
  );
}
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
}) {
  const ref = react.useRef(null);
  react.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handler = (event) => {
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
  function handleKeyDown(event) {
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactInput.Input,
    {
      ref,
      inputSize,
      type: "text",
      inputMode: "decimal",
      value,
      onChange: (event) => onValueChange(event.currentTarget.value),
      onKeyDown: handleKeyDown,
      onWheel,
      className: utils.cn("vds-color-picker-input", className),
      ...props
    }
  );
}
function HexField({
  value,
  className,
  inputSize = "xs",
  onValueChange,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactInput.Input,
    {
      inputSize,
      type: "text",
      value,
      onChange: (event) => onValueChange(event.currentTarget.value),
      className: utils.cn("vds-color-picker-input vds-color-picker-input--hex", className),
      ...props
    }
  );
}
function PickerTextarea({
  inputSize = "sm",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactTextarea.Textarea,
    {
      inputSize,
      className: utils.cn("vds-color-picker-textarea", className),
      ...props
    }
  );
}
function SolidEditor({
  color,
  format,
  onFormatChange,
  onColorChange,
  allowAlpha = true,
  allowEyedropper = true,
  disabled,
  compact = false
}) {
  const saturationRef = react.useRef(null);
  const labelId = react.useId();
  const hsva = rgbaToHsva(color);
  const hsla = rgbaToHsla(color);
  const fields = getFieldDescriptors(color, format);
  const eyeDropperSupported = allowEyedropper && typeof window !== "undefined" && typeof window.EyeDropper === "function";
  const saturationStyle = {
    "--vds-color-picker-hue": `${hsva.h}deg`
  };
  function handleSaturationPointerDown(event) {
    if (disabled) return;
    event.preventDefault();
    const update = (clientX, clientY) => {
      const rect = saturationRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nextS = clamp((clientX - rect.left) / rect.width * 100, 0, 100);
      const nextV = clamp(100 - (clientY - rect.top) / rect.height * 100, 0, 100);
      onColorChange(hsvaToRgba({ ...hsva, s: nextS, v: nextV }));
    };
    update(event.clientX, event.clientY);
    const move = (e) => update(e.clientX, e.clientY);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
  }
  function handleSaturationKeyDown(event) {
    if (disabled) return;
    let next = null;
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
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      const next = parseColorString(result.sRGBHex);
      if (!next) return;
      onColorChange(allowAlpha ? next : { ...next, a: 1 });
    } catch {
    }
  }
  function handleFieldChange(index, raw) {
    if (disabled) return;
    if (format === "hex") {
      if (index === 0) {
        const parsed = parseColorString(raw.startsWith("#") ? raw : `#${raw}`);
        if (parsed) {
          const trimmed = raw.trim().replace(/^#/, "");
          const isExplicitAlphaHex = /^[0-9a-f]{8}$/i.test(trimmed);
          const nextAlpha = !allowAlpha ? color.a : isExplicitAlphaHex ? parsed.a : color.a;
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
      const next2 = Number.parseFloat(raw);
      if (!Number.isFinite(next2)) return;
      const draft2 = { ...color };
      if (index === 0) draft2.r = clamp(next2, 0, 255);
      if (index === 1) draft2.g = clamp(next2, 0, 255);
      if (index === 2) draft2.b = clamp(next2, 0, 255);
      if (index === 3) draft2.a = clamp(next2 / 100, 0, 1);
      onColorChange(draft2);
      return;
    }
    if (format === "hsl") {
      const next2 = Number.parseFloat(raw);
      if (!Number.isFinite(next2)) return;
      const draft2 = { ...hsla };
      if (index === 0) draft2.h = next2;
      if (index === 1) draft2.s = clamp(next2, 0, 100);
      if (index === 2) draft2.l = clamp(next2, 0, 100);
      if (index === 3) draft2.a = clamp(next2 / 100, 0, 1);
      onColorChange(hslaToRgba(draft2));
      return;
    }
    const next = Number.parseFloat(raw);
    if (!Number.isFinite(next)) return;
    const draft = { ...hsva };
    if (index === 0) draft.h = next;
    if (index === 1) draft.s = clamp(next, 0, 100);
    if (index === 2) draft.v = clamp(next, 0, 100);
    if (index === 3) draft.a = clamp(next / 100, 0, 1);
    onColorChange(hsvaToRgba(draft));
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: utils.cn("vds-color-picker-solid-editor", compact && "vds-color-picker-solid-editor--compact"),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            ref: saturationRef,
            role: "application",
            tabIndex: disabled ? -1 : 0,
            "aria-label": "Saturation and brightness",
            "aria-describedby": labelId,
            className: "vds-color-picker-saturation",
            style: saturationStyle,
            onPointerDown: handleSaturationPointerDown,
            onKeyDown: handleSaturationKeyDown,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: "vds-color-picker-saturation-thumb",
                style: {
                  insetInlineStart: `${toFiniteNumber(hsva.s, 0)}%`,
                  insetBlockStart: `${toFiniteNumber(100 - hsva.v, 0)}%`
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("span", { id: labelId, className: "vds-color-picker-sr-only", children: "Use arrow keys to adjust saturation and brightness." }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-slider-stack", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-slider-row", children: [
            eyeDropperSupported ? /* @__PURE__ */ jsxRuntime.jsx(
              PickerButton,
              {
                iconOnly: true,
                className: "vds-color-picker-slider-action",
                "aria-label": "Pick color from screen",
                onClick: handleEyeDropper,
                disabled,
                leftSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconColorPicker, { size: 16, stroke: 1.75, "aria-hidden": "true" })
              }
            ) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-slider-spacer", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              SliderControl,
              {
                ariaLabel: "Hue",
                value: hsva.h,
                min: 0,
                max: 360,
                step: 1,
                disabled,
                background: "linear-gradient(90deg, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)",
                onChange: (nextHue) => onColorChange(hsvaToRgba({ ...hsva, h: nextHue }))
              }
            )
          ] }),
          allowAlpha ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-slider-row", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-slider-spacer", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              SliderControl,
              {
                ariaLabel: "Alpha",
                className: "vds-color-picker-slider--alpha",
                value: color.a * 100,
                min: 0,
                max: 100,
                step: 1,
                disabled,
                background: `linear-gradient(90deg, rgba(${color.r}, ${color.g}, ${color.b}, 0) 0%, rgba(${color.r}, ${color.g}, ${color.b}, 1) 100%)`,
                onChange: (nextAlpha) => onColorChange({ ...color, a: nextAlpha / 100 })
              }
            )
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-value-bar", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            reactSelect.Select,
            {
              value: format,
              onValueChange: (nextValue) => onFormatChange(nextValue),
              disabled,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  reactSelect.SelectTrigger,
                  {
                    size: "xs",
                    appearance: "soft",
                    className: "vds-color-picker-format-select",
                    "aria-label": "Color format",
                    children: /* @__PURE__ */ jsxRuntime.jsx(reactSelect.SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(reactSelect.SelectContent, { size: "xs", children: FORMAT_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntime.jsx(reactSelect.SelectItem, { value: option.format, children: option.label }, option.format)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-color-picker-value-fields", "data-format": format, children: fields.map((field, index) => /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "vds-color-picker-value-field",
              "data-wide": field.wide ? "true" : void 0,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-sr-only", children: field.label }),
                /* @__PURE__ */ jsxRuntime.jsxs(
                  "span",
                  {
                    className: "vds-color-picker-field-input-wrap",
                    "data-has-prefix": field.label === "Hex" ? "true" : void 0,
                    children: [
                      field.label === "Hex" ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-field-prefix", children: "#" }) : null,
                      field.inputMode === "text" ? /* @__PURE__ */ jsxRuntime.jsx(
                        HexField,
                        {
                          className: "vds-color-picker-value-input",
                          value: field.value,
                          "aria-label": field.label,
                          onValueChange: (raw) => handleFieldChange(index, raw),
                          disabled
                        }
                      ) : /* @__PURE__ */ jsxRuntime.jsx(
                        NumberField,
                        {
                          className: "vds-color-picker-value-input",
                          value: field.value,
                          min: field.min,
                          max: field.max,
                          "aria-label": field.label,
                          onValueChange: (raw) => handleFieldChange(index, raw),
                          disabled: disabled || !allowAlpha && field.label === "A"
                        }
                      ),
                      field.unit ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-field-unit", children: field.unit }) : null
                    ]
                  }
                )
              ]
            },
            `${field.label}-${index}`
          )) })
        ] })
      ]
    }
  );
}
var ColorPicker = react.forwardRef(function ColorPicker2({
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
}, forwardedRef) {
  const lastEmittedRef = react.useRef(null);
  const normalizedControlledValue = react.useMemo(() => {
    if (value === void 0) return void 0;
    if (typeof value === "string" && lastEmittedRef.current?.css === value) {
      return lastEmittedRef.current.value;
    }
    if (typeof value !== "string") {
      return normalizeColorPickerValue(value);
    }
    return normalizeColorPickerValue(value);
  }, [value]);
  const initialValue = react.useMemo(
    () => normalizeColorPickerValue(
      value ?? defaultValue ?? (mode === "gradient" ? "linear-gradient(90deg, #d9d9d9 0%, #737373 100%)" : "#ffffff")
    ),
    [defaultValue, mode, value]
  );
  const [currentValue, setCurrentValue] = useControllableState({
    value: normalizedControlledValue,
    defaultValue: initialValue
  });
  const [currentFormat, setCurrentFormat] = useControllableState({
    value: format,
    defaultValue: defaultFormat,
    onChange: onFormatChange
  });
  const [currentView, setCurrentView] = useControllableState({
    value: view,
    defaultValue: defaultView,
    onChange: onViewChange
  });
  const [activeStopId, setActiveStopId] = react.useState(
    () => initialValue.type !== "solid" ? initialValue.stops[0]?.id ?? null : null
  );
  const [openStopId, setOpenStopId] = react.useState(null);
  const [draggingStopId, setDraggingStopId] = react.useState(null);
  const [dropTarget, setDropTarget] = react.useState(null);
  const [codeDraft, setCodeDraft] = react.useState(() => serializeColorPickerValue(initialValue));
  const [codeError, setCodeError] = react.useState(null);
  const [copied, setCopied] = react.useState(false);
  const gradientTrackRef = react.useRef(null);
  const activeStopSnapshotRef = react.useRef(null);
  const lastGradientTypeRef = react.useRef(
    initialValue.type === "solid" ? "linear" : initialValue.type
  );
  const lastGradientValueRef = react.useRef(
    initialValue.type === "solid" ? null : initialValue
  );
  const inlineId = react.useId();
  const allowedFromMode = mode === "solid" ? ["solid"] : mode === "gradient" ? ["linear", "radial", "conic"] : ["solid", "linear", "radial", "conic"];
  const effectiveTypes = (allowedTypes?.length ? allowedTypes : allowedFromMode).filter(
    (type, index, list) => allowedFromMode.includes(type) && list.indexOf(type) === index
  );
  const gradientTypeOptions = TYPE_OPTIONS.filter(
    (option) => option.type !== "solid" && effectiveTypes.includes(option.type)
  );
  const showModeStrip = mode === "both" && effectiveTypes.includes("solid") && gradientTypeOptions.length > 0;
  const activeType = currentValue.type;
  const activeColor = getActiveColor(currentValue, activeStopId);
  const cssValue = serializeColorPickerValue(currentValue);
  const internalMode = activeType === "solid" ? "solid" : "gradient";
  const eyeDropperSupported = allowEyedropper && typeof window !== "undefined" && typeof window.EyeDropper === "function";
  const swatchColors = swatches.map((swatch) => parseColorString(swatch)).filter((swatch) => swatch != null);
  const gradientStops = currentValue.type === "solid" ? [] : currentValue.stops;
  react.useEffect(() => {
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
      activeStopSnapshotRef.current
    );
    if (fallbackStopId !== activeStopId) {
      setActiveStopId(fallbackStopId);
    }
  }, [activeStopId, currentValue]);
  react.useEffect(() => {
    setCodeDraft(cssValue);
  }, [cssValue]);
  react.useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [copied]);
  function emitValue(nextValue, nextActiveStopId = activeStopId) {
    if (nextValue.type === "solid") {
      activeStopSnapshotRef.current = null;
    } else {
      const resolvedStop = nextValue.stops.find((stop) => stop.id === nextActiveStopId) ?? nextValue.stops[0] ?? null;
      activeStopSnapshotRef.current = getStopSnapshot(resolvedStop);
    }
    const cssValue2 = serializeColorPickerValue(nextValue);
    lastEmittedRef.current = { css: cssValue2, value: nextValue };
    setCurrentValue(nextValue);
    const detail = {
      value: nextValue,
      cssValue: cssValue2,
      activeColor: getActiveColor(nextValue, nextActiveStopId),
      format: currentFormat
    };
    onValueChange?.(cssValue2, detail);
  }
  function applyActiveColor(nextColor) {
    emitValue(updateActiveColor(currentValue, nextColor, activeStopId));
  }
  function applyStopColor(stopId, nextColor) {
    if (currentValue.type === "solid") return;
    emitValue(updateStopById(currentValue, stopId, { color: nextColor }), stopId);
  }
  function handleTypeChange(nextType) {
    if (disabled || activeType === nextType) return;
    const nextValue = convertValueType(currentValue, nextType, activeStopId);
    const nextStop = nextValue.type === "solid" ? null : nextValue.stops[0]?.id ?? null;
    setActiveStopId(nextStop);
    emitValue(nextValue, nextStop);
  }
  function handleModeChange(nextMode) {
    if (disabled || nextMode === internalMode) return;
    if (nextMode === "solid") {
      handleTypeChange("solid");
      return;
    }
    const fallbackType = gradientTypeOptions.find((option) => option.type === lastGradientTypeRef.current)?.type ?? gradientTypeOptions[0]?.type;
    if (!fallbackType) return;
    const savedGradient = lastGradientValueRef.current;
    if (savedGradient && savedGradient.type !== "solid") {
      const restored = savedGradient.type === fallbackType ? savedGradient : convertValueType(savedGradient, fallbackType, savedGradient.stops[0]?.id ?? null);
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
  function handleGradientTrackPointerDown(event) {
    if (disabled || currentValue.type === "solid") return;
    if (event.target.closest("[data-stop-handle]")) return;
    const rect = gradientTrackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const position = (event.clientX - rect.left) / rect.width * 100;
    const result = addGradientStop(currentValue, position);
    if (!result.stopId) return;
    setActiveStopId(result.stopId);
    emitValue(result.value, result.stopId);
  }
  function handleStopPointerDown(stopId, event) {
    if (disabled || currentValue.type === "solid") return;
    event.preventDefault();
    setActiveStopId(stopId);
    let moved = false;
    const startX = event.clientX;
    const update = (clientX) => {
      const rect = gradientTrackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const position = clamp((clientX - rect.left) / rect.width * 100, 0, 100);
      emitValue(updateStopPosition(currentValue, stopId, position), stopId);
    };
    const move = (e) => {
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
  function handleStopKeyDown(stop, event) {
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
    setCurrentView("visual");
  }
  function handleGradientMetaChange(next) {
    if (disabled || currentValue.type === "solid") return;
    emitValue({ ...currentValue, ...next });
  }
  function handleStopRowChange(stopId, field, raw) {
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
        color: { ...stopColor, a: clamp(alpha / 100, 0, 1) }
      }),
      stopId
    );
  }
  function handleRemoveStop(stopId) {
    if (disabled || currentValue.type === "solid" || currentValue.stops.length <= 2) return;
    const index = currentValue.stops.findIndex((stop) => stop.id === stopId);
    const fallback = currentValue.stops[index - 1] ?? currentValue.stops[index + 1] ?? null;
    const nextValue = removeGradientStop(currentValue, stopId);
    setActiveStopId(fallback?.id ?? null);
    emitValue(nextValue, fallback?.id ?? null);
  }
  function handleReverseStops() {
    if (disabled || currentValue.type === "solid") return;
    const reversed = [...currentValue.stops].map((stop) => ({ ...stop, position: 100 - stop.position })).sort((a, b) => a.position - b.position);
    emitValue({ ...currentValue, stops: reversed }, activeStopId);
  }
  const showHeader = showModeStrip || showCodeView;
  const isGradient = currentValue.type !== "solid";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: forwardedRef,
      className: utils.cn("vds-color-picker", className),
      "data-mode": isGradient ? "gradient" : "solid",
      "data-appearance": appearance,
      "data-view": currentView,
      "data-disabled": disabled ? "true" : void 0,
      ...props,
      children: [
        showHeader ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-header", children: [
          showModeStrip ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-color-picker-mode-strip", role: "tablist", "aria-label": "Picker mode", children: MODE_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isActive = internalMode === option.mode;
            return /* @__PURE__ */ jsxRuntime.jsx(
              PickerButton,
              {
                iconOnly: true,
                active: isActive,
                "aria-pressed": isActive,
                "aria-label": option.label,
                onClick: () => handleModeChange(option.mode),
                disabled,
                leftSection: /* @__PURE__ */ jsxRuntime.jsx(Icon, { size: 16, stroke: 1.75, "aria-hidden": "true" })
              },
              option.mode
            );
          }) }) : /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true" }),
          showCodeView ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-color-picker-header-actions", children: /* @__PURE__ */ jsxRuntime.jsx(
            PickerButton,
            {
              iconOnly: true,
              active: currentView === "code",
              "aria-pressed": currentView === "code",
              "aria-label": "Toggle code mode",
              onClick: () => setCurrentView(currentView === "code" ? "visual" : "code"),
              disabled,
              leftSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCode, { size: 16, stroke: 1.75, "aria-hidden": "true" })
            }
          ) }) : null
        ] }) : null,
        currentView === "code" && showCodeView ? /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: "vds-color-picker-code-preview",
            "aria-label": "Current value preview",
            style: { background: cssValue }
          }
        ) : null,
        currentView !== "code" && !isGradient ? /* @__PURE__ */ jsxRuntime.jsx(
          SolidEditor,
          {
            color: activeColor,
            format: currentFormat,
            onFormatChange: setCurrentFormat,
            onColorChange: applyActiveColor,
            allowAlpha,
            allowEyedropper: eyeDropperSupported,
            disabled
          }
        ) : currentView !== "code" && isGradient ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-gradient-section", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-gradient-topbar", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
              reactSelect.Select,
              {
                value: currentValue.type,
                onValueChange: (nextValue) => handleTypeChange(nextValue),
                disabled,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    reactSelect.SelectTrigger,
                    {
                      size: "xs",
                      appearance: "soft",
                      className: "vds-color-picker-select-trigger",
                      "aria-label": "Gradient type",
                      children: /* @__PURE__ */ jsxRuntime.jsx(reactSelect.SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(reactSelect.SelectContent, { size: "xs", children: gradientTypeOptions.map((option) => /* @__PURE__ */ jsxRuntime.jsx(reactSelect.SelectItem, { value: option.type, children: option.label }, option.type)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-gradient-actions", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                PickerButton,
                {
                  iconOnly: true,
                  "aria-label": "Reverse gradient stops",
                  onClick: handleReverseStops,
                  disabled,
                  leftSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconArrowsLeftRight, { size: 16, stroke: 1.75, "aria-hidden": "true" })
                }
              ),
              "angle" in currentValue ? /* @__PURE__ */ jsxRuntime.jsxs(
                "label",
                {
                  className: "vds-color-picker-inline-chip",
                  htmlFor: `${inlineId}-angle`,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      NumberField,
                      {
                        id: `${inlineId}-angle`,
                        className: "vds-color-picker-inline-input",
                        value: String(safeRound(currentValue.angle, 0)),
                        min: 0,
                        max: 360,
                        step: 1,
                        onValueChange: (raw) => handleGradientMetaChange({ angle: Number.parseFloat(raw) || 0 }),
                        disabled,
                        "aria-label": "Gradient angle"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-inline-unit", children: "\xB0" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntime.jsx(
                PickerButton,
                {
                  iconOnly: true,
                  active: currentValue.repeating,
                  "aria-pressed": currentValue.repeating,
                  "aria-label": "Toggle repeating gradient",
                  onClick: () => handleGradientMetaChange({ repeating: !currentValue.repeating }),
                  disabled,
                  leftSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconRepeat, { size: 16, stroke: 1.75, "aria-hidden": "true" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              ref: gradientTrackRef,
              className: "vds-color-picker-gradient-track",
              style: { background: cssValue },
              onPointerDown: handleGradientTrackPointerDown,
              children: gradientStops.map((stop) => /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  "data-stop-handle": true,
                  className: "vds-color-picker-stop",
                  "data-active": stop.id === activeStopId ? "true" : void 0,
                  style: {
                    insetInlineStart: `${toFiniteNumber(stop.position, 0)}%`,
                    "--vds-color-picker-stop-color": rgbaToHexString(stop.color, stop.color.a < 1)
                  },
                  "aria-label": `Gradient stop at ${safeRound(stop.position, 1)} percent`,
                  onClick: () => {
                    setActiveStopId(stop.id);
                    setOpenStopId(stop.id);
                  },
                  onPointerDown: (event) => handleStopPointerDown(stop.id, event),
                  onKeyDown: (event) => handleStopKeyDown(stop, event),
                  disabled,
                  children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-stop-swatch" })
                },
                stop.id
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-stop-list", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-stop-list-header", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Stops" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                PickerButton,
                {
                  iconOnly: true,
                  "aria-label": "Add gradient stop",
                  onClick: () => {
                    const result = addGradientStop(currentValue, 50);
                    if (!result.stopId) return;
                    setActiveStopId(result.stopId);
                    emitValue(result.value, result.stopId);
                  },
                  disabled,
                  leftSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconPlus, { size: 14, stroke: 2, "aria-hidden": "true" })
                }
              )
            ] }),
            gradientStops.map((stop) => /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                className: "vds-color-picker-stop-row",
                "data-active": stop.id === activeStopId ? "true" : void 0,
                "data-dragging": draggingStopId === stop.id ? "true" : void 0,
                "data-drop-target": dropTarget?.id === stop.id ? dropTarget.slot : void 0,
                onClick: () => setActiveStopId(stop.id),
                onDragOver: (event) => {
                  if (!draggingStopId || draggingStopId === stop.id) return;
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                  const rect = event.currentTarget.getBoundingClientRect();
                  const slot = event.clientY < rect.top + rect.height / 2 ? "before" : "after";
                  if (dropTarget?.id !== stop.id || dropTarget.slot !== slot) {
                    setDropTarget({ id: stop.id, slot });
                  }
                },
                onDragLeave: (event) => {
                  if (event.currentTarget.contains(event.relatedTarget)) return;
                  if (dropTarget?.id === stop.id) setDropTarget(null);
                },
                onDrop: (event) => {
                  event.preventDefault();
                  if (!draggingStopId || !dropTarget) return;
                  if (draggingStopId !== stop.id) {
                    emitValue(
                      reorderGradientStop(currentValue, draggingStopId, stop.id, dropTarget.slot),
                      draggingStopId
                    );
                  }
                  setDropTarget(null);
                  setDraggingStopId(null);
                },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      className: "vds-color-picker-stop-grip",
                      "aria-label": "Reorder stop \u2014 drag to move",
                      draggable: !disabled,
                      onDragStart: (event) => {
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", stop.id);
                        setDraggingStopId(stop.id);
                      },
                      onDragEnd: () => {
                        setDraggingStopId(null);
                        setDropTarget(null);
                      },
                      disabled,
                      tabIndex: -1,
                      children: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconGripVertical, { size: 14, stroke: 1.75, "aria-hidden": "true" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-stop-cell", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      NumberField,
                      {
                        value: String(safeRound(stop.position, 0)),
                        min: 0,
                        max: 100,
                        step: 1,
                        onValueChange: (raw) => handleStopRowChange(stop.id, "position", raw),
                        disabled,
                        "aria-label": "Stop position"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-stop-cell-suffix", "aria-hidden": "true", children: "%" })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-stop-hex", children: [
                    /* @__PURE__ */ jsxRuntime.jsxs(
                      reactPopover.Popover,
                      {
                        open: openStopId === stop.id,
                        onOpenChange: (next) => {
                          if (next) {
                            setActiveStopId(stop.id);
                            setOpenStopId(stop.id);
                          } else if (openStopId === stop.id) {
                            setOpenStopId(null);
                          }
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(reactPopover.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
                            "button",
                            {
                              type: "button",
                              className: "vds-color-picker-stop-color-chip",
                              style: {
                                background: rgbaToHexString(stop.color, stop.color.a < 1)
                              },
                              "aria-label": "Edit stop color",
                              disabled
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntime.jsx(
                            reactPopover.PopoverContent,
                            {
                              side: "left",
                              align: "start",
                              sideOffset: 8,
                              collisionPadding: 12,
                              avoidCollisions: true,
                              className: "vds-color-picker-popover",
                              children: /* @__PURE__ */ jsxRuntime.jsx(
                                SolidEditor,
                                {
                                  compact: true,
                                  color: stop.color,
                                  format: currentFormat,
                                  onFormatChange: setCurrentFormat,
                                  onColorChange: (next) => applyStopColor(stop.id, next),
                                  allowAlpha,
                                  allowEyedropper: eyeDropperSupported,
                                  disabled
                                }
                              )
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      HexField,
                      {
                        className: "vds-color-picker-stop-hex-input",
                        value: rgbaToHexString(stop.color, false).replace(/^#/, "").toUpperCase(),
                        onValueChange: (raw) => handleStopRowChange(stop.id, "hex", raw),
                        disabled,
                        "aria-label": "Stop hex"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-stop-cell", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      NumberField,
                      {
                        value: String(safeRound(stop.color.a * 100, 0)),
                        min: 0,
                        max: 100,
                        step: 1,
                        onValueChange: (raw) => handleStopRowChange(stop.id, "alpha", raw),
                        disabled: disabled || !allowAlpha,
                        "aria-label": "Stop alpha"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-stop-cell-suffix", "aria-hidden": "true", children: "%" })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    PickerButton,
                    {
                      iconOnly: true,
                      className: "vds-color-picker-stop-row-action",
                      "aria-label": "Remove stop",
                      onClick: (event) => {
                        event.stopPropagation();
                        handleRemoveStop(stop.id);
                      },
                      disabled: disabled || gradientStops.length <= 2,
                      leftSection: /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconMinus, { size: 14, stroke: 2, "aria-hidden": "true" })
                    }
                  )
                ]
              },
              stop.id
            ))
          ] }),
          "shape" in currentValue || "centerX" in currentValue ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-gradient-meta", children: [
            "shape" in currentValue ? /* @__PURE__ */ jsxRuntime.jsxs(
              reactSelect.Select,
              {
                value: currentValue.shape,
                onValueChange: (nextValue) => handleGradientMetaChange({ shape: nextValue }),
                disabled,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    reactSelect.SelectTrigger,
                    {
                      size: "xs",
                      appearance: "soft",
                      className: "vds-color-picker-select-trigger",
                      "aria-label": "Gradient shape",
                      children: /* @__PURE__ */ jsxRuntime.jsx(reactSelect.SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(reactSelect.SelectContent, { size: "xs", children: SHAPE_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntime.jsx(reactSelect.SelectItem, { value: option.shape, children: option.label }, option.shape)) })
                ]
              }
            ) : null,
            "centerX" in currentValue ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "label",
                {
                  className: "vds-color-picker-inline-chip",
                  htmlFor: `${inlineId}-center-x`,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-inline-label", children: "X" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      NumberField,
                      {
                        id: `${inlineId}-center-x`,
                        className: "vds-color-picker-inline-input",
                        value: String(safeRound(currentValue.centerX, 0)),
                        min: -100,
                        max: 100,
                        onValueChange: (raw) => handleGradientMetaChange({ centerX: Number.parseFloat(raw) || 0 }),
                        disabled,
                        "aria-label": "Center X"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-inline-unit", children: "%" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs(
                "label",
                {
                  className: "vds-color-picker-inline-chip",
                  htmlFor: `${inlineId}-center-y`,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-inline-label", children: "Y" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      NumberField,
                      {
                        id: `${inlineId}-center-y`,
                        className: "vds-color-picker-inline-input",
                        value: String(safeRound(currentValue.centerY, 0)),
                        min: -100,
                        max: 100,
                        onValueChange: (raw) => handleGradientMetaChange({ centerY: Number.parseFloat(raw) || 0 }),
                        disabled,
                        "aria-label": "Center Y"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-inline-unit", children: "%" })
                  ]
                }
              )
            ] }) : null
          ] }) : null
        ] }) : null,
        currentView !== "code" && swatchColors.length ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "vds-color-picker-swatches", "aria-label": "Swatches", children: swatchColors.map((swatch, index) => /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: "vds-color-picker-swatch",
            style: { background: rgbaToHexString(swatch, swatch.a < 1) },
            onClick: () => applyActiveColor(allowAlpha ? swatch : { ...swatch, a: 1 }),
            disabled,
            "aria-label": `Apply swatch ${index + 1}`
          },
          `${swatch.r}-${swatch.g}-${swatch.b}-${swatch.a}-${index}`
        )) }) : null,
        currentView === "code" && showCodeView ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-code-panel", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-code-header", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Code" }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "vds-color-picker-code-actions", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                PickerButton,
                {
                  iconOnly: true,
                  "aria-label": copied ? "Copied" : "Copy CSS",
                  onClick: handleCopyCss,
                  disabled,
                  leftSection: copied ? /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCheck, { size: 16, stroke: 2, "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntime.jsx(reactIcons.IconCopy, { size: 16, stroke: 1.75, "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                reactButton.Button,
                {
                  type: "button",
                  className: "vds-color-picker-text-button",
                  size: "xs",
                  variant: "soft",
                  color: "primary",
                  onClick: handleCodeApply,
                  disabled,
                  children: "Apply"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            PickerTextarea,
            {
              className: "vds-color-picker-code-input",
              value: codeDraft,
              onChange: (event) => setCodeDraft(event.currentTarget.value),
              onKeyDown: (event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                  event.preventDefault();
                  handleCodeApply();
                }
              },
              spellCheck: false,
              disabled
            }
          ),
          codeError ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "vds-color-picker-code-error", children: codeError }) : null
        ] }) : null
      ]
    }
  );
});
function getFieldDescriptors(color, format) {
  if (format === "hex") {
    return [
      {
        label: "Hex",
        value: rgbaToHexString(color, false).replace(/^#/, "").toUpperCase(),
        inputMode: "text",
        wide: true
      },
      {
        label: "A",
        value: String(safeRound(color.a * 100, 0)),
        inputMode: "decimal",
        unit: "%",
        min: 0,
        max: 100
      }
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
        max: 100
      }
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
        max: 100
      },
      {
        label: "L",
        value: String(safeRound(hsl.l, 0)),
        inputMode: "decimal",
        unit: "%",
        min: 0,
        max: 100
      },
      {
        label: "A",
        value: String(safeRound(hsl.a * 100, 0)),
        inputMode: "decimal",
        unit: "%",
        min: 0,
        max: 100
      }
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
      max: 100
    },
    {
      label: "B",
      value: String(safeRound(hsb.v, 0)),
      inputMode: "decimal",
      unit: "%",
      min: 0,
      max: 100
    },
    {
      label: "A",
      value: String(safeRound(hsb.a * 100, 0)),
      inputMode: "decimal",
      unit: "%",
      min: 0,
      max: 100
    }
  ];
}

exports.ColorPicker = ColorPicker;
exports.addGradientStop = addGradientStop;
exports.clamp = clamp;
exports.convertValueType = convertValueType;
exports.createColorPickerValue = createColorPickerValue;
exports.getActiveColor = getActiveColor;
exports.hslaToRgba = hslaToRgba;
exports.hsvaToRgba = hsvaToRgba;
exports.normalizeColorPickerValue = normalizeColorPickerValue;
exports.parseColorPickerValue = parseColorPickerValue;
exports.parseColorString = parseColorString;
exports.removeGradientStop = removeGradientStop;
exports.reorderGradientStop = reorderGradientStop;
exports.rgbaToDisplayString = rgbaToDisplayString;
exports.rgbaToHexString = rgbaToHexString;
exports.rgbaToHsbString = rgbaToHsbString;
exports.rgbaToHslString = rgbaToHslString;
exports.rgbaToHsla = rgbaToHsla;
exports.rgbaToHsva = rgbaToHsva;
exports.rgbaToRgbString = rgbaToRgbString;
exports.serializeColorPickerValue = serializeColorPickerValue;
exports.updateActiveColor = updateActiveColor;
exports.updateStopById = updateStopById;
exports.updateStopPosition = updateStopPosition;
