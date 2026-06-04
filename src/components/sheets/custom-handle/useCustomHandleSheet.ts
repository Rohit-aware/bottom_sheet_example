import { useState, useCallback } from 'react';
import { HandleStyleType, getHandleConfig, HandleConfig } from './handleUtils';

export const useCustomHandleSheet = (initialStyle: HandleStyleType = 'chevron') => {
  const [handleStyle, setHandleStyle] = useState<HandleStyleType>(initialStyle);

  const toggleHandleStyle = useCallback(() => {
    setHandleStyle(prev => {
      if (prev === 'chevron') return 'pill';
      if (prev === 'pill') return 'default';
      return 'chevron';
    });
  }, []);

  const config: HandleConfig = getHandleConfig(handleStyle);

  return {
    handleStyle,
    config,
    setHandleStyle,
    toggleHandleStyle,
  };
};
