
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
        
        console.log('Attempting to fetch filter options...');
        const response = await getFilterOptions();
        
        console.log('Filter options response:', response);
        
        if (response.success && response.data) {
          setFilterOptions(response.data);
          setError(null); // Explicitly clear any previous errors
        } else {
          setError(response.error || 'Failed to fetch filter options');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error fetching filter options:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getFilterOptions();
      if (response.success && response.data) {
        setFilterOptions(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch filter options');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    filterOptions,
    isLoading,
    error,
    refetch
  };
};
