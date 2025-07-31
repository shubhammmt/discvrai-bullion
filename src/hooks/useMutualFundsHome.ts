import { useState, useEffect } from 'react';
import { mutualFundsHomeService, MutualFundsHomeData } from '@/services/mutualFundsHomeService';

export const useMutualFundsHome = (profileId: string) => {
  const [data, setData] = useState<MutualFundsHomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const apiData = await mutualFundsHomeService.fetchPortfolioAnalysis(profileId);
      const transformedData = mutualFundsHomeService.transformApiData(apiData);
      setData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profileId) {
      fetchDashboardData();
    }
  }, [profileId]);

  const refreshData = () => {
    fetchDashboardData();
  };

  // Helper functions using the service layer
  const getPortfolioHealth = () => {
    if (!data) return 'Unknown';
    return mutualFundsHomeService.getPortfolioHealth(data);
  };

  const getTopPerformingFunds = (limit = 3) => {
    if (!data) return [];
    return mutualFundsHomeService.getTopPerformingFunds(data, limit);
  };

  const getAssetClassBreakdown = () => {
    if (!data) return {};
    return mutualFundsHomeService.getAssetClassBreakdown(data);
  };

  return {
    data,
    isLoading,
    error,
    refreshData,
    getPortfolioHealth,
    getTopPerformingFunds,
    getAssetClassBreakdown,
    isEmpty: !data || data.funds.length === 0,
    isStale: data && data.metadata.dataCompleteness < 100,
  };
};