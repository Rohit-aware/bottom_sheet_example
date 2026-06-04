import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useBottomSheetTheme } from '../theme/ThemeContext';
import type { BottomSheetTheme } from '../theme/types';
import type { BottomSheetStyleOverrides } from '../types/props';

export interface BottomSheetHandleProps {
  theme?: Partial<BottomSheetTheme>;
  style?: BottomSheetStyleOverrides;
}

/**
 * Drag handle component displayed at the top of the bottom sheet.
 */
export const BottomSheetHandle = React.memo(
  ({ theme: themeOverride, style: styleOverrides }: BottomSheetHandleProps) => {
    const contextTheme = useBottomSheetTheme();

    // Resolve theme (override -> context -> default)
    const resolvedTheme: BottomSheetTheme = {
      ...contextTheme,
      ...themeOverride,
      colors: {
        ...contextTheme.colors,
        ...themeOverride?.colors,
      },
      radius: {
        ...contextTheme.radius,
        ...themeOverride?.radius,
      },
      spacing: {
        ...contextTheme.spacing,
        ...themeOverride?.spacing,
      },
      sizing: {
        ...contextTheme.sizing,
        ...themeOverride?.sizing,
      },
    };

    const { colors, radius, spacing, sizing } = resolvedTheme;

    return (
      <View
        style={[
          styles.handle,
          {
            backgroundColor: colors.handle,
            borderRadius: radius.handle,
            height: sizing.handleHeight,
            width: sizing.handleWidth,
            marginVertical: spacing.handleMarginVertical,
          },
          styleOverrides?.handle,
        ]}
      />
    );
  },
);

BottomSheetHandle.displayName = 'BottomSheetHandle';

const styles = StyleSheet.create({
  handle: {
    alignSelf: 'center',
  },
});
