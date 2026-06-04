import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, RADIUS, SPACING} from '../../constants';

export interface ShowcaseCardProps {
  icon: string;
  title: string;
  subtitle: string;
  accentColor: string;
  onPress: () => void;
  tag?: string;
}

export const ShowcaseCard = React.memo(
  ({icon, title, subtitle, accentColor, onPress, tag}: ShowcaseCardProps) => {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: accentColor + '18'},
          ]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            {tag && (
              <View
                style={[styles.tag, {backgroundColor: accentColor + '20'}]}>
                <Text style={[styles.tagText, {color: accentColor}]}>
                  {tag}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.arrow}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      </Pressable>
    );
  },
);

ShowcaseCard.displayName = 'ShowcaseCard';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: {
    backgroundColor: COLORS.cardHover,
    transform: [{scale: 0.98}],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  icon: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 3,
    letterSpacing: 0.1,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  arrow: {
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 22,
    color: COLORS.textMuted,
    fontWeight: '300',
  },
});
