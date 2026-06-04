"use strict";

import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useBottomSheetTheme } from '../theme/ThemeContext';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Backdrop overlay component that fades in and handles dismissing on click.
 */
export const BottomSheetBackdrop = /*#__PURE__*/React.memo(({
  onPress,
  animatedStyle,
  renderBackdrop,
  theme: themeOverride,
  style: styleOverrides
}) => {
  const contextTheme = useBottomSheetTheme();
  if (renderBackdrop) {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: renderBackdrop({
        onPress,
        animatedStyle
      })
    });
  }
  const resolvedTheme = {
    ...contextTheme,
    ...themeOverride,
    colors: {
      ...contextTheme.colors,
      ...themeOverride?.colors
    },
    radius: {
      ...contextTheme.radius,
      ...themeOverride?.radius
    },
    spacing: {
      ...contextTheme.spacing,
      ...themeOverride?.spacing
    },
    sizing: {
      ...contextTheme.sizing,
      ...themeOverride?.sizing
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Animated.View, {
      pointerEvents: "none",
      style: [StyleSheet.absoluteFill, styles.backdrop, {
        backgroundColor: resolvedTheme.colors.backdrop
      }, styleOverrides?.backdrop, animatedStyle]
    }), /*#__PURE__*/_jsx(Pressable, {
      onPress: onPress,
      style: [StyleSheet.absoluteFill, styleOverrides?.overlay]
    })]
  });
});
BottomSheetBackdrop.displayName = 'BottomSheetBackdrop';
const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
//# sourceMappingURL=BottomSheetBackdrop.js.map