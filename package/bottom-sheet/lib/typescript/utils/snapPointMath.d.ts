import type { SnapPoint } from '../types/props';
/**
 * Resolves a single snap point (number or percentage) to its pixel height.
 * Runs as a worklet.
 */
export declare const resolveSnapPoint: (snapPoint: SnapPoint, maxHeight: number) => number;
/**
 * Resolves all snap points to pixel heights, applying dynamic sizing if enabled.
 * Runs as a worklet.
 */
export declare const getBottomSheetSnapPoints: ({ snapPoints, maxHeight, contentHeight, enableDynamicSizing, }: {
    snapPoints: SnapPoint[];
    maxHeight: number;
    contentHeight: number | undefined;
    enableDynamicSizing: boolean;
}) => number[];
/**
 * Calculates the translateY value for a given snap index.
 * Runs as a worklet.
 */
export declare const getBottomSheetSnapPointTranslateY: ({ snapPoints, maxHeight, snapIndex, }: {
    snapPoints: number[];
    maxHeight: number;
    snapIndex: number;
}) => number;
/**
 * Returns the highest snap index.
 * Runs as a worklet.
 */
export declare const getBottomSheetTopSnapIndex: (snapPoints: number[]) => number;
//# sourceMappingURL=snapPointMath.d.ts.map