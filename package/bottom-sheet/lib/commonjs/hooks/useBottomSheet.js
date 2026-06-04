"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheet = void 0;
var _react = require("react");
var _BottomSheetContext = require("../context/BottomSheetContext");
var _environment = require("../utils/environment");
/**
 * Hook to consume BottomSheetContext. Enables children to trigger sheet close or snapping.
 */
const useBottomSheet = () => {
  const contextValue = (0, _react.useContext)(_BottomSheetContext.BottomSheetContext);
  if (contextValue === null && !(0, _environment.isTestEnvironment)()) {
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
exports.useBottomSheet = useBottomSheet;
//# sourceMappingURL=useBottomSheet.js.map