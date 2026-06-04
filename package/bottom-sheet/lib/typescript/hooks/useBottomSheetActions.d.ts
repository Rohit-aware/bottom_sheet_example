import type { BottomSheetAnimationConfig } from '../types/props';
export interface UseBottomSheetActionsProps {
    isOpen: {
        value: boolean;
    };
    isOpening: {
        value: boolean;
    };
    currentSnapIndex: {
        value: number;
    };
    sheetTranslateY: {
        value: number;
    };
    maxHeight: number;
    resolvedSnapPoints: {
        value: number[];
    };
    animationConfig?: BottomSheetAnimationConfig;
    onSnap?: (index: number) => void;
    onClose: () => void;
    showContent: () => void;
}
export declare const useBottomSheetActions: ({ isOpen, isOpening, currentSnapIndex, sheetTranslateY, maxHeight, resolvedSnapPoints, animationConfig, onSnap, onClose, showContent, }: UseBottomSheetActionsProps) => {
    snapToIndex: import("./useStableCallback").StableCallback<[index: number], void>;
    open: import("./useStableCallback").StableCallback<[shouldShowContent?: boolean | undefined, initialSnapIndex?: number | undefined], void>;
    close: import("./useStableCallback").StableCallback<[callback?: (() => void) | undefined], void>;
    closeFromGesture: import("./useStableCallback").StableCallback<[], void>;
};
//# sourceMappingURL=useBottomSheetActions.d.ts.map