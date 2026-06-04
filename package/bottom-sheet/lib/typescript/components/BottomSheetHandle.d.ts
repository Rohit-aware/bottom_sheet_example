import React from 'react';
import type { BottomSheetTheme } from '../theme/types';
import type { BottomSheetStyleOverrides } from '../types/props';
export interface BottomSheetHandleProps {
    theme?: Partial<BottomSheetTheme>;
    style?: BottomSheetStyleOverrides;
}
/**
 * Drag handle component displayed at the top of the bottom sheet.
 */
export declare const BottomSheetHandle: React.MemoExoticComponent<({ theme: themeOverride, style: styleOverrides }: BottomSheetHandleProps) => React.JSX.Element>;
//# sourceMappingURL=BottomSheetHandle.d.ts.map