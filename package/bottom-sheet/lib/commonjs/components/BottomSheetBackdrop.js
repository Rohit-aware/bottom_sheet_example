"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheetBackdrop = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Backdrop overlay component that fades in and handles dismissing on click.
 */
const BottomSheetBackdrop = exports.BottomSheetBackdrop = /*#__PURE__*/_react.default.memo(({
  onPress,
  animatedStyle,
  renderBackdrop,
  theme,
  style: styleOverrides
}) => {
  if (renderBackdrop) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: renderBackdrop({
        onPress,
        animatedStyle
      })
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
      pointerEvents: "none",
      style: [_reactNative.StyleSheet.absoluteFill, styles.backdrop, {
        backgroundColor: theme.colors.backdrop
      }, styleOverrides?.backdrop, animatedStyle]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      onPress: onPress,
      style: [_reactNative.StyleSheet.absoluteFill, styleOverrides?.overlay]
    })]
  });
});
BottomSheetBackdrop.displayName = 'BottomSheetBackdrop';
const styles = _reactNative.StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
//# sourceMappingURL=BottomSheetBackdrop.js.map