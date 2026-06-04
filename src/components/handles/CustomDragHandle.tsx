import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants';

export const CustomDragHandle = React.memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <View style={styles.chevron} />
        <View style={styles.chevronSmall} />
      </View>
      <Text style={styles.label}>Drag to resize</Text>
    </View>
  );
});

CustomDragHandle.displayName = 'CustomDragHandle';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
  chevron: {
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
  },
  chevronSmall: {
    width: 12,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.accentLight,
    opacity: 0.6,
  },
  label: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
