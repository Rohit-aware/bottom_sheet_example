"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetController = void 0;
var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
var _useStableCallback = require("./useStableCallback");
var _useBottomSheetActions = require("./useBottomSheetActions");
var _useBottomSheetEffects = require("./useBottomSheetEffects");
var _useBottomSheetReactions = require("./useBottomSheetReactions");
/**
 * Controller hook managing the open, close, and snapping state machine of the bottom sheet.
 */
const useBottomSheetController = ({
  visible,
  onClose,
  onSnap,
  initialSnapIndex,
  enableDynamicSizing,
  lazy,
  maxHeight,
  contentHeight,
  resolvedSnapPoints,
  topSnapIndex,
  sheetTranslateY,
  keyboardOffset,
  animationConfig
}) => {
  const isOpen = (0, _reactNativeReanimated.useSharedValue)(false);
  const isOpening = (0, _reactNativeReanimated.useSharedValue)(false);
  const currentSnapIndex = (0, _reactNativeReanimated.useSharedValue)(0);
  const [renderContent, setRenderContent] = (0, _react.useState)(!lazy);
  const showContent = (0, _useStableCallback.useStableCallback)(() => {
    if (lazy) {
      setRenderContent(true);
    }
  });
  const actions = (0, _useBottomSheetActions.useBottomSheetActions)({
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
  });
  (0, _useBottomSheetEffects.useBottomSheetEffects)({
    visible,
    enableDynamicSizing,
    isOpen,
    isOpening,
    maxHeight,
    open: actions.open,
    sheetTranslateY,
    currentSnapIndex,
    keyboardOffset,
    contentHeight,
    setRenderContent,
    lazy,
    initialSnapIndex
  });
  (0, _useBottomSheetReactions.useBottomSheetReactions)({
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
  });
  return {
    isOpen,
    isOpening,
    currentSnapIndex,
    renderContent,
    showContent,
    open: actions.open,
    close: actions.close,
    closeFromGesture: actions.closeFromGesture,
    snapToIndex: actions.snapToIndex
  };
};
exports.useBottomSheetController = useBottomSheetController;
//# sourceMappingURL=useBottomSheetController.js.map