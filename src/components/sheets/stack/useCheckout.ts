import { useState, useCallback } from 'react';
import type { CardData } from '../../../types';

const INITIAL_CARDS: CardData[] = [
  {
    id: 'card-1',
    type: 'visa',
    last4: '4242',
    cardholderName: 'Jane Doe',
    expiry: '09/27',
  },
  {
    id: 'card-2',
    type: 'mastercard',
    last4: '8888',
    cardholderName: 'Jane Doe',
    expiry: '12/28',
  },
];

export const useCheckout = () => {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState('card-1');
  const [isPaymentMethodVisible, setIsPaymentMethodVisible] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleAddCard = useCallback((newCardData: Omit<CardData, 'id'>) => {
    const newId = `card-${Date.now()}`;
    const newCard: CardData = {
      ...newCardData,
      id: newId,
    };
    setCards(prev => [...prev, newCard]);
    setSelectedCardId(newId);
  }, []);

  const handlePlaceOrder = useCallback(() => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setIsOrderPlaced(true);
    }, 1500);
  }, []);

  const resetCheckout = useCallback(() => {
    setCards(INITIAL_CARDS);
    setSelectedCardId('card-1');
    setIsPaymentMethodVisible(false);
    setIsPlacingOrder(false);
    setIsOrderPlaced(false);
  }, []);

  return {
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
  };
};
