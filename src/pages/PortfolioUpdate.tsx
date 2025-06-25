
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import PortfolioSetupTabs from '@/components/portfolio/PortfolioSetupTabs';

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

const PortfolioUpdate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('quick-setup');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAssetAdded = (asset: Asset) => {
    setAssets(prev => [...prev, asset]);
  };

  const handleGoalAdded = (goal: Goal) => {
    setGoals(prev => [...prev, goal]);
  };

  const handleExpenseAdded = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const handleAnalyzePortfolio = () => {
    // Save data to localStorage for analysis
    localStorage.setItem('portfolioAssets', JSON.stringify(assets));
    localStorage.setItem('portfolioGoals', JSON.stringify(goals));
    localStorage.setItem('portfolioExpenses', JSON.stringify(expenses));
    
    toast({
      title: "Analysis Starting",
      description: "Redirecting to your portfolio analysis...",
    });
    
    setTimeout(() => {
      navigate('/portfolio/analysis');
    }, 1000);
  };

  const handleFileProcessed = () => {
    setActiveTab('quick-setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quick Portfolio Setup</h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Get started in just 30 seconds
          </p>
        </div>

        <PortfolioSetupTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          assets={assets}
          goals={goals}
          expenses={expenses}
          onAssetAdded={handleAssetAdded}
          onGoalAdded={handleGoalAdded}
          onExpenseAdded={handleExpenseAdded}
          onAnalyzePortfolio={handleAnalyzePortfolio}
          onFileProcessed={handleFileProcessed}
        />
      </div>
    </div>
  );
};

export default PortfolioUpdate;
