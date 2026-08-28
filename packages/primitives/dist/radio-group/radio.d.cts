import * as React from 'react';
import { Primitive } from '../primitive';
declare const createRadioScope: import("../context").CreateScope;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface RadioProps extends PrimitiveButtonProps {
    checked?: boolean;
    required?: boolean;
    onCheck?(): void;
}
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLButtonElement>>;
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
export interface RadioIndicatorProps extends PrimitiveSpanProps {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}
declare const RadioIndicator: React.ForwardRefExoticComponent<RadioIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
export { createRadioScope, Radio, RadioIndicator, };
export type { RadioProps };
