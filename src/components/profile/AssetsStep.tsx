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
    <div className="h-full flex flex-col">
      <div className="text-center mb-3">
        <p className="text-gray-600 text-sm">
          Add your current investments and savings
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Left Side - Current Assets */}
        <div className="flex flex-col min-h-0">
          {data.assets && data.assets.length > 0 ? (
            <>
              <Label className="text-sm font-medium text-gray-700 mb-2">Current Assets</Label>
              <div className="flex-1 space-y-2 overflow-y-auto min-h-0">
                {data.assets.map((asset: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                    <div>
                      <span className="font-medium">{asset.type}</span>
                      <span className="text-gray-600 ml-2">₹{asset.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAsset(index)}
                      className="text-red-600 hover:text-red-800 h-6 w-6 p-0"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-gray-500">
              <div>
                <p className="text-sm">No assets added yet</p>
                <p className="text-xs">Start by adding your first asset</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Add New Asset */}
        <div className="flex flex-col">
          <Label className="text-sm font-medium text-gray-700 mb-2">Add New Asset</Label>
          
          <div className="space-y-3 flex-1">
            <div>
              <Label className="text-xs font-medium text-gray-600">Asset Type</Label>
              <Select value={newAsset.type} onValueChange={(value) => setNewAsset({...newAsset, type: value})}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  {assetTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-sm">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs font-medium text-gray-600">Amount (₹)</Label>
              <Input
                type="number"
                placeholder="e.g., 50000"
                value={newAsset.amount || ''}
                onChange={(e) => setNewAsset({...newAsset, amount: parseInt(e.target.value) || 0})}
                className="h-8 text-sm"
              />
            </div>

            <Button
              onClick={addAsset}
              disabled={!newAsset.type || newAsset.amount <= 0}
              className="w-full h-8 flex items-center gap-1 text-sm"
              variant="outline"
            >
              <Plus size={14} />
              Add Asset
            </Button>
            
            <Button variant="ghost" onClick={handleSkip} className="w-full text-gray-500 h-7 text-xs">
              Skip this step
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsStep;
