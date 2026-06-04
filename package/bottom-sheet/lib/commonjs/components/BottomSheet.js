"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheet = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _BottomSheetBackdrop = require("./BottomSheetBackdrop");
var _BottomSheetView = require("./BottomSheetView");
var _useBottomSheetSetup = require("../hooks/useBottomSheetSetup");
var _useStableCallback = require("../hooks/useStableCallback");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const BottomSheet = exports.BottomSheet = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const setup = (0, _useBottomSheetSetup.useBottomSheetSetup)(props);
  const {
    controller,
    layout,
    modalVisible
  } = setup;

  // Expose public API methods to parent ref
  (0, _react.useImperativeHandle)(ref, () => ({
    open: () => controller.open(),
    close: callback => controller.close(callback),
    snapToIndex: index => controller.snapToIndex(index),
    expand: () => controller.snapToIndex(layout.resolvedSnapPoints.value.length - 1),
    collapse: () => controller.snapToIndex(0)
  }), [controller, layout.resolvedSnapPoints]);
  const onBackdropPress = (0, _useStableCallback.useStableCallback)(() => {
    if (props.enableBackdropDismiss ?? true) {
      controller.close();
    }
  });
  if (!modalVisible) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Modal, {
    onRequestClose: props.onClose,
    transparent: true,
    visible: modalVisible,
    ...(props.accessibilityProps || {}),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeGestureHandler.GestureHandlerRootView, {
      style: styles.sheetContentContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomSheetBackdrop.BottomSheetBackdrop, {
        onPress: onBackdropPress,
        animatedStyle: setup.animation.overlayAnimatedStyle,
        renderBackdrop: props.renderBackdrop,
        theme: setup.resolvedTheme,
        style: props.style
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomSheetView.BottomSheetView, {
        theme: setup.resolvedTheme,
        layout: setup.layout,
        animation: setup.animation,
        controller: setup.controller,
        handlePanGesture: setup.handlePanGesture,
        contentPanGesture: setup.contentPanGesture,
        style: props.style,
        renderHandle: props.renderHandle,
        enableDynamicSizing: props.enableDynamicSizing,
        avoidKeyboard: props.avoidKeyboard,
        children: props.children
      })]
    })
  });
});
BottomSheet.displayName = 'BottomSheet';
const styles = _reactNative.StyleSheet.create({
  sheetContentContainer: {
    flex: 1
  }
});
//# sourceMappingURL=BottomSheet.js.map