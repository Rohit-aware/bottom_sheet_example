"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheetView = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _BottomSheetHandle = require("./BottomSheetHandle");
var _BottomSheetContent = require("./BottomSheetContent");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BottomSheetView = exports.BottomSheetView = /*#__PURE__*/_react.default.memo(({
  theme,
  layout,
  animation,
  controller,
  handlePanGesture,
  contentPanGesture,
  style: styleOverrides,
  renderHandle,
  enableDynamicSizing = false,
  children,
  avoidKeyboard = false
}) => {
  const controllerProps = {
    close: controller.close,
    snapToIndex: controller.snapToIndex,
    expand: () => controller.snapToIndex(layout.resolvedSnapPoints.value.length - 1),
    collapse: () => controller.snapToIndex(0),
    currentSnapIndex: controller.currentSnapIndex
  };
  const content = /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomSheetContent.BottomSheetContent, {
    renderContent: controller.renderContent,
    enableDynamicSizing: enableDynamicSizing,
    bottomInset: layout.bottomInset,
    handleDynamicContentLayout: layout.handleDynamicContentLayout,
    contextValue: {
      close: controller.close,
      currentSnapIndex: controller.currentSnapIndex,
      topSnapIndex: layout.topSnapIndex
    },
    renderProps: controllerProps,
    style: styleOverrides,
    children: children
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
    pointerEvents: "box-none",
    style: [{
      height: layout.maxHeight
    }, animation.sheetViewportAnimatedStyle],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeReanimated.default.View, {
      style: [styles.container, {
        height: layout.maxHeight,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.radius.container,
        borderTopRightRadius: theme.radius.container
      }, styleOverrides?.container],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.GestureDetector, {
        gesture: handlePanGesture,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
          children: renderHandle ? renderHandle({
            theme
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomSheetHandle.BottomSheetHandle, {
            theme: theme,
            style: styleOverrides
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.GestureDetector, {
        gesture: contentPanGesture,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
          style: styles.contentWrapper,
          pointerEvents: "box-none",
          children: avoidKeyboard ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
            behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height',
            style: styles.keyboardAvoidingView,
            children: content
          }) : content
        })
      })]
    })
  });
});
BottomSheetView.displayName = 'BottomSheetView';
const styles = _reactNative.StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  contentWrapper: {
    flex: 1
  },
  keyboardAvoidingView: {
    flex: 1
  }
});
//# sourceMappingURL=BottomSheetView.js.map