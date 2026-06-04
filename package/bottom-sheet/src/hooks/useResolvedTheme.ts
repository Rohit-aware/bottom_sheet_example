import { useBottomSheetTheme } from '../theme/ThemeContext';
import type { BottomSheetTheme } from '../theme/types';

export const useResolvedTheme = (
  propsTheme?: Partial<BottomSheetTheme>,
): BottomSheetTheme => {
  const contextTheme = useBottomSheetTheme();

  return {
    ...contextTheme,
    ...propsTheme,
    colors: {
      ...contextTheme.colors,
      ...propsTheme?.colors,
    },
    radius: {
      ...contextTheme.radius,
      ...propsTheme?.radius,
    },
    spacing: {
      ...contextTheme.spacing,
      ...propsTheme?.spacing,
    },
    sizing: {
      ...contextTheme.sizing,
      ...propsTheme?.sizing,
    },
  };
};
