import { useState, useMemo, useCallback } from 'react';
import { filterItemsByQuery } from './scrollableUtils';

export interface UseScrollableSheetOptions<T> {
  initialItems: T[];
  filterKey: keyof T;
}

export const useScrollableSheet = <T extends Record<string, any>>({
  initialItems,
  filterKey,
}: UseScrollableSheetOptions<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return filterItemsByQuery(initialItems, searchQuery, filterKey);
  }, [initialItems, searchQuery, filterKey]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  }, []);

  const reset = useCallback(() => {
    setSearchQuery('');
    setSelectedId(null);
  }, []);

  return {
    searchQuery,
    filteredItems,
    selectedId,
    handleSearch,
    handleSelect,
    reset,
  };
};
