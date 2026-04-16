import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';

type ToggleVariant = "default" | "outline";
type ToggleSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
    variant?: ToggleVariant;
    /** Size preset — shares height ramp with Button, Input, Select */
    size?: ToggleSize;
    ref?: Ref<ComponentRef<typeof TogglePrimitive.Root>>;
}
declare function Toggle({ variant, size, className, ref, ...props }: ToggleProps): react_jsx_runtime.JSX.Element;

export { Toggle, type ToggleProps, type ToggleSize, type ToggleVariant };
