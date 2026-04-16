import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, Ref } from 'react';

type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "destructive" | "link";
/**
 * Button size presets.
 *
 * | Size | Height | WCAG AA (24px) | WCAG AAA (44px) | Apple HIG | Google MD |
 * |------|--------|----------------|-----------------|-----------|-----------|
 * | 2xs  | 24px   | ⚠ minimum      | ✗               | ✗         | ✗         |
 * | xs   | 28px   | ✓              | ✗               | ✗         | ✗         |
 * | sm   | 32px   | ✓              | ✗               | ✗         | ✗         |
 * | md   | 40px   | ✓              | ✗               | ✗         | ✗         |
 * | lg   | 44px   | ✓              | ✓               | ✓         | ✗         |
 * | xl   | 52px   | ✓              | ✓               | ✓         | ✓         |
 * | 2xl  | 64px   | ✓              | ✓               | ✓         | ✓         |
 *
 * For touch-primary interfaces, prefer `lg`+ to meet AAA and platform guidelines.
 */
type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
/** Visual effects — requires importing `@virtari/react-button/styles/effects` */
type ButtonEffect = "shine" | "raised" | "glow" | "glass" | "outline-glow";
/** Attention animations — requires importing `@virtari/react-button/styles/animations` */
type ButtonAnimation = "pulse" | "bounce" | "shake" | "jiggle";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size preset */
    size?: ButtonSize;
    /** Render as child element (polymorphic via Radix Slot) */
    asChild?: boolean;
    /** Show loading spinner and disable interaction */
    loading?: boolean;
    /** Accessible label for loading state (announced by screen readers) */
    loadingText?: string;
    /** Element placed before children (icon, badge, etc.) */
    leftSection?: ReactNode;
    /** Element placed after children */
    rightSection?: ReactNode;
    /** Take full width of parent */
    fullWidth?: boolean;
    /** Visual effect (requires effects CSS import) */
    effect?: ButtonEffect;
    /** Attention animation (requires animations CSS import) */
    animation?: ButtonAnimation;
    ref?: Ref<HTMLButtonElement>;
}
declare function Button({ variant, size, asChild, loading, loadingText, leftSection, rightSection, fullWidth, effect, animation, disabled, className, children, ref, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

export { Button, type ButtonAnimation, type ButtonEffect, type ButtonProps, type ButtonSize, type ButtonVariant };
