import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS } from '../../../constants';
import { ActionButton, InfoCard, SheetHeader } from '../../common';
import { useDynamicBehavior } from './useDynamicBehavior';

export interface DynamicSizingSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const DynamicSizingSheet = React.memo(
  ({ visible, onClose }: DynamicSizingSheetProps) => {
    const {
      dynamicItems,
      addDynamicItem,
      removeDynamicItem,
      clearDynamicItems,
    } = useDynamicBehavior();

    React.useEffect(() => {
      if (!visible) {
        clearDynamicItems();
      }
    }, [visible, clearDynamicItems]);

    return (
      <BottomSheet
        visible={visible}
        onClose={onClose}
        snapPoints={[350, '80%']}
        enableDynamicSizing={true}
        initialSnapIndex={0}>
        <SheetHeader
          title="Dynamic Sizing"
          subtitle="Height fits content automatically"
          icon="📐"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <InfoCard emoji="🚀" title="How it works">
              <Text style={styles.infoText}>
                When <Text style={styles.highlight}>enableDynamicSizing</Text> is{' '}
                <Text style={styles.highlight}>true</Text>, the bottom sheet's
                first snap point will expand or shrink to perfectly wrap the layout
                height of its contents.
              </Text>
            </InfoCard>

            <View style={styles.buttonRow}>
              <ActionButton
                title="Add Item"
                icon="➕"
                color={COLORS.accent}
                variant="outline"
                onPress={addDynamicItem}
              />
              <ActionButton
                title="Remove Item"
                icon="➖"
                color={COLORS.coral}
                variant="outline"
                onPress={removeDynamicItem}
                disabled={dynamicItems.length === 0}
              />
            </View>

            {dynamicItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No items. Click "Add Item" to dynamically change height!
                </Text>
              </View>
            ) : (
              <View style={styles.listContainer}>
                {dynamicItems.map(item => (
                  <View key={item.id} style={styles.listItem}>
                    <Text style={styles.itemEmoji}>{item.emoji}</Text>
                    <View style={styles.itemTextContainer}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemDesc}>{item.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.closeBtn}>
              <ActionButton
                title="Close Showcase"
                icon="✕"
                color={COLORS.textSecondary}
                variant="ghost"
                onPress={onClose}
              />
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
    );
  },
);

DynamicSizingSheet.displayName = 'DynamicSizingSheet';

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  container: {
    padding: 20,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  highlight: {
    fontWeight: '800',
    color: COLORS.accent,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 16,
  },
  emptyContainer: {
    padding: 24,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
  listContainer: {
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.md,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  itemEmoji: {
    fontSize: 22,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  itemDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    marginTop: 24,
  },
});
