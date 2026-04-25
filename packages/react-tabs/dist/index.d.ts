import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef, ReactNode } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

type TabsVariant = "underline" | "line" | "pills" | "segmented" | "boxed" | "bordered" | "solid" | "soft" | "ghost";
type TabsSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
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
declare function Tabs({ className, orientation, collapseAt, swipeable, swipeThreshold, swipeMaxOffset, ref, ...props }: TabsProps): react_jsx_runtime.JSX.Element;
interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
    variant?: TabsVariant;
    size?: TabsSize;
    fullWidth?: boolean;
    animatedIndicator?: boolean;
    /** When the list overflows, auto-scroll the active trigger into view
     *  (centered) so it's never clipped. Default `true`. */
    autoScroll?: boolean;
    ref?: Ref<ComponentRef<typeof TabsPrimitive.List>>;
}
declare function TabsList({ className, variant, size, fullWidth, animatedIndicator, autoScroll, ref, ...props }: TabsListProps): react_jsx_runtime.JSX.Element;
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
    ref?: Ref<ComponentRef<typeof TabsPrimitive.Trigger>>;
}
declare function TabsTrigger({ children, className, ref, ...props }: TabsTriggerProps): react_jsx_runtime.JSX.Element;
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof TabsPrimitive.Content>>;
}
declare function TabsContent({ className, ref, ...props }: TabsContentProps): react_jsx_runtime.JSX.Element;

interface TabsPanelsProps {
    children: ReactNode;
    className?: string;
    /** Enable swipe/drag to navigate between panels. Default true. */
    swipeable?: boolean;
    /** Minimum pointer drag (px) to commit a tab change. Default 50. */
    swipeThreshold?: number;
    /** Restrict swipe interaction to touch-only devices (pointer: coarse).
     *  Default true — desktop users still change tabs via the list. */
    touchOnly?: boolean;
    /** Controls how many tab panels stay mounted.
     *  - `all`: preserves the previous behavior by mounting every panel.
     *  - `adjacent`: mounts only the active panel and its previous/next
     *    neighbors, keeping swipe responsive without paying the cost for
     *    distant heavy panels.
     *
     *  Default `all` to avoid changing existing behavior. */
    mountStrategy?: TabsPanelsMountStrategy;
    ref?: Ref<HTMLDivElement>;
}
type TabsPanelsMountStrategy = "all" | "adjacent";
/**
 * Carousel-style container for `TabsContent`. By default it mounts all panels
 * at once (via `forceMount`), lays them out in a horizontal track, and
 * translates the track based on the active tab. Use
 * `mountStrategy="adjacent"` for heavy tab content.
 *
 * ```tsx
 * <Tabs defaultValue="a">
 *   <TabsList>...</TabsList>
 *   <TabsPanels>
 *     <TabsContent value="a">A</TabsContent>
 *     <TabsContent value="b">B</TabsContent>
 *   </TabsPanels>
 * </Tabs>
 * ```
 */
declare function TabsPanels({ children, className, swipeable, swipeThreshold, touchOnly, mountStrategy, ref, }: TabsPanelsProps): react_jsx_runtime.JSX.Element;

export { Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, TabsPanels, type TabsPanelsMountStrategy, type TabsPanelsProps, type TabsProps, type TabsSize, TabsTrigger, type TabsTriggerProps, type TabsVariant };
