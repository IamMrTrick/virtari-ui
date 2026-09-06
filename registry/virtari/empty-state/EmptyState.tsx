import { cn } from "../../lib/utils";
import type { Ref, HTMLAttributes, ReactNode } from "react";

export type EmptyStateSize = "sm" | "md" | "lg";
export type EmptyStateOrientation = "vertical" | "horizontal";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  size?: EmptyStateSize;
  orientation?: EmptyStateOrientation;
  ref?: Ref<HTMLDivElement>;
}

export interface EmptyStateIconProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface EmptyStateTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
}

export interface EmptyStateDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}

export interface EmptyStateActionsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function EmptyState({
  size = "md",
  orientation = "vertical",
  className,
  children,
  ref,
  ...props
}: EmptyStateProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-empty-state", className)}
      data-size={size}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  );
}

export function EmptyStateIcon({ className, children, ref, ...props }: EmptyStateIconProps) {
  return (
    <div ref={ref} className={cn("vds-empty-state-icon", className)} aria-hidden="true" {...props}>
      {children}
    </div>
  );
}

export function EmptyStateTitle({ className, children, ref, ...props }: EmptyStateTitleProps) {
  return (
    <h3 ref={ref} className={cn("vds-empty-state-title", className)} {...props}>
      {children}
    </h3>
  );
}

export function EmptyStateDescription({ className, children, ref, ...props }: EmptyStateDescriptionProps) {
  return (
    <p ref={ref} className={cn("vds-empty-state-description", className)} {...props}>
      {children}
    </p>
  );
}

export function EmptyStateActions({ className, children, ref, ...props }: EmptyStateActionsProps) {
  return (
    <div ref={ref} className={cn("vds-empty-state-actions", className)} {...props}>
      {children}
    </div>
  );
}
