import * as react_jsx_runtime from 'react/jsx-runtime';
import { HTMLAttributes, Ref, TimeHTMLAttributes } from 'react';

type TimelineSize = "sm" | "md" | "lg";
type TimelineOrientation = "vertical" | "horizontal";
type TimelineAlign = "start" | "center" | "alternate";
type TimelineVariant = "default" | "compact" | "card" | "minimal";
type TimelineDensity = "compact" | "comfortable" | "spacious";
type TimelineLine = "solid" | "dashed" | "none";
type TimelineConnectorMode = "gap" | "touch";
type TimelineEffect = "none" | "pulse" | "glow" | "ping" | "spotlight";
type TimelineTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info" | "accent";
type TimelineItemStatus = "complete" | "active" | "pending" | "error" | "warning";
type TimelineItemSide = "start" | "end";
interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
    align?: TimelineAlign;
    connector?: TimelineConnectorMode;
    density?: TimelineDensity;
    line?: TimelineLine;
    orientation?: TimelineOrientation;
    size?: TimelineSize;
    variant?: TimelineVariant;
    ref?: Ref<HTMLOListElement>;
}
interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
    effect?: TimelineEffect;
    interactive?: boolean;
    side?: TimelineItemSide;
    status?: TimelineItemStatus;
    tone?: TimelineTone;
    ref?: Ref<HTMLLIElement>;
}
interface TimelineIndicatorProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
interface TimelineConnectorProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
interface TimelineContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
interface TimelineOppositeContentProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
interface TimelineCardProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
interface TimelineTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>;
}
interface TimelineDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>;
}
interface TimelineMetaProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
interface TimelineMediaProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
interface TimelineBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: TimelineTone;
    ref?: Ref<HTMLSpanElement>;
}
interface TimelineTimeProps extends TimeHTMLAttributes<HTMLTimeElement> {
    ref?: Ref<HTMLTimeElement>;
}
declare function Timeline({ align, connector, density, line, orientation, size, variant, className, children, ref, ...props }: TimelineProps): react_jsx_runtime.JSX.Element;
declare function TimelineItem({ effect, status, tone, side, interactive, className, children, ref, ...props }: TimelineItemProps): react_jsx_runtime.JSX.Element;
declare function TimelineIndicator({ className, children, ref, ...props }: TimelineIndicatorProps): react_jsx_runtime.JSX.Element;
declare function TimelineConnector({ className, ref, ...props }: TimelineConnectorProps): react_jsx_runtime.JSX.Element;
declare function TimelineOppositeContent({ className, children, ref, ...props }: TimelineOppositeContentProps): react_jsx_runtime.JSX.Element;
declare function TimelineContent({ className, children, ref, ...props }: TimelineContentProps): react_jsx_runtime.JSX.Element;
declare function TimelineCard({ className, children, ref, ...props }: TimelineCardProps): react_jsx_runtime.JSX.Element;
declare function TimelineTitle({ className, children, ref, ...props }: TimelineTitleProps): react_jsx_runtime.JSX.Element;
declare function TimelineDescription({ className, children, ref, ...props }: TimelineDescriptionProps): react_jsx_runtime.JSX.Element;
declare function TimelineMeta({ className, children, ref, ...props }: TimelineMetaProps): react_jsx_runtime.JSX.Element;
declare function TimelineMedia({ className, children, ref, ...props }: TimelineMediaProps): react_jsx_runtime.JSX.Element;
declare function TimelineBadge({ tone, className, children, ref, ...props }: TimelineBadgeProps): react_jsx_runtime.JSX.Element;
declare function TimelineTime({ className, children, ref, ...props }: TimelineTimeProps): react_jsx_runtime.JSX.Element;

export { Timeline, type TimelineAlign, TimelineBadge, type TimelineBadgeProps, TimelineCard, type TimelineCardProps, TimelineConnector, type TimelineConnectorMode, type TimelineConnectorProps, TimelineContent, type TimelineContentProps, type TimelineDensity, TimelineDescription, type TimelineDescriptionProps, type TimelineEffect, TimelineIndicator, type TimelineIndicatorProps, TimelineItem, type TimelineItemProps, type TimelineItemSide, type TimelineItemStatus, type TimelineLine, TimelineMedia, type TimelineMediaProps, TimelineMeta, type TimelineMetaProps, TimelineOppositeContent, type TimelineOppositeContentProps, type TimelineOrientation, type TimelineProps, type TimelineSize, TimelineTime, type TimelineTimeProps, TimelineTitle, type TimelineTitleProps, type TimelineTone, type TimelineVariant };
