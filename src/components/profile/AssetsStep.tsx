
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
    'Savings Account',
    'Fixed Deposit',
    'Mutual Funds',
    'Stocks',
    'PPF',
    'EPF',
    'Insurance',
    'Real Estate',
    'Gold',
    'Emergency Fund',
    'Other'
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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Add your current investments and savings
        </p>
      </div>

      {/* Current Assets */}
      {data.assets && data.assets.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Current Assets</Label>
          {data.assets.map((asset: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{asset.type}</span>
                <span className="text-gray-600 ml-2">₹{asset.amount.toLocaleString('en-IN')}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAsset(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Asset */}
      <div className="space-y-4 border-t pt-4">
        <Label className="text-sm font-medium text-gray-700">Add Asset</Label>
        
        <div className="grid grid-cols-2 gap-3">
          <Select value={newAsset.type} onValueChange={(value) => setNewAsset({...newAsset, type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Asset Type" />
            </SelectTrigger>
            <SelectContent>
              {assetTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="number"
            placeholder="Amount (₹)"
            value={newAsset.amount || ''}
            onChange={(e) => setNewAsset({...newAsset, amount: parseInt(e.target.value) || 0})}
          />
        </div>

        <Button
          onClick={addAsset}
          disabled={!newAsset.type || newAsset.amount <= 0}
          className="w-full flex items-center gap-2"
          variant="outline"
        >
          <Plus size={16} />
          Add Asset
        </Button>
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
          Skip this step
        </Button>
      </div>
    </div>
  );
};

export default AssetsStep;
