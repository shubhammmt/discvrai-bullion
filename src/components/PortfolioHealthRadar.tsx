import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Shield, 
  DollarSign, 
  PieChart, 
  Users, 
  Target,
  Gauge
} from 'lucide-react';

interface HealthIndicator {
  id: string;
  title: string;
  status: string;
  score: number;
  icon: React.ComponentType<any>;
  description?: string;
  detailedMetrics?: {
    label: string;
    value: string | number;
    percentage?: number;
  }[];
}

interface PortfolioHealthRadarProps {
  portfolioData: any;
}

const PortfolioHealthRadar = ({ portfolioData }: PortfolioHealthRadarProps) => {
  
  // Calculate health indicators based on portfolio data
  const calculateHealthIndicators = (): HealthIndicator[] => {
    const indicators: HealthIndicator[] = [];

    // 1. Performance Analysis
    const performanceScore = portfolioData.summary.totalGainsPercentage;
    let performanceStatus = 'Poor Returns';
    if (performanceScore >= 15) performanceStatus = 'Strong Returns';
    else if (performanceScore >= 8) performanceStatus = 'Good Returns';
    else if (performanceScore >= 0) performanceStatus = 'Moderate Returns';

    // Find highest and lowest performing funds - handle API data structure
    const fundsByPerformance = portfolioData.funds
      .filter((fund: any) => fund.returns && fund.returns['1Y'] !== null && fund.returns['1Y'] !== undefined)
      .sort((a: any, b: any) => (b.returns['1Y'] || 0) - (a.returns['1Y'] || 0));
    
    const highestPerformer = fundsByPerformance[0] || { name: 'N/A', returns: { '1Y': 0 } };
    const lowestPerformer = fundsByPerformance[fundsByPerformance.length - 1] || { name: 'N/A', returns: { '1Y': 0 } };

    indicators.push({
      id: 'performance',
      title: 'Performance',
      status: performanceStatus,
      score: Math.min(100, Math.max(0, performanceScore * 5)), // Convert to 0-100 scale
      icon: TrendingUp,
      description: `${performanceScore.toFixed(1)}% total gains`,
      detailedMetrics: [
        { label: 'Total Portfolio Gains', value: `${performanceScore.toFixed(1)}%`, percentage: performanceScore },
        { label: 'Best Performer', value: `${highestPerformer.name.substring(0, 25)}...`, percentage: 0 },
        { label: 'Best Performance', value: `+${(highestPerformer.returns['1Y'] || 0).toFixed(1)}%`, percentage: highestPerformer.returns['1Y'] || 0 },
        { label: 'Worst Performer', value: `${lowestPerformer.name.substring(0, 25)}...`, percentage: 0 },
        { label: 'Worst Performance', value: `+${(lowestPerformer.returns['1Y'] || 0).toFixed(1)}%`, percentage: lowestPerformer.returns['1Y'] || 0 },
        { label: 'Portfolio XIRR', value: `${portfolioData.summary.xirr}%`, percentage: portfolioData.summary.xirr }
      ]
    });

    // 2. Risk Assessment - Fixed sync with actual portfolio risk
    const portfolioRiskScore = portfolioData.summary.riskScore || 44; // Use actual risk score from summary
    let riskStatus = 'Low Risk';
    if (portfolioRiskScore >= 70) riskStatus = 'High Risk';
    else if (portfolioRiskScore >= 50) riskStatus = 'Moderate Risk';
    else if (portfolioRiskScore >= 30) riskStatus = 'Low-Moderate Risk';

    indicators.push({
      id: 'risk',
      title: 'Risk',
      status: riskStatus,
      score: 100 - portfolioRiskScore, // Invert so lower risk = higher score
      icon: Shield,
      description: `Risk score: ${portfolioRiskScore}/100`,
      detailedMetrics: [
        { label: 'Portfolio Risk Score', value: `${portfolioRiskScore}/100`, percentage: portfolioRiskScore },
        { label: 'Portfolio Beta', value: (portfolioData.performance?.metrics?.beta || 0).toFixed(2), percentage: (portfolioData.performance?.metrics?.beta || 0) * 50 },
        { label: 'Volatility (Std Dev)', value: `${portfolioData.performance?.metrics?.standardDeviation || 0}%`, percentage: portfolioData.performance?.metrics?.standardDeviation || 0 },
        { label: 'Max Drawdown', value: `${portfolioData.performance?.metrics?.maxDrawdown || 0}%`, percentage: portfolioData.performance?.metrics?.maxDrawdown || 0 },
        { label: 'Sharpe Ratio', value: (portfolioData.performance?.metrics?.sharpeRatio || 0).toFixed(2), percentage: (portfolioData.performance?.metrics?.sharpeRatio || 0) * 100 }
      ]
    });

    // 3. Expense Analysis
    const avgExpenseRatio = portfolioData.funds.reduce((sum: number, fund: any) => 
      sum + fund.expenseRatio, 0) / portfolioData.funds.length;
    let expenseStatus = 'High Expenses';
    if (avgExpenseRatio <= 1.0) expenseStatus = 'Low Expenses';
    else if (avgExpenseRatio <= 1.5) expenseStatus = 'Moderate Expenses';
    else if (avgExpenseRatio <= 2.0) expenseStatus = 'Above Average Expenses';

    // Find funds with highest expense ratios
    const fundsByExpense = portfolioData.funds.sort((a: any, b: any) => b.expenseRatio - a.expenseRatio);
    const highExpenseFunds = fundsByExpense.slice(0, 3);

    indicators.push({
      id: 'expenses',
      title: 'Expenses',
      status: expenseStatus,
      score: Math.max(0, 100 - (avgExpenseRatio * 40)), // Convert to score
      icon: DollarSign,
      description: `Avg expense ratio: ${avgExpenseRatio.toFixed(2)}%`,
      detailedMetrics: [
        { label: 'Average Expense Ratio', value: `${avgExpenseRatio.toFixed(2)}%`, percentage: avgExpenseRatio * 20 },
        ...highExpenseFunds.map((fund: any) => ({
          label: `${fund.name.substring(0, 20)}...`,
          value: `${fund.expenseRatio}%`,
          percentage: fund.expenseRatio * 20
        })),
        { label: 'Direct vs Regular Impact', value: 'See Plan Types', percentage: 0 }
      ]
    });

    // 4. Portfolio Mix - Handle empty allocation data
    const hasAllocationData = portfolioData.allocation?.assetClass && 
                             Object.keys(portfolioData.allocation.assetClass).length > 0;
    
    let mixStatus = 'Data Unavailable';
    let mixScore = 50; // Default score when no data
    let equityAllocation = 0;
    let targetEquity = 0;
    
    if (hasAllocationData) {
      const assetClasses = Object.entries(portfolioData.allocation.assetClass);
      const equityAsset = assetClasses.find(([name, _]: [string, any]) => 
        name.toLowerCase().includes('equity')
      );
      
      if (equityAsset) {
        const [_, data] = equityAsset as [string, any];
        equityAllocation = data.current || 0;
        targetEquity = data.target || 0;
        const allocationDiff = Math.abs(equityAllocation - targetEquity);
        
        if (allocationDiff <= 5) mixStatus = 'Optimal Mix';
        else if (allocationDiff <= 10) mixStatus = 'Well Balanced';
        else if (allocationDiff <= 15) mixStatus = 'Needs Rebalancing';
        else mixStatus = 'Poor Balance';
        
        mixScore = Math.max(0, 100 - (allocationDiff * 5));
      } else {
        mixStatus = 'Balanced Mix'; // Default when no equity data
        mixScore = 70;
      }
    }

    indicators.push({
      id: 'portfolio_mix',
      title: 'Portfolio Mix',
      status: mixStatus,
      score: mixScore,
      icon: PieChart,
      description: hasAllocationData ? 
        `${equityAllocation}% equity (target: ${targetEquity}%)` : 
        'Mix analysis pending allocation data'
    });

    // 5. Management Quality - Use available data or defaults
    const fundHouses = [...new Set(portfolioData.funds.map((fund: any) => fund.amc))];
    const knownFundHouses = fundHouses.filter((house: string) => house !== 'Unknown').length;
    const totalFundHouses = fundHouses.length;
    
    // Calculate management score based on fund house reputation and data availability
    const managementScore = Math.min(100, (knownFundHouses / totalFundHouses) * 100);
    
    let managementStatus = 'Limited Data';
    if (managementScore >= 80) managementStatus = 'Reputed Houses';
    else if (managementScore >= 60) managementStatus = 'Mixed Quality';
    else if (managementScore >= 40) managementStatus = 'Needs Review';

    indicators.push({
      id: 'management',
      title: 'Management',
      status: managementStatus,
      score: managementScore,
      icon: Users,
      description: `${knownFundHouses}/${totalFundHouses} known fund houses`
    });

    // 6. Suitability (from API data if available)
    const fundsWithSuitability = portfolioData.funds.filter((f: any) => f.suitabilityScore);
    const avgSuitability = fundsWithSuitability.length > 0 ? 
      fundsWithSuitability.reduce((sum: number, fund: any) => sum + fund.suitabilityScore, 0) / fundsWithSuitability.length : 
      50;

    let suitabilityStatus = 'Poor Fit';
    if (avgSuitability >= 70) suitabilityStatus = 'Excellent Fit';
    else if (avgSuitability >= 50) suitabilityStatus = 'Good Fit';
    else if (avgSuitability >= 30) suitabilityStatus = 'Neutral Fit';

    indicators.push({
      id: 'suitability',
      title: 'Suitability',
      status: suitabilityStatus,
      score: avgSuitability,
      icon: Target,
      description: `Avg suitability: ${avgSuitability.toFixed(0)}/100`
    });

    return indicators;
  };

  const healthIndicators = calculateHealthIndicators();

  // Calculate overall health score
  const overallHealthScore = Math.round(
    healthIndicators.reduce((sum, indicator) => sum + indicator.score, 0) / healthIndicators.length
  );

  const getStatusColor = (score: number) => {
    if (score >= 70) return 'bg-green-100 border-green-200 text-green-800';
    if (score >= 50) return 'bg-blue-100 border-blue-200 text-blue-800';
    if (score >= 30) return 'bg-yellow-100 border-yellow-200 text-yellow-800';
    return 'bg-red-100 border-red-200 text-red-800';
  };

  const getIconColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    if (score >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getOverallHealthLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Needs Attention';
    return 'Poor';
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Portfolio Health Radar</CardTitle>
            <p className="text-sm text-slate-300">
              A comprehensive at-a-glance view of key portfolio health indicators
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-slate-300">Overall Health</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-white">{overallHealthScore}/100</div>
              <Badge 
                variant="outline" 
                className={`text-xs ${getStatusColor(overallHealthScore)} bg-opacity-20`}
              >
                {getOverallHealthLabel(overallHealthScore)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          {healthIndicators.map((indicator) => {
            const IconComponent = indicator.icon;
            return (
              <HoverCard key={indicator.id}>
                <HoverCardTrigger asChild>
                  <div
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer ${getStatusColor(indicator.score)}`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <IconComponent className={`w-6 h-6 ${getIconColor(indicator.score)}`} />
                      <div>
                        <h3 className="font-semibold text-sm">{indicator.title}</h3>
                        <p className="text-xs font-medium">{indicator.status}</p>
                        <div className="mt-1">
                          <div className="text-xs font-bold">{indicator.score.toFixed(0)}/100</div>
                          <Progress 
                            value={indicator.score} 
                            className="h-1 mt-1 bg-white/20" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                
                <HoverCardContent className="w-80 bg-card text-foreground">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className={`w-4 h-4 ${getIconColor(indicator.score)}`} />
                      <h4 className="font-semibold">{indicator.title}</h4>
                      <Badge variant="outline" className={getStatusColor(indicator.score)}>
                        {indicator.score.toFixed(0)}/100
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{indicator.description}</p>
                    
                    {indicator.detailedMetrics && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Detailed Breakdown:</h5>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {indicator.detailedMetrics.map((metric, index) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{metric.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{metric.value}</span>
                                {metric.percentage && (
                                  <div className="w-12 h-1 bg-muted rounded">
                                    <div 
                                      className="h-full bg-primary rounded transition-all"
                                      style={{ width: `${Math.min(100, metric.percentage)}%` }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
        
        <div className="text-xs text-slate-400 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
          Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioHealthRadar;