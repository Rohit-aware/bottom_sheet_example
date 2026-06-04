"use strict";

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { BottomSheetProvider } from '../context/BottomSheetContext';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Component that lazily renders sheet content and handles dynamic sizing measurements.
 */
export const BottomSheetContent = /*#__PURE__*/React.memo(({
  renderContent,
  enableDynamicSizing,
  bottomInset,
  handleDynamicContentLayout,
  contextValue,
  renderProps,
  children,
  style: styleOverrides
}) => {
  if (!renderContent) {
    return null;
  }
  const resolvedChildren = typeof children === 'function' ? children(renderProps) : children;
  return /*#__PURE__*/_jsx(View, {
    style: [styles.contentContainer, styleOverrides?.contentContainer],
    children: /*#__PURE__*/_jsx(BottomSheetProvider, {
      value: contextValue,
      children: /*#__PURE__*/_jsx(Animated.View, {
        entering: FadeIn.duration(250),
        style: styles.sheetContentContainer,
        children: enableDynamicSizing ? /*#__PURE__*/_jsx(View, {
          onLayout: handleDynamicContentLayout,
          style: {
            paddingBottom: bottomInset
          },
          children: resolvedChildren
        }) : resolvedChildren
      })
    })
  });
});
BottomSheetContent.displayName = 'BottomSheetContent';
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1
  },
  sheetContentContainer: {
    flex: 1
  }
});
//# sourceMappingURL=BottomSheetContent.js.map