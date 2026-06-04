import { WithTimingConfig } from 'react-native-reanimated';
/**
 * Calculates the opacity of the backdrop/overlay based on the sheet's current position.
 * Runs as a worklet.
 */
export declare const calculateOverlayOpacity: (sheetTranslateY: number, maxHeight: number, baseHeight: number) => number;
/**
 * Generates Reanimated timing animation configs.
 * Runs as a worklet.
 */
export declare const getTimingConfig: (duration?: number, easing?: (value: number) => number) => WithTimingConfig;
//# sourceMappingURL=animationMath.d.ts.map