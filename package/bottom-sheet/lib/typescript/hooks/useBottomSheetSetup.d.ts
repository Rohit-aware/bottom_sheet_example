import type { BottomSheetProps } from '../types/props';
export declare const useBottomSheetSetup: (props: BottomSheetProps) => {
    resolvedTheme: import("..").BottomSheetTheme;
    layout: {
        maxHeight: number;
        bottomInset: number;
        contentHeight: import("react-native-reanimated").SharedValue<number | undefined>;
        resolvedSnapPoints: import("react-native-reanimated").DerivedValue<number[]>;
        snapPointTranslateYs: import("react-native-reanimated").DerivedValue<number[]>;
        topSnapIndex: import("react-native-reanimated").DerivedValue<number>;
        handleDynamicContentLayout: import("./useStableCallback").StableCallback<[event: import("react-native").LayoutChangeEvent], void>;
    };
    animation: {
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
    controller: {
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
    handlePanGesture: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
    contentPanGesture: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
    modalVisible: boolean;
};
export type UseBottomSheetSetupResult = ReturnType<typeof useBottomSheetSetup>;
//# sourceMappingURL=useBottomSheetSetup.d.ts.map