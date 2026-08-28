import * as React from 'react';

// src/use-layout-effect/use-layout-effect.tsx
var useLayoutEffect2 = globalThis?.document ? React.useLayoutEffect : () => {
};

export { useLayoutEffect2 as useLayoutEffect };
