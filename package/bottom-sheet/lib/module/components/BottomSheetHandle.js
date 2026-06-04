"use strict";

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Drag handle component displayed at the top of the bottom sheet.
 */
export const BottomSheetHandle = /*#__PURE__*/React.memo(({
  theme,
  style: styleOverrides
}) => {
  const {
    colors,
    radius,
    spacing,
    sizing
  } = theme;
  return /*#__PURE__*/_jsx(View, {
    style: [styles.handle, {
      backgroundColor: colors.handle,
      borderRadius: radius.handle,
      height: sizing.handleHeight,
      width: sizing.handleWidth,
      marginVertical: spacing.handleMarginVertical
    }, styleOverrides?.handle]
  });
});
BottomSheetHandle.displayName = 'BottomSheetHandle';
const styles = StyleSheet.create({
  handle: {
    alignSelf: 'center'
  }
});
//# sourceMappingURL=BottomSheetHandle.js.map