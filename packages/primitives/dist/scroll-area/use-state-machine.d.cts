import * as React from 'react';
type Machine<S> = {
    [k: string]: {
        [k: string]: S;
    };
};
type MachineState<T> = keyof T;
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
export declare function useStateMachine<M>(initialState: MachineState<M>, machine: M & Machine<MachineState<M>>): [keyof M, React.ActionDispatch<[event: keyof UnionToIntersection<M[keyof M]>]>];
export {};
