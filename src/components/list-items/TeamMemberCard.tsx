import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, RADIUS} from '../../constants';
import type {TeamMemberData} from '../../types';

export interface TeamMemberCardProps {
  member: TeamMemberData;
}

const STATUS_COLORS: Record<TeamMemberData['status'], string> = {
  online: COLORS.success,
  away: COLORS.warning,
  offline: COLORS.textMuted,
};

export const TeamMemberCard = React.memo(
  ({member}: TeamMemberCardProps) => {
    const statusColor = STATUS_COLORS[member.status];

    return (
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{member.avatar}</Text>
          <View
            style={[styles.statusDot, {backgroundColor: statusColor}]}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.role}>{member.role}</Text>
        </View>
        <View
          style={[
            styles.statusPill,
            {backgroundColor: statusColor + '18'},
          ]}>
          <Text style={[styles.statusText, {color: statusColor}]}>
            {member.status}
          </Text>
        </View>
      </View>
    );
  },
);

TeamMemberCard.displayName = 'TeamMemberCard';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    fontSize: 28,
    width: 44,
    height: 44,
    lineHeight: 44,
    textAlign: 'center',
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 22,
    overflow: 'hidden',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  role: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
