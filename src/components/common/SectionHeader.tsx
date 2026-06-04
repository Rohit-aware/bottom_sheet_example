import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, SPACING} from '../../constants';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = React.memo(
  ({title, subtitle}: SectionHeaderProps) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    );
  },
);

SectionHeader.displayName = 'SectionHeader';

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.xl,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
