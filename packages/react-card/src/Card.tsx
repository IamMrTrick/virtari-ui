import { cn } from "@virtari-packages/utils";
import type { Ref } from "react";

/* ── Card ── */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function Card({ className, ref, ...props }: CardProps) {
  return (
    <div ref={ref} className={cn("vds-card", className)} {...props} />
  );
}

/* ── CardHeader ── */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function CardHeader({ className, ref, ...props }: CardHeaderProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-card-header", className)}
      {...props}
    />
  );
}

/* ── CardTitle ── */

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
}

export function CardTitle({ className, ref, ...props }: CardTitleProps) {
  return (
    <h3
      ref={ref}
      className={cn("vds-card-title", className)}
      {...props}
    />
  );
}

/* ── CardDescription ── */

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}

export function CardDescription({
  className,
  ref,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn("vds-card-description", className)}
      {...props}
    />
  );
}

/* ── CardContent ── */

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function CardContent({ className, ref, ...props }: CardContentProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-card-content", className)}
      {...props}
    />
  );
}

/* ── CardFooter ── */

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export function CardFooter({ className, ref, ...props }: CardFooterProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-card-footer", className)}
      {...props}
    />
  );
}
