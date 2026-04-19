import * as react from 'react';
import { ReactNode } from 'react';

/** Intent palette — orthogonal to variant. Picks the hue family. */
type ButtonColor = "primary" | "success" | "warning" | "danger" | "info" | "accent" | "neutral" | "contrast";
/** Appearance — solid fill, bordered, text-only, tinted, or inline link. */
type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "link"
/** @deprecated Use `color="danger"` instead. Maps to solid + danger at runtime. */
 | "destructive";
/**
 * Button size presets.
 *
 * | Size | Height | WCAG AA (24px) | WCAG AAA (44px) | Apple HIG | Google MD |
 * |------|--------|----------------|-----------------|-----------|-----------|
 * | 2xs  | 24px   | ⚠ minimum      | ✗               | ✗         | ✗         |
 * | xs   | 28px   | ✓              | ✗               | ✗         | ✗         |
 * | sm   | 32px   | ✓              | ✗               | ✗         | ✗         |
 * | md   | 36px   | ✓              | ✗               | ✗         | ✗         |
 * | lg   | 40px   | ✓              | ✗               | ✗         | ✗         |
 * | xl   | 44px   | ✓              | ✓               | ✓ (44pt)  | ✗         |
 * | 2xl  | 52px   | ✓              | ✓               | ✓         | ✓         |
 * | 3xl  | 64px   | ✓              | ✓               | ✓         | ✓         |
 *
 * For touch-primary interfaces, prefer `xl`+ to meet AAA and platform guidelines.
 */
type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
/** Visual effects — requires importing `@virtari/react-button/styles/effects` */
type ButtonEffect = "shine" | "raised" | "glow" | "glass" | "outline-glow" | "candy";
/** Attention animations — requires importing `@virtari/react-button/styles/animations` */
type ButtonAnimation = "pulse" | "bounce" | "shake" | "jiggle";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Hue/intent. Orthogonal to variant. */
    color?: ButtonColor;
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size preset */
    size?: ButtonSize;
    /** Render as child element (polymorphic via Slot) */
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
}
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

export { Button, type ButtonAnimation, type ButtonColor, type ButtonEffect, type ButtonProps, type ButtonSize, type ButtonVariant };
