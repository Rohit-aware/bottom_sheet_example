"use strict";

import { useCallback, useRef } from 'react';
/**
 * A hook that returns a stable callback reference, avoiding child re-renders
 * while always executing the latest version of the passed callback function.
 */
export const useStableCallback = callback => {
  const ref = useRef(callback);
  ref.current = callback;
  return useCallback((...args) => {
    return ref.current(...args);
  }, []);
};
//# sourceMappingURL=useStableCallback.js.map