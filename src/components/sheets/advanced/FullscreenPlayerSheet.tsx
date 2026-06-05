import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS } from '../../../constants';

export interface FullscreenPlayerSheetProps {
  visible: boolean;
  onClose: () => void;
  isPlaying: boolean;
  isLiked: boolean;
  currentTime: number;
  duration: number;
  progressPercentage: number;
  togglePlayPause: () => void;
  toggleLiked: () => void;
  formatTime: (secs: number) => string;
}

const { width } = Dimensions.get('window');
const ALBUM_ART_SIZE = width - 64;

export const FullscreenPlayerSheet = React.memo(
  ({
    visible,
    onClose,
    isPlaying,
    isLiked,
    currentTime,
    duration,
    progressPercentage,
    togglePlayPause,
    toggleLiked,
    formatTime,
  }: FullscreenPlayerSheetProps) => {

    return (
      <BottomSheet
        visible={visible}
        onClose={onClose}
        snapPoints={['100%']}
        enableDynamicSizing={false}
        initialSnapIndex={0}
        enableDragToClose={true}
        enableBackdropDismiss={true}
        renderHandle={() => null}
        style={{
          container: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundColor: '#070913',
          },
        }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.headerBtn} activeOpacity={0.7}>
              <Text style={styles.headerBtnText}>▼</Text>
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>NOW PLAYING</Text>
            </View>
            <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
              <Text style={styles.headerBtnText}>•••</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.albumArtContainer}>
            <View style={styles.albumArt}>
              <View style={styles.albumArtInner}>
                <View style={styles.vinylCenter} />
                <View style={styles.vinylRing1} />
                <View style={styles.vinylRing2} />
                <View style={styles.vinylGlow} />
                <Text style={styles.albumArtEmoji}>🎶</Text>
              </View>
            </View>
          </View>
          <View style={styles.trackDetailsContainer}>
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle} numberOfLines={1}>
                Music Waves
              </Text>
              <Text style={styles.trackArtist} numberOfLines={1}>
                Arijit Singh
              </Text>
            </View>
            <TouchableOpacity
              onPress={toggleLiked}
              style={styles.heartBtn}
              activeOpacity={0.7}
            >
              <Text style={[styles.heartIcon, isLiked && styles.heartIconActive]}>
                {isLiked ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
              <View style={[styles.progressBarKnob, { left: `${progressPercentage}%` }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlBtn} activeOpacity={0.7}>
              <Text style={styles.controlBtnTextIcon}>🔀</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlBtn} activeOpacity={0.7}>
              <Text style={styles.controlBtnTextIconSecondary}>⏮</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={togglePlayPause}
              style={styles.playPauseBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.playPauseIcon}>
                {isPlaying ? '⏸' : '▶️'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlBtn} activeOpacity={0.7}>
              <Text style={styles.controlBtnTextIconSecondary}>⏭</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlBtn} activeOpacity={0.7}>
              <Text style={styles.controlBtnTextIcon}>🔁</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.footerBtn} activeOpacity={0.7}>
              <Text style={styles.footerIconText}>💻</Text>
              <Text style={styles.footerBtnLabel}>Devices</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerBtn} activeOpacity={0.7}>
              <Text style={styles.footerIconText}>📤</Text>
              <Text style={styles.footerBtnLabel}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerBtn} activeOpacity={0.7}>
              <Text style={styles.footerIconText}>🗒️</Text>
              <Text style={styles.footerBtnLabel}>Lyrics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  }
);

FullscreenPlayerSheet.displayName = 'FullscreenPlayerSheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingBottom: 40,
    backgroundColor: '#070913',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    height: 56,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '800',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  albumArtContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  albumArt: {
    width: ALBUM_ART_SIZE,
    height: ALBUM_ART_SIZE,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceElevated,
    elevation: 8,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  albumArtInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111322',
  },
  vinylCenter: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#070913',
    borderWidth: 8,
    borderColor: COLORS.accent,
    zIndex: 2,
  },
  vinylRing1: {
    position: 'absolute',
    width: ALBUM_ART_SIZE - 60,
    height: ALBUM_ART_SIZE - 60,
    borderRadius: (ALBUM_ART_SIZE - 60) / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  vinylRing2: {
    position: 'absolute',
    width: ALBUM_ART_SIZE - 120,
    height: ALBUM_ART_SIZE - 120,
    borderRadius: (ALBUM_ART_SIZE - 120) / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  vinylGlow: {
    position: 'absolute',
    width: ALBUM_ART_SIZE * 0.7,
    height: ALBUM_ART_SIZE * 0.7,
    borderRadius: (ALBUM_ART_SIZE * 0.7) / 2,
    backgroundColor: COLORS.pink,
    opacity: 0.05,
    filter: 'blur(30px)',
  },
  albumArtEmoji: {
    fontSize: 48,
    zIndex: 1,
    opacity: 0.85,
  },
  trackDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  trackInfo: {
    flex: 1,
    marginRight: 16,
  },
  trackTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  trackArtist: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
  },
  heartBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 22,
  },
  heartIconActive: {
    transform: [{ scale: 1.1 }],
  },
  progressSection: {
    marginTop: 20,
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  progressBarFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.pink,
    position: 'absolute',
    left: 0,
  },
  progressBarKnob: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.textPrimary,
    position: 'absolute',
    marginLeft: -6,
    elevation: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  controlBtn: {
    padding: 10,
  },
  controlBtnTextIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  controlBtnTextIconSecondary: {
    fontSize: 26,
    color: COLORS.textPrimary,
  },
  playPauseBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.pink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  playPauseIcon: {
    fontSize: 26,
    color: '#070913',
    marginLeft: 2, // Slight adjustment for play icon centering
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.04)',
  },
  footerBtn: {
    alignItems: 'center',
    flex: 1,
  },
  footerIconText: {
    fontSize: 18,
    opacity: 0.7,
  },
  footerBtnLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
