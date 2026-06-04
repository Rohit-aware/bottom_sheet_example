export interface UseBottomSheetAnimationProps {
    maxHeight: number;
    resolvedSnapPoints: {
        value: number[];
    };
    keyboardOffset: {
        value: number;
    };
}
/**
 * Hook managing the sheet's active Y translation value and returning the animated styles.
 */
export declare const useBottomSheetAnimation: ({ maxHeight, resolvedSnapPoints, keyboardOffset, }: UseBottomSheetAnimationProps) => {
    sheetTranslateY: import("react-native-reanimated").SharedValue<number>;
    sheetViewportAnimatedStyle: import("react-native-reanimated/lib/typescript/hook/commonTypes").AnimatedStyleHandle<{
        transform: {
            translateY: number;
        }[];
    }>;
    overlayAnimatedStyle: import("react-native-reanimated/lib/typescript/hook/commonTypes").AnimatedStyleHandle<{
        opacity: number;
    }>;
};
export type UseBottomSheetAnimationResult = ReturnType<typeof useBottomSheetAnimation>;
//# sourceMappingURL=useBottomSheetAnimation.d.ts.map