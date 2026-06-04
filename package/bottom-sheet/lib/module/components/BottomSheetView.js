"use strict";

import React, { useMemo } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { BottomSheetHandle } from './BottomSheetHandle';
import { BottomSheetContent } from './BottomSheetContent';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const BottomSheetView = /*#__PURE__*/React.memo(({
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
  const controllerProps = useMemo(() => ({
    close: controller.close,
    snapToIndex: controller.snapToIndex,
    expand: () => controller.snapToIndex(layout.resolvedSnapPoints.value.length - 1),
    collapse: () => controller.snapToIndex(0),
    currentSnapIndex: controller.currentSnapIndex
  }), [controller.close, controller.snapToIndex, controller.currentSnapIndex, layout.resolvedSnapPoints]);
  const content = /*#__PURE__*/_jsx(BottomSheetContent, {
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
  return /*#__PURE__*/_jsx(Animated.View, {
    pointerEvents: "box-none",
    style: [{
      height: layout.maxHeight
    }, animation.sheetViewportAnimatedStyle],
    children: /*#__PURE__*/_jsxs(Animated.View, {
      style: [styles.container, {
        height: layout.maxHeight,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.radius.container,
        borderTopRightRadius: theme.radius.container
      }, styleOverrides?.container],
      children: [/*#__PURE__*/_jsx(GestureDetector, {
        gesture: handlePanGesture,
        children: /*#__PURE__*/_jsx(Animated.View, {
          children: renderHandle ? renderHandle({
            theme
          }) : /*#__PURE__*/_jsx(BottomSheetHandle, {
            theme: theme,
            style: styleOverrides
          })
        })
      }), /*#__PURE__*/_jsx(GestureDetector, {
        gesture: contentPanGesture,
        children: /*#__PURE__*/_jsx(Animated.View, {
          style: styles.contentWrapper,
          pointerEvents: "box-none",
          children: avoidKeyboard ? /*#__PURE__*/_jsx(KeyboardAvoidingView, {
            behavior: Platform.OS === 'ios' ? 'padding' : 'height',
            style: styles.keyboardAvoidingView,
            children: content
          }) : content
        })
      })]
    })
  });
});
BottomSheetView.displayName = 'BottomSheetView';
const styles = StyleSheet.create({
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