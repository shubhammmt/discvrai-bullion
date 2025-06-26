
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';

interface AssetsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const AssetsStep = ({ data, onDataChange }: AssetsStepProps) => {
  const [newAsset, setNewAsset] = useState({ type: '', amount: 0 });

  const assetTypes = [
    'Savings Account', 'Fixed Deposit', 'Mutual Funds', 'Stocks', 'PPF', 'EPF', 
    'Insurance', 'Real Estate', 'Gold', 'Emergency Fund', 'Other'
  ];

  const addAsset = () => {
    if (newAsset.type && newAsset.amount > 0) {
      const updatedAssets = [...(data.assets || []), newAsset];
      onDataChange({ assets: updatedAssets });
      setNewAsset({ type: '', amount: 0 });
    }
  };

  const removeAsset = (index: number) => {
    const updatedAssets = data.assets.filter((_: any, i: number) => i !== index);
    onDataChange({ assets: updatedAssets });
  };

  const handleSkip = () => {
    onDataChange({ assets: [] });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-gray-600 text-lg">
          Add your current investments and savings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Current Assets */}
        <div className="space-y-6">
          {data.assets && data.assets.length > 0 && (
            <>
              <Label className="text-lg font-medium text-gray-700">Current Assets</Label>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {data.assets.map((asset: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-base">{asset.type}</span>
                      <span className="text-gray-600 ml-3 text-lg">₹{asset.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAsset(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {(!data.assets || data.assets.length === 0) && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">No assets added yet</p>
              <p className="text-sm">Start by adding your first asset</p>
            </div>
          )}
        </div>

        {/* Right Side - Add New Asset */}
        <div className="space-y-6">
          <Label className="text-lg font-medium text-gray-700">Add New Asset</Label>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Asset Type</Label>
              <Select value={newAsset.type} onValueChange={(value) => setNewAsset({...newAsset, type: value})}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  {assetTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-600">Amount (₹)</Label>
              <Input
                type="number"
                placeholder="e.g., 50000"
                value={newAsset.amount || ''}
                onChange={(e) => setNewAsset({...newAsset, amount: parseInt(e.target.value) || 0})}
                className="h-12 text-lg"
              />
            </div>

            <Button
              onClick={addAsset}
              disabled={!newAsset.type || newAsset.amount <= 0}
              className="w-full h-12 flex items-center gap-2 text-base"
              variant="outline"
            >
              <Plus size={18} />
              Add Asset
            </Button>
            
            <div className="pt-4">
              <Button variant="ghost" onClick={handleSkip} className="w-full text-gray-500">
                Skip this step
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsStep;
