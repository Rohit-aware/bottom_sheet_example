import type { BottomSheetAnimationConfig } from '../types/props';
export interface ResolvedAnimationConfig {
    duration: number;
    openEasing: (value: number) => number;
    closeEasing: (value: number) => number;
    snapEasing: (value: number) => number;
}
export declare const resolveAnimationConfig: (config?: BottomSheetAnimationConfig) => ResolvedAnimationConfig;
//# sourceMappingURL=resolveAnimationConfig.d.ts.map