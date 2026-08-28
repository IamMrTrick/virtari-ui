import { observeElementRect } from '../chunk-EQPNJZU3.js';
import * as React from 'react';

function useRect(measurable) {
  const [rect, setRect] = React.useState();
  React.useEffect(() => {
    if (measurable) {
      const unobserve = observeElementRect(measurable, setRect);
      return () => {
        setRect(void 0);
        unobserve();
      };
    }
    return;
  }, [measurable]);
  return rect;
}

export { useRect };
