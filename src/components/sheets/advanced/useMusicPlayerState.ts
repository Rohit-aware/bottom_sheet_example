import { useState, useEffect, useRef, useCallback } from 'react';

export const useMusicPlayerState = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(84);
  const [isLiked, setIsLiked] = useState(false);
  const [isMiniPlayerActive, setIsMiniPlayerActive] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const duration = 225;
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      setHasPlayedOnce(true);
      progressInterval.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const toggleLiked = useCallback(() => {
    setIsLiked(prev => !prev);
  }, []);

  const formatTime = useCallback((secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  }, []);

  const progressPercentage = (currentTime / duration) * 100;

  return {
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    isLiked,
    setIsLiked,
    duration,
    isMiniPlayerActive,
    setIsMiniPlayerActive,
    hasPlayedOnce,
    togglePlayPause,
    toggleLiked,
    formatTime,
    progressPercentage,
  };
};
