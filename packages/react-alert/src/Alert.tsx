import { cn } from "@virtari-packages/utils";
import type { Ref } from "react";
import { Slot } from "@virtari-packages/primitives/slot";

/* ── Types ── */

export type AlertVariant = "info" | "success" | "warning" | "danger";
export type AlertSize = "sm" | "md" | "lg";
export type AlertAppearance = "soft" | "solid" | "outline";

/* ── Alert ── */

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  size?: AlertSize;
  appearance?: AlertAppearance;
  asChild?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function Alert({
  variant = "info",
  size = "md",
  appearance = "soft",
  asChild = false,
  className,
  ref,
  role,
  ...props
}: AlertProps) {
  const Comp = asChild ? Slot : "div";
  const resolvedRole = role ?? (variant === "danger" ? "alert" : "status");

  return (
    <Comp
      ref={ref}
      className={cn("vds-alert", className)}
      data-variant={variant}
      data-size={size}
      data-appearance={appearance}
      role={resolvedRole}
      {...props}
    />
  );
}

/* ── AlertIcon ── */

export interface AlertIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

export function AlertIcon({
  asChild = false,
  className,
  ref,
  ...props
}: AlertIconProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      ref={ref}
      className={cn("vds-alert-icon", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

/* ── AlertContent ── */

export interface AlertContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function AlertContent({
  className,
  ref,
  ...props
}: AlertContentProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-alert-content", className)}
      {...props}
    />
  );
}

/* ── AlertTitle ── */

export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
}

export function AlertTitle({ className, ref, ...props }: AlertTitleProps) {
  return (
    <h5
      ref={ref}
      className={cn("vds-alert-title", className)}
      {...props}
    />
  );
}

/* ── AlertDescription ── */

export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}

export function AlertDescription({
  className,
  ref,
  ...props
}: AlertDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn("vds-alert-description", className)}
      {...props}
    />
  );
}

/* ── AlertClose ── */

export interface AlertCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function AlertClose({
  asChild = false,
  className,
  type,
  "aria-label": ariaLabel,
  children,
  ref,
  ...props
}: AlertCloseProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : (type ?? "button")}
      className={cn("vds-alert-close", className)}
      aria-label={ariaLabel ?? "Dismiss"}
      {...props}
    >
      {children ?? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      )}
    </Comp>
  );
}
