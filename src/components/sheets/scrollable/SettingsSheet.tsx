import React from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS, SPACING } from '../../../constants';
import { SETTINGS_ITEMS } from '../../../data';
import { ActionButton, SheetHeader } from '../../common';
import { SettingsItem } from '../../list-items';
import { useScrollableSheet } from './useScrollableSheet';

export interface SettingsSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const SettingsSheet = React.memo(
  ({ visible, onClose }: SettingsSheetProps) => {
    const { searchQuery, filteredItems, handleSearch, reset } =
      useScrollableSheet({
        initialItems: SETTINGS_ITEMS,
        filterKey: 'label',
      });

    React.useEffect(() => {
      if (!visible) {
        reset();
      }
    }, [visible, reset]);

    return (
      <BottomSheet
        visible={visible}
        onClose={onClose}
        snapPoints={['55%', '85%']}
        enableDynamicSizing={false}
        initialSnapIndex={0}>
        <SheetHeader
          title="Settings"
          subtitle="Manage your preferences"
          icon="⚙️"
        />

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search settings..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredItems.map((item, index) => (
            <SettingsItem key={index} item={item} />
          ))}
          <View style={{ padding: 20 }}>
            <ActionButton
              title="Sign Out"
              icon="👋"
              color={COLORS.coral}
              variant="outline"
            />
          </View>
        </ScrollView>
      </BottomSheet>
    );
  },
);

SettingsSheet.displayName = 'SettingsSheet';

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: COLORS.surfaceElevated,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
