import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS, SPACING } from '../../../constants';
import { ActionButton, SheetHeader } from '../../common';
import type { CardData } from '../../../types';
import { useAddCard } from './useAddCard';

export interface AddCardSheetProps {
  visible: boolean;
  onClose: () => void;
  onAddCard: (card: Omit<CardData, 'id'>) => void;
}

export const AddCardSheet = React.memo(
  ({ visible, onClose, onAddCard }: AddCardSheetProps) => {
    const {
      name,
      setName,
      number,
      expiry,
      cvv,
      errors,
      handleNumberChange,
      handleExpiryChange,
      handleCvvChange,
      handleSave,
    } = useAddCard(visible, onAddCard, onClose);

    return (
      <BottomSheet
        visible={visible}
        onClose={onClose}
        snapPoints={[480, '85%']}
        enableDynamicSizing={false}
        initialSnapIndex={0}
        avoidKeyboard={true}
      >
        <SheetHeader
          title="Add New Card"
          subtitle="Enter your payment card details"
          icon="➕"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              placeholder="e.g. John Doe"
              placeholderTextColor={COLORS.textMuted}
              value={name}
              onChangeText={setName}
              autoCorrect={false}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={[styles.input, errors.number ? styles.inputError : null]}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor={COLORS.textMuted}
              value={number}
              onChangeText={handleNumberChange}
              keyboardType="number-pad"
              autoCorrect={false}
            />
            {errors.number && <Text style={styles.errorText}>{errors.number}</Text>}
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={[styles.input, errors.expiry ? styles.inputError : null]}
                placeholder="MM/YY"
                placeholderTextColor={COLORS.textMuted}
                value={expiry}
                onChangeText={handleExpiryChange}
                keyboardType="number-pad"
                autoCorrect={false}
              />
              {errors.expiry && <Text style={styles.errorText}>{errors.expiry}</Text>}
            </View>

            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={[styles.input, errors.cvv ? styles.inputError : null]}
                placeholder="000"
                placeholderTextColor={COLORS.textMuted}
                value={cvv}
                onChangeText={handleCvvChange}
                keyboardType="number-pad"
                secureTextEntry
                autoCorrect={false}
              />
              {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <ActionButton
              title="Save & Continue"
              icon="💳"
              color={COLORS.pink}
              onPress={handleSave}
            />
          </View>
        </ScrollView>
      </BottomSheet>
    );
  }
);

AddCardSheet.displayName = 'AddCardSheet';

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.md,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 8,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surfaceElevated,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.coral,
  },
  errorText: {
    color: COLORS.coral,
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: SPACING.md,
  },
});
