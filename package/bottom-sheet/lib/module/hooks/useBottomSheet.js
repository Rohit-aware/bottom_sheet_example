"use strict";

import { useContext } from 'react';
import { BottomSheetContext } from '../context/BottomSheetContext';
import { isTestEnvironment } from '../utils/environment';
/**
 * Hook to consume BottomSheetContext. Enables children to trigger sheet close or snapping.
 */
export const useBottomSheet = () => {
  const contextValue = useContext(BottomSheetContext);
  if (contextValue === null && !isTestEnvironment()) {
    throw new Error('useBottomSheet must be used within a BottomSheet component (or BottomSheetProvider).');
  }

  // Fallback for tests/storybook environment
  return contextValue || {
    close: () => {},
    currentSnapIndex: {
      value: 0
    },
    topSnapIndex: {
      value: 0
    }
  };
};
//# sourceMappingURL=useBottomSheet.js.map