import * as React from 'react';
type ChangeHandler<T> = (state: T) => void;
interface UseControllableStateParams<T> {
    prop: T | undefined;
    defaultProp: T;
    onChange: ChangeHandler<T> | undefined;
    caller: string;
}
interface AnyAction {
    type: string;
}
export declare function useControllableStateReducer<T, S extends {}, A extends AnyAction>(reducer: (prevState: S & {
    state: T;
}, action: A) => S & {
    state: T;
}, userArgs: UseControllableStateParams<T>, initialState: S): [S & {
    state: T;
}, React.Dispatch<A>];
export declare function useControllableStateReducer<T, S extends {}, I, A extends AnyAction>(reducer: (prevState: S & {
    state: T;
}, action: A) => S & {
    state: T;
}, userArgs: UseControllableStateParams<T>, initialArg: I, init: (i: I & {
    state: T;
}) => S): [S & {
    state: T;
}, React.Dispatch<A>];
export {};
