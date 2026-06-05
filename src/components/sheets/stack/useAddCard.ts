import { useState, useCallback, useEffect } from 'react';
import type { CardData } from '../../../types';

export const useAddCard = (
  visible: boolean,
  onAddCard: (card: Omit<CardData, 'id'>) => void,
  onClose: () => void
) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!visible) {
      setName('');
      setNumber('');
      setExpiry('');
      setCvv('');
      setErrors({});
    }
  }, [visible]);

  const formatCardNumber = useCallback((text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  }, []);

  const formatExpiry = useCallback((text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  }, []);

  const handleNumberChange = useCallback((text: string) => {
    const formatted = formatCardNumber(text);
    setNumber(formatted.slice(0, 19));
  }, [formatCardNumber]);

  const handleExpiryChange = useCallback((text: string) => {
    const formatted = formatExpiry(text);
    setExpiry(formatted.slice(0, 5));
  }, [formatExpiry]);

  const handleCvvChange = useCallback((text: string) => {
    const cleaned = text.replace(/\D/g, '');
    setCvv(cleaned.slice(0, 3));
  }, []);

  const handleSave = useCallback(() => {
    const validationErrors: Record<string, string> = {};
    const cleanedNumber = number.replace(/\s/g, '');

    if (!name.trim()) {
      validationErrors.name = 'Cardholder name is required';
    }
    if (cleanedNumber.length !== 16) {
      validationErrors.number = 'Card number must be 16 digits';
    }
    if (expiry.length !== 5 || !expiry.includes('/')) {
      validationErrors.expiry = 'Expiry must be MM/YY';
    } else {
      const [month] = expiry.split('/').map(Number);
      if (month < 1 || month > 12) {
        validationErrors.expiry = 'Invalid month';
      }
    }
    if (cvv.length !== 3) {
      validationErrors.cvv = 'CVV must be 3 digits';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let type: CardData['type'] = 'visa';
    if (cleanedNumber.startsWith('5')) {
      type = 'mastercard';
    } else if (cleanedNumber.startsWith('3')) {
      type = 'amex';
    }

    onAddCard({
      type,
      last4: cleanedNumber.slice(-4),
      cardholderName: name,
      expiry,
    });
    onClose();
  }, [name, number, expiry, cvv, onAddCard, onClose]);

  return {
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
  };
};
