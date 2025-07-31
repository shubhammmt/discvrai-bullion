import { useState, useEffect } from 'react';
import { mutualFundsService, TransformedMutualFundsData } from '@/services/mutualFundsService';
import { ApiError } from '@/services/api';

export const useMutualFundsDashboard = (profileId: string) => {
  const [data, setData] = useState<TransformedMutualFundsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const apiData = await mutualFundsService.getPortfolioAnalysis(profileId, {
        includeHistorical: false,
        includePeerComparison: true
      });

      const transformedData = mutualFundsService.transformApiData(apiData);
      setData(transformedData);
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? `API Error (${err.status}): ${err.message}`
        : err instanceof Error 
        ? err.message 
        : 'Failed to fetch dashboard data';
      
      setError(errorMessage);
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
    return mutualFundsService.getPortfolioHealth(data);
  };

  const getTopPerformingFunds = (limit = 3) => {
    if (!data) return [];
    return mutualFundsService.getTopPerformingFunds(data, limit);
  };

  const getAssetClassBreakdown = () => {
    if (!data) return {};
    return mutualFundsService.getAssetClassBreakdown(data);
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