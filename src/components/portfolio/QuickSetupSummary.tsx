
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Receipt, ArrowRight } from 'lucide-react';

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

interface QuickSetupSummaryProps {
  assets: Asset[];
  goals: Goal[];
  expenses: Expense[];
  onAnalyzePortfolio: () => void;
}

const QuickSetupSummary: React.FC<QuickSetupSummaryProps> = ({
  assets,
  goals,
  expenses,
  onAnalyzePortfolio
}) => {
  const totalAssetValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalMonthlyExpenses = expenses.reduce((sum, expense) => sum + expense.monthlyAmount, 0);
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  const isReadyForAnalysis = assets.length > 0 && goals.length > 0 && expenses.length > 0;

  return (
    <Card className="border-2 border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Setup Summary</CardTitle>
        <p className="text-sm text-green-700">Ready to analyze your financial health!</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Assets</p>
            <p className="text-xl font-bold text-blue-600">
              ₹{totalAssetValue.toLocaleString('en-IN')}
            </p>
            <Badge variant="secondary" className="mt-1">
              {assets.length} items
            </Badge>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg">
            <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Goals</p>
            <p className="text-xl font-bold text-purple-600">
              ₹{totalGoalAmount.toLocaleString('en-IN')}
            </p>
            <Badge variant="secondary" className="mt-1">
              {goals.length} goals
            </Badge>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg">
            <Receipt className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Monthly Expenses</p>
            <p className="text-xl font-bold text-orange-600">
              ₹{totalMonthlyExpenses.toLocaleString('en-IN')}
            </p>
            <Badge variant="secondary" className="mt-1">
              {expenses.length} categories
            </Badge>
          </div>
        </div>

        {isReadyForAnalysis ? (
          <Button 
            onClick={onAnalyzePortfolio}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
          >
            Analyze My Portfolio Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-2">Complete all sections to enable portfolio analysis</p>
            <div className="flex justify-center gap-2">
              <Badge variant={assets.length > 0 ? "default" : "secondary"}>Assets</Badge>
              <Badge variant={goals.length > 0 ? "default" : "secondary"}>Goals</Badge>
              <Badge variant={expenses.length > 0 ? "default" : "secondary"}>Expenses</Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickSetupSummary;
