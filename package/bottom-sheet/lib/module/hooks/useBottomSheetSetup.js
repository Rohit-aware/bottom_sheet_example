"use strict";

import { useState, useEffect } from 'react';
import { useAnimatedReaction } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useBottomSheetLayout } from './useBottomSheetLayout';
import { useKeyboardBehavior } from './useKeyboardBehavior';
import { useBottomSheetAnimation } from './useBottomSheetAnimation';
import { useBottomSheetController } from './useBottomSheetController';
import { useBottomSheetGesture } from './useBottomSheetGesture';
import { useResolvedTheme } from './useResolvedTheme';
export const useBottomSheetSetup = props => {
  const [modalVisible, setModalVisible] = useState(props.visible);
  const resolvedTheme = useResolvedTheme(props.theme);
  const layout = useBottomSheetLayout({
    snapPoints: props.snapPoints,
    enableDynamicSizing: props.enableDynamicSizing,
    visible: modalVisible
  });
  const keyboardOffset = useKeyboardBehavior(modalVisible);
  const animation = useBottomSheetAnimation({
    maxHeight: layout.maxHeight,
    resolvedSnapPoints: layout.resolvedSnapPoints,
    keyboardOffset
  });
  const controller = useBottomSheetController({
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
  useEffect(() => {
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
  const [enableContentGesture, setEnableContentGesture] = useState(true);
  useAnimatedReaction(() => {
    return controller.currentSnapIndex.value < layout.topSnapIndex.value;
  }, (shouldEnable, prevShouldEnable) => {
    if (shouldEnable !== prevShouldEnable) {
      scheduleOnRN(setEnableContentGesture, shouldEnable);
    }
  }, [controller.currentSnapIndex, layout.topSnapIndex]);
  const {
    handlePanGesture,
    contentPanGesture
  } = useBottomSheetGesture({
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
//# sourceMappingURL=useBottomSheetSetup.js.map