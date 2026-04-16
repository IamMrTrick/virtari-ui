import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

declare const Tabs: react.ForwardRefExoticComponent<TabsPrimitive.TabsProps & react.RefAttributes<HTMLDivElement>>;
interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
    ref?: Ref<ComponentRef<typeof TabsPrimitive.List>>;
}
declare function TabsList({ className, ref, ...props }: TabsListProps): react_jsx_runtime.JSX.Element;
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
    ref?: Ref<ComponentRef<typeof TabsPrimitive.Trigger>>;
}
declare function TabsTrigger({ className, ref, ...props }: TabsTriggerProps): react_jsx_runtime.JSX.Element;
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof TabsPrimitive.Content>>;
}
declare function TabsContent({ className, ref, ...props }: TabsContentProps): react_jsx_runtime.JSX.Element;

export { Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, TabsTrigger, type TabsTriggerProps };
