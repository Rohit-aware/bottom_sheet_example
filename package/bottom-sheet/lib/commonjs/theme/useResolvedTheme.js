"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResolvedTheme = void 0;
var _ThemeContext = require("./ThemeContext");
const useResolvedTheme = propsTheme => {
  const contextTheme = (0, _ThemeContext.useBottomSheetTheme)();
  return {
    ...contextTheme,
    ...propsTheme,
    colors: {
      ...contextTheme.colors,
      ...propsTheme?.colors
    },
    radius: {
      ...contextTheme.radius,
      ...propsTheme?.radius
    },
    spacing: {
      ...contextTheme.spacing,
      ...propsTheme?.spacing
    },
    sizing: {
      ...contextTheme.sizing,
      ...propsTheme?.sizing
    }
  };
};
exports.useResolvedTheme = useResolvedTheme;
//# sourceMappingURL=useResolvedTheme.js.map