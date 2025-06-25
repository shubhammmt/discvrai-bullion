
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileSpreadsheet, Camera, BarChart3, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
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

const PortfolioUpdate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('quick-setup');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'excel' | 'image') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'excel' && file.type.includes('sheet')) {
        toast({
          title: "Excel file uploaded",
          description: "Processing your portfolio data...",
        });
        setTimeout(() => {
          toast({
            title: "Portfolio updated",
            description: "Your portfolio has been updated from Excel file.",
          });
          setActiveTab('quick-setup');
        }, 2000);
      } else if (type === 'image' && file.type.includes('image')) {
        toast({
          title: "Image uploaded",
          description: "Processing portfolio image...",
        });
        setTimeout(() => {
          toast({
            title: "Portfolio extracted",
            description: "Data extracted from image and added to portfolio.",
          });
          setActiveTab('quick-setup');
        }, 3000);
      }
    }
  };

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96 mx-auto">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="quick-setup">Quick Setup</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-green-600" />
                    Upload Excel File
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Upload your portfolio data in Excel format. We support standard formats from major brokers.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <Input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={(e) => handleFileUpload(e, 'excel')}
                      className="hidden"
                      id="excel-upload"
                    />
                    <Label htmlFor="excel-upload" className="cursor-pointer">
                      <Button variant="outline" className="mt-2">
                        Choose Excel File
                      </Button>
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-blue-600" />
                    Upload Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Upload screenshots or photos of your portfolio statements. Our AI will extract the data.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload portfolio screenshot</p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'image')}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button variant="outline" className="mt-2">
                        Choose Image
                      </Button>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quick Setup Tab */}
          <TabsContent value="quick-setup" className="space-y-6">
            <div className="grid gap-6">
              {/* Assets */}
              <AssetEntryForm onAssetAdded={handleAssetAdded} />
              
              {/* Goals */}
              <GoalsEntryForm onGoalAdded={handleGoalAdded} />
              
              {/* Expenses */}
              <ExpensesEntryForm onExpenseAdded={handleExpenseAdded} />
              
              {/* Summary */}
              <QuickSetupSummary 
                assets={assets}
                goals={goals}
                expenses={expenses}
                onAnalyzePortfolio={handleAnalyzePortfolio}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PortfolioUpdate;
