import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants';
import type {NotificationData} from '../../types';

export interface NotificationItemProps {
  item: NotificationData;
}

export const NotificationItem = React.memo(
  ({item}: NotificationItemProps) => {
    return (
      <View style={styles.item}>
        <View
          style={[styles.iconBg, {backgroundColor: item.color + '18'}]}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    );
  },
);

NotificationItem.displayName = 'NotificationItem';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  time: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
});
