"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetLayout = void 0;
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _defaults = require("../constants/defaults");
var _snapPointMath = require("../utils/snapPointMath");
var _useStableCallback = require("./useStableCallback");
/**
 * Hook managing bottom sheet measurements, safe area layout boundaries,
 * and snap point height calculations.
 */
const useBottomSheetLayout = ({
  snapPoints,
  enableDynamicSizing = false,
  visible: _visible
}) => {
  const {
    height: windowHeight
  } = (0, _reactNative.useWindowDimensions)();
  const {
    top: topInset,
    bottom: bottomInset
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const maxHeight = Math.max(0, windowHeight - topInset - (_reactNative.Platform.OS === 'android' ? bottomInset + _defaults.ANDROID_HEIGHT_OFFSET : 0));
  const contentHeight = (0, _reactNativeReanimated.useSharedValue)(undefined);
  const resolvedSnapPoints = (0, _reactNativeReanimated.useDerivedValue)(() => {
    return (0, _snapPointMath.getBottomSheetSnapPoints)({
      snapPoints,
      maxHeight,
      contentHeight: contentHeight.value,
      enableDynamicSizing
    });
  }, [snapPoints, maxHeight, enableDynamicSizing]);
  const snapPointTranslateYs = (0, _reactNativeReanimated.useDerivedValue)(() => {
    const points = resolvedSnapPoints.value;
    return points.map((_, index) => (0, _snapPointMath.getBottomSheetSnapPointTranslateY)({
      snapPoints: points,
      maxHeight,
      snapIndex: index
    }));
  }, [resolvedSnapPoints, maxHeight]);
  const topSnapIndex = (0, _reactNativeReanimated.useDerivedValue)(() => {
    return (0, _snapPointMath.getBottomSheetTopSnapIndex)(resolvedSnapPoints.value);
  }, [resolvedSnapPoints]);
  const handleDynamicContentLayout = (0, _useStableCallback.useStableCallback)(event => {
    if (!enableDynamicSizing) {
      return;
    }
    const nextContentHeight = Math.ceil(event.nativeEvent.layout.height);
    if (contentHeight.value === nextContentHeight) {
      return;
    }
    contentHeight.value = nextContentHeight;
  });
  return {
    maxHeight,
    bottomInset,
    contentHeight,
    resolvedSnapPoints,
    snapPointTranslateYs,
    topSnapIndex,
    handleDynamicContentLayout
  };
};
exports.useBottomSheetLayout = useBottomSheetLayout;
//# sourceMappingURL=useBottomSheetLayout.js.map