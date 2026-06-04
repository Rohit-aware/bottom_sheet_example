"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_IOS = exports.IS_ANDROID = void 0;
var _reactNative = require("react-native");
const IS_ANDROID = exports.IS_ANDROID = _reactNative.Platform.OS === 'android';
const IS_IOS = exports.IS_IOS = _reactNative.Platform.OS === 'ios';
//# sourceMappingURL=platform.js.map