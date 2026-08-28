import { useSyncExternalStore } from 'use-sync-external-store/shim';

// src/use-is-hydrated/use-is-hydrated.tsx
function useIsHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}

export { useIsHydrated };
