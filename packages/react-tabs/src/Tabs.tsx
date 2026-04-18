import { cn } from "@virtari/utils";
import {
  useImperativeHandle,
  useRef,
  type ComponentRef,
  type Ref,
} from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useTabsIndicator } from "./use-tabs-indicator";

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

/* ── Root ── */
export const Tabs = TabsPrimitive.Root;

/* ── List ── */
export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  animatedIndicator?: boolean;
  ref?: Ref<ComponentRef<typeof TabsPrimitive.List>>;
}

export function TabsList({
  className,
  variant = "underline",
  size = "md",
  fullWidth,
  animatedIndicator = true,
  ref,
  ...props
}: TabsListProps) {
  const innerRef = useRef<ComponentRef<typeof TabsPrimitive.List>>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLDivElement, []);

  useTabsIndicator(innerRef, animatedIndicator);

  return (
    <TabsPrimitive.List
      ref={innerRef}
      className={cn("vds-tabs-list", className)}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth ? "true" : undefined}
      data-animated={animatedIndicator ? "true" : undefined}
      {...props}
    />
  );
}

/* ── Trigger ── */
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

/* ── Content ── */
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
