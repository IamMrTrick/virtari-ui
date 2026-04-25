import * as react from 'react';
import { HTMLAttributes } from 'react';

interface RgbaColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
interface HsvaColor {
    h: number;
    s: number;
    v: number;
    a: number;
}
interface HslaColor {
    h: number;
    s: number;
    l: number;
    a: number;
}
type ColorPickerFormat = "hex" | "rgb" | "hsl" | "hsb";
type ColorPickerView = "visual" | "code";
type ColorPickerType = "solid" | "linear" | "radial" | "conic";
type GradientShape = "circle" | "ellipse";
interface ColorStop {
    id: string;
    color: RgbaColor;
    position: number;
}
interface SolidColorValue {
    type: "solid";
    color: RgbaColor;
}
interface LinearGradientValue {
    type: "linear";
    repeating: boolean;
    angle: number;
    stops: ColorStop[];
}
interface RadialGradientValue {
    type: "radial";
    repeating: boolean;
    shape: GradientShape;
    centerX: number;
    centerY: number;
    stops: ColorStop[];
}
interface ConicGradientValue {
    type: "conic";
    repeating: boolean;
    angle: number;
    centerX: number;
    centerY: number;
    stops: ColorStop[];
}
type ColorPickerValue = SolidColorValue | LinearGradientValue | RadialGradientValue | ConicGradientValue;
interface ColorPickerChangeDetail {
    value: ColorPickerValue;
    cssValue: string;
    activeColor: RgbaColor;
    format: ColorPickerFormat;
}

declare global {
    interface EyeDropper {
        open(): Promise<{
            sRGBHex: string;
        }>;
    }
    interface Window {
        EyeDropper?: {
            new (): EyeDropper;
        };
    }
}
type ColorPickerMode = "solid" | "gradient" | "both";
/**
 * Surface treatment for the picker root.
 * - `card`     — solid background + 1px border (default; drops into any layout)
 * - `flat`     — transparent background, no border, zero padding (for embedding)
 * - `floating` — solid background + soft shadow + stronger border (popover/floating)
 */
type ColorPickerAppearance = "card" | "flat" | "floating";
interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
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
declare const ColorPicker: react.ForwardRefExoticComponent<ColorPickerProps & react.RefAttributes<HTMLDivElement>>;

declare function clamp(value: number, min: number, max: number): number;
declare function rgbaToHsva(color: RgbaColor): HsvaColor;
declare function hsvaToRgba(color: HsvaColor): RgbaColor;
declare function rgbaToHsla(color: RgbaColor): HslaColor;
declare function hslaToRgba(color: HslaColor): RgbaColor;
declare function rgbaToHexString(color: RgbaColor, includeAlpha?: boolean): string;
declare function rgbaToRgbString(color: RgbaColor): string;
declare function rgbaToHslString(color: RgbaColor): string;
declare function rgbaToHsbString(color: RgbaColor): string;
declare function rgbaToDisplayString(color: RgbaColor, format: ColorPickerFormat): string;
declare function parseColorString(input: string): RgbaColor | null;
declare function parseColorPickerValue(input: string): ColorPickerValue | null;
declare function createColorPickerValue(type: ColorPickerType, seed?: RgbaColor): ColorPickerValue;
declare function normalizeColorPickerValue(input?: string | ColorPickerValue | null): ColorPickerValue;
declare function serializeColorPickerValue(value: ColorPickerValue): string;
declare function getActiveColor(value: ColorPickerValue, activeStopId?: string | null): RgbaColor;
declare function updateActiveColor(value: ColorPickerValue, color: RgbaColor, activeStopId?: string | null): ColorPickerValue;
declare function updateStopPosition(value: ColorPickerValue, stopId: string, position: number): ColorPickerValue;
declare function updateStopById(value: ColorPickerValue, stopId: string, patch: Partial<Pick<ColorStop, "position" | "color">>): ColorPickerValue;
declare function addGradientStop(value: ColorPickerValue, position?: number): {
    value: ColorPickerValue;
    stopId: string | null;
};
declare function removeGradientStop(value: ColorPickerValue, stopId: string): ColorPickerValue;
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
declare function reorderGradientStop(value: ColorPickerValue, fromId: string, toId: string, slot: "before" | "after"): ColorPickerValue;
declare function convertValueType(value: ColorPickerValue, nextType: ColorPickerType, activeStopId?: string | null): ColorPickerValue;

export { ColorPicker, type ColorPickerAppearance, type ColorPickerChangeDetail, type ColorPickerFormat, type ColorPickerMode, type ColorPickerProps, type ColorPickerType, type ColorPickerValue, type ColorPickerView, type ColorStop, type ConicGradientValue, type GradientShape, type HslaColor, type HsvaColor, type LinearGradientValue, type RadialGradientValue, type RgbaColor, type SolidColorValue, addGradientStop, clamp, convertValueType, createColorPickerValue, getActiveColor, hslaToRgba, hsvaToRgba, normalizeColorPickerValue, parseColorPickerValue, parseColorString, removeGradientStop, reorderGradientStop, rgbaToDisplayString, rgbaToHexString, rgbaToHsbString, rgbaToHslString, rgbaToHsla, rgbaToHsva, rgbaToRgbString, serializeColorPickerValue, updateActiveColor, updateStopById, updateStopPosition };
