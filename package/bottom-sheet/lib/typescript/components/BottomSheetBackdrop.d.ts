import React, { ReactNode } from 'react';
import type { BottomSheetTheme } from '../theme/types';
import type { BottomSheetStyleOverrides } from '../types/props';
export interface BottomSheetBackdropProps {
    onPress: () => void;
    animatedStyle: any;
    renderBackdrop?: (props: {
        onPress: () => void;
        animatedStyle: any;
    }) => ReactNode;
    theme?: Partial<BottomSheetTheme>;
    style?: BottomSheetStyleOverrides;
}
/**
 * Backdrop overlay component that fades in and handles dismissing on click.
 */
export declare const BottomSheetBackdrop: React.MemoExoticComponent<({ onPress, animatedStyle, renderBackdrop, theme: themeOverride, style: styleOverrides, }: BottomSheetBackdropProps) => React.JSX.Element>;
//# sourceMappingURL=BottomSheetBackdrop.d.ts.map