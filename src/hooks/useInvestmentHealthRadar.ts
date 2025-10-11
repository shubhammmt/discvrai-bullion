import { useState, useEffect } from 'react';
import { InvestmentHealthRadarResponse } from '@/types/investmentHealthRadar';
import { InvestmentHealthRadarService } from '@/services/investmentHealthRadarService';

export const useInvestmentHealthRadar = (symbol: string | undefined) => {
  const [data, setData] = useState<InvestmentHealthRadarResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await InvestmentHealthRadarService.fetchInvestmentHealthRadar(symbol);
        setData(response);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch investment health radar data';
        setError(errorMessage);
        console.error('Investment Health Radar API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return { data, isLoading, error };
};
