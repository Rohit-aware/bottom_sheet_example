import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import { COLORS, RADIUS, SPACING } from '../../../constants';
import { ActionButton, SheetHeader } from '../../common';
import { useFormSheet } from './useFormSheet';

export interface FormSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const FormSheet = React.memo(({ visible, onClose }: FormSheetProps) => {
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useFormSheet(onClose);

  React.useEffect(() => {
    if (!visible) {
      resetForm();
    }
  }, [visible, resetForm]);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      snapPoints={['65%', '90%']}
      enableDynamicSizing={false}
      initialSnapIndex={0}
      avoidKeyboard={true}
    >
      <SheetHeader
        title="Feedback Form"
        subtitle="Verify keyboard avoiding behavior"
        icon="📝"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Name *</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            placeholder="John Doe"
            placeholderTextColor={COLORS.textMuted}
            value={formData.name}
            onChangeText={(val) => handleInputChange('name', val)}
            autoCorrect={false}
            editable={!isSubmitting}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={[styles.input, errors.email ? styles.inputError : null]}
            placeholder="john.doe@example.com"
            placeholderTextColor={COLORS.textMuted}
            value={formData.email}
            onChangeText={(val) => handleInputChange('email', val)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isSubmitting}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, errors.phone ? styles.inputError : null]}
            placeholder="(555) 000-0000"
            placeholderTextColor={COLORS.textMuted}
            value={formData.phone}
            onChangeText={(val) => handleInputChange('phone', val)}
            keyboardType="phone-pad"
            autoCorrect={false}
            editable={!isSubmitting}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Company / Organization</Text>
          <TextInput
            style={styles.input}
            placeholder="Acme Corp"
            placeholderTextColor={COLORS.textMuted}
            value={formData.company}
            onChangeText={(val) => handleInputChange('company', val)}
            autoCorrect={false}
            editable={!isSubmitting}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="General Inquiry"
            placeholderTextColor={COLORS.textMuted}
            value={formData.subject}
            onChangeText={(val) => handleInputChange('subject', val)}
            autoCorrect={true}
            editable={!isSubmitting}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Feedback *</Text>
          <TextInput
            style={[
              styles.input,
              styles.inputMultiline,
              errors.feedback ? styles.inputError : null,
            ]}
            placeholder="Type your message here..."
            placeholderTextColor={COLORS.textMuted}
            value={formData.feedback}
            onChangeText={(val) => handleInputChange('feedback', val)}
            multiline
            numberOfLines={4}
            editable={!isSubmitting}
          />
          {errors.feedback && <Text style={styles.errorText}>{errors.feedback}</Text>}
        </View>

        <View style={styles.buttonContainer}>
          {isSubmitting ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color={COLORS.accent} size="small" />
              <Text style={styles.loaderText}>Sending feedback...</Text>
            </View>
          ) : (
            <ActionButton
              title="Submit Feedback"
              icon="🚀"
              color={COLORS.accent}
              onPress={handleSubmit}
            />
          )}
        </View>
      </ScrollView>
    </BottomSheet>
  );
});

FormSheet.displayName = 'FormSheet';

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.md,
    paddingHorizontal: 20,
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
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top',
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
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  loaderText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
