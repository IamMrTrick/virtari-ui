import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref, ComponentRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    ref?: Ref<ComponentRef<typeof SliderPrimitive.Root>>;
}
declare function Slider({ className, ref, ...props }: SliderProps): react_jsx_runtime.JSX.Element;

export { Slider, type SliderProps };
