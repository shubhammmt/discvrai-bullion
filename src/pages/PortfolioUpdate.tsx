
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileSpreadsheet, Camera, Edit3, Plus, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssetEntry {
  id: string;
  name: string;
  amount: number;
  units?: number;
  purchasePrice?: number;
  currentValue: number;
  date: string;
}

interface Portfolio {
  mutualFunds: AssetEntry[];
  stocks: AssetEntry[];
  crypto: AssetEntry[];
  insurance: AssetEntry[];
  realEstate: AssetEntry[];
  fd: AssetEntry[];
  gold: AssetEntry[];
  bonds: AssetEntry[];
  loans: AssetEntry[];
  cash: AssetEntry[];
  creditCards: AssetEntry[];
}

const PortfolioUpdate = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedAssetType, setSelectedAssetType] = useState('mutualFunds');
  const [portfolio, setPortfolio] = useState<Portfolio>({
    mutualFunds: [],
    stocks: [],
    crypto: [],
    insurance: [],
    realEstate: [],
    fd: [],
    gold: [],
    bonds: [],
    loans: [],
    cash: [],
    creditCards: []
  });

  const assetTypes = [
    { key: 'mutualFunds', label: 'Mutual Funds', icon: '📈' },
    { key: 'stocks', label: 'Stocks', icon: '📊' },
    { key: 'crypto', label: 'Cryptocurrency', icon: '₿' },
    { key: 'insurance', label: 'Insurance', icon: '🛡️' },
    { key: 'realEstate', label: 'Real Estate', icon: '🏠' },
    { key: 'fd', label: 'Fixed Deposits', icon: '🏦' },
    { key: 'gold', label: 'Gold', icon: '🥇' },
    { key: 'bonds', label: 'Bonds', icon: '📋' },
    { key: 'loans', label: 'Loans', icon: '💳' },
    { key: 'cash', label: 'Cash', icon: '💵' },
    { key: 'creditCards', label: 'Credit Cards', icon: '💳' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'excel' | 'image') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'excel' && file.type.includes('sheet')) {
        toast({
          title: "Excel file uploaded",
          description: "Processing your portfolio data...",
        });
        // Simulate processing
        setTimeout(() => {
          toast({
            title: "Portfolio updated",
            description: "Your portfolio has been updated from Excel file.",
          });
        }, 2000);
      } else if (type === 'image' && file.type.includes('image')) {
        toast({
          title: "Image uploaded",
          description: "Processing portfolio image...",
        });
        // Simulate OCR processing
        setTimeout(() => {
          toast({
            title: "Portfolio extracted",
            description: "Data extracted from image and added to portfolio.",
          });
        }, 3000);
      }
    }
  };

  const addNewAsset = () => {
    const newAsset: AssetEntry = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      currentValue: 0,
      date: new Date().toISOString().split('T')[0]
    };

    setPortfolio(prev => ({
      ...prev,
      [selectedAssetType]: [...prev[selectedAssetType as keyof Portfolio], newAsset]
    }));
  };

  const updateAsset = (id: string, field: keyof AssetEntry, value: string | number) => {
    setPortfolio(prev => ({
      ...prev,
      [selectedAssetType]: prev[selectedAssetType as keyof Portfolio].map(asset =>
        asset.id === id ? { ...asset, [field]: value } : asset
      )
    }));
  };

  const deleteAsset = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      [selectedAssetType]: prev[selectedAssetType as keyof Portfolio].filter(asset => asset.id !== id)
    }));
  };

  const savePortfolio = () => {
    toast({
      title: "Portfolio saved",
      description: "Your portfolio has been successfully saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Portfolio Management</h1>
          <p className="text-gray-600">Update and manage your comprehensive investment portfolio</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
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

          {/* Manual Entry Tab */}
          <TabsContent value="manual" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Asset Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {assetTypes.map((type) => (
                    <Button
                      key={type.key}
                      variant={selectedAssetType === type.key ? "default" : "ghost"}
                      className="w-full justify-start text-left"
                      onClick={() => setSelectedAssetType(type.key)}
                    >
                      <span className="mr-2">{type.icon}</span>
                      {type.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-5 h-5" />
                      {assetTypes.find(t => t.key === selectedAssetType)?.label}
                    </div>
                    <Button onClick={addNewAsset} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio[selectedAssetType as keyof Portfolio].map((asset) => (
                      <div key={asset.id} className="grid grid-cols-12 gap-4 p-4 border rounded-lg">
                        <div className="col-span-3">
                          <Label htmlFor={`name-${asset.id}`}>Name</Label>
                          <Input
                            id={`name-${asset.id}`}
                            value={asset.name}
                            onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                            placeholder="Asset name"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`amount-${asset.id}`}>Amount</Label>
                          <Input
                            id={`amount-${asset.id}`}
                            type="number"
                            value={asset.amount}
                            onChange={(e) => updateAsset(asset.id, 'amount', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`units-${asset.id}`}>Units</Label>
                          <Input
                            id={`units-${asset.id}`}
                            type="number"
                            value={asset.units || ''}
                            onChange={(e) => updateAsset(asset.id, 'units', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`value-${asset.id}`}>Current Value</Label>
                          <Input
                            id={`value-${asset.id}`}
                            type="number"
                            value={asset.currentValue}
                            onChange={(e) => updateAsset(asset.id, 'currentValue', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`date-${asset.id}`}>Date</Label>
                          <Input
                            id={`date-${asset.id}`}
                            type="date"
                            value={asset.date}
                            onChange={(e) => updateAsset(asset.id, 'date', e.target.value)}
                          />
                        </div>
                        <div className="col-span-1 flex items-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteAsset(asset.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {portfolio[selectedAssetType as keyof Portfolio].length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No {assetTypes.find(t => t.key === selectedAssetType)?.label.toLowerCase()} added yet. Click "Add New" to get started.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assetTypes.map((type) => {
                const assets = portfolio[type.key as keyof Portfolio];
                const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
                const totalCount = assets.length;

                return (
                  <Card key={type.key} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          {type.label}
                        </div>
                        <span className="text-sm font-normal text-gray-500">{totalCount} items</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        ₹{totalValue.toLocaleString('en-IN')}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Total value in {type.label.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-8">
          <Button onClick={savePortfolio} size="lg" className="bg-green-600 hover:bg-green-700">
            <Save className="w-5 h-5 mr-2" />
            Save Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioUpdate;
