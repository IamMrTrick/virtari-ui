import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

type SwitchSize = "sm" | "md" | "lg";
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
    size?: SwitchSize;
    ref?: Ref<ComponentRef<typeof SwitchPrimitive.Root>>;
}
declare function Switch({ size, className, ref, ...props }: SwitchProps): react_jsx_runtime.JSX.Element;

export { Switch, type SwitchProps, type SwitchSize };
