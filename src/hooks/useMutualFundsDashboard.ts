import { useState, useEffect } from 'react';

interface APIResponse {
  summary: {
    total_value: number;
    total_investment: number;
    total_gains: number;
    total_gains_percentage: number;
    xirr: number;
    current_nav: number;
    risk_rating: string;
    risk_score: number;
  };
  performance: {
    benchmarkComparison: {
      [period: string]: {
        portfolio: number;
        benchmark: number;
        nifty50: number;
      };
    };
    metrics: {
      sharpeRatio: number;
      beta: number;
      alpha: number;
      standardDeviation: number;
      informationRatio: number;
      maxDrawdown: number;
      rSquared: number;
    };
  };
  allocation: {
    assetClass: Record<string, any>;
    sectors: Record<string, any>;
    marketCap: Record<string, any>;
  };
  funds: Array<{
    id: string;
    name: string;
    category: string;
    scheme: string;
    currentValue: number;
    returns: {
      "1Y": number | null;
      "3Y": number | null;
      "5Y": number | null;
    };
    expenseRatio: number;
    recommendation: string;
    suitabilityScore: number;
    suitabilityBreakdown: {
      performance: number;
      cost: number;
      experience: number;
      scale: number;
    };
    insights: Array<{
      type: string;
      message: string;
    }>;
    amc: string;
    planType: string;
    trend: string;
    riskLevel: string;
  }>;
  analytics: {
    riskProfile: string;
    diversificationScore: number;
    qualityScore: number;
    rebalancingNeeded: boolean;
  };
  metadata: {
    lastUpdated: string;
    totalFunds: number;
    userId: string;
    dataCompleteness: number;
    analysis_timestamp: string;
    analysis_version: string;
    include_historical: boolean;
    include_peer_comparison: boolean;
  };
}

interface TransformedData {
  summary: {
    totalValue: number;
    totalInvestment: number;
    totalGains: number;
    totalGainsPercentage: number;
    xirr: number;
    currentNAV: number;
    riskRating: string;
    riskScore: number;
  };
  performance: {
    benchmarkComparison: APIResponse['performance']['benchmarkComparison'];
    metrics: APIResponse['performance']['metrics'];
  };
  allocation: APIResponse['allocation'];
  funds: APIResponse['funds'];
  analytics: APIResponse['analytics'];
  metadata: APIResponse['metadata'];
}

export const useMutualFundsDashboard = (profileId: string) => {
  const [data, setData] = useState<TransformedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Replace with your actual API endpoint
      const response = await fetch(`/api/portfolio/dashboard?profileId=${profileId}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const apiData: APIResponse = await response.json();

      // Transform the API response to match component expectations
      const transformedData: TransformedData = {
        summary: {
          totalValue: apiData.summary.total_value,
          totalInvestment: apiData.summary.total_investment,
          totalGains: apiData.summary.total_gains,
          totalGainsPercentage: apiData.summary.total_gains_percentage,
          xirr: apiData.summary.xirr,
          currentNAV: apiData.summary.current_nav,
          riskRating: apiData.summary.risk_rating,
          riskScore: apiData.summary.risk_score,
        },
        performance: apiData.performance,
        allocation: apiData.allocation,
        funds: apiData.funds,
        analytics: apiData.analytics,
        metadata: apiData.metadata,
      };

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

  // Helper functions for data processing
  const getPortfolioHealth = () => {
    if (!data) return 'Unknown';
    
    const { analytics, summary } = data;
    const healthFactors = [
      analytics.diversificationScore >= 70,
      analytics.qualityScore >= 75,
      summary.totalGainsPercentage >= 0,
      summary.xirr >= 12,
    ];
    
    const healthScore = (healthFactors.filter(Boolean).length / healthFactors.length) * 100;
    
    if (healthScore >= 80) return 'Excellent';
    if (healthScore >= 60) return 'Good';
    if (healthScore >= 40) return 'Average';
    return 'Needs Attention';
  };

  const getTopPerformingFunds = (limit = 3) => {
    if (!data?.funds) return [];
    
    return data.funds
      .filter(fund => fund.returns['1Y'] && fund.returns['1Y'] > 0)
      .sort((a, b) => (b.returns['1Y'] || 0) - (a.returns['1Y'] || 0))
      .slice(0, limit);
  };

  const getAssetClassBreakdown = () => {
    if (!data?.funds) return {};
    
    const breakdown: Record<string, { value: number; percentage: number }> = {};
    const totalValue = data.summary.totalValue;
    
    data.funds.forEach(fund => {
      const assetClass = fund.category === 'Aggressive Hybrid Fund' ? 'Hybrid' : 
                        fund.category === 'Index Fund' ? 'Equity' : 'Other';
      
      if (!breakdown[assetClass]) {
        breakdown[assetClass] = { value: 0, percentage: 0 };
      }
      
      breakdown[assetClass].value += fund.currentValue;
    });
    
    Object.keys(breakdown).forEach(key => {
      breakdown[key].percentage = totalValue > 0 ? 
        (breakdown[key].value / totalValue) * 100 : 0;
    });
    
    return breakdown;
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