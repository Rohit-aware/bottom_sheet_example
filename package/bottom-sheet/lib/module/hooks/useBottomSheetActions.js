"use strict";

import { Keyboard, Platform } from 'react-native';
import { Easing, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { getTimingConfig } from '../utils/animationMath';
import { getBottomSheetSnapPointTranslateY } from '../utils/snapPointMath';
import { useStableCallback } from './useStableCallback';
export const useBottomSheetActions = ({
  isOpen,
  isOpening,
  currentSnapIndex,
  sheetTranslateY,
  maxHeight,
  resolvedSnapPoints,
  animationConfig,
  onSnap,
  onClose,
  showContent
}) => {
  const duration = animationConfig?.duration ?? 250;
  const openEasing = animationConfig?.openEasing ?? Easing.out(Easing.cubic);
  const closeEasing = animationConfig?.closeEasing ?? Easing.out(Easing.cubic);
  const snapEasing = animationConfig?.snapEasing ?? Easing.inOut(Easing.ease);
  const finishClose = useStableCallback(callback => {
    onClose();
    if (callback) {
      if (Platform.OS === 'ios') callback();else setTimeout(callback, 100);
    }
  });
  const snapToIndex = useStableCallback(index => {
    if (!isOpen.value) return;
    const points = resolvedSnapPoints.value;
    const clamped = Math.min(Math.max(0, index), points.length - 1);
    currentSnapIndex.value = clamped;
    const target = getBottomSheetSnapPointTranslateY({
      snapPoints: points,
      maxHeight,
      snapIndex: clamped
    });
    sheetTranslateY.value = withTiming(target, getTimingConfig(duration, snapEasing), finished => {
      if (finished && onSnap) scheduleOnRN(onSnap, clamped);
    });
  });
  const open = useStableCallback((shouldShowContent = true, initialSnapIndex = 0) => {
    const points = resolvedSnapPoints.value;
    const targetIndex = Math.min(initialSnapIndex, points.length - 1);
    currentSnapIndex.value = targetIndex;
    const target = getBottomSheetSnapPointTranslateY({
      snapPoints: points,
      maxHeight,
      snapIndex: targetIndex
    });
    sheetTranslateY.value = withTiming(target, getTimingConfig(duration, openEasing), finished => {
      if (!finished) return;
      isOpening.value = false;
      if (shouldShowContent) scheduleOnRN(showContent);
      if (onSnap) scheduleOnRN(onSnap, targetIndex);
    });
  });
  const closeFromGesture = useStableCallback(() => {
    Keyboard.dismiss();
    requestAnimationFrame(() => {
      isOpen.value = false;
      isOpening.value = false;
      sheetTranslateY.value = withTiming(maxHeight, getTimingConfig(duration, closeEasing), finished => {
        if (finished) scheduleOnRN(onClose);
      });
    });
  });
  const close = useStableCallback(callback => {
    if (!isOpen.value) return;
    Keyboard.dismiss();
    isOpen.value = false;
    isOpening.value = false;
    sheetTranslateY.value = withTiming(maxHeight, getTimingConfig(duration, closeEasing), finished => {
      if (finished) scheduleOnRN(finishClose, callback);
    });
  });
  return {
    snapToIndex,
    open,
    close,
    closeFromGesture
  };
};
//# sourceMappingURL=useBottomSheetActions.js.map