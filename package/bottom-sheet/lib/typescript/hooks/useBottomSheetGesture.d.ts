import { GestureThresholds } from '../utils/gestureDecision';
export interface UseBottomSheetGestureProps {
    renderContent: boolean;
    maxHeight: number;
    enableDragToClose?: boolean;
    sheetTranslateY: {
        value: number;
    };
    currentSnapIndex: {
        value: number;
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
    closeFromGesture: () => void;
    snapToIndex: (index: number) => void;
    gestureThresholds?: GestureThresholds;
    enableContentGesture?: boolean;
}
/**
 * Hook to build and memoize the pan gesture.
 */
export declare const useBottomSheetGesture: ({ renderContent, maxHeight, enableDragToClose, sheetTranslateY, currentSnapIndex, snapPointTranslateYs, closeFromGesture, snapToIndex, gestureThresholds, enableContentGesture, }: UseBottomSheetGestureProps) => {
    handlePanGesture: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
    contentPanGesture: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
};
//# sourceMappingURL=useBottomSheetGesture.d.ts.map