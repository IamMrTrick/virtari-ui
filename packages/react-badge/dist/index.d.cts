import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, MouseEvent, Ref } from 'react';

/** Intent palette — orthogonal to variant. */
type BadgeColor = "primary" | "success" | "warning" | "danger" | "info" | "accent" | "neutral";
/** Appearance — fill weight. `soft` is the default: muted bg + color text. */
type BadgeVariant = "soft" | "solid" | "outline" | "subtle" | "soft-outline"
/** @deprecated Use `color="neutral"` + `variant="soft"`. */
 | "default"
/** @deprecated Use `color="neutral"` + `variant="soft"`. */
 | "secondary"
/** @deprecated Use `color="danger"` + `variant="soft"`. */
 | "destructive";
/** Four sizes: xs(18) · sm(20) · md(22) · lg(26). */
type BadgeSize = "xs" | "sm" | "md" | "lg";
/** Corner shape — pill by default; square swaps to element radius for tag look. */
type BadgeShape = "pill" | "square";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Hue/intent. Orthogonal to variant. */
    color?: BadgeColor;
    /** Visual style. */
    variant?: BadgeVariant;
    /** Size preset. */
    size?: BadgeSize;
    /** Corner shape. `pill` (default) uses the badge radius token; `square` uses element radius. */
    shape?: BadgeShape;
    /** Show a leading colored dot (overrides `leftSection`). */
    dot?: boolean;
    /** Render as the dot alone — no label, no padding. Useful for presence markers. */
    dotOnly?: boolean;
    /** Element placed before children. Ignored if `dot` is true. */
    leftSection?: ReactNode;
    /** Element placed after children. Ignored if `onRemove` is set. */
    rightSection?: ReactNode;
    /** If set, renders a close button and calls this on click / Enter / Space. */
    onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
    /** Accessible label for the close button (default "Remove"). */
    removeLabel?: string;
    /** Render as child element (polymorphic via Slot). */
    asChild?: boolean;
    ref?: Ref<HTMLSpanElement>;
}
declare function Badge({ color, variant, size, shape, dot, dotOnly, leftSection, rightSection, onRemove, removeLabel, asChild, className, children, ref, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

export { Badge, type BadgeColor, type BadgeProps, type BadgeShape, type BadgeSize, type BadgeVariant };
