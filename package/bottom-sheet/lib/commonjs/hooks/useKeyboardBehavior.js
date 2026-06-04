"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyboardBehavior = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _useStableCallback = require("./useStableCallback");
/**
 * Custom hook to track and animate the keyboard offset height.
 * Currently active on iOS only, mirroring original SDK behavior.
 */
const useKeyboardBehavior = visible => {
  const keyboardOffset = (0, _reactNativeReanimated.useSharedValue)(0);
  const animateKeyboardOffset = (0, _useStableCallback.useStableCallback)(offset => {
    keyboardOffset.value = (0, _reactNativeReanimated.withTiming)(offset, {
      duration: 250,
      easing: _reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.ease)
    });
  });
  const keyboardDidShow = (0, _useStableCallback.useStableCallback)(event => {
    animateKeyboardOffset(event.endCoordinates.height);
  });
  const keyboardDidHide = (0, _useStableCallback.useStableCallback)(() => {
    animateKeyboardOffset(0);
  });
  (0, _react.useEffect)(() => {
    if (!visible) {
      keyboardOffset.value = 0;
      return;
    }
    const listeners = [];
    const showEvent = _reactNative.Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = _reactNative.Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    listeners.push(_reactNative.Keyboard.addListener(showEvent, keyboardDidShow), _reactNative.Keyboard.addListener(hideEvent, keyboardDidHide));
    return () => {
      listeners.forEach(l => l.remove());
    };
  }, [visible, keyboardDidShow, keyboardDidHide, keyboardOffset]);
  return keyboardOffset;
};
exports.useKeyboardBehavior = useKeyboardBehavior;
//# sourceMappingURL=useKeyboardBehavior.js.map