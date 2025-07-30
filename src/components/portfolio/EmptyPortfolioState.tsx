import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  Target, 
  Shield, 
  CreditCard, 
  Plus,
  TrendingUp,
  PiggyBank 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyPortfolioState = () => {
  const navigate = useNavigate();

  const quickSetupSteps = [
    {
      icon: PiggyBank,
      title: 'Add Your Assets',
      description: 'Start with your savings, investments, and property',
      action: () => navigate('/portfolio/update'),
      buttonText: 'Add Assets',
      color: 'bg-blue-500'
    },
    {
      icon: Target,
      title: 'Set Financial Goals',
      description: 'Define what you\'re saving for - home, retirement, etc.',
      action: () => navigate('/portfolio/goals'),
      buttonText: 'Set Goals',
      color: 'bg-green-500'
    },
    {
      icon: CreditCard,
      title: 'Track Liabilities',
      description: 'Add loans, credit cards, and other debts',
      action: () => navigate('/portfolio/liabilities'),
      buttonText: 'Add Liabilities',
      color: 'bg-red-500'
    },
    {
      icon: Shield,
      title: 'Protection Cover',
      description: 'Include your insurance policies for complete view',
      action: () => navigate('/portfolio/insurance'),
      buttonText: 'Add Insurance',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <Wallet className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Your Portfolio Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Get a complete view of your financial life in one place
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Track your net worth, monitor investments, manage goals, and stay on top of your financial health. 
            Let's start by adding your first financial information.
          </p>
        </div>

        {/* Benefits Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              What you'll get with a complete portfolio:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-medium mb-1">Real-time Net Worth</h4>
                <p className="text-sm text-muted-foreground">
                  See your total assets minus liabilities
                </p>
              </div>
              <div className="text-center p-4">
                <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-medium mb-1">Goal Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  Monitor progress towards financial milestones
                </p>
              </div>
              <div className="text-center p-4">
                <Shield className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h4 className="font-medium mb-1">Financial Health Score</h4>
                <p className="text-sm text-muted-foreground">
                  Get insights on your overall financial wellness
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickSetupSteps.map((step, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${step.color} text-white`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <Button 
                      onClick={step.action}
                      size="sm"
                      className="group-hover:shadow-md transition-shadow"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {step.buttonText}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alternative Quick Start */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to start simple? Begin with just your investments:
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/portfolio/update')}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Start with Investments Only
          </Button>
        </div>

        {/* Demo Option */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Want to see how it looks? 
          </p>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/portfolio-home?demo=true')}
          >
            View Demo Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyPortfolioState;