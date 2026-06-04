"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveSnapPoint = exports.getBottomSheetTopSnapIndex = exports.getBottomSheetSnapPoints = exports.getBottomSheetSnapPointTranslateY = void 0;
var _defaults = require("../constants/defaults");
/**
 * Resolves a single snap point (number or percentage) to its pixel height.
 * Runs as a worklet.
 */
const resolveSnapPoint = (snapPoint, maxHeight) => {
  'worklet';

  if (typeof snapPoint === 'number') {
    return Math.min(snapPoint, maxHeight);
  }
  const percent = parseFloat(snapPoint) / 100;
  if (isNaN(percent)) {
    return maxHeight;
  }
  return Math.min(maxHeight * percent, maxHeight);
};

/**
 * Resolves all snap points to pixel heights, applying dynamic sizing if enabled.
 * Runs as a worklet.
 */
exports.resolveSnapPoint = resolveSnapPoint;
const getBottomSheetSnapPoints = ({
  snapPoints,
  maxHeight,
  contentHeight,
  enableDynamicSizing
}) => {
  'worklet';

  if (!snapPoints || snapPoints.length === 0) {
    return [maxHeight];
  }

  // 1. Resolve all user snap points to pixel heights.
  const resolved = snapPoints.map(sp => resolveSnapPoint(sp, maxHeight));

  // 2. If dynamic sizing is enabled and content has been measured, adjust the base (first) snap point.
  if (enableDynamicSizing && contentHeight !== undefined && resolved.length > 0) {
    const measuredHeight = Math.max(0, contentHeight) + _defaults.BOTTOM_SHEET_HANDLE_TOTAL_HEIGHT;
    resolved[0] = Math.min(measuredHeight, resolved[0]);
  }

  // Ensure they are sorted in ascending order (smallest height first) and filter out duplicates
  const sorted = resolved.sort((a, b) => a - b);
  const unique = [];
  for (let i = 0; i < sorted.length; i++) {
    if (unique.length === 0 || Math.abs(sorted[i] - unique[unique.length - 1]) > 0.1) {
      unique.push(sorted[i]);
    }
  }
  return unique.length > 0 ? unique : [maxHeight];
};

/**
 * Calculates the translateY value for a given snap index.
 * Runs as a worklet.
 */
exports.getBottomSheetSnapPoints = getBottomSheetSnapPoints;
const getBottomSheetSnapPointTranslateY = ({
  snapPoints,
  maxHeight,
  snapIndex
}) => {
  'worklet';

  if (!snapPoints || snapPoints.length === 0) {
    return maxHeight;
  }
  const index = Math.min(Math.max(0, snapIndex), snapPoints.length - 1);
  const snapHeight = snapPoints[index];
  return maxHeight - snapHeight;
};

/**
 * Returns the highest snap index.
 * Runs as a worklet.
 */
exports.getBottomSheetSnapPointTranslateY = getBottomSheetSnapPointTranslateY;
const getBottomSheetTopSnapIndex = snapPoints => {
  'worklet';

  return Math.max(0, snapPoints.length - 1);
};
exports.getBottomSheetTopSnapIndex = getBottomSheetTopSnapIndex;
//# sourceMappingURL=snapPointMath.js.map