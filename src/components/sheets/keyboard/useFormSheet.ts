import { useState, useCallback } from 'react';
import { validateEmail, validatePhone, formatPhoneNumber } from './formUtils';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  feedback: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  feedback: '',
};

export const useFormSheet = (onSubmitSuccess: () => void) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    let finalValue = value;
    if (field === 'phone') {
      finalValue = formatPhoneNumber(value);
    }
    setFormData(prev => ({ ...prev, [field]: finalValue }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }
    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(() => {
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
    }, 1000);
  }, [validate, onSubmitSuccess]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};
