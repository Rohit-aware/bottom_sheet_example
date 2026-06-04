"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheet = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNativeWorklets = require("react-native-worklets");
var _BottomSheetBackdrop = require("./BottomSheetBackdrop");
var _BottomSheetView = require("./BottomSheetView");
var _useBottomSheetLayout = require("../hooks/useBottomSheetLayout");
var _useKeyboardBehavior = require("../hooks/useKeyboardBehavior");
var _useBottomSheetAnimation = require("../hooks/useBottomSheetAnimation");
var _useBottomSheetController = require("../hooks/useBottomSheetController");
var _useBottomSheetGesture = require("../hooks/useBottomSheetGesture");
var _useResolvedTheme = require("../theme/useResolvedTheme");
var _useStableCallback = require("../hooks/useStableCallback");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const BottomSheet = exports.BottomSheet = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const [modalVisible, setModalVisible] = (0, _react.useState)(props.visible);
  const resolvedTheme = (0, _useResolvedTheme.useResolvedTheme)(props.theme);
  const layout = (0, _useBottomSheetLayout.useBottomSheetLayout)({
    snapPoints: props.snapPoints,
    enableDynamicSizing: props.enableDynamicSizing,
    visible: modalVisible
  });
  const keyboardOffset = (0, _useKeyboardBehavior.useKeyboardBehavior)(modalVisible);
  const animation = (0, _useBottomSheetAnimation.useBottomSheetAnimation)({
    maxHeight: layout.maxHeight,
    resolvedSnapPoints: layout.resolvedSnapPoints,
    keyboardOffset
  });
  const controller = (0, _useBottomSheetController.useBottomSheetController)({
    visible: modalVisible,
    onClose: props.onClose,
    onSnap: props.onSnap,
    initialSnapIndex: props.initialSnapIndex ?? 0,
    enableDynamicSizing: props.enableDynamicSizing ?? false,
    lazy: props.lazy ?? false,
    maxHeight: layout.maxHeight,
    contentHeight: layout.contentHeight,
    resolvedSnapPoints: layout.resolvedSnapPoints,
    snapPointTranslateYs: layout.snapPointTranslateYs,
    topSnapIndex: layout.topSnapIndex,
    sheetTranslateY: animation.sheetTranslateY,
    keyboardOffset,
    animationConfig: props.animationConfig
  });
  (0, _react.useEffect)(() => {
    if (props.visible) {
      setModalVisible(true);
    } else {
      if (controller.isOpen.value) {
        controller.close(() => {
          setModalVisible(false);
        });
      } else {
        setModalVisible(false);
      }
    }
  }, [props.visible, controller.close, controller.isOpen]);
  const [enableContentGesture, setEnableContentGesture] = (0, _react.useState)(true);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return controller.currentSnapIndex.value < layout.topSnapIndex.value;
  }, (shouldEnable, prevShouldEnable) => {
    if (shouldEnable !== prevShouldEnable) {
      (0, _reactNativeWorklets.scheduleOnRN)(setEnableContentGesture, shouldEnable);
    }
  }, [controller.currentSnapIndex, layout.topSnapIndex]);
  const {
    handlePanGesture,
    contentPanGesture
  } = (0, _useBottomSheetGesture.useBottomSheetGesture)({
    renderContent: controller.renderContent,
    maxHeight: layout.maxHeight,
    enableDragToClose: props.enableDragToClose ?? true,
    sheetTranslateY: animation.sheetTranslateY,
    currentSnapIndex: controller.currentSnapIndex,
    resolvedSnapPoints: layout.resolvedSnapPoints,
    snapPointTranslateYs: layout.snapPointTranslateYs,
    topSnapIndex: layout.topSnapIndex,
    closeFromGesture: controller.closeFromGesture,
    snapToIndex: controller.snapToIndex,
    enableContentGesture
  });

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
        animatedStyle: animation.overlayAnimatedStyle,
        renderBackdrop: props.renderBackdrop,
        theme: resolvedTheme,
        style: props.style
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomSheetView.BottomSheetView, {
        theme: resolvedTheme,
        layout: layout,
        animation: animation,
        controller: controller,
        handlePanGesture: handlePanGesture,
        contentPanGesture: contentPanGesture,
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