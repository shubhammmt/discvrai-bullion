import { useState, useCallback, useEffect } from 'react';

export interface NetWorthData {
  totalAssets: number;
  totalLiabilities: number;
  netWorthValue: number;
  monthlyChange: number;
  yearlyGrowth: number;
}

export interface AssetData {
  investments: {
    equity: number;
    debt: number;
    gold: number;
    realEstate: number;
    alternatives: number;
  };
  cash: {
    savings: number;
    fixedDeposits: number;
    emergency: number;
  };
}

export interface LiabilityData {
  homeLoan: { amount: number; emi: number; rate: number };
  creditCards: { used: number; limit: number; utilization: number };
  personalLoan: { amount: number; emi: number; rate: number };
}

export interface ProtectionData {
  lifeInsurance: number;
  healthInsurance: number;
  termInsurance: number;
}

export interface FinancialGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  targetDate: Date;
  linkedInvestments?: string[];
}

export interface FinancialInsight {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
  category: 'debt' | 'investment' | 'protection' | 'tax' | 'goal';
}

export interface PerformanceData {
  xirr: number;
  returns: {
    '1D': { value: number; percentage: number };
    '1W': { value: number; percentage: number };
    '1M': { value: number; percentage: number };
    '3M': { value: number; percentage: number };
    '1Y': { value: number; percentage: number };
  };
}

export interface ComprehensivePortfolioData {
  netWorth: NetWorthData;
  assets: AssetData;
  liabilities: LiabilityData;
  protection: ProtectionData;
  goals: FinancialGoal[];
  insights: FinancialInsight[];
  performance: PerformanceData;
  financialHealthScore: {
    overall: number;
    wealthBuilding: number;
    debtManagement: number;
    protection: number;
    liquidity: number;
    goalProgress: number;
  };
}

export const useComprehensivePortfolio = (profileId?: string) => {
  const [portfolioData, setPortfolioData] = useState<ComprehensivePortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Calculate wealth segment based on net worth
  const getWealthSegment = useCallback((netWorth: number): 'Mass' | 'Emerging' | 'HNW' => {
    if (netWorth > 5000000) return 'HNW';
    if (netWorth > 500000) return 'Emerging';
    return 'Mass';
  }, []);

  // Calculate financial health score
  const calculateFinancialHealthScore = useCallback((data: Partial<ComprehensivePortfolioData>) => {
    if (!data.netWorth || !data.assets || !data.liabilities || !data.goals) {
      return {
        overall: 0,
        wealthBuilding: 0,
        debtManagement: 0,
        protection: 0,
        liquidity: 0,
        goalProgress: 0
      };
    }

    // Wealth Building Score (based on asset allocation and growth)
    const totalInvestments = Object.values(data.assets.investments).reduce((a, b) => a + b, 0);
    const investmentRatio = totalInvestments / data.netWorth.totalAssets;
    const wealthBuilding = Math.min(100, investmentRatio * 100);

    // Debt Management Score (based on debt-to-income and utilization)
    const creditUtilization = data.liabilities.creditCards.utilization;
    const debtToAssets = data.netWorth.totalLiabilities / data.netWorth.totalAssets;
    const debtManagement = Math.max(0, 100 - (creditUtilization + debtToAssets * 50));

    // Protection Score (based on insurance coverage)
    const totalProtection = data.protection?.lifeInsurance || 0 + data.protection?.healthInsurance || 0;
    const protectionRatio = totalProtection / data.netWorth.totalAssets;
    const protection = Math.min(100, protectionRatio * 20);

    // Liquidity Score (based on emergency fund and liquid assets)
    const liquidAssets = Object.values(data.assets.cash).reduce((a, b) => a + b, 0);
    const monthlyExpenses = 50000; // Mock value - should come from user data
    const emergencyMonths = liquidAssets / monthlyExpenses;
    const liquidity = Math.min(100, (emergencyMonths / 6) * 100);

    // Goal Progress Score
    const avgGoalProgress = data.goals.reduce((sum, goal) => sum + goal.progress, 0) / data.goals.length;
    const goalProgress = avgGoalProgress;

    // Overall score (weighted average)
    const overall = (
      wealthBuilding * 0.25 +
      debtManagement * 0.25 +
      protection * 0.2 +
      liquidity * 0.15 +
      goalProgress * 0.15
    );

    return {
      overall: Math.round(overall),
      wealthBuilding: Math.round(wealthBuilding),
      debtManagement: Math.round(debtManagement),
      protection: Math.round(protection),
      liquidity: Math.round(liquidity),
      goalProgress: Math.round(goalProgress)
    };
  }, []);

  // Generate financial insights based on portfolio data
  const generateInsights = useCallback((data: ComprehensivePortfolioData): FinancialInsight[] => {
    const insights: FinancialInsight[] = [];

    // Credit card utilization check
    if (data.liabilities.creditCards.utilization > 30) {
      insights.push({
        id: 'high-credit-utilization',
        type: 'warning',
        message: `Credit card utilization is ${data.liabilities.creditCards.utilization}%. Consider paying down balances to improve credit score.`,
        priority: 'high',
        actionRequired: true,
        category: 'debt'
      });
    }

    // Emergency fund check
    const liquidAssets = Object.values(data.assets.cash).reduce((a, b) => a + b, 0);
    const monthlyExpenses = 50000; // Mock value
    if (liquidAssets < monthlyExpenses * 6) {
      insights.push({
        id: 'low-emergency-fund',
        type: 'info',
        message: 'Emergency fund is below 6 months of expenses. Consider increasing your liquid savings.',
        priority: 'medium',
        actionRequired: true,
        category: 'investment'
      });
    }

    // Asset allocation check
    const totalInvestments = Object.values(data.assets.investments).reduce((a, b) => a + b, 0);
    const equityPercentage = (data.assets.investments.equity / totalInvestments) * 100;
    if (equityPercentage > 80) {
      insights.push({
        id: 'high-equity-allocation',
        type: 'warning',
        message: `Equity allocation is ${equityPercentage.toFixed(1)}%. Consider rebalancing for better risk management.`,
        priority: 'medium',
        actionRequired: false,
        category: 'investment'
      });
    }

    // Insurance coverage check
    if (data.protection.lifeInsurance < data.netWorth.totalAssets * 10) {
      insights.push({
        id: 'low-life-insurance',
        type: 'info',
        message: 'Life insurance coverage may be insufficient. Consider increasing coverage to 10-15x of annual income.',
        priority: 'medium',
        actionRequired: false,
        category: 'protection'
      });
    }

    // Goal progress check
    const highPriorityGoals = data.goals.filter(goal => goal.priority === 'high' && goal.progress < 50);
    if (highPriorityGoals.length > 0) {
      insights.push({
        id: 'behind-goals',
        type: 'warning',
        message: `You're behind on ${highPriorityGoals.length} high-priority goals. Consider increasing allocations.`,
        priority: 'high',
        actionRequired: true,
        category: 'goal'
      });
    }

    // Positive insights
    if (data.performance.xirr > 12) {
      insights.push({
        id: 'good-performance',
        type: 'success',
        message: `Excellent portfolio performance with ${data.performance.xirr}% XIRR, beating market benchmarks.`,
        priority: 'low',
        actionRequired: false,
        category: 'investment'
      });
    }

    return insights;
  }, []);

  // Load portfolio data
  const loadPortfolioData = useCallback(async (forceRefresh = false) => {
    if (!profileId) return;

    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // For now, using mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      const mockData: ComprehensivePortfolioData = {
        netWorth: {
          totalAssets: 1550000,
          totalLiabilities: 850000,
          netWorthValue: 700000,
          monthlyChange: 25000,
          yearlyGrowth: 12.5
        },
        assets: {
          investments: {
            equity: 600000,
            debt: 300000,
            gold: 150000,
            realEstate: 150000,
            alternatives: 50000
          },
          cash: {
            savings: 200000,
            fixedDeposits: 100000,
            emergency: 50000
          }
        },
        liabilities: {
          homeLoan: { amount: 700000, emi: 45000, rate: 8.5 },
          creditCards: { used: 80000, limit: 200000, utilization: 40 },
          personalLoan: { amount: 70000, emi: 8500, rate: 12.5 }
        },
        protection: {
          lifeInsurance: 5000000,
          healthInsurance: 1000000,
          termInsurance: 10000000
        },
        goals: [
          {
            id: '1',
            name: 'Child Education',
            current: 650000,
            target: 1000000,
            progress: 65,
            priority: 'high',
            targetDate: new Date('2030-06-01')
          },
          {
            id: '2',
            name: 'Home Down Payment',
            current: 800000,
            target: 1000000,
            progress: 80,
            priority: 'high',
            targetDate: new Date('2025-12-01')
          },
          {
            id: '3',
            name: 'Retirement',
            current: 250000,
            target: 1000000,
            progress: 25,
            priority: 'medium',
            targetDate: new Date('2050-01-01')
          }
        ],
        insights: [],
        performance: {
          xirr: 15.2,
          returns: {
            '1D': { value: 2500, percentage: 0.36 },
            '1W': { value: 8500, percentage: 1.2 },
            '1M': { value: 25000, percentage: 3.6 },
            '3M': { value: 45000, percentage: 6.4 },
            '1Y': { value: 85000, percentage: 12.5 }
          }
        },
        financialHealthScore: {
          overall: 0,
          wealthBuilding: 0,
          debtManagement: 0,
          protection: 0,
          liquidity: 0,
          goalProgress: 0
        }
      };

      // Calculate financial health score
      mockData.financialHealthScore = calculateFinancialHealthScore(mockData);

      // Generate insights
      mockData.insights = generateInsights(mockData);

      setPortfolioData(mockData);
      setLastUpdated(new Date());

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load portfolio data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [profileId, calculateFinancialHealthScore, generateInsights]);

  // Format currency with Indian convention
  const formatCurrency = useCallback((amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount.toLocaleString('en-IN')}`;
  }, []);

  // Auto-refresh data
  useEffect(() => {
    if (profileId) {
      loadPortfolioData();
    }
  }, [profileId, loadPortfolioData]);

  return {
    portfolioData,
    isLoading,
    error,
    lastUpdated,
    loadPortfolioData,
    formatCurrency,
    getWealthSegment: portfolioData ? getWealthSegment(portfolioData.netWorth.netWorthValue) : 'Mass',
    calculateFinancialHealthScore,
    generateInsights
  };
};