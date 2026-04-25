import { cn } from "@virtari-packages/utils";
import type {
  HTMLAttributes,
  Ref,
  TimeHTMLAttributes,
} from "react";

export type TimelineSize = "sm" | "md" | "lg";
export type TimelineOrientation = "vertical" | "horizontal";
export type TimelineAlign = "start" | "center" | "alternate";
export type TimelineVariant = "default" | "compact" | "card" | "minimal";
export type TimelineDensity = "compact" | "comfortable" | "spacious";
export type TimelineLine = "solid" | "dashed" | "none";
export type TimelineConnectorMode = "gap" | "touch";
export type TimelineEffect = "none" | "pulse" | "glow" | "ping" | "spotlight";
export type TimelineTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent";
export type TimelineItemStatus =
  | "complete"
  | "active"
  | "pending"
  | "error"
  | "warning";
export type TimelineItemSide = "start" | "end";

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  align?: TimelineAlign;
  connector?: TimelineConnectorMode;
  density?: TimelineDensity;
  line?: TimelineLine;
  orientation?: TimelineOrientation;
  size?: TimelineSize;
  variant?: TimelineVariant;
  ref?: Ref<HTMLOListElement>;
}

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  effect?: TimelineEffect;
  interactive?: boolean;
  side?: TimelineItemSide;
  status?: TimelineItemStatus;
  tone?: TimelineTone;
  ref?: Ref<HTMLLIElement>;
}

export interface TimelineIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface TimelineConnectorProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface TimelineContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface TimelineOppositeContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface TimelineCardProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface TimelineTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
}

export interface TimelineDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}

export interface TimelineMetaProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface TimelineMediaProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface TimelineBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TimelineTone;
  ref?: Ref<HTMLSpanElement>;
}

export interface TimelineTimeProps extends TimeHTMLAttributes<HTMLTimeElement> {
  ref?: Ref<HTMLTimeElement>;
}

function toneForStatus(status: TimelineItemStatus): TimelineTone {
  switch (status) {
    case "complete":
      return "success";
    case "active":
      return "primary";
    case "error":
      return "danger";
    case "warning":
      return "warning";
    case "pending":
    default:
      return "neutral";
  }
}

export function Timeline({
  align = "start",
  connector = "gap",
  density = "comfortable",
  line = "solid",
  orientation = "vertical",
  size = "md",
  variant = "default",
  className,
  children,
  ref,
  ...props
}: TimelineProps) {
  const labelProps =
    props["aria-label"] || props["aria-labelledby"]
      ? undefined
      : { "aria-label": "Timeline" };

  return (
    <ol
      ref={ref}
      className={cn("vds-timeline", className)}
      data-align={align}
      data-connector={connector}
      data-density={density}
      data-line={line}
      data-orientation={orientation}
      data-size={size}
      data-variant={variant}
      {...labelProps}
      {...props}
    >
      {children}
    </ol>
  );
}

export function TimelineItem({
  effect = "none",
  status = "pending",
  tone,
  side,
  interactive,
  className,
  children,
  ref,
  ...props
}: TimelineItemProps) {
  return (
    <li
      ref={ref}
      className={cn("vds-timeline-item", className)}
      data-effect={effect === "none" ? undefined : effect}
      data-interactive={interactive || undefined}
      data-side={side}
      data-status={status}
      data-tone={tone ?? toneForStatus(status)}
      aria-current={status === "active" ? "step" : undefined}
      {...props}
    >
      {children}
    </li>
  );
}

export function TimelineIndicator({
  className,
  children,
  ref,
  ...props
}: TimelineIndicatorProps) {
  return (
    <div ref={ref} className={cn("vds-timeline-indicator", className)} {...props}>
      {children}
    </div>
  );
}

export function TimelineConnector({
  className,
  ref,
  ...props
}: TimelineConnectorProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-timeline-connector", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function TimelineOppositeContent({
  className,
  children,
  ref,
  ...props
}: TimelineOppositeContentProps) {
  return (
    <div
      ref={ref}
      className={cn("vds-timeline-opposite", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TimelineContent({
  className,
  children,
  ref,
  ...props
}: TimelineContentProps) {
  return (
    <div ref={ref} className={cn("vds-timeline-content", className)} {...props}>
      {children}
    </div>
  );
}

export function TimelineCard({
  className,
  children,
  ref,
  ...props
}: TimelineCardProps) {
  return (
    <div ref={ref} className={cn("vds-timeline-card", className)} {...props}>
      {children}
    </div>
  );
}

export function TimelineTitle({
  className,
  children,
  ref,
  ...props
}: TimelineTitleProps) {
  return (
    <h3 ref={ref} className={cn("vds-timeline-title", className)} {...props}>
      {children}
    </h3>
  );
}

export function TimelineDescription({
  className,
  children,
  ref,
  ...props
}: TimelineDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn("vds-timeline-description", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function TimelineMeta({
  className,
  children,
  ref,
  ...props
}: TimelineMetaProps) {
  return (
    <div ref={ref} className={cn("vds-timeline-meta", className)} {...props}>
      {children}
    </div>
  );
}

export function TimelineMedia({
  className,
  children,
  ref,
  ...props
}: TimelineMediaProps) {
  return (
    <div ref={ref} className={cn("vds-timeline-media", className)} {...props}>
      {children}
    </div>
  );
}

export function TimelineBadge({
  tone,
  className,
  children,
  ref,
  ...props
}: TimelineBadgeProps) {
  return (
    <span
      ref={ref}
      className={cn("vds-timeline-badge", className)}
      data-tone={tone}
      {...props}
    >
      {children}
    </span>
  );
}

export function TimelineTime({
  className,
  children,
  ref,
  ...props
}: TimelineTimeProps) {
  return (
    <time ref={ref} className={cn("vds-timeline-time", className)} {...props}>
      {children}
    </time>
  );
}
