import React, { ReactNode } from 'react';
import { LayoutChangeEvent } from 'react-native';
import type { BottomSheetContextValue } from '../types/internal';
import type { BottomSheetRenderProps, BottomSheetStyleOverrides } from '../types/props';
export interface BottomSheetContentProps {
    renderContent: boolean;
    enableDynamicSizing: boolean;
    bottomInset: number;
    handleDynamicContentLayout: (event: LayoutChangeEvent) => void;
    contextValue: BottomSheetContextValue;
    renderProps: BottomSheetRenderProps;
    children?: ReactNode | ((props: BottomSheetRenderProps) => ReactNode);
    style?: BottomSheetStyleOverrides;
}
/**
 * Component that lazily renders sheet content and handles dynamic sizing measurements.
 */
export declare const BottomSheetContent: React.MemoExoticComponent<({ renderContent, enableDynamicSizing, bottomInset, handleDynamicContentLayout, contextValue, renderProps, children, style: styleOverrides, }: BottomSheetContentProps) => React.JSX.Element | null>;
//# sourceMappingURL=BottomSheetContent.d.ts.map