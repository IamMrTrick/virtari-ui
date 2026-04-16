import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

type CheckboxSize = "sm" | "md" | "lg";
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    /** Proportional size — sm (14px), md (18px), lg (22px) */
    size?: CheckboxSize;
    ref?: Ref<ComponentRef<typeof CheckboxPrimitive.Root>>;
}
declare function Checkbox({ size, className, ref, ...props }: CheckboxProps): react_jsx_runtime.JSX.Element;

export { Checkbox, type CheckboxProps, type CheckboxSize };
