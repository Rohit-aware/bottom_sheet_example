import React, { ReactNode } from 'react';
import type { BottomSheetTheme } from '../theme/types';
import type { BottomSheetStyleOverrides } from '../types/props';
export interface BottomSheetBackdropProps {
    onPress: () => void;
    animatedStyle: object;
    renderBackdrop?: (props: {
        onPress: () => void;
        animatedStyle: object;
    }) => ReactNode;
    theme: BottomSheetTheme;
    style?: BottomSheetStyleOverrides;
}
/**
 * Backdrop overlay component that fades in and handles dismissing on click.
 */
export declare const BottomSheetBackdrop: React.MemoExoticComponent<({ onPress, animatedStyle, renderBackdrop, theme, style: styleOverrides, }: BottomSheetBackdropProps) => React.JSX.Element>;
//# sourceMappingURL=BottomSheetBackdrop.d.ts.map