"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomSheetContent = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _BottomSheetContext = require("../context/BottomSheetContext");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Component that lazily renders sheet content and handles dynamic sizing measurements.
 */
const BottomSheetContent = exports.BottomSheetContent = /*#__PURE__*/_react.default.memo(({
  renderContent,
  enableDynamicSizing,
  bottomInset,
  handleDynamicContentLayout,
  contextValue,
  renderProps,
  children,
  style: styleOverrides
}) => {
  if (!renderContent) {
    return null;
  }
  const resolvedChildren = typeof children === 'function' ? children(renderProps) : children;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [styles.contentContainer, styleOverrides?.contentContainer],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BottomSheetContext.BottomSheetProvider, {
      value: contextValue,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
        entering: _reactNativeReanimated.FadeIn.duration(250),
        style: styles.sheetContentContainer,
        children: enableDynamicSizing ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          onLayout: handleDynamicContentLayout,
          style: {
            paddingBottom: bottomInset
          },
          children: resolvedChildren
        }) : resolvedChildren
      })
    })
  });
});
BottomSheetContent.displayName = 'BottomSheetContent';
const styles = _reactNative.StyleSheet.create({
  contentContainer: {
    flex: 1
  },
  sheetContentContainer: {
    flex: 1
  }
});
//# sourceMappingURL=BottomSheetContent.js.map