import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Shield, 
  DollarSign, 
  PieChart, 
  Users, 
  Target 
} from 'lucide-react';

interface HealthIndicator {
  id: string;
  title: string;
  status: string;
  score: number;
  icon: React.ComponentType<any>;
  description?: string;
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

    indicators.push({
      id: 'performance',
      title: 'Performance',
      status: performanceStatus,
      score: Math.min(100, Math.max(0, performanceScore * 5)), // Convert to 0-100 scale
      icon: TrendingUp,
      description: `${performanceScore.toFixed(1)}% total gains`
    });

    // 2. Risk Assessment
    const riskScore = portfolioData.summary.riskScore;
    let riskStatus = 'Low Risk';
    if (riskScore >= 70) riskStatus = 'High Risk';
    else if (riskScore >= 50) riskStatus = 'Moderate Risk';
    else if (riskScore >= 30) riskStatus = 'Low-Moderate Risk';

    indicators.push({
      id: 'risk',
      title: 'Risk',
      status: riskStatus,
      score: 100 - riskScore, // Invert so lower risk = higher score
      icon: Shield,
      description: `Risk score: ${riskScore}/100`
    });

    // 3. Expense Analysis
    const avgExpenseRatio = portfolioData.funds.reduce((sum: number, fund: any) => 
      sum + fund.expenseRatio, 0) / portfolioData.funds.length;
    let expenseStatus = 'High Expenses';
    if (avgExpenseRatio <= 1.0) expenseStatus = 'Low Expenses';
    else if (avgExpenseRatio <= 1.5) expenseStatus = 'Moderate Expenses';
    else if (avgExpenseRatio <= 2.0) expenseStatus = 'Above Average Expenses';

    indicators.push({
      id: 'expenses',
      title: 'Expenses',
      status: expenseStatus,
      score: Math.max(0, 100 - (avgExpenseRatio * 40)), // Convert to score
      icon: DollarSign,
      description: `Avg expense ratio: ${avgExpenseRatio.toFixed(2)}%`
    });

    // 4. Portfolio Mix
    const equityAllocation = portfolioData.allocation.assetClass.find((a: any) => a.name === 'Equity')?.value || 0;
    const targetEquity = portfolioData.allocation.assetClass.find((a: any) => a.name === 'Equity')?.target || 0;
    const allocationDiff = Math.abs(equityAllocation - targetEquity);
    let mixStatus = 'Balanced Mix';
    if (allocationDiff <= 5) mixStatus = 'Optimal Mix';
    else if (allocationDiff <= 10) mixStatus = 'Well Balanced';
    else if (allocationDiff <= 15) mixStatus = 'Needs Rebalancing';
    else mixStatus = 'Poor Balance';

    indicators.push({
      id: 'portfolio_mix',
      title: 'Portfolio Mix',
      status: mixStatus,
      score: Math.max(0, 100 - (allocationDiff * 5)),
      icon: PieChart,
      description: `${equityAllocation}% equity (target: ${targetEquity}%)`
    });

    // 5. Management Quality
    const avgManagerTenure = portfolioData.funds.reduce((sum: number, fund: any) => {
      const tenure = new Date().getFullYear() - parseInt(fund.managerTenure);
      return sum + tenure;
    }, 0) / portfolioData.funds.length;
    
    let managementStatus = 'New Team';
    if (avgManagerTenure >= 15) managementStatus = 'Veteran Team';
    else if (avgManagerTenure >= 10) managementStatus = 'Experienced Team';
    else if (avgManagerTenure >= 5) managementStatus = 'Seasoned Team';

    indicators.push({
      id: 'management',
      title: 'Management',
      status: managementStatus,
      score: Math.min(100, avgManagerTenure * 5),
      icon: Users,
      description: `Avg manager tenure: ${avgManagerTenure.toFixed(0)} years`
    });

    // 6. Suitability (from API data if available)
    const avgSuitability = portfolioData.funds.filter((f: any) => f.suitability_score)
      .reduce((sum: number, fund: any) => sum + fund.suitability_score.final_score, 0) / 
      portfolioData.funds.filter((f: any) => f.suitability_score).length || 50;

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

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Portfolio Health Radar</CardTitle>
        <p className="text-sm text-slate-300">
          A comprehensive at-a-glance view of key portfolio health indicators
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          {healthIndicators.map((indicator) => {
            const IconComponent = indicator.icon;
            return (
              <div
                key={indicator.id}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 cursor-default ${getStatusColor(indicator.score)}`}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <IconComponent className={`w-6 h-6 ${getIconColor(indicator.score)}`} />
                  <div>
                    <h3 className="font-semibold text-sm">{indicator.title}</h3>
                    <p className="text-xs font-medium">{indicator.status}</p>
                  </div>
                </div>
              </div>
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