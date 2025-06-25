
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileSpreadsheet, Camera, BarChart3, Clock, CheckCircle, Mail, Link2, PlusCircle, Shield, Zap, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method');
  
  const [activeTab, setActiveTab] = useState('connections');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    // Set initial tab based on URL parameter
    if (method === 'manual') setActiveTab('manual-entry');
    else if (method === 'upload') setActiveTab('upload');
    else setActiveTab('connections');
  }, [method]);

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
          navigate('/portfolio');
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
          navigate('/portfolio');
        }, 3000);
      }
    }
  };

  const handleZerodhaConnect = () => {
    toast({
      title: "Connecting to Zerodha",
      description: "Redirecting to secure Zerodha MCP connection...",
    });
    setTimeout(() => {
      toast({
        title: "Portfolio Synced",
        description: "Your Zerodha portfolio has been successfully connected.",
      });
      navigate('/portfolio');
    }, 3000);
  };

  const handleGmailConnect = () => {
    toast({
      title: "Connecting Gmail",
      description: "Setting up secure email statement parsing...",
    });
    setTimeout(() => {
      toast({
        title: "Gmail Connected",
        description: "We'll automatically import your financial statements.",
      });
      navigate('/portfolio');
    }, 2500);
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
    localStorage.setItem('portfolioAssets', JSON.stringify(assets));
    localStorage.setItem('portfolioGoals', JSON.stringify(goals));
    localStorage.setItem('portfolioExpenses', JSON.stringify(expenses));
    
    toast({
      title: "Analysis Starting",
      description: "Redirecting to your portfolio dashboard...",
    });
    
    setTimeout(() => {
      navigate('/portfolio');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Portfolio</h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            Choose your preferred method to get started
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] mx-auto">
            <TabsTrigger value="connections">Smart Connect</TabsTrigger>
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="manual-entry">Manual Entry</TabsTrigger>
          </TabsList>

          {/* Smart Connections Tab */}
          <TabsContent value="connections" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Zerodha MCP Connect */}
              <Card className="hover:shadow-lg transition-shadow border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                      <Link2 className="w-4 h-4 text-white" />
                    </div>
                    Connect Zerodha (MCP)
                    <div className="ml-auto">
                      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Recommended
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Live sync your complete portfolio with real-time updates. Most comprehensive data integration available.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <Shield className="w-4 h-4" />
                    <span>Bank-grade security & compliance</span>
                  </div>
                  <Button 
                    onClick={handleZerodhaConnect}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Connect Zerodha Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Gmail Connect */}
              <Card className="hover:shadow-lg transition-shadow border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    Connect Gmail
                    <div className="ml-auto">
                      <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        Smart
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Automatically import bank statements, brokerage reports, and financial documents from your email.
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>• Bank statements parsing</div>
                    <div>• Credit card statements</div>
                    <div>• Investment confirmations</div>
                  </div>
                  <Button 
                    onClick={handleGmailConnect}
                    variant="outline"
                    className="w-full border-blue-200 hover:bg-blue-50"
                  >
                    Connect Gmail Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Upload Files Tab */}
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
                    Upload Image/PDF
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Upload screenshots, PDFs, or photos of your portfolio statements. Our AI will extract the data.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload portfolio screenshot or PDF</p>
                    <Input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'image')}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button variant="outline" className="mt-2">
                        Choose File
                      </Button>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manual Entry Tab */}
          <TabsContent value="manual-entry" className="space-y-6">
            <div className="grid gap-6">
              <AssetEntryForm onAssetAdded={handleAssetAdded} />
              <GoalsEntryForm onGoalAdded={handleGoalAdded} />
              <ExpensesEntryForm onExpenseAdded={handleExpenseAdded} />
              <QuickSetupSummary 
                assets={assets}
                goals={goals}
                expenses={expenses}
                onAnalyzePortfolio={handleAnalyzePortfolio}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 max-w-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">Not sure which method to choose?</h3>
            <p className="text-sm text-gray-600 mb-4">
              For the best experience, we recommend starting with Zerodha MCP connection for instant portfolio sync, 
              or Gmail connect for automatic document processing.
            </p>
            <Button
              onClick={() => navigate('/portfolio')}
              variant="outline"
              className="border-blue-300 hover:bg-blue-50"
            >
              View Current Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioUpdate;
