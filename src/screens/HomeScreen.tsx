import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS } from '../constants';
import type { SheetType } from '../types';
import { SectionHeader, ShowcaseCard } from '../components/common';
import {
  NotificationsSheet,
  SettingsSheet,
  TeamSheet,
  CustomHandleSheet,
  RenderPropsSheet,
  ThemedSheet,
  FormSheet,
  DynamicSizingSheet,
  DismissConfigSheet,
} from '../components/sheets';

export const HomeScreen = React.memo(() => {
  const insets = useSafeAreaInsets();
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);
  const notifSheetRef = useRef<BottomSheetRef>(null);

  const openSheet = useCallback((type: SheetType) => {
    setActiveSheet(type);
  }, []);

  const closeSheet = useCallback(() => {
    setActiveSheet(null);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>@rn-lab</Text>
          <Text style={styles.headerTitle}>Bottom Sheet</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>v1.0</Text>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroGlow} />
        <Text style={styles.heroEmoji}>📱</Text>
        <Text style={styles.heroTitle}>Interactive Showcase</Text>
        <Text style={styles.heroSubtitle}>
          Tap any card below to explore the full capabilities of the bottom
          sheet component
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}>
        <SectionHeader
          title="Scrollable Content"
          subtitle="Lists and scrollable items inside sheets"
        />
        <ShowcaseCard
          icon="🔔"
          title="Notifications List"
          subtitle="Scrollable FlatList • Multi-snap points"
          accentColor={COLORS.accent}
          onPress={() => openSheet('notifications')}
          tag="LIST"
        />
        <ShowcaseCard
          icon="⚙️"
          title="Settings Panel"
          subtitle="Scrollable menu • Dynamic sizing"
          accentColor={COLORS.cyan}
          onPress={() => openSheet('settings')}
          tag="SCROLL"
        />
        <ShowcaseCard
          icon="👥"
          title="Team Members"
          subtitle="Card list • Imperative ref controls"
          accentColor={COLORS.amber}
          onPress={() => openSheet('team')}
          tag="REF"
        />

        <SectionHeader
          title="Custom Drag Handle"
          subtitle="Replace the default handle with custom icons"
        />
        <ShowcaseCard
          icon="✋"
          title="Custom Drag Icon"
          subtitle="Chevron + pill-style drag indicators"
          accentColor={COLORS.pink}
          onPress={() => openSheet('custom-handle')}
          tag="HANDLE"
        />

        <SectionHeader
          title="Advanced Patterns"
          subtitle="Render props, theming & more"
        />
        <ShowcaseCard
          icon="🧩"
          title="Render Props"
          subtitle="Function-as-children pattern with controls"
          accentColor={COLORS.accentLight}
          onPress={() => openSheet('render-props')}
          tag="FN"
        />
        <ShowcaseCard
          icon="🎨"
          title="Custom Theme"
          subtitle="Purple gradient theme with custom backdrop"
          accentColor={COLORS.coral}
          onPress={() => openSheet('themed')}
          tag="THEME"
        />

        <SectionHeader
          title="Keyboard Avoiding Test"
          subtitle="Form inputs to test keyboard avoidance"
        />
        <ShowcaseCard
          icon="📝"
          title="Feedback Form"
          subtitle="Form inputs • Auto-adjust offset"
          accentColor={COLORS.accent}
          onPress={() => openSheet('form')}
          tag="KEYBOARD"
        />

        <SectionHeader
          title="Dynamic & Behavior Controls"
          subtitle="Dynamic height & persistence controls"
        />
        <ShowcaseCard
          icon="📐"
          title="Dynamic Sizing"
          subtitle="Auto-height adjustment • Fits content"
          accentColor={COLORS.cyan}
          onPress={() => openSheet('dynamic-sizing')}
          tag="DYNAMIC"
        />
        <ShowcaseCard
          icon="🔒"
          title="Security Gate"
          subtitle="Strict gesture blocking • Code unlock"
          accentColor={COLORS.amber}
          onPress={() => openSheet('dismiss-config')}
          tag="MODAL"
        />
      </ScrollView>

      <NotificationsSheet
        ref={notifSheetRef}
        visible={activeSheet === 'notifications'}
        onClose={closeSheet}
      />
      <SettingsSheet
        visible={activeSheet === 'settings'}
        onClose={closeSheet}
      />
      <TeamSheet
        visible={activeSheet === 'team'}
        onClose={closeSheet}
      />
      <CustomHandleSheet
        visible={activeSheet === 'custom-handle'}
        onClose={closeSheet}
      />
      <RenderPropsSheet
        visible={activeSheet === 'render-props'}
        onClose={closeSheet}
      />
      <ThemedSheet
        visible={activeSheet === 'themed'}
        onClose={closeSheet}
      />
      <FormSheet
        visible={activeSheet === 'form'}
        onClose={closeSheet}
      />
      <DynamicSizingSheet
        visible={activeSheet === 'dynamic-sizing'}
        onClose={closeSheet}
      />
      <DismissConfigSheet
        visible={activeSheet === 'dismiss-config'}
        onClose={closeSheet}
      />
    </View>
  );
});

HomeScreen.displayName = 'HomeScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginTop: 2,
  },
  headerBadge: {
    backgroundColor: COLORS.accentGlow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accent,
  },
  hero: {
    marginHorizontal: 24,
    marginTop: 16,
    padding: 24,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.accent,
    opacity: 0.06,
  },
  heroEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  heroSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 19,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
});
