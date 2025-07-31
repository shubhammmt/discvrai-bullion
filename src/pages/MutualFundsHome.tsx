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

        {/* Funds Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-green-600" />
              Fund Holdings ({portfolioData.funds.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData.funds.map((fund) => (
                <div key={fund.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{fund.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{fund.category}</Badge>
                        <Badge variant="outline">{fund.scheme}</Badge>
                        <span className="text-xs">{fund.amc}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatCurrency(fund.currentValue)}</p>
                      <Badge className={getRecommendationColor(fund.recommendation)}>
                        {fund.recommendation}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">1Y Return</p>
                      <p className="font-medium flex items-center gap-1">
                        {fund.returns['1Y'] ? (
                          <>
                            {fund.returns['1Y'] > 0 ? (
                              <TrendingUp className="w-3 h-3 text-green-600" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-600" />
                            )}
                            {fund.returns['1Y'].toFixed(1)}%
                          </>
                        ) : (
                          'N/A'
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">3Y Return</p>
                      <p className="font-medium">
                        {fund.returns['3Y'] ? `${fund.returns['3Y'].toFixed(1)}%` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expense Ratio</p>
                      <p className="font-medium">{fund.expenseRatio}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Suitability</p>
                      <p className="font-medium">{fund.suitabilityScore}/100</p>
                    </div>
                  </div>

                  {fund.insights && fund.insights.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {fund.insights.map((insight, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs bg-muted p-2 rounded">
                            {getInsightIcon(insight.type)}
                            <span>{insight.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              Portfolio Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{portfolioData.analytics.riskProfile}</div>
                <p className="text-sm text-muted-foreground">Risk Profile</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{portfolioData.analytics.diversificationScore}/100</div>
                <p className="text-sm text-muted-foreground">Diversification Score</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{portfolioData.analytics.qualityScore}/100</div>
                <p className="text-sm text-muted-foreground">Quality Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MutualFundsHome;