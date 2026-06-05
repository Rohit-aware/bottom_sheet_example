import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS } from '../../../constants';

export interface MiniPlayerProps {
  isPlaying: boolean;
  isLiked: boolean;
  progressPercentage: number;
  trackTitle: string;
  trackArtist: string;
  onPress: () => void;
  onPlayPausePress: () => void;
  onLikePress: () => void;
  onDismiss: () => void;
}

export const MiniPlayer = React.memo(
  ({
    isPlaying,
    isLiked,
    progressPercentage,
    trackTitle,
    trackArtist,
    onPress,
    onPlayPausePress,
    onLikePress,
    onDismiss,
  }: MiniPlayerProps) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>

        <View style={styles.content}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>🎧</Text>
          </View>

          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle} numberOfLines={1}>
              {trackTitle}
            </Text>
            <Text style={styles.trackArtist} numberOfLines={1}>
              {trackArtist}
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onLikePress}
              style={styles.actionBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.actionEmoji}>{isLiked ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPlayPausePress}
              style={[styles.actionBtn, styles.playPauseBtn]}
              activeOpacity={0.7}
            >
              <Text style={styles.playPauseEmoji}>{isPlaying ? '⏸' : '▶️'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDismiss}
              style={styles.actionBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.dismissEmoji}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

MiniPlayer.displayName = 'MiniPlayer';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    height: 64,
    backgroundColor: '#111625',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    zIndex: 99,
  },
  progressBarBg: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
  },
  progressBarFill: {
    height: 2,
    backgroundColor: COLORS.pink,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: '#1E2335',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  thumbnailEmoji: {
    fontSize: 18,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  trackTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  trackArtist: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionEmoji: {
    fontSize: 16,
  },
  playPauseBtn: {
    backgroundColor: COLORS.textPrimary,
    borderRadius: 18,
    width: 32,
    height: 32,
  },
  playPauseEmoji: {
    fontSize: 13,
    color: '#111625',
  },
  dismissEmoji: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '800',
  },
});
