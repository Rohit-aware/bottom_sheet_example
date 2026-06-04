import React, { forwardRef, useImperativeHandle } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetBackdrop } from './BottomSheetBackdrop';
import { BottomSheetView } from './BottomSheetView';
import { useBottomSheetSetup } from '../hooks/useBottomSheetSetup';
import { useStableCallback } from '../hooks/useStableCallback';
import type { BottomSheetProps } from '../types/props';
import type { BottomSheetRef } from '../types/ref';

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (props, ref) => {
    const setup = useBottomSheetSetup(props);
    const { controller, layout, modalVisible } = setup;

    // Expose public API methods to parent ref
    useImperativeHandle(
      ref,
      () => ({
        open: () => controller.open(),
        close: (callback) => controller.close(callback),
        snapToIndex: (index) => controller.snapToIndex(index),
        expand: () => controller.snapToIndex(layout.resolvedSnapPoints.value.length - 1),
        collapse: () => controller.snapToIndex(0),
      }),
      [controller, layout.resolvedSnapPoints],
    );

    const onBackdropPress = useStableCallback(() => {
      if (props.enableBackdropDismiss ?? true) {
        controller.close();
      }
    });

    if (!modalVisible) {
      return null;
    }

    return (
      <Modal
        onRequestClose={props.onClose}
        transparent
        visible={modalVisible}
        {...(props.accessibilityProps || {})}
      >
        <GestureHandlerRootView style={styles.sheetContentContainer}>
          <BottomSheetBackdrop
            onPress={onBackdropPress}
            animatedStyle={setup.animation.overlayAnimatedStyle}
            renderBackdrop={props.renderBackdrop}
            theme={setup.resolvedTheme}
            style={props.style}
          />

          <BottomSheetView
            theme={setup.resolvedTheme}
            layout={setup.layout}
            animation={setup.animation}
            controller={setup.controller}
            handlePanGesture={setup.handlePanGesture}
            contentPanGesture={setup.contentPanGesture}
            style={props.style}
            renderHandle={props.renderHandle}
            enableDynamicSizing={props.enableDynamicSizing}
            avoidKeyboard={props.avoidKeyboard}
          >
            {props.children}
          </BottomSheetView>
        </GestureHandlerRootView>
      </Modal>
    );
  },
);

BottomSheet.displayName = 'BottomSheet';

const styles = StyleSheet.create({
  sheetContentContainer: {
    flex: 1,
  },
});
