import React, { ReactNode } from 'react';
import type { BottomSheetTheme } from './types';
export interface BottomSheetThemeProviderProps {
    theme: BottomSheetTheme;
    children: ReactNode;
}
/**
 * Theme provider that supplies style tokens to nested bottom sheets.
 */
export declare const BottomSheetThemeProvider: ({ theme, children, }: BottomSheetThemeProviderProps) => React.JSX.Element;
/**
 * Hook to retrieve the current BottomSheetTheme tokens from context.
 */
export declare const useBottomSheetTheme: () => BottomSheetTheme;
//# sourceMappingURL=ThemeContext.d.ts.map