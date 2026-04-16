import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
    ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Root>>;
}
declare function RadioGroup({ className, ref, ...props }: RadioGroupProps): react_jsx_runtime.JSX.Element;
interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    ref?: Ref<ComponentRef<typeof RadioGroupPrimitive.Item>>;
}
declare function RadioGroupItem({ className, ref, ...props }: RadioGroupItemProps): react_jsx_runtime.JSX.Element;

export { RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps };
