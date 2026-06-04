import React, { forwardRef, useRef } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import type { BottomSheetRef } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS, SPACING } from '../../../constants';
import { TEAM_MEMBERS } from '../../../data';
import { ActionButton, SheetHeader } from '../../common';
import { TeamMemberCard } from '../../list-items';
import { useScrollableSheet } from './useScrollableSheet';

export interface TeamSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const TeamSheet = forwardRef<BottomSheetRef, TeamSheetProps>(
  ({ visible, onClose }, ref) => {
    const internalRef = useRef<BottomSheetRef>(null);
    const sheetRef = (ref as React.RefObject<BottomSheetRef>) ?? internalRef;

    const { searchQuery, filteredItems, handleSearch, reset } =
      useScrollableSheet({
        initialItems: TEAM_MEMBERS,
        filterKey: 'name',
      });

    React.useEffect(() => {
      if (!visible) {
        reset();
      }
    }, [visible, reset]);

    return (
      <BottomSheet
        ref={sheetRef}
        visible={visible}
        onClose={onClose}
        snapPoints={[320, '60%', '90%']}
        initialSnapIndex={0}>
        <SheetHeader
          title="Team"
          subtitle={`${filteredItems.length} members`}
          icon="👥"
        />

        <View style={styles.controlBar}>
          <ActionButton
            title="Collapse"
            icon="⬇️"
            color={COLORS.textSecondary}
            variant="ghost"
            onPress={() => sheetRef.current?.collapse()}
          />
          <ActionButton
            title="Half"
            icon="↕️"
            color={COLORS.accent}
            variant="outline"
            onPress={() => sheetRef.current?.snapToIndex(1)}
          />
          <ActionButton
            title="Expand"
            icon="⬆️"
            color={COLORS.cyan}
            variant="filled"
            onPress={() => sheetRef.current?.expand()}
          />
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search members..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredItems.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </ScrollView>
      </BottomSheet>
    );
  },
);

TeamSheet.displayName = 'TeamSheet';

const styles = StyleSheet.create({
  controlBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
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
