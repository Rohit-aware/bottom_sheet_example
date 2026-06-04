"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStableCallback = void 0;
var _react = require("react");
/**
 * A hook that returns a stable callback reference, avoiding child re-renders
 * while always executing the latest version of the passed callback function.
 */
const useStableCallback = callback => {
  const ref = (0, _react.useRef)(callback);
  ref.current = callback;
  return (0, _react.useCallback)((...args) => {
    return ref.current(...args);
  }, []);
};
exports.useStableCallback = useStableCallback;
//# sourceMappingURL=useStableCallback.js.map