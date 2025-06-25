
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUploadSection from '@/components/portfolio/FileUploadSection';
import QuickSetupSection from '@/components/portfolio/QuickSetupSection';

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

interface PortfolioSetupTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  assets: Asset[];
  goals: Goal[];
  expenses: Expense[];
  onAssetAdded: (asset: Asset) => void;
  onGoalAdded: (goal: Goal) => void;
  onExpenseAdded: (expense: Expense) => void;
  onAnalyzePortfolio: () => void;
  onFileProcessed: () => void;
}

const PortfolioSetupTabs: React.FC<PortfolioSetupTabsProps> = ({
  activeTab,
  onTabChange,
  assets,
  goals,
  expenses,
  onAssetAdded,
  onGoalAdded,
  onExpenseAdded,
  onAnalyzePortfolio,
  onFileProcessed
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 lg:w-96 mx-auto">
        <TabsTrigger value="upload">Upload Files</TabsTrigger>
        <TabsTrigger value="quick-setup">Quick Setup</TabsTrigger>
      </TabsList>

      {/* Upload Tab */}
      <TabsContent value="upload" className="space-y-6">
        <FileUploadSection onFileProcessed={onFileProcessed} />
      </TabsContent>

      {/* Quick Setup Tab */}
      <TabsContent value="quick-setup" className="space-y-6">
        <QuickSetupSection
          assets={assets}
          goals={goals}
          expenses={expenses}
          onAssetAdded={onAssetAdded}
          onGoalAdded={onGoalAdded}
          onExpenseAdded={onExpenseAdded}
          onAnalyzePortfolio={onAnalyzePortfolio}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PortfolioSetupTabs;
