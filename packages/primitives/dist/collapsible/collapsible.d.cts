import * as React from 'react';
import { Primitive } from '../primitive';
declare const createCollapsibleScope: import("../context").CreateScope;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface CollapsibleProps extends PrimitiveDivProps {
    defaultOpen?: boolean;
    open?: boolean;
    disabled?: boolean;
    onOpenChange?(open: boolean): void;
}
declare const Collapsible: React.ForwardRefExoticComponent<CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface CollapsibleTriggerProps extends PrimitiveButtonProps {
}
declare const CollapsibleTrigger: React.ForwardRefExoticComponent<CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface CollapsibleContentProps extends Omit<CollapsibleContentImplProps, 'present'> {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}
declare const CollapsibleContent: React.ForwardRefExoticComponent<CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>;
interface CollapsibleContentImplProps extends PrimitiveDivProps {
    present: boolean;
}
declare const Root: React.ForwardRefExoticComponent<CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
declare const Trigger: React.ForwardRefExoticComponent<CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const Content: React.ForwardRefExoticComponent<CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>;
export { createCollapsibleScope, Collapsible, CollapsibleTrigger, CollapsibleContent, Root, Trigger, Content, };
export type { CollapsibleProps, CollapsibleTriggerProps, CollapsibleContentProps };
