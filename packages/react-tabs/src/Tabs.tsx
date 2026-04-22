import { cn } from "@virtari-packages/utils";
import {
  useRef,
  type ComponentRef,
  type Ref,
  type RefObject,
} from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useTabsIndicator } from "./use-tabs-indicator";
import { useTabsSwipe } from "./use-tabs-swipe";
import { useTabsAutoScroll } from "./use-tabs-auto-scroll";
import {
  useResponsiveOrientation,
  type TabsOrientation,
} from "./use-responsive-orientation";

export type TabsVariant =
  | "underline"
  | "line"
  | "pills"
  | "segmented"
  | "boxed"
  | "bordered"
  | "solid"
  | "soft"
  | "ghost";

export type TabsSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as RefObject<T | null>).current = node;
    }
  };
}

/* ─────────────────────────────────────────────
 * Root
 * ───────────────────────────────────────────── */
export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /** Collapse `orientation="vertical"` back to horizontal when the Tabs
   *  container is narrower than this (in px). Pass `undefined` to disable. */
  collapseAt?: number;
  /** Enable touch swipe on the active content to switch to prev/next tab.
   *  Only active in horizontal orientation. */
  swipeable?: boolean;
  /** Minimum horizontal drag (px) to commit a swipe. Default 60. */
  swipeThreshold?: number;
  /** Max visual translation (px) while dragging. Default 80. */
  swipeMaxOffset?: number;
  ref?: Ref<ComponentRef<typeof TabsPrimitive.Root>>;
}

export function Tabs({
  className,
  orientation = "horizontal",
  collapseAt,
  swipeable = false,
  swipeThreshold = 60,
  swipeMaxOffset = 80,
  ref,
  ...props
}: TabsProps) {
  const rootRef = useRef<ComponentRef<typeof TabsPrimitive.Root>>(null);

  const effectiveOrientation = useResponsiveOrientation(
    rootRef,
    orientation as TabsOrientation,
    collapseAt,
  );

  useTabsSwipe(rootRef, {
    enabled: swipeable && effectiveOrientation === "horizontal",
    threshold: swipeThreshold,
    maxOffset: swipeMaxOffset,
  });

  return (
    <TabsPrimitive.Root
      ref={mergeRefs(rootRef, ref)}
      orientation={effectiveOrientation}
      className={cn("vds-tabs", className)}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────
 * List
 * ───────────────────────────────────────────── */
export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  animatedIndicator?: boolean;
  /** When the list overflows, auto-scroll the active trigger into view
   *  (centered) so it's never clipped. Default `true`. */
  autoScroll?: boolean;
  ref?: Ref<ComponentRef<typeof TabsPrimitive.List>>;
}

export function TabsList({
  className,
  variant = "underline",
  size = "md",
  fullWidth,
  animatedIndicator = true,
  autoScroll = true,
  ref,
  ...props
}: TabsListProps) {
  const innerRef = useRef<ComponentRef<typeof TabsPrimitive.List>>(null);
  useTabsIndicator(innerRef, animatedIndicator);
  useTabsAutoScroll(innerRef, autoScroll);

  return (
    <TabsPrimitive.List
      ref={mergeRefs(innerRef, ref)}
      className={cn("vds-tabs-list", className)}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth ? "true" : undefined}
      data-animated={animatedIndicator ? "true" : undefined}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────
 * Trigger
 * ───────────────────────────────────────────── */
export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  ref?: Ref<ComponentRef<typeof TabsPrimitive.Trigger>>;
}

export function TabsTrigger({ className, ref, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn("vds-tabs-trigger", className)}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────────
 * Content
 * ───────────────────────────────────────────── */
export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  ref?: Ref<ComponentRef<typeof TabsPrimitive.Content>>;
}

export function TabsContent({ className, ref, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn("vds-tabs-content", className)}
      {...props}
    />
  );
}
