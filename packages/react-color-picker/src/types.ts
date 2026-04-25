export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

export interface HslaColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

export type ColorPickerFormat = "hex" | "rgb" | "hsl" | "hsb";
export type ColorPickerView = "visual" | "code";
export type ColorPickerType = "solid" | "linear" | "radial" | "conic";
export type GradientShape = "circle" | "ellipse";

export interface ColorStop {
  id: string;
  color: RgbaColor;
  position: number;
}

export interface SolidColorValue {
  type: "solid";
  color: RgbaColor;
}

export interface LinearGradientValue {
  type: "linear";
  repeating: boolean;
  angle: number;
  stops: ColorStop[];
}

export interface RadialGradientValue {
  type: "radial";
  repeating: boolean;
  shape: GradientShape;
  centerX: number;
  centerY: number;
  stops: ColorStop[];
}

export interface ConicGradientValue {
  type: "conic";
  repeating: boolean;
  angle: number;
  centerX: number;
  centerY: number;
  stops: ColorStop[];
}

export type ColorPickerValue =
  | SolidColorValue
  | LinearGradientValue
  | RadialGradientValue
  | ConicGradientValue;

export interface ColorPickerChangeDetail {
  value: ColorPickerValue;
  cssValue: string;
  activeColor: RgbaColor;
  format: ColorPickerFormat;
}
