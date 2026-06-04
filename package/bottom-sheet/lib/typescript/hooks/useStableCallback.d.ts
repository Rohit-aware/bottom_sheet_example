export type StableCallback<A extends unknown[], R> = (...args: A) => R;
/**
 * A hook that returns a stable callback reference, avoiding child re-renders
 * while always executing the latest version of the passed callback function.
 */
export declare const useStableCallback: <A extends unknown[], R>(callback: StableCallback<A, R>) => StableCallback<A, R>;
//# sourceMappingURL=useStableCallback.d.ts.map