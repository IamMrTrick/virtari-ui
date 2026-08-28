import * as React from 'react';
import { Primitive } from '../primitive';
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface PortalProps extends PrimitiveDivProps {
    /**
     * An optional container where the portaled content should be appended.
     */
    container?: Element | DocumentFragment | null;
}
declare const Portal: React.ForwardRefExoticComponent<PortalProps & React.RefAttributes<HTMLDivElement>>;
declare const Root: React.ForwardRefExoticComponent<PortalProps & React.RefAttributes<HTMLDivElement>>;
export { Portal, Root, };
export type { PortalProps };
