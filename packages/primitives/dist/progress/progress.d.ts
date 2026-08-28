import * as React from 'react';
import { Primitive } from '../primitive';
declare const createProgressScope: import("../context").CreateScope;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface ProgressProps extends PrimitiveDivProps {
    value?: number | null | undefined;
    max?: number;
    getValueLabel?(value: number, max: number): string;
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
interface ProgressIndicatorProps extends PrimitiveDivProps {
}
declare const ProgressIndicator: React.ForwardRefExoticComponent<ProgressIndicatorProps & React.RefAttributes<HTMLDivElement>>;
declare const Root: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
declare const Indicator: React.ForwardRefExoticComponent<ProgressIndicatorProps & React.RefAttributes<HTMLDivElement>>;
export { createProgressScope, Progress, ProgressIndicator, Root, Indicator, };
export type { ProgressProps, ProgressIndicatorProps };
