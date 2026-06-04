"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheetHandle = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Drag handle component displayed at the top of the bottom sheet.
 */
const BottomSheetHandle = exports.BottomSheetHandle = /*#__PURE__*/_react.default.memo(({
  theme,
  style: styleOverrides
}) => {
  const {
    colors,
    radius,
    spacing,
    sizing
  } = theme;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [styles.handle, {
      backgroundColor: colors.handle,
      borderRadius: radius.handle,
      height: sizing.handleHeight,
      width: sizing.handleWidth,
      marginVertical: spacing.handleMarginVertical
    }, styleOverrides?.handle]
  });
});
BottomSheetHandle.displayName = 'BottomSheetHandle';
const styles = _reactNative.StyleSheet.create({
  handle: {
    alignSelf: 'center'
  }
});
//# sourceMappingURL=BottomSheetHandle.js.map