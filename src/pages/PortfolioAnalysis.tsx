import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Target, AlertCircle, CheckCircle, Lightbulb, ArrowRight, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface PortfolioScore {
  overall: number;
  diversification: number;
  goalAlignment: number;
  cashFlow: number;
}

const PortfolioAnalysis = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [portfolioScore, setPortfolioScore] = useState<PortfolioScore>({
    overall: 0,
    diversification: 0,
    goalAlignment: 0,
    cashFlow: 0
  });

  const loadSampleData = () => {
    const sampleAssets: Asset[] = [
      { type: 'mutual-fund', name: 'Equity Diversified Fund', currentValue: 150000 },
      { type: 'stocks', name: 'HDFC Bank', currentValue: 50000 },
      { type: 'fd', name: 'SBI Fixed Deposit', currentValue: 100000 },
      { type: 'emergency', name: 'Emergency Fund', currentValue: 75000 }
    ];
    
    const sampleGoals: Goal[] = [
      { type: 'retirement', targetAmount: 2000000, timeframe: 20 },
      { type: 'house', targetAmount: 1000000, timeframe: 8 },
      { type: 'education', targetAmount: 500000, timeframe: 10 }
    ];
    
    const sampleExpenses: Expense[] = [
      { category: 'housing', monthlyAmount: 25000 },
      { category: 'food', monthlyAmount: 15000 },
      { category: 'transport', monthlyAmount: 8000 },
      { category: 'utilities', monthlyAmount: 5000 }
    ];

    setAssets(sampleAssets);
    setGoals(sampleGoals);
    setExpenses(sampleExpenses);
    
    // Save to localStorage for persistence
    localStorage.setItem('portfolioAssets', JSON.stringify(sampleAssets));
    localStorage.setItem('portfolioGoals', JSON.stringify(sampleGoals));
    localStorage.setItem('portfolioExpenses', JSON.stringify(sampleExpenses));
  };

  useEffect(() => {
    const savedAssets = localStorage.getItem('portfolioAssets');
    const savedGoals = localStorage.getItem('portfolioGoals');
    const savedExpenses = localStorage.getItem('portfolioExpenses');

    if (savedAssets) setAssets(JSON.parse(savedAssets));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  useEffect(() => {
    if (assets.length > 0 || goals.length > 0 || expenses.length > 0) {
      calculatePortfolioScore();
    }
  }, [assets, goals, expenses]);

  const calculatePortfolioScore = () => {
    const totalAssetValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
    const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalMonthlyExpenses = expenses.reduce((sum, expense) => sum + expense.monthlyAmount, 0);

    // Diversification Score (based on asset types)
    const assetTypes = new Set(assets.map(asset => asset.type)).size;
    const diversificationScore = Math.min(100, (assetTypes / 6) * 100); // Max 6 types for 100%

    // Goal Alignment Score (assets vs goals)
    const goalAlignmentScore = totalGoalAmount > 0 
      ? Math.min(100, (totalAssetValue / totalGoalAmount) * 100)
      : totalAssetValue > 0 ? 50 : 0;

    // Cash Flow Score (rough estimation)
    const assumedIncome = totalMonthlyExpenses * 1.5; // Assume 50% savings rate as good
    const cashFlowScore = totalMonthlyExpenses > 0 
      ? Math.min(100, ((assumedIncome - totalMonthlyExpenses) / assumedIncome) * 200)
      : 75;

    const overallScore = Math.round((diversificationScore + goalAlignmentScore + cashFlowScore) / 3);

    setPortfolioScore({
      overall: overallScore,
      diversification: Math.round(diversificationScore),
      goalAlignment: Math.round(goalAlignmentScore),
      cashFlow: Math.round(cashFlowScore)
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const generateInsights = () => {
    const insights = [];
    const totalAssetValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
    const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    
    if (portfolioScore.diversification < 60) {
      insights.push({
        type: 'warning',
        title: 'Limited Diversification',
        description: 'Consider adding more asset types to reduce risk',
        action: 'Add mutual funds or bonds to your portfolio'
      });
    }

    if (portfolioScore.goalAlignment < 50) {
      insights.push({
        type: 'alert',
        title: 'Goal Gap Identified',
        description: `You need ₹${(totalGoalAmount - totalAssetValue).toLocaleString('en-IN')} more to meet your goals`,
        action: 'Increase monthly investments or extend timelines'
      });
    }

    if (assets.length > 0 && !assets.some(asset => asset.type === 'emergency')) {
      insights.push({
        type: 'info',
        title: 'Emergency Fund Missing',
        description: 'Build an emergency fund covering 6 months of expenses',
        action: 'Start with ₹10,000/month in liquid funds'
      });
    }

    return insights;
  };

  const insights = generateInsights();

  if (assets.length === 0 && goals.length === 0 && expenses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-700">No Portfolio Data Found</h2>
          <p className="text-gray-600">Complete the quick setup first to see your analysis, or try our sample data</p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/portfolio/update')} className="w-full">
              Go to Setup
            </Button>
            <Button onClick={loadSampleData} variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Load Sample Data
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/portfolio/update')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Setup
          </Button>
          
          <h1 className="text-xl font-semibold">Portfolio Analysis</h1>
          
          <Button onClick={() => navigate('/health-dashboard')}>
            View Full Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Overall Score */}
        <Card className={`border-2 ${getScoreBg(portfolioScore.overall)}`}>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                {portfolioScore.overall >= 70 ? 
                  <CheckCircle className="w-8 h-8 text-green-600" /> :
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                }
                <div>
                  <h2 className="text-3xl font-bold">Portfolio Score</h2>
                  <p className={`text-5xl font-bold ${getScoreColor(portfolioScore.overall)}`}>
                    {portfolioScore.overall}/100
                  </p>
                </div>
              </div>
              <p className="text-gray-600 max-w-md mx-auto">
                {portfolioScore.overall >= 80 ? 
                  "Excellent! Your portfolio is well-structured." :
                  portfolioScore.overall >= 60 ?
                  "Good foundation! Some optimizations needed." :
                  "Let's work together to strengthen your portfolio."
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Diversification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{portfolioScore.diversification}/100</span>
                  <Badge variant={portfolioScore.diversification >= 70 ? "default" : "secondary"}>
                    {assets.length} asset types
                  </Badge>
                </div>
                <Progress value={portfolioScore.diversification} className="h-2" />
                <p className="text-sm text-gray-600">
                  {portfolioScore.diversification >= 70 ? 
                    "Well diversified across asset classes" :
                    "Consider adding more asset types"
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-purple-600" />
                Goal Alignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{portfolioScore.goalAlignment}/100</span>
                  <Badge variant={portfolioScore.goalAlignment >= 70 ? "default" : "secondary"}>
                    {goals.length} goals
                  </Badge>
                </div>
                <Progress value={portfolioScore.goalAlignment} className="h-2" />
                <p className="text-sm text-gray-600">
                  {portfolioScore.goalAlignment >= 70 ? 
                    "Assets align well with your goals" :
                    "Increase investments to meet goals"
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Cash Flow Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{portfolioScore.cashFlow}/100</span>
                  <Badge variant={portfolioScore.cashFlow >= 70 ? "default" : "secondary"}>
                    {expenses.length} categories
                  </Badge>
                </div>
                <Progress value={portfolioScore.cashFlow} className="h-2" />
                <p className="text-sm text-gray-600">
                  {portfolioScore.cashFlow >= 70 ? 
                    "Healthy savings and expense ratio" :
                    "Optimize expenses for better savings"
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights & Recommendations */}
        {insights.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Personalized Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {insight.type === 'alert' && <AlertCircle className="w-6 h-6 text-red-600" />}
                      {insight.type === 'warning' && <TrendingUp className="w-6 h-6 text-yellow-600" />}
                      {insight.type === 'info' && <Lightbulb className="w-6 h-6 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{insight.description}</p>
                      <p className="text-blue-600 text-sm font-medium">💡 {insight.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Complete Health Assessment</h3>
                <p className="text-sm text-gray-600">Get a comprehensive financial health score</p>
              </div>
              <Button className="w-full" onClick={() => navigate('/health-assessment')}>
                Take Assessment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Explore Investments</h3>
                <p className="text-sm text-gray-600">Find recommendations based on your profile</p>
              </div>
              <Button variant="outline" className="w-full" onClick={() => navigate('/feed')}>
                View Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalysis;
