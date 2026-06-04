"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetSetup = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNativeWorklets = require("react-native-worklets");
var _useBottomSheetLayout = require("./useBottomSheetLayout");
var _useKeyboardBehavior = require("./useKeyboardBehavior");
var _useBottomSheetAnimation = require("./useBottomSheetAnimation");
var _useBottomSheetController = require("./useBottomSheetController");
var _useBottomSheetGesture = require("./useBottomSheetGesture");
var _useResolvedTheme = require("./useResolvedTheme");
const useBottomSheetSetup = props => {
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
  return {
    resolvedTheme,
    layout,
    animation,
    controller,
    handlePanGesture,
    contentPanGesture,
    modalVisible
  };
};
exports.useBottomSheetSetup = useBottomSheetSetup;
//# sourceMappingURL=useBottomSheetSetup.js.map