export declare class OrderedDict<K, V> extends Map<K, V> {
    #private;
    constructor(iterable?: Iterable<readonly [K, V]> | null | undefined);
    set(key: K, value: V): this;
    insert(index: number, key: K, value: V): this;
    with(index: number, key: K, value: V): OrderedDict<K, V>;
    before(key: K): [K, V] | undefined;
    /**
     * Sets a new key-value pair at the position before the given key.
     */
    setBefore(key: K, newKey: K, value: V): this;
    after(key: K): [K, V] | undefined;
    /**
     * Sets a new key-value pair at the position after the given key.
     */
    setAfter(key: K, newKey: K, value: V): this;
    first(): [K, V] | undefined;
    last(): [K, V] | undefined;
    clear(): void;
    delete(key: K): boolean;
    deleteAt(index: number): boolean;
    at(index: number): V | undefined;
    entryAt(index: number): [K, V] | undefined;
    indexOf(key: K): number;
    keyAt(index: number): K | undefined;
    from(key: K, offset: number): V | undefined;
    keyFrom(key: K, offset: number): K | undefined;
    find(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => boolean, thisArg?: any): [K, V] | undefined;
    findIndex(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => boolean, thisArg?: any): number;
    filter<KK extends K, VV extends V>(predicate: (entry: [K, V], index: number, dict: OrderedDict<K, V>) => entry is [KK, VV], thisArg?: any): OrderedDict<KK, VV>;
    filter(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown, thisArg?: any): OrderedDict<K, V>;
    map<U>(callbackfn: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => U, thisArg?: any): OrderedDict<K, U>;
    reduce(callbackfn: (previousValue: [K, V], currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => [K, V]): [K, V];
    reduce(callbackfn: (previousValue: [K, V], currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => [K, V], initialValue: [K, V]): [K, V];
    reduce<U>(callbackfn: (previousValue: U, currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: [K, V], currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => [K, V]): [K, V];
    reduceRight(callbackfn: (previousValue: [K, V], currentEntry: [K, V], currentIndex: number, dictionary: OrderedDict<K, V>) => [K, V], initialValue: [K, V]): [K, V];
    reduceRight<U>(callbackfn: (previousValue: [K, V], currentValue: U, currentIndex: number, dictionary: OrderedDict<K, V>) => U, initialValue: U): U;
    toSorted(compareFn?: (a: [K, V], b: [K, V]) => number): OrderedDict<K, V>;
    toReversed(): OrderedDict<K, V>;
    toSpliced(start: number, deleteCount?: number): OrderedDict<K, V>;
    toSpliced(start: number, deleteCount: number, ...items: [K, V][]): OrderedDict<K, V>;
    slice(start?: number, end?: number): OrderedDict<K, V>;
    every(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown, thisArg?: any): boolean;
    some(predicate: (entry: [K, V], index: number, dictionary: OrderedDict<K, V>) => unknown, thisArg?: any): boolean;
}
export type KeyOf<D extends OrderedDict<any, any>> = D extends OrderedDict<infer K, any> ? K : never;
export type ValueOf<D extends OrderedDict<any, any>> = D extends OrderedDict<any, infer V> ? V : never;
export type EntryOf<D extends OrderedDict<any, any>> = [KeyOf<D>, ValueOf<D>];
export type KeyFrom<E extends EntryOf<any>> = E[0];
export type ValueFrom<E extends EntryOf<any>> = E[1];
