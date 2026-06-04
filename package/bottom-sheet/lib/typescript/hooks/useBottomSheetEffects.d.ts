export interface UseBottomSheetEffectsProps {
    visible: boolean;
    enableDynamicSizing: boolean;
    isOpen: {
        value: boolean;
    };
    isOpening: {
        value: boolean;
    };
    maxHeight: number;
    open: (shouldShowContent?: boolean, initialSnapIndex?: number) => void;
    sheetTranslateY: {
        value: number;
    };
    currentSnapIndex: {
        value: number;
    };
    keyboardOffset: {
        value: number;
    };
    contentHeight: {
        value: number | undefined;
    };
    setRenderContent: (render: boolean) => void;
    lazy: boolean;
    initialSnapIndex: number;
}
export declare const useBottomSheetEffects: ({ visible, enableDynamicSizing, isOpen, isOpening, maxHeight, open, sheetTranslateY, currentSnapIndex, keyboardOffset, contentHeight, setRenderContent, lazy, initialSnapIndex, }: UseBottomSheetEffectsProps) => void;
//# sourceMappingURL=useBottomSheetEffects.d.ts.map