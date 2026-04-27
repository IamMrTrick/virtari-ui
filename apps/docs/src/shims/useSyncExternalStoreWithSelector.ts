import {
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

type Subscribe = (onStoreChange: () => void) => () => void;
type EqualityFn<T> = (a: T, b: T) => boolean;

export function useSyncExternalStoreWithSelector<Snapshot, Selection>(
  subscribe: Subscribe,
  getSnapshot: () => Snapshot,
  getServerSnapshot: (() => Snapshot) | undefined,
  selector: (snapshot: Snapshot) => Selection,
  isEqual: EqualityFn<Selection> = Object.is,
): Selection {
  const renderedSelectionRef = useRef<{
    hasValue: boolean;
    value: Selection | null;
  }>({
    hasValue: false,
    value: null,
  });

  const [getSelection, getServerSelection] = useMemo(() => {
    let hasMemo = false;
    let memoizedSnapshot: Snapshot;
    let memoizedSelection: Selection;

    const memoizedSelector = (nextSnapshot: Snapshot) => {
      if (!hasMemo) {
        hasMemo = true;
        memoizedSnapshot = nextSnapshot;
        const nextSelection = selector(nextSnapshot);

        if (renderedSelectionRef.current.hasValue) {
          const currentSelection = renderedSelectionRef.current.value;
          if (
            currentSelection !== null &&
            isEqual(currentSelection, nextSelection)
          ) {
            memoizedSelection = currentSelection;
            return currentSelection;
          }
        }

        memoizedSelection = nextSelection;
        return nextSelection;
      }

      if (Object.is(memoizedSnapshot, nextSnapshot)) {
        return memoizedSelection;
      }

      const nextSelection = selector(nextSnapshot);
      if (isEqual(memoizedSelection, nextSelection)) {
        memoizedSnapshot = nextSnapshot;
        return memoizedSelection;
      }

      memoizedSnapshot = nextSnapshot;
      memoizedSelection = nextSelection;
      return nextSelection;
    };

    const getSnapshotWithSelector = () => memoizedSelector(getSnapshot());
    const getServerSnapshotWithSelector =
      getServerSnapshot === undefined
        ? undefined
        : () => memoizedSelector(getServerSnapshot());

    return [getSnapshotWithSelector, getServerSnapshotWithSelector] as const;
  }, [getSnapshot, getServerSnapshot, selector, isEqual]);

  const value = useSyncExternalStore(
    subscribe,
    getSelection,
    getServerSelection,
  );

  useEffect(() => {
    renderedSelectionRef.current.hasValue = true;
    renderedSelectionRef.current.value = value;
  }, [value]);

  return value;
}

const shimWithSelector = {
  useSyncExternalStoreWithSelector,
};

export default shimWithSelector;
