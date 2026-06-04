export const COLORS = {
  bg: '#0B0D17',
  surface: '#141726',
  surfaceElevated: '#1C2038',

  accent: '#6C63FF',
  accentLight: '#A78BFA',
  accentGlow: 'rgba(108, 99, 255, 0.15)',

  pink: '#FF6B9D',
  cyan: '#06D6A0',
  amber: '#FFD166',
  coral: '#FF6B6B',

  textPrimary: '#F0F0FF',
  textSecondary: '#8B8FA3',
  textMuted: '#555872',

  border: 'rgba(255,255,255,0.06)',
  borderAccent: 'rgba(108, 99, 255, 0.3)',

  card: '#181C30',
  cardHover: '#1E2240',

  success: '#06D6A0',
  warning: '#FFD166',
  danger: '#FF6B6B',
} as const;

export type ColorKey = keyof typeof COLORS;
