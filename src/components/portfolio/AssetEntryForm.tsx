
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssetEntry {
  type: string;
  name: string;
  currentValue: number;
}

interface AssetEntryFormProps {
  onAssetAdded: (asset: AssetEntry) => void;
}

const AssetEntryForm: React.FC<AssetEntryFormProps> = ({ onAssetAdded }) => {
  const [assetType, setAssetType] = useState('');
  const [assetName, setAssetName] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const { toast } = useToast();

  const assetTypes = [
    { value: 'stocks', label: 'Stocks/Equity' },
    { value: 'mutualFunds', label: 'Mutual Funds' },
    { value: 'fd', label: 'Fixed Deposits' },
    { value: 'savings', label: 'Savings Account' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'gold', label: 'Gold/Commodities' },
    { value: 'realEstate', label: 'Real Estate' },
    { value: 'insurance', label: 'Insurance/ULIP' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assetType || !assetName || !currentValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newAsset: AssetEntry = {
      type: assetType,
      name: assetName,
      currentValue: parseFloat(currentValue)
    };

    onAssetAdded(newAsset);
    
    // Reset form
    setAssetType('');
    setAssetName('');
    setCurrentValue('');
    
    toast({
      title: "Asset Added",
      description: `${assetName} added to your portfolio.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add Your Assets (30 seconds)</CardTitle>
        <p className="text-sm text-gray-600">Just tell us what you own and its current value</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Asset Type</Label>
              <Select value={assetType} onValueChange={setAssetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {assetTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Name/Description</Label>
              <Input
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                placeholder="e.g., HDFC Bank, SBI Savings"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Current Value (₹)</Label>
              <Input
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                placeholder="50000"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AssetEntryForm;
