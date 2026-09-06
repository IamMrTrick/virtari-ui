# @virtari-packages/react-color-picker API snapshot

Version: 1.0.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./styles": "./dist/ColorPicker.css",
  "./tokens": "./dist/ColorPicker.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `ColorPicker` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ColorPickerAppearance` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ColorPickerMode` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ColorPickerProps` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ColorPickerChangeDetail` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ColorPickerFormat` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ColorPickerType` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ColorPickerValue` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ColorPickerView` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ColorStop` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `ConicGradientValue` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `GradientShape` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `HslaColor` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `HsvaColor` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `LinearGradientValue` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `RadialGradientValue` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `RgbaColor` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `SolidColorValue` (type) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `addGradientStop` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `clamp` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `convertValueType` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `createColorPickerValue` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `getActiveColor` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `hslaToRgba` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `hsvaToRgba` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `normalizeColorPickerValue` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `parseColorPickerValue` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `parseColorString` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `removeGradientStop` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `reorderGradientStop` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `rgbaToDisplayString` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `rgbaToHexString` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `rgbaToHsbString` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `rgbaToHslString` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `rgbaToHsla` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `rgbaToHsva` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `rgbaToRgbString` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `serializeColorPickerValue` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `updateActiveColor` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `updateStopById` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.
- `updateStopPosition` (export) from `@virtari-packages/react-color-picker`; source: `packages/react-color-picker/src/index.ts`.

## Source type declarations

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function clamp(value: number, min: number, max: number);
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function round(value: number, precision = 0);
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function normalizeDegrees(value: number);
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function normalizeRgba(color: RgbaColor): RgbaColor;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function cloneRgba(color: RgbaColor): RgbaColor;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function rgbaToHsva(color: RgbaColor): HsvaColor;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function hsvaToRgba(color: HsvaColor): RgbaColor;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function rgbaToHsla(color: RgbaColor): HslaColor;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function hslaToRgba(color: HslaColor): RgbaColor;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function rgbaToHexString(color: RgbaColor, includeAlpha = color.a < 1);
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function rgbaToRgbString(color: RgbaColor);
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function rgbaToHslString(color: RgbaColor);
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function rgbaToHsbString(color: RgbaColor);
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function rgbaToDisplayString(color: RgbaColor, format: ColorPickerFormat);
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function parseColorString(input: string): RgbaColor | null;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function parseColorPickerValue(input: string): ColorPickerValue | null;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function mixColors(left: RgbaColor, right: RgbaColor, amount: number): RgbaColor;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function createDefaultStops(baseColor: RgbaColor): ColorStop[];
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function createColorPickerValue(type: ColorPickerType, seed?: RgbaColor): ColorPickerValue;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function cloneColorPickerValue(value: ColorPickerValue): ColorPickerValue;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function normalizeColorPickerValue(input?: string | ColorPickerValue | null): ColorPickerValue;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function serializeColorPickerValue(value: ColorPickerValue);
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function getActiveColor(value: ColorPickerValue, activeStopId?: string | null): RgbaColor;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function updateActiveColor(
  value: ColorPickerValue,
  color: RgbaColor,
  activeStopId?: string | null,
): ColorPickerValue;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function updateStopPosition(value: ColorPickerValue, stopId: string, position: number): ColorPickerValue;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function updateStopById(
  value: ColorPickerValue,
  stopId: string,
  patch: Partial<Pick<ColorStop, "position" | "color">>,
): ColorPickerValue;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function addGradientStop(value: ColorPickerValue, position = 50): { value: ColorPickerValue; stopId: string | null };
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function removeGradientStop(value: ColorPickerValue, stopId: string): ColorPickerValue;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function reorderGradientStop(
  value: ColorPickerValue,
  fromId: string,
  toId: string,
  slot: "before" | "after",
): ColorPickerValue;
```

Source: `packages/react-color-picker/src/color-utils.ts`

```tsx
export function convertValueType(
  value: ColorPickerValue,
  nextType: ColorPickerType,
  activeStopId?: string | null,
): ColorPickerValue;
```

Source: `packages/react-color-picker/src/ColorPicker.tsx`

```tsx
export type ColorPickerMode = "solid" | "gradient" | "both";
```

Source: `packages/react-color-picker/src/ColorPicker.tsx`

```tsx
export type ColorPickerAppearance = "card" | "flat" | "floating";
```

Source: `packages/react-color-picker/src/ColorPicker.tsx`

```tsx
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
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export interface HslaColor {
  h: number;
  s: number;
  l: number;
  a: number;
}
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export type ColorPickerFormat = "hex" | "rgb" | "hsl" | "hsb";
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export type ColorPickerView = "visual" | "code";
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export type ColorPickerType = "solid" | "linear" | "radial" | "conic";
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export type GradientShape = "circle" | "ellipse";
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export interface ColorStop {
  id: string;
  color: RgbaColor;
  position: number;
}
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export interface SolidColorValue {
  type: "solid";
  color: RgbaColor;
}
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export interface LinearGradientValue {
  type: "linear";
  repeating: boolean;
  angle: number;
  stops: ColorStop[];
}
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export interface RadialGradientValue {
  type: "radial";
  repeating: boolean;
  shape: GradientShape;
  centerX: number;
  centerY: number;
  stops: ColorStop[];
}
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export interface ConicGradientValue {
  type: "conic";
  repeating: boolean;
  angle: number;
  centerX: number;
  centerY: number;
  stops: ColorStop[];
}
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export type ColorPickerValue =
  | SolidColorValue
  | LinearGradientValue
  | RadialGradientValue
  | ConicGradientValue;
```

Source: `packages/react-color-picker/src/types.ts`

```tsx
export interface ColorPickerChangeDetail {
  value: ColorPickerValue;
  cssValue: string;
  activeColor: RgbaColor;
  format: ColorPickerFormat;
}
```

Source: `packages/react-color-picker/src/useControllableState.ts`

```tsx
export interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}
```

Source: `packages/react-color-picker/src/useControllableState.ts`

```tsx
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, Dispatch<SetStateAction<T>>];
```

## Source files

- `packages/react-color-picker/src/color-utils.ts`
- `packages/react-color-picker/src/ColorPicker.css`
- `packages/react-color-picker/src/ColorPicker.tokens.css`
- `packages/react-color-picker/src/ColorPicker.tsx`
- `packages/react-color-picker/src/index.ts`
- `packages/react-color-picker/src/types.ts`
- `packages/react-color-picker/src/useControllableState.ts`
- `packages/react-color-picker/package.json`
