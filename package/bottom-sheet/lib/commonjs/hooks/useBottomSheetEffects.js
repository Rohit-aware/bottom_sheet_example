"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetEffects = void 0;
var _react = require("react");
const useBottomSheetEffects = ({
  visible,
  enableDynamicSizing,
  isOpen,
  isOpening,
  maxHeight,
  open,
  sheetTranslateY,
  currentSnapIndex,
  keyboardOffset,
  contentHeight,
  setRenderContent,
  lazy,
  initialSnapIndex
}) => {
  const hasCommittedVisibilityRef = (0, _react.useRef)(false);
  const wasVisibleRef = (0, _react.useRef)(false);

  // Modal opening layout effect
  (0, _react.useLayoutEffect)(() => {
    const wasVisible = hasCommittedVisibilityRef.current ? wasVisibleRef.current : false;
    hasCommittedVisibilityRef.current = true;
    wasVisibleRef.current = visible;
    if (!visible || wasVisible) {
      return;
    }
    isOpen.value = true;
    isOpening.value = true;
    currentSnapIndex.value = 0;
    sheetTranslateY.value = maxHeight;
    if (enableDynamicSizing) {
      setRenderContent(true);
      return;
    }
    open(true, initialSnapIndex);
  }, [enableDynamicSizing, visible, isOpen, isOpening, maxHeight, open, sheetTranslateY, currentSnapIndex, initialSnapIndex, setRenderContent]);

  // Hard visibility change / hidden cleanup
  (0, _react.useEffect)(() => {
    if (visible) return;
    isOpen.value = false;
    isOpening.value = false;
    keyboardOffset.value = 0;
    currentSnapIndex.value = 0;
    sheetTranslateY.value = maxHeight;
    contentHeight.value = undefined;
    setRenderContent(!lazy);
  }, [contentHeight, visible, lazy, isOpen, isOpening, keyboardOffset, maxHeight, sheetTranslateY, currentSnapIndex, setRenderContent]);
};
exports.useBottomSheetEffects = useBottomSheetEffects;
//# sourceMappingURL=useBottomSheetEffects.js.map