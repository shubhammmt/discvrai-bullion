
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Shield, Target, Wallet, Users } from 'lucide-react';

interface HealthScoreCardProps {
  score: {
    overall: number;
    grade?: string;
    summary?: string;
    categories: {
      assetAllocation?: number;
      emergencyFund?: number;
      debtManagement?: number;
      savingsRate?: number;
      // Legacy support
      wealth?: number;
      protection?: number;
      debt?: number;
      goals?: number;
    };
    benchmarks?: {
      percentile: number;
      peerGroup: string;
    };
  };
  showDetails?: boolean;
}

const HealthScoreCard = ({ score, showDetails = false }: HealthScoreCardProps) => {
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (value: number) => {
    if (value >= 80) return 'bg-green-100';
    if (value >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Determine if this is new format or legacy format
  const isNewFormat = score.categories.assetAllocation !== undefined;
  
  const categories = isNewFormat ? [
    { key: 'assetAllocation', label: 'Asset Allocation', icon: TrendingUp, score: score.categories.assetAllocation || 0 },
    { key: 'emergencyFund', label: 'Emergency Fund', icon: Shield, score: score.categories.emergencyFund || 0 },
    { key: 'debtManagement', label: 'Debt Management', icon: Wallet, score: score.categories.debtManagement || 0 },
    { key: 'savingsRate', label: 'Savings Rate', icon: Target, score: score.categories.savingsRate || 0 }
  ] : [
    { key: 'wealth', label: 'Wealth Building', icon: TrendingUp, score: score.categories.wealth || 0 },
    { key: 'protection', label: 'Protection', icon: Shield, score: score.categories.protection || 0 },
    { key: 'debt', label: 'Debt Management', icon: Wallet, score: score.categories.debt || 0 },
    { key: 'goals', label: 'Goal Achievement', icon: Target, score: score.categories.goals || 0 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreBg(score.overall)}`}>
            <span className={`text-2xl font-bold ${getScoreColor(score.overall)}`}>
              {score.overall}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl">Financial Health Score</h3>
              {score.grade && (
                <span className={`px-2 py-1 rounded-full text-sm font-bold ${getScoreBg(score.overall)} ${getScoreColor(score.overall)}`}>
                  {score.grade}
                </span>
              )}
            </div>
            {score.summary && (
              <p className="text-sm text-gray-600 mt-1">{score.summary}</p>
            )}
            {score.benchmarks && (
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                <span>{score.benchmarks.percentile}th percentile • {score.benchmarks.peerGroup}</span>
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      {showDetails && (
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </div>
                    <span className={`text-sm font-bold ${getScoreColor(category.score)}`}>
                      {category.score}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(category.score)}`}
                      style={{ width: `${Math.min(100, Math.max(0, category.score))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default HealthScoreCard;
