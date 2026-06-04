export type HandleStyleType = 'chevron' | 'pill' | 'default';

export interface HandleConfig {
  height: number;
  backgroundColor: string;
  indicatorColor: string;
  borderRadius: number;
}

export const getHandleConfig = (
  style: HandleStyleType,
  themeColors?: { background: string; handle: string }
): HandleConfig => {
  const defaultHandleColor = themeColors?.handle || '#E4E7EB';
  const defaultBgColor = themeColors?.background || '#FFFFFF';

  switch (style) {
    case 'chevron':
      return {
        height: 28,
        backgroundColor: defaultBgColor,
        indicatorColor: defaultHandleColor,
        borderRadius: 0,
      };
    case 'pill':
      return {
        height: 32,
        backgroundColor: defaultBgColor,
        indicatorColor: '#8E8E93',
        borderRadius: 16,
      };
    case 'default':
    default:
      return {
        height: 24,
        backgroundColor: defaultBgColor,
        indicatorColor: defaultHandleColor,
        borderRadius: 12,
      };
  }
};
