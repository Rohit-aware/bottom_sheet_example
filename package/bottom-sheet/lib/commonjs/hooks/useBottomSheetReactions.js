"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetReactions = void 0;
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNativeWorklets = require("react-native-worklets");
var _resolveAnimationConfig = require("../utils/resolveAnimationConfig");
var _animationMath = require("../utils/animationMath");
var _snapPointMath = require("../utils/snapPointMath");
const useBottomSheetReactions = ({
  visible,
  enableDynamicSizing,
  isOpening,
  contentHeight,
  resolvedSnapPoints,
  maxHeight,
  sheetTranslateY,
  animationConfig,
  onSnap,
  isOpen,
  currentSnapIndex,
  topSnapIndex
}) => {
  const {
    duration,
    openEasing,
    snapEasing
  } = (0, _resolveAnimationConfig.resolveAnimationConfig)(animationConfig);

  // Handle dynamic sizing opening animation when content height gets measured
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    if (!visible || !enableDynamicSizing || !isOpening.value || contentHeight.value === undefined) {
      return undefined;
    }
    return (0, _snapPointMath.getBottomSheetSnapPointTranslateY)({
      snapPoints: resolvedSnapPoints.value,
      maxHeight,
      snapIndex: 0
    });
  }, (next, prev) => {
    if (next === undefined || next === prev) return;
    sheetTranslateY.value = (0, _reactNativeReanimated.withTiming)(next, (0, _animationMath.getTimingConfig)(duration, openEasing), fin => {
      if (fin) {
        isOpening.value = false;
        if (onSnap) (0, _reactNativeWorklets.scheduleOnRN)(onSnap, 0);
      }
    });
  }, [resolvedSnapPoints, contentHeight, enableDynamicSizing, isOpening, maxHeight, sheetTranslateY, visible, duration, openEasing, onSnap]);

  // Dimension / Snap alignment reaction
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    if (!visible || !isOpen.value || isOpening.value) return undefined;
    const index = Math.min(currentSnapIndex.value, topSnapIndex.value);
    return {
      index,
      translateY: (0, _snapPointMath.getBottomSheetSnapPointTranslateY)({
        snapPoints: resolvedSnapPoints.value,
        maxHeight,
        snapIndex: index
      })
    };
  }, next => {
    if (!next) return;
    if (currentSnapIndex.value !== next.index) currentSnapIndex.value = next.index;
    if (Math.abs(sheetTranslateY.value - next.translateY) < 1) return;
    sheetTranslateY.value = (0, _reactNativeReanimated.withTiming)(next.translateY, (0, _animationMath.getTimingConfig)(duration, snapEasing));
  }, [resolvedSnapPoints, currentSnapIndex, isOpen, isOpening, maxHeight, sheetTranslateY, topSnapIndex, visible, duration, snapEasing]);
};
exports.useBottomSheetReactions = useBottomSheetReactions;
//# sourceMappingURL=useBottomSheetReactions.js.map