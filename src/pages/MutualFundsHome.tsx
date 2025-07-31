import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Download, 
  AlertCircle,
  IndianRupee,
  Brain,
  CheckCircle,
  Info,
  RefreshCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PortfolioHealthRadar from '@/components/PortfolioHealthRadar';
import PortfolioSummary from '@/components/portfolio/PortfolioSummary';
import PerformanceAnalysis from '@/components/portfolio/PerformanceAnalysis';
import PortfolioComposition from '@/components/portfolio/PortfolioComposition';
import RebalancingRecommendations from '@/components/portfolio/RebalancingRecommendations';
import SimplifiedFundAnalysis from '@/components/portfolio/SimplifiedFundAnalysis';
import { useMutualFundsDashboard } from '@/hooks/useMutualFundsDashboard';

const MutualFundsHome = () => {
  const navigate = useNavigate();
  const userId = "af5a21a3-ed71-471c-885a-7415f6906f68";
  const { data: portfolioData, isLoading, error, refreshData } = useMutualFundsDashboard(userId);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'INCREASE': return 'bg-green-100 text-green-800 border-green-200';
      case 'MAINTAIN': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'REDUCE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hold': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <Info className="w-4 h-4 text-blue-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCcw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-lg font-medium">Loading your portfolio data...</p>
              <p className="text-sm text-muted-foreground">This may take a few moments</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <Alert className="border-red-200 bg-red-50 dark:bg-red-950">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>Error loading portfolio data:</strong> {error}
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-4"
                onClick={refreshData}
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No portfolio data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Transform API data to match component expectations
  const transformedAllocation = {
    assetClass: portfolioData.allocation.assetClass ? 
      Object.entries(portfolioData.allocation.assetClass).map(([name, data]: [string, any]) => ({
        name,
        value: data.current || 0,
        target: data.target || 0,
        color: data.color || '#3B82F6'
      })) : [],
    sectors: portfolioData.allocation.sectors ? 
      Object.entries(portfolioData.allocation.sectors).map(([name, data]: [string, any]) => ({
        name,
        value: data.percentage || 0,
        color: data.color || '#3B82F6'
      })) : [],
    marketCap: portfolioData.allocation.marketCap ? 
      Object.entries(portfolioData.allocation.marketCap).map(([name, data]: [string, any]) => ({
        name,
        value: data.percentage || 0,
        color: data.color || '#3B82F6'
      })) : []
  };

  const transformedFunds = portfolioData.funds.map((fund, index) => ({
    id: index + 1, // Convert string ID to number
    name: fund.name,
    category: fund.category,
    scheme: fund.scheme,
    currentValue: fund.currentValue,
    gainsPercentage: fund.returns['1Y'] || 0,
    expenseRatio: fund.expenseRatio,
    returns: {
      '1Y': fund.returns['1Y'] || 0,
      '3Y': fund.returns['3Y'] || 0,
      '5Y': fund.returns['5Y'] || 0
    },
    suitability_score: {
      final_score: fund.suitabilityScore,
      category: fund.suitabilityScore >= 70 ? 'Good' : fund.suitabilityScore >= 40 ? 'Neutral' : 'Poor',
      sub_scores: {
        one_year_return: fund.suitabilityBreakdown?.performance || 0,
        expense_ratio: fund.suitabilityBreakdown?.cost || 0,
        manager_tenure: fund.suitabilityBreakdown?.experience || 0,
        aum: fund.suitabilityBreakdown?.scale || 0
      },
      metrics_used: {
        one_year_return: fund.returns['1Y'] || 0,
        expense_ratio: fund.expenseRatio,
        manager_tenure_years: 5, // Default value
        aum_crore: 1000 // Default value
      }
    },
    recommendation: fund.recommendation,
    insights: fund.insights || []
  }));

  const transformedFundsForComposition = portfolioData.funds.map((fund) => ({
    category: fund.category,
    scheme: fund.scheme,
    currentValue: fund.currentValue
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Portfolio Analysis Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              {portfolioData.funds.length} funds • {formatCurrency(portfolioData.summary.totalValue)} total value • Risk Score: {portfolioData.summary.riskScore}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshData}>
              <RefreshCcw className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Refresh</span>
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Export Report</span>
            </Button>
            <Button size="sm" onClick={() => navigate('/mutual-fund-research')}>
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Add Fund</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Portfolio Summary */}
        <PortfolioSummary 
          summary={portfolioData.summary} 
          formatCurrency={formatCurrency} 
        />

        {/* Portfolio Health Radar */}
        <PortfolioHealthRadar portfolioData={portfolioData} />

        {/* Portfolio Health Alert */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <Brain className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Portfolio Health Summary:</strong> Your portfolio shows a <strong>{portfolioData.summary.riskRating.toLowerCase()} risk profile</strong> with 
            {portfolioData.summary.totalGainsPercentage > 0 ? ' positive' : ' negative'} returns of {portfolioData.summary.totalGainsPercentage.toFixed(1)}%. 
            Diversification Score: {portfolioData.analytics.diversificationScore}/100, Quality Score: {portfolioData.analytics.qualityScore}/100.
            {portfolioData.analytics.rebalancingNeeded && ' Consider rebalancing your portfolio for optimal performance.'}
          </AlertDescription>
        </Alert>

        {/* Performance Analysis */}
        <PerformanceAnalysis 
          benchmarkComparison={{
            portfolio: Object.fromEntries(
              Object.entries(portfolioData.performance.benchmarkComparison).map(([period, values]) => [period, values.portfolio])
            ),
            benchmark: Object.fromEntries(
              Object.entries(portfolioData.performance.benchmarkComparison).map(([period, values]) => [period, values.benchmark])
            ),
            nifty50: Object.fromEntries(
              Object.entries(portfolioData.performance.benchmarkComparison).map(([period, values]) => [period, values.nifty50])
            )
          }}
          metrics={{
            ...portfolioData.performance.metrics,
            treynorRatio: 0, // Default value as not available in API
            portfolioTurnover: 0 // Default value as not available in API
          }}
        />

        {/* Analysis Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strengths */}
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Strengths
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Strong diversification across {portfolioData.funds.length} funds with quality fund houses</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Balanced risk profile with moderate risk rating ({portfolioData.summary.riskRating})</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Good diversification score of {portfolioData.analytics.diversificationScore}/100</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Strong XIRR of {portfolioData.summary.xirr}% indicating good long-term returns</span>
                  </div>
                </div>
              </div>

              {/* Areas of Concern */}
              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Areas of Concern
                </h3>
                <div className="space-y-3">
                  {portfolioData.summary.totalGainsPercentage < 0 && (
                    <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Portfolio showing negative returns of {portfolioData.summary.totalGainsPercentage.toFixed(1)}%</span>
                    </div>
                  )}
                  {portfolioData.analytics.rebalancingNeeded && (
                    <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Portfolio rebalancing recommended for optimal allocation</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Monitor fund performance regularly and consider switching underperforming funds</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actionable Recommendations */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Actionable Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</div>
                  <span className="text-sm">Monitor portfolio regularly and maintain current allocation balance</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</div>
                  <span className="text-sm">Consider switching from Regular to Direct plans to reduce expense ratios</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</div>
                  <span className="text-sm">Review and rebalance portfolio quarterly based on market conditions</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">4</div>
                  <span className="text-sm">Consider adding more mid-cap exposure for better diversification</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Composition */}
        <PortfolioComposition 
          allocation={transformedAllocation}
          funds={transformedFundsForComposition}
        />

        {/* Rebalancing & Recommendations */}
        <RebalancingRecommendations
          allocation={transformedAllocation}
          funds={transformedFunds.map((fund, index) => ({
            name: `${fund.name} (ID: ${fund.id})`, // Make names unique
            recommendation: fund.recommendation,
            recommendationReason: `Based on performance metrics and risk assessment`,
            currentValue: fund.currentValue,
            gainsPercentage: fund.gainsPercentage,
            expenseRatio: fund.expenseRatio,
            scheme: fund.scheme
          }))}
          formatCurrency={formatCurrency}
        />

        {/* Individual Fund Analysis */}
        <SimplifiedFundAnalysis
          funds={transformedFunds}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
};

export default MutualFundsHome;