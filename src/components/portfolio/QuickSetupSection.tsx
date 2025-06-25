
import React from 'react';
import AssetEntryForm from '@/components/portfolio/AssetEntryForm';
import GoalsEntryForm from '@/components/portfolio/GoalsEntryForm';
import ExpensesEntryForm from '@/components/portfolio/ExpensesEntryForm';
import QuickSetupSummary from '@/components/portfolio/QuickSetupSummary';

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

interface QuickSetupSectionProps {
  assets: Asset[];
  goals: Goal[];
  expenses: Expense[];
  onAssetAdded: (asset: Asset) => void;
  onGoalAdded: (goal: Goal) => void;
  onExpenseAdded: (expense: Expense) => void;
  onAnalyzePortfolio: () => void;
}

const QuickSetupSection: React.FC<QuickSetupSectionProps> = ({
  assets,
  goals,
  expenses,
  onAssetAdded,
  onGoalAdded,
  onExpenseAdded,
  onAnalyzePortfolio
}) => {
  return (
    <div className="grid gap-6">
      {/* Assets */}
      <AssetEntryForm onAssetAdded={onAssetAdded} />
      
      {/* Goals */}
      <GoalsEntryForm onGoalAdded={onGoalAdded} />
      
      {/* Expenses */}
      <ExpensesEntryForm onExpenseAdded={onExpenseAdded} />
      
      {/* Summary */}
      <QuickSetupSummary 
        assets={assets}
        goals={goals}
        expenses={expenses}
        onAnalyzePortfolio={onAnalyzePortfolio}
      />
    </div>
  );
};

export default QuickSetupSection;
