import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

declare const Accordion: react.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & react.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
    ref?: Ref<ComponentRef<typeof AccordionPrimitive.Item>>;
}
declare function AccordionItem({ className, ref, ...props }: AccordionItemProps): react_jsx_runtime.JSX.Element;
interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
    ref?: Ref<ComponentRef<typeof AccordionPrimitive.Trigger>>;
}
declare function AccordionTrigger({ className, children, ref, ...props }: AccordionTriggerProps): react_jsx_runtime.JSX.Element;
interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
    ref?: Ref<ComponentRef<typeof AccordionPrimitive.Content>>;
}
declare function AccordionContent({ className, children, ref, ...props }: AccordionContentProps): react_jsx_runtime.JSX.Element;

export { Accordion, AccordionContent, type AccordionContentProps, AccordionItem, type AccordionItemProps, AccordionTrigger, type AccordionTriggerProps };
