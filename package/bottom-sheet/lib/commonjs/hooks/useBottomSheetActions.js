"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetActions = void 0;
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNativeWorklets = require("react-native-worklets");
var _resolveAnimationConfig = require("../utils/resolveAnimationConfig");
var _animationMath = require("../utils/animationMath");
var _snapPointMath = require("../utils/snapPointMath");
var _useStableCallback = require("./useStableCallback");
const useBottomSheetActions = ({
  isOpen,
  isOpening,
  currentSnapIndex,
  sheetTranslateY,
  maxHeight,
  resolvedSnapPoints,
  animationConfig,
  onSnap,
  onClose,
  showContent
}) => {
  const {
    duration,
    openEasing,
    closeEasing,
    snapEasing
  } = (0, _resolveAnimationConfig.resolveAnimationConfig)(animationConfig);
  const finishClose = (0, _useStableCallback.useStableCallback)(callback => {
    onClose();
    if (callback) {
      if (_reactNative.Platform.OS === 'ios') callback();else setTimeout(callback, 100);
    }
  });
  const snapToIndex = (0, _useStableCallback.useStableCallback)(index => {
    if (!isOpen.value) return;
    const points = resolvedSnapPoints.value;
    const clamped = Math.min(Math.max(0, index), points.length - 1);
    currentSnapIndex.value = clamped;
    const target = (0, _snapPointMath.getBottomSheetSnapPointTranslateY)({
      snapPoints: points,
      maxHeight,
      snapIndex: clamped
    });
    sheetTranslateY.value = (0, _reactNativeReanimated.withTiming)(target, (0, _animationMath.getTimingConfig)(duration, snapEasing), finished => {
      if (finished && onSnap) (0, _reactNativeWorklets.scheduleOnRN)(onSnap, clamped);
    });
  });
  const open = (0, _useStableCallback.useStableCallback)((shouldShowContent = true, initialSnapIndex = 0) => {
    const points = resolvedSnapPoints.value;
    const targetIndex = Math.min(initialSnapIndex, points.length - 1);
    currentSnapIndex.value = targetIndex;
    const target = (0, _snapPointMath.getBottomSheetSnapPointTranslateY)({
      snapPoints: points,
      maxHeight,
      snapIndex: targetIndex
    });
    sheetTranslateY.value = (0, _reactNativeReanimated.withTiming)(target, (0, _animationMath.getTimingConfig)(duration, openEasing), finished => {
      if (!finished) return;
      isOpening.value = false;
      if (shouldShowContent) (0, _reactNativeWorklets.scheduleOnRN)(showContent);
      if (onSnap) (0, _reactNativeWorklets.scheduleOnRN)(onSnap, targetIndex);
    });
  });
  const closeFromGesture = (0, _useStableCallback.useStableCallback)(() => {
    _reactNative.Keyboard.dismiss();
    isOpen.value = false;
    isOpening.value = false;
    sheetTranslateY.value = (0, _reactNativeReanimated.withTiming)(maxHeight, (0, _animationMath.getTimingConfig)(duration, closeEasing), finished => {
      if (finished) (0, _reactNativeWorklets.scheduleOnRN)(onClose);
    });
  });
  const close = (0, _useStableCallback.useStableCallback)(callback => {
    if (!isOpen.value) return;
    _reactNative.Keyboard.dismiss();
    isOpen.value = false;
    isOpening.value = false;
    sheetTranslateY.value = (0, _reactNativeReanimated.withTiming)(maxHeight, (0, _animationMath.getTimingConfig)(duration, closeEasing), finished => {
      if (finished) (0, _reactNativeWorklets.scheduleOnRN)(finishClose, callback);
    });
  });
  return {
    snapToIndex,
    open,
    close,
    closeFromGesture
  };
};
exports.useBottomSheetActions = useBottomSheetActions;
//# sourceMappingURL=useBottomSheetActions.js.map