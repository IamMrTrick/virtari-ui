import { cn } from "@virtari/utils";
import type { Ref, ReactNode } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";

export type ButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "soft"
  | "destructive"
  | "link";

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
export type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Visual effects — requires importing `@virtari/react-button/styles/effects` */
export type ButtonEffect = "shine" | "raised" | "glow" | "glass" | "outline-glow";

/** Attention animations — requires importing `@virtari/react-button/styles/animations` */
export type ButtonAnimation = "pulse" | "bounce" | "shake" | "jiggle";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

export function Button({
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
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  return (
    <>
      <Comp
        ref={ref}
        className={cn("vds-button", className)}
        data-variant={variant}
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
}
