"use strict";

import { Easing } from 'react-native-reanimated';
import { DEFAULT_ANIMATION_DURATION } from '../constants/defaults';

/**
 * Calculates the opacity of the backdrop/overlay based on the sheet's current position.
 * Runs as a worklet.
 */
export const calculateOverlayOpacity = (sheetTranslateY, maxHeight, baseHeight) => {
  'worklet';

  const visibleHeight = Math.max(0, maxHeight - sheetTranslateY);
  const threshold = Math.max(1, Math.min(baseHeight, maxHeight));
  return Math.min(1, visibleHeight / threshold);
};

/**
 * Generates Reanimated timing animation configs.
 * Runs as a worklet.
 */
export const getTimingConfig = (duration = DEFAULT_ANIMATION_DURATION, easing = Easing.out(Easing.cubic)) => {
  'worklet';

  return {
    duration,
    easing
  };
};
//# sourceMappingURL=animationMath.js.map