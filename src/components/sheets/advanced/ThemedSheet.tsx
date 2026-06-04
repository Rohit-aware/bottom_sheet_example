import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS } from '../../../constants';
import { ActionButton } from '../../common';
import { PillDragHandle } from '../../handles/PillDragHandle';
import { getContrastText } from './advancedUtils';

export interface ThemedSheetProps {
  visible: boolean;
  onClose: () => void;
}

interface ThemeSwatch {
  color: string;
  label: string;
  value: string;
}

const THEME_SWATCHES: ThemeSwatch[] = [
  { color: '#1A0A2E', label: 'Background', value: '#1A0A2E' },
  { color: COLORS.pink, label: 'Handle Color', value: COLORS.pink },
  {
    color: 'rgba(26,10,46,0.85)',
    label: 'Backdrop',
    value: 'rgba(26,10,46,0.85)',
  },
];

const PURPLE_THEME = {
  colors: {
    background: '#1A0A2E',
    backdrop: 'rgba(26, 10, 46, 0.85)',
    handle: COLORS.pink,
  },
  radius: {
    container: 32,
    handle: 10,
  },
} as const;

export const ThemedSheet = React.memo(
  ({ visible, onClose }: ThemedSheetProps) => {
    return (
      <BottomSheet
        visible={visible}
        onClose={onClose}
        snapPoints={[320, '65%']}
        initialSnapIndex={0}
        renderHandle={() => <PillDragHandle />}
        theme={PURPLE_THEME}>
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={styles.headerEmoji}>🎨</Text>
            <Text style={styles.headerTitle}>Purple Galaxy Theme</Text>
            <Text style={styles.headerSubtitle}>
              Custom colors, radius, and pill-style drag handle
            </Text>
          </View>

          <View style={styles.swatchList}>
            {THEME_SWATCHES.map(swatch => {
              const contrastText = getContrastText(swatch.color);
              return (
                <View key={swatch.label} style={styles.swatchRow}>
                  <View
                    style={[
                      styles.swatch,
                      { backgroundColor: swatch.color },
                    ]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.swatchLabel}>{swatch.label}</Text>
                    <Text style={styles.swatchValue}>{swatch.value}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: swatch.color === 'rgba(26,10,46,0.85)' ? '#2E1065' : swatch.color }]}>
                    <Text style={[styles.badgeText, { color: contrastText }]}>Contrast OK</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.actionSection}>
            <ActionButton
              title="Looks Amazing! ✨"
              color={COLORS.pink}
              variant="filled"
              onPress={onClose}
            />
          </View>
        </View>
      </BottomSheet>
    );
  },
);

ThemedSheet.displayName = 'ThemedSheet';

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#F0E6FF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#A78BFA',
    marginTop: 4,
    textAlign: 'center',
  },
  swatchList: {
    gap: 12,
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: RADIUS.md,
    padding: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  swatchLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E0D6FF',
  },
  swatchValue: {
    fontSize: 11,
    fontWeight: '500',
    color: '#8B7AAF',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  actionSection: {
    marginTop: 24,
    gap: 10,
  },
});
