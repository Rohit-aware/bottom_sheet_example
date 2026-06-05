import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS, SPACING } from '../../../constants';
import { ActionButton, SheetHeader } from '../../common';
import type { CardData } from '../../../types';
import { PaymentMethodSheet } from './PaymentMethodSheet';
import { useCheckout } from './useCheckout';

export interface CheckoutSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const CheckoutSheet = React.memo(({ visible, onClose }: CheckoutSheetProps) => {
  const {
    cards,
    selectedCardId,
    setSelectedCardId,
    isPaymentMethodVisible,
    setIsPaymentMethodVisible,
    isPlacingOrder,
    isOrderPlaced,
    handleAddCard,
    handlePlaceOrder,
    resetCheckout,
  } = useCheckout();

  useEffect(() => {
    if (!visible) {
      resetCheckout();
    }
  }, [visible, resetCheckout]);

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  const getCardEmoji = React.useCallback((type: CardData['type']) => {
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
  }, []);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      snapPoints={[520, '85%']}
      enableDynamicSizing={false}
      initialSnapIndex={0}
    >
      {isOrderPlaced ? (
        <View style={styles.successContainer}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Order Placed!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for your purchase. Your premium wireless headphones are on their way!
          </Text>
          <View style={styles.successDetailsCard}>
            <Text style={styles.successDetailsTitle}>Delivery Details</Text>
            <Text style={styles.successDetailsText}>Estimated Arrival: 2-3 business days</Text>
            <Text style={styles.successDetailsText}>Shipping Method: Express Courier</Text>
          </View>
          <View style={styles.successBtn}>
            <ActionButton
              title="Got it"
              icon="✓"
              color={COLORS.cyan}
              onPress={onClose}
            />
          </View>
        </View>
      ) : (
        <>
          <SheetHeader
            title="Checkout"
            subtitle="Review your order details"
            icon="🛒"
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Summary</Text>

              <View style={styles.itemRow}>
                <View style={styles.itemImagePlaceholder}>
                  <Text style={styles.itemImageEmoji}>🎧</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>Wireless Headphones</Text>
                  <Text style={styles.itemQty}>Qty: 1 • Carbon Grey</Text>
                </View>
                <Text style={styles.itemPrice}>$299.00</Text>
              </View>

              <View style={styles.itemRow}>
                <View style={styles.itemImagePlaceholder}>
                  <Text style={styles.itemImageEmoji}>💼</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>Leather Protective Case</Text>
                  <Text style={styles.itemQty}>Qty: 1 • Saddle Brown</Text>
                </View>
                <Text style={styles.itemPrice}>$49.00</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              {selectedCard ? (
                <View style={styles.paymentCard}>
                  <Text style={styles.paymentEmoji}>
                    {getCardEmoji(selectedCard.type)}
                  </Text>
                  <View style={styles.paymentInfo}>
                    <Text style={styles.paymentName}>
                      {selectedCard.type.toUpperCase()} ending in {selectedCard.last4}
                    </Text>
                    <Text style={styles.paymentExpiry}>
                      Expires {selectedCard.expiry} • {selectedCard.cardholderName}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.changeBtn}
                    onPress={() => setIsPaymentMethodVisible(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.changeBtnText}>Change</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.paymentCardEmpty}
                  onPress={() => setIsPaymentMethodVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.paymentCardEmptyText}>
                    ➕ Select Payment Method
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Subtotal</Text>
                <Text style={styles.priceValue}>$348.00</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Shipping</Text>
                <Text style={styles.priceValueFree}>FREE</Text>
              </View>
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>$348.00</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              {isPlacingOrder ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator color={COLORS.pink} size="small" />
                  <Text style={styles.loaderText}>Processing Payment...</Text>
                </View>
              ) : (
                <ActionButton
                  title="Place Order"
                  icon="🚀"
                  color={COLORS.pink}
                  onPress={handlePlaceOrder}
                  disabled={!selectedCard}
                />
              )}
            </View>
          </ScrollView>

          <PaymentMethodSheet
            visible={isPaymentMethodVisible}
            onClose={() => setIsPaymentMethodVisible(false)}
            cards={cards}
            selectedCardId={selectedCardId}
            onSelectCard={setSelectedCardId}
            onAddCard={handleAddCard}
          />
        </>
      )}
    </BottomSheet>
  );
});

CheckoutSheet.displayName = 'CheckoutSheet';

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: SPACING.sm,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: SPACING.xs,
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
    marginHorizontal: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  itemImagePlaceholder: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemImageEmoji: {
    fontSize: 20,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  itemQty: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  itemPrice: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.md,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentEmoji: {
    fontSize: 22,
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentName: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  paymentExpiry: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  changeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.accentGlow,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
  },
  changeBtnText: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '700',
  },
  paymentCardEmpty: {
    padding: 14,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  paymentCardEmptyText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  priceValue: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  priceValueFree: {
    color: COLORS.cyan,
    fontSize: 13,
    fontWeight: '800',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
  totalValue: {
    color: COLORS.pink,
    fontSize: 16,
    fontWeight: '900',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 18,
    paddingBottom: SPACING.md,
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  loaderText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 40,
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  successDetailsCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.lg,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 30,
  },
  successDetailsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.cyan,
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  successDetailsText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    marginTop: 4,
    fontWeight: '500',
  },
  successBtn: {
    width: '100%',
  },
});
