"use strict";

import { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useStableCallback } from './useStableCallback';
import { useBottomSheetActions } from './useBottomSheetActions';
import { useBottomSheetEffects } from './useBottomSheetEffects';
import { useBottomSheetReactions } from './useBottomSheetReactions';
/**
 * Controller hook managing the open, close, and snapping state machine of the bottom sheet.
 */
export const useBottomSheetController = ({
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
  const isOpen = useSharedValue(false);
  const isOpening = useSharedValue(false);
  const currentSnapIndex = useSharedValue(0);
  const [renderContent, setRenderContent] = useState(!lazy);
  const showContent = useStableCallback(() => {
    if (lazy) {
      setRenderContent(true);
    }
  });
  const actions = useBottomSheetActions({
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
  useBottomSheetEffects({
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
  useBottomSheetReactions({
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
//# sourceMappingURL=useBottomSheetController.js.map