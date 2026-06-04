"use strict";

import React, { createContext, useContext } from 'react';
import { defaultTheme } from './defaultTheme';
import { jsx as _jsx } from "react/jsx-runtime";
const ThemeContext = /*#__PURE__*/createContext(defaultTheme);
/**
 * Theme provider that supplies style tokens to nested bottom sheets.
 */
export const BottomSheetThemeProvider = ({
  theme,
  children
}) => {
  return /*#__PURE__*/_jsx(ThemeContext.Provider, {
    value: theme,
    children: children
  });
};

/**
 * Hook to retrieve the current BottomSheetTheme tokens from context.
 */
export const useBottomSheetTheme = () => {
  return useContext(ThemeContext);
};
//# sourceMappingURL=ThemeContext.js.map