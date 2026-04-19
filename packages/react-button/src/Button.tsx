import { cn } from "@virtari/utils";
import { forwardRef, type ReactNode } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";

/** Intent palette — orthogonal to variant. Picks the hue family. */
export type ButtonColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent"
  | "neutral"
  | "contrast";

/** Appearance — solid fill, bordered, text-only, tinted, or inline link. */
export type ButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "soft"
  | "link"
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
export type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/** Visual effects — requires importing `@virtari/react-button/styles/effects` */
export type ButtonEffect = "shine" | "raised" | "glow" | "glass" | "outline-glow" | "candy";

/** Attention animations — requires importing `@virtari/react-button/styles/animations` */
export type ButtonAnimation = "pulse" | "bounce" | "shake" | "jiggle";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  color = "primary",
  variant = "solid",
  size = "md",
  asChild = false,
  loading = false,
  loadingText = "Loading",
  leftSection,
  rightSection,
  fullWidth = false,
  effect,
  animation,
  disabled,
  className,
  children,
  ...props
}, forwardedRef) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  // Backward compat: variant="destructive" → color="danger" + variant="solid".
  const resolvedColor = variant === "destructive" ? "danger" : color;
  const resolvedVariant = variant === "destructive" ? "solid" : variant;

  return (
    <>
      <Comp
        ref={forwardedRef}
        className={cn("vds-button", className)}
        data-color={resolvedColor}
        data-variant={resolvedVariant}
        data-size={size}
        data-loading={loading || undefined}
        data-full-width={fullWidth || undefined}
        data-effect={effect || undefined}
        data-animation={animation || undefined}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-label={loading ? loadingText : undefined}
        {...props}
      >
        {loading && <span className="vds-button-spinner" aria-hidden="true" />}
        {leftSection && (
          <span className="vds-button-section" data-position="start">
            {leftSection}
          </span>
        )}
        <Slottable>{children}</Slottable>
        {rightSection && (
          <span className="vds-button-section" data-position="end">
            {rightSection}
          </span>
        )}
      </Comp>
      {loading && (
        <span className="vds-sr-only" role="status" aria-live="polite">
          {loadingText}
        </span>
      )}
    </>
  );
});

Button.displayName = "Button";
