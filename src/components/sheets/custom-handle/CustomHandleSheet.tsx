import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS } from '../../../constants';
import { ActionButton, InfoCard, SheetHeader } from '../../common';
import { CustomDragHandle } from '../../handles/CustomDragHandle';
import { PillDragHandle } from '../../handles/PillDragHandle';
import { useCustomHandleSheet } from './useCustomHandleSheet';

export interface CustomHandleSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const CustomHandleSheet = React.memo(
  ({ visible, onClose }: CustomHandleSheetProps) => {
    const { handleStyle, toggleHandleStyle } = useCustomHandleSheet('chevron');

    const renderCustomHandle = React.useCallback(() => {
      if (handleStyle === 'chevron') {
        return <CustomDragHandle />;
      }
      if (handleStyle === 'pill') {
        return <PillDragHandle />;
      }
      return undefined;
    }, [handleStyle]);

    return (
      <BottomSheet
        visible={visible}
        onClose={onClose}
        snapPoints={[320, '60%', '85%']}
        initialSnapIndex={0}
        renderHandle={renderCustomHandle}>
        <SheetHeader
          title="Custom Handle"
          subtitle={`Current style: ${handleStyle.toUpperCase()}`}
          icon="✋"
        />
        <View style={styles.content}>
          <InfoCard emoji="🎯" title="Custom renderHandle">
            <Text>
              This sheet uses{' '}
              <Text style={styles.highlight}>renderHandle</Text> prop to
              replace the default drag indicator with a custom component dynamically.
            </Text>
          </InfoCard>

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Interact with handles ↓</Text>
          </View>

          <View style={styles.actionContainer}>
            <ActionButton
              title={`Switch Drag Handle Style`}
              icon="🔄"
              color={COLORS.pink}
              variant="outline"
              onPress={toggleHandleStyle}
            />
          </View>
        </View>
      </BottomSheet>
    );
  },
);

CustomHandleSheet.displayName = 'CustomHandleSheet';

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  highlight: {
    fontWeight: '800',
    color: COLORS.accent,
  },
  labelContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  actionContainer: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
