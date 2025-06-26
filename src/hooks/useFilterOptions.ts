
import { useState, useEffect } from 'react';
import { getFilterOptions, FilterOptions } from '@/utils/unifiedSearchApi';

export const useFilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await getFilterOptions();
        
        if (response.success && response.data) {
          setFilterOptions(response.data);
        } else {
          setError(response.error || 'Failed to fetch filter options');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Error fetching filter options:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return {
    filterOptions,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setError(null);
      // Re-trigger the effect by updating a dependency
    }
  };
};
