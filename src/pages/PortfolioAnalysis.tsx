
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Receipt, ArrowLeft, PieChart, AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateHealthScore, QuickAssessmentData } from '@/utils/healthScore';
import Header from '@/components/Header';

interface Asset {
  type: string;
  name: string;
  currentValue: number;
}

interface Goal {
  type: string;
  targetAmount: number;
  timeframe: number;
}

interface Expense {
  category: string;
  monthlyAmount: number;
}

const PortfolioAnalysis = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [healthScore, setHealthScore] = useState<any>(null);

  useEffect(() => {
    // Load data from localStorage
    const storedAssets = localStorage.getItem('portfolioAssets');
    const storedGoals = localStorage.getItem('portfolioGoals');
    const storedExpenses = localStorage.getItem('portfolioExpenses');

    if (storedAssets) setAssets(JSON.parse(storedAssets));
    if (storedGoals) setGoals(JSON.parse(storedGoals));
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));

    // If no data, redirect to portfolio update
    if (!storedAssets && !storedGoals && !storedExpenses) {
      navigate('/portfolio/update');
      return;
    }

    // Calculate health score with dummy data for now
    const mockData: QuickAssessmentData = {
      userProfile: {
        ageGroup: '25-30',
        incomeRange: '1L-1.5L',
        cityType: 'metro'
      },
      assets: {
        totalValue: 5, // 5 lakhs
        allocation: {
          equityPercentage: 60,
          debtPercentage: 30,
          cashPercentage: 10
        }
      },
      commitments: {
        monthlyEmi: 25, // 25k
        hasEmergencyFund: true
      }
    };

    const score = calculateHealthScore(mockData);
    setHealthScore(score);
  }, [navigate]);

  const totalAssetValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalMonthlyExpenses = expenses.reduce((sum, expense) => sum + expense.monthlyAmount, 0);
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (!healthScore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Analyzing your portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/portfolio')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Portfolio Analysis</h1>
          <p className="text-gray-600">Comprehensive analysis based on your financial data</p>
        </div>

        {/* Overall Health Score */}
        <Card className={`mb-8 border-2 ${getScoreBgColor(healthScore.overall)}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl">Financial Health Score</span>
              <Badge variant="outline" className={`text-2xl px-4 py-2 ${getScoreColor(healthScore.overall)}`}>
                {healthScore.overall}/100 ({healthScore.grade})
              </Badge>
            </CardTitle>
            <p className="text-gray-600">{healthScore.summary}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Asset Allocation</p>
                <div className="flex items-center justify-center gap-2">
                  <Progress value={healthScore.categories.assetAllocation} className="flex-1" />
                  <span className="text-sm font-medium">{healthScore.categories.assetAllocation}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Emergency Fund</p>
                <div className="flex items-center justify-center gap-2">
                  <Progress value={healthScore.categories.emergencyFund} className="flex-1" />
                  <span className="text-sm font-medium">{healthScore.categories.emergencyFund}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Debt Management</p>
                <div className="flex items-center justify-center gap-2">
                  <Progress value={healthScore.categories.debtManagement} className="flex-1" />
                  <span className="text-sm font-medium">{healthScore.categories.debtManagement}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Savings Rate</p>
                <div className="flex items-center justify-center gap-2">
                  <Progress value={healthScore.categories.savingsRate} className="flex-1" />
                  <span className="text-sm font-medium">{healthScore.categories.savingsRate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Portfolio Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{totalAssetValue.toLocaleString('en-IN')}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {assets.length} holdings
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Asset Breakdown</h4>
                {assets.slice(0, 3).map((asset, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{asset.name}</span>
                    <span className="text-sm font-medium">₹{asset.currentValue.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                {assets.length > 3 && (
                  <p className="text-xs text-gray-500">+{assets.length - 3} more assets</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Goals Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Financial Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Goals</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{totalGoalAmount.toLocaleString('en-IN')}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {goals.length} active goals
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Goal Progress</h4>
                {goals.slice(0, 3).map((goal, index) => {
                  const progress = Math.min((totalAssetValue / goal.targetAmount) * 100, 100);
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 capitalize">{goal.type}</span>
                        <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Expense Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Expense Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Receipt className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Monthly Expenses</p>
                <p className="text-2xl font-bold text-orange-600">
                  ₹{totalMonthlyExpenses.toLocaleString('en-IN')}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {expenses.length} categories
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Top Expenses</h4>
                {expenses
                  .sort((a, b) => b.monthlyAmount - a.monthlyAmount)
                  .slice(0, 3)
                  .map((expense, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 capitalize">{expense.category}</span>
                      <span className="text-sm font-medium">₹{expense.monthlyAmount.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Plan */}
        {healthScore.actionPlan && healthScore.actionPlan.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Recommended Action Plan
              </CardTitle>
              <p className="text-sm text-gray-600">Prioritized steps to improve your financial health</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {healthScore.actionPlan.map((action: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        #{action.priority}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {action.impact}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {action.timeframe}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/portfolio/update')} variant="outline">
            Update Portfolio Data
          </Button>
          <Button onClick={() => navigate('/research')} className="bg-blue-600 hover:bg-blue-700">
            Explore Investment Options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalysis;
