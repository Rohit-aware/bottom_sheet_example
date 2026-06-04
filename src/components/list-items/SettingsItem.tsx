import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, RADIUS} from '../../constants';
import type {SettingsItemData} from '../../types';

export interface SettingsItemProps {
  item: SettingsItemData;
}

export const SettingsItem = React.memo(({item}: SettingsItemProps) => {
  return (
    <Pressable style={styles.item}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.label}>{item.label}</Text>
      {item.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
});

SettingsItem.displayName = 'SettingsItem';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  icon: {
    fontSize: 20,
    marginRight: 14,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  badge: {
    backgroundColor: COLORS.coral,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
  },
  arrow: {
    fontSize: 20,
    color: COLORS.textMuted,
    fontWeight: '300',
  },
});
