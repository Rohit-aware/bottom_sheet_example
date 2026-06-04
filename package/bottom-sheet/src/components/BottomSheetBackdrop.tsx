import React, { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useBottomSheetTheme } from '../theme/ThemeContext';
import type { BottomSheetTheme } from '../theme/types';
import type { BottomSheetStyleOverrides } from '../types/props';

export interface BottomSheetBackdropProps {
  onPress: () => void;
  animatedStyle: any;
  renderBackdrop?: (props: { onPress: () => void; animatedStyle: any }) => ReactNode;
  theme?: Partial<BottomSheetTheme>;
  style?: BottomSheetStyleOverrides;
}

/**
 * Backdrop overlay component that fades in and handles dismissing on click.
 */
export const BottomSheetBackdrop = React.memo(
  ({
    onPress,
    animatedStyle,
    renderBackdrop,
    theme: themeOverride,
    style: styleOverrides,
  }: BottomSheetBackdropProps) => {
    const contextTheme = useBottomSheetTheme();

    if (renderBackdrop) {
      return <>{renderBackdrop({ onPress, animatedStyle })}</>;
    }

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

    return (
      <>
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            styles.backdrop,
            { backgroundColor: resolvedTheme.colors.backdrop },
            styleOverrides?.backdrop,
            animatedStyle,
          ]}
        />
        <Pressable
          onPress={onPress}
          style={[StyleSheet.absoluteFill, styleOverrides?.overlay]}
        />
      </>
    );
  },
);

BottomSheetBackdrop.displayName = 'BottomSheetBackdrop';

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
