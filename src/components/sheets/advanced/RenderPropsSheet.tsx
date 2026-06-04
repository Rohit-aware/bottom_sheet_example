import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import type { BottomSheetRenderProps } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS, SPACING } from '../../../constants';
import { ActionButton, InfoCard, SheetHeader } from '../../common';
import { useAdvancedSheet } from './useAdvancedSheet';

export interface RenderPropsSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const RenderPropsSheet = React.memo(
  ({ visible, onClose }: RenderPropsSheetProps) => {
    const { logs, addLog, clearLogs } = useAdvancedSheet();

    React.useEffect(() => {
      if (!visible) {
        clearLogs();
      }
    }, [visible, clearLogs]);

    return (
      <BottomSheet
        visible={visible}
        onClose={onClose}
        snapPoints={[300, '55%', '85%']}
        initialSnapIndex={0}
        onSnap={(index) => addLog(`Snapped to index ${index}`)}>
        {({ close, snapToIndex, expand, collapse }: BottomSheetRenderProps) => (
          <View style={{ flex: 1 }}>
            <SheetHeader
              title="Render Props"
              subtitle="Function-as-children API"
              icon="🧩"
            />
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 20 }}>
              <InfoCard emoji="⚡" title="Live Controller">
                <Text>
                  Access{' '}
                  <Text style={{ fontWeight: '800', color: COLORS.accent }}>
                    close()
                  </Text>
                  ,{' '}
                  <Text style={{ fontWeight: '800', color: COLORS.cyan }}>
                    snapToIndex()
                  </Text>
                  ,{' '}
                  <Text style={{ fontWeight: '800', color: COLORS.amber }}>
                    expand()
                  </Text>
                  , and{' '}
                  <Text style={{ fontWeight: '800', color: COLORS.pink }}>
                    collapse()
                  </Text>{' '}
                  directly from the render function.
                </Text>
              </InfoCard>

              <View style={styles.logContainer}>
                <Text style={styles.logTitle}>Event Log</Text>
                {logs.length === 0 ? (
                  <Text style={styles.noLogs}>No events triggered yet</Text>
                ) : (
                  logs.map((log, index) => (
                    <Text key={index} style={styles.logItem}>
                      [{log.timestamp}] {log.action}
                    </Text>
                  ))
                )}
              </View>

              <View style={{ gap: 10, marginTop: 20 }}>
                <ActionButton
                  title="Snap to Index 0"
                  icon="1️⃣"
                  color={COLORS.accent}
                  variant="outline"
                  onPress={() => {
                    addLog('Requested Snap to Index 0');
                    snapToIndex(0);
                  }}
                />
                <ActionButton
                  title="Snap to Index 1"
                  icon="2️⃣"
                  color={COLORS.cyan}
                  variant="outline"
                  onPress={() => {
                    addLog('Requested Snap to Index 1');
                    snapToIndex(1);
                  }}
                />
                <ActionButton
                  title="Expand to Full"
                  icon="⬆️"
                  color={COLORS.amber}
                  variant="filled"
                  onPress={() => {
                    addLog('Requested Expand()');
                    expand();
                  }}
                />
                <ActionButton
                  title="Collapse to Base"
                  icon="⬇️"
                  color={COLORS.textSecondary}
                  variant="ghost"
                  onPress={() => {
                    addLog('Requested Collapse()');
                    collapse();
                  }}
                />
                <ActionButton
                  title="Close Sheet"
                  icon="✕"
                  color={COLORS.coral}
                  variant="filled"
                  onPress={() => {
                    addLog('Requested Close()');
                    close();
                  }}
                />
              </View>
            </ScrollView>
          </View>
        )}
      </BottomSheet>
    );
  },
);

RenderPropsSheet.displayName = 'RenderPropsSheet';

const styles = StyleSheet.create({
  logContainer: {
    backgroundColor: COLORS.surfaceElevated,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  logTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  noLogs: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  logItem: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    marginTop: 4,
  },
});
