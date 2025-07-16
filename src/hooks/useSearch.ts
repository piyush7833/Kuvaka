import { useState, useEffect, useCallback } from 'react';
import { DEBOUNCE_DELAY_MS } from '@/lib/constants';

export function useSearch<T>(
  items: T[],
  searchFn: (item: T, query: string) => boolean,
  delay: number = DEBOUNCE_DELAY_MS
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = items.filter((item) => searchFn(item, searchQuery));
      setFilteredItems(filtered);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchQuery, items, searchFn, delay]);

  return {
    searchQuery,
    filteredItems,
    handleSearch,
  };
} 