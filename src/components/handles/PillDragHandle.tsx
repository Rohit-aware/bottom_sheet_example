import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, RADIUS} from '../../constants';

export const PillDragHandle = React.memo(() => {
  return (
    <View style={styles.outer}>
      <View style={styles.pill}>
        <Text style={styles.icon}>⬇️</Text>
        <Text style={styles.text}>Swipe down to close</Text>
      </View>
    </View>
  );
});

PillDragHandle.displayName = 'PillDragHandle';

const styles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.accentGlow,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
  },
  icon: {
    fontSize: 12,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
});
