
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Shield, Target, Wallet, ExternalLink, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HealthScoreCard from '@/components/HealthScoreCard';
import FinanceCopilot from '@/components/FinanceCopilot';

// Support both old and new health score formats
interface LegacyHealthScore {
  overall: number;
  categories: {
    wealth?: number;
    protection?: number;
    debt?: number;
    goals?: number;
    // New format
    assetAllocation?: number;
    emergencyFund?: number;
    debtManagement?: number;
    savingsRate?: number;
  };
  recommendations?: string[];
}

const HealthDashboard = () => {
  const navigate = useNavigate();
  const [healthScore, setHealthScore] = useState<LegacyHealthScore | null>(null);
  const [copilotOpen, setCopilotOpen] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem('healthScore');
    if (savedScore) {
      setHealthScore(JSON.parse(savedScore));
    } else {
      navigate('/health-assessment');
    }
  }, [navigate]);

  if (!healthScore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Determine if this is legacy or new format and map accordingly
  const isLegacyFormat = healthScore.categories.wealth !== undefined;
  
  const improvementAreas = isLegacyFormat ? [
    {
      category: 'wealth',
      title: 'Wealth Building',
      icon: TrendingUp,
      score: healthScore.categories.wealth || 0,
      actions: [
        { title: 'Start SIP in Index Fund', description: 'Begin with ₹5,000/month', link: 'https://groww.in' },
        { title: 'Increase PPF Contribution', description: 'Tax saving + retirement', link: 'https://sbi.co.in' }
      ]
    },
    {
      category: 'protection',
      title: 'Protection Planning',
      icon: Shield,
      score: healthScore.categories.protection || 0,
      actions: [
        { title: 'Term Life Insurance', description: '₹1Cr cover at ₹1,500/month', link: 'https://policybazaar.com' },
        { title: 'Health Insurance', description: '₹10L family floater', link: 'https://policybazaar.com' }
      ]
    },
    {
      category: 'debt',
      title: 'Debt Optimization',
      icon: Wallet,
      score: healthScore.categories.debt || 0,
      actions: [
        { title: 'Personal Loan', description: 'Consolidate high-interest debt', link: 'https://bajajfinserv.in' },
        { title: 'Credit Card Optimization', description: 'Better rewards & lower rates', link: 'https://hdfc.com' }
      ]
    },
    {
      category: 'goals',
      title: 'Goal Achievement',
      icon: Target,
      score: healthScore.categories.goals || 0,
      actions: [
        { title: 'Emergency Fund', description: 'Build 6-month expense buffer', link: 'https://zerodha.com' },
        { title: 'Home Loan Pre-approval', description: 'Get ready for property purchase', link: 'https://hdfcbank.com' }
      ]
    }
  ] : [
    {
      category: 'assetAllocation',
      title: 'Asset Allocation',
      icon: TrendingUp,
      score: healthScore.categories.assetAllocation || 0,
      actions: [
        { title: 'Rebalance Portfolio', description: 'Optimize equity allocation', link: 'https://groww.in' },
        { title: 'Diversify Holdings', description: 'Reduce concentration risk', link: 'https://zerodha.com' }
      ]
    },
    {
      category: 'emergencyFund',
      title: 'Emergency Fund',
      icon: Shield,
      score: healthScore.categories.emergencyFund || 0,
      actions: [
        { title: 'Build Emergency Fund', description: 'Save 6 months expenses', link: 'https://paytmmoney.com' },
        { title: 'Liquid Fund SIP', description: 'Better than savings account', link: 'https://groww.in' }
      ]
    },
    {
      category: 'debtManagement',
      title: 'Debt Management',
      icon: Wallet,
      score: healthScore.categories.debtManagement || 0,
      actions: [
        { title: 'Debt Consolidation', description: 'Lower interest rates', link: 'https://bajajfinserv.in' },
        { title: 'Prepayment Strategy', description: 'Reduce EMI burden', link: 'https://hdfcbank.com' }
      ]
    },
    {
      category: 'savingsRate',
      title: 'Savings Rate',
      icon: Target,
      score: healthScore.categories.savingsRate || 0,
      actions: [
        { title: 'Automate Savings', description: 'Set up automatic transfers', link: 'https://paytmmoney.com' },
        { title: 'Expense Tracking', description: 'Optimize spending patterns', link: 'https://walnut.app' }
      ]
    }
  ];

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

  // Generate default recommendations if none exist
  const defaultRecommendations = [
    "Complete your financial goal setup",
    "Start investing with systematic SIPs", 
    "Build your emergency fund",
    "Optimize your portfolio allocation"
  ];

  const recommendations = healthScore.recommendations || defaultRecommendations;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-xl font-semibold">Financial Health Dashboard</h1>
          
          <Button 
            onClick={() => setCopilotOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Ask AI Coach
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Health Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <HealthScoreCard score={healthScore} />
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions to Improve Your Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.slice(0, 4).map((rec, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <p className="text-sm font-medium">{rec}</p>
                      <Button size="sm" className="mt-2" variant="outline">
                        Get Started
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {improvementAreas.map((area) => {
            const Icon = area.icon;
            return (
              <Card key={area.category} className={`border-2 ${getScoreBg(area.score)}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getScoreBg(area.score)}`}>
                      <Icon className={`w-5 h-5 ${getScoreColor(area.score)}`} />
                    </div>
                    <div className="flex-1">
                      <h3>{area.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Score:</span>
                        <span className={`font-bold ${getScoreColor(area.score)}`}>
                          {area.score}/100
                        </span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {area.actions.map((action, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{action.title}</p>
                          <p className="text-xs text-gray-600">{action.description}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(action.link, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Next Assessment */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Track Your Progress</h3>
              <p className="text-gray-600">
                Retake the assessment monthly to see how your financial health improves
              </p>
              <Button 
                onClick={() => navigate('/health-assessment')}
                variant="outline"
              >
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Copilot */}
      <FinanceCopilot 
        isOpen={copilotOpen} 
        onToggle={setCopilotOpen}
      />
    </div>
  );
};

export default HealthDashboard;
