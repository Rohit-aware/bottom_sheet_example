"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBottomSheetTheme = exports.BottomSheetThemeProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _defaultTheme = require("./defaultTheme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ThemeContext = /*#__PURE__*/(0, _react.createContext)(_defaultTheme.defaultTheme);
/**
 * Theme provider that supplies style tokens to nested bottom sheets.
 */
const BottomSheetThemeProvider = ({
  theme,
  children
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ThemeContext.Provider, {
    value: theme,
    children: children
  });
};

/**
 * Hook to retrieve the current BottomSheetTheme tokens from context.
 */
exports.BottomSheetThemeProvider = BottomSheetThemeProvider;
const useBottomSheetTheme = () => {
  return (0, _react.useContext)(ThemeContext);
};
exports.useBottomSheetTheme = useBottomSheetTheme;
//# sourceMappingURL=ThemeContext.js.map