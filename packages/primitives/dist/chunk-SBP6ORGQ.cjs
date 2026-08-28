'use strict';

var shim = require('use-sync-external-store/shim');

// src/use-is-hydrated/use-is-hydrated.tsx
function useIsHydrated() {
  return shim.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}

exports.useIsHydrated = useIsHydrated;
