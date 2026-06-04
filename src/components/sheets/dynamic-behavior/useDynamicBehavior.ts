import { useState, useCallback } from 'react';
import { generateRandomItem, DynamicItem, validateVerificationCode } from './behaviorUtils';

export const useDynamicBehavior = () => {
  const [dynamicItems, setDynamicItems] = useState<DynamicItem[]>([]);

  const addDynamicItem = useCallback(() => {
    setDynamicItems(prev => [...prev, generateRandomItem()]);
  }, []);

  const removeDynamicItem = useCallback(() => {
    setDynamicItems(prev => prev.slice(0, -1));
  }, []);

  const clearDynamicItems = useCallback(() => {
    setDynamicItems([]);
  }, []);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const toggleAcceptedTerms = useCallback(() => {
    setAcceptedTerms(prev => !prev);
  }, []);

  const handleCodeChange = useCallback((code: string) => {
    const numericCode = code.replace(/\D/g, '').substring(0, 4);
    setVerificationCode(numericCode);
    setVerificationError(null);
  }, []);

  const validateCode = useCallback((): boolean => {
    if (!acceptedTerms) {
      setVerificationError('You must accept terms of service');
      return false;
    }
    if (!validateVerificationCode(verificationCode)) {
      setVerificationError('Enter a valid 4-digit code (e.g. 1234)');
      return false;
    }
    setVerificationError(null);
    return true;
  }, [acceptedTerms, verificationCode]);

  const resetBehaviorStates = useCallback(() => {
    setAcceptedTerms(false);
    setVerificationCode('');
    setVerificationError(null);
  }, []);

  return {
    dynamicItems,
    addDynamicItem,
    removeDynamicItem,
    clearDynamicItems,

    acceptedTerms,
    verificationCode,
    verificationError,
    toggleAcceptedTerms,
    handleCodeChange,
    validateCode,
    resetBehaviorStates,
  };
};
