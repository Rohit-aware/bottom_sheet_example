"use strict";

import { Easing } from 'react-native-reanimated';
import { DEFAULT_ANIMATION_DURATION } from '../constants/defaults';
export const resolveAnimationConfig = config => ({
  duration: config?.duration ?? DEFAULT_ANIMATION_DURATION,
  openEasing: config?.openEasing ?? Easing.out(Easing.cubic),
  closeEasing: config?.closeEasing ?? Easing.out(Easing.cubic),
  snapEasing: config?.snapEasing ?? Easing.inOut(Easing.ease)
});
//# sourceMappingURL=resolveAnimationConfig.js.map