# @virtari-packages/react-timeline API snapshot

Version: 0.3.0. Export entry points (exact package.json map):

```json
{
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    },
    "require": {
      "types": "./dist/index.d.cts",
      "default": "./dist/index.cjs"
    }
  },
  "./styles": "./dist/Timeline.css",
  "./tokens": "./dist/Timeline.tokens.css"
}
```

Use CSS entry points only if they appear in this map. Foundation CSS packages export their stylesheet at the package root. Primitive imports use subpaths.

## Public symbols

- `Timeline` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineItem` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineIndicator` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineConnector` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineOppositeContent` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineContent` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineCard` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineTitle` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineDescription` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineMeta` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineMedia` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineBadge` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineTime` (export) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineAlign` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineConnectorMode` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineDensity` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineEffect` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineLine` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineOrientation` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineSize` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineItemProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineItemSide` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineItemStatus` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineTone` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineVariant` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineIndicatorProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineConnectorProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineOppositeContentProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineContentProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineCardProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineTitleProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineDescriptionProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineMetaProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineMediaProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineBadgeProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.
- `TimelineTimeProps` (type) from `@virtari-packages/react-timeline`; source: `packages/react-timeline/src/index.ts`.

## Source type declarations

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineSize = "sm" | "md" | "lg";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineOrientation = "vertical" | "horizontal";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineAlign = "start" | "center" | "alternate";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineVariant = "default" | "compact" | "card" | "minimal";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineDensity = "compact" | "comfortable" | "spacious";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineLine = "solid" | "dashed" | "none";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineConnectorMode = "gap" | "touch";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineEffect = "none" | "pulse" | "glow" | "ping" | "spotlight";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineItemStatus =
  | "complete"
  | "active"
  | "pending"
  | "error"
  | "warning";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export type TimelineItemSide = "start" | "end";
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
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
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  effect?: TimelineEffect;
  interactive?: boolean;
  side?: TimelineItemSide;
  status?: TimelineItemStatus;
  tone?: TimelineTone;
  ref?: Ref<HTMLLIElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineConnectorProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineOppositeContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineCardProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineMetaProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineMediaProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TimelineTone;
  ref?: Ref<HTMLSpanElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export interface TimelineTimeProps extends TimeHTMLAttributes<HTMLTimeElement> {
  ref?: Ref<HTMLTimeElement>;
}
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
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
}: TimelineProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
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
}: TimelineItemProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineIndicator({
  className,
  children,
  ref,
  ...props
}: TimelineIndicatorProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineConnector({
  className,
  ref,
  ...props
}: TimelineConnectorProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineOppositeContent({
  className,
  children,
  ref,
  ...props
}: TimelineOppositeContentProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineContent({
  className,
  children,
  ref,
  ...props
}: TimelineContentProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineCard({
  className,
  children,
  ref,
  ...props
}: TimelineCardProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineTitle({
  className,
  children,
  ref,
  ...props
}: TimelineTitleProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineDescription({
  className,
  children,
  ref,
  ...props
}: TimelineDescriptionProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineMeta({
  className,
  children,
  ref,
  ...props
}: TimelineMetaProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineMedia({
  className,
  children,
  ref,
  ...props
}: TimelineMediaProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineBadge({
  tone,
  className,
  children,
  ref,
  ...props
}: TimelineBadgeProps);
```

Source: `packages/react-timeline/src/Timeline.tsx`

```tsx
export function TimelineTime({
  className,
  children,
  ref,
  ...props
}: TimelineTimeProps);
```

## Source files

- `packages/react-timeline/src/index.ts`
- `packages/react-timeline/src/Timeline.css`
- `packages/react-timeline/src/Timeline.tokens.css`
- `packages/react-timeline/src/Timeline.tsx`
- `packages/react-timeline/package.json`
