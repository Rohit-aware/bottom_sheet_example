import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS, RADIUS} from '../../constants';
import type {ButtonVariant} from '../../types';

export interface ActionButtonProps {
  title: string;
  icon?: string;
  color?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const ActionButton = React.memo(
  ({
    title,
    icon,
    color = COLORS.accent,
    onPress,
    variant = 'filled',
    disabled = false,
  }: ActionButtonProps) => {
    const isFilled = variant === 'filled';
    const isOutline = variant === 'outline';

    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        style={({pressed}) => [
          styles.btn,
          isFilled && {backgroundColor: color},
          isOutline && {
            borderWidth: 1,
            borderColor: color + '40',
            backgroundColor: color + '10',
          },
          !isFilled && !isOutline && {backgroundColor: color + '12'},
          pressed && {opacity: 0.8, transform: [{scale: 0.97}]},
          disabled && {opacity: 0.4},
        ]}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text
          style={[
            styles.label,
            {color: isFilled ? '#fff' : color},
          ]}>
          {title}
        </Text>
      </Pressable>
    );
  },
);

ActionButton.displayName = 'ActionButton';

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
    gap: 8,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
