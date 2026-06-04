"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetGesture = void 0;
var _react = require("react");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNativeWorklets = require("react-native-worklets");
var _gestureDecision = require("../utils/gestureDecision");
var _useStableCallback = require("./useStableCallback");
/**
 * Hook to build and memoize the pan gesture.
 */
const useBottomSheetGesture = ({
  renderContent,
  maxHeight,
  enableDragToClose = true,
  sheetTranslateY,
  currentSnapIndex,
  snapPointTranslateYs,
  closeFromGesture,
  snapToIndex,
  gestureThresholds,
  enableContentGesture = true
}) => {
  const panStartTranslateY = (0, _reactNativeReanimated.useSharedValue)(0);
  const stableCloseFromGesture = (0, _useStableCallback.useStableCallback)(closeFromGesture);
  const stableSnapToIndex = (0, _useStableCallback.useStableCallback)(snapToIndex);
  const createPanGesture = (0, _react.useCallback)(enabled => {
    return _reactNativeGestureHandler.Gesture.Pan().enabled(enabled).onBegin(() => {
      panStartTranslateY.value = sheetTranslateY.value;
    }).onUpdate(event => {
      const nextTranslateY = panStartTranslateY.value + event.translationY;
      sheetTranslateY.value = Math.min(Math.max(nextTranslateY, 0), maxHeight);
    }).onEnd(event => {
      const decision = (0, _gestureDecision.resolveGestureEnd)({
        velocityY: event.velocityY,
        translationY: event.translationY,
        currentTranslateY: sheetTranslateY.value,
        snapPointTranslateYs: snapPointTranslateYs.value,
        currentSnapIndex: currentSnapIndex.value,
        maxHeight
      }, gestureThresholds);
      if (decision.action === 'close') {
        if (enableDragToClose) {
          (0, _reactNativeWorklets.scheduleOnRN)(stableCloseFromGesture);
        } else {
          (0, _reactNativeWorklets.scheduleOnRN)(stableSnapToIndex, 0);
        }
      } else {
        (0, _reactNativeWorklets.scheduleOnRN)(stableSnapToIndex, decision.index);
      }
    });
  }, [maxHeight, enableDragToClose, sheetTranslateY, currentSnapIndex, snapPointTranslateYs, gestureThresholds, panStartTranslateY, stableCloseFromGesture, stableSnapToIndex]);
  const handlePanGesture = (0, _react.useMemo)(() => createPanGesture(renderContent), [renderContent, createPanGesture]);
  const contentPanGesture = (0, _react.useMemo)(() => createPanGesture(renderContent && enableContentGesture), [renderContent, enableContentGesture, createPanGesture]);
  return {
    handlePanGesture,
    contentPanGesture
  };
};
exports.useBottomSheetGesture = useBottomSheetGesture;
//# sourceMappingURL=useBottomSheetGesture.js.map