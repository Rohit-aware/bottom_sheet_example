import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS, SPACING } from '../../../constants';
import { ActionButton, SheetHeader } from '../../common';
import type { CardData } from '../../../types';
import { AddCardSheet } from './AddCardSheet';

export interface PaymentMethodSheetProps {
  visible: boolean;
  onClose: () => void;
  cards: CardData[];
  selectedCardId: string;
  onSelectCard: (id: string) => void;
  onAddCard: (card: Omit<CardData, 'id'>) => void;
}

export const PaymentMethodSheet = React.memo(
  ({
    visible,
    onClose,
    cards,
    selectedCardId,
    onSelectCard,
    onAddCard,
  }: PaymentMethodSheetProps) => {
    const [isAddCardVisible, setIsAddCardVisible] = useState(false);

    const getCardEmoji = (type: CardData['type']) => {
      switch (type) {
        case 'visa':
          return '💳';
        case 'mastercard':
          return '🎴';
        case 'applepay':
          return '🍎';
        case 'amex':
          return '💎';
        default:
          return '💳';
      }
    };

    const handleSelect = (id: string) => {
      onSelectCard(id);
      onClose();
    };

    return (
      <BottomSheet
        visible={visible}
        onClose={onClose}
        snapPoints={[400, '70%']}
        enableDynamicSizing={false}
        initialSnapIndex={0}
      >
        <SheetHeader
          title="Payment Method"
          subtitle="Select or add a payment option"
          icon="💳"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.listContainer}>
            {cards.map(card => {
              const isSelected = card.id === selectedCardId;
              return (
                <TouchableOpacity
                  key={card.id}
                  style={[
                    styles.cardItem,
                    isSelected && styles.cardItemSelected,
                  ]}
                  onPress={() => handleSelect(card.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardEmoji}>{getCardEmoji(card.type)}</Text>
                    <View style={styles.cardBrandContainer}>
                      <Text style={styles.cardBrand}>
                        {card.type.toUpperCase()}
                      </Text>
                      <Text style={styles.cardDigits}>
                        •••• •••• •••• {card.last4}
                      </Text>
                    </View>
                    {isSelected && (
                      <View style={styles.checkedContainer}>
                        <Text style={styles.checkedText}>✓</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardholderName} numberOfLines={1}>
                      {card.cardholderName}
                    </Text>
                    <Text style={styles.cardExpiry}>{card.expiry}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.buttonContainer}>
            <ActionButton
              title="Add New Card"
              icon="➕"
              color={COLORS.accent}
              variant="outline"
              onPress={() => setIsAddCardVisible(true)}
            />
          </View>
        </ScrollView>

        <AddCardSheet
          visible={isAddCardVisible}
          onClose={() => setIsAddCardVisible(false)}
          onAddCard={onAddCard}
        />
      </BottomSheet>
    );
  }
);

PaymentMethodSheet.displayName = 'PaymentMethodSheet';

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: SPACING.md,
  },
  listContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  cardItem: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  cardItemSelected: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(108, 99, 255, 0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardBrandContainer: {
    flex: 1,
  },
  cardBrand: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  cardDigits: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
    letterSpacing: 1,
  },
  checkedContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '800',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
  cardholderName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
    flex: 1,
  },
  cardExpiry: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: SPACING.md,
  },
});
