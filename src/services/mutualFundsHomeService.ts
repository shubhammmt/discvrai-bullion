// Dedicated service for MutualFundsHome page
const API_CONFIG = {
  BASE_URL: 'https://p646lccs-8008.inc1.devtunnels.ms',
  BEARER_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbGllbnRfdW85dnUwOTZ1MXNiaWk1biIsImNsaWVudF9pZCI6ImNsaWVudF91bzl2dTA5NnUxc2JpaTVuIiwiY2xpZW50X25hbWUiOiJUZXN0IEJvdCBBUEkgQ2xpZW50IDciLCJzY29wZXMiOlsicmVhZDpjb21wYW5pZXMiLCJyZWFkOnByaWNlcyIsInJlYWQ6ZmluYW5jaWFscyIsInJlYWQ6bWFya2V0IiwicmVhZDpjcnlwdG8iLCJyZWFkOm5ld3MiLCJyZWFkOmVhcm5pbmdzIiwicmVhZDphbmFseXRpY3MiLCJyZWFkOnRlY2huaWNhbCIsInJlYWQ6ZnVuZGFtZW50YWxzIiwicmVhZDphaV9pbnNpZ2h0cyIsInJlYWQ6cmF0aW5ncyIsInJlYWQ6c2VnbWVudHMiXSwidG9rZW5fdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsImV4cCI6MTgxMjMxMzIzNiwiaWF0IjoxNzUyMzEzMjk2LCJpc3MiOiJkaXNjdnItZmluYW5jZS1hcGkifQ.nmSVBYbAv_2xy4kQ6sSLE07xPiygI2oeSWrOELJVPTU'
};

// Types specific to MutualFundsHome
export interface MutualFundsHomeAPIResponse {
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

export interface MutualFundsHomeData {
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
  performance: MutualFundsHomeAPIResponse['performance'];
  allocation: MutualFundsHomeAPIResponse['allocation'];
  funds: MutualFundsHomeAPIResponse['funds'];
  analytics: MutualFundsHomeAPIResponse['analytics'];
  metadata: MutualFundsHomeAPIResponse['metadata'];
}

class MutualFundsHomeService {
  async fetchPortfolioAnalysis(profileId: string): Promise<MutualFundsHomeAPIResponse> {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/api/v1/analysis/portfolio/${profileId}?include_historical=false&include_peer_comparison=true`,
      {
        headers: {
          'Authorization': `Bearer ${API_CONFIG.BEARER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  transformApiData(apiData: MutualFundsHomeAPIResponse): MutualFundsHomeData {
    return {
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
  }

  getPortfolioHealth(data: MutualFundsHomeData): string {
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
  }

  getTopPerformingFunds(data: MutualFundsHomeData, limit = 3) {
    if (!data?.funds) return [];
    
    return data.funds
      .filter(fund => fund.returns['1Y'] && fund.returns['1Y'] > 0)
      .sort((a, b) => (b.returns['1Y'] || 0) - (a.returns['1Y'] || 0))
      .slice(0, limit);
  }

  getAssetClassBreakdown(data: MutualFundsHomeData) {
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
  }
}

export const mutualFundsHomeService = new MutualFundsHomeService();
export default mutualFundsHomeService;