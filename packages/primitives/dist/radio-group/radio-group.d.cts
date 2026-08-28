import * as React from 'react';
import { Primitive } from '../primitive';
import * as RovingFocusGroup from '../roving-focus';
import { Radio, RadioIndicator } from './radio';
declare const createRadioGroupScope: import("../context").CreateScope;
type RadioGroupContextValue = {
    name?: string;
    required: boolean;
    disabled: boolean;
    value: string | null;
    onValueChange(value: string): void;
};
type RovingFocusGroupProps = React.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface RadioGroupProps extends PrimitiveDivProps {
    name?: RadioGroupContextValue['name'];
    required?: React.ComponentPropsWithoutRef<typeof Radio>['required'];
    disabled?: React.ComponentPropsWithoutRef<typeof Radio>['disabled'];
    dir?: RovingFocusGroupProps['dir'];
    orientation?: RovingFocusGroupProps['orientation'];
    loop?: RovingFocusGroupProps['loop'];
    defaultValue?: string;
    value?: string | null;
    onValueChange?: RadioGroupContextValue['onValueChange'];
}
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
type RadioProps = React.ComponentPropsWithoutRef<typeof Radio>;
interface RadioGroupItemProps extends Omit<RadioProps, 'onCheck' | 'name'> {
    value: string;
}
declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
type RadioIndicatorProps = React.ComponentPropsWithoutRef<typeof RadioIndicator>;
interface RadioGroupIndicatorProps extends RadioIndicatorProps {
}
declare const RadioGroupIndicator: React.ForwardRefExoticComponent<RadioGroupIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
declare const Root: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const Item: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
declare const Indicator: React.ForwardRefExoticComponent<RadioGroupIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
export { createRadioGroupScope, RadioGroup, RadioGroupItem, RadioGroupIndicator, Root, Item, Indicator, };
export type { RadioGroupProps, RadioGroupItemProps, RadioGroupIndicatorProps };
