import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Scale, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRightLeft,
  Target,
  DollarSign
} from 'lucide-react';

interface RebalancingRecommendationsProps {
  allocation: {
    assetClass: Array<{
      name: string;
      value: number;
      target: number;
      color: string;
    }>;
    sectors: Array<{
      name: string;
      value: number;
      color: string;
    }>;
  };
  funds: Array<{
    name: string;
    recommendation: string;
    recommendationReason: string;
    currentValue: number;
    gainsPercentage: number;
    expenseRatio: number;
    scheme: string;
  }>;
  formatCurrency: (amount: number) => string;
}

const RebalancingRecommendations: React.FC<RebalancingRecommendationsProps> = ({
  allocation,
  funds,
  formatCurrency
}) => {
  // Calculate rebalancing needs
  const rebalancingNeeds = allocation.assetClass.map(asset => {
    const deviation = asset.value - asset.target;
    const severity = Math.abs(deviation) > 10 ? 'high' : Math.abs(deviation) > 5 ? 'medium' : 'low';
    
    return {
      ...asset,
      deviation,
      severity,
      action: deviation > 5 ? 'REDUCE' : deviation < -5 ? 'INCREASE' : 'MAINTAIN'
    };
  });

  // Identify sector concentration risks
  const concentrationRisks = allocation.sectors.filter(sector => sector.value > 20);

  // Fund-specific recommendations
  const fundRecommendations = funds.map(fund => {
    const isRegular = fund.scheme.includes('Regular');
    const highExpense = fund.expenseRatio > 2.0;
    const strongPerformer = fund.gainsPercentage > 20;
    
    let priority = 'low';
    let reasons = [];
    
    if (isRegular) {
      priority = 'medium';
      reasons.push('Switch to Direct plan to reduce expenses');
    }
    
    if (highExpense) {
      priority = 'high';
      reasons.push(`High expense ratio of ${fund.expenseRatio}%`);
    }
    
    if (fund.recommendation === 'REDUCE') {
      priority = 'high';
      reasons.push(fund.recommendationReason);
    }
    
    return {
      ...fund,
      priority,
      reasons
    };
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'INCREASE': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'REDUCE': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const totalRecommendations = rebalancingNeeds.filter(need => need.action !== 'MAINTAIN').length + 
                              fundRecommendations.filter(rec => rec.priority !== 'low').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Rebalancing & Recommendations
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            {totalRecommendations} Actions
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Asset Allocation Rebalancing */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" />
            Asset Allocation Adjustments
          </h4>
          
          {rebalancingNeeds.some(need => need.severity !== 'low') ? (
            <div className="space-y-3">
              {rebalancingNeeds
                .filter(need => need.severity !== 'low')
                .map((need) => (
                  <Alert key={need.name} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getActionIcon(need.action)}
                        <div>
                          <p className="font-medium">{need.name} Allocation</p>
                          <p className="text-sm text-muted-foreground">
                            Current: {need.value}% | Target: {need.target}%
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getPriorityColor(need.severity)}>
                        {need.action}
                      </Badge>
                    </div>
                    <AlertDescription className="mt-2">
                      {need.deviation > 0 
                        ? `Overweight by ${need.deviation.toFixed(1)}%. Consider reducing exposure.`
                        : `Underweight by ${Math.abs(need.deviation).toFixed(1)}%. Consider increasing allocation.`
                      }
                    </AlertDescription>
                  </Alert>
                ))}
            </div>
          ) : (
            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                Your asset allocation is well-balanced and within target ranges.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Sector Concentration Risks */}
        {concentrationRisks.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              Concentration Risk Alerts
            </h4>
            
            <div className="space-y-2">
              {concentrationRisks.map((sector) => (
                <Alert key={sector.name} className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    <strong>{sector.name}</strong> exposure at {sector.value}% 
                    - Consider diversifying to reduce concentration risk.
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Fund-Specific Recommendations */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Fund-Level Actions
          </h4>
          
          {fundRecommendations.filter(rec => rec.priority !== 'low').length > 0 ? (
            <div className="space-y-3">
              {fundRecommendations
                .filter(rec => rec.priority !== 'low')
                .sort((a, b) => (b.priority === 'high' ? 1 : 0) - (a.priority === 'high' ? 1 : 0))
                .map((fund) => (
                  <Alert key={fund.name} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{fund.name}</p>
                          <Badge variant="outline" className={getPriorityColor(fund.priority)}>
                            {fund.priority.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          {fund.reasons.map((reason, index) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              • {reason}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Current Value: {formatCurrency(fund.currentValue)} | 
                          Gains: {fund.gainsPercentage.toFixed(1)}%
                        </p>
                      </div>
                      <Badge variant="outline">
                        {fund.recommendation}
                      </Badge>
                    </div>
                  </Alert>
                ))}
            </div>
          ) : (
            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                All funds are performing well with no immediate action required.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Action Buttons */}
        {totalRecommendations > 0 && (
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="default" className="flex-1">
              Generate Rebalancing Plan
            </Button>
            <Button variant="outline" className="flex-1">
              Schedule Review
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RebalancingRecommendations;