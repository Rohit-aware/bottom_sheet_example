export type GestureDecisionResult = {
    action: 'close';
} | {
    action: 'snap';
    index: number;
};
export type GestureDecisionInput = {
    velocityY: number;
    translationY: number;
    currentTranslateY: number;
    snapPointTranslateYs: number[];
    currentSnapIndex: number;
    maxHeight: number;
};
export type GestureThresholds = {
    closeVelocity: number;
    closeFromTopVelocity: number;
    snapUpVelocity: number;
    snapDownVelocity: number;
    velocityProjectionFactor: number;
    topSnapCloseRatio: number;
    lowerSnapCloseRatio: number;
};
/**
 * Pure function that decides what action to take (close or snap to a index) when a drag gesture ends.
 * Can run as a worklet on the UI thread.
 */
export declare const resolveGestureEnd: (input: GestureDecisionInput, thresholds?: GestureThresholds) => GestureDecisionResult;
//# sourceMappingURL=gestureDecision.d.ts.map