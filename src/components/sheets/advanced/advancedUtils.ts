import { COLORS } from '../../../constants';

export interface ThemeConfig {
  colors: {
    background: string;
    backdrop: string;
    handle: string;
  };
  radius: {
    container: number;
    handle: number;
  };
}

export const isValidTheme = (theme: any): theme is ThemeConfig => {
  if (!theme || typeof theme !== 'object') return false;
  if (!theme.colors || typeof theme.colors !== 'object') return false;
  if (typeof theme.colors.background !== 'string') return false;
  if (typeof theme.colors.backdrop !== 'string') return false;
  if (typeof theme.colors.handle !== 'string') return false;
  if (!theme.radius || typeof theme.radius !== 'object') return false;
  if (typeof theme.radius.container !== 'number') return false;
  if (typeof theme.radius.handle !== 'number') return false;
  return true;
};

export const getContrastText = (bgHex: string): string => {
  if (!bgHex || !bgHex.startsWith('#')) return COLORS.textPrimary;
  
  const hex = bgHex.substring(1);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#111827' : '#F9FAFB';
};
