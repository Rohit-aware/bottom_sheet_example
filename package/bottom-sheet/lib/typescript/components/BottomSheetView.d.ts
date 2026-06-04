import React, { ReactNode } from 'react';
import type { BottomSheetTheme } from '../theme/types';
import type { BottomSheetStyleOverrides, BottomSheetRenderProps } from '../types/props';
import type { UseBottomSheetLayoutResult } from '../hooks/useBottomSheetLayout';
import type { UseBottomSheetAnimationResult } from '../hooks/useBottomSheetAnimation';
import type { UseBottomSheetControllerResult } from '../hooks/useBottomSheetController';
export interface BottomSheetViewProps {
    theme: BottomSheetTheme;
    layout: UseBottomSheetLayoutResult;
    animation: UseBottomSheetAnimationResult;
    controller: UseBottomSheetControllerResult;
    handlePanGesture: any;
    contentPanGesture: any;
    style?: BottomSheetStyleOverrides;
    renderHandle?: (props: {
        theme: BottomSheetTheme;
    }) => ReactNode;
    enableDynamicSizing?: boolean;
    children?: ReactNode | ((props: BottomSheetRenderProps) => ReactNode);
    avoidKeyboard?: boolean;
}
export declare const BottomSheetView: React.MemoExoticComponent<({ theme, layout, animation, controller, handlePanGesture, contentPanGesture, style: styleOverrides, renderHandle, enableDynamicSizing, children, avoidKeyboard, }: BottomSheetViewProps) => React.JSX.Element>;
//# sourceMappingURL=BottomSheetView.d.ts.map