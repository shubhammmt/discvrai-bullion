
import { useState, useEffect } from 'react';
import { getMixedFeed, MixedFeedData } from '@/utils/unifiedSearchApi';

export const useMixedFeed = () => {
  const [mixedFeedData, setMixedFeedData] = useState<MixedFeedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMixedFeed = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Attempting to fetch mixed feed...');
        const response = await getMixedFeed();
        
        console.log('Mixed feed response:', response);
        
        if (response.success && response.data) {
          setMixedFeedData(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to fetch mixed feed');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error fetching mixed feed:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMixedFeed();
  }, []);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getMixedFeed();
      if (response.success && response.data) {
        setMixedFeedData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch mixed feed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mixedFeedData,
    isLoading,
    error,
    refetch
  };
};
