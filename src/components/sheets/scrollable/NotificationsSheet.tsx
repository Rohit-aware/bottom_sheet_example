import React, { forwardRef } from 'react';
import { FlatList } from 'react-native';
import { BottomSheet } from '@rn-lab/bottom-sheet';
import type { BottomSheetRef } from '@rn-lab/bottom-sheet';
import { NOTIFICATIONS } from '../../../data';
import { SheetHeader } from '../../common';
import { NotificationItem } from '../../list-items';
import { formatRelativeTime } from './scrollableUtils';

export interface NotificationsSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const NotificationsSheet = forwardRef<
  BottomSheetRef,
  NotificationsSheetProps
>((({ visible, onClose }, ref) => {
  const formattedNotifications = React.useMemo(() => {
    return NOTIFICATIONS.map(item => ({
      ...item,
      time: formatRelativeTime(item.time),
    }));
  }, []);

  return (
    <BottomSheet
      ref={ref}
      visible={visible}
      onClose={onClose}
      snapPoints={[350, '60%', '90%']}
      initialSnapIndex={0}
      onSnap={(index: number) =>
        console.log('Notifications sheet snapped to index:', index)
      }>
      <SheetHeader
        title="Notifications"
        subtitle={`${formattedNotifications.length} updates`}
        icon="🔔"
      />
      <FlatList
        data={formattedNotifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </BottomSheet>
  );
}));

NotificationsSheet.displayName = 'NotificationsSheet';
