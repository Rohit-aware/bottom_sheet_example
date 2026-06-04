import type { BottomSheetAnimationConfig } from '../types/props';
export interface UseBottomSheetReactionsProps {
    visible: boolean;
    enableDynamicSizing: boolean;
    isOpening: {
        value: boolean;
    };
    contentHeight: {
        value: number | undefined;
    };
    resolvedSnapPoints: {
        value: number[];
    };
    maxHeight: number;
    sheetTranslateY: {
        value: number;
    };
    animationConfig?: BottomSheetAnimationConfig;
    onSnap?: (index: number) => void;
    isOpen: {
        value: boolean;
    };
    currentSnapIndex: {
        value: number;
    };
    topSnapIndex: {
        value: number;
    };
}
export declare const useBottomSheetReactions: ({ visible, enableDynamicSizing, isOpening, contentHeight, resolvedSnapPoints, maxHeight, sheetTranslateY, animationConfig, onSnap, isOpen, currentSnapIndex, topSnapIndex, }: UseBottomSheetReactionsProps) => void;
//# sourceMappingURL=useBottomSheetReactions.d.ts.map