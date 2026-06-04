import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS, SPACING } from '../../../constants';
import { ActionButton, InfoCard, SheetHeader } from '../../common';
import { useDynamicBehavior } from './useDynamicBehavior';

export interface DismissConfigSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const DismissConfigSheet = React.memo(
  ({ visible, onClose }: DismissConfigSheetProps) => {
    const {
      acceptedTerms,
      verificationCode,
      verificationError,
      toggleAcceptedTerms,
      handleCodeChange,
      validateCode,
      resetBehaviorStates,
    } = useDynamicBehavior();

    React.useEffect(() => {
      if (!visible) {
        resetBehaviorStates();
      }
    }, [visible, resetBehaviorStates]);

    const handleUnlock = () => {
      if (validateCode()) {
        onClose();
      }
    };

    return (
      <BottomSheet
        visible={visible}
        onClose={onClose}
        snapPoints={[380, '60%']}
        enableDragToClose={false}
        enableBackdropDismiss={false}
        initialSnapIndex={0}>
        <SheetHeader
          title="Security Gate"
          subtitle="Non-dismissible without code"
          icon="🔒"
        />
        <View style={styles.content}>
          <InfoCard emoji="🛡️" title="Persistent Modal Mode">
            <Text style={styles.infoText}>
              Dragging down is disabled (<Text style={styles.highlight}>enableDragToClose={'{'}false{'}'}</Text>)
              and clicking the backdrop won't close this sheet (<Text style={styles.highlight}>enableBackdropDismiss={'{'}false{'}'}</Text>).
            </Text>
          </InfoCard>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={toggleAcceptedTerms}
            activeOpacity={0.8}>
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxActive]}>
              {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              I accept the security terms & conditions
            </Text>
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter 4-digit code (e.g. 1234)</Text>
            <TextInput
              style={[styles.codeInput, verificationError ? styles.inputError : null]}
              placeholder="0 0 0 0"
              placeholderTextColor={COLORS.textMuted}
              value={verificationCode}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
            />
            {verificationError && (
              <Text style={styles.errorText}>{verificationError}</Text>
            )}
          </View>

          <View style={styles.actionButton}>
            <ActionButton
              title="Verify & Unlock"
              icon="🔓"
              color={COLORS.amber}
              onPress={handleUnlock}
            />
          </View>
        </View>
      </BottomSheet>
    );
  },
);

DismissConfigSheet.displayName = 'DismissConfigSheet';

const styles = StyleSheet.create({
  content: {
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.xs,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: COLORS.amber,
    borderColor: COLORS.amber,
  },
  checkmark: {
    color: '#1A0A2E',
    fontWeight: '800',
    fontSize: 12,
  },
  checkboxLabel: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  inputGroup: {
    marginTop: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  codeInput: {
    backgroundColor: COLORS.surfaceElevated,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.coral,
  },
  errorText: {
    color: COLORS.coral,
    fontSize: 11,
    marginTop: 6,
    fontWeight: '600',
  },
  actionButton: {
    marginTop: 20,
  },
});
