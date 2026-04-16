import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Ref, ComponentRef } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

declare const Collapsible: react.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & react.RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: react.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleTriggerProps & react.RefAttributes<HTMLButtonElement>>;
interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {
    ref?: Ref<ComponentRef<typeof CollapsiblePrimitive.Content>>;
}
declare function CollapsibleContent({ className, ref, ...props }: CollapsibleContentProps): react_jsx_runtime.JSX.Element;

export { Collapsible, CollapsibleContent, type CollapsibleContentProps, CollapsibleTrigger };
