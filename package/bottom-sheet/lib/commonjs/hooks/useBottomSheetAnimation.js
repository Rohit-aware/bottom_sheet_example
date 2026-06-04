"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetAnimation = void 0;
var _reactNativeReanimated = require("react-native-reanimated");
var _animationMath = require("../utils/animationMath");
/**
 * Hook managing the sheet's active Y translation value and returning the animated styles.
 */
const useBottomSheetAnimation = ({
  maxHeight,
  resolvedSnapPoints,
  keyboardOffset
}) => {
  const sheetTranslateY = (0, _reactNativeReanimated.useSharedValue)(maxHeight);
  const sheetViewportAnimatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: Math.max(0, sheetTranslateY.value - keyboardOffset.value)
      }]
    };
  });
  const overlayAnimatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const points = resolvedSnapPoints.value;
    const baseHeight = points.length > 0 ? points[0] : maxHeight;
    const progress = (0, _animationMath.calculateOverlayOpacity)(sheetTranslateY.value, maxHeight, baseHeight);
    return {
      opacity: progress
    };
  });
  return {
    sheetTranslateY,
    sheetViewportAnimatedStyle,
    overlayAnimatedStyle
  };
};
exports.useBottomSheetAnimation = useBottomSheetAnimation;
//# sourceMappingURL=useBottomSheetAnimation.js.map