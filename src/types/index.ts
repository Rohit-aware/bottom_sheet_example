export type SheetType =
  | 'notifications'
  | 'settings'
  | 'team'
  | 'custom-handle'
  | 'render-props'
  | 'themed'
  | 'form'
  | 'dynamic-sizing'
  | 'dismiss-config'
  | 'checkout'
  | 'fullscreen-player'
  | null;

export interface CardData {
  id: string;
  type: 'visa' | 'mastercard' | 'applepay' | 'discover' | 'amex';
  last4: string;
  cardholderName: string;
  expiry: string;
}

export interface NotificationData {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  time: string;
  color: string;
}

export interface SettingsItemData {
  icon: string;
  label: string;
  badge: string | null;
}

export type MemberStatus = 'online' | 'away' | 'offline';

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  status: MemberStatus;
  avatar: string;
}

export type ButtonVariant = 'filled' | 'outline' | 'ghost';
