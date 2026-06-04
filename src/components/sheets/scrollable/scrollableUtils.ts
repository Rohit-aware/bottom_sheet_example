export const formatRelativeTime = (time: string): string => {
  if (!time) return '';
  return time.trim();
};

export const filterItemsByQuery = <T extends Record<string, any>>(
  items: T[],
  query: string,
  key: keyof T
): T[] => {
  if (!query) return items;
  const formattedQuery = query.toLowerCase().trim();
  return items.filter(item => {
    const value = item[key];
    if (typeof value === 'string') {
      return value.toLowerCase().includes(formattedQuery);
    }
    return false;
  });
};
