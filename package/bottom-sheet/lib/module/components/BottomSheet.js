"use strict";

import React, { forwardRef, useImperativeHandle } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetBackdrop } from './BottomSheetBackdrop';
import { BottomSheetView } from './BottomSheetView';
import { useBottomSheetSetup } from '../hooks/useBottomSheetSetup';
import { useStableCallback } from '../hooks/useStableCallback';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const BottomSheet = /*#__PURE__*/forwardRef((props, ref) => {
  const setup = useBottomSheetSetup(props);
  const {
    controller,
    layout,
    modalVisible
  } = setup;

  // Expose public API methods to parent ref
  useImperativeHandle(ref, () => ({
    open: () => controller.open(),
    close: callback => controller.close(callback),
    snapToIndex: index => controller.snapToIndex(index),
    expand: () => controller.snapToIndex(layout.resolvedSnapPoints.value.length - 1),
    collapse: () => controller.snapToIndex(0)
  }), [controller, layout.resolvedSnapPoints]);
  const onBackdropPress = useStableCallback(() => {
    if (props.enableBackdropDismiss ?? true) {
      controller.close();
    }
  });
  if (!modalVisible) {
    return null;
  }
  return /*#__PURE__*/_jsx(Modal, {
    onRequestClose: props.onClose,
    transparent: true,
    visible: modalVisible,
    ...(props.accessibilityProps || {}),
    children: /*#__PURE__*/_jsxs(GestureHandlerRootView, {
      style: styles.sheetContentContainer,
      children: [/*#__PURE__*/_jsx(BottomSheetBackdrop, {
        onPress: onBackdropPress,
        animatedStyle: setup.animation.overlayAnimatedStyle,
        renderBackdrop: props.renderBackdrop,
        theme: setup.resolvedTheme,
        style: props.style
      }), /*#__PURE__*/_jsx(BottomSheetView, {
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
const styles = StyleSheet.create({
  sheetContentContainer: {
    flex: 1
  }
});
//# sourceMappingURL=BottomSheet.js.map