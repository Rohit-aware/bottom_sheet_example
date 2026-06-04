"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveAnimationConfig = void 0;
var _reactNativeReanimated = require("react-native-reanimated");
var _defaults = require("../constants/defaults");
const resolveAnimationConfig = config => ({
  duration: config?.duration ?? _defaults.DEFAULT_ANIMATION_DURATION,
  openEasing: config?.openEasing ?? _reactNativeReanimated.Easing.out(_reactNativeReanimated.Easing.cubic),
  closeEasing: config?.closeEasing ?? _reactNativeReanimated.Easing.out(_reactNativeReanimated.Easing.cubic),
  snapEasing: config?.snapEasing ?? _reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.ease)
});
exports.resolveAnimationConfig = resolveAnimationConfig;
//# sourceMappingURL=resolveAnimationConfig.js.map