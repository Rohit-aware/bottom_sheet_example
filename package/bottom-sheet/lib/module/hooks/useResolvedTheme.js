"use strict";

import { useBottomSheetTheme } from '../theme/ThemeContext';
export const useResolvedTheme = propsTheme => {
  const contextTheme = useBottomSheetTheme();
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
//# sourceMappingURL=useResolvedTheme.js.map