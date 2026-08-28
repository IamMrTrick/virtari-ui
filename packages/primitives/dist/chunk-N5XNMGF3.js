import * as React from 'react';

// src/use-callback-ref/use-callback-ref.tsx
function useCallbackRef(callback) {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
}

export { useCallbackRef };
