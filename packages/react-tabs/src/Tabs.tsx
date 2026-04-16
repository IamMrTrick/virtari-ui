import { cn } from "@virtari/utils";
import type { ComponentRef, Ref } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

/* ── Root ── */
export const Tabs = TabsPrimitive.Root;

/* ── List ── */
export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  ref?: Ref<ComponentRef<typeof TabsPrimitive.List>>;
}

export function TabsList({ className, ref, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("vds-tabs-list", className)}
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

