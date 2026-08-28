import * as React from 'react';
declare module 'react' {
    interface ReactElement {
        $$typeof?: symbol | string;
    }
}
export type Usable<T> = PromiseLike<T> | React.Context<T>;
interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}
export declare function createSlot(ownerName: string): React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>;
declare const Slot: React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>;
interface SlottableProps {
    children: React.ReactNode;
}
interface SlottableComponent extends React.FC<SlottableProps> {
    __vdsId: symbol;
}
export declare function createSlottable(ownerName: string): SlottableComponent;
declare const Slottable: SlottableComponent;
export { Slot, Slottable, Slot as Root, };
export type { SlotProps };
