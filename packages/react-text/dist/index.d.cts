import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

type TextSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type TextWeight = "normal" | "medium" | "semibold" | "bold";
type TextTone = "default" | "muted" | "subtle" | "primary" | "success" | "warning" | "danger" | "info" | "inherit";
type TextAlign = "start" | "center" | "end" | "justify";
type TextLeading = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
type TextWrap = "balance" | "pretty" | "nowrap";
type TextElement = "p" | "span" | "div" | "label" | "strong" | "em";
interface TextProps extends React.HTMLAttributes<HTMLElement> {
    as?: TextElement;
    size?: TextSize;
    weight?: TextWeight;
    tone?: TextTone;
    align?: TextAlign;
    leading?: TextLeading;
    truncate?: boolean;
    wrap?: TextWrap;
    asChild?: boolean;
    ref?: Ref<HTMLElement>;
}
declare function Text({ as, size, weight, tone, align, leading, truncate, wrap, asChild, className, ref, ...props }: TextProps): react_jsx_runtime.JSX.Element;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type HeadingWeight = "normal" | "medium" | "semibold" | "bold";
type HeadingTone = "default" | "muted" | "subtle" | "primary" | "success" | "warning" | "danger" | "info" | "inherit";
type HeadingAlign = "start" | "center" | "end" | "justify";
type HeadingLeading = "none" | "tight" | "snug" | "normal" | "relaxed";
type HeadingTracking = "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
type HeadingWrap = "balance" | "pretty" | "nowrap";
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    /** Semantic heading level — controls the rendered tag (h1–h6). */
    level?: HeadingLevel;
    /** Visual size step — defaults to a sensible match for `level`. */
    size?: HeadingSize;
    weight?: HeadingWeight;
    tone?: HeadingTone;
    align?: HeadingAlign;
    leading?: HeadingLeading;
    tracking?: HeadingTracking;
    truncate?: boolean;
    wrap?: HeadingWrap;
    asChild?: boolean;
    ref?: Ref<HTMLHeadingElement>;
}
declare function Heading({ level, size, weight, tone, align, leading, tracking, truncate, wrap, asChild, className, ref, ...props }: HeadingProps): react_jsx_runtime.JSX.Element;

export { Heading, type HeadingAlign, type HeadingLeading, type HeadingLevel, type HeadingProps, type HeadingSize, type HeadingTone, type HeadingTracking, type HeadingWeight, type HeadingWrap, Text, type TextAlign, type TextElement, type TextLeading, type TextProps, type TextSize, type TextTone, type TextWeight, type TextWrap };
