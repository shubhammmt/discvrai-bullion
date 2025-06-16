
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Shield, Target, Wallet } from 'lucide-react';

interface HealthScoreCardProps {
  score: {
    overall: number;
    categories: {
      wealth: number;
      protection: number;
      debt: number;
      goals: number;
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

  const categories = [
    { key: 'wealth', label: 'Wealth Building', icon: TrendingUp, score: score.categories.wealth },
    { key: 'protection', label: 'Protection', icon: Shield, score: score.categories.protection },
    { key: 'debt', label: 'Debt Management', icon: Wallet, score: score.categories.debt },
    { key: 'goals', label: 'Goal Achievement', icon: Target, score: score.categories.goals }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreBg(score.overall)}`}>
            <span className={`text-2xl font-bold ${getScoreColor(score.overall)}`}>
              {score.overall}
            </span>
          </div>
          <div>
            <h3 className="text-xl">Financial Health Score</h3>
            <p className="text-sm text-gray-600">Your overall financial wellness</p>
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
                  <Progress value={category.score} className="h-2" />
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
