"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimingConfig = exports.calculateOverlayOpacity = void 0;
var _reactNativeReanimated = require("react-native-reanimated");
var _defaults = require("../constants/defaults");
/**
 * Calculates the opacity of the backdrop/overlay based on the sheet's current position.
 * Runs as a worklet.
 */
const calculateOverlayOpacity = (sheetTranslateY, maxHeight, baseHeight) => {
  'worklet';

  const visibleHeight = Math.max(0, maxHeight - sheetTranslateY);
  const threshold = Math.max(1, Math.min(baseHeight, maxHeight));
  return Math.min(1, visibleHeight / threshold);
};

/**
 * Generates Reanimated timing animation configs.
 * Runs as a worklet.
 */
exports.calculateOverlayOpacity = calculateOverlayOpacity;
const getTimingConfig = (duration = _defaults.DEFAULT_ANIMATION_DURATION, easing = _reactNativeReanimated.Easing.out(_reactNativeReanimated.Easing.cubic)) => {
  'worklet';

  return {
    duration,
    easing
  };
};
exports.getTimingConfig = getTimingConfig;
//# sourceMappingURL=animationMath.js.map