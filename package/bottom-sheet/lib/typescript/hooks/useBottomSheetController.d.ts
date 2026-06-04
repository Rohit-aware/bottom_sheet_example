import type { BottomSheetAnimationConfig } from '../types/props';
export interface UseBottomSheetControllerProps {
    visible: boolean;
    onClose: () => void;
    onSnap?: (index: number) => void;
    initialSnapIndex: number;
    enableDynamicSizing: boolean;
    lazy: boolean;
    maxHeight: number;
    contentHeight: {
        value: number | undefined;
    };
    resolvedSnapPoints: {
        value: number[];
    };
    snapPointTranslateYs: {
        value: number[];
    };
    topSnapIndex: {
        value: number;
    };
    sheetTranslateY: {
        value: number;
    };
    keyboardOffset: {
        value: number;
    };
    animationConfig?: BottomSheetAnimationConfig;
}
/**
 * Controller hook managing the open, close, and snapping state machine of the bottom sheet.
 */
export declare const useBottomSheetController: ({ visible, onClose, onSnap, initialSnapIndex, enableDynamicSizing, lazy, maxHeight, contentHeight, resolvedSnapPoints, topSnapIndex, sheetTranslateY, keyboardOffset, animationConfig, }: UseBottomSheetControllerProps) => {
    isOpen: import("react-native-reanimated").SharedValue<boolean>;
    isOpening: import("react-native-reanimated").SharedValue<boolean>;
    currentSnapIndex: import("react-native-reanimated").SharedValue<number>;
    renderContent: boolean;
    showContent: import("./useStableCallback").StableCallback<[], void>;
    open: import("./useStableCallback").StableCallback<[shouldShowContent?: boolean | undefined, initialSnapIndex?: number | undefined], void>;
    close: import("./useStableCallback").StableCallback<[callback?: (() => void) | undefined], void>;
    closeFromGesture: import("./useStableCallback").StableCallback<[], void>;
    snapToIndex: import("./useStableCallback").StableCallback<[index: number], void>;
};
export type UseBottomSheetControllerResult = ReturnType<typeof useBottomSheetController>;
//# sourceMappingURL=useBottomSheetController.d.ts.map