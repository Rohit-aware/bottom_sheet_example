import { LayoutChangeEvent } from 'react-native';
import type { SnapPoint } from '../types/props';
export interface UseBottomSheetLayoutProps {
    snapPoints: SnapPoint[];
    enableDynamicSizing?: boolean;
    visible: boolean;
}
/**
 * Hook managing bottom sheet measurements, safe area layout boundaries,
 * and snap point height calculations.
 */
export declare const useBottomSheetLayout: ({ snapPoints, enableDynamicSizing, visible: _visible, }: UseBottomSheetLayoutProps) => {
    maxHeight: number;
    bottomInset: number;
    contentHeight: import("react-native-reanimated").SharedValue<number | undefined>;
    resolvedSnapPoints: import("react-native-reanimated").DerivedValue<number[]>;
    snapPointTranslateYs: import("react-native-reanimated").DerivedValue<number[]>;
    topSnapIndex: import("react-native-reanimated").DerivedValue<number>;
    handleDynamicContentLayout: import("./useStableCallback").StableCallback<[event: LayoutChangeEvent], void>;
};
export type UseBottomSheetLayoutResult = ReturnType<typeof useBottomSheetLayout>;
//# sourceMappingURL=useBottomSheetLayout.d.ts.map