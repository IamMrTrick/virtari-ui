import { cn, controlText } from "@virtari-packages/utils";
import { cloneElement, isValidElement, type ReactNode, type Ref } from "react";
import { Slot } from "@virtari-packages/primitives/slot";

/* ── Types ── */

export type ChipVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type ChipSize = "sm" | "md" | "lg";
export type ChipAppearance = "soft" | "solid" | "outline";

/* ── Chip ── */

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  appearance?: ChipAppearance;
  interactive?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

export function Chip({
  variant = "default",
  size = "md",
  appearance = "soft",
  interactive = false,
  disabled = false,
  asChild = false,
  className,
  ref,
  children,
  ...props
}: ChipProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      ref={ref}
      className={cn("vds-chip", className)}
      data-variant={variant}
      data-size={size}
      data-appearance={appearance}
      data-interactive={interactive ? "true" : undefined}
      aria-disabled={disabled || undefined}
      {...props}
    >{asChild && isValidElement<{children?: ReactNode}>(children)
      ? cloneElement(children, {}, controlText(children.props.children))
      : asChild ? children : controlText(children)}</Comp>
  );
}

/* ── ChipIcon ── */

export interface ChipIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

export function ChipIcon({
  asChild = false,
  className,
  ref,
  ...props
}: ChipIconProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      ref={ref}
      className={cn("vds-chip-icon", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

/* ── ChipLabel ── */

export interface ChipLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}

export function ChipLabel({ className, ref, children, ...props }: ChipLabelProps) {
  return (
    <span
      ref={ref}
      className={cn("vds-chip-label", className)}
      {...props}
    >{controlText(children)}</span>
  );
}

/* ── ChipRemove ── */

export interface ChipRemoveProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function ChipRemove({
  asChild = false,
  className,
  type,
  "aria-label": ariaLabel,
  children,
  ref,
  ...props
}: ChipRemoveProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : (type ?? "button")}
      className={cn("vds-chip-remove", className)}
      aria-label={ariaLabel ?? "Remove"}
      {...props}
    >
      {children ?? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
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
