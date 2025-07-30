import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface HealthScoreData {
  overall: number;
  wealthBuilding: number;
  debtManagement: number;
  protection: number;
  liquidity: number;
  goalProgress: number;
}

interface FinancialHealthScoreProps {
  healthScore: HealthScoreData;
  className?: string;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ 
  healthScore, 
  className = "" 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  const scoreItems = [
    { label: 'Wealth Building', score: healthScore.wealthBuilding, key: 'wealthBuilding' },
    { label: 'Debt Management', score: healthScore.debtManagement, key: 'debtManagement' },
    { label: 'Protection', score: healthScore.protection, key: 'protection' },
    { label: 'Liquidity', score: healthScore.liquidity, key: 'liquidity' },
    { label: 'Goal Progress', score: healthScore.goalProgress, key: 'goalProgress' }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Financial Health Score</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {healthScore.overall}/100
            </Badge>
            <Badge 
              variant={healthScore.overall >= 80 ? 'default' : healthScore.overall >= 60 ? 'secondary' : 'destructive'}
              className="text-sm"
            >
              {getScoreLabel(healthScore.overall)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Overall Score Visualization */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Health</span>
            <span className="text-sm text-muted-foreground">{healthScore.overall}%</span>
          </div>
          <Progress value={healthScore.overall} className="h-3" />
        </div>

        {/* Individual Score Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {scoreItems.map((item) => (
            <div key={item.key} className="text-center">
              <div className="mb-3">
                <div className={`w-16 h-16 mx-auto rounded-full ${getScoreColor(item.score)} flex items-center justify-center text-white font-bold text-lg`}>
                  {item.score}
                </div>
              </div>
              <p className="text-sm font-medium mb-1">{item.label}</p>
              <p className="text-xs text-muted-foreground">{getScoreLabel(item.score)}</p>
            </div>
          ))}
        </div>

        {/* Score Improvement Tips */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Quick Tips to Improve</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {healthScore.debtManagement < 70 && (
              <li>• Reduce credit card utilization below 30%</li>
            )}
            {healthScore.liquidity < 70 && (
              <li>• Build emergency fund to 6 months of expenses</li>
            )}
            {healthScore.protection < 70 && (
              <li>• Consider increasing life and health insurance coverage</li>
            )}
            {healthScore.goalProgress < 70 && (
              <li>• Increase SIP amounts for high-priority goals</li>
            )}
            {healthScore.wealthBuilding < 70 && (
              <li>• Diversify investments across asset classes</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialHealthScore;