import React from 'react';
import type {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, RADIUS} from '../../constants';

export interface InfoCardProps {
  emoji: string;
  title: string;
  children: ReactNode;
}

export const InfoCard = React.memo(
  ({emoji, title, children}: InfoCardProps) => {
    return (
      <View style={styles.card}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{children}</Text>
      </View>
    );
  },
);

InfoCard.displayName = 'InfoCard';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.accentGlow,
    borderRadius: RADIUS.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
